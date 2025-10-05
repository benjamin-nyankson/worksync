"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamic import of react-leaflet components (client-only)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { appName } from "@/app/page";

// Custom marker icon (fixes broken default icons in Next.js)
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

interface MapProps {
  locations?: { lat: number; lng: number; label?: string }[];
}

export function Map({
  locations = [{ lat: 5.6037, lng: -0.187, label: appName + " HQ" }],
}: MapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient)
    return (
      <div className="h-[300px] bg-foreground/10 rounded-2xl animate-pulse" />
    );

  return (
    <div className="h-[300px] md:h-[400px] rounded-2xl overflow-hidden border border-foreground/10 shadow-inner">
      <MapContainer
        center={[locations[0].lat, locations[0].lng]}
        zoom={6}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc, index) => (
          <Marker key={index} position={[loc.lat, loc.lng]} icon={icon}>
            <Popup>{loc.label ??  appName + " Office"}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
