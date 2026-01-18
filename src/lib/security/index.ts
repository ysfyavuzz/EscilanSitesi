/**
 * Security Utilities Module - Central Export
 *
 * Comprehensive security utilities for authentication, validation, rate limiting,
 * and security headers. All security functions are exported from this central module.
 *
 * @module lib/security
 * @category Library - Security
 *
 * Features:
 * - JWT token management (generation, verification, expiry management)
 * - Input validation with Zod schemas (email, phone, passwords, bookings, profiles)
 * - Rate limiting (IP-based, user-based, configurable)
 * - Security headers (CORS, CSP, HSTS, X-Frame-Options)
 * - CSRF protection (token generation, validation, middleware)
 * - Password security (hashing, verification, strength validation)
 *
 * @example
 * ```typescript
 * import {
 *   // JWT
 *   generateAccessToken,
 *   verifyAccessToken,
 *   // Validation
 *   registerSchema,
 *   loginSchema,
 *   // Rate Limiting
 *   loginLimiter,
 *   ipRateLimiter,
 *   // Headers
 *   securityHeaders,
 *   corsHeaders,
 *   // CSRF
 *   generateCSRFToken,
 *   validateCSRFToken,
 *   // Password
 *   hashPassword,
 *   verifyPassword,
 * } from '@/lib/security';
 *
 * // Example: Complete authentication flow
 *
 * // 1. Validate registration input
 * const result = registerSchema.safeParse(formData);
 * if (!result.success) {
 *   return handleValidationErrors(result.error);
 * }
 *
 * // 2. Check rate limit
 * const limit = loginLimiter.check(formData.email);
 * if (!limit.allowed) {
 *   return res.status(429).json({ error: 'Too many attempts' });
 * }
 *
 * // 3. Hash password
 * const hashedPassword = await hashPassword(result.data.password);
 *
 * // 4. Create user in database
 * const user = await createUser({
 *   email: result.data.email,
 *   password: hashedPassword,
 * });
 *
 * // 5. Generate tokens
 * const { accessToken, refreshToken } = createTokenPair(
 *   {
 *     userId: user.id,
 *     email: user.email,
 *     role: user.role,
 *   },
 *   user.id
 * );
 *
 * // 6. Apply security headers
 * const headers = securityHeaders({
 *   cors: { origin: 'https://app.example.com', credentials: true }
 * });
 * ```
 *
 * Modules:
 * - **jwt.ts** - JWT token generation, verification, and expiry management
 * - **validation.ts** - Zod schemas for input validation
 * - **rateLimit.ts** - In-memory rate limiting with sliding window algorithm
 * - **headers.ts** - Security headers configuration (CORS, CSP, HSTS)
 * - **csrf.ts** - CSRF protection utilities
 * - **password.ts** - Password hashing and strength validation
 *
 * @see {@link module:lib/security/jwt} - JWT utilities
 * @see {@link module:lib/security/validation} - Validation schemas
 * @see {@link module:lib/security/rateLimit} - Rate limiting
 * @see {@link module:lib/security/headers} - Security headers
 * @see {@link module:lib/security/csrf} - CSRF protection
 * @see {@link module:lib/security/password} - Password utilities
 */

// ============================================================================
// JWT Exports
// ============================================================================

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
  getTimeToExpiry,
  isTokenExpired,
  getTokenExpiresAt,
  getTokenIssuedAt,
  getTokenMetadata,
  shouldRefreshToken,
  isValidTokenFormat,
  createTokenPair,
  refreshAccessToken,
  type TokenPayload,
  type RefreshTokenPayload,
  type DecodedToken,
} from './jwt';

// ============================================================================
// Validation Exports
// ============================================================================

export {
  // Common schemas
  emailSchema,
  phoneSchema,
  urlSchema,
  passwordSchema,
  nameSchema,
  usernameSchema,
  dobSchema,
  currencySchema,
  slugSchema,
  // Authentication schemas
  registerSchema,
  loginSchema,
  passwordResetRequestSchema,
  passwordResetSchema,
  changePasswordSchema,
  // Profile schemas
  profileUpdateSchema,
  profilePhotoSchema,
  // Booking schemas
  bookingSchema,
  bookingCancellationSchema,
  bookingRescheduleSchema,
  bookingReviewSchema,
  // Pagination & Sorting
  paginationSchema,
  sortingSchema,
  // Utility functions
  validateInput,
  formatValidationErrors,
  sanitizeInput,
  // Types
  type RegisterInput,
  type LoginInput,
  type PasswordResetRequestInput,
  type PasswordResetInput,
  type ChangePasswordInput,
  type ProfileUpdateInput,
  type ProfilePhotoInput,
  type BookingInput,
  type BookingCancellationInput,
  type BookingRescheduleInput,
  type BookingReviewInput,
  type PaginationInput,
  type SortingInput,
} from './validation';

// ============================================================================
// Rate Limit Exports
// ============================================================================

export {
  createRateLimiter,
  ipRateLimiter,
  userRateLimiter,
  loginLimiter,
  passwordResetLimiter,
  apiRateLimiter,
  bookingLimiter,
  searchLimiter,
  getRateLimitHeaders,
  checkMultipleLimiters,
  RateLimiter,
  type RateLimitResult,
  type RateLimiterConfig,
} from './rateLimit';

// ============================================================================
// Security Headers Exports
// ============================================================================

export {
  corsHeaders,
  isOriginAllowed,
  cspHeaders,
  strictCSP,
  devCSP,
  hstsHeaders,
  otherSecurityHeaders,
  securityHeaders,
  productionHeaders,
  developmentHeaders,
  applySecurityHeaders,
  applyCorsHeaders,
  applyCspHeaders,
  applyHstsHeaders,
  securityHeadersMiddleware,
  type CORSConfig,
  type CSPConfig,
  type HSTSConfig,
  type SecurityHeadersConfig,
  type ResponseWithHeaders,
} from './headers';

// ============================================================================
// CSRF Exports
// ============================================================================

export {
  generateToken,
  generateCSRFToken,
  getCSRFToken,
  regenerateCSRFToken,
  revokeCSRFToken,
  validateCSRFToken,
  validateCSRFTokenFromRequest,
  constantTimeCompare,
  cleanupExpiredTokens,
  getTokenStoreStats,
  clearAllTokens,
  csrfMiddleware,
  createCSRFTokenForClient,
  ProtectCSRF,
  generateCSRFFormField,
  startTokenCleanup,
  type TokenValidationResult,
  type CSRFConfig,
  type MiddlewareOptions,
} from './csrf';

// ============================================================================
// Password Exports
// ============================================================================

export {
  hashPassword,
  verifyPassword,
  validatePasswordStrength,
  PASSWORD_REQUIREMENTS,
  type PasswordValidationResult,
} from './password';
