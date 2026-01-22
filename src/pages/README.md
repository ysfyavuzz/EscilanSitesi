# Pages Dökümantasyonu

Bu klasör, escort ilan platformunun tüm sayfa component'lerini içerir.

## 📋 Sayfa Listesi

### Ana Sayfalar

| Sayfa | Route | Açıklama |
|-------|-------|----------|
| `App.tsx` | - | Ana router ve route tanımlamaları |
| `Home.tsx` | `/` | Ana sayfa - featured escort'lar |
| `Catalog.tsx` | `/catalog` | Escort kataloğu (filtreleme ile) |
| `EscortList.tsx` | `/escorts` | Tüm escort listesi |
| `NotFound.tsx` | - | 404 sayfa bulunamadı |

### Profil Sayfaları

| Sayfa | Route | Açıklama |
|-------|-------|----------|
| `EscortProfile.tsx` | `/escort/:id` | Escort profil detay sayfası |

### Kimlik Doğrulama

| Sayfa | Route | Açıklama |
|-------|-------|----------|
| `EscortLogin.tsx` | `/login-escort` | Escort girişi |
| `EscortRegister.tsx` | `/register-escort` | Escort kaydı |
| `ClientLogin.tsx` | `/login`, `/login-client` | Müşteri girişi |
| `ClientRegister.tsx` | `/register-client`, `/register`, `/signup` | Müşteri kaydı |

### Escort Dashboard

| Sayfa | Route | Açıklama |
|-------|-------|----------|
| `EscortDashboard.tsx` | `/escort/dashboard` | Escort kontrol paneli |
| `EscortPrivateDashboard.tsx` | `/escort/dashboard/private` | Escort özel panel |
| `EscortAnalyticsDashboard.tsx` | `/escort/dashboard/analytics` | Escort analytics paneli |
| `EscortMarket.tsx` | `/escort/market` | Escort pazar yeri |

#### Escort Panel Alt Sayfaları (`escort/`)

| Sayfa | Route | Açıklama |
|-------|-------|----------|
| `ProfileEdit.tsx` | `/escort/profile/edit` | Profil düzenleme |
| `PhotoManager.tsx` | `/escort/photos` | Fotoğraf yönetimi |
| `CalendarManager.tsx` | `/escort/calendar` | Takvim ve müsaitlik yönetimi |
| `EarningsReport.tsx` | `/escort/earnings` | Kazanç raporları |

### Müşteri Paneli

| Sayfa | Route | Açıklama |
|-------|-------|----------|
| `CustomerDashboard.tsx` | `/customer/dashboard` | Müşteri kontrol paneli |
| `MyFavorites.tsx` | `/favorites` | Favorilerim |
| `Messages.tsx` | `/messages` | Mesajlar |
| `MyAppointments.tsx` | `/appointments` | Randevularım |

#### Müşteri Panel Alt Sayfaları (`customer/`)

| Sayfa | Route | Açıklama |
|-------|-------|----------|
| `Notifications.tsx` | `/customer/notifications` | Bildirimler sayfası |
| `History.tsx` | `/customer/history` | Randevu geçmişi |
| `Wallet.tsx` | `/customer/wallet` | Cüzdan ve bakiye yönetimi |
| `CustomerSettings.tsx` | `/customer/settings` | Müşteri ayarları |

### Admin Paneli

| Sayfa | Route | Açıklama |
|-------|-------|----------|
| `AdminPanel.tsx` | `/admin` | Ana admin paneli |
| `AdminDashboard.tsx` | `/admin/dashboard` | Admin kontrol paneli |
| `AdminApprovals.tsx` | `/admin/approvals` | Onay bekleyenler |
| `AdminRealTimeMonitoring.tsx` | `/admin/monitoring` | Gerçek zamanlı izleme |
| `AdminReports.tsx` | `/admin/reports` | Admin raporları |

### Genel Sayfalar

| Sayfa | Route | Açıklama |
|-------|-------|----------|
| `GuestCatalog.tsx` | `/guest-catalog` | Misafir katalog görünümü |
| `Pricing.tsx` | `/pricing`, `/vip` | VIP/Premium fiyatlandırma |
| `MembershipUpgrade.tsx` | `/upgrade` | Üyelik yükseltme |
| `BillingDashboard.tsx` | `/billing`, `/dashboard/billing`, `/faturalar` | Fatura yönetimi |
| `SEO.tsx` | `/seo` | SEO ayarları sayfası |
| `Contact.tsx` | `/contact` | İletişim sayfası |
| `Blog.tsx` | `/blog` | Blog yazıları |
| `Report.tsx` | `/report` | Şikayet/Rapor oluşturma |
| `VerificationCenter.tsx` | `/verification` | Doğrulama merkezi |
| `PaymentResult.tsx` | `/payment-result` | Ödeme sonuç sayfası |

### Mesajlaşma ve İletişim

| Sayfa | Route | Açıklama |
|-------|-------|----------|
| `Messages.tsx` | `/messages` | Mesajlaşma sayfası |
| `RealTimeMessaging.tsx` | `/messages/realtime` | Gerçek zamanlı mesajlaşma |
| `VideoCallPage.tsx` | `/messages/video`, `/video-call` | Video görüşme |

### Analytics ve Değerlendirmeler

| Sayfa | Route | Açıklama |
|-------|-------|----------|
| `Analytics.tsx` | `/analytics` | Platform analytics |
| `Reviews.tsx` | `/reviews` | Değerlendirmeler sayfası |

### Yasal Sayfalar

| Sayfa | Route | Açıklama |
|-------|-------|----------|
| `TermsOfService.tsx` | `/terms` | Kullanım koşulları |
| `PrivacyPolicy.tsx` | `/privacy` | Gizlilik politikası |
| `CookiePolicy.tsx` | `/cookies` | Çerez politikası |
| `KVKK.tsx` | `/kvkk` | KVKK aydınlatma metni |
| `Safety.tsx` | `/safety` | Güvenlik rehberi |

## 🎯 Route Yapısı

### Genel Routes
```typescript
/                           → Home
/catalog                    → Catalog
/guest-catalog              → GuestCatalog
/escorts                    → EscortList
/escort/:id                 → EscortProfile
/pricing, /vip              → Pricing
/upgrade                    → MembershipUpgrade
/contact                    → Contact
/blog                       → Blog
/report                     → Report
/verification               → VerificationCenter
/analytics                  → Analytics
/reviews                    → Reviews
```

### Kimlik Doğrulama Routes
```typescript
/login                      → ClientLogin
/login-client               → ClientLogin
/login-customer             → ClientLogin
/login-escort               → EscortLogin
/register                   → ClientRegister
/register-client            → ClientRegister
/signup                     → ClientRegister
/register-escort            → EscortRegister
```

### Escort Dashboard Routes
```typescript
/escort/dashboard           → EscortDashboard
/escort/dashboard/private   → EscortPrivateDashboard
/escort/dashboard/analytics → EscortAnalyticsDashboard
/escort/market              → EscortMarket
/escort/profile/edit        → ProfileEdit
/escort/photos              → PhotoManager
/escort/calendar            → CalendarManager
/escort/earnings            → EarningsReport
```

### Müşteri Routes
```typescript
/customer/dashboard         → CustomerDashboard
/favorites                  → MyFavorites
/appointments               → MyAppointments
/customer/notifications     → Notifications
/customer/history           → History
/customer/wallet            → Wallet
/customer/settings          → CustomerSettings
```

### Mesajlaşma Routes
```typescript
/messages                   → Messages
/messages/realtime          → RealTimeMessaging
/messages/video             → VideoCallPage
/video-call                 → VideoCallPage
```

### Admin Routes
```typescript
/admin                      → AdminPanel
/admin/dashboard            → AdminDashboard
/admin/approvals            → AdminApprovals
/admin/monitoring           → AdminRealTimeMonitoring
/admin/reports              → AdminReports
```

### Faturalama Routes
```typescript
/billing                    → BillingDashboard
/dashboard/billing          → BillingDashboard
/faturalar                  → BillingDashboard
/payment-result             → PaymentResult
```

### Yasal Routes
```typescript
/terms                      → TermsOfService
/privacy                    → PrivacyPolicy
/cookies                    → CookiePolicy
/kvkk                       → KVKK
/safety                     → Safety
```

## 📝 Sayfa Component'leri

### Lazy Loading

Tüm sayfalar lazy-loaded olarak yüklenir:
```typescript
const Home = lazy(() => import("@/pages/Home").then(m => ({ default: m.default || m.Home })));
const Catalog = lazy(() => import("@/pages/Catalog").then(m => ({ default: m.default })));
// ... diğer sayfalar
```

### Error Handling

Her sayfa `RouteErrorBoundary` ve `Suspense` ile sarmalanmıştır:
```typescript
<Route path="/catalog">
  <RouteErrorBoundary>
    <Suspense fallback={<RouteLoading />}>
      <Catalog />
    </Suspense>
  </RouteErrorBoundary>
</Route>
```

## 🔧 Geliştirme Notları

- Yeni sayfa eklerken `App.tsx`'e route tanımlamasını ekleyin
- Her sayfa kendi içinde data fetching ve state yönetimi yapar
- tRPC ve React Query kullanılarak data fetching yapılır
