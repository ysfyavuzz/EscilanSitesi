/**
 * Chat Rules Modal
 *
 * Displayed on the user's first chat attempt.
 * The user must accept the platform communication rules
 * before they can send any messages.
 *
 * After acceptance, `auth.acceptChatRules` tRPC mutation is called.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { MessageSquare, ShieldCheck, AlertTriangle } from 'lucide-react';

const CHAT_RULES = [
    { icon: '🚫', title: 'Hakaret ve Küfür Yasak', desc: 'Diğer kullanıcılara hakaret, küfür veya aşağılayıcı dil kesinlikle yasaktır.' },
    { icon: '🔒', title: 'Kişisel Bilgi Güvenliği', desc: 'Kimlik belgesi, banka bilgisi veya hassas kişisel bilgiler istemek ve paylaşmak yasaktır.' },
    { icon: '📵', title: 'Spam ve Reklam Yasak', desc: 'Platform dışı bağlantı paylaşımı, promosyon mesajı ve spam içerik gönderilmesi yasaktır.' },
    { icon: '🚨', title: 'Tehdit ve Taciz Yasak', desc: 'Tehdit, ısrarcı taciz, engellenen kişiyle farklı hesaptan iletişim kurma yasaktır.' },
    { icon: '💬', title: 'Gerçek Niyet', desc: 'Sohbet randevu ve hizmet talebi amaçlı kullanılmalıdır. Sahte randevu ve yanıltıcı mesajlar yasaktır.' },
    { icon: '📸', title: 'Medya İçerikleri', desc: 'Paylaşılan görseller platformun içerik politikasına uygun olmalıdır. Uygunsuz içerik tespiti hesap askıya almayla sonuçlanır.' },
];

interface ChatRulesModalProps {
    onAccept: () => Promise<void>;
    onDecline: () => void;
}

export default function ChatRulesModal({ onAccept, onDecline }: ChatRulesModalProps) {
    const [hasAccepted, setHasAccepted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleAccept = async () => {
        if (!hasAccepted) return;
        setIsLoading(true);
        try {
            await onAccept();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-lg bg-[#0d0d1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
                {/* Header */}
                <div className="px-8 pt-8 pb-4 flex-shrink-0">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Mesajlaşma Kuralları</h2>
                            <p className="text-white/50 text-xs">Sohbet başlatmadan önce lütfen okuyun</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mt-4">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        <p className="text-xs text-yellow-300">
                            Kuralların ihlali hesap askıya alma veya kalıcı ban ile sonuçlanabilir. Tüm mesajlar kayıt altına alınmaktadır.
                        </p>
                    </div>
                </div>

                {/* Rules list — scrollable */}
                <div className="px-8 overflow-y-auto flex-1 pb-2">
                    <div className="space-y-3">
                        {CHAT_RULES.map((rule, idx) => (
                            <div key={idx} className="flex gap-3 p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                <span className="text-xl flex-shrink-0">{rule.icon}</span>
                                <div>
                                    <p className="text-white text-sm font-semibold">{rule.title}</p>
                                    <p className="text-white/50 text-xs mt-0.5">{rule.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 flex-shrink-0 border-t border-white/5">
                    <label className="flex items-start gap-3 cursor-pointer mb-5">
                        <Checkbox
                            checked={hasAccepted}
                            onCheckedChange={v => setHasAccepted(Boolean(v))}
                            className="mt-0.5 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span className="text-sm text-white/70">
                            Yukarıdaki mesajlaşma kurallarını okudum, anladım ve kabul ediyorum. Bu kuralları ihlal etmem durumunda hesabımın işlemlere kapatılabileceğini kabul ediyorum.
                        </span>
                    </label>

                    <div className="flex gap-3">
                        <Button
                            onClick={onDecline}
                            variant="outline"
                            className="flex-1 border-white/10 text-white hover:bg-white/5"
                        >
                            Vazgeç
                        </Button>
                        <Button
                            onClick={handleAccept}
                            disabled={!hasAccepted || isLoading}
                            className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
                        >
                            {isLoading ? 'Kaydediliyor...' : (
                                <span className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" /> Kabul Et ve Sohbet Başlat
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
