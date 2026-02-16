import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const LyraCharacter: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const hairRef = useRef<THREE.Mesh>(null);
  const tulle1Ref = useRef<THREE.Mesh>(null);
  const tulle2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.3;
    }

    if (tulle1Ref.current) {
      tulle1Ref.current.rotation.z = Math.sin(t) * 0.3;
      tulle1Ref.current.scale.y = 1 + Math.sin(t * 1.5) * 0.15;
    }

    if (tulle2Ref.current) {
      tulle2Ref.current.rotation.z = Math.cos(t) * 0.3;
      tulle2Ref.current.scale.y = 1 + Math.cos(t * 1.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Soluk Mavi Şeffaf Ten */}
      <mesh ref={bodyRef}>
        <capsuleGeometry args={[0.35, 1.1, 8, 28]} />
        <meshPhysicalMaterial 
          color="#bfdbfe" 
          transmission={0.7}
          thickness={0.3}
          roughness={0.3}
          metalness={0.1}
          emissive="#60a5fa"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Beyaz Bulut Saçları */}
      <mesh ref={hairRef} position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.32, 28, 28]} />
        <meshStandardMaterial 
          color="#f8fafc" 
          metalness={0.3} 
          roughness={0.4} 
          emissive="#e0f2fe"
          emissiveIntensity={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Şeffaf Tül Parçası 1 */}
      <mesh ref={tulle1Ref} position={[0.3, 0.2, 0]}>
        <planeGeometry args={[0.3, 1.2]} />
        <meshStandardMaterial 
          color="#a5f3fc" 
          transparent 
          opacity={0.3} 
          emissive="#0ea5e9"
          emissiveIntensity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Şeffaf Tül Parçası 2 */}
      <mesh ref={tulle2Ref} position={[-0.3, 0.2, 0]}>
        <planeGeometry args={[0.3, 1.2]} />
        <meshStandardMaterial 
          color="#a5f3fc" 
          transparent 
          opacity={0.3} 
          emissive="#0ea5e9"
          emissiveIntensity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Mavi Işık */}
      <pointLight position={[0, 0, 0.8]} intensity={1.5} color="#0ea5e9" />
    </group>
  );
};
