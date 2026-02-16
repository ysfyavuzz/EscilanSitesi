/**
 * VipPremiumCard Component
 * 
 * Premium animated card component for VIP escorts with enhanced visual effects.
 */

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, CheckCircle2, Star, MapPin, Heart, ChevronRight, Sparkles } from "lucide-react";
import { useTheme } from '@/contexts/ThemeContext';

interface VipPremiumCardProps {
  escort: any;
  onClick?: (escortId: string) => void;
}

export const VipPremiumCard = React.memo(function VipPremiumCard({ escort, onClick }: VipPremiumCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[3/4.5] group cursor-pointer content-layer"
      onClick={() => onClick && onClick(escort.id)}
    >
      <Card className={`w-full h-full glass-panel overflow-hidden rounded-[2.5rem] border-none shadow-2xl transition-all duration-500
        ${isDark ? 'bg-black/40' : 'bg-white/40'}`}>
          <CardContent className="p-0 h-full relative">
            {/* 3D Glow Effect */}
            <div className={`absolute inset-0 opacity-20 pointer-events-none transition-colors duration-1000
              ${isDark ? 'bg-gradient-to-br from-violet-500 via-transparent to-primary' : 'bg-gradient-to-br from-orange-500 via-transparent to-amber-500'}`} />
            
            {/* Image Section */}
            <div className="absolute inset-0 z-0">
              <img
                src={escort.profilePhoto || escort.coverImage}
                alt={escort.displayName}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Premium Overlays */}
              <div className={`absolute inset-0 opacity-80 transition-colors duration-1000
                ${isDark 
                  ? 'bg-gradient-to-t from-[#020617] via-transparent to-black/30' 
                  : 'bg-gradient-to-t from-orange-950/40 via-transparent to-white/20'}`} />
            </div>

            {/* Content - Floating in 3D */}
            <div className="relative h-full flex flex-col justify-between p-8 z-10" style={{ transform: "translateZ(50px)" }}>
              {/* Top Badges */}
              <div className="flex justify-between items-start">
                <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0 shadow-2xl px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse italic">
                  <Crown className="w-4 h-4 mr-2" />
                  ULTRA VIP
                </Badge>
                <div className="p-3 rounded-full glass-panel border-none text-white hover:bg-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary text-white border-0 px-3 py-1 text-[8px] font-black uppercase tracking-widest italic">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> DOĞRULANMIŞ
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-xl text-white border-0 px-3 py-1 text-[8px] font-black uppercase tracking-widest italic">
                    <Sparkles className="w-3 h-3 mr-1 text-amber-400" /> POPÜLER
                  </Badge>
                </div>

                <div>
                  <h2 className="text-4xl font-black text-white tracking-tighter mb-2 italic uppercase drop-shadow-2xl">
                    {escort.displayName}
                  </h2>
                  <div className="flex items-center text-white/70 font-black text-xs uppercase tracking-widest">
                    <MapPin className="w-4 h-4 mr-2 text-primary" />
                    {escort.city}, {escort.district}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Saatlik Ücret</span>
                    <span className="text-3xl font-black text-white">₺{escort.hourlyRate || escort.rates?.hourly}</span>
                  </div>
                  <div className="flex items-center gap-1 glass-panel border-none px-4 py-2">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-black text-white">{escort.rating || '5.0'}</span>
                  </div>
                </div>

                <Button className="w-full py-8 bg-white text-black hover:bg-primary hover:text-white font-black text-xs uppercase tracking-[0.2em] italic rounded-2xl transition-all shadow-2xl group/btn">
                  PROFİLİ İNCELE
                  <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
    </motion.div>
  );
});

export default VipPremiumCard;
