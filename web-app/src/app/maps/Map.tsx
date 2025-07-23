'use client';

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

type LatLngTuple = [number, number];
type Polygon = LatLngTuple[];

interface MapComponentProps {
  currentLocation: LatLngExpression;
  polygons: Polygon[];
}

export default function MapComponent({
  currentLocation,
  polygons,
}: MapComponentProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const map = L.map("map").setView(currentLocation, 50);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      polygons.forEach((coords) => {
        L.polygon(coords, {
          color: "red",
          fillColor: "blue",
          fillOpacity: 0.5,
        }).addTo(map);
      });

      return () => {
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }
      };
    });
  }, [currentLocation, polygons]);

  return <div id="map" className="h-lvh w-lvw" />;
}
