import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';
import { db } from '@/drizzle/db';
import * as schema from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

// 1. tRPC Initialization
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// 2. JWT-based Authentication Middleware
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const authHeader = ctx.req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Yetkilendirme başlığı bulunamadı veya hatalı.',
    });
  }

  const token = authHeader.split(' ')[1];
  if (!process.env.JWT_SECRET) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'JWT Secret anahtarı sunucuda tanımlanmamış.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string; role: schema.Profile['role']; iat: number; exp: number };

    // Find the user in the database to ensure they still exist
    const userProfile = await db.query.profiles.findFirst({
        where: eq(schema.profiles.id, decoded.userId),
    });

    if (!userProfile) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Kullanıcı bulunamadı.' });
    }

    return next({
      ctx: {
        ...ctx,
        user: {
          id: userProfile.id,
          email: userProfile.email,
          role: userProfile.role,
        },
      },
    });
  } catch (error) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Geçersiz veya süresi dolmuş token.',
    });
  }
});

// 3. Admin-specific Middleware
export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Bu kaynağa erişim yetkiniz yok.',
    });
  }
  return next();
});


// 4. Placeholder for Sub-Routers
// We will create these files next and merge them here.
import { authRouter } from './routers/auth.router';
import { escortRouter } from './routers/escort.router';
import { appointmentRouter } from './routers/appointment.router';

// 5. Main Application Router
export const appRouter = router({
  auth: authRouter,
  escort: escortRouter,
  appointment: appointmentRouter,
  // Example: Health check using Drizzle
  health: publicProcedure.query(async ({ ctx }) => {
    try {
      // Drizzle with a simple query to check DB connection
      await ctx.db.select({ id: schema.profiles.id }).from(schema.profiles).limit(1);
      return {
        status: "ok",
        timestamp: new Date().toISOString(),
        database: "connected",
      };
    } catch (error) {
      return {
        status: "error",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),
});

export type AppRouter = typeof appRouter;
