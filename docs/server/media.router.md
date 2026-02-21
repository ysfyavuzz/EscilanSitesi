# `src/server/routers/media.router.ts` — Medya ve AI Efekt Router'ı

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/server/routers/media.router.ts` |
| **Dil** | TypeScript |
| **Teknoloji** | tRPC, Drizzle ORM, Zod, Simüle AI İşleme |
| **Prosedür Türleri** | `protectedProcedure` (tüm prosedürler) |
| **Durum** | ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Escort fotoğraflarının sisteme kaydedilmesini, AI efektleri (arka plan silme, retuş, yüz maskesi) uygulanmasını ve gizlilik seviyesi ayarlanmasını yönetir.

---

## 📦 Prosedürler

### `registerPhoto` — Fotoğraf Kaydı
Yükleme tamamlandıktan sonra fotoğrafı veritabanına kaydeder.

**Input:** `{ url: string, profileId?: number }`

> ⚠️ **Sorun:** `profileId` sağlanmazsa `Mock profile ID: 1` kullanılıyor. Gerçek uygulamada `ctx.user.id`'den profil ID bulunmalıdır.

---

### `applyAIEffect` — AI Efekti Uygula
Fotoğrafa arka plan silme veya retuş efekti uygular.

**Input:** `{ photoId: number, effect: 'remove_bg' | 'retouch' }`

**Şu Anki Davranış:** `processImageAI()` 1.5 saniye bekleyip URL'e `?ai_processed=...` ekleyerek simüle ediyor.
**Gerçek Entegrasyon Gerekiyor:** Photoroom API, Picsart API veya Cloudinary AI Transformations.

---

### `toggleFacePrivacy` — Yüz Gizle/Göster
Escort fotoğrafında yüzü maskeler veya açar.

**Input:** `{ photoId: number, isHidden: boolean, maskStyle?: string }`

**Akış:**
1. `isHidden: true` ve `maskedUrl` yoksa → AI `mask_face` efekti oluşturur
2. `maskedUrl` varsa tekrar AI çağırmaz (önbellekler)
3. `isHidden: false` ise `maskedUrl: null` ayarlanır

---

### `setPrivacyLevel` — Fotoğraf Gizlilik Seviyesi
Orijinal fotoğrafın kimlere gösterileceğini belirler.

**Input:** `{ photoId: number, level: 'public' | 'members' | 'gold' }`

| Seviye | Görüntüleyici |
|--------|---------------|
| `public` | Herkese açık |
| `members` | Kayıtlı üyeler |
| `gold` | Gold/VIP üyeler |

---

## ⚠️ Kritik Sorunlar

1. **`registerPhoto` — profileId Mock:** `profileId || 1` satırı production'da yanlış profile fotoğraf ekler. `ctx.user` üzerinden escort profili sorgulanmalı.
2. **`applyAIEffect` — Sahiplik Kontrolü Eksik:** Kod yorumda "Sadece kendi fotoğrafını düzenleyebilir" yazıyor ama kontrol implemente edilmemiş. Başkasının `photoId`'i verilirse o fotoğraf değiştirilebilir.
3. **AI Simülasyon:** `processImageAI()` gerçek API çağrısı yapmıyor.

---

## 💡 AI Öneri

> **1. Sahiplik Kontrolü Ekleyin (Güvenlik):**
> ```ts
> const escort = await db.query.escortProfiles.findFirst({ where: eq(escortProfiles.userId, ctx.user.id) });
> if (photo.profileId !== escort?.id) throw new TRPCError({ code: 'FORBIDDEN' });
> ```
>
> **2. Gerçek AI Entegrasyonu:**
> - **Photoroom API** (`https://sdk.photoroom.com`) — arka plan silme için önerilir
> - **Replicate.com** — açık kaynak modellerle yüz maskeleme için ekonomik seçenek
>
> **3. Asenkron İşlem Kuyruğu:**
> AI işlemleri dakikalar alabilir. `BullMQ` veya benzeri bir job kuyruğuyla arka planda işlenip WebSocket / polling ile sonuç bildirilebilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
