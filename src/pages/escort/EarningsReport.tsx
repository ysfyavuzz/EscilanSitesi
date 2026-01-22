/**
 * Escort Kazanç Raporu Sayfası
 * 
 * Escort'ların kazançlarını takip edebildiği detaylı rapor sayfası.
 * Günlük, haftalık ve aylık gelir istatistikleri ile randevu bazlı kazanç listesi sunar.
 * 
 * @module pages/escort/EarningsReport
 * @category Pages - Escort
 * 
 * Özellikler:
 * - Günlük/haftalık/aylık gelir kartları
 * - Randevu bazlı kazanç listesi (tablo formatında)
 * - Basit grafik simülasyonu (gradient bar chart)
 * - Komisyon kesintileri gösterimi
 * - Ödeme geçmişi listesi
 * - Toplam kazanç özeti
 * - Trend göstergeleri (artış/azalış)
 * - Loading ve error state'leri
 * - Responsive tasarım
 * - Dark mode desteği
 * 
 * @example
 * ```tsx
 * <EarningsReport />
 * ```
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card3D } from '@/components/3d/Card3D';
import { Button3D } from '@/components/3d/Button3D';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  CreditCard,
  Download,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

/**
 * Randevu kazanç verisi tipi
 */
interface RandevuKazanc {
  id: string;
  tarih: Date;
  musteriAdi: string;
  hizmet: string;
  sure: number;
  brutKazanc: number;
  komisyon: number;
  netKazanc: number;
}

/**
 * Ödeme geçmişi tipi
 */
interface OdemeGecmisi {
  id: string;
  tarih: Date;
  tutar: number;
  durum: 'tamamlandi' | 'beklemede';
  yontem: string;
}

/**
 * Dönem tipi
 */
type Donem = 'gunluk' | 'haftalik' | 'aylik';

/**
 * Animasyon varyantları
 */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

/**
 * Komisyon oranı (%)
 */
const KOMISYON_ORANI = 20;

/**
 * Mock randevu verileri
 */
const MOCK_RANDEVULAR: RandevuKazanc[] = [
  {
    id: '1',
    tarih: new Date('2024-01-20T14:00:00'),
    musteriAdi: 'Mehmet Y.',
    hizmet: 'Klasik + Masaj',
    sure: 2,
    brutKazanc: 3000,
    komisyon: 600,
    netKazanc: 2400
  },
  {
    id: '2',
    tarih: new Date('2024-01-20T18:00:00'),
    musteriAdi: 'Ali K.',
    hizmet: 'VIP Paket',
    sure: 4,
    brutKazanc: 8000,
    komisyon: 1600,
    netKazanc: 6400
  },
  {
    id: '3',
    tarih: new Date('2024-01-19T16:00:00'),
    musteriAdi: 'Can D.',
    hizmet: 'Eşlik',
    sure: 3,
    brutKazanc: 4500,
    komisyon: 900,
    netKazanc: 3600
  },
  {
    id: '4',
    tarih: new Date('2024-01-19T20:00:00'),
    musteriAdi: 'Ahmet S.',
    hizmet: 'Klasik',
    sure: 1,
    brutKazanc: 1500,
    komisyon: 300,
    netKazanc: 1200
  },
  {
    id: '5',
    tarih: new Date('2024-01-18T15:00:00'),
    musteriAdi: 'Emre T.',
    hizmet: 'Gecelik',
    sure: 8,
    brutKazanc: 10000,
    komisyon: 2000,
    netKazanc: 8000
  }
];

/**
 * Mock ödeme geçmişi
 */
const MOCK_ODEMELER: OdemeGecmisi[] = [
  {
    id: '1',
    tarih: new Date('2024-01-15'),
    tutar: 25000,
    durum: 'tamamlandi',
    yontem: 'Banka Havalesi'
  },
  {
    id: '2',
    tarih: new Date('2024-01-01'),
    tutar: 32000,
    durum: 'tamamlandi',
    yontem: 'Banka Havalesi'
  },
  {
    id: '3',
    tarih: new Date('2024-01-25'),
    tutar: 18500,
    durum: 'beklemede',
    yontem: 'Banka Havalesi'
  }
];

/**
 * Kazanç Raporu Sayfası Komponenti
 */
export default function EarningsReport() {
  const [yukleniyor, setYukleniyor] = useState<boolean>(false);
  const [secilidDonem, setSecilidDonem] = useState<Donem>('aylik');
  const [randevular] = useState<RandevuKazanc[]>(MOCK_RANDEVULAR);
  const [odemeler] = useState<OdemeGecmisi[]>(MOCK_ODEMELER);

  /**
   * Toplam kazançları hesapla
   */
  const toplamBrutKazanc = randevular.reduce((toplam, r) => toplam + r.brutKazanc, 0);
  const toplamKomisyon = randevular.reduce((toplam, r) => toplam + r.komisyon, 0);
  const toplamNetKazanc = randevular.reduce((toplam, r) => toplam + r.netKazanc, 0);

  /**
   * Dönem bazlı kazançlar (mock)
   */
  const donemKazanclari = {
    gunluk: { brut: 11000, net: 8800, trend: 12.5, trendYon: 'up' as const },
    haftalik: { brut: 45000, net: 36000, trend: 8.3, trendYon: 'up' as const },
    aylik: { brut: toplamBrutKazanc, net: toplamNetKazanc, trend: 5.2, trendYon: 'down' as const }
  };

  /**
   * Tarihi formatla
   */
  const formatTarih = (tarih: Date): string => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(tarih);
  };

  /**
   * Tarihi kısa formatla
   */
  const formatKisaTarih = (tarih: Date): string => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(tarih);
  };

  /**
   * Para formatla
   */
  const formatPara = (miktar: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0
    }).format(miktar);
  };

  /**
   * Raporu indir
   */
  const handleDownloadReport = async () => {
    setYukleniyor(true);
    try {
      // Mock download - gerçekte PDF oluşturulacak
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Rapor indiriliyor...');
    } catch (err) {
      alert('Rapor indirilirken hata oluştu');
    } finally {
      setYukleniyor(false);
    }
  };

  /**
   * Grafik bar'ı için yüzde hesapla
   */
  const calculateBarWidth = (kazanc: number): number => {
    const max = Math.max(...randevular.map(r => r.netKazanc));
    return (kazanc / max) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Başlık ve İndir Butonu */}
        <motion.div variants={fadeInUp} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Kazanç Raporları
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Detaylı gelir ve ödeme geçmişi
            </p>
          </div>
          <Button3D
            variant="primary"
            size="lg"
            onClick={handleDownloadReport}
            loading={yukleniyor}
            disabled={yukleniyor}
            className="flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Raporu İndir
          </Button3D>
        </motion.div>

        {/* Dönem Seçici */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="low" padding="md">
            <div className="flex gap-2">
              {(['gunluk', 'haftalik', 'aylik'] as Donem[]).map(donem => (
                <button
                  key={donem}
                  onClick={() => setSecilidDonem(donem)}
                  className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                    secilidDonem === donem
                      ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {donem === 'gunluk' && 'Günlük'}
                  {donem === 'haftalik' && 'Haftalık'}
                  {donem === 'aylik' && 'Aylık'}
                </button>
              ))}
            </div>
          </Card3D>
        </motion.div>

        {/* Kazanç Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brüt Kazanç */}
          <motion.div variants={fadeInUp}>
            <Card3D elevation="medium" padding="lg" glow>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Brüt Kazanç
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {formatPara(donemKazanclari[secilidDonem].brut)}
                  </h3>
                  <div className={`flex items-center gap-1 text-sm ${
                    donemKazanclari[secilidDonem].trendYon === 'up'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {donemKazanclari[secilidDonem].trendYon === 'up' ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                    %{donemKazanclari[secilidDonem].trend}
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 rounded-lg">
                  <DollarSign className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
              </div>
            </Card3D>
          </motion.div>

          {/* Komisyon */}
          <motion.div variants={fadeInUp}>
            <Card3D elevation="medium" padding="lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Komisyon (%{KOMISYON_ORANI})
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {formatPara(donemKazanclari[secilidDonem].brut * (KOMISYON_ORANI / 100))}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Platform ücreti
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </Card3D>
          </motion.div>

          {/* Net Kazanç */}
          <motion.div variants={fadeInUp}>
            <Card3D elevation="medium" padding="lg" glow>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Net Kazanç
                  </p>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {formatPara(donemKazanclari[secilidDonem].net)}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Komisyon sonrası
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </Card3D>
          </motion.div>
        </div>

        {/* Basit Grafik Simülasyonu */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Randevu Bazlı Kazanç Grafiği
            </h2>
            <div className="space-y-4">
              {randevular.slice(0, 5).map(randevu => (
                <div key={randevu.id} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {randevu.musteriAdi} - {randevu.hizmet}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {formatPara(randevu.netKazanc)}
                    </span>
                  </div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${calculateBarWidth(randevu.netKazanc)}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-rose-600 to-pink-600 rounded-lg flex items-center justify-end pr-3"
                    >
                      <span className="text-white text-xs font-semibold">
                        {randevu.sure}h
                      </span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </Card3D>
        </motion.div>

        {/* Randevu Bazlı Kazanç Tablosu */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Randevu Detayları
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Tarih
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Müşteri
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Hizmet
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Süre
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Brüt
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Komisyon
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Net
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {randevular.map((randevu) => (
                    <tr
                      key={randevu.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {formatTarih(randevu.tarih)}
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {randevu.musteriAdi}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {randevu.hizmet}
                      </td>
                      <td className="px-4 py-4 text-sm text-center text-gray-600 dark:text-gray-400">
                        {randevu.sure}h
                      </td>
                      <td className="px-4 py-4 text-sm text-right text-gray-900 dark:text-white font-medium">
                        {formatPara(randevu.brutKazanc)}
                      </td>
                      <td className="px-4 py-4 text-sm text-right text-orange-600 dark:text-orange-400">
                        -{formatPara(randevu.komisyon)}
                      </td>
                      <td className="px-4 py-4 text-sm text-right font-bold text-green-600 dark:text-green-400">
                        {formatPara(randevu.netKazanc)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50 dark:bg-gray-800 font-bold">
                    <td colSpan={4} className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                      TOPLAM
                    </td>
                    <td className="px-4 py-4 text-sm text-right text-gray-900 dark:text-white">
                      {formatPara(toplamBrutKazanc)}
                    </td>
                    <td className="px-4 py-4 text-sm text-right text-orange-600 dark:text-orange-400">
                      -{formatPara(toplamKomisyon)}
                    </td>
                    <td className="px-4 py-4 text-sm text-right text-green-600 dark:text-green-400">
                      {formatPara(toplamNetKazanc)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card3D>
        </motion.div>

        {/* Ödeme Geçmişi */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="w-6 h-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Ödeme Geçmişi
              </h2>
            </div>

            <div className="space-y-3">
              {odemeler.map(odeme => (
                <div
                  key={odeme.id}
                  className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-rose-300 dark:hover:border-rose-700 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      odeme.durum === 'tamamlandi'
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-yellow-100 dark:bg-yellow-900/30'
                    }`}>
                      <CreditCard className={`w-5 h-5 ${
                        odeme.durum === 'tamamlandi'
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-yellow-600 dark:text-yellow-400'
                      }`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatPara(odeme.tutar)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatKisaTarih(odeme.tarih)} • {odeme.yontem}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    odeme.durum === 'tamamlandi'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {odeme.durum === 'tamamlandi' ? 'Tamamlandı' : 'Beklemede'}
                  </span>
                </div>
              ))}
            </div>
          </Card3D>
        </motion.div>
      </motion.div>
    </div>
  );
}
