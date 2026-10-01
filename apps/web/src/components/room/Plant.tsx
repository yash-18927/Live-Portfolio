import { InteractableObject } from './InteractableObject';

export function Plant({ position = [-3.2, 0, 0.6] as [number, number, number] }) {
  return (
    <InteractableObject
      id="about"
      label="Office Plant"
      sublabel="Click for Facts About Me"
      position={position}
      rotation={[0, 0.6, 0]}
    >
      {/* Terracotta Pot */}
      <mesh castShadow position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.32, 0.22, 0.7, 16]} />
        <meshStandardMaterial color="#c2410c" roughness={0.8} />
      </mesh>

      {/* Soil */}
      <mesh position={[0, 0.68, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
        <meshStandardMaterial color="#451a03" roughness={1.0} />
      </mesh>

      {/* Central Stems & Leaves */}
      <group position={[0, 0.7, 0]}>
        {[
          { rot: [0.3, 0, 0.2], pos: [0.1, 0.3, 0], scale: [0.35, 0.45, 0.02], color: '#15803d' },
          {
            rot: [-0.2, 1.2, 0.4],
            pos: [-0.15, 0.4, 0.1],
            scale: [0.38, 0.5, 0.02],
            color: '#16a34a',
          },
          {
            rot: [0.4, -1.5, -0.3],
            pos: [0.12, 0.45, -0.1],
            scale: [0.34, 0.46, 0.02],
            color: '#22c55e',
          },
          {
            rot: [-0.3, -0.5, -0.3],
            pos: [-0.1, 0.55, -0.15],
            scale: [0.4, 0.52, 0.02],
            color: '#15803d',
          },
          {
            rot: [0.1, 2.2, 0.3],
            pos: [0.05, 0.65, 0.15],
            scale: [0.36, 0.48, 0.02],
            color: '#16a34a',
          },
        ].map((leaf, idx) => (
          <group
            key={idx}
            position={leaf.pos as [number, number, number]}
            rotation={leaf.rot as [number, number, number]}
          >
            <mesh castShadow>
              <sphereGeometry args={[0.2, 8, 8]} />
              <meshStandardMaterial color={leaf.color} roughness={0.5} />
            </mesh>
          </group>
        ))}
      </group>
    </InteractableObject>
  );
}
