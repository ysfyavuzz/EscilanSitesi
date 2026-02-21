# `src/components/PaymentCheckout.tsx` — Ödeme ve Checkout Akışı

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/components/PaymentCheckout.tsx` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React, `useMemo`, `framer-motion`, Radix UI |
| **Bağımlılıklar** | `SubscriptionPlanSelector`, `PaymentMethodForm` bileşenleri |
| **Durum** | ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Escort abonelik planı satın alma işleminin tüm adımlarını kapsayan çok adımlı ödeme formu.
Plan seçimi, indirim kodu, KDV hesaplama, fatura adresi ve ödeme yöntemi toplama aşamalarını yönetir.

---

## 📦 Dışa Aktarılan Tipler

```ts
export type CheckoutStep = 'review' | 'payment' | 'confirm' | 'success';
export interface LineItem { id, description, quantity, unitPrice, total }
export interface Discount { code, percentage, amount }
export interface BillingAddress { fullName, email, phone, address, city, postalCode, country, taxNumber? }
export interface CheckoutSummary { subtotal, tax, taxRate, discount, total, currency }
export interface PaymentCheckoutProps { ... }
```

---

## 🔄 Checkout Adımları

```
review  → Özet
  Plan seçimi, indirim kodu, sipariş özeti
      ↓
payment → Ödeme
  Fatura adresi (isteğe bağlı), kredi kartı, şartlar onayı
      ↓
success → Tamamlandı
  Onay kartı, fatura indirme, panele git
```

---

## 💰 Fiyat Hesaplama

```ts
// Türkiye %20 KDV
const taxRate = 0.20; // prop olarak geçilebilir
const summary = calculateSummary(amount, taxRate, appliedDiscount);
// subtotal → indirim → vergi → total
```

**Plan Fiyatları (Sabit Kodlanmış):**
| Plan | Aylık | Yıllık |
|------|-------|--------|
| Ücretsiz | ₺0 | ₺0 |
| Premium | ₺199 | ₺1.990 |
| VIP | ₺499 | ₺4.990 |

---

## 🏷️ İndirim Kodu Sistemi

Şu an sabit kod sözlüğü (mock):
```ts
WELCOME10 → %10  |  VIP20 → %20  |  SAVE15 → %15
```
Backend `coupon` tablosuna bağlı gerçek doğrulama gerekiyor.

---

## ⚠️ Dikkat Edilmesi Gerekenler

- **Fatura İndirme:** Success ekranında `Faturayı İndir` butonu var ama tıklandığında hiç bir şey olmuyor.
- **İndirim API'si:** Mock — hardcoded kodlar. Gerçek uygulamada `trpc.payment.validateCoupon` mutasyonu gerekiyor.
- **Başarı navigasyonu:** `window.location.href = '/escort/dashboard'` kullanıyor — `wouter` ile `useLocation()` daha doğru yaklaşım.

---

## 💡 AI Öneri

> **1. Gerçek Ödeme Entegrasyonu:**
> Türkiye için `iyzico` veya `PayTR` ödeme altyapısı önerilir. Hem kredi kartı hem de havale/EFT destekler ve Türk mevzuatına uygundur.
>
> **2. Fatura PDF Üretimi:**
> `@react-pdf/renderer` veya sunucu tarafında `puppeteer` ile fatura PDF oluşturulabilir ve `invoices` tablosuna kaydedilebilir.
>
> **3. `wouter` Navigasyonu:**
> ```tsx
> // ❌ Mevcut
> window.location.href = '/escort/dashboard';
> // ✅ Önerilen
> const [, navigate] = useLocation();
> navigate('/escort/dashboard');
> ```

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
