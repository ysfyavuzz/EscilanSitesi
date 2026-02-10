/**
 * Interactions Center (Etkileşim Üssü)
 * 
 * Escort'un müşterileriyle olan tüm etkileşimlerini yönettiği merkez.
 * Randevular, Takipçiler ve Yorumlar.
 */

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Calendar, Star, MessageSquare, 
  CheckCircle2, XCircle, MoreVertical, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function InteractionsCenter() {
  const [activeTab, setActiveTab] = useState('appointments');

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-orbitron text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-pink-400" />
            Etkileşim Üssü
          </h1>
        </div>

        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl mb-8 w-full md:w-auto grid grid-cols-3 md:flex">
            <TabsTrigger value="appointments" className="rounded-lg data-[state=active]:bg-pink-600">
              <Calendar className="w-4 h-4 mr-2" /> Randevular
            </TabsTrigger>
            <TabsTrigger value="fans" className="rounded-lg data-[state=active]:bg-pink-600">
              <Users className="w-4 h-4 mr-2" /> Yörünge (Takipçiler)
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-pink-600">
              <Star className="w-4 h-4 mr-2" /> Değerlendirmeler
            </TabsTrigger>
          </TabsList>

          {/* --- RANDEVULAR --- */}
          <TabsContent value="appointments" className="space-y-4">
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <h3 className="font-bold text-gray-200">Gelecek Randevular</h3>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">2 Aktif</Badge>
              </div>
              
              <div className="divide-y divide-white/5">
                {[1, 2].map((i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-lg">
                        M{i}
                      </div>
                      <div>
                        <div className="font-bold text-white">Müşteri #{i}842</div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-3 h-3" /> 10 Şubat 2026
                          <Clock className="w-3 h-3 ml-2" /> 20:00 (2 Saat)
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/10">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Onayla
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden opacity-80">
              <div className="p-4 border-b border-white/10 bg-white/5">
                <h3 className="font-bold text-gray-400">Geçmiş Randevular</h3>
              </div>
              <div className="p-8 text-center text-gray-500">
                Henüz tamamlanmış randevu bulunmuyor.
              </div>
            </div>
          </TabsContent>

          {/* --- TAKİPÇİLER (ORBIT) --- */}
          <TabsContent value="fans">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:border-pink-500/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10" />
                    <div>
                      <div className="font-bold text-white">User_Delta{i}</div>
                      <div className="text-xs text-gray-500">2 saat önce istek attı</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors">
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* --- YORUMLAR --- */}
          <TabsContent value="reviews">
             <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Henüz Yorum Yok</h3>
                <p className="text-gray-400">Randevularınız tamamlandıkça müşterileriniz buraya yorum bırakabilir.</p>
             </div>
          </TabsContent>

        </Tabs>
      </div>
    </DashboardLayout>
  );
}
