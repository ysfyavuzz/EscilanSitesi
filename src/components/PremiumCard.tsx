/**
 * Premium Card Component
 * 
 * Lüks ve premium hissiyat veren, 3D efektler ve animasyonlar içeren kart bileşeni.
 * Escort ilanları, VIP profilleri ve diğer içerik için kullanılır.
 * 
 * @module components/PremiumCard
 * @category Components - UI
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from './PremiumAnimations';
import '../styles/premium-theme.css';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  glowColor?: 'gold' | 'purple' | 'rose';
  variant?: 'default' | 'elevated' | 'bordered';
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = true,
  glowColor = 'gold',
  variant = 'default',
}) => {
  const glowClasses = {
    gold: 'hover:glow-gold',
    purple: 'hover:glow-purple',
    rose: 'hover:glow-rose',
  };

  const variantClasses = {
    default: 'premium-card',
    elevated: 'premium-card shadow-lg',
    bordered: 'premium-card border-2 border-gold-500',
  };

  return (
    <motion.div
      className={`
        ${variantClasses[variant]} glass-panel
        ${hoverable ? glowClasses[glowColor] : ''}
        ${className}
      `}
      variants={hoverable ? cardVariants : undefined}
      initial={hoverable ? 'hidden' : undefined}
      whileInView={hoverable ? 'visible' : undefined}
      whileHover={hoverable ? 'hover' : undefined}
      viewport={hoverable ? { once: true, amount: 0.2 } : undefined}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
    >
      {children}
    </motion.div>
  );
};

interface PremiumCardHeaderProps {
  children: React.ReactNode;
  className?: string;
  withGradient?: boolean;
}

export const PremiumCardHeader: React.FC<PremiumCardHeaderProps> = ({
  children,
  className = '',
  withGradient = false,
}) => (
  <div
    className={`
      p-6
      ${withGradient ? 'bg-gradient-gold-purple' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

interface PremiumCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const PremiumCardContent: React.FC<PremiumCardContentProps> = ({
  children,
  className = '',
}) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

interface PremiumCardFooterProps {
  children: React.ReactNode;
  className?: string;
  withBorder?: boolean;
}

export const PremiumCardFooter: React.FC<PremiumCardFooterProps> = ({
  children,
  className = '',
  withBorder = true,
}) => (
  <div
    className={`
      p-6
      ${withBorder ? 'border-t border-dark-border' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

interface PremiumCardImageProps {
  src: string;
  alt: string;
  className?: string;
  overlay?: boolean;
}

export const PremiumCardImage: React.FC<PremiumCardImageProps> = ({
  src,
  alt,
  className = '',
  overlay = true,
}) => (
  <div className={`relative overflow-hidden ${className}`}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
    />
    {overlay && (
      <div className="absolute inset-0 bg-gradient-dark-overlay" />
    )}
  </div>
);

interface PremiumCardBadgeProps {
  children: React.ReactNode;
  variant?: 'premium' | 'verified' | 'vip' | 'boost';
  className?: string;
}

export const PremiumCardBadge: React.FC<PremiumCardBadgeProps> = ({
  children,
  variant = 'premium',
  className = '',
}) => {
  const variantClasses = {
    premium: 'badge-premium',
    verified: 'badge-verified',
    vip: 'badge-vip',
    boost: 'badge-boost',
  };

  return (
    <span className={`${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};
