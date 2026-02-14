/**
 * Drizzle Schema - SQLite Compatible (local.db)
 *
 * Updated database schema for Escilan Platform
 */

import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

// ============================================
// TABLES
// ============================================

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: text("full_name"),
  role: text("role", { enum: ["customer", "escort", "admin"] }).default("customer"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const escortProfiles = sqliteTable("escort_profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  stageName: text("stage_name").notNull(),
  city: text("city").notNull(),
  bio: text("bio"),
  isVerifiedByAdmin: integer("is_verified_by_admin", { mode: 'boolean' }).default(false),
  viewCount: integer("view_count").default(0),
  isVip: integer("is_vip", { mode: 'boolean' }).default(false),
  lastActive: text("last_active").default(sql`CURRENT_TIMESTAMP`),
});

export const customerProfiles = sqliteTable("customer_profiles", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").references(() => users.id),
  phoneNumber: text("phone_number"),
  balance: real("balance").default(0),
});

export const escortPhotos = sqliteTable("escort_photos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  profileId: integer("profile_id").references(() => escortProfiles.id),
  url: text("url").notNull(),
  isPrimary: integer("is_primary", { mode: 'boolean' }).default(false),
});

// ============================================
// RELATIONS
// ============================================

export const usersRelations = relations(users, ({ one, many }) => ({
  escortProfile: one(escortProfiles, {
    fields: [users.id],
    references: [escortProfiles.userId],
  }),
  customerProfile: one(customerProfiles, {
    fields: [users.id],
    references: [customerProfiles.userId],
  }),
}));

export const escortProfilesRelations = relations(escortProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [escortProfiles.userId],
    references: [users.id],
  }),
  photos: many(escortPhotos),
}));

export const escortPhotosRelations = relations(escortPhotos, ({ one }) => ({
  profile: one(escortProfiles, {
    fields: [escortPhotos.profileId],
    references: [escortProfiles.id],
  }),
}));
