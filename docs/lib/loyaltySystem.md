# `src/lib/loyaltySystem.ts` — Sadakat ve Rütbe Sistemi

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/lib/loyaltySystem.ts` |
| **Modül** | `lib/loyaltySystem` |
| **Dil** | TypeScript |
| **Teknoloji** | Saf TypeScript (harici bağımlılık yok) |
| **Kullanıldığı Yer** | `components/LoyaltyRankCard.tsx` |
| **Durum** | 🔵 ✅ Tam dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Platform genelindeki sadakat (loyalty) sisteminin iş mantığını tanımlar.
XP (deneyim puanı) tabanlı 6 rütke seviyesi, her rütkenin ayrıcalıkları, indirim yüzdeleri ve görsel stil tanımlarını içerir.

Hem escort hem de müşteri üyelikleri için geçerlidir.

---

## 🏅 Rütke Sistemi

| Rütke | Sembol | Min XP | Max XP | İndirim |
|-------|--------|--------|--------|---------|
| Bronz | 🥉 | 0 | 499 | %0 |
| Gümüş | 🥈 | 500 | 1.499 | %5 |
| Altın | 🥇 | 1.500 | 3.999 | %10 |
| Platin | 💎 | 4.000 | 9.999 | %15 |
| Elmas | ✨ | 10.000 | 24.999 | %20 |
| Galaktik | 🌌 | 25.000 | ∞ | %25 |

---

## 📦 Dışa Aktarılan Tipler

```ts
export type LoyaltyRank = 'Bronz' | 'Gümüş' | 'Altın' | 'Platin' | 'Elmas' | 'Galaktik';

export interface RankConfig {
  name: LoyaltyRank;
  minXP: number;
  maxXP: number;
  icon: string;
  gradient: string;   // Tailwind gradient
  border: string;     // Tailwind border color
  text: string;       // Tailwind text color
  discountPercent: number;
  description: string;
}
```

---

## 📦 Dışa Aktarılan Fonksiyonlar

### `getRankByXP(xp: number): RankConfig`
Verilen XP değerine göre uygun `RankConfig` nesnesini döndürür.

```ts
const rank = getRankByXP(2000); // → Altın rank config
```

### `getRankProgress(xp: number): number`
Mevcut rütke içindeki ilerleme yüzdesini (0–100) döndürür.

```ts
getRankProgress(750) // → 50  (Gümüş: 500-1499 arası, 750 = %25)
```

---

## 📦 Dışa Aktarılan Sabitler

### `RANK_CONFIG: RankConfig[]`
Tüm rütkelerin konfigürasyon dizisi, `minXP` ile artan sırada.

### `XP_REWARDS`
Kullanıcı eylemlerine karşılık kazanılan XP miktarları:

| Eylem | XP |
|-------|----|
| Kayıt ol | 50 |
| İlk randevu | 100 |
| Randevu tamamla | 50 |
| Yorum bırak | 30 |
| Profil doğrulama (escort) | 100 |
| Günlük giriş | 10 |
| Arkadaş davet et | 200 |

### `POINTS_PER_TL`
`100 puan = 1 TL indirim` — Sadakat puanlarının para birimine dönüşüm oranı.

---

## 💡 AI Öneri

> **1. XP Kazanımını Backend'de Tetikleyin:**
> `XP_REWARDS` sabitleri şu an yalnızca dokümantasyon/UI amaçlı. Her ilgili backend mutasyonunda (`completeBooking`, `leaveReview` vb.) bu değerler kullanılarak `users.experiencePoints` artırılmalı.
>
> **2. Günlük Giriş Bonusu İçin Streak Sistemi:**
> Kullanıcı art arda her gün giriş yaparsa bonus multiplier uygulanabilir (örn. 7 günlük seriye 2x, 30 günlük seriye 3x).
>
> **3. Rütke Gerilemeleri:**
> Şu an XP yalnızca artar. Uzun süre inaktif kullanıcılar için XP erimesi (decay) veya rütke gereklilikleri eklenebilir.
>
> **4. Frontend'de Animasyonlu Rütke Atlama:**
> Kullanıcı yeni bir rütkeye geçtiğinde konfeti + sesli bildirim gibi premium bir kutlama animasyonu yapılabilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
