import { InteractableObject } from './InteractableObject';

export function SkillsBoard({ position = [-1.8, 1.9, -3.95] as [number, number, number] }) {
  return (
    <InteractableObject
      id="skills"
      label="Skills Board"
      sublabel="Click to explore Tech Stack"
      position={position}
    >
      {/* Frame */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.3, 1.1, 0.05]} />
        <meshStandardMaterial color="#475569" roughness={0.4} />
      </mesh>

      {/* Board surface */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[1.18, 0.98, 0.02]} />
        <meshStandardMaterial color="#0f172a" roughness={0.8} />
      </mesh>

      {/* Categorized skill badges representation */}
      {[-0.25, 0, 0.25].map((y, rowIdx) =>
        [-0.35, 0, 0.35].map((x, colIdx) => (
          <mesh key={`${rowIdx}-${colIdx}`} position={[x, y, 0.04]}>
            <boxGeometry args={[0.26, 0.14, 0.01]} />
            <meshStandardMaterial
              color={rowIdx === 0 ? '#38bdf8' : rowIdx === 1 ? '#a855f7' : '#34d399'}
              roughness={0.4}
            />
          </mesh>
        )),
      )}
    </InteractableObject>
  );
}
