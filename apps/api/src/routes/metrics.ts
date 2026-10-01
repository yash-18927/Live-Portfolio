import type { FastifyInstance } from 'fastify';
import { register } from 'prom-client';

export async function metricsRoutes(app: FastifyInstance) {
  app.get('/metrics', async (_request, reply) => {
    const metrics = await register.metrics();
    return reply.type(register.contentType).send(metrics);
  });
}
