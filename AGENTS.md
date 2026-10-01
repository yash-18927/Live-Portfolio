# AGENTS.md: rules for AI agents in this repository

Project: **The Waiting Room**, a shared 3D room where visitors are floating hands. The owner is a beginner developer who wants to learn how professional systems are built. Work like a careful senior engineer and teach as you go.

Read before doing anything: `docs/DESIGN.md` (architecture), `docs/BUILD_PLAN.md` (phases and acceptance tests), `docs/MANUAL_STEPS.md` (tasks only the human can do), `docs/PORTFOLIO_CONTENT.md` (the owner's personal content and how it maps to the room).

## How to work

1. **Plan before code.** Before changing anything, state: the goal, files you will create/modify/delete, dependencies you propose (with a one-line reason each), and commands you will run. Then stop and wait for approval.
2. **One phase at a time.** Never start the next phase without explicit approval.
3. **Never guess.** If a requirement, name, version, or behaviour is unclear, ask. Do not invent features, endpoints, tables, screens, or config that the current task does not call for.
4. **Check current docs.** Before using any library or cloud API, read its official documentation. Do not rely on memory; APIs change. Use the latest stable version at install time and pin it.
5. **Prove it works.** After each slice run lint, typecheck, tests, and build. Report the real output, including failures. Never say something works unless you ran it.
6. **Ask first** before: adding or upgrading a dependency, changing folder structure, deviating from `DESIGN.md`, running destructive commands (`rm -rf`, `git reset --hard`, force-push, dropping databases), pushing to GitHub, or merging.
7. **Only do what is possible.** Do not assume tools or permissions you have not confirmed in this session. Anything you cannot do (accounts, secrets, cloud consoles, DNS, commands needing `sudo` or the owner's credentials) goes in `docs/MANUAL_STEPS.md` with exact, beginner-level steps. Never fake it, and never invent credentials that look real.
8. **Explain.** After each slice, summarise in plain English what you built, why, and how to run it.
9. **Never invent facts about the owner.** Every name, project, skill, job, date, link, or achievement shown on the site must come from `docs/PORTFOLIO_CONTENT.md`. If a field is empty, show a visibly marked placeholder such as `[fill me]` and list it in `docs/MANUAL_STEPS.md`.

## Fixed stack (do not substitute)

TypeScript (strict) everywhere. pnpm workspaces monorepo. Frontend: React, Vite, TanStack Query, TanStack Router, React Three Fiber, Drei, Zustand, MediaPipe (`@mediapipe/tasks-vision`) in a Web Worker. API: Node.js + Fastify. Realtime: Node.js + `ws`. Validation: Zod (schemas in `packages/shared`). Database: PostgreSQL with Drizzle ORM. Cache/limits: Redis. Tests: Vitest, Playwright. Lint/format: ESLint, Prettier. Containers: Docker (built in CI, not on the owner's laptop). CI/CD: GitHub Actions. Metrics: Prometheus format, Grafana dashboards. Errors: Sentry (optional, disabled without a DSN).

## Structure

```
apps/web  apps/api  apps/realtime  packages/shared
infra/docker  infra/k8s  infra/grafana
docs/  .github/workflows/
```

Ports in development: web 5173, api 3001, realtime 3002.

## Code standards

- No `any`, no `@ts-ignore`, no dead code, no commented-out code, no TODO placeholders, no unused dependencies or exports.
- Small functions, clear names. Comments only explain _why_, never _what_.
- Validate every input at the boundary (HTTP body, query, WebSocket message, environment variables) with the shared Zod schemas.
- Handle errors deliberately: typed errors, meaningful HTTP status codes, no swallowed exceptions.
- Every new behaviour gets a test. Database tests use a real local Postgres test database, not mocks.
- Frontend must work on any screen: phone, tablet, laptop, ultrawide, portrait and landscape. Never hard-code pixel sizes for layout or the 3D camera.

## Security

- No secrets in git. Use `.env` files (ignored) and commit `.env.example` with fake values.
- CORS allow-list from configuration, never `*` in production.
- Guestbook and reactions accept only values from a fixed emoji allow-list. No free text anywhere.
- Rate-limit all write endpoints and all WebSocket messages.
- Webcam video is processed only in the browser and is never uploaded or stored.

## Git

- One branch per phase (`phase-N-short-name`), one commit per finished slice with a clear message.
- Never commit to `main` directly, never force-push. Ask the owner before pushing or opening a pull request.

## Out of scope (do not build unless the owner says so)

User accounts or login, free-text chat, payments, native apps, server-side physics, the mini-game and its leaderboard, Terraform, AI features, third-party analytics or trackers, any feature not listed in `docs/BUILD_PLAN.md`.
