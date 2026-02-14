/**
 * Escort Profile Page (Galaxy Edition)
 * 
 * Premium Cosmic UI - Glassmorphism & Responsive Design.
 */

import { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Star, Heart, CheckCircle2, MessageCircle, 
  Phone, ArrowLeft, Share2, Shield, Clock, Ruler, 
  Weight, Palette, Eye, Info, Crown, Play, X,
  ExternalLink, Calendar, Languages
} from 'lucide-react';

import { ListingProfile } from '@/types/domain';
import { listingService } from '@/services/listingService';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function EscortProfile() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<ListingProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await listingService.getListingById(Number(id));
        setProfile(data);
      } catch (error) {
        console.error("Profil yüklenirken hata:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin" />
        </div>
        <span className="mt-6 text-blue-400/40 font-black tracking-widest uppercase text-xs animate-pulse">Yıldız Verileri Yükleniyor</span>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">Yörünge Dışı</h2>
        <p className="text-blue-100/40 mb-8 uppercase text-xs tracking-widest">Bu profil galakside bulunamadı.</p>
        <Link href="/escorts">
          <Button className="bg-white text-black font-black px-10 py-6 rounded-full">Kataloğa Geri Dön</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-foreground pb-32">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[55vh] md:h-[70vh] w-full overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 z-0">
          <img src={profile.coverImage} className="w-full h-full object-cover blur-3xl opacity-20 scale-110" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-12">
          <Link href="/escorts">
            <motion.button whileHover={{ x: -5 }} className="absolute top-24 left-4 flex items-center gap-2 text-white/40 hover:text-white transition-all uppercase text-[10px] font-black tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Geri Dön
            </motion.button>
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-end text-center md:text-left">
            {/* Main Profile Photo with Glass Frame */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="relative group cursor-pointer" onClick={() => profile.thumbnailVideo && setShowVideo(true)}>
              <div className="w-48 h-64 md:w-64 md:h-80 rounded-[40px] overflow-hidden border-4 border-white/10 shadow-2xl relative">     
                <img src={profile.coverImage} className="w-full h-full object-cover" alt={profile.displayName} />
                {profile.thumbnailVideo && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                )}
              </div>
              {profile.verificationStatus === 'verified' && (
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-3 rounded-2xl shadow-2xl border-4 border-background animate-bounce-subtle"> 
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              )}
            </motion.div>

            {/* Profile Brief Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase italic">
                  {profile.displayName}
                </h1>
                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1.5 rounded-full text-xs font-black uppercase">
                  {profile.age} Yaş
                </Badge>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-blue-100/40 text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  <span>{profile.city} • {profile.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-white">{profile.rating}</span>
                  <span>({profile.reviewCount} Yorum)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span>{profile.viewCount} Keşif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">

          {/* Left Column: Media & Info */}
          <div className="lg:col-span-8 space-y-12">

            {/* Gallery Section */}
            <section className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[48px] p-6 md:p-10 shadow-2xl">
              <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3 uppercase tracking-tighter italic">
                <Sparkles className="w-6 h-6 text-blue-400" /> Galaksi Arşivi
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { url: profile.coverImage, id: 'cover' },
                  ...profile.gallery
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 cursor-pointer bg-white/5 group relative shadow-lg"
                  >
                    <img src={item.url || (item as any)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={`Gallery ${idx}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Details Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="bg-white/5 border border-white/10 p-1.5 rounded-[24px] w-full flex overflow-x-auto no-scrollbar">       
                <TabsTrigger value="about" className="flex-1 rounded-2xl py-3 text-xs font-black uppercase tracking-widest data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">Hikaye</TabsTrigger>
                <TabsTrigger value="services" className="flex-1 rounded-2xl py-3 text-xs font-black uppercase tracking-widest data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">Deneyimler</TabsTrigger>
                <TabsTrigger value="details" className="flex-1 rounded-2xl py-3 text-xs font-black uppercase tracking-widest data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">Parametreler</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-8">
                <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                  <h3 className="text-2xl font-black mb-6 text-white uppercase italic tracking-tighter">Biyografi</h3>
                  <p className="text-blue-100/60 leading-relaxed text-lg md:text-xl font-medium">
                    {profile.biography || "Bu yıldız henüz hikayesini paylaşmadı. Galaksinin derinliklerinde keşfedilmeyi bekliyor."}      
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="services" className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profile.services.map(service => (
                    <div key={service} className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-3xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group">
                      <div className="w-3 h-3 rounded-full bg-blue-500 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                      <span className="text-white/80 font-black uppercase text-[10px] tracking-[0.2em]">{service}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {[
                    { icon: Ruler, label: 'Boy', value: profile.height ? `${profile.height} cm` : 'Gizli' },
                    { icon: Weight, label: 'Kilo', value: profile.weight ? `${profile.weight} kg` : 'Gizli' },
                    { icon: Palette, label: 'Saç', value: profile.hairColor || 'Belirtilmedi' },
                    { icon: Eye, label: 'Göz', value: profile.eyeColor || 'Belirtilmedi' },
                    { icon: Languages, label: 'Diller', value: profile.languages?.join(', ') || 'Türkçe' },
                    { icon: Calendar, label: 'Kayıt', value: '2024' },
                  ].map((feat, i) => (
                    <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10 flex flex-col items-center text-center group hover:bg-white/10 transition-all">
                      <feat.icon className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                      <div className="text-[8px] text-white/30 mb-1 font-black uppercase tracking-widest">{feat.label}</div>
                      <div className="font-black text-white text-xs uppercase tracking-tighter">{feat.value}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

          </div>

          {/* Right Column: Contact Sticky Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">

              {/* Pricing & Contact Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-background/40 backdrop-blur-3xl border border-white/10 rounded-[48px] p-8 md:p-10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/20 blur-[80px] rounded-full" />

                <div className="mb-10 text-center">
                  <div className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Yörünge Başlangıç Ücreti</div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-6xl font-black text-white italic tracking-tighter">
                      {profile.rates?.hourly || '---'}
                    </span>
                    <span className="text-blue-400 text-xl font-bold uppercase">{profile.rates?.currency || 'TRY'}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full py-8 rounded-3xl bg-green-600 hover:bg-green-500 text-white font-black text-lg shadow-2xl shadow-green-900/20 transition-all active:scale-95 group">
                    <MessageCircle className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                    WHATSAPP
                  </Button>

                  <Button className="w-full py-8 rounded-3xl bg-white text-black hover:bg-blue-400 hover:text-white font-black text-lg shadow-2xl transition-all active:scale-95 group">
                    <Phone className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                    HEMEN ARA
                  </Button>
                </div>

                <div className="mt-10 pt-10 border-t border-white/10 flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Müsaitlik</span>
                    <span className="text-green-400 flex items-center gap-2 text-[10px] font-black uppercase">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                      YÖRÜNGEDE
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">Güvenlik Skoru</span>
                    <span className="text-blue-400 flex items-center gap-2 text-[10px] font-black uppercase font-bold">
                      <Shield className="w-4 h-4" /> %98
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Safety Warning */}
              <div className="bg-amber-500/5 border border-amber-500/10 rounded-[32px] p-8">
                <div className="flex gap-5">
                  <Info className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <div className="text-[10px] text-amber-200/40 leading-relaxed font-bold uppercase tracking-tighter">
                    <span className="text-amber-500 block mb-2">Güvenlik Protokolü</span>      
                    Lütfen ödemeyi görüşme sırasında elden yapın. Ön ödeme talep eden profillere karşı dikkatli olun. 
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* --- VIDEO MODAL --- */}
      <AnimatePresence>
        {showVideo && profile.thumbnailVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
          >
            <button onClick={() => setShowVideo(false)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors">
              <X className="w-12 h-12" />
            </button>
            <div className="w-full max-w-5xl aspect-video rounded-[48px] overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10">
              <video src={profile.thumbnailVideo} controls autoPlay className="w-full h-full object-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
