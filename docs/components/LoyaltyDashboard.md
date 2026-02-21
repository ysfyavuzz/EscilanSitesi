# `src/components/LoyaltyDashboard.tsx` — Sadakat Programı Paneli

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/components/LoyaltyDashboard.tsx` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React, `framer-motion`, Radix UI Tabs, Lucide Icons |
| **Bağımlılıklar** | `@/types/loyalty` → `LOYALTY_LEVELS`, `POINTS_EARNING`, `VISIBILITY_MULTIPLIERS`, `REFERRAL_SYSTEM`, `POINTS_SPENDING` |
| **Kullanıldığı Yer** | Escort ve Müşteri dashboard sayfaları |
| **Durum** | 🔵 ✅ Dökümanlandı — Bug düzeltmesi yapıldı |

---

## ✅ Düzeltilen Bug

Dosya sonunda duplike import satırları vardı:
```ts
// ❌ Eski (Hatalı)
import { Shield } from 'lucide-react';       // Satır 497
import { ShoppingCart } from 'lucide-react'; // Satır 498
```
Bu satırlar kaldırılarak `Shield` ve `ShoppingCart` ana import bloğuna (satır 49-53) taşındı.

---

## 🎯 Ne İşe Yarar?

Escort/müşteri sadakat programının tam görsel yönetim panelidir. Mevcut rütke, kazanma yöntemleri, puan harcama ve arkadaş davet sistemini 4 sekmeli arayüzde sunar.

---

## 📦 Props

```ts
interface LoyaltyDashboardProps {
  currentPoints: number;      // Mevcut kullanılabilir puan
  lifetimePoints: number;     // Tüm zamanların toplam puanı
  level: keyof typeof LOYALTY_LEVELS;  // 'bronze'|'silver'|'gold'|'platinum'|'diamond'
  referralCode?: string;      // Kişisel davet kodu (default: 'ESCORT2024')
  profileCompleteness: number; // 0-100 profil doluluk yüzdesi
  isVerified: boolean;        // Admin onayı var mı?
}
```

---

## 🖼️ Sekmeler

| Sekme | İçerik |
|-------|--------|
| **Genel Bakış** | Rütke seviyesi kartı, ilerleme çubuğu, görünürlük çarpanları |
| **Puan Kazan** | Yorum, randevu, profil ve günlük giriş puan kazanma yöntemleri |
| **Puan Harca** | `POINTS_SPENDING` sabitleriyle tanımlanmış ödül kataloğu |
| **Arkadaş Getir** | Kişisel davet kodu, pano kopyalama, davet istatistikleri |

---

## 🔢 Puan Kazanma Özeti (Kodda Tanımlanmış)

| Eylem | Puan |
|-------|------|
| Yorum yaz | +25 |
| Detaylı yorum (100+ karakter) | +50 |
| Yorum yanıtla | +15 |
| 5 yıldız yorumu al | +30 |
| Başarılı randevu | +50 |
| İlk randevu | +100 |
| Eksiksiz profil | +200 |
| Admin onayı | +500 |
| Günlük giriş | +5 |
| Haftalık seri | +50 |

> ⚠️ Bu değerler `LoyaltyDashboard.tsx` içinde hardcoded render edilmiş. Gerçek XP sistemi `loyaltySystem.ts` içinde `XP_REWARDS` sabitleriyle tanımli — tutarlılık için birleştirilmeli.

---

## ⚠️ Dikkat Edilmesi Gerekenler

- **Davet İstatistikleri hardcoded:** `Davet Edilen`, `Üye Olan`, `Toplam Kazanç` alanları hep `0` gösteriyor — gerçek veri bağlantısı yok.
- **`LOYALTY_LEVELS` uyuşmazlığı:** Bu bileşen `bronze/silver/gold/platinum/diamond` kullanıyor; `loyaltySystem.ts` ise `Bronz/Gümüş/Altın/Platin/Elmas/Galaktik` — iki sistem birleştirilmeli.

---

## 💡 AI Öneri

> **1. `loyaltySystem.ts` ile Birleştirin:**
> İki ayrı sadakat sistemi (bu bileşen + `loyaltySystem.ts`) var. Tek kaynak kullanmak mantık tutarlılığını sağlar.
>
> **2. Gerçek Davet Takibi:**
> `referral_codes` tablosu eklenerek kaç kişinin bu kodla üye olduğu takip edilebilir. Backend'den gelecek bu veri davet sekmesine bağlanabilir.
>
> **3. Animasyonlu Seviye Atlama:**
> Rütke yükseldiğinde konfeti + ses animasyonu (Framer Motion + `useSound`) eklenebilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
