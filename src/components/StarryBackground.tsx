import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * StarryBackground - İç sayfalar için premium kozmik arka plan.
 * Hem açık hem de koyu temaları destekler, derinlik hissi verir.
 */
export const StarryBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`fixed inset-0 z-[-1] transition-colors duration-1000 overflow-hidden ${
      isDark ? 'bg-[#020205]' : 'bg-slate-50'
    }`}>
      {/* Nebula / Glow Effects */}
      <div className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] transition-opacity duration-1000 ${
        isDark ? 'bg-purple-900/10 opacity-60' : 'bg-blue-200/30 opacity-40'
      }`} />        
      <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] transition-opacity duration-1000 ${
        isDark ? 'bg-blue-900/10 opacity-60' : 'bg-purple-100/30 opacity-40'
      }`} style={{ animationDelay: '2s' }} />

      {/* Grid Pattern (Açık temada daha belirgin) */}
      {!isDark && (
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      )}

      {/* Stars Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-twinkle ${
              isDark ? 'bg-white' : 'bg-blue-400'
            }`}
            style={{
              width: Math.random() * 2.5 + 'px',
              height: Math.random() * 2.5 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              opacity: isDark ? Math.random() * 0.8 : Math.random() * 0.4
            }}
          />
        ))}
      </div>

      {/* Falling Star Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={`shoot-${i}`}
            className={`absolute w-[2px] h-[100px] -rotate-45 animate-shooting-star ${
              isDark ? 'bg-gradient-to-b from-white to-transparent' : 'bg-gradient-to-b from-blue-400 to-transparent'
            }`}
            style={{
              top: '-10%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 15 + 's',
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes shooting-star {
          0% { transform: translateY(0) translateX(0) rotate(-45deg); opacity: 1; }
          100% { transform: translateY(1000px) translateX(1000px) rotate(-45deg); opacity: 0; }
        }
        .animate-twinkle {
          animation: twinkle 4s infinite ease-in-out;
        }
        .animate-shooting-star {
          animation: shooting-star 10s infinite linear;
        }
      `}} />
    </div>
  );
};
