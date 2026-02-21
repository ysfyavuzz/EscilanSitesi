# src/types/message.ts — Mesajlaşma Sistemi Tipleri
## Amacı
Platform içi gerçek zamanlı mesajlaşma (Chat) sisteminin veri modellerini ve olay tiplerini tanımlar.

## Temel Tipler
- MessageType: text, image, video, audio, location, file, system.
- MessageStatus: sending, sent, delivered, read, failed.
- Message: Mesajın tüm detaylarını (gönderen, içerik, medya, konum, tepkiler) içeren ana interface.
- Conversation: Sohbet odası meta verileri (katılımcılar, okunmamış sayısı, pin/arşiv durumu).

## Kritik Sabitler (Constants)
- MESSAGE_LIMITS: Maksimum karakter (4000), dosya boyutu (10MB image, 100MB video) sınırları.
- QUICK_REPLIES: "Merhaba, nasılsınız?", "Uygun musunuz?" gibi hızlı yanıt önerileri.

## AI Tavsiyeleri
- Mesaj raporlama (MessageReport) sistemi için dmin.router ile entegre bir moderasyon kuyruğu oluşturulmalı.
