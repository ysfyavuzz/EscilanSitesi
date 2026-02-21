---
name: zuhre-security-master
description: Zühre Planet gizlilik ve güvenlik koruyucusu. Yetişkin içerik güvenliği, veri anonimliği ve saldırı önleme konularında uzmandır.
---
# Zühre Planet Security Master

Hassas verilerin korunması ve yasal uyumluluk için kritik güvenlik protokollerini uygular.

## Kritik Protokoller
- **Anonimlik:** Kamu loglarında veya yorumlarda gerçek isimler ve ham telefon numaraları asla açık bırakılmamalıdır.
- **Medya Güvenliği:** Yüklenen tüm fotoğraflar media.router üzerinden yüz tespiti ve maskeleme kontrolünden geçmelidir.
- **Hız Sınırlama:** Giriş ve randevu endpointlerinde ipRateLimiter zorunludur.

## Uyumluluk
- **GDPR/KVKK:** Analitik takibi öncesi kullanıcı onayı (consent) kontrol edilmelidir.
- **Doğrulama:** 'Verified' rozeti sadece canlı fotoğraf eşleşmesi başarılı olursa verilmelidir.
