/**
 * Bildirimler Sayfası
 * 
 * Müşterilerin bildirimlerini görüntüleyip yönetebilecekleri sayfa.
 * Randevu, mesaj, sistem ve ödeme bildirimleri gösterilir.
 * 
 * @module pages/customer/Notifications
 * @category Pages/Customer
 * 
 * Özellikler:
 * - Bildirim listesi (grid/list görünüm)
 * - Okundu/okunmadı durumu gösterimi
 * - Bildirim türü filtreleme (randevu, mesaj, sistem, ödeme)
 * - Tarih filtreleme
 * - Toplu "tümünü okundu işaretle" butonu
 * - Bildirim silme (tek tek veya toplu)
 * - Bildirim ayarları linki
 * - Her bildirimde ikon, başlık, mesaj, tarih
 * - 3D Card tasarım
 * - Sayfalama (10 bildirim per sayfa)
 * 
 * @example
 * ```tsx
 * import Notifications from '@/pages/customer/Notifications';
 * 
 * <Route path="/customer/notifications" element={<Notifications />} />
 * ```
 */

import * as React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Calendar, 
  MessageSquare, 
  Settings, 
  CreditCard,
  CheckCheck,
  Trash2,
  Filter,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { Card3D } from '@/components/3d/Card3D';
import { Button3D } from '@/components/3d/Button3D';
import { cn } from '@/lib/utils';

/** Bildirim türleri */
type BildirimTuru = 'randevu' | 'mesaj' | 'sistem' | 'odeme';

/** Bildirim arayüzü */
interface Bildirim {
  id: string;
  tur: BildirimTuru;
  baslik: string;
  mesaj: string;
  tarih: string;
  okundu: boolean;
}

/** Bildirim türü konfigürasyonu */
const bildirimTurleri: Record<BildirimTuru, { ikon: typeof Bell; renk: string; etiket: string }> = {
  randevu: { ikon: Calendar, renk: 'text-blue-500', etiket: 'Randevu' },
  mesaj: { ikon: MessageSquare, renk: 'text-green-500', etiket: 'Mesaj' },
  sistem: { ikon: Bell, renk: 'text-purple-500', etiket: 'Sistem' },
  odeme: { ikon: CreditCard, renk: 'text-pink-500', etiket: 'Ödeme' },
};

/** Mock bildirim verileri */
const mockBildirimler: Bildirim[] = [
  {
    id: '1',
    tur: 'randevu',
    baslik: 'Randevu Onaylandı',
    mesaj: 'Ayşe ile 15 Ocak 2025 tarihli randevunuz onaylandı.',
    tarih: '2025-01-14T10:30:00',
    okundu: false,
  },
  {
    id: '2',
    tur: 'mesaj',
    baslik: 'Yeni Mesaj',
    mesaj: 'Elif size yeni bir mesaj gönderdi.',
    tarih: '2025-01-14T09:15:00',
    okundu: false,
  },
  {
    id: '3',
    tur: 'odeme',
    baslik: 'Ödeme Başarılı',
    mesaj: '500₺ tutarında kredi yüklemesi başarıyla tamamlandı.',
    tarih: '2025-01-13T18:45:00',
    okundu: true,
  },
  {
    id: '4',
    tur: 'sistem',
    baslik: 'Profil Güncellendi',
    mesaj: 'Profil bilgileriniz başarıyla güncellendi.',
    tarih: '2025-01-13T14:20:00',
    okundu: true,
  },
  {
    id: '5',
    tur: 'randevu',
    baslik: 'Randevu Hatırlatması',
    mesaj: 'Yarın saat 14:00\'da randevunuz var.',
    tarih: '2025-01-12T20:00:00',
    okundu: false,
  },
  {
    id: '6',
    tur: 'mesaj',
    baslik: 'Yeni Mesaj',
    mesaj: 'Zeynep size yeni bir mesaj gönderdi.',
    tarih: '2025-01-12T16:30:00',
    okundu: true,
  },
  {
    id: '7',
    tur: 'odeme',
    baslik: 'Puan Kazandınız',
    mesaj: '100 sadakat puanı kazandınız!',
    tarih: '2025-01-11T12:00:00',
    okundu: true,
  },
  {
    id: '8',
    tur: 'randevu',
    baslik: 'Randevu İptal Edildi',
    mesaj: 'Selin ile olan randevunuz iptal edildi.',
    tarih: '2025-01-11T10:00:00',
    okundu: true,
  },
  {
    id: '9',
    tur: 'sistem',
    baslik: 'Yeni Özellik',
    mesaj: 'Artık favorilerinize not ekleyebilirsiniz.',
    tarih: '2025-01-10T09:00:00',
    okundu: false,
  },
  {
    id: '10',
    tur: 'mesaj',
    baslik: 'Yeni Mesaj',
    mesaj: 'Ayşe size yeni bir mesaj gönderdi.',
    tarih: '2025-01-10T08:00:00',
    okundu: true,
  },
  {
    id: '11',
    tur: 'randevu',
    baslik: 'Randevu Tamamlandı',
    mesaj: 'Randevunuz başarıyla tamamlandı. Değerlendirme yapabilirsiniz.',
    tarih: '2025-01-09T16:00:00',
    okundu: true,
  },
  {
    id: '12',
    tur: 'odeme',
    baslik: 'Ödeme Alındı',
    mesaj: '250₺ tutarında ödeme alındı.',
    tarih: '2025-01-09T14:00:00',
    okundu: true,
  },
];

/** Animasyon varyantları */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Notifications() {
  const [bildirimler, setBildirimler] = React.useState<Bildirim[]>(mockBildirimler);
  const [seciliBildirimler, setSeciliBildirimler] = React.useState<Set<string>>(new Set());
  const [aktifFiltre, setAktifFiltre] = React.useState<BildirimTuru | 'tumu'>('tumu');
  const [mevcutSayfa, setMevcutSayfa] = React.useState(1);
  const sayfaBasinaOge = 10;

  /** Filtrelenmiş bildirimler */
  const filtrelenmisler = React.useMemo(() => {
    return bildirimler.filter(b => aktifFiltre === 'tumu' || b.tur === aktifFiltre);
  }, [bildirimler, aktifFiltre]);

  /** Sayfalanmış bildirimler */
  const sayfalanmislar = React.useMemo(() => {
    const baslangic = (mevcutSayfa - 1) * sayfaBasinaOge;
    const bitis = baslangic + sayfaBasinaOge;
    return filtrelenmisler.slice(baslangic, bitis);
  }, [filtrelenmisler, mevcutSayfa]);

  /** Toplam sayfa sayısı */
  const toplamSayfa = Math.ceil(filtrelenmisler.length / sayfaBasinaOge);

  /** Okunmamış bildirim sayısı */
  const okunmamisSayisi = bildirimler.filter(b => !b.okundu).length;

  /** Tüm bildirimleri okundu işaretle */
  const tumunuOkunduIsaretle = () => {
    setBildirimler(prev => prev.map(b => ({ ...b, okundu: true })));
  };

  /** Bildirimi okundu işaretle */
  const bildirimOkunduIsaretle = (id: string) => {
    setBildirimler(prev => 
      prev.map(b => b.id === id ? { ...b, okundu: true } : b)
    );
  };

  /** Bildirim sil */
  const bildirimSil = (id: string) => {
    setBildirimler(prev => prev.filter(b => b.id !== id));
    setSeciliBildirimler(prev => {
      const yeni = new Set(prev);
      yeni.delete(id);
      return yeni;
    });
  };

  /** Seçili bildirimleri sil */
  const secilileriSil = () => {
    setBildirimler(prev => prev.filter(b => !seciliBildirimler.has(b.id)));
    setSeciliBildirimler(new Set());
  };

  /** Bildirim seçimi toggle */
  const bildirimSecToggle = (id: string) => {
    setSeciliBildirimler(prev => {
      const yeni = new Set(prev);
      if (yeni.has(id)) {
        yeni.delete(id);
      } else {
        yeni.add(id);
      }
      return yeni;
    });
  };

  /** Tarihi formatla */
  const tarihFormatla = (tarih: string) => {
    const d = new Date(tarih);
    const simdi = new Date();
    const farkMs = simdi.getTime() - d.getTime();
    const farkDakika = Math.floor(farkMs / 60000);
    const farkSaat = Math.floor(farkMs / 3600000);
    const farkGun = Math.floor(farkMs / 86400000);

    if (farkDakika < 1) return 'Şimdi';
    if (farkDakika < 60) return `${farkDakika} dakika önce`;
    if (farkSaat < 24) return `${farkSaat} saat önce`;
    if (farkGun < 7) return `${farkGun} gün önce`;
    
    return d.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Başlık ve İstatistikler */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Bildirimler
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Tüm bildirimlerinizi buradan yönetin
              </p>
            </div>
            <button
              onClick={() => window.location.href = '/customer/settings?tab=notifications'}
              className="flex items-center gap-2 text-gray-600 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span className="hidden sm:inline">Bildirim Ayarları</span>
            </button>
          </div>

          {/* İstatistik Kartları */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card3D padding="sm" className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                {bildirimler.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Toplam</div>
            </Card3D>
            <Card3D padding="sm" className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {okunmamisSayisi}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Okunmamış</div>
            </Card3D>
            <Card3D padding="sm" className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {bildirimler.filter(b => b.tur === 'randevu').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Randevu</div>
            </Card3D>
            <Card3D padding="sm" className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {bildirimler.filter(b => b.tur === 'mesaj').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Mesaj</div>
            </Card3D>
          </div>
        </motion.div>

        {/* Filtreler ve Aksiyonlar */}
        <Card3D className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filtre Butonları */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setAktifFiltre('tumu')}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all',
                  aktifFiltre === 'tumu'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                )}
              >
                <Filter className="h-4 w-4 inline mr-2" />
                Tümü ({bildirimler.length})
              </button>
              {(Object.entries(bildirimTurleri) as [BildirimTuru, typeof bildirimTurleri[BildirimTuru]][]).map(([tur, config]) => (
                <button
                  key={tur}
                  onClick={() => setAktifFiltre(tur)}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-all',
                    aktifFiltre === tur
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                  )}
                >
                  <config.ikon className={cn('h-4 w-4 inline mr-2', aktifFiltre === tur ? 'text-white' : config.renk)} />
                  {config.etiket} ({bildirimler.filter(b => b.tur === tur).length})
                </button>
              ))}
            </div>

            {/* Aksiyon Butonları */}
            <div className="flex gap-2">
              {seciliBildirimler.size > 0 && (
                <Button3D
                  variant="danger"
                  size="sm"
                  onClick={secilileriSil}
                >
                  <Trash2 className="h-4 w-4" />
                  Seçilileri Sil ({seciliBildirimler.size})
                </Button3D>
              )}
              {okunmamisSayisi > 0 && (
                <Button3D
                  variant="primary"
                  size="sm"
                  onClick={tumunuOkunduIsaretle}
                >
                  <CheckCheck className="h-4 w-4" />
                  Tümünü Okundu İşaretle
                </Button3D>
              )}
            </div>
          </div>
        </Card3D>

        {/* Bildirim Listesi */}
        {filtrelenmisler.length === 0 ? (
          <Card3D className="text-center py-12">
            <Bell className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Bildirim Yok
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {aktifFiltre === 'tumu' 
                ? 'Henüz hiç bildiriminiz yok.'
                : `${bildirimTurleri[aktifFiltre].etiket} türünde bildirim bulunamadı.`
              }
            </p>
          </Card3D>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {sayfalanmislar.map((bildirim) => {
                const config = bildirimTurleri[bildirim.tur];
                const Ikon = config.ikon;
                const secili = seciliBildirimler.has(bildirim.id);

                return (
                  <motion.div key={bildirim.id} variants={itemVariants}>
                    <Card3D
                      className={cn(
                        'cursor-pointer transition-all',
                        !bildirim.okundu && 'border-l-4 border-l-rose-600',
                        secili && 'ring-2 ring-rose-600'
                      )}
                      onClick={() => !bildirim.okundu && bildirimOkunduIsaretle(bildirim.id)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={secili}
                          onChange={(e) => {
                            e.stopPropagation();
                            bildirimSecToggle(bildirim.id);
                          }}
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-600"
                        />

                        {/* İkon */}
                        <div className={cn(
                          'flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center',
                          !bildirim.okundu 
                            ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800'
                        )}>
                          <Ikon className={cn('h-6 w-6', bildirim.okundu && config.renk)} />
                        </div>

                        {/* İçerik */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className={cn(
                              'font-semibold text-gray-900 dark:text-gray-100',
                              !bildirim.okundu && 'font-bold'
                            )}>
                              {bildirim.baslik}
                            </h3>
                            <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              {tarihFormatla(bildirim.tarih)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {bildirim.mesaj}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                              bildirim.okundu 
                                ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            )}>
                              {bildirim.okundu ? 'Okundu' : 'Okunmadı'}
                            </span>
                          </div>
                        </div>

                        {/* Sil Butonu */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            bildirimSil(bildirim.id);
                          }}
                          className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    </Card3D>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Pagination */}
            {toplamSayfa > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button3D
                  variant="outline"
                  size="sm"
                  onClick={() => setMevcutSayfa(prev => Math.max(1, prev - 1))}
                  disabled={mevcutSayfa === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button3D>
                
                <div className="flex gap-1">
                  {Array.from({ length: toplamSayfa }, (_, i) => i + 1).map(sayfa => (
                    <button
                      key={sayfa}
                      onClick={() => setMevcutSayfa(sayfa)}
                      className={cn(
                        'w-10 h-10 rounded-lg font-medium transition-all',
                        sayfa === mevcutSayfa
                          ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      )}
                    >
                      {sayfa}
                    </button>
                  ))}
                </div>

                <Button3D
                  variant="outline"
                  size="sm"
                  onClick={() => setMevcutSayfa(prev => Math.min(toplamSayfa, prev + 1))}
                  disabled={mevcutSayfa === toplamSayfa}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button3D>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
