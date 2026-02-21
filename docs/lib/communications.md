# 📡 İletişim Servisleri (lib/email & lib/notifications)

Kullanıcılarla e-posta ve anlık bildirim (push) yoluyla etkileşim kuran servisler.

---

## 🗂️ Dosya Kartları

### 📧 email/client.ts (E-posta Gönderici)
- **Görevi:** 
odemailer kullanarak SMTP üzerinden e-posta gönderir.
- **Şablonlar:** Hoş geldin, şifre sıfırlama, randevu onayı ve doğrulama e-postalarını yönetir.

### ⏳ email/queue.ts (E-posta Kuyruğu)
- **Görevi:** Toplu e-posta gönderimlerinde sistemi yormamak için e-postaları sıraya alır.
- **Hata Yönetimi:** Gönderilemeyen e-postaları otomatik olarak yeniden dener (Retry logic).

### 🔔 
otifications/manager.ts (Bildirim Yöneticisi)
- **Görevi:** Tarayıcı (Web Push) bildirim aboneliklerini ve VAPID anahtarlarını yönetir.
- **Entegrasyon:** Service Worker üzerinden uygulama kapalıyken bile bildirim gönderilmesini sağlar.

---

## 💡 Genel Mimari Notlar
- Tüm e-posta şablonları src/lib/email/templates/ altında React bileşeni olarak tasarlanmıştır.
- Bildirimler öncelik sırasına (urgent, normal, low) göre farklı kanallardan iletilir.
