import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

// --- TİPLER VE VERİ ---
interface PlanetData {
  id: string;
  name: string;
  description: string;
  color: string;
  path: string;
  size: number;
}

const PLANETS: PlanetData[] = [
  { id: 'escorts', name: 'KEŞFET', description: 'İlanlar Dünyası', color: '#00BFFF', path: '/escorts', size: 4 },
  { id: 'escort-login', name: 'İŞ ORTAKLIĞI', description: 'Escort & Model Paneli', color: '#FFD700', path: '/login-escort', size: 3.8 },
  { id: 'ai', name: 'AI GIRLFRIEND', description: 'Yapay Zeka Aşkı', color: '#A020F0', path: '#', size: 3.5 },
  { id: 'sexting', name: 'MARS CHAT', description: 'Canlı Sexting', color: '#FF4500', path: '/messages', size: 3.5 },
  { id: 'market', name: 'MARKET', description: 'Puan & Üyelik', color: '#32CD32', path: '/pricing', size: 3 },
  { id: 'confessions', name: 'İTİRAFLAR', description: 'Anonim Hikayeler', color: '#FF69B4', path: '/blog', size: 3 },
  { id: 'profile', name: 'ÜS (BASE)', description: 'Profil & Ayarlar', color: '#B0C4DE', path: '/settings', size: 3.2 },
];

// --- BİLEŞENLER ---

const Planet = ({ 
  data, 
  isActive, 
  onClick, 
  position 
}: { 
  data: PlanetData; 
  isActive: boolean; 
  onClick: () => void;
  position: [number, number, number];
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [entering, setEntering] = useState(false); // Giriş animasyonu state'i

  // Sürekli dönme animasyonu (Kendi ekseninde)
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Normal dönüş
      meshRef.current.rotation.y += delta * 0.2;
      
      // Giriş yapılıyorsa hızlı dönme ve büyüme efekti
      if (entering) {
        meshRef.current.rotation.y += delta * 5; // Çok hızlı dön
        meshRef.current.scale.lerp(new THREE.Vector3(5, 5, 5), delta * 2); // Büyü
      } else if (isActive) {
        // Aktifse hafifçe puls (nefes alma) efekti
        const scale = data.size + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1).multiplyScalar(scale / data.size), 0.1);
      } else {
        // Pasifse normal boyuta dön
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const handleEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.path === '#') {
      alert("Bu gezegen henüz keşfedilmedi! (Yakında)");
      return;
    }
    
    setEntering(true);
    // Animasyon bitince yönlendir
    setTimeout(() => {
      window.location.href = data.path;
    }, 800);
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshStandardMaterial 
          color={data.color} 
          emissive={isActive ? data.color : '#000000'}
          emissiveIntensity={isActive ? 0.5 : 0}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Gezegen Etiketi (Her zaman görünür ama pasifken sönük) */}
      <Html position={[0, data.size + 1, 0]} center distanceFactor={15} style={{ pointerEvents: 'none' }}>
        <div className={`transition-all duration-500 flex flex-col items-center ${isActive ? 'opacity-100 scale-110' : 'opacity-40 scale-75'}`}>
          <div className="font-bold text-white text-lg drop-shadow-md whitespace-nowrap bg-black/50 px-3 rounded-full border border-white/10">
            {data.name}
          </div>
        </div>
      </Html>

      {/* Aktif Gezegen İçin Aksiyon Butonu (Gezegenin altında belirir) */}
      {isActive && !entering && (
        <Html position={[0, -data.size - 1.5, 0]} center zIndexRange={[100, 0]}>
          <button
            onClick={handleEnter}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/50 
                       text-white font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]
                       transition-all hover:scale-110 active:scale-95 animate-in fade-in zoom-in duration-300"
          >
            GİRİŞ YAP
          </button>
          <div className="text-center mt-2 text-xs text-gray-300 bg-black/40 px-2 py-1 rounded">
            {data.description}
          </div>
        </Html>
      )}
    </group>
  );
};

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const groupRef = useRef<THREE.Group>(null);
  const radius = 22; // Gezegenlerin merkeze uzaklığı

  // Hedef dönüş açısını hesapla
  // Her gezegen 360 / n derece aralıkla dizilir.
  // Aktif gezegenin açısını 0'a (kameranın karşısına) getirmek için grubu ters yöne döndürürüz.
  const anglePerPlanet = (Math.PI * 2) / PLANETS.length;
  const targetRotationY = -activeIndex * anglePerPlanet;

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Grubu hedef açıya doğru yumuşakça döndür (Lerp)
      // Quaternion kullanarak en kısa yolu bulmak daha iyidir ama basit Y dönüşü şimdilik yeterli
      
      // Açıyı normalize et (Dönüşün en kısa yoldan olması için)
      let currentY = groupRef.current.rotation.y;
      
      // Mevcut açı ile hedef açı arasındaki farkı optimize et
      // Bu, 0'dan 360'a geçerken ters dönmesini engeller
      let currentY = groupRef.current.rotation.y;
      let angleDiff = targetRotationY - currentY;
      
      // En kısa dönüşü sağlamak için farkı -PI ile PI arasına getir
      // Bu, 360 derecelik döngüde ileri veya geri doğru en kısa yolu bulur.
      angleDiff = (angleDiff + Math.PI) % (Math.PI * 2) - Math.PI;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(currentY, currentY + angleDiff, delta * 3);
    }
  });

  return (
    <group ref={groupRef}>
      {PLANETS.map((planet, index) => {
        const angle = index * anglePerPlanet;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <Planet
            key={planet.id}
            data={planet}
            position={[x, 0, z]}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        );
      })}
    </group>
  );
};

export const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black select-none">
      <Canvas camera={{ position: [0, 5, 38], fov: 50 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#020205']} />
          
          {/* Işıklandırma */}
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 20, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[0, -20, -10]} intensity={0.5} color="#4b0082" />

          {/* Carousel Sistemi */}
          <Carousel />

          {/* Arka Plan Efektleri */}
          <Stars radius={150} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>

      {/* Mobil Kullanıcılar İçin İpucu */}
      <div className="absolute bottom-20 left-0 right-0 text-center pointer-events-none md:hidden">
        <span className="text-white/30 text-xs px-4 py-2 bg-black/20 rounded-full backdrop-blur-sm">
          Gezegenlere dokunarak döndür
        </span>
      </div>
    </div>
  );
};