# `src/contexts/ThemeContext.tsx` — Tema ve Planet Context'i

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/contexts/ThemeContext.tsx` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React Context API, `wouter` (useLocation), CSS Custom Properties |
| **Dışa Aktarma** | `ThemeProvider`, `useTheme()` |
| **Kullanıldığı Yer** | `App.tsx` kök seviyesinde sarılır |
| **Durum** | ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Platformun tema yönetimini (açık/koyu/sistem) ve URL'e göre dinamik "Planet Teması" renk değişimini sağlayan Context.

---

## 📦 Context Değerleri

```ts
{
  theme: 'light' | 'dark' | 'system';    // Kullanıcı tercihi
  setTheme: (theme) => void;             // localStorage'a kaydeder
  actualTheme: 'light' | 'dark';        // 'system' çözümlendikten sonra gerçek tema
  planetTheme: PlanetTheme | null;       // Mevcut sayfa planet teması
}
```

---

## 🪐 Planet Teması Sistemi

`PLANETS` veri listesindeki her planet bir `path` (route) ve `theme` (renk bilgisi) içerir.  
URL değiştiğinde `location` → eşleşen planet bulunur → CSS değişkenleri DOM'da güncellenir:

```ts
// Örnek: /escort → Jüpiter gezegeni → turuncu tonlar
root.style.setProperty('--primary', currentPlanet.theme.glow);
root.style.setProperty('--primary-rgb', hexToRgb(currentPlanet.theme.glow));
```

---

## ⚙️ Tema Çözümleme

```
theme = 'system'
  → window.matchMedia('(prefers-color-scheme: dark)').matches
  → actualTheme = 'dark' veya 'light'

theme = 'dark' veya 'light'
  → actualTheme = theme direkt

document.documentElement.classList = actualTheme
localStorage['escort-theme'] = tema
```

---

## 💡 AI Öneri

> **1. `prefers-color-scheme` Dinleyici:**
> Tarayıcı tema değişikliğini otomatik takip etmek için event listener eklenebilir:
> ```ts
> const media = window.matchMedia('(prefers-color-scheme: dark)');
> media.addEventListener('change', onSystemThemeChange);
> ```
>
> **2. CSS Transition:**
> Tema değişiminde anlık geçiş yerine kısa bir CSS geçiş animasyonu (`transition: all 0.2s`) arka plana uygulanabilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
