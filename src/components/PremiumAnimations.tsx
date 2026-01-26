/**
 * Premium Animations Component
 * 
 * Framer Motion kullanarak premium animasyonlar sağlayan yardımcı bileşenler.
 * Sayfa geçişleri, kart efektleri ve micro-interactions için kullanılır.
 * 
 * @module components/PremiumAnimations
 * @category Components - Animations
 */

import { motion, Variants } from 'framer-motion';
import React from 'react';

/* ========================================
   Animation Variants
   ======================================== */

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -8,
    boxShadow: '0 20px 40px rgba(247, 179, 43, 0.2)',
    transition: {
      duration: 0.3,
    },
  },
};

export const slideInVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

export const rotateInVariants: Variants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/* ========================================
   Premium Animated Components
   ======================================== */

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
}) => (
  <motion.div
    className={className}
    variants={containerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    custom={{ staggerDelay }}
  >
    {children}
  </motion.div>
);

interface AnimatedItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  className = '',
  delay = 0,
}) => (
  <motion.div
    className={className}
    variants={itemVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  onClick,
}) => (
  <motion.div
    className={className}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    whileHover="hover"
    viewport={{ once: true, amount: 0.2 }}
    onClick={onClick}
  >
    {children}
  </motion.div>
);

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
  >
    {text}
  </motion.div>
);

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  duration = 3,
}) => (
  <motion.div
    className={className}
    animate={{ y: [0, -20, 0] }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  >
    {children}
  </motion.div>
);

interface PulseGlowProps {
  children: React.ReactNode;
  className?: string;
  color?: 'gold' | 'purple' | 'rose';
}

export const PulseGlow: React.FC<PulseGlowProps> = ({
  children,
  className = '',
  color = 'gold',
}) => {
  const colorMap = {
    gold: 'rgba(247, 179, 43, 0.3)',
    purple: 'rgba(168, 85, 247, 0.3)',
    rose: 'rgba(255, 77, 109, 0.3)',
  };

  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          `0 0 20px ${colorMap[color]}`,
          `0 0 40px ${colorMap[color]}`,
          `0 0 20px ${colorMap[color]}`,
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

interface ShimmerProps {
  children: React.ReactNode;
  className?: string;
}

export const Shimmer: React.FC<ShimmerProps> = ({
  children,
  className = '',
}) => (
  <motion.div
    className={className}
    animate={{
      backgroundPosition: ['-1000px 0', '1000px 0'],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    {children}
  </motion.div>
);

interface RotateProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export const Rotate: React.FC<RotateProps> = ({
  children,
  className = '',
  duration = 10,
}) => (
  <motion.div
    className={className}
    animate={{ rotate: 360 }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    {children}
  </motion.div>
);

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
  >
    {children}
  </motion.div>
);

/* ========================================
   Utility Functions
   ======================================== */

export const getStaggerDelay = (index: number, baseDelay = 0.05): number => {
  return index * baseDelay;
};

export const createCustomVariants = (
  enterDuration = 0.5,
  exitDuration = 0.3,
  delay = 0
): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: enterDuration,
      delay,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: exitDuration,
      ease: 'easeIn',
    },
  },
});
