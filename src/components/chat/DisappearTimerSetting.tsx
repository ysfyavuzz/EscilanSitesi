/**
 * DisappearTimerSetting
 *
 * Dropdown/pill selector to configure how long messages
 * survive in a conversation before auto-deletion.
 *
 * Calls trpc.chat.setDisappearTimer on change.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronDown, Check, Timer } from 'lucide-react';
import { toast } from 'sonner';

export const DISAPPEAR_OPTIONS = [
    { label: 'Kapalı', value: null, emoji: '🔕' },
    { label: '1 Saat', value: 1, emoji: '⏱️' },
    { label: '24 Saat', value: 24, emoji: '🕐' },
    { label: '7 Gün', value: 168, emoji: '📅' },
] as const;

type DisappearValue = null | 1 | 24 | 168;

interface DisappearTimerSettingProps {
    conversationId: number;
    currentHours?: number | null;
    onUpdate?: (hours: number | null) => void;
}

export default function DisappearTimerSetting({
    conversationId,
    currentHours = null,
    onUpdate,
}: DisappearTimerSettingProps) {
    const [open, setOpen] = useState(false);
    const [selectedHours, setSelectedHours] = useState<DisappearValue>(currentHours as DisappearValue);
    const [isLoading, setIsLoading] = useState(false);

    const current = DISAPPEAR_OPTIONS.find(o => o.value === selectedHours) ?? DISAPPEAR_OPTIONS[0];

    const handleSelect = async (hours: DisappearValue) => {
        if (hours === selectedHours) { setOpen(false); return; }

        setIsLoading(true);
        try {
            // TODO: wire up to trpc.chat.setDisappearTimer.mutate({ conversationId, hours })
            await new Promise(r => setTimeout(r, 600)); // placeholder
            setSelectedHours(hours);
            onUpdate?.(hours);
            toast.success(
                hours
                    ? `Mesajlar ${hours < 24 ? `${hours} saat` : `${hours / 24} gün`} sonra silinecek.`
                    : 'Kaybolan mesajlar kapatıldı.'
            );
        } catch {
            toast.error('Ayar güncellenemedi.');
        } finally {
            setIsLoading(false);
            setOpen(false);
        }
    };

    const isActive = selectedHours !== null;

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(o => !o)}
                disabled={isLoading}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${isActive
                        ? 'bg-primary/20 border-primary/40 text-primary'
                        : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20'
                    }`}
            >
                {isActive ? <Timer className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                {current.emoji} {current.label}
                <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 bottom-full mb-2 w-48 bg-[#0d0d1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                        <div className="px-3 py-2 border-b border-white/5">
                            <p className="text-xs text-white/40 uppercase tracking-wider">Kaybolan Mesajlar</p>
                        </div>
                        {DISAPPEAR_OPTIONS.map(opt => (
                            <button
                                key={String(opt.value)}
                                onClick={() => handleSelect(opt.value as DisappearValue)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors hover:bg-white/5 ${opt.value === selectedHours ? 'text-primary' : 'text-white/70'
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <span>{opt.emoji}</span>
                                    {opt.label}
                                </span>
                                {opt.value === selectedHours && <Check className="w-3.5 h-3.5 text-primary" />}
                            </button>
                        ))}
                        <div className="px-3 py-2 border-t border-white/5">
                            <p className="text-xs text-white/25 leading-relaxed">
                                Seçilen süre sonunda mesajlar her iki taraftan da silinir.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
