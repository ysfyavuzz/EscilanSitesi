# 🚀 Escort Kullanıcı Akışı (src/pages/escort)

Bu döküman, platformda ilan veren (escort) kullanıcıların yolculuğunu ve ilgili sayfaların teknik detaylarını özetler.

---

## 🗂️ Dosya Kartları

### 📝 EscortRegister.tsx (Kayıt)
- **Görevi:** Escortlar için 3 adımlı özel kayıt formu.
- **Özellik:** Temel bilgiler, fiziksel özellikler ve ilk fotoğraf yükleme adımını içerir.

### 🏠 EscortDashboard.tsx (Panel)
- **Görevi:** Escortun ana kumanda merkezi. İstatistikler (görüntülenme, mesaj sayısı) ve bekleyen onayları gösterir.

### 🖼️ PhotoManager.tsx & ImageEditor.tsx (Medya)
- **Görevi:** Fotoğraf yükleme, silme ve AI tabanlı basit düzenleme (maskeleme) işlemlerini yönetir.
- **Kritik Not:** Yüklenen görseller admin onayına (pending) düşer.

### 📅 CalendarManager.tsx & ScheduleManager.tsx (Takvim)
- **Görevi:** Müsaitlik durumunu (saatlik/günlük) yönetir. Randevu taleplerinin çakışmasını engeller.

### 💰 EarningsReport.tsx (Finans)
- **Görevi:** Tamamlanan randevulardan kazanılan bakiyeyi ve platform komisyonlarını raporlar.

---

## 💡 İş Mantığı (Logic)
- **Staging Area:** Escort profilinde yaptığı her kritik değişiklik (ProfileEdit.tsx) doğrudan yayına girmez, önce pendingChanges alanına kaydedilir ve admin onayı bekler.
- **Verification:** VerificationCenter.tsx üzerinden canlı fotoğraf doğrulaması yapılmadan 'Verified' rozeti verilmez.
