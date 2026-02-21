# `src/lib/db.ts` — Veritabanı Yardımcıları (Eski LibSQL Stub)

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/lib/db.ts` |
| **Modül** | `lib/db` |
| **Dil** | TypeScript |
| **Teknoloji** | `drizzle-orm/libsql`, `@libsql/client` |
| **Durum** | ⚠️ Kısmi döküman — 🔴 **Kritik Uyumsuzluk Tespit Edildi** |

---

## ⚠️ UYARI — KRİTİK SORUN

> **Bu dosya, projenin gerçek veritabanı bağlantısını sağlamıyor.**
>
> Asıl bağlantı: `src/drizzle/db.ts` (PostgreSQL + `drizzle-orm/postgres-js`) ✅
>
> Bu dosya: `drizzle-orm/libsql` + `@libsql/client` (SQLite/LibSQL) kullanıyor ❌
>
> `schema.ts` dosyası `drizzle-orm/pg-core` ile yazılmış — bu, bu dosyayla **tip uyumsuz**.
> Server router'ları `@/drizzle/db` yolunu kullandığından bu dosya aktif olarak çağrılmıyor.
>
> **Öneri:** Bu dosyanın ismi `_lib_db_legacy.ts.bak` gibi değiştirilerek devre dışı bırakılmalı veya silinmelidir.

---

## 🎯 Ne Yapar? (Eski Amaç)

Supabase'den ayrılma sürecinde LibSQL/Turso ile geçici bir bağlantı noktası olarak oluşturulmuş.
Gerçek fonksiyonlar (birkaçı çalışır) ve çok sayıda `mock/stub` fonksiyon barındırır.

---

## 📦 Dışa Aktarılan Fonksiyonlar

### Gerçek Veritabanı Fonksiyonları (LibSQL üzerinden çalışır — ama aktif kullanılmıyor)

| Fonksiyon | Döner |
|-----------|-------|
| `getAllApprovedEscorts(limit, offset)` | Onaylı escort profilleri |
| `getEscortProfileById(id)` | Tekil escort profil |
| `getEscortPhotos(profileId)` | Escort fotoğrafları |
| `getCities()` | Aktif iller (distinct) |
| `getDashboardStats()` | Toplam kullanıcı/escort sayısı |
| `getAllUsers(limit, offset)` | Tüm kullanıcılar |
| `updateEscortStatus(profileId, status)` | Onaylama durumu güncelleme |
| `getEscortProfileByUserId(userId)` | Kullanıcı ID ile profil |
| `getUserById(userId)` | Kullanıcı kaydı |
| `getPendingEscorts()` | Onay bekleyen escortlar |

### Mock Stub Fonksiyonlar (Hepsi sabit/boş değer döner)

`incrementViewCount`, `getUserFavorites`, `addFavorite`, `removeFavorite`, `isFavorite`, `updateEscortVerifiedBadge`, `activateVip`, `deactivateVip`, `getPendingReviews`, `blockUser`, `unblockUser`, `deleteUser`, `createAppointment`, `getUserAppointments`, vb.

---

## 💡 AI Öneri

> **1. Bu dosyayı kaldırın veya yeniden adlandırın:**
> `src/lib/db.ts` yerine `src/drizzle/db.ts` kullanılıyor. Karışıklığı önlemek için bu dosya ya silinmeli ya da `_deprecated_db.ts` olarak işaretlenmelidir.
>
> **2. Mock fonksiyonları gerçek tRPC router'larına taşıyın:**
> `addFavorite`, `getUserFavorites` gibi kullanıma değer fonksiyonlar `src/server/routers/` altında gerçek implemetasyona kavuşturulabilir.
>
> **3. `searchEscortsAdvanced` tamamlanmalı:**
> Şu an `db.select().from(escortProfiles).limit(20)` döndürüyor — filtre parametreleri (`params`) hiç kullanılmıyor. Gerçek filtre mantığı `escort.router.ts`'in `list` prosedüründe mevcut — bu ikisi birleştirilmeli.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
