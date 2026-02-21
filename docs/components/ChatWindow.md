# `src/components/ChatWindow.tsx` — Chat Mesajlaşma Penceresi

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/components/ChatWindow.tsx` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React, `framer-motion`, Lucide Icons, Radix UI |
| **Kullanıldığı Yer** | `pages/Messages.tsx`, `pages/RealTimeMessaging.tsx` |
| **Durum** | ⚠️ Kısmi döküman |

---

## 🎯 Ne İşe Yarar?

İki kullanıcı arasındaki anlık mesajlaşma arayüzüdür. Mesaj listesi, yazıyor göstergesi, medya gönderme ve chat kuralı kapısı (chat rules gate) içerir.

---

## 📦 Props

```ts
interface ChatWindowProps {
  conversation: Conversation;
  messages: Message[];
  onSendMessage: (content: string, type?: string) => void;
  isLoading?: boolean;
  onCall?: () => void;
  onVideoCall?: () => void;
  onShowInfo?: () => void;
  currentUserId?: string;      // default: 'me'
  isMobile?: boolean;          // default: false
  onBack?: () => void;
  className?: string;
  // Chat kuralları kapısı:
  hasAcceptedChatRules?: boolean;  // default: true
  onAcceptChatRules?: () => Promise<void>;  // trpc.auth.acceptChatRules tetikler
}
```

---

## 🚪 Chat Kuralları Kapısı

`hasAcceptedChatRules: false` olduğunda bileşen `ChatRulesModal`'ı gösterir.
Kullanıcı kuralları kabul etmeden hiç mesaj gönderemez.

```tsx
// Örnek kullanım
const { data: user } = trpc.auth.me.useQuery();
const acceptChatRules = trpc.auth.acceptChatRules.useMutation();

<ChatWindow
  hasAcceptedChatRules={user?.hasAcceptedChatRules}
  onAcceptChatRules={() => acceptChatRules.mutateAsync()}
/>
```

---

## 🖼️ Bölümler

| Bölüm | İçerik |
|-------|--------|
| **Başlık** | Kullanıcı adı, online durum, arama/arama/bilgi butonları |
| **Mesaj Listesi** | Tarih ayırıcılar, mesaj balonları, zaman damgası, okundu ✓ |
| **Medya Tipleri** | text, image, video, audio, location — her biri farklı render |
| **Alt Bar** | `MessageInput` bileşeni (dosya, ses, metin) |
| **Kaybolan Mesaj** | `DisappearTimerSetting` entegrasyon noktası |

---

## 💡 AI Öneri

> **1. `DisappearTimerSetting` Entegrasyonu:**
> `DisappearTimerSetting.tsx` bileşeni mevcut ama `ChatWindow` başlık çubuğuna henüz eklenmemiş. Chat başlığına küçük bir timer ikonu ile entegre edilebilir.
>
> **2. Scroll-to-Bottom Otomasyonu:**
> `messagesEndRef.current?.scrollIntoView()` mevcut ancak kullanıcı yukarı kaydırdığında otomatik scroll durmalı. `isNearBottom` mantığı eklenebilir.
>
> **3. Yeni Mesaj Bildirimi:**
> Kullanıcı yukarıda gezinirken yeni mesaj gelirse "2 yeni mesaj ↓" gibi bir bildirim balonu gösterilebilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
