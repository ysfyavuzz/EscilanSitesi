/**
 * Register Modal
 *
 * 3-step signup flow:
 *   Step 1 — Choose membership type (escort / customer)
 *   Step 2 — Personal info (name, email, phone, password)
 *   Step 3 — Terms & Privacy Policy acceptance
 *
 * Also includes Google / Apple social login buttons that
 * open the ProfileCompleteModal on first login.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
    User,
    Heart,
    Mail,
    Lock,
    Phone,
    ArrowRight,
    ArrowLeft,
    X,
    Chrome,
    Apple,
    ShieldCheck,
} from 'lucide-react';

interface RegisterModalProps {
    onClose: () => void;
    onSuccess?: (token: string) => void;
    onSocialLogin?: (provider: 'google' | 'apple') => void;
    onLoginClick?: () => void;
}

type Role = 'customer' | 'escort';

export default function RegisterModal({ onClose, onSuccess, onSocialLogin, onLoginClick }: RegisterModalProps) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [role, setRole] = useState<Role | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
    const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const updateField = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleStep1Next = () => {
        if (!role) {
            toast.error('Lütfen üyelik tipini seçin.');
            return;
        }
        setStep(2);
    };

    const handleStep2Next = () => {
        if (!formData.fullName || !formData.email || !formData.phoneNumber || !formData.password) {
            toast.error('Lütfen tüm alanları doldurun.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Şifreler eşleşmiyor.');
            return;
        }
        if (formData.password.length < 8) {
            toast.error('Şifre en az 8 karakter olmalıdır.');
            return;
        }
        setStep(3);
    };

    const handleSubmit = async () => {
        if (!hasAcceptedTerms || !hasAcceptedPrivacy) {
            toast.error('Kullanım Koşulları ve Gizlilik Politikasını onaylamanız gerekmektedir.');
            return;
        }

        setIsLoading(true);
        try {
            // TODO: Call trpc.auth.register.useMutation when wired up at component level
            // For now, this shows the structure. In parent component, use:
            // const registerMutation = trpc.auth.register.useMutation({ ... });
            await new Promise(r => setTimeout(r, 1200)); // placeholder
            toast.success('Hesabınız başarıyla oluşturuldu! Hoş geldiniz 🎉');
            onSuccess?.('placeholder-token');
            onClose();
        } catch (err: any) {
            toast.error(err?.message || 'Kayıt işlemi başarısız.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md bg-[#0d0d1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="relative px-8 pt-8 pb-4">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>

                    {/* Step indicator */}
                    <div className="flex items-center gap-2 mb-6">
                        {[1, 2, 3].map(s => (
                            <div
                                key={s}
                                className={`h-1 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-primary' : 'bg-white/10'}`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Üyelik Oluştur</h2>
                            <p className="text-sm text-white/50">
                                {step === 1 && 'Üyelik tipini seç'}
                                {step === 2 && 'Kişisel bilgilerin'}
                                {step === 3 && 'Koşulları onayla'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-8 pb-8">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Role Selection */}
                        {step === 1 && (
                            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                <p className="text-sm text-white/60 mb-4">Zühre Planet'e nasıl katılmak istediğini seç:</p>

                                <button
                                    onClick={() => setRole('customer')}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${role === 'customer' ? 'border-primary bg-primary/10' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${role === 'customer' ? 'bg-primary' : 'bg-white/10'}`}>
                                            <Heart className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">Müşteri Üyeliği</p>
                                            <p className="text-xs text-white/50">Profilleri görüntüle ve randevu al</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setRole('escort')}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${role === 'escort' ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 hover:border-white/30 bg-white/5'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${role === 'escort' ? 'bg-yellow-500' : 'bg-white/10'}`}>
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">Escort Üyeliği</p>
                                            <p className="text-xs text-white/50">Profilini oluştur, müşteri kazan</p>
                                        </div>
                                    </div>
                                </button>

                                {/* Social login divider */}
                                <div className="flex items-center gap-3 my-4">
                                    <div className="flex-1 h-px bg-white/10" />
                                    <span className="text-xs text-white/30">veya sosyal hesapla</span>
                                    <div className="flex-1 h-px bg-white/10" />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => onSocialLogin?.('google')}
                                        className="flex items-center justify-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm text-white"
                                    >
                                        <Chrome className="w-4 h-4" />
                                        Google
                                    </button>
                                    <button
                                        onClick={() => onSocialLogin?.('apple')}
                                        className="flex items-center justify-center gap-2 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-sm text-white"
                                    >
                                        <Apple className="w-4 h-4" />
                                        Apple
                                    </button>
                                </div>

                                <Button onClick={handleStep1Next} className="w-full mt-2" size="lg">
                                    Devam Et <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>

                                <p className="text-center text-xs text-white/40 mt-2">
                                    Zaten hesabın var mı?{' '}
                                    <button onClick={onLoginClick} className="text-primary hover:underline font-medium">
                                        Giriş yap
                                    </button>
                                </p>
                            </motion.div>
                        )}

                        {/* Step 2: Personal Info */}
                        {step === 2 && (
                            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-white/70 text-sm">Ad Soyad</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                        <Input
                                            placeholder="Gerçek adın (gizli tutulur)"
                                            value={formData.fullName}
                                            onChange={e => updateField('fullName', e.target.value)}
                                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/70 text-sm">E-posta Adresi</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                        <Input
                                            type="email"
                                            placeholder="ornek@gmail.com"
                                            value={formData.email}
                                            onChange={e => updateField('email', e.target.value)}
                                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-white/70 text-sm">Telefon Numarası</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                        <Input
                                            type="tel"
                                            placeholder="+90 5XX XXX XX XX"
                                            value={formData.phoneNumber}
                                            onChange={e => updateField('phoneNumber', e.target.value)}
                                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label className="text-white/70 text-sm">Şifre</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                            <Input
                                                type="password"
                                                placeholder="Min. 8 karakter"
                                                value={formData.password}
                                                onChange={e => updateField('password', e.target.value)}
                                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-white/70 text-sm">Şifre Tekrar</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                            <Input
                                                type="password"
                                                placeholder="Şifreyi tekrarla"
                                                value={formData.confirmPassword}
                                                onChange={e => updateField('confirmPassword', e.target.value)}
                                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-2">
                                    <Button onClick={() => setStep(1)} variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5">
                                        <ArrowLeft className="w-4 h-4 mr-2" /> Geri
                                    </Button>
                                    <Button onClick={handleStep2Next} className="flex-1">
                                        Devam Et <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Terms Acceptance */}
                        {step === 3 && (
                            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                                    <p className="text-yellow-400 text-sm font-medium mb-1">⚖️ Yasal Uyarı</p>
                                    <p className="text-white/60 text-xs">
                                        Zühre Planet yalnızca 18 yaş üstü bireylere hizmet vermektedir.
                                        Platforma kayıt olarak 18+ olduğunuzu beyan etmiş sayılırsınız.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <Checkbox
                                            checked={hasAcceptedTerms}
                                            onCheckedChange={v => setHasAcceptedTerms(Boolean(v))}
                                            className="mt-0.5 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        />
                                        <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                                            <a href="/terms" target="_blank" className="text-primary hover:underline font-medium">Kullanım Koşulları</a>'nı okudum ve kabul ediyorum.
                                        </span>
                                    </label>

                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <Checkbox
                                            checked={hasAcceptedPrivacy}
                                            onCheckedChange={v => setHasAcceptedPrivacy(Boolean(v))}
                                            className="mt-0.5 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                        />
                                        <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                                            <a href="/privacy" target="_blank" className="text-primary hover:underline font-medium">Gizlilik Politikası</a> ve <a href="/kvkk" target="_blank" className="text-primary hover:underline font-medium">KVKK Metni</a>'ni okudum, onaylıyorum.
                                        </span>
                                    </label>
                                </div>

                                <p className="text-xs text-white/30">
                                    Tüm bilgileriniz KVKK kapsamında korunmaktadır. Bilgileriniz üçüncü şahıslarla paylaşılmaz.
                                </p>

                                <div className="flex gap-3 mt-4">
                                    <Button onClick={() => setStep(2)} variant="outline" className="flex-1 border-white/10 text-white hover:bg-white/5">
                                        <ArrowLeft className="w-4 h-4 mr-2" /> Geri
                                    </Button>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isLoading || !hasAcceptedTerms || !hasAcceptedPrivacy}
                                        className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                                    >
                                        {isLoading ? 'Kaydediliyor...' : 'Hesabı Oluştur'}
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
