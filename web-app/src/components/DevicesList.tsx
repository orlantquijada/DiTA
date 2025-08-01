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

  const handleClickDevice = (device: DeviceWithDetails) => {
    if (!map) {
      return;
    }

    map.setView({ lng: device.longitude, lat: device.latitude });
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {devices.map((device) => (
        // biome-ignore lint/a11y/useKeyWithClickEvents: asd
        // biome-ignore lint/a11y/noStaticElementInteractions: asd
        // biome-ignore lint/nursery/noNoninteractiveElementInteractions: asd
        <div
          key={device.id}
          onClick={() => handleClickDevice(device)}
          style={{ cursor: 'pointer' }}
        >
          <DeviceCard
            device={device}
            onPressAction={() => handleClickDevice(device)}
          />
        </div>
      ))}
    </div>
  );
}
