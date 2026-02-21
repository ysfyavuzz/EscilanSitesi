# `src/components/VideoCall.tsx` — Video Arama Arayüzü

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/components/VideoCall.tsx` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React, WebRTC (`MediaStream`), `framer-motion`, `date-fns/tr`, Lucide Icons |
| **Kullanıldığı Yer** | `pages/VideoCallPage.tsx` |
| **Durum** | ✅ Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

İki kullanıcı arasındaki gerçek zamanlı görüntülü/sesli arama arayüzüdür. WebRTC `MediaStream` API'yi tam olarak bütünleştirir.

---

## 📦 Dışa Aktarılan Bileşenler

| Bileşen | Amaç |
|---------|------|
| `VideoCall` (default) | Ana arama ekranı |
| `IncomingCallModal` | Gelen arama bildirimi (30 sn sonra otomatik reddeder) |
| `OutgoingCallModal` | Giden arama "Aranıyor..." ekranı |

---

## 📦 Dışa Aktarılan Tipler

```ts
export type ConnectionQuality = 'excellent' | 'good' | 'fair' | 'poor';
export type CallStatus = 'connecting' | 'connected' | 'reconnecting' | 'ended' | 'failed';
export interface CallParticipant { id, name, avatar?, role?, isMuted?, isVideoOff?, connectionQuality? }
export interface VideoCallProps { callId, localStream?, remoteStream?, participant, callStatus?, ... }
```

---

## 🖥️ VideoCall Arayüz Bölümleri

| Bölüm | İçerik |
|-------|--------|
| **Başlık Çubuğu** | Durum rozeti, kayıt göstergesi, katılımcı adı, arama süresi, bağlantı kalitesi |
| **Ana Video** | Remote stream (tam ekran) veya katılımcı avatarı (bağlantı yok iken) |
| **Küçük Pencere** | Local stream sağ alt köşede (PiP önizleme) |
| **Alt Kontrol** | Mikrofon, kamera, ekran paylaşımı, arama bitir, ses seviyesi |
| **Topi Eylem** | Bağlantı kopyala, PiP modu, tam ekran, sohbet, ayarlar |

---

## 🔧 Özellikler

- **Gerçek WebRTC:** `localVideoRef/remoteVideoRef.srcObject = stream` ile stream doğrudan `<video>` elementine bağlanır
- **Canlı Arama Süresi:** `setInterval` ile her saniye güncellenir
- **Bağlantı Kalitesi:** 4 seviye (excellent/good/fair/poor), renk kodlu ikon
- **Tam Ekran:** `requestFullscreen()` + `exitFullscreen()` API
- **PiP:** `requestPictureInPicture()` API — browser desteğine göre çalışır
- **Otomatik Ret:** `IncomingCallModal` 30 saniye sonra `onReject()` çağırır

---

## ⚠️ Dikkat Edilmesi Gerekenler

- **WebRTC Sinyalizasyon (Signaling) Yok:** Bu bileşen yalnızca görsel UI'dir. WebSocket signaling (ICE candidate, SDP offer/answer) exchange'i parent bileşende veya ayrı bir serviste yapılmalıdır.
- **Kayıt (isRecording):** Badge olarak gösteriliyor ama gerçek kayıt mantığı bu bileşende yok.

---

## 💡 AI Öneri

> **1. WebRTC Signaling Entegrasyonu:**
> `simple-peer` veya `peerjs` kütüphanesi ile WebRTC bağlantısı kolaylaştırılabilir. Signaling için mevcut tRPC WebSocket altyapısı kullanılabilir.
>
> **2. Ağ Kalitesi Ölçümü:**
> `RTCPeerConnection.getStats()` API'si ile gerçek bağlantı kalitesi (`connectionQuality`) ölçülebilir — şu an prop olarak dışarıdan geliyor.
>
> **3. TURN Sunucu Konfigürasyonu:**
> Türkiye'deki kullanıcılar için bir TURN sunucu (Coturn) VPS'e kurularak NAT arkasındaki bağlantılar iyileştirilebilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
