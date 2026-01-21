# Sayfa Rehberi - Escort İlan Platformu

Bu dokümantasyon, platformdaki tüm sayfaların kapsamlı bir rehberini içerir.

## 📑 İçindekiler

- [Sayfa Kategorileri](#sayfa-kategorileri)
- [Genel Sayfalar](#genel-sayfalar)
- [Kimlik Doğrulama Sayfaları](#kimlik-doğrulama-sayfaları)
- [Escort Paneli](#escort-paneli)
- [Müşteri Paneli](#müşteri-paneli)
- [Admin Paneli](#admin-paneli)
- [Yasal Sayfalar](#yasal-sayfalar)
- [Navigasyon Akışı](#navigasyon-akışı)
- [Rol Bazlı Erişim](#rol-bazlı-erişim)

## 🗂️ Sayfa Kategorileri

### Kategori Özeti

| Kategori | Sayfa Sayısı | Erişim |
|----------|--------------|--------|
| Genel Sayfalar | 15 | Herkes |
| Kimlik Doğrulama | 5 | Misafir kullanıcılar |
| Escort Paneli | 8 | Kayıtlı Escort'lar |
| Müşteri Paneli | 8 | Kayıtlı Müşteriler |
| Admin Paneli | 5 | Sadece Admin |
| Yasal Sayfalar | 5 | Herkes |
| **TOPLAM** | **46** | - |

## 🌐 Genel Sayfalar

Kimlik doğrulama gerektirmeyen ve herkesin erişebileceği sayfalar.

### 1. Ana Sayfa (`Home.tsx`)

**Route:** `/`

**Özellikler:**
- Platform tanıtımı ve hero section
- Öne çıkan VIP escort'lar showcase
- Şehirlere göre hızlı erişim
- Popüler kategoriler
- İstatistikler (toplam escort, şehir sayısı vb.)
- CTA (Call-to-Action) butonları

**Erişim:** Herkes

**Navigasyon:**
- Header menüsünden her zaman erişilebilir
- Platform logosu tıklandığında ana sayfaya dönüş

---

### 2. Katalog (`Catalog.tsx`)

**Route:** `/catalog`

**Özellikler:**
- Tüm escort ilanlarını görüntüleme
- Gelişmiş filtreleme sistemi:
  - Şehir ve ilçe
  - Yaş aralığı
  - Fiyat aralığı
  - Fiziksel özellikler
  - Hizmet türleri
  - VIP/Premium durum
- Sıralama seçenekleri (fiyat, popülerlik, yeni)
- Grid/Liste görünüm değiştirme
- Sayfalama

**Erişim:** Herkes

**Navigasyon:**
- Ana menüden "Katalog" veya "İlanlar"
- Ana sayfadaki "Tüm İlanları Gör" butonu

---

### 3. Misafir Katalog (`GuestCatalog.tsx`)

**Route:** `/guest-catalog`

**Özellikler:**
- Sınırlı bilgi gösterimi
- Bulanık profil fotoğrafları
- Üye olmadan önizleme
- Kayıt ol teşvikleri
- Temel filtreleme

**Erişim:** Giriş yapmamış kullanıcılar

**Navigasyon:**
- Giriş yapmamış kullanıcılar katalog sayfasına yönlendirildiğinde

---

### 4. Escort Listesi (`EscortList.tsx`)

**Route:** `/escorts`

**Özellikler:**
- Basit escort listesi
- Minimal filtreleme
- Hızlı tarama için optimize
- Kart görünümü

**Erişim:** Herkes

**Navigasyon:**
- Ana menüden "Escort'lar"

---

### 5. Escort Profil Detay (`EscortProfile.tsx`)

**Route:** `/escort/:id`

**Özellikler:**
- Detaylı profil bilgileri
- Fotoğraf galerisi (genişletilebilir)
- Video galerisi (varsa)
- Hizmet listesi ve fiyatlar
- Çalışma saatleri ve müsaitlik
- Değerlendirmeler ve yorumlar
- İstatistikler (görüntüleme, rezervasyon sayısı)
- Rezervasyon yapma butonu
- Favorilere ekleme
- Mesaj gönderme
- Rapor etme

**Erişim:** Herkes (bazı özellikler için giriş gerekli)

**Navigasyon:**
- Katalogdan escort kartına tıklama
- URL ile direkt erişim

---

### 6. Fiyatlandırma (`Pricing.tsx`)

**Route:** `/pricing`, `/vip`

**Özellikler:**
- Üyelik paketleri (Free, Premium, VIP)
- Paket karşılaştırma tablosu
- Özellik listesi
- Fiyatlar ve ödeme seçenekleri
- Üyelik yükseltme CTA
- SSS (Sık Sorulan Sorular)

**Erişim:** Herkes

**Navigasyon:**
- Header menüsünden "Fiyatlandırma"
- Dashboard'dan "Üyeliği Yükselt"

---

### 7. Üyelik Yükseltme (`MembershipUpgrade.tsx`)

**Route:** `/upgrade`

**Özellikler:**
- Paket seçimi
- Ödeme bilgileri formu
- Güvenli ödeme işlemi
- Başarı/Hata sayfası yönlendirmesi

**Erişim:** Kayıtlı kullanıcılar

**Navigasyon:**
- Fiyatlandırma sayfasından
- Dashboard'dan "Yükselt" butonu

---

### 8. İletişim (`Contact.tsx`)

**Route:** `/contact`

**Özellikler:**
- İletişim formu
- E-posta, telefon bilgileri
- Adres bilgisi
- Sosyal medya linkleri
- Harita entegrasyonu (opsiyonel)

**Erişim:** Herkes

**Navigasyon:**
- Footer'dan "İletişim"
- Header menüsünden

---

### 9. Blog (`Blog.tsx`)

**Route:** `/blog`

**Özellikler:**
- Blog yazıları listesi
- Kategori filtreleme
- Arama fonksiyonu
- Popüler yazılar
- Son yazılar

**Erişim:** Herkes

**Navigasyon:**
- Header menüsünden "Blog"
- Footer'dan

---

### 10. Rapor/Şikayet (`Report.tsx`)

**Route:** `/report`

**Özellikler:**
- Şikayet formu
- Şikayet kategorileri
- Kanıt yükleme (screenshot vb.)
- Anonim raporlama seçeneği
- Form doğrulama

**Erişim:** Kayıtlı kullanıcılar

**Navigasyon:**
- Escort profil sayfasından "Rapor Et"
- Footer'dan "Şikayet"

---

### 11. Doğrulama Merkezi (`VerificationCenter.tsx`)

**Route:** `/verification`

**Özellikler:**
- Kimlik doğrulama süreç bilgisi
- Belge yükleme
- Doğrulama durumu takibi
- Admin onay süreci

**Erişim:** Kayıtlı Escort'lar

**Navigasyon:**
- Escort dashboard'dan
- Profil düzenleme sayfasından

---

### 12. Ödeme Sonucu (`PaymentResult.tsx`)

**Route:** `/payment-result`

**Özellikler:**
- Başarılı/başarısız ödeme mesajı
- Sipariş özeti
- Fatura indirme
- Yönlendirme linkleri

**Erişim:** Ödeme yapan kullanıcılar (session)

**Navigasyon:**
- Ödeme gateway'den otomatik yönlendirme

---

### 13. Analytics (`Analytics.tsx`)

**Route:** `/analytics`

**Özellikler:**
- Platform istatistikleri
- Grafikler ve chartlar
- Trend analizleri
- Demografik bilgiler

**Erişim:** Admin veya VIP kullanıcılar

**Navigasyon:**
- Dashboard menüsünden

---

### 14. Değerlendirmeler (`Reviews.tsx`)

**Route:** `/reviews`

**Özellikler:**
- Tüm platformdaki değerlendirmeler
- Filtreleme (puan, tarih)
- Doğrulanmış değerlendirmeler
- Escort cevapları

**Erişim:** Herkes

**Navigasyon:**
- Header menüsünden
- Escort profil sayfasından

---

### 15. SEO Sayfası (`SEO.tsx`)

**Route:** `/seo`

**Özellikler:**
- SEO ayarları (Admin)
- Meta tag yönetimi
- Sitemap bilgileri

**Erişim:** Admin

**Navigasyon:**
- Admin panelinden

---

## 🔐 Kimlik Doğrulama Sayfaları

Giriş yapmamış kullanıcılar için erişilebilir.

### 1. Müşteri Girişi (`ClientLogin.tsx`)

**Route:** `/login`, `/login-client`, `/login-customer`

**Özellikler:**
- E-posta/kullanıcı adı girişi
- Şifre girişi
- "Beni Hatırla" seçeneği
- Şifremi Unuttum linki
- Kayıt ol yönlendirmesi
- Sosyal medya girişi (opsiyonel)

**Erişim:** Giriş yapmamış kullanıcılar

**Navigasyon:**
- Header'dan "Giriş Yap"
- Korumalı sayfalara erişim denemesinde otomatik yönlendirme

---

### 2. Müşteri Kaydı (`ClientRegister.tsx`)

**Route:** `/register`, `/register-client`, `/signup`

**Özellikler:**
- Kayıt formu (e-posta, şifre, ad-soyad)
- Şifre güçlülük göstergesi
- Kullanım koşulları onayı
- KVKK onayı
- E-posta doğrulama
- Captcha (bot koruması)

**Erişim:** Giriş yapmamış kullanıcılar

**Navigasyon:**
- Header'dan "Kayıt Ol"
- Login sayfasından "Hesabın yok mu? Kayıt ol"

---

### 3. Escort Girişi (`EscortLogin.tsx`)

**Route:** `/login-escort`

**Özellikler:**
- E-posta/kullanıcı adı girişi
- Şifre girişi
- Escort'a özel giriş ekranı
- Özel karşılama mesajı

**Erişim:** Giriş yapmamış escort'lar

**Navigasyon:**
- Ana sayfadan "Escort Girişi"
- `/login` sayfasından rol seçimi

---

### 4. Escort Kaydı (`EscortRegister.tsx`)

**Route:** `/register-escort`

**Özellikler:**
- Kapsamlı kayıt formu
- Profil fotoğrafı yükleme
- Fiziksel özellikler
- Hizmet seçimi
- Çalışma bölgesi seçimi
- Kimlik doğrulama başlatma
- Admin onayı bekleme süreci

**Erişim:** Giriş yapmamış escort'lar

**Navigasyon:**
- Ana sayfadan "Escort Ol"
- Header'dan "Escort Kaydı"

---

### 5. Genel Login (`Login.tsx`)

**Route:** `/login` (eğer rol seçimi yapılmadıysa)

**Özellikler:**
- Rol seçimi (Müşteri/Escort)
- İlgili login sayfasına yönlendirme

**Erişim:** Giriş yapmamış kullanıcılar

---

## 👗 Escort Paneli

Kayıtlı escort kullanıcılar için.

### 1. Escort Dashboard (`EscortDashboard.tsx`)

**Route:** `/escort/dashboard`

**Özellikler:**
- Günlük özet (görüntülenme, mesaj, randevu)
- Bekleyen randevular
- Yeni mesajlar
- Son kazançlar
- Profil tamamlama durumu
- Hızlı işlem butonları
- Bildirimler

**Erişim:** Sadece Escort'lar

**Navigasyon:**
- Login sonrası otomatik yönlendirme
- Header'dan "Dashboard"

---

### 2. Escort Özel Panel (`EscortPrivateDashboard.tsx`)

**Route:** `/escort/dashboard/private`

**Özellikler:**
- Gizli notlar
- Müşteri notları
- Blacklist yönetimi
- Özel ayarlar

**Erişim:** Sadece Escort'lar

**Navigasyon:**
- Dashboard sidebar'dan "Özel Panel"

---

### 3. Escort Analytics Dashboard (`EscortAnalyticsDashboard.tsx`)

**Route:** `/escort/dashboard/analytics`

**Özellikler:**
- Detaylı istatistikler
- Grafikler (görüntüleme, rezervasyon trendi)
- Gelir raporları
- En çok görüntülenen saatler
- Coğrafi dağılım

**Erişim:** Premium/VIP Escort'lar

**Navigasyon:**
- Dashboard sidebar'dan "Analytics"

---

### 4. Escort Market (`EscortMarket.tsx`)

**Route:** `/escort/market`

**Özellikler:**
- Öne çıkarma satın alma
- VIP/Premium paket yükseltme
- Reklam satın alma
- Ek özellikler satın alma

**Erişim:** Sadece Escort'lar

**Navigasyon:**
- Dashboard sidebar'dan "Market"

---

### 5. Profil Düzenleme (`ProfileEdit.tsx`)

**Route:** `/escort/profile/edit`

**Özellikler:**
- Tüm profil bilgilerini düzenleme
- Fiziksel özellikler güncelleme
- Hizmet ekleme/çıkarma
- Fiyat güncelleme
- Çalışma saatleri ayarlama
- "Hakkımda" metni düzenleme
- Önizleme modu
- Kaydet/İptal butonları

**Erişim:** Sadece Escort'lar

**Navigasyon:**
- Dashboard'dan "Profili Düzenle"
- Profil önizlemesinden "Düzenle"

---

### 6. Fotoğraf Yöneticisi (`PhotoManager.tsx`)

**Route:** `/escort/photos`

**Özellikler:**
- Fotoğraf yükleme (drag & drop)
- Fotoğraf silme
- Ana profil fotoğrafı seçme
- Fotoğraf sıralama (drag & drop)
- Fotoğraf kırpma/düzenleme
- Onay bekleyen fotoğraflar
- Reddedilen fotoğraflar ve sebepleri

**Erişim:** Sadece Escort'lar

**Navigasyon:**
- Dashboard sidebar'dan "Fotoğraflar"
- Profil düzenleme sayfasından

---

### 7. Takvim Yöneticisi (`CalendarManager.tsx`)

**Route:** `/escort/calendar`

**Özellikler:**
- Aylık/haftalık takvim görünümü
- Müsaitlik ayarlama
- Rezervasyonları görüntüleme
- Randevu onaylama/reddetme
- Tatil günleri belirleme
- Çalışma saatleri düzenleme
- Bloklanan zamanlar
- Renkli gösterimler (onaylı, bekliyor, bloklu)

**Erişim:** Sadece Escort'lar

**Navigasyon:**
- Dashboard sidebar'dan "Takvim"

---

### 8. Kazanç Raporları (`EarningsReport.tsx`)

**Route:** `/escort/earnings`

**Özellikler:**
- Günlük/haftalık/aylık kazanç raporları
- Grafik gösterimleri
- Tamamlanan randevular
- Toplam kazanç
- Komisyon detayları
- Bekleyen ödemeler
- Ödeme geçmişi
- Rapor indirme (PDF/Excel)
- Vergi beyanı bilgileri

**Erişim:** Sadece Escort'lar

**Navigasyon:**
- Dashboard sidebar'dan "Kazançlar"

---

## 👤 Müşteri Paneli

Kayıtlı müşteri kullanıcılar için.

### 1. Müşteri Dashboard (`CustomerDashboard.tsx`)

**Route:** `/customer/dashboard`

**Özellikler:**
- Hoş geldiniz mesajı
- Önerilen escort'lar
- Geçmiş randevular özeti
- Favoriler hızlı erişim
- Yeni mesajlar
- Bildirimler
- Cüzdan bakiyesi

**Erişim:** Sadece Müşteriler

**Navigasyon:**
- Login sonrası yönlendirme
- Header'dan "Dashboard"

---

### 2. Favorilerim (`MyFavorites.tsx`)

**Route:** `/favorites`

**Özellikler:**
- Favori escort listesi
- Grid/liste görünüm
- Favoriden çıkarma
- Hızlı mesaj gönderme
- Hızlı rezervasyon
- Sıralama

**Erişim:** Sadece Müşteriler

**Navigasyon:**
- Dashboard sidebar'dan "Favoriler"
- Header'dan kalp ikonu

---

### 3. Randevularım (`MyAppointments.tsx`)

**Route:** `/appointments`

**Özellikler:**
- Yaklaşan randevular
- Geçmiş randevular
- İptal edilen randevular
- Randevu detayları
- Randevu iptali
- Değerlendirme yapma
- Tekrar rezervasyon

**Erişim:** Sadece Müşteriler

**Navigasyon:**
- Dashboard sidebar'dan "Randevular"

---

### 4. Mesajlar (`Messages.tsx`)

**Route:** `/messages`

**Özellikler:**
- Konuşma listesi
- Mesaj arama
- Yeni konuşma başlatma
- Mesaj gönderme/alma
- Okundu bilgisi
- Fotoğraf/dosya gönderme
- Arşiv

**Erişim:** Kayıtlı Kullanıcılar

**Navigasyon:**
- Header'dan mesaj ikonu
- Dashboard'dan "Mesajlar"

---

### 5. Bildirimler (`Notifications.tsx`)

**Route:** `/customer/notifications`

**Özellikler:**
- Tüm bildirimler listesi
- Filtreleme (okundu/okunmadı, tip)
- Bildirim ayarları linki
- Toplu okundu işaretleme
- Silme

**Erişim:** Sadece Müşteriler

**Navigasyon:**
- Dashboard sidebar'dan "Bildirimler"
- Header'dan bildirim ikonu

---

### 6. Randevu Geçmişi (`History.tsx`)

**Route:** `/customer/history`

**Özellikler:**
- Tüm geçmiş randevular
- Detaylı arama ve filtreleme
- Toplam harcama
- İstatistikler
- Fatura indirme
- Değerlendirme yapma/düzenleme

**Erişim:** Sadece Müşteriler

**Navigasyon:**
- Dashboard sidebar'dan "Geçmiş"

---

### 7. Cüzdan (`Wallet.tsx`)

**Route:** `/customer/wallet`

**Özellikler:**
- Bakiye görüntüleme
- Bakiye yükleme
- İşlem geçmişi
- Ödeme yöntemleri yönetimi
- Otomatik yükleme ayarları
- Fatura indirme

**Erişim:** Sadece Müşteriler

**Navigasyon:**
- Dashboard sidebar'dan "Cüzdan"
- Header'dan bakiye göstergesi

---

### 8. Müşteri Ayarları (`CustomerSettings.tsx`)

**Route:** `/customer/settings`

**Özellikler:**
- Profil bilgileri düzenleme
- Şifre değiştirme
- E-posta değiştirme
- Bildirim tercihleri
- Gizlilik ayarları
- Hesap silme

**Erişim:** Sadece Müşteriler

**Navigasyon:**
- Dashboard sidebar'dan "Ayarlar"
- Header menüsünden

---

## 👨‍💼 Admin Paneli

Sadece admin yetkisine sahip kullanıcılar için.

### 1. Admin Panel (`AdminPanel.tsx`)

**Route:** `/admin`

**Özellikler:**
- Admin dashboard'a yönlendirme
- Admin menü yapısı

**Erişim:** Sadece Admin

**Navigasyon:**
- Admin girişinden sonra

---

### 2. Admin Dashboard (`AdminDashboard.tsx`)

**Route:** `/admin/dashboard`

**Özellikler:**
- Platform özet istatistikleri
- Kullanıcı sayıları (müşteri, escort, toplam)
- Günlük aktif kullanıcılar
- Gelir özeti
- Bekleyen onaylar
- Son kayıtlar
- Sistem durumu
- Hızlı işlemler

**Erişim:** Sadece Admin

**Navigasyon:**
- Admin login sonrası
- Admin sidebar'dan "Dashboard"

---

### 3. Onaylar (`AdminApprovals.tsx`)

**Route:** `/admin/approvals`

**Özellikler:**
- Bekleyen escort onayları
- Fotoğraf onayları
- Video onayları
- Kimlik doğrulama onayları
- Toplu onaylama/reddetme
- Red sebepleri
- Filtreleme (bekliyor, onaylandı, reddedildi)

**Erişim:** Sadece Admin

**Navigasyon:**
- Admin sidebar'dan "Onaylar"

---

### 4. Gerçek Zamanlı İzleme (`AdminRealTimeMonitoring.tsx`)

**Route:** `/admin/monitoring`

**Özellikler:**
- Anlık aktif kullanıcılar
- Canlı işlem akışı
- Sistem performans metrikleri
- Sunucu durumu
- Hata logları
- Gerçek zamanlı grafikler
- Alert sistemi

**Erişim:** Sadece Admin

**Navigasyon:**
- Admin sidebar'dan "Canlı İzleme"

---

### 5. Admin Raporları (`AdminReports.tsx`)

**Route:** `/admin/reports`

**Özellikler:**
- Finansal raporlar
- Kullanıcı raporları
- Randevu raporları
- Şikayet raporları
- Özel rapor oluşturma
- Rapor indirme (PDF/Excel)
- Grafik ve chart gösterimleri
- Tarih aralığı filtreleme

**Erişim:** Sadece Admin

**Navigasyon:**
- Admin sidebar'dan "Raporlar"

---

## 📄 Yasal Sayfalar

Herkesin erişebileceği yasal dokümantasyon sayfaları.

### 1. Kullanım Koşulları (`TermsOfService.tsx`)

**Route:** `/terms`

**Özellikler:**
- Kullanım koşulları metni
- Son güncelleme tarihi
- Yazdırma butonu

**Erişim:** Herkes

**Navigasyon:**
- Footer'dan "Kullanım Koşulları"
- Kayıt formunda link

---

### 2. Gizlilik Politikası (`PrivacyPolicy.tsx`)

**Route:** `/privacy`

**Özellikler:**
- Gizlilik politikası metni
- Veri kullanım bilgileri
- GDPR uyumu
- Son güncelleme tarihi

**Erişim:** Herkes

**Navigasyon:**
- Footer'dan "Gizlilik Politikası"
- Kayıt formunda link

---

### 3. Çerez Politikası (`CookiePolicy.tsx`)

**Route:** `/cookies`

**Özellikler:**
- Çerez kullanım bilgileri
- Çerez türleri
- Çerez yönetimi
- Tarayıcı ayarları

**Erişim:** Herkes

**Navigasyon:**
- Footer'dan "Çerez Politikası"
- Cookie consent banner'dan

---

### 4. KVKK Aydınlatma Metni (`KVKK.tsx`)

**Route:** `/kvkk`

**Özellikler:**
- KVKK aydınlatma metni
- Kişisel veri işleme
- Haklarınız
- İletişim bilgileri

**Erişim:** Herkes

**Navigasyon:**
- Footer'dan "KVKK"
- Kayıt formunda link

---

### 5. Güvenlik Rehberi (`Safety.tsx`)

**Route:** `/safety`

**Özellikler:**
- Güvenlik ipuçları
- Dolandırıcılıktan korunma
- Güvenli buluşma tavsiyeleri
- Şüpheli durum bildirme
- Acil durum numaraları

**Erişim:** Herkes

**Navigasyon:**
- Footer'dan "Güvenlik"
- Dashboard'dan bilgi ikonu

---

## 🗺️ Navigasyon Akışı

### Misafir Kullanıcı Akışı

```
Ana Sayfa (/)
    ├─> Katalog (/catalog)
    │   ├─> Escort Profil (/escort/:id)
    │   └─> Login'e yönlendirme (randevu için)
    │
    ├─> Kayıt Ol (/register)
    │   ├─> E-posta doğrulama
    │   └─> Müşteri Dashboard (/customer/dashboard)
    │
    └─> Giriş Yap (/login)
        ├─> Müşteri Dashboard (/customer/dashboard)
        └─> Escort Dashboard (/escort/dashboard)
```

### Müşteri Akışı

```
Login (/login)
    ↓
Müşteri Dashboard (/customer/dashboard)
    ├─> Katalog (/catalog)
    │   └─> Escort Profil (/escort/:id)
    │       └─> Randevu Oluştur
    │
    ├─> Favoriler (/favorites)
    │   └─> Escort Profil
    │
    ├─> Randevularım (/appointments)
    │   ├─> Randevu Detay
    │   └─> Değerlendirme Yap
    │
    ├─> Mesajlar (/messages)
    │   └─> Konuşma
    │
    ├─> Geçmiş (/customer/history)
    │   └─> Fatura İndir
    │
    ├─> Cüzdan (/customer/wallet)
    │   └─> Bakiye Yükle
    │
    └─> Ayarlar (/customer/settings)
```

### Escort Akışı

```
Login (/login-escort)
    ↓
Escort Dashboard (/escort/dashboard)
    ├─> Profil Düzenle (/escort/profile/edit)
    │
    ├─> Fotoğraflar (/escort/photos)
    │   ├─> Fotoğraf Yükle
    │   └─> Fotoğraf Sırala
    │
    ├─> Takvim (/escort/calendar)
    │   ├─> Müsaitlik Ayarla
    │   └─> Randevu Onayla/Reddet
    │
    ├─> Kazançlar (/escort/earnings)
    │   └─> Rapor İndir
    │
    ├─> Analytics (/escort/dashboard/analytics)
    │   └─> İstatistikler
    │
    ├─> Market (/escort/market)
    │   └─> Paket Satın Al
    │
    └─> Mesajlar (/messages)
        └─> Müşteri Konuşmaları
```

### Admin Akışı

```
Admin Login
    ↓
Admin Dashboard (/admin/dashboard)
    ├─> Onaylar (/admin/approvals)
    │   ├─> Escort Onayları
    │   ├─> Fotoğraf Onayları
    │   └─> Kimlik Onayları
    │
    ├─> Canlı İzleme (/admin/monitoring)
    │   └─> Sistem Durumu
    │
    └─> Raporlar (/admin/reports)
        ├─> Finansal Rapor
        └─> Kullanıcı Raporu
```

---

## 🔒 Rol Bazlı Erişim

### Erişim Seviyeleri

| Rol | Kod | Erişim Seviyesi |
|-----|-----|----------------|
| Misafir | `guest` | Seviye 0 - Sadece genel sayfalar |
| Müşteri | `customer` | Seviye 1 - Müşteri paneli |
| Escort | `escort` | Seviye 2 - Escort paneli |
| Admin | `admin` | Seviye 3 - Tüm sayfalara erişim |

### Sayfa Erişim Matrisi

| Sayfa Kategorisi | Misafir | Müşteri | Escort | Admin |
|-----------------|---------|---------|--------|-------|
| Genel Sayfalar | ✅ | ✅ | ✅ | ✅ |
| Katalog/Profil | ✅ (Sınırlı) | ✅ | ✅ | ✅ |
| Kimlik Doğrulama | ✅ | ❌ | ❌ | ❌ |
| Müşteri Paneli | ❌ | ✅ | ❌ | ✅ |
| Escort Paneli | ❌ | ❌ | ✅ | ✅ |
| Admin Paneli | ❌ | ❌ | ❌ | ✅ |
| Yasal Sayfalar | ✅ | ✅ | ✅ | ✅ |

### Korumalı Route'lar

Korumalı route'lar için `ProtectedRoute` component'i kullanılır:

```tsx
<ProtectedRoute requiredRole="customer">
  <MyFavorites />
</ProtectedRoute>

<ProtectedRoute requiredRole="escort">
  <EscortDashboard />
</ProtectedRoute>

<ProtectedRoute requiredRole="admin">
  <AdminPanel />
</ProtectedRoute>
```

---

## 🎯 Özellik Tablosu

### Müşteri vs Escort Özellikleri

| Özellik | Müşteri | Escort |
|---------|---------|--------|
| Profil görüntüleme | ✅ | ✅ |
| Mesajlaşma | ✅ | ✅ |
| Randevu oluşturma | ✅ | ❌ |
| Randevu onaylama | ❌ | ✅ |
| Değerlendirme yapma | ✅ | ❌ |
| Favoriler | ✅ | ❌ |
| Cüzdan | ✅ | ✅ (farklı) |
| Fotoğraf yönetimi | ❌ | ✅ |
| Kazanç raporları | ❌ | ✅ |
| Takvim yönetimi | ❌ | ✅ |
| Analytics | ❌ (Temel) | ✅ (Detaylı) |

---

## 📱 Responsive Davranış

Tüm sayfalar responsive tasarıma sahiptir:

### Breakpoint'ler

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Mobile-Specific Özellikler

- Bottom navigation (mobilde)
- Hamburger menü
- Swipe gestures (katalog)
- Touch-optimized butonlar
- Kısaltılmış metinler

---

## 🔔 Bildirim Sistemi

### Bildirim Tipleri

| Tip | Tetikleyici | Hedef |
|-----|------------|-------|
| `booking` | Yeni randevu | Escort |
| `booking_confirmed` | Randevu onayı | Müşteri |
| `message` | Yeni mesaj | Her ikisi |
| `review` | Yeni değerlendirme | Escort |
| `payment` | Ödeme işlemi | Her ikisi |
| `system` | Sistem bildirimi | Herkes |
| `approval` | Onay durumu | Escort |

---

## 📊 Performans Optimizasyonları

### Lazy Loading

Tüm sayfalar lazy load edilir:

```typescript
const Home = lazy(() => import("@/pages/Home"));
const Catalog = lazy(() => import("@/pages/Catalog"));
```

### Code Splitting

Route bazlı code splitting uygulanmıştır.

### Caching

- React Query ile API cache
- Local Storage ile user preferences
- Service Worker (PWA)

---

## 🌍 Çoklu Dil Desteği

Platform şu anda Türkçe olarak geliştirilmiştir. Gelecekte i18n entegrasyonu planlanmaktadır.

**Desteklenen Diller:**
- 🇹🇷 Türkçe (Varsayılan)
- 🇬🇧 İngilizce (Planlı)

---

## 🎨 Tema Desteği

- **Light Mode** (Varsayılan)
- **Dark Mode** (Kullanıcı tercihi)

Tema değişikliği Header'dan yapılabilir.

---

## 📞 Destek ve Yardım

Her sayfada:
- Footer'da iletişim bilgileri
- Floating yardım butonu
- FAQ sayfası linki
- Canlı destek (planlı)

---

## 🔄 Güncelleme Geçmişi

| Versiyon | Tarih | Değişiklikler |
|----------|-------|---------------|
| v4.1 | 2024 | Phase 2 sayfaları eklendi (Profil düzenleme, Fotoğraf yönetimi, Takvim, Kazançlar, Müşteri alt sayfaları) |
| v4.0 | 2024 | İlk sürüm - Ana sayfalar ve temel paneller |

---

**Son Güncelleme:** 2024
**Doküman Versiyonu:** 1.0
