"use client";

import MapWrapper, {MapWrapperProps, Polygon} from "./maps/MapWrapper";
import {useState, useEffect} from "react";

const Home = () => {
  const [polygons, setPolygons] = useState<Polygon[]>([]);

  useEffect(() => {
    // Inline mock fetch logic
    setTimeout(() => {
      setPolygons([
        [
          [10.293, 123.88],
          [10.2934, 123.8803],
          [10.29374, 123.88083],
          [10.29366, 123.88094],
        ],
        [
          [10.294, 123.881],
          [10.2944, 123.8813],
          [10.29474, 123.88183],
          [10.29466, 123.88194],
        ],
      ]);
    }, 500); // Simulate network delay
  }, []);

  const mapProps: MapWrapperProps = {
    center: [10.293, 123.88],
    polygons,
  };

  return (
    <main className="grid min-h-screen place-items-center">
      <MapWrapper {...mapProps} />
    </main>
  );
};

export default Home;
