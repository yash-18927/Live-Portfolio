import type { FastifyInstance } from 'fastify';
import { getRedis, isRedisAvailable } from '../redis.js';

export async function presenceRoutes(app: FastifyInstance) {
  app.get('/presence', async (_request, reply) => {
    if (!isRedisAvailable()) {
      return reply.send({ count: null, available: false });
    }

    const r = getRedis();
    if (!r) return reply.send({ count: null, available: false });

    const keys = await r.keys('presence:*');
    let total = 0;
    for (const key of keys) {
      const val = await r.get(key);
      total += val ? parseInt(val, 10) : 0;
    }

    return reply.send({ count: total, available: true });
  });
}
