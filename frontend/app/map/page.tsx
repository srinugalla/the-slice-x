'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Example properties with coordinates for testing
const sampleListings = [
  { id: 1, name: 'Mylavaram', lat: 16.7631, lng: 81.7794 },
  { id: 2, name: 'Pondugula', lat: 16.7450, lng: 82.0076 },
]

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [tokenLoaded, setTokenLoaded] = useState(true)

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  useEffect(() => {
    if (!mapboxToken) {
      console.error('Mapbox token not found!')
      setTokenLoaded(false)
      return
    }

    // Set token
    mapboxgl.accessToken = mapboxToken

    if (!mapContainer.current) return

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [81.8, 16.75], // default center
      zoom: 7,
    })

    map.on('load', () => {
      setMapLoaded(true)

      // Add markers
      sampleListings.forEach(listing => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3 class="font-bold">${listing.name}</h3>`
        )

        new mapboxgl.Marker()
          .setLngLat([listing.lng, listing.lat])
          .setPopup(popup)
          .addTo(map)
      })
    })

    return () => map.remove()
  }, [mapboxToken])

  if (!tokenLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 font-semibold">
          Mapbox token not found. Please check your <code>.env.local</code> file.
        </p>
      </div>
    )
  }

  return (
    <div className="h-screen w-full relative">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/80">
          <p className="text-gray-700 font-semibold">Loading Map…</p>
        </div>
      )}
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  )
}
