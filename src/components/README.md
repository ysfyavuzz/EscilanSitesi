# Components Dökümantasyonu

Bu klasör, escort ilan platformunun tüm React UI component'lerini içerir.

## 📋 Component Listesi

### Ana Component'ler

| Component | Açıklama |
|-----------|----------|
| `Header.tsx` | Site başlığı, navigation ve kullanıcı menüsü (React.memo optimize) |
| `Footer.tsx` | Global footer - hızlı menü, yasal linkler, iletişim bilgileri |
| `BottomNav.tsx` | Mobil alt navigation menüsü |
| `FloatingNavigation.tsx` | Sabit alt navigasyon çubuğu |
| `CookieConsent.tsx` | KVKK/GDPR uyumlu çerez onay banner'ı |
| `StandardCard.tsx` | Standart escort kartı (liste görünümü, React.memo) |
| `VipPremiumCard.tsx` | VIP/Premium escort kartı (özel görünüm, React.memo) |
| `DashboardSelector.tsx` | Dashboard seçim ekranı |
| `DashboardRouter.tsx` | Dashboard routing yöneticisi |

### 3D Component'ler (`3d/`)

Modern 3D efektli UI bileşenleri:

| Component | Açıklama |
|-----------|----------|
| `Button3D.tsx` | 3D efektli buton component'i |
| `Card3D.tsx` | 3D efektli kart component'i |
| `Icon3D.tsx` | 3D efektli ikon component'i |
| `Input3D.tsx` | 3D efektli input component'i |

### Auth & Verification

| Component | Açıklama |
|-----------|----------|
| `AgeVerification.tsx` | Yaş doğrulama modal'ı (18+ uyarısı) |
| `ErrorBoundary.tsx` | React error boundary component'i |
| `ErrorDisplay.tsx` | Hata mesajı gösterme component'i |
| `ProtectedRoute.tsx` | Korumalı route wrapper component'i |
| `DashboardAuthGuard.tsx` | Dashboard yetkilendirme kontrolü |
| `RoleSelector.tsx` | Kullanıcı rol seçimi component'i |

### Booking & Reviews

| Component | Açıklama |
|-----------|----------|
| `BookingForm.tsx` | Rezervasyon formu |
| `CustomerRatingForm.tsx` | Müşteri değerlendirme formu |
| `PostBookingReview.tsx` | Rezervasyon sonrası değerlendirme |
| `ReviewCard.tsx` | Değerlendirme kartı |
| `ReviewForm.tsx` | Değerlendirme formu |
| `ReviewsPanel.tsx` | Değerlendirmeler paneli |
| `Rating.tsx` | Yıldız rating component'i |

### Mesajlaşma & İletişim

| Component | Açıklama |
|-----------|----------|
| `ChatInterface.tsx` | Mesajlaşma arayüzü |
| `ChatWindow.tsx` | Mesaj penceresi |
| `ChatInput.tsx` | Mesaj input component'i |
| `MessageBubble.tsx` | Mesaj baloncuğu |
| `MessageInput.tsx` | Mesaj giriş alanı |
| `MessagesPanel.tsx` | Mesajlar paneli |
| `ConversationList.tsx` | Konuşma listesi |
| `VideoCall.tsx` | Video arama component'i |

### Bildirimler

| Component | Açıklama |
|-----------|----------|
| `Notifications.tsx` | Bildirimler component'i |
| `NotificationsPanel.tsx` | Bildirim paneli |
| `NotificationCenter.tsx` | Bildirim merkezi |
| `NotificationSettings.tsx` | Bildirim ayarları |
| `NotificationToast.tsx` | Toast bildirimi |

### Ödeme & Faturalama

| Component | Açıklama |
|-----------|----------|
| `PaymentCheckout.tsx` | Ödeme checkout component'i |
| `PaymentMethodForm.tsx` | Ödeme yöntemi formu |
| `PaymentSecurity.tsx` | Ödeme güvenliği bilgileri |
| `InvoiceHistory.tsx` | Fatura geçmişi |
| `SubscriptionPlanSelector.tsx` | Abonelik plan seçici |

## 🎯 Kullanım Notları

### 3D Component'leri

3D efektli component'ler modern ve etkileyici UI deneyimi sağlar:

```tsx
import { Button3D, Card3D, Icon3D, Input3D } from '@/components/3d';

// 3D Buton
<Button3D onClick={handleClick}>
  Tıkla
</Button3D>

// 3D Kart
<Card3D>
  <h2>Başlık</h2>
  <p>İçerik</p>
</Card3D>

// 3D İkon
<Icon3D icon="heart" size={24} />

// 3D Input
<Input3D 
  placeholder="Metin girin..."
  onChange={handleChange}
/>
```

### Kart Component'leri

**StandardCard**: Standart escort'lar için kullanılır
```tsx
<StandardCard escort={escortData} />
```

**VipPremiumCard**: VIP ve Premium escort'lar için kullanılır
```tsx
<VipPremiumCard escort={escortData} />
```

### Error Handling

**ErrorBoundary**: Tüm route'ları sarmalayarak hata yakalar
```tsx
<RouteErrorBoundary>
  <Suspense fallback={<RouteLoading />}>
    <Component />
  </Suspense>
</RouteErrorBoundary>
```

**ProtectedRoute**: Yetkilendirme kontrolü yapar
```tsx
<ProtectedRoute requiredRole="escort">
  <EscortDashboard />
</ProtectedRoute>
```

### Mesajlaşma Component'leri

```tsx
import { ChatInterface, MessageBubble, ChatInput } from '@/components';

// Mesajlaşma arayüzü
<ChatInterface 
  conversationId="conv-001"
  userId="user-001"
/>

// Mesaj baloncuğu
<MessageBubble 
  message={messageData}
  isOwn={true}
/>

// Mesaj giriş
<ChatInput 
  onSend={handleSend}
  placeholder="Mesajınızı yazın..."
/>
```

### Analytics Component'leri

```tsx
import { KPICard, LineChart, BarChart } from '@/components';

// KPI Kartı
<KPICard
  title="Toplam Görüntüleme"
  value={1234}
  change={15.2}
  icon="eye"
/>

// Line Chart
<LineChart
  data={chartData}
  xKey="date"
  yKey="views"
/>

// Bar Chart
<BarChart
  data={barData}
  xKey="month"
  yKey="revenue"
/>
```

## 📦 Bağımlılıklar

- **Radix UI** - Erişilebilir UI primitives (`ui/` klasöründe)
- **Framer Motion** - Animasyonlar ve geçişler
- **Lucide React** - İkonlar
- **Wouter** - Hafif routing kütüphanesi
- **React Query** - Veri yönetimi
- **Recharts** - Chart component'leri için

## 📂 Component Kategorileri

### 1. Layout Components
- Header, Footer, BottomNav, FloatingNavigation

### 2. Auth & Security
- AgeVerification, ProtectedRoute, DashboardAuthGuard, RoleSelector

### 3. Data Display
- Cards (Standard, VIP, KPI), Tables, Charts

### 4. Forms & Inputs
- BookingForm, ReviewForm, Input3D, PaymentMethodForm

### 5. Messaging
- ChatInterface, MessageBubble, ConversationList, VideoCall

### 6. Notifications
- NotificationCenter, NotificationToast, NotificationsPanel

### 7. Analytics
- Analytics Dashboard, Charts (Bar, Line, Doughnut), KPICard

### 8. Media
- PhotoGalleryEnhanced, VideoUpload, ContactLock

### 9. Admin
- AdminSidebar, UserManagement, MediaModeration, FinancialReports

### 10. UI Primitives
- Button, Input, Dialog, Select, Tabs (ui/ klasöründe)

## 🔧 Bakım Notları

- Tüm component'ler TypeScript ile yazılmıştır
- Her component kendi stil ve mantığını içerir
- UI component'leri `components/ui/` klasöründe yer alır
- 3D component'ler `components/3d/` klasöründe yer alır
- Admin component'leri `components/admin/` klasöründe yer alır
- Performans için kritik component'lerde React.memo kullanılmıştır
- Lazy loading ile sayfa yükleme performansı optimize edilmiştir

## 🎨 Stil Rehberi

- Tailwind CSS kullanılarak stillendirilmiştir
- Dark mode desteği mevcuttur
- Responsive tasarım (mobile-first yaklaşım)
- Accessibility (a11y) standartlarına uygun
- WCAG 2.1 AA seviyesi hedeflenmektedir

## ⚡ Performans Optimizasyonları

1. **React.memo**: Sık render edilen component'lerde
2. **Lazy Loading**: Route-based code splitting
3. **Virtualization**: Uzun listelerde (react-window)
4. **Image Optimization**: Lazy load ve responsive images
5. **Bundle Splitting**: Code splitting ile küçük bundle'lar

## 🧪 Testing

Component testleri için:
- **Jest** - Unit testler
- **React Testing Library** - Component testleri
- **Playwright** - E2E testler

```bash
# Unit testleri çalıştır
npm run test

# E2E testleri çalıştır
npm run test:e2e
```
