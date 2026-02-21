# `src/hooks/useWebSocket.ts` — WebSocket Bağlantı Hook'u

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/hooks/useWebSocket.ts` |
| **Dil** | TypeScript |
| **Teknoloji** | React (`useRef`, `useCallback`, `useEffect`, `useState`), Native WebSocket API |
| **Bağımlılıklar** | `@/types/websocket` → `WebSocketConfig`, `ConnectionStatus`, `QueuedMessage` vb. |
| **Kullanıldığı Yer** | `useChat.ts`, gerçek zamanlı bildirim bileşenleri |
| **Durum** | ✅ Dökümanlandı — Tam implemente edilmiş |

---

## 🎯 Ne İşe Yarar?

WebSocket bağlantısını yöneten, production seviyesinde bir bağlantı hook'u.
Yeniden bağlantı (reconnect), mesaj kuyruğu (queue), heartbeat ve olay aboneliği (subscription) sistemi içerir.

---

## 📦 Seçenekler (UseWebSocketOptions)

```ts
{
  url?: string;                  // default: ws://localhost:3001/ws
  token?: string;                // JWT token → URL'e ?token= ile eklenir
  autoConnect?: boolean;         // default: true
  autoReconnect?: boolean;       // default: true
  reconnectInterval?: number;    // default: 3000ms (base)
  maxReconnectAttempts?: number; // default: 10
  heartbeatInterval?: number;    // default: 30000ms (30 sn)
  enablePresence?: boolean;      // default: true
  debug?: boolean;               // console log toggle
}
```

---

## 📦 Döndürülen Değerler

### Bağlantı State
| Alan | Tip | Açıklama |
|------|-----|----------|
| `isConnected` | boolean | Aktif bağlantı var mı? |
| `connectionStatus` | `'connecting'\|'connected'\|'reconnecting'\|'disconnected'\|'error'` | Detaylı durum |
| `reconnectAttempts` | number | Kaçıncı yeniden bağlantı denemesi |
| `lastError` | `Error \| null` | Son bağlantı hatası |

### Kontrol
`connect()`, `disconnect()`, `reconnect()` — manuel bağlantı yönetimi

### Mesajlaşma
`sendMessage(type, data)` — tip güvenli mesaj gönderim  
`sendRaw(string)` — ham string gönderim

### Olay Abonelikleri
```ts
const unsub = onMessage((data) => { /* yeni mesaj */ });
const unsub = onTyping((data) => { /* yazıyor */ });
const unsub = onPresence((data) => { /* çevrimiçi durum */ });
const unsub = onReadReceipt((data) => { /* okundu */ });
// Component unmount'ta unsub() çağrılmalı!
```

### Kuyruk Yönetimi
`queuedMessages: number` — bekleyen mesaj sayısı  
`clearQueue()` — kuyruğu temizle

---

## ⚙️ Teknik Özellikler

### Exponential Backoff
Bağlantı kesildiğinde yeniden bağlanma gecikmesi katlanarak artar, gürültü (jitter) eklenir:
```ts
delay = min(baseDelay × 2^attempt, 30000) + random(0-25%)
```
1. deneme → ~1 sn, 5. deneme → ~16 sn, 10. deneme → ~30 sn

### Message Queue (Çevrimdışı Mesajlaşma)
Bağlantı kesildiğinde mesajlar bellek kuyruğuna alınır.  
Bağlantı kurulunca `processMessageQueue()` ile otomatik gönderilir.

### Heartbeat (Ping-Pong)
Her 30 saniyede bir `{ type: 'ping' }` gönderilir.  
Server `{ type: 'pong' }` ile yanıt verir — bağlantı canlı tutulur.

### Wildcard Subscription
```ts
notifySubscribers('*', wsMessage); // Her mesajı yakala
```

---

## 💡 AI Öneri

> **1. Token Güvenliği:**
> JWT token URL'e `?token=...` olarak ekleniyor. Bu, URL log'larında tokeni açığa çıkarabilir. Daha güvenli yaklaşım: bağlantı kurulduktan sonra `sendMessage('auth', { token })` ile sunucu tarafında doğrulama.
>
> **2. Server-Side WebSocket Altyapısı:**
> Şu an `ws://localhost:3001/ws` endpoint'i yok. Backend'de `tRPC wsLink` veya ayrı bir `ws` server kurulumu gerekiyor.
>
> **3. Heartbeat Timeout:**
> `pong` belirli sürede gelmezse bağlantı gerçekten kopmuş sayılarak `disconnect()` + reconnect tetiklenebilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
