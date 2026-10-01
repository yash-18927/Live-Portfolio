import { z } from 'zod';

export const apiEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  DATABASE_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),
});

export type ApiEnv = z.infer<typeof apiEnvSchema>;

export const realtimeEnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3002),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  REDIS_URL: z.string().url().optional(),
});

export type RealtimeEnv = z.infer<typeof realtimeEnvSchema>;

export const webEnvSchema = z.object({
  VITE_API_URL: z.string().url().default('http://localhost:3001'),
  VITE_REALTIME_URL: z.string().default('ws://localhost:3002'),
});

export type WebEnv = z.infer<typeof webEnvSchema>;
