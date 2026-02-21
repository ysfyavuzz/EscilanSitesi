# 📈 Analitik Servisleri (lib/analytics)

Kullanıcı davranışlarını izlemek ve site trafiğini analiz etmek için kullanılan servisler.

---

## 🗂️ Dosya Kartları

### 📊 ga4.ts (Google Analytics 4)
- **Görevi:** Google Analytics üzerinden sayfa görüntüleme ve özel olayları (event) takip eder.
- **Özellik:** IP anonimleştirme desteği mevcuttur.

### 🤫 plausible.ts (Plausible Analytics)
- **Görevi:** Gizlilik odaklı (çerezsiz) analiz aracı olan Plausible entegrasyonunu yönetir.
- **Özellik:** GDPR ve KVKK uyumlu takip sağlar.

---

## 💡 Genel Mimari Notlar
- Analitik takibi sadece AnalyticsContext üzerinden gelen kullanıcı onayı (consent) ile başlar.
- Proje, hem GA4 hem de Plausible'ı aynı anda veya seçmeli olarak kullanabilir.
