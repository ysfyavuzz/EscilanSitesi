# Zuhre Planet 3D Varlık Üretim Rehberi

Bu rehber, projenin 3D ekosistemine yeni karakterler, gezegenler ve nesneler eklemek için gereken teknik adımları açıklar.

## 1. 3D Nesne Üretimi (Filtresiz Yaklaşım)
Dış servislerin (AI jeneratörleri vb.) kısıtlamalarından kaçınmak için nesneler matematiksel ve kod tabanlı olarak üretilir.

### Gezegenler
`CosmicObjectGenerator` bileşenini kullanarak yeni gezegenler tanımlayabilirsiniz:
```tsx
<CosmicObjectGenerator type="planet" color="#ff4400" size={2} />
```

### Karakterler
Karakterler modüler `capsuleGeometry` ve `boxGeometry` kombinasyonları ile inşa edilir. Daha karmaşık modeller için `public/assets/models/` dizinine `.gltf` dosyaları eklenmelidir.

## 2. 360 Derece Hareket ve Kontrol
Tüm nesneler varsayılan olarak Y ekseninde döner. Kullanıcı etkileşimi için `OrbitControls` entegrasyonu mevcuttur.

## 3. Görsel Standartlar
- **Materyal:** Her zaman `meshStandardMaterial` veya `shaderMaterial` kullanın.
- **Işık:** Nesnelerin kendi ışığını yayması için `emissive` özelliğini aktif tutun.
- **Arka Plan:** Derin uzay etkisini bozmamak için nesne çevresinde her zaman siyah/karanlık boşluk bırakın.

## 4. Entegrasyon
Yeni bir nesne eklediğinizde `src/data/planets.ts` dosyasına yeni bir giriş ekleyerek sistemin bu nesneyi tanımasını sağlayın.
