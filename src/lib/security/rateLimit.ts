/**
 * Rate Limiting Module
 *
 * Provides in-memory rate limiting utilities using sliding window algorithm:
 * - IP-based rate limiting
 * - User-based rate limiting
 * - Custom key-based limiting
 * - Configurable limits and time windows
 * - Sliding window algorithm for accurate tracking
 *
 * Note: For production with multiple servers, use Redis-based rate limiting.
 *
 * @module lib/security/rateLimit
 * @category Library - Security
 *
 * @example
 * ```typescript
 * import {
 *   createRateLimiter,
 *   ipRateLimiter,
 *   userRateLimiter,
 * } from '@/lib/security/rateLimit';
 *
 * // Create custom rate limiter
 * const loginLimiter = createRateLimiter({
 *   windowMs: 15 * 60 * 1000, // 15 minutes
 *   maxRequests: 5, // max 5 attempts
 * });
 *
 * // Check if request is allowed
 * const limit = loginLimiter.check('user@example.com');
 * if (!limit.allowed) {
 *   console.error('Too many requests, retry after:', limit.retryAfter);
 * }
 *
 * // IP-based limiting (1000 requests per minute)
 * const ipLimit = ipRateLimiter.check('192.168.1.1');
 *
 * // User-based limiting (100 requests per minute)
 * const userLimit = userRateLimiter.check('user123');
 * ```
 */

/**
 * Rate limit check result
 *
 * @interface RateLimitResult
 * @property {boolean} allowed - Whether the request is allowed
 * @property {number} limit - Maximum requests allowed in the window
 * @property {number} current - Current request count
 * @property {number} remaining - Remaining requests allowed
 * @property {number} resetAt - Timestamp when the limit resets (milliseconds)
 * @property {number} retryAfter - Seconds to wait before retrying (0 if allowed)
 */
export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  current: number;
  remaining: number;
  resetAt: number;
  retryAfter: number;
}

/**
 * Rate limiter configuration
 *
 * @interface RateLimiterConfig
 * @property {number} windowMs - Time window in milliseconds (default: 60000 = 1 minute)
 * @property {number} maxRequests - Maximum requests allowed in the window (default: 100)
 * @property {boolean} skipSuccessfulRequests - Skip counting successful requests (default: false)
 * @property {boolean} skipFailedRequests - Skip counting failed requests (default: false)
 * @property {(key: string) => void} [onLimitExceeded] - Callback when limit is exceeded
 */
export interface RateLimiterConfig {
  windowMs?: number;
  maxRequests?: number;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  onLimitExceeded?: (key: string, result: RateLimitResult) => void;
}

/**
 * Internal request tracking data
 *
 * @interface RequestTracker
 * @property {number[]} timestamps - Array of request timestamps
 * @property {number} createdAt - When this tracker was created
 */
interface RequestTracker {
  timestamps: number[];
  createdAt: number;
}

/**
 * Rate Limiter class
 *
 * Implements sliding window algorithm for accurate rate limiting.
 * Automatically cleans up old entries to prevent memory leaks.
 *
 * @class RateLimiter
 */
class RateLimiter {
  private store: Map<string, RequestTracker> = new Map();
  private windowMs: number;
  private maxRequests: number;
  private skipSuccessfulRequests: boolean;
  private skipFailedRequests: boolean;
  private onLimitExceeded?: (key: string, result: RateLimitResult) => void;
  private cleanupInterval: NodeJS.Timeout | null = null;

  /**
   * Creates a new RateLimiter instance
   *
   * @param {RateLimiterConfig} config - Configuration options
   */
  constructor(config: RateLimiterConfig = {}) {
    this.windowMs = config.windowMs ?? 60000;
    this.maxRequests = config.maxRequests ?? 100;
    this.skipSuccessfulRequests = config.skipSuccessfulRequests ?? false;
    this.skipFailedRequests = config.skipFailedRequests ?? false;
    this.onLimitExceeded = config.onLimitExceeded;

    // Start cleanup interval (clean every windowMs)
    this.startCleanupInterval();
  }

  /**
   * Starts the cleanup interval to remove old entries
   *
   * @private
   */
  private startCleanupInterval(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, this.windowMs);

    // Don't keep the process alive just for cleanup
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  /**
   * Removes old entries from the store
   *
   * @private
   */
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, tracker] of this.store.entries()) {
      // Filter out old timestamps
      tracker.timestamps = tracker.timestamps.filter(
        (timestamp) => now - timestamp < this.windowMs
      );

      // Remove entry if no timestamps remain and it's old
      if (tracker.timestamps.length === 0 && now - tracker.createdAt > this.windowMs * 2) {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      this.store.delete(key);
    }
  }

  /**
   * Checks if a request is allowed and increments the counter
   *
   * @param {string} key - Unique identifier (IP, user ID, etc.)
   * @param {boolean} [isSuccess] - Whether the request was successful
   * @returns {RateLimitResult} Rate limit check result
   *
   * @example
   * ```typescript
   * const result = rateLimiter.check('user123');
   * if (!result.allowed) {
   *   console.error(`Rate limited. Retry after ${result.retryAfter} seconds`);
   * }
   * ```
   */
  public check(key: string, isSuccess: boolean = true): RateLimitResult {
    const now = Date.now();
    let tracker = this.store.get(key);

    // Initialize new tracker if doesn't exist
    if (!tracker) {
      tracker = {
        timestamps: [],
        createdAt: now,
      };
      this.store.set(key, tracker);
    }

    // Remove timestamps outside the window
    tracker.timestamps = tracker.timestamps.filter((ts) => now - ts < this.windowMs);

    // Determine if we should count this request
    const shouldCount =
      (isSuccess && !this.skipSuccessfulRequests) ||
      (!isSuccess && !this.skipFailedRequests);

    if (shouldCount) {
      tracker.timestamps.push(now);
    }

    const current = tracker.timestamps.length;
    const allowed = current <= this.maxRequests;
    const remaining = Math.max(0, this.maxRequests - current);

    // Calculate reset time (when oldest request leaves the window)
    let resetAt = now + this.windowMs;
    if (tracker.timestamps.length > 0) {
      resetAt = tracker.timestamps[0] + this.windowMs;
    }

    const retryAfter = allowed ? 0 : Math.ceil((resetAt - now) / 1000);

    const result: RateLimitResult = {
      allowed,
      limit: this.maxRequests,
      current,
      remaining,
      resetAt,
      retryAfter,
    };

    // Call callback if limit exceeded
    if (!allowed && this.onLimitExceeded) {
      this.onLimitExceeded(key, result);
    }

    return result;
  }

  /**
   * Gets the current status for a key without incrementing
   *
   * @param {string} key - Unique identifier
   * @returns {RateLimitResult} Current rate limit status
   *
   * @example
   * ```typescript
   * const status = rateLimiter.getStatus('user123');
   * console.log(`Remaining requests: ${status.remaining}`);
   * ```
   */
  public getStatus(key: string): RateLimitResult {
    const now = Date.now();
    const tracker = this.store.get(key);

    if (!tracker) {
      return {
        allowed: true,
        limit: this.maxRequests,
        current: 0,
        remaining: this.maxRequests,
        resetAt: now + this.windowMs,
        retryAfter: 0,
      };
    }

    // Filter out old timestamps
    const validTimestamps = tracker.timestamps.filter((ts) => now - ts < this.windowMs);
    const current = validTimestamps.length;
    const allowed = current <= this.maxRequests;
    const remaining = Math.max(0, this.maxRequests - current);

    let resetAt = now + this.windowMs;
    if (validTimestamps.length > 0) {
      resetAt = validTimestamps[0] + this.windowMs;
    }

    const retryAfter = allowed ? 0 : Math.ceil((resetAt - now) / 1000);

    return {
      allowed,
      limit: this.maxRequests,
      current,
      remaining,
      resetAt,
      retryAfter,
    };
  }

  /**
   * Resets the rate limit for a specific key
   *
   * @param {string} key - Unique identifier to reset
   *
   * @example
   * ```typescript
   * rateLimiter.reset('user123');
   * ```
   */
  public reset(key: string): void {
    this.store.delete(key);
  }

  /**
   * Resets all rate limits
   *
   * @example
   * ```typescript
   * rateLimiter.resetAll();
   * ```
   */
  public resetAll(): void {
    this.store.clear();
  }

  /**
   * Gets statistics about the rate limiter
   *
   * @returns {object} Statistics object
   *
   * @example
   * ```typescript
   * const stats = rateLimiter.getStats();
   * console.log(`Tracking ${stats.trackedKeys} keys`);
   * ```
   */
  public getStats(): {
    trackedKeys: number;
    totalRequests: number;
    storeSize: number;
  } {
    const now = Date.now();
    let totalRequests = 0;

    for (const tracker of this.store.values()) {
      const validTimestamps = tracker.timestamps.filter((ts) => now - ts < this.windowMs);
      totalRequests += validTimestamps.length;
    }

    return {
      trackedKeys: this.store.size,
      totalRequests,
      storeSize: this.store.size,
    };
  }

  /**
   * Destroys the rate limiter and cleans up resources
   *
   * @example
   * ```typescript
   * rateLimiter.destroy();
   * ```
   */
  public destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
    this.store.clear();
  }
}

/**
 * Creates a new rate limiter instance with custom configuration
 *
 * @param {RateLimiterConfig} config - Configuration options
 * @returns {RateLimiter} New rate limiter instance
 *
 * @example
 * ```typescript
 * const apiLimiter = createRateLimiter({
 *   windowMs: 60000, // 1 minute
 *   maxRequests: 100,
 *   onLimitExceeded: (key, result) => {
 *     console.warn(`Rate limit exceeded for ${key}`);
 *   },
 * });
 * ```
 */
export function createRateLimiter(config: RateLimiterConfig = {}): RateLimiter {
  return new RateLimiter(config);
}

// ============================================================================
// Pre-configured Rate Limiters
// ============================================================================

/**
 * IP-based rate limiter
 * - 1000 requests per minute per IP
 *
 * @example
 * ```typescript
 * const result = ipRateLimiter.check('192.168.1.1');
 * if (!result.allowed) {
 *   res.status(429).json({ error: 'Too many requests' });
 * }
 * ```
 */
export const ipRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 1000,
});

/**
 * User-based rate limiter
 * - 100 requests per minute per user
 *
 * @example
 * ```typescript
 * const result = userRateLimiter.check('user123');
 * if (!result.allowed) {
 *   res.status(429).json({ error: 'Too many requests' });
 * }
 * ```
 */
export const userRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
});

/**
 * Login attempt rate limiter
 * - 5 attempts per 15 minutes per user
 *
 * @example
 * ```typescript
 * const result = loginLimiter.check('user@example.com');
 * if (!result.allowed) {
 *   res.status(429).json({ error: 'Too many login attempts' });
 * }
 * ```
 */
export const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
});

/**
 * Password reset rate limiter
 * - 3 attempts per hour per user
 *
 * @example
 * ```typescript
 * const result = passwordResetLimiter.check('user@example.com');
 * if (!result.allowed) {
 *   res.status(429).json({ error: 'Too many password reset attempts' });
 * }
 * ```
 */
export const passwordResetLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3,
});

/**
 * API rate limiter (general purpose)
 * - 500 requests per minute
 *
 * @example
 * ```typescript
 * const result = apiRateLimiter.check('endpoint:user123');
 * if (!result.allowed) {
 *   res.status(429).json({ error: 'API rate limit exceeded' });
 * }
 * ```
 */
export const apiRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 500,
});

/**
 * Booking creation rate limiter
 * - 10 bookings per hour per user
 *
 * @example
 * ```typescript
 * const result = bookingLimiter.check('user123');
 * if (!result.allowed) {
 *   res.status(429).json({ error: 'Too many booking attempts' });
 * }
 * ```
 */
export const bookingLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10,
});

/**
 * Search rate limiter
 * - 300 searches per minute per user
 *
 * @example
 * ```typescript
 * const result = searchLimiter.check('user123');
 * if (!result.allowed) {
 *   res.status(429).json({ error: 'Search rate limit exceeded' });
 * }
 * ```
 */
export const searchLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 300,
});

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Creates rate limit headers for HTTP responses
 *
 * @param {RateLimitResult} result - Rate limit check result
 * @returns {Record<string, string>} Headers to include in response
 *
 * @example
 * ```typescript
 * const result = rateLimiter.check('user123');
 * const headers = getRateLimitHeaders(result);
 * Object.entries(headers).forEach(([key, value]) => {
 *   res.setHeader(key, value);
 * });
 * ```
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'X-RateLimit-Reset': String(Math.ceil(result.resetAt / 1000)),
    'Retry-After': String(result.retryAfter),
  };
}

/**
 * Checks if request should be allowed based on multiple limiters
 *
 * @param {RateLimiter[]} limiters - Array of rate limiters to check
 * @param {string} key - Unique identifier
 * @returns {RateLimitResult} Most restrictive result
 *
 * @example
 * ```typescript
 * const result = checkMultipleLimiters(
 *   [ipRateLimiter, userRateLimiter],
 *   'user123'
 * );
 * ```
 */
export function checkMultipleLimiters(limiters: RateLimiter[], key: string): RateLimitResult {
  const results = limiters.map((limiter) => limiter.check(key));

  // Return the most restrictive result (smallest remaining)
  return results.reduce((most, current) =>
    current.remaining < most.remaining ? current : most
  );
}

export { RateLimiter };
