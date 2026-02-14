import type { Config } from 'drizzle-kit';

/**
 * Drizzle Kit Configuration - SQLite / LibSQL
 */
export default {
  schema: './src/drizzle/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: 'file:local.db',
  },
} satisfies Config;
