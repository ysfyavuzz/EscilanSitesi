/**
 * PendingUpdateBanner
 *
 * Shown on the escort's profile edit page when they have
 * pending (unapproved) changes. Displays what is waiting
 * for admin review with an optional inline preview.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronDown, ChevronUp, Eye, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FIELD_LABELS: Record<string, string> = {
    displayName: 'Görünen Ad',
    bio: 'Kısa Biyografi',
    biography: 'Uzun Biyografi',
    slogan: 'Slogan',
    city: 'Şehir',
    district: 'İlçe',
    age: 'Yaş',
};

interface PendingUpdateBannerProps {
    /** The raw pendingData JSON string from the escort profile */
    pendingData: string | null | undefined;
    /** Whether the profile has a pending update flag */
    hasPendingUpdate?: boolean;
    /** Optional: called when escort wants to cancel / withdraw update */
    onCancelUpdate?: () => void;
}

export default function PendingUpdateBanner({
    pendingData,
    hasPendingUpdate,
    onCancelUpdate,
}: PendingUpdateBannerProps) {
    const [expanded, setExpanded] = useState(false);

    if (!hasPendingUpdate || !pendingData) return null;

    let parsed: Record<string, any> = {};
    try {
        parsed = JSON.parse(pendingData);
    } catch {
        return null;
    }

    const changedFields = Object.keys(parsed).filter(k => FIELD_LABELS[k] !== undefined);

    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 overflow-hidden mb-6"
        >
            {/* Banner header */}
            <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setExpanded(e => !e)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                        <p className="text-yellow-300 font-semibold text-sm">
                            Değişiklikleriniz Admin Onayını Bekliyor
                        </p>
                        <p className="text-yellow-400/60 text-xs mt-0.5">
                            {changedFields.length} alan onaylandığında yayına girecek.
                        </p>
                    </div>
                </div>
                {expanded
                    ? <ChevronUp className="w-4 h-4 text-yellow-400/50" />
                    : <ChevronDown className="w-4 h-4 text-yellow-400/50" />}
            </button>

            {/* Expandable preview */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 space-y-3">
                            <div className="flex items-center gap-2 text-xs text-yellow-400/60 mb-1">
                                <Eye className="w-3.5 h-3.5" />
                                Bekleyen değişikliklerinizi aşağıda önizleyebilirsiniz:
                            </div>

                            <div className="bg-black/30 rounded-lg p-3 space-y-2">
                                {changedFields.map(field => (
                                    <div key={field} className="flex items-start gap-3 text-sm">
                                        <span className="text-white/40 w-32 flex-shrink-0">{FIELD_LABELS[field]}</span>
                                        <span className="text-yellow-200 break-words">{String(parsed[field])}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                                <div className="flex-1 text-xs text-yellow-400/50">
                                    Mevcut profiliniz admin onaylayınca güncellenecektir.
                                </div>
                                {onCancelUpdate && (
                                    <Button
                                        onClick={onCancelUpdate}
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 gap-1.5 text-xs"
                                    >
                                        <Edit3 className="w-3.5 h-3.5" />
                                        Talebi Geri Al
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
