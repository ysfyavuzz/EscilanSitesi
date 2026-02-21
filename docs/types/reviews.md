# src/types/reviews.ts — Güven ve Değerlendirme Sistemi
## Amacı
Platformdaki escort yorumlarını, güven skorlarını ve escortlar arası "Müşteri Uyarı" mekanizmasını yönetir.

## Temel Özellikler
- **Review (Yorum):** Onaylı randevu sonrası müşterilerin bıraktığı, anonimleştirilmiş değerlendirmeler.
- **CustomerWarning (Müşteri Uyarısı):** Sadece escortlar tarafından görülebilen; sorunlu davranış, ödeme yapmama veya güvenlik ihlali durumlarında diğer escortları uyarmaya yönelik sistem.
- **TrustScore (Güven Skoru):** Yorum sayısı ve puan ortalamasına göre belirlenen 4 seviye: Yeni Üye, Kurulmuş, Güvenilir, En İyi.

## AI Tavsiyeleri
- Müşteri uyarıları, kötü niyetli kullanımı engellemek için admin onayından (erified: boolean) geçtikten sonra aktif olmalıdır.
