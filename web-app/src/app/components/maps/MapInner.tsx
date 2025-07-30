'use client';
import { MapContainer, Polygon, TileLayer } from 'react-leaflet';
import type { MapWrapperProps } from './MapWrapper';

const MapInner = ({ center, polygons }: MapWrapperProps) => {
  return (
    <MapContainer
      center={center}
      className="h-dvh w-full"
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
