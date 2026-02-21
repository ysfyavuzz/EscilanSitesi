# `src/server/routers/chat.router.ts` — Mesajlaşma Router'ı

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/server/routers/chat.router.ts` |
| **Modül** | `server/routers/chat` |
| **Dil** | TypeScript |
| **Teknoloji** | tRPC, Drizzle ORM, `src/lib/chatFilter` |
| **Prosedür Türü** | `protectedProcedure` (tüm prosedürler) |
| **Durum** | 🔵 ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Kullanıcılar arası mesajlaşma sistemini yönetir. Konuşma oluşturma, mesaj gönderme (AI filtre + disappearing messages), okundu bildirimi ve mesaj silme işlemlerini kapsar.

---

## 📦 Prosedürler

### `getOrCreateConversation`
İki kullanıcı arasında zaten bir konuşma varsa mevcut olanı döndürür; yoksa yeni oluşturur.
Katılımcı ID'leri sıralanarak tutarlı `participantIds` JSON oluşturulur.

**Input:** `{ otherUserId: number }`
**Output:** `ChatConversation`

---

### `getMessages`
Bir konuşmadaki geçerli mesajları sayfalı olarak döndürür.
- Süresi dolmuş (`expiresAt < now`) mesajlar otomatik `isDeleted: true` yapılır (fire-and-forget)
- Silinmiş (`isDeleted: true`) mesajlar filtrelenir
- Katılımcı olmayan kullanıcı `FORBIDDEN` alır

**Input:** `{ conversationId, limit?, beforeId? }`
**Output:** `ChatMessage[]`

---

### `sendMessage`
Mesaj gönderir. İki güvenlik katmanı geçmelidir:

1. **Katılımcı kontrolü** — Konuşmada olmayan biri mesaj gönderemez
2. **AI İçerik Filtresi** — `filterChatMessage()` çalışır:
   - `BLOCKED` → `BAD_REQUEST` hatası, mesaj kayıt edilmez
   - `WARN` → `isAiFlagged: true` ile kaydedilir
   - `CLEAN` → normal kayıt

**Disappearing Messages:**
Konuşmada `disappearAfterHours` ayarlandıysa `expiresAt = now + hours` hesaplanır ve mesaja eklenir.

**Input:** `{ conversationId, content, type?, mediaUrl? }`
**Output:** `{ success, message, isWarned }`

---

### `setDisappearTimer`
Konuşma için kaybolan mesaj süresini ayarlar.

**Input:** `{ conversationId, hours: number | null }`

| `hours` | Anlam |
|---------|-------|
| `null` | Kapalı (mesajlar silinmez) |
| `1` | 1 saat sonra silinir |
| `24` | 24 saat sonra silinir |
| `168` | 7 gün sonra silinir |

---

### `markAsRead`
Konuşmadaki tüm okunmamış mesajları okundu olarak işaretler.

**Input:** `{ conversationId }`

---

### `deleteMessage`
Kullanıcı kendi mesajını soft-delete eder (`isDeleted: true, deletedAt: now`).
Başkasının mesajı silinemez — `FORBIDDEN` hatası.

**Input:** `{ messageId }`

---

### `getConversations`
Mevcut kullanıcının dahil olduğu tüm konuşmaları döndürür.
`lastMessageAt` azalan sırada listelenir.

---

## ⚠️ Dikkat Edilmesi Gerekenler

- `expiresAt` geçince mesajlar otomatik silinmiyor — sadece `getMessages` çağrısında temizleniyor. Gerçek zamanlı temizlik için bir cron job veya PostgreSQL scheduled deletion gerekir.
- `participantIds` JSON text olarak saklanıyor — büyük ölçekte sorgu yapmak güçtür.

---

## 💡 AI Öneri

> **1. Cron Job ile Gerçek Zamanlı Mesaj Temizleme:**
> `pg_cron` veya Node.js `setInterval` ile `DELETE FROM chat_messages WHERE expires_at < now()` her 10 dakikada çalıştırılabilir.
>
> **2. WebSocket ile Gerçek Zamanlı Mesajlaşma:**
> tRPC'nin subscription (`ws`) desteği kullanılarak mesajlar push ile iletilebilir. `httpBatchLink` → `splitLink + wsLink` geçişi gerekir.
>
> **3. Mesaj Sayfalama (Cursor-Based):**
> `beforeId` parametresi mevcut ama tam implemente edilmemiş — infinite scroll için cursor-based pagination tamamlanmalı.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
