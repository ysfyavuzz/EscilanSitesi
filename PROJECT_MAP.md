# 🗺️ Zühre Planet — Proje Haritası ve Dokümantasyon Takibi

> **⚠️ ZORUNLU:** Her geliştirici (insan veya AI) yaptığı değişikliği bu dosyada işaretlemeli ve **JOURNAL.md** dosyasına kayıt eklemelidir. Detaylar için → [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📖 Sembol Anlamları

| Sembol | Anlam |
|--------|-------|
| ✅ | `docs/` klasöründe detaylı dökümanı mevcut |
| 🔲 | Döküman yazılmadı (yapılacak) |
| ⚠️ | Kısmi / eksik döküman |
| 🔴 | Kritik dosya — öncelikli dökümanlanmalı |
| 🔵 | Bu ay yeni eklendi |
| 🐛 | Bug tespit edildi |

---

## 📊 Genel İstatistik

*Son güncelleme: 2026-02-21 10:19*

| Katman | Toplam Dosya | ✅ Dökümanlandı | 🔲 Bekliyor |
|--------|-------------|----------------|------------|
| `src/lib/` | 6 | **6** | 0 |
| `src/drizzle/` | 2 | **2** | 0 |
| `src/server/routers/` | 9 | **5** | 4 |
| `src/contexts/` | 5 | **2** | 3 |
| `src/hooks/` | 15 | **4** | 11 |
| `src/types/` | 13 | 0 | 13 |
| `src/pages/` | ~54 | **5** | ~49 |
| `src/components/` | ~86 | **10** | ~76 |
| **TOPLAM** | **~190** | **34 (%18)** | **~156** |

---

## 📁 src/lib/ ✅ TAMAM

| Dosya | Döküman | Açıklama |
|-------|---------|----------|
| `utils.ts` | [✅ docs/lib/utils.md](docs/lib/utils.md) | 20+ yardımcı fonksiyon, para/tarih formatlama |
| `trpc.tsx` | [✅ docs/lib/trpc.md](docs/lib/trpc.md) | tRPC istemci, auth header, QueryClient |
| `chatFilter.ts` | [✅ docs/lib/chatFilter.md](docs/lib/chatFilter.md) | BLOCKED/WARN AI kelime süzgeci |
| `loyaltySystem.ts` | [✅ docs/lib/loyaltySystem.md](docs/lib/loyaltySystem.md) | 6 rütke, XP eşikleri, getRankByXP() |
| `db.ts` | [✅ docs/lib/db.md](docs/lib/db.md) | ⚠️ ESKİ LibSQL stub — aktif DEĞİL |
| `storage.ts` | [✅ docs/lib/storage.md](docs/lib/storage.md) | 🔴 Mock stub — gerçek storage yok |

---

## 📁 src/drizzle/ ✅ TAMAM

| Dosya | Döküman | Açıklama |
|-------|---------|----------|
| `db.ts` | [✅ docs/drizzle/db.md](docs/drizzle/db.md) | PostgreSQL bağlantısı (`drizzle-orm/postgres-js`) |
| `schema.ts` | [✅ docs/drizzle/schema.md](docs/drizzle/schema.md) | 🔴 Kritik — Tüm DB tablo tanımları |

---

## 📁 src/server/routers/

| Dosya | Döküman | Durum |
|-------|---------|-------|
| `auth.router.ts` | [✅ docs/server/auth.router.md](docs/server/auth.router.md) | register, login, socialAuth, me |
| `chat.router.ts` | [✅ docs/server/chat.router.md](docs/server/chat.router.md) | disappearing msgs, AI filtre |
| `escort.router.ts` | [✅ docs/server/escort.router.md](docs/server/escort.router.md) | list, getBySlug, updateProfile (staging) |
| `media.router.ts` | [✅ docs/server/media.router.md](docs/server/media.router.md) | 🐛 registerPhoto güvenlik açığı |
| `admin_actions.router.ts` | [✅ docs/server/admin_actions.router.md](docs/server/admin_actions.router.md) | profil onay, audit log |
| `admin.router.ts` | 🔲 | Admin yönetim endpointleri |
| `appointment.router.ts` | 🔲 | Randevu sistemi |
| `forum.router.ts` | 🔲 | Forum CRUD |
| `verification.router.ts` | 🔲 | Kimlik doğrulama süreci |

---

## 📁 src/contexts/

| Dosya | Döküman | Durum |
|-------|---------|-------|
| `AuthContext.tsx` | [✅ docs/contexts/AuthContext.md](docs/contexts/AuthContext.md) | 🐛 login mock düzeltildi |
| `ThemeContext.tsx` | [✅ docs/contexts/ThemeContext.md](docs/contexts/ThemeContext.md) | Planet bazlı CSS değişkenleri |
| `WebSocketContext.tsx` | 🔲 | WS bağlantı sağlayıcısı |
| `NotificationContext.tsx` | 🔲 | Bildirim state yönetimi |
| `AnalyticsContext.tsx` | 🔲 | Analitik event takibi |

---

## 📁 src/hooks/

| Dosya | Döküman | Durum |
|-------|---------|-------|
| `useChat.ts` | [✅ docs/hooks/useChat.md](docs/hooks/useChat.md) | ⚠️ Mock veri |
| `useWebSocket.ts` | [✅ docs/hooks/useWebSocket.md](docs/hooks/useWebSocket.md) | Exponential backoff, heartbeat |
| `useNotifications.ts` | [✅ docs/hooks/useNotifications.md](docs/hooks/useNotifications.md) | Push API, VAPID |
| `useOnlineStatus.ts` | [✅ docs/hooks/useOnlineStatus.md](docs/hooks/useOnlineStatus.md) | Idle detection, page visibility |
| `useAdminActions.ts` | 🔲 | Admin aksiyonlar |
| `useAdminData.ts` | 🔲 | Admin veri çekme |
| `useAnalytics.ts` | 🔲 | Analitik hook |
| `useGuestAccess.ts` | 🔲 | Misafir erişim kontrolü |
| `useReviews.ts` | 🔲 | Yorum sistemi |
| `api/` (6 dosya) | 🔲 | API katmanı |

---

## 📁 src/types/ — 🔲 TAMAMI BEKLIYOR

| Dosya | Durum | Öncelik |
|-------|-------|---------|
| `domain.ts` | 🔲 | Yüksek |
| `loyalty.ts` | 🔲 | Yüksek |
| `payment.ts` | 🔲 | Yüksek |
| `message.ts` | 🔲 | Yüksek |
| `websocket.ts` | 🔲 | Orta |
| `notification.ts` | 🔲 | Orta |
| `notifications.ts` | 🔲 | Orta |
| `admin.ts` | 🔲 | Orta |
| `reviews.ts` | 🔲 | Normal |
| `reviewsExtended.ts` | 🔲 | Normal |
| `filter.ts` | 🔲 | Normal |
| `analytics.ts` | 🔲 | Normal |
| `role.ts` | 🔲 | Normal |

---

## 📁 src/pages/

### Admin Sayfaları

| Dosya | Döküman | Durum |
|-------|---------|-------|
| `AdminDashboard.tsx` | [✅ docs/pages/AdminDashboard.md](docs/pages/AdminDashboard.md) | Rol bazlı erişim |
| `AdminApprovals.tsx` | 🔲 | |
| `AdminComplaints.tsx` | 🔲 | |
| `AdminRealTimeMonitoring.tsx` | 🔲 | |
| `AdminReports.tsx` | 🔲 | |
| `AdminMessages.tsx` | 🔲 | |
| `AdminSecurity.tsx` | 🔲 | |
| `AdminSettings.tsx` | 🔲 | |
| Diğer Admin sayfaları (7) | 🔲 | |

### Escort Sayfaları

| Dosya | Döküman | Durum |
|-------|---------|-------|
| `EscortDashboard.tsx` | [✅ docs/pages/EscortDashboard.md](docs/pages/EscortDashboard.md) | Profil güncelleme staging |
| `EscortProfile.tsx` | [✅ docs/pages/EscortProfile.md](docs/pages/EscortProfile.md) | 🐛 tRPC bağlanmamış |
| `VerificationCenter.tsx` | [✅ docs/pages/VerificationCenter.md](docs/pages/VerificationCenter.md) | 🐛 import düzeltildi |
| `EscortRegister.tsx` | 🔲 | |
| `EscortAnalyticsDashboard.tsx` | 🔲 | |
| Diğer Escort sayfaları (4) | 🔲 | |

### Müşteri / Genel Sayfalar

| Dosya | Döküman | Durum |
|-------|---------|-------|
| `MyAppointments.tsx` | [✅ docs/pages/MyAppointments.md](docs/pages/MyAppointments.md) | Randevu yönetimi |
| `RealTimeMessaging.tsx` | 🔲 | |
| `BillingDashboard.tsx` | 🔲 | |
| `ClientRegister.tsx` | 🔲 | |
| Diğer sayfalar (~45) | 🔲 | |

---

## 📁 src/components/

### Dökümanlanmış

| Dosya | Döküman | Durum |
|-------|---------|-------|
| `ChatWindow.tsx` | [✅ docs/components/ChatWindow.md](docs/components/ChatWindow.md) | Chat kapısı sistemi |
| `DashboardRouter.tsx` | [✅ docs/components/DashboardRouter.md](docs/components/DashboardRouter.md) | Rol → panel yönlendirme |
| `ProtectedRoute.tsx` | [✅ docs/components/ProtectedRoute.md](docs/components/ProtectedRoute.md) | Auth/rol guard |
| `BookingForm.tsx` | [✅ docs/components/BookingForm.md](docs/components/BookingForm.md) | 2 adımlı randevu formu |
| `LoyaltyDashboard.tsx` | [✅ docs/components/LoyaltyDashboard.md](docs/components/LoyaltyDashboard.md) | 🐛 import düzeltildi |
| `VideoCall.tsx` | [✅ docs/components/VideoCall.md](docs/components/VideoCall.md) | WebRTC, PiP, heartbeat |
| `PaymentCheckout.tsx` | [✅ docs/components/PaymentCheckout.md](docs/components/PaymentCheckout.md) | Checkout, KDV, indirim |
| `admin/PendingProfileUpdates.tsx` | ✅ (kod içi) | Diff view, onay akışı |
| `auth/RegisterModal.tsx` | ✅ (kod içi) | 3 adımlı kayıt |
| `chat/DisappearTimerSetting.tsx` | ✅ (kod içi) | Kaybolan mesaj ayarı |

### Dökümanlanmamış (~76 dosya)

`ChatInterface`, `ConversationList`, `MessageBubble`, `CustomerRatingForm`, `PostBookingReview`, `ReviewForm`, `SubscriptionPlanSelector`, `PhotoGalleryEnhanced`, `AdvancedFilter`, `PaymentMethodForm`, `PaymentSecurity`, `VideoUpload`, `NotificationCenter`, `NotificationSettings` ve diğerleri...

---

## 🐛 Tespit Edilen Açık Bug'lar

| # | Dosya | Sorun | Durum |
|---|-------|-------|-------|
| 1 | `media.router.ts` | `registerPhoto` sahiplik kontrolü eksik | 🔲 Bekliyor |
| 2 | `EscortProfile.tsx` | tRPC bağlanmamış, mock servis kullanıyor | 🔲 Bekliyor |
| 3 | `PaymentCheckout.tsx` | `window.location.href` → wouter kullanılmalı | 🔲 Bekliyor |
| 4 | `LoyaltyDashboard` + `loyaltySystem.ts` | İki uyumsuz rütke sistemi | 🔲 Bekliyor |
| 5 | `lib/storage.ts` | Mock stub — gerçek storage yok | 🔲 Bekliyor |
| 6 | `lib/db.ts` | Eski LibSQL stub, aktif değil | 🔲 Bekliyor |

---

## 📋 Döküman Rehberi

→ Tüm döküman dosyalarına hızlı erişim: **[docs/INDEX.md](docs/INDEX.md)**

---

*Son güncelleme: 2026-02-21 10:19 | Güncelleyen: Antigravity AI*
