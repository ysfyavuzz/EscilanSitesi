import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();
  const isDark = actualTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-500 glass-panel border-none
        ${isDark ? 'bg-violet-950/50' : 'bg-orange-200/50'}`}
      aria-label="Tema değiştir"
    >
      <motion.div
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg
          ${isDark ? 'bg-violet-500' : 'bg-orange-500'}`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-white" />
        ) : (
          <Sun className="w-3 h-3 text-white" />
        )}
      </motion.div>
      
      {/* Background Glow */}
      <div className={`absolute inset-0 rounded-full blur-md opacity-30 transition-colors duration-500
        ${isDark ? 'bg-violet-500' : 'bg-orange-500'}`} />
    </motion.button>
  );
}

export default ThemeToggle;
