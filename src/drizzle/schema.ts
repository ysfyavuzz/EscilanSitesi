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

export const userRoleEnum = ["customer", "escort", "admin", "super_mod", "moderator"] as const;
export const subscriptionTierEnum = ["free", "basic", "premium", "vip"] as const;
export const appointmentStatusEnum = ["pending", "confirmed", "completed", "cancelled"] as const;
export const loyaltyTransactionTypeEnum = ["earn", "spend"] as const;

// ============================================
// TABLES
// ============================================

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: text("full_name"),
  role: text("role", { enum: ["customer", "escort", "admin", "super_mod", "moderator"] }).default("customer"),
  // Phone — unique per user, required after registration
  phoneNumber: text("phone_number").unique(),
  // Social login
  provider: text("provider", { enum: ["email", "google", "apple"] }).default("email"),
  providerId: text("provider_id"),
  // Profile completion flag (set false for social logins until info is filled)
  isProfileComplete: boolean("is_profile_complete").default(false),
  // Terms & Privacy Policy acceptance
  hasAcceptedTerms: boolean("has_accepted_terms").default(false),
  termsAcceptedAt: timestamp("terms_accepted_at"),
  // Chat rules acceptance (shown on first chat attempt)
  hasAcceptedChatRules: boolean("has_accepted_chat_rules").default(false),
  chatRulesAcceptedAt: timestamp("chat_rules_accepted_at"),
  // Gamification
  loyaltyPoints: integer("loyalty_points").default(0),
  experiencePoints: integer("experience_points").default(0),
  userRank: text("user_rank").default("Bronz"),
  isShadowBanned: boolean("is_shadow_banned").default(false),
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
  verificationStatus: text("verification_status", { enum: ["none", "pending_ai", "pending_admin", "approved", "rejected"] }).default("none"),
  verificationPhotoUrl: text("verification_photo_url"),
  visibilityStatus: text("visibility_status", { enum: ["hidden", "public"] }).default("hidden"),
  verifiedAt: timestamp("verified_at"),
  freeTrialEndsAt: timestamp("free_trial_ends_at"),
  hasVerifiedBadge: boolean("has_verified_badge").default(false),
  pendingData: text("pending_data"), // JSON string for unapproved updates
  hasPendingUpdate: boolean("has_pending_update").default(false),
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
  maskedUrl: text("masked_url"),
  isPrimary: boolean("is_primary").default(false),
  isFaceHidden: boolean("is_face_hidden").default(false),
  privacyLevel: text("privacy_level", { enum: ["public", "members", "gold"] }).default("public"),
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
// CHAT TABLES
// ============================================

export const chatConversations = pgTable("chat_conversations", {
  id: serial("id").primaryKey(),
  /** Participants stored as JSON array of user IDs */
  participantIds: text("participant_ids").notNull(),
  /** Disappearing messages TTL in hours (null = never expire) */
  disappearAfterHours: integer("disappear_after_hours"),
  lastMessageAt: timestamp("last_message_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => chatConversations.id),
  senderId: integer("sender_id").references(() => users.id),
  content: text("content").notNull(),
  type: text("type", { enum: ["text", "image", "audio", "video", "location"] }).default("text"),
  mediaUrl: text("media_url"),
  /** Epoch timestamp after which message auto-deletes (null = never) */
  expiresAt: timestamp("expires_at"),
  isRead: boolean("is_read").default(false),
  readAt: timestamp("read_at"),
  /** AI filter flagged this message for admin review */
  isAiFlagged: boolean("is_ai_flagged").default(false),
  aiFlagReason: text("ai_flag_reason"),
  /** Soft delete — message hidden from UI but kept for audit */
  isDeleted: boolean("is_deleted").default(false),
  deletedAt: timestamp("deleted_at"),
  createdAt: timestamp("created_at").defaultNow(),
});


// ============================================
// NEW: COMMUNITY & LOYALTY TABLES
// ============================================

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").references(() => users.id),
  action: text("action").notNull(),
  targetType: text("target_type").notNull(),
  targetId: integer("target_id"),
  previousData: text("previous_data"), // JSON string
  newData: text("new_data"), // JSON string
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const forumCategories = pgTable("forum_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  icon: text("icon"),
  displayOrder: integer("display_order").default(0),
});

export const forumTopics = pgTable("forum_topics", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => forumCategories.id),
  authorId: integer("author_id").references(() => users.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  isSticky: boolean("is_sticky").default(false),
  isLocked: boolean("is_locked").default(false),
  viewCount: integer("view_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id").references(() => forumTopics.id),
  authorId: integer("author_id").references(() => users.id),
  content: text("content").notNull(),
  isAnswer: boolean("is_answer").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const loyaltyTransactions = pgTable("loyalty_transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  amount: integer("amount").notNull(),
  type: text("type", { enum: ["earn", "spend"] }).notNull(),
  description: text("description"),
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

export const forumCategoriesRelations = relations(forumCategories, ({ many }) => ({
  topics: many(forumTopics),
}));

export const forumTopicsRelations = relations(forumTopics, ({ one, many }) => ({
  category: one(forumCategories, {
    fields: [forumTopics.categoryId],
    references: [forumCategories.id],
  }),
  author: one(users, {
    fields: [forumTopics.authorId],
    references: [users.id],
  }),
  posts: many(forumPosts),
}));

export const forumPostsRelations = relations(forumPosts, ({ one }) => ({
  topic: one(forumTopics, {
    fields: [forumPosts.topicId],
    references: [forumTopics.id],
  }),
  author: one(users, {
    fields: [forumPosts.authorId],
    references: [users.id],
  }),
}));

export const loyaltyTransactionsRelations = relations(loyaltyTransactions, ({ one }) => ({
  user: one(users, {
    fields: [loyaltyTransactions.userId],
    references: [users.id],
  }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  admin: one(users, {
    fields: [auditLogs.adminId],
    references: [users.id],
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
