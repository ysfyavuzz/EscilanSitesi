/**
 * Drizzle Kit Configuration
 * 
 * Configuration for Drizzle ORM migrations and schema management.
 * Used for generating migrations and managing database schema.
 * 
 * @see {@link https://orm.drizzle.team/kit-docs/config-reference}
 */

import type { Config } from 'drizzle-kit';

export default {
  schema: './src/drizzle/schema.ts', // Fixed: was './src/schema.ts'
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
    authToken: process.env.DATABASE_AUTH_TOKEN || '',
  },
} satisfies Config;
