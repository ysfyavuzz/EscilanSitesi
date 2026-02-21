# src/types/notification.ts & notifications.ts — Bildirim ve Güvenlik Sistemi
## Amacı
Kullanıcılara (Müşteri/Escort) gerçek zamanlı ve harici (Email/SMS) bildirimlerin gönderilmesini, mesaj içeriklerinin denetlenmesini ve topluluk kurallarının uygulanmasını sağlar.

## Temel Özellikler
- **Bildirim Kanalları:** web, email, sms, push, in-app.
- **Kategoriler:** message, booking, review, system, security, payment, profile.
- **Sanitization (Temizleme):** sanitizeMessage fonksiyonu ile küfürler, telefon numaraları ve e-posta adresleri otomatik olarak sansürlenir (***).
- **Spam Kontrolü:** checkSpam fonksiyonu ile hızlı mesaj gönderimi ve Caps Lock kullanımı engellenir.

## Topluluk Kuralları (Chat Rules)
- **Escortlar İçin:** Müstehcen içerik, dış iletişim bilgisi paylaşımı ve nakit para pazarlığı yasaktır.
- **Müşteriler İçin:** Saygısızlık, pazarlık ve asılsız randevu talepleri yasaktır.

## AI Tavsiyeleri
- PROFANITY_FILTER listesi düzenli olarak güncel argo terimlerle beslenmelidir.
- UserWarning sistemi ile tekrarlayan ihlallerde otomatik suspend (askıya alma) aksiyonları tetiklenmelidir.
