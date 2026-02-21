# src/contexts/AnalyticsContext.tsx — Analitik ve İzleme Bağlamı
## Amacı
Google Analytics 4 ve Plausible üzerinden kullanıcı davranışlarını izler. GDPR ve KVKK uyumluluğu için onay mekanizması içerir.

## Temel Özellikler
- **Gizlilik Odaklı:** Kullanıcı çerez onayı vermeden veya "Do Not Track" aktifken izleme yapmaz.
- **Olay İzleme (Event Tracking):** Profil görüntüleme, filtre kullanımı, randevu başlatma ve login gibi kritik aksiyonları takip eder.

## Teknik Detaylar
- grantConsent ve evokeConsent fonksiyonları ile kullanıcı izinleri yönetilir.
