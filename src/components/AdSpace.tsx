import React from 'react';
import { twMerge } from 'tailwind-merge';

interface AdSpaceProps {
  position?: 'left' | 'right';
  className?: string;
}

export const AdSpace: React.FC<AdSpaceProps> = ({ position = 'left', className }) => {
  const isLeft = position === 'left';
  
  return (
    <div 
      className={twMerge(
        "fixed top-32 z-[5] hidden 2xl:flex flex-col items-center justify-center gap-4",
        isLeft ? "left-6" : "right-6",
        "w-[160px] h-[600px]",
        "glass-panel border-white/5 bg-slate-900/40 backdrop-blur-sm",
        "transition-all duration-500 hover:bg-slate-900/60 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(var(--color-primary),0.3)]",
        className
      )}
    >
      <div className="text-slate-500 font-mono text-xs tracking-widest rotate-90 absolute right-2 top-8 opacity-50">
        SPONSOR
      </div>
      
      {/* Content Placeholder */}
      <div className="w-[140px] h-[580px] rounded-lg border-2 border-dashed border-slate-700/50 flex flex-col items-center justify-center gap-2 overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-slow"></div>
        <span className="text-slate-600 text-sm font-medium relative z-10 transition-colors group-hover:text-primary">Reklam Alanı</span>
        <span className="text-slate-700 text-xs relative z-10">160x600</span>
      </div>
    </div>
  );
};
