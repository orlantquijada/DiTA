'use client';
import { MapContainer, Polygon, TileLayer } from 'react-leaflet';
import { useMapStore } from '@/stores/map';
import type { MapWrapperProps } from './MapWrapper';

const MapInner = ({ center, polygons }: MapWrapperProps) => {
  const setMap = useMapStore((s) => s.setMap);

  return (
    <MapContainer
      center={center}
      className="h-full w-full"
      ref={setMap}
      scrollWheelZoom={true}
      zoom={19}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={25}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon pathOptions={{ color: 'red' }} positions={polygons} />
    </MapContainer>
  );
};

export default MapInner;
