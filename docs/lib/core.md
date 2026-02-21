# 🏗️ Çekirdek Servisler ve Yardımcı Araçlar (lib/core)

Platformun temel işleyişini sağlayan tRPC istemcisi, sadakat sistemi ve yardımcı fonksiyonlar.

---

## 🗂️ Dosya Kartları

### 🌀 	rpc.tsx (API İstemcisi)
- **Görevi:** tRPC istemcisini yapılandırır. Auth header'larını (JWT) otomatik olarak her isteğe ekler.

### 💎 loyaltySystem.ts (Sadakat Motoru)
- **Görevi:** Kullanıcıların XP puanlarını hesaplar ve Elmas, Platin gibi rütbelere atama yapar.
- **Formül:** calculateVisibilityScore ile ilanların sıralama algoritmasını belirler.

### 🧼 chatFilter.ts (Mesaj Süzgeci)
- **Görevi:** Mesajlardaki küfürleri ve gizli telefon numaralarını/e-postaları sansürler.
- **Kural:** PROFANITY_FILTER listesine göre otomatik yıldızlama (*) yapar.

### ✨ nimations.ts (3D & Motion)
- **Görevi:** Framer Motion ve Three.js animasyonlarının konfigürasyonlarını tutar.
- **Özellik:** Sayfa geçişleri ve ilan kartı hover efektlerini yönetir.

### 🛠️ utils.ts (Genel Araçlar)
- **Görevi:** Tarih formatlama, para birimi dönüşümü, class birleştirme (tailwind-merge) gibi 20+ yardımcı fonksiyon içerir.

---

## ⚠️ Geliştirme Notları (Radar)
- **storage.ts:** 🔴 Şu an bir mock (taslak) halindedir. Gerçek dosya yükleme (S3/Bunny) entegrasyonu bekliyor.
- **db.ts:** ⚠️ Eski LibSQL kalıntıları içeriyor, PostgreSQL (Drizzle) sistemine tam taşınmalı.
