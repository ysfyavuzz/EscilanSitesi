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
  ExternalLink, Calendar, Languages, Sparkles
} from 'lucide-react';

import { ListingProfile } from '@/types/domain';
import { listingService } from '@/services/listingService';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/contexts/ThemeContext';

export default function EscortProfile() {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<ListingProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
        </div>
        <span className="mt-6 text-primary/40 font-black tracking-widest uppercase text-xs animate-pulse italic">Yörünge Verileri Yükleniyor</span>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-6">
        <h2 className={`text-4xl font-black mb-4 uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-orange-950'}`}>YÖRÜNGE DIŞI</h2>
        <p className={`mb-10 uppercase text-xs font-black tracking-widest ${isDark ? 'text-white/40' : 'text-orange-900/40'}`}>Bu profil galakside bulunamadı.</p>
        <Link href="/escorts">
          <Button className="bg-primary text-white font-black px-12 py-7 rounded-2xl shadow-2xl uppercase text-xs tracking-widest italic">Kataloğa Geri Dön</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pb-32">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden content-layer">
        <div className="absolute inset-0 z-0">
          <img src={profile.coverImage} className="w-full h-full object-cover blur-3xl opacity-30 scale-110" alt="" />
          <div className={`absolute inset-0 transition-colors duration-1000 ${isDark ? 'bg-gradient-to-b from-transparent via-[#020617]/80 to-[#020617]' : 'bg-gradient-to-b from-transparent via-[#fff7ed]/80 to-[#fff7ed]'}`} />
        </div>

        <div className="container mx-auto px-6 h-full relative z-10 flex flex-col justify-end pb-16">
          <Link href="/escorts">
            <motion.button whileHover={{ x: -5 }} className={`absolute top-28 left-6 flex items-center gap-3 transition-all uppercase text-[10px] font-black tracking-widest italic ${isDark ? 'text-white/40 hover:text-white' : 'text-orange-900/40 hover:text-orange-900'}`}>
              <ArrowLeft className="w-4 h-4" /> GERİ DÖN
            </motion.button>
          </Link>

          <div className="flex flex-col md:flex-row gap-10 items-center md:items-end text-center md:text-left">
            {/* Main Profile Photo with Glass Frame */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="relative group cursor-pointer" onClick={() => profile.thumbnailVideo && setShowVideo(true)}>
              <div className={`w-56 h-72 md:w-72 md:h-96 rounded-[3rem] overflow-hidden border-none shadow-2xl relative glass-panel`}>     
                <img src={profile.coverImage} className="w-full h-full object-cover" alt={profile.displayName} />
                {profile.thumbnailVideo && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-2xl flex items-center justify-center border border-white/30">
                      <Play className="w-10 h-10 text-white fill-white" />
                    </div>
                  </div>
                )}
              </div>
              {profile.verificationStatus === 'verified' && (
                <div className="absolute -bottom-3 -right-3 bg-primary text-white p-4 rounded-3xl shadow-2xl border-none animate-bounce-subtle"> 
                  <CheckCircle2 className="w-7 h-7" />
                </div>
              )}
            </motion.div>

            {/* Profile Brief Info */}
            <div className="flex-1 space-y-6">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <h1 className={`text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-3d ${isDark ? 'text-white' : 'text-orange-950'}`}>
                  {profile.displayName}
                </h1>
                <Badge className="bg-primary text-white border-none px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic">
                  {profile.age} YAŞ
                </Badge>
              </div>

              <div className={`flex flex-wrap items-center justify-center md:justify-start gap-8 text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/40' : 'text-orange-900/40'}`}>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className={isDark ? 'text-white/80' : 'text-orange-950/80'}>{profile.city} • {profile.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className={isDark ? 'text-white/80' : 'text-orange-950/80'}>{profile.rating}</span>
                  <span>({profile.reviewCount} Yorum)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-primary" />
                  <span>{profile.viewCount} Keşif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto px-6 mt-16 content-layer">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">

          {/* Left Column: Media & Info */}
          <div className="lg:col-span-8 space-y-16">

            {/* Gallery Section */}
            <section className="glass-panel border-none rounded-[3rem] p-8 md:p-12 shadow-2xl">
              <h2 className={`text-2xl font-black mb-10 flex items-center gap-4 uppercase tracking-tighter italic ${isDark ? 'text-white' : 'text-orange-950'}`}>
                <Sparkles className="w-7 h-7 text-primary" /> GALAKSİ ARŞİVİ
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  { url: profile.coverImage, id: 'cover' },
                  ...(profile.gallery || [])
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="aspect-[3/4.5] rounded-3xl overflow-hidden border-none cursor-pointer glass-panel group relative shadow-xl"
                  >
                    <img src={item.url || (item as any)} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={`Gallery ${idx}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Details Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="bg-white/5 border-none p-2 rounded-3xl w-full flex overflow-x-auto no-scrollbar gap-2">       
                <TabsTrigger value="about" className="flex-1 rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all italic">HİKAYE</TabsTrigger>
                <TabsTrigger value="services" className="flex-1 rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all italic">DENEYİMLER</TabsTrigger>
                <TabsTrigger value="details" className="flex-1 rounded-2xl py-4 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all italic">PARAMETRELER</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-10">
                <div className="glass-panel border-none rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  <h3 className={`text-3xl font-black mb-8 uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-orange-950'}`}>BİYOGRAFİ</h3>
                  <p className={`leading-relaxed text-xl md:text-2xl font-medium ${isDark ? 'text-white/60' : 'text-orange-900/60'}`}>
                    {profile.biography || "Bu yıldız henüz hikayesini paylaşmadı. Galaksinin derinliklerinde keşfedilmeyi bekliyor."}      
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="services" className="mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {profile.services.map(service => (
                    <div key={service} className="flex items-center gap-5 p-6 glass-panel border-none rounded-[2rem] hover:bg-primary/5 transition-all group">
                      <div className="w-4 h-4 rounded-full bg-primary group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]" />
                      <span className={`font-black uppercase text-xs tracking-[0.2em] italic ${isDark ? 'text-white/80' : 'text-orange-950/80'}`}>{service}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                  {[
                    { icon: Ruler, label: 'Boy', value: profile.height ? `${profile.height} cm` : 'Gizli' },
                    { icon: Weight, label: 'Kilo', value: profile.weight ? `${profile.weight} kg` : 'Gizli' },
                    { icon: Palette, label: 'Saç', value: profile.hairColor || 'Belirtilmedi' },
                    { icon: Eye, label: 'Göz', value: profile.eyeColor || 'Belirtilmedi' },
                    { icon: Languages, label: 'Diller', value: profile.languages?.join(', ') || 'Türkçe' },
                    { icon: Calendar, label: 'Kayıt', value: '2024' },
                  ].map((feat, i) => (
                    <div key={i} className="glass-panel p-8 rounded-[2.5rem] border-none flex flex-col items-center text-center group hover:bg-white/10 transition-all">
                      <feat.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                      <div className={`text-[9px] mb-2 font-black uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-orange-900/30'}`}>{feat.label}</div>
                      <div className={`font-black text-sm uppercase tracking-tighter italic ${isDark ? 'text-white' : 'text-orange-950'}`}>{feat.value}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Contact Sticky Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              <div className="glass-panel border-none rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16" />
                <h3 className={`text-2xl font-black mb-8 uppercase italic tracking-tighter ${isDark ? 'text-white' : 'text-orange-950'}`}>İLETİŞİM VE ÜCRET</h3>
                
                <div className="space-y-8 mb-10">
                  <div className="flex justify-between items-end border-b border-white/10 pb-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white/30' : 'text-orange-900/30'}`}>Saatlik Ücret</span>
                    <span className={`text-4xl font-black italic ${isDark ? 'text-white' : 'text-orange-950'}`}>₺{profile.hourlyRate || profile.rates?.hourly}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="w-full py-8 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] italic shadow-2xl shadow-primary/20 transition-all flex items-center justify-center gap-3">
                      <Phone className="w-5 h-5" /> ŞİMDİ ARA
                    </Button>
                    <Button className="w-full py-8 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] italic shadow-2xl shadow-green-500/20 transition-all flex items-center justify-center gap-3">
                      <MessageCircle className="w-5 h-5" /> WHATSAPP
                    </Button>
                  </div>
                </div>

                <div className={`p-6 rounded-2xl border border-dashed transition-colors ${isDark ? 'bg-white/5 border-white/10' : 'bg-orange-500/5 border-orange-500/10'}`}>
                  <div className="flex items-center gap-4 mb-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-orange-950'}`}>GÜVENLİK UYARISI</span>
                  </div>
                  <p className={`text-[10px] font-medium leading-loose ${isDark ? 'text-white/40' : 'text-orange-900/40'}`}>
                    Randevu öncesi ödeme yapmayınız. Güvenliğiniz için her zaman halka açık alanlarda buluşmayı tercih edin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl"
          >
            <button onClick={() => setShowVideo(false)} className="absolute top-10 right-10 text-white/40 hover:text-white transition-all">
              <X className="w-10 h-10" />
            </button>
            <div className="w-full max-w-4xl aspect-video glass-panel border-none rounded-[3rem] overflow-hidden shadow-2xl">
              <video src={profile.thumbnailVideo} controls autoPlay className="w-full h-full object-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
