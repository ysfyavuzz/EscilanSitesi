/**
 * Escort Fotoğraf Yönetim Sayfası
 * 
 * Escort'ların profil fotoğraflarını yükleyip yönetebileceği sayfa.
 * Drag & drop, sıralama ve önizleme özellikleri içerir.
 * 
 * @module pages/escort/PhotoManager
 * @category Pages - Escort
 * 
 * Özellikler:
 * - Drag & drop fotoğraf yükleme
 * - Grid görünümünde fotoğraf listesi
 * - Fotoğraf sıralama (drag to reorder)
 * - Profil fotoğrafı seçme
 * - Fotoğraf silme
 * - Fotoğraf önizleme (modal)
 * - Yükleme durumu göstergesi
 * - Maksimum 10 fotoğraf limiti
 * - Loading ve error state'leri
 * - Responsive tasarım
 * - Dark mode desteği
 * 
 * @example
 * ```tsx
 * <PhotoManager />
 * ```
 */

import { useState, useRef, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card3D } from '@/components/3d/Card3D';
import { Button3D } from '@/components/3d/Button3D';
import { Upload, X, Star, Eye, Image as ImageIcon, AlertCircle } from 'lucide-react';

/**
 * Fotoğraf verisi tipi
 */
interface Fotograf {
  id: string;
  url: string;
  isProfil: boolean;
  yuklemeTarihi: Date;
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

/**
 * Maksimum fotoğraf sayısı
 */
const MAKS_FOTOGRAF = 10;

/**
 * İzin verilen dosya türleri
 */
const IZIN_VERILEN_TIPLER = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Fotoğraf Yönetim Sayfası Komponenti
 */
export default function PhotoManager() {
  const [yukleniyor, setYukleniyor] = useState<boolean>(false);
  const [hata, setHata] = useState<string>('');
  const [fotograflar, setFotograflar] = useState<Fotograf[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      isProfil: true,
      yuklemeTarihi: new Date('2024-01-15')
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      isProfil: false,
      yuklemeTarihi: new Date('2024-01-16')
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
      isProfil: false,
      yuklemeTarihi: new Date('2024-01-17')
    }
  ]);
  const [onizlemeFoto, setOnizlemeFoto] = useState<Fotograf | null>(null);
  const [surukleniyorId, setSurukleniyorId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Dosya inputunu aç
   */
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  /**
   * Dosya seçildiğinde
   */
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    await handleFilesUpload(Array.from(files));
  };

  /**
   * Drag & drop - Drag over
   */
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Drag & drop - Drop
   */
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    await handleFilesUpload(files);
  };

  /**
   * Dosyaları yükle
   */
  const handleFilesUpload = async (files: File[]) => {
    setHata('');

    // Limit kontrolü
    if (fotograflar.length + files.length > MAKS_FOTOGRAF) {
      setHata(`Maksimum ${MAKS_FOTOGRAF} fotoğraf yükleyebilirsiniz`);
      return;
    }

    // Dosya türü kontrolü
    const gecersizDosyalar = files.filter(
      file => !IZIN_VERILEN_TIPLER.includes(file.type)
    );
    if (gecersizDosyalar.length > 0) {
      setHata('Sadece JPG, PNG ve WEBP formatları desteklenir');
      return;
    }

    setYukleniyor(true);

    try {
      // Mock upload - gerçekte API'ye gönderilecek
      await new Promise(resolve => setTimeout(resolve, 1500));

      const yeniFotograflar: Fotograf[] = files.map((file, index) => ({
        id: `${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        isProfil: false,
        yuklemeTarihi: new Date()
      }));

      setFotograflar(prev => [...prev, ...yeniFotograflar]);
    } catch (err) {
      setHata('Fotoğraflar yüklenirken bir hata oluştu');
    } finally {
      setYukleniyor(false);
    }
  };

  /**
   * Fotoğrafı sil
   */
  const handleDelete = async (id: string) => {
    if (!confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) return;

    setYukleniyor(true);
    try {
      // Mock API çağrısı
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFotograflar(prev => prev.filter(foto => foto.id !== id));
    } catch (err) {
      setHata('Fotoğraf silinirken bir hata oluştu');
    } finally {
      setYukleniyor(false);
    }
  };

  /**
   * Profil fotoğrafı olarak ayarla
   */
  const handleSetProfil = async (id: string) => {
    setYukleniyor(true);
    try {
      // Mock API çağrısı
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFotograflar(prev =>
        prev.map(foto => ({
          ...foto,
          isProfil: foto.id === id
        }))
      );
    } catch (err) {
      setHata('Profil fotoğrafı ayarlanırken bir hata oluştu');
    } finally {
      setYukleniyor(false);
    }
  };

  /**
   * Fotoğraf önizleme
   */
  const handlePreview = (foto: Fotograf) => {
    setOnizlemeFoto(foto);
  };

  /**
   * Drag başlat
   */
  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
    setSurukleniyorId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  /**
   * Drag bitir
   */
  const handleDragEnd = () => {
    setSurukleniyorId(null);
  };

  /**
   * Drop (sıralama)
   */
  const handleReorderDrop = (e: DragEvent<HTMLDivElement>, hedefId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!surukleniyorId || surukleniyorId === hedefId) return;

    const kaynakIndex = fotograflar.findIndex(f => f.id === surukleniyorId);
    const hedefIndex = fotograflar.findIndex(f => f.id === hedefId);

    if (kaynakIndex === -1 || hedefIndex === -1) return;

    const yeniListe = [...fotograflar];
    const [tasinan] = yeniListe.splice(kaynakIndex, 1);
    yeniListe.splice(hedefIndex, 0, tasinan);

    setFotograflar(yeniListe);
    setSurukleniyorId(null);
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
            Fotoğraf Yönetimi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Profil fotoğraflarınızı yükleyin ve düzenleyin ({fotograflar.length}/{MAKS_FOTOGRAF})
          </p>
        </motion.div>

        {/* Hata Mesajı */}
        {hata && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            {hata}
          </motion.div>
        )}

        {/* Upload Alanı */}
        <motion.div variants={fadeInUp}>
          <Card3D elevation="medium" padding="none">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-rose-400 dark:hover:border-rose-500 transition-colors cursor-pointer"
              onClick={handleUploadClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Fotoğraf Yükle
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Buraya sürükleyip bırakın veya tıklayarak dosya seçin
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  JPG, PNG veya WEBP • Maksimum {MAKS_FOTOGRAF} fotoğraf
                </p>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* Fotoğraf Grid */}
        {fotograflar.length > 0 ? (
          <motion.div variants={fadeInUp}>
            <Card3D elevation="medium" padding="lg">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence>
                  {fotograflar.map((foto) => (
                    <motion.div
                      key={foto.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      draggable
                      onDragStart={(e) => handleDragStart(e as unknown as DragEvent<HTMLDivElement>, foto.id)}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleReorderDrop(e as unknown as DragEvent<HTMLDivElement>, foto.id)}
                      className={`relative group cursor-move ${
                        surukleniyorId === foto.id ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                        <img
                          src={foto.url}
                          alt="Profil fotoğrafı"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Profil Badge */}
                      {foto.isProfil && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                          <Star className="w-3 h-3" fill="currentColor" />
                          Profil
                        </div>
                      )}

                      {/* Aksiyon Butonları */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        {!foto.isProfil && (
                          <button
                            onClick={() => handleSetProfil(foto.id)}
                            disabled={yukleniyor}
                            className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900 transition-colors"
                            title="Profil fotoğrafı yap"
                          >
                            <Star className="w-5 h-5 text-rose-600" />
                          </button>
                        )}
                        <button
                          onClick={() => handlePreview(foto)}
                          className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                          title="Önizle"
                        >
                          <Eye className="w-5 h-5 text-blue-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(foto.id)}
                          disabled={yukleniyor}
                          className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                          title="Sil"
                        >
                          <X className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Yardım Metni */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  💡 İpucu: Fotoğrafları sürükleyerek sırasını değiştirebilirsiniz
                </p>
              </div>
            </Card3D>
          </motion.div>
        ) : (
          <motion.div variants={fadeInUp}>
            <Card3D elevation="low" padding="lg">
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Henüz fotoğraf yüklenmedi
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yukarıdaki alandan fotoğraf yüklemeye başlayın
                </p>
              </div>
            </Card3D>
          </motion.div>
        )}

        {/* Kaydet Butonu */}
        {fotograflar.length > 0 && (
          <motion.div variants={fadeInUp}>
            <Card3D elevation="medium" padding="lg">
              <div className="flex justify-end">
                <Button3D
                  variant="primary"
                  size="lg"
                  loading={yukleniyor}
                  disabled={yukleniyor}
                >
                  Değişiklikleri Kaydet
                </Button3D>
              </div>
            </Card3D>
          </motion.div>
        )}
      </motion.div>

      {/* Önizleme Modal */}
      <AnimatePresence>
        {onizlemeFoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setOnizlemeFoto(null)}
          >
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setOnizlemeFoto(null)}
                className="absolute -top-12 right-0 p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-6 h-6 text-gray-900 dark:text-white" />
              </button>
              <img
                src={onizlemeFoto.url}
                alt="Önizleme"
                className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
              />
              {onizlemeFoto.isProfil && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                  <Star className="w-4 h-4" fill="currentColor" />
                  Profil Fotoğrafı
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Yükleniyor Overlay */}
      <AnimatePresence>
        {yukleniyor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
          >
            <Card3D elevation="high" padding="lg">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-900 dark:text-white font-semibold">
                  İşleniyor...
                </p>
              </div>
            </Card3D>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
