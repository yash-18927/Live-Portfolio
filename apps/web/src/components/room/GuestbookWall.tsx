import { InteractableObject } from './InteractableObject';

export function GuestbookWall({ position = [0, 2.0, -3.95] as [number, number, number] }) {
  const sampleEmojiNotes = [
    { pos: [-0.6, 0.3, 0.03], color: '#fef08a' },
    { pos: [-0.2, 0.25, 0.03], color: '#bae6fd' },
    { pos: [0.2, 0.35, 0.03], color: '#fbcfe8' },
    { pos: [0.6, 0.2, 0.03], color: '#bbf7d0' },
    { pos: [-0.4, -0.25, 0.03], color: '#fed7aa' },
    { pos: [0.0, -0.3, 0.03], color: '#fef08a' },
    { pos: [0.45, -0.2, 0.03], color: '#bae6fd' },
  ];

  return (
    <InteractableObject
      id="guestbook"
      label="Guestbook Wall"
      sublabel="Click to view & post Emoji"
      position={position}
    >
      {/* Outer wooden frame */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.0, 1.3, 0.06]} />
        <meshStandardMaterial color="#92400e" roughness={0.7} />
      </mesh>

      {/* Cork / Felt board surface */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[1.85, 1.15, 0.03]} />
        <meshStandardMaterial color="#d97706" roughness={0.9} />
      </mesh>

      {/* Sticky note emoji cards */}
      {sampleEmojiNotes.map((note, idx) => (
        <mesh
          key={idx}
          position={note.pos as [number, number, number]}
          rotation={[0, 0, ((idx % 3) - 1) * 0.08]}
        >
          <boxGeometry args={[0.24, 0.24, 0.01]} />
          <meshStandardMaterial color={note.color} roughness={0.8} />
        </mesh>
      ))}
    </InteractableObject>
  );
}
