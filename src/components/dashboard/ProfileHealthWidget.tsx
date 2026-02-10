/**
 * Profile Health Widget
 * 
 * Kullanıcıyı profilini tamamlamaya teşvik eden oyunlaştırılmış (gamified) bileşen.
 * Doluluk oranını gösterir ve eksik adımları listeler.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'wouter';

interface ProfileHealthProps {
  score: number; // 0-100
  missingItems: { label: string; href: string }[];
}

export const ProfileHealthWidget: React.FC<ProfileHealthProps> = ({ score, missingItems }) => {
  // Renk Skalası
  const getColor = (s: number) => {
    if (s < 50) return 'text-red-500 bg-red-500';
    if (s < 80) return 'text-amber-500 bg-amber-500';
    return 'text-green-500 bg-green-500';
  };

  const colorClass = getColor(score);
  const strokeColor = score < 50 ? '#ef4444' : score < 80 ? '#f59e0b' : '#22c55e';

  return (
    <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
      {/* Arka Plan Efekti */}
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 rounded-full ${colorClass.split(' ')[1]}`} />

      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            Profil Gücü
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Tamamlanan profil %40 daha fazla görüntülenir.
          </p>
        </div>
        
        {/* Dairesel İlerleme */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="32" cy="32" r="28"
              stroke="currentColor" strokeWidth="4"
              fill="transparent" className="text-gray-800"
            />
            <motion.circle
              initial={{ strokeDasharray: 0 }}
              animate={{ strokeDasharray: `${score * 1.75} 1000` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              cx="32" cy="32" r="28"
              stroke={strokeColor} strokeWidth="4"
              strokeLinecap="round" fill="transparent"
              className="drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
              style={{ strokeDasharray: `${(2 * Math.PI * 28) * (score / 100)} 1000` }}
            />
          </svg>
          <span className="absolute text-sm font-bold text-white">%{score}</span>
        </div>
      </div>

      {/* Eksik Listesi */}
      <div className="space-y-3">
        {missingItems.length > 0 ? (
          missingItems.map((item, idx) => (
            <Link key={idx} href={item.href}>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 cursor-pointer group transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm text-gray-300 group-hover:text-white">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))
        ) : (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="text-sm text-green-400 font-medium">Harika! Profilin eksiksiz.</span>
          </div>
        )}
      </div>

      {/* Ödül Teşviki */}
      {score < 100 && (
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-amber-400 font-medium flex items-center justify-center gap-1">
            <SparklesIcon className="w-3 h-3" />
            Tamamla, <span className="underline">3 Günlük Vitrin</span> kazan!
          </p>
        </div>
      )}
    </div>
  );
};

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
      <path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />
    </svg>
  );
}
