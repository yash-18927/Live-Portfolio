import { useEffect } from 'react';
import { useRoomStore, type InspectedObject } from '../../store/useRoomStore';
import { portfolioContent } from '../../content/portfolio';

export function ObjectOverlayModal() {
  const { inspectedObject, setInspectedObject } = useRoomStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInspectedObject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setInspectedObject]);

  if (!inspectedObject) return null;

  const handleClose = () => setInspectedObject(null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        padding: '1rem',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '560px',
          maxHeight: '85dvh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          color: '#f8fafc',
          padding: '1.5rem',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#38bdf8' }}>
            {getHeaderTitle(inspectedObject)}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            style={{
              background: '#334155',
              border: 'none',
              borderRadius: '8px',
              color: '#f8fafc',
              minWidth: '44px',
              minHeight: '44px',
              cursor: 'pointer',
              fontSize: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        {renderModalContent(inspectedObject)}
      </div>
    </div>
  );
}

function getHeaderTitle(obj: InspectedObject): string {
  switch (obj) {
    case 'projects':
      return '🍿 Vending Machine: Projects';
    case 'contact':
      return '📠 Fax Machine: Contact & Links';
    case 'about':
      return '🪴 Office Plant: About Me';
    case 'guestbook':
      return '📌 Guestbook Wall';
    case 'skills':
      return '📋 Skills Bulletin Board';
    case 'resume':
      return '📁 Resume Clipboard';
    default:
      return 'Inspection';
  }
}

function renderModalContent(obj: InspectedObject) {
  switch (obj) {
    case 'projects':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Snack-sized portfolio projects dispensed directly into the room.
          </p>
          {portfolioContent.projects.map((proj, idx) => (
            <div
              key={idx}
              style={{
                background: '#0f172a',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid #334155',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '0.25rem',
                }}
              >
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{proj.title}</h3>
                <span
                  style={{
                    fontSize: '0.75rem',
                    background: '#334155',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    color: '#f59e0b',
                  }}
                >
                  {proj.snackName}
                </span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                {proj.pitch}
              </p>
              <div
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}
              >
                {proj.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: '0.75rem',
                      background: '#1e293b',
                      border: '1px solid #475569',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      color: '#38bdf8',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case 'contact':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Send a transmission or connect across the web:
          </p>
          <div
            style={{
              background: '#0f172a',
              padding: '1rem',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Email: </span>
              <span style={{ color: '#38bdf8', fontWeight: 500 }}>
                {portfolioContent.contact.email}
              </span>
            </div>
            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>GitHub: </span>
              <span style={{ color: '#38bdf8', fontWeight: 500 }}>
                {portfolioContent.contact.github}
              </span>
            </div>
            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>LinkedIn: </span>
              <span style={{ color: '#38bdf8', fontWeight: 500 }}>
                {portfolioContent.contact.linkedin}
              </span>
            </div>
          </div>
        </div>
      );

    case 'about':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p
            style={{
              color: '#cbd5e1',
              fontStyle: 'italic',
              background: '#0f172a',
              padding: '0.75rem',
              borderRadius: '8px',
            }}
          >
            "{portfolioContent.about.story}"
          </p>
          <div>
            <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
              Discoverable Facts:
            </h4>
            <ul
              style={{
                paddingLeft: '1.25rem',
                color: '#f8fafc',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {portfolioContent.about.facts.map((fact, idx) => (
                <li key={idx} style={{ fontSize: '0.95rem' }}>
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    case 'skills':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Object.entries(portfolioContent.skills).map(([category, skillsList]) => (
            <div key={category}>
              <h4
                style={{
                  fontSize: '0.85rem',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.4rem',
                }}
              >
                {category}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skillsList.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: '#0f172a',
                      border: '1px solid #38bdf8',
                      color: '#f8fafc',
                      fontSize: '0.85rem',
                      padding: '4px 10px',
                      borderRadius: '6px',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case 'guestbook':
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            textAlign: 'center',
            padding: '1rem 0',
          }}
        >
          <div style={{ fontSize: '3rem' }}>👋 🍕 🚀 ✨ 👾</div>
          <p style={{ color: '#cbd5e1' }}>
            The Guestbook Wall accepts emoji reactions from all room visitors.
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            Full persistence and live emoji updates connect in Phase 3.
          </p>
        </div>
      );

    case 'resume':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Curriculum Vitae & Experience document:
          </p>
          <div
            style={{
              background: '#0f172a',
              padding: '1.25rem',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#f8fafc', marginBottom: '0.75rem', fontWeight: 500 }}>
              Resume File: [fill me: resume.pdf]
            </p>
            <button
              type="button"
              disabled
              style={{
                background: '#334155',
                color: '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 16px',
                minHeight: '44px',
                fontWeight: 600,
                cursor: 'not-allowed',
              }}
            >
              Download PDF (File pending in docs/PORTFOLIO_CONTENT.md)
            </button>
          </div>
        </div>
      );

    default:
      return null;
  }
}
