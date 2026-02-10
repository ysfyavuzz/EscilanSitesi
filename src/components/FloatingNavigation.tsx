/**
 * Floating Navigation Bar - Cosmic Galaxy Edition
 * 
 * "Deep Space Luxury" temasına uygun, minimal ve etkileşimli alt navigasyon.
 * Glassmorphism, Neon Glow ve Apple Dock tarzı animasyonlar.
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Search, Heart, MessageSquare, 
  Settings, User, Rocket, Sparkles, Shield
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  color: string;
}

export const FloatingNavigation = React.memo(function FloatingNavigation() {
  const [location] = useLocation();
  const { user, isAdmin } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll ile gizlenme mantığı (Performanslı)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Navigasyon öğeleri (Rol bazlı)
  const items: NavItem[] = isAdmin ? [
    { icon: Shield, label: 'Admin', href: '/admin/dashboard', color: 'text-red-400' },
    { icon: Search, label: 'İlanlar', href: '/admin/listings', color: 'text-blue-400' },
    { icon: MessageSquare, label: 'Mesajlar', href: '/admin/messages', color: 'text-purple-400' },
  ] : [
    { icon: Home, label: 'Giriş', href: '/', color: 'text-amber-400' },
    { icon: Search, label: 'Keşfet', href: '/escorts', color: 'text-blue-400' },
    { icon: Heart, label: 'Favoriler', href: '/favorites', color: 'text-pink-400' },
    { icon: MessageSquare, label: 'Mesajlar', href: '/messages', color: 'text-purple-400' },
    { icon: Settings, label: 'Üs', href: '/settings', color: 'text-emerald-400' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4 w-full max-w-lg"
        >
          <div className="relative group">
            {/* Arka Plan Parlama Efekti */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-blue-500/20 rounded-[32px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
            
            {/* Ana Gövde (Glass Container) */}
            <div className="relative flex items-center justify-between px-2 py-2 bg-black/40 backdrop-blur-2xl rounded-[28px] border border-white/10 shadow-2xl">
              {items.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;

                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.2, y: -8 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative flex flex-col items-center justify-center p-3 cursor-pointer group/item"
                    >
                      {/* Aktiflik Işığı (Aura) */}
                      {isActive && (
                        <motion.div 
                          layoutId="navAura"
                          className={`absolute inset-0 rounded-2xl bg-white/5 blur-md`}
                        />
                      )}

                      <div className={`relative z-10 ${isActive ? item.color : 'text-gray-500'} group-hover/item:text-white transition-colors duration-300`}>
                        <Icon className={`w-6 h-6 ${isActive ? 'drop-shadow-[0_0_8px_currentColor]' : ''}`} />
                      </div>

                      {/* Etiket (Hover'da çıkar) */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-10 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg text-[10px] font-bold text-white whitespace-nowrap shadow-xl"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Aktif Noktası */}
                      {isActive && (
                        <motion.div 
                          layoutId="navDot"
                          className={`absolute -bottom-1 w-1 h-1 rounded-full bg-white shadow-[0_0_10px_white]`}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}

              {/* Kullanıcı Profili (En Sağda Özel Bölüm) */}
              <div className="w-px h-8 bg-white/10 mx-1" />
              
              <Link href={user ? (isAdmin ? "/admin/dashboard" : "/dashboard") : "/login"}>
                <motion.div
                  whileHover={{ scale: 1.2, y: -8 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 cursor-pointer group/user"
                >
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg group-hover/user:shadow-amber-500/50 transition-all duration-300`}>
                    {user ? <User className="w-5 h-5 text-black" /> : <Rocket className="w-5 h-5 text-black" />}
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default FloatingNavigation;