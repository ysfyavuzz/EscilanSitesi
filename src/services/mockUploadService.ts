// src/services/mockUploadService.ts

interface UploadResponse {
  success: boolean;
  message: string;
  fileUrl?: string;
  fileName?: string;
}

/**
 * Mock dosya yükleme servisi.
 * Gerçek bir API'ye bağlanmadan dosya yükleme işlemini simüle eder.
 * @param file Yüklenecek dosya
 * @returns Promise<UploadResponse>
 */
export const uploadFile = (file: File): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    // Yükleme işlemini simüle etmek için rastgele bir gecikme
    const delay = Math.random() * 1000 + 500; // 500ms ile 1500ms arasında
    setTimeout(() => {
      // Yükleme işleminin başarılı olma olasılığı %80
      const isSuccess = Math.random() < 0.8;

      if (isSuccess) {
        const fileExtension = file.name.split('.').pop();
        const mockFileId = Date.now();
        const mockFileUrl = `https://mock-cdn.example.com/uploads/${mockFileId}.${fileExtension}`;
        resolve({
          success: true,
          message: `${file.name} başarıyla yüklendi.`,
          fileUrl: mockFileUrl,
          fileName: file.name,
        });
      } else {
        reject({
          success: false,
          message: `${file.name} yüklenirken bir hata oluştu.`,
        });
      }
    }, delay);
  });
};

/**
 * Birden fazla dosya yüklemek için mock servisi.
 * @param files Yüklenecek dosyalar dizisi
 * @returns Promise<UploadResponse[]>
 */
export const uploadMultipleFiles = async (files: File[]): Promise<UploadResponse[]> => {
  const uploadPromises = files.map(file => uploadFile(file));
  try {
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    // Herhangi bir dosya yüklemesi başarısız olursa, tüm süreci başarısız sayabiliriz
    // veya kısmi başarıları raporlayabiliriz. Bu örnekte tümünü reddediyoruz.
    throw error;
  }
};
