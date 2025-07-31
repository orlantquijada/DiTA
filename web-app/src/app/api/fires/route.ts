import { DEVICES_CACHE_KEY } from '@/api/devices';
import { allSignals, createSignal, createSignalSchema } from '@/api/signal';
import { redis } from '@/lib/redis';

const SIGNALS_CACHE_KEY = 'signals';

export async function POST(request: Request) {
  const data = await request.json();
  const parseResponse = createSignalSchema.safeParse(data);

  if (!parseResponse.success) {
    return Response.json({ message: 'Request failed.' }, { status: 400 });
  }

  const signal = await createSignal(parseResponse.data);

  // invalidate cache
  await redis.del(SIGNALS_CACHE_KEY, DEVICES_CACHE_KEY);

  return Response.json(signal, { status: 200 });
}

export async function GET() {
  const cachedSignals = await redis.get(SIGNALS_CACHE_KEY);
  if (cachedSignals) {
    return Response.json(cachedSignals, { status: 200 });
  }

  const signals = await allSignals();
  await redis.set(SIGNALS_CACHE_KEY, signals);

  return Response.json(signals, { status: 200 });
}
