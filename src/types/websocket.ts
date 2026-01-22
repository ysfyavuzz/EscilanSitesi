/**
 * WebSocket Types
 *
 * Type definitions for WebSocket-based real-time communication.
 * Defines message protocols, event types, and connection management.
 *
 * @module types/websocket
 * @category Types
 *
 * Exported Types:
 * - WebSocketEventType: Event type enum
 * - WebSocketEvent: Base event interface
 * - TypingData: Typing indicator data
 * - UserStatusData: User online status data
 * - ReadReceiptData: Message read receipt data
 * - PresenceData: User presence information
 * - WebSocketConfig: Configuration options
 *
 * @example
 * ```typescript
 * const event: WebSocketEvent = {
 *   type: 'message',
 *   data: { conversationId: '123', content: 'Hello' },
 *   timestamp: new Date()
 * };
 * ```
 */

/**
 * WebSocket event types
 */
export type WebSocketEventType =
  | 'message'
  | 'typing'
  | 'read'
  | 'delivered'
  | 'presence'
  | 'user_status'
  | 'online'
  | 'offline'
  | 'ping'
  | 'pong'
  | 'error'
  | 'connected'
  | 'disconnected'
  | 'reconnecting';

/**
 * Base WebSocket event interface
 */
export interface WebSocketEvent<T = any> {
  type: WebSocketEventType;
  data: T;
  timestamp: Date;
}

/**
 * Typing indicator data
 */
export interface TypingData {
  conversationId: string;
  userId: string;
  userName: string;
  isTyping: boolean;
}

/**
 * User online status
 */
export type UserStatus = 'online' | 'away' | 'busy' | 'offline';

/**
 * User status data
 */
export interface UserStatusData {
  userId: string;
  status: UserStatus;
  lastSeen?: Date;
}

/**
 * Read receipt data
 */
export interface ReadReceiptData {
  conversationId: string;
  messageId: string;
  userId: string;
  readAt: Date;
}

/**
 * Message delivery data
 */
export interface DeliveryData {
  conversationId: string;
  messageId: string;
  userId: string;
  deliveredAt: Date;
}

/**
 * User presence data
 */
export interface PresenceData {
  userId: string;
  isOnline: boolean;
  status: UserStatus;
  lastSeen?: Date;
  currentActivity?: string;
}

/**
 * WebSocket connection status
 */
export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'reconnecting' | 'error';

/**
 * WebSocket configuration
 */
export interface WebSocketConfig {
  url: string;
  token?: string;
  autoConnect?: boolean;
  autoReconnect?: boolean;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
  enablePresence?: boolean;
  debug?: boolean;
}

/**
 * WebSocket connection info
 */
export interface ConnectionInfo {
  status: ConnectionStatus;
  connectedAt?: Date;
  disconnectedAt?: Date;
  reconnectAttempts: number;
  lastError?: Error;
}

/**
 * Event subscription
 */
export interface EventSubscription {
  id: string;
  type: WebSocketEventType;
  callback: (data: any) => void;
}

/**
 * WebSocket message queue item
 */
export interface QueuedMessage {
  id: string;
  type: WebSocketEventType;
  data: any;
  timestamp: Date;
  retries: number;
}

/**
 * Heartbeat config
 */
export interface HeartbeatConfig {
  enabled: boolean;
  interval: number;
  timeout: number;
}

/**
 * Reconnection strategy
 */
export interface ReconnectionStrategy {
  type: 'exponential' | 'linear' | 'fixed';
  baseDelay: number;
  maxDelay: number;
  maxAttempts: number;
}

/**
 * WebSocket statistics
 */
export interface WebSocketStats {
  messagesSent: number;
  messagesReceived: number;
  bytesReceived: number;
  bytesSent: number;
  reconnections: number;
  errors: number;
  averageLatency: number;
  uptime: number;
}

/**
 * WebSocket error types
 */
export type WebSocketErrorType =
  | 'CONNECTION_FAILED'
  | 'AUTHENTICATION_FAILED'
  | 'MESSAGE_SEND_FAILED'
  | 'INVALID_MESSAGE'
  | 'TIMEOUT'
  | 'NETWORK_ERROR'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR';

/**
 * WebSocket error
 */
export interface WebSocketError {
  type: WebSocketErrorType;
  message: string;
  code?: number;
  retryable: boolean;
  timestamp: Date;
  details?: any;
}

/**
 * Room/Channel subscription
 */
export interface RoomSubscription {
  roomId: string;
  roomType: 'conversation' | 'presence' | 'notification' | 'broadcast';
  joinedAt: Date;
}
