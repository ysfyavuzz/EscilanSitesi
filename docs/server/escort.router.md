# `src/server/routers/escort.router.ts` — Escort Profil Router'ı

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/server/routers/escort.router.ts` |
| **Dil** | TypeScript |
| **Teknoloji** | tRPC, Drizzle ORM, Zod |
| **Prosedür Türleri** | `publicProcedure` (list, getBySlug) + `protectedProcedure` (updateProfile) |
| **Durum** | ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Escort profillerinin listelenmesi, tekil profil görüntülenmesi ve escort'un kendi profilini güncellemesi (admin moderasyonlu) işlemlerini yönetir.

---

## 📦 Prosedürler

### `list` — Escort Listesi
**Tip:** `publicProcedure.query` — Giriş gerektirmez.

**Input:**
```ts
{
  page?: number,        // default: 1
  limit?: number,       // 1-100, default: 20
  city?: string,        // Şehir filtresi
  tier?: string,        // 'free' | 'basic' | 'premium' | 'vip'
  isBoosted?: boolean,  // Öne çıkarılmış filtresi
  search?: string,      // displayName veya bio içinde arama (ILIKE)
  sortBy?: 'rating' | 'createdAt' | 'hourlyRate'  // default: 'rating'
  sortOrder?: 'asc' | 'desc'  // default: 'desc'
}
```

**Output:** `{ profiles: EscortProfile[], pagination: { page, limit, total, totalPages } }`

**Özel Davranış:**
- `isBoosted: true` olan profiller **her zaman listenin başına** gelir (`ORDER BY isBoosted DESC`)
- `search` hem `displayName` hem `bio` alanlarında ILIKE ile arar

---

### `getBySlug` — Tekil Profil
**Tip:** `publicProcedure.query`

**Input:** `{ slug: string }`

**İlişkili Veriler:** `media` (fotoğraflar/videolar) + `reviews` (son 10 yorum)

**Özel Davranış:**
- `viewCount` her görüntülemede fire-and-forget olarak artırılır (performansı etkilemez)
- Profil bulunamazsa `NOT_FOUND` fırlatır

---

### `updateProfile` — Profil Güncelleme (Moderasyonlu)
**Tip:** `protectedProcedure.mutation` — Yalnızca `role: 'escort'` kullanabilir.

**Input:**
```ts
{
  displayName?: string,
  bio?: string,
  biography?: string,
  slogan?: string,
  city?: string,
  district?: string,
  age?: number
}
```

**Staging Akışı:**
1. Değişiklikler **doğrudan yayınlanmaz**
2. `pendingData` kolonuna JSON olarak kaydedilir
3. `hasPendingUpdate: true` bayrağı aktif edilir
4. Admin `approveProfileUpdate` çağırınca değişiklikler ana kolonlara uygulanır

```
Escort → updateProfile → pendingData ← Admin onaylar → profil güncellenir
```

---

## ⚠️ Tespit Edilen Sorun

`sortBy` dinamik index kullanımı:
```ts
asc(schema.escortProfiles[sortBy])  // sortBy bir string
```
TypeScript bu kullanımda tip hatası verebilir. Güvenli yaklaşım için switch-case veya explicit map kullanılmalı:
```ts
const orderMap = { rating: schema.escortProfiles.rating, createdAt: schema.escortProfiles.createdAt, hourlyRate: schema.escortProfiles.hourlyRate };
```

---

## 💡 AI Öneri

> **1. `list` Prosedürüne Konum Filtresi:**
> `district` (ilçe) filtreleme eklenmeli — şehir seçildiğinde ilçe bazlı arama çok daha spesifik SEO ve kullanıcı deneyimi sağlar.
>
> **2. `getBySlug` için Relation Guard:**
> `media` ve `reviews` ilişkileri schema'da `relations()` ile tanımlanmış olmalı; aksi halde runtime hatası oluşur. İlişki tanımları `schema.ts`'te kontrol edilmeli.
>
> **3. Fiyat Aralığı Filtresi:**
> `list` prosedürüne `minRate` / `maxRate` parametreleri eklenerek fiyat filtresi sunulabilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
