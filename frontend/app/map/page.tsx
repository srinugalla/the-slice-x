'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { supabase } from '@/lib/supabaseClient'

// ⚡ For quick testing, you can provide the token directly here if env is not working
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoidGhlc2xpY2V4IiwiYSI6ImNta3QxampxNjB0MzgzZ3M0bHBxaWp2aHcifQ.wVQ64fUFZO-n0xp-HQPPcQ'

interface LandListing {
  land_id: number
  village: string
  mandal: string
  state: string
  district: string
  total_price: number
  area: number
  area_unit: string
  latitude: number
  longitude: number
}

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [listings, setListings] = useState<LandListing[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch listings from Supabase
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from('land_listings')
          .select('land_id,village,mandal,state,district,total_price,area,area_unit,latitude,longitude')
        if (error) throw error
        setListings(data ?? [])
      } catch (err) {
        console.error('Error fetching listings:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.9629, 20.5937], // Center India
      zoom: 4
    })

    mapRef.current.addControl(new mapboxgl.NavigationControl())
  }, [])

  // Add markers to map
  useEffect(() => {
    if (!mapRef.current || listings.length === 0) return

    // Clear existing markers
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker')
    existingMarkers.forEach(marker => marker.remove())

    listings.forEach(land => {
      if (!land.latitude || !land.longitude) return

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="text-sm font-semibold">
          <p>${land.village}, ${land.mandal}</p>
          <p>Price: ₹${land.total_price.toLocaleString()}</p>
          <p>Area: ${land.area} ${land.area_unit}</p>
        </div>
      `)

      new mapboxgl.Marker({ color: '#1D4ED8' })
        .setLngLat([land.longitude, land.latitude])
        .setPopup(popup)
        .addTo(mapRef.current!)
    })
  }, [listings])

  // Fallback if token is missing
  if (!mapboxgl.accessToken) {
    return (
      <div className="p-6 text-red-600">
        Error: Mapbox token not found. Please check your .env.local file.
      </div>
    )
  }

  return (
    <main className="h-screen w-full relative">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/80 z-10">
          <p className="text-gray-600 text-lg font-medium">Loading map data…</p>
        </div>
      )}
      <div ref={mapContainer} className="h-full w-full" />
    </main>
  )
}
