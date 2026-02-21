# 🗺️ Zühre Planet — Proje Haritası ve Dokümantasyon Takibi

> **Bu dosya `PROJECT_MAP.md` adıyla proje köküne yazılmıştır.**
> Her geliştirici yaptığı değişikliği bu dosyada ilgili satırı işaretlemeli ve **JOURNAL.md** dosyasına kayıt eklemelidir.

---

## 📖 Sembol Anlamları

| Sembol | Anlam |
|--------|-------|
| ✅ | JSDoc / TSDoc başlığı + açıklama mevcut |
| 🔲 | Döküman yazılmadı (yapılacak) |
| ⚠️ | Kısmi / eksik döküman |
| 🔴 | Kritik — öncelikli dökümanlanmalı |
| 🔵 | Yeni eklendi (bu ay) |

---

## 📊 Genel İstatistik

| Kategori | Toplam | ✅ Dökümanlandı | 🔲 Bekliyor |
|----------|--------|----------------|------------|
| `src/` Kök Dosyalar | 7 | 1 | 6 |
| `components/` | 96 | 4 | 92 |
| `pages/` | 59 | 2 | 57 |
| `server/routers/` | 9 | 0 | 9 |
| `lib/` | 37 | 2 | 35 |
| `hooks/` | 15 | 0 | 15 |
| `types/` | 14 | 0 | 14 |
| `contexts/` | 6 | 0 | 6 |
| **Toplam** | **243** | **9 (~3.7%)** | **234** |

---

## 📁 src/ — Kök Dosyalar

| # | Dosya | Durum | Açıklama |
|---|-------|-------|----------|
| 1 | `main.tsx` | ✅ | React entry point, tRPC / QueryClient kurulumu |
| 2 | `routers.ts` | 🔲 | Uygulama route tanımları |
| 3 | `mockData.ts` | 🔲 | Test/demo verileri |
| 4 | `locations.ts` | 🔲 | Türkiye il/ilçe veritabanı |
| 5 | `index.css` | 🔲 | Global CSS değişkenleri ve temel stiller |
| 6 | `vite-env.d.ts` | 🔲 | Vite ortam değişkenleri tip tanımları |
| 7 | `README.md` | ✅ | Proje genel tanıtımı |

---

## 📁 src/drizzle/

| # | Dosya | Durum | Açıklama |
|---|-------|-------|----------|
| 1 | `schema.ts` | 🔴 🔲 | **Kritik** — Tüm DB tablo tanımları |
| 2 | `db.ts` | 🔲 | Drizzle ORM bağlantısı |
| 3 | `migrations/` | 🔲 | DB migration dosyaları |

---

## 📁 src/server/

| # | Dosya | Durum | Açıklama |
|---|-------|-------|----------|
| 1 | `router.ts` | 🔲 | tRPC root router, middleware tanımları |
| 2 | `routers/auth.router.ts` | 🔵 🔲 | Kimlik doğrulama, kayıt, sosyal giriş |
| 3 | `routers/escort.router.ts` | 🔲 | Escort profil CRUD, moderasyon |
| 4 | `routers/admin.router.ts` | 🔲 | Admin yönetim operasyonları |
| 5 | `routers/admin_actions.router.ts` | 🔵 🔲 | Shadow ban, audit log, profil onay |
| 6 | `routers/appointment.router.ts` | 🔲 | Randevu sistemi |
| 7 | `routers/chat.router.ts` | 🔵 🔲 | Mesajlaşma, disappearing messages |
| 8 | `routers/forum.router.ts` | 🔲 | Forum CRUD |
| 9 | `routers/media.router.ts` | 🔲 | Medya yükleme ve yönetimi |
| 10 | `routers/verification.router.ts` | 🔵 🔲 | Doğrulama başvuru süreci |

---

## 📁 src/components/ — Ana Bileşenler

### 🔲 Temel UI Bileşenleri

| # | Dosya | Durum |
|---|-------|-------|
| 1 | `Header.tsx` | ✅ |
| 2 | `Footer.tsx` | ✅ |
| 3 | `BottomNav.tsx` | 🔲 |
| 4 | `FloatingNavigation.tsx` | 🔲 |
| 5 | `CosmicNav.tsx` | 🔲 |
| 6 | `ThemeToggle.tsx` | 🔲 |
| 7 | `CustomIcon.tsx` | 🔲 |
| 8 | `ErrorBoundary.tsx` | 🔲 |
| 9 | `ErrorDisplay.tsx` | 🔲 |
| 10 | `LoadingStates.tsx` | 🔲 |

### 🔲 Escort / Kullanıcı Kart Bileşenleri

| # | Dosya | Durum |
|---|-------|-------|
| 11 | `EscUserProfileCard.tsx` | ⚠️ |
| 12 | `StandardCard.tsx` | ⚠️ |
| 13 | `VipPremiumCard.tsx` | 🔲 |
| 14 | `PremiumCard.tsx` | 🔲 |
| 15 | `VerifiedBadge.tsx` | 🔵 🔲 |
| 16 | `OnlineStatusBadge.tsx` | 🔲 |

### 🔲 Chat ve Mesajlaşma Bileşenleri

| # | Dosya | Durum |
|---|-------|-------|
| 17 | `ChatInterface.tsx` | 🔲 |
| 18 | `ChatWindow.tsx` | ⚠️ |
| 19 | `ChatInput.tsx` | 🔲 |
| 20 | `ConversationList.tsx` | 🔲 |
| 21 | `MessageBubble.tsx` | 🔲 |
| 22 | `MessageInput.tsx` | 🔲 |
| 23 | `MessagesPanel.tsx` | 🔲 |
| 24 | `EnhancedMessageInput.tsx` | 🔲 |
| 25 | `TypingIndicator.tsx` | 🔲 |
| 26 | `ReadReceipt.tsx` | 🔲 |
| 27 | `NotificationToast.tsx` | 🔲 |
| 28 | `chat/ChatRulesModal.tsx` | 🔵 ✅ |
| 29 | `chat/DisappearTimerSetting.tsx` | 🔵 ✅ |

### 🔲 Booking ve Ödeme Bileşenleri

| # | Dosya | Durum |
|---|-------|-------|
| 30 | `BookingForm.tsx` | 🔲 |
| 31 | `PaymentCheckout.tsx` | 🔲 |
| 32 | `PaymentMethodForm.tsx` | 🔲 |
| 33 | `PaymentSecurity.tsx` | 🔲 |
| 34 | `SubscriptionPlanSelector.tsx` | 🔲 |
| 35 | `InvoiceHistory.tsx` | 🔲 |

### 🔲 Form ve Filtre Bileşenleri

| # | Dosya | Durum |
|---|-------|-------|
| 36 | `AdvancedFilter.tsx` | 🔲 |
| 37 | `AdvancedFilterPanel.tsx` | 🔲 |
| 38 | `PriceRangeSlider.tsx` | 🔲 |
| 39 | `ServiceCheckboxGroup.tsx` | 🔲 |
| 40 | `RoleSelector.tsx` | 🔲 |
| 41 | `FileUpload.tsx` | 🔲 |

### 🔲 Analitik ve Dashboard Bileşenleri

| # | Dosya | Durum |
|---|-------|-------|
| 42 | `AnalyticsDashboard.tsx` | 🔲 |
| 43 | `BarChart.tsx` | 🔲 |
| 44 | `LineChart.tsx` | 🔲 |
| 45 | `DoughnutChart.tsx` | 🔲 |
| 46 | `KPICard.tsx` | 🔲 |
| 47 | `RealtimeStats.tsx` | 🔲 |
| 48 | `LoyaltyDashboard.tsx` | 🔲 |
| 49 | `LoyaltyRankCard.tsx` | 🔵 ✅ |

### 🔲 Admin Bileşenleri (`components/admin/`)

| # | Dosya | Durum |
|---|-------|-------|
| 50 | `admin/PendingProfileUpdates.tsx` | 🔵 ✅ |
| 51 | `admin/` (diğer 11 dosya) | 🔲 |

### 🔲 Auth Bileşenleri (`components/auth/`)

| # | Dosya | Durum |
|---|-------|-------|
| 52 | `auth/RegisterModal.tsx` | 🔵 ✅ |
| 53 | `auth/ProfileCompleteModal.tsx` | 🔵 ✅ |

### 🔲 Escort Bileşenleri (`components/escort/`)

| # | Dosya | Durum |
|---|-------|-------|
| 54 | `escort/PendingUpdateBanner.tsx` | 🔵 ✅ |

### 🔲 Medya Bileşenleri

| # | Dosya | Durum |
|---|-------|-------|
| 55 | `media/FaceMaskOverlay.tsx` | 🔲 |
| 56 | `media/` (1 diğer dosya) | 🔲 |
| 57 | `PhotoGalleryEnhanced.tsx` | 🔲 |
| 58 | `VideoUpload.tsx` | 🔲 |
| 59 | `VideoCall.tsx` | 🔲 |

### 🔲 Diğer Bileşenler

| # | Dosya | Durum |
|---|-------|-------|
| 60 | `AgeVerification.tsx` | 🔴 🔲 |
| 61 | `CookieConsent.tsx` | 🔲 |
| 62 | `ContactLock.tsx` | 🔲 |
| 63 | `DashboardAuthGuard.tsx` | 🔲 |
| 64 | `DashboardRouter.tsx` | 🔲 |
| 65 | `DashboardSelector.tsx` | 🔲 |
| 66 | `ProtectedRoute.tsx` | 🔲 |
| 67 | `NotificationCenter.tsx` | 🔲 |
| 68 | `NotificationSettings.tsx` | 🔲 |
| 69 | `PlatformBenefits.tsx` | 🔲 |
| 70 | `ReviewCard.tsx` | 🔲 |
| 71 | `ReviewForm.tsx` | 🔲 |
| 72 | `ReviewsPanel.tsx` | 🔲 |
| 73 | `PostBookingReview.tsx` | 🔲 |
| 74 | `ReportEscortDialog.tsx` | 🔲 |
| 75 | `ReportsPanel.tsx` | 🔲 |
| 76 | `Rating.tsx` | 🔲 |
| 77 | `AdBanner.tsx` | 🔲 |
| 78 | `AdSpace.tsx` | 🔲 |
| 79 | `SpaceBackground.tsx` | 🔲 |
| 80 | `StarryBackground.tsx` | 🔲 |
| 81 | `PremiumAnimations.tsx` | 🔲 |
| 82 | `PremiumHeroBanner.tsx` | 🔲 |
| 83 | `CustomerRatingForm.tsx` | 🔲 |

### 🔲 3D Bileşenleri (`components/3d/`)

| # | Dosya | Durum |
|---|-------|-------|
| 84-94 | `3d/` (11 dosya) | 🔲 |

---

## 📁 src/pages/

### Admin Sayfaları

| # | Dosya | Durum |
|---|-------|-------|
| 1 | `AdminDashboard.tsx` | 🔴 🔲 |
| 2 | `AdminAnalytics.tsx` | 🔲 |
| 3 | `AdminApprovals.tsx` | 🔲 |
| 4 | `AdminComplaints.tsx` | 🔲 |
| 5 | `AdminFinancial.tsx` | 🔲 |
| 6 | `AdminListings.tsx` | 🔲 |
| 7 | `AdminMedia.tsx` | 🔲 |
| 8 | `AdminMessages.tsx` | 🔲 |
| 9 | `AdminNotifications.tsx` | 🔲 |
| 10 | `AdminPanel.tsx` | 🔲 |
| 11 | `AdminRealTimeMonitoring.tsx` | 🔲 |
| 12 | `AdminReports.tsx` | 🔲 |
| 13 | `AdminSecurity.tsx` | 🔲 |
| 14 | `AdminSettings.tsx` | 🔲 |
| 15 | `AdminUsers.tsx` | 🔲 |

### Escort Sayfaları

| # | Dosya | Durum |
|---|-------|-------|
| 16 | `EscortDashboard.tsx` | 🔲 |
| 17 | `EscortPrivateDashboard.tsx` | 🔲 |
| 18 | `EscortAnalyticsDashboard.tsx` | 🔲 |
| 19 | `EscortProfile.tsx` | 🔲 |
| 20 | `EscortList.tsx` | 🔲 |
| 21 | `EscortMarket.tsx` | 🔲 |
| 22 | `EscortLogin.tsx` | 🔲 |
| 23 | `EscortRegister.tsx` | 🔲 |
| 24 | `VerificationCenter.tsx` | 🔵 🔲 |

### Müşteri Sayfaları

| # | Dosya | Durum |
|---|-------|-------|
| 25 | `ClientLogin.tsx` | 🔲 |
| 26 | `ClientRegister.tsx` | 🔲 |
| 27 | `GuestCatalog.tsx` | 🔲 |
| 28 | `Catalog.tsx` | 🔲 |
| 29 | `MyAppointments.tsx` | 🔲 |
| 30 | `MyFavorites.tsx` | 🔲 |
| 31 | `Messages.tsx` | 🔲 |
| 32 | `BillingDashboard.tsx` | 🔲 |
| 33 | `MembershipUpgrade.tsx` | 🔲 |

### Genel Sayfalar

| # | Dosya | Durum |
|---|-------|-------|
| 34 | `Home.tsx` | 🔲 |
| 35 | `App.tsx` | 🔲 |
| 36 | `Login.tsx` | 🔲 |
| 37 | `Blog.tsx` | 🔲 |
| 38 | `Contact.tsx` | 🔲 |
| 39 | `Pricing.tsx` | 🔲 |
| 40 | `Safety.tsx` | 🔲 |
| 41 | `Reviews.tsx` | 🔲 |
| 42 | `Report.tsx` | 🔲 |
| 43 | `Settings.tsx` | 🔲 |
| 44 | `NotFound.tsx` | 🔲 |
| 45 | `SEO.tsx` | 🔲 |
| 46 | `Analytics.tsx` | 🔲 |
| 47 | `PaymentResult.tsx` | 🔲 |
| 48 | `RealTimeMessaging.tsx` | 🔲 |
| 49 | `VideoCallPage.tsx` | 🔲 |

### Yasal Sayfalar

| # | Dosya | Durum |
|---|-------|-------|
| 50 | `TermsOfService.tsx` | ✅ |
| 51 | `PrivacyPolicy.tsx` | ✅ |
| 52 | `KVKK.tsx` | ✅ |
| 53 | `CookiePolicy.tsx` | ✅ |

---

## 📁 src/lib/

| # | Dosya | Durum |
|---|-------|-------|
| 1 | `chatFilter.ts` | 🔵 ✅ |
| 2 | `loyaltySystem.ts` | 🔵 ✅ |
| 3-37 | Diğer dosyalar | 🔲 |

---

## 📁 src/hooks/

| # | Dosya | Durum |
|---|-------|-------|
| 1-15 | Tüm hook dosyaları | 🔲 |

---

## 📁 src/types/

| # | Dosya | Durum |
|---|-------|-------|
| 1 | `domain.ts` | ⚠️ |
| 2-14 | Diğer tip dosyaları | 🔲 |

---

## 📁 src/contexts/

| # | Dosya | Durum |
|---|-------|-------|
| 1-6 | Tüm context dosyaları | 🔲 |

---

## 📋 Geliştirici Kuralları

1. **Yeni dosya eklendiğinde** bu haritaya satır eklenmelidir.
2. **Döküman tamamlandığında** 🔲 → ✅ olarak güncellenmelidir.
3. Her değişiklik **JOURNAL.md** dosyasına tarih/saat/isim ile kaydedilmelidir.
4. JSDoc formatı kullanılmalıdır:
   ```ts
   /**
    * @module ComponentName
    * @description Ne yaptığını açıkla
    * @param {Type} paramName - Açıklama
    * @returns {Type} Açıklama
    * @example
    * <ComponentName prop="value" />
    */
   ```
5. 🔴 ile işaretli kritik dosyalar öncelikli dökümanlanmalıdır.

---

*Son güncelleme: 2026-02-21 | Oluşturan: Antigravity AI*
