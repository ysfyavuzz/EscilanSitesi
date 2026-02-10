/**
 * Escort Main Dashboard
 * 
 * Kullanıcının ana kontrol paneli.
 * Özet istatistikler, bildirimler ve hızlı erişim menüleri.
 */

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  Eye, Heart, MousePointerClick, TrendingUp, 
  AlertCircle, ChevronRight 
} from 'lucide-react';
import { Link } from 'wouter';

import { ProfileHealthWidget } from '@/components/dashboard/ProfileHealthWidget';

export default function EscortDashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- HOŞ GELDİNİZ MESAJI --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Hoş Geldin, Elara 👋</h1>
            <p className="text-gray-400">Bugün profillerin harika görünüyor!</p>
          </div>
          <Link href="/dashboard/profile">
            <button className="px-6 py-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 transition-all font-medium">
              Profili Düzenle
            </button>
          </Link>
        </div>

        {/* --- GAMIFICATION WIDGET --- */}
        <ProfileHealthWidget 
          score={65} 
          missingItems={[
            { label: 'Tanıtım Videosu Ekle (+20 Puan)', href: '/dashboard/gallery' },
            { label: 'Biyografini Genişlet (+15 Puan)', href: '/dashboard/profile' }
          ]}
        />

        {/* --- İSTATİSTİK KARTLARI --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Profil Görüntülenme', value: '12.4K', icon: Eye, color: 'text-blue-400', bg: 'bg-blue-500/10', trend: '+12%' },
            { label: 'Favoriye Ekleme', value: '843', icon: Heart, color: 'text-pink-400', bg: 'bg-pink-500/10', trend: '+5%' },
            { label: 'WhatsApp Tıklama', value: '128', icon: MousePointerClick, color: 'text-green-400', bg: 'bg-green-500/10', trend: '+8%' },
            { label: 'Arama Dönüşümü', value: '%4.2', icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10', trend: '+1.2%' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-green-400 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                  {stat.trend}
                </span>
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* --- BİLDİRİMLER & DURUM --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sol: Bekleyen Onaylar */}
          <div className="lg:col-span-2 bg-[#0a0a0f] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              Sistem Durumu
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <div className="flex-1">
                  <h4 className="text-white font-medium">Biyografi Güncellemesi</h4>
                  <p className="text-sm text-gray-400">Admin onayı bekleniyor. Tahmini süre: 2 saat.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                  Bekliyor
                </span>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-green-500/5 border border-green-500/20 opacity-60">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div className="flex-1">
                  <h4 className="text-white font-medium">Yeni Fotoğraf Yüklemesi</h4>
                  <p className="text-sm text-gray-400">3 adet fotoğraf onaylandı ve yayına alındı.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                  Onaylandı
                </span>
              </div>
            </div>
          </div>

          {/* Sağ: İpuçları */}
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">Profil İpuçları 🚀</h3>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Profil doluluk oranınız %85. Daha fazla görüntülenme almak için bir tanıtım videosu eklemeyi düşünün.
            </p>
            <Link href="/dashboard/gallery">
              <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center justify-center gap-2 group">
                Video Ekle
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
