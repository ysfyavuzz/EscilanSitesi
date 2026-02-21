# `src/contexts/AuthContext.tsx` — Kimlik Doğrulama Context'i

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/contexts/AuthContext.tsx` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React Context API, `localStorage` |
| **Dışa Aktarma** | `AuthProvider`, `useAuth()`, `User`, `AdminPermissions` |
| **Kullanıldığı Yer** | `App.tsx` ile sarılır, tüm uygulama erişir |
| **Durum** | ⚠️ Dökümanlandı — Kritik Güvenlik Açığı |

---

## 🎯 Ne İşe Yarar?

Kimlik doğrulama state'ini tüm uygulamaya yayan React Context. Kullanıcı oturumunu, rolünü, izinlerini ve temel auth aksiyonlarını sağlar.

---

## 📦 Context Değerleri (AuthContextValue)

```ts
{
  user: User | null;              // Oturum açmış kullanıcı
  isAuthenticated: boolean;       // Giriş yapıldı mı?
  isLoading: boolean;             // Sayfa yüklenirken auth kontrolü
  isAdmin: boolean;               // role === 'admin'
  isSuperAdmin: boolean;          // user.isSuperAdmin === true
  isEscort: boolean;              // role === 'escort'
  viewRole: 'guest'|'user'|'premium'|'vip';  // Üyelik katmanı
  userRole: 'customer'|'escort'|'admin'|null;
  permissions: AdminPermissions | null;
  hasPermission: (key) => boolean;  // İzin kontrolü
  canAccessAnySection: boolean;   // Herhangi bir admin iznine sahip mi?
  login, logout, register, updateProfile, refreshToken
}
```

---

## 📋 AdminPermissions Tablosu

| İzin | Açıklama |
|------|----------|
| `canCreateListings` | İlan oluşturabilir |
| `canApproveListings` | İlan onaylayabilir |
| `canBanUsers` | Kullanıcı ban/shadowban |
| `canViewAllMessages` | Tüm mesajları görebilir |
| `canViewAnalytics` | Analitik verilerine erişebilir |
| `canManagePayments` | Ödeme yönetimi |
| ... (16 izin toplam) | |

`isSuperAdmin: true` ise `hasPermission()` hepsine `true` döner.

---

## 🚨 KRİTİK GÜVENLİK AÇIĞI

```ts
// ❌ login() içinde:
role: email.includes('admin') ? 'admin' : 'customer'
```
Email adresinde "admin" geçen herhangi bir kişi (`admin@gmail.com`, `admintest@mail.com`) otomatik olarak admin rolü alıyor. Bu gerçek giriş ile kıyaslandığında:

```ts
// ✅ Güvenli yaklaşım:
const result = await trpc.auth.login.mutate({ email, password });
setUser(result.user); // Sunucudan dönen doğrulanmış kullanıcı
```

---

## ⚠️ Dikkat Edilmesi Gerekenler

- **`login` tüyle mock:** Gerçek şifre doğrulaması yok. `trpc.auth.login` çağrılmalı.
- **`register` stub:** Sadece `console.log`.
- **`refreshToken` stub:** Boş async fonksiyon.
- **localStorage'da kullanıcı:** Token yerine tüm user objesi `auth_user` key'inde saklanıyor. JWT token ayrı tutulmalı.

---

## 💡 AI Öneri

> **1. tRPC Auth Entegrasyonu:**
> ```ts
> const login = async (email, password) => {
>   const result = await trpc.auth.login.mutateAsync({ email, password });
>   setUser(result.user);
>   localStorage.setItem('auth_user', JSON.stringify(result));
> };
> ```
>
> **2. Token Güvenliği:**
> Tüm user objesini yerine sadece JWT token saklayın:
> ```ts
> localStorage.setItem('auth_token', result.token);
> ```
> Kullanıcı bilgileri `trpc.auth.me.useQuery()` ile anında çekin.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
