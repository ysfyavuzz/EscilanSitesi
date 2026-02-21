# `docs/` — Zühre Planet Dökümanlar Dizin Rehberi

Bu dosya, `docs/` klasöründeki tüm döküman dosyalarına hızlı erişim sağlar.
Her döküman: dosyanın amacı, hataları, güvenlik notları ve AI önerileri içerir.

---

## 📁 docs/lib/

| Dosya | Konu |
|-------|------|
| [utils.md](lib/utils.md) | 20+ yardımcı fonksiyon, Türkçe locale, debounce/throttle, storage |
| [trpc.md](lib/trpc.md) | tRPC istemci yapılandırması, auth token header, QueryClient |
| [chatFilter.md](lib/chatFilter.md) | BLOCKED/WARN AI mesaj süzgeci, Türkçe normalizasyon |
| [loyaltySystem.md](lib/loyaltySystem.md) | 6 rütke, XP eşikleri, getRankByXP(), XP_REWARDS sabitleri |
| [db.md](lib/db.md) | ⚠️ Eski LibSQL stub — aktif kullanımda DEĞİL |
| [storage.md](lib/storage.md) | 🔴 Mock stub — gerçek dosya yükleme yok |

---

## 📁 docs/drizzle/

| Dosya | Konu |
|-------|------|
| [db.md](drizzle/db.md) | PostgreSQL bağlantısı, `drizzle-orm/postgres-js` |
| [schema.md](drizzle/schema.md) | Tüm tablo kolonları: users, escortProfiles, chatMessages vb. |

---

## 📁 docs/server/

| Dosya | Konu |
|-------|------|
| [auth.router.md](server/auth.router.md) | register, login, socialAuth, completeProfile, acceptChatRules, me |
| [chat.router.md](server/chat.router.md) | sendMessage (AI filtre + disappearing), setDisappearTimer, getMessages |
| [escort.router.md](server/escort.router.md) | list (filtre + sıralama), getBySlug, updateProfile (staging) |
| [media.router.md](server/media.router.md) | ⚠️ registerPhoto bug, applyAIEffect (simüle), toggleFacePrivacy |
| [admin_actions.router.md](server/admin_actions.router.md) | setShadowBan, approveEscort, profil onay/red, audit log |

---

## 📁 docs/pages/

| Dosya | Konu |
|-------|------|
| [AdminDashboard.md](pages/AdminDashboard.md) | Platform yönetim paneli, rol bazlı erişim |
| [EscortDashboard.md](pages/EscortDashboard.md) | Escort paneli, profil güncelleme staging akışı |
| [EscortProfile.md](pages/EscortProfile.md) | ⚠️ Hâlâ mock servis kullanıyor, tRPC bağlanmamış |
| [MyAppointments.md](pages/MyAppointments.md) | Müşteri randevu yönetimi, sekme yapısı |
| [VerificationCenter.md](pages/VerificationCenter.md) | ✅ import bug düzeltildi — 4 adımlı kimlik doğrulama |

---

## 📁 docs/components/

| Dosya | Konu |
|-------|------|
| [ChatWindow.md](components/ChatWindow.md) | Chat arayüzü, ChatRulesModal kapısı, DisappearTimerSetting noktası |
| [DashboardRouter.md](components/DashboardRouter.md) | Rol → panel yönlendirme akışı |
| [ProtectedRoute.md](components/ProtectedRoute.md) | Auth/rol guard, JWT kontrol |
| [BookingForm.md](components/BookingForm.md) | 2 adımlı randevu formu, sanitizeMessage, fiyat hesaplama |
| [LoyaltyDashboard.md](components/LoyaltyDashboard.md) | ✅ Bug düzeltildi — sadakat paneli, 4 sekme, referral sistemi |
| [VideoCall.md](components/VideoCall.md) | WebRTC UI, PiP, fullscreen, IncomingCallModal, OutgoingCallModal |
| [PaymentCheckout.md](components/PaymentCheckout.md) | 3 adımlı checkout, KDV %20, indirim kodu (mock), fatura adresi |

---

## 🐛 Bu Oturumda Tespit Edilen Buglar

| # | Dosya | Sorun | Durum |
|---|-------|-------|-------|
| 1 | `LoyaltyDashboard.tsx` | Duplike import: `Shield`, `ShoppingCart` | ✅ Düzeltildi |
| 2 | `VerificationCenter.tsx` | `@/utils/trpc` → `@/lib/trpc` yanlış import | ✅ Düzeltildi |
| 3 | `media.router.ts` `registerPhoto` | Sahiplik kontrolü yok — güvenlik açığı | 🔲 Bekliyor |
| 4 | `EscortProfile.tsx` | Mock `listingService` — tRPC bağlanmamış | 🔲 Bekliyor |
| 5 | `PaymentCheckout.tsx` | `window.location.href` yerine `wouter` kullanılmalı | 🔲 Bekliyor |
| 6 | `LoyaltyDashboard.tsx` | `loyaltySystem.ts` uyumsuz iki ayrı rütke sistemi | 🔲 Bekliyor |

---

*Son güncelleme: 2026-02-21 10:10 | Antigravity AI*
