# 📋 Zühre Planet — Katkı ve Döküman Kuralları

> **Bu kurallar hem insan geliştiriciler hem de AI asistanlar için geçerlidir.**
> Kural ihlali kabul edilmez — her commit/change bu kurallara uymalıdır.

---

## ⚠️ ZORUNLU KURALLAR

### 1. Her Kod Değişikliğinde JOURNAL.md Güncellenmeli

`JOURNAL.md` dosyasına aşağıdaki formatta kayıt eklenmelidir:

```markdown
| 2026-02-21 | 10:30 | [Adınız/AI Adı] | [KATEGORİ] | Ne yaptığınızın kısa açıklaması |
```

**Kategori etiketleri:**

| Etiket | Kullanım |
|--------|----------|
| `[FEAT]` | Yeni özellik eklendi |
| `[FIX]` | Bug/hata düzeltildi |
| `[DOC]` | Döküman oluşturuldu/güncellendi |
| `[SCHEMA]` | Veritabanı şeması değişti |
| `[SEC]` | Güvenlik iyileştirmesi |
| `[REFACTOR]` | Kod yeniden düzenlendi |
| `[STYLE]` | Sadece UI/CSS değişikliği |
| `[PERF]` | Performans iyileştirmesi |
| `[TEST]` | Test eklendi/güncellendi |
| `[DEL]` | Dosya/kod silindi |
| `[BUG]` | Bug tespit edildi (henüz düzeltilmedi) |

---

### 2. Yeni Dosya Eklendiğinde PROJECT_MAP.md Güncellenmeli

`PROJECT_MAP.md` dosyasındaki ilgili katmana satır eklenmeli:

```markdown
| `YeniDosya.tsx` | 🔵 🔲 | Dosyanın ne yaptığının kısa açıklaması |
```

**Durum güncellemesi:**
- Dosya oluşturulduğunda: `🔵 🔲` (yeni + döküman bekliyor)
- Döküman yazıldığında: `[✅ docs/katman/dosya.md]`

---

### 3. Döküman Klasörü Yapısı

Her kaynak dosya için döküman şu yolda oluşturulmalı:

```
src/lib/utils.ts          → docs/lib/utils.md
src/server/routers/x.ts  → docs/server/x.router.md
src/pages/Foo.tsx        → docs/pages/Foo.md
src/components/Bar.tsx   → docs/components/Bar.md
src/hooks/useX.ts        → docs/hooks/useX.md
src/contexts/XContext.tsx → docs/contexts/XContext.md
src/types/x.ts           → docs/types/x.md
```

---

### 4. Döküman Formatı (Zorunlu Bölümler)

Her `docs/` dosyası şu bölümleri içermelidir:

```markdown
# `dosya/yolu.ts` — Kısa Başlık

## 📄 Dosya Hakkında
Tablo: Dosya, Dil, Teknoloji, Kullanıldığı Yer, Durum

## 🎯 Ne İşe Yarar?
Kısa açıklama paragrafı.

## 📦 Props / Parametreler / Prosedürler
Detaylı liste veya kod bloğu.

## ⚠️ Dikkat Edilmesi Gerekenler (varsa)
Bilinen sorunlar, limitler.

## 💡 AI Öneri (varsa)
İyileştirme önerileri.

*Döküman tarihi: YYYY-MM-DD | Oluşturan: [İsim]*
```

---

### 5. Kod İçi JSDoc Standardı

Tüm exported fonksiyon ve bileşenler JSDoc ile belgelenmeli:

```ts
/**
 * @description Fonksiyonun ne yaptığı
 * @param {string} paramName - Parametrenin açıklaması
 * @returns {SomeType} Döndürdüğü değerin açıklaması
 * @example
 * const result = myFunction('input');
 */
export function myFunction(paramName: string): SomeType { ... }
```

---

### 6. Bug Tespiti Zorunluluğu

Bir bug veya güvenlik açığı tespit edildiğinde:
1. `PROJECT_MAP.md` → `🐛 Tespit Edilen Açık Bug'lar` tablosuna eklenmeli
2. `JOURNAL.md`'ye `[BUG]` kategorisiyle kayıt eklenmeli
3. `docs/` dökümanında `⚠️ Dikkat Edilmesi Gerekenler` bölümünde belgelenmeli

---

## 🤖 AI Asistanları İçin Ek Kurallar

Bu projeye çalışan tüm AI asistanları (Antigravity, Copilot, Claude vb.):

1. **Her oturum başında** `PROJECT_MAP.md` ve `JOURNAL.md`'yi okuyun
2. **Oturum sonunda** değiştirdiğiniz/dökümanladığınız dosyaları işaretleyin
3. **Bug tespitinde** hemen belgelleyin, fırsatçı düzeltin
4. **Döküman oluştururken** AI Öneri bölümünü doldurun
5. **Asla** döküman güncellemeyi atlayıp "ileride yapılır" demeyin

---

## 📊 Döküman Tamamlama Öncelik Sırası

1. 🔴 **Kritik** (`storage.ts`, güvenlik açıkları) — hemen
2. 🟠 **Yüksek** (aktif kullanılan router'lar, büyük sayfalar)
3. 🟡 **Orta** (hook'lar, types)
4. 🟢 **Normal** (UI bileşenler, statik sayfalar)

---

*Oluşturulma tarihi: 2026-02-21 | Antigravity AI*
