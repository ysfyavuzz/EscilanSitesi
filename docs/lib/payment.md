# 💰 Ödeme Servisleri (lib/payment)

Zühre Planet'in finansal kalbi. iyzico entegrasyonu, webhooklar ve para birimi yönetimini içerir.

---

## 🗂️ Dosya Kartları

### 💳 iyzico.ts (Entegrasyon)
- **Görevi:** iyzico API'si ile ödeme başlatma, doğrulama ve iade işlemlerini yönetir.
- **Özellik:** Geliştirme için mockPayment fonksiyonu mevcuttur.

### ⚓ webhooks.ts (Onay Sistemi)
- **Görevi:** iyzico'dan gelen ödeme sonuçlarını dinler ve bakiyeyi günceller.
- **Güvenlik:** HMAC-SHA256 imza doğrulaması ve IP kontrolü içerir.

### 🛠️ utils.ts (Hesaplama)
- **Görevi:** TL/Kuruş dönüşümü, KDV hesaplama ve VIP indirim oranlarını belirler.
- **Kart Kontrolü:** Luhn algoritması ile anlık kart numarası doğrulaması yapar.

---

## 💡 Genel Mimari Notlar
- **Escrow Mantığı:** Ödemeler randevu tamamlanana kadar sistem havuzunda tutulur.
- **PCI DSS:** Tüm işlemler PCI DSS Level 1 standartlarına uygun şifreli akışlarla yapılır.
