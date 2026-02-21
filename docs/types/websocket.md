# src/types/websocket.ts — WebSocket İletişim Tipleri
## Amacı
Sunucu ve istemci arasındaki gerçek zamanlı (Real-time) iletişimin protokollerini ve bağlantı yönetimini tanımlar.

## Temel Tipler
- WebSocketEventType: message, typing, read, presence, online, offline vb. olay tipleri.
- WebSocketEvent: Tüm WS paketlerinin taşıdığı ana yapı.
- ConnectionStatus: connecting, connected, disconnected, reconnecting, error.
- WebSocketConfig: Bağlantı hızı, otomatik yeniden bağlanma (reconnect) ve heartbeat ayarları.

## Teknik Detaylar
- Heartbeat: Bağlantının kopup kopmadığını kontrol eden sinyal mekanizması.
- ReconnectionStrategy: Bağlantı koptuğunda 'exponential' (katlanarak artan gecikme) veya 'fixed' stratejileri ile yeniden deneme mantığı.
