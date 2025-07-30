import { z } from 'zod/mini';
import { db } from '@/db/client';
import { Device } from '@/db/schema';

export const createDeviceSchema = z.object({
  longitude: z.number(),
  latitude: z.number(),
});

type CreateDeviceSchema = z.infer<typeof createDeviceSchema>;

export async function createDevice(values: CreateDeviceSchema) {
  return (await db.insert(Device).values(values).returning())[0];
}

export function allDevices() {
  return db.query.Device.findMany();
}
