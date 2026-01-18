# Security Modules Usage Guide

Complete guide to using the comprehensive security utilities in the application.

## Table of Contents

1. [Authentication](#authentication)
2. [Input Validation](#input-validation)
3. [Rate Limiting](#rate-limiting)
4. [Security Headers](#security-headers)
5. [CSRF Protection](#csrf-protection)
6. [Integration Examples](#integration-examples)

---

## Authentication

### Step 1: User Registration

```typescript
import {
  registerSchema,
  formatValidationErrors,
  hashPassword,
  createTokenPair,
} from '@/lib/security';

app.post('/api/auth/register', async (req, res) => {
  try {
    // Validate input
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        errors: formatValidationErrors(result.error),
      });
    }

    // Check if user exists
    const existing = await db.user.findUnique({
      email: result.data.email,
    });
    if (existing) {
      return res.status(409).json({
        error: 'Email already in use',
      });
    }

    // Hash password
    const passwordHash = await hashPassword(result.data.password);

    // Create user
    const user = await db.user.create({
      email: result.data.email,
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      phone: result.data.phone,
      password: passwordHash,
    });

    // Generate tokens
    const { accessToken, refreshToken } = createTokenPair(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      user.id
    );

    // Return tokens
    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});
```

### Step 2: User Login

```typescript
import {
  loginSchema,
  loginLimiter,
  formatValidationErrors,
  verifyPassword,
  createTokenPair,
  getRateLimitHeaders,
} from '@/lib/security';

app.post('/api/auth/login', async (req, res) => {
  // Check rate limit first
  const limit = loginLimiter.check(req.body.email);
  if (!limit.allowed) {
    res.status(429);
    Object.entries(getRateLimitHeaders(limit)).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    return res.json({
      error: 'Too many login attempts',
      retryAfter: limit.retryAfter,
    });
  }

  try {
    // Validate input
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        errors: formatValidationErrors(result.error),
      });
    }

    // Find user
    const user = await db.user.findUnique({
      email: result.data.email,
    });
    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    // Verify password
    const isValid = await verifyPassword(result.data.password, user.password);
    if (!isValid) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = createTokenPair(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      user.id
    );

    // Optionally set secure cookies
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        role: user.role,
      },
      accessToken,
      refreshToken: req.body.rememberMe ? refreshToken : undefined,
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});
```

### Step 3: Token Verification Middleware

```typescript
import {
  verifyAccessToken,
  isTokenExpired,
} from '@/lib/security';

// Middleware to verify token
export function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
}

// Use in protected routes
app.get('/api/profile', authenticateToken, async (req, res) => {
  const user = await db.user.findUnique(req.user.userId);
  res.json(user);
});
```

### Step 4: Token Refresh

```typescript
import {
  verifyRefreshToken,
  generateAccessToken,
} from '@/lib/security';

app.post('/api/auth/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token' });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);

    // Get user data to include in new token
    const user = await db.user.findUnique(payload.userId);

    const newAccessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
});
```

---

## Input Validation

### Validating Booking Input

```typescript
import {
  bookingSchema,
  formatValidationErrors,
} from '@/lib/security';

app.post('/api/bookings', authenticateToken, async (req, res) => {
  // Validate booking input
  const result = bookingSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      errors: formatValidationErrors(result.error),
    });
  }

  const booking = await db.booking.create({
    userId: req.user.userId,
    ...result.data,
  });

  res.json(booking);
});
```

### Validating Profile Update

```typescript
import {
  profileUpdateSchema,
  formatValidationErrors,
} from '@/lib/security';

app.put('/api/profile', authenticateToken, async (req, res) => {
  const result = profileUpdateSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      errors: formatValidationErrors(result.error),
    });
  }

  const updated = await db.user.update(req.user.userId, result.data);
  res.json(updated);
});
```

### Custom Validation

```typescript
import { validateInput, emailSchema } from '@/lib/security';

// Validate email
const emailResult = validateInput(emailSchema, userInput.email);
if (!emailResult.success) {
  console.error('Invalid email:', emailResult.error);
}

// Use the validated data
const email = emailResult.data;
```

---

## Rate Limiting

### Protect Multiple Endpoints

```typescript
import {
  loginLimiter,
  passwordResetLimiter,
  apiRateLimiter,
  getRateLimitHeaders,
} from '@/lib/security';

// Login attempts limited
app.post('/api/auth/login', (req, res, next) => {
  const limit = loginLimiter.check(req.body.email);
  if (!limit.allowed) {
    res.status(429);
    res.set(getRateLimitHeaders(limit));
    return res.json({ error: 'Too many attempts' });
  }
  next();
}, handleLogin);

// Password reset attempts limited
app.post('/api/auth/forgot-password', (req, res, next) => {
  const limit = passwordResetLimiter.check(req.body.email);
  if (!limit.allowed) {
    res.status(429);
    res.set(getRateLimitHeaders(limit));
    return res.json({ error: 'Too many requests' });
  }
  next();
}, handlePasswordReset);

// General API rate limiting
app.use((req, res, next) => {
  const userId = req.user?.id || req.ip;
  const limit = apiRateLimiter.check(userId);
  if (!limit.allowed) {
    res.status(429);
    res.set(getRateLimitHeaders(limit));
    return res.json({ error: 'Rate limit exceeded' });
  }
  next();
});
```

### Custom Rate Limiter

```typescript
import { createRateLimiter } from '@/lib/security';

const bookingLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10,
  onLimitExceeded: (userId, result) => {
    console.warn(`User ${userId} exceeded booking limit`);
    // Could send email warning, etc.
  },
});

app.post('/api/bookings', authenticateToken, (req, res, next) => {
  const limit = bookingLimiter.check(req.user.userId);
  if (!limit.allowed) {
    return res.status(429).json({
      error: 'Too many bookings',
      retryAfter: limit.retryAfter,
    });
  }
  next();
}, createBooking);
```

---

## Security Headers

### Apply to All Routes

```typescript
import {
  securityHeaders,
  applySecurityHeaders,
} from '@/lib/security';

// Middleware to apply security headers to all responses
app.use((req, res, next) => {
  const isDev = process.env.NODE_ENV === 'development';

  applySecurityHeaders(res, {
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    },
  }, isDev);

  next();
});
```

### Production Setup

```typescript
import { productionHeaders } from '@/lib/security';

// Production configuration
app.use((req, res, next) => {
  const headers = productionHeaders([
    'https://example.com',
    'https://www.example.com',
    'https://app.example.com',
  ]);

  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  next();
});
```

### Development Setup

```typescript
import { developmentHeaders } from '@/lib/security';

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    const headers = developmentHeaders('http://localhost:5173');
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    next();
  });
}
```

---

## CSRF Protection

### Protect Form Submissions

```typescript
import {
  csrfMiddleware,
  generateCSRFToken,
  validateCSRFToken,
} from '@/lib/security';

// Apply CSRF middleware to all routes except GET/HEAD/OPTIONS
app.use(csrfMiddleware({
  getSessionId: (req) => req.user?.id || req.sessionID,
  excludePaths: ['/api/webhook/', '/api/public/'],
  excludeMethods: ['GET', 'HEAD', 'OPTIONS'],
}));

// CSRF token generation endpoint
app.get('/api/csrf-token', (req, res) => {
  const sessionId = req.user?.id || req.sessionID;
  const token = generateCSRFToken(sessionId);

  res.json({
    csrfToken: token,
    csrfHeaderName: 'X-CSRF-Token',
  });
});

// Protected POST endpoint (auto-validated by middleware)
app.post('/api/action', (req, res) => {
  // CSRF token is automatically validated by middleware
  res.json({ success: true });
});

// Manual validation if needed
app.post('/api/manual-check', (req, res) => {
  const result = validateCSRFToken(
    req.user.id,
    req.headers['x-csrf-token'] as string
  );

  if (!result.valid) {
    return res.status(403).json({ error: result.error });
  }

  res.json({ success: true });
});
```

### Frontend Usage

```typescript
// Get CSRF token on page load
async function getCSRFToken() {
  const response = await fetch('/api/csrf-token');
  const data = await response.json();
  return data.csrfToken;
}

// Send token with requests
async function submitForm(formData) {
  const csrfToken = await getCSRFToken();

  const response = await fetch('/api/action', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify(formData),
  });

  return response.json();
}
```

---

## Integration Examples

### Complete Express Server Setup

```typescript
import express from 'express';
import {
  applySecurityHeaders,
  securityHeadersMiddleware,
  csrfMiddleware,
  authenticateToken,
} from '@/lib/security';

const app = express();

// ========== Security Setup ==========

// 1. Security headers
app.use(securityHeadersMiddleware({
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(','),
    credentials: true,
  },
}));

// 2. CSRF protection
app.use(csrfMiddleware({
  getSessionId: (req) => req.user?.id,
  excludePaths: ['/api/public/'],
}));

// ========== Authentication Routes ==========

app.post('/api/auth/register', handleRegistration);
app.post('/api/auth/login', handleLogin);
app.post('/api/auth/refresh', handleRefresh);
app.post('/api/auth/logout', handleLogout);

// ========== Protected Routes ==========

// All routes below require authentication
app.use(authenticateToken);

app.get('/api/profile', getProfile);
app.put('/api/profile', updateProfile);

app.post('/api/bookings', createBooking);
app.get('/api/bookings', getBookings);
app.put('/api/bookings/:id', updateBooking);
app.delete('/api/bookings/:id', cancelBooking);

// ========== Error Handling ==========

app.use((error: any, req: any, res: any, next: any) => {
  console.error('Error:', error);

  if (error.status === 403) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (error.status === 429) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }

  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Testing Security Features

```typescript
import {
  generateAccessToken,
  verifyAccessToken,
  loginLimiter,
  registerSchema,
} from '@/lib/security';

describe('Security Features', () => {
  afterEach(() => {
    // Clean up rate limiter
    loginLimiter.resetAll();
  });

  test('JWT token generation and verification', () => {
    const payload = { userId: 'test123', role: 'user' };
    const token = generateAccessToken(payload);

    const verified = verifyAccessToken(token);
    expect(verified.userId).toBe('test123');
    expect(verified.role).toBe('user');
  });

  test('Token expiry validation', () => {
    const token = generateAccessToken({ userId: 'test' }, '1ms');
    // Wait for token to expire
    setTimeout(() => {
      expect(() => verifyAccessToken(token)).toThrow('expired');
    }, 10);
  });

  test('Rate limiting', () => {
    const email = 'test@example.com';

    // First 5 attempts should succeed
    for (let i = 0; i < 5; i++) {
      const result = loginLimiter.check(email);
      expect(result.allowed).toBe(true);
    }

    // 6th should fail
    const result = loginLimiter.check(email);
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  test('Registration validation', () => {
    const result = registerSchema.safeParse({
      email: 'user@example.com',
      password: 'WeakPass1!',
      firstName: 'John',
      lastName: 'Doe',
      termsAccepted: true,
    });

    expect(result.success).toBe(true);
  });
});
```

---

## Environment Configuration

### Development

```bash
# .env.development
JWT_SECRET=dev-secret-key-change-in-production
JWT_REFRESH_SECRET=dev-refresh-secret-change-in-production
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
NODE_ENV=development
```

### Production

```bash
# .env.production
JWT_SECRET=<strong-random-secret>
JWT_REFRESH_SECRET=<strong-random-secret>
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
ALLOWED_ORIGINS=https://example.com,https://app.example.com
NODE_ENV=production
```

---

## Security Checklist

Before deploying to production, verify:

- [ ] JWT secrets are strong and unique
- [ ] HTTPS is enforced with HSTS
- [ ] CORS origins are restricted to specific domains
- [ ] Rate limiting is enabled on all public endpoints
- [ ] CSRF protection middleware is active
- [ ] Password requirements are enforced
- [ ] Tokens have appropriate expiry times
- [ ] Error messages don't leak sensitive information
- [ ] Security headers are properly configured
- [ ] Refresh tokens are stored securely (httpOnly cookies)
- [ ] Rate limiter cleanup is running
- [ ] Logs are monitored for security events
- [ ] Regular security audits are scheduled

---

## Troubleshooting

### Issue: "Invalid token" on refresh
- Verify JWT_SECRET and JWT_REFRESH_SECRET are consistent
- Check token hasn't expired
- Ensure correct secret is used for verification

### Issue: CSRF token validation fails
- Check CSRF middleware is applied before route handlers
- Verify sessionId is consistent across requests
- Ensure token is sent in correct header/body field

### Issue: Rate limiting not working
- Check rate limiter cleanup interval is running
- Verify same key is used for all requests
- Check rate limiter hasn't been reset

### Issue: Security headers not applied
- Verify middleware is before route handlers
- Check header names for typos
- Ensure response object supports setHeader

---

For more information, see [README.md](./src/lib/security/README.md) in the security module directory.
