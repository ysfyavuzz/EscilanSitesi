/**
 * Drizzle Schema
 *
 * Veritabanı şema tanımlamaları (PostgreSQL / Supabase)
 */

import { pgTable, serial, text, integer, boolean, timestamp, foreignKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  openId: text('open_id').notNull().unique(),
  role: text('role').notNull(), // 'customer', 'escort', 'admin'
  email: text('email'),
  passwordHash: text('password_hash'),
  displayName: text('display_name'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const escortProfiles = pgTable('escort_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  displayName: text('display_name').notNull(),
  city: text('city').notNull(),
  district: text('district').notNull(),
  bio: text('bio'),
  age: integer('age'),
  hourlyRate: integer('hourly_rate'),
  isVip: boolean('is_vip').notNull().default(false),
  isVerifiedByAdmin: boolean('is_verified').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const customerProfiles = pgTable('customer_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  preferences: text('preferences'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const escortPhotos = pgTable('escort_photos', {
  id: serial('id').primaryKey(),
  profileId: integer('profile_id').notNull().references(() => escortProfiles.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const conversations = pgTable('conversations', {
  id: serial('id').primaryKey(),
  participant1Id: integer('participant1_id').notNull().references(() => users.id),
  participant2Id: integer('participant2_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  conversationId: integer('conversation_id').notNull().references(() => conversations.id, { onDelete: 'cascade' }),
  senderId: integer('sender_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  readAt: timestamp('read_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

