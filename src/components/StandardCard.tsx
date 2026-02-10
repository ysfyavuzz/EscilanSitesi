/**
 * StandardCard Component (Cosmic Galaxy Edition)
 * 
 * Dinamik grid yapısına (Tetris Layout) uygun, interaktif profil kartı.
 * "Deep Space Luxury" temasıyla uyumlu.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Star, Heart, CheckCircle2, Flame, 
  MessageCircle, Eye, Play, Shield 
} from "lucide-react";
import { ListingProfile, StandardCardProps } from '@/types/domain';

export const StandardCard = React.memo(function StandardCard({ 
  profile, 
  onQuickView, 
  showVideoOnHover = true 
}: StandardCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Tetris Grid için boyut sınıfları
  const spanClasses = {
    '1x1': 'col-span-1 row-span-1',
    '2x1': 'col-span-2 row-span-1',
    '2x2': 'col-span-2 row-span-2',
    '4x1': 'col-span-4 row-span-1', // Geniş banner tarzı
    '6x1': 'col-span-6 row-span-1',
  }[profile.gridSpan || '1x1'];

  return (
    <motion.div
      layoutId={`card-${profile.id}`}
      className={`relative group cursor-pointer ${spanClasses}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className={`
        h-full w-full overflow-hidden rounded-[24px] relative 
        transition-all duration-500 border border-white/5
        bg-[#0a0a0f] 
        ${isHovered ? 'shadow-[0_0_30px_rgba(138,43,226,0.3)] border-purple-500/30 translate-y-[-4px]' : 'shadow-xl'}
      `}>
        
        {/* --- MEDIA LAYER --- */}
        <div className="relative h-full w-full">
          {/* Video Preview */}
          {showVideoOnHover && isHovered && profile.thumbnailVideo && (
            <div className="absolute inset-0 z-10 animate-in fade-in duration-500">
              <video 
                src={profile.thumbnailVideo} 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          )}

          {/* Main Image */}
          <img
            src={profile.coverImage}
            alt={profile.displayName}
            className={`w-full h-full object-cover transition-transform duration-700 
                       ${isHovered ? 'scale-110 blur-[2px]' : 'scale-100'}`}
            loading="lazy"
          />

          {/* Overlay Gradient (Bottom-Up) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-black/30 opacity-90" />

          {/* --- TOP BADGES --- */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
            {profile.isBoosted && (
              <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-black px-2 py-0.5 text-[10px] border-0 shadow-lg shadow-amber-500/20">
                <Flame className="w-3 h-3 mr-1" /> VIP
              </Badge>
            )}
            {profile.verificationStatus === 'verified' && (
              <Badge className="bg-blue-500/20 backdrop-blur-md text-blue-200 border border-blue-500/30 px-2 py-0.5 text-[10px]">
                <CheckCircle2 className="w-3 h-3 mr-1 text-blue-400" /> ONAYLI
              </Badge>
            )}
          </div>

          {/* --- TOP RIGHT STATUS --- */}
          <div className="absolute top-3 right-3 z-20">
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full backdrop-blur-md border border-white/10 ${profile.isOnline ? 'bg-green-900/30' : 'bg-gray-900/30'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${profile.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-[9px] font-bold text-white uppercase tracking-wider">
                {profile.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>

          {/* --- HOVER ACTIONS --- */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center gap-3 z-30 bg-black/40 backdrop-blur-[2px]"
              >
                {/* Favori */}
                <button className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-all group/btn">
                  <Heart className="w-5 h-5 text-white group-hover/btn:fill-white" />
                </button>
                
                {/* Hızlı Bakış (Quick View) */}
                {onQuickView && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(profile);
                    }}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                    title="Hızlı Bakış"
                  >
                    <Eye className="w-7 h-7 text-black" />
                  </button>
                )}
                
                {/* Mesaj */}
                <button className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-green-500 hover:border-green-500 transition-all">
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- CONTENT INFO --- */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            {/* İsim ve Lokasyon */}
            <div className="flex justify-between items-end mb-2">
              <div>
                <h3 className="text-lg font-bold text-white leading-tight font-orbitron group-hover:text-amber-400 transition-colors">
                  {profile.displayName}
                </h3>
                <div className="flex items-center text-xs text-gray-400 mt-1">
                  <MapPin className="w-3 h-3 mr-1 text-purple-400" />
                  {profile.city}, {profile.district}
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-lg border border-white/10 backdrop-blur-sm">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-white">{profile.rating}</span>
              </div>
            </div>

            {/* Fiyat ve Badge */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              {profile.rates ? (
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Saatlik</span>
                  <span className="text-lg font-black text-white">
                    {profile.rates.hourly} <span className="text-xs font-normal text-gray-400">{profile.rates.currency}</span>
                  </span>
                </div>
              ) : (
                <div className="text-xs text-gray-500">Fiyat sorunuz</div>
              )}
              
              {profile.verificationStatus === 'verified' && (
                <div className="text-[10px] text-green-400 flex items-center gap-1 font-medium">
                  <Shield className="w-3 h-3" />
                  Güvenilir
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
});
