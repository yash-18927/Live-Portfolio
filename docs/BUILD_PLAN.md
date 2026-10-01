# BUILD_PLAN.md: phased instructions for building The Waiting Room

You are building the app described in `docs/DESIGN.md`, following the rules in `AGENTS.md`. The goal of this plan is a **complete app that runs and is tested on localhost**, plus **deployment-ready files** (Dockerfiles, GitHub Actions, Kubernetes manifests). The owner will do the cloud and deployment steps by hand afterwards, using the runbook you maintain in `docs/MANUAL_STEPS.md`.

## 0. How to run this plan

**For every phase, follow this loop:**

1. **Plan.** Post the phase plan: files to create or change, dependencies (with reasons), commands, and any questions. Stop and wait for approval.
2. **Build.** Implement only what the phase lists. Nothing extra.
3. **Verify.** Run the phase's acceptance checks. Paste the real output.
4. **Record.** Update `docs/MANUAL_STEPS.md` with anything the owner must do. Add a short note to `docs/decisions/` for any non-obvious choice.
5. **Commit** on the phase branch, summarise in plain English, and stop. Wait for approval before the next phase.

**If something is ambiguous, ask. Do not assume.** If a listed capability does not work in this session (for example running a cluster command or reaching GitHub), say so plainly and put the exact manual steps in `docs/MANUAL_STEPS.md`.

**The owner's machine:** MacBook Air M2, 8 GB RAM, **Docker is not usable locally**. Therefore:

- Local development runs Node processes directly, plus Postgres and Redis installed natively (Homebrew), never in Docker.
- Dockerfiles cannot be tested locally. They are built and verified by GitHub Actions in the cloud (Phase 7).
- Kubernetes manifests are validated statically only (Phase 9). Nothing is applied to a cluster by you.

## 1. Global requirements (apply to every phase)

**Product:** one shared 3D room. Visitors are floating hands controlled by webcam (MediaPipe) or mouse/touch. They see each other's hands live, move shared objects, and leave emoji on a guestbook wall. Portfolio projects appear as objects in the room.

**Responsive (the owner's previous site broke on other screen ratios, so this is a hard requirement):**

- The 3D canvas fills its container and reacts to size changes with `ResizeObserver`. Use `dvh`/`svh` units for full-screen layout, not `vh`.
- The camera adapts to aspect ratio (adjust field of view or distance in portrait so the room is always fully visible). No fixed pixel positions.
- Cap device pixel ratio at 2.
- Adaptive quality tiers (high/medium/low) chosen by device capability and live FPS (Drei `PerformanceMonitor`): lower resolution, fewer effects, smaller textures on weak devices.
- Touch is first-class: no hover-only interactions, tap targets at least 44 px, no accidental page scroll or zoom while interacting with the canvas.
- Verify at these viewports: 375×667, 390×844, 768×1024, 1024×768, 1366×768, 1920×1080, 3440×1440 (Playwright screenshots as smoke tests, plus a manual check by the owner).

**Performance targets** (measure and report; state clearly when you could not measure):

- 30+ FPS on a mid-range phone (simulate with 4× CPU throttling in browser devtools).
- Initial JavaScript under about 300 KB gzipped, excluding lazily loaded 3D and MediaPipe chunks. Show a loading screen with real progress for heavy assets.
- Each 3D asset under 5 MB, compressed (Draco or Meshopt for geometry, KTX2 for textures). Cloudflare Pages free plan limits a single file to 25 MiB, so larger assets are planned for R2.
- Until the owner supplies real models, use simple primitive geometry as placeholders. Do not download third-party assets.

**Content:** all personal content (identity, tone, about facts, projects, skills, links, easter eggs) comes from `docs/PORTFOLIO_CONTENT.md`. Convert it into typed content files under `apps/web/src/content/`, validated by a Zod schema in `packages/shared`. Empty fields render as visibly marked placeholders (never invented text) and are listed in `docs/MANUAL_STEPS.md`. Nicknames are funny and generated deterministically from the visitor ID by a pure function in `packages/shared`, so the API and realtime services agree without talking to each other. The visitor ID is a random UUID stored in the browser.

**Room objects (placeholders, primitives only):** use the "Room mapping" section of `docs/PORTFOLIO_CONTENT.md`. If the owner leaves it unchanged, the defaults are: vending machine = projects, fax machine = contact, plant = about-me facts, guestbook wall = visitor emoji. Every piece of portfolio content must be discoverable by interacting with the room, not by reading a block of text. Do not add objects the mapping does not list; propose extras as questions.

## Phase 0: Repository foundation

**Tasks**

- pnpm workspace with `apps/web`, `apps/api`, `apps/realtime`, `packages/shared`, plus `infra/` and `docs/` folders.
- Root scripts: `dev` (runs all three apps), `build`, `lint`, `typecheck`, `test`, `format`.
- Shared `tsconfig.base.json` (strict), ESLint flat config, Prettier, Vitest, `.editorconfig`, `.gitignore`, `.nvmrc` and `engines` (check the current Node LTS), `.env.example` per app.
- Minimal skeletons: web renders a page; api and realtime each expose `GET /health` returning `{ "status": "ok" }`.
- Create `docs/MANUAL_STEPS.md` with the first entry: install Postgres and Redis natively on macOS (Homebrew), start them, create the `waiting_room` and `waiting_room_test` databases, and verify connections. Write every command out for a beginner.
- `README.md`: what the project is, how to install and run it in five commands.

**Acceptance:** `pnpm install` succeeds. `pnpm dev` starts web (5173), api (3001), realtime (3002). Both `/health` endpoints respond. `pnpm lint && pnpm typecheck && pnpm test && pnpm build` all pass.

## Phase 1: Shared contracts (`packages/shared`)

**Tasks**

- Zod schemas and inferred types for: environment variables per app, REST request/response bodies, and every WebSocket message (a discriminated union on `type`), exactly as listed in `docs/DESIGN.md` section 6.
- The fixed emoji allow-list (24 emoji) and the deterministic `nicknameFromId(visitorId)` function with funny word lists.
- Shared constants: room capacity (30), tick rate (15 Hz), limits.
- Unit tests for schemas (valid and invalid cases) and for nickname determinism.

**Acceptance:** tests pass. `apps/web`, `apps/api` and `apps/realtime` import from `packages/shared` and compile.

## Phase 2: The room, offline (`apps/web`)

**Tasks**

- TanStack Router with two routes: `/` (the room) and a not-found page. A third route, `/boring`, is added in Phase 10 only if the owner opts in inside `docs/PORTFOLIO_CONTENT.md`.
- Build the interactions defined in the "Room mapping" section of `docs/PORTFOLIO_CONTENT.md`, so the owner's content is part of the experience from the first phase.
- React Three Fiber scene: the room, the placeholder objects, lighting, a responsive camera.
- Input: mouse/touch controls a 3D hand cursor. Pinch/click grabs and moves objects (client-side only in this phase). Objects the visitor can interact with show a clear affordance.
- Loading screen driven by real asset progress. Error boundary with a friendly fallback if WebGL is unavailable.
- Quality tiers and the responsive rules from section 1.
- Zustand store for UI/local state. No server calls yet.

**Acceptance:** works in the latest Chrome, Safari and Firefox on desktop. Works with touch in browser device emulation. Playwright screenshot smoke tests pass at all listed viewports. Report measured FPS and bundle size.

## Phase 3: API and guestbook, first full vertical slice (`apps/api`)

**Tasks**

- Fastify app with `@fastify/cors` (allow-list from env), `@fastify/helmet`, `@fastify/rate-limit` (in-memory for now), structured logging (pino), graceful shutdown, and `GET /health` plus `GET /ready` (checks the database).
- Drizzle ORM and drizzle-kit migrations. Table `guestbook_entries(id uuid pk, nickname text, emoji text, created_at timestamptz)`. Migration scripts as `pnpm db:migrate` and `pnpm db:generate`.
- Endpoints: `GET /guestbook?cursor=` (cursor pagination, newest first) and `POST /guestbook` (body: visitor ID and one emoji from the allow-list; the nickname is derived, never sent by the client). All inputs validated with the shared Zod schemas.
- Frontend: the guestbook wall in the room shows entries via TanStack Query (loading, error and empty states). A picker posts one emoji and updates the wall.
- Tests: Vitest integration tests against the real local test database (valid post, invalid emoji, pagination, rate limit).

**Acceptance:** provide `curl` examples that work. Posting from the UI shows on the wall after refresh. All tests pass.

## Phase 4: Realtime (`apps/realtime`)

**Tasks**

- `ws` server with rooms of at most 30 visitors. A new visitor joins the first room with space, otherwise a new room is created.
- Messages exactly as in `docs/DESIGN.md` section 6, all validated. Invalid or oversize messages are dropped and counted. Per-connection message rate cap. Heartbeat ping/pong every 30 seconds to remove dead connections.
- **Tick-batched snapshots:** the server stores the latest state and, 15 times per second, sends each client one `snapshot` with all hands and objects in its room. It never forwards raw messages to peers.
- Shared objects: server-authoritative positions, one holder per object, positions clamped to room bounds, release on disconnect. No physics engine.
- Frontend: WebSocket client with automatic reconnect (exponential backoff with jitter), a visible connection status, interpolation between snapshots, and other visitors' hands rendered with their nicknames.
- Script `apps/realtime/scripts/simulate.ts` that connects N fake clients (default 30) sending hand updates at 15 Hz and logs tick duration, messages per second and memory.
- Unit tests for the room logic (join, leave, capacity, grab conflicts, clamping).

**Acceptance:** two browser tabs see each other's hands and can move the same object. The simulator with 30 clients runs for 2 minutes and reports stable tick times. Tests pass.

## Phase 5: Redis (`apps/api`, `apps/realtime`)

**Tasks**

- Redis client (check which package is currently recommended). Connection handling with retry and clear logging.
- API rate limiting moves to the Redis store. WebSocket connection-per-IP limits also use Redis.
- Presence: each realtime instance publishes its own visitor count under a short-TTL key; `GET /presence` on the API returns the total. The room shows an "N people here" indicator.
- **Redis failure behaviour:** if Redis is down, everything keeps working. Rate limiting falls back to an in-memory limiter and logs a warning. Presence shows hidden.

**Acceptance:** rate limits work across two api processes started on different ports. Stop Redis while the app is running: the app stays usable, and it recovers when Redis returns. Tests cover both cases.

## Phase 6: Webcam hands (`apps/web`)

**Tasks**

- Use `@mediapipe/tasks-vision` Hand Landmarker. Read the current official web guide first. Host the WASM files and the model file yourself inside the web app's assets (no third-party CDN at runtime).
- Run inference in a dedicated Web Worker, sending frames as `ImageBitmap`. If the current MediaPipe release does not run reliably in a worker, fall back to the main thread at a reduced rate and record this in `docs/decisions/`. Do not silently change the design.
- Convert landmarks to the hand's 3D position and a pinch state. Smooth with a small filter. Throttle sends to the tick rate.
- Permission flow: explain clearly before asking for the camera, handle denial and "no camera" gracefully, and always allow switching back to mouse/touch. Show a small "camera is on, video stays on your device" indicator.
- Quality tiers also control camera resolution and inference rate. Stop the camera when the tab is hidden.

**Acceptance:** hand movement drives the 3D hand smoothly on a laptop. Mouse/touch fallback still works. No video frames are ever sent over the network (verify in the browser network tab and state how). Tests cover the landmark-to-hand conversion.

## Phase 7: Containers and CI/CD

**Tasks**

- `infra/docker/api.Dockerfile` and `realtime.Dockerfile`: multi-stage builds, pnpm workspace aware, production dependencies only, non-root user, small final image, and `.dockerignore`. The apps read the `PORT` environment variable (cloud platforms provide it).
- `.github/workflows/ci.yml` on every pull request: install (with caching), lint, typecheck, test (with Postgres and Redis service containers), build, and `docker build` for both images, without pushing. This is where the Dockerfiles get tested.
- `deploy-backend.yml`: builds and pushes both images to Google Artifact Registry and deploys to Cloud Run. Use Workload Identity Federation (`google-github-actions/auth`), not stored service-account keys. Check the current versions and inputs of the official Google actions. Set to run only when triggered manually (`workflow_dispatch`) until the owner enables it.
- `deploy-web.yml`: builds and deploys the frontend to Cloudflare Pages. Runs only on merge to `main`, because the free plan has a monthly build limit. Manual trigger only until the owner enables it.
- **Cloud Run settings for the realtime service** (verify against the current Cloud Run WebSockets docs): request timeout at the 60-minute maximum, do not enable HTTP/2 end-to-end, session affinity on (best effort only), and **maximum instances set to 1** until Phase 9 is implemented, because instances do not share memory. The API service may scale normally with a low maximum-instances cap to protect the budget.
- Secrets and variables: list every GitHub secret/variable and every Google Secret Manager entry needed, with names, in `docs/MANUAL_STEPS.md`. Never put values in the repo.

**Acceptance:** `ci.yml` is valid (lint it with `actionlint` if available) and the workflow logic is explained. State honestly that the workflows can only be proven once the owner pushes and configures secrets. `docs/MANUAL_STEPS.md` contains a complete, ordered, beginner-level deployment runbook: create the Google Cloud project and budget alert, enable APIs, create Artifact Registry, set up Workload Identity Federation and the deploy service account, create managed Postgres and Redis (or free-tier alternatives, with the trade-offs listed), add secrets, create the Cloudflare Pages project, and run the first deploy.

## Phase 8: Observability and load testing

**Tasks**

- `/metrics` endpoint in Prometheus format on api and realtime (`prom-client`): request counts and latency, WebSocket connections, rooms, tick duration, messages per second, dropped messages.
- Grafana dashboard JSON in `infra/grafana/` for those metrics, and an alert-rule example.
- Sentry integration on web and backends, active only when a DSN is configured.
- k6 scripts in `infra/loadtest/`: one for the REST API, one for WebSocket connections and hand updates. Document how to run them and how to read the results.

**Acceptance:** metrics visible locally with `curl`. Run the k6 scripts against localhost and report the numbers and the first bottleneck you observe.

## Phase 9: Scale-out readiness and Kubernetes manifests

**Tasks**

- Make the realtime service safe to run as several instances: Redis Pub/Sub so instances share room events, plus a clear rule for which instance owns a room. Document the design in `docs/decisions/` before implementing it and wait for approval of the design.
- Kubernetes manifests in `infra/k8s/` using Kustomize (base plus `staging` and `production` overlays): Deployments, Services, HorizontalPodAutoscaler, health probes, resource requests and limits, ConfigMap, and Secret _templates_ (no values), and an Ingress or Gateway suited to GKE. WebSockets need suitable timeout and affinity settings on the load balancer: look up the current GKE documentation and follow it.
- Validate statically only (`kubectl kustomize`, `kubectl apply --dry-run=client`, `kubeconform` where available). Do not apply anything to a cluster.
- Add a `docs/MANUAL_STEPS.md` section for GKE Autopilot: create the cluster, connect `kubectl`, apply the overlay, check pods, and how to tear everything down to stop costs.

**Acceptance:** two realtime instances started locally on different ports share a room correctly (test with the simulator). Manifests pass static validation.

## Phase 10: Share and polish

**Tasks**

- "Record clip" button: record the canvas with `MediaRecorder`, offer download and the Web Share API. Local only; no upload.
- Ghost hands: the room replays a few pre-recorded hand paths when it is nearly empty. Recordings are small JSON files in the repo, not stored per visitor.
- If the owner chose "boring mode" in `docs/PORTFOLIO_CONTENT.md`, add a `/boring` route: a fast, plain, accessible page listing the same content, linked from the room. Set the page title, description and social preview from the content file.
- Final pass: accessibility basics (keyboard access to non-3D controls, reduced-motion respect, alt text), error and empty states, favicon and social preview image, and an updated README.

**Acceptance:** full manual test script below passes.

## Final handover

Deliver:

1. `docs/MANUAL_STEPS.md`, ordered and complete, marking each step as _needs the owner_.
2. `docs/TESTING.md` with this localhost script: open two tabs and confirm live hands; move a shared object from each tab; post a guestbook emoji; open the site on a phone on the same Wi-Fi via the laptop's local IP address; stop Redis and confirm graceful behaviour; run the simulator and k6 scripts.
3. A list of every decision that departs from `docs/DESIGN.md`, and every open question.
