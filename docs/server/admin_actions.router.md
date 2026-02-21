# `src/server/routers/admin_actions.router.ts` — Admin Aksiyon Router'ı

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/server/routers/admin_actions.router.ts` |
| **Dil** | TypeScript |
| **Teknoloji** | tRPC, Drizzle ORM, Zod |
| **Prosedür Türü** | `adminProcedure` (tüm prosedürler — yalnızca admin/moderatör) |
| **Durum** | 🔵 ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Admin ve moderatörlerin platform yönetim aksiyonlarını gerçekleştirdiği güvenli router. Her aksiyon `audit_logs` tablosuna otomatik olarak kaydedilir.

---

## 🔐 Yetki

`adminProcedure` — yalnızca `role: admin | super_mod | moderator` olan kullanıcılar çağırabilir.

---

## 📋 Audit Logging

```ts
logAdminAction(ctx, {
  action: 'ACTION_NAME',
  targetType: 'USER' | 'escort_profile',
  targetId: number,
  previousData: any,
  newData: any
});
```
Her başarılı aksiyon `audit_logs` tablosuna `adminId`, `action`, `targetType`, `targetId`, önceki/yeni veri ile kaydedilir.

---

## 📦 Prosedürler

### `setShadowBan`
Kullanıcıyı shadow ban'a alır veya kaldırır. Kara listeye alınan kullanıcı banlandığını görmez ama içerikleri filtrelenir.

**Input:** `{ userId: number, status: boolean }`

---

### `getAuditLogs`
Tüm admin aksiyonlarının zaman sıralı kaydını döndürür. Admin ile birlikte ilgili kullanıcı bilgisi de gelir.

**Input:** `{ limit?: number, offset?: number }`

---

### `adjustLoyalty`
Kullanıcının sadakat puanını manuel olarak artırır veya azaltır (admin müdahalesi).

**Input:** `{ userId, points, reason }` — Negatif değerle puan düşülür.

---

### `approveEscort`
Escort profilini onaylar, 7 günlük ücretsiz deneme başlatır ve kullanıcıya 100 XP + 20 Sadakat Puanı verir.

**Input:** `{ profileId: number }`

**Akış:**
1. `verificationStatus: 'approved'`, `visibilityStatus: 'public'`
2. `freeTrialEndsAt = now + 7 gün`
3. `hasVerifiedBadge: true`
4. `experiencePoints + 100`, `loyaltyPoints + 20`

---

### `getPendingProfileUpdates`
`hasPendingUpdate: true` olan tüm profilleri listeler. Her profil için `pendingDataParsed` (JSON parse edilmiş) de döner.

---

### `approveProfileUpdate`
`pendingData`'daki değişiklikleri güvenli whitelist üzerinden ana kolonlara uygular.

**Güvenli Alanlar:** `displayName`, `bio`, `biography`, `slogan`, `city`, `district`, `age`

---

### `rejectProfileUpdate`
`pendingData`'yı temizler, `hasPendingUpdate: false` yapar. Ret nedeni audit log'a kaydedilir.

**Input:** `{ profileId, reason }` — Reason min 5 karakter.

---

## 💡 AI Öneri

> **1. Escort'a Bildirim:**
> `rejectProfileUpdate` çağrıldığında `// TODO: Escort'a sistem bildirimi` yorumu var. Bildirim tablosu eklendiğinde escort'a ret nedeni gönderilebilir.
>
> **2. Toplu İşlem (Bulk Actions):**
> Onlarca escort başvurusu olduğunda tek tek onaylamak yerine `profileIds: number[]` alarak toplu onay/ret yeteneği eklenebilir.
>
> **3. Moderatör Kısıt Ayrımı:**
> `super_mod` escort onaylayabilir ama `moderator` sadece şikayet ve içerik moderasyonu yapabilmeli. Şu an `adminProcedure` tüm rollere eşit yetki veriyor.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
