/**
 * Drizzle Schema - Supabase Compatible
 *
 * Complete database schema for Escilan Platform
 * Compatible with Supabase PostgreSQL and Row Level Security (RLS)
 *
 * @module drizzle/schema
 * @category Database
 */

import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
  varchar,
  numeric,
  index,
  relations,
} from "drizzle-orm/pg-core";

// ============================================
// ENUMS
// ============================================

export const userRoleEnum = pgEnum("user_role", [
  "customer",
  "escort",
  "admin",
]);
export const privacyLevelEnum = pgEnum("privacy_level", [
  "full",
  "partial",
  "hidden",
]);
export const subscriptionTierEnum = pgEnum("subscription_tier", [
  "standard",
  "gold",
  "diamond",
  "elite",
]);
export const verificationStatusEnum = pgEnum("verification_status", [
  "unverified",
  "pending",
  "verified",
  "rejected",
]);
export const approvalStatusEnum = pgEnum("approval_status", [
  "approved",
  "pending",
  "rejected",
]);
export const appointmentStatusEnum = pgEnum("appointment_status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "no_show",
]);
export const gridSpanEnum = pgEnum("grid_span", [
  "1x1",
  "2x1",
  "2x2",
  "4x1",
  "6x1",
]);

// ============================================
// CORE TABLES
// ============================================

/**
 * Profiles Table
 * Synced with Supabase auth.users via trigger
 * Contains user metadata and profile information
 */
export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey(), // Same as auth.users.id
    email: text("email").notNull().unique(),
    password: text("password").notNull(), // Güvenli hash olarak saklanacak
    name: text("name"),
    role: userRoleEnum("role").notNull().default("customer"),
    avatar: text("avatar"),

    // Verification
    verified: boolean("verified").notNull().default(false),
    emailConfirmed: boolean("email_confirmed").notNull().default(false),

    // Super Admin
    isSuperAdmin: boolean("is_super_admin").notNull().default(false),
    permissions: jsonb("permissions"), // AdminPermissions object

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    emailIdx: index("profiles_email_idx").on(table.email),
    roleIdx: index("profiles_role_idx").on(table.role),
  }),
);

/**
 * Escort Profiles Table
 * Extended profile data for escorts
 */
export const escortProfiles = pgTable(
  "escort_profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),

    // Basic Info
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    displayName: text("display_name").notNull(),
    age: integer("age"),
    bio: text("bio"),
    slogan: text("slogan"),

    // Location
    city: text("city").notNull(),
    district: text("district"),

    // Privacy
    privacyLevel: privacyLevelEnum("privacy_level")
      .notNull()
      .default("partial"),

    // Physical Attributes
    height: integer("height"), // cm
    weight: integer("weight"), // kg
    eyeColor: text("eye_color"),
    hairColor: text("hair_color"),

    // Services & Languages
    services: jsonb("services").notNull().default([]), // string[]
    languages: jsonb("languages").notNull().default([]), // string[]

    // Media
    coverImage: text("cover_image"),
    thumbnailVideo: text("thumbnail_video"),
    gallery: jsonb("gallery").default([]), // { id, url, type, order }[]

    // Pricing
    hourlyRate: numeric("hourly_rate", { precision: 10, scale: 2 }),
    dailyRate: numeric("daily_rate", { precision: 10, scale: 2 }),
    currency: varchar("currency", { length: 3 }).notNull().default("TRY"),

    // Subscription & Features
    tier: subscriptionTierEnum("tier").notNull().default("standard"),
    verificationStatus: verificationStatusEnum("verification_status")
      .notNull()
      .default("unverified"),
    isBoosted: boolean("is_boosted").notNull().default(false),
    gridSpan: gridSpanEnum("grid_span").notNull().default("1x1"),

    // Contact (controlled by privacy settings)
    whatsapp: text("whatsapp"),
    phone: text("phone"),

    // Statistics
    rating: numeric("rating", { precision: 3, scale: 2 })
      .notNull()
      .default("0"),
    reviewCount: integer("review_count").notNull().default(0),
    viewCount: integer("view_count").notNull().default(0),

    // Pending Changes (staging area)
    pendingChanges: jsonb("pending_changes"), // Partial<EscortProfile>

    // Media Privacy Settings
    mediaPrivacySettings: jsonb("media_privacy_settings").default({
      faceMaskingEnabled: false,
      blurBackground: false,
      customMaskId: null,
      brightnessAdjustment: 0,
      contrastAdjustment: 0,
    }),

    // Availability
    availability: jsonb("availability").default([]), // AvailabilitySlot[]

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    userIdIdx: index("escort_profiles_user_id_idx").on(table.userId),
    slugIdx: index("escort_profiles_slug_idx").on(table.slug),
    cityIdx: index("escort_profiles_city_idx").on(table.city),
    tierIdx: index("escort_profiles_tier_idx").on(table.tier),
    isBoostedIdx: index("escort_profiles_is_boosted_idx").on(table.isBoosted),
    verificationStatusIdx: index("escort_profiles_verification_status_idx").on(
      table.verificationStatus,
    ),
  }),
);

/**
 * Customer Profiles Table
 * Extended profile data for customers
 */
export const customerProfiles = pgTable(
  "customer_profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),

    // Basic Info
    displayName: text("display_name"),

    // Membership
    membership: subscriptionTierEnum("membership")
      .notNull()
      .default("standard"),

    // Preferences
    preferences: jsonb("preferences").default({}), // Search preferences, saved filters

    // Favorites
    favoriteEscorts: jsonb("favorite_escorts").default([]), // UUID[]

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    userIdIdx: index("customer_profiles_user_id_idx").on(table.userId),
  }),
);

// ============================================
// MEDIA TABLES
// ============================================

/**
 * Media Items Table
 * Stores all uploaded media with approval status
 */
export const mediaItems = pgTable(
  "media_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    escortProfileId: uuid("escort_profile_id")
      .notNull()
      .references(() => escortProfiles.id, { onDelete: "cascade" }),

    // Media Info
    originalUrl: text("original_url").notNull(),
    processedUrl: text("processed_url"), // After AI processing
    type: text("type").notNull(), // 'image' | 'video'

    // Approval
    status: approvalStatusEnum("status").notNull().default("pending"),
    rejectionReason: text("rejection_reason"),

    // Processing Options
    processingOptions: jsonb("processing_options").default({
      faceMaskingEnabled: false,
      blurBackground: false,
      customMaskId: null,
      brightnessAdjustment: 0,
      contrastAdjustment: 0,
    }),

    // Order
    order: integer("order").notNull().default(0),

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    escortProfileIdIdx: index("media_items_escort_profile_id_idx").on(
      table.escortProfileId,
    ),
    statusIdx: index("media_items_status_idx").on(table.status),
  }),
);

// ============================================
// MESSAGING TABLES
// ============================================

/**
 * Conversations Table
 */
export const conversations = pgTable(
  "conversations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    participant1Id: uuid("participant1_id")
      .notNull()
      .references(() => profiles.id),
    participant2Id: uuid("participant2_id")
      .notNull()
      .references(() => profiles.id),

    // Last message info for quick access
    lastMessageAt: timestamp("last_message_at", { withTimezone: true }),
    lastMessagePreview: text("last_message_preview"),

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    participant1Idx: index("conversations_participant1_idx").on(
      table.participant1Id,
    ),
    participant2Idx: index("conversations_participant2_idx").on(
      table.participant2Id,
    ),
  }),
);

/**
 * Messages Table
 */
export const messages = pgTable(
  "messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    conversationId: uuid("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    senderId: uuid("sender_id")
      .notNull()
      .references(() => profiles.id),

    // Content
    content: text("content").notNull(),

    // Status
    readAt: timestamp("read_at", { withTimezone: true }),
    deliveredAt: timestamp("delivered_at", { withTimezone: true }),

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    conversationIdIdx: index("messages_conversation_id_idx").on(
      table.conversationId,
    ),
    senderIdIdx: index("messages_sender_id_idx").on(table.senderId),
    createdAtIdx: index("messages_created_at_idx").on(table.createdAt),
  }),
);

// ============================================
// APPOINTMENT TABLES
// ============================================

/**
 * Appointments Table
 */
export const appointments = pgTable(
  "appointments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    customerId: uuid("customer_id")
      .notNull()
      .references(() => profiles.id),
    escortId: uuid("escort_id")
      .notNull()
      .references(() => profiles.id),

    // Appointment Details
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
    duration: integer("duration").notNull(), // minutes
    location: text("location"),
    notes: text("notes"),

    // Status
    status: appointmentStatusEnum("status").notNull().default("pending"),

    // Pricing
    agreedPrice: numeric("agreed_price", { precision: 10, scale: 2 }),
    currency: varchar("currency", { length: 3 }).notNull().default("TRY"),

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    customerIdIdx: index("appointments_customer_id_idx").on(table.customerId),
    escortIdIdx: index("appointments_escort_id_idx").on(table.escortId),
    statusIdx: index("appointments_status_idx").on(table.status),
    scheduledAtIdx: index("appointments_scheduled_at_idx").on(
      table.scheduledAt,
    ),
  }),
);

// ============================================
// REVIEW TABLES
// ============================================

/**
 * Reviews Table
 */
export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    escortProfileId: uuid("escort_profile_id")
      .notNull()
      .references(() => escortProfiles.id, { onDelete: "cascade" }),
    customerId: uuid("customer_id")
      .notNull()
      .references(() => profiles.id),
    appointmentId: uuid("appointment_id").references(() => appointments.id),

    // Review Content
    rating: integer("rating").notNull(), // 1-5
    comment: text("comment"),

    // Moderation
    isApproved: boolean("is_approved").notNull().default(false),
    moderatedAt: timestamp("moderated_at", { withTimezone: true }),
    moderatedBy: uuid("moderated_by").references(() => profiles.id),

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    escortProfileIdIdx: index("reviews_escort_profile_id_idx").on(
      table.escortProfileId,
    ),
    customerIdIdx: index("reviews_customer_id_idx").on(table.customerId),
    isApprovedIdx: index("reviews_is_approved_idx").on(table.isApproved),
  }),
);

// ============================================
// RELATIONS
// ============================================

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  escortProfile: one(escortProfiles, {
    fields: [profiles.id],
    references: [escortProfiles.userId],
  }),
  customerProfile: one(customerProfiles, {
    fields: [profiles.id],
    references: [customerProfiles.userId],
  }),
  sentMessages: many(messages, { relationName: 'sender' }),
  conversationsAsParticipant1: many(conversations, { relationName: 'participant1' }),
  conversationsAsParticipant2: many(conversations, { relationName: 'participant2' }),
  appointmentsAsCustomer: many(appointments, { relationName: 'customer' }),
  appointmentsAsEscort: many(appointments, { relationName: 'escort' }),
}));

export const escortProfilesRelations = relations(escortProfiles, ({ one, many }) => ({
  user: one(profiles, {
    fields: [escortProfiles.userId],
    references: [profiles.id],
  }),
  media: many(mediaItems),
  reviews: many(reviews),
}));

export const mediaItemsRelations = relations(mediaItems, ({ one }) => ({
  escortProfile: one(escortProfiles, {
    fields: [mediaItems.escortProfileId],
    references: [escortProfiles.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  escortProfile: one(escortProfiles, {
    fields: [reviews.escortProfileId],
    references: [escortProfiles.id],
  }),
  customer: one(profiles, {
    fields: [reviews.customerId],
    references: [profiles.id],
  }),
}));

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
    participant1: one(profiles, {
        fields: [conversations.participant1Id],
        references: [profiles.id],
        relationName: 'participant1',
    }),
    participant2: one(profiles, {
        fields: [conversations.participant2Id],
        references: [profiles.id],
        relationName: 'participant2',
    }),
    messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
    conversation: one(conversations, {
        fields: [messages.conversationId],
        references: [conversations.id],
    }),
    sender: one(profiles, {
        fields: [messages.senderId],
        references: [profiles.id],
        relationName: 'sender',
    }),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
    customer: one(profiles, {
        fields: [appointments.customerId],
        references: [profiles.id],
        relationName: 'customer',
    }),
    escort: one(profiles, {
        fields: [appointments.escortId],
        references: [profiles.id],
        relationName: 'escort',
    }),
}));


// ============================================
// TYPE EXPORTS
// ============================================

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;

export type EscortProfile = typeof escortProfiles.$inferSelect;
export type NewEscortProfile = typeof escortProfiles.$inferInsert;

export type CustomerProfile = typeof customerProfiles.$inferSelect;
export type NewCustomerProfile = typeof customerProfiles.$inferInsert;

export type MediaItem = typeof mediaItems.$inferSelect;
export type NewMediaItem = typeof mediaItems.$inferInsert;

export type Conversation = typeof conversations.$inferSelect;
export type NewConversation = typeof conversations.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
