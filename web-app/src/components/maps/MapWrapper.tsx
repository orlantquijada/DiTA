import dynamic from 'next/dynamic';

export type LatLngTuple = [number, number];
export type Polygon = LatLngTuple[];

export interface MapWrapperProps {
  center: LatLngTuple;
  polygons: Polygon[];
}

const MapWrapper = dynamic<MapWrapperProps>(() => import('./MapInner'), {
  ssr: false,
});

export default MapWrapper;
