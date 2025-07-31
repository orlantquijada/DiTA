import type { Map as LeafletMap } from 'leaflet';
import { create } from 'zustand';

type MapStore = {
  map: LeafletMap | null;
  setMap: (map: LeafletMap | null) => void;
};

export const useMapStore = create<MapStore>()((set) => ({
  map: null,
  setMap: (map) => set({ map }),
}));
