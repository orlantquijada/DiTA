'use client';
import { latLngBounds } from 'leaflet';
import { useEffect } from 'react';
import { Circle, MapContainer, Polygon, TileLayer } from 'react-leaflet';
import { useMapStore } from '@/stores/map';
import type { MapWrapperProps } from './MapWrapper';

const MapInner = ({ center, polygons, signals }: MapWrapperProps) => {
  const map = useMapStore((s) => s.map);
  const setMap = useMapStore((s) => s.setMap);

  useEffect(() => {
    if (!map) {
      return;
    }

    const bounds = latLngBounds(
      signals.map(({ latitude, longitude }) => ({
        lat: latitude,
        lng: longitude,
      }))
    );
    map.fitBounds(bounds, { padding: [25, 25] });
  }, [signals, map]);

  return (
    <MapContainer
      center={center}
      className="h-full w-full"
      ref={setMap}
      scrollWheelZoom={true}
      zoom={15}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={25}
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polygon pathOptions={{ color: 'red' }} positions={polygons} />

      {signals.map(({ longitude, latitude }) => (
        <DeviceCircle
          center={[latitude, longitude]}
          key={latitude + longitude}
        />
      ))}
    </MapContainer>
  );
};

const INNER_RADIUS = 100;
const OUTER_RADIUS = 200;

function DeviceCircle({ center }: { center: MapWrapperProps['center'] }) {
  return (
    <>
      <Circle
        center={center}
        pathOptions={{ fillColor: 'blue' }}
        radius={OUTER_RADIUS}
      />
      <Circle
        center={center}
        pathOptions={{ fillColor: 'red' }}
        radius={INNER_RADIUS}
        stroke={false}
      />
    </>
  );
}

export default MapInner;
