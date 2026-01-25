'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string

export default function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [78.9629, 20.5937], // India center
      zoom: 4.5
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => {
      map.remove()
    }
  }, [])

  return (
    <main className="h-screen w-full">
      {/* Header */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white px-6 py-3 rounded-full shadow-lg">
        <h1 className="font-semibold text-black">Land Listings Map</h1>
      </div>

      {/* Map */}
      <div ref={mapContainerRef} className="h-full w-full" />
    </main>
  )
}
