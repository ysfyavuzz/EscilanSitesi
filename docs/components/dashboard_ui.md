# 👮 Panel ve Yönetim Bileşenleri (Dashboard & Admin UI)

Kullanıcı ve Yönetici panellerinde veri görselleştirme ve yönetim için kullanılan bileşenler.

---

## 🗂️ Dosya Kartları

### 📈 BarChart.tsx & LineChart.tsx & DoughnutChart.tsx
- **Görevi:** Gelir, kullanıcı trafiği ve ilan istatistiklerini gösteren grafikler.
- **Teknoloji:** Recharts veya benzeri bir kütüphane ile tRPC verilerini görselleştirir.

### 📋 UserManagement.tsx & ListingManagement.tsx
- **Görevi:** Admin panelindeki devasa tablolar ve filtreleme seçenekleri.
- **Özellik:** Toplu onaylama, reddetme ve yasaklama aksiyonlarını içerir.

### 🛡️ PendingProfileUpdates.tsx
- **Görevi:** Bir ilan güncellendiğinde, eski ve yeni halini karşılaştıran 'Diff' görünümü.

### ❤️ LoyaltyRankCard.tsx & ProfileHealthWidget.tsx
- **Görevi:** Escort paneli için sadakat seviyesini ve profil doluluk oranını gösteren widgetlar.

---

## 💡 Veri Akışı Notları
- Bu bileşenler genellikle useAdminData veya useAdminActions hook'ları ile doğrudan konuşur.
- Yüksek miktarda veri içeren tablolar sanallaştırılmış (Virtual Scrolling) olarak çalışabilir.
