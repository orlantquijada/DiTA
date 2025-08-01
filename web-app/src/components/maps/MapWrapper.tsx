import dynamic from 'next/dynamic';
import type { Signal } from '@/lib/signal';

type LatLngTuple = [number, number];
export type Polygon = LatLngTuple[];

export interface MapWrapperProps {
  center: LatLngTuple;
  polygons: Polygon[];
  signals: Signal[];
}

const MapWrapper = dynamic<MapWrapperProps>(() => import('./MapInner'), {
  ssr: false,
});

export default MapWrapper;
