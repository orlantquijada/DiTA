import { Redis } from '@upstash/redis';

export const redis = Redis.fromEnv();

export async function getSet<T>(key: string, fetcher: () => Promise<T>) {
  const cachedData = (await redis.get(key)) as Awaited<T>;
  if (cachedData) {
    return cachedData;
  }

  const data = await fetcher();
  await redis.set(key, data);

  return data;
}
