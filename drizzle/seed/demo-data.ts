/**
 * Demo/Test Data Seeder
 * 
 * Provides sample data for development and testing purposes.
 * Seeds the database with realistic demo users, escorts, bookings, and messages.
 * 
 * @module drizzle/seed/demo-data
 * @category Database - Seeding
 * 
 * Features:
 * - Demo users (clients, escorts, admin)
 * - Sample escort profiles with photos
 * - Mock bookings and reviews
 * - Sample conversations and messages
 * - Test transactions
 * 
 * Usage:
 * ```bash
 * npm run db:seed
 * ```
 * 
 * @example
 * ```typescript
 * import { seedDatabase } from './drizzle/seed/demo-data';
 * await seedDatabase();
 * ```
 */

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '../../src/drizzle/schema';

/**
 * Demo users data
 */
const demoUsers = [
  {
    openId: 'admin-001',
    role: 'admin',
    email: 'admin@escortplatform.com',
    displayName: 'Platform Admin',
  },
  {
    openId: 'client-001',
    role: 'client',
    email: 'client1@example.com',
    displayName: 'Ahmet Yılmaz',
  },
  {
    openId: 'client-002',
    role: 'client',
    email: 'client2@example.com',
    displayName: 'Mehmet Demir',
  },
  {
    openId: 'escort-001',
    role: 'escort',
    email: 'escort1@example.com',
    displayName: 'Ayşe',
  },
  {
    openId: 'escort-002',
    role: 'escort',
    email: 'escort2@example.com',
    displayName: 'Elif',
  },
  {
    openId: 'escort-003',
    role: 'escort',
    email: 'escort3@example.com',
    displayName: 'Zeynep',
  },
];

/**
 * Demo escort profiles
 */
const demoEscortProfiles = [
  {
    userId: 4, // escort-001
    displayName: 'Ayşe - Profesyonel Masaj',
    city: 'Istanbul',
    district: 'Beşiktaş',
    bio: 'Profesyonel masaj hizmeti sunuyorum. 5 yıllık deneyim.',
    age: 28,
    hourlyRate: 500,
    isVip: true,
    isVerifiedByAdmin: true,
  },
  {
    userId: 5, // escort-002
    displayName: 'Elif - VIP Hizmet',
    city: 'Istanbul',
    district: 'Kadıköy',
    bio: 'VIP müşteriler için özel hizmet.',
    age: 25,
    hourlyRate: 750,
    isVip: true,
    isVerifiedByAdmin: true,
  },
  {
    userId: 6, // escort-003
    displayName: 'Zeynep - Klasik Masaj',
    city: 'Ankara',
    district: 'Çankaya',
    bio: 'Rahatlatıcı klasik masaj hizmeti.',
    age: 30,
    hourlyRate: 400,
    isVip: false,
    isVerifiedByAdmin: true,
  },
];

/**
 * Demo escort photos
 */
const demoPhotos = [
  { profileId: 1, url: 'https://picsum.photos/400/600?random=1', order: 1 },
  { profileId: 1, url: 'https://picsum.photos/400/600?random=2', order: 2 },
  { profileId: 2, url: 'https://picsum.photos/400/600?random=3', order: 1 },
  { profileId: 2, url: 'https://picsum.photos/400/600?random=4', order: 2 },
  { profileId: 3, url: 'https://picsum.photos/400/600?random=5', order: 1 },
];

/**
 * Seed the database with demo data
 */
export async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  // Initialize database connection
  const client = createClient({
    url: process.env.DATABASE_URL || 'file:local.db',
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

  const db = drizzle(client, { schema });

  try {
    // Clear existing data (in reverse order of dependencies)
    console.log('🗑️  Clearing existing data...');
    await client.execute('DELETE FROM notifications');
    await client.execute('DELETE FROM vip_memberships');
    await client.execute('DELETE FROM transactions');
    await client.execute('DELETE FROM favorites');
    await client.execute('DELETE FROM reviews');
    await client.execute('DELETE FROM bookings');
    await client.execute('DELETE FROM messages');
    await client.execute('DELETE FROM conversations');
    await client.execute('DELETE FROM escort_photos');
    await client.execute('DELETE FROM escort_profiles');
    await client.execute('DELETE FROM users');

    // Insert users
    console.log('👥 Inserting demo users...');
    for (const user of demoUsers) {
      await client.execute({
        sql: 'INSERT INTO users (open_id, role, email, display_name) VALUES (?, ?, ?, ?)',
        args: [user.openId, user.role, user.email || null, user.displayName || null],
      });
    }

    // Insert escort profiles
    console.log('💼 Inserting escort profiles...');
    for (const profile of demoEscortProfiles) {
      await client.execute({
        sql: `INSERT INTO escort_profiles 
          (user_id, display_name, city, district, bio, age, hourly_rate, is_vip, is_verified) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          profile.userId,
          profile.displayName,
          profile.city,
          profile.district,
          profile.bio || null,
          profile.age || null,
          profile.hourlyRate || null,
          profile.isVip ? 1 : 0,
          profile.isVerifiedByAdmin ? 1 : 0,
        ],
      });
    }

    // Insert photos
    console.log('📸 Inserting demo photos...');
    for (const photo of demoPhotos) {
      await client.execute({
        sql: 'INSERT INTO escort_photos (profile_id, url, "order") VALUES (?, ?, ?)',
        args: [photo.profileId, photo.url, photo.order],
      });
    }

    // Insert a demo conversation
    console.log('💬 Inserting demo conversation...');
    await client.execute({
      sql: 'INSERT INTO conversations (participant1_id, participant2_id, created_at) VALUES (?, ?, ?)',
      args: [2, 4, Math.floor(Date.now() / 1000)],
    });

    // Insert demo messages
    console.log('✉️  Inserting demo messages...');
    const messages = [
      { conversationId: 1, senderId: 2, content: 'Merhaba, randevu almak istiyorum.' },
      { conversationId: 1, senderId: 4, content: 'Merhaba! Tabii ki, hangi tarih uygun?' },
      { conversationId: 1, senderId: 2, content: 'Yarın saat 14:00 uygun mu?' },
    ];

    for (const msg of messages) {
      await client.execute({
        sql: 'INSERT INTO messages (conversation_id, sender_id, content, created_at) VALUES (?, ?, ?, ?)',
        args: [msg.conversationId, msg.senderId, msg.content, Math.floor(Date.now() / 1000)],
      });
    }

    // Insert a demo booking
    console.log('📅 Inserting demo booking...');
    const tomorrow = Math.floor(Date.now() / 1000) + 86400;
    await client.execute({
      sql: 'INSERT INTO bookings (client_id, escort_id, start_time, end_time, status, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
      args: [2, 1, tomorrow, tomorrow + 3600, 'confirmed', 500],
    });

    // Insert demo favorites
    console.log('⭐ Inserting demo favorites...');
    await client.execute({
      sql: 'INSERT INTO favorites (user_id, escort_id) VALUES (?, ?)',
      args: [2, 1],
    });
    await client.execute({
      sql: 'INSERT INTO favorites (user_id, escort_id) VALUES (?, ?)',
      args: [2, 2],
    });

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`  - ${demoUsers.length} users created`);
    console.log(`  - ${demoEscortProfiles.length} escort profiles created`);
    console.log(`  - ${demoPhotos.length} photos added`);
    console.log(`  - 1 conversation with 3 messages`);
    console.log(`  - 1 demo booking`);
    console.log(`  - 2 favorites`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    client.close();
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
