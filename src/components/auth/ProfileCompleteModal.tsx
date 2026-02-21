/**
 * Profile Complete Modal
 *
 * Shown after Google / Apple social login when the user's profile
 * is incomplete (no phone, no role, no terms acceptance).
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { User, Heart, Phone, ShieldCheck, X, Chrome, Apple } from 'lucide-react';

interface ProfileCompleteModalProps {
    providerName: 'google' | 'apple';
    userEmail: string;
    onComplete: (data: {
        phoneNumber: string;
        role: 'customer' | 'escort';
        hasAcceptedTerms: boolean;
    }) => Promise<void>;
    onClose: () => void;
}

type Role = 'customer' | 'escort';

export default function ProfileCompleteModal({
    providerName,
    userEmail,
    onComplete,
    onClose,
}: ProfileCompleteModalProps) {
    const [role, setRole] = useState<Role | null>(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
    const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const ProviderIcon = providerName === 'google' ? Chrome : Apple;

    const handleSubmit = async () => {
        if (!role) return toast.error('Lütfen üyelik tipini seçin.');
        if (!phoneNumber || phoneNumber.length < 10) return toast.error('Geçerli bir telefon numarası girin.');
        if (!hasAcceptedTerms || !hasAcceptedPrivacy) return toast.error('Kullanım Koşulları ve Gizlilik Politikasını onaylamanız gerekmektedir.');

        setIsLoading(true);
        try {
            await onComplete({ phoneNumber, role, hasAcceptedTerms: true });
        } catch (err: any) {
            toast.error(err?.message || 'Bir sorun oluştu.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-md bg-[#0d0d1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="px-8 pt-8 pb-6">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>

                    {/* Provider badge */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                            <ProviderIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-white font-semibold">Profil Tamamla</p>
                            <p className="text-white/50 text-xs">
                                {providerName === 'google' ? 'Google' : 'Apple'} ile giriş yapıldı: {userEmail}
                            </p>
                        </div>
                    </div>

                    <p className="text-white/60 text-sm mb-5">
                        Platformu kullanabilmek için birkaç bilgiye daha ihtiyacımız var.
                    </p>

                    <div className="space-y-5">
                        {/* Role selection */}
                        <div>
                            <Label className="text-white/70 text-sm block mb-2">Üyelik Tipi</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setRole('customer')}
                                    className={`p-3 rounded-xl border-2 text-center transition-all ${role === 'customer' ? 'border-primary bg-primary/10' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                                >
                                    <Heart className={`w-5 h-5 mx-auto mb-1 ${role === 'customer' ? 'text-primary' : 'text-white/30'}`} />
                                    <p className="text-sm text-white font-medium">Müşteri</p>
                                </button>
                                <button
                                    onClick={() => setRole('escort')}
                                    className={`p-3 rounded-xl border-2 text-center transition-all ${role === 'escort' ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                                >
                                    <User className={`w-5 h-5 mx-auto mb-1 ${role === 'escort' ? 'text-yellow-500' : 'text-white/30'}`} />
                                    <p className="text-sm text-white font-medium">Escort</p>
                                </button>
                            </div>
                        </div>

                        {/* Phone number */}
                        <div className="space-y-1.5">
                            <Label className="text-white/70 text-sm">Telefon Numarası</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                <Input
                                    type="tel"
                                    placeholder="+90 5XX XXX XX XX"
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                                />
                            </div>
                            <p className="text-xs text-white/30">Her telefon numarası yalnızca bir hesaba kayıtlanabilir.</p>
                        </div>

                        {/* Terms */}
                        <div className="space-y-3">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <Checkbox
                                    checked={hasAcceptedTerms}
                                    onCheckedChange={v => setHasAcceptedTerms(Boolean(v))}
                                    className="mt-0.5 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                                <span className="text-xs text-white/60">
                                    <a href="/terms" target="_blank" className="text-primary hover:underline">Kullanım Koşulları</a>'nı okudum ve kabul ediyorum.
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <Checkbox
                                    checked={hasAcceptedPrivacy}
                                    onCheckedChange={v => setHasAcceptedPrivacy(Boolean(v))}
                                    className="mt-0.5 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                                <span className="text-xs text-white/60">
                                    <a href="/privacy" target="_blank" className="text-primary hover:underline">Gizlilik Politikası</a> ve <a href="/kvkk" target="_blank" className="text-primary hover:underline">KVKK</a> metnini onaylıyorum.
                                </span>
                            </label>
                        </div>

                        <Button
                            onClick={handleSubmit}
                            disabled={isLoading || !role || !hasAcceptedTerms || !hasAcceptedPrivacy}
                            className="w-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                            size="lg"
                        >
                            {isLoading ? 'Kaydediliyor...' : (
                                <span className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" /> Profili Tamamla
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
