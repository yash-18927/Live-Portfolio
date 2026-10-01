import { InteractableObject } from './InteractableObject';

export function FaxMachine({ position = [2.6, 0, -2.2] as [number, number, number] }) {
  return (
    <InteractableObject
      id="contact"
      label="Fax Machine"
      sublabel="Click for Contact & Links"
      position={position}
      rotation={[0, -0.4, 0]}
    >
      {/* Wooden Table/Credenza Stand */}
      <mesh castShadow receiveShadow position={[0, 0.45, 0]}>
        <boxGeometry args={[1.1, 0.9, 0.7]} />
        <meshStandardMaterial color="#78350f" roughness={0.7} />
      </mesh>

      {/* Table legs */}
      {[-0.45, 0.45].map((x) =>
        [-0.25, 0.25].map((z, idx) => (
          <mesh key={`${x}-${idx}`} position={[x, 0.2, z]}>
            <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>
        )),
      )}

      {/* Fax Machine Body */}
      <mesh castShadow position={[0, 1.05, 0]}>
        <boxGeometry args={[0.55, 0.2, 0.42]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.5} />
      </mesh>

      {/* Paper Feed Tray */}
      <mesh position={[0, 1.25, -0.1]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.35, 0.3, 0.02]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>

      {/* Telephone Handset */}
      <mesh position={[-0.22, 1.18, 0.05]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.1, 0.35, 0.1]} />
        <meshStandardMaterial color="#475569" roughness={0.4} />
      </mesh>

      {/* Keypad */}
      <mesh position={[0.1, 1.16, 0.05]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.22, 0.18, 0.02]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </InteractableObject>
  );
}
