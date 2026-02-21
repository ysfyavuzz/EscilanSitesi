# `src/components/DashboardRouter.tsx` — Dashboard Yönlendirici

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/components/DashboardRouter.tsx` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React, `wouter`, tRPC, `framer-motion` |
| **Kullanıldığı Yer** | Ana `App.tsx` içinde, giriş yapıldıktan sonra |
| **Durum** | 🔲 Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Oturum açan kullanıcının rolüne göre doğru panele yönlendirme yapan akıllı router bileşenidir.

Kullanıcı rolüne göre yönlendirme:
| Rol | Yönlendirildiği Panel |
|-----|----------------------|
| `customer` | Müşteri Dashboard |
| `escort` | Escort Dashboard |
| `admin` / `super_mod` / `moderator` | Admin Dashboard |
| Profil tamamlanmamış | `ProfileCompleteModal` |
| Chat kuralları kabul edilmemiş | `ChatRulesModal` (ilk mesajda) |

---

## 🔐 Auth Akışı

```
Login/Register
    ↓
DashboardRouter
    ↓ isProfileComplete?
    Hayır → ProfileCompleteModal → tamamla → DashboardRouter
    ↓ role?
    customer → CustomerDashboard
    escort → EscortDashboard
    admin → AdminDashboard
```

---

## 💡 AI Öneri

> **1. Lazy Loading:**
> Her dashboard bileşeni büyük (`AdminDashboard ~115KB`). `React.lazy()` + `Suspense` ile yalnızca kullanılan dashboard yüklenmeli; diğerleri bundle'a dahil edilmemeli.
>
> **2. Rol Değişikliği Yeniden Yönlendirme:**
> Admin tarafından rol değiştirilen kullanıcı anlık yeniden yönlendirme bekler. tRPC `me` query'sinin polling veya invalidation ile güncellenmesi gerekir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
