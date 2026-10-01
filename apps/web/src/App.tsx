import { APP_NAME } from '@waiting-room/shared';

export function App() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{APP_NAME}</h1>
      <p style={{ color: '#94a3b8' }}>Multiplayer 3D portfolio room. Phase 0 foundation running.</p>
    </main>
  );
}

export default App;
