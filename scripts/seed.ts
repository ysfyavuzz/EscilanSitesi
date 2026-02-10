/**
 * Seed Data Script
 *
 * Populates database with test escort profiles for development.
 * Run with: npm run db:seed
 *
 * @module scripts/seed
 * @category Scripts
 */

import { createClient } from "@supabase/supabase-js";

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase credentials in environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Turkish cities
const cities = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Antalya",
  "Bursa",
  "Adana",
  "Gaziantep",
  "Konya",
];

// Districts by city
const districts: Record<string, string[]> = {
  İstanbul: ["Kadıköy", "Beyoğlu", "Beşiktaş", "Şişli", "Bakırköy", "Maltepe"],
  Ankara: ["Çankaya", "Kızılay", "Ulus", "Mamak", "Keçiören"],
  İzmir: ["Konak", "Karşıyaka", "Bornova", "Alsancak", "Buca"],
  Antalya: ["Muratpaşa", "Kepez", "Konyaaltı", "Lara"],
  Bursa: ["Osmangazi", "Nilüfer", "Yıldırım"],
  Adana: ["Seyhan", "Yüreğir", "Çukurova"],
  Gaziantep: ["Şahinbey", "Şehitkamil"],
  Konya: ["Meram", "Selçuklu", "Karatay"],
};

// Services
const services = [
  "Masaj",
  "Eşlik",
  "Yemek",
  "Sohbet",
  "Dans",
  "Spa",
  "Terapi",
  "Yoga",
  "Fitness",
  "Müzik",
];

// Languages
const languages = [
  "Türkçe",
  "İngilizce",
  "Almanca",
  "Fransızca",
  "Rusça",
  "Arapça",
  "İspanyolca",
];

// First names (Turkish)
const firstNames = [
  "Ayşe",
  "Fatma",
  "Zeynep",
  "Elif",
  "Merve",
  "Selin",
  "Deniz",
  "Ece",
  "Cansu",
  "Ebru",
  "Pınar",
  "Burcu",
  "Gizem",
  "Derya",
  "Başak",
  "Nazlı",
  "Damla",
  "İrem",
  "Tuba",
  "Aslı",
];

// Last names (Turkish)
const lastNames = [
  "Yılmaz",
  "Kaya",
  "Demir",
  "Çelik",
  "Şahin",
  "Yıldız",
  "Aydın",
  "Özdemir",
  "Arslan",
  "Doğan",
  "Kılıç",
  "Aslan",
  "Çetin",
  "Kara",
  "Koç",
  "Kurt",
  "Özkan",
  "Şimşek",
  "Polat",
  "Erdoğan",
];

// Bios
const bioTemplates = [
  "Merhaba! Ben {name}, {city}'da yaşıyorum. Sizinle kaliteli vakit geçirmeyi seviyorum. Profesyonel ve güvenilir hizmet anlayışıyla buradayım.",
  "Selam! {city}'da hizmet veren {name}. Samimi ve eğlenceli anlar paylaşmak için sizlerleyim. Her zaman gülümseyen yüzümle karşınızdayım.",
  "Hoş geldiniz! {name} olarak {city}'da sizlere en iyi deneyimi sunmak için buradayım. Kaliteli ve unutulmaz anlar için benimle iletişime geçebilirsiniz.",
  "Merhaba ben {name}. {city}'da profesyonel hizmet anlayışıyla çalışıyorum. Sizinle güzel anılar biriktirmek için sabırsızlanıyorum.",
  "Selam! {city}'dan {name}. Eğlenceli, samimi ve unutulmaz anlar için buradayım. Sizlerle tanışmak için heyecanlıyım!",
];

// Slogans
const slogans = [
  "Hayatınıza renk katın",
  "Unutulmaz anlar için",
  "Kaliteli vakit geçirmek için",
  "Profesyonel hizmet anlayışı",
  "Size özel deneyim",
  "Güvenli ve keyifli",
  "Her anınızda yanınızda",
  "Rüya gibi anlar",
  "Sınırsız eğlence",
  "Kendinize özel zaman",
];

// Helper function to get random item from array
function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Helper function to get random items from array
function randomItems<T>(arr: T[], min: number, max: number): T[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper function to generate slug
function generateSlug(name: string, city: string): string {
  const turkishMap: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ı: "i",
    İ: "i",
    ö: "o",
    ş: "s",
    ü: "u",
    Ç: "c",
    Ğ: "g",
    Ö: "o",
    Ş: "s",
    Ü: "u",
  };

  const normalized = name
    .split("")
    .map((char) => turkishMap[char] || char)
    .join("");

  return `${normalized}-${city}-${Math.random().toString(36).substring(2, 6)}`
    .toLowerCase()
    .replace(/\s+/g, "-");
}

// Generate test escort profile
function generateEscortProfile(userId: string) {
  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  const fullName = `${firstName} ${lastName}`;
  const city = randomItem(cities);
  const district = randomItem(districts[city]);
  const age = Math.floor(Math.random() * 15) + 21; // 21-35
  const hourlyRate = (Math.floor(Math.random() * 10) + 5) * 100; // 500-1500
  const dailyRate = hourlyRate * 8;

  const bio = randomItem(bioTemplates)
    .replace(/{name}/g, firstName)
    .replace(/{city}/g, city);

  return {
    user_id: userId,
    slug: generateSlug(fullName, city),
    display_name: fullName,
    age,
    bio,
    slogan: randomItem(slogans),
    city,
    district,
    privacy_level: randomItem(["full", "partial", "hidden"]),
    height: Math.floor(Math.random() * 20) + 160, // 160-180 cm
    weight: Math.floor(Math.random() * 20) + 50, // 50-70 kg
    eye_color: randomItem(["Kahverengi", "Yeşil", "Mavi", "Ela"]),
    hair_color: randomItem(["Siyah", "Kahverengi", "Sarı", "Kestane", "Kızıl"]),
    services: randomItems(services, 3, 6),
    languages: randomItems(languages, 1, 3),
    hourly_rate: hourlyRate,
    daily_rate: dailyRate,
    currency: "TRY",
    tier: randomItem(["standard", "gold", "diamond", "elite"]),
    verification_status: randomItem(["verified", "pending", "unverified"]),
    is_boosted: Math.random() > 0.7, // 30% boosted
    grid_span: randomItem(["1x1", "2x1", "2x2"]),
    rating: (Math.random() * 2 + 3).toFixed(2), // 3.0-5.0
    review_count: Math.floor(Math.random() * 50),
    view_count: Math.floor(Math.random() * 1000),
    media_privacy_settings: {
      faceMaskingEnabled: Math.random() > 0.5,
      blurBackground: false,
      customMaskId: null,
      brightnessAdjustment: 0,
      contrastAdjustment: 0,
    },
  };
}

/**
 * Main seed function
 */
async function seed() {
  console.log("🌱 Starting seed process...\n");

  try {
    // Step 1: Create test users (if not exists)
    console.log("📝 Creating test users...");

    const testUsers = [];
    for (let i = 0; i < 20; i++) {
      const email = `escort${i + 1}@example.com`;

      // Check if user already exists
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .single();

      if (existingProfile) {
        console.log(`   ✓ User ${email} already exists`);
        testUsers.push(existingProfile.id);
        continue;
      }

      // Create via Supabase Auth (will trigger profile creation)
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password: "Test123!",
        email_confirm: true,
        user_metadata: {
          role: "escort",
          name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
        },
      });

      if (error) {
        console.error(`   ✗ Failed to create ${email}:`, error.message);
        continue;
      }

      testUsers.push(data.user.id);
      console.log(`   ✓ Created user ${email}`);
    }

    console.log(`\n✓ Created/found ${testUsers.length} test users\n`);

    // Step 2: Create escort profiles
    console.log("🎭 Creating escort profiles...");

    let successCount = 0;
    let skipCount = 0;

    for (const userId of testUsers) {
      // Check if escort profile already exists
      const { data: existing } = await supabase
        .from("escort_profiles")
        .select("id")
        .eq("user_id", userId)
        .single();

      if (existing) {
        skipCount++;
        continue;
      }

      const profile = generateEscortProfile(userId);

      const { error } = await supabase
        .from("escort_profiles")
        .insert(profile);

      if (error) {
        console.error(`   ✗ Failed to create profile:`, error.message);
        continue;
      }

      successCount++;
      console.log(
        `   ✓ Created: ${profile.display_name} (${profile.city}) - ${profile.tier}`,
      );
    }

    console.log(
      `\n✓ Created ${successCount} escort profiles (${skipCount} skipped)\n`,
    );

    // Step 3: Summary
    console.log("📊 Seed Summary:");
    console.log(`   Total users: ${testUsers.length}`);
    console.log(`   New profiles: ${successCount}`);
    console.log(`   Skipped: ${skipCount}`);
    console.log("\n✅ Seed completed successfully!");

    // Step 4: Show test login credentials
    console.log("\n🔐 Test Login Credentials:");
    console.log("   Email: escort1@example.com to escort20@example.com");
    console.log("   Password: Test123!");
    console.log("\n💡 Tip: You can login with any escortN@example.com account");
  } catch (error) {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  }
}

// Run seed
seed();
