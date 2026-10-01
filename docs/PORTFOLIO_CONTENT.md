# PORTFOLIO_CONTENT.md: my personal content and how it appears in the room

**For the owner:** fill in what you can now, and leave the rest as `[fill me]`. You can come back any time; Antigravity will show clearly marked placeholders for anything empty.

**For Antigravity:** this file is the only source of facts about the owner. Never invent names, projects, skills, jobs, dates, links or achievements. Turn this content into typed files under `apps/web/src/content/` (validated by a Zod schema in `packages/shared`). Portfolio content must be discovered by interacting with the room, not by reading a block of text. List every `[fill me]` field in `docs/MANUAL_STEPS.md`.

## 1. Identity

- Name / handle shown in the room: [fill me]
- One-line tagline (what I do, in a fun way): [fill me]
- What I want from this portfolio (jobs, freelance clients, internships, just to be seen): [fill me]
- Who will visit (recruiters, developers, friends, strangers online): [fill me]

## 2. Tone and humor

- Three words for the vibe (example: chaotic, warm, nerdy): [fill me]
- Jokes or running gags I like: [fill me]
- Things to avoid (topics, styles, words): [fill me]
- Language(s) for the site: [fill me]

## 3. About me: short facts

Write 3 to 5 short, true facts. Each one becomes a small discoverable moment in the room (default: the plant).

1. [fill me]
2. [fill me]
3. [fill me]

My story in two sentences: [fill me]

## 4. Projects

Copy this block once per project. Default: each project is an item in the vending machine.

```
Title: [fill me]
Funny snack name for the vending machine (optional): [fill me]
One-line pitch: [fill me]
The problem it solves: [fill me]
Tech used: [fill me]
My role: [fill me]
Status (live, prototype, archived): [fill me]
Live link: [fill me]
GitHub link: [fill me]
Image or video available (file name): [fill me]
```

## 5. Skills

Group them however you like (example: Frontend, Backend, Tools, Learning now).

- [fill me]

## 6. Links and contact

- Email: [fill me]
- GitHub: [fill me]
- LinkedIn: [fill me]
- Resume file (PDF, file name): [fill me]
- Other links: [fill me]
- Do NOT show publicly (phone, address, etc.): [fill me]

Default: contact appears at the fax machine.

## 7. Room mapping

Which part of me appears as which thing in the room? The defaults below come from the design. Change them, or add ideas of your own.

| Content           | Default room object                                    | My change (optional) |
| ----------------- | ------------------------------------------------------ | -------------------- |
| Projects          | Vending machine                                        | [fill me]            |
| Contact and links | Fax machine                                            | [fill me]            |
| About-me facts    | Plant                                                  | [fill me]            |
| Visitor emoji     | Guestbook wall                                         | [fill me]            |
| Skills            | [fill me: no default, suggest options in Phase 2 plan] | [fill me]            |
| Resume            | [fill me: no default, suggest options in Phase 2 plan] | [fill me]            |

My own interaction ideas (things visitors do that reveal something about me): [fill me]

Secret easter eggs (hidden interactions, messages, rewards): [fill me]

## 8. Boring mode

Recruiters sometimes want a fast, plain page. Should the site include a `/boring` page listing the same content (recommended for accessibility and search engines)? **yes / no:** [fill me]

## 9. Files I will provide

Put files in `apps/web/public/content/`. List them here (photo, resume PDF, project screenshots, sounds). Until they exist, Antigravity uses primitive placeholders and never downloads third-party assets.

- [fill me]
