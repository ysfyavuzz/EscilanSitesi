# Security Utilities Module

Comprehensive security utilities for authentication, validation, rate limiting, and security headers.

## Overview

The security module provides production-ready security features organized into specialized modules:

- **jwt.ts** - JWT token management
- **validation.ts** - Input validation with Zod schemas
- **rateLimit.ts** - In-memory rate limiting
- **headers.ts** - Security headers configuration
- **csrf.ts** - CSRF protection utilities
- **password.ts** - Password hashing and validation
- **index.ts** - Central export file

## Installation

Dependencies are already included in `package.json`:
- `jsonwebtoken` - JWT token management
- `zod` - Input validation
- `bcryptjs` - Password hashing

## Quick Start

### JWT Token Management

```typescript
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  createTokenPair,
} from '@/lib/security';

// Generate tokens for new authentication
const { accessToken, refreshToken } = createTokenPair(
  {
    userId: 'user123',
    email: 'user@example.com',
    role: 'user',
  },
  'user123'
);

// Verify token on protected routes
try {
  const payload = verifyAccessToken(accessToken);
  console.log('User ID:', payload.userId);
} catch (error) {
  console.error('Invalid token:', error.message);
}

// Check if token should be refreshed
import { shouldRefreshToken } from '@/lib/security';

if (shouldRefreshToken(accessToken)) {
  const newToken = refreshAccessToken(refreshToken);
}
```

### Input Validation

```typescript
import {
  registerSchema,
  loginSchema,
  bookingSchema,
  validateInput,
  formatValidationErrors,
} from '@/lib/security';

// Validate registration
const result = registerSchema.safeParse({
  email: 'user@example.com',
  password: 'SecurePass123!',
  firstName: 'John',
  lastName: 'Doe',
  termsAccepted: true,
});

if (!result.success) {
  const errors = formatValidationErrors(result.error);
  // { email: 'Invalid email', password: '...' }
}

// Validate booking
const bookingResult = bookingSchema.safeParse(formData);
```

Available Schemas:
- `registerSchema` - User registration
- `loginSchema` - User login
- `bookingSchema` - Booking creation
- `profileUpdateSchema` - Profile updates
- `emailSchema` - Email validation
- `phoneSchema` - Turkish phone number
- `passwordSchema` - Strong password requirements
- And many more...

### Rate Limiting

```typescript
import {
  loginLimiter,
  userRateLimiter,
  ipRateLimiter,
  createRateLimiter,
  getRateLimitHeaders,
} from '@/lib/security';

// Use pre-configured limiters
const result = loginLimiter.check('user@example.com');

if (!result.allowed) {
  // Too many attempts, tell user to retry after X seconds
  res.status(429);
  res.set(getRateLimitHeaders(result));
  res.json({ error: 'Too many login attempts', retryAfter: result.retryAfter });
}

// Create custom limiter
const apiLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 500,
  onLimitExceeded: (key, result) => {
    console.warn(`Rate limit exceeded for ${key}`);
  },
});

// Check rate limit
const status = apiLimiter.check('user123');
```

Pre-configured Limiters:
- `ipRateLimiter` - 1000 req/min per IP
- `userRateLimiter` - 100 req/min per user
- `loginLimiter` - 5 attempts per 15 minutes
- `passwordResetLimiter` - 3 attempts per hour
- `apiRateLimiter` - 500 req/min
- `bookingLimiter` - 10 bookings per hour
- `searchLimiter` - 300 searches per minute

### Security Headers

```typescript
import {
  securityHeaders,
  corsHeaders,
  cspHeaders,
  applySecurityHeaders,
} from '@/lib/security';

// Get all security headers
const headers = securityHeaders({
  cors: {
    origin: ['https://example.com', 'https://app.example.com'],
    credentials: true,
  },
});

// Apply to Express response
app.use((req, res, next) => {
  applySecurityHeaders(res, {
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(','),
      credentials: true,
    },
  });
  next();
});

// Production headers
import { productionHeaders } from '@/lib/security';

const prodHeaders = productionHeaders('https://example.com');
```

Headers Configured:
- CORS (Cross-Origin Resource Sharing)
- CSP (Content Security Policy)
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options (Clickjacking protection)
- X-Content-Type-Options (MIME sniffing prevention)
- Referrer-Policy
- Permissions-Policy

### CSRF Protection

```typescript
import {
  generateCSRFToken,
  validateCSRFToken,
  csrfMiddleware,
  createCSRFTokenForClient,
} from '@/lib/security';

// Generate token for session
const token = generateCSRFToken('user-session-123');

// Validate on form submission
const result = validateCSRFToken('user-session-123', submittedToken);

if (!result.valid) {
  res.status(403).json({ error: result.error });
}

// Use as middleware
app.use(csrfMiddleware({
  getSessionId: (req) => req.user?.id,
  excludePaths: [/^\/api\/webhook\//, /^\/public\//],
}));

// Send token to client
const { token, headerName } = createCSRFTokenForClient(sessionId);
res.json({ csrfToken: token, csrfHeaderName: headerName });
```

### Password Security

```typescript
import {
  hashPassword,
  verifyPassword,
  validatePasswordStrength,
} from '@/lib/security';

// Hash password on registration
const hashedPassword = await hashPassword(password);
await db.user.create({
  email: user.email,
  password: hashedPassword,
});

// Verify password on login
const isValid = await verifyPassword(providedPassword, storedHash);

if (!isValid) {
  return res.status(401).json({ error: 'Invalid credentials' });
}

// Check password strength before hashing
const strength = validatePasswordStrength(password);
if (!strength.isValid) {
  return res.status(400).json({ errors: strength.errors, score: strength.score });
}
```

## Complete Authentication Flow Example

```typescript
import {
  registerSchema,
  hashPassword,
  generateAccessToken,
  loginLimiter,
  formatValidationErrors,
  createTokenPair,
} from '@/lib/security';

// Registration endpoint
app.post('/api/auth/register', async (req, res) => {
  // 1. Validate input
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      errors: formatValidationErrors(result.error),
    });
  }

  // 2. Hash password
  const hashedPassword = await hashPassword(result.data.password);

  // 3. Create user
  const user = await db.user.create({
    email: result.data.email,
    password: hashedPassword,
    firstName: result.data.firstName,
    lastName: result.data.lastName,
  });

  // 4. Generate tokens
  const { accessToken, refreshToken } = createTokenPair(
    {
      userId: user.id,
      email: user.email,
    },
    user.id
  );

  // 5. Return tokens
  res.json({ accessToken, refreshToken });
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  // 1. Check rate limit
  const limit = loginLimiter.check(req.body.email);
  if (!limit.allowed) {
    return res.status(429).json({
      error: 'Too many login attempts',
      retryAfter: limit.retryAfter,
    });
  }

  // 2. Validate input
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      errors: formatValidationErrors(result.error),
    });
  }

  // 3. Find user
  const user = await db.user.findUnique({ email: result.data.email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // 4. Verify password
  const isValid = await verifyPassword(result.data.password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // 5. Generate tokens
  const { accessToken, refreshToken } = createTokenPair(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    user.id
  );

  // 6. Return tokens
  res.json({ accessToken, refreshToken });
});

// Protected route
app.get('/api/profile', (req, res) => {
  try {
    const payload = verifyAccessToken(req.headers.authorization?.split(' ')[1]);
    const user = db.user.findUnique(payload.userId);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});
```

## Environment Variables

Configure security settings via environment variables:

```bash
# JWT Configuration
JWT_SECRET=your-super-secret-key-change-in-production
JWT_REFRESH_SECRET=your-super-refresh-secret-key-change-in-production
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# CORS Configuration
ALLOWED_ORIGINS=https://example.com,https://app.example.com

# Node Environment
NODE_ENV=production
```

## Module Details

### jwt.ts
- Token generation with custom claims
- Token verification and validation
- Expiry checking and management
- Token pair creation (access + refresh)
- Safe token decoding

**Key Functions:**
- `generateAccessToken(payload, expiresIn?)` - Generate access token
- `generateRefreshToken(payload, expiresIn?)` - Generate refresh token
- `verifyAccessToken(token)` - Verify and decode access token
- `verifyRefreshToken(token)` - Verify and decode refresh token
- `shouldRefreshToken(token, threshold?)` - Check if token needs refresh
- `createTokenPair(accessPayload, userId)` - Create both tokens

### validation.ts
- Email, phone, URL validation
- Password strength validation
- Registration, login schemas
- Booking and profile schemas
- Pagination and sorting schemas
- Input sanitization

**Key Schemas:**
- Authentication: `registerSchema`, `loginSchema`, `passwordResetSchema`
- Business: `bookingSchema`, `profileUpdateSchema`
- Common: `emailSchema`, `phoneSchema`, `passwordSchema`

### rateLimit.ts
- Sliding window algorithm
- In-memory rate limiting
- IP-based and user-based limiting
- Configurable time windows and limits
- Automatic cleanup of old entries

**Key Functions:**
- `createRateLimiter(config)` - Create custom limiter
- `check(key, isSuccess?)` - Check and increment limit
- `getStatus(key)` - Get current status without incrementing
- `reset(key)` - Reset limit for key
- Pre-configured: `loginLimiter`, `ipRateLimiter`, `userRateLimiter`

### headers.ts
- CORS configuration and validation
- CSP (Content Security Policy) headers
- HSTS (Strict Transport Security)
- Security headers application
- Development and production configs

**Key Functions:**
- `securityHeaders(config, isDev?)` - Get all security headers
- `corsHeaders(config)` - Get CORS headers
- `cspHeaders(config, reportOnly?)` - Get CSP headers
- `applySecurityHeaders(res, config, isDev?)` - Apply to response

### csrf.ts
- CSRF token generation
- Token validation with constant-time comparison
- Double-submit cookie pattern
- Middleware protection
- Automatic cleanup of expired tokens

**Key Functions:**
- `generateCSRFToken(sessionId, config?)` - Generate token
- `validateCSRFToken(sessionId, token, config?)` - Validate token
- `csrfMiddleware(options?)` - Express middleware
- `startTokenCleanup(intervalMs?, config?)` - Start auto cleanup

### password.ts
- Password hashing with bcrypt
- Password verification
- Password strength validation
- Common password detection

**Key Functions:**
- `hashPassword(password)` - Hash password
- `verifyPassword(password, hash)` - Verify password
- `validatePasswordStrength(password)` - Check strength

## Testing

```typescript
import {
  generateAccessToken,
  verifyAccessToken,
  loginLimiter,
  registerSchema,
} from '@/lib/security';

describe('Security Module', () => {
  test('should generate and verify JWT token', () => {
    const token = generateAccessToken({ userId: 'test123' });
    const payload = verifyAccessToken(token);
    expect(payload.userId).toBe('test123');
  });

  test('should enforce rate limits', () => {
    const result1 = loginLimiter.check('user@example.com');
    expect(result1.allowed).toBe(true);
    expect(result1.current).toBe(1);

    // Make 4 more attempts
    for (let i = 0; i < 4; i++) {
      loginLimiter.check('user@example.com');
    }

    // 6th attempt should fail (max 5)
    const result6 = loginLimiter.check('user@example.com');
    expect(result6.allowed).toBe(false);

    // Reset for other tests
    loginLimiter.reset('user@example.com');
  });

  test('should validate registration input', () => {
    const result = registerSchema.safeParse({
      email: 'user@example.com',
      password: 'SecurePass123!',
      firstName: 'John',
      lastName: 'Doe',
      termsAccepted: true,
    });

    expect(result.success).toBe(true);
  });
});
```

## Security Best Practices

1. **Environment Variables**: Always use environment variables for secrets
2. **HTTPS Only**: Use HTTPS in production, enable HSTS
3. **Token Expiry**: Use short expiry times for access tokens (15 minutes recommended)
4. **Rate Limiting**: Implement rate limiting on all public endpoints
5. **CSRF Protection**: Enable CSRF on all state-changing operations
6. **Input Validation**: Always validate and sanitize user input
7. **Password Requirements**: Enforce strong passwords (8+ chars, mixed case, numbers, special chars)
8. **Session Management**: Store refresh tokens securely (httpOnly cookies)
9. **Secrets Rotation**: Rotate JWT secrets regularly
10. **Monitoring**: Log and monitor security events

## Troubleshooting

### "Invalid token" error
- Check that token hasn't expired: `isTokenExpired(token)`
- Verify JWT_SECRET matches between generation and verification
- Ensure token format is valid: `isValidTokenFormat(token)`

### Rate limit not working
- Check that you're using the same key for all requests
- Verify rate limiter.check() is being called
- Review configuration: `windowMs`, `maxRequests`

### CSRF validation fails
- Ensure sessionId is consistent for the session
- Check that token is being sent in correct header/body field
- Verify token hasn't expired (configurable, default 1 hour)

### CSP blocking resources
- Use report-only mode for debugging: `cspHeaders(config, true)`
- Add trusted sources to CSP directives
- Use nonces for inline scripts/styles in development

## License

Part of the Escilan Sitesi project.
