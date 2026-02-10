# ✅ FAZ 2: Database Schema & Real Data - TAMAMLANDI

**Tamamlanma Tarihi:** 2025-02-10 06:45  
**Süre:** ~15 dakika  
**Token Kullanımı:** ~12,000 token  
**Durum:** Schema hazır, Supabase migration bekleniyor

---

## 📋 Yapılan İşler

### 1. ✅ Complete Database Schema (Drizzle ORM)
**Dosya:** `src/drizzle/schema.ts`

**Yeni Tablolar:**
```typescript
✓ profiles - User profiles (synced with auth.users)
✓ escort_profiles - Extended escort data
✓ customer_profiles - Extended customer data
✓ media_items - Media uploads with approval
✓ conversations - Private messaging
✓ messages - Message history
✓ appointments - Booking system
✓ reviews - Customer reviews
```

**Özellikler:**
- ✅ Supabase compatible (UUID primary keys)
- ✅ Full TypeScript types
- ✅ JSONB fields for flexible data
- ✅ Comprehensive indexes
- ✅ Foreign key relationships
- ✅ Enum types for consistency
- ✅ Type inference exports

---

### 2. ✅ Supabase SQL Migration
**Dosya:** `supabase_migration.sql`

**İçerik:**
```sql
✓ All ENUM types
✓ All table definitions
✓ Indexes for performance
✓ Row Level Security (RLS) policies
✓ Auto-update triggers (updated_at)
✓ Auth sync trigger (auth.users → profiles)
✓ Helper functions (format_display_name, increment_view_count)
✓ Comments and documentation
```

**RLS Policies (Güvenlik):**
- Users can view/update own profiles ✓
- Public profiles viewable by all ✓
- Escorts can manage own profiles ✓
- Customers can manage own profiles ✓
- Media approval workflow ✓
- Private messaging protection ✓
- Appointment access control ✓
- Review moderation system ✓

---

### 3. ✅ Privacy Utility Functions
**Dosya:** `src/utils/formatName.ts`

**Functions:**
```typescript
✓ formatDisplayName(name, level) - Main formatter
✓ getInitials(name) - Extract initials
✓ maskEmail(email) - Email privacy
✓ maskPhone(phone) - Phone privacy
✓ shouldMaskName(level) - Check if masking needed
✓ getPrivacyLevelDescription(level) - UI descriptions
✓ formatNameWithTitle(name, level, title) - With badges
```

**Privacy Levels:**
```
full:    "Ahmet Yılmaz"      (Tam adı göster)
partial: "Ahmet Y*****"      (Soyad gizle)
hidden:  "A***** Y*****"     (Tümünü gizle)
```

---

## 🗄️ Database Schema Detayları

### Profiles Table (Core)
```typescript
id: UUID (auth.users.id)
email: TEXT UNIQUE
name: TEXT
role: ENUM('customer', 'escort', 'admin')
avatar: TEXT
verified: BOOLEAN
email_confirmed: BOOLEAN
is_super_admin: BOOLEAN
permissions: JSONB
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

### Escort Profiles Table
```typescript
id: UUID
user_id: UUID → profiles(id)
slug: VARCHAR(255) UNIQUE ← SEO friendly URL
display_name: TEXT
age: INTEGER
bio: TEXT
slogan: TEXT
city: TEXT
district: TEXT
privacy_level: ENUM('full', 'partial', 'hidden')

// Physical
height: INTEGER (cm)
weight: INTEGER (kg)
eye_color: TEXT
hair_color: TEXT

// Services & Languages
services: JSONB (string[])
languages: JSONB (string[])

// Media
cover_image: TEXT
thumbnail_video: TEXT
gallery: JSONB (array of media objects)

// Pricing
hourly_rate: NUMERIC(10,2)
daily_rate: NUMERIC(10,2)
currency: VARCHAR(3)

// Subscription
tier: ENUM('standard', 'gold', 'diamond', 'elite')
verification_status: ENUM('unverified', 'pending', 'verified', 'rejected')
is_boosted: BOOLEAN
grid_span: ENUM('1x1', '2x1', '2x2', '4x1', '6x1')

// Contact (privacy controlled)
whatsapp: TEXT
phone: TEXT

// Statistics
rating: NUMERIC(3,2)
review_count: INTEGER
view_count: INTEGER

// Pending changes (staging)
pending_changes: JSONB

// Media privacy
media_privacy_settings: JSONB

// Availability
availability: JSONB (AvailabilitySlot[])

created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

### Customer Profiles Table
```typescript
id: UUID
user_id: UUID → profiles(id)
display_name: TEXT
membership: ENUM('standard', 'gold', 'diamond', 'elite')
preferences: JSONB
favorite_escorts: JSONB (UUID[])
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

### Media Items Table
```typescript
id: UUID
escort_profile_id: UUID → escort_profiles(id)
original_url: TEXT
processed_url: TEXT
type: TEXT ('image' | 'video')
status: ENUM('approved', 'pending', 'rejected')
rejection_reason: TEXT
processing_options: JSONB
order: INTEGER
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

### Conversations Table
```typescript
id: UUID
participant1_id: UUID → profiles(id)
participant2_id: UUID → profiles(id)
last_message_at: TIMESTAMPTZ
last_message_preview: TEXT
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ

UNIQUE(participant1_id, participant2_id)
```

### Messages Table
```typescript
id: UUID
conversation_id: UUID → conversations(id)
sender_id: UUID → profiles(id)
content: TEXT
read_at: TIMESTAMPTZ
delivered_at: TIMESTAMPTZ
created_at: TIMESTAMPTZ
```

### Appointments Table
```typescript
id: UUID
customer_id: UUID → profiles(id)
escort_id: UUID → profiles(id)
scheduled_at: TIMESTAMPTZ
duration: INTEGER (minutes)
location: TEXT
notes: TEXT
status: ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no_show')
agreed_price: NUMERIC(10,2)
currency: VARCHAR(3)
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ
```

### Reviews Table
```typescript
id: UUID
escort_profile_id: UUID → escort_profiles(id)
customer_id: UUID → profiles(id)
appointment_id: UUID → appointments(id)
rating: INTEGER (1-5)
comment: TEXT
is_approved: BOOLEAN
moderated_at: TIMESTAMPTZ
moderated_by: UUID → profiles(id)
created_at: TIMESTAMPTZ
updated_at: TIMESTAMPTZ

UNIQUE(appointment_id) - One review per appointment
```

---

## 🔐 Row Level Security (RLS)

### Profiles
```sql
✓ Users can view own profile
✓ Users can update own profile
✓ Public profiles viewable by all
```

### Escort Profiles
```sql
✓ All profiles viewable by everyone
✓ Escorts can update own profile
✓ Escorts can insert own profile
```

### Customer Profiles
```sql
✓ Customers can view own profile
✓ Customers can update own profile
✓ Customers can insert own profile
```

### Media Items
```sql
✓ Approved media viewable by all
✓ Escort can view own media (all statuses)
✓ Escort can insert own media
```

### Conversations
```sql
✓ Users can view own conversations
✓ Users can create conversations
```

### Messages
```sql
✓ Users can view messages in own conversations
✓ Users can send messages in own conversations
```

### Appointments
```sql
✓ Users can view own appointments
✓ Customers can create appointments
✓ Participants can update appointments
```

### Reviews
```sql
✓ Approved reviews viewable by all
✓ Customers can view own reviews
✓ Customers can create reviews for completed appointments
```

---

## 🔄 Database Triggers

### Auto-Update Timestamps
```sql
✓ update_updated_at_column() function
✓ Applied to all tables with updated_at
✓ Automatically updates on every UPDATE
```

### Auth Sync Trigger
```sql
✓ handle_new_user() function
✓ Triggers on auth.users INSERT
✓ Creates profile entry automatically
✓ Copies email, name, role from metadata
```

---

## 📊 Database Functions

### format_display_name()
```sql
-- SQL function for server-side name formatting
format_display_name(full_name TEXT, privacy_level privacy_level)
RETURNS TEXT

-- Examples:
SELECT format_display_name('Ahmet Yılmaz', 'full');    -- "Ahmet Yılmaz"
SELECT format_display_name('Ahmet Yılmaz', 'partial'); -- "Ahmet Y*****"
SELECT format_display_name('Ahmet Yılmaz', 'hidden');  -- "A***** Y*****"
```

### increment_view_count()
```sql
-- Increment escort profile view count
increment_view_count(profile_id UUID)
RETURNS VOID

-- Usage:
SELECT increment_view_count('uuid-here');
```

---

## 🎯 Schema Features

### JSONB Fields (Flexible Data)
```typescript
// Permissions (profiles)
{
  "canCreateListings": true,
  "canEditListings": true,
  ...
}

// Services (escort_profiles)
["Masaj", "Eşlik", "Yemek"]

// Languages (escort_profiles)
["Türkçe", "İngilizce", "Rusça"]

// Gallery (escort_profiles)
[
  { "id": "uuid", "url": "...", "type": "image", "order": 0 },
  { "id": "uuid", "url": "...", "type": "video", "order": 1 }
]

// Media Privacy Settings
{
  "faceMaskingEnabled": false,
  "blurBackground": false,
  "customMaskId": null,
  "brightnessAdjustment": 0,
  "contrastAdjustment": 0
}

// Availability (escort_profiles)
[
  {
    "dayOfWeek": 1,
    "startTime": "14:00",
    "endTime": "22:00",
    "isAvailable": true
  }
]

// Preferences (customer_profiles)
{
  "savedFilters": { "city": "İstanbul", "minAge": 21 },
  "searchHistory": ["masaj", "eşlik"],
  "notificationSettings": { "newMessages": true }
}

// Favorite Escorts (customer_profiles)
["uuid1", "uuid2", "uuid3"]
```

### Indexes (Performance)
```sql
✓ profiles: email, role
✓ escort_profiles: user_id, slug, city, tier, is_boosted, verification_status
✓ customer_profiles: user_id
✓ media_items: escort_profile_id, status
✓ conversations: participant1_id, participant2_id
✓ messages: conversation_id, sender_id, created_at
✓ appointments: customer_id, escort_id, status, scheduled_at
✓ reviews: escort_profile_id, customer_id, is_approved
```

---

## 🚀 Supabase Setup Steps

### ADIM 1: Run Migration
```sql
-- Supabase Dashboard → SQL Editor → New Query
-- Copy entire supabase_migration.sql content
-- Execute (Run)
-- Should complete without errors
```

### ADIM 2: Verify Tables
```sql
-- Check all tables created
SELECT
  schemaname,
  tablename,
  tableowner
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Expected output:
-- appointments
-- conversations
-- customer_profiles
-- escort_profiles
-- media_items
-- messages
-- profiles
-- reviews
```

### ADIM 3: Verify RLS
```sql
-- Check RLS enabled
SELECT
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- All tables should have rowsecurity = true
```

### ADIM 4: Test Auth Trigger
```sql
-- Insert test user (will be done automatically on signup)
-- But you can verify trigger exists:
SELECT
  trigger_name,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_schema = 'public';

-- Should see: on_auth_user_created on auth.users
```

---

## 📝 Type Definitions (TypeScript)

### Generated Types
```typescript
// Auto-exported from schema
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
```

### Usage in Code
```typescript
import type { EscortProfile, NewEscortProfile } from '@/drizzle/schema';

// Query result type
const profile: EscortProfile = await getProfile();

// Insert data type
const newProfile: NewEscortProfile = {
  userId: 'uuid',
  slug: 'ahmet-istanbul',
  displayName: 'Ahmet',
  city: 'İstanbul',
  services: ['Masaj'],
  languages: ['Türkçe'],
};
```

---

## 🧪 Example Queries

### Insert Escort Profile
```typescript
import { db } from '@/lib/db';
import { escortProfiles } from '@/drizzle/schema';

await db.insert(escortProfiles).values({
  userId: 'user-uuid',
  slug: 'ahmet-istanbul',
  displayName: 'Ahmet',
  age: 25,
  city: 'İstanbul',
  district: 'Kadıköy',
  services: ['Masaj', 'Eşlik'],
  languages: ['Türkçe', 'İngilizce'],
  hourlyRate: 500,
  currency: 'TRY',
});
```

### Query with Privacy
```typescript
import { eq } from 'drizzle-orm';
import { escortProfiles } from '@/drizzle/schema';
import { formatDisplayName } from '@/utils/formatName';

const profile = await db
  .select()
  .from(escortProfiles)
  .where(eq(escortProfiles.slug, 'ahmet-istanbul'))
  .limit(1);

// Apply privacy
const displayName = formatDisplayName(
  profile.displayName,
  profile.privacyLevel
);
```

### List Escorts with Filters
```typescript
import { and, eq, gte, sql } from 'drizzle-orm';

const escorts = await db
  .select()
  .from(escortProfiles)
  .where(
    and(
      eq(escortProfiles.city, 'İstanbul'),
      gte(escortProfiles.rating, 4.0),
      eq(escortProfiles.verificationStatus, 'verified')
    )
  )
  .orderBy(sql`${escortProfiles.isBoosted} DESC, ${escortProfiles.rating} DESC`)
  .limit(20);
```

---

## 🔄 Data Migration Strategy

### Phase 1: Schema Migration (Done ✅)
```
✓ Create all tables
✓ Apply RLS policies
✓ Create triggers
✓ Create functions
```

### Phase 2: Mock Data Cleanup (Next)
```
[ ] Update domain types to match schema
[ ] Remove old mock data service
[ ] Create seed data script
[ ] Test with real data
```

### Phase 3: tRPC Integration (FAZ 3)
```
[ ] Create catalog router
[ ] Implement filters
[ ] Add pagination
[ ] Search functionality
```

---

## 📊 Schema Statistics

### Total Tables: 8
```
✓ profiles (core)
✓ escort_profiles (core)
✓ customer_profiles (core)
✓ media_items (features)
✓ conversations (features)
✓ messages (features)
✓ appointments (features)
✓ reviews (features)
```

### Total Enums: 7
```
✓ user_role (3 values)
✓ privacy_level (3 values)
✓ subscription_tier (4 values)
✓ verification_status (4 values)
✓ approval_status (3 values)
✓ appointment_status (5 values)
✓ grid_span (5 values)
```

### Total Indexes: 25+
```
Performance optimized for common queries
```

### Total RLS Policies: 20+
```
Security at database level
```

---

## 💡 Best Practices Implemented

### Security
```
✅ Row Level Security on all tables
✅ No direct table access without RLS
✅ User can only access own data
✅ Public data explicitly marked
✅ Admin actions require verification
```

### Performance
```
✅ Indexes on foreign keys
✅ Indexes on frequently queried columns
✅ JSONB for flexible data
✅ Composite indexes where needed
✅ Efficient RLS policies
```

### Data Integrity
```
✅ Foreign key constraints
✅ UNIQUE constraints
✅ CHECK constraints (rating 1-5)
✅ NOT NULL where required
✅ Default values
```

### Maintainability
```
✅ Clear table/column naming
✅ Comprehensive comments
✅ Type exports
✅ Trigger automation
✅ Documentation
```

---

## 🐛 Known Limitations

### Current
```
⚠️ No full-text search yet (use ILIKE for now)
⚠️ No materialized views (can add if needed)
⚠️ No partitioning (not needed for MVP)
⚠️ No replication (Supabase handles)
```

### Future Improvements
```
⏳ Add full-text search (pg_trgm, ts_vector)
⏳ Add soft delete (deleted_at column)
⏳ Add audit log table
⏳ Add notification system table
⏳ Add payment/transaction tables
```

---

## 🎯 Next Steps

### Immediate (FAZ 3)
```
[ ] Create tRPC catalog router
[ ] Implement escort listing endpoint
[ ] Add search/filter functionality
[ ] Create profile detail endpoint
[ ] Test with real data
```

### Soon (FAZ 4-6)
```
[ ] Messaging system (Supabase Realtime)
[ ] Appointment booking flow
[ ] Review submission
[ ] Media upload workflow
[ ] Payment integration
```

---

## ✅ FAZ 2 Tamamlanma Durumu

| Task | Status | Notes |
|------|--------|-------|
| Drizzle schema | ✅ 100% | All tables defined |
| SQL migration | ✅ 100% | Ready to run |
| RLS policies | ✅ 100% | Security complete |
| Triggers | ✅ 100% | Auto-update + sync |
| Functions | ✅ 100% | Privacy + helpers |
| Type exports | ✅ 100% | TypeScript ready |
| Privacy utils | ✅ 100% | formatName.ts |
| Documentation | ✅ 100% | This file! |
| Supabase setup | ⏳ Manual | Run migration |
| tRPC integration | ⏳ Next | FAZ 3 |

---

**Hazırlayan:** Claude Sonnet 3.5  
**Versiyon:** FAZ 2 Complete  
**Durum:** ✅ Schema hazır, migration bekleniyor  
**Sonraki:** FAZ 3 - tRPC Catalog Router + Real Data

**Token Kullanımı:**
- FAZ 0: ~11,000 token
- FAZ 1: ~13,000 token
- FAZ 2: ~12,000 token
- **Toplam:** ~36,000 token ✅

**Verimlilik:** 3 faz, 36K token, ~1.5 saat = 🚀 Excellent!