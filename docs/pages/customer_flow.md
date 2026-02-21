# 🕵️ Müşteri Kullanıcı Akışı (src/pages/customer)

Ziyaretçilerin ve kayıtlı müşterilerin ilanları keşfetme, etkileşime girme ve randevu alma süreçlerini yöneten sayfalar.

---

## 🗂️ Dosya Kartları

### 🔍 Catalog.tsx & GuestCatalog.tsx
- **Görevi:** İlanların listelendiği ana ekran. Gelişmiş filtreleme ve sıralama özelliklerini içerir.
- **Özellik:** Misafir kullanıcılar için kısıtlı içerik gösteren GuestCatalog yapısı mevcuttur.

### ✨ EscortProfile.tsx (İlan Detay)
- **Görevi:** İlanın tüm detaylarını (Fotoğraflar, video, hizmetler, fiyatlar) gösterir.
- **Kritik:** İletişim butonları kullanıcının yetkisine göre aktifleşir.

### 📅 CustomerAppointments.tsx (Randevularım)
- **Görevi:** Müşterinin geçmiş ve gelecek randevu taleplerini listeler.
- **Özellik:** Randevu sonunda yorum yapma butonunu tetikler.

### 💬 RealTimeMessaging.tsx (Chat)
- **Görevi:** WebSocket tabanlı anlık mesajlaşma arayüzü. 
- **Özellik:** "Kaybolan Mesajlar" ve "Medya Gönderimi" desteği sunar.

### 💳 Wallet.tsx (Cüzdan)
- **Görevi:** Müşterinin bakiyesini görmesini ve kredi yüklemesini sağlar.

---

## 💡 İş Mantığı (Logic)
- **Guest Access:** useGuestAccess hook'u ile entegre çalışarak müşteriyi üye olmaya veya paket yükseltmeye teşvik eder.
- **Anonymity:** Müşteri isimleri yorumlarda ve bildirimlerde otomatik olarak maskelenir (customer_flow).
