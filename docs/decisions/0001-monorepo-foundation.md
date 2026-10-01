# 1. Monorepo Foundation & Workspace Setup

Date: 2026-10-01
Phase: 0 (Repository Foundation)

## Context

We need a scalable, type-safe monorepo foundation to house the 3 applications (`web`, `api`, `realtime`) and shared packages (`shared`), supporting strict TypeScript, local native services, and uniform scripts without relying on local Docker.

## Decisions Made

1. **Workspace Architecture**: Standardized on `pnpm` workspaces (`apps/*`, `packages/*`).
2. **TypeScript & Build**: Strict TypeScript compiler options in root `tsconfig.base.json` extended by each project.
3. **HTTP Server in API and Realtime**: Fastify is used across `apps/api` and `apps/realtime` (for `GET /health` in Phase 0) to maintain consistent route ergonomics and logging standards.
4. **pnpm v12 Build Scripts**: Configured `allowBuilds: { esbuild: true }` in `pnpm-workspace.yaml` to ensure non-interactive, deterministic builds of native binary dependencies.
5. **Testing & Code Quality**: Vitest at the root runs tests across all workspaces without bundling overhead. ESLint flat config (`eslint.config.js`) enforces strict no-any and TypeScript safety.
