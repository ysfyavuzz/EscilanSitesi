# 🧩 UI Kit ve Temel Bileşenler (src/components/ui)

Zühre Planet'in tasarım dilini oluşturan, Radix UI tabanlı yüksek kaliteli ve erişilebilir temel bileşenler.

---

## 🗂️ Dosya Kartları

### 🔘 utton.tsx & switch.tsx & 	abs.tsx
- **Görevi:** Standart tıklama, seçim ve sekme geçiş bileşenleri.
- **Özellik:** Framer Motion ile mikro-etkileşimler eklenmiştir.

### ⌨️ input.tsx & 	extarea.tsx & select.tsx
- **Görevi:** Form giriş elemanları.
- **Özellik:** Hata durumları (isInvalid) ve odaklanma animasyonları içerir.

### 🖼️ dialog.tsx & lert-dialog.tsx & dropdown-menu.tsx
- **Görevi:** Modal pencereler ve açılır menüler.
- **Kritik Not:** Z-index çakışmalarını önlemek için merkezi bir Portal üzerinden render edilirler.

### 💀 skeleton.tsx & sonner.tsx & 	oast.tsx
- **Görevi:** Yükleme durumları (Shimmer) ve anlık bildirim balonları.

---

## 💡 Genel Tasarım Notları
- **Tailwind CSS:** Tüm bileşenler shadcn/ui standartlarında, Tailwind sınıfları ile özelleştirilmiştir.
- **Dark Mode:** Tüm UI Kit bileşenleri karanlık mod (Space Theme) ile tam uyumludur.
