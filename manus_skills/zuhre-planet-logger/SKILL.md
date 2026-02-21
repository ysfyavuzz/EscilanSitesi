---
name: zuhre-planet-logger
description: Zühre Planet projesindeki her türlü değişikliği JOURNAL.md dosyasına standart formatta kaydetmekle yükümlüdür. Şeffaflık ve izlenebilirlik sağlar.
---
# Zühre Planet Logger & Jurnal Yöneticisi

Bu yetenek, projede çalışan her aktörün (insan/AI) yaptığı işi izlenebilir kılması için **ZORUNLUDUR**.

## 📝 Jurnal Kayıt Formatı
Her işlemden sonra JOURNAL.md dosyasının en altına şu satırı eklemelisiniz:

| Tarih | Saat | Aktör | Kategori | Açıklama |
| :--- | :--- | :--- | :--- | :--- |
| YYYY-MM-DD | SS:DD | İsim | [KATEGORİ] | Yapılan işlemin kısa ve öz açıklaması |

## 🏷️ Kategoriler
- **[FEAT]:** Yeni özellik ekleme.
- **[FIX]:** Hata düzeltme.
- **[DOC]:** Dökümantasyon güncelleme.
- **[REFACTOR]:** Kod iyileştirme.
- **[SCHEMA]:** Veritabanı değişikliği.
- **[SEC]:** Güvenlik müdahalesi.

## ⚠️ Kurallar
1. **Dürüstlük:** Yapılan her işlem, terminalden çıktı alındığı an kaydedilmelidir.
2. **Dil:** Kayıtlar her zaman **Türkçe** olmalıdır.
3. **Senkronizasyon:** Kayıt atılmadan git push yapılmamalıdır.
