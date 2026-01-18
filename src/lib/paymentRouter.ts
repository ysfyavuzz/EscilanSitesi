/**
 * Payment Router Module (paymentRouter.ts)
 * 
 * Handles payment-related tRPC procedures for credit purchases and VIP membership management.
 * Integrates with Iyzico payment gateway for secure payment processing.
 * All procedures require authentication.
 * 
 * @module lib/paymentRouter
 * @category Library - API
 * 
 * Features:
 * - Initiate payment for credit packages via Iyzico
 * - Purchase VIP membership plans (monthly, quarterly, yearly)
 * - Balance/credit queries for authenticated users
 * - Transaction logging and history tracking
 * - Payment verification and callback handling
 * 
 * Protected Procedures:
 * - All procedures require user authentication via protectedProcedure
 * 
 * Environment Variables:
 * - IYZICO_API_KEY: Iyzico payment API key
 * - IYZICO_SECRET_KEY: Iyzico secret key
 * - IYZICO_BASE_URL: Iyzico API base URL (sandbox or production)
 * 
 * @example
 * ```typescript
 * import { trpc } from '@/lib/trpc';
 * 
 * // Initiate a credit purchase
 * const paymentMutation = trpc.payments.initiatePurchase.useMutation();
 * paymentMutation.mutate({
 *   packageId: 'credits-100',
 *   amount: 50000, // 500 TL in kuruş
 * });
 * 
 * // Get current balance
 * const { data: balance } = trpc.payments.getBalance.useQuery();
 * ```
 */

import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import * as db from "./db";
import { createIyzicoClient, mockPayment } from "./payment/iyzico";
import { convertToSmallestUnit } from "./payment/utils";

export const paymentRouter = router({
  // Kredi paketi satın alma başlat
  initiatePurchase: protectedProcedure
    .input(z.object({
      packageId: z.string(),
      amount: z.number(), // Amount in smallest unit (kuruş)
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // Check if Iyzico credentials are configured
        const hasIyzicoCredentials = process.env.IYZICO_API_KEY && process.env.IYZICO_SECRET_KEY;
        
        let paymentResponse;
        
        if (hasIyzicoCredentials) {
          // Use real Iyzico integration
          const iyzicoClient = createIyzicoClient();
          paymentResponse = await iyzicoClient.initiatePayment({
            amount: input.amount,
            currency: 'TRY',
            description: input.description || `${input.packageId} paketi satın alımı`,
            userId: ctx.user.id,
            packageId: input.packageId,
            callbackUrl: `${process.env.VITE_APP_URL}/payment/callback`,
          });
        } else {
          // Use mock payment for development
          paymentResponse = await mockPayment({
            amount: input.amount,
            description: input.description || `${input.packageId} paketi satın alımı`,
            userId: ctx.user.id,
            packageId: input.packageId,
          });
        }

        if (!paymentResponse.success) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: paymentResponse.errorMessage || 'Payment initialization failed',
          });
        }

        // Note: Transaction will be created after successful payment via webhook
        // This prevents creating transactions for abandoned payments

        return {
          success: true,
          paymentId: paymentResponse.paymentId,
          checkoutUrl: paymentResponse.checkoutUrl,
          token: paymentResponse.token,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message || 'Payment initialization failed',
        });
      }
    }),

  // VIP Üyelik satın alma
  purchaseVip: protectedProcedure
    .input(z.object({
      plan: z.enum(['monthly', 'quarterly', 'yearly']),
      price: z.number(), // Price in TL (will be converted to kuruş)
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const profile = await db.getEscortProfileByUserId(ctx.user.id);
        if (!profile) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Escort profili bulunamadı' });
        }

        // Convert price to smallest unit (kuruş)
        const amountInKurus = convertToSmallestUnit(input.price);

        // Check if Iyzico credentials are configured
        const hasIyzicoCredentials = process.env.IYZICO_API_KEY && process.env.IYZICO_SECRET_KEY;
        
        let paymentResponse;
        
        if (hasIyzicoCredentials) {
          // Use real Iyzico integration
          const iyzicoClient = createIyzicoClient();
          paymentResponse = await iyzicoClient.initiatePayment({
            amount: amountInKurus,
            currency: 'TRY',
            description: `VIP Üyelik - ${input.plan}`,
            userId: ctx.user.id,
            packageId: `vip-${input.plan}`,
            callbackUrl: `${process.env.VITE_APP_URL}/payment/callback`,
          });
        } else {
          // Use mock payment for development
          paymentResponse = await mockPayment({
            amount: amountInKurus,
            description: `VIP Üyelik - ${input.plan}`,
            userId: ctx.user.id,
            packageId: `vip-${input.plan}`,
          });
        }

        if (!paymentResponse.success) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: paymentResponse.errorMessage || 'Payment initialization failed',
          });
        }

        // VIP activation will happen after successful payment via webhook

        return {
          success: true,
          message: 'Ödeme sayfasına yönlendiriliyorsunuz...',
          paymentId: paymentResponse.paymentId,
          checkoutUrl: paymentResponse.checkoutUrl,
          token: paymentResponse.token,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error.message || 'VIP membership purchase failed',
        });
      }
    }),

  // Bakiye sorgulama
  getBalance: protectedProcedure.query(async ({ ctx }) => {
    const credits = await db.getUserCredits(ctx.user.id);
    return credits || { balance: 0 };
  }),
});
