/**
 * Typing Indicator Component
 *
 * Kullanıcının yazıyor olduğunu gösteren animasyonlu gösterge.
 * 3 nokta animasyonu ile typing efekti gösterir.
 *
 * @module components/TypingIndicator
 * @category Components - Chat
 *
 * Features:
 * - Animasyonlu 3 nokta göstergesi
 * - Kullanıcı adı gösterimi
 * - Fade in/out animasyonu
 * - Birden fazla kullanıcı desteği
 * - Responsive tasarım
 * - Dark mode uyumlu
 *
 * @example
 * ```tsx
 * <TypingIndicator
 *   users={[
 *     { id: '1', name: 'Ayşe', avatar: '/avatars/ayse.jpg' },
 *     { id: '2', name: 'Zeynep' }
 *   ]}
 * />
 * ```
 */

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TypingUser {
  id: string;
  name: string;
  avatar?: string;
}

export interface TypingIndicatorProps {
  /**
   * Yazıyor olan kullanıcılar
   */
  users: TypingUser[];

  /**
   * Ek CSS sınıfları
   */
  className?: string;

  /**
   * Gösterge boyutu
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Avatar gösterilsin mi?
   */
  showAvatar?: boolean;
}

/**
 * TypingIndicator Component
 *
 * Animasyonlu typing indicator gösterir.
 */
export function TypingIndicator({
  users,
  className,
  size = 'md',
  showAvatar = true,
}: TypingIndicatorProps) {
  if (users.length === 0) return null;

  // Format typing text
  const typingText = users.length === 1
    ? `${users[0].name} yazıyor...`
    : users.length === 2
    ? `${users[0].name} ve ${users[1].name} yazıyor...`
    : `${users[0].name} ve ${users.length - 1} kişi daha yazıyor...`;

  // Size classes
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const dotSizeClasses = {
    sm: 'h-1 w-1',
    md: 'h-1.5 w-1.5',
    lg: 'h-2 w-2',
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'flex items-center gap-2 px-3 py-2',
          sizeClasses[size],
          className
        )}
      >
        {/* Avatar */}
        {showAvatar && users[0].avatar && (
          <img
            src={users[0].avatar}
            alt={users[0].name}
            className="h-6 w-6 rounded-full object-cover"
          />
        )}

        {/* Text */}
        <span className="text-muted-foreground font-medium">
          {typingText}
        </span>

        {/* Animated dots */}
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={cn(
                'rounded-full bg-muted-foreground',
                dotSizeClasses[size]
              )}
              animate={{
                y: [0, -4, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Compact typing indicator (just dots, no text)
 */
export interface CompactTypingIndicatorProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CompactTypingIndicator({
  className,
  size = 'md',
}: CompactTypingIndicatorProps) {
  const dotSizeClasses = {
    sm: 'h-1 w-1',
    md: 'h-1.5 w-1.5',
    lg: 'h-2 w-2',
  };

  const gapClasses = {
    sm: 'gap-0.5',
    md: 'gap-1',
    lg: 'gap-1.5',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'inline-flex items-center',
        gapClasses[size],
        className
      )}
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn(
            'rounded-full bg-muted-foreground',
            dotSizeClasses[size]
          )}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </motion.div>
  );
}
