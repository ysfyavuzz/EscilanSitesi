/**
 * KVKK Aydınlatma Metni Page
 * 
 * KVKK (Kişisel Verilerin Korunması Kanunu) compliance information page.
 * Provides detailed information about personal data processing, user rights, and privacy.
 * 
 * @module pages/KVKK
 * @category Pages - Legal
 * 
 * Features:
 * - KVKK compliance information
 * - Data processing details
 * - User rights explanation
 * - Contact information for data protection
 * - Responsive design
 * - Turkish language (legal requirement)
 * 
 * @example
 * ```tsx
 * // Route: /kvkk
 * <Route path="/kvkk" component={KVKK} />
 * ```
 */

import React from 'react';

export default function KVKK() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            KVKK Aydınlatma Metni
          </h1>
          <p className="text-lg text-gray-600">
            Kişisel Verilerin Korunması Kanunu Kapsamında Aydınlatma
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Son Güncelleme: 18 Ocak 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* 1. Veri Sorumlusu */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Veri Sorumlusu
            </h2>
            <p className="text-gray-700">
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz; 
              veri sorumlusu olarak <strong>Escort Platform</strong> tarafından aşağıda açıklanan 
              kapsamda işlenebilecektir.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <p className="text-sm text-gray-700">
                <strong>Adres:</strong> [Şirket Adresi]<br />
                <strong>E-posta:</strong> kvkk@escortplatform.com<br />
                <strong>Telefon:</strong> [Telefon Numarası]
              </p>
            </div>
          </section>

          {/* 2. İşlenen Kişisel Veriler */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. İşlenen Kişisel Verileriniz
            </h2>
            <p className="text-gray-700 mb-4">
              Platform üzerinde işlenen kişisel veri kategorileri şunlardır:
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-semibold text-gray-900">Kimlik Bilgileri</h3>
                <p className="text-gray-600">Ad, soyad, T.C. kimlik numarası (opsiyonel)</p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-semibold text-gray-900">İletişim Bilgileri</h3>
                <p className="text-gray-600">E-posta adresi, telefon numarası, adres bilgileri</p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-semibold text-gray-900">Hesap ve İşlem Bilgileri</h3>
                <p className="text-gray-600">Kullanıcı adı, şifre, işlem geçmişi, ödeme bilgileri</p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-semibold text-gray-900">Görsel ve İşitsel Kayıtlar</h3>
                <p className="text-gray-600">Profil fotoğrafları, yüklenen görseller</p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-semibold text-gray-900">Lokasyon Bilgileri</h3>
                <p className="text-gray-600">Şehir, ilçe bilgileri</p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-semibold text-gray-900">İşlem Güvenliği Bilgileri</h3>
                <p className="text-gray-600">IP adresi, çerez kayıtları, cihaz bilgileri</p>
              </div>
            </div>
          </section>

          {/* 3. Kişisel Verilerin İşlenme Amaçları */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Kişisel Verilerin İşlenme Amaçları
            </h2>
            <p className="text-gray-700 mb-4">
              Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Platform üyeliğinizin oluşturulması ve yönetilmesi</li>
              <li>Hizmet sağlayıcı ve müşteri eşleştirmesi</li>
              <li>Randevu ve rezervasyon işlemlerinin gerçekleştirilmesi</li>
              <li>Ödeme işlemlerinin güvenli bir şekilde yapılması</li>
              <li>Müşteri hizmetleri ve destek taleplerinin karşılanması</li>
              <li>Platform güvenliğinin sağlanması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>İstatistiksel analizler ve raporlamalar</li>
              <li>Pazarlama ve bilgilendirme faaliyetleri (izniniz dahilinde)</li>
            </ul>
          </section>

          {/* 4. Kişisel Verilerin Aktarılması */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Kişisel Verilerin Aktarılması
            </h2>
            <p className="text-gray-700 mb-4">
              Kişisel verileriniz, KVKK'da öngörülen temel ilkelere uygun olarak ve 
              KVKK'nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları 
              dahilinde aşağıdaki kişi ve kuruluşlara aktarılabilmektedir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Ödeme hizmet sağlayıcılarına (Iyzico, PayTR vb.)</li>
              <li>Bulut depolama hizmet sağlayıcılarına</li>
              <li>Yasal düzenlemeler gereği kamu kurum ve kuruluşlarına</li>
              <li>Teknik destek ve altyapı hizmeti veren iş ortaklarına</li>
              <li>Hukuki danışmanlık hizmeti veren kuruluşlara</li>
            </ul>
          </section>

          {/* 5. Kişisel Veri Toplanma Yöntemi */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Kişisel Veri Toplanma Yöntemi ve Hukuki Sebebi
            </h2>
            <p className="text-gray-700 mb-4">
              Kişisel verileriniz, platformumuz üzerinden:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Üyelik formları aracılığıyla</li>
              <li>Profil oluşturma ve güncelleme işlemleri sırasında</li>
              <li>Randevu ve rezervasyon süreçlerinde</li>
              <li>Ödeme işlemlerinde</li>
              <li>Müşteri hizmetleri ile iletişiminizde</li>
              <li>Platform kullanımınız sırasında otomatik olarak</li>
            </ul>
            <p className="text-gray-700 mt-4">
              toplanmaktadır. Hukuki sebepler: Sözleşmenin kurulması ve ifası, 
              hukuki yükümlülüklerin yerine getirilmesi, meşru menfaat ve açık rızanız.
            </p>
          </section>

          {/* 6. Haklarınız */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. KVKK Kapsamındaki Haklarınız
            </h2>
            <p className="text-gray-700 mb-4">
              KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
            </p>
            <div className="bg-green-50 p-6 rounded-lg space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <p className="text-gray-700">Kişisel verilerinizin işlenip işlenmediğini öğrenme</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <p className="text-gray-700">Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <p className="text-gray-700">Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <p className="text-gray-700">Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <p className="text-gray-700">Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <p className="text-gray-700">KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <p className="text-gray-700">Kişisel verilerin düzeltilmesi, silinmesi veya yok edilmesi işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <p className="text-gray-700">İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</p>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <p className="text-gray-700">Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</p>
              </div>
            </div>
          </section>

          {/* 7. Başvuru Yöntemi */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Başvuru Yönteminiz
            </h2>
            <p className="text-gray-700 mb-4">
              Yukarıda belirtilen haklarınızı kullanmak için:
            </p>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Başvuru Kanalları:</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>E-posta:</strong> kvkk@escortplatform.com</p>
                <p><strong>Posta:</strong> [Şirket Adresi] - KVKK Başvuru Birimi</p>
                <p><strong>Platform Üzerinden:</strong> Hesap ayarlarınızdan "KVKK Talebi" bölümü</p>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                <strong>Not:</strong> Başvurunuzda kimliğinizi doğrulayıcı bilgiler (T.C. kimlik fotokopisi vb.) 
                yer almalıdır. Başvurularınız en geç 30 gün içinde sonuçlandırılacaktır.
              </p>
            </div>
          </section>

          {/* 8. Veri Saklama Süresi */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Kişisel Verilerin Saklanma Süresi
            </h2>
            <p className="text-gray-700">
              Kişisel verileriniz, işlendikleri amaç için gerekli olan süre boyunca 
              ve ilgili mevzuatta öngörülen süreler dahilinde saklanmaktadır. Yasal 
              saklama yükümlülüklerinin sona ermesi ve işleme amacının ortadan kalkması 
              durumunda verileriniz silinir, yok edilir veya anonim hale getirilir.
            </p>
          </section>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Bu aydınlatma metni, KVKK'nın 10. maddesi uyarınca hazırlanmıştır.<br />
              Platform kullanımınız ile bu metinde yer alan hususları kabul etmiş sayılırsınız.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
