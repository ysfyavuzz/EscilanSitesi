/**
 * Premium Hero Banner Component
 * 
 * Ana sayfa için lüks ve etkileyici hero banner bileşeni.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

interface PremiumHeroBannerProps {
  title: string;
  subtitle: string;
}

export const PremiumHeroBanner: React.FC<PremiumHeroBannerProps> = ({
  title,
  subtitle,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="relative overflow-hidden pt-32 pb-20 px-6 content-layer">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <motion.h1
          className={`text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-6 text-3d transition-colors duration-1000
            ${isDark ? 'text-white' : 'text-orange-950'}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className={`text-sm md:text-xl font-black uppercase tracking-[0.4em] max-w-3xl mx-auto transition-colors duration-500 italic
            ${isDark ? 'text-white/60' : 'text-orange-900/70'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {/* Stats Row */}
        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <StatCard number="1,240+" label="Aktif İlan" isDark={isDark} />
          <StatCard number="45K+" label="Günlük Ziyaret" isDark={isDark} />
          <StatCard number="850+" label="Doğrulanmış Profil" isDark={isDark} />
        </motion.div>
      </div>
    </div>
  );
};

interface StatCardProps {
  number: string;
  label: string;
  isDark: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ number, label, isDark }) => (
  <motion.div
    className="text-center glass-panel p-8 border-none"
    whileHover={{ scale: 1.05 }}
  >
    <div className="text-3xl md:text-4xl font-black italic text-primary mb-2">
      {number}
    </div>
    <div className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-orange-950/60'}`}>
      {label}
    </div>
  </motion.div>
);
