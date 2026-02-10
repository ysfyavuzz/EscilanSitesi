-- ============================================
-- ESCILAN PLATFORM - SUPABASE MIGRATION
-- Complete Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('customer', 'escort', 'admin');
CREATE TYPE privacy_level AS ENUM ('full', 'partial', 'hidden');
CREATE TYPE subscription_tier AS ENUM ('standard', 'gold', 'diamond', 'elite');
CREATE TYPE verification_status AS ENUM ('unverified', 'pending', 'verified', 'rejected');
CREATE TYPE approval_status AS ENUM ('approved', 'pending', 'rejected');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');
CREATE TYPE grid_span AS ENUM ('1x1', '2x1', '2x2', '4x1', '6x1');

-- ============================================
-- PROFILES TABLE (synced with auth.users)
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  role user_role NOT NULL DEFAULT 'customer',
  avatar TEXT,

  -- Verification
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  email_confirmed BOOLEAN NOT NULL DEFAULT FALSE,

  -- Super Admin
  is_super_admin BOOLEAN NOT NULL DEFAULT FALSE,
  permissions JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX profiles_email_idx ON profiles(email);
CREATE INDEX profiles_role_idx ON profiles(role);

-- RLS Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (TRUE);

-- ============================================
-- ESCORT PROFILES TABLE
-- ============================================

CREATE TABLE escort_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Basic Info
  slug VARCHAR(255) NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  age INTEGER,
  bio TEXT,
  slogan TEXT,

  -- Location
  city TEXT NOT NULL,
  district TEXT,

  -- Privacy
  privacy_level privacy_level NOT NULL DEFAULT 'partial',

  -- Physical Attributes
  height INTEGER, -- cm
  weight INTEGER, -- kg
  eye_color TEXT,
  hair_color TEXT,

  -- Services & Languages
  services JSONB NOT NULL DEFAULT '[]',
  languages JSONB NOT NULL DEFAULT '[]',

  -- Media
  cover_image TEXT,
  thumbnail_video TEXT,
  gallery JSONB DEFAULT '[]',

  -- Pricing
  hourly_rate NUMERIC(10, 2),
  daily_rate NUMERIC(10, 2),
  currency VARCHAR(3) NOT NULL DEFAULT 'TRY',

  -- Subscription & Features
  tier subscription_tier NOT NULL DEFAULT 'standard',
  verification_status verification_status NOT NULL DEFAULT 'unverified',
  is_boosted BOOLEAN NOT NULL DEFAULT FALSE,
  grid_span grid_span NOT NULL DEFAULT '1x1',

  -- Contact
  whatsapp TEXT,
  phone TEXT,

  -- Statistics
  rating NUMERIC(3, 2) NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  view_count INTEGER NOT NULL DEFAULT 0,

  -- Pending Changes
  pending_changes JSONB,

  -- Media Privacy Settings
  media_privacy_settings JSONB DEFAULT '{"faceMaskingEnabled": false, "blurBackground": false, "customMaskId": null, "brightnessAdjustment": 0, "contrastAdjustment": 0}',

  -- Availability
  availability JSONB DEFAULT '[]',

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX escort_profiles_user_id_idx ON escort_profiles(user_id);
CREATE INDEX escort_profiles_slug_idx ON escort_profiles(slug);
CREATE INDEX escort_profiles_city_idx ON escort_profiles(city);
CREATE INDEX escort_profiles_tier_idx ON escort_profiles(tier);
CREATE INDEX escort_profiles_is_boosted_idx ON escort_profiles(is_boosted);
CREATE INDEX escort_profiles_verification_status_idx ON escort_profiles(verification_status);

-- RLS Policies
ALTER TABLE escort_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Escort profiles are viewable by everyone"
  ON escort_profiles FOR SELECT
  USING (TRUE);

CREATE POLICY "Escorts can update own profile"
  ON escort_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Escorts can insert own profile"
  ON escort_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- CUSTOMER PROFILES TABLE
--
 ============================================

CREATE TABLE customer_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  -- Basic Info
  display_name TEXT,

  -- Membership
  membership subscription_tier NOT NULL DEFAULT 'standard',

  -- Preferences
  preferences JSONB DEFAULT '{}',

  -- Favorites
  favorite_escorts JSONB DEFAULT '[]',


  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX customer_profiles_user_id_idx ON customer_profiles(user_id);

-- RLS Policies
ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own profile"
  ON customer_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Customers can update own profile"
  ON customer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Customers can insert own profile"
  ON customer_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- MEDIA ITEMS TABLE
-- ============================================

CREATE TABLE media_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  escort_profile_id UUID NOT NULL REFERENCES escort_profiles(id) ON DELETE CASCADE,

  -- Media Info
  original_url TEXT NOT NULL,
  processed_url TEXT,
  type TEXT NOT NULL, -- 'image' | 'video'

  -- Approval
  status approval_status NOT NULL DEFAULT 'pending',
  rejection_reason TEXT,

  -- Processing Options
  processing_options JSONB DEFAULT '{"faceMaskingEnabled": false, "blurBackground": false, "customMaskId": null, "brightnessAdjustment": 0, "contrastAdjustment": 0}',

  -- Order
  "order" INTEGER NOT NULL DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX media_items_escort_profile_id_idx ON media_items(escort_profile_id);
CREATE INDEX media_items_status_idx ON media_items(status);

-- RLS Policies
ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media items are viewable by everyone if approved"
  ON media_items FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Escort can view own media items"
  ON media_items FOR SELECT
  USING (
    escort_profile_id IN (
      SELECT id FROM escort_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Escort can insert own media items"
  ON media_items FOR INSERT
  WITH CHECK (
    escort_profile_id IN (
      SELECT id FROM escort_profiles WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- CONVERSATIONS TABLE
-- ============================================

CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  participant1_id UUID NOT NULL REFERENCES profiles(id),
  participant2_id UUID NOT NULL REFERENCES profiles(id),

  -- Last message info
  last_message_at TIMESTAMPTZ,
  last_message_preview TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Ensure unique conversation pairs
  CONSTRAINT unique_conversation UNIQUE (participant1_id, participant2_id)
);

-- Indexes
CREATE INDEX conversations_participant1_idx ON conversations(participant1_id);
CREATE INDEX conversations_participant2_idx ON conversations(participant2_id);

-- RLS Policies
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = participant1_id OR auth.uid() = participant2_id);

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = participant1_id OR auth.uid() = participant2_id);

-- ============================================
-- MESSAGES TABLE
-- ============================================

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id),

  -- Content
  content TEXT NOT NULL,

  -- Status
  read_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,

  -- Timestamp
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX messages_conversation_id_idx ON messages(conversation_id);
CREATE INDEX messages_sender_id_idx ON messages(sender_id);
CREATE INDEX messages_created_at_idx ON messages(created_at);

-- RLS Policies
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in own conversations"
  ON messages FOR SELECT
  USING (
    conversation_id IN (
      SELECT id FROM conversations
      WHERE participant1_id = auth.uid() OR participant2_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages in own conversations"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    conversation_id IN (
      SELECT id FROM conversations
      WHERE participant1_id = auth.uid() OR participant2_id = auth.uid()
    )
  );

-- ============================================
-- APPOINTMENTS TABLE
-- ============================================

CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES profiles(id),
  escort_id UUID NOT NULL REFERENCES profiles(id),

  -- Appointment Details
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration INTEGER NOT NULL, -- minutes
  location TEXT,
  notes TEXT,

  -- Status
  status appointment_status NOT NULL DEFAULT 'pending',

  -- Pricing
  agreed_price NUMERIC(10, 2),
  currency VARCHAR(3) NOT NULL DEFAULT 'TRY',

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX appointments_customer_id_idx ON appointments(customer_id);
CREATE INDEX appointments_escort_id_idx ON appointments(escort_id);
CREATE INDEX appointments_status_idx ON appointments(status);
CREATE INDEX appointments_scheduled_at_idx ON appointments(scheduled_at);

-- RLS Policies
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  USING (auth.uid() = customer_id OR auth.uid() = escort_id);

CREATE POLICY "Customers can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Participants can update appointments"
  ON appointments FOR UPDATE
  USING (auth.uid() = customer_id OR auth.uid() = escort_id);

-- ============================================
-- REVIEWS TABLE
-- ============================================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  escort_profile_id UUID NOT NULL REFERENCES escort_profiles(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES profiles(id),
  appointment_id UUID REFERENCES appointments(id),

  -- Review Content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,

  -- Moderation
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  moderated_at TIMESTAMPTZ,
  moderated_by UUID REFERENCES profiles(id),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- One review per appointment
  CONSTRAINT unique_review_per_appointment UNIQUE (appointment_id)
);

-- Indexes
CREATE INDEX reviews_escort_profile_id_idx ON reviews(escort_profile_id);
CREATE INDEX reviews_customer_id_idx ON reviews(customer_id);
CREATE INDEX reviews_is_approved_idx ON reviews(is_approved);

-- RLS Policies
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved reviews are viewable by everyone"
  ON reviews FOR SELECT
  USING (is_approved = TRUE);

CREATE POLICY "Customers can view own reviews"
  ON reviews FOR SELECT
  USING (auth.uid() = customer_id);

CREATE POLICY "Customers can create reviews for completed appointments"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() = customer_id AND
    appointment_id IN (
      SELECT id FROM appointments
      WHERE customer_id = auth.uid() AND status = 'completed'
    )
  );

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_escort_profiles_updated_at BEFORE UPDATE ON escort_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customer_profiles_updated_at BEFORE UPDATE ON customer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_items_updated_at BEFORE UPDATE ON media_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SYNC TRIGGER: auth.users -> profiles
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role, email_confirmed)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'customer'),
    NEW.email_confirmed_at IS NOT NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to format display name based on privacy level
CREATE OR REPLACE FUNCTION format_display_name(
  full_name TEXT,
  p_privacy_level privacy_level
)
RETURNS TEXT AS $$
DECLARE
  parts TEXT[];
  first_name TEXT;
  last_name TEXT;
BEGIN
  IF p_privacy_level = 'full' THEN
    RETURN full_name;
  END IF;

  parts := string_to_array(full_name, ' ');
  first_name := parts[1];

  IF array_length(parts, 1) > 1 THEN
    last_name := parts[array_length(parts, 1)];
  END IF;

  IF p_privacy_level = 'partial' THEN
    -- "Ahmet Y*****"
    RETURN first_name || ' ' || substring(last_name, 1, 1) || repeat('*', greatest(length(last_name) - 1, 1));
  ELSIF p_privacy_level = 'hidden' THEN
    -- "A***** Y*****"
    RETURN substring(first_name, 1, 1) || repeat('*', greatest(length(first_name) - 1, 1)) ||
           ' ' ||
           substring(last_name, 1, 1) || repeat('*', greatest(length(last_name) - 1, 1));
  END IF;

  RETURN full_name;
END;
$$ LANGUAGE plpgsql;

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(profile_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE escort_profiles
  SET view_count = view_count + 1
  WHERE id = profile_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SEED DATA (OPTIONAL)
-- ============================================

-- Note: Run this only in development
-- Example: Create admin user after first auth signup
-- UPDATE profiles SET role = 'admin', is_super_admin = TRUE WHERE email = 'admin@example.com';

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE profiles IS 'User profiles synced with auth.users';
COMMENT ON TABLE escort_profiles IS 'Extended profile data for escort accounts';
COMMENT ON TABLE customer_profiles IS 'Extended profile data for customer accounts';
COMMENT ON TABLE media_items IS 'Media uploads with approval workflow';
COMMENT ON TABLE conversations IS 'Private conversations between users';
COMMENT ON TABLE messages IS 'Messages in conversations';
COMMENT ON TABLE appointments IS 'Appointment bookings';
COMMENT ON TABLE reviews IS 'Customer reviews for escorts';

COMMENT ON COLUMN escort_profiles.privacy_level IS 'Controls how display name is shown (full/partial/hidden)';
COMMENT ON COLUMN escort_profiles.pending_changes IS 'Staging area for profile updates awaiting approval';
COMMENT ON COLUMN escort_profiles.media_privacy_settings IS 'Settings for AI-powered media processing';

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

-- Verify tables created
SELECT
  schemaname,
  tablename,
  tableowner
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
