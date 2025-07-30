import { allDevices, createDevice, createDeviceSchema } from '@/lib/devices';
import { redis } from '@/lib/redis';

const DEVICES_CACHE_KEY = 'devices';

export async function POST(request: Request) {
  const data = await request.json();
  const parseResponse = createDeviceSchema.safeParse(data);

  if (!parseResponse.success) {
    return Response.json({ message: 'Request failed.' }, { status: 400 });
  }

  const device = await createDevice(parseResponse.data);

  // invalidate cache
  const devices = await allDevices();
  await redis.set(DEVICES_CACHE_KEY, devices);

  return Response.json(device, { status: 200 });
}

export async function GET() {
  const cachedDevices = await redis.get(DEVICES_CACHE_KEY);
  if (cachedDevices) {
    return Response.json(cachedDevices, { status: 200 });
  }

  const devices = await allDevices();
  await redis.set(DEVICES_CACHE_KEY, devices);

  return Response.json(devices, { status: 200 });
}
