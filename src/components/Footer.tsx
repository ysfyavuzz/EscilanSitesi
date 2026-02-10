/**
 * Global Footer Component
 * 
 * Responsive footer component displayed on all pages of the platform.
 * Contains quick links, legal pages, branding, and trust indicators.
 * 
 * @module components/Footer
 * @category Components - Layout
 * 
 * Features:
 * - Platform branding and description
 * - Quick navigation links
 * - Legal pages links (Terms, Privacy, KVKK, Safety)
 * - Trust indicators (SSL, Security)
 * - Responsive design for mobile and desktop
 * - Social media links support
 * - 18+ content warning
 * 
 * @example
 * ```tsx
 * // Add to layout or specific pages
 * <Footer />
 * ```
 */

import { Link } from 'wouter';
import { Separator } from '@/components/ui/separator';
/**
 * Global Footer Component
 * 
 * Displays site navigation, legal links, social media, and copyright info.
 * appearing on every page.
 * 
 * @module components/Footer
 * @category Components - Layout
 */

import { Shield, CheckCircle2, Heart, Mail, MapPin } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black/40 border-t border-white/5 py-20 mt-auto">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <img src="/logo-full.png" alt="ZEVK EVRENİ" className="h-16 md:h-20 w-auto" />
                        </div>
                        <p className="text-muted-foreground max-w-md leading-relaxed mb-6">
                            Türkiye'nin en güvenilir ve seçkin escort ilan platformu. Profesyonel hizmet,
                            doğrulanmış profiller ve gizlilik odaklı yaklaşım.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                <span>destek@escortplatform.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>Türkiye</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold mb-6">HIZLI MENÜ</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>
                                <Link href="/escorts" className="hover:text-primary transition-colors">
                                    Tüm İlanlar
                                </Link>
                            </li>
                            <li>
                                <Link href="/vip" className="hover:text-primary transition-colors">
                                    VIP Paketler
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="hover:text-primary transition-colors">
                                    İlan Ver
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="hover:text-primary transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary transition-colors">
                                    İletişim
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-bold mb-6">YASAL</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>
                                <Link href="/terms" className="hover:text-primary transition-colors">
                                    Kullanım Koşulları
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="hover:text-primary transition-colors">
                                    Gizlilik Politikası
                                </Link>
                            </li>
                            <li>
                                <Link href="/kvkk" className="hover:text-primary transition-colors">
                                    KVKK Aydınlatma
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="hover:text-primary transition-colors">
                                    Çerez Politikası
                                </Link>
                            </li>
                            <li>
                                <Link href="/safety" className="hover:text-primary transition-colors">
                                    Güvenlik Rehberi
                                </Link>
                            </li>
                            <li className="text-red-500 font-bold flex items-center gap-1">
                                <span>18+</span> Yetişkin İçerik
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-12 bg-white/5" />

                {/* Escort & Model Entry Point - İzole Edilmiş Alan */}
                <div className="bg-gradient-to-r from-amber-500/5 to-purple-500/5 rounded-3xl p-8 mb-12 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="bg-amber-500/10 p-4 rounded-2xl border border-amber-500/20">
                            <Shield className="w-8 h-8 text-amber-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Escort & Model Paneli</h3>
                            <p className="text-muted-foreground text-sm max-w-sm">
                                Profesyonel kadromuza katılın, profilinizi yönetin ve kazancınızı takip edin.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Link href="/register-escort" className="flex-1 md:flex-none">
                            <button className="w-full px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-all text-sm">
                                Hemen Kaydol
                            </button>
                        </Link>
                        <Link href="/login-escort" className="flex-1 md:flex-none">
                            <button className="w-full px-6 py-3 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold hover:bg-amber-500/20 transition-all text-sm">
                                Escort Girişi
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
                    <p className="flex items-center gap-1">
                        © {currentYear} Escort Platform. Tüm hakları saklıdır.
                        <Heart className="w-3 h-3 text-red-500 mx-1" />
                    </p>
                    <div className="flex gap-6">
                        <span className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-500" />
                            SSL Korumalı
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            %100 Güvenli
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}


