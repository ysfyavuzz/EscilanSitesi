# `src/pages/AdminDashboard.tsx` — Admin Yönetim Paneli

---

## 📄 Dosya Hakkında

| Alan | Bilgi |
|------|-------|
| **Dosya** | `src/pages/AdminDashboard.tsx` |
| **Route** | `/admin` |
| **Dil** | TypeScript + JSX (TSX) |
| **Teknoloji** | React, tRPC, framer-motion, Radix UI, Lucide Icons |
| **Boyut** | ~115 KB — En büyük dosya |
| **Erişim** | Yalnızca `admin`, `super_mod`, `moderator` rolleri |
| **Durum** | 🔲 Dökümanlandı |

---

## 🎯 Ne İşe Yarar?

Platform yöneticilerinin tüm sistem operasyonlarını tek yerden yönettiği ana admin paneli. Kullanıcı yönetimi, escort onay akışı, analitikler, gelir takibi, şikayetler ve güvenlik monitöringini kapsar.

---

## 🖼️ Ana Bölümler

| Bölüm | İçerik |
|-------|--------|
| **Dashboard** | KPI kartları (toplam kullanıcı, aktif escort, günlük gelir, bekleyen onaylar) |
| **Kullanıcı Yönetimi** | Kullanıcı listesi, shadowban, rol değiştirme, hesap silme |
| **Escort Onayları** | Yeni başvuruları inceleme, doğrulama, fotoğraf onayı |
| **Profil Moderasyonu** | `PendingProfileUpdates` bileşeni ile bekleyen profil değişiklikleri |
| **Şikayetler** | Kullanıcı şikayetleri listesi, durum güncelleme |
| **Finansal** | Gelir analitikleri, ödeme işlem geçmişi |
| **İçerik** | Forum gönderisi ve medya moderasyonu |
| **Güvenlik** | Audit log, ban geçmişi, şüpheli aktivite |
| **Ayarlar** | Platform ayarları, bildirim yapılandırması |

---

## 🔐 Erişim Kontrolü

```tsx
// DashboardAuthGuard ile korunur
<DashboardAuthGuard allowedRoles={['admin', 'super_mod', 'moderator']}>
  <AdminDashboard />
</DashboardAuthGuard>
```

---

## ⚠️ Dikkat Edilmesi Gerekenler

- **Boyut:** ~115 KB — Tek dosyanın bu kadar büyük olması kod bakımını zorlaştırır. Alt komponenetlere (AdminUsers, AdminApprovals vb.) zaten bölünmüş sayfa dosyaları var — bu dosyadan referans alınıp refactor edilebilir.
- **Gerçek Zamanlı Güncelleme:** `AdminRealTimeMonitoring.tsx` ayrı bir bileşen olarak mevcut; polling veya WebSocket ile bağlanabilir.

---

## 💡 AI Öneri

> **1. Dosyayı Parçalara Bölün:**
> `AdminDashboard.tsx` çok büyük. `pages/admin/` alt klasöründe `UsersTab.tsx`, `ApprovalsTab.tsx` gibi sekme bileşenleri oluşturulup lazy import ile yüklenebilir. Bu hem bundle size'ı küçültür hem test yazımını kolaylaştırır.
>
> **2. Role-Based Section Guard:**
> `super_mod` rolü moderasyon yapabilir ama finansal verileri görmemeli. Bölüm bazlı rol kontrolü uygulanmalı.
>
> **3. Audit Log Görünümü:**
> `getAuditLogs` prosedürü mevcut. Her admin aksiyonu altında "Bu değişikliği kim yaptı?" bilgisini gösterecek log bölümü eklenebilir.

---

*Döküman tarihi: 2026-02-21 | Oluşturan: Antigravity AI*
