import Fastify from 'fastify';
import { realtimeEnvSchema, healthResponseSchema, type HealthResponse } from '@waiting-room/shared';

const env = realtimeEnvSchema.parse(process.env);

const fastify = Fastify({
  logger: env.NODE_ENV !== 'test',
});

fastify.get('/health', async (_request, _reply): Promise<HealthResponse> => {
  const response: HealthResponse = { status: 'ok' };
  return healthResponseSchema.parse(response);
});

export async function start() {
  try {
    await fastify.listen({ port: env.PORT, host: env.HOST });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Only start listening when executed directly
if (env.NODE_ENV !== 'test') {
  start();
}

export { fastify };
