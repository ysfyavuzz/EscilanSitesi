# 📔 Zühre Planet — Geliştirici Günlüğü (JOURNAL.md)

> Bu dosya tüm geliştiriciler ve AI asistanlar tarafından doldurulmalıdır.
> **Her kayıt:** `Tarih | Saat | Kaynak | Kategori | Açıklama` formatında olmalıdır.
> Kaynak: Geliştirici adı veya AI asistan (örn. `Antigravity AI`)
> Kategori: `[FEAT]` Yeni özellik | `[FIX]` Düzeltme | `[DOC]` Döküman | `[REFACTOR]` Yeniden yapılandırma | `[SCHEMA]` Veritabanı | `[SEC]` Güvenlik | `[CONFIG]` Yapılandırma

---

## Format

```
| YYYY-MM-DD | SS:DD | Kaynak | [KATEGORİ] | Açıklama |
```

---

## 📋 Değişiklik Kaydı

| Tarih | Saat | Kaynak | Kategori | Değişiklik |
|-------|------|--------|----------|------------|
| 2026-02-21 | 09:10 | Antigravity AI | [SCHEMA] | `escort_profiles` tablosuna `pendingData`, `hasPendingUpdate` kolonları eklendi (profil moderasyon staging) |
| 2026-02-21 | 09:12 | Antigravity AI | [FEAT] | `escort.router.ts` — `updateProfile` mutasyonu staging mantığına geçirildi (direkt kayıt yerine `pendingData`) |
| 2026-02-21 | 09:21 | Antigravity AI | [SCHEMA] | `users` tablosuna `phoneNumber` (UNIQUE), `provider`, `providerId`, `hasAcceptedTerms`, `termsAcceptedAt`, `hasAcceptedChatRules`, `chatRulesAcceptedAt`, `isProfileComplete` alanları eklendi |
| 2026-02-21 | 09:22 | Antigravity AI | [SEC] | `auth.router.ts` — 50+ sahte/geçici mail domain engeli (mailinator, guerrillamail vb.), telefon tekiliği kontrolü, KVKK zorunlu onay eklendi |
| 2026-02-21 | 09:23 | Antigravity AI | [FEAT] | `auth.router.ts` — `socialAuth`, `completeProfile`, `acceptChatRules`, `me` mutasyonları eklendi |
| 2026-02-21 | 09:24 | Antigravity AI | [FEAT] | `components/auth/RegisterModal.tsx` — 3 adımlı kayıt akışı (üyelik tipi → bilgiler → KVKK) oluşturuldu |
| 2026-02-21 | 09:25 | Antigravity AI | [FEAT] | `components/auth/ProfileCompleteModal.tsx` — Sosyal giriş sonrası eksik bilgi formu oluşturuldu |
| 2026-02-21 | 09:26 | Antigravity AI | [FEAT] | `components/chat/ChatRulesModal.tsx` — İlk chat öncesi platform kuralları onay modalı oluşturuldu |
| 2026-02-21 | 09:27 | Antigravity AI | [FEAT] | `components/ChatWindow.tsx` — `hasAcceptedChatRules` prop ile chat kapı sistemi entegre edildi |
| 2026-02-21 | 09:34 | Antigravity AI | [FEAT] | `admin_actions.router.ts` — `getPendingProfileUpdates`, `approveProfileUpdate`, `rejectProfileUpdate` mutasyonları eklendi |
| 2026-02-21 | 09:35 | Antigravity AI | [FEAT] | `components/admin/PendingProfileUpdates.tsx` — Admin için diff görünümlü profil güncelleme onay arayüzü oluşturuldu |
| 2026-02-21 | 09:36 | Antigravity AI | [FEAT] | `components/escort/PendingUpdateBanner.tsx` — Escort için "onay bekliyor" uyarı banner bileşeni oluşturuldu |
| 2026-02-21 | 09:37 | Antigravity AI | [FEAT] | `src/lib/loyaltySystem.ts` — 6 rütbe (Bronz→Galaktik), XP eşikleri, indirim sistemi, `getRankByXP()` fonksiyonu oluşturuldu |
| 2026-02-21 | 09:38 | Antigravity AI | [FEAT] | `components/LoyaltyRankCard.tsx` — Animasyonlu XP ilerleme çubuğu, rütbe rozeti, puan bakiyesi bileşeni oluşturuldu |
| 2026-02-21 | 09:39 | Antigravity AI | [SEC] | `src/lib/chatFilter.ts` — AI kelime süzgeci (BLOCKED/WARN), Türkçe normalizasyon ile yazım hilesi koruması oluşturuldu |
| 2026-02-21 | 09:40 | Antigravity AI | [SCHEMA] | `schema.ts` — `chatConversations` (TTL) ve `chatMessages` (expiresAt, AI flag, okundu) tabloları eklendi |
| 2026-02-21 | 09:41 | Antigravity AI | [FEAT] | `server/routers/chat.router.ts` — Tam yeniden yazıldı: `getOrCreateConversation`, `getMessages`, `sendMessage` (AI filtre + disappearing), `setDisappearTimer`, `markAsRead`, `deleteMessage`, `getConversations` |
| 2026-02-21 | 09:42 | Antigravity AI | [FEAT] | `components/chat/DisappearTimerSetting.tsx` — Kaybolan mesaj süre ayar bileşeni (Kapalı/1 Saat/24 Saat/7 Gün) oluşturuldu |
| 2026-02-21 | 09:46 | Antigravity AI | [DOC] | `PROJECT_MAP.md` — Proje haritası ve dökümanlanma takip dosyası oluşturuldu |
| 2026-02-21 | 09:46 | Antigravity AI | [DOC] | `JOURNAL.md` — Geliştirici değişiklik günlüğü oluşturuldu |

---

## 📌 Sık Kullanılan Kategoriler

```
[FEAT]     — Yeni özellik / fonksiyon ekleme
[FIX]      — Bug düzeltmesi
[DOC]      — Döküman yazımı veya güncelleme
[REFACTOR] — Kod yeniden yapılandırması (davranış değişikliği olmadan)
[SCHEMA]   — Veritabanı tablo/kolon değişiklikleri (Drizzle)
[SEC]      — Güvenlik iyileştirmesi veya güvenlik açığı kapatma
[CONFIG]   — Yapılandırma dosyası (tsconfig, vite, env) değişikliği
[TEST]     — Test ekleme veya düzenleme
[STYLE]    — CSS / UI tasarım değişikliği (fonksiyon değişikliği olmadan)
[PERF]     — Performans iyileştirmesi
[DEPS]     — Bağımlılık (package.json) değişikliği
```

---

## ⚙️ Journal Güncelleme Kuralları

1. **Her commit'ten önce** ilgili satır JOURNAL.md'ye eklenmeli.
2. Aynı oturumda yapılan birden fazla değişiklik, ayrı satır olarak eklenmeli.
3. AI asistan değişiklik yaptığında `Antigravity AI` olarak kaydeder.
4. **Saat** yerel Türkiye saati (UTC+3) olmalıdır.
5. Açıklama kısa ama net olmalı — hangi dosya, ne değişti, neden.

---

*İlk kayıt: 2026-02-21 09:46 | Antigravity AI*
