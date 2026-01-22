/**
 * RangeSlider Component
 *
 * Dual-thumb range slider component'i.
 * Boy ve kilo için min-max aralık seçimi.
 *
 * @module components/admin/filters/RangeSlider
 * @category Components - Admin Filters
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export interface RangeSliderProps {
  /** Minimum değer */
  min: number;
  /** Maksimum değer */
  max: number;
  /** Seçili değerler [min, max] */
  value: [number, number];
  /** Değer değiştiğinde */
  onChange?: (value: [number, number]) => void;
  /** Değişim bittiğinde (debounce sonrası) */
  onChangeComplete?: (value: [number, number]) => void;
  /** Adım boyutu */
  step?: number;
  /** Birim gösterimi */
  unit?: string;
  /** Icon */
  icon?: React.ReactNode;
  /** Label */
  label?: string;
  /** Ekstra class'lar */
  className?: string;
  /** Debounce süresi (ms) */
  debounceMs?: number;
}

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  onChangeComplete,
  step = 1,
  unit = '',
  icon,
  label,
  className,
  debounceMs = 300,
}: RangeSliderProps) {
  const [localValue, setLocalValue] = React.useState<[number, number]>(value);
  const [isDragging, setIsDragging] = React.useState<'min' | 'max' | null>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();

  // Sync external value changes
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const getPercentageFromValue = React.useCallback(
    (val: number) => {
      return ((val - min) / (max - min)) * 100;
    },
    [min, max]
  );

  const getValueFromPosition = React.useCallback(
    (clientX: number): number => {
      if (!sliderRef.current) return min;

      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = (clientX - rect.left) / rect.width;
      const clampedPercentage = Math.max(0, Math.min(1, percentage));
      const rawValue = min + clampedPercentage * (max - min);

      // Snap to step
      const steppedValue =
        Math.round(rawValue / step) * step;

      return Math.max(min, Math.min(max, steppedValue));
    },
    [min, max, step]
  );

  const handleMouseDown = React.useCallback(
    (thumb: 'min' | 'max') => (e: React.MouseEvent) => {
      setIsDragging(thumb);
    },
    []
  );

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newValue = getValueFromPosition(e.clientX);

      setLocalValue((prev) => {
        let newVal: [number, number];

        if (isDragging === 'min') {
          newVal = [Math.min(newValue, prev[1] - step), prev[1]];
        } else {
          newVal = [prev[0], Math.max(newValue, prev[0] + step)];
        }

        // Debounce için timeout yönetimi
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          onChangeComplete?.(newVal);
        }, debounceMs);

        onChange?.(newVal);
        return newVal;
      });
    },
    [isDragging, getValueFromPosition, step, onChange, onChangeComplete, debounceMs]
  );

  const handleMouseUp = React.useCallback(() => {
    if (isDragging && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      onChangeComplete?.(localValue);
    }
    setIsDragging(null);
  }, [isDragging, localValue, onChangeComplete]);

  // Touch event handlers
  const handleTouchStart = React.useCallback(
    (thumb: 'min' | 'max') => (e: React.TouchEvent) => {
      e.preventDefault();
      setIsDragging(thumb);
    },
    []
  );

  const handleTouchMove = React.useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      const newValue = getValueFromPosition(touch.clientX);

      setLocalValue((prev) => {
        let newVal: [number, number];

        if (isDragging === 'min') {
          newVal = [Math.min(newValue, prev[1] - step), prev[1]];
        } else {
          newVal = [prev[0], Math.max(newValue, prev[0] + step)];
        }

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          onChangeComplete?.(newVal);
        }, debounceMs);

        onChange?.(newVal);
        return newVal;
      });
    },
    [isDragging, getValueFromPosition, step, onChange, onChangeComplete, debounceMs]
  );

  // Global event listeners
  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const minPercent = getPercentageFromValue(localValue[0]);
  const maxPercent = getPercentageFromValue(localValue[1]);

  return (
    <div className={cn('space-y-3', className)}>
      {/* Header */}
      {(label || icon) && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-sm">
            {icon}
            {label}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-primary">
              {localValue[0]}{unit}
            </span>
            <span>─</span>
            <span className="font-medium text-primary">
              {localValue[1]}{unit}
            </span>
          </div>
        </div>
      )}

      {/* Slider Track */}
      <div
        ref={sliderRef}
        className="relative h-2 bg-muted rounded-full cursor-pointer select-none"
        onClick={(e) => {
          const newValue = getValueFromPosition(e.clientX);
          const distanceToMin = Math.abs(newValue - localValue[0]);
          const distanceToMax = Math.abs(newValue - localValue[1]);

          if (distanceToMin < distanceToMax) {
            const newVal: [number, number] = [
              Math.min(newValue, localValue[1] - step),
              localValue[1],
            ];
            setLocalValue(newVal);
            onChange?.(newVal);
            onChangeComplete?.(newVal);
          } else {
            const newVal: [number, number] = [
              localValue[0],
              Math.max(newValue, localValue[0] + step),
            ];
            setLocalValue(newVal);
            onChange?.(newVal);
            onChangeComplete?.(newVal);
          }
        }}
      >
        {/* Active Range */}
        <motion.div
          className="absolute h-full bg-primary rounded-full"
          initial={false}
          animate={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {/* Min Thumb */}
        <motion.button
          type="button"
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full',
            'border-2 border-background shadow-md',
            'cursor-grab active:cursor-grabbing',
            'hover:scale-110 active:scale-95 transition-transform',
            isDragging === 'min' && 'scale-110 ring-2 ring-offset-2 ring-primary'
          )}
          style={{ left: `${minPercent}%`, marginLeft: '-10px' }}
          onMouseDown={handleMouseDown('min')}
          onTouchStart={handleTouchStart('min')}
          aria-label={`Minimum değer: ${localValue[0]}${unit}`}
          animate={{
            backgroundColor: isDragging === 'min' ? 'var(--primary)' : '#fff',
          }}
        />

        {/* Max Thumb */}
        <motion.button
          type="button"
          className={cn(
            'absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full',
            'border-2 border-background shadow-md',
            'cursor-grab active:cursor-grabbing',
            'hover:scale-110 active:scale-95 transition-transform',
            isDragging === 'max' && 'scale-110 ring-2 ring-offset-2 ring-primary'
          )}
          style={{ left: `${maxPercent}%`, marginLeft: '-10px' }}
          onMouseDown={handleMouseDown('max')}
          onTouchStart={handleTouchStart('max')}
          aria-label={`Maksimum değer: ${localValue[1]}${unit}`}
          animate={{
            backgroundColor: isDragging === 'max' ? 'var(--primary)' : '#fff',
          }}
        />
      </div>

      {/* Range Labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Min: {min}{unit}</span>
        <span>Maks: {max}{unit}</span>
      </div>
    </div>
  );
}

/**
 * Basit versiyon - tek değer için
 */
export interface SimpleSliderProps {
  min: number;
  max: number;
  value: number;
  onChange?: (value: number) => void;
  step?: number;
  unit?: string;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

export function SimpleSlider({
  min,
  max,
  value,
  onChange,
  step = 1,
  unit = '',
  icon,
  label,
  className,
}: SimpleSliderProps) {
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleClick = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clickPercentage = (e.clientX - rect.left) / rect.width;
    const rawValue = min + clickPercentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));

    onChange?.(clampedValue);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {(label || icon) && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium text-sm">
            {icon}
            {label}
          </div>
          <span className="text-sm font-medium text-primary">
            {value}
            {unit}
          </span>
        </div>
      )}

      <div
        ref={sliderRef}
        className="relative h-2 bg-muted rounded-full cursor-pointer select-none"
        onClick={handleClick}
      >
        <motion.div
          className="absolute h-full bg-primary rounded-full"
          initial={false}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        <motion.button
          type="button"
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-primary shadow-md"
          style={{ left: `${percentage}%`, marginLeft: '-8px' }}
          aria-label={`Değer: ${value}${unit}`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        />
      </div>
    </div>
  );
}
