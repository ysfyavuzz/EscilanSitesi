/**
 * Global Footer Component
 * 
 * Responsive footer component displayed on all pages of the platform.
 */

import { Link } from 'wouter';
import { Shield, CheckCircle2, Heart, Mail, MapPin } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function Footer() {
    const currentYear = new Date().getFullYear();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <footer className={`transition-colors duration-1000 py-20 mt-auto content-layer
            ${isDark ? 'bg-black/30 border-t border-white/5' : 'bg-orange-500/5 border-t border-orange-500/10'}`}>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-8">
                           <h2 className={`text-3xl font-black italic uppercase tracking-tighter text-3d
                             ${isDark ? 'text-white' : 'text-orange-950'}`}>
                             ZÜHRE<span className="text-primary">PLANET</span>
                           </h2>
                        </div>
                        <p className={`max-w-md leading-relaxed mb-8 font-black uppercase tracking-widest text-[10px] italic
                          ${isDark ? 'text-white/40' : 'text-orange-900/60'}`}>
                            Türkiye'nin en güvenilir ve seçkin escort ilan platformu. Profesyonel hizmet,
                            doğrulanmış profiller ve gizlilik odaklı yaklaşım.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-primary" />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest italic ${isDark ? 'text-white/60' : 'text-orange-950/70'}`}>
                                    destek@zuhreplanet.com
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest italic ${isDark ? 'text-white/60' : 'text-orange-950/70'}`}>
                                    Türkiye • Kozmik Merkez
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className={`text-xs font-black uppercase tracking-[0.3em] mb-8 ${isDark ? 'text-white' : 'text-orange-950'}`}>HIZLI MENÜ</h4>
                        <ul className="space-y-4">
                            {['Tüm İlanlar', 'VIP Paketler', 'İlan Ver', 'Blog', 'İletişim'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className={`text-[10px] font-black uppercase tracking-widest transition-colors hover:text-primary italic
                                      ${isDark ? 'text-white/40' : 'text-orange-900/40'}`}>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className={`text-xs font-black uppercase tracking-[0.3em] mb-8 ${isDark ? 'text-white' : 'text-orange-950'}`}>YASAL</h4>
                        <ul className="space-y-4">
                            {['Kullanım Koşulları', 'Gizlilik Politikası', 'KVKK Aydınlatma', 'Çerez Politikası'].map((item) => (
                                <li key={item}>
                                    <Link href="#" className={`text-[10px] font-black uppercase tracking-widest transition-colors hover:text-primary italic
                                      ${isDark ? 'text-white/40' : 'text-orange-900/40'}`}>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                            <li className="text-red-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 italic">
                                <span className="bg-red-500 text-white px-2 py-0.5 rounded text-[8px]">18+</span> YETİŞKİN İÇERİK
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={`my-16 h-px w-full ${isDark ? 'bg-white/5' : 'bg-orange-900/5'}`} />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] italic
                      ${isDark ? 'text-white/20' : 'text-orange-900/30'}`}>
                        © {currentYear} ZÜHRE PLANET. TÜM HAKLARI SAKLIDIR.
                        <Heart className="w-3 h-3 text-red-500/50" />
                    </p>
                    <div className="flex gap-8">
                        <span className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-green-500/40' : 'text-green-600/40'}`}>
                            <Shield className="w-4 h-4" />
                            SSL KORUMALI
                        </span>
                        <span className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-green-500/40' : 'text-green-600/40'}`}>
                            <CheckCircle2 className="w-4 h-4" />
                            %100 GÜVENLİ
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
