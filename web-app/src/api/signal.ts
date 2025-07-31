import { desc } from 'drizzle-orm';
import { z } from 'zod/mini';
import { db } from '@/db/client';
import { FireSignal, type FireSignalType } from '@/db/schema';

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

export type SmokeStatus = 'normal' | 'warning' | 'danger';
const SmokeStatusMap: Record<SmokeStatus, number> = {
  normal: 0,
  warning: 300,
  danger: 500,
};

export function getSmokeStatus(signal: FireSignalType): SmokeStatus {
  if (signal.smokeValue >= SmokeStatusMap.danger) {
    return 'danger';
  }
  if (signal.smokeValue >= SmokeStatusMap.warning) {
    return 'warning';
  }

  return 'normal';
}
