# `src/drizzle/schema.ts` — Veritabanı Şeması

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/drizzle/schema.ts` |
| **Modül** | `drizzle/schema` |
| **Dil** | TypeScript |
| **Teknoloji** | `drizzle-orm/pg-core` (PostgreSQL) |
| **İçe Aktar** | `import * as schema from '@/drizzle/schema'` |
| **Durum** | 🔴 ✅ Kritik dosya — Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Uygulamanın tüm PostgreSQL tablo tanımlarını, ilişkilerini ve TypeScript tip çıkarımlarını barındırır.
**Drizzle ORM'un tek source-of-truth dosyasıdır** — tüm tablo yapısı buradan türetilir.

---

## 📋 Tablolar

### `users` — Kullanıcılar

| Kolon | Tip | Zorunlu | Açıklama |
|-------|-----|---------|----------|
| `id` | serial PK | ✅ | Otomatik artan birincil anahtar |
| `email` | text UNIQUE | ✅ | Tekil e-posta |
| `passwordHash` | text | ✅ | bcrypt hash |
| `fullName` | text | ❌ | Gerçek ad (gizli) |
| `role` | enum | ✅ | `customer \| escort \| admin \| super_mod \| moderator` |
| `phoneNumber` | text UNIQUE | ❌ | Tekil telefon numarası |
| `provider` | enum | ❌ | `email \| google \| apple` |
| `providerId` | text | ❌ | Google/Apple OAuth ID |
| `isProfileComplete` | boolean | ❌ | Sosyal girişten sonra tamamlandı mı? |
| `hasAcceptedTerms` | boolean | ❌ | KVKK onayı |
| `termsAcceptedAt` | timestamp | ❌ | KVKK onay tarihi |
| `hasAcceptedChatRules` | boolean | ❌ | Chat kuralları onayı |
| `chatRulesAcceptedAt` | timestamp | ❌ | Chat kuralları onay tarihi |
| `loyaltyPoints` | integer | ❌ | Sadakat puanı |
| `experiencePoints` | integer | ❌ | XP — rütke hesaplamasında kullanılır |
| `userRank` | text | ❌ | `Bronz \| Gümüş \| Altın \| ...` |
| `isShadowBanned` | boolean | ❌ | Shadow ban bayrağı |
| `createdAt` | timestamp | ❌ | Kayıt tarihi |

---

### `escort_profiles` — Escort Profilleri

| Kolon | Tip | Açıklama |
|-------|-----|----------|
| `id` | serial PK | — |
| `userId` | int FK → users | Bağlı kullanıcı |
| `stageName` | text NOT NULL | Sahne adı |
| `displayName` | text | Görünen ad |
| `slug` | text UNIQUE | SEO dostu URL |
| `city` | text NOT NULL | Şehir |
| `district` | text | İlçe |
| `age` | int | Yaş |
| `bio` | text | Kısa biyografi |
| `biography` | text | Uzun biyografi |
| `slogan` | text | Slogan |
| `coverImage` | text | Kapak görseli URL |
| `gallery` | text | Galeri JSON |
| `isVerifiedByAdmin` | boolean | Admin onayı |
| `tier` | enum | `free \| basic \| premium \| vip` |
| `verificationStatus` | enum | `none \| pending_ai \| pending_admin \| approved \| rejected` |
| `visibilityStatus` | enum | `hidden \| public` |
| `hasVerifiedBadge` | boolean | Güven rozeti |
| `pendingData` | text | Moderasyon: bekleyen değişiklikler (JSON) |
| `hasPendingUpdate` | boolean | Bekleyen güncelleme bayrağı |
| `freeTrialEndsAt` | timestamp | Ücretsiz ilan bitiş tarihi |

---

### `chat_conversations` — Konuşmalar

| Kolon | Tip | Açıklama |
|-------|-----|----------|
| `id` | serial PK | — |
| `participantIds` | text | Katılımcı user ID'leri (JSON dizi) |
| `disappearAfterHours` | int | Kaybolan mesaj süresi (saat, null=kapalı) |
| `lastMessageAt` | timestamp | Son mesaj zamanı |

---

### `chat_messages` — Mesajlar

| Kolon | Tip | Açıklama |
|-------|-----|----------|
| `id` | serial PK | — |
| `conversationId` | int FK | Konuşma |
| `senderId` | int FK | Gönderen |
| `content` | text | Mesaj içeriği |
| `type` | enum | `text \| image \| audio \| video \| location` |
| `expiresAt` | timestamp | Otomatik silinme zamanı |
| `isRead` | boolean | Okundu mu? |
| `isAiFlagged` | boolean | AI filtre uyarısı |
| `isDeleted` | boolean | Soft delete |

---

### `escort_photos` — Fotoğraflar

| Kolon | Tip | Açıklama |
|-------|-----|----------|
| `isPrimary` | boolean | Profil resmi mi? |
| `isFaceHidden` | boolean | Yüz gizlendi mi? |
| `privacyLevel` | enum | `public \| members \| gold` |

---

### Diğer Tablolar

| Tablo | Açıklama |
|-------|----------|
| `customer_profiles` | Müşteri profilleri (bakiye) |
| `appointments` | Randevular |
| `reviews` | Değerlendirmeler |
| `media` | Genel medya (video/resim) |
| `audit_logs` | Admin işlem kayıtları |
| `forum_categories` | Forum kategorileri |
| `forum_topics` | Forum konuları |
| `forum_posts` | Forum gönderileri |
| `loyalty_transactions` | Puan işlem geçmişi |

---

## 📦 Dışa Aktarılan Tipler

```ts
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type EscortProfile = typeof escortProfiles.$inferSelect;
export type NewEscortProfile = typeof escortProfiles.$inferInsert;
// ... ve diğer tablolar için aynı pattern
```

---

## ⚠️ Dikkat Edilmesi Gerekenler

- `gallery` ve `mediaPrivacySettings` kolonları metin olarak saklanmış JSON — gerçek bir `jsonb` tipi kullanılabilir.
- `participantIds` chat_conversations'da metin JSON — daha iyi bir çözüm foreign key pivot tablo olurdu.
- `verificationStatus` ve `visibilityStatus` enum string olarak saklanıyor; tip güvenliği için Drizzle `pgEnum` kullanılabilir.

---

## 💡 AI Öneri

> **1. `pgEnum` Kullanımı:**
> Şu an enum değerler `text(col, { enum: [...] })` ile tanımlanmış. PostgreSQL'in yerel `CREATE TYPE` enum'larını (`pgEnum`) kullanmak daha performanslı ve tip güvenli olur.
>
> **2. `gallery` için JSONB:**
> ```ts
> gallery: jsonb('gallery').$type<string[]>()
> ```
>
> **3. Chat için Pivot Tablo:**
> `participantIds` JSON yerine `chat_participants(conversationId, userId)` pivot tablosu daha ölçeklenebilir ve sorgulanabilir.
>
> **4. Yumuşak Silme (Soft Delete) Standardizasyonu:**
> `chat_messages`'da `isDeleted` var, diğer tablolarda yok. Tüm kritik tablolara `deletedAt timestamp` eklenmesi veri güvenliği için önerilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
