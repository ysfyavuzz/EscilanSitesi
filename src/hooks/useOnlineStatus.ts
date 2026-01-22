/**
 * useOnlineStatus Hook
 *
 * Kullanıcı online durumu yönetimi ve tracking.
 * Presence bilgisi, last seen hesaplama ve idle detection.
 *
 * @module hooks/useOnlineStatus
 * @category Hooks
 *
 * Features:
 * - Online/offline takibi
 * - Last seen hesaplama
 * - Idle detection (kullanıcı aktivitesi)
 * - Status broadcasting
 * - Automatic status updates
 * - Away detection (inactivity)
 *
 * @example
 * ```typescript
 * const {
 *   onlineUsers,
 *   isUserOnline,
 *   getUserStatus,
 *   setMyStatus,
 *   getLastSeen
 * } = useOnlineStatus();
 *
 * // Check if user is online
 * if (isUserOnline('user-123')) {
 *   console.log('User is online!');
 * }
 *
 * // Set my status
 * setMyStatus('away');
 * ```
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { UserStatus, UserStatusData, PresenceData } from '@/types/websocket';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface UseOnlineStatusOptions {
  /**
   * Enable automatic idle detection
   */
  enableIdleDetection?: boolean;

  /**
   * Idle timeout in milliseconds (default: 5 minutes)
   */
  idleTimeout?: number;

  /**
   * Enable automatic status broadcasting
   */
  enableStatusBroadcast?: boolean;

  /**
   * Status broadcast interval in milliseconds (default: 30 seconds)
   */
  statusBroadcastInterval?: number;

  /**
   * Callback when status changes
   */
  onStatusChange?: (userId: string, status: UserStatus) => void;

  /**
   * Callback for broadcasting status
   */
  onBroadcastStatus?: (status: UserStatus) => void;
}

interface UseOnlineStatusReturn {
  // Online users tracking
  onlineUsers: Set<string>;
  isUserOnline: (userId: string) => boolean;
  getUserStatus: (userId: string) => UserStatus;
  getLastSeen: (userId: string) => string | null;

  // My status
  myStatus: UserStatus;
  setMyStatus: (status: UserStatus) => void;

  // Presence data
  presences: Map<string, PresenceData>;
  updatePresence: (userId: string, data: Partial<PresenceData>) => void;

  // Bulk updates
  updateMultiplePresences: (presences: PresenceData[]) => void;
  setUsersOnline: (userIds: string[]) => void;
  setUsersOffline: (userIds: string[]) => void;
}

/**
 * useOnlineStatus hook implementation
 */
export function useOnlineStatus(options: UseOnlineStatusOptions = {}): UseOnlineStatusReturn {
  const {
    enableIdleDetection = true,
    idleTimeout = 5 * 60 * 1000, // 5 minutes
    enableStatusBroadcast = true,
    statusBroadcastInterval = 30000, // 30 seconds
    onStatusChange,
    onBroadcastStatus,
  } = options;

  // State
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const [presences, setPresences] = useState<Map<string, PresenceData>>(new Map());
  const [myStatus, setMyStatusState] = useState<UserStatus>('online');

  // Refs
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const broadcastIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  /**
   * Check if user is online
   */
  const isUserOnline = useCallback((userId: string): boolean => {
    return onlineUsers.has(userId);
  }, [onlineUsers]);

  /**
   * Get user status
   */
  const getUserStatus = useCallback((userId: string): UserStatus => {
    const presence = presences.get(userId);
    return presence?.status || 'offline';
  }, [presences]);

  /**
   * Get formatted last seen string
   */
  const getLastSeen = useCallback((userId: string): string | null => {
    const presence = presences.get(userId);
    
    if (!presence) return null;
    
    if (presence.isOnline) {
      return 'Çevrimiçi';
    }

    if (presence.lastSeen) {
      try {
        return formatDistanceToNow(presence.lastSeen, {
          addSuffix: true,
          locale: tr,
        });
      } catch (error) {
        console.error('Error formatting last seen:', error);
        return 'Bilinmiyor';
      }
    }

    return 'Bilinmiyor';
  }, [presences]);

  /**
   * Update single user presence
   */
  const updatePresence = useCallback((userId: string, data: Partial<PresenceData>) => {
    setPresences(prev => {
      const newPresences = new Map(prev);
      const existing = newPresences.get(userId);
      
      const updated: PresenceData = {
        userId,
        isOnline: data.isOnline ?? existing?.isOnline ?? false,
        status: data.status ?? existing?.status ?? 'offline',
        lastSeen: data.lastSeen ?? existing?.lastSeen,
        currentActivity: data.currentActivity ?? existing?.currentActivity,
      };

      newPresences.set(userId, updated);
      return newPresences;
    });

    // Update online users set
    if (data.isOnline !== undefined) {
      setOnlineUsers(prev => {
        const newSet = new Set(prev);
        if (data.isOnline) {
          newSet.add(userId);
        } else {
          newSet.delete(userId);
        }
        return newSet;
      });
    }

    // Notify callback
    if (data.status) {
      onStatusChange?.(userId, data.status);
    }
  }, [onStatusChange]);

  /**
   * Update multiple presences at once
   */
  const updateMultiplePresences = useCallback((presenceList: PresenceData[]) => {
    setPresences(prev => {
      const newPresences = new Map(prev);
      
      presenceList.forEach(presence => {
        newPresences.set(presence.userId, presence);
      });
      
      return newPresences;
    });

    // Update online users set
    const onlineUserIds = presenceList.filter(p => p.isOnline).map(p => p.userId);
    const offlineUserIds = presenceList.filter(p => !p.isOnline).map(p => p.userId);
    
    setOnlineUsers(prev => {
      const newSet = new Set(prev);
      onlineUserIds.forEach(id => newSet.add(id));
      offlineUserIds.forEach(id => newSet.delete(id));
      return newSet;
    });
  }, []);

  /**
   * Set multiple users as online
   */
  const setUsersOnline = useCallback((userIds: string[]) => {
    setOnlineUsers(prev => {
      const newSet = new Set(prev);
      userIds.forEach(id => newSet.add(id));
      return newSet;
    });

    setPresences(prev => {
      const newPresences = new Map(prev);
      userIds.forEach(userId => {
        const existing = newPresences.get(userId);
        newPresences.set(userId, {
          userId,
          isOnline: true,
          status: existing?.status || 'online',
          lastSeen: new Date(),
          currentActivity: existing?.currentActivity,
        });
      });
      return newPresences;
    });
  }, []);

  /**
   * Set multiple users as offline
   */
  const setUsersOffline = useCallback((userIds: string[]) => {
    setOnlineUsers(prev => {
      const newSet = new Set(prev);
      userIds.forEach(id => newSet.delete(id));
      return newSet;
    });

    setPresences(prev => {
      const newPresences = new Map(prev);
      userIds.forEach(userId => {
        const existing = newPresences.get(userId);
        newPresences.set(userId, {
          userId,
          isOnline: false,
          status: 'offline',
          lastSeen: new Date(),
          currentActivity: existing?.currentActivity,
        });
      });
      return newPresences;
    });
  }, []);

  /**
   * Set my status
   */
  const setMyStatus = useCallback((status: UserStatus) => {
    setMyStatusState(status);
    lastActivityRef.current = Date.now();
    
    // Broadcast status change
    onBroadcastStatus?.(status);
  }, [onBroadcastStatus]);

  /**
   * Handle user activity (reset idle timer)
   */
  const handleActivity = useCallback(() => {
    lastActivityRef.current = Date.now();

    // If we were away/idle, set back to online
    if (myStatus === 'away') {
      setMyStatus('online');
    }

    // Reset idle timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    if (enableIdleDetection) {
      idleTimerRef.current = setTimeout(() => {
        // User has been idle, set to away
        if (myStatus === 'online') {
          setMyStatus('away');
        }
      }, idleTimeout);
    }
  }, [myStatus, setMyStatus, enableIdleDetection, idleTimeout]);

  /**
   * Setup idle detection
   */
  useEffect(() => {
    if (!enableIdleDetection) return;

    // Activity events
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Initial idle timer
    handleActivity();

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [enableIdleDetection, handleActivity]);

  /**
   * Setup status broadcasting
   */
  useEffect(() => {
    if (!enableStatusBroadcast) return;

    // Broadcast initial status
    onBroadcastStatus?.(myStatus);

    // Setup periodic broadcasting
    broadcastIntervalRef.current = setInterval(() => {
      onBroadcastStatus?.(myStatus);
    }, statusBroadcastInterval);

    return () => {
      if (broadcastIntervalRef.current) {
        clearInterval(broadcastIntervalRef.current);
      }
    };
  }, [enableStatusBroadcast, myStatus, statusBroadcastInterval, onBroadcastStatus]);

  /**
   * Handle visibility change (page hidden/visible)
   */
  useEffect(() => {
    let visibilityTimeout: NodeJS.Timeout | null = null;

    const handleVisibilityChange = () => {
      // Clear any existing timeout
      if (visibilityTimeout) {
        clearTimeout(visibilityTimeout);
        visibilityTimeout = null;
      }

      if (document.hidden) {
        // Page is hidden, set to away after delay
        visibilityTimeout = setTimeout(() => {
          if (document.hidden && myStatus === 'online') {
            setMyStatus('away');
          }
        }, 60000); // 1 minute delay
      } else {
        // Page is visible, set back to online
        if (myStatus === 'away') {
          setMyStatus('online');
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (visibilityTimeout) {
        clearTimeout(visibilityTimeout);
      }
    };
  }, [myStatus, setMyStatus]);

  return {
    // Online users tracking
    onlineUsers,
    isUserOnline,
    getUserStatus,
    getLastSeen,

    // My status
    myStatus,
    setMyStatus,

    // Presence data
    presences,
    updatePresence,

    // Bulk updates
    updateMultiplePresences,
    setUsersOnline,
    setUsersOffline,
  };
}
