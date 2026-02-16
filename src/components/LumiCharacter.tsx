import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const LumiCharacter: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const hairRef = useRef<THREE.Mesh>(null);
  const throneRef = useRef<THREE.Mesh>(null);
  const iceShardRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.position.y = Math.sin(t * 0.3) * 0.1;
    }

    if (throneRef.current) {
      throneRef.current.rotation.z = Math.sin(t * 0.4) * 0.05;
    }

    if (iceShardRef.current) {
      iceShardRef.current.children.forEach((shard, i) => {
        shard.rotation.x = Math.sin(t * 0.5 + i) * 0.2;
        shard.rotation.z = Math.cos(t * 0.5 + i) * 0.2;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Kar Beyazı Ten */}
      <mesh ref={bodyRef}>
        <capsuleGeometry args={[0.36, 1.1, 8, 28]} />
        <meshPhysicalMaterial 
          color="#f0f9ff" 
          transmission={0.6}
          thickness={0.4}
          roughness={0.15}
          metalness={0.2}
          emissive="#bfdbfe"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Buz Mavisi Saçlar */}
      <mesh ref={hairRef} position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.33, 28, 28]} />
        <meshPhysicalMaterial 
          color="#7dd3fc" 
          transmission={0.7}
          thickness={0.3}
          roughness={0.1}
          metalness={0.3}
          emissive="#0ea5e9"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Buz Tahtı */}
      <mesh ref={throneRef} position={[0, -0.6, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.4]} />
        <meshPhysicalMaterial 
          color="#cffafe" 
          transmission={0.8}
          thickness={0.2}
          roughness={0.05}
          metalness={0.1}
          emissive="#06b6d4"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Buz Kristal Parçaları */}
      <group ref={iceShardRef}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[Math.cos((i * Math.PI) / 3) * 0.4, 0.2, Math.sin((i * Math.PI) / 3) * 0.3]}>
            <pyramidGeometry args={[0.08, 0.2, 4]} />
            <meshPhysicalMaterial 
              color="#a5f3fc" 
              transmission={0.85}
              thickness={0.25}
              roughness={0.08}
              metalness={0.15}
              emissive="#0ea5e9"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Gümüş Işık */}
      <pointLight position={[0, 0, 0.8]} intensity={1.8} color="#0ea5e9" />
    </group>
  );
};
