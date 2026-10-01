import { useRoomStore, type QualityTier } from '../../store/useRoomStore';

export function RoomHUD() {
  const { qualityTier, setQualityTier, dpr } = useRoomStore();

  const tiers: QualityTier[] = ['low', 'medium', 'high'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '1rem',
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        {/* Title Badge */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '8px 14px',
            color: '#f8fafc',
            pointerEvents: 'auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🫱🚪🫲</span>
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>The Waiting Room</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
            Multiplayer 3D Portfolio • Offline Mode
          </p>
        </div>

        {/* Quality Tier Selector */}
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            pointerEvents: 'auto',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginRight: '4px' }}>
            Quality:
          </span>
          {tiers.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setQualityTier(t)}
              style={{
                background: qualityTier === t ? '#38bdf8' : 'rgba(255, 255, 255, 0.05)',
                color: qualityTier === t ? '#0f172a' : '#cbd5e1',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                minHeight: '44px',
                minWidth: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'capitalize',
                transition: 'all 0.15s ease',
              }}
              aria-label={`Set quality tier to ${t}`}
            >
              {t}
            </button>
          ))}
          <span style={{ fontSize: '0.7rem', color: '#64748b', marginLeft: '4px' }}>
            DPR: {dpr.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Bottom Hint */}
      <div style={{ textAlign: 'center' }}>
        <span
          style={{
            display: 'inline-block',
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '6px 14px',
            color: '#cbd5e1',
            fontSize: '0.8rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
          }}
        >
          👆 Click/tap objects to inspect • Drag cups/cubes with hand
        </span>
      </div>
    </div>
  );
}
