---
name: zuhre-planet-sync
description: Zuhre Planet projesinin yerel dosyaları ile GitHub deposu arasındaki senkronizasyonu yönetir. Dosya değişikliklerini algılar, otomatik commit oluşturur ve GitHub'a push eder.
---

# Zuhre Planet Sync

Bu skill, projenin her zaman güncel kalmasını sağlamak için tasarlanmıştır. Yerel çalışma alanında yapılan her türlü değişiklik (kod güncellemesi, yeni özellik, hata giderme) bu skill aracılığıyla GitHub'a anında yansıtılır.

## Temel Fonksiyonlar

### 1. Otomatik Senkronizasyon
Proje üzerinde bir değişiklik yapıldığında, bu skill şu adımları izleyerek GitHub'ı günceller:
- Yerel dosya değişikliklerini tarar.
- Değişen dosyaları Git indeksine ekler.
- "Auto-sync" etiketiyle anlamlı bir commit oluşturur.
- Değişiklikleri uzak depoya (GitHub) gönderir.

### 2. Manuel Tetikleme
Eğer otomatik senkronizasyon beklenmiyorsa, şu komutla manuel olarak tetiklenebilir:
```bash
python3 /home/ubuntu/zuhre_planet_git_work/scripts/sync_project.py
```

## Kullanım Talimatları

### Değişiklik Sonrası Güncelleme
Bir özellik ekledikten veya bir dosyayı düzenledikten sonra:
1. Değişikliklerin kaydedildiğinden emin olun.
2. `zuhre-planet-sync` skill'ini çağırarak "Senkronize et" komutunu verin.
3. Sistem otomatik olarak GitHub bağlantısını kontrol edecek ve güncellemeyi tamamlayacaktır.

## Güvenlik ve Bütünlük
- **Çakışma Yönetimi**: Eğer GitHub üzerinde başka bir değişiklik varsa, sistem önce `git pull` yaparak çakışmaları önlemeye çalışır.
- **Commit Mesajları**: Her otomatik güncelleme, işlemin yapıldığı tarih ve saati içeren standart bir mesajla kaydedilir.

## Referanslar
- Proje Dizini: `/home/ubuntu/zuhre_planet_git_work`
- Sync Scripti: `scripts/sync_project.py`
