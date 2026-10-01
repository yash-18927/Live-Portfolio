# MANUAL_STEPS.md: tasks only the human can do

This file tracks all setup tasks, secrets, accounts, and content fields that require manual action by you (the owner).
Every step is written out in plain English with beginner-friendly terminal commands.

---

## 1. Native Database & Cache Setup (macOS / Homebrew)

The project runs on native PostgreSQL and Redis for local development (no Docker).
Follow these exact steps in your terminal to set them up:

### Step 1.1: Install PostgreSQL and Redis

Open your terminal and run:

```bash
brew install postgresql@16 redis
```

### Step 1.2: Start the background services

Start both services so they run locally in the background:

```bash
brew services start postgresql@16
brew services start redis
```

### Step 1.3: Create the local databases

Create the development and test databases:

```bash
createdb waiting_room
createdb waiting_room_test
```

_(If `createdb` says the command is not found, add Postgres to your PATH or run: `/opt/homebrew/opt/postgresql@16/bin/createdb waiting_room && /opt/homebrew/opt/postgresql@16/bin/createdb waiting_room_test`)_

### Step 1.4: Verify PostgreSQL connection

Verify that Postgres is running and you can connect:

```bash
psql -d waiting_room -c "SELECT 'PostgreSQL connection successful!' AS status;"
```

You should see `PostgreSQL connection successful!`.

### Step 1.5: Verify Redis connection

Ping your local Redis server:

```bash
redis-cli ping
```

You should see:

```
PONG
```

---

## 2. Portfolio Content to Fill (`docs/PORTFOLIO_CONTENT.md`)

When you are ready, open `docs/PORTFOLIO_CONTENT.md` and replace the `[fill me]` fields with your own details. Until you do, the site will show visibly marked placeholders.

- [ ] **Section 1: Identity**
  - Name / handle shown in the room
  - One-line tagline
  - What I want from this portfolio
  - Who will visit
- [ ] **Section 2: Tone and humor**
  - Three words for the vibe
  - Jokes or running gags
  - Things to avoid
  - Language(s)
- [ ] **Section 3: About me**
  - Fact 1
  - Fact 2
  - Fact 3
  - Story in two sentences
- [ ] **Section 4: Projects**
  - Projects details (title, pitch, tech, links)
- [ ] **Section 5: Skills**
  - Grouped technical skills
- [ ] **Section 6: Links and contact**
  - Email, GitHub, LinkedIn, Resume filename
- [ ] **Section 7: Room mapping**
  - Skills room object
  - Resume room object
  - Custom interaction ideas and easter eggs
- [ ] **Section 8: Boring mode**
  - Yes / No for `/boring` text-only fallback route
- [ ] **Section 9: Files to provide**
  - Place any assets (resume PDF, project screenshots) into `apps/web/public/content/`
