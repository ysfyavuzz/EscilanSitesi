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