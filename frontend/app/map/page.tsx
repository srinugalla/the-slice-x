'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { supabase } from '@/lib/supabaseClient'
import ContactReveal from '@/components/ContactReveal'

mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
  'pk.eyJ1IjoidGhlc2xpY2V4IiwiYSI6ImNta3Q4MWUyZDFlM3ozZHM2a29naHNrb3gifQ.TwRy8UoVCZsm_uGhJrlsFw'

interface LandListing {
  land_id: number
  village: string
  mandal: string
  state: string
  district: string
  total_price: number
  price_per_acre?: number
  area: number
  area_unit: string
  latitude: number
  longitude: number
  seller_name?: string
  phone?: string
  seller_type?: string
  image_urls?: string[] | string
}

function formatPrice(priceInLakhs?: number): string {
  if (!priceInLakhs || priceInLakhs <= 0) return 'N/A'
  if (priceInLakhs >= 100) return `${(priceInLakhs / 100).toFixed(2)} Cr`
  return `${priceInLakhs} Lakhs`
}

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const [listings, setListings] = useState<LandListing[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLand, setSelectedLand] = useState<LandListing | null>(null)

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from('land_listings')
          .select(`
            land_id,village,mandal,state,district,total_price,area,area_unit,latitude,longitude,
            price_per_acre,seller_name,phone,seller_type,image_urls
          `)
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

  // Initialize Map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [78.9629, 20.5937],
      zoom: 4,
    })
    mapRef.current.addControl(new mapboxgl.NavigationControl())
  }, [])

  // Add markers with premium pins
  useEffect(() => {
    if (!mapRef.current || listings.length === 0) return

    // Clear existing markers
    document.querySelectorAll('.mapboxgl-marker').forEach(marker => marker.remove())

    listings.forEach(land => {
      if (!land.latitude || !land.longitude) return

      // Determine pin color
      let pinColor = '#F97316' // orange default
      if (land.price_per_acre && land.price_per_acre < 25) pinColor = '#16A34A' // green
      else if (land.price_per_acre && land.price_per_acre < 50) pinColor = '#2563EB' // blue

      // Create premium SVG pin
      const el = document.createElement('div')
      el.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 drop-shadow-lg" viewBox="0 0 24 24" fill="${pinColor}">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="3" fill="white"/>
        </svg>
      `
      el.style.cursor = 'pointer'

      // Minimal popup content
      const popupContent = document.createElement('div')
      popupContent.className =
        'bg-white text-black rounded-xl p-3 shadow-lg w-48 cursor-pointer hover:scale-105 transform transition'
      popupContent.innerHTML = `
        <h3 class="font-semibold text-md mb-1">${land.village}, ${land.mandal}</h3>
        <p class="text-sm mb-1">Price: ₹${formatPrice(land.total_price)}</p>
        ${
          land.price_per_acre
            ? `<p class="text-sm mb-1">Price/Acre: ₹${formatPrice(land.price_per_acre)}</p>`
            : ''
        }
        <p class="text-sm">Area: ${land.area} ${land.area_unit}</p>
        <p class="text-blue-600 text-xs mt-1">Click for more details</p>
      `
      popupContent.addEventListener('click', e => {
        e.stopPropagation()
        setSelectedLand(land)
      })

      const popup = new mapboxgl.Popup({ offset: 25, closeButton: true, closeOnClick: true })
        .setDOMContent(popupContent)

      new mapboxgl.Marker(el).setLngLat([land.longitude, land.latitude]).setPopup(popup).addTo(mapRef.current!)
    })
  }, [listings])

  // Close modal on Escape
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedLand(null)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  return (
    <main className="h-screen w-full relative bg-gray-50 dark:bg-gray-900">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/80 z-10">
          <p className="text-gray-600 text-lg font-medium">Loading map data…</p>
        </div>
      )}
      <div ref={mapContainer} className="h-full w-full" />

      {/* Full Modal */}
      {selectedLand && (
        <div
          onClick={() => setSelectedLand(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl transform transition duration-300 scale-100"
          >
            <h2 className="text-3xl font-bold mb-4 text-blue-600">
              {selectedLand.village}, {selectedLand.mandal}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Price:</span> ₹{formatPrice(selectedLand.total_price)}
                </p>
                {selectedLand.price_per_acre && (
                  <p>
                    <span className="font-semibold">Price per Acre:</span> ₹{formatPrice(selectedLand.price_per_acre)}
                  </p>
                )}
                <p>
                  <span className="font-semibold">Area:</span> {selectedLand.area} {selectedLand.area_unit}
                </p>
                <p>
                  <span className="font-semibold">State:</span> {selectedLand.state}
                </p>
                <p>
                  <span className="font-semibold">District:</span> {selectedLand.district}
                </p>
                <p>
                  <span className="font-semibold">Mandal:</span> {selectedLand.mandal}
                </p>
                <p>
                  <span className="font-semibold">Village:</span> {selectedLand.village}
                </p>

                {(selectedLand.seller_name || selectedLand.phone || selectedLand.seller_type) && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-2 text-lg">Seller Details</h3>
                    {selectedLand.seller_name && (
                      <p>
                        <span className="font-medium">Name:</span> {selectedLand.seller_name}
                      </p>
                    )}
                    {selectedLand.seller_type && (
                      <p>
                        <span className="font-medium">Type:</span>{' '}
                        <span className="capitalize">{selectedLand.seller_type}</span>
                      </p>
                    )}
                    {selectedLand.phone && (
                      <div className="mt-2">
                        <ContactReveal
                          landId={selectedLand.land_id.toString()}
                          ownerNumber={selectedLand.phone}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Images */}
              <div className="grid grid-cols-2 gap-3">
                {(() => {
                  const images: string[] = Array.isArray(selectedLand.image_urls)
                    ? selectedLand.image_urls
                    : typeof selectedLand.image_urls === 'string'
                    ? selectedLand.image_urls.split('|').map(i => i.trim()).filter(Boolean)
                    : []
                  return images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${selectedLand.village} ${i + 1}`}
                      className="h-32 object-cover rounded-xl shadow-md"
                    />
                  ))
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
