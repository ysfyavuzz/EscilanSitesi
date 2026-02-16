import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const KrystalCharacter: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const hairRef = useRef<THREE.Mesh>(null);
  const crystalsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
      groupRef.current.position.y = Math.sin(t * 0.45) * 0.2;
    }

    if (crystalsRef.current) {
      crystalsRef.current.children.forEach((crystal, i) => {
        crystal.rotation.x = Math.sin(t * 0.6 + i) * 0.3;
        crystal.rotation.z = Math.cos(t * 0.6 + i) * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Elmas Şeffaf Ten */}
      <mesh ref={bodyRef}>
        <capsuleGeometry args={[0.37, 1.18, 8, 31]} />
        <meshPhysicalMaterial 
          color="#fce7f3" 
          transmission={0.95}
          thickness={0.2}
          roughness={0.05}
          metalness={0.3}
          emissive="#ec4899"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Pembe Kristalize Saçlar */}
      <mesh ref={hairRef} position={[0, 0.79, 0]}>
        <icosahedronGeometry args={[0.32, 4]} />
        <meshPhysicalMaterial 
          color="#fbcfe8" 
          transmission={0.8}
          thickness={0.3}
          roughness={0.1}
          metalness={0.4}
          emissive="#ec4899"
          emissiveIntensity={0.7}
        />
      </mesh>

      {/* Keskin Kristal Parçaları */}
      <group ref={crystalsRef}>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[Math.cos((i * Math.PI) / 4) * 0.45, 0.1 - i * 0.15, Math.sin((i * Math.PI) / 4) * 0.3]}>
            <tetrahedronGeometry args={[0.1, 0]} />
            <meshPhysicalMaterial 
              color="#fbcfe8" 
              transmission={0.9}
              thickness={0.2}
              roughness={0.02}
              metalness={0.2}
              emissive="#ec4899"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Pembe Işık */}
      <pointLight position={[0, 0, 1]} intensity={2} color="#ec4899" />
    </group>
  );
};
