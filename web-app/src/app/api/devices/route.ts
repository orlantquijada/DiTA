import {
  allDevicesWithDetails,
  createDevice,
  createDeviceSchema,
  DEVICES_CACHE_KEY,
} from '@/api/devices';
import { getSet, redis } from '@/lib/redis';

export async function POST(request: Request) {
  const data = await request.json();
  const parseResponse = createDeviceSchema.safeParse(data);

  if (!parseResponse.success) {
    return Response.json({ message: 'Request failed.' }, { status: 400 });
  }

  const device = await createDevice(parseResponse.data);

  // invalidate cache
  await redis.del(DEVICES_CACHE_KEY);

  return Response.json(device, { status: 200 });
}

export async function GET() {
  const devices = await getSet(DEVICES_CACHE_KEY, allDevicesWithDetails);

  return Response.json(devices, { status: 200 });
}
