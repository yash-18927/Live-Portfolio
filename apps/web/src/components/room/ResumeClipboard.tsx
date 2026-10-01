import { InteractableObject } from './InteractableObject';

export function ResumeClipboard({ position = [0, 0, -1.2] as [number, number, number] }) {
  return (
    <group position={position}>
      {/* Low Coffee Table */}
      <mesh castShadow receiveShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[1.6, 0.1, 1.0]} />
        <meshStandardMaterial color="#451a03" roughness={0.7} />
      </mesh>

      {/* Table Legs */}
      {[-0.65, 0.65].map((x) =>
        [-0.35, 0.35].map((z, idx) => (
          <mesh key={`${x}-${idx}`} position={[x, 0.16, z]}>
            <cylinderGeometry args={[0.03, 0.03, 0.32, 8]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
        )),
      )}

      {/* The Interactive Resume Clipboard */}
      <InteractableObject
        id="resume"
        label="Resume Folder"
        sublabel="Click to preview & download"
        position={[0, 0.45, 0]}
        rotation={[-1.57, 0, 0.1]}
      >
        {/* Wooden Board */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry args={[0.42, 0.58, 0.02]} />
          <meshStandardMaterial color="#78350f" roughness={0.6} />
        </mesh>

        {/* Paper Sheet */}
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[0.38, 0.52, 0.005]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.9} />
        </mesh>

        {/* Metal Clip at Top */}
        <mesh position={[0, 0.24, 0.03]}>
          <boxGeometry args={[0.15, 0.06, 0.025]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.2} />
        </mesh>
      </InteractableObject>
    </group>
  );
}
