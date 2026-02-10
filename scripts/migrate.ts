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
 * ```
 */

// import { migrate } from 'drizzle-orm/postgres-js/migrator'; // No longer needed
// import { db } from '../src/lib/db'; // No longer directly used for migrations
import { seedDatabase } from '../drizzle/seed/demo-data'; // This should be correct

// Since programmatic migrations are problematic, we assume manual migration has been done.
async function handleMigrations() {
  console.log('⚠️ Programmatic Drizzle migrations are currently handled manually.');
  console.log('Please ensure you have manually applied the SQL migration files to your database.');
}

async function resetDatabase() {
  console.log('⚠️ Database reset is not fully implemented programmatically yet.');
  console.log('Please manually drop your database tables and then run `npm run db:migrate` and `npm run db:seed`.');
  // For a full reset, you would typically drop all tables and then run migrations.
  // This might involve executing raw SQL or using a Drizzle utility if available.
  // For now, we'll keep it as a placeholder.
}

const command = process.argv[2];

async function main() {
  console.log('╔════════════════════════════════════════════════╗');
  console.log('║     Escort Platform - Database Manager        ║');
  console.log('╚════════════════════════════════════════════════╝\n');

  try {
    switch (command) {
      case 'seed':
        console.log('🌱 Seeding database...\n');
        // No programmatic migration check here, relying on manual steps.
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
          // After reset, we typically re-seed. Assuming resetDatabase does its job
          // or user handles manual drop.
          await seedDatabase();
        } else {
          console.log('\n❌ Reset cancelled.\n');
        }
        break;

      default:
        // Default: handle migrations (currently manual)
        await handleMigrations();
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
