# 📑 Zühre Planet — Dokümantasyon Kumanda Merkezi

Bu merkez, projenin tüm katmanlarını, iş mantığını ve dökümantasyon durumunu tek bir noktadan yönetmenizi sağlar.

---

## 🏗️ Mimari Katmanlar

### 1. [Veri ve Tipler (src/types)](./types/domain.md)
Uygulamanın anayasası. Roller, ödeme modelleri, chat protokolleri ve sadakat kuralları burada tanımlanır.
- **Kritik Dökümanlar:** [Role Sistemi](./types/role.md), [Ödeme Mimari](./types/payment.md), [Sadakat Algoritması](./types/loyalty.md).

### 2. [Sunucu ve İş Mantığı (src/server)](./server/auth.router.md)
tRPC üzerinden çalışan backend API katmanı.
- **Kritik Router'lar:** [Admin Paneli](./server/admin.router.md), [Randevu Sistemi](./server/appointment.router.md), [Doğrulama Akışı](./server/verification.router.md).

### 3. [Veritabanı (src/drizzle)](./drizzle/schema.md)
PostgreSQL şemaları ve Drizzle ORM yapılandırması.
- **Harita:** [Tablo İlişkileri](./drizzle/schema.md).

---

## 🔴 Kritik Sorunlar ve Bug Radar (Tespit Edilenler)

Aşağıdaki dosyalar dökümante edilmiştir ancak teknik müdahale beklemektedir:

1. **[media.router.ts](./server/media.router.md):** egisterPhoto fonksiyonunda sahiplik kontrolü eksik (Güvenlik riski).
2. **[admin.router.ts](./server/admin.router.md):** İstatistiklerin çoğu gerçek DB yerine sabit veriden (hardcoded) dönüyor.
3. **[verification.router.ts](./server/verification.router.md):** Şemadaki alan eksikliği nedeniyle yoğun @ts-ignore kullanımı mevcut.
4. **[EscortProfile.tsx](./pages/EscortProfile.md):** tRPC bağlantısı yapılmamış, hala mock servis kullanıyor.

---

## 🛠️ Nasıl Katkı Sağlanır?
Her yeni dosya eklendiğinde veya mevcut bir dosya değiştiğinde:
1. docs/ altında ilgili dökümanı güncelle.
2. PROJECT_MAP.md istatistiklerini yenile.
3. JOURNAL.md dosyasına kayıt ekle.

---
*Son güncelleme: 2026-02-21 | Zühre Planet Documentation Guardian*

