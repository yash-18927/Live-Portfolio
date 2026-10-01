import { useState, useRef, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useRoomStore, type InspectedObject } from '../../store/useRoomStore';

interface InteractableObjectProps {
  id: InspectedObject;
  label: string;
  sublabel: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  children: ReactNode;
}

export function InteractableObject({
  id,
  label,
  sublabel,
  position,
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  children,
}: InteractableObjectProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const setInspectedObject = useRoomStore((s) => s.setInspectedObject);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetScale = hovered ? 1.04 : 1.0;
    const factor = Math.min(delta * 10, 1);
    groupRef.current.scale.x = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      targetScale * scale[0],
      factor,
    );
    groupRef.current.scale.y = THREE.MathUtils.lerp(
      groupRef.current.scale.y,
      targetScale * scale[1],
      factor,
    );
    groupRef.current.scale.z = THREE.MathUtils.lerp(
      groupRef.current.scale.z,
      targetScale * scale[2],
      factor,
    );
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setInspectedObject(id);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {children}

      {/* Floating 3D affordance tag */}
      <Html position={[0, 1.4, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
        <button
          type="button"
          onClick={handleClick}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: hovered ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.75)',
            border: hovered ? '1.5px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            padding: '6px 12px',
            color: '#f8fafc',
            fontFamily: 'inherit',
            fontSize: '12px',
            fontWeight: 600,
            backdropFilter: 'blur(8px)',
            boxShadow: hovered ? '0 0 16px rgba(56, 189, 248, 0.4)' : '0 4px 6px rgba(0,0,0,0.3)',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'all 0.15s ease',
            cursor: 'pointer',
            minHeight: '44px',
            minWidth: '44px',
            userSelect: 'none',
          }}
          aria-label={`Inspect ${label}`}
        >
          <span>{label}</span>
          <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 400 }}>{sublabel}</span>
        </button>
      </Html>
    </group>
  );
}
