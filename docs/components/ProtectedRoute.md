# `src/components/ProtectedRoute.tsx` — Korumalı Rota

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/components/ProtectedRoute.tsx` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React, `wouter`, tRPC |
| **Kullanıldığı Yer** | `App.tsx` (tüm korumalı sayfalar) |
| **Durum** | 🔲 Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Oturum doğrulaması ve rol kontrolü yapan yönlendirme guard bileşenidir. Yetkisiz erişimde kullanıcıyı `/login` veya ana sayfaya yönlendirir.

---

## 📦 Props

```ts
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'customer' | 'escort' | 'admin' | 'super_mod' | 'moderator';
  redirectTo?: string;  // default: '/login'
}
```

---

## 🔐 Koruma Mantığı

```
Kullanıcı giriş yapmış mı?
├── Hayır → /login yönlendir
└── Evet → requiredRole tanımlı mı?
    ├── Hayır → children render et
    └── Evet → kullanıcı rolü eşleşiyor mu?
        ├── Evet → children render et
        └── Hayır → /unauthorized yönlendir
```

---

## 💡 AI Öneri

> **1. Loading State:**
> JWT doğrulama sırasında blank ekran yerine iskelet loader gösterilmeli.
>
> **2. Token Süresi Kontrol:**
> `localStorage`'daki token süresi dolmuşsa component mount olduğunda sessizce çıkış yapılmalı ve kullanıcı yeniden giriş sayfasına yönlendirilmeli.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
