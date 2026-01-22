/**
 * useWebSocket Hook
 *
 * WebSocket bağlantısı için custom hook.
 * Otomatik bağlantı yönetimi, reconnect stratejisi ve event subscription.
 *
 * @module hooks/useWebSocket
 * @category Hooks
 *
 * Features:
 * - Otomatik bağlantı yönetimi
 * - Reconnect stratejisi (exponential backoff)
 * - Event subscription yönetimi
 * - Cleanup handling
 * - Heartbeat/ping-pong mekanizması
 * - Message queueing (offline mode)
 * - Connection status tracking
 *
 * @example
 * ```typescript
 * const { isConnected, sendMessage, onMessage } = useWebSocket({
 *   url: 'wss://api.example.com/ws',
 *   autoConnect: true
 * });
 *
 * // Subscribe to messages
 * useEffect(() => {
 *   const unsubscribe = onMessage((data) => {
 *     console.log('Message received:', data);
 *   });
 *   return unsubscribe;
 * }, [onMessage]);
 *
 * // Send message
 * sendMessage({ type: 'text', content: 'Hello!' });
 * ```
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  WebSocketConfig,
  ConnectionStatus,
  WebSocketEvent,
  WebSocketEventType,
  QueuedMessage,
  WebSocketError,
} from '@/types/websocket';

interface UseWebSocketOptions extends Partial<WebSocketConfig> {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: WebSocketError) => void;
  onMessage?: (event: WebSocketEvent) => void;
}

interface UseWebSocketReturn {
  // Connection state
  isConnected: boolean;
  connectionStatus: ConnectionStatus;
  reconnectAttempts: number;
  lastError: Error | null;

  // Connection control
  connect: () => void;
  disconnect: () => void;
  reconnect: () => void;

  // Messaging
  sendMessage: (type: WebSocketEventType, data: any) => void;
  sendRaw: (message: string) => void;

  // Event subscriptions
  onMessage: (callback: (data: any) => void) => () => void;
  onTyping: (callback: (data: any) => void) => () => void;
  onPresence: (callback: (data: any) => void) => () => void;
  onReadReceipt: (callback: (data: any) => void) => () => void;

  // Queue management
  queuedMessages: number;
  clearQueue: () => void;
}

/**
 * Calculate reconnection delay using exponential backoff
 */
function calculateReconnectDelay(attempt: number, baseDelay: number = 1000, maxDelay: number = 30000): number {
  const delay = Math.min(baseDelay * Math.pow(2, attempt), maxDelay);
  // Add jitter (0-25% of delay)
  const jitter = Math.random() * delay * 0.25;
  return delay + jitter;
}

/**
 * useWebSocket hook implementation
 */
export function useWebSocket(options: UseWebSocketOptions = {}): UseWebSocketReturn {
  const {
    url = `${import.meta.env.VITE_WS_URL || 'ws://localhost:3001'}/ws`,
    token,
    autoConnect = true,
    autoReconnect = true,
    reconnectInterval = 3000,
    maxReconnectAttempts = 10,
    heartbeatInterval = 30000,
    enablePresence = true,
    debug = false,
    onConnect,
    onDisconnect,
    onError,
    onMessage,
  } = options;

  // State
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [lastError, setLastError] = useState<Error | null>(null);
  const [queuedMessagesCount, setQueuedMessagesCount] = useState(0);

  // Refs
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const messageQueueRef = useRef<QueuedMessage[]>([]);
  const eventSubscribersRef = useRef<Map<string, Set<(data: any) => void>>>(new Map());

  // Log helper
  const log = useCallback((...args: any[]) => {
    if (debug) {
      console.log('[WebSocket]', ...args);
    }
  }, [debug]);

  /**
   * Subscribe to an event type
   */
  const subscribe = useCallback((eventType: string, callback: (data: any) => void): (() => void) => {
    if (!eventSubscribersRef.current.has(eventType)) {
      eventSubscribersRef.current.set(eventType, new Set());
    }
    
    const subscribers = eventSubscribersRef.current.get(eventType)!;
    subscribers.add(callback);

    log(`Subscribed to ${eventType}. Total subscribers: ${subscribers.size}`);

    // Return unsubscribe function
    return () => {
      subscribers.delete(callback);
      log(`Unsubscribed from ${eventType}. Remaining subscribers: ${subscribers.size}`);
    };
  }, [log]);

  /**
   * Notify subscribers of an event
   */
  const notifySubscribers = useCallback((eventType: string, data: any) => {
    const subscribers = eventSubscribersRef.current.get(eventType);
    if (subscribers && subscribers.size > 0) {
      subscribers.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in ${eventType} subscriber:`, error);
        }
      });
    }
  }, []);

  /**
   * Send queued messages
   */
  const processMessageQueue = useCallback(() => {
    if (wsRef.current?.readyState !== WebSocket.OPEN) return;

    while (messageQueueRef.current.length > 0) {
      const queuedMessage = messageQueueRef.current.shift();
      if (queuedMessage) {
        try {
          const wsMessage: WebSocketEvent = {
            type: queuedMessage.type,
            data: queuedMessage.data,
            timestamp: new Date(),
          };
          wsRef.current.send(JSON.stringify(wsMessage));
          log('Sent queued message:', queuedMessage.type);
        } catch (error) {
          log('Failed to send queued message:', error);
          // Re-queue if failed
          messageQueueRef.current.unshift(queuedMessage);
          break;
        }
      }
    }
    
    setQueuedMessagesCount(messageQueueRef.current.length);
  }, [log]);

  /**
   * Start heartbeat
   */
  const startHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
    }

    heartbeatIntervalRef.current = setInterval(() => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        try {
          wsRef.current.send(JSON.stringify({ type: 'ping', timestamp: new Date() }));
          log('Sent heartbeat ping');
        } catch (error) {
          log('Failed to send heartbeat:', error);
        }
      }
    }, heartbeatInterval);
  }, [heartbeatInterval, log]);

  /**
   * Stop heartbeat
   */
  const stopHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
  }, []);

  /**
   * Handle WebSocket message
   */
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const wsMessage: WebSocketEvent = JSON.parse(event.data);
      log('Received message:', wsMessage.type);

      // Handle special message types
      if (wsMessage.type === 'pong') {
        log('Received heartbeat pong');
        return;
      }

      // Notify global message handler
      onMessage?.(wsMessage);

      // Notify specific event subscribers
      notifySubscribers(wsMessage.type, wsMessage.data);
      notifySubscribers('*', wsMessage); // Wildcard for all messages
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  }, [log, onMessage, notifySubscribers]);

  /**
   * Connect to WebSocket
   */
  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      log('Already connected');
      return;
    }

    // Clear any pending reconnection
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    setConnectionStatus('connecting');
    setLastError(null);
    log('Connecting to:', url);

    try {
      const wsUrl = token ? `${url}?token=${token}` : url;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        log('Connected');
        setConnectionStatus('connected');
        setReconnectAttempts(0);
        wsRef.current = ws;

        // Start heartbeat
        startHeartbeat();

        // Process queued messages
        processMessageQueue();

        // Notify callback
        onConnect?.();
      };

      ws.onmessage = handleMessage;

      ws.onerror = (event) => {
        log('Error:', event);
        const error = new Error('WebSocket connection error');
        setLastError(error);
        
        const wsError: WebSocketError = {
          type: 'CONNECTION_FAILED',
          message: 'Bağlantı hatası oluştu',
          retryable: true,
          timestamp: new Date(),
        };
        onError?.(wsError);
      };

      ws.onclose = (event) => {
        log('Disconnected:', event.code, event.reason);
        setConnectionStatus('disconnected');
        stopHeartbeat();
        wsRef.current = null;

        // Notify callback
        onDisconnect?.();

        // Auto-reconnect if enabled
        if (autoReconnect && reconnectAttempts < maxReconnectAttempts) {
          const delay = calculateReconnectDelay(reconnectAttempts, reconnectInterval);
          log(`Reconnecting in ${delay}ms (attempt ${reconnectAttempts + 1}/${maxReconnectAttempts})`);
          
          setConnectionStatus('reconnecting');
          setReconnectAttempts(prev => prev + 1);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        } else if (reconnectAttempts >= maxReconnectAttempts) {
          log('Max reconnection attempts reached');
          setConnectionStatus('error');
        }
      };

      wsRef.current = ws;
    } catch (error) {
      console.error('Failed to create WebSocket:', error);
      setConnectionStatus('error');
      setLastError(error instanceof Error ? error : new Error('Unknown error'));
      
      const wsError: WebSocketError = {
        type: 'CONNECTION_FAILED',
        message: 'WebSocket oluşturulamadı',
        retryable: true,
        timestamp: new Date(),
      };
      onError?.(wsError);
    }
  }, [
    url,
    token,
    autoReconnect,
    maxReconnectAttempts,
    reconnectInterval,
    reconnectAttempts,
    log,
    onConnect,
    onDisconnect,
    onError,
    handleMessage,
    startHeartbeat,
    stopHeartbeat,
    processMessageQueue,
  ]);

  /**
   * Disconnect from WebSocket
   */
  const disconnect = useCallback(() => {
    log('Disconnecting');
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    stopHeartbeat();

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setConnectionStatus('disconnected');
    setReconnectAttempts(0);
  }, [log, stopHeartbeat]);

  /**
   * Manually trigger reconnection
   */
  const reconnect = useCallback(() => {
    log('Manual reconnect');
    disconnect();
    setReconnectAttempts(0);
    connect();
  }, [log, disconnect, connect]);

  /**
   * Send a typed message
   */
  const sendMessage = useCallback((type: WebSocketEventType, data: any) => {
    const message: WebSocketEvent = {
      type,
      data,
      timestamp: new Date(),
    };

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(JSON.stringify(message));
        log('Sent message:', type);
      } catch (error) {
        log('Failed to send message:', error);
        
        // Queue the message
        const queuedMessage: QueuedMessage = {
          id: `${Date.now()}-${Math.random()}`,
          type,
          data,
          timestamp: new Date(),
          retries: 0,
        };
        messageQueueRef.current.push(queuedMessage);
        setQueuedMessagesCount(messageQueueRef.current.length);
      }
    } else {
      log('Not connected, queuing message:', type);
      
      // Queue the message
      const queuedMessage: QueuedMessage = {
        id: `${Date.now()}-${Math.random()}`,
        type,
        data,
        timestamp: new Date(),
        retries: 0,
      };
      messageQueueRef.current.push(queuedMessage);
      setQueuedMessagesCount(messageQueueRef.current.length);
    }
  }, [log]);

  /**
   * Send raw string message
   */
  const sendRaw = useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      try {
        wsRef.current.send(message);
        log('Sent raw message');
      } catch (error) {
        log('Failed to send raw message:', error);
      }
    } else {
      log('Not connected, cannot send raw message');
    }
  }, [log]);

  /**
   * Event subscription helpers
   */
  const onMessageEvent = useCallback((callback: (data: any) => void) => {
    return subscribe('message', callback);
  }, [subscribe]);

  const onTyping = useCallback((callback: (data: any) => void) => {
    return subscribe('typing', callback);
  }, [subscribe]);

  const onPresence = useCallback((callback: (data: any) => void) => {
    return subscribe('presence', callback);
  }, [subscribe]);

  const onReadReceipt = useCallback((callback: (data: any) => void) => {
    return subscribe('read', callback);
  }, [subscribe]);

  /**
   * Clear message queue
   */
  const clearQueue = useCallback(() => {
    messageQueueRef.current = [];
    setQueuedMessagesCount(0);
    log('Message queue cleared');
  }, [log]);

  /**
   * Auto-connect on mount if enabled
   */
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - only run on mount/unmount, connect/disconnect are stable

  return {
    // Connection state
    isConnected: connectionStatus === 'connected',
    connectionStatus,
    reconnectAttempts,
    lastError,

    // Connection control
    connect,
    disconnect,
    reconnect,

    // Messaging
    sendMessage,
    sendRaw,

    // Event subscriptions
    onMessage: onMessageEvent,
    onTyping,
    onPresence,
    onReadReceipt,

    // Queue management
    queuedMessages: queuedMessagesCount,
    clearQueue,
  };
}
