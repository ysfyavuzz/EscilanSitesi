/**
 * VisualFilterItem Component
 *
 * Görselli filtre item component'i.
 * Renkli seçenekler için emoji icon ve renk göstergesi ile birlikte clickable item.
 *
 * @module components/admin/filters/VisualFilterItem
 * @category Components - Admin Filters
 */

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface VisualFilterItemProps {
  /** Seçenek değeri */
  value: string;
  /** Görüntülenecek etiket */
  label: string;
  /** Renk kodu (hex) */
  color: string;
  /** Emoji icon */
  icon: string;
  /** Seçili mi? */
  selected?: boolean;
  /** Seçenek sayısı (opsiyonel) */
  count?: number;
  /** Seçim değiştiğinde */
  onChange?: (value: string, selected: boolean) => void;
  /** Ekstra class'lar */
  className?: string;
}

export function VisualFilterItem({
  value,
  label,
  color,
  icon,
  selected = false,
  count,
  onChange,
  className,
}: VisualFilterItemProps) {
  const handleClick = React.useCallback(() => {
    onChange?.(value, !selected);
  }, [value, selected, onChange]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Badge
        variant={selected ? 'default' : 'outline'}
        className={cn(
          'cursor-pointer transition-all duration-200 hover:opacity-80',
          'px-3 py-2 text-sm font-medium',
          'flex items-center gap-2',
          selected && 'ring-2 ring-offset-2',
          className
        )}
        style={{
          borderColor: selected ? color : undefined,
          backgroundColor: selected ? color : undefined,
        }}
        onClick={handleClick}
      >
        {/* Emoji Icon */}
        <span className="text-base">{icon}</span>

        {/* Label */}
        <span className={selected ? 'text-white' : 'text-foreground'}>
          {label}
        </span>

        {/* Count (optional) */}
        {count !== undefined && (
          <span
            className={cn(
              'text-xs ml-1 px-1.5 py-0.5 rounded-full',
              selected
                ? 'bg-white/20 text-white'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {count}
          </span>
        )}
      </Badge>
    </motion.div>
  );
}

/**
 * Compact versiyon - daha küçük, daha yoğun layout
 */
export interface VisualFilterItemCompactProps {
  value: string;
  label: string;
  color: string;
  icon: string;
  selected?: boolean;
  count?: number;
  onChange?: (value: string, selected: boolean) => void;
  className?: string;
}

export function VisualFilterItemCompact({
  value,
  label,
  color,
  icon,
  selected = false,
  count,
  onChange,
  className,
}: VisualFilterItemCompactProps) {
  const handleClick = React.useCallback(() => {
    onChange?.(value, !selected);
  }, [value, selected, onChange]);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative flex items-center gap-1.5 px-2 py-1.5 rounded-lg',
        'border transition-all duration-200',
        'text-xs font-medium',
        selected
          ? 'border-current shadow-md'
          : 'border-border hover:border-primary/50',
        className
      )}
      style={{
        borderColor: selected ? color : undefined,
        color: selected ? color : undefined,
        backgroundColor: selected ? `${color}10` : undefined,
      }}
      onClick={handleClick}
    >
      {/* Icon küçük versiyon */}
      <span className="text-sm">{icon}</span>

      {/* Label */}
      <span>{label}</span>

      {/* Count badge */}
      {count !== undefined && (
        <span className="ml-auto text-[10px] px-1 py-0.5 rounded bg-muted">
          {count}
        </span>
      )}

      {/* Seçili gösterge */}
      {selected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
    </motion.button>
  );
}

/**
 * Grid layout için görselli filtre item
 */
export interface VisualFilterItemGridProps {
  value: string;
  label: string;
  color: string;
  icon: string;
  selected?: boolean;
  count?: number;
  onChange?: (value: string, selected: boolean) => void;
  className?: string;
}

export function VisualFilterItemGrid({
  value,
  label,
  color,
  icon,
  selected = false,
  count,
  onChange,
  className,
}: VisualFilterItemGridProps) {
  const handleClick = React.useCallback(() => {
    onChange?.(value, !selected);
  }, [value, selected, onChange]);

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'relative flex flex-col items-center gap-2 p-3 rounded-xl',
        'border-2 transition-all duration-200',
        'min-w-[80px]',
        selected
          ? 'shadow-lg'
          : 'border-border hover:border-primary/50 hover:shadow-md',
        className
      )}
      style={{
        borderColor: selected ? color : undefined,
        backgroundColor: selected ? `${color}08` : undefined,
      }}
      onClick={handleClick}
    >
      {/* Büyük Icon */}
      <span className="text-3xl">{icon}</span>

      {/* Label */}
      <span className="text-xs font-medium text-center leading-tight">
        {label}
      </span>

      {/* Count badge */}
      {count !== undefined && (
        <span className="absolute top-1 right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-background shadow-sm">
          {count}
        </span>
      )}

      {/* Seçili check icon */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white shadow-md"
          style={{ backgroundColor: color }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}
