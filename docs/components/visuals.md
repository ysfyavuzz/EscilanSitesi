# 🎴 Görsel ve 3D Bileşenler (Cards, Gallery & 3D)

Kullanıcıların ilanları gördüğü ve etkileşime girdiği görsel olarak zengin bileşenler.

---

## 🗂️ Dosya Kartları

### 🖼️ StandardCard.tsx & PremiumCard.tsx & VipPremiumCard.tsx
- **Görevi:** İlanların katalogdaki görünümü.
- **Özellik:** Üyelik tipine göre (VIP, Premium) kart etrafında parıltı (glow) ve özel animasyonlar gösterir.

### 🎥 PhotoGalleryEnhanced.tsx & VideoUpload.tsx
- **Görevi:** İlan detaylarındaki gelişmiş galeri ve medya yükleme arayüzleri.
- **Özellik:** Lazy-loading ve lightbox desteği mevcuttur.

### 🪐 3d/Avatar3D.tsx & 3d/Universal3DViewer.tsx
- **Görevi:** Three.js / React-Three-Fiber tabanlı interaktif 3D modeller.
- **Özellik:** Kullanıcının fare hareketine göre dönen ve tepki veren gezegen/karakter modelleri.

---

## 💡 Teknik Notlar
- **Performans:** 3D bileşenler, sistem kaynaklarını korumak için sadece görünür olduklarında (Viewport) render edilirler.
- **Fallbacks:** 3D desteği olmayan tarayıcılar için otomatik olarak 2D yedek (placeholder) görseller devreye girer.
