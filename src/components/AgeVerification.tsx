/**
 * AgeVerification Component
 * 
 * Modal component for verifying user age before accessing adult content.
 */

import { useState, useEffect } from 'react';
import { Shield, Calendar, X } from 'lucide-react';

interface AgeVerificationProps {
  onConfirm: () => void;
  minimumAge?: number;
}

const STORAGE_KEY = 'age-verified';

export default function AgeVerification({ onConfirm, minimumAge = 18 }: AgeVerificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY);
    if (!verified) setIsVisible(true);
    setIsLoading(false);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setIsVisible(false);
    onConfirm();
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  if (isLoading || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl"></div>

      {/* Modal */}
      <div className="relative glass-panel border-none max-w-md w-full p-10 animate-in fade-in zoom-in duration-500">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
            <Shield className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-4">
            YAŞ DOĞRULAMASI
          </h2>

          <p className="text-white/40 text-sm font-medium leading-relaxed mb-6">
            Bu web sitesinde yetişkinlere yönelik içerikler bulunmaktadır.
            Devam etmek için {minimumAge} yaşından büyük olduğunuzu onaylamanız gerekmektedir.
          </p>

          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 text-left">
            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
              <div className="text-[10px] font-black uppercase tracking-widest text-primary/80 leading-loose">
                <strong>UYARI:</strong> Bu siteyi kullanarak {minimumAge} yaşından büyük olduğunuzu
                ve yerel yasalarına uygun davrandığınızı kabul etmiş olursunuz.
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleConfirm}
            className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] italic shadow-2xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <Shield className="w-5 h-5" />
            {minimumAge} YAŞINDAN BÜYÜĞÜM, DEVAM ET
          </button>

          <button
            onClick={handleReject}
            className="w-full bg-white/5 text-white/40 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
          >
            ÇIKIŞ YAP
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-[9px] font-black uppercase tracking-widest text-white/20">
            Bu siteyi kullanarak{' '}
            <a href="#" className="text-primary hover:underline">Kullanım Koşullarını</a>
            {' '}ve{' '}
            <a href="#" className="text-primary hover:underline">Gizlilik Politikasını</a>
            {' '}kabul etmiş olursunuz.
          </p>
        </div>
      </div>
    </div>
  );
}

export function useAgeVerification() {
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY);
    setIsVerified(!!verified);
  }, []);
  return isVerified;
}

export function withAgeVerification<P extends object>(
  Component: React.ComponentType<P>
) {
  return function ProtectedComponent(props: P) {
    const [showVerification, setShowVerification] = useState(false);
    const isVerified = useAgeVerification();
    useEffect(() => {
      if (!isVerified) setShowVerification(true);
    }, [isVerified]);
    if (showVerification) return <AgeVerification onConfirm={() => setShowVerification(false)} />;
    return <Component {...props} />;
  };
}
