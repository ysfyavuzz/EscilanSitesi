# src/contexts/NotificationContext.tsx — Bildirim Yönetim Bağlamı
## Amacı
Kullanıcıya gösterilen anlık uyarıları (Toast), bildirim merkezini ve tarayıcı tabanlı (Push) bildirimleri yönetir.

## Temel Özellikler
- **Toast Sistemi:** Bildirim önceliğine göre (low, normal, high, urgent) farklı sürelerde ekranda kalan uyarılar.
- **Sessiz Saatler:** Kullanıcının belirttiği saat aralıklarında acil olmayan bildirimleri durdurur.
- **Web Push:** Tarayıcı izinlerini yönetir ve uygulama kapalıyken bile bildirim gönderilmesini sağlar.

## Teknik Notlar
- useNotify hook'u ile bileşenlerden 
otify.success(), 
otify.error() gibi kolay çağrılar yapılabilir.
