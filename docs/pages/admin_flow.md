# 👮 Yönetim Paneli Akışı (src/pages/admin)

Platform yöneticilerinin (Admin/SuperAdmin) tüm sistemi denetlediği ve yönettiği sayfalar grubu.

---

## 🗂️ Dosya Kartları

### 📊 AdminDashboard.tsx & AdminAnalytics.tsx
- **Görevi:** Platformun genel sağlığını (gelir, aktif kullanıcı, yeni ilan) özetleyen dashboard.
- **Kritik:** Veriler dmin.router üzerinden çekilir.

### ✅ AdminApprovals.tsx & AdminMediaApprovals.tsx
- **Görevi:** Yeni ilanların ve yüklenen fotoğrafların onay kuyruğu.
- **Özellik:** Diff-view ile eski ve yeni profil arasındaki farkları gösterir.

### 🚩 AdminReports.tsx & AdminComplaints.tsx
- **Görevi:** Müşteri veya escortlardan gelen şikayetlerin yönetimi.
- **Aksiyon:** Kullanıcıyı banlama, uyarma veya şikayeti reddetme seçeneklerini sunar.

### 🔐 AdminSecurity.tsx & AdminSettings.tsx
- **Görevi:** Sistem genelindeki güvenlik (rate-limit ayarları, kara listeler) ve genel ayarları (komisyon oranları, site renkleri) yönetir.

---

## 💡 İş Mantığı (Logic)
- **Audit Logs:** Yapılan her onay/red veya ban işlemi AdminSettings üzerinden loglanır.
- **Real-Time:** AdminRealTimeMonitoring.tsx sayfası ile sistemdeki anlık WebSocket trafiği izlenebilir.
