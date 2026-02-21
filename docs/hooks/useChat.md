# `src/hooks/useChat.ts` — Gerçek Zamanlı Chat Hook'u

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/hooks/useChat.ts` |
| **Dil** | TypeScript |
| **Teknoloji** | React (`useState`, `useEffect`, `useCallback`, `useRef`), WebSocket |
| **Bağımlılıklar** | `@/types/message` → `Message`, `Conversation`, `WSMessage` vb. |
| **Kullanıldığı Yer** | `ChatInterface.tsx`, `MessagesPanel.tsx` |
| **Durum** | ✅ Dökümanlandı — ⚠️ Mock veri üzerinde çalışıyor |

---

## 🎯 Ne İşe Yarar?

Mesajlaşma sisteminin tüm istemci tarafı state yönetimini ve WebSocket bağlantısını sağlayan merkezi hook.
Konuşma yönetimi, mesaj gönderme/alma, yazıyor göstergesi, varlık (presence) takibi ve konuşma aksiyonlarını kapsar.

---

## 📦 Seçenekler (UseChatOptions)

```ts
interface UseChatOptions {
  wsUrl?: string;            // default: ws://localhost:3001/ws/chat
  autoReconnect?: boolean;   // default: true
  reconnectInterval?: number; // default: 3000ms
  enablePresence?: boolean;  // default: true
  onMessageReceived?: (msg: Message) => void;
  onConversationUpdated?: (conv: Conversation) => void;
  onError?: (error: ChatError) => void;
}
```

---

## 📦 Döndürülen State ve Aksiyonlar

### State
| Alan | Tip | Açıklama |
|------|-----|----------|
| `conversations` | `Conversation[]` | Tüm konuşmalar |
| `activeConversationId` | `string \| null` | Aktif konuşma |
| `messages` | `Record<string, Message[]>` | ConversationId → Mesajlar |
| `isConnected` | boolean | WS bağlantı durumu |
| `presences` | `Record<string, OnlineStatus>` | Kullanıcı çevrimiçi durumları |
| `typingUsers` | `Record<string, TypingUser[]>` | Yazıyor kullanıcılar |

### Mesaj Aksiyonları
| Fonksiyon | Açıklama |
|-----------|----------|
| `sendMessage(convId, content, type?)` | Optimistik gönderim + WS publish |
| `editMessage(msgId, content)` | Local state güncelleme |
| `deleteMessage(msgId)` | Local state'ten kaldır |
| `reactToMessage(msgId, emoji)` | Toggle emoji reaksiyon |
| `markAsRead(convId, msgId)` | Okundu işareti + WS event |
| `loadMoreMessages(convId)` | Sayfalama (stub) |

### Konuşma Aksiyonları
`pinConversation`, `unpinConversation`, `archiveConversation`, `muteConversation`, `unmuteConversation`, `blockUser`, `unblockUser`

### Yazıyor Bildirimi
`startTyping(convId)` → 3 saniye sonra otomatik `stopTyping` tetikler

---

## 🔄 Mesaj Gönderme Akışı (Optimistik UI)

```
sendMessage() çağrılır
  ↓
Temp mesaj state'e eklenir (status: 'sending')
  ↓
API çağrısı simüle edilir (500ms)
  ↓
Başarı → temp yerine gerçek mesaj, status: 'sent'
Hata → status: 'failed'
  ↓
WebSocket üzerinden karşı tarafa yayınlanır
```

---

## ⚠️ Dikkat Edilmesi Gerekenler

- **Mock Veri:** Başlangıçta `mockConversations` ve `mockMessages` kullanıyor. `trpc.chat.getConversations` ve `trpc.chat.getMessages` sorguları henüz entegre edilmemiş.
- **API Simülasyonu:** `sendMessage` gerçekte `setTimeout(500ms)` ile simüle ediyor — `trpc.chat.sendMessage` bağlanmalı.
- **`loadMoreMessages`:** Sadece `console.log` yapıyor, gerçek pagination yok.
- **`blockUser/unblockUser`:** Sadece `console.log` yapıyor.

---

## 💡 AI Öneri

> **1. tRPC Entegrasyonu:**
> `sendMessage` içindeki `setTimeout` simülasyonu yerine:
> ```ts
> const send = trpc.chat.sendMessage.useMutation();
> await send.mutateAsync({ conversationId, content });
> ```
>
> **2. Optimistik UI Tamamlama:**
> `[{ id: tempId, status: 'sending' }]` → mutation başarılı olunca tRPC cache'i invalidate et veya gerçek mesajı state'e uygula.
>
> **3. `useWebSocket` ile Entegrasyon:**
> `useChat` kendi WebSocket yönetimini yapıyor. `useWebSocket` hook'u ile birleştirilerek tekrar eden bağlantı kodu azaltılabilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
