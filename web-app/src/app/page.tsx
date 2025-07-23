/** biome-ignore-all lint/suspicious/noConsole: sample */
'use client';

import Map from "./maps/Map";
import { useState } from "react";

export default function Home() {
  const [polygonValue, setPolygonValue] = useState(123.88);
  return (
    <main className="grid min-h-screen place-items-center">
      // tester for expanding polygon
      <button
        onClick={() =>
          setPolygonValue((prev: number) => {
            console.log(prev);
            return prev + 0.0001;
          })
        }
      >
        <span className="text-2xl font-bold">Test Button</span>
      </button>
      <Map
        currentLocation={[10.293, 123.88]}
        polygons={[
          [
            [10.293, polygonValue],
            [10.2934, 123.8803],
            [10.29374, 123.88083],
            [10.29366, 123.88094],
          ],
          [
            [10.294, polygonValue],
            [10.2944, 123.8803],
            [10.29474, 123.88083],
            [10.29466, 123.88094],
          ],
        ]}
      />
    </main>
  );
}
