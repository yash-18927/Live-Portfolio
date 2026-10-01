# The Waiting Room 🫱🚪🫲

A shared 3D room where every visitor is a floating hand. Visitors can see each other in real time, move shared objects, explore portfolio projects, and leave emoji on the guestbook wall.

Built to demonstrate how production-grade multiplayer web applications are designed, tested, and deployed.

---

## Architecture Overview

This monorepo is organized using **pnpm workspaces**:

- **`apps/web`**: React + Vite frontend running on React Three Fiber (port `5173`).
- **`apps/api`**: Fastify REST API for durable data like guestbook entries (port `3001`).
- **`apps/realtime`**: Fastify + WebSocket service for tick-batched hand multiplayer state (port `3002`).
- **`packages/shared`**: Shared Zod contracts, deterministic nickname generators, and constants.
- **`infra/`**: Dockerfiles, Kubernetes manifests, and Grafana monitoring dashboards.
- **`docs/`**: Architecture design, build plan, decision records, and manual steps.

---

## Quickstart in 5 Commands

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start PostgreSQL and Redis (macOS Homebrew)

```bash
brew services start postgresql@16 && brew services start redis
```

_(For first-time native setup details, see `docs/MANUAL_STEPS.md`)_

### 3. Create local databases

```bash
createdb waiting_room && createdb waiting_room_test
```

### 4. Run test suite and type checking

```bash
pnpm test && pnpm typecheck
```

### 5. Start the development environment

```bash
pnpm dev
```

Once running, open your browser to:

- **Web App**: [http://localhost:5173](http://localhost:5173)
- **API Health Check**: [http://localhost:3001/health](http://localhost:3001/health)
- **Realtime Health Check**: [http://localhost:3002/health](http://localhost:3002/health)

---

## Available Scripts

From the repository root:

- `pnpm dev` - Concurrently runs `web`, `api`, and `realtime` dev servers.
- `pnpm build` - Builds all packages and applications.
- `pnpm typecheck` - Runs TypeScript strict type checking across all packages.
- `pnpm test` - Runs unit and integration test suites using Vitest.
- `pnpm lint` - Runs ESLint across the codebase.
- `pnpm format` - Formats the entire repository using Prettier.
