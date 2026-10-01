import Redis from 'ioredis';

let redis: Redis | null = null;
let redisAvailable = true;

export function getRedis(): Redis | null {
  if (redis) return redis;

  const url = process.env.REDIS_URL ?? 'redis://localhost:6379';
  try {
    redis = new Redis(url, {
      maxRetriesPerRequest: 1,
      retryStrategy: (times: number) => (times > 3 ? null : Math.min(times * 200, 2000)),
      lazyConnect: true,
    });

    redis.on('error', () => {
      redisAvailable = false;
    });
    redis.on('connect', () => {
      redisAvailable = true;
    });

    return redis;
  } catch {
    redisAvailable = false;
    return null;
  }
}

export function isRedisAvailable(): boolean {
  return redisAvailable && redis !== null && redis.status === 'ready';
}

export async function closeRedis() {
  if (redis) {
    await redis.quit().catch(() => {});
    redis = null;
  }
}
