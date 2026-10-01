# 2. Shared Contracts, Schemas, and Deterministic Nicknames

Date: 2026-10-01
Phase: 1 (Shared Contracts)

## Context
The system has three independently deployed applications (`web`, `api`, `realtime`). They must share a single contract source for types, validation, and constants to prevent client/server drift and ensure safe boundaries.

## Decisions Made
1. **Deterministic Nicknames**: Implemented `nicknameFromId(visitorId)` using 32-bit FNV-1a hashing against curated pools of 34 adjectives and 31 nouns. This eliminates the need for database storage, state synchronization, or coordination between `api` and `realtime`.
2. **Strict Emoji Allow-List**: Defined a fixed tuple of 24 cross-platform emoji (`EMOJI_ALLOW_LIST`) validated via `z.enum`. All free-text inputs are banned across the platform to eliminate moderation liabilities.
3. **Discriminated Union WebSocket Contracts**: Defined `clientMessageSchema` and `serverMessageSchema` using `z.discriminatedUnion('type', ...)`. Messages are strictly validated before routing or processing.
4. **Environment Schemas**: Centralized environment variable schemas (`apiEnvSchema`, `realtimeEnvSchema`, `webEnvSchema`) with safe defaults for local development.
