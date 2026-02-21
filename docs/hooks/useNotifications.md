# `src/hooks/useNotifications.ts` — Bildirim Yönetim Hook'u

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/hooks/useNotifications.ts` |
| **Dil** | TypeScript |
| **Teknoloji** | React, Web Notification API, Service Worker Push API |
| **Bağımlılıklar** | `@/types/notification` → `Notification`, `NotificationPreferences`, `NOTIFICATION_TYPES` vb. |
| **Durum** | ✅ Dökümanlandı — ⚠️ Mock veri üzerinde çalışıyor |

---

## 🎯 Ne İşe Yarar?

Uygulama içi bildirimlerin state yönetimini, tarayıcı Push bildirimlerini ve bildirim tercihlerini yöneten hook.
Mock veri ile çalışır ama Web Push API ile Service Worker entegrasyonu hazır.

---

## 📦 Seçenekler

```ts
{
  autoRefresh?: boolean;          // default: true — periyodik yenileme
  refreshInterval?: number;       // default: 30000ms
  onNotificationReceived?: (n: Notification) => void;
  onNotificationRead?: (id: string) => void;
  onError?: (error: Error) => void;
}
```

---

## 📦 Döndürülen Değerler

### State
| Alan | Tip | Açıklama |
|------|-----|----------|
| `notifications` | `Notification[]` | Tüm bildirimler |
| `unreadCount` | number | Okunmamış sayısı |
| `stats` | `NotificationStats` | Kategori/öncelik istatistikleri |
| `preferences` | `NotificationPreferences` | Kullanıcı bildirim ayarları |
| `isPushEnabled` | boolean | Push izni verildi mi? |
| `pushPermission` | `'default'\|'granted'\|'denied'` | Tarayıcı izin durumu |

### Aksiyonlar
`markAsRead`, `markAllAsRead`, `deleteNotification`, `clearAll`, `updatePreferences`

### Push Bildirimleri
`requestPushPermission()` → Tarayıcı izin isteği + Service Worker VAPID abone kaydı  
`sendTestNotification()` → Anlık yerel push test bildirimi

### Filtreler
```ts
filterByCategory('message' | 'booking' | 'review' | 'promotion')
filterByPriority('low' | 'normal' | 'high' | 'urgent')
getUnread()
```

---

## 📋 Mock Bildirim Tipleri (4 adet)

| Tip | Kategorisi | Öncelik |
|-----|-----------|---------|
| `message_new` | message | normal |
| `booking_confirmed` | booking | high |
| `review_new` | review | normal |
| `promotion_offer` | promotion | normal |

---

## ⚙️ Teknik Özellikler

### Web Push VAPID
```ts
// VITE_VAPID_PUBLIC_KEY env değişkeninden alınır
const vapidKey = urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY);
await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: vapidKey });
```

### Dışa Aktarılan Yardımcı Fonksiyonlar
- `createNotification(typeId, variables, userId)` — `NOTIFICATION_TYPES`'tan şablon oluşturur
- `sendNotification(notification, channels)` — `in_app` (CustomEvent) ve `push` kanallarına gönderir

---

## ⚠️ Dikkat Edilmesi Gerekenler

- **Tüm backend çağrıları mock:** Her aksiyonun yanında `// In production, call API` yorumu var. tRPC bağlantısı yok.
- **Push subscription server'a gönderilmiyor:** `console.log('Push subscription:', subscription)` ile simüle ediliyor.
- **`autoRefresh` boş:** Interval kurulmuş ama içi `// TODO` yorumundan ibaret.

---

## 💡 AI Öneri

> **1. tRPC Entegrasyonu:**
> `trpc.notification.list.useQuery()`, `trpc.notification.markAsRead.useMutation()` eklenebilir.
>
> **2. VAPID Key:**
> `web-push` npm paketi ile backend'de abone kaydı alınıp `notifications` tablosuna yazılmalı.
>
> **3. Service Worker:**
> `public/sw.js` dosyası oluşturularak arka planda push bildirimi alınabilir (uygulama kapalıyken bile).

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
