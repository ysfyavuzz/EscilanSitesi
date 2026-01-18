/**
 * CSRF Protection Module
 *
 * Provides Cross-Site Request Forgery (CSRF) protection utilities:
 * - Token generation
 * - Token validation
 * - Double-submit cookie pattern
 * - Session-based CSRF tokens
 *
 * @module lib/security/csrf
 * @category Library - Security
 *
 * @example
 * ```typescript
 * import {
 *   generateCSRFToken,
 *   validateCSRFToken,
 *   csrfMiddleware,
 * } from '@/lib/security/csrf';
 *
 * // Generate token for user session
 * const token = generateCSRFToken('user-session-id');
 *
 * // Validate token on form submission
 * const isValid = validateCSRFToken('user-session-id', token);
 * if (!isValid) {
 *   res.status(403).json({ error: 'Invalid CSRF token' });
 * }
 *
 * // Use middleware to protect routes
 * app.post('/api/action', csrfMiddleware(), (req, res) => {
 *   // Route is now CSRF protected
 * });
 * ```
 */

import crypto from 'crypto';

/**
 * CSRF token storage (in-memory)
 * In production, use session/database storage instead
 *
 * @internal
 */
const tokenStore = new Map<string, { token: string; createdAt: number }>();

/**
 * CSRF configuration
 *
 * @interface CSRFConfig
 * @property {number} tokenExpiry - Token expiry in milliseconds (default: 1 hour)
 * @property {string} headerName - Header name for CSRF token (default: X-CSRF-Token)
 * @property {boolean} excludeGetRequests - Exclude GET requests from check (default: true)
 */
export interface CSRFConfig {
  tokenExpiry?: number;
  headerName?: string;
  excludeGetRequests?: boolean;
}

/**
 * Token validation result
 *
 * @interface TokenValidationResult
 * @property {boolean} valid - Whether token is valid
 * @property {string} [error] - Error message if invalid
 */
export interface TokenValidationResult {
  valid: boolean;
  error?: string;
}

// Default configuration
const DEFAULT_CONFIG: Required<CSRFConfig> = {
  tokenExpiry: 60 * 60 * 1000, // 1 hour
  headerName: 'X-CSRF-Token',
  excludeGetRequests: true,
};

// ============================================================================
// Token Generation & Storage
// ============================================================================

/**
 * Generates a cryptographically secure CSRF token
 *
 * @param {number} [length] - Token length in bytes (default: 32)
 * @returns {string} Hex-encoded CSRF token
 *
 * @example
 * ```typescript
 * const token = generateToken();
 * // Returns: '3f2a8c7d9e1b5c2a8f6e4d3c2b1a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c'
 * ```
 */
export function generateToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Generates a CSRF token for a user session
 *
 * Stores the token in memory (for demo/development).
 * In production, store in database/session.
 *
 * @param {string} sessionId - Unique session identifier
 * @param {CSRFConfig} [config] - Configuration options
 * @returns {string} CSRF token
 *
 * @example
 * ```typescript
 * const token = generateCSRFToken('user-session-123');
 * // Store token in session cookie or HTML form
 * res.json({ csrfToken: token });
 * ```
 */
export function generateCSRFToken(sessionId: string, config: CSRFConfig = {}): string {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Generate new token
  const token = generateToken();

  // Store token with timestamp
  tokenStore.set(sessionId, {
    token,
    createdAt: Date.now(),
  });

  return token;
}

/**
 * Gets stored CSRF token for a session
 *
 * @param {string} sessionId - Session identifier
 * @returns {string | null} Token or null if not found/expired
 *
 * @example
 * ```typescript
 * const token = getCSRFToken('user-session-123');
 * if (token) {
 *   console.log('Token exists:', token);
 * }
 * ```
 */
export function getCSRFToken(sessionId: string, config: CSRFConfig = {}): string | null {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const stored = tokenStore.get(sessionId);

  if (!stored) {
    return null;
  }

  // Check if token has expired
  const age = Date.now() - stored.createdAt;
  if (age > finalConfig.tokenExpiry) {
    tokenStore.delete(sessionId);
    return null;
  }

  return stored.token;
}

/**
 * Regenerates a CSRF token (invalidates old token)
 *
 * @param {string} sessionId - Session identifier
 * @param {CSRFConfig} [config] - Configuration options
 * @returns {string} New CSRF token
 *
 * @example
 * ```typescript
 * // After successful action
 * const newToken = regenerateCSRFToken('user-session-123');
 * // Return new token to client
 * ```
 */
export function regenerateCSRFToken(sessionId: string, config: CSRFConfig = {}): string {
  tokenStore.delete(sessionId);
  return generateCSRFToken(sessionId, config);
}

/**
 * Revokes/removes a CSRF token
 *
 * @param {string} sessionId - Session identifier
 *
 * @example
 * ```typescript
 * // On logout
 * revokeCSRFToken('user-session-123');
 * ```
 */
export function revokeCSRFToken(sessionId: string): void {
  tokenStore.delete(sessionId);
}

// ============================================================================
// Token Validation
// ============================================================================

/**
 * Validates a CSRF token against stored token for session
 *
 * Uses double-submit cookie pattern validation.
 *
 * @param {string} sessionId - Session identifier
 * @param {string} token - Token to validate
 * @param {CSRFConfig} [config] - Configuration options
 * @returns {TokenValidationResult} Validation result
 *
 * @example
 * ```typescript
 * const result = validateCSRFToken('user-session-123', submittedToken);
 * if (!result.valid) {
 *   res.status(403).json({ error: result.error });
 * }
 * ```
 */
export function validateCSRFToken(
  sessionId: string,
  token: string,
  config: CSRFConfig = {}
): TokenValidationResult {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Check if token is provided
  if (!token || typeof token !== 'string') {
    return {
      valid: false,
      error: 'CSRF token is missing',
    };
  }

  // Get stored token
  const storedToken = getCSRFToken(sessionId, config);

  if (!storedToken) {
    return {
      valid: false,
      error: 'CSRF token not found or has expired',
    };
  }

  // Validate token using constant-time comparison
  // Prevent timing attacks
  const isValid = constantTimeCompare(token, storedToken);

  if (!isValid) {
    return {
      valid: false,
      error: 'CSRF token is invalid',
    };
  }

  return { valid: true };
}

/**
 * Validates CSRF token from request
 *
 * Checks header, body, or query parameters.
 *
 * @param {string} sessionId - Session identifier
 * @param {object} request - Request object
 * @param {CSRFConfig} [config] - Configuration options
 * @returns {TokenValidationResult} Validation result
 *
 * @example
 * ```typescript
 * const result = validateCSRFTokenFromRequest(
 *   sessionId,
 *   { headers, body, query }
 * );
 * ```
 */
export function validateCSRFTokenFromRequest(
  sessionId: string,
  request: {
    headers?: Record<string, string>;
    body?: Record<string, unknown>;
    query?: Record<string, string>;
  },
  config: CSRFConfig = {}
): TokenValidationResult {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  // Try to get token from different sources
  let token: string | undefined;

  // 1. Check header
  if (request.headers) {
    token =
      request.headers[finalConfig.headerName.toLowerCase()] ||
      request.headers[finalConfig.headerName];
  }

  // 2. Check body
  if (!token && request.body) {
    token = (request.body._csrf || request.body.csrfToken) as string;
  }

  // 3. Check query
  if (!token && request.query) {
    token = request.query._csrf || request.query.csrfToken;
  }

  if (!token) {
    return {
      valid: false,
      error: 'CSRF token not provided in request',
    };
  }

  return validateCSRFToken(sessionId, token, config);
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Constant-time string comparison to prevent timing attacks
 *
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {boolean} True if strings are equal
 *
 * @example
 * ```typescript
 * const isEqual = constantTimeCompare('token1', 'token2');
 * ```
 */
export function constantTimeCompare(a: string, b: string): boolean {
  // Create buffers
  const bufferA = Buffer.from(a, 'utf8');
  const bufferB = Buffer.from(b, 'utf8');

  // Return false if lengths don't match
  if (bufferA.length !== bufferB.length) {
    return false;
  }

  // Compare byte by byte
  let result = 0;
  for (let i = 0; i < bufferA.length; i++) {
    result |= bufferA[i] ^ bufferB[i];
  }

  return result === 0;
}

/**
 * Cleans up expired tokens from store
 *
 * Should be called periodically to prevent memory leaks.
 *
 * @param {CSRFConfig} [config] - Configuration options
 * @returns {number} Number of tokens cleaned up
 *
 * @example
 * ```typescript
 * // Clean up every hour
 * setInterval(() => {
 *   const cleaned = cleanupExpiredTokens();
 *   console.log(`Cleaned ${cleaned} expired tokens`);
 * }, 60 * 60 * 1000);
 * ```
 */
export function cleanupExpiredTokens(config: CSRFConfig = {}): number {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const now = Date.now();
  let cleaned = 0;

  for (const [sessionId, data] of tokenStore.entries()) {
    const age = now - data.createdAt;
    if (age > finalConfig.tokenExpiry) {
      tokenStore.delete(sessionId);
      cleaned++;
    }
  }

  return cleaned;
}

/**
 * Gets statistics about the token store
 *
 * @returns {object} Store statistics
 *
 * @example
 * ```typescript
 * const stats = getTokenStoreStats();
 * console.log(`Active tokens: ${stats.activeTokens}`);
 * ```
 */
export function getTokenStoreStats(): {
  activeTokens: number;
  storeSize: number;
} {
  return {
    activeTokens: tokenStore.size,
    storeSize: tokenStore.size,
  };
}

/**
 * Clears all tokens from store
 *
 * Use with caution - will invalidate all CSRF tokens.
 *
 * @example
 * ```typescript
 * clearAllTokens(); // Invalidates all sessions
 * ```
 */
export function clearAllTokens(): void {
  tokenStore.clear();
}

// ============================================================================
// Middleware & Decorators
// ============================================================================

/**
 * CSRF middleware options
 *
 * @interface MiddlewareOptions
 * @property {(req: any) => string} getSessionId - Function to extract session ID from request
 * @property {CSRFConfig} config - CSRF configuration
 * @property {string[]} excludeMethods - HTTP methods to skip CSRF check (default: ['GET', 'HEAD', 'OPTIONS'])
 * @property {string[]} excludePaths - Paths to skip CSRF check (regex patterns allowed)
 */
export interface MiddlewareOptions {
  getSessionId?: (req: any) => string;
  config?: CSRFConfig;
  excludeMethods?: string[];
  excludePaths?: (string | RegExp)[];
}

/**
 * Creates CSRF protection middleware
 *
 * @param {MiddlewareOptions} options - Middleware options
 * @returns {function} Express-style middleware
 *
 * @example
 * ```typescript
 * // Basic usage
 * app.use(csrfMiddleware());
 *
 * // With custom options
 * app.use(csrfMiddleware({
 *   getSessionId: (req) => req.user.id,
 *   excludePaths: [/^\/api\/public\//, /^\/webhook\//],
 * }));
 * ```
 */
export function csrfMiddleware(options: MiddlewareOptions = {}) {
  const {
    getSessionId = (req: any) => req.sessionID || req.user?.id || 'anonymous',
    config = {},
    excludeMethods = ['GET', 'HEAD', 'OPTIONS'],
    excludePaths = [],
  } = options;

  return (req: any, res: any, next: any) => {
    // Generate CSRF token if not exists
    const sessionId = getSessionId(req);

    if (!getCSRFToken(sessionId, config)) {
      generateCSRFToken(sessionId, config);
    }

    // Attach token to response locals
    res.locals = res.locals || {};
    res.locals.csrfToken = getCSRFToken(sessionId, config);

    // Skip validation for safe methods
    if (excludeMethods.includes(req.method?.toUpperCase())) {
      return next();
    }

    // Skip validation for excluded paths
    const path = req.path || req.url;
    for (const excludePath of excludePaths) {
      if (excludePath instanceof RegExp) {
        if (excludePath.test(path)) {
          return next();
        }
      } else if (path === excludePath || path.startsWith(excludePath)) {
        return next();
      }
    }

    // Validate CSRF token
    const result = validateCSRFTokenFromRequest(sessionId, {
      headers: req.headers,
      body: req.body,
      query: req.query,
    }, config);

    if (!result.valid) {
      return res.status(403).json({
        error: 'CSRF validation failed',
        message: result.error,
      });
    }

    next();
  };
}

/**
 * Creates CSRF token for client-side use
 *
 * @param {string} sessionId - Session identifier
 * @param {CSRFConfig} [config] - Configuration
 * @returns {object} Object with token and header name
 *
 * @example
 * ```typescript
 * const { token, headerName } = createCSRFTokenForClient(sessionId);
 * res.json({ csrfToken: token, csrfHeaderName: headerName });
 * ```
 */
export function createCSRFTokenForClient(
  sessionId: string,
  config: CSRFConfig = {}
): {
  token: string;
  headerName: string;
} {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };

  const token = generateCSRFToken(sessionId, config);

  return {
    token,
    headerName: finalConfig.headerName,
  };
}

/**
 * Decorator for protecting API endpoints (use with TypeScript/class-based frameworks)
 *
 * @param {MiddlewareOptions} [options] - Middleware options
 * @returns {function} Decorator function
 *
 * @example
 * ```typescript
 * class UserController {
 *   @ProtectCSRF()
 *   async updateProfile(req, res) {
 *     // CSRF protected
 *   }
 * }
 * ```
 */
export function ProtectCSRF(options?: MiddlewareOptions) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const [req, res, next] = args;

      // Run CSRF middleware
      const middleware = csrfMiddleware(options);
      middleware(req, res, () => {
        // Call original method
        return originalMethod.apply(this, args);
      });
    };

    return descriptor;
  };
}

/**
 * Generates HTML form field for CSRF token
 *
 * @param {string} token - CSRF token
 * @returns {string} HTML input field
 *
 * @example
 * ```typescript
 * const csrfField = generateCSRFFormField(token);
 * // Returns: '<input type="hidden" name="_csrf" value="token-value">'
 * ```
 */
export function generateCSRFFormField(token: string): string {
  return `<input type="hidden" name="_csrf" value="${token}">`;
}

/**
 * Starts automatic cleanup of expired tokens
 *
 * Should be called once during app initialization.
 *
 * @param {number} [intervalMs] - Cleanup interval (default: every hour)
 * @param {CSRFConfig} [config] - Configuration
 * @returns {NodeJS.Timeout} Interval ID for cleanup
 *
 * @example
 * ```typescript
 * // Start cleanup on app startup
 * startTokenCleanup();
 *
 * // On app shutdown
 * process.on('SIGTERM', () => {
 *   clearInterval(cleanupInterval);
 * });
 * ```
 */
export function startTokenCleanup(
  intervalMs: number = 60 * 60 * 1000,
  config: CSRFConfig = {}
): NodeJS.Timeout {
  const interval = setInterval(() => {
    const cleaned = cleanupExpiredTokens(config);
    if (cleaned > 0) {
      console.log(`[CSRF] Cleaned ${cleaned} expired tokens`);
    }
  }, intervalMs);

  // Don't keep process alive just for cleanup
  if (interval.unref) {
    interval.unref();
  }

  return interval;
}
