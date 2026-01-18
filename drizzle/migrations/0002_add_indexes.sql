-- Performance Indexes Migration
-- Adds indexes for frequently queried columns to improve performance

-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_open_id ON users(open_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Escort profiles indexes
CREATE INDEX IF NOT EXISTS idx_escort_profiles_user_id ON escort_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_escort_profiles_city ON escort_profiles(city);
CREATE INDEX IF NOT EXISTS idx_escort_profiles_district ON escort_profiles(district);
CREATE INDEX IF NOT EXISTS idx_escort_profiles_is_vip ON escort_profiles(is_vip);
CREATE INDEX IF NOT EXISTS idx_escort_profiles_is_verified ON escort_profiles(is_verified);
CREATE INDEX IF NOT EXISTS idx_escort_profiles_city_district ON escort_profiles(city, district);

-- Escort photos indexes
CREATE INDEX IF NOT EXISTS idx_escort_photos_profile_id ON escort_photos(profile_id);
CREATE INDEX IF NOT EXISTS idx_escort_photos_order ON escort_photos(profile_id, "order");

-- Conversations indexes
CREATE INDEX IF NOT EXISTS idx_conversations_participant1 ON conversations(participant1_id);
CREATE INDEX IF NOT EXISTS idx_conversations_participant2 ON conversations(participant2_id);
CREATE INDEX IF NOT EXISTS idx_conversations_participants ON conversations(participant1_id, participant2_id);
CREATE INDEX IF NOT EXISTS idx_conversations_updated ON conversations(updated_at DESC);

-- Messages indexes
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_read ON messages(read_at);

-- Bookings indexes
CREATE INDEX IF NOT EXISTS idx_bookings_client ON bookings(client_id);
CREATE INDEX IF NOT EXISTS idx_bookings_escort ON bookings(escort_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_start_time ON bookings(start_time);
CREATE INDEX IF NOT EXISTS idx_bookings_created ON bookings(created_at DESC);

-- Reviews indexes
CREATE INDEX IF NOT EXISTS idx_reviews_booking ON reviews(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_client ON reviews(client_id);
CREATE INDEX IF NOT EXISTS idx_reviews_escort ON reviews(escort_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at DESC);

-- Favorites indexes
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_escort ON favorites(escort_id);
CREATE INDEX IF NOT EXISTS idx_favorites_created ON favorites(created_at DESC);

-- Transactions indexes
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_transactions_payment ON transactions(payment_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions(created_at DESC);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);

-- VIP memberships indexes
CREATE INDEX IF NOT EXISTS idx_vip_memberships_escort ON vip_memberships(escort_id);
CREATE INDEX IF NOT EXISTS idx_vip_memberships_active ON vip_memberships(is_active);
CREATE INDEX IF NOT EXISTS idx_vip_memberships_end_date ON vip_memberships(end_date);
