#!/usr/bin/env tsx

/**
 * CLI Migration Script
 * 
 * Command-line interface for running database migrations and seeding.
 * Provides commands for migrate, seed, and reset operations.
 * 
 * @module scripts/migrate
 * @category Scripts - Database
 * 
 * Commands:
 * - `npm run db:migrate` - Run pending migrations
 * - `npm run db:seed` - Seed database with demo data
 * - `npm run db:reset` - Reset and rebuild database
 * 
 * @example
 * ```bash
 * # Run migrations
 * npm run db:migrate
 * 
 * # Seed database
 * npm run db:seed
 * 
 * # Reset database
 * npm run db:reset
 * ```
 */

import { runMigrations, resetDatabase } from '../src/lib/migrations';
import { seedDatabase } from '../drizzle/seed/demo-data';

const command = process.argv[2];

async function main() {
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║     Escort Platform - Database Manager        ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  try {
    switch (command) {
      case 'seed':
        console.log('🌱 Seeding database...\n');
        await runMigrations(); // Ensure migrations are up to date first
        await seedDatabase();
        break;

      case 'reset':
        console.log('🔄 Resetting database...\n');
        const readline = await import('readline');
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
        });

        const answer = await new Promise<string>((resolve) => {
          rl.question('⚠️  This will DELETE ALL DATA. Continue? (yes/no): ', resolve);
        });
        rl.close();

        if (answer.toLowerCase() === 'yes') {
          await resetDatabase();
          console.log('\n🌱 Seeding with demo data...\n');
          await seedDatabase();
        } else {
          console.log('\n❌ Reset cancelled.\n');
        }
        break;

      default:
        // Default: run migrations
        await runMigrations();
        break;
    }

    console.log('╔════════════════════════════════════════════════╗');
    console.log('║              ✨ Success! ✨                    ║');
    console.log('╚════════════════════════════════════════════════╝\n');
    process.exit(0);
  } catch (error) {
    console.error('\n╔════════════════════════════════════════════════╗');
    console.error('║              ❌ Error! ❌                      ║');
    console.error('╚════════════════════════════════════════════════╝\n');
    console.error(error);
    process.exit(1);
  }
}

main();
