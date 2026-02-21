import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// Use dotenv to load variables for drizzle-kit
dotenv.config();

/**
 * Drizzle Kit Configuration - PostgreSQL (Docker/VPS) Support
 */
export default {
  schema: './src/drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql', // VPS Self-Hosted DB
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgres://nexus_admin:nexus_pass_123@localhost:5432/zuhre_prod',
  },
} satisfies Config;
