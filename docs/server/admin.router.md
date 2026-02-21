# src/server/routers/admin.router.ts — Platform Yönetim Paneli Router
## Amacı
Platform istatistiklerini görmek, kullanıcıları listelemek ve ilan onay/red işlemlerini yönetmek için kullanılır.

## Endpointler
- getPlatformStats: Toplam kullanıcı, ilan ve gelir istatistiklerini döner.
- getUsers: Tüm kullanıcıları sayfalama ve arama ile listeler.
- getListings: Escort profillerini (ilanları) onay durumuna göre listeler.
- approveListing / rejectListing: İlanları onaylar veya reddeder.

## Kritik Sorunlar (BUGS)
- Hardcoded Veri: totalRevenue, monthlyRevenue gibi finansal veriler sabit (mock) değerler döner.
- Eksik Fonksiyon: banUser mutasyonu veri tabanında hiçbir işlem yapmaz.
