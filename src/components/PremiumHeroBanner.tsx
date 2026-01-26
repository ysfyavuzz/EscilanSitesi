/**
 * Premium Hero Banner Component
 * 
 * Ana sayfa için lüks ve etkileyici hero banner.
 * Gradient arka planı, animasyonlar ve premium tasarım öğeleri içerir.
 * 
 * @module components/PremiumHeroBanner
 * @category Components - Sections
 */

import React from 'react';
import { motion } from 'framer-motion';
import { FloatingElement, PulseGlow, AnimatedText } from './PremiumAnimations';
import { Sparkles, ArrowRight } from 'lucide-react';
import '../styles/premium-theme.css';

interface PremiumHeroBannerProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
  showParticles?: boolean;
}

export const PremiumHeroBanner: React.FC<PremiumHeroBannerProps> = ({
  title,
  subtitle,
  ctaText = 'Keşfet',
  onCtaClick,
  backgroundImage,
  showParticles = true,
}) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-premium-dark" />
      
      {/* Background Image with Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-dark-overlay" />
        </div>
      )}

      {/* Animated Background Elements */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          <FloatingElement
            className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-gold-purple opacity-10 blur-3xl"
            duration={4}
          >
            <div />
          </FloatingElement>
          <FloatingElement
            className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-purple-rose opacity-10 blur-3xl"
            duration={5}
          >
            <div />
          </FloatingElement>
          <FloatingElement
            className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-gold-500 opacity-5 blur-2xl"
            duration={3}
          >
            <div />
          </FloatingElement>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 flex flex-col items-center justify-center text-center">
        {/* Decorative Top Element */}
        <motion.div
          className="mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-12 h-12 text-gold-500 mx-auto" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-gradient-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-dark-text-secondary mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {/* CTA Button */}
        {onCtaClick && (
          <motion.button
            className="btn-premium flex items-center gap-2 text-lg px-8 py-4 rounded-lg"
            onClick={onCtaClick}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {ctaText}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}

        {/* Stats Row */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 w-full max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <StatCard number="1,240+" label="Aktif İlan" />
          <StatCard number="45K+" label="Günlük Ziyaret" />
          <StatCard number="850+" label="Doğrulanmış Profil" />
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-bg to-transparent" />
    </div>
  );
};

interface StatCardProps {
  number: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label }) => (
  <motion.div
    className="text-center"
    whileHover={{ scale: 1.05 }}
  >
    <div className="text-3xl md:text-4xl font-bold text-gradient-premium mb-2">
      {number}
    </div>
    <div className="text-dark-text-secondary text-sm md:text-base">
      {label}
    </div>
  </motion.div>
);

/* ========================================
   Premium Section Divider
   ======================================== */

interface PremiumDividerProps {
  variant?: 'gold' | 'purple' | 'gradient';
  className?: string;
}

export const PremiumDivider: React.FC<PremiumDividerProps> = ({
  variant = 'gold',
  className = '',
}) => {
  const variantClasses = {
    gold: 'separator-gold',
    purple: 'bg-gradient-to-r from-transparent via-purple-600 to-transparent h-1',
    gradient: 'bg-gradient-to-r from-transparent via-gold-500 to-transparent h-1',
  };

  return (
    <motion.div
      className={`${variantClasses[variant]} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    />
  );
};

/* ========================================
   Premium Section Header
   ======================================== */

interface PremiumSectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const PremiumSectionHeader: React.FC<PremiumSectionHeaderProps> = ({
  title,
  subtitle,
  centered = true,
  className = '',
}) => (
  <motion.div
    className={`${centered ? 'text-center' : ''} ${className}`}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
      {title}
    </h2>
    {subtitle && (
      <p className="text-lg text-dark-text-secondary max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </motion.div>
);
