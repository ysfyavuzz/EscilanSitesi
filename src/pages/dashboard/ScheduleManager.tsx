/**
 * Schedule Manager (Zaman Bükücü)
 * 
 * Escortların haftalık çalışma saatlerini ve müsaitlik durumlarını
 * yönettiği interaktif takvim arayüzü.
 */

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  Calendar as CalendarIcon, Clock, Save, 
  Check, X, Globe, Power
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const DAYS = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const HOURS = Array.from({ length: 15 }, (_, i) => i + 10); // 10:00 - 24:00 arası (Basitleştirilmiş)

export default function ScheduleManager() {
  // Mock Data: 2 boyutlu matris gibi düşünülebilir [dayIndex][hour]
  // Gerçekte API'den gelecek.
  const [schedule, setSchedule] = useState<Record<string, boolean>>({});
  const [isAway, setIsAway] = useState(false);

  const toggleSlot = (dayIdx: number, hour: number) => {
    const key = `${dayIdx}-${hour}`;
    setSchedule(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isSlotActive = (dayIdx: number, hour: number) => {
    return !!schedule[`${dayIdx}-${hour}`];
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-orbitron text-white flex items-center gap-2">
              <CalendarIcon className="w-6 h-6 text-purple-400" />
              Zaman Yönetimi
            </h1>
            <p className="text-gray-400 text-sm">Müşterilerinizin randevu alabileceği saatleri belirleyin.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-black/20 px-3 py-2 rounded-xl border border-white/10">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-gray-300">Müsait</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-3 py-2 rounded-xl border border-white/10">
              <span className="w-3 h-3 rounded-full bg-white/10 border border-white/20" />
              <span className="text-xs text-gray-300">Kapalı</span>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-500">
              <Save className="w-4 h-4 mr-2" />
              Kaydet
            </Button>
          </div>
        </div>

        {/* --- Turne / Away Mode --- */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-500/10">
              <Globe className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h3 className="text-white font-bold">Turne / Tatil Modu</h3>
              <p className="text-sm text-gray-400">Aktif ettiğinizde tüm takviminiz "Meşgul" olarak görünür.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${isAway ? 'text-amber-400' : 'text-gray-500'}`}>
              {isAway ? 'AKTİF' : 'PASİF'}
            </span>
            <button 
              onClick={() => setIsAway(!isAway)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${isAway ? 'bg-amber-500' : 'bg-gray-700'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isAway ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* --- Calendar Grid --- */}
        <div className={`bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 overflow-x-auto ${isAway ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
          <div className="min-w-[800px]">
            {/* Header Row (Hours) */}
            <div className="grid grid-cols-16 gap-1 mb-2">
              <div className="w-24 text-gray-500 text-xs font-bold uppercase tracking-widest text-right pr-4 pt-2">Günler</div>
              {HOURS.map(h => (
                <div key={h} className="text-center text-xs text-gray-500 font-mono">
                  {h}:00
                </div>
              ))}
            </div>

            {/* Days Rows */}
            {DAYS.map((day, dIdx) => (
              <div key={day} className="flex items-center gap-1 mb-1 group">
                <div className="w-24 text-right pr-4 text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                  {day}
                </div>
                <div className="flex-1 grid grid-cols-15 gap-1">
                  {HOURS.map(h => {
                    const active = isSlotActive(dIdx, h);
                    return (
                      <motion.button
                        key={h}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleSlot(dIdx, h)}
                        className={`
                          h-10 rounded-md transition-all border
                          ${active 
                            ? 'bg-green-500/20 border-green-500/40 hover:bg-green-500/30' 
                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                          }
                        `}
                      >
                        {active && (
                          <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }}
                            className="w-full h-full flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-green-400" />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
