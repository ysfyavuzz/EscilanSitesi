/**
 * Password Security Module
 * 
 * Provides password hashing and verification utilities using bcrypt.
 * 
 * @module lib/security/password
 * @category Library - Security
 */

import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  score: number;
}

export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  maxLength: 128,
  requireLowercase: true,
  requireUppercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  specialCharsPattern: /[!@#$%^&*(),.?":{}|<>]/,
};

const COMMON_PASSWORDS = [
  'password', '123456', '12345678', 'qwerty', 'abc123',
];

export async function hashPassword(password: string): Promise<string> {
  if (!password) throw new Error('Password cannot be empty');
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!password || !hash) return false;
  return await bcrypt.compare(password, hash);
}

export function validatePasswordStrength(password: string): PasswordValidationResult {
  const errors: string[] = [];
  let score = 0;

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(`Minimum ${PASSWORD_REQUIREMENTS.minLength} characters required`);
  } else score++;

  if (!/[a-z]/.test(password)) errors.push('Lowercase letter required');
  else score++;

  if (!/[A-Z]/.test(password)) errors.push('Uppercase letter required');
  else score++;

  if (!/\d/.test(password)) errors.push('Number required');
  else score++;

  if (!PASSWORD_REQUIREMENTS.specialCharsPattern.test(password)) {
    errors.push('Special character required');
  } else score++;

  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    errors.push('Password too common');
    score = 0;
  }

  return { isValid: errors.length === 0, errors, score };
}
