import React from 'react';
import { CosmicNav } from '@/components/CosmicNav';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Link } from 'wouter';

export default function Home(): JSX.Element {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <div className="w-full max-w-7xl px-6 pt-32 md:pt-48 pb-10 md:pb-20 content-layer pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <div className={`inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-2 md:py-3 rounded-full border transition-all duration-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-8 md:mb-12 shadow-2xl
            ${isDark 
              ? 'bg-violet-500/10 border-violet-500/20 text-violet-400' 
              : 'bg-orange-500/10 border-orange-500/20 text-orange-600'}`}>
            <Sparkles className="w-3 h-3 md:w-4 h-4 animate-pulse" /> KOZMİK DENEYİM AKTİF
          </div>
          
          <h1 className={`text-5xl sm:text-7xl md:text-[10rem] lg:text-[14rem] font-black tracking-tighter uppercase italic leading-[0.9] md:leading-[0.8] text-3d transition-colors duration-1000 mb-6 md:mb-8
            ${isDark ? 'text-white' : 'text-orange-950'}`}>
            ZÜHRE<br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r animate-gradient
              ${isDark 
                ? 'from-violet-400 via-fuchsia-500 to-indigo-600' 
                : 'from-orange-500 via-amber-500 to-red-600'}`}>PLANET</span>
          </h1>
          
          <p className={`mt-4 md:mt-8 text-[8px] md:text-xl font-black tracking-[0.4em] md:tracking-[0.8em] uppercase transition-colors duration-500 italic
            ${isDark ? 'text-violet-200/40' : 'text-orange-900/50'}`}>
            Galaksiler Arası Yolculuğa Hazır Mısın?
          </p>
        </motion.div>
      </div>

      {/* Spacer for 3D View */}
      <div className="h-[30vh] md:h-[40vh] w-full pointer-events-none" />

      {/* Interactive Bottom Layer */}
      <div className="w-full flex flex-col items-center gap-16 md:gap-24 content-layer relative z-20">
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="pointer-events-auto px-6 w-full max-w-xs md:max-w-none flex justify-center"
        >
          <Link href="/escorts">
            <button className="group relative w-full md:w-auto px-10 md:px-16 py-6 md:py-8 bg-primary text-white rounded-[1.5rem] md:rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] italic shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4">
              <span className="relative z-10">YÖRÜNGEYE GİR</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </Link>
        </motion.div>

        <div className="w-full pointer-events-auto">
          <Footer />
        </div>

        <CosmicNav />
      </div>
    </div>
  );
}
