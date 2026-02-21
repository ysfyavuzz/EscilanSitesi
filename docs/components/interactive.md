# 💬 İnteraktif Bileşenler (Chat, Auth & Forms)

Kullanıcı etkileşiminin en yoğun olduğu bölümler: Mesajlaşma, Kayıt ve Doğrulama süreçleri.

---

## 🗂️ Dosya Kartları

### 🗨️ ChatInterface.tsx & ChatWindow.tsx
- **Görevi:** Anlık mesajlaşma ekranı.
- **Özellik:** ConversationList (konuşma listesi) ve MessageBubble (mesaj balonu) bileşenlerini barındırır.

### 🔑 RegisterModal.tsx & ProfileCompleteModal.tsx
- **Görevi:** Kullanıcı kayıt ve profil tamamlama akışlarını yöneten modal pencereler.
- **Özellik:** Sosyal giriş (Google vb.) sonrası eksik bilgileri toplar.

### ✅ VerificationCenter.tsx & AIPhotoEditor.tsx
- **Görevi:** Kimlik doğrulama ve fotoğraf düzenleme (maskeleme) araçları.
- **Özellik:** AI ile yüz tespiti ve gizleme özelliklerini kullanıcıya sunar.

---

## 💡 Güvenlik Notları
- **Sanitization:** Tüm chat girdileri gönderilmeden önce ChatFilter servisinden geçer.
- **Privacy:** ContactLock.tsx bileşeni, kullanıcının yetkisi yoksa iletişim bilgilerini bulanıklaştırır (blur).
