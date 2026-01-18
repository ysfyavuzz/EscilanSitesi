# Database Migrations

Bu klasör, veritabanı şema değişikliklerini yöneten SQL migration dosyalarını içerir.

## 📁 Dosya Yapısı

```
drizzle/migrations/
├── 0001_initial_schema.sql    # İlk şema (tüm tablolar)
├── 0002_add_indexes.sql        # Performance indexleri
└── README.md                    # Bu dosya
```

## 🚀 Kullanım

### Migration Çalıştırma

```bash
# Tüm migration'ları çalıştır
npm run db:migrate

# Veritabanını sıfırla ve yeniden oluştur
npm run db:reset
```

### Migration Oluşturma

Yeni bir migration oluşturmak için:

1. Sıradaki numarayı kullanarak yeni bir SQL dosyası oluştur:
   ```
   000X_description.sql
   ```

2. Migration SQL'ini yaz:
   ```sql
   -- Description of changes
   CREATE TABLE IF NOT EXISTS new_table (...);
   ALTER TABLE existing_table ADD COLUMN new_column TEXT;
   ```

3. Migration'ı test et:
   ```bash
   npm run db:migrate
   ```

## 📋 Migration Listesi

### 0001_initial_schema.sql
**Tarih:** 2026-01-18  
**Açıklama:** İlk veritabanı şeması oluşturulması

**Tablolar:**
- `users` - Kullanıcı hesapları
- `escort_profiles` - Escort profil bilgileri
- `escort_photos` - Profil fotoğrafları
- `conversations` - Mesajlaşma konuşmaları
- `messages` - Bireysel mesajlar
- `bookings` - Randevu rezervasyonları
- `reviews` - Müşteri değerlendirmeleri
- `favorites` - Favori listesi
- `transactions` - Kredi/ödeme işlemleri
- `notifications` - Bildirimler
- `vip_memberships` - VIP üyelik takibi

### 0002_add_indexes.sql
**Tarih:** 2026-01-18  
**Açıklama:** Sık sorgulanan kolonlar için performance indexleri

**Index Kategorileri:**
- Primary lookups (open_id, email, user_id)
- Search filters (city, district, status)
- Sorting (created_at, updated_at, rating)
- Joins (foreign keys)

## ⚠️ Önemli Notlar

1. **Migration Sırası:** Migration'lar dosya adındaki numaraya göre sırayla çalıştırılır
2. **Geri Alınamaz:** SQLite sınırlamaları nedeniyle bazı değişiklikler geri alınamaz
3. **Test:** Yeni migration'ları önce development ortamında test edin
4. **Yedek:** Production'da çalıştırmadan önce veritabanını yedekleyin

## 🔧 Migration Script

Migration script (`scripts/migrate.ts`) şu işlevleri sunar:

- `npm run db:migrate` - Bekleyen migration'ları çalıştır
- `npm run db:seed` - Demo/test verilerini ekle
- `npm run db:reset` - Veritabanını sıfırla ve yeniden oluştur

## 📖 Kaynaklar

- [Drizzle ORM Migrations](https://orm.drizzle.team/docs/migrations)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
