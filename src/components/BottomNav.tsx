/**
 * BottomNav Component
 * 
 * Mobile-responsive bottom navigation bar for quick access to main features.
 */

import { Link, useLocation } from 'wouter';
import { Home, Search, Heart, MessageCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export function BottomNav() {
  const [location] = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const navItems = [
    { href: '/', icon: Home, label: 'ANA SAYFA' },
    { href: '/escorts', icon: Search, label: 'KEŞFET' },
    { href: '/favorites', icon: Heart, label: 'FAVORİLER' },
    { href: '/messages', icon: MessageCircle, label: 'MESAJLAR' },
    { href: '/escort/dashboard', icon: User, label: 'PROFİL' },
  ];

  return (
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 pt-4 transition-colors duration-500
      ${isDark ? 'bg-[#020617]/80' : 'bg-[#fff7ed]/80'} backdrop-blur-2xl border-t border-white/5`}>
      <div className="flex justify-between items-center h-14">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href}>
              <div className="flex flex-col items-center justify-center relative px-2 py-1 cursor-pointer group">
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-3 w-8 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-white/20'}`} />
                <span className={`text-[8px] mt-2 font-black tracking-widest transition-colors duration-300 ${isActive ? 'text-primary' : 'text-white/20'}`}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
