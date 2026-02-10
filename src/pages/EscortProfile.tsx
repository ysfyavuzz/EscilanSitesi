/**
 * Escort Profile Page (Galaxy Edition)
 * 
 * "Deep Space Luxury" temasına uygun, ultra-modern ve detaylı profil sayfası.
 * Dinamik içerik kısıtlama, glassmorphism ve premium animasyonlar içerir.
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

// Domain & Service
import { ListingProfile } from '@/types/domain';
import { listingService } from '@/services/listingService';

// UI Components
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function EscortProfile() {
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<ListingProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePhoto, setActivePhoto] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        const data = await listingService.getListingBySlug(slug);
        setProfile(data);
      } catch (error) {
        console.error("Profil yüklenirken hata:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020205] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#020205] flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold text-white mb-4 font-orbitron">Profil Bulunamadı</h2>
        <Link href="/escorts">
          <Button variant="outline" className="border-white/10 text-gray-400">
            Kataloğa Geri Dön
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020205] text-white pb-32">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        {/* Background Blur Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={profile.coverImage} 
            className="w-full h-full object-cover blur-2xl opacity-30 scale-110" 
            alt="Background blur"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020205]/80 to-[#020205]" />
        </div>

        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-12">
          <Link href="/escorts">
            <motion.button 
              whileHover={{ x: -5 }}
              className="absolute top-8 left-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" /> Geri Dön
            </motion.button>
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Main Profile Photo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group cursor-pointer"
              onClick={() => setShowVideo(true)}
            >
              <div className="w-48 h-64 md:w-64 md:h-80 rounded-[32px] overflow-hidden border-2 border-white/20 shadow-2xl relative">
                <img 
                  src={profile.coverImage} 
                  className="w-full h-full object-cover" 
                  alt={profile.displayName} 
                />
                {profile.thumbnailVideo && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                )}
              </div>
              
              {profile.verificationStatus === 'verified' && (
                <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg border-4 border-[#020205]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              )}
            </motion.div>

            {/* Profile Brief Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl md:text-6xl font-black font-orbitron tracking-tight text-white">
                  {profile.displayName}
                </h1>
                <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-3 py-1">
                  {profile.age} Yaş
                </Badge>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span>{profile.city}, {profile.district}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">{profile.rating}</span>
                  <span className="text-sm">({profile.reviewCount} Yorum)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <span>{profile.viewCount} Görüntülenme</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.services.slice(0, 4).map(s => (
                  <span key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Media & Info */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Gallery Section */}
            <section>
              <h2 className="text-2xl font-bold font-orbitron mb-6 flex items-center gap-2">
                <Star className="w-6 h-6 text-amber-500" /> GALAKSİ GALERİSİ
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { url: profile.coverImage, id: 'cover' }, 
                  ...profile.gallery
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 cursor-pointer bg-white/5"
                  >
                    <img src={item.url || (item as any)} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                  </motion.div>
                ))}
                {profile.tier === 'standard' && (
                  <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-purple-900/20 to-black border border-dashed border-white/20 flex flex-col items-center justify-center p-6 text-center group">
                    <Crown className="w-10 h-10 text-amber-500 mb-3 group-hover:scale-110 transition-transform" />
                    <p className="text-xs text-gray-400 mb-4">Daha fazla içerik görmek için VIP üyeliğe geçin.</p>
                    <Button variant="outline" className="border-amber-500/50 text-amber-400 text-[10px] h-8">YÜKSELT</Button>
                  </div>
                )}
              </div>
            </section>

            {/* Details Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl w-full flex justify-between md:justify-start">
                <TabsTrigger value="about" className="flex-1 md:flex-none rounded-xl data-[state=active]:bg-purple-600">Hakkında</TabsTrigger>
                <TabsTrigger value="services" className="flex-1 md:flex-none rounded-xl data-[state=active]:bg-purple-600">Servisler</TabsTrigger>
                <TabsTrigger value="details" className="flex-1 md:flex-none rounded-xl data-[state=active]:bg-purple-600">Özellikler</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-8 space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Biyografi</h3>
                  <p className="text-gray-400 leading-relaxed italic text-lg">
                    "{profile.biography || "Benimle galakside bir yolculuğa çıkmaya hazır mısınız? Sizin için buradayım."}"
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="services" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.services.map(service => (
                    <div key={service} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-purple-500/50 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <span className="text-gray-200">{service}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[
                    { icon: Ruler, label: 'Boy', value: profile.height ? `${profile.height} cm` : 'Gizli' },
                    { icon: Weight, label: 'Kilo', value: profile.weight ? `${profile.weight} kg` : 'Gizli' },
                    { icon: Palette, label: 'Saç', value: profile.hairColor || 'Belirtilmedi' },
                    { icon: Eye, label: 'Göz', value: profile.eyeColor || 'Belirtilmedi' },
                    { icon: Languages, label: 'Diller', value: profile.languages.join(', ') },
                    { icon: Calendar, label: 'Kayıt', value: '2024' },
                  ].map((feat, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <feat.icon className="w-5 h-5 text-purple-500 mb-2" />
                      <div className="text-xs text-gray-500 mb-1">{feat.label}</div>
                      <div className="font-bold text-white">{feat.value}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

          </div>

          {/* Right Column: Contact Sticky Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              
              {/* Pricing & Contact Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#0a0a0f] border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[80px] rounded-full" />
                
                <div className="mb-8">
                  <div className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Başlangıç Ücreti</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">
                      {profile.rates?.hourly || '---'}
                    </span>
                    <span className="text-gray-500 text-xl">{profile.rates?.currency || 'TRY'} / saat</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full py-8 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-black text-lg shadow-lg shadow-green-900/20 group">
                    <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    WHATSAPP
                  </Button>
                  
                  <Button className="w-full py-8 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-lg shadow-lg shadow-purple-900/40 group">
                    <Phone className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    ARAMA YAP
                  </Button>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Müsaitlik Durumu</span>
                    <span className="text-green-400 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      ŞİMDİ MÜSAİT
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Güvenlik Skoru</span>
                    <span className="text-blue-400 flex items-center gap-1.5 font-bold">
                      <Shield className="w-4 h-4" /> %98
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Safety Warning */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
                <div className="flex gap-4">
                  <Info className="w-6 h-6 text-amber-500 flex-shrink-0" />
                  <div className="text-xs text-amber-200/60 leading-relaxed">
                    <span className="font-bold text-amber-500 block mb-1 uppercase tracking-tighter">Güvenlik Hatırlatması</span>
                    Lütfen ödemeyi görüşme sırasında elden yapın. Ön ödeme talep eden profillere karşı dikkatli olun. Güvenliğiniz bizim için önemli.
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
            className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-10 h-10" />
            </button>
            <div className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <video src={profile.thumbnailVideo} controls autoPlay className="w-full h-full object-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}