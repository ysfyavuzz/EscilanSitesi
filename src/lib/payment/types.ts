/**
 * Payment Type Definitions
 * 
 * TypeScript type definitions for payment processing, transactions,
 * and Iyzico payment gateway integration.
 * 
 * @module lib/payment/types
 * @category Library - Payment
 * 
 * Exported Types:
 * - PaymentMethod: Payment method types
 * - PaymentStatus: Transaction status types
 * - IyzicoConfig: Iyzico API configuration
 * - PaymentRequest: Payment initiation request
 * - PaymentResponse: Payment response data
 * - WebhookPayload: Payment webhook data
 * 
 * Features:
 * - Comprehensive payment type safety
 * - Iyzico API types
 * - Transaction tracking types
 * - Webhook payload types
 * 
 * @example
 * ```typescript
 * import type { PaymentRequest, PaymentResponse } from './types';
 * 
 * const payment: PaymentRequest = {
 *   amount: 500,
 *   currency: 'TRY',
 *   description: 'VIP Package',
 *   userId: 123,
 * };
 * ```
 */

/**
 * Payment method types
 */
export type PaymentMethod = 
  | 'credit_card' 
  | 'debit_card' 
  | 'bank_transfer' 
  | 'wallet';

/**
 * Payment transaction status
 */
export type PaymentStatus = 
  | 'pending'     // Waiting for payment
  | 'processing'  // Payment in progress
  | 'success'     // Payment completed successfully
  | 'failed'      // Payment failed
  | 'cancelled'   // Payment cancelled by user
  | 'refunded';   // Payment refunded

/**
 * Currency codes supported
 */
export type CurrencyCode = 'TRY' | 'USD' | 'EUR';

/**
 * Iyzico API configuration
 */
export interface IyzicoConfig {
  apiKey: string;
  secretKey: string;
  baseUrl: string;
  locale?: 'tr' | 'en';
}

/**
 * Payment request data
 */
export interface PaymentRequest {
  /** Amount in smallest currency unit (kuruş for TRY) */
  amount: number;
  /** Currency code */
  currency?: CurrencyCode;
  /** Payment description */
  description: string;
  /** User ID making the payment */
  userId: number;
  /** Package ID being purchased */
  packageId?: string;
  /** Callback URL after payment */
  callbackUrl?: string;
  /** User metadata */
  buyer?: BuyerInfo;
  /** Billing address */
  billingAddress?: AddressInfo;
}

/**
 * Buyer information for Iyzico
 */
export interface BuyerInfo {
  id: string;
  name: string;
  surname: string;
  email: string;
  identityNumber?: string;
  registrationAddress?: string;
  city?: string;
  country?: string;
  ip?: string;
}

/**
 * Address information
 */
export interface AddressInfo {
  contactName: string;
  city: string;
  country: string;
  address: string;
  zipCode?: string;
}

/**
 * Payment response from Iyzico
 */
export interface PaymentResponse {
  /** Payment transaction ID */
  paymentId: string;
  /** Payment token for checkout */
  token?: string;
  /** Checkout page URL */
  checkoutUrl?: string;
  /** Payment status */
  status: PaymentStatus;
  /** Success indicator */
  success: boolean;
  /** Error message if failed */
  errorMessage?: string;
  /** Error code if failed */
  errorCode?: string;
  /** Conversation ID for tracking */
  conversationId?: string;
}

/**
 * Payment completion data
 */
export interface PaymentCompletion {
  paymentId: string;
  status: PaymentStatus;
  paidAmount: number;
  currency: CurrencyCode;
  paymentMethod: PaymentMethod;
  transactionTime: Date;
  userId: number;
}

/**
 * Webhook payload from payment provider
 */
export interface WebhookPayload {
  /** Event type */
  event: 'payment.success' | 'payment.failed' | 'payment.refund';
  /** Payment transaction ID */
  paymentId: string;
  /** Payment status */
  status: PaymentStatus;
  /** Payment amount */
  amount: number;
  /** Currency */
  currency: CurrencyCode;
  /** User ID */
  userId?: number;
  /** Additional metadata */
  metadata?: Record<string, any>;
  /** Timestamp */
  timestamp: number;
  /** Signature for verification */
  signature?: string;
}

/**
 * Credit package definition
 */
export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  currency: CurrencyCode;
  discount?: number;
  popular?: boolean;
}

/**
 * VIP membership plan
 */
export interface VipPlan {
  id: string;
  name: string;
  duration: 'monthly' | 'quarterly' | 'yearly';
  price: number;
  currency: CurrencyCode;
  features: string[];
  discount?: number;
}

/**
 * Transaction record
 */
export interface Transaction {
  id: number;
  userId: number;
  transactionType: 'purchase' | 'usage' | 'refund' | 'bonus';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  description: string;
  paymentMethod?: PaymentMethod;
  paymentId?: string;
  createdAt: Date;
}

/**
 * Iyzico API error response
 */
export interface IyzicoError {
  status: string;
  errorCode: string;
  errorMessage: string;
  errorGroup?: string;
  locale?: string;
  systemTime?: number;
}

/**
 * 3D Secure payment data
 */
export interface ThreeDSecureData {
  enabled: boolean;
  callbackUrl: string;
}
