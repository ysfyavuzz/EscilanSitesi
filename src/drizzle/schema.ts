/**
 * Drizzle Schema - PostgreSQL Compatible (Docker/VPS)
 *
 * Updated database schema for Escilan Platform
 */

import {
  pgTable,
  text,
  integer,
  real,
  boolean,
  serial,
  timestamp
} from "drizzle-orm/pg-core";
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

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: text("full_name"),
  role: text("role", { enum: ["customer", "escort", "admin"] }).default("customer"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const escortProfiles = pgTable("escort_profiles", {
  id: serial("id").primaryKey(),
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
  isVerifiedByAdmin: boolean("is_verified_by_admin").default(false),
  viewCount: integer("view_count").default(0),
  isVip: boolean("is_vip").default(false),
  isBoosted: boolean("is_boosted").default(false),
  tier: text("tier", { enum: ["free", "basic", "premium", "vip"] }).default("free"),
  lastActive: timestamp("last_active").defaultNow(),
});

// Profiles tablosu (alias olarak escortProfiles'ı kullan)
export const profiles = escortProfiles;

export const customerProfiles = pgTable("customer_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  phoneNumber: text("phone_number"),
  balance: real("balance").default(0),
});

export const escortPhotos = pgTable("escort_photos", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => escortProfiles.id),
  url: text("url").notNull(),
  isPrimary: boolean("is_primary").default(false),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").references(() => users.id),
  escortId: integer("escort_id").references(() => escortProfiles.id),
  date: text("date").notNull(),
  time: text("time").notNull(),
  duration: integer("duration").notNull(),
  status: text("status", { enum: ["pending", "confirmed", "completed", "cancelled"] }).default("pending"),
  price: real("price").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  appointmentId: integer("appointment_id").references(() => appointments.id),
  customerId: integer("customer_id").references(() => users.id),
  escortId: integer("escort_id").references(() => escortProfiles.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  escortId: integer("escort_id").references(() => escortProfiles.id),
  type: text("type", { enum: ["image", "video"] }).notNull(),
  url: text("url").notNull(),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
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
