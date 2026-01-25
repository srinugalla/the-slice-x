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

// Reuse your ListingCard price formatting
function formatPrice(price?: number): string {
  if (!price || price <= 0) return 'N/A'
  if (price >= 100) return `${(price / 100).toFixed(2)} Cr`
  return `${price} Lakhs`
}

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [listings, setListings] = useState<LandListing[]>([])
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)

  // Detect dark mode
  useEffect(() => {
    const darkModeObserver = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    darkModeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    setIsDark(document.documentElement.classList.contains('dark'))
    return () => darkModeObserver.disconnect()
  }, [])

  // Fetch listings
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

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.9629, 20.5937],
      zoom: 4
    })

    mapRef.current.addControl(new mapboxgl.NavigationControl())
  }, [])

  // Add markers with formatted prices
  useEffect(() => {
    if (!mapRef.current || listings.length === 0) return

    listings.forEach(land => {
      if (!land.latitude || !land.longitude) return

      const popupHTML = `
        <div style="
          font-size: 14px;
          font-weight: 600;
          color: ${isDark ? '#F3F4F6' : '#111827'};
          line-height: 1.4;
        ">
          <p>${land.village}, ${land.mandal}</p>
          <p>Price: ₹${formatPrice(land.total_price)}</p>
          <p>Area: ${land.area} ${land.area_unit}</p>
        </div>
      `

      new mapboxgl.Marker({ color: '#1D4ED8' })
        .setLngLat([land.longitude, land.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML))
        .addTo(mapRef.current!)
    })
  }, [listings, isDark])

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
