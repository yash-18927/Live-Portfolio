import { describe, expect, it } from 'vitest';
import { fastify } from './index';

describe('API Service', () => {
  it('GET /health returns status ok', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
  });
});
