import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const MidasiaCharacter: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const hairRef = useRef<THREE.Mesh>(null);
  const armorRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.15;
    }

    if (armorRef.current) {
      armorRef.current.children.forEach((armor, i) => {
        armor.rotation.z = Math.sin(t * 0.5 + i) * 0.1;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Altın Metalik Ten */}
      <mesh ref={bodyRef}>
        <capsuleGeometry args={[0.38, 1.2, 8, 32]} />
        <meshStandardMaterial 
          color="#fbbf24" 
          metalness={1} 
          roughness={0.05} 
          emissive="#f59e0b"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Siyah Kısa Saçlar */}
      <mesh ref={hairRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.33, 32, 32]} />
        <meshStandardMaterial 
          color="#1f2937" 
          metalness={0.2} 
          roughness={0.3} 
          emissive="#000000"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Altın Zincir Zırh Parçaları */}
      <group ref={armorRef}>
        {[...Array(4)].map((_, i) => (
          <mesh key={i} position={[Math.cos((i * Math.PI) / 2) * 0.4, 0.2 - i * 0.3, 0]}>
            <boxGeometry args={[0.08, 0.25, 0.05]} />
            <meshStandardMaterial 
              color="#fbbf24" 
              metalness={1} 
              roughness={0.02} 
              emissive="#f59e0b"
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>

      {/* Kehribar Işık */}
      <pointLight position={[0, 0, 1]} intensity={2} color="#f59e0b" />
    </group>
  );
};
