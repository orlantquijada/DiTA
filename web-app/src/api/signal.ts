import { desc } from 'drizzle-orm';
import { z } from 'zod/mini';
import { db } from '@/db/client';
import { FireSignal } from '@/db/schema';

export const createSignalSchema = z.object({
  longitude: z.number(),
  latitude: z.number(),
  smokeValue: z.number(),
  deviceId: z.optional(z.string()),
});

type CreateSignalSchema = z.infer<typeof createSignalSchema>;

export async function createSignal(values: CreateSignalSchema) {
  return (await db.insert(FireSignal).values(values).returning())[0];
}

export function allSignals() {
  return db.query.FireSignal.findMany({
    orderBy: desc(FireSignal.createdAt),
  });
}
