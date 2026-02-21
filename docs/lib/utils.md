# `src/lib/utils.ts` — Genel Yardımcı Fonksiyonlar

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/lib/utils.ts` |
| **Modül** | `lib/utils` |
| **Dil** | TypeScript |
| **Teknoloji** | `clsx`, `tailwind-merge`, `Intl` (Web API) |
| **İçe Aktar** | `import { cn, formatCurrency, ... } from '@/lib/utils'` |
| **Durum** | ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Uygulama genelinde kullanılan genel amaçlı yardımcı (utility) fonksiyonları barındırır.
Loglama, formatlama, doğrulama, depolama ve performans iyileştirme araçlarını tek bir modülde sunar.
Tüm tarih/para/telefon formatlamaları **Türkçe (tr-TR)** yerel ayarına göre çalışır.

---

## 📦 Dışa Aktarılan Fonksiyonlar

### CSS Sınıf Birleştirme

#### `cn(...inputs: ClassValue[]): string`
`clsx` ve `tailwind-merge` kullanarak CSS sınıflarını birleştirir.
Tailwind çakışmalarını akıllıca çözer.

```tsx
const cls = cn('px-4 py-2', isActive && 'bg-primary', 'text-white');
```

---

### Para ve Tarih Formatlama

#### `formatCurrency(amount, currency?): string`
Sayıyı Türk Lirası formatına çevirir.
```ts
formatCurrency(1500)     // → "1.500,00 ₺"
formatCurrency(99, 'USD') // → "$99.00"
```

#### `formatDate(date, options?): string`
Tarihi `GG.AA.YYYY` formatında döndürür.
```ts
formatDate(new Date()) // → "21.02.2026"
```

#### `formatDateTime(date): string`
Tarih + saat birlikte (`GG.AA.YYYY SS:DD`).

#### `formatRelativeTime(date): string`
Geçen süreyi Türkçe ifadeyle döndürür.
```ts
formatRelativeTime(twoHoursAgo) // → "2 saat önce"
formatRelativeTime(justNow)     // → "az önce"
```

---

### Metin İşlemleri

#### `truncate(text, maxLength): string`
Metni belirtilen uzunlukta keser, `...` ekler.

#### `slugify(text): string`
Metni URL-dostu slug'a dönüştürür.
```ts
slugify('Merhaba Dünya!') // → "merhaba-dunya"
```

---

### Doğrulama

#### `isValidEmail(email): boolean`
Temel e-posta formatı kontrolü yapar.

#### `isValidPhone(phone): boolean`
Türk telefon numarası (+90 / 0 + 10 hane) doğrular.

#### `formatPhone(phone): string`
Ham telefon numarasını `0554 123 45 67` biçimine sokar.

---

### Tarih ve Yaş

#### `calculateAge(birthdate): number`
Doğum tarihinden günümüze yaşı hesaplar (ay/gün düzeltmesi dahil).

---

### Performans Araçları

#### `debounce<T>(func, wait): Function`
Fonksiyonun son çağrıdan `wait` ms sonra çalışmasını sağlar.
Arama kutusu gibi yoğun tetikleyiciler için idealdir.

#### `throttle<T>(func, limit): Function`
Fonksiyonun `limit` ms'de en fazla bir kez çalışmasına izin verir.
Scroll / resize olayları için kullanılır.

---

### Dizi Araçları

#### `randomItem<T>(array): T`
Diziden rastgele bir öğe döndürür.

#### `shuffle<T>(array): T[]`
Diziyi Fisher-Yates algoritması ile karıştırır. Orijinali değiştirmez.

---

### URL Araçları

#### `parseQueryParams(search): Record<string, string>`
`?city=istanbul&tier=vip` gibi query string'i nesneye dönüştürür.

#### `buildQueryParams(params): string`
Nesneyi query string'e dönüştürür. `undefined` değerleri atlar.

---

### Depolama Yardımcıları

#### `storage` — localStorage Sarmalayıcı
```ts
storage.set('token', '...');
const val = storage.get<string>('token');
storage.remove('token');
storage.clear();
```
Try-catch ile SSR hatasına karşı korunur.

#### `sessionStorage` — sessionStorage Sarmalayıcı
`storage` ile aynı arayüz, oturum süreli depolama.

---

## ⚠️ Dikkat Edilmesi Gerekenler

- `storage` ve `sessionStorage` yardımcıları `window` nesnesini kullandığından SSR ortamında direkt çağrılmamalıdır. Zaten try-catch ile korunmuştur.
- `slugify` Türkçe karakterleri (ğ, ü, ş, ı, ö, ç) kaldırmaz; yalnızca boşluk ve özel karakter temizliği yapar. **Türkçe slug için ek normalize işlemi gerekebilir.**

---

## 💡 AI Öneri

> **1. Türkçe Karakter Slug Desteği:**
> `slugify` fonksiyonu `"istanbul-escort"` gibi Türkçe kelimelerli URL'ler için şu an `ğ→g`, `ü→u` gibi dönüşümleri yapmıyor. SEO için kritik olan bu sayfalar için bir `turkishSlugify()` varyantı eklenebilir.
>
> **2. `formatRelativeTime` için `Intl.RelativeTimeFormat`:**
> Manuel hesaplama yerine tarayıcı yerleşik `Intl.RelativeTimeFormat('tr')` API'si kullanılabilir — daha az kod ve daha standart çıktı.
>
> **3. `isValidEmail` için Gerçek MX Kaydı Kontrolü:**
> Regex doğrulaması yeterli değil. Sahte mail denetimi `auth.router.ts` içindeki blocklist ile zaten yapılıyor — ancak bu fonksiyona bir "beklenmedik TLD" uyarısı eklenebilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
