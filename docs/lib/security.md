# 🛡️ Güvenlik Servisleri (lib/security)

Bu döküman, Zühre Planet platformunun "Zırhı" olan tüm güvenlik mekanizmalarını tek noktada toplar. Tüm dosyalar UTF-8 standartlarına uygundur.

---

## 🗂️ Dosya Kartları

### 🔑 jwt.ts (Kimlik Doğrulama)
- **Görevi:** Access (15m) ve Refresh (7d) token üretimini yönetir.
- **Kritik Not:** Üretim ortamında JWT_SECRET eksikse sistem çalışmayı durdurur.

### 🚦 ateLimit.ts (Hız Sınırlama)
- **Görevi:** IP ve kullanıcı bazlı istek sınırları koyar.
- **Hazır Ayarlar:** Giriş (5 deneme/15dk), Randevu (10 talep/saat), Arama (300/dk).

### 🛡️ csrf.ts (Form Güvenliği)
- **Görevi:** Cross-Site Request Forgery saldırılarını engeller.
- **Yöntem:** Double-submit cookie ve timing attack koruması (constantTimeCompare).

### 🔐 password.ts (Şifre Güvenliği)
- **Görevi:** cryptjs ile şifre hashleme ve karmaşıklık kontrolü yapar.
- **Kural:** Min 8 karakter, büyük/küçük harf, sayı ve özel karakter zorunludur.

### 📝 alidation.ts (Girdi Denetimi)
- **Görevi:** zod kullanarak tüm kullanıcı girdilerini (E-posta, Telefon, Randevu verisi vb.) doğrular.
- **Locale:** Türkçe karakterli ve yerel telefon formatlı denetimleri içerir.

### 🌐 headers.ts (Sunucu Güvenliği)
- **Görevi:** CORS, CSP, HSTS ve Frame-Options gibi HTTP güvenlik başlıklarını yapılandırır.
- **Özellik:** Clickjacking ve MIME-sniffing saldırılarına karşı koruma sağlar.

---

## 💡 Genel Mimari Notlar
- Güvenlik katmanı, istek henüz veritabanına ulaşmadan (Router seviyesinde) denetim yapar.
- Tüm şifreleme ve token işlemleri end-to-end (AES-256) korumalıdır.
