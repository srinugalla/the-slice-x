'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { supabase } from '@/lib/supabaseClient'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

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

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase.from('land_listings').select('*')
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

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !process.env.NEXT_PUBLIC_MAPBOX_TOKEN) return

    // Initialize Map
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.9629, 20.5937], // center India
      zoom: 4
    })

    // Add navigation controls
    mapRef.current.addControl(new mapboxgl.NavigationControl())

  }, [])

  // Add markers once map and listings are loaded
  useEffect(() => {
    if (!mapRef.current || listings.length === 0) return

    listings.forEach(land => {
      if (!land.latitude || !land.longitude) return

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="text-sm font-semibold">
          ${land.village}, ${land.mandal}<br/>
          Price: ₹${land.total_price}<br/>
          Area: ${land.area} ${land.area_unit}
        </div>
      `)

      new mapboxgl.Marker({ color: '#1D4ED8' })
        .setLngLat([land.longitude, land.latitude])
        .setPopup(popup)
        .addTo(mapRef.current!)
    })
  }, [listings])

  if (!process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return <div className="p-6 text-red-600">Error: Mapbox token not found. Please check your .env.local file.</div>
  }

  return (
    <main className="h-screen w-full">
      {loading && <p className="p-6 text-gray-600">Loading map data…</p>}
      <div ref={mapContainer} className="h-full w-full" />
    </main>
  )
}
