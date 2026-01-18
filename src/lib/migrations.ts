/**
 * Migration Runner Utility
 * 
 * Provides utilities to run database migrations programmatically.
 * Manages migration state and executes SQL migration files in order.
 * 
 * @module lib/migrations
 * @category Library - Database
 * 
 * Features:
 * - Execute migration files in order
 * - Track applied migrations
 * - Rollback support (limited by SQLite)
 * - Migration state management
 * 
 * @example
 * ```typescript
 * import { runMigrations } from '@/lib/migrations';
 * 
 * // Run all pending migrations
 * await runMigrations();
 * ```
 */

import { createClient } from '@libsql/client';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

/**
 * Migration file interface
 */
interface MigrationFile {
  name: string;
  order: number;
  sql: string;
}

/**
 * Create migrations tracking table
 */
async function createMigrationsTable(client: any) {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      applied_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    )
  `);
}

/**
 * Get list of applied migrations
 */
async function getAppliedMigrations(client: any): Promise<string[]> {
  const result = await client.execute('SELECT name FROM _migrations ORDER BY name');
  return result.rows.map((row: any) => row.name);
}

/**
 * Read migration files from directory
 */
async function readMigrationFiles(migrationsDir: string): Promise<MigrationFile[]> {
  const files = await readdir(migrationsDir);
  const sqlFiles = files.filter(f => f.endsWith('.sql'));
  
  const migrations: MigrationFile[] = [];
  
  for (const file of sqlFiles) {
    const match = file.match(/^(\d+)_/);
    if (!match) {
      console.warn(`⚠️  Skipping invalid migration file: ${file}`);
      continue;
    }
    
    const order = parseInt(match[1], 10);
    const sql = await readFile(join(migrationsDir, file), 'utf-8');
    
    migrations.push({
      name: file,
      order,
      sql,
    });
  }
  
  return migrations.sort((a, b) => a.order - b.order);
}

/**
 * Apply a single migration
 */
async function applyMigration(client: any, migration: MigrationFile) {
  console.log(`  ↳ Applying migration: ${migration.name}`);
  
  // Execute migration SQL
  await client.execute(migration.sql);
  
  // Record migration as applied
  await client.execute({
    sql: 'INSERT INTO _migrations (name) VALUES (?)',
    args: [migration.name],
  });
  
  console.log(`  ✓ Migration applied: ${migration.name}`);
}

/**
 * Run all pending migrations
 */
export async function runMigrations(migrationsDir?: string): Promise<void> {
  const dir = migrationsDir || join(process.cwd(), 'drizzle', 'migrations');
  
  console.log('🚀 Running database migrations...\n');
  
  // Initialize database connection
  const client = createClient({
    url: process.env.DATABASE_URL || 'file:local.db',
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  
  try {
    // Create migrations tracking table
    await createMigrationsTable(client);
    
    // Get applied migrations
    const applied = await getAppliedMigrations(client);
    console.log(`📋 Applied migrations: ${applied.length}`);
    
    // Read migration files
    const migrations = await readMigrationFiles(dir);
    console.log(`📂 Total migration files: ${migrations.length}\n`);
    
    // Filter pending migrations
    const pending = migrations.filter(m => !applied.includes(m.name));
    
    if (pending.length === 0) {
      console.log('✨ No pending migrations. Database is up to date!\n');
      return;
    }
    
    console.log(`⏳ Pending migrations: ${pending.length}\n`);
    
    // Apply pending migrations
    for (const migration of pending) {
      await applyMigration(client, migration);
    }
    
    console.log('\n✅ All migrations completed successfully!\n');
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    throw error;
  } finally {
    client.close();
  }
}

/**
 * Reset database (drop all tables and re-run migrations)
 */
export async function resetDatabase(migrationsDir?: string): Promise<void> {
  const dir = migrationsDir || join(process.cwd(), 'drizzle', 'migrations');
  
  console.log('🔄 Resetting database...\n');
  
  // Initialize database connection
  const client = createClient({
    url: process.env.DATABASE_URL || 'file:local.db',
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });
  
  try {
    // Get all tables
    const result = await client.execute(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `);
    
    console.log(`🗑️  Dropping ${result.rows.length} tables...\n`);
    
    // Drop all tables
    for (const row of result.rows) {
      const tableName = row.name;
      console.log(`  ↳ Dropping table: ${tableName}`);
      await client.execute(`DROP TABLE IF EXISTS ${tableName}`);
    }
    
    console.log('\n✓ All tables dropped\n');
    
  } catch (error) {
    console.error('❌ Reset failed:', error);
    throw error;
  } finally {
    client.close();
  }
  
  // Run migrations
  await runMigrations(dir);
}
