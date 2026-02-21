/**
 * Advanced Filter Panel Component
 * 
 * Escort ilanları için gelişmiş filtreleme sistemi.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'range' | 'select';
  options?: FilterOption[];
  min?: number;
  max?: number;
  step?: number;
}

interface AdvancedFilterPanelProps {
  onFilterChange?: (filters: Record<string, any>) => void;
  onReset?: () => void;
  className?: string;
}

import { TURKEY_LOCATIONS, getDistrictsByCity } from '@/data/locations';
import { mockEscorts } from '@/data/mockData';

// Sistemde aktif ilanı bulunan benzersiz şehir ve ilçeleri ayıklar (küçük harfe çevirerek)
const activeCityNames = Array.from(new Set(mockEscorts.map(e => e.city?.toLowerCase()).filter(Boolean)));
const activeDistrictNames = Array.from(new Set(mockEscorts.map(e => e.district?.toLowerCase()).filter(Boolean)));

const defaultFilters: FilterSection[] = [
  {
    id: 'city',
    title: 'Şehir Seçimi',
    type: 'select',
    // Sadece aktif ilanı bulunan şehirleri dropdown'a aktarır
    options: TURKEY_LOCATIONS
      .filter(c => activeCityNames.includes(c.name.toLowerCase()) || activeCityNames.includes(c.slug))
      .map(c => ({ id: c.slug, label: c.name, value: c.slug }))
  },
  {
    id: 'district',
    title: 'İlçe',
    type: 'select',
    // İlk renderda options boş olabilir, onChange ile dinamik dolacak veya özel render edilecek
    options: []
  },
  { id: 'age', title: 'Yaş', type: 'range', min: 18, max: 60, step: 1 },
  { id: 'height', title: 'Boy (cm)', type: 'range', min: 140, max: 190, step: 1 },
  { id: 'weight', title: 'Kilo (kg)', type: 'range', min: 40, max: 100, step: 1 },
  {
    id: 'hairColor',
    title: 'Saç Rengi',
    type: 'checkbox',
    options: [
      { id: 'blonde', label: 'Sarı', value: 'blonde' },
      { id: 'brunette', label: 'Kahverengi', value: 'brunette' },
      { id: 'black', label: 'Siyah', value: 'black' },
      { id: 'red', label: 'Kızıl', value: 'red' },
    ],
  },
  {
    id: 'services',
    title: 'Hizmet Türleri',
    type: 'checkbox',
    options: [
      { id: 'outcall', label: 'Outcall', value: 'outcall' },
      { id: 'incall', label: 'Incall', value: 'incall' },
      { id: 'travel', label: 'Seyahat', value: 'travel' },
      { id: 'video', label: 'Video', value: 'video' },
    ],
  },
];

export const AdvancedFilterPanel: React.FC<AdvancedFilterPanelProps> = ({
  onFilterChange,
  onReset,
  className = ''
}) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [expandedSections, setExpandedSections] = useState<string[]>(['age', 'services']);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const toggleSection = (id: string) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleCheckboxChange = (sectionId: string, value: string) => {
    const currentValues = activeFilters[sectionId] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value];

    const newFilters = { ...activeFilters, [sectionId]: newValues };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleRangeChange = (sectionId: string, value: number) => {
    const newFilters = { ...activeFilters, [sectionId]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleReset = () => {
    setActiveFilters({});
    onReset?.();
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex justify-between items-center mb-8">
        <h3 className={`text-xs font-black uppercase tracking-[0.3em] ${isDark ? 'text-white' : 'text-orange-950'}`}>
          Filtreler
        </h3>
        <button
          onClick={handleReset}
          className="text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity"
        >
          Sıfırla
        </button>
      </div>

      <div className="space-y-8">
        {defaultFilters.map((section) => (
          <div key={section.id} className="space-y-4">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex justify-between items-center group"
            >
              <span className={`text-[10px] font-black uppercase tracking-widest transition-colors
                ${expandedSections.includes(section.id) ? 'text-primary' : (isDark ? 'text-white/60' : 'text-orange-950/60')}`}>
                {section.title}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${expandedSections.includes(section.id) ? 'rotate-180 text-primary' : 'text-white/20'
                  }`}
              />
            </button>

            <AnimatePresence>
              {expandedSections.includes(section.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {section.type === 'select' && (
                    <div className="pt-2 px-1">
                      <select
                        value={activeFilters[section.id] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          const newFilters = { ...activeFilters, [section.id]: val };

                          // Eğer şehir değişiyorsa ilçeyi sıfırla
                          if (section.id === 'city') {
                            newFilters['district'] = '';
                          }

                          setActiveFilters(newFilters);
                          onFilterChange?.(newFilters);
                        }}
                        className={`w-full p-3 rounded-xl border outline-none cursor-pointer transition-all font-black uppercase tracking-widest text-[10px] appearance-none
                          ${isDark ? 'bg-white/5 border-white/10 text-white hover:border-white/20' : 'bg-black/5 border-black/10 text-orange-950 hover:border-black/20'}`}
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                      >
                        <option value="" className={isDark ? "bg-[#0f172a] text-white" : "text-black"}>Tümü</option>

                        {/* District için özel logic, city üzerinden ilçeleri bul */}
                        {section.id === 'district' ? (
                          (activeFilters['city'] ? getDistrictsByCity(activeFilters['city']) : [])
                            .filter(dist => activeDistrictNames.includes(dist.name.toLowerCase()) || activeDistrictNames.includes(dist.slug))
                            .map(dist => (
                              <option key={dist.slug} value={dist.slug} className={isDark ? "bg-[#0f172a] text-white" : "text-black"}>
                                {dist.name}
                              </option>
                            ))
                        ) : (
                          section.options?.map(opt => (
                            <option key={opt.id} value={opt.value} className={isDark ? "bg-[#0f172a] text-white" : "text-black"}>
                              {opt.label}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                  )}

                  {section.type === 'checkbox' && section.options && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      {section.options.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all
                            ${(activeFilters[section.id] || []).includes(option.value)
                              ? 'bg-primary/10 border-primary text-primary'
                              : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                            }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={(activeFilters[section.id] || []).includes(option.value)}
                            onChange={() => handleCheckboxChange(section.id, option.value)}
                          />
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${(activeFilters[section.id] || []).includes(option.value)
                            ? 'bg-primary border-primary'
                            : 'bg-white/10 border-white/20'
                            }`}>
                            {(activeFilters[section.id] || []).includes(option.value) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {section.type === 'range' && (
                    <div className="space-y-6 pt-4 px-1">
                      <input
                        type="range"
                        min={section.min}
                        max={section.max}
                        step={section.step}
                        value={activeFilters[section.id] || section.min}
                        onChange={(e) => handleRangeChange(section.id, parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/30">
                        <span>{section.min}</span>
                        <span className="text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                          {activeFilters[section.id] || section.min}
                        </span>
                        <span>{section.max}</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <button
          onClick={() => onFilterChange?.(activeFilters)}
          className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] italic shadow-xl shadow-primary/20 transition-all active:scale-95"
        >
          Sonuçları Filtrele
        </button>
      </div>
    </div>
  );
};
