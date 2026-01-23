'use client'

import { useEffect, useState } from 'react'
import ContactReveal from '@/components/ContactReveal'

type Land = {
  land_id: number
  village: string
  mandal: string
  district: string
  state: string
  area: number
  area_unit: string
  total_price: number
  price_per_acre: number
  image_urls?: string // comma-separated images
  seller_type: string
  phone?: string | null
}

export default function HomePage() {
  const [listings, setListings] = useState<Land[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const limit = 9 // listings per page

  const fetchListings = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/reveal-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('sb-access-token') || ''}`
        },
        body: JSON.stringify({ page, limit })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to fetch listings')
      }

      const data = await res.json()
      setListings(data.listings || [])
    } catch (err: any) {
      console.error(err)
      setError(err.message)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchListings()
  }, [page])

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 cursor-pointer" onClick={() => setPage(1)}>
        The Slice X
      </h1>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      {loading ? (
        <p className="text-center text-gray-600">Loading listings…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((land) => {
            const images = land.image_urls
              ? land.image_urls.split(',').map((i) => i.trim()).filter(Boolean)
              : []

            return (
              <div
                key={land.land_id}
                className="bg-white rounded-xl shadow hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full h-48">
                  {images.length > 0 ? (
                    <img
                      src={images[0]}
                      alt={`${land.village} Land`}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {land.village}, {land.mandal}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Area: {land.area} {land.area_unit}
                  </p>
                  <p className="text-sm text-gray-600">
                    ₹{land.total_price?.toLocaleString()} total • ₹{land.price_per_acre?.toLocaleString()} / acre
                  </p>
                  <span className="inline-block text-xs font-medium text-indigo-700">
                    {land.seller_type}
                  </span>

                  {/* Contact Reveal */}
                  {land.phone && (
                    <div className="mt-2">
                      <ContactReveal
                        landId={land.land_id.toString()}
                        ownerNumber={land.phone}
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
    </main>
  )
}
