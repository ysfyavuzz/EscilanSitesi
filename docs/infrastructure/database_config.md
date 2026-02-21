# Veritabanı Yönetimi (Drizzle & TSX)
## Yapılandırma
drizzle.config.ts dosyası, şemaların src/drizzle/schema.ts altında olduğunu ve migration dosyalarının drizzle/migrations klasörüne çıkarılacağını belirtir.

## Komutlar
- 
pm run db:migrate: Şemadaki değişiklikleri veritabanına uygular.
- 
pm run db:seed: Test verilerini yükler.
- 
pm run db:reset: Veritabanını siler ve yeniden oluşturur.
