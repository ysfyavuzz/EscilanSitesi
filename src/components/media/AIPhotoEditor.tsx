import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Wand2, UserX, UserCheck, ShieldCheck, Sparkles, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

interface AIPhotoEditorProps {
    photoId: number;
    imageUrl: string;
    onUpdate: (newImageUrl: string) => void;
    onClose: () => void;
}

export function AIPhotoEditor({ photoId, imageUrl, onUpdate, onClose }: AIPhotoEditorProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentImage, setCurrentImage] = useState(imageUrl);
    const [isFaceHidden, setIsFaceHidden] = useState(false);

    const applyEffectMutation = trpc.media.applyAIEffect.useMutation();
    const togglePrivacyMutation = trpc.media.toggleFacePrivacy.useMutation();

    const handleEffect = async (effect: 'remove_bg' | 'retouch') => {
        setIsProcessing(true);
        try {
            const result = await applyEffectMutation.mutateAsync({ photoId, effect });
            setCurrentImage(result.newUrl);
            onUpdate(result.newUrl);
            toast.success(effect === 'remove_bg' ? 'Arka plan başarıyla silindi' : 'Cilt kusurları düzeltildi');
        } catch (err) {
            toast.error('AI işlemi sırasında bir hata oluştu.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePrivacyToggle = async () => {
        setIsProcessing(true);
        try {
            const result = await togglePrivacyMutation.mutateAsync({
                photoId,
                isHidden: !isFaceHidden
            });
            setIsFaceHidden(result.isHidden);
            if (result.isHidden && result.maskedUrl) {
                setCurrentImage(result.maskedUrl);
            } else {
                setCurrentImage(imageUrl);
            }
            toast.success(isFaceHidden ? 'Yüz maskesi kaldırıldı' : 'Yüz başarıyla maskelendi');
        } catch (err) {
            toast.error('Gizlilik ayarı değiştirilemedi.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Card className="p-6 max-w-4xl mx-auto bg-black/90 border-zinc-800 text-white shadow-2xl overflow-hidden relative">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Wand2 className="text-rose-500" /> AI Görsel Editörü
                </h2>
                <Button variant="ghost" onClick={onClose} className="hover:bg-zinc-800">Kapat</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sol Panel: Araçlar */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Hızlı Düzenleme</p>
                        <Button
                            disabled={isProcessing}
                            onClick={() => handleEffect('remove_bg')}
                            className="w-full justify-start gap-4 h-12 bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
                            variant="outline"
                        >
                            <ImageIcon className="h-5 w-5 text-blue-400" /> Arka Planı Sil
                        </Button>
                        <Button
                            disabled={isProcessing}
                            onClick={() => handleEffect('retouch')}
                            className="w-full justify-start gap-4 h-12 bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
                            variant="outline"
                        >
                            <Sparkles className="h-5 w-5 text-yellow-400" /> AI Cilt Rötuşu
                        </Button>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-zinc-800">
                        <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">Gizlilik ve Maskeleme</p>
                        <Button
                            disabled={isProcessing}
                            onClick={handlePrivacyToggle}
                            className={`w-full justify-start gap-4 h-12 border-zinc-800 transition-all ${isFaceHidden ? 'bg-rose-500/20 text-rose-500 hover:bg-rose-500/30' : 'bg-zinc-900 hover:bg-zinc-800'
                                }`}
                            variant="outline"
                        >
                            {isFaceHidden ? <UserCheck className="h-5 w-5" /> : <UserX className="h-5 w-5 text-rose-500" />}
                            {isFaceHidden ? 'Yüz Maskesini Kaldır' : 'Otomatik Yüz Maskele'}
                        </Button>
                        <p className="text-[10px] text-zinc-500 mt-2 px-1">
                            * Maskeleme özelliği MediaPipe AI kullanarak yüzünüzü otomatik tespit eder ve şık bir maske tasarımı yerleştirir.
                        </p>
                    </div>

                    <div className="mt-8 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                        <div className="flex items-center gap-2 text-zinc-300 text-xs mb-2">
                            <ShieldCheck className="h-4 w-4 text-green-500" /> Güvenli İşleme
                        </div>
                        <p className="text-[11px] text-zinc-500 italic">
                            Fotoğraflarınız AI işleme sırasında şifrelenir ve işlem bittikten sonra orijinal hali sadece size özel kalır.
                        </p>
                    </div>
                </div>

                {/* Sağ Panel: Önizleme */}
                <div className="md:col-span-2 relative aspect-[3/4] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950">
                    {isProcessing && (
                        <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
                            <Loader2 className="h-12 w-12 animate-spin text-rose-500 mb-4" />
                            <p className="text-lg font-medium animate-pulse">AI İşlem Yapıyor...</p>
                            <span className="text-xs text-zinc-400 mt-2 text-center px-8">Bu işlem görselin karmaşıklığına bağlı olarak 3-5 saniye sürebilir.</span>
                        </div>
                    )}

                    <img
                        src={currentImage}
                        alt="AI Preview"
                        className="w-full h-full object-cover select-none"
                    />

                    {!isProcessing && isFaceHidden && (
                        <div className="absolute top-4 left-4 inline-flex items-center gap-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                            Yüz Maskelendi
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
