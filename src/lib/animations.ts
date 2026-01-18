/**
 * Central Animation Library
 * 
 * Provides consistent and high-end animations across the entire application using Framer Motion.
 * Contains reusable animation variants, transitions, and easing functions for smooth interactions.
 * Ensures brand consistency and professional feel throughout all pages and components.
 * 
 * @module lib/animations
 * @category Libraries - UI/UX
 * 
 * Features:
 * - Predefined animation variants for common patterns
 * - Smooth bezier curve definitions for page transitions
 * - Stagger animations for list items
 * - Fade, slide, and scale animations
 * - Page transition effects
 * - Hover and tap animations
 * - Loading and skeleton animations
 * - Responsive animation adjustments
 * - Accessibility-friendly reduced motion support
 * 
 * Animation Variants:
 * - fadeInUp: Fade in from bottom with upward motion
 * - fadeInDown: Fade in from top with downward motion
 * - fadeInLeft: Fade in from left
 * - fadeInRight: Fade in from right
 * - scaleIn: Scale up with fade in
 * - staggerContainer: Container for staggered children
 * - staggerItem: Individual staggered item
 * - pageTransition: Smooth page enter/exit transitions
 * - slideInLeft: Slide in from left
 * - slideInRight: Slide in from right
 * - hoverScale: Scale up on hover
 * - tapScale: Scale down on tap
 * 
 * Easing Functions:
 * - easeInOut: Smooth start and end
 * - easeOut: Fast start, slow end
 * - easeIn: Slow start, fast end
 * - spring: Bouncy spring animation
 * - pageEasing: Optimized for page transitions
 * 
 * @example
 * ```tsx
 * import { fadeInUp, staggerContainer, pageTransition } from '@/lib/animations';
 * 
 * // Fade in up animation
 * <motion.div variants={fadeInUp} initial="hidden" animate="visible">
 *   Content
 * </motion.div>
 * 
 * // Stagger children animation
 * <motion.div variants={staggerContainer} initial="hidden" animate="visible">
 *   <motion.div variants={staggerItem}>Item 1</motion.div>
 *   <motion.div variants={staggerItem}>Item 2</motion.div>
 * </motion.div>
 * 
 * // Page transition
 * <motion.div {...pageTransition}>
 *   Page content
 * </motion.div>
 * ```
 */

import { Variants, Transition } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────────
// EASING CURVES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Smooth ease in-out curve for balanced animations
 */
export const easeInOut = [0.42, 0, 0.58, 1] as const;

/**
 * Ease out curve for fast start, slow end
 */
export const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Ease in curve for slow start, fast end
 */
export const easeIn = [0.42, 0, 1, 1] as const;

/**
 * Custom bezier curve optimized for page transitions
 */
export const pageEasing = [0.6, 0.05, 0.01, 0.9] as const;

/**
 * Bouncy spring animation
 */
export const spring: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
};

/**
 * Gentle spring for subtle animations
 */
export const gentleSpring: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

// ─────────────────────────────────────────────────────────────────────────────
// FADE ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fade in from bottom with upward motion
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.4,
      ease: easeIn,
    },
  },
};

/**
 * Fade in from top with downward motion
 */
export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: easeIn,
    },
  },
};

/**
 * Fade in from left
 */
export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.4,
      ease: easeIn,
    },
  },
};

/**
 * Fade in from right
 */
export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.4,
      ease: easeIn,
    },
  },
};

/**
 * Simple fade in/out
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easeIn,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SCALE ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Scale in with fade
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: easeIn,
    },
  },
};

/**
 * Hover scale up
 */
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: easeOut,
  },
};

/**
 * Tap scale down
 */
export const tapScale = {
  scale: 0.95,
  transition: {
    duration: 0.1,
    ease: easeIn,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STAGGER ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Container for staggered children animations
 */
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

/**
 * Individual item in stagger container
 */
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.3,
      ease: easeIn,
    },
  },
};

/**
 * Fast stagger for large lists
 */
export const fastStaggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
  hidden: {
    x: '-100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: pageEasing,
    },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: easeIn,
    },
  },
};

/**
 * Slide in from right
 */
export const slideInRight: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: pageEasing,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: easeIn,
    },
  },
};

/**
 * Slide in from top
 */
export const slideInTop: Variants = {
  hidden: {
    y: '-100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: pageEasing,
    },
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: easeIn,
    },
  },
};

/**
 * Slide in from bottom
 */
export const slideInBottom: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: pageEasing,
    },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: easeIn,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE TRANSITIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Page transition props for smooth page changes
 */
export const pageTransition = {
  initial: 'hidden',
  animate: 'visible',
  exit: 'exit',
  variants: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: pageEasing,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: easeIn,
      },
    },
  },
};

/**
 * Modal/Dialog transition
 */
export const modalTransition: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: easeIn,
    },
  },
};

/**
 * Backdrop overlay transition
 */
export const backdropTransition: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SPECIAL EFFECTS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Pulse animation for attention
 */
export const pulse: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
};

/**
 * Bounce animation
 */
export const bounce: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: easeInOut,
    },
  },
};

/**
 * Rotate animation
 */
export const rotate: Variants = {
  initial: {
    rotate: 0,
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Shimmer loading effect
 */
export const shimmer: Variants = {
  initial: {
    backgroundPosition: '-200% 0',
  },
  animate: {
    backgroundPosition: '200% 0',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get animation variants with reduced motion support
 */
export const getVariantsWithReducedMotion = (variants: Variants): Variants => {
  if (prefersReducedMotion()) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    };
  }
  return variants;
};

/**
 * Create custom stagger with configurable delay
 */
export const createStagger = (staggerDelay = 0.1, delayChildren = 0.2): Variants => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: staggerDelay / 2,
      staggerDirection: -1,
    },
  },
});

/**
 * Create custom fade in with configurable direction and distance
 */
export const createFadeIn = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance = 40,
  duration = 0.6
): Variants => {
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const value = direction === 'up' || direction === 'left' ? distance : -distance;

  if (axis === 'y') {
    return {
      hidden: {
        opacity: 0,
        y: value,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration,
          ease: easeOut,
        },
      },
      exit: {
        opacity: 0,
        y: value / 2,
        transition: {
          duration: duration * 0.66,
          ease: easeIn,
        },
      },
    };
  } else {
    return {
      hidden: {
        opacity: 0,
        x: value,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration,
          ease: easeOut,
        },
      },
      exit: {
        opacity: 0,
        x: value / 2,
        transition: {
          duration: duration * 0.66,
          ease: easeIn,
        },
      },
    };
  }
};
