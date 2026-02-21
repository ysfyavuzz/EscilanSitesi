# `src/pages/EscortProfile.tsx` — Escort Profil Sayfası

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/pages/EscortProfile.tsx` |
| **Route** | `/escort/:id` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React, `wouter`, `framer-motion`, Lucide Icons, Radix UI Tabs/Dialog |
| **Veri Kaynağı** | `listingService.getListingById()` (mock service) |
| **Durum** | ⚠️ Kısmi — tRPC entegrasyonu henüz tamamlanmamış |

---

## 🎯 Ne İşe Yarar?

Bir escort'un detay profilini görüntüleyen genel halka açık sayfadır. Fotoğraf galerisi, biyografi, hizmetler, fiyatlandırma ve randevu alma formunu tek sayfada sunar.

---

## 🖼️ Bölümler

| Bölüm | İçerik |
|-------|--------|
| **Hero Bölümü** | Kapak fotoğrafı, rütke rozeti, online durum, glassmorphism overlay |
| **Bilgi Çubukları** | Şehir, yaş, boy, kilo, göz rengi, dil |
| **Sekmeler (Tabs)** | Hakkında / Galeri / Yorumlar / Hizmetler |
| **Hakkında Sekmesi** | Uzun biyografi, saatlik ücret, müsait saatler |
| **Galeri Sekmesi** | Fotoğraf grid, video önizleme, Dialog modal |
| **Yorumlar** | Puanlar ve yorumlar |
| **Eylem Butonları** | Randevu Al (BookingForm Dialog), Mesaj Gönder, Favoriye Ekle, Paylaş |

---

## ⚠️ Tespit Edilen Sorunlar

### 1. Mock Veri Service Kullanımı (Kritik)
```ts
// Şu an:
const data = await listingService.getListingById(Number(id));

// Olması gereken:
const profile = trpc.escort.getBySlug.useQuery({ slug: id });
```
Gerçek veritabanı verisi yerine mock data kullanılıyor. tRPC router'ı hazır ancak sayfa bağlanmamış.

### 2. ID Parametresi — Slug Uyumsuzluğu
`useParams<{ id: string }>()` kullanıyor ama `escort.router.ts`'deki prosedür `slug` bekliyor. Route ve API parametresi hizalanmalı.

### 3. SEO Başlığı
`<SEO />` bileşeni import edilmiş ve kullanılıyor — profil adı ve şehir dinamik olarak başlığa ve meta description'a eklenmeli.

---

## 💡 AI Öneri

> **1. tRPC Entegrasyonu:**
> `listingService` yerine `trpc.escort.getBySlug.useQuery({ slug })` kullanılmalı. Bu değişiklik gerçek veritabanı verisini sayfaya bağlar.
>
> **2. Loading Skeleton:**
> Mevcut spinner güzel ama içerik şekline uygun skeleton UI (kart, metin, fotoğraf placeholder) daha iyi kullanıcı deneyimi sunar.
>
> **3. Fotoğraf Gizlilik Katmanı:**
> `privacyLevel: 'members'` olan fotoğraflar ziyaretçiye gösterilmemeli; oturumu kontrol eden bir guard eklenebilir.
>
> **4. JSON-LD Schema.org:**
> Profil sayfasına `Person` schema eklenmeli — Google'da yapılandırılmış veri olarak görünür ve SEO'yu güçlendirir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
