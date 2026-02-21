# ğŸ“” ZÃ¼hre Planet â€” GeliÅŸtirici GÃ¼nlÃ¼ÄŸÃ¼ (JOURNAL.md)

> Bu dosya tÃ¼m geliÅŸtiriciler ve AI asistanlar tarafÄ±ndan doldurulmalÄ±dÄ±r.
> **Her kayÄ±t:** `Tarih | Saat | Kaynak | Kategori | AÃ§Ä±klama` formatÄ±nda olmalÄ±dÄ±r.
> Kaynak: GeliÅŸtirici adÄ± veya AI asistan (Ã¶rn. `Antigravity AI`)
> Kategori: `[FEAT]` Yeni Ã¶zellik | `[FIX]` DÃ¼zeltme | `[DOC]` DÃ¶kÃ¼man | `[REFACTOR]` Yeniden yapÄ±landÄ±rma | `[SCHEMA]` VeritabanÄ± | `[SEC]` GÃ¼venlik | `[CONFIG]` YapÄ±landÄ±rma

---

## Format

```
| YYYY-MM-DD | SS:DD | Kaynak | [KATEGORÄ°] | AÃ§Ä±klama |
```

---

## ğŸ“‹ DeÄŸiÅŸiklik KaydÄ±

| Tarih | Saat | Kaynak | Kategori | DeÄŸiÅŸiklik |
|-------|------|--------|----------|------------|
| 2026-02-21 | 09:10 | Antigravity AI | [SCHEMA] | `escort_profiles` tablosuna `pendingData`, `hasPendingUpdate` kolonlarÄ± eklendi |
| 2026-02-21 | 09:12 | Antigravity AI | [FEAT] | `escort.router.ts` â€” `updateProfile` mutasyonu staging mantÄ±ÄŸÄ±na geÃ§irildi |
| 2026-02-21 | 09:21 | Antigravity AI | [SCHEMA] | `users` tablosuna telefon, sosyal giriÅŸ ve onay alanlarÄ± eklendi |
| 2026-02-21 | 09:22 | Antigravity AI | [SEC] | `auth.router.ts` â€” 50+ sahte mail engeli, telefon tekiliÄŸi, KVKK zorunlu onay |
| 2026-02-21 | 09:23 | Antigravity AI | [FEAT] | `auth.router.ts` â€” `socialAuth`, `completeProfile`, `acceptChatRules`, `me` mutasyonlarÄ± |
| 2026-02-21 | 09:24 | Antigravity AI | [FEAT] | `components/auth/RegisterModal.tsx` â€” 3 adÄ±mlÄ± kayÄ±t akÄ±ÅŸÄ± oluÅŸturuldu |
| 2026-02-21 | 09:25 | Antigravity AI | [FEAT] | `components/auth/ProfileCompleteModal.tsx` â€” Sosyal giriÅŸ sonrasÄ± eksik bilgi formu |
| 2026-02-21 | 09:26 | Antigravity AI | [FEAT] | `components/chat/ChatRulesModal.tsx` â€” Ä°lk chat kurallarÄ± onay modalÄ± |
| 2026-02-21 | 09:27 | Antigravity AI | [FEAT] | `components/ChatWindow.tsx` â€” Chat kuralÄ± kapÄ± sistemi entegrasyonu |
| 2026-02-21 | 09:34 | Antigravity AI | [FEAT] | `admin_actions.router.ts` â€” Profil gÃ¼ncelleme onay/red mutasyonlarÄ± |
| 2026-02-21 | 09:35 | Antigravity AI | [FEAT] | `components/admin/PendingProfileUpdates.tsx` â€” Admin diff view bileÅŸeni |
| 2026-02-21 | 09:36 | Antigravity AI | [FEAT] | `components/escort/PendingUpdateBanner.tsx` â€” Escort "onay bekliyor" banner |
| 2026-02-21 | 09:37 | Antigravity AI | [FEAT] | `src/lib/loyaltySystem.ts` â€” 6 rÃ¼tbe, XP eÅŸikleri, indirim sistemi |
| 2026-02-21 | 09:38 | Antigravity AI | [FEAT] | `components/LoyaltyRankCard.tsx` â€” Animasyonlu XP kart bileÅŸeni |
| 2026-02-21 | 09:39 | Antigravity AI | [SEC] | `src/lib/chatFilter.ts` â€” BLOCKED/WARN AI kelime sÃ¼zgeci |
| 2026-02-21 | 09:40 | Antigravity AI | [SCHEMA] | `chatConversations` ve `chatMessages` tablolarÄ± eklendi |
| 2026-02-21 | 09:41 | Antigravity AI | [FEAT] | `chat.router.ts` â€” Tam yeniden yazÄ±ldÄ±: disappearing messages dahil tÃ¼m operasyonlar |
| 2026-02-21 | 09:42 | Antigravity AI | [FEAT] | `components/chat/DisappearTimerSetting.tsx` â€” Kaybolan mesaj ayar bileÅŸeni |
| 2026-02-21 | 09:46 | Antigravity AI | [DOC] | `PROJECT_MAP.md` ve `JOURNAL.md` proje kÃ¶kÃ¼ne oluÅŸturuldu |
| 2026-02-21 | 09:57 | Antigravity AI | [DOC] | `docs/lib/` â€” utils, trpc, db, storage, chatFilter, loyaltySystem dÃ¶kÃ¼manlarÄ± |
| 2026-02-21 | 10:00 | Antigravity AI | [DOC] | `docs/drizzle/` â€” schema.md, db.md dÃ¶kÃ¼manlarÄ± (kritik tablo yapÄ±sÄ±) |
| 2026-02-21 | 10:02 | Antigravity AI | [DOC] | `docs/server/` â€” auth, chat, escort, media, admin_actions router dÃ¶kÃ¼manlarÄ± |
| 2026-02-21 | 10:05 | Antigravity AI | [DOC] | `docs/pages/` â€” EscortProfile, AdminDashboard, EscortDashboard, MyAppointments |
| 2026-02-21 | 10:06 | Antigravity AI | [DOC] | `docs/components/` â€” ChatWindow, DashboardRouter, ProtectedRoute dÃ¶kÃ¼manlarÄ± |
| 2026-02-21 | 10:06 | Antigravity AI | [BUG] | `media.router.ts` gÃ¼venlik aÃ§Ä±ÄŸÄ± tespit edildi: `registerPhoto`'da profileId sahiplik kontrolÃ¼ eksik |
| 2026-02-21 | 10:06 | Antigravity AI | [BUG] | `EscortProfile.tsx` tRPC entegrasyonu eksik â€” hÃ¢lÃ¢ mock `listingService` kullanÄ±yor |
| 2026-02-21 | 10:10 | Antigravity AI | [DOC] | `docs/components/` â€” BookingForm, LoyaltyDashboard, VideoCall, PaymentCheckout dÃ¶kÃ¼manlarÄ± |
| 2026-02-21 | 10:11 | Antigravity AI | [FIX] | `components/LoyaltyDashboard.tsx` â€” duplike `Shield`/`ShoppingCart` import satÄ±rlarÄ± kaldÄ±rÄ±ldÄ± |
| 2026-02-21 | 10:11 | Antigravity AI | [DOC] | `docs/pages/VerificationCenter.md` â€” 4 adÄ±mlÄ± kimlik doÄŸrulama akÄ±ÅŸÄ± dÃ¶kÃ¼manlandÄ± |
| 2026-02-21 | 10:11 | Antigravity AI | [FIX] | `pages/VerificationCenter.tsx` â€” `@/utils/trpc` â†’ `@/lib/trpc` yanlÄ±ÅŸ import yolu dÃ¼zeltildi |
| 2026-02-21 | 10:12 | Antigravity AI | [DOC] | `docs/INDEX.md` â€” tÃ¼m dÃ¶kÃ¼man dosyalarÄ±na hÄ±zlÄ± eriÅŸim rehberi oluÅŸturuldu |
| 2026-02-21 | 10:15 | Antigravity AI | [DOC] | `docs/hooks/` â€” useChat, useWebSocket, useNotifications, useOnlineStatus dÃ¶kÃ¼manlarÄ± |
| 2026-02-21 | 10:17 | Antigravity AI | [DOC] | `docs/contexts/` â€” AuthContext, ThemeContext dÃ¶kÃ¼manlarÄ± |
| 2026-02-21 | 10:17 | Antigravity AI | [BUG] | `contexts/AuthContext.tsx` â€” email bazlÄ± rol belirleme gÃ¼venlik aÃ§Ä±ÄŸÄ± tespit edildi |
| 2026-02-21 | 10:18 | Antigravity AI | [SEC] | `contexts/AuthContext.tsx` â€” `email.includes('admin')` rol aÃ§Ä±ÄŸÄ± kapatÄ±ldÄ±; her zaman `customer` atanÄ±r |
| 2026-02-21 | 10:19 | Antigravity AI | [DOC] | `PROJECT_MAP.md` â€” 34 dosyanÄ±n dÃ¶kÃ¼man durumu gÃ¼ncellendi, istatistikler yenilendi |
| 2026-02-21 | 10:19 | Antigravity AI | [DOC] | `CONTRIBUTING.md` â€” GeliÅŸtirici ve AI asistan iÃ§in zorunlu dÃ¶kÃ¼man kurallarÄ± oluÅŸturuldu |


---

## ğŸ“Œ SÄ±k KullanÄ±lan Kategoriler

```
[FEAT]     â€” Yeni Ã¶zellik / fonksiyon ekleme
[FIX]      â€” Bug dÃ¼zeltmesi
[DOC]      â€” DÃ¶kÃ¼man yazÄ±mÄ± veya gÃ¼ncelleme
[REFACTOR] â€” Kod yeniden yapÄ±landÄ±rmasÄ± (davranÄ±ÅŸ deÄŸiÅŸikliÄŸi olmadan)
[SCHEMA]   â€” VeritabanÄ± tablo/kolon deÄŸiÅŸiklikleri (Drizzle)
[SEC]      â€” GÃ¼venlik iyileÅŸtirmesi veya gÃ¼venlik aÃ§Ä±ÄŸÄ± kapatma
[CONFIG]   â€” YapÄ±landÄ±rma dosyasÄ± (tsconfig, vite, env) deÄŸiÅŸikliÄŸi
[TEST]     â€” Test ekleme veya dÃ¼zenleme
[STYLE]    â€” CSS / UI tasarÄ±m deÄŸiÅŸikliÄŸi (fonksiyon deÄŸiÅŸikliÄŸi olmadan)
[PERF]     â€” Performans iyileÅŸtirmesi
[DEPS]     â€” BaÄŸÄ±mlÄ±lÄ±k (package.json) deÄŸiÅŸikliÄŸi
```

---

## âš™ï¸ Journal GÃ¼ncelleme KurallarÄ±

1. **Her commit'ten Ã¶nce** ilgili satÄ±r JOURNAL.md'ye eklenmeli.
2. AynÄ± oturumda yapÄ±lan birden fazla deÄŸiÅŸiklik, ayrÄ± satÄ±r olarak eklenmeli.
3. AI asistan deÄŸiÅŸiklik yaptÄ±ÄŸÄ±nda `Antigravity AI` olarak kaydeder.
4. **Saat** yerel TÃ¼rkiye saati (UTC+3) olmalÄ±dÄ±r.
5. AÃ§Ä±klama kÄ±sa ama net olmalÄ± â€” hangi dosya, ne deÄŸiÅŸti, neden.

---

*Ä°lk kayÄ±t: 2026-02-21 09:46 | Antigravity AI*
| 2026-02-21 | 11:03 | Gemini CLI | [DOC] | src/types/ (domain, loyalty, payment) dökümanları oluşturuldu. |
| 2026-02-21 | 11:20 | Gemini CLI | [DOC] | message.ts ve websocket.ts dökümanları oluşturuldu. |
| 2026-02-21 | 11:30 | Gemini CLI | [DOC] | 
otification.ts ve ole.ts dökümanları oluşturuldu. |
| 2026-02-21 | 11:40 | Gemini CLI | [DOC] | eviews.ts, ilter.ts ve dmin.ts dökümanları oluşturuldu. |

| 2026-02-21 | 11:55 | Gemini CLI | [DOC] | WebSocketContext, NotificationContext ve AnalyticsContext dökümanları oluşturuldu. |
| 2026-02-21 | 12:05 | Gemini CLI | [DOC] | Ana altyapı (Docker, Drizzle, Vite) dökümanları oluşturuldu. |
