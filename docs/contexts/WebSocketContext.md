# src/contexts/WebSocketContext.tsx — Gerçek Zamanlı İletişim Bağlamı
## Amacı
Uygulama genelinde WebSocket bağlantısını yönetir, mesaj gönderimini ve anlık olayları (yazıyor, çevrimiçi vb.) bileşenlere sağlar.

## Temel Özellikler
- **Bağlantı Yönetimi:** Otomatik yeniden bağlanma (reconnect) ve Heartbeat (30sn) mekanizması.
- **Mesaj Kuyruğu:** Bağlantı yokken gönderilen mesajları saklar ve bağlantı geldiğinde iletir.
- **Anlık Göstergeler:** Yazıyor (typing) ve Okundu (read) bilgilerini senkronize eder.

## AI Tavsiyeleri
- loadConversation fonksiyonu şu an sadece yerel filtreleme yapıyor, veritabanından geçmiş mesajları çekmek için tRPC entegrasyonu tamamlanmalı.
