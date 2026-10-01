import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRoomStore } from '../../store/useRoomStore';

interface MovableItemProps {
  id: string;
  name: string;
  color: string;
  shape: 'cup' | 'cube';
}

export function MovableItem({ id, name, color, shape }: MovableItemProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const {
    grabbedObjectId,
    setGrabbedObjectId,
    handPosition,
    isPinching,
    objectPositions,
    setObjectPosition,
  } = useRoomStore();

  const isGrabbed = grabbedObjectId === id;
  const currentPos = objectPositions[id] ?? [0, 0.45, -1.2];

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (isGrabbed) {
      if (!isPinching) {
        // Released
        setGrabbedObjectId(null);
        return;
      }

      // Smoothly follow hand coordinates with room collision clamping
      const factor = Math.min(delta * 18, 1);
      const targetX = THREE.MathUtils.clamp(handPosition[0], -3.5, 3.5);
      const targetY = THREE.MathUtils.clamp(handPosition[1], 0.35, 3);
      const targetZ = THREE.MathUtils.clamp(handPosition[2], -3.5, 1);

      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        targetX,
        factor,
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        targetY,
        factor,
      );
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        targetZ,
        factor,
      );

      setObjectPosition(id, [
        meshRef.current.position.x,
        meshRef.current.position.y,
        meshRef.current.position.z,
      ]);
    } else {
      // Lerp to stored resting position
      const factor = Math.min(delta * 12, 1);
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        currentPos[0],
        factor,
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        currentPos[1],
        factor,
      );
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        currentPos[2],
        factor,
      );
    }
  });

  const handlePointerDown = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setGrabbedObjectId(id);
  };

  return (
    <group
      ref={meshRef}
      name={name}
      position={currentPos}
      onPointerDown={handlePointerDown}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'grab';
      }}
      onPointerOut={() => {
        setHovered(false);
        if (!isGrabbed) document.body.style.cursor = 'default';
      }}
    >
      {shape === 'cup' ? (
        <group>
          {/* Mug body */}
          <mesh castShadow position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.07, 0.06, 0.14, 16]} />
            <meshStandardMaterial
              color={hovered || isGrabbed ? '#60a5fa' : color}
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
          {/* Mug handle */}
          <mesh position={[0.07, 0.08, 0]}>
            <torusGeometry args={[0.035, 0.012, 8, 16]} />
            <meshStandardMaterial color={color} roughness={0.2} />
          </mesh>
        </group>
      ) : (
        <mesh castShadow position={[0, 0.06, 0]}>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshStandardMaterial color={hovered || isGrabbed ? '#f43f5e' : color} roughness={0.4} />
        </mesh>
      )}

      {/* Floating tooltip on hover */}
      {(hovered || isGrabbed) && (
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      )}
    </group>
  );
}
