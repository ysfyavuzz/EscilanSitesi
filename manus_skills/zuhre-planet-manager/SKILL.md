---
name: zuhre-planet-manager
description: Zuhre Planet projesinin geliştirilmesi, bakımı ve modernizasyonu için uzmanlaşmış iş akışları ve talimatlar sağlar. Proje yapısını anlama, yeni özellikler ekleme ve hata giderme süreçlerinde kullanılır.
---

# Zuhre Planet Manager

Bu skill, Zuhre Planet projesinin sürdürülebilir gelişimi ve modernizasyonu için tasarlanmıştır. Proje, modern bir web mimarisi (Vite, React, TypeScript, TailwindCSS) ve gelişmiş özellikler (3D efektler, kozmik temalar, gelişmiş API entegrasyonları) üzerine kuruludur.

## Proje Yapısı ve Standartlar

Proje üzerinde çalışırken aşağıdaki yapıya sadık kalınmalıdır:

- **`src/components/`**: Yeniden kullanılabilir UI bileşenleri.
- **`src/services/`**: API istemcileri ve iş mantığı servisleri.
- **`src/styles/`**: Temalar (cosmic, premium) ve animasyonlar.
- **`src/types/`**: TypeScript tip tanımlamaları.
- **`tests/`**: E2E ve birim testleri.

## Temel İş Akışları

### 1. Yeni Özellik Ekleme
Yeni bir özellik eklerken şu adımları izleyin:
1. Gerekli veri modellerini `src/types/` altında tanımlayın.
2. API entegrasyonu gerekiyorsa `src/services/api/` altına yeni bir servis ekleyin.
3. UI bileşenlerini `src/components/` altında geliştirin.
4. Gelişmiş görsel efektler için `src/styles/` altındaki mevcut CSS dosyalarını kullanın veya yenilerini oluşturun.

### 2. Modernizasyon ve Stil Güncelleme
Projenin "Kozmik" ve "Premium" temasını korumak için:
- `3d-effects.css` ve `animations.css` dosyalarındaki mevcut animasyon sınıflarını tercih edin.
- TailwindCSS yapılandırmasını (`tailwind.config.js`) kullanarak tutarlı renk ve spacing değerleri uygulayın.

### 3. Hata Giderme ve Test
- Hata giderme öncesinde `tests/` dizinindeki mevcut testleri inceleyin.
- Yapılan değişikliklerin mevcut işlevselliği bozmadığından emin olmak için `vitest` veya `playwright` testlerini çalıştırın.

## Dikkat Edilmesi Gerekenler
- **Tip Güvenliği**: Tüm yeni kodlar TypeScript ile yazılmalı ve `any` kullanımından kaçınılmalıdır.
- **Güvenlik**: API anahtarları ve hassas veriler asla kodun içine gömülmemeli, `.env` dosyası üzerinden yönetilmelidir.

## Referanslar
Daha detaylı bilgi için proje kök dizinindeki şu dosyaları inceleyin:
- `ARCHITECTURE.md`: Sistem mimarisi detayları.
- `DEPLOYMENT.md`: Dağıtım süreçleri.
- `SECURITY_IMPLEMENTATION.md`: Güvenlik standartları.
