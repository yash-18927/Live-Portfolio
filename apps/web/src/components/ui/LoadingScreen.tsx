import { useProgress } from '@react-three/drei';

export function LoadingScreen() {
  const { active, progress, item } = useProgress();

  if (!active) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        color: '#f8fafc',
        padding: '2rem',
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🫱🚪🫲</div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#38bdf8' }}>
        Entering The Waiting Room
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        Loading 3D scene & room assets...
      </p>

      {/* Progress Bar Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '300px',
          height: '8px',
          background: '#1e293b',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '1px solid #334155',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${Math.round(progress)}%`,
            background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
            transition: 'width 0.2s ease',
          }}
        />
      </div>

      <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#64748b' }}>
        {Math.round(progress)}% {item ? `• ${item}` : ''}
      </div>
    </div>
  );
}
