/**
 * Advanced Filter Panel Component
 * 
 * Escort ilanları için gelişmiş filtreleme sistemi.
 * Yaş, boy, kilo, saç rengi, hizmet türü ve daha birçok filtre seçeneği.
 * 
 * @module components/AdvancedFilterPanel
 * @category Components - Filters
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Check } from 'lucide-react';
import '../styles/premium-theme.css';

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

const defaultFilters: FilterSection[] = [
  {
    id: 'age',
    title: 'Yaş',
    type: 'range',
    min: 18,
    max: 60,
    step: 1,
  },
  {
    id: 'height',
    title: 'Boy (cm)',
    type: 'range',
    min: 140,
    max: 190,
    step: 1,
  },
  {
    id: 'weight',
    title: 'Kilo (kg)',
    type: 'range',
    min: 40,
    max: 100,
    step: 1,
  },
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
      { id: 'outcall', label: 'Outcall (Dışarı)', value: 'outcall' },
      { id: 'incall', label: 'Incall (İçeri)', value: 'incall' },
      { id: 'travel', label: 'Seyahat', value: 'travel' },
      { id: 'video', label: 'Video Sohbet', value: 'video' },
    ],
  },
  {
    id: 'languages',
    title: 'Konuşulan Diller',
    type: 'checkbox',
    options: [
      { id: 'turkish', label: 'Türkçe', value: 'turkish' },
      { id: 'english', label: 'İngilizce', value: 'english' },
      { id: 'russian', label: 'Rusça', value: 'russian' },
      { id: 'german', label: 'Almanca', value: 'german' },
    ],
  },
  {
    id: 'priceRange',
    title: 'Fiyat Aralığı (₺)',
    type: 'range',
    min: 500,
    max: 10000,
    step: 100,
  }
];

export const AdvancedFilterPanel: React.FC<AdvancedFilterPanelProps> = ({
  onFilterChange,
  onReset,
  className = ''
}) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [expandedSections, setExpandedSections] = useState<string[]>(['age', 'services']);

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
    <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden ${className}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          Gelişmiş Filtreler
        </h3>
        <button 
          onClick={handleReset}
          className="text-xs text-primary hover:underline font-medium"
        >
          Sıfırla
        </button>
      </div>

      <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
        {defaultFilters.map((section) => (
          <div key={section.id} className="space-y-3">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex justify-between items-center group"
            >
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                {section.title}
              </span>
              <ChevronDown 
                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                  expandedSections.includes(section.id) ? 'rotate-180' : ''
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
                  {section.type === 'checkbox' && section.options && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {section.options.map((option) => (
                        <label
                          key={option.id}
                          className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                            (activeFilters[section.id] || []).includes(option.value)
                              ? 'bg-primary/10 border-primary text-primary'
                              : 'bg-gray-50 dark:bg-gray-800 border-transparent text-gray-600 dark:text-gray-400 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={(activeFilters[section.id] || []).includes(option.value)}
                            onChange={() => handleCheckboxChange(section.id, option.value)}
                          />
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                            (activeFilters[section.id] || []).includes(option.value)
                              ? 'bg-primary border-primary'
                              : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                          }`}>
                            {(activeFilters[section.id] || []).includes(option.value) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-xs font-medium">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {section.type === 'range' && (
                    <div className="space-y-4 pt-2 px-1">
                      <input
                        type="range"
                        min={section.min}
                        max={section.max}
                        step={section.step}
                        value={activeFilters[section.id] || section.min}
                        onChange={(e) => handleRangeChange(section.id, parseInt(e.target.value))}
                        className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="flex justify-between text-[10px] font-bold text-gray-500">
                        <span>{section.min}</span>
                        <span className="text-primary bg-primary/10 px-2 py-0.5 rounded">
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

      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={() => onFilterChange?.(activeFilters)}
          className="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/20 transition-all active:scale-95"
        >
          Sonuçları Göster
        </button>
      </div>
    </div>
  );
};
