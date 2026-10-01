import { z } from 'zod';
import { EMOJI_ALLOW_LIST, MAX_GUESTBOOK_PER_PAGE, DEFAULT_GUESTBOOK_PER_PAGE } from '../constants';

// /health
export const healthResponseSchema = z.object({
  status: z.literal('ok'),
});
export type HealthResponse = z.infer<typeof healthResponseSchema>;

// /guestbook
export const guestbookEntrySchema = z.object({
  id: z.string().uuid(),
  nickname: z.string().min(1).max(100),
  emoji: z.enum(EMOJI_ALLOW_LIST),
  createdAt: z.string().datetime(),
});
export type GuestbookEntry = z.infer<typeof guestbookEntrySchema>;

export const getGuestbookQuerySchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .max(MAX_GUESTBOOK_PER_PAGE)
    .default(DEFAULT_GUESTBOOK_PER_PAGE),
});
export type GetGuestbookQuery = z.infer<typeof getGuestbookQuerySchema>;

export const getGuestbookResponseSchema = z.object({
  entries: z.array(guestbookEntrySchema),
  nextCursor: z.string().uuid().nullable(),
});
export type GetGuestbookResponse = z.infer<typeof getGuestbookResponseSchema>;

export const postGuestbookBodySchema = z.object({
  visitorId: z.string().uuid('visitorId must be a valid UUID'),
  emoji: z.enum(EMOJI_ALLOW_LIST),
});
export type PostGuestbookBody = z.infer<typeof postGuestbookBodySchema>;

export const postGuestbookResponseSchema = z.object({
  entry: guestbookEntrySchema,
});
export type PostGuestbookResponse = z.infer<typeof postGuestbookResponseSchema>;

// /leaderboard & /scores
export const leaderboardEntrySchema = z.object({
  rank: z.number().int().positive(),
  nickname: z.string().min(1).max(100),
  score: z.number().int().nonnegative(),
});
export type LeaderboardEntry = z.infer<typeof leaderboardEntrySchema>;

export const getLeaderboardResponseSchema = z.object({
  entries: z.array(leaderboardEntrySchema),
});
export type GetLeaderboardResponse = z.infer<typeof getLeaderboardResponseSchema>;

export const postScoreBodySchema = z.object({
  visitorId: z.string().uuid(),
  score: z.number().int().nonnegative().max(1000000),
});
export type PostScoreBody = z.infer<typeof postScoreBodySchema>;

export const postScoreResponseSchema = z.object({
  entry: leaderboardEntrySchema,
});
export type PostScoreResponse = z.infer<typeof postScoreResponseSchema>;
