/**
 * LoyaltyRankCard
 *
 * Displays the user's current rank, XP progress bar,
 * loyalty points balance, and available perks.
 *
 * Used on both escort and customer dashboards.
 */

import { motion } from 'framer-motion';
import { getRankByXP, getRankProgress, RANK_CONFIG } from '@/lib/loyaltySystem';
import { Star, Zap, Gift, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoyaltyRankCardProps {
    xp: number;
    loyaltyPoints: number;
    role?: 'escort' | 'customer';
    className?: string;
}

export default function LoyaltyRankCard({ xp, loyaltyPoints, role = 'customer', className = '' }: LoyaltyRankCardProps) {
    const rank = getRankByXP(xp);
    const progress = getRankProgress(xp);
    const rankIndex = RANK_CONFIG.findIndex(r => r.name === rank.name);
    const nextRank = rankIndex < RANK_CONFIG.length - 1 ? RANK_CONFIG[rankIndex + 1] : null;
    const xpToNext = nextRank ? nextRank.minXP - xp : 0;

    const perks = [
        ...(rank.discountPercent > 0 ? [`VIP & Boost işlemlerinde %${rank.discountPercent} indirim`] : []),
        ...(rankIndex >= 3 ? ['Öncelikli müşteri desteği'] : []),
        ...(rankIndex >= 4 ? ['Özel elmas rozeti'] : []),
        ...(rankIndex >= 5 ? ['Galaktik profil çerçevesi'] : []),
    ];

    return (
        <div className={`relative overflow-hidden rounded-2xl border ${rank.border} bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm ${className}`}>
            {/* Glow background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${rank.gradient} opacity-10 pointer-events-none`} />

            <div className="relative p-6 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{rank.icon}</span>
                        <div>
                            <p className={`text-xl font-black uppercase tracking-widest ${rank.text}`}>{rank.name}</p>
                            <p className="text-xs text-white/40">{rank.description}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-white/40 uppercase tracking-wider">Toplam XP</p>
                        <p className={`text-2xl font-black ${rank.text}`}>{xp.toLocaleString('tr-TR')}</p>
                    </div>
                </div>

                {/* XP Progress Bar */}
                {nextRank && (
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-white/30">
                            <span>{rank.name}</span>
                            <span>{nextRank.name} için {xpToNext.toLocaleString('tr-TR')} XP daha</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className={`h-full rounded-full bg-gradient-to-r ${rank.gradient}`}
                            />
                        </div>
                        <p className="text-right text-xs text-white/25">{progress}%</p>
                    </div>
                )}

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <div className="flex items-center gap-2 mb-1">
                            <Star className="w-3.5 h-3.5 text-yellow-400" />
                            <span className="text-xs text-white/40">Sadakat Puanı</span>
                        </div>
                        <p className="text-lg font-bold text-white">{loyaltyPoints.toLocaleString('tr-TR')}</p>
                        <p className="text-xs text-white/30 mt-0.5">≈ {Math.floor(loyaltyPoints / 100)} TL indirim</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-xs text-white/40">Rütbe Seviyesi</span>
                        </div>
                        <p className="text-lg font-bold text-white">{rankIndex + 1} / {RANK_CONFIG.length}</p>
                        <p className="text-xs text-white/30 mt-0.5">{rankIndex < RANK_CONFIG.length - 1 ? `${RANK_CONFIG.length - 1 - rankIndex} rütbe daha var` : 'Maksimum rütbe!'}</p>
                    </div>
                </div>

                {/* Active perks */}
                {perks.length > 0 && (
                    <div className="space-y-2">
                        <p className="text-xs text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                            <Gift className="w-3.5 h-3.5" /> Aktif Ayrıcalıklar
                        </p>
                        <div className="space-y-1.5">
                            {perks.map((perk, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${rank.gradient}`} />
                                    {perk}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Earn XP hint */}
                {nextRank && (
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                        <div className="flex items-center gap-2 text-xs text-white/30">
                            <Zap className="w-3.5 h-3.5 text-yellow-500" />
                            Randevu tamamla, yorum bırak, giriş yap — XP kazan!
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-white/30 hover:text-white gap-1 p-1"
                        >
                            Detay <ChevronRight className="w-3 h-3" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
