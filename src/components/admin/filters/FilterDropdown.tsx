/**
 * FilterDropdown Component
 *
 * Glassmorphism efekti ile dropdown component'i.
 * Şehir seçimi ve diğer filtreler için kullanılır.
 *
 * @module components/admin/filters/FilterDropdown
 * @category Components - Admin Filters
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Search } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
  disabled?: boolean;
}

export interface FilterDropdownProps {
  /** Seçenekler */
  options: DropdownOption[];
  /** Seçili değer */
  value?: string | string[];
  /** Çoklu seçim */
  multiSelect?: boolean;
  /** Placeholder */
  placeholder?: string;
  /** Değer değiştiğinde */
  onChange?: (value: string | string[]) => void;
  /** Icon */
  icon?: React.ReactNode;
  /** Label */
  label?: string;
  /** Ekstra class'lar */
  className?: string;
  /** Arama özelliği */
  searchable?: boolean;
  /** Glassmorphism efekti */
  glassmorphism?: boolean;
}

export function FilterDropdown({
  options,
  value,
  multiSelect = false,
  placeholder = 'Seçiniz',
  onChange,
  icon,
  label,
  className,
  searchable = false,
  glassmorphism = true,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options;
    const query = searchQuery.toLowerCase();
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(query) ||
        option.value.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);

  const handleSelect = (optionValue: string) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];
      onChange?.(newValues);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
    }
    setSearchQuery('');
  };

  const isSelected = (optionValue: string) => {
    if (multiSelect) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  const getDisplayValue = () => {
    if (multiSelect) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return placeholder;
      }
      if (Array.isArray(value) && value.length === 1) {
        return options.find((o) => o.value === value[0])?.label || placeholder;
      }
      return `${value.length} seçildi`;
    }
    return options.find((o) => o.value === value)?.label || placeholder;
  };

  return (
    <div className={cn('relative', className)}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-muted-foreground mb-2">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between gap-3',
          'px-4 py-3 rounded-xl',
          'border border-border/50',
          'bg-background/80 backdrop-blur-sm',
          'hover:border-primary/50 hover:bg-accent/5',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          glassmorphism && [
            'bg-white/95 backdrop-blur-xl',
            'border border-white/20',
            'shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
            'hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]',
          ],
          isOpen && 'ring-2 ring-primary ring-offset-2'
        )}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span className="truncate text-left font-medium">
            {getDisplayValue()}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute z-50 w-full mt-2 rounded-xl',
              'border border-border/50 shadow-lg',
              'max-h-[300px] overflow-hidden',
              'flex flex-col',
              glassmorphism && [
                'bg-white/95 backdrop-blur-xl',
                'border border-white/20',
                'shadow-[0_8px_32px_rgba(0,0,0,0.1)]',
              ]
            )}
          >
            {/* Search Input */}
            {searchable && (
              <div className="p-3 border-b border-border/50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      'w-full pl-10 pr-4 py-2',
                      'rounded-lg border border-border/50',
                      'bg-background/50 backdrop-blur-sm',
                      'focus:outline-none focus:ring-2 focus:ring-primary',
                      'text-sm'
                    )}
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="overflow-y-auto py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  Sonuç bulunamadı
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const selected = isSelected(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelect(option.value)}
                      disabled={option.disabled}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3',
                        'transition-colors duration-150',
                        'hover:bg-accent/50',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        selected && 'bg-primary/10'
                      )}
                    >
                      {/* Checkbox (multi-select) */}
                      {multiSelect && (
                        <div
                          className={cn(
                            'w-5 h-5 rounded border-2 flex items-center justify-center',
                            'transition-colors duration-150',
                            selected
                              ? 'bg-primary border-primary'
                              : 'border-border bg-background'
                          )}
                        >
                          {selected && (
                            <Check className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                      )}

                      {/* Icon */}
                      {option.icon && (
                        <span className="flex-shrink-0">{option.icon}</span>
                      )}

                      {/* Label */}
                      <span className="flex-1 text-left text-sm font-medium">
                        {option.label}
                      </span>

                      {/* Count */}
                      {option.count !== undefined && (
                        <span className="text-xs text-muted-foreground">
                          {option.count}
                        </span>
                      )}

                      {/* Radio Indicator (single-select) */}
                      {!multiSelect && selected && (
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer (multi-select actions) */}
            {multiSelect && Array.isArray(value) && value.length > 0 && (
              <div className="p-3 border-t border-border/50 flex gap-2">
                <button
                  onClick={() => {
                    onChange?.([]);
                    setIsOpen(false);
                  }}
                  className="flex-1 px-3 py-2 text-sm font-medium rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  Temizle
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-3 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Uygula ({value.length})
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Compact Dropdown - daha küçük versiyon
 */
export interface FilterDropdownCompactProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  glassmorphism?: boolean;
}

export function FilterDropdownCompact({
  options,
  value,
  onChange,
  placeholder = 'Seçiniz',
  className,
  glassmorphism = true,
}: FilterDropdownCompactProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2',
          'rounded-lg border border-border/50',
          'text-sm font-medium',
          'hover:border-primary/50',
          'transition-all duration-200',
          glassmorphism && [
            'bg-white/95 backdrop-blur-xl',
            'border border-white/20',
            'shadow-sm',
          ]
        )}
      >
        <span className="truncate max-w-[120px]">
          {options.find((o) => o.value === value)?.label || placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3 h-3 text-muted-foreground flex-shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute z-50 w-full mt-1 rounded-lg',
              'border border-border/50 shadow-lg',
              'overflow-hidden',
              glassmorphism && [
                'bg-white/95 backdrop-blur-xl',
                'border border-white/20',
                'shadow-[0_8px_32px_rgba(0,0,0,0.1)]',
              ]
            )}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm',
                  'hover:bg-accent/50 transition-colors',
                  value === option.value && 'bg-primary/10'
                )}
              >
                {option.icon && <span className="mr-2">{option.icon}</span>}
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
