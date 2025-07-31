import { subHours } from 'date-fns';
import { gte } from 'drizzle-orm';
import { z } from 'zod/mini';
import { db } from '@/db/client';
import { Device, FireSignal } from '@/db/schema';

export const createDeviceSchema = z.object({
  longitude: z.number(),
  latitude: z.number(),
});

type CreateDeviceSchema = z.infer<typeof createDeviceSchema>;

export async function createDevice(values: CreateDeviceSchema) {
  return (await db.insert(Device).values(values).returning())[0];
}

const OLDEST_STATUS_CHECK_HOURS = 3;

export async function allDevicesWithDetails() {
  const devices = await db.query.Device.findMany({
    with: {
      signals: {
        where: gte(
          FireSignal.updatedAt,
          subHours(new Date(), OLDEST_STATUS_CHECK_HOURS)
        ),
      },
    },
  });

  return devices.map(({ signals, ...device }) => {
    const maxSmokeValueSignal = getMaxSmokeValueSignal(signals);

    return {
      ...device,
      signal: maxSmokeValueSignal,
    };
  });
}

function getMaxSmokeValueSignal<T extends { smokeValue: number }>(
  signals: T[]
) {
  if (!signals.length) {
    return;
  }

  return signals.reduce((prev, curr) =>
    curr.smokeValue > prev.smokeValue ? curr : prev
  );
}

export const DEVICES_CACHE_KEY = 'devices';
