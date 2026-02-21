import fs from 'fs';
import https from 'https';
import path from 'path';

const LOCATIONS_FILE_PATH = path.resolve('src/data/locations.ts');

const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-');
};

const formatTitle = (text) => {
  return text.toLowerCase().split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

console.log("Türkiye'nin 81 ili ve ilçeleri internetten çekiliyor...");

https.get('https://furkandlkdr.github.io/mernis-turkiye-disctricts/turkey_cities_districts.json', (res) => {
  res.setEncoding('utf8');
  let data = '';

  // Eğer istek başarısız olduysa
  if (res.statusCode !== 200) {
    console.error("Hatalı İstek Durum Kodu:", res.statusCode);
    return;
  }

  res.on('data', (chunk) => data += chunk);

  res.on('end', () => {
    try {
      data = data.trim();
      if (data.charCodeAt(0) === 0xFEFF) {
        data = data.slice(1);
      }
      const parsedData = JSON.parse(data);

      const cityKeys = Object.keys(parsedData);
      const TURKEY_LOCATIONS = cityKeys.map(key => {
        const city = parsedData[key];
        const plaka = key.padStart(2, '0');
        return {
          id: plaka,
          name: formatTitle(city.province),
          slug: slugify(city.province),
          districts: city.districts.map(ilce => ({
            id: `${plaka}_${slugify(ilce.name)}`,
            name: formatTitle(ilce.name),
            slug: slugify(ilce.name),
            neighborhoods: []
          }))
        };
      });

      const tsContent = `export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
}

export interface District {
  id: string;
  name: string;
  slug: string;
  neighborhoods?: Neighborhood[];
}

export interface City {
  id: string;
  name: string;
  slug: string;
  districts: District[];
}

export const TURKEY_LOCATIONS: City[] = ${JSON.stringify(TURKEY_LOCATIONS, null, 2)};

export const getDistrictsByCity = (cityIdentifier: string): District[] => {
  const city = TURKEY_LOCATIONS.find(
    c => c.slug === cityIdentifier.toLowerCase() || c.name.toLowerCase() === cityIdentifier.toLowerCase()
  );
  return city ? city.districts : [];
};

export const getNeighborhoodsByDistrict = (cityIdentifier: string, districtIdentifier: string): Neighborhood[] => {
  const city = TURKEY_LOCATIONS.find(
    c => c.slug === cityIdentifier.toLowerCase() || c.name.toLowerCase() === cityIdentifier.toLowerCase()
  );
  if (!city) return [];

  const district = city.districts.find(
    d => d.slug === districtIdentifier.toLowerCase() || d.name.toLowerCase() === districtIdentifier.toLowerCase()
  );
  return district?.neighborhoods || [];
};

export const getAllCitySlugs = (): string[] => {
  return TURKEY_LOCATIONS.map(c => c.slug);
};
`;

      fs.writeFileSync(LOCATIONS_FILE_PATH, tsContent);
      console.log('✅ İşlem Başarılı: src/data/locations.ts dosyası 81 İL ve tüm ilçelerle güncellendi.');
    } catch (e) {
      console.error('Hata oluştu:', e);
    }
  });
}).on('error', (e) => {
  console.error("İnternetten veri çekerken hata:", e);
});
