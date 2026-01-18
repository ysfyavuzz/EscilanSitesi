-- Initial Schema Migration
-- Creates all core tables for the escort platform

-- Users table - Core authentication and user management
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  open_id TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK(role IN ('client', 'escort', 'admin')),
  email TEXT,
  display_name TEXT,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Escort profiles table - Profile information for escort users
CREATE TABLE IF NOT EXISTS escort_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  display_name TEXT NOT NULL,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  bio TEXT,
  age INTEGER,
  hourly_rate INTEGER,
  is_vip INTEGER DEFAULT 0 CHECK(is_vip IN (0, 1)),
  is_verified INTEGER DEFAULT 0 CHECK(is_verified IN (0, 1)),
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Escort photos table - Profile photos for escorts
CREATE TABLE IF NOT EXISTS escort_photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profile_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (profile_id) REFERENCES escort_profiles(id) ON DELETE CASCADE
);

-- Conversations table - One-to-one messaging conversations
CREATE TABLE IF NOT EXISTS conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  participant1_id INTEGER NOT NULL,
  participant2_id INTEGER NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (participant1_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (participant2_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(participant1_id, participant2_id)
);

-- Messages table - Individual messages within conversations
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL,
  sender_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  read_at INTEGER,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bookings table - Appointment bookings between clients and escorts
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id INTEGER NOT NULL,
  escort_id INTEGER NOT NULL,
  start_time INTEGER NOT NULL,
  end_time INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_amount INTEGER NOT NULL,
  notes TEXT,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (escort_id) REFERENCES escort_profiles(id) ON DELETE CASCADE
);

-- Reviews table - Client reviews for escorts
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id INTEGER NOT NULL,
  client_id INTEGER NOT NULL,
  escort_id INTEGER NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (escort_id) REFERENCES escort_profiles(id) ON DELETE CASCADE,
  UNIQUE(booking_id)
);

-- Favorites table - Client favorite escorts
CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  escort_id INTEGER NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (escort_id) REFERENCES escort_profiles(id) ON DELETE CASCADE,
  UNIQUE(user_id, escort_id)
);

-- Transactions table - Credit and payment transactions
CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  transaction_type TEXT NOT NULL CHECK(transaction_type IN ('purchase', 'usage', 'refund', 'bonus')),
  amount INTEGER NOT NULL,
  balance_before INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,
  description TEXT,
  payment_method TEXT,
  payment_id TEXT,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Notifications table - User notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read INTEGER DEFAULT 0 CHECK(is_read IN (0, 1)),
  metadata TEXT,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- VIP memberships table - VIP subscription tracking
CREATE TABLE IF NOT EXISTS vip_memberships (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  escort_id INTEGER NOT NULL,
  plan TEXT NOT NULL CHECK(plan IN ('monthly', 'quarterly', 'yearly')),
  start_date INTEGER NOT NULL,
  end_date INTEGER NOT NULL,
  is_active INTEGER DEFAULT 1 CHECK(is_active IN (0, 1)),
  auto_renew INTEGER DEFAULT 0 CHECK(auto_renew IN (0, 1)),
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (escort_id) REFERENCES escort_profiles(id) ON DELETE CASCADE
);
