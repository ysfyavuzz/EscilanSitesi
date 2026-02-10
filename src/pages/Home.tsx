/**
 * Home Page - Ana Sayfa
 * 
 * Platform ana sayfası - Artık kozmik 3D navigasyon sistemini içerir.
 * VIP vitrini, özellik kartları, son ilanlar ve üyelik CTA bölümleri yerine
 * ana gezegen ve etrafındaki escort gezegenleri ile etkileşim sağlanır.
 * 
 * @module pages/Home
 * @category Pages
 */

import React from 'react';
import { SpaceBackground } from '@/components/SpaceBackground';
import { CosmicNav } from '@/components/CosmicNav'; // CosmicNav'ı import et
import { Footer } from '@/components/Footer'; // Footer'ı import et

/**
 * Ana sayfa bileşeni
 * 
 * @returns {JSX.Element} Render edilmiş ana sayfa
 */
export default function Home(): JSX.Element {
  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* 3D Uzay Arka Planı ve Navigasyon Sistemi */}
      <SpaceBackground />

      {/* Ön plandaki UI elemanları */}
      <div className="relative z-10 p-4">
        {/* Navigasyon veya diğer UI elemanları buraya eklenebilir */}
        <h1 className="text-4xl text-white text-center mt-10">Zühre Gezegeni: Escort İlanları</h1>
        <p className="text-lg text-white text-center mt-4">Gezegenlere tıklayarak profilleri keşfet!</p>
      </div>

      <Footer />
      <CosmicNav />
    </div>
  );
}