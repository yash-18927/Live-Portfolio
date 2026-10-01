import type { FastifyInstance } from 'fastify';
import { desc, lt } from 'drizzle-orm';
import {
  getGuestbookQuerySchema,
  postGuestbookBodySchema,
  nicknameFromId,
  type GetGuestbookResponse,
  type PostGuestbookResponse,
} from '@waiting-room/shared';
import { getDb, schema } from '../db/index.js';

export async function guestbookRoutes(app: FastifyInstance) {
  app.get('/guestbook', async (request, reply) => {
    const query = getGuestbookQuerySchema.parse(request.query);
    const db = getDb();

    const conditions = query.cursor ? [lt(schema.guestbookEntries.createdAt, new Date(query.cursor))] : [];

    const rows = await db
      .select()
      .from(schema.guestbookEntries)
      .where(conditions.length > 0 ? conditions[0] : undefined)
      .orderBy(desc(schema.guestbookEntries.createdAt))
      .limit(query.limit + 1);

    const hasMore = rows.length > query.limit;
    const entries = (hasMore ? rows.slice(0, query.limit) : rows).map((r) => ({
      id: r.id,
      nickname: r.nickname,
      emoji: r.emoji,
      createdAt: r.createdAt.toISOString(),
    }));

    const nextCursor = hasMore ? entries[entries.length - 1].createdAt : null;

    const response: GetGuestbookResponse = { entries, nextCursor };
    return reply.send(response);
  });

  app.post('/guestbook', async (request, reply) => {
    const body = postGuestbookBodySchema.parse(request.body);
    const nickname = nicknameFromId(body.visitorId);
    const db = getDb();

    const [inserted] = await db
      .insert(schema.guestbookEntries)
      .values({
        nickname,
        emoji: body.emoji,
      })
      .returning();

    const entry = {
      id: inserted.id,
      nickname: inserted.nickname,
      emoji: inserted.emoji,
      createdAt: inserted.createdAt.toISOString(),
    };

    const response: PostGuestbookResponse = { entry };
    return reply.status(201).send(response);
  });
}
