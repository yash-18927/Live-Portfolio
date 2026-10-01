import { useRoomStore } from '../../store/useRoomStore';

export function RoomEnvironment() {
  const qualityTier = useRoomStore((s) => s.qualityTier);
  const enableShadows = qualityTier !== 'low';

  return (
    <group>
      {/* Lights */}
      <ambientLight intensity={qualityTier === 'low' ? 0.9 : 0.65} />

      <directionalLight
        position={[4, 6, 4]}
        intensity={1.2}
        castShadow={enableShadows}
        shadow-mapSize-width={enableShadows ? (qualityTier === 'high' ? 1024 : 512) : 256}
        shadow-mapSize-height={enableShadows ? (qualityTier === 'high' ? 1024 : 512) : 256}
        shadow-camera-near={0.5}
        shadow-camera-far={15}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      <pointLight position={[-2, 3.5, -2]} intensity={0.5} color="#38bdf8" />
      <pointLight position={[2, 3.5, -2]} intensity={0.5} color="#f59e0b" />

      {/* Room Floor */}
      <mesh receiveShadow={enableShadows} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#334155" roughness={0.65} metalness={0.1} />
      </mesh>

      {/* Back Wall */}
      <mesh receiveShadow={enableShadows} position={[0, 2.5, -4]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Left Wall with Window Cutout */}
      <mesh receiveShadow={enableShadows} position={[-4, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.85} />
      </mesh>

      {/* Window Frame on Left Wall */}
      <group position={[-3.98, 2.6, -1]} rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 1.4, 0.04]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Right Wall */}
      <mesh receiveShadow={enableShadows} position={[4, 2.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.85} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#020617" roughness={0.9} />
      </mesh>
    </group>
  );
}
