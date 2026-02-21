# `src/lib/chatFilter.ts` — Chat AI Kelime Süzgeci

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/lib/chatFilter.ts` |
| **Modül** | `lib/chatFilter` |
| **Dil** | TypeScript |
| **Teknoloji** | Saf TypeScript (harici bağımlılık yok) |
| **Kullanıldığı Yer** | `server/routers/chat.router.ts` → `sendMessage` mutasyonu |
| **Durum** | 🔵 ✅ Tam dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Kullanıcıların chat mesajlarını gönderilmeden önce sunucu tarafında içerik filtreleme işleminden geçirir.
İki kategoride sonuç üretir:

| Kategori | Anlam | İşlem |
|----------|-------|--------|
| `BLOCKED` | Mesaj kesinlikle kabul edilemez | tRPC `BAD_REQUEST` hatası fırlatılır |
| `WARN` | Şüpheli içerik, incelenebilir | Mesaj kaydedilir ama admin için `isAiFlagged: true` |
| `CLEAN` | Temiz içerik | Normal akış |

---

## 🔒 Filtrelenen İçerik Kategorileri

### BLOCKED (Sert Engel)
| Kategori | Örnek Terimler |
|----------|---------------|
| Tehdit / Şiddet | `seni öldürürüm`, `adresini biliyorum`, `pişman ederim` |
| Dolandırıcılık | `iban ver`, `kripto gönder`, `wire transfer` |
| Çocuk koruması | `çocuk`, `küçük`, `reşit değil` |
| Kimlik bilgisi isteme | `tc kimlik`, `kimlik numarası`, `nüfus cüzdanı` |

### WARN (Uyarı Bayrağı)
| Kategori | Örnek Terimler |
|----------|---------------|
| Platform dışı iletişim | `whatsapp`, `telegram`, `instagram dm` |
| Doğrudan ödeme talebi | `nakit`, `peşin`, `havale at`, `papara` |
| Hafif küfür | `aptal`, `salak`, `gerizekalı` |
| Spam / Reklam | `siteyi ziyaret et`, `linkime tıkla` |

---

## 📦 Dışa Aktarılan Tipler

```ts
export type FilterResult =
  | { status: 'CLEAN' }
  | { status: 'WARN'; reason: string; matchedTerms: string[] }
  | { status: 'BLOCKED'; reason: string; matchedTerms: string[] };
```

---

## 📦 Dışa Aktarılan Fonksiyonlar

### `filterChatMessage(content: string): FilterResult`

Mesajı normalleştirir (Türkçe karakter dönüşümü dahil) ve term listelerine göre tarar.

```ts
import { filterChatMessage } from '@/lib/chatFilter';

const result = filterChatMessage('Sana ibannı ver');

if (result.status === 'BLOCKED') {
  // throw TRPCError
}
if (result.status === 'WARN') {
  // store with isAiFlagged: true
}
```

---

## 🔤 Türkçe Normalizasyon

Yazım hilelerine karşı koruma sağlar:

| Önce | Sonra |
|------|-------|
| `Ğ, ğ` | `g` |
| `Ü, ü` | `u` |
| `Ş, ş` | `s` |
| `İ, ı` | `i` |
| `Ö, ö` | `o` |
| `Ç, ç` | `c` |
| Özel karakterler | boşluk |

Örnek: `"İBANını gönder"` → normalise → `"ibanini gonder"` → eşleşme bulunur.

---

## 💡 AI Öneri

> **1. Makine Öğrenmesi Entegrasyonu:**
> Mevcut kural tabanlı sistem %100 kapsayamaz. İleride `perspective-api` (Google) veya yerel bir model ile bağlamsal analiz eklenebilir.
>
> **2. Dinamik Blocklist (Admin Paneli):**
> Admin panelinden yeni terim eklenebilen bir veritabanı tablosu (`chat_filter_rules`) oluşturulabilir. Statik liste yerine dinamik yükleme yapılır.
>
> **3. WARN Seviye Bildirim:**
> `WARN` döndüren mesajları admin paneline gerçek zamanlı iletmek için bir bildirim mekanizması kurulabilir.
>
> **4. Regex Desteği:**
> IBAN gibi `TR + 24 hane` kalıpları regex ile çok daha güvenilir yakalanabilir (şu an sadece metin taraması mevcut).

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
