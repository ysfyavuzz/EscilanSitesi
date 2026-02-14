import React from 'react';
import { CosmicNav } from '@/components/CosmicNav';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/**
 * Home Page UI Layer
 */
export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between pointer-events-none select-none">
      
      {/* Başlık Bölümü */}
      <div className="w-full max-w-7xl px-6 pt-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3 h-3" /> Kozmik Deneyim Aktif
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-none drop-shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            ZÜHRE<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient">PLANET</span>
          </h1>
        </motion.div>
      </div>

      {/* Orta Alan (Fareyi Engellememek İçin Boş ve Pointer-None) */}
      <div className="flex-grow w-full" />

      {/* Alt Etkileşim Alanı */}
      <div className="w-full flex flex-col items-center gap-8 pb-12 pointer-events-auto select-auto">
        <div className="w-full max-w-2xl px-6 text-center">
           <p className="text-blue-100/30 text-[10px] md:text-xs font-black uppercase tracking-[0.6em] mb-4">
            Galaksiler Arası Yolculuğa Hazır Mısın?
          </p>
        </div>
        
        <div className="w-full">
          <Footer />
        </div>

        {/* Navigasyon */}
        <CosmicNav />
      </div>
    </div>
  );
}
