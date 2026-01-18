# Database Seeding

Bu klasör, veritabanını demo ve test verileri ile doldurmak için kullanılan seed dosyalarını içerir.

## 📁 Dosya Yapısı

```
drizzle/seed/
├── demo-data.ts     # Demo/test veri seeder
└── README.md        # Bu dosya
```

## 🚀 Kullanım

### Demo Verileri Yükleme

```bash
# Veritabanını demo verilerle doldur
npm run db:seed
```

⚠️ **Uyarı:** Bu komut mevcut verileri temizler ve demo verilerle değiştirir!

### Güvenli Yükleme

Production ortamında çalıştırmadan önce:

```bash
# Önce veritabanını yedekle
cp local.db local.db.backup

# Sonra seed çalıştır
npm run db:seed
```

## 📊 Demo Veri Seti

### Kullanıcılar (6 adet)

| Rol    | Email                     | Display Name      |
|--------|---------------------------|-------------------|
| admin  | admin@escortplatform.com  | Platform Admin    |
| client | client1@example.com       | Ahmet Yılmaz      |
| client | client2@example.com       | Mehmet Demir      |
| escort | escort1@example.com       | Ayşe              |
| escort | escort2@example.com       | Elif              |
| escort | escort3@example.com       | Zeynep            |

### Escort Profilleri (3 adet)

1. **Ayşe - Profesyonel Masaj**
   - Şehir: Istanbul / Beşiktaş
   - Ücret: 500 TL/saat
   - VIP: Evet
   - Doğrulanmış: Evet

2. **Elif - VIP Hizmet**
   - Şehir: Istanbul / Kadıköy
   - Ücret: 750 TL/saat
   - VIP: Evet
   - Doğrulanmış: Evet

3. **Zeynep - Klasik Masaj**
   - Şehir: Ankara / Çankaya
   - Ücret: 400 TL/saat
   - VIP: Hayır
   - Doğrulanmış: Evet

### Diğer Veriler

- **Fotoğraflar:** 5 adet profil fotoğrafı
- **Konuşma:** 1 adet örnek mesajlaşma (3 mesaj)
- **Randevu:** 1 adet onaylanmış randevu
- **Favoriler:** 2 adet favori kaydı

## 🔧 Kendi Seed Verilerinizi Ekleme

Yeni seed verileri eklemek için:

1. `demo-data.ts` dosyasını açın
2. İlgili array'e yeni veri ekleyin:

```typescript
const demoUsers = [
  // Mevcut kullanıcılar...
  {
    openId: 'new-user-001',
    role: 'client',
    email: 'newuser@example.com',
    displayName: 'Yeni Kullanıcı',
  },
];
```

3. Seed'i çalıştırın:
```bash
npm run db:seed
```

## 🎯 Kullanım Senaryoları

### Development Ortamı
```bash
# Temiz bir başlangıç için
npm run db:reset    # Veritabanını sıfırla
npm run db:seed     # Demo verileri yükle
```

### Test Ortamı
```bash
# Her test öncesi temiz veri
npm run db:seed
```

### Demo/Staging
```bash
# Realistic demo verisi için
npm run db:seed
```

## ⚠️ Önemli Notlar

1. **Production'da Kullanmayın:** Bu veriler sadece development/test içindir
2. **Veri Kaybı:** Seed çalıştırıldığında mevcut veriler silinir
3. **ID'ler:** Seed verileri sabit ID'ler kullanır (1, 2, 3...)
4. **Şifreler:** Demo kullanıcıların şifreleri bulunmamaktadır (OAuth kullanılıyor)

## 📖 Kaynaklar

- [Drizzle ORM Seeding](https://orm.drizzle.team/docs/seeding)
- [SQLite Testing Best Practices](https://www.sqlite.org/testing.html)
