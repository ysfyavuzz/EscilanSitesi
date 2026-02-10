/**
 * Dashboard Layout
 * 
 * Escort ve Üye panelleri için ortak yerleşim düzeni.
 * Sol sidebar, üst header ve içerik alanını yönetir.
 * "Deep Space" temasına uygun glassmorphism tasarımı.
 */

import React from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, User, Image, Settings, 
  LogOut, Shield, Crown, Bell, Calendar, Users, Crop
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: 'escort' | 'member' | 'agency';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  userRole = 'escort' 
}) => {
  const [location] = useLocation();

  // Menü Öğeleri (Role göre değişebilir)
  const menuItems = [
    { icon: LayoutDashboard, label: 'Genel Bakış', href: '/dashboard' },
    { icon: User, label: 'Profil Düzenle', href: '/dashboard/profile' },
    { icon: Calendar, label: 'Takvim & Müsaitlik', href: '/dashboard/schedule' },
    { icon: Users, label: 'Etkileşim Üssü', href: '/dashboard/interactions' },
    { icon: Image, label: 'Medya Galeri', href: '/dashboard/gallery' },
    { icon: Crop, label: 'Görsel Düzenleyici', href: '/dashboard/image-editor' }, // Yeni
    { icon: Settings, label: 'Ayarlar', href: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white flex">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 hidden lg:flex flex-col border-r border-white/10 bg-black/20 backdrop-blur-xl fixed inset-y-0 z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-900/40">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold font-orbitron text-lg tracking-wider">GALAXY</h1>
            <span className="text-xs text-purple-400 font-medium">PARTNER PANELİ</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <Link key={item.href} href={item.href}>
                <div className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
                  ${isActive 
                    ? 'bg-purple-600/20 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] border border-purple-500/30' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }
                `}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-8 bg-purple-500 rounded-r-full shadow-[0_0_10px_#a855f7]"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header (Mobile Toggle & User Info) */}
        <header className="flex justify-between items-center mb-8 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
          <h2 className="text-xl font-bold font-orbitron">
             {menuItems.find(m => m.href === location)?.label || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-white">Elara Moon</div>
                <div className="text-xs text-amber-400">VIP Üye</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border border-white/20">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
};
