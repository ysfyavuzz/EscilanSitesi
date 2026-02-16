import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const NovaCharacter: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const hairRef = useRef<THREE.Mesh>(null);
  const energyStripsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      // 360 derece sürekli rotasyon
      groupRef.current.rotation.y += 0.005;
      // Hafif süzülme animasyonu
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }

    if (energyStripsRef.current) {
      // Enerji şeritlerinin dalgalanma efekti
      energyStripsRef.current.children.forEach((strip, i) => {
        strip.rotation.z = Math.sin(t + i) * 0.2;
        strip.scale.y = 1 + Math.sin(t * 2 + i) * 0.1;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Mor Parlayan Ten (Gövde) */}
      <mesh ref={bodyRef}>
        <capsuleGeometry args={[0.4, 1.2, 8, 32]} />
        <meshStandardMaterial 
          color="#7c3aed" 
          emissive="#4c1d95" 
          emissiveIntensity={2} 
          roughness={0.2} 
          metalness={0.8} 
        />
      </mesh>

      {/* Gümüş Akışkan Saçlar */}
      <mesh ref={hairRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhysicalMaterial 
          color="#e2e8f0" 
          metalness={1} 
          roughness={0.1} 
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Şeffaf Enerji Şeritleri */}
      <group ref={energyStripsRef}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 3, 0]} position={[0, 0, 0.5]}>
            <boxGeometry args={[0.05, 2, 0.01]} />
            <meshStandardMaterial 
              color="#a78bfa" 
              transparent 
              opacity={0.4} 
              emissive="#7c3aed"
              emissiveIntensity={1}
            />
          </mesh>
        ))}
      </group>

      {/* Karakter Işığı */}
      <pointLight position={[0, 0, 1]} intensity={2} color="#7c3aed" />
    </group>
  );
};
