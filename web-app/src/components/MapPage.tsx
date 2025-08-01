'use client';

import { getCenterOfPoints } from '@/lib/map';
import type { Signal } from '@/lib/signal';
import MapWrapper from './maps/MapWrapper';

export default function MapPage({ signals }: { signals: Signal[] }) {
  const center = getCenterOfPoints(
    signals.map((signal) => ({
      x: signal.longitude,
      y: signal.latitude,
    }))
  );

  return (
    <MapWrapper center={[center.y, center.x]} polygons={[]} signals={signals} />
  );
}
