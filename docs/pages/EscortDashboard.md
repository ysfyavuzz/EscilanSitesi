# `src/pages/EscortDashboard.tsx` — Escort Ana Paneli

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/pages/EscortDashboard.tsx` |
| **Route** | `/escort/dashboard` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React, tRPC, `framer-motion`, Recharts, Lucide Icons |
| **Erişim** | Yalnızca `role: 'escort'` |
| **Boyut** | ~43 KB — büyük bileşen |
| **Durum** | 🔲 Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Escort kullanıcısının platorm aktivitelerini yönettiği kişisel paneldir. Profil düzenleme, randevu görüntüleme, gelir analitikleri ve ayarları tek noktadan sunar.

---

## 🖼️ Bölümler

| Bölüm | İçerik |
|-------|--------|
| **Profil Özeti** | Fotoğraf, ad, onay durumu, tier rozeti |
| **KPI Kartları** | Görüntüleme, mesaj, randevu, gelir sayaçları |
| **Profil Düzenleme** | Bio, slogan, şehir, fiyat — `PendingUpdateBanner` ile onay akışı |
| **Randevular** | Gelen istekler, onaylama, reddetme |
| **Fotoğraf Galerisi** | Yükleme, AI efekt, gizlilik ayarı |
| **Analitikler** | Görüntüleme/mesaj grafikleri |
| **Boost / VIP** | Öne çıkarma ve abonelik yükseltme |
| **Ayarlar** | Bildirim, müsaitlik, fiyatlandırma |

---

## 🔄 Profil Güncelleme Akışı

```
Escort düzenleme formu → updateProfile (tRPC) → pendingData kaydı
    ↓
PendingUpdateBanner görünür → "Admin onayını bekliyor"
    ↓
Admin → approveProfileUpdate veya rejectProfileUpdate
    ↓
Escort → PendingUpdateBanner kaybolur / değişiklikler yayınlanır
```

---

## ⚠️ Tespit Edilen Sorunlar

- **Boyut:** 43 KB — Sekme bazında `React.lazy()` ile bölebilir
- **Fotoğraf Yükleme:** `media.router.ts`'deki `registerPhoto` prosedüründe `profileId: 1` mock bug'ı bu sayfayı doğrudan etkiler

---

## 💡 AI Öneri

> **1. Onboarding Checklist:**
> Yeni escort için "Profilini tamamla → Fotoğraf yükle → Doğrulama başvur" adımlı bir başlangıç rehberi şerit component'i eklenebilir.
>
> **2. Gerçek Zamanlı Bildirimler:**
> Yeni mesaj veya randevu isteği geldiğinde WebSocket ile anlık güncelleme yapılabilir.
>
> **3. Analitik Karşılaştırma:**
> "Bu ay vs. geçen ay" görüntüleme karşılaştırması, escort'a performans trendini gösterir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
