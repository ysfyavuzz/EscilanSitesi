import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Html, useGLTF, Float, PerspectiveCamera, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// --- TİPLER VE VERİ ---
interface PlanetData {
  id: string;
  name: string;
  description: string;
  color: string;
  path: string;
  size: number;
  texturePath: string;
  theme: 'water' | 'metal' | 'nature' | 'lava' | 'ice' | 'stone';
}

const PLANETS: PlanetData[] = [
  { id: 'escorts', name: 'KEŞFET', description: 'Zühre Gezegeni: Hayat ve Su', color: '#0077FF', path: '/escorts', size: 4.5, theme: 'water', texturePath: '/textures/water.png' },
  { id: 'escort-login', name: 'İŞ ORTAKLIĞI', description: 'Endüstriyel Güç ve Altın', color: '#FFD700', path: '/login-escort', size: 4.2, theme: 'metal', texturePath: '/textures/metal.png' },
  { id: 'ai', name: 'AI GIRLFRIEND', description: 'Yapay Zeka Doğası', color: '#00FF66', path: '#', size: 4, theme: 'nature', texturePath: '/textures/nature.png' },
  { id: 'sexting', name: 'MARS CHAT', description: 'Volkanik Arzular', color: '#FF2200', path: '/messages', size: 3.8, theme: 'lava', texturePath: '/textures/lava.png' },
  { id: 'market', name: 'MARKET', description: 'Buz Kristali Mağazası', color: '#AAFFFF', path: '/pricing', size: 3.5, theme: 'ice', texturePath: '/textures/ice.png' },
  { id: 'confessions', name: 'İTİRAFLAR', description: 'Kadim Sırlar', color: '#888888', path: '/blog', size: 3.3, theme: 'stone', texturePath: '/textures/stone.png' },
];

const Planet = ({ data, isActive, onClick, position, texture }: { data: PlanetData; isActive: boolean; onClick: () => void; position: [number, number, number]; texture: THREE.Texture; }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [entering, setEntering] = useState(false);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * (isActive ? 0.4 : 0.1);
      if (entering) {
        groupRef.current.scale.lerp(new THREE.Vector3(15, 15, 15), delta * 2);
      } else if (isActive) {
        const scale = 1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group position={position}>
      <Float speed={isActive ? 4 : 1} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={groupRef} onClick={(e) => { e.stopPropagation(); onClick(); }}>
          <mesh>
            <sphereGeometry args={[data.size, 64, 64]} />
            <meshStandardMaterial 
              map={texture}
              bumpMap={texture}
              bumpScale={0.05}
              emissive={data.color}
              emissiveIntensity={isActive ? 0.5 : 0.1}
              roughness={data.theme === 'stone' ? 1 : 0.3}
              metalness={data.theme === 'metal' ? 0.8 : 0.1}
            />
          </mesh>
          <mesh scale={1.05}>
            <sphereGeometry args={[data.size, 32, 32]} />
            <meshBasicMaterial color={data.color} transparent opacity={isActive ? 0.15 : 0.02} side={THREE.BackSide} />
          </mesh>
        </group>
      </Float>

      <Html position={[0, data.size + 3, 0]} center distanceFactor={15}>
        <div className={`transition-all duration-700 flex flex-col items-center pointer-events-none ${isActive ? 'opacity-100 scale-125' : 'opacity-20 scale-75'}`}>
          <div className="font-black text-white text-3xl tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] whitespace-nowrap bg-black/40 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 uppercase italic">
            {data.name}
          </div>
        </div>
      </Html>

      {isActive && !entering && (
        <Html position={[0, -data.size - 5, 0]} center>
          <div className="flex flex-col items-center gap-4 w-96 animate-in fade-in zoom-in duration-500">
             <div className="text-center text-[10px] font-black text-white bg-white/5 backdrop-blur-3xl px-8 py-5 rounded-[32px] border border-white/10 shadow-2xl uppercase tracking-[0.3em] leading-loose">
              {data.description}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setEntering(true); setTimeout(() => window.location.href = data.path, 800); }}
              className="px-16 py-6 bg-white text-black font-black rounded-full shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all hover:scale-110 active:scale-95 uppercase tracking-widest text-base"
            >
              Yörüngeye Gir
            </button>
          </div>
        </Html>
      )}
    </group>
  );
};

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const groupRef = useRef<THREE.Group>(null);
  const radius = 40; 

  const textures = useTexture({
    water: PLANETS[0].texturePath,
    metal: PLANETS[1].texturePath,
    nature: PLANETS[2].texturePath,
    lava: PLANETS[3].texturePath,
    ice: PLANETS[4].texturePath,
    stone: PLANETS[5].texturePath,
  });

  const anglePerPlanet = (Math.PI * 2) / PLANETS.length;
  const targetRotationY = -activeIndex * anglePerPlanet;

  useFrame((state, delta) => {
    if (groupRef.current) {
      let currentY = groupRef.current.rotation.y;
      let angleDiff = (targetRotationY - currentY + Math.PI) % (Math.PI * 2) - Math.PI;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(currentY, currentY + angleDiff, delta * 2);
    }
  });

  return (
    <group ref={groupRef}>
      {PLANETS.map((planet, index) => {
        const angle = index * anglePerPlanet;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const texture = Object.values(textures)[index];
        return <Planet key={planet.id} data={planet} position={[x, 0, z]} isActive={index === activeIndex} onClick={() => setActiveIndex(index)} texture={texture} />;
      })}
    </group>
  );
};

export const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#010103] pointer-events-auto">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 20, 100]} fov={45} />
        
        {/* INTERAKTİF KONTROLLER: Döndürme, Yakınlaştırma ve Açı Değiştirme */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={40} 
          maxDistance={150} 
          autoRotate={false}
          makeDefault
        />

        <Suspense fallback={null}>
          <ambientLight intensity={1.5} /> 
          <hemisphereLight intensity={1} groundColor="black" />
          <pointLight position={[50, 50, 50]} intensity={3} color="#ffffff" />
          <pointLight position={[-50, -50, -50]} intensity={2} color={PLANETS[0].color} />
          
          <Carousel />

          <Stars radius={300} depth={60} count={10000} factor={7} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>

      {/* Karanlık Gradyan Overlay (Derinlik hissi için) */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-black opacity-40" />
      
      {/* Control Tip */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none opacity-40">
        <div className="text-[8px] text-white uppercase font-black tracking-[0.5em] animate-pulse">
          Mouse ile Evreni Keşfet • Kaydır ve Yakınlaş
        </div>
      </div>
    </div>
  );
};