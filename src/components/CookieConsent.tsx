/**
 * Cookie Consent Banner Component
 * 
 * KVKK/GDPR compliant cookie consent banner for the Escort Platform.
 * Displays cookie consent options with Accept/Reject/Customize choices.
 * Stores user preferences persistently and manages settings.
 * 
 * @module components/CookieConsent
 * @category Components - Legal
 * 
 * Features:
 * - KVKK/GDPR compliant consent banner
 * - Accept/Reject/Customize cookie options
 * - Persistent storage of user preferences
 * - Settings management and customization
 * - Local storage persistence across sessions
 * - Responsive design for all devices
 * - Smooth animations and transitions
 * - Direct link to cookie policy
 * - Cookie preference modal dialog
 * - TypeScript support
 * 
 * Cookie Types:
 * - Essential: Required for platform functionality
 * - Analytics: Performance and usage analysis
 * - Functional: User experience personalization
 * - Marketing: Personalized advertising
 * 
 * Storage:
 * - Saves preferences in localStorage under key "cookieConsent"
 * - Respects user choices across browser sessions
 * - Allows users to modify preferences anytime
 * 
 * @example
 * ```tsx
 * // Add to layout or main App component
 * <CookieConsent />
 * ```
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Cookie, Settings, X, AlertCircle, CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: number;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
    timestamp: Date.now()
  });

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookieConsent');
    
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
        setShowBanner(false);
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  // Save preferences to localStorage
  const savePreferences = (prefs: CookiePreferences) => {
    const withTimestamp = {
      ...prefs,
      timestamp: Date.now()
    };
    localStorage.setItem('cookieConsent', JSON.stringify(withTimestamp));
    setPreferences(withTimestamp);
    setShowBanner(false);
    setShowSettings(false);
    
    // Trigger custom event for other components to listen
    window.dispatchEvent(
      new CustomEvent('cookieConsentUpdated', { detail: withTimestamp })
    );
  };

  // Accept all cookies
  const handleAcceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
      timestamp: Date.now()
    });
  };

  // Reject all (except essential)
  const handleRejectAll = () => {
    savePreferences({
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
      timestamp: Date.now()
    });
  };

  // Save custom preferences
  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  // Toggle individual preference
  const togglePreference = (type: keyof Omit<CookiePreferences, 'timestamp'>) => {
    if (type === 'essential') return; // Can't disable essential
    
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Open settings
  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  // Close banner and settings
  const handleCloseBanner = () => {
    setShowBanner(false);
    setShowSettings(false);
  };

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showBanner && !showSettings && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <Card className="border-white/20 bg-gradient-to-r from-slate-900/95 to-slate-800/95 backdrop-blur-xl shadow-2xl max-w-4xl mx-auto">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  {/* Icon and Text */}
                  <div className="flex gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0">
                      <Cookie className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-white mb-1">Çerez Kullanımı</h3>
                      <p className="text-sm text-gray-300">
                        Web sitesi deneyiminizi iyileştirmek için çerezler kullanıyoruz. 
                        <a 
                          href="/cookies" 
                          className="text-amber-400 hover:text-amber-300 underline ml-1 inline-flex items-center gap-1"
                        >
                          Daha Fazla Bilgi
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 w-full md:w-auto">
                    <Button
                      onClick={handleRejectAll}
                      variant="outline"
                      size="sm"
                      className="flex-1 md:flex-none border-gray-600 text-gray-200 hover:bg-gray-800"
                    >
                      Reddet
                    </Button>
                    <Button
                      onClick={handleOpenSettings}
                      variant="outline"
                      size="sm"
                      className="flex-1 md:flex-none border-gray-600 text-gray-200 hover:bg-gray-800 gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="hidden md:inline">Ayarla</span>
                    </Button>
                    <Button
                      onClick={handleAcceptAll}
                      size="sm"
                      className="flex-1 md:flex-none bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                    >
                      Kabul Et
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseBanner}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <Card className="w-full max-w-2xl border-white/20 bg-gradient-to-b from-slate-950 to-slate-900 pointer-events-auto max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <CardHeader className="sticky top-0 bg-gradient-to-b from-slate-950 to-slate-950/50 border-b border-white/10">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                        <Settings className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-white">Çerez Tercihleri</CardTitle>
                    </div>
                    <button
                      onClick={handleCloseBanner}
                      className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </CardHeader>

                {/* Content */}
                <CardContent className="p-6 space-y-6">
                  {/* Description */}
                  <p className="text-sm text-gray-300">
                    Platform'un doğru şekilde çalışması için gerekli olan çerezler her zaman etkindir. 
                    Diğer çerez türlerini seçerek deneyiminizi kişiselleştirebilirsiniz.
                  </p>

                  {/* Cookie Types */}
                  <div className="space-y-3">
                    {/* Essential Cookies */}
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="pt-1">
                          <Checkbox
                            checked={preferences.essential}
                            disabled
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white flex items-center gap-2 mb-1">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            Gerekli Çerezler (Zorunlu)
                          </h4>
                          <p className="text-xs text-gray-400">
                            Platform'un çalışması için gereklidir. Oturum, güvenlik ve kimlik doğrulama çerezlerini içerir.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="bg-slate-800/50 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="pt-1">
                          <Checkbox
                            checked={preferences.analytics}
                            onCheckedChange={() => togglePreference('analytics')}
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white mb-1">
                            Analiz Çerezleri
                          </h4>
                          <p className="text-xs text-gray-400">
                            Platform'un performansını iyileştirmek ve kullanımı analiz etmek için kullanılır. 
                            Google Analytics, Sentry vb.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Functional Cookies */}
                    <div className="bg-slate-800/50 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="pt-1">
                          <Checkbox
                            checked={preferences.functional}
                            onCheckedChange={() => togglePreference('functional')}
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white mb-1">
                            İşlevsel Çerezler
                          </h4>
                          <p className="text-xs text-gray-400">
                            Deneyimi kişiselleştirmek için. Arama geçmişi, tercihler, favoriler vb. bilgileri kaydeder.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="bg-slate-800/50 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="pt-1">
                          <Checkbox
                            checked={preferences.marketing}
                            onCheckedChange={() => togglePreference('marketing')}
                            className="w-5 h-5"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white mb-1">
                            Pazarlama Çerezleri
                          </h4>
                          <p className="text-xs text-gray-400">
                            Kişiselleştirilmiş reklam göstermek için. Facebook, Google Ads vb. reklam ağları tarafından kullanılır.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex gap-2">
                    <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-blue-100">
                      Tercihleri istediğiniz zaman değiştirebilirsiniz. 
                      <a href="/privacy" className="underline hover:text-blue-50 ml-1">
                        Gizlilik Politikasını Oku
                      </a>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    <Button
                      onClick={handleRejectAll}
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-200 hover:bg-gray-800"
                    >
                      Tümünü Reddet
                    </Button>
                    <Button
                      onClick={handleAcceptAll}
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-200 hover:bg-gray-800"
                    >
                      Tümünü Kabul Et
                    </Button>
                    <Button
                      onClick={handleSavePreferences}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                    >
                      Kaydet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
