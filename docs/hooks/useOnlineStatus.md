# `src/hooks/useOnlineStatus.ts` — Çevrimiçi Durum Takip Hook'u

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/hooks/useOnlineStatus.ts` |
| **Dil** | TypeScript |
| **Teknoloji** | React, `date-fns/tr`, DOM Event API (`visibilitychange`, `mousemove` vb.) |
| **Bağımlılıklar** | `@/types/websocket` → `UserStatus`, `PresenceData` |
| **Durum** | ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Kullanıcıların çevrimiçi/çevrimdışı/uzakta durumlarını takip eden ve yöneten, üretim seviyesinde hazır bir presence hook'u.
Idle detection, sayfa gizleme takibi ve durum yayını içerir.

---

## 📦 Seçenekler

```ts
{
  enableIdleDetection?: boolean;        // default: true
  idleTimeout?: number;                 // default: 5 dakika (300_000ms)
  enableStatusBroadcast?: boolean;      // default: true
  statusBroadcastInterval?: number;     // default: 30 sn (30_000ms)
  onStatusChange?: (userId, status) => void;
  onBroadcastStatus?: (status) => void; // WS üzerinden durum yayını için
}
```

---

## 📦 Döndürülen Değerler

| API | Tip | Açıklama |
|-----|-----|----------|
| `onlineUsers` | `Set<string>` | Çevrimiçi kullanıcı ID'leri |
| `isUserOnline(userId)` | `boolean` | Kullanıcı çevrimiçi mi? |
| `getUserStatus(userId)` | `UserStatus` | 'online'\|'away'\|'offline' |
| `getLastSeen(userId)` | `string\|null` | Türkçe "2 dakika önce" formatı |
| `myStatus` | `UserStatus` | Kendi durumum |
| `setMyStatus(status)` | `void` | Durum güncelle + broadcast |
| `updatePresence(userId, data)` | `void` | Tekil presence güncelle |
| `updateMultiplePresences(list)` | `void` | Toplu presence güncelle |
| `setUsersOnline/Offline(ids)` | `void` | Toplu çevrimiçi/dışı işaretle |

---

## ⚙️ Özel Özellikler

### Idle Detection (Etkinlik Algılama)
`mousedown`, `mousemove`, `keypress`, `scroll`, `touchstart`, `click` olayları dinlenir.  
5 dakika etkinlik yoksa `myStatus: 'away'` yapılır, hareket edince `'online'` geri gelir.

### Page Visibility Takibi
`document.visibilitychange` olayıyla sekme arka plana geçince:
- 1 dakika bekler → hâlâ gizliyse `'away'`
- Sekme tekrar öne gelince → `'online'`

### Türkçe "Son Görüldü"
```ts
getLastSeen('user-123') // → "5 dakika önce"
// date-fns formatDistanceToNow + locale: tr
```

---

## 💡 AI Öneri

> **1. WebSocket Entegrasyonu:**
> `onBroadcastStatus` callback'i `useWebSocket.sendMessage('presence:update', { status })` ile bağlanabilir. Bu durumda durum değişiklikleri tüm bağlı kullanıcılara yayınlanır.
>
> **2. Varlık Tablosu:**
> `presences` tablosuna `userId`, `isOnline`, `lastSeen`, `status` eklenerek sunucu tarafında da takip yapılabilir. Kullanıcı websocket bağlantısı kesildiğinde sunucu bu tabloyu otomatik günceller.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
