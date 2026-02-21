# `src/server/routers/auth.router.ts` — Kimlik Doğrulama Router'ı

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/server/routers/auth.router.ts` |
| **Modül** | `server/routers/auth` |
| **Dil** | TypeScript |
| **Teknoloji** | tRPC, Drizzle ORM, bcryptjs, jsonwebtoken, Zod |
| **Prosedür Türü** | `publicProcedure` (register, login, socialAuth) + `protectedProcedure` (completeProfile, acceptChatRules, me) |
| **Durum** | 🔵 ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Kullanıcı kimlik doğrulama, kayıt, sosyal giriş ve oturum yönetimi için tüm API prosedürlerini tanımlar.

---

## 🛡️ Güvenlik Özellikleri

### Sahte Mail Engeli (50+ Domain)
```
mailinator, guerrillamail, tempmail, yopmail, trashmail, 10minutemail ...
```
Kayıt sırasında `isDisposableEmail()` fonksiyonu çalışır. Yakalanırsa `BAD_REQUEST` hatası.

### Tekil Kısıtlamalar
- **E-posta:** `UNIQUE` — aynı mail 2. kez kullanılamaz
- **Telefon:** `UNIQUE` — aynı numara 2. kez kullanılamaz

---

## 📦 Prosedürler

### `register` — E-posta/Şifre Kayıt
**Tip:** `publicProcedure.mutation`

**Input:**
```ts
{
  email: string,           // Zorunlu, email formatı, sahte domain engeli
  password: string,        // Min 8 karakter
  fullName: string,        // Min 2 karakter
  phoneNumber: string,     // Türkiye formatı (+90...)
  role: 'customer'|'escort',
  hasAcceptedTerms: boolean // true olmazsa hata
}
```

**Çıktı:** `{ status, token, user, requiresProfileSetup: false }`

**Özel Davranış:**
- Escort kaydında → `escort_profiles` tablosuna `visibilityStatus: 'hidden'` ile boş profil oluşturulur
- JWT token (7 gün geçerli) döndürülür

---

### `login` — E-posta/Şifre Giriş
**Tip:** `publicProcedure.mutation`

**Input:** `{ email, password }`

**Çıktı:** `{ token, user, requiresProfileSetup }`

---

### `socialAuth` — Google / Apple OAuth Girişi
**Tip:** `publicProcedure.mutation`

**Input:**
```ts
{
  email: string,
  fullName?: string,
  providerId: string,       // Google/Apple'dan gelen ID
  provider: 'google'|'apple'
}
```

**Davranış:**
- Yeni kullanıcı → kayıt oluştur, `isProfileComplete: false`
- Mevcut kullanıcı → provider bilgisi güncellenir
- `requiresProfileSetup: true` döndürür → `ProfileCompleteModal` açılır

---

### `completeProfile` — Sosyal Giriş Sonrası Profil Tamamlama
**Tip:** `protectedProcedure.mutation`

**Input:** `{ phoneNumber, role, fullName?, hasAcceptedTerms }`

**Davranış:**
- Telefon tekiliği kontrolü yapılır
- `isProfileComplete: true` ayarlanır
- Escort ise `escort_profiles` oluşturulur

---

### `acceptChatRules` — Chat Kuralları Onayı
**Tip:** `protectedProcedure.mutation`

`hasAcceptedChatRules: true` ve `chatRulesAcceptedAt: now()` ayarlar.

---

### `me` — Mevcut Kullanıcı Bilgisi
**Tip:** `protectedProcedure.query`

Oturumdaki kullanıcının profil bilgilerini döndürür (telefon, rol, onay durumları vb.).

---

## 💡 AI Öneri

> **1. Email Doğrulama (OTP/Link):**
> Şu an mail onay kodu gönderilmiyor. Kayıt sonrası bir `send_verification_email` adımı eklenebilir (SendGrid / Resend ile).
>
> **2. Brute Force Koruması:**
> Başarısız giriş denemelerini sayıp belirli IP'yi/hesabı geçici kilitlemek için Redis tabanlı rate limiter eklenebilir.
>
> **3. Refresh Token:**
> JWT 7 günde doluyor. Uzun süreli oturumlar için refresh token mekanizması eklenmeli.
>
> **4. Gerçek OAuth Token Doğrulama:**
> `socialAuth` şu an sanal bir akış — production'da Google ID Token, `google-auth-library` ile sunucu tarafında doğrulanmalıdır.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
