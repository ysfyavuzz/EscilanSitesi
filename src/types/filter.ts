/**
 * Filter Types
 *
 * Type definitions for advanced search and filtering system.
 * Supports multi-criteria filtering with URL state management.
 *
 * @module types/filter
 * @category Types
 */

/**
 * Price range filter with min/max values
 */
export interface PriceRange {
  min: number;
  max: number;
}

/**
 * Service category with available options
 */
export interface ServiceOption {
  id: string;
  label: string;
  icon?: string;
  category: 'massage' | 'companion' | 'special' | 'other';
}

/**
 * Physical attribute filters
 */
export interface PhysicalFilters {
  ageRange?: [number, number]; // [min, max]
  heightRange?: [number, number]; // [min, max] in cm
  weightRange?: [number, number]; // [min, max] in kg
  hairColor?: string[];
  eyeColor?: string[];
  bodyType?: string[];
}

/**
 * Availability filters
 */
export interface AvailabilityFilters {
  availableToday?: boolean;
  availableTonight?: boolean;
  availableWeekend?: boolean;
  incall?: boolean;
  outcall?: boolean;
}

/**
 * Complete filter state
 */
export interface EscortFilters {
  // Search
  searchQuery?: string;

  // Location
  city?: string;
  district?: string;

  // Pricing
  priceRange?: PriceRange;

  // VIP status
  isVip?: boolean;
  isVerified?: boolean;

  // Physical attributes
  physical?: PhysicalFilters;

  // Services
  services?: string[];

  // Availability
  availability?: AvailabilityFilters;

  // Sorting
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'popular' | 'rating';
}

/**
 * Filter section configuration for UI
 */
export interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'range' | 'select' | 'multiselect' | 'toggle';
  options?: Array<{ value: string; label: string; count?: number }>;
  min?: number;
  max?: number;
  step?: number;
  icon?: string;
}

/**
 * Active filter summary for display
 */
export interface ActiveFilter {
  key: string;
  label: string;
  value: string | number | [number, number];
  removable: boolean;
}

/**
 * Filter configuration presets
 */
/**
 * Türkçe göz rengi seçenekleri (türleri)
 */
export type TurkEyeColor = 'mavi' | 'yesil' | 'kahverengi' | 'ela' | 'siyah' | 'gri' | 'hazel' | 'amber';

/**
 * Türkçe saç rengi seçenekleri (türleri)
 */
export type TurkHairColor = 'siyah' | 'kahverengi' | 'sari' | 'kizil' | 'gri' | 'balay';

/**
 * Renkli filtre seçeneği interface'i
 */
export interface ColorFilterOption {
  value: string;
  label: string;
  color: string;
  icon: string;
  count?: number;
}

/**
 * İngilizce saç renkleri (mevcut sistem için)
 */
export const HAIR_COLORS = [
  { value: 'blonde', label: 'Sarı', count: 120 },
  { value: 'brunette', label: 'Kumral', count: 95 },
  { value: 'black', label: 'Siyah', count: 88 },
  { value: 'red', label: 'Kızıl', count: 32 },
  { value: 'colored', label: 'Renkli', count: 18 },
] as const;

/**
 * İngilizce göz renkleri (mevcut sistem için)
 */
export const EYE_COLORS = [
  { value: 'brown', label: 'Kahverengi', count: 140 },
  { value: 'blue', label: 'Mavi', count: 65 },
  { value: 'green', label: 'Yeşil', count: 42 },
  { value: 'hazel', label: 'Ela', count: 38 },
  { value: 'gray', label: 'Gri', count: 15 },
] as const;

/**
 * Türkçe saç renkleri - görselli filtreler için
 * Her renk için gerçekçi ton ve emoji icon
 */
export const TURK_HAIR_COLORS: ColorFilterOption[] = [
  { value: 'siyah', label: 'Siyah', color: '#1F2937', icon: '⚫', count: 89 },
  { value: 'kahverengi', label: 'Kahverengi', color: '#92400E', icon: '🟤', count: 134 },
  { value: 'sari', label: 'Sarı', color: '#FCD34D', icon: '🟡', count: 45 },
  { value: 'kizil', label: 'Kızıl', color: '#DC2626', icon: '🔴', count: 12 },
  { value: 'gri', label: 'Gri/Beyaz', color: '#9CA3AF', icon: '⚪', count: 8 },
  { value: 'balay', label: 'Balayı', color: '#D97706', icon: '🌈', count: 23 },
];

/**
 * Türkçe göz renkleri - görselli filtreler için
 * Her renk için gerçekçi ton ve emoji icon
 */
export const TURK_EYE_COLORS: ColorFilterOption[] = [
  { value: 'mavi', label: 'Mavi', color: '#3B82F6', icon: '🔵', count: 45 },
  { value: 'yesil', label: 'Yeşil', color: '#10B981', icon: '🟢', count: 23 },
  { value: 'kahverengi', label: 'Kahverengi', color: '#92400E', icon: '🟤', count: 120 },
  { value: 'ela', label: 'Ela', color: '#A78BFA', icon: '🩷', count: 18 },
  { value: 'siyah', label: 'Siyah', color: '#1F2937', icon: '⚫', count: 67 },
  { value: 'gri', label: 'Gri', color: '#9CA3AF', icon: '⚪', count: 12 },
  { value: 'hazel', label: 'Hazel', color: '#F59E0B', icon: '🟡', count: 8 },
  { value: 'amber', label: 'Amber', color: '#F97316', icon: '🟠', count: 5 },
];

export const BODY_TYPES = [
  { value: 'slim', label: 'Zayıf', count: 85 },
  { value: 'athletic', label: 'Atletik', count: 92 },
  { value: 'average', label: 'Orta', count: 110 },
  { value: 'curvy', label: 'Dolgun', count: 78 },
  { value: 'voluptuous', label: 'Balık Etli', count: 45 },
] as const;

export const SERVICE_CATEGORIES = [
  { id: 'massage', label: 'Masaj', icon: '💆', services: [
    { id: 'swedish', label: 'İsveç Masajı' },
    { id: 'thai', label: 'Thai Masajı' },
    { id: 'deep-tissue', label: 'Derin Doku Masajı' },
    { id: 'aromatherapy', label: 'Aromaterapi' },
    { id: 'hot-stone', label: 'Sıcak Taş Masajı' },
  ]},
  { id: 'companion', label: 'Refakat', icon: '👥', services: [
    { id: 'dinner', label: 'Yemek Daveti' },
    { id: 'event', label: 'Etkinliklere Katılım' },
    { id: 'travel', label: 'Seyahat Dostu' },
    { id: 'overnight', label: 'Gece Konaklama' },
    { id: 'weekend', label: 'Hafta Sonu Kaçamağı' },
  ]},
  { id: 'special', label: 'Özel Hizmetler', icon: '✨', services: [
    { id: 'couple', label: 'Çiftlere Hizmet' },
    { id: 'bachelor', label: ' Bekarlığa Veda' },
    { id: 'roleplay', label: 'Rol Oyunu' },
    { id: 'domination', label: 'Dominasyon' },
    { id: 'submission', label: 'Teslimiyet' },
  ]},
] as const;

export const SORT_OPTIONS = [
  { value: 'newest', label: 'En Yeni' },
  { value: 'popular', label: 'En Popüler' },
  { value: 'rating', label: 'En Yüksek Puan' },
  { value: 'price-asc', label: 'Fiyat (Düşükten Yükseğe)' },
  { value: 'price-desc', label: 'Fiyat (Yüksekten Düşüğe)' },
] as const;
