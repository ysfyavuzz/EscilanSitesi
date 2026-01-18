/**
 * Payment Webhook Handler
 * 
 * Handles webhook callbacks from Iyzico payment gateway.
 * Validates webhook signatures and processes payment events.
 * 
 * @module lib/payment/webhooks
 * @category Library - Payment
 * 
 * Features:
 * - Webhook signature verification
 * - Payment event processing
 * - Automatic credit allocation
 * - Transaction logging
 * - Error handling and retry logic
 * 
 * Webhook Events:
 * - payment.success: Payment completed successfully
 * - payment.failed: Payment failed
 * - payment.refund: Payment refunded
 * 
 * @example
 * ```typescript
 * import { handlePaymentWebhook } from './webhooks';
 * 
 * // In your API endpoint
 * const result = await handlePaymentWebhook(req.body, req.headers);
 * ```
 */

import crypto from 'crypto';
import type { WebhookPayload } from './types';
import * as db from '../db';

/**
 * Webhook handler configuration
 */
interface WebhookConfig {
  secretKey: string;
  allowedIPs?: string[];
}

/**
 * Webhook processing result
 */
interface WebhookResult {
  success: boolean;
  message: string;
  eventType?: string;
  paymentId?: string;
}

/**
 * Verify webhook signature
 * 
 * @param payload - Webhook payload
 * @param signature - Signature from header
 * @param secretKey - Webhook secret key
 * @returns True if signature is valid
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secretKey: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secretKey)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Verify webhook IP address
 * 
 * @param ip - Request IP address
 * @param allowedIPs - List of allowed IPs
 * @returns True if IP is allowed
 */
export function verifyWebhookIP(ip: string, allowedIPs?: string[]): boolean {
  if (!allowedIPs || allowedIPs.length === 0) {
    return true; // Skip IP verification if not configured
  }

  return allowedIPs.includes(ip);
}

/**
 * Handle payment webhook
 * 
 * @param payload - Webhook payload
 * @param headers - Request headers
 * @param config - Webhook configuration
 * @returns Processing result
 */
export async function handlePaymentWebhook(
  payload: WebhookPayload,
  headers: Record<string, string>,
  config?: WebhookConfig
): Promise<WebhookResult> {
  try {
    const secretKey = config?.secretKey || process.env.IYZICO_WEBHOOK_SECRET || '';
    
    // Verify signature if secret key is configured
    if (secretKey && headers['x-iyzico-signature']) {
      const isValid = verifyWebhookSignature(
        JSON.stringify(payload),
        headers['x-iyzico-signature'],
        secretKey
      );

      if (!isValid) {
        return {
          success: false,
          message: 'Invalid webhook signature',
        };
      }
    }

    // Verify IP if configured
    if (config?.allowedIPs && headers['x-forwarded-for']) {
      const ip = headers['x-forwarded-for'].split(',')[0].trim();
      const isAllowed = verifyWebhookIP(ip, config.allowedIPs);

      if (!isAllowed) {
        return {
          success: false,
          message: 'IP address not allowed',
        };
      }
    }

    // Process webhook based on event type
    switch (payload.event) {
      case 'payment.success':
        return await handlePaymentSuccess(payload);

      case 'payment.failed':
        return await handlePaymentFailed(payload);

      case 'payment.refund':
        return await handlePaymentRefund(payload);

      default:
        return {
          success: false,
          message: `Unknown event type: ${payload.event}`,
        };
    }
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    return {
      success: false,
      message: error.message || 'Webhook processing failed',
    };
  }
}

/**
 * Handle successful payment
 * 
 * @param payload - Webhook payload
 * @returns Processing result
 */
async function handlePaymentSuccess(payload: WebhookPayload): Promise<WebhookResult> {
  try {
    if (!payload.userId) {
      throw new Error('User ID not found in webhook payload');
    }

    // Get user's current balance
    const currentBalance = await db.getUserBalance(payload.userId);

    // Create transaction record
    await db.createCreditTransaction({
      userId: payload.userId,
      transactionType: 'purchase',
      amount: payload.amount,
      balanceBefore: currentBalance,
      balanceAfter: currentBalance + payload.amount,
      description: `Credit purchase - ${payload.paymentId}`,
      paymentMethod: 'credit_card',
      paymentId: payload.paymentId,
    });

    // Update user balance
    await db.updateUserBalance(payload.userId, currentBalance + payload.amount);

    console.log(`✅ Payment success: ${payload.paymentId} - User ${payload.userId} - Amount: ${payload.amount}`);

    return {
      success: true,
      message: 'Payment processed successfully',
      eventType: 'payment.success',
      paymentId: payload.paymentId,
    };
  } catch (error: any) {
    console.error('Payment success handling error:', error);
    throw error;
  }
}

/**
 * Handle failed payment
 * 
 * @param payload - Webhook payload
 * @returns Processing result
 */
async function handlePaymentFailed(payload: WebhookPayload): Promise<WebhookResult> {
  try {
    console.log(`❌ Payment failed: ${payload.paymentId} - User ${payload.userId}`);

    // Log failed payment for debugging
    if (payload.userId) {
      await db.createCreditTransaction({
        userId: payload.userId,
        transactionType: 'purchase',
        amount: 0,
        balanceBefore: 0,
        balanceAfter: 0,
        description: `Payment failed - ${payload.paymentId}`,
        paymentMethod: 'credit_card',
        paymentId: payload.paymentId,
      });
    }

    // TODO: Send notification to user about failed payment
    // TODO: Update payment status in database

    return {
      success: true,
      message: 'Payment failure recorded',
      eventType: 'payment.failed',
      paymentId: payload.paymentId,
    };
  } catch (error: any) {
    console.error('Payment failure handling error:', error);
    throw error;
  }
}

/**
 * Handle payment refund
 * 
 * @param payload - Webhook payload
 * @returns Processing result
 */
async function handlePaymentRefund(payload: WebhookPayload): Promise<WebhookResult> {
  try {
    if (!payload.userId) {
      throw new Error('User ID not found in webhook payload');
    }

    // Get user's current balance
    const currentBalance = await db.getUserBalance(payload.userId);

    // Create refund transaction record
    await db.createCreditTransaction({
      userId: payload.userId,
      transactionType: 'refund',
      amount: -payload.amount,
      balanceBefore: currentBalance,
      balanceAfter: currentBalance - payload.amount,
      description: `Refund - ${payload.paymentId}`,
      paymentMethod: 'credit_card',
      paymentId: payload.paymentId,
    });

    // Update user balance (deduct credits)
    await db.updateUserBalance(payload.userId, Math.max(0, currentBalance - payload.amount));

    console.log(`🔄 Payment refund: ${payload.paymentId} - User ${payload.userId} - Amount: ${payload.amount}`);

    return {
      success: true,
      message: 'Refund processed successfully',
      eventType: 'payment.refund',
      paymentId: payload.paymentId,
    };
  } catch (error: any) {
    console.error('Refund handling error:', error);
    throw error;
  }
}

/**
 * Validate webhook payload structure
 * 
 * @param payload - Webhook payload to validate
 * @returns True if valid
 */
export function validateWebhookPayload(payload: any): payload is WebhookPayload {
  return (
    payload &&
    typeof payload === 'object' &&
    typeof payload.event === 'string' &&
    typeof payload.paymentId === 'string' &&
    typeof payload.status === 'string' &&
    typeof payload.amount === 'number' &&
    typeof payload.currency === 'string' &&
    typeof payload.timestamp === 'number'
  );
}

/**
 * Create webhook response
 * 
 * @param result - Webhook processing result
 * @returns HTTP response object
 */
export function createWebhookResponse(result: WebhookResult) {
  return {
    statusCode: result.success ? 200 : 400,
    body: JSON.stringify({
      success: result.success,
      message: result.message,
      eventType: result.eventType,
      paymentId: result.paymentId,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
