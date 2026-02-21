CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer,
	"escort_id" integer,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"duration" integer NOT NULL,
	"status" text DEFAULT 'pending',
	"price" real NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "customer_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"phone_number" text,
	"balance" real DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "escort_photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_id" integer,
	"url" text NOT NULL,
	"is_primary" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "escort_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"stage_name" text NOT NULL,
	"display_name" text,
	"slug" text,
	"city" text NOT NULL,
	"district" text,
	"age" integer,
	"bio" text,
	"biography" text,
	"slogan" text,
	"cover_image" text,
	"thumbnail_video" text,
	"gallery" text,
	"media_privacy_settings" text,
	"is_verified_by_admin" boolean DEFAULT false,
	"view_count" integer DEFAULT 0,
	"is_vip" boolean DEFAULT false,
	"is_boosted" boolean DEFAULT false,
	"tier" text DEFAULT 'free',
	"last_active" timestamp DEFAULT now(),
	CONSTRAINT "escort_profiles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"escort_id" integer,
	"type" text NOT NULL,
	"url" text NOT NULL,
	"is_approved" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"appointment_id" integer,
	"customer_id" integer,
	"escort_id" integer,
	"rating" integer NOT NULL,
	"comment" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"full_name" text,
	"role" text DEFAULT 'customer',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_escort_id_escort_profiles_id_fk" FOREIGN KEY ("escort_id") REFERENCES "public"."escort_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customer_profiles" ADD CONSTRAINT "customer_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "escort_photos" ADD CONSTRAINT "escort_photos_profile_id_escort_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."escort_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "escort_profiles" ADD CONSTRAINT "escort_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "media" ADD CONSTRAINT "media_escort_id_escort_profiles_id_fk" FOREIGN KEY ("escort_id") REFERENCES "public"."escort_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_appointment_id_appointments_id_fk" FOREIGN KEY ("appointment_id") REFERENCES "public"."appointments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_escort_id_escort_profiles_id_fk" FOREIGN KEY ("escort_id") REFERENCES "public"."escort_profiles"("id") ON DELETE no action ON UPDATE no action;