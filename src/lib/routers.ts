import { COOKIE_NAME, getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { paymentRouter } from "./paymentRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import * as database from "./db";
import bcrypt from "bcryptjs";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

// Escort-only procedure
const escortProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'escort' && ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Escort access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  payments: paymentRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    register: publicProcedure
      .input(z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string(),
        role: z.enum(['user', 'escort']),
      }))
      .mutation(async ({ input }) => {
        const passwordHash = await bcrypt.hash(input.password, 10);
        const [newUser] = await (database.db.insert(database.users) as any).values({
          email: input.email,
          passwordHash,
          openId: `local-${Date.now()}`,
          role: input.role,
          displayName: input.name,
        }).returning();

        if (!newUser) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });

        if (input.role === 'escort') {
          await database.db.insert(database.escortProfiles).values({
            userId: newUser.id,
            displayName: input.name,
            city: 'Belirtilmedi',
            district: 'Belirtilmedi',
          });
        } else {
          await database.db.insert(database.customerProfiles).values({
            userId: newUser.id,
          });
        }
        return { success: true, user: newUser };
      }),
    login: publicProcedure
      .input(z.object({ email: z.string().email(), password: z.string() }))
      .mutation(async ({ input }) => {
        const [user] = await database.db.select().from(database.users).where(eq(database.users.email, input.email)).limit(1);
        if (!user) throw new TRPCError({ code: 'NOT_FOUND' });
        
        const isPasswordMatch = await bcrypt.compare(input.password, user.passwordHash || '');
        if (!isPasswordMatch) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Hatalı şifre' });
        
        return { success: true, user };
      }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions();
      ctx.res?.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  catalog: router({
    list: publicProcedure.query(async () => {
      return await database.getAllApprovedEscorts();
    }),
    getProfile: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const profile = await database.getEscortProfileById(input.id);
        if (!profile) throw new TRPCError({ code: 'NOT_FOUND' });
        const photos = await database.getEscortPhotos(input.id);
        return { ...profile, photos };
      }),
  }),

  appointments: router({
    getUserAppointments: protectedProcedure.query(async ({ ctx }) => {
      return await database.getAppointmentsByUserId(ctx.user.id);
    }),
    create: protectedProcedure
      .input(z.object({ escortId: z.number(), date: z.string(), details: z.string().optional() }))
      .mutation(async ({ input, ctx }) => {
        return await database.createAppointment({ ...input, customerId: ctx.user.id });
      }),
  }),

  admin: router({
    getDashboardStats: adminProcedure.query(async () => {
      return await database.getDashboardStats();
    }),
    getPendingProfiles: adminProcedure.query(async () => {
      return await database.getPendingEscorts();
    }),
    updateProfileStatus: adminProcedure
      .input(z.object({ profileId: z.number(), status: z.enum(['approved', 'rejected', 'suspended']) }))
      .mutation(async ({ input }) => {
        return await database.updateEscortStatus(input.profileId, input.status);
      }),
    getAllUsers: adminProcedure.query(async () => {
      return await database.getAllUsers();
    }),
  }),
});

export type AppRouter = typeof appRouter;