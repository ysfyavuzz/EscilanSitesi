# 🔗 API & Veri Hook'ları (hooks/api)

Bu hook'lar, backend servisleriyle (tRPC/REST) iletişimi yönetir ve React Query kullanarak verileri önbelleğe alır.

---

## 🗂️ Dosya Kartları

### 🔑 useAuth.ts
- **Görevi:** Giriş, kayıt, çıkış ve mevcut kullanıcı (me) verilerini yönetir.
- **Özellik:** Başarılı giriş sonrası verileri otomatik olarak cache'ler.

### 🎭 useEscorts.ts
- **Görevi:** İlan listeleme, detay görüntüleme ve favorilere ekleme işlemlerini yönetir.
- **Özellik:** Şehir, yaş ve fiyat bazlı filtrelemeleri API'ye iletir.

### 📅 useAppointments.ts
- **Görevi:** Randevu oluşturma, listeleme ve durum güncelleme (onay/red) işlemlerini yönetir.

### 💬 useMessages.ts
- **Görevi:** Geçmiş mesajları ve konuşma listelerini API'den çeker.
- **Not:** Gerçek zamanlı akış için useWebSocket ile birlikte çalışır.

### 💳 usePayments.ts
- **Görevi:** VIP paket alımı, kredi yükleme ve işlem geçmişi verilerini yönetir.

---

## 💡 Genel Mimari Notlar
- Tüm hook'lar isLoading, isError ve data gibi standart React Query durumlarını döner.
- useMutation kullanılan yerlerde işlem sonrası ilgili query anahtarları (queryKeys) otomatik geçersiz kılınarak (invalidate) verilerin güncel kalması sağlanır.
