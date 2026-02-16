import { router, publicProcedure } from '../router';
import { z } from 'zod';
import { db } from '@/drizzle/db';
import * as schema from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authRouter = router({
  /**
   * User Registration
   */
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email('Geçersiz e-posta adresi.'),
        password: z.string().min(8, 'Şifre en az 8 karakter olmalıdır.'),
        role: z.enum(schema.userRoleEnum).default('customer'),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password, role } = input;

      // Check if user already exists
      const existingUser = await db.query.users.findFirst({
        where: eq(schema.users.email, email),
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Bu e-posta adresi zaten kullanımda.',
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new user
      const newUser = await db.insert(schema.users).values({
        email,
        passwordHash: hashedPassword,
        role,
      }).returning({ id: schema.users.id, email: schema.users.email });
      
      return {
        status: 'success',
        user: newUser[0],
      };
    }),

  /**
   * User Login
   */
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;

      // Find user
      const user = await db.query.users.findFirst({
          where: eq(schema.users.email, email),
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'E-posta veya şifre hatalı.',
        });
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      
      if (!isPasswordValid) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'E-posta veya şifre hatalı.',
        });
      }

      // Generate JWT
      if (!process.env.JWT_SECRET) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'JWT Secret anahtarı tanımlanmamış.',
        });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d', // Token validity period
        }
      );

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    }),
});

export type AuthRouter = typeof authRouter;
