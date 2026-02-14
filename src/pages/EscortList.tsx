/**
 * Escort Listings Page (Galaxy Edition)
 * 
 * Dinamik Tetris Grid yapısı, gelişmiş filtreleme ve Quick View özelliği ile
 * zenginleştirilmiş ilan listeleme sayfası.
 * "Deep Space Luxury" temasına uygun.
 * 
 * @module pages/EscortList
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, Sparkles, SlidersHorizontal, Search, MapPin, 
  ChevronDown, X, Star, Crown 
} from 'lucide-react';

// Domain Types & Service
import { ListingProfile } from '@/types/domain';
import { listingService } from '@/services/listingService';

// UI Components
import { StandardCard } from '@/components/StandardCard';
import { QuickViewModal } from '@/components/ui/QuickViewModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEO } from '@/pages/SEO';

export default function EscortList() {
  const [listings, setListings] = useState<ListingProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Quick View Modal State
  const [selectedProfile, setSelectedProfile] = useState<ListingProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Veri Çekme (Simüle edilmiş API çağrısı)
  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const data = await listingService.getListings();
        setListings(data);
      } catch (error) {
        console.error("İlanlar yüklenirken hata oluştu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Quick View Handler
  const handleQuickView = (profile: ListingProfile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <SEO
        title="Zuhre Planet | Seçkin İlanlar"
        description="Galaksinin en parlak yıldızlarını keşfedin."
      />

      {/* --- HERO HEADER --- */}
      <div className="relative pt-24 pb-12 md:pt-40 md:pb-20 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
             style={{
               backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }}
        />

        <div className="container relative z-10 mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center mb-12"
          >
            <Badge className="mb-4 bg-amber-500/10 text-amber-400 border-amber-500/20 backdrop-blur-md px-4 py-1.5 uppercase tracking-widest text-[10px]">
              <Sparkles className="w-3 h-3 mr-2" /> Kozmik Vitrin
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase italic">
              Yıldızlar <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Geçidi</span>
            </h1>
            <p className="text-blue-100/40 text-sm md:text-lg max-w-2xl font-medium uppercase tracking-tight">
              Aradığınız deneyimi bulmak için galaksinin en sekin profillerini inceleyin.
            </p>
          </motion.div>

          {/* --- FILTER BAR --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-3 md:p-4 max-w-5xl mx-auto shadow-2xl"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400/50" />
              <input
                type="text"
                placeholder="İsim, şehir veya özellik ara..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-blue-100/20"
              />
            </div>

            <button className="flex items-center justify-between md:justify-start gap-3 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 text-blue-100/60 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>İstanbul</span>
              </div>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </button>

            <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-bold py-7 px-8 rounded-xl shadow-lg shadow-blue-900/40 transition-all active:scale-95">
              <Filter className="w-4 h-4 mr-2" />
              FİLTRELE
            </Button>
          </motion.div>
        </div>
      </div>

      {/* --- LISTING GRID --- */}
      <div className="container mx-auto px-4 pb-32">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin" />
            </div>
            <span className="mt-6 text-blue-400/40 font-black tracking-widest uppercase text-xs animate-pulse">Yıldızlar Taranıyor</span>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[340px] gap-4 md:gap-6 grid-flow-dense"
          >
            {listings.map((profile, index) => (
              <motion.div
                key={profile.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <StandardCard
                  profile={profile}
                  onQuickView={handleQuickView}
                  showVideoOnHover={true}
                />
              </motion.div>
            ))}

            {/* Promo Card Inserted into Grid */}
            <motion.div 
              className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-1 relative rounded-[32px] overflow-hidden group cursor-pointer border border-blue-500/20 bg-gradient-to-br from-blue-900/40 via-purple-900/20 to-black shadow-2xl"
              whileHover={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
                <div className="p-4 bg-amber-500/20 rounded-full mb-6">
                  <Crown className="w-10 h-10 text-amber-400 animate-pulse" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tighter italic uppercase">VİTRİN SİZİN OLSUN</h3>
                <p className="text-blue-100/40 mb-8 max-w-xs text-sm font-medium uppercase tracking-tighter">Profilinizi binlerce kişiye ulaştırın ve galakside parlayın.</p>
                <Button className="bg-white text-black hover:bg-blue-400 hover:text-white transition-all font-black px-10 py-6 rounded-full"> 
                  Reklam Ver
                </Button>
              </div>
            </motion.div>

          </motion.div>
        )}
      </div>

      {/* --- QUICK VIEW MODAL --- */}
      <QuickViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={selectedProfile}
      />
    </div>
  );
}
