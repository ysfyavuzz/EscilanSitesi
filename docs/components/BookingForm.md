# `src/components/BookingForm.tsx` — Randevu Alma Formu

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/components/BookingForm.tsx` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React, `framer-motion`, Radix UI, Lucide Icons |
| **Bağımlılıklar** | `@/types/notifications` → `sanitizeMessage`, `BOOKING_REMINDERS`, `MESSAGE_RULES` |
| **Kullanıldığı Yer** | `pages/EscortProfile.tsx` (Dialog içinde) |
| **Durum** | ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Müşterilerin bir escort ile randevu oluşturduğu çok adımlı form bileşenidir.
Platform kuralları hatırlatması, tarih/saat/süre seçimi, fiyat hesaplama ve mesaj güvenlik taraması içerir.

---

## 📦 Props

```ts
interface BookingFormProps {
  escortId: string;
  escortName: string;
  escortAvatar?: string;
  hourlyRate: number;           // TL/saat, fiyat hesaplamasında kullanılır
  availableHours?: string[];    // Seçilebilir saatler, varsayılan 09:00-21:00
  location?: string;            // default: 'Escortun Mekanı'
  onSubmit: (booking: BookingData) => void;
}
```

---

## 📋 Çıktı Verisi (BookingData)

```ts
interface BookingData {
  date: string;       // ISO format: YYYY-MM-DD
  time: string;       // HH:MM
  duration: number;   // Saat (1-8)
  location: string;   // Yer bilgisi
  notes: string;      // Sanitize edilmiş mesaj
  acceptRules: boolean; // Kurallar onaylandı mı?
}
```

---

## 🔄 Form Akışı

```
Adım 1: Hatırlatmalar
  → BOOKING_REMINDERS listesi gösterilir
  → "Anladım, Devam Et" ile form adımına geçilir

Adım 2: Form
  → Tarih (Yarın → +30 gün)
  → Saat (availableHours dropdown)
  → Süre (1-8 saat, slider/select)
  → Dinamik fiyat: duration × hourlyRate
  → Notlar (sanitizeMessage ile gerçek zamanlı tarama)
  → Kural onay kutusu
  → Gönder
```

---

## 🛡️ Güvenlik: `sanitizeMessage`

Notlar alanına yazılan her karakter `sanitizeMessage()` ile taranır:
- IBAN, telefon, e-posta, URL kalıpları tespit edilince temizlenir
- İhlal mesajları kullanıcıya gösterilir
- 3 saniye sonra uyarı otomatik kapanır

---

## ⚠️ Tespit Edilen Sorunlar

1. **`alert()` kullanımı:** `handleSubmit` içinde `alert()` çağırılıyor — bu modern UI'ye uymaz. `sonner` toast veya inline hata mesajı kullanılmalı.
2. **`onSubmit` prop bağlantısı:** Gerçek tRPC randevu mutasyonu (`trpc.appointment.create`) parent bileşende çağrılmalı; form sadece veriyi `onSubmit` ile teslim ediyor — bu doğru bir tasarım.

---

## 💡 AI Öneri

> **1. Müsaitlik Takvimi:**
> `availableHours` statik liste yerine gerçek zamanlı olarak backend'den çekilmeli. Escort'un randevulu olduğu saatler `disabled` gösterilmeli.
>
> **2. Saat Dilimi:**
> Türkiye UTC+3 kullanıyor ancak server'da tarih kaydedilirken UTC'ye çevrilmeli. `date-fns-tz` ile timezone dönüşümü eklenebilir.
>
> **3. `alert()` → `sonner` toast:**
> ```tsx
> import { toast } from 'sonner';
> toast.error('Lütfen randevu kurallarını kabul edin.');
> ```

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
