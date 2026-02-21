# src/server/routers/appointment.router.ts — Randevu Sistemi Router
## Amacı
Müşterilerin randevu alması, randevu listeleme ve durum güncelleme süreçlerini yönetir.

## Endpointler
- create: Yeni bir randevu talebi oluşturur.
- list: Mevcut kullanıcının randevularını listeler.
- updateStatus: Randevu durumunu (pending, confirmed, completed) günceller.

## Eksikler
- Bildirim Sistemi: Randevu durum değişikliklerinde karşı tarafa bildirim gönderen kodlar TODO olarak bırakılmış.
