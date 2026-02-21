# src/types/role.ts — Rol ve Yetkilendirme Sistemi
## Amacı
Uygulama genelindeki erişim seviyelerini, üyelik katmanlarını ve hangi kullanıcının hangi içeriğe ne kadar erişebileceğini tanımlar.

## Roller ve Yetkiler
- **guest:** Sadece profil görebilir, iletişim bilgilerini göremez.
- **customer:** İlan görebilir, favorileyebilir, randevu alabilir.
- **escort:** Kendi profilini yönetebilir, randevuları yönetebilir.
- **admin:** Tüm sisteme, onay süreçlerine ve istatistiklere tam erişim.

## Üyelik Limitleri (View Limits)
| Rol | Fotoğraf Limiti | Video Limiti | İletişim Bilgisi |
|-----|----------------|--------------|------------------|
| Misafir | 3 | 0 | Hayır |
| Standart | 6 | 1 | Evet |
| Premium | 12 | 3 | Evet |
| VIP | Sınırsız | Sınırsız | Evet |

## Teknik Fonksiyonlar
- getAccessLevelForRoute: Verilen URL yoluna göre hangi yetkinin gerektiğini belirler (Route Guard).
- getViewLimitsForUser: Kullanıcının üyelik durumuna göre içerik limitlerini döner.
