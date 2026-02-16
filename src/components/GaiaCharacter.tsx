import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const GaiaCharacter: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const hairRef = useRef<THREE.Mesh>(null);
  const vinesRef = useRef<THREE.Group>(null);
  const flowersRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.position.y = Math.sin(t * 0.35) * 0.25;
    }

    if (vinesRef.current) {
      vinesRef.current.children.forEach((vine, i) => {
        vine.rotation.z = Math.sin(t * 0.7 + i) * 0.25;
      });
    }

    if (flowersRef.current) {
      flowersRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Zeytin Yeşili Ten */}
      <mesh ref={bodyRef}>
        <capsuleGeometry args={[0.36, 1.15, 8, 30]} />
        <meshStandardMaterial 
          color="#6b7280" 
          emissive="#059669"
          emissiveIntensity={0.7}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Sarmaşık Saçlar */}
      <mesh ref={hairRef} position={[0, 0.78, 0]}>
        <sphereGeometry args={[0.34, 30, 30]} />
        <meshStandardMaterial 
          color="#10b981" 
          emissive="#059669"
          emissiveIntensity={0.8}
          roughness={0.7}
          metalness={0}
        />
      </mesh>

      {/* Organik Sarmaşık Parçaları */}
      <group ref={vinesRef}>
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[Math.sin(i) * 0.35, -0.2 - i * 0.2, Math.cos(i) * 0.2]}>
            <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
            <meshStandardMaterial 
              color="#059669" 
              emissive="#10b981"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Biyolüminesans Çiçekler */}
      <group ref={flowersRef}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[Math.cos((i * Math.PI) / 3) * 0.5, 0.3, Math.sin((i * Math.PI) / 3) * 0.5]}>
            <octahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial 
              color="#34d399" 
              emissive="#10b981"
              emissiveIntensity={1.2}
            />
          </mesh>
        ))}
      </group>

      {/* Yeşil Biyo-Işık */}
      <pointLight position={[0, 0, 0.8]} intensity={2} color="#10b981" />
    </group>
  );
};
