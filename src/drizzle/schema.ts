/**
 * Drizzle Schema - SQLite Compatible (local.db)
 *
 * Updated database schema for Escilan Platform
 */

import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

// ============================================
// ENUMS
// ============================================

export const userRoleEnum = ["customer", "escort", "admin"] as const;
export const subscriptionTierEnum = ["free", "basic", "premium", "vip"] as const;
export const appointmentStatusEnum = ["pending", "confirmed", "completed", "cancelled"] as const;

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
  displayName: text("display_name"),
  slug: text("slug").unique(),
  city: text("city").notNull(),
  district: text("district"),
  age: integer("age"),
  bio: text("bio"),
  biography: text("biography"),
  slogan: text("slogan"),
  coverImage: text("cover_image"),
  thumbnailVideo: text("thumbnail_video"),
  gallery: text("gallery"),
  mediaPrivacySettings: text("media_privacy_settings"),
  isVerifiedByAdmin: integer("is_verified_by_admin", { mode: 'boolean' }).default(false),
  viewCount: integer("view_count").default(0),
  isVip: integer("is_vip", { mode: 'boolean' }).default(false),
  isBoosted: integer("is_boosted", { mode: 'boolean' }).default(false),
  tier: text("tier", { enum: subscriptionTierEnum }).default("free"),
  lastActive: text("last_active").default(sql`CURRENT_TIMESTAMP`),
});

// Profiles tablosu (alias olarak escortProfiles'ı kullan)
export const profiles = escortProfiles;

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

export const appointments = sqliteTable("appointments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerId: integer("customer_id").references(() => users.id),
  escortId: integer("escort_id").references(() => escortProfiles.id),
  date: text("date").notNull(),
  time: text("time").notNull(),
  duration: integer("duration").notNull(),
  status: text("status", { enum: appointmentStatusEnum }).default("pending"),
  price: real("price").notNull(),
  notes: text("notes"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const reviews = sqliteTable("reviews", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  appointmentId: integer("appointment_id").references(() => appointments.id),
  customerId: integer("customer_id").references(() => users.id),
  escortId: integer("escort_id").references(() => escortProfiles.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const media = sqliteTable("media", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  escortId: integer("escort_id").references(() => escortProfiles.id),
  type: text("type", { enum: ["image", "video"] }).notNull(),
  url: text("url").notNull(),
  isApproved: integer("is_approved", { mode: 'boolean' }).default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
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
  appointmentsAsCustomer: many(appointments, { relationName: "customerAppointments" }),
  reviewsAsCustomer: many(reviews, { relationName: "customerReviews" }),
}));

export const escortProfilesRelations = relations(escortProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [escortProfiles.userId],
    references: [users.id],
  }),
  photos: many(escortPhotos),
  appointments: many(appointments, { relationName: "escortAppointments" }),
  reviews: many(reviews, { relationName: "escortReviews" }),
  media: many(media),
}));

export const escortPhotosRelations = relations(escortPhotos, ({ one }) => ({
  profile: one(escortProfiles, {
    fields: [escortPhotos.profileId],
    references: [escortProfiles.id],
  }),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  customer: one(users, {
    fields: [appointments.customerId],
    references: [users.id],
  }),
  escort: one(escortProfiles, {
    fields: [appointments.escortId],
    references: [escortProfiles.id],
  }),
  review: one(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  appointment: one(appointments, {
    fields: [reviews.appointmentId],
    references: [appointments.id],
  }),
  customer: one(users, {
    fields: [reviews.customerId],
    references: [users.id],
  }),
  escort: one(escortProfiles, {
    fields: [reviews.escortId],
    references: [escortProfiles.id],
  }),
}));

export const mediaRelations = relations(media, ({ one }) => ({
  escort: one(escortProfiles, {
    fields: [media.escortId],
    references: [escortProfiles.id],
  }),
}));

// ============================================
// TYPES
// ============================================

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type EscortProfile = typeof escortProfiles.$inferSelect;
export type NewEscortProfile = typeof escortProfiles.$inferInsert;

export type Profile = EscortProfile;

export type CustomerProfile = typeof customerProfiles.$inferSelect;
export type NewCustomerProfile = typeof customerProfiles.$inferInsert;

export type EscortPhoto = typeof escortPhotos.$inferSelect;
export type NewEscortPhoto = typeof escortPhotos.$inferInsert;

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;

export type Media = typeof media.$inferSelect;
export type NewMedia = typeof media.$inferInsert;
