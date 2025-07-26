"use client";
import {MapContainer, TileLayer, Marker, Popup, Polygon} from "react-leaflet";
import type {MapWrapperProps} from "./MapWrapper";

const MapInner = ({center, polygons}: MapWrapperProps) => {
  console.log("MapInner rendered");
  return (
    <MapContainer
      center={center}
      zoom={19}
      scrollWheelZoom={true}
      className="h-dvh w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={25}
      />
      <Polygon pathOptions={{color: "red"}} positions={polygons} />
    </MapContainer>
  );
};

export default MapInner;
