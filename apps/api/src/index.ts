import Fastify from 'fastify';

const fastify = Fastify({
  logger: process.env.NODE_ENV !== 'test',
});

fastify.get('/health', async (_request, _reply) => {
  return { status: 'ok' };
});

const port = Number(process.env.PORT) || 3001;
const host = process.env.HOST || '0.0.0.0';

export async function start() {
  try {
    await fastify.listen({ port, host });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Only start listening when executed directly
if (process.env.NODE_ENV !== 'test') {
  start();
}

export { fastify };
