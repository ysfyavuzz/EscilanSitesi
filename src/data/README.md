# Mock Data Dökümantasyonu

Bu klasör, escort ilan platformunun geliştirme ve test aşamasında kullanılan tüm mock (sahte) veri modüllerini içerir.

## 📋 İçindekiler

- [Genel Bakış](#genel-bakış)
- [Modül Listesi](#modül-listesi)
- [Kullanım Örnekleri](#kullanım-örnekleri)
- [Veri Yapıları](#veri-yapıları)
- [Mock Veriyi Genişletme](#mock-veriyi-genişletme)

## 🎯 Genel Bakış

Mock data modülleri, uygulamanın backend API'si henüz hazır değilken veya test ortamında kullanılmak üzere tasarlanmıştır. Bu modüller gerçekçi veri yapıları ve ilişkiler içerir.

### Temel Özellikler

- ✅ TypeScript tip güvenliği
- ✅ Gerçekçi veri yapıları
- ✅ İlişkisel veri bağlantıları
- ✅ Kolay import ve kullanım
- ✅ Türkçe içerik desteği

## 📦 Modül Listesi

### 1. Escorts (`escorts.ts`)

Escort profil verilerini içerir.

**İçerik:**
- Profil bilgileri (isim, yaş, şehir, vb.)
- Fiziksel özellikler (boy, kilo, vücut tipi, vb.)
- Hizmet bilgileri ve fiyatlar
- Fotoğraf ve video linkleri
- Çalışma saatleri ve müsaitlik
- İstatistikler (görüntüleme, rezervasyon sayıları)
- VIP/Premium durumu
- Doğrulama durumu

**Tipler:**
```typescript
interface EscortProfile {
  id: string;
  displayName: string;
  realName?: string;
  city: string;
  district: string;
  age: number;
  height: number;
  weight: number;
  bodyType: 'slim' | 'athletic' | 'curvy' | 'plus-size' | 'average';
  breastSize?: 'A' | 'B' | 'C' | 'D' | 'DD+';
  hourlyRate: number;
  isVip: boolean;
  isVerifiedByAdmin: boolean;
  services: string[];
  languages: string[];
  availability: { [key: string]: boolean };
  // ... diğer alanlar
}
```

**Yardımcı Fonksiyonlar:**
- `getEscortById(id: string)` - ID'ye göre escort getir
- `getEscortsByCity(city: string)` - Şehre göre escort'ları filtrele
- `getVipEscorts()` - Sadece VIP escort'ları getir

### 2. Customers (`customers.ts`)

Müşteri profil verilerini içerir.

**İçerik:**
- Müşteri temel bilgileri
- Üyelik durumu (Free, Premium, VIP)
- Hesap bilgileri
- İstatistikler
- Tercihler

**Tipler:**
```typescript
interface CustomerProfile {
  id: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  city: string;
  membershipLevel: 'free' | 'premium' | 'vip';
  joinedAt: Date;
  stats: {
    totalBookings: number;
    totalSpent: number;
    favoriteCount: number;
  };
}
```

**Yardımcı Fonksiyonlar:**
- `getCustomerById(id: string)` - ID'ye göre müşteri getir
- `getCustomersByMembership(level: string)` - Üyelik seviyesine göre filtrele

### 3. Appointments (`appointments.ts`)

Randevu verilerini içerir.

**İçerik:**
- Randevu detayları
- Müşteri ve escort eşleştirmeleri
- Randevu durumları (pending, confirmed, completed, cancelled)
- Tarih ve saat bilgileri
- Ödeme bilgileri
- Notlar

**Tipler:**
```typescript
interface Appointment {
  id: string;
  customerId: string;
  escortId: string;
  date: Date;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  location: string;
  notes?: string;
  createdAt: Date;
}
```

**Yardımcı Fonksiyonlar:**
- `getAppointmentById(id: string)` - ID'ye göre randevu getir
- `getAppointmentsByCustomer(customerId: string)` - Müşterinin randevuları
- `getAppointmentsByEscort(escortId: string)` - Escort'un randevuları
- `getAppointmentsByStatus(status: string)` - Duruma göre filtrele

### 4. Reviews (`reviews.ts`)

Değerlendirme ve yorum verilerini içerir.

**İçerik:**
- Müşteri değerlendirmeleri
- Puanlama sistemi (1-5 yıldız)
- Yorumlar
- Escort'un cevapları
- Onay durumu

**Tipler:**
```typescript
interface Review {
  id: string;
  customerId: string;
  escortId: string;
  appointmentId: string;
  rating: number;
  comment: string;
  response?: string;
  isVerified: boolean;
  createdAt: Date;
  helpful: number;
}
```

**Yardımcı Fonksiyonlar:**
- `getReviewById(id: string)` - ID'ye göre değerlendirme getir
- `getEscortReviews(escortId: string)` - Escort'un değerlendirmeleri
- `getAverageRating(escortId: string)` - Ortalama puan hesapla

### 5. Conversations (`conversations.ts`)

Mesajlaşma verilerini içerir.

**İçerik:**
- Konuşma thread'leri
- Mesajlar
- Katılımcılar
- Mesaj durumları (okundu/okunmadı)
- Zaman damgaları

**Tipler:**
```typescript
interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  updatedAt: Date;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: Date;
}
```

**Yardımcı Fonksiyonlar:**
- `getConversationsByUser(userId: string)` - Kullanıcının konuşmaları
- `getMessagesByConversation(conversationId: string)` - Konuşmanın mesajları

### 6. Notifications (`notifications.ts`)

Bildirim verilerini içerir.

**İçerik:**
- Sistem bildirimleri
- Kullanıcı bildirimleri
- Bildirim tipleri
- Okunma durumu
- Eylem linkleri

**Tipler:**
```typescript
interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'message' | 'review' | 'system' | 'payment';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: Date;
}
```

**Yardımcı Fonksiyonlar:**
- `getNotificationsByUserId(userId: string)` - Kullanıcının bildirimleri
- `getUnreadNotifications(userId: string)` - Okunmamış bildirimler
- `markAsRead(notificationId: string)` - Okundu olarak işaretle

### 7. Transactions (`transactions.ts`)

Finansal işlem verilerini içerir.

**İçerik:**
- Ödeme işlemleri
- Para transferleri
- İşlem durumları
- Ödeme yöntemleri
- Tutarlar ve komisyonlar

**Tipler:**
```typescript
interface Transaction {
  id: string;
  userId: string;
  type: 'payment' | 'refund' | 'commission' | 'withdrawal';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  description: string;
  createdAt: Date;
}
```

**Yardımcı Fonksiyonlar:**
- `getTransactionsByUser(userId: string)` - Kullanıcının işlemleri
- `getTransactionsByType(type: string)` - İşlem tipine göre filtrele

### 8. Earnings (`earnings.ts`)

Kazanç ve gelir verilerini içerir.

**İçerik:**
- Escort kazançları
- Dönemsel raporlar
- Komisyon hesaplamaları
- Ödeme geçmişi
- İstatistikler

**Tipler:**
```typescript
interface Earning {
  id: string;
  escortId: string;
  appointmentId: string;
  grossAmount: number;
  commission: number;
  netAmount: number;
  payoutStatus: 'pending' | 'paid';
  payoutDate?: Date;
  createdAt: Date;
}
```

**Yardımcı Fonksiyonlar:**
- `getEarningsByEscort(escortId: string)` - Escort'un kazançları
- `getTotalEarnings(escortId: string, period: string)` - Toplam kazanç hesapla
- `getPendingPayouts(escortId: string)` - Bekleyen ödemeler

## 💻 Kullanım Örnekleri

### Temel Import

```typescript
import { mockEscorts, mockCustomers, mockAppointments } from '@/data/mockData';

// Tüm escort'ları getir
const allEscorts = mockEscorts;

// Tüm müşterileri getir
const allCustomers = mockCustomers;
```

### Yardımcı Fonksiyonları Kullanma

```typescript
import { 
  getEscortById, 
  getEscortsByCity,
  getVipEscorts,
  getEscortReviews,
  getAverageRating 
} from '@/data/mockData';

// Belirli bir escort'u getir
const escort = getEscortById('esc-001');

// İstanbul'daki escort'ları getir
const istanbulEscorts = getEscortsByCity('İstanbul');

// VIP escort'ları getir
const vipEscorts = getVipEscorts();

// Bir escort'un yorumlarını getir
const reviews = getEscortReviews('esc-001');

// Ortalama puanı hesapla
const avgRating = getAverageRating('esc-001');
```

### Müşteri ve Randevu İşlemleri

```typescript
import {
  getCustomerById,
  getAppointmentsByCustomer,
  getAppointmentsByStatus
} from '@/data/mockData';

// Müşteri bilgilerini getir
const customer = getCustomerById('cust-001');

// Müşterinin randevularını getir
const customerAppointments = getAppointmentsByCustomer('cust-001');

// Onaylanmış randevuları getir
const confirmedAppointments = getAppointmentsByStatus('confirmed');
```

### Mesajlaşma ve Bildirimler

```typescript
import {
  getConversationsByUser,
  getNotificationsByUserId,
  getUnreadNotifications
} from '@/data/mockData';

// Kullanıcının konuşmalarını getir
const conversations = getConversationsByUser('cust-001');

// Tüm bildirimleri getir
const allNotifications = getNotificationsByUserId('cust-001');

// Okunmamış bildirimleri getir
const unreadNotifs = getUnreadNotifications('cust-001');
```

### Finansal İşlemler

```typescript
import {
  getEarningsByEscort,
  getTotalEarnings,
  getTransactionsByUser
} from '@/data/mockData';

// Escort'un kazançlarını getir
const earnings = getEarningsByEscort('esc-001');

// Bu ayki toplam kazancı hesapla
const monthlyEarnings = getTotalEarnings('esc-001', 'month');

// Kullanıcının işlemlerini getir
const transactions = getTransactionsByUser('cust-001');
```

## 🗂️ Veri Yapıları

### İlişkisel Bağlantılar

Mock veriler arasında ilişkiler ID'ler üzerinden kurulmuştur:

```
Customer (cust-001)
    ├─> Appointments (apt-001, apt-002)
    │       ├─> Escort (esc-001)
    │       └─> Reviews (rev-001)
    ├─> Conversations (conv-001)
    │       └─> Messages
    ├─> Notifications (notif-001, notif-002)
    └─> Transactions (trans-001, trans-002)

Escort (esc-001)
    ├─> Appointments (apt-001, apt-003)
    ├─> Reviews (rev-001, rev-002)
    ├─> Earnings (earn-001, earn-002)
    └─> Conversations (conv-001)
```

### ID Format Standartları

| Veri Tipi | Prefix | Örnek |
|-----------|--------|-------|
| Escort | `esc-` | `esc-001` |
| Customer | `cust-` | `cust-001` |
| Appointment | `apt-` | `apt-001` |
| Review | `rev-` | `rev-001` |
| Conversation | `conv-` | `conv-001` |
| Message | `msg-` | `msg-001` |
| Notification | `notif-` | `notif-001` |
| Transaction | `trans-` | `trans-001` |
| Earning | `earn-` | `earn-001` |

## 🔧 Mock Veriyi Genişletme

### Yeni Escort Ekleme

```typescript
// mockData/escorts.ts dosyasına ekleyin
const newEscort: EscortProfile = {
  id: 'esc-999',
  displayName: 'Yeni İsim',
  city: 'İstanbul',
  district: 'Kadıköy',
  age: 25,
  height: 170,
  weight: 55,
  bodyType: 'athletic',
  hourlyRate: 1500,
  isVip: false,
  isVerifiedByAdmin: true,
  profilePhoto: '/photos/esc-999-main.jpg',
  photos: ['/photos/esc-999-1.jpg'],
  services: ['Akşam Yemeği', 'Tiyatro'],
  languages: ['Türkçe', 'İngilizce'],
  about: 'Hakkımda bilgi...',
  description: 'Detaylı açıklama...',
  smoking: 'no',
  alcohol: 'social',
  availability: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false
  },
  workingHours: {
    start: '10:00',
    end: '22:00'
  },
  stats: {
    totalViews: 0,
    totalBookings: 0,
    rating: 0,
    reviewCount: 0
  },
  createdAt: new Date(),
  lastActive: new Date()
};

// mockEscorts dizisine ekleyin
export const mockEscorts: EscortProfile[] = [
  // ... mevcut escort'lar
  newEscort
];
```

### Yeni Yardımcı Fonksiyon Ekleme

```typescript
// mockData/escorts.ts dosyasına ekleyin

/**
 * Belirli bir bölgedeki escort'ları getirir
 */
export function getEscortsByDistrict(city: string, district: string): EscortProfile[] {
  return mockEscorts.filter(
    escort => escort.city === city && escort.district === district
  );
}

/**
 * Fiyat aralığına göre escort'ları filtreler
 */
export function getEscortsByPriceRange(min: number, max: number): EscortProfile[] {
  return mockEscorts.filter(
    escort => escort.hourlyRate >= min && escort.hourlyRate <= max
  );
}

/**
 * Hizmet tipine göre escort'ları bulur
 */
export function getEscortsByService(service: string): EscortProfile[] {
  return mockEscorts.filter(
    escort => escort.services.includes(service)
  );
}
```

### Yeni Mock Data Modülü Oluşturma

1. Yeni dosya oluşturun: `mockData/yeniModul.ts`
2. Tip tanımını yapın:

```typescript
export interface YeniTip {
  id: string;
  // ... diğer alanlar
}
```

3. Mock veriyi oluşturun:

```typescript
export const mockYeniVeri: YeniTip[] = [
  {
    id: 'yeni-001',
    // ... diğer alanlar
  }
];
```

4. Yardımcı fonksiyonları ekleyin:

```typescript
export function getYeniById(id: string): YeniTip | undefined {
  return mockYeniVeri.find(item => item.id === id);
}
```

5. `index.ts` dosyasına export ekleyin:

```typescript
// mockData/index.ts
export * from './yeniModul';
```

## 📚 En İyi Pratikler

1. **Tip Güvenliği**: Her zaman TypeScript tiplerini kullanın
2. **Tutarlılık**: ID formatlarını ve naming convention'ları takip edin
3. **Gerçekçilik**: Veriyi mümkün olduğunca gerçeğe yakın tutun
4. **Dokümantasyon**: Yeni alanlar için JSDoc yorumları ekleyin
5. **İlişkiler**: Veri ilişkilerini doğru ID'lerle kurun
6. **Validasyon**: Eklenen verilerin tip tanımlarına uygunluğunu kontrol edin

## 🔍 Test ve Geliştirme

Mock veriler şu alanlarda kullanılabilir:

- ✅ UI component testleri
- ✅ Sayfa layout testleri
- ✅ Form validasyon testleri
- ✅ Filtreleme ve arama fonksiyonlarını test
- ✅ Storybook story'leri
- ✅ API entegrasyonu öncesi prototype geliştirme

## 📄 Lisans ve Kullanım

Bu mock veriler yalnızca geliştirme ve test amaçlıdır. Production ortamında gerçek API ile değiştirilmelidir.
