# 🎨 UI & Sistem Hook'ları (src/hooks)

Bu hook'lar, kullanıcı arayüzü mantığını, anlık durum güncellemelerini ve sistem düzeyindeki yetkilendirmeleri yönetir.

---

## 🗂️ Dosya Kartları

### 📡 useWebSocket.ts & useChat.ts
- **Görevi:** WebSocket bağlantısını ve mesajlaşma arayüzünü yönetir.
- **Özellik:** Mesaj gönderimi, okundu bilgisi ve "yazıyor..." göstergelerini senkronize eder.

### 🟢 useOnlineStatus.ts
- **Görevi:** Kullanıcının online/offline durumunu ve en son ne zaman aktif olduğunu (lastSeen) takip eder.
- **Özellik:** Kullanıcı ekranı kapattığında veya boşta (idle) bıraktığında durumu otomatik günceller.

### 🔔 useNotifications.ts
- **Görevi:** Uygulama içi bildirimleri (toast) ve tarayıcı bildirimlerini tetikler.

### 👮 useAdminActions.ts & useAdminData.ts
- **Görevi:** Yönetim panelindeki onay, red, yasaklama ve istatistik çekme işlemlerini yönetir.
- **Özellik:** İşlem sırasında 'Optimistic Updates' kullanarak arayüzü hızlandırır.

### 🕵️ useGuestAccess.ts
- **Görevi:** Kayıtsız kullanıcıların (misafirlerin) içerik erişim limitlerini (fotoğraf sayısı, iletişim bilgisi vb.) denetler.
- **Özellik:** Limit dolduğunda otomatik üyelik/upgrade uyarıları tetikler.

### 📈 useAnalytics.ts
- **Görevi:** Sayfa görüntüleme ve tıklama olaylarını Google Analytics/Plausible servislerine raporlar.

---

## 💡 Genel Mimari Notlar
- Bu hook'lar genellikle birden fazla Context (Auth, WebSocket, Theme) ile etkileşime girer.
- UI bileşenleri iş mantığını kendileri tutmak yerine bu hook'ları kullanarak "stateless" (durumsuz) kalır.
