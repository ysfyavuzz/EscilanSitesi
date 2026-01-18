# Katkıda Bulunma Rehberi (Contributing Guide)

Escort Platform projesine katkıda bulunmak istediğiniz için teşekkür ederiz! Bu döküman, projeye nasıl katkıda bulunabileceğinizi açıklar.

## 📋 İçindekiler

- [Kod Standartları](#kod-standartları)
- [Geliştirme Ortamı](#geliştirme-ortamı)
- [Commit Mesajları](#commit-mesajları)
- [Pull Request Süreci](#pull-request-süreci)
- [Dökümantasyon](#dökümantasyon)
- [Test Yazımı](#test-yazımı)

---

## 🎯 Kod Standartları

### TypeScript

- **Strict mode** aktif tutulmalı
- **ESLint** kurallarına uyulmalı
- Tüm fonksiyonlar ve değişkenler **anlamlı isimler** almalı
- **Type safety** her zaman tercih edilmeli (`any` kullanımından kaçının)

```typescript
// ✅ İyi
function calculateTotalPrice(rate: number, hours: number): number {
  return rate * hours;
}

// ❌ Kötü
function calc(a: any, b: any) {
  return a * b;
}
```

### React Components

- **Function components** kullanın (class components değil)
- **Hooks** kullanımına özen gösterin
- Props için **TypeScript interfaces** tanımlayın
- **Default props** değerleri belirtin

```typescript
// ✅ İyi
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  // ...
}
```

### Dosya Organizasyonu

```
src/
├── components/      # Yeniden kullanılabilir UI bileşenleri
├── pages/           # Sayfa bileşenleri (routing)
├── lib/             # Kütüphane modülleri (API, utils)
├── types/           # TypeScript tip tanımlamaları
├── contexts/        # React contexts
└── drizzle/         # Database schema
```

### Naming Conventions

| Tip | Kural | Örnek |
|-----|-------|-------|
| **Bileşenler** | PascalCase | `EscortCard`, `BookingForm` |
| **Fonksiyonlar** | camelCase | `calculatePrice`, `getUserProfile` |
| **Sabitler** | UPPER_SNAKE_CASE | `API_URL`, `MAX_UPLOAD_SIZE` |
| **Interfaces** | PascalCase + 'Props'/'Interface' | `ButtonProps`, `UserInterface` |
| **Types** | PascalCase | `PaymentMethod`, `BookingStatus` |

---

## 💻 Geliştirme Ortamı

### Gereksinimler

- Node.js 18+
- npm veya pnpm
- Git

### Kurulum

```bash
# Repoyu forklayın ve klonlayın
git clone https://github.com/YOUR_USERNAME/EscilanSitesi.git
cd EscilanSitesi

# Bağımlılıkları yükleyin
npm install

# Environment variables
cp .env.example .env
# .env dosyasını düzenleyin

# Geliştirme sunucusunu başlatın
npm run dev
```

### Çalıştırma Komutları

```bash
npm run dev        # Geliştirme sunucusu (localhost:3005)
npm run build      # Production build
npm run preview    # Build önizleme
npm run lint       # ESLint kontrolü
```

---

## 📝 Commit Mesajları

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Yeni özellik
- `fix`: Bug düzeltme
- `docs`: Dökümantasyon
- `style`: Kod formatı (logic değişikliği yok)
- `refactor`: Refactoring
- `test`: Test ekleme/düzeltme
- `chore`: Build/konfigürasyon değişiklikleri

### Örnekler

```bash
# Yeni özellik
feat(booking): add calendar date picker

# Bug fix
fix(auth): resolve login token expiration issue

# Dökümantasyon
docs(readme): update installation instructions

# Refactoring
refactor(components): simplify BookingForm validation logic
```

---

## 🔄 Pull Request Süreci

### 1. Branch Oluşturma

```bash
# Önce main'i güncelleyin
git checkout main
git pull origin main

# Yeni branch oluşturun
git checkout -b feature/your-feature-name
# veya
git checkout -b fix/bug-description
```

### 2. Değişiklik Yapma

- **Küçük, focused commits** yapın
- Her commit **tek bir mantıksal değişiklik** içermeli
- Commit öncesi **lint** çalıştırın

```bash
# Kod yazın
# ...

# Lint kontrolü
npm run lint

# Commit
git add .
git commit -m "feat(component): add new feature"
```

### 3. Pull Request Açma

1. Forkunuza push edin:
   ```bash
   git push origin feature/your-feature-name
   ```

2. GitHub'da Pull Request açın

3. PR açıklamasında:
   - ✅ Ne yaptığınızı açıklayın
   - ✅ Hangi issue'yu çözdüğünüzü belirtin (#123)
   - ✅ Ekran görüntüleri ekleyin (UI değişiklikleri için)
   - ✅ Test adımlarını yazın

### 4. Code Review

- Geri bildirimlere **nazikçe** yanıt verin
- İstenen değişiklikleri yapın
- **Tartışmaya** açık olun

---

## 📚 Dökümantasyon

### JSDoc Standartları

**Tüm yeni dosyalar ve fonksiyonlar JSDoc ile dökümante edilmelidir.**

#### Dosya Başlığı (Her dosyanın başına)

```typescript
/**
 * ComponentName Component
 * 
 * Detailed description of what this component does.
 * Multiple lines are encouraged for clarity.
 * 
 * @module components/ComponentName
 * @category Components - [Category]
 * 
 * Features:
 * - Feature 1
 * - Feature 2
 * - Feature 3
 * 
 * @example
 * ```tsx
 * <ComponentName prop="value" />
 * ```
 */
```

#### Fonksiyon Dökümantasyonu

```typescript
/**
 * Calculates the total booking price with commission.
 * 
 * @param hourlyRate - The escort's hourly rate in TRY
 * @param hours - Number of hours booked
 * @param isVip - Whether the escort is VIP (gets commission discount)
 * @returns Total price including platform commission
 * 
 * @example
 * ```typescript
 * const total = calculateBookingTotal(500, 2, true);
 * // Returns: 1000 + commission
 * ```
 */
function calculateBookingTotal(
  hourlyRate: number,
  hours: number,
  isVip: boolean = false
): number {
  // Implementation
}
```

#### Interface Dökümantasyonu

```typescript
/**
 * Props for the BookingForm component
 */
interface BookingFormProps {
  /** Unique ID of the escort */
  escortId: string;
  
  /** Display name of the escort */
  escortName: string;
  
  /** Hourly rate in TRY */
  hourlyRate: number;
  
  /** Optional callback when booking is submitted */
  onSubmit?: (data: BookingData) => void;
}
```

---

## 🧪 Test Yazımı

### Unit Tests (Planlı - Vitest)

```typescript
import { describe, it, expect } from 'vitest';
import { calculatePlatformFee } from '@/types/payment';

describe('calculatePlatformFee', () => {
  it('should calculate 15% fee for standard escorts', () => {
    const fee = calculatePlatformFee(1000, false);
    expect(fee).toBe(150);
  });

  it('should calculate 10% fee for VIP escorts', () => {
    const fee = calculatePlatformFee(1000, true);
    expect(fee).toBe(100);
  });
});
```

### Component Tests (Planlı - React Testing Library)

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders button with label', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## 🔒 Güvenlik

### Hassas Bilgiler

- ❌ **Asla** API keys, passwords, tokens commit etmeyin
- ✅ `.env` dosyalarını kullanın
- ✅ `.env.example` ile template sağlayın
- ✅ Secrets için environment variables kullanın

### Input Validation

```typescript
// ✅ Her zaman input'ları validate edin
import { z } from 'zod';

const BookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  hours: z.number().min(1).max(24),
  customerName: z.string().min(2).max(100),
  customerEmail: z.string().email(),
});

// Kullanım
const validatedData = BookingSchema.parse(formData);
```

### XSS Prevention

```typescript
// ✅ Message sanitization kullanın
import { sanitizeMessage } from '@/types/notifications';

const userInput = req.body.message;
const { clean, violations } = sanitizeMessage(userInput);

if (violations.length > 0) {
  // Handle violations
}
```

---

## 📞 İletişim

- **Issues:** GitHub Issues kullanın
- **Discussions:** GitHub Discussions
- **Email:** support@escortplatform.com

---

## 📜 Lisans

Bu projeye katkıda bulunarak, katkılarınızın proje lisansı altında yayınlanmasını kabul edersiniz.

---

## ⭐ Teşekkürler

Katkılarınız için teşekkür ederiz! Her katkı, projeyi daha iyi hale getirir. 🚀

