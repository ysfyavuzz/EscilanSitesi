# 🏗️ Yerleşim ve İskelet Bileşenleri (Layout & Navigation)

Uygulamanın genel yapısını, sayfa düzenini ve navigasyon akışını yöneten ana bileşenler.

---

## 🗂️ Dosya Kartları

### 🧭 Header.tsx & Footer.tsx & BottomNav.tsx
- **Görevi:** Sitenin ana üst ve alt menüleri. 
- **Özellik:** Kullanıcı rolüne (Misafir, Müşteri, Escort) göre menü içerikleri dinamik olarak değişir.

### 🏰 DashboardLayout.tsx & CustomerDashboardLayout.tsx
- **Görevi:** Paneller için kullanılan, Sidebar (yan menü) içeren sayfa şablonları.

### 🛡️ ProtectedRoute.tsx & DashboardAuthGuard.tsx
- **Görevi:** Yetkisiz kullanıcıların belirli sayfalara erişimini engeller.
- **Kritik:** JWT geçerliliğini ve kullanıcı rolünü (Role-based access) kontrol eder.

### 🌌 SpaceBackground.tsx & StarryBackground.tsx
- **Görevi:** Sitenin uzay temasını sağlayan dinamik arka plan katmanları.

---

## 💡 Navigasyon Notları
- Proje wouter kütüphanesini kullanır, bu sayede hafif ve hızlı bir yönlendirme sağlanır.
- DashboardRouter.tsx bileşeni, /dashboard isteğini kullanıcının rolüne göre doğru panele yönlendirir.
