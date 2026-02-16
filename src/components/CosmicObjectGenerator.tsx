import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CosmicObjectProps {
  type: 'planet' | 'character' | 'object';
  color?: string;
  size?: number;
  detail?: number;
}

export const CosmicObjectGenerator: React.FC<CosmicObjectProps> = ({ 
  type, 
  color = '#4a90e2', 
  size = 1, 
  detail = 32 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // 360 derece sürekli rotasyon
      meshRef.current.rotation.y += 0.005;
    }
  });

  const getGeometry = () => {
    switch (type) {
      case 'planet':
        return <sphereGeometry args={[size, detail, detail]} />;
      case 'character':
        // Basit bir humanoid form (placeholder)
        return <capsuleGeometry args={[size * 0.5, size, 4, detail]} />;
      case 'object':
        return <octahedronGeometry args={[size, 0]} />;
      default:
        return <sphereGeometry args={[size, detail, detail]} />;
    }
  };

  return (
    <mesh ref={meshRef}>
      {getGeometry()}
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.2}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
};
