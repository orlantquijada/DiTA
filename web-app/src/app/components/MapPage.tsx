'use client';

import { useEffect, useState } from 'react';
import MapWrapper, {
  type MapWrapperProps,
  type Polygon,
} from './maps/MapWrapper';

export default function MapPage() {
  const [polygons, setPolygons] = useState<Polygon[]>([]);

  useEffect(() => {
    // Inline mock fetch logic
    setTimeout(() => {
      setPolygons([
        [
          [10.293, 123.88],
          [10.2934, 123.8803],
          [10.293_74, 123.880_83],
          [10.293_66, 123.880_94],
        ],
        [
          [10.294, 123.881],
          [10.2944, 123.8813],
          [10.294_74, 123.881_83],
          [10.294_66, 123.881_94],
        ],
      ]);
    }, 500); // Simulate network delay
  }, []);

  const mapProps: MapWrapperProps = {
    center: [10.293, 123.88],
    polygons,
  };

  return <MapWrapper {...mapProps} />;
}
