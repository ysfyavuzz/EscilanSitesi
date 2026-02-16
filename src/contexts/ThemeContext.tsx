import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { PLANETS, PlanetTheme } from '@/data/planets';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
  planetTheme: PlanetTheme | null;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'escort-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return (stored as Theme) || 'system';
  });

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');
  const [planetTheme, setPlanetTheme] = useState<PlanetTheme | null>(null);

  // Update actual theme based on preference
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let resolvedTheme: 'light' | 'dark';

    if (theme === 'system') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      resolvedTheme = theme;
    }

    setActualTheme(resolvedTheme);
    root.classList.add(resolvedTheme);
  }, [theme]);

  // Update planet theme based on location
  useEffect(() => {
    const currentPlanet = PLANETS.find(p => p.path === location);
    if (currentPlanet) {
      setPlanetTheme(currentPlanet.theme);
      // CSS variables for dynamic coloring
      const root = window.document.documentElement;
      root.style.setProperty('--primary', currentPlanet.theme.glow);
      root.style.setProperty('--primary-rgb', hexToRgb(currentPlanet.theme.glow));
    }
  }, [location]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '124, 58, 237';
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme, planetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
