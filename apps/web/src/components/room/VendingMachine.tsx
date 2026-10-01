import { InteractableObject } from './InteractableObject';

export function VendingMachine({ position = [-2.8, 0, -2.5] as [number, number, number] }) {
  return (
    <InteractableObject
      id="projects"
      label="Vending Machine"
      sublabel="Click to browse Projects"
      position={position}
      rotation={[0, 0.35, 0]}
    >
      {/* Vending machine main body */}
      <mesh castShadow receiveShadow position={[0, 1.4, 0]}>
        <boxGeometry args={[1.2, 2.4, 0.9]} />
        <meshStandardMaterial color="#0f766e" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Front glass window */}
      <mesh position={[0, 1.5, 0.46]}>
        <boxGeometry args={[0.95, 1.4, 0.05]} />
        <meshStandardMaterial
          color="#a5f3fc"
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Shelves inside */}
      {[-0.3, 0.1, 0.5].map((yOffset, idx) => (
        <group key={idx} position={[0, 1.4 + yOffset, 0.2]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.9, 0.04, 0.5]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.7} />
          </mesh>
          {/* Snack items (projects) */}
          {[-0.25, 0, 0.25].map((xOffset, sIdx) => (
            <mesh key={sIdx} position={[xOffset, 0.1, 0]}>
              <boxGeometry args={[0.16, 0.16, 0.16]} />
              <meshStandardMaterial
                color={sIdx % 2 === 0 ? '#f59e0b' : '#ec4899'}
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Bottom retrieval bin */}
      <mesh position={[0, 0.45, 0.46]}>
        <boxGeometry args={[0.8, 0.35, 0.05]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>

      {/* Keypad & payment panel */}
      <mesh position={[0.42, 1.4, 0.46]}>
        <boxGeometry args={[0.18, 0.5, 0.06]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </InteractableObject>
  );
}
