'use client';
import { latLngBounds } from 'leaflet';
import { useEffect } from 'react';
import { Circle, MapContainer, Polygon, TileLayer } from 'react-leaflet';
import { getSmokeStatus, type SmokeStatus } from '@/lib/signal';
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

      {signals.map(({ longitude, latitude, smokeValue }) => (
        <DeviceCircle
          center={[latitude, longitude]}
          key={latitude + longitude}
          smokeValue={smokeValue}
        />
      ))}
    </MapContainer>
  );
};

const INNER_RADIUS = 100;
const OUTER_RADIUS = 200;

function DeviceCircle({
  center,
  smokeValue,
}: {
  center: MapWrapperProps['center'];
  smokeValue: number;
}) {
  const status = getSmokeStatus({ smokeValue });

  return (
    <>
      <Circle
        center={center}
        pathOptions={{
          fillColor: fillColorStatusMap[status],
          color: fillColorStatusMap[status],
        }}
        radius={OUTER_RADIUS}
      />
      <Circle
        center={center}
        pathOptions={{
          fillColor: fillColorStatusMap[status],
          color: fillColorStatusMap[status],
        }}
        radius={INNER_RADIUS}
        stroke={false}
      />
    </>
  );
}

// const normalColor = 'blue'
// const warningColor = 'oklch(85.2% 0.199 91.936)';
// const danger = 'blue'

const fillColorStatusMap: Record<SmokeStatus, string> = {
  danger: 'oklch(0.577 0.245 27.325)',
  normal: 'blue',
  warning: 'oklch(85.2% 0.199 91.936)',
};

export default MapInner;
