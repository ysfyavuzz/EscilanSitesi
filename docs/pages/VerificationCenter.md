# `src/pages/VerificationCenter.tsx` — Kimlik Doğrulama Merkezi

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/pages/VerificationCenter.tsx` |
| **Route** | `/verification` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React, tRPC, `framer-motion`, Radix UI |
| **Erişim** | Yalnızca `role: 'escort'` |
| **Durum** | 🔵 ✅ Dökümanlandı — ⚠️ Import hatası düzeltilmeli |

---

## 🎯 Ne İşe Yarar?

Escort kullanıcılarının kimlik belgelerini (nüfus cüzdanı, pasaport, ehliyet) ve onaylama selfisi yükleyerek admin onayı talep ettiği çok adımlı doğrulama sayfasıdır.

---

## 🔄 Doğrulama Akışı

```
Adım 1: Belge Yükle
  → Belge tipi seç (TC Kimlik / Pasaport / Ehliyet)
  → Drag & drop veya dosya seçici
  → Anlık önizleme

Adım 2: Selfie Yükle
  → Belgeyi tutarken çekilmiş fotoğraf
  → Kılavuz önerileri

Adım 3: İncele
  → Yüklenen belgeler önizlemesi
  → Onayla / Düzenle

Adım 4: Gönder
  → KVKK onayı
  → Admin inceleme kuyruğuna gönder
```

---

## ⚠️ HATA TESPİTİ — Import Yolu Yanlış

```ts
// ❌ Mevcut (Hatalı)
import { trpc } from '@/utils/trpc';

// ✅ Doğru Olması Gereken
import { trpc } from '@/lib/trpc';
```

`@/utils/trpc` diye bir dosya mevcut değil — `trpc` istemcisi `src/lib/trpc.tsx` içinde tanımlı. Bu import hatası, tRPC çağrılarının çalışmamasına neden olur.

---

## 🔐 Güvenlik ve Uyumluluk

- KVKK bilgilendirme metni her adımda gösterilir
- Dosya tipi kontrolü: yalnızca `jpg`, `png`, `pdf`
- Dosya boyutu sınırı: 5 MB
- Gerçek şifreli yükleme: `storage.ts` tam implemente edildiğinde aktif olacak

---

## 💡 AI Öneri

> **1. Import Hatasını Düzeltin (Kritik):**
> ```ts
> import { trpc } from '@/lib/trpc';
> ```
>
> **2. Fotoğraf Gizlilik Güvencesi:**
> Yüklenen kimlik belgelerinin `privacyLevel: 'admin_only'` olarak işaretlenmesi gerekir — bu alan schema'ya eklenmeli ve endpoint doğrulaması yapılmalı.
>
> **3. OCR Entegrasyonu:**
> Kimlik fotoğrafından TC Kimlik No otomatik çıkarılabilir (Google Cloud Vision veya Tesseract.js ile). Bu escort'un gerçek yaşını ve kimliğini kontrol etmeye yardımcı olur.
>
> **4. Manuel Onaylama Bildirim:**
> Doğrulama admin tarafından onaylandığında escort'a otomatik e-posta/bildirim gönderilmeli.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
