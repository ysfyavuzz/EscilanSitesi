/**
 * Escort Profil Düzenleme Sayfası
 * 
 * Escort'ların kendi profillerini düzenleyebileceği kapsamlı form sayfası.
 * Tüm profil bilgilerini düzenlemek için kullanılır.
 * 
 * @module pages/escort/ProfileEdit
 * @category Pages - Escort
 * 
 * Özellikler:
 * - Kişisel bilgiler düzenleme (isim, yaş, boy, kilo)
 * - Fiziksel özellikler seçimi (saç rengi, göz rengi, vücut tipi)
 * - Hizmetler ve fiyatlandırma yönetimi
 * - Çalışma saatleri ayarlama
 * - Konum bilgileri güncelleme
 * - Hakkında metni düzenleme
 * - Dil seçenekleri
 * - Form validation
 * - Loading ve error state'leri
 * - Responsive tasarım
 * - Dark mode desteği
 * 
 * @example
 * ```tsx
 * <ProfileEdit />
 * ```
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button3D } from '@/components/3d/Button3D';
import { Input3D } from '@/components/3d/Input3D';
import { Card3D } from '@/components/3d/Card3D';
import { User, MapPin, DollarSign, Clock, Globe, Save, X } from 'lucide-react';

/**
 * Profil form verisi tipi
 */
interface ProfilFormu {
  // Kişisel Bilgiler
  isim: string;
  yas: number;
  boy: number;
  kilo: number;
  
  // Fiziksel Özellikler
  sacRengi: string;
  gozRengi: string;
  vucutTipi: string;
  
  // Hizmetler
  hizmetler: string[];
  saatlikUcret: number;
  gecelikUcret: number;
  
  // Çalışma
  calismaGunleri: string[];
  baslangicSaati: string;
  bitisSaati: string;
  
  // Konum
  sehir: string;
  ilce: string;
  incall: boolean;
  outcall: boolean;
  
  // Diğer
  hakkimda: string;
  diller: string[];
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
 * Saç renkleri seçenekleri
 */
const SAC_RENKLERI = [
  { value: 'siyah', label: 'Siyah' },
  { value: 'kahverengi', label: 'Kahverengi' },
  { value: 'kumral', label: 'Kumral' },
  { value: 'sari', label: 'Sarı' },
  { value: 'kizil', label: 'Kızıl' },
  { value: 'beyaz', label: 'Beyaz' }
];

/**
 * Göz renkleri seçenekleri
 */
const GOZ_RENKLERI = [
  { value: 'kahverengi', label: 'Kahverengi' },
  { value: 'yesil', label: 'Yeşil' },
  { value: 'mavi', label: 'Mavi' },
  { value: 'ela', label: 'Ela' },
  { value: 'gri', label: 'Gri' }
];

/**
 * Vücut tipleri seçenekleri
 */
const VUCUT_TIPLERI = [
  { value: 'atletik', label: 'Atletik' },
  { value: 'zayif', label: 'Zayıf' },
  { value: 'normal', label: 'Normal' },
  { value: 'dolgun', label: 'Dolgun' },
  { value: 'fit', label: 'Fit' }
];

/**
 * Hizmet seçenekleri
 */
const HIZMETLER = [
  { value: 'klasik', label: 'Klasik' },
  { value: 'oral', label: 'Oral' },
  { value: 'anal', label: 'Anal' },
  { value: 'masaj', label: 'Masaj' },
  { value: 'striptiz', label: 'Striptiz' },
  { value: 'roleplay', label: 'Rol Yapma' },
  { value: 'eslik', label: 'Eşlik' },
  { value: 'seyahat', label: 'Seyahat' }
];

/**
 * Hafta günleri
 */
const GUNLER = [
  { value: 'pazartesi', label: 'Pazartesi' },
  { value: 'sali', label: 'Salı' },
  { value: 'carsamba', label: 'Çarşamba' },
  { value: 'persembe', label: 'Perşembe' },
  { value: 'cuma', label: 'Cuma' },
  { value: 'cumartesi', label: 'Cumartesi' },
  { value: 'pazar', label: 'Pazar' }
];

/**
 * Dil seçenekleri
 */
const DILLER = [
  { value: 'turkce', label: 'Türkçe' },
  { value: 'ingilizce', label: 'İngilizce' },
  { value: 'almanca', label: 'Almanca' },
  { value: 'fransizca', label: 'Fransızca' },
  { value: 'rusca', label: 'Rusça' },
  { value: 'arapca', label: 'Arapça' }
];

/**
 * Profil Düzenleme Sayfası Komponenti
 */
export default function ProfileEdit() {
  const [yukleniyor, setYukleniyor] = useState<boolean>(false);
  const [kaydedildi, setKaydedildi] = useState<boolean>(false);
  const [hata, setHata] = useState<string>('');

  // Form state'i - Mock data ile başlatılıyor
  const [form, setForm] = useState<ProfilFormu>({
    isim: 'Ayşe Yılmaz',
    yas: 25,
    boy: 170,
    kilo: 55,
    sacRengi: 'kumral',
    gozRengi: 'kahverengi',
    vucutTipi: 'atletik',
    hizmetler: ['klasik', 'oral', 'masaj'],
    saatlikUcret: 1500,
    gecelikUcret: 5000,
    calismaGunleri: ['pazartesi', 'carsamba', 'cuma'],
    baslangicSaati: '10:00',
    bitisSaati: '22:00',
    sehir: 'İstanbul',
    ilce: 'Beşiktaş',
    incall: true,
    outcall: true,
    hakkimda: 'Merhaba, ben Ayşe. Profesyonel ve kaliteli hizmet sunuyorum.',
    diller: ['turkce', 'ingilizce']
  });

  /**
   * Input değişikliklerini yönetir
   */
  const handleInputChange = (field: keyof ProfilFormu, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setHata('');
  };

  /**
   * Çoklu seçim değişikliklerini yönetir
   */
  const handleMultiSelect = (field: 'hizmetler' | 'calismaGunleri' | 'diller', value: string) => {
    setForm(prev => {
      const current = prev[field] as string[];
      const yeni = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [field]: yeni };
    });
  };

  /**
   * Form validasyonu
   */
  const validate = (): boolean => {
    if (!form.isim.trim()) {
      setHata('İsim alanı zorunludur');
      return false;
    }
    if (form.yas < 18 || form.yas > 99) {
      setHata('Yaş 18-99 arasında olmalıdır');
      return false;
    }
    if (form.boy < 140 || form.boy > 200) {
      setHata('Boy 140-200 cm arasında olmalıdır');
      return false;
    }
    if (form.kilo < 40 || form.kilo > 120) {
      setHata('Kilo 40-120 kg arasında olmalıdır');
      return false;
    }
    if (form.hizmetler.length === 0) {
      setHata('En az bir hizmet seçmelisiniz');
      return false;
    }
    if (form.saatlikUcret < 0 || form.gecelikUcret < 0) {
      setHata('Ücretler negatif olamaz');
      return false;
    }
    if (!form.sehir || !form.ilce) {
      setHata('Konum bilgileri zorunludur');
      return false;
    }
    return true;
  };

  /**
   * Formu kaydet
   */
  const handleSave = async () => {
    if (!validate()) return;

    setYukleniyor(true);
    setHata('');

    try {
      // Mock API çağrısı - 2 saniye bekle
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Başarılı
      setKaydedildi(true);
      setTimeout(() => setKaydedildi(false), 3000);
    } catch (err) {
      setHata('Kayıt sırasında bir hata oluştu');
    } finally {
      setYukleniyor(false);
    }
  };

  /**
   * Formu sıfırla
   */
  const handleCancel = () => {
    setForm({
      isim: '',
      yas: 18,
      boy: 170,
      kilo: 55,
      sacRengi: '',
      gozRengi: '',
      vucutTipi: '',
      hizmetler: [],
      saatlikUcret: 0,
      gecelikUcret: 0,
      calismaGunleri: [],
      baslangicSaati: '10:00',
      bitisSaati: '22:00',
      sehir: '',
      ilce: '',
      incall: false,
      outcall: false,
      hakkimda: '',
      diller: []
    });
    setHata('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Başlık */}
        <motion.div variants={fadeInUp}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Profil Düzenleme
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Profil bilgilerinizi güncelleyin
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
            ✓ Profil başarıyla güncellendi
          </motion.div>
        )}

        {/* Kişisel Bilgiler */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Kişisel Bilgiler
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input3D
                label="İsim"
                value={form.isim}
                onChange={(e) => handleInputChange('isim', e.target.value)}
                placeholder="Adınız"
              />
              <Input3D
                label="Yaş"
                type="number"
                value={form.yas}
                onChange={(e) => handleInputChange('yas', parseInt(e.target.value))}
                placeholder="25"
              />
              <Input3D
                label="Boy (cm)"
                type="number"
                value={form.boy}
                onChange={(e) => handleInputChange('boy', parseInt(e.target.value))}
                placeholder="170"
              />
              <Input3D
                label="Kilo (kg)"
                type="number"
                value={form.kilo}
                onChange={(e) => handleInputChange('kilo', parseInt(e.target.value))}
                placeholder="55"
              />
            </div>
          </Card3D>
        </motion.div>

        {/* Fiziksel Özellikler */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Fiziksel Özellikler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Saç Rengi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Saç Rengi
                </label>
                <select
                  value={form.sacRengi}
                  onChange={(e) => handleInputChange('sacRengi', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                >
                  <option value="">Seçiniz</option>
                  {SAC_RENKLERI.map(renk => (
                    <option key={renk.value} value={renk.value}>
                      {renk.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Göz Rengi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Göz Rengi
                </label>
                <select
                  value={form.gozRengi}
                  onChange={(e) => handleInputChange('gozRengi', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                >
                  <option value="">Seçiniz</option>
                  {GOZ_RENKLERI.map(renk => (
                    <option key={renk.value} value={renk.value}>
                      {renk.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vücut Tipi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vücut Tipi
                </label>
                <select
                  value={form.vucutTipi}
                  onChange={(e) => handleInputChange('vucutTipi', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
                >
                  <option value="">Seçiniz</option>
                  {VUCUT_TIPLERI.map(tip => (
                    <option key={tip.value} value={tip.value}>
                      {tip.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* Hizmetler ve Fiyatlandırma */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-6 h-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Hizmetler ve Fiyatlandırma
              </h2>
            </div>
            
            {/* Hizmetler */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Sunulan Hizmetler
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {HIZMETLER.map(hizmet => (
                  <button
                    key={hizmet.value}
                    type="button"
                    onClick={() => handleMultiSelect('hizmetler', hizmet.value)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      form.hizmetler.includes(hizmet.value)
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white border-rose-600'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-rose-300'
                    }`}
                  >
                    {hizmet.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fiyatlar */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input3D
                label="Saatlik Ücret (₺)"
                type="number"
                value={form.saatlikUcret}
                onChange={(e) => handleInputChange('saatlikUcret', parseInt(e.target.value))}
                placeholder="1500"
              />
              <Input3D
                label="Gecelik Ücret (₺)"
                type="number"
                value={form.gecelikUcret}
                onChange={(e) => handleInputChange('gecelikUcret', parseInt(e.target.value))}
                placeholder="5000"
              />
            </div>
          </Card3D>
        </motion.div>

        {/* Çalışma Saatleri */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Çalışma Saatleri
              </h2>
            </div>

            {/* Günler */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Çalışma Günleri
              </label>
              <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
                {GUNLER.map(gun => (
                  <button
                    key={gun.value}
                    type="button"
                    onClick={() => handleMultiSelect('calismaGunleri', gun.value)}
                    className={`px-3 py-2 rounded-lg text-sm border-2 transition-all ${
                      form.calismaGunleri.includes(gun.value)
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white border-rose-600'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-rose-300'
                    }`}
                  >
                    {gun.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Saatler */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input3D
                label="Başlangıç Saati"
                type="time"
                value={form.baslangicSaati}
                onChange={(e) => handleInputChange('baslangicSaati', e.target.value)}
              />
              <Input3D
                label="Bitiş Saati"
                type="time"
                value={form.bitisSaati}
                onChange={(e) => handleInputChange('bitisSaati', e.target.value)}
              />
            </div>
          </Card3D>
        </motion.div>

        {/* Konum Bilgileri */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Konum Bilgileri
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Input3D
                label="Şehir"
                value={form.sehir}
                onChange={(e) => handleInputChange('sehir', e.target.value)}
                placeholder="İstanbul"
              />
              <Input3D
                label="İlçe"
                value={form.ilce}
                onChange={(e) => handleInputChange('ilce', e.target.value)}
                placeholder="Beşiktaş"
              />
            </div>

            {/* Hizmet Türü */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Hizmet Türü
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.incall}
                    onChange={(e) => handleInputChange('incall', e.target.checked)}
                    className="w-5 h-5 text-rose-600 rounded focus:ring-rose-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Incall (Mekanda)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.outcall}
                    onChange={(e) => handleInputChange('outcall', e.target.checked)}
                    className="w-5 h-5 text-rose-600 rounded focus:ring-rose-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Outcall (Dışarıda)</span>
                </label>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* Hakkımda ve Diller */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-rose-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Hakkımda ve Diller
              </h2>
            </div>

            {/* Hakkımda */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hakkımda
              </label>
              <textarea
                value={form.hakkimda}
                onChange={(e) => handleInputChange('hakkimda', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all resize-none"
                placeholder="Kendinizden bahsedin..."
              />
            </div>

            {/* Diller */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Konuşulan Diller
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {DILLER.map(dil => (
                  <button
                    key={dil.value}
                    type="button"
                    onClick={() => handleMultiSelect('diller', dil.value)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      form.diller.includes(dil.value)
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white border-rose-600'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-rose-300'
                    }`}
                  >
                    {dil.label}
                  </button>
                ))}
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* Aksiyon Butonları */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="lg">
            <div className="flex flex-col md:flex-row gap-4 justify-end">
              <Button3D
                variant="outline"
                size="lg"
                onClick={handleCancel}
                disabled={yukleniyor}
                className="flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                İptal
              </Button3D>
              <Button3D
                variant="primary"
                size="lg"
                onClick={handleSave}
                loading={yukleniyor}
                disabled={yukleniyor}
                className="flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                {yukleniyor ? 'Kaydediliyor...' : 'Kaydet'}
              </Button3D>
            </div>
          </Card3D>
        </motion.div>
      </motion.div>
    </div>
  );
}
