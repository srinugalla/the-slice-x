'use client'

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// Add your Mapbox token here
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      mapInstance.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [80.7, 16.5], // India center
        zoom: 5,
      });

      // Optional: add navigation controls
      mapInstance.current.addControl(new mapboxgl.NavigationControl());
    }
  }, []);

  return (
    <div className="w-full h-[80vh] rounded-xl shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
}
