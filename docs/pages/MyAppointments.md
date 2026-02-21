# `src/pages/MyAppointments.tsx` — Randevularım Sayfası

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/pages/MyAppointments.tsx` |
| **Route** | `/appointments` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React, `wouter`, tRPC, Radix UI Tabs |
| **Kullanıcı** | Oturum açmış müşteri |
| **Durum** | ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Müşterilerin tüm randevularını (geçmiş + gelecek) listelediği ve yönettiği sayfadır. Yaklaşan randevularda geri sayım, geçmişlerde yorum bırakma ve tüm durumlar için aksiyon butonları sunar.

---

## 🖼️ Bölümler

### Sekmeler (Tabs)
| Sekme | İçerik |
|-------|--------|
| **Yaklaşan** | Tarih, saat, konum, escort detayı, iptal/düzenleme butonları |
| **Geçmiş** | Tamamlanan randevular, yorum bırakma butonu |
| **İptal Edilmiş** | İptal edilen randevular, iade bilgisi |

### Randevu Kartı İçerği
- Escort profil fotoğrafı ve adı
- Tarih, saat ve süre
- Servis türü ve fiyatı
- Durum rozeti (`pending` / `confirmed` / `completed` / `cancelled`)
- Mesaj gönder butonu
- Randevu iptal ve yeniden planlama

---

## 📦 Veri Akışı

```ts
// Page-level tRPC query (tam implemente edildiğinde)
const appointments = trpc.appointment.getUserAppointments.useQuery();
```

---

## ⚠️ Tespit Edilen Durum

Dosyanın header'ında kapsamlı JSDoc yorumu mevcut ve özellik listesi iyi tanımlanmış.
`trpc` import edilmiş ama gerçek randevu verisi mock data'dan veya `useEffect` ile çekilebilir.

---

## 💡 AI Öneri

> **1. Yeniden Planlama (Reschedule) UI:**
> Doküman yeniden planlama özelliğinden bahsediyor ancak backend'de `reschedule` mutasyonu mevcut değil. `appointment.router.ts`'e bu mutasyon eklenebilir.
>
> **2. Takvim Görünümü:**
> Randevuları liste yerine aylık takvim görünümünde göstermek (`react-big-calendar` veya custom) kullanıcı deneyimini artırır.
>
> **3. Push Bildirimi:**
> Yaklaşan randevular için tarayıcı Push Notification veya e-posta hatırlatması gönderilebilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
