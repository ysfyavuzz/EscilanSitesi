# Proje Altyapı ve Kurulum Rehberi (Foundation)
## Amacı
Bu bölüm, projenin kurulumu, bağımlılıkları ve çalışma ortamı (Docker, Vite, tRPC) ile ilgili temel yapılandırma dosyalarını içerir.

## Kritik Dosyalar
1. **package.json:** Proje scriptleri ve kütüphaneler.
2. **docker-compose.yml:** Çoklu konteyner (DB, API, Nginx) yönetimi.
3. **vite.config.ts:** Frontend build ve proxy ayarları.
4. **drizzle.config.ts:** Veritabanı şema ve migration yönetimi.

## Kurulum Adımları
1. .env.example dosyasını .env olarak kopyalayın.
2. 
pm install ile bağımlılıkları yükleyin.
3. docker-compose up -d ile altyapıyı ayağa kaldırın.
4. 
pm run db:migrate ile tabloları oluşturun.
