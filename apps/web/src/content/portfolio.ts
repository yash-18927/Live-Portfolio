import { portfolioContentSchema, type PortfolioContent } from '@waiting-room/shared';

export const portfolioContent: PortfolioContent = portfolioContentSchema.parse({
  identity: {
    name: '[fill me: your name]',
    tagline: '[fill me: your tagline]',
    goal: '[fill me: what you want from this portfolio]',
    targetAudience: '[fill me: who will visit]',
  },
  tone: {
    vibe: ['[fill me: vibe 1]', '[fill me: vibe 2]', '[fill me: vibe 3]'],
    runningGags: ['[fill me: jokes or running gags]'],
    thingsToAvoid: ['[fill me: things to avoid]'],
    languages: ['English'],
  },
  about: {
    facts: ['[fill me: short fact 1]', '[fill me: short fact 2]', '[fill me: short fact 3]'],
    story: '[fill me: your story in two sentences]',
  },
  projects: [
    {
      title: '[fill me: project 1 title]',
      snackName: 'Cosmic Pretzel',
      pitch: '[fill me: one-line pitch]',
      problemSolved: '[fill me: problem it solves]',
      tech: ['React', 'TypeScript', 'Node.js'],
      role: '[fill me: your role]',
      status: '[fill me]',
      liveUrl: null,
      githubUrl: null,
      mediaFile: null,
    },
    {
      title: '[fill me: project 2 title]',
      snackName: 'Galactic Soda',
      pitch: '[fill me: one-line pitch]',
      problemSolved: '[fill me: problem it solves]',
      tech: ['Three.js', 'Fastify', 'WebSockets'],
      role: '[fill me: your role]',
      status: '[fill me]',
      liveUrl: null,
      githubUrl: null,
      mediaFile: null,
    },
  ],
  skills: {
    Frontend: ['React', 'TypeScript', 'Three.js', 'Vite'],
    Backend: ['Node.js', 'Fastify', 'WebSockets', 'PostgreSQL'],
    'Tools & DevOps': ['Docker', 'Git', 'GitHub Actions', 'pnpm'],
  },
  contact: {
    email: '[fill me: email@example.com]',
    github: '[fill me: github username]',
    linkedin: '[fill me: linkedin profile]',
    resumeFile: null,
    otherLinks: [],
  },
  roomMapping: {
    projects: 'Vending Machine',
    contact: 'Fax Machine',
    about: 'Plant',
    guestbook: 'Guestbook Wall',
    skills: 'Bulletin Board',
    resume: 'Desk Clipboard',
  },
  boringMode: false,
});
