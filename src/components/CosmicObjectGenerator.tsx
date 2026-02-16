import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CosmicObjectProps {
  type: 'planet' | 'character' | 'object';
  color?: string;
  size?: number;
  detail?: number;
  materialType?: 'crystal' | 'gas' | 'lava' | 'ice' | 'metallic' | 'plasma' | 'bio';
  rotationSpeed?: number;
}

export const CosmicObjectGenerator: React.FC<CosmicObjectProps> = ({ 
  type, 
  color = '#4a90e2', 
  size = 1, 
  detail = 32,
  materialType = 'plasma',
  rotationSpeed = 0.005
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  const getMaterial = () => {
    switch (materialType) {
      case 'crystal':
        return <meshPhysicalMaterial 
          color={color} 
          transmission={0.9} 
          thickness={0.5} 
          roughness={0.1} 
          metalness={0.2} 
          emissive={color}
          emissiveIntensity={0.5}
        />;
      case 'gas':
        return <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.7} 
          roughness={1} 
          metalness={0}
          emissive={color}
          emissiveIntensity={0.3}
        />;
      case 'lava':
        return <meshStandardMaterial 
          color={color} 
          emissive="#ff4400" 
          emissiveIntensity={2} 
          roughness={0.8} 
          metalness={0.2} 
        />;
      case 'ice':
        return <meshPhysicalMaterial 
          color="#ffffff" 
          emissive={color}
          emissiveIntensity={0.2}
          transmission={0.5} 
          roughness={0.05} 
          metalness={0.1} 
        />;
      case 'metallic':
        return <meshStandardMaterial 
          color={color} 
          metalness={1} 
          roughness={0.1} 
          emissive={color}
          emissiveIntensity={0.1}
        />;
      case 'plasma':
        return <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={1.5} 
          roughness={0.5} 
          metalness={0.5} 
        />;
      case 'bio':
        return <meshStandardMaterial 
          color={color} 
          emissive="#00ff00" 
          emissiveIntensity={0.4} 
          roughness={0.9} 
          metalness={0} 
        />;
      default:
        return <meshStandardMaterial color={color} />;
    }
  };

  const getGeometry = () => {
    switch (type) {
      case 'planet':
        return <sphereGeometry args={[size, detail, detail]} />;
      case 'character':
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
      {getMaterial()}
    </mesh>
  );
};
