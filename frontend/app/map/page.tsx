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
  district: string
  state: string
  total_price: number | null
  area: number | null
  area_unit: string | null
  latitude: number | null
  longitude: number | null
}

function formatPrice(price?: number | null) {
  if (!price || price <= 0) return 'N/A'
  if (price >= 100) return `${(price / 100).toFixed(2)} Cr`
  return `${price} Lakhs`
}

export default function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [listings, setListings] = useState<LandListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from('land_listings')
        .select(`
          land_id,
          village,
          mandal,
          district,
          state,
          total_price,
          area,
          area_unit,
          latitude,
          longitude
        `)
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)

      if (!error && data) {
        setListings(data)
      }
      setLoading(false)
    }

    fetchListings()
  }, [])

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || listings.length === 0) return

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [78.9629, 20.5937], // India center
      zoom: 4
    })

    mapRef.current = map

    listings.forEach(land => {
      if (!land.latitude || !land.longitude) return

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="font-family: system-ui; font-size: 14px">
          <strong>${land.village}, ${land.mandal}</strong><br/>
          ${land.district}, ${land.state}<br/>
          <strong>Price:</strong> ₹${formatPrice(land.total_price)}<br/>
          <strong>Area:</strong> ${land.area ?? 'N/A'} ${land.area_unit ?? ''}
        </div>
      `)

      new mapboxgl.Marker({ color: '#2563eb' })
        .setLngLat([land.longitude, land.latitude])
        .setPopup(popup)
        .addTo(map)
    })

    map.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [listings])

  if (loading) {
    return <p className="p-6 text-gray-600">Loading map…</p>
  }

  return (
    <main className="w-full h-[calc(100vh-80px)]">
      <div
        ref={mapContainerRef}
        className="w-full h-full rounded-xl overflow-hidden"
      />
    </main>
  )
}
