'use client';

import type { DeviceWithDetails } from '@/lib/devices';
import { cn } from '@/lib/utils';
import { useMapStore } from '@/stores/map';
import DeviceCard from './DeviceCard';

type Props = {
  devices: DeviceWithDetails[];
  className?: string;
};

export default function DevicesList({ devices, className }: Props) {
  const map = useMapStore((s) => s.map);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {devices.map((device) => (
        <DeviceCard
          device={device}
          key={device.id}
          onPressAction={() => {
            if (!map) {
              return;
            }

            map.setView({ lng: device.longitude, lat: device.latitude });
          }}
        />
      ))}
    </div>
  );
}
