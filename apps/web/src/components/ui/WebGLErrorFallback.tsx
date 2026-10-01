import { portfolioContent } from '../../content/portfolio';

interface WebGLErrorFallbackProps {
  error?: Error | undefined;
  resetErrorBoundary?: () => void;
}

export function WebGLErrorFallback({ error }: WebGLErrorFallbackProps) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        background: '#0f172a',
        color: '#f8fafc',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ maxWidth: '680px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🖥️</div>
          <h1
            style={{
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#f8fafc',
              marginBottom: '0.5rem',
            }}
          >
            WebGL Acceleration Unavailable
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Your browser or device currently cannot render 3D graphics hardware acceleration. Here
            is the accessible 2D view of <strong>The Waiting Room</strong> portfolio:
          </p>
        </div>

        {error && (
          <div
            style={{
              background: '#450a0a',
              border: '1px solid #991b1b',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: '#fecaca',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
            }}
          >
            {error.message}
          </div>
        )}

        {/* Identity & About */}
        <section
          style={{
            background: '#1e293b',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
          }}
        >
          <h2 style={{ fontSize: '1.3rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
            {portfolioContent.identity.name}
          </h2>
          <p style={{ color: '#cbd5e1', marginBottom: '1rem' }}>
            {portfolioContent.identity.tagline}
          </p>
          <p style={{ color: '#94a3b8', fontStyle: 'italic', marginBottom: '1rem' }}>
            "{portfolioContent.about.story}"
          </p>
          <h3 style={{ fontSize: '1rem', color: '#f8fafc', marginBottom: '0.5rem' }}>Facts</h3>
          <ul style={{ paddingLeft: '1.25rem', color: '#94a3b8' }}>
            {portfolioContent.about.facts.map((fact, idx) => (
              <li key={idx} style={{ marginBottom: '0.25rem' }}>
                {fact}
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section
          style={{
            background: '#1e293b',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '1.5rem',
          }}
        >
          <h2 style={{ fontSize: '1.3rem', color: '#38bdf8', marginBottom: '1rem' }}>
            Projects (Vending Machine)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {portfolioContent.projects.map((proj, idx) => (
              <div
                key={idx}
                style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px' }}
              >
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{proj.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0.25rem 0' }}>
                  {proj.pitch}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '1.3rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
            Contact & Links (Fax Machine)
          </h2>
          <p style={{ color: '#94a3b8' }}>Email: {portfolioContent.contact.email}</p>
          <p style={{ color: '#94a3b8' }}>GitHub: {portfolioContent.contact.github}</p>
          <p style={{ color: '#94a3b8' }}>LinkedIn: {portfolioContent.contact.linkedin}</p>
        </section>
      </div>
    </div>
  );
}
