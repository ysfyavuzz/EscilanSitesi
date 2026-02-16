import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const EmberCharacter: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const hairRef = useRef<THREE.Mesh>(null);
  const lavaStripsRef = useRef<THREE.Group>(null);
  const emberParticlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.006;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.25;
    }

    if (lavaStripsRef.current) {
      lavaStripsRef.current.children.forEach((strip, i) => {
        strip.rotation.z = Math.sin(t * 0.8 + i) * 0.3;
        strip.scale.y = 1 + Math.sin(t * 2 + i) * 0.2;
      });
    }

    if (emberParticlesRef.current) {
      emberParticlesRef.current.children.forEach((particle, i) => {
        particle.position.y += Math.sin(t * 1.5 + i) * 0.02;
        particle.rotation.z = t * (0.5 + i * 0.1);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Volkanik Kül Rengi Ten */}
      <mesh ref={bodyRef}>
        <capsuleGeometry args={[0.39, 1.25, 8, 33]} />
        <meshStandardMaterial 
          color="#7c2d12" 
          emissive="#ea580c"
          emissiveIntensity={1.8}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Alev Alan Kızıl Saçlar */}
      <mesh ref={hairRef} position={[0, 0.82, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial 
          color="#dc2626" 
          emissive="#ff4500"
          emissiveIntensity={2}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* Lav Şeritleri */}
      <group ref={lavaStripsRef}>
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[Math.sin(i) * 0.4, -0.1 - i * 0.25, Math.cos(i) * 0.15]}>
            <boxGeometry args={[0.06, 0.6, 0.04]} />
            <meshStandardMaterial 
              color="#ff4500" 
              emissive="#ff6b35"
              emissiveIntensity={2}
            />
          </mesh>
        ))}
      </group>

      {/* Kor Parçacıkları */}
      <group ref={emberParticlesRef}>
        {[...Array(8)].map((_, i) => (
          <mesh key={i} position={[Math.cos((i * Math.PI) / 4) * 0.5, 0.3, Math.sin((i * Math.PI) / 4) * 0.3]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial 
              color="#fbbf24" 
              emissive="#ff4500"
              emissiveIntensity={2.5}
            />
          </mesh>
        ))}
      </group>

      {/* Kızıl Işık */}
      <pointLight position={[0, 0, 1]} intensity={2.5} color="#ff4500" />
    </group>
  );
};
