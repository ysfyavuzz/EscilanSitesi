/**
 * Pending Profile Updates — Admin Panel Component
 *
 * Lists escort profiles with hasPendingUpdate=true.
 * Admin can see old vs. new values side-by-side,
 * then approve or reject changes with a reason.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
    CheckCircle2,
    XCircle,
    Clock,
    User,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    RefreshCw,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types (inline – adjust when trpc types are inferred)
// ---------------------------------------------------------------------------
interface PendingProfile {
    id: number;
    stageName: string;
    displayName?: string | null;
    city: string;
    bio?: string | null;
    slogan?: string | null;
    lastActive?: string | null;
    user?: { id: number; email: string; fullName?: string | null };
    pendingDataParsed?: Record<string, any> | null;
}

const FIELD_LABELS: Record<string, string> = {
    displayName: 'Görünen Ad',
    bio: 'Kısa Biyografi',
    biography: 'Uzun Biyografi',
    slogan: 'Slogan',
    city: 'Şehir',
    district: 'İlçe',
    age: 'Yaş',
};

// ---------------------------------------------------------------------------
// Sub-component: Diff Row
// ---------------------------------------------------------------------------
function DiffRow({ field, oldVal, newVal }: { field: string; oldVal: any; newVal: any }) {
    const label = FIELD_LABELS[field] ?? field;
    const changed = String(oldVal ?? '') !== String(newVal ?? '');
    if (!changed) return null;
    return (
        <div className="grid grid-cols-[auto_1fr_auto_1fr] items-start gap-2 py-2 border-b border-white/5 last:border-0 text-sm">
            <span className="text-white/40 w-28 flex-shrink-0">{label}</span>
            <span className="text-red-400 line-through break-words">{oldVal ?? '–'}</span>
            <ArrowRight className="w-4 h-4 text-white/30 flex-shrink-0 mt-0.5" />
            <span className="text-green-400 break-words">{newVal ?? '–'}</span>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Sub-component: Profile Card
// ---------------------------------------------------------------------------
function ProfileUpdateCard({
    profile,
    onApprove,
    onReject,
}: {
    profile: PendingProfile;
    onApprove: (id: number) => Promise<void>;
    onReject: (id: number, reason: string) => Promise<void>;
}) {
    const [expanded, setExpanded] = useState(false);
    const [rejectMode, setRejectMode] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const [loading, setLoading] = useState<'approve' | 'reject' | null>(null);

    const pending = profile.pendingDataParsed ?? {};
    const currentValues: Record<string, any> = {
        displayName: profile.displayName,
        bio: profile.bio,
        slogan: profile.slogan,
        city: profile.city,
    };
    const changedFields = Object.keys(pending).filter(
        k => FIELD_LABELS[k] && String(pending[k] ?? '') !== String((currentValues as any)[k] ?? '')
    );

    const handleApprove = async () => {
        setLoading('approve');
        try {
            await onApprove(profile.id);
            toast.success('Güncelleme onaylandı ve yayına alındı.');
        } catch (e: any) {
            toast.error(e?.message ?? 'Onay başarısız.');
        } finally {
            setLoading(null);
        }
    };

    const handleReject = async () => {
        if (rejectReason.trim().length < 5) {
            toast.error('Lütfen en az 5 karakter red nedeni yazın.');
            return;
        }
        setLoading('reject');
        try {
            await onReject(profile.id, rejectReason);
            toast.success('Güncelleme reddedildi.');
        } catch (e: any) {
            toast.error(e?.message ?? 'Red işlemi başarısız.');
        } finally {
            setLoading(null);
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
        >
            {/* Header */}
            <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors"
                onClick={() => setExpanded(e => !e)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <p className="text-white font-semibold">{profile.stageName}</p>
                        <p className="text-xs text-white/40">{profile.user?.email ?? '—'}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {changedFields.length} değişiklik
                    </Badge>
                    {expanded ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
                </div>
            </div>

            {/* Content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 pb-4 space-y-4">
                            {/* Diff viewer */}
                            <div className="bg-black/30 rounded-lg p-3">
                                <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Değişiklikler</p>
                                {changedFields.length > 0 ? (
                                    changedFields.map(field => (
                                        <DiffRow key={field} field={field} oldVal={(currentValues as any)[field]} newVal={pending[field]} />
                                    ))
                                ) : (
                                    <p className="text-white/30 text-xs">Gösterilecek farklılık yok.</p>
                                )}
                            </div>

                            {/* Reject reason input */}
                            {rejectMode && (
                                <div className="space-y-2">
                                    <p className="text-sm text-white/60">Red nedeni (escort'a gösterilecek):</p>
                                    <Textarea
                                        value={rejectReason}
                                        onChange={e => setRejectReason(e.target.value)}
                                        placeholder="Örn: Biyografi platform kurallarına uygun değil..."
                                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm resize-none"
                                        rows={3}
                                    />
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2">
                                {!rejectMode ? (
                                    <>
                                        <Button
                                            onClick={handleApprove}
                                            disabled={loading !== null}
                                            className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                                            size="sm"
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                            {loading === 'approve' ? 'Onaylanıyor...' : 'Onayla'}
                                        </Button>
                                        <Button
                                            onClick={() => setRejectMode(true)}
                                            variant="outline"
                                            className="gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10"
                                            size="sm"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Reddet
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            onClick={handleReject}
                                            disabled={loading !== null}
                                            className="gap-2 bg-red-600 hover:bg-red-700 text-white"
                                            size="sm"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            {loading === 'reject' ? 'Reddediliyor...' : 'Reddi Onayla'}
                                        </Button>
                                        <Button
                                            onClick={() => { setRejectMode(false); setRejectReason(''); }}
                                            variant="ghost"
                                            className="text-white/50"
                                            size="sm"
                                        >
                                            Vazgeç
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
interface PendingProfileUpdatesProps {
    profiles: PendingProfile[];
    isLoading?: boolean;
    onRefresh?: () => void;
    onApprove: (id: number) => Promise<void>;
    onReject: (id: number, reason: string) => Promise<void>;
}

export default function PendingProfileUpdates({
    profiles,
    isLoading,
    onRefresh,
    onApprove,
    onReject,
}: PendingProfileUpdatesProps) {
    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-white">Bekleyen Profil Güncellemeleri</h2>
                    <p className="text-white/40 text-sm">
                        {profiles.length} escort onay bekliyor
                    </p>
                </div>
                {onRefresh && (
                    <Button
                        onClick={onRefresh}
                        variant="outline"
                        size="sm"
                        disabled={isLoading}
                        className="gap-2 border-white/10 text-white/60 hover:text-white"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        Yenile
                    </Button>
                )}
            </div>

            {/* Empty state */}
            {!isLoading && profiles.length === 0 && (
                <div className="text-center py-16 text-white/30">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-500/40" />
                    <p className="text-white/50 font-medium">Onay bekleyen güncelleme yok.</p>
                    <p className="text-sm mt-1">Tüm güncellemeler işlendi 🎉</p>
                </div>
            )}

            {/* Loading skeleton */}
            {isLoading && (
                <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
                    ))}
                </div>
            )}

            {/* Cards */}
            <AnimatePresence mode="popLayout">
                {profiles.map(profile => (
                    <ProfileUpdateCard
                        key={profile.id}
                        profile={profile}
                        onApprove={onApprove}
                        onReject={onReject}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
