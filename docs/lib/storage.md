# `src/lib/storage.ts` — Dosya Depolama Stub'ı

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/lib/storage.ts` |
| **Modül** | `lib/storage` |
| **Dil** | TypeScript |
| **Teknoloji** | Yok (mock/stub — gerçek implementasyon yok) |
| **Durum** | 🔴 **Mock Stub — Gerçek Dosya Yükleme Yok** |

---

## 🎯 Ne Yapar? (Amaç)

Supabase storage kütüphane bağımlılığı kaldırıldıktan sonra geriye kalan stub dosyasıdır.
Gerçek dosya yükleme/depolama işlemi yapmaz; her fonksiyon sahte (mock) değer döndürür.

---

## 📦 Dışa Aktarılan Fonksiyonlar

| Fonksiyon | Gerçek mi? | Döndürdüğü |
|-----------|------------|------------|
| `validateFile(data)` | ✅ Minimal | `{ valid: true }` (null check only) |
| `storagePut(key, data)` | ❌ Mock | `{ success: true, url: '/uploads/{key}' }` |
| `storageGet(key)` | ❌ Mock | `null` |
| `storageDelete(key)` | ❌ Mock | `undefined` |
| `generateSignedUrl(key)` | ❌ Mock | `/uploads/{key}` |
| `storageExists(key)` | ❌ Mock | `true` (her zaman) |

---

## ⚠️ Dikkat Edilmesi Gerekenler

- `storagePut()` gerçekte hiçbir şey yüklemez. Fotoğraf yükleme sayfaları hata almadan çalışıyor gibi görünse de veriler kaybolur.
- `storageExists()` her zaman `true` döndürür — bu yanlış sonuçlara yol açabilir.
- `validateFile()` yalnızca null kontrolü yapar; dosya tipi, boyut veya virüs taraması yok.

---

## 💡 AI Öneri

> **1. Gerçek Depolama Servisi Seçin:**
> - **MinIO (Self-Hosted S3):** VPS'e kurulur, ücretsiz, production-grade. Docker ile kolayca başlatılır.
> - **Cloudflare R2:** S3 uyumlu, çok ucuz egress maliyeti, Türkiye kullanıcıları için hızlı.
> - **AWS S3:** Güvenilir, maliyet öngörülebilir; 5GB ücreti bedava.
>
> **2. Dosya Doğrulama İyileştirin:**
> ```ts
> function validateFile(file: File) {
>   const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
>   const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];
>   if (file.size > MAX_SIZE) return { valid: false, error: 'Dosya 10MB sınırını aşıyor.' };
>   if (!ALLOWED.includes(file.type)) return { valid: false, error: 'Desteklenmeyen dosya tipi.' };
>   return { valid: true };
> }
> ```
>
> **3. Escort fotoğrafları için CDN + Yüz maskeleme pipeline'ı:**
> Yükleme → FaceMaskOverlay AI → masked_url + original_url ayrı ayrı kaydet → Drizzle `escort_photos` tablosuna yaz.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
