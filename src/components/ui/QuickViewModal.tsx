/**
 * Quick View Modal
 * 
 * Kullanıcının detay sayfasına gitmeden profil hakkında hızlı bilgi almasını sağlayan
 * modal bileşeni. "Deep Space Luxury" temasına uygun glassmorphism tasarımı.
 * 
 * @module components/ui/QuickViewModal
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, MapPin, Star, CheckCircle, 
  MessageCircle, Phone, ArrowRight 
} from 'lucide-react';
import { Link } from 'wouter';
import { ListingProfile } from '@/types/domain';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ListingProfile | null;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ 
  isOpen, 
  onClose, 
  profile 
}) => {
  if (!profile) return null;

  // Backdrop tıklama handler'ı (Modal dışına tıklayınca kapanması için)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          onClick={handleBackdropClick}
        >
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl 
                       border border-white/10 shadow-2xl bg-[#0a0a0f] text-white"
            onClick={(e) => e.stopPropagation()} // İçeriğe tıklayınca kapanmasın
          >
            {/* Kapat Butonu */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full 
                         bg-black/20 hover:bg-white/10 text-white/70 hover:text-white 
                         transition-colors backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col md:flex-row h-full max-h-[80vh] md:max-h-[600px]">
              
              {/* Sol Taraf: Görsel & Medya */}
              <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                <img 
                  src={profile.coverImage} 
                  alt={profile.displayName} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Sol Alt Bilgi (Mobil için önemli) */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold font-orbitron">{profile.displayName}</h2>
                    {profile.verificationStatus === 'verified' && (
                      <CheckCircle className="w-5 h-5 text-blue-400 fill-blue-400/20" />
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <MapPin className="w-3 h-3 mr-1" />
                    {profile.city}, {profile.district}
                  </div>
                </div>
              </div>

              {/* Sağ Taraf: Detaylar & Aksiyonlar */}
              <div className="flex-1 p-6 md:p-8 flex flex-col overflow-y-auto custom-scrollbar bg-white/5 backdrop-blur-lg">
                
                {/* Üst Bilgi Satırı */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-wrap gap-2">
                    {profile.isBoosted && (
                      <span className="px-2 py-1 rounded-md bg-amber-500/20 text-amber-400 text-xs font-semibold border border-amber-500/30">
                        VIP İLAN
                      </span>
                    )}
                    <span className="px-2 py-1 rounded-md bg-white/10 text-gray-300 text-xs font-medium">
                      {profile.age} Yaş
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold">{profile.rating}</span>
                    <span className="text-gray-500 text-xs">({profile.reviewCount})</span>
                  </div>
                </div>

                {/* Slogan / Biyografi Özeti */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-purple-200 mb-2 font-exo">Hakkımda</h3>
                  <p className="text-sm text-gray-400 leading-relaxed italic">
                    "{profile.slogan || profile.biography?.substring(0, 100) + '...'}"
                  </p>
                </div>

                {/* Hizmetler (Tagler) */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Hizmetler</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.services.slice(0, 5).map((service, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 rounded-full text-xs bg-purple-500/10 border border-purple-500/20 text-purple-300"
                      >
                        {service}
                      </span>
                    ))}
                    {profile.services.length > 5 && (
                      <span className="px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-400">
                        +{profile.services.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                {/* Fiyat Bilgisi (Varsa) */}
                {profile.rates && (
                  <div className="mb-auto">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">
                        {profile.rates.hourly} {profile.rates.currency}
                      </span>
                      <span className="text-sm text-gray-500">/ saat</span>
                    </div>
                  </div>
                )}

                {/* Aksiyon Butonları (Alt Kısım) */}
                <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10">
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/30 transition-all group">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">WhatsApp</span>
                  </button>
                  
                  <Link href={`/escort/${profile.slug}`}>
                    <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/40 transition-all">
                      <span className="font-medium">Profili İncele</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
