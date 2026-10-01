import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string(),
  snackName: z.string().optional(),
  pitch: z.string(),
  problemSolved: z.string(),
  tech: z.array(z.string()),
  role: z.string(),
  status: z.enum(['live', 'prototype', 'archived', '[fill me]']),
  liveUrl: z.string().nullable(),
  githubUrl: z.string().nullable(),
  mediaFile: z.string().nullable(),
});
export type PortfolioProject = z.infer<typeof projectSchema>;

export const portfolioContentSchema = z.object({
  identity: z.object({
    name: z.string(),
    tagline: z.string(),
    goal: z.string(),
    targetAudience: z.string(),
  }),
  tone: z.object({
    vibe: z.array(z.string()),
    runningGags: z.array(z.string()),
    thingsToAvoid: z.array(z.string()),
    languages: z.array(z.string()),
  }),
  about: z.object({
    facts: z.array(z.string()),
    story: z.string(),
  }),
  projects: z.array(projectSchema),
  skills: z.record(z.string(), z.array(z.string())),
  contact: z.object({
    email: z.string().nullable(),
    github: z.string().nullable(),
    linkedin: z.string().nullable(),
    resumeFile: z.string().nullable(),
    otherLinks: z.array(
      z.object({
        label: z.string(),
        url: z.string(),
      }),
    ),
  }),
  roomMapping: z.record(z.string(), z.string()),
  boringMode: z.boolean(),
});
export type PortfolioContent = z.infer<typeof portfolioContentSchema>;
