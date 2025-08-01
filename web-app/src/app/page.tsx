import { Suspense } from 'react';
import { allDevicesWithDetails, DEVICES_CACHE_KEY } from '@/api/devices';
import MapPage from '@/components/MapPage';
import Sidebar from '@/components/Sidebar';
import { getSet } from '@/lib/redis';
import type { Signal } from '@/lib/signal';

export default async function Home() {
  const devices = await getSet(DEVICES_CACHE_KEY, allDevicesWithDetails);

  const signals: Signal[] = devices.map(
    (device) =>
      device.signal || {
        smokeValue: 0,
        longitude: device.longitude,
        latitude: device.latitude,
      }
  );

  return (
    <main className="flex h-screen gap-6 p-6">
      <Sidebar />

      <div className="flex-1 overflow-clip rounded-4xl border border-neutral-300">
        <Suspense fallback={null}>
          <MapPage signals={signals} />
        </Suspense>
      </div>
    </main>
  );
}
