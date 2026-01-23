'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

interface LandListing {
  land_id: number
  state: string
  district: string
  mandal: string
  village: string
  total_price: number
  area: number
  area_unit: string
  owner_name?: string
  owner_number?: string
  image_urls?: string[] | string
}

export default function HomePage() {
  const [listings, setListings] = useState<LandListing[]>([])
  const [filteredListings, setFilteredListings] = useState<LandListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [selectedState, setSelectedState] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedMandal, setSelectedMandal] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const listingsPerPage = 30

  // Modal & contact
  const [selectedLand, setSelectedLand] = useState<LandListing | null>(null)
  const [revealedNumbers, setRevealedNumbers] = useState<{ [key: number]: boolean }>({})

  // Derived filter options
  const states = Array.from(new Set(listings.map((l) => l.state)))
  const districts = Array.from(
    new Set(listings.filter(l => l.state === selectedState).map((l) => l.district))
  )
  const mandals = Array.from(
    new Set(listings.filter(l => l.district === selectedDistrict).map((l) => l.mandal))
  )

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase
          .from('land_listings')
          .select('*')
        if (error) throw error

        setListings(data ?? [])
        setFilteredListings(data ?? [])
      } catch (err: any) {
        console.error('Supabase error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchListings()
  }, [])

  const applyFilters = () => {
    let filtered = listings
    if (selectedState) filtered = filtered.filter(l => l.state === selectedState)
    if (selectedDistrict) filtered = filtered.filter(l => l.district === selectedDistrict)
    if (selectedMandal) filtered = filtered.filter(l => l.mandal === selectedMandal)
    if (searchTerm) filtered = filtered.filter(l =>
      l.village.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredListings(filtered)
    setCurrentPage(1)
  }

  // Pagination
  const indexOfLast = currentPage * listingsPerPage
  const indexOfFirst = indexOfLast - listingsPerPage
  const currentListings = filteredListings.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredListings.length / listingsPerPage)

  const goToPage = (page: number) => setCurrentPage(page)

  if (loading) return <p className="p-6 text-gray-600">Loading listings…</p>
  if (error) return <p className="p-6 text-red-600 font-medium">Error: {error}</p>

  return (
    <main className="max-w-7xl mx-auto p-6">
      {/* Hero */}
      <div className="mb-8 text-center">
        <Link href="/">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors">
            The Slice X
          </h1>
        </Link>
        <p className="text-gray-700 text-xl font-medium">Trusted properties you can rely on</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by village or keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded border w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedState}
          onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(''); setSelectedMandal(''); }}
          className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All States</option>
          {states.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={selectedDistrict}
          onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedMandal(''); }}
          className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!selectedState}
        >
          <option value="">All Districts</option>
          {districts.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select
          value={selectedMandal}
          onChange={(e) => setSelectedMandal(e.target.value)}
          className="px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!selectedDistrict}
        >
          <option value="">All Mandals</option>
          {mandals.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <FiPhone /> Search
        </button>
      </div>

      {/* Listings */}
      {currentListings.length === 0 ? (
        <p className="text-gray-500">No listings found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentListings.map((land) => {
            const images: string[] = Array.isArray(land.image_urls)
              ? land.image_urls
              : typeof land.image_urls === 'string'
              ? land.image_urls.split('|').map(i => i.trim()).filter(Boolean)
              : []

            return (
              <div
                key={land.land_id}
                className="rounded-xl border bg-white shadow hover:shadow-xl hover:scale-105 transition-all duration-200 overflow-hidden relative cursor-pointer"
                onClick={() => setSelectedLand(land)}
              >
                {/* Image */}
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  {images.length > 0 ? (
                    <img
                      src={images[0]}
                      alt={`${land.village} land`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No image available</span>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-gray-800">{land.village}, {land.mandal}</h2>
                  <p className="text-gray-700 font-medium">₹{land.total_price?.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{land.area} {land.area_unit}</p>
                  <p className="text-xs text-gray-400">{land.state} / {land.district} / {land.mandal}</p>

                  {/* WhatsApp button */}
                  {land.owner_number && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setRevealedNumbers(prev => ({
                            ...prev,
                            [land.land_id]: !prev[land.land_id]
                          }))
                        }}
                        className="mt-2 flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 hover:scale-105 transition-all duration-200"
                      >
                        <FaWhatsapp /> Contact Owner
                      </button>
                      {revealedNumbers[land.land_id] && (
                        <p className="mt-1 text-sm font-medium text-gray-700">{land.owner_name ? `${land.owner_name} - ` : ''}{land.owner_number}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedLand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative transform transition-transform duration-300 scale-95 animate-fade-in">
            <button
              onClick={() => setSelectedLand(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedLand.village}, {selectedLand.mandal}</h2>
            <p className="mb-1 font-semibold">Price: ₹{selectedLand.total_price?.toLocaleString()}</p>
            <p className="mb-1">Area: {selectedLand.area} {selectedLand.area_unit}</p>
            <p className="mb-1">Location: {selectedLand.state} / {selectedLand.district} / {selectedLand.mandal}</p>
            {selectedLand.owner_name && <p className="mt-2 font-medium">Owner: {selectedLand.owner_name}</p>}
            {selectedLand.owner_number && (
              <p className="flex items-center gap-2 mt-1">
                <FaWhatsapp className="text-green-500" /> {selectedLand.owner_number}
              </p>
            )}

            {selectedLand.image_urls && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(
                  Array.isArray(selectedLand.image_urls)
                    ? selectedLand.image_urls
                    : typeof selectedLand.image_urls === 'string'
                    ? selectedLand.image_urls.split('|').map(i => i.trim()).filter(Boolean)
                    : []
                ).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${selectedLand.village} ${i + 1}`}
                    className="w-full h-32 object-cover rounded"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
