/**
 * Cosmic Floating Navigator
 * 
 * Temaya uygun açılır/kapanır floating navigation bileşeni.
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Search, Heart, MessageCircle, User, Menu, X, Crown, Settings, LogOut, Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export function CosmicNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { href: '/', icon: Home, label: 'ANA SAYFA' },
    { href: '/escorts', icon: Search, label: 'KEŞFET' },
    { href: '/favorites', icon: Heart, label: 'FAVORİLER', requiresAuth: true },
    { href: '/messages', icon: MessageCircle, label: 'MESAJLAR', requiresAuth: true },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 md:hidden w-16 h-16 rounded-full bg-primary shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8 text-white" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-28 right-8 left-8 z-50 md:hidden glass-panel p-6 border-none"
          >
            <div className="grid grid-cols-2 gap-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all
                    ${location === item.href ? 'bg-primary text-white' : (isDark ? 'bg-white/5 text-white/60' : 'bg-orange-500/5 text-orange-950/60')}`}>
                    <item.icon className="w-6 h-6" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
              {user ? (
                <>
                  <Link href="/escort/dashboard">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 text-white/60">
                      <User className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-widest">PROFİLİM</span>
                    </div>
                  </Link>
                  <div onClick={logout} className="flex items-center gap-4 p-4 rounded-2xl bg-red-500/10 text-red-500">
                    <LogOut className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">ÇIKIŞ YAP</span>
                  </div>
                </>
              ) : (
                <Link href="/login">
                  <div className="flex items-center justify-center gap-3 p-5 rounded-2xl bg-primary text-white shadow-xl">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest italic">YÖRÜNGEYE GİR</span>
                  </div>
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

export default CosmicNav;
