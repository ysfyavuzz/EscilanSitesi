# src/types/admin.ts — Yönetim Paneli (Admin) Tipleri
## Amacı
Platformun "God Mode" dashboard'u için gerekli tüm istatistik, log, içerik yönetimi ve sistem ayarları modellerini tanımlar.

## Temel Modüller
- **PlatformStats:** Anlık kullanıcı, ilan, şikayet ve finansal (Revenue) veriler.
- **AuditLog:** Sistemdeki her kritik işlemin (Onay, Red, Ban, Login) izlenebilirliği.
- **SiteSettings:** Sitenin renkleri, logo URL'leri, komisyon oranları ve özellik kısıtlamaları.
- **CMS:** Dinamik sayfalar (Pages) ve navigasyon menüsü yönetimi.

## AI Tavsiyeleri
- AuditLog kayıtları, IP adresi ve UserAgent bilgilerini mutlaka içermelidir (Güvenlik takibi için).
