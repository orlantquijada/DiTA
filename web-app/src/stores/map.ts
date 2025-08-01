import { LatLngTuple, Polygon } from '@/components/maps/MapWrapper';
import type { Map as LeafletMap } from 'leaflet';
import { create } from 'zustand';

type MapStore = {
  map: LeafletMap | null;
  setMap: (map: LeafletMap | null) => void;
  circleCenter: LatLngTuple | null;
  setCircleCenter: (center: LatLngTuple | null) => void;
};

export const useMapStore = create<MapStore>()((set) => ({
  map: null,
  setMap: (map) => set({ map }),
  circleCenter: null,
  setCircleCenter: (center) => set({ circleCenter: center }),
}));
