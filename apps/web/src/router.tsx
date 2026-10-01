import { lazy, Suspense } from 'react';
import { createRootRoute, createRoute, createRouter, Outlet, Link } from '@tanstack/react-router';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { RoomHUD } from './components/ui/RoomHUD';
import { ObjectOverlayModal } from './components/ui/ObjectOverlayModal';
import { LoadingScreen } from './components/ui/LoadingScreen';

const LazyRoomCanvas = lazy(() =>
  import('./components/room/RoomCanvas').then((m) => ({ default: m.RoomCanvas })),
);

// 1. Root route layout
const rootRoute = createRootRoute({
  component: () => (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  ),
  notFoundComponent: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
        background: '#0f172a',
        color: '#f8fafc',
        textAlign: 'center',
        padding: '1.5rem',
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚪</div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#38bdf8' }}>
        404: Room Not Found
      </h1>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem', maxWidth: '420px' }}>
        You wandered into an empty corridor. Return to the main waiting room.
      </p>
      <Link
        to="/"
        style={{
          background: '#0284c7',
          color: '#ffffff',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          minHeight: '44px',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        Back to The Waiting Room
      </Link>
    </div>
  ),
});

// 2. Index route (The Room)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <main style={{ width: '100vw', height: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <LoadingScreen />
      <RoomHUD />
      <Suspense fallback={null}>
        <LazyRoomCanvas />
      </Suspense>
      <ObjectOverlayModal />
    </main>
  ),
});

// 3. Assemble route tree and router
const routeTree = rootRoute.addChildren([indexRoute]);

export const router = createRouter({
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
