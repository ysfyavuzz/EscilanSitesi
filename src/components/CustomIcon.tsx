import React from 'react';
import { twMerge } from 'tailwind-merge';
import { LucideIcon } from 'lucide-react';

interface CustomIconProps {
  icon: LucideIcon;
  active?: boolean;
  size?: number;
  className?: string;
  variant?: 'nav' | 'feature' | 'hero';
}

export const CustomIcon: React.FC<CustomIconProps> = ({ 
  icon: Icon, 
  active, 
  size = 24, 
  className = '', 
  variant = 'nav' 
}) => {
  if (!Icon) return null;

  // Variant: 'nav' (default pill shape)
  if (variant === 'nav') {
    return (
      <div className={twMerge(
        "relative inline-flex items-center justify-center transition-all duration-300",
        active ? "text-primary drop-shadow-[0_0_8px_rgba(var(--color-primary),0.6)]" : "text-slate-400 hover:text-slate-200",
        className
      )}>
        {active && (
            <span className="absolute inset-0 bg-primary/20 blur-md rounded-full pointer-events-none transform scale-150 opacity-100 animate-pulse-slow"></span>
        )}
        <Icon size={size} strokeWidth={active ? 2.5 : 2} />
      </div>
    );
  }

  // Variant: 'feature' (larger, boxed, for feature cards)
  if (variant === 'feature') {
    return (
        <div className={twMerge(
            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300",
            "bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg",
            "group-hover:scale-110 group-hover:rotate-3 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(var(--color-primary),0.3)]",
            className
        )}>
            <Icon 
                size={size} 
                className="text-primary group-hover:text-white transition-colors duration-300 drop-shadow-[0_0_5px_rgba(var(--color-primary),0.5)]" 
                strokeWidth={2}
            />
        </div>
    );
  }

    // Default fallback
    return <Icon size={size} className={className} />;
};
