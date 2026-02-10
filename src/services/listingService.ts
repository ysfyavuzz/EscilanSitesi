/**
 * Listing Service (Abstraction Layer)
 * 
 * İlan verilerine erişimi yöneten servis katmanı.
 * Dependency Inversion prensibi gereği, UI bu servisi kullanır, 
 * verinin kaynağını (Mock veya API) bilmez.
 */

import { ListingProfile, FilterOptions } from '@/types/domain';

// --- INTERFACE ---

export interface IListingService {
  getListings(filters?: FilterOptions): Promise<ListingProfile[]>;
  getListingBySlug(slug: string): Promise<ListingProfile | null>;
  getFeaturedListings(): Promise<ListingProfile[]>;
}

// --- MOCK DATA ---

const MOCK_LISTINGS: ListingProfile[] = [
  {
    id: '1',
    username: 'elara_vip',
    displayName: 'Elara Moon',
    slug: 'elara-moon-vip',
    role: 'escort',
    tier: 'diamond',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60',
    coverImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60',
    thumbnailVideo: 'https://cdn.coverr.co/videos/coverr-fashion-photoshoot-in-neon-lights-5683/1080p.mp4',
    gallery: [
      { id: '1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800', type: 'image', status: 'approved' },
      { id: '2', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800', type: 'image', status: 'approved' }
    ],
    city: 'İstanbul',
    district: 'Şişli',
    age: 24,
    slogan: 'Galaksinin en parlak yıldızı senin için parlıyor.',
    biography: 'Merhaba, ben Elara. Yüksek standartlarda, entelektüel ve unutulmaz anlar için buradayım. Seyahat etmeyi, sanatı ve kaliteli sohbeti severim.',
    services: ['GFE', 'Dinner Date', 'Travel Companion', 'Massage'],
    languages: ['Türkçe', 'English', 'Russian'],
    height: 175,
    weight: 55,
    rating: 4.9,
    reviewCount: 128,
    viewCount: 5420,
    isOnline: true,
    verificationStatus: 'verified',
    isBoosted: true,
    gridSpan: '2x2', // BÜYÜK KART (VİTRİN)
    rates: {
      hourly: 5000,
      currency: 'TRY'
    }
  },
  {
    id: '2',
    username: 'zara_fit',
    displayName: 'Zara Sport',
    slug: 'zara-fit-model',
    role: 'escort',
    tier: 'gold',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60',
    coverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60',
    gallery: [],
    city: 'İstanbul',
    district: 'Kadıköy',
    age: 22,
    slogan: 'Enerjik, fit ve eğlenceli.',
    services: ['Fitness Partner', 'Party', 'Roleplay'],
    languages: ['Türkçe', 'English'],
    rating: 4.7,
    reviewCount: 45,
    viewCount: 1200,
    isOnline: false,
    lastSeen: new Date(),
    verificationStatus: 'verified',
    isBoosted: false,
    gridSpan: '1x1', // STANDART KART
    rates: {
      hourly: 3000,
      currency: 'TRY'
    }
  },
  {
    id: '3',
    username: 'selin_model',
    displayName: 'Selin',
    slug: 'selin-model-ist',
    role: 'escort',
    tier: 'standard',
    avatarUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60',
    coverImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60',
    gallery: [],
    city: 'Ankara',
    district: 'Çankaya',
    age: 26,
    slogan: 'Başkentin elit beyefendileri için.',
    services: ['Dinner Date', 'Overnight'],
    languages: ['Türkçe'],
    rating: 4.5,
    reviewCount: 22,
    viewCount: 890,
    isOnline: true,
    verificationStatus: 'pending',
    isBoosted: false,
    gridSpan: '1x1',
    rates: {
      hourly: 2500,
      currency: 'TRY'
    }
  },
  {
    id: '4',
    username: 'milena_rus',
    displayName: 'Milena',
    slug: 'milena-russian-beauty',
    role: 'escort',
    tier: 'elite',
    avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60',
    coverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=60',
    thumbnailVideo: 'https://cdn.coverr.co/videos/coverr-model-posing-in-neon-light-5692/1080p.mp4',
    gallery: [],
    city: 'Antalya',
    district: 'Lara',
    age: 21,
    slogan: 'From Russia with love.',
    services: ['Massage', 'Travel', 'Party'],
    languages: ['Russian', 'English', 'Türkçe'],
    rating: 5.0,
    reviewCount: 210,
    viewCount: 15000,
    isOnline: true,
    verificationStatus: 'verified',
    isBoosted: true,
    gridSpan: '2x1', // YATAY GENİŞ KART
    rates: {
      hourly: 300,
      currency: 'USD'
    }
  },
  {
    id: '5',
    username: 'ayse_vip',
    displayName: 'Ayşe',
    slug: 'ayse-vip-ist',
    role: 'escort',
    tier: 'standard',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60',
    coverImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60',
    gallery: [],
    city: 'İstanbul',
    district: 'Beşiktaş',
    age: 23,
    slogan: 'Tatlı ve sempatik.',
    services: ['Cafe Date', 'Cinema'],
    languages: ['Türkçe'],
    rating: 4.2,
    reviewCount: 15,
    viewCount: 600,
    isOnline: false,
    verificationStatus: 'verified',
    isBoosted: false,
    gridSpan: '1x1',
    rates: {
      hourly: 2000,
      currency: 'TRY'
    }
  },
  {
    id: '6',
    username: 'luna_night',
    displayName: 'Luna',
    slug: 'luna-night-izmir',
    role: 'escort',
    tier: 'gold',
    avatarUrl: 'https://images.unsplash.com/photo-1516575334481-f85287c2c81d?w=500&auto=format&fit=crop&q=60',
    coverImage: 'https://images.unsplash.com/photo-1516575334481-f85287c2c81d?w=800&auto=format&fit=crop&q=60',
    gallery: [],
    city: 'İzmir',
    district: 'Alsancak',
    age: 25,
    slogan: 'Gecenin kraliçesi.',
    services: ['Night Club', 'Dinner'],
    languages: ['Türkçe', 'English'],
    rating: 4.8,
    reviewCount: 90,
    viewCount: 3200,
    isOnline: true,
    verificationStatus: 'verified',
    isBoosted: true,
    gridSpan: '1x1',
    rates: {
      hourly: 4000,
      currency: 'TRY'
    }
  }
];

// --- IMPLEMENTATION ---

export class MockListingService implements IListingService {
  async getListings(filters?: FilterOptions): Promise<ListingProfile[]> {
    // Simüle edilmiş ağ gecikmesi (Network Delay)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filtreleme mantığı (Basitçe mock veriyi dönüyoruz şimdilik)
    return MOCK_LISTINGS;
  }

  async getListingBySlug(slug: string): Promise<ListingProfile | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_LISTINGS.find(l => l.slug === slug) || null;
  }

  async getFeaturedListings(): Promise<ListingProfile[]> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return MOCK_LISTINGS.filter(l => l.isBoosted);
  }
}

// Singleton Instance
export const listingService = new MockListingService();
