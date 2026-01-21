/**
 * Escort Takvim Yönetim Sayfası
 * 
 * Escort'ların çalışma saatlerini ve müsaitlik durumlarını yönetebildiği takvim sayfası.
 * Haftalık çalışma planı ve özel tatil günleri yönetimi sağlar.
 * 
 * @module pages/escort/CalendarManager
 * @category Pages - Escort
 * 
 * Özellikler:
 * - Haftalık çalışma saatleri grid'i
 * - Özel tatil günleri ekleme ve silme
 * - Müsaitlik durumu toggle (Müsait/Meşgul)
 * - Takvim görünümü (haftalık)
 * - Randevu blokları görünümü
 * - Saat bazlı müsaitlik ayarlama
 * - Loading ve error state'leri
 * - Responsive tasarım
 * - Dark mode desteği
 * 
 * @example
 * ```tsx
 * <CalendarManager />
 * ```
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card3D } from '@/components/3d/Card3D';
import { Button3D } from '@/components/3d/Button3D';
import { Calendar, Clock, X, Plus, CheckCircle2, XCircle } from 'lucide-react';

/**
 * Çalışma saati bloğu tipi
 */
interface CalismaBlok {
  gun: string;
  baslangic: string;
  bitis: string;
  aktif: boolean;
}

/**
 * Tatil günü tipi
 */
interface TatilGunu {
  id: string;
  tarih: Date;
  aciklama: string;
}

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
 * Haftanın günleri
 */
const GUNLER = [
  { key: 'pazartesi', label: 'Pazartesi' },
  { key: 'sali', label: 'Salı' },
  { key: 'carsamba', label: 'Çarşamba' },
  { key: 'persembe', label: 'Perşembe' },
  { key: 'cuma', label: 'Cuma' },
  { key: 'cumartesi', label: 'Cumartesi' },
  { key: 'pazar', label: 'Pazar' }
];

/**
 * Takvim Yönetim Sayfası Komponenti
 */
export default function CalendarManager() {
  const [yukleniyor, setYukleniyor] = useState<boolean>(false);
  const [kaydedildi, setKaydedildi] = useState<boolean>(false);
  const [hata, setHata] = useState<string>('');
  const [genelMusait, setGenelMusait] = useState<boolean>(true);

  // Çalışma saatleri - Mock data
  const [calismaSaatleri, setCalismaSaatleri] = useState<CalismaBlok[]>([
    { gun: 'pazartesi', baslangic: '10:00', bitis: '22:00', aktif: true },
    { gun: 'sali', baslangic: '10:00', bitis: '22:00', aktif: true },
    { gun: 'carsamba', baslangic: '10:00', bitis: '22:00', aktif: true },
    { gun: 'persembe', baslangic: '10:00', bitis: '22:00', aktif: true },
    { gun: 'cuma', baslangic: '10:00', bitis: '22:00', aktif: true },
    { gun: 'cumartesi', baslangic: '12:00', bitis: '02:00', aktif: true },
    { gun: 'pazar', baslangic: '12:00', bitis: '20:00', aktif: false }
  ]);

  // Tatil günleri - Mock data
  const [tatilGunleri, setTatilGunleri] = useState<TatilGunu[]>([
    {
      id: '1',
      tarih: new Date('2024-12-31'),
      aciklama: 'Yılbaşı Tatili'
    }
  ]);

  const [yeniTatil, setYeniTatil] = useState({
    tarih: '',
    aciklama: ''
  });

  /**
   * Çalışma saatini güncelle
   */
  const handleUpdateSaat = (gun: string, field: 'baslangic' | 'bitis', value: string) => {
    setCalismaSaatleri(prev =>
      prev.map(blok =>
        blok.gun === gun ? { ...blok, [field]: value } : blok
      )
    );
  };

  /**
   * Günü aktif/pasif yap
   */
  const handleToggleGun = (gun: string) => {
    setCalismaSaatleri(prev =>
      prev.map(blok =>
        blok.gun === gun ? { ...blok, aktif: !blok.aktif } : blok
      )
    );
  };

  /**
   * Tatil günü ekle
   */
  const handleAddTatil = () => {
    if (!yeniTatil.tarih) {
      setHata('Tarih seçmelisiniz');
      return;
    }

    const yeni: TatilGunu = {
      id: Date.now().toString(),
      tarih: new Date(yeniTatil.tarih),
      aciklama: yeniTatil.aciklama || 'Özel Tatil'
    };

    setTatilGunleri(prev => [...prev, yeni]);
    setYeniTatil({ tarih: '', aciklama: '' });
    setHata('');
  };

  /**
   * Tatil günü sil
   */
  const handleDeleteTatil = (id: string) => {
    setTatilGunleri(prev => prev.filter(t => t.id !== id));
  };

  /**
   * Genel müsaitlik durumunu değiştir
   */
  const handleToggleGenelMusait = async () => {
    setYukleniyor(true);
    try {
      // Mock API çağrısı
      await new Promise(resolve => setTimeout(resolve, 500));
      setGenelMusait(prev => !prev);
    } catch (err) {
      setHata('Durum güncellenirken hata oluştu');
    } finally {
      setYukleniyor(false);
    }
  };

  /**
   * Değişiklikleri kaydet
   */
  const handleSave = async () => {
    setYukleniyor(true);
    setHata('');

    try {
      // Mock API çağrısı
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setKaydedildi(true);
      setTimeout(() => setKaydedildi(false), 3000);
    } catch (err) {
      setHata('Kayıt sırasında bir hata oluştu');
    } finally {
      setYukleniyor(false);
    }
  };

  /**
   * Tarihi formatla
   */
  const formatTarih = (tarih: Date): string => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(tarih);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Başlık */}
        <motion.div variants={fadeInUp}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Takvim Yönetimi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Çalışma saatlerinizi ve müsaitlik durumunuzu yönetin
          </p>
        </motion.div>

        {/* Hata Mesajı */}
        {hata && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg"
          >
            {hata}
          </motion.div>
        )}

        {/* Başarı Mesajı */}
        {kaydedildi && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg"
          >
            ✓ Değişiklikler başarıyla kaydedildi
          </motion.div>
        )}

        {/* Genel Müsaitlik Durumu */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="high" padding="lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {genelMusait ? (
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-500" />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Durum: {genelMusait ? 'Müsait' : 'Meşgul'}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {genelMusait 
                      ? 'Yeni randevular kabul edilebilir' 
                      : 'Yeni randevular kabul edilmiyor'}
                  </p>
                </div>
              </div>
              <Button3D
                variant={genelMusait ? 'danger' : 'success'}
                size="lg"
                onClick={handleToggleGenelMusait}
                loading={yukleniyor}
                disabled={yukleniyor}
              >
                {genelMusait ? 'Meşgul Olarak İşaretle' : 'Müsait Olarak İşaretle'}
              </Button3D>
            </div>
          </Card3D>
        </motion.div>

        {/* Haftalık Çalışma Saatleri */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Haftalık Çalışma Saatleri
              </h2>
            </div>

            <div className="space-y-4">
              {GUNLER.map(({ key, label }) => {
                const blok = calismaSaatleri.find(b => b.gun === key);
                if (!blok) return null;

                return (
                  <div
                    key={key}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      blok.aktif
                        ? 'bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/10 dark:to-pink-900/10 border-rose-200 dark:border-rose-800'
                        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      {/* Gün İsmi ve Toggle */}
                      <div className="flex items-center gap-4 min-w-[150px]">
                        <button
                          onClick={() => handleToggleGun(key)}
                          className={`w-6 h-6 rounded border-2 transition-all ${
                            blok.aktif
                              ? 'bg-gradient-to-r from-rose-600 to-pink-600 border-rose-600'
                              : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {blok.aktif && <CheckCircle2 className="w-full h-full text-white" />}
                        </button>
                        <span className={`font-semibold ${
                          blok.aktif
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}>
                          {label}
                        </span>
                      </div>

                      {/* Saat Seçiciler */}
                      {blok.aktif && (
                        <div className="flex items-center gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600 dark:text-gray-400">
                              Başlangıç:
                            </label>
                            <input
                              type="time"
                              value={blok.baslangic}
                              onChange={(e) => handleUpdateSaat(key, 'baslangic', e.target.value)}
                              className="px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-rose-500 transition-all"
                            />
                          </div>
                          <span className="text-gray-400">—</span>
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600 dark:text-gray-400">
                              Bitiş:
                            </label>
                            <input
                              type="time"
                              value={blok.bitis}
                              onChange={(e) => handleUpdateSaat(key, 'bitis', e.target.value)}
                              className="px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-rose-500 transition-all"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card3D>
        </motion.div>

        {/* Özel Tatil Günleri */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Özel Tatil Günleri
              </h2>
            </div>

            {/* Yeni Tatil Ekleme */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Yeni Tatil Günü Ekle
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tarih
                  </label>
                  <input
                    type="date"
                    value={yeniTatil.tarih}
                    onChange={(e) => setYeniTatil(prev => ({ ...prev, tarih: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-rose-500 transition-all"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Açıklama (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    value={yeniTatil.aciklama}
                    onChange={(e) => setYeniTatil(prev => ({ ...prev, aciklama: e.target.value }))}
                    placeholder="örn: Yılbaşı Tatili"
                    className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-rose-500 transition-all"
                  />
                </div>
                <div className="flex items-end">
                  <Button3D
                    variant="primary"
                    size="md"
                    onClick={handleAddTatil}
                    fullWidth
                    className="flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Ekle
                  </Button3D>
                </div>
              </div>
            </div>

            {/* Tatil Listesi */}
            {tatilGunleri.length > 0 ? (
              <div className="space-y-3">
                {tatilGunleri.map(tatil => (
                  <div
                    key={tatil.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-rose-300 dark:hover:border-rose-700 transition-all"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatTarih(tatil.tarih)}
                      </p>
                      {tatil.aciklama && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {tatil.aciklama}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteTatil(tatil.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Sil"
                    >
                      <X className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Henüz özel tatil günü eklenmedi
              </div>
            )}
          </Card3D>
        </motion.div>

        {/* Kaydet Butonu */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="lg">
            <div className="flex justify-end">
              <Button3D
                variant="primary"
                size="lg"
                onClick={handleSave}
                loading={yukleniyor}
                disabled={yukleniyor}
              >
                {yukleniyor ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </Button3D>
            </div>
          </Card3D>
        </motion.div>
      </motion.div>
    </div>
  );
}
