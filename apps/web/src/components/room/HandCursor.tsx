import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRoomStore } from '../../store/useRoomStore';

/**
 * 3D Hand Cursor controlled by mouse or touch.
 * Follows the pointer projected onto an interactive plane in front of the camera,
 * with smooth lerping and a pinch animation.
 */
export function HandCursor() {
  const groupRef = useRef<THREE.Group>(null);
  const fingersRef = useRef<THREE.Group>(null);
  const thumbRef = useRef<THREE.Mesh>(null);

  const { isPinching, setHandPosition } = useRoomStore();
  const { camera, pointer, raycaster } = useThree();

  // Target plane at z = 0
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const targetPoint = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Raycast from camera pointer onto virtual interaction plane
    raycaster.setFromCamera(pointer, camera);
    raycaster.ray.intersectPlane(plane.current, targetPoint.current);

    // Clamp coordinates within room boundaries
    const targetX = THREE.MathUtils.clamp(targetPoint.current.x, -4, 4);
    const targetY = THREE.MathUtils.clamp(targetPoint.current.y, -1, 3.5);
    const targetZ = THREE.MathUtils.clamp(targetPoint.current.z, -3, 2);

    // Smooth lerp movement (delta independent)
    const factor = Math.min(delta * 14, 1);
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      factor,
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      factor,
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      factor,
    );

    // Slight tilt following movement velocity
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -(targetX - groupRef.current.position.x) * 0.4,
      factor,
    );

    // Update store position for object grabbing
    setHandPosition([
      groupRef.current.position.x,
      groupRef.current.position.y,
      groupRef.current.position.z,
    ]);

    // Animate fingers when pinching
    if (fingersRef.current && thumbRef.current) {
      const pinchRotation = isPinching ? 0.75 : 0.05;
      const thumbRotation = isPinching ? -0.6 : -0.15;
      fingersRef.current.rotation.x = THREE.MathUtils.lerp(
        fingersRef.current.rotation.x,
        pinchRotation,
        factor * 1.5,
      );
      thumbRef.current.rotation.z = THREE.MathUtils.lerp(
        thumbRef.current.rotation.z,
        thumbRotation,
        factor * 1.5,
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} raycast={() => null}>
      {/* Palm */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[0.22, 0.28, 0.08]} />
        <meshStandardMaterial
          color={isPinching ? '#f59e0b' : '#38bdf8'}
          roughness={0.3}
          metalness={0.2}
          emissive={isPinching ? '#b45309' : '#0369a1'}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Thumb */}
      <mesh ref={thumbRef} position={[-0.14, -0.04, 0.02]} rotation={[0, 0, -0.15]}>
        <capsuleGeometry args={[0.04, 0.12, 6, 8]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Fingers group (curls when pinching) */}
      <group ref={fingersRef} position={[0, 0.14, 0]}>
        {[-0.075, -0.025, 0.025, 0.075].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0.08, 0]}>
            <capsuleGeometry args={[0.035, idx === 1 || idx === 2 ? 0.16 : 0.13, 6, 8]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.3} metalness={0.2} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
