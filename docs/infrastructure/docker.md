# Docker ve Konteyner Yapısı (docker-compose.yml)
## Servisler
- **db (PostgreSQL 15):** Alpine tabanlı hafif veritabanı imajı. Veriler postgres_data volume'ünde saklanır.
- **api (Node.js):** Backend servisi. Dockerfile üzerinden build edilir.
- **nginx (Reverse Proxy):** Dış dünyadan gelen 80/443 isteklerini API ve statik dosyalara (dist) yönlendirir. SSL sertifikaları için Certbot entegrasyonuna hazırdır.

## Ağ Yapısı (Network)
Tüm servisler zuhre_network adındaki izole bir ağ üzerinden birbiriyle konuşur.
