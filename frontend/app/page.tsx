'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'
import ContactReveal from '@/components/ContactReveal'

/* ---------------- Price Utility ---------------- */
function formatPrice(priceInLakhs?: number): string {
  if (!priceInLakhs || priceInLakhs <= 0) return 'N/A'
  if (priceInLakhs >= 100) {
    return `${(priceInLakhs / 100).toFixed(2)} Cr`
  }
  return `${priceInLakhs} Lakhs`
}

/* ---------------- Types ---------------- */
export interface LandListing {
  land_id: number
  state: string
  district: string
  mandal: string
  village: string
  total_price: number
  area: number
  area_unit: string

  seller_name?: string
  phone?: string
  seller_type?: string

  owner_name?: string
  owner_number?: string
  image_urls?: string[] | string
}

/* ---------------- Page ---------------- */
export default function HomePage() {
  const [listings, setListings] = useState<LandListing[]>([])
  const [filteredListings, setFilteredListings] = useState<LandListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedState, setSelectedState] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [selectedMandal, setSelectedMandal] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const listingsPerPage = 15
  const [selectedLand, setSelectedLand] = useState<LandListing | null>(null)

  const states = Array.from(new Set(listings.map(l => l.state)))
  const districts = Array.from(new Set(listings.filter(l => l.state === selectedState).map(l => l.district)))
  const mandals = Array.from(new Set(listings.filter(l => l.district === selectedDistrict).map(l => l.mandal)))

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { data, error } = await supabase.from('land_listings').select('*')
        if (error) throw error
        setListings(data ?? [])
        setFilteredListings(data ?? [])
      } catch (err: any) {
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
    if (searchTerm) {
      filtered = filtered.filter(l =>
        l.village.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    setFilteredListings(filtered)
    setCurrentPage(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const indexOfLast = currentPage * listingsPerPage
  const indexOfFirst = indexOfLast - listingsPerPage
  const currentListings = filteredListings.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredListings.length / listingsPerPage)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setSelectedLand(null)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  if (loading) return <p className="p-6 text-gray-600">Loading listings…</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <main className="max-w-7xl mx-auto p-6">

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        <input
          placeholder="Search by village"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded border w-full sm:w-64"
        />
        <select value={selectedState} onChange={e => { setSelectedState(e.target.value); setSelectedDistrict(''); setSelectedMandal('') }} className="px-4 py-2 border rounded">
          <option value="">All States</option>
          {states.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={selectedDistrict} onChange={e => { setSelectedDistrict(e.target.value); setSelectedMandal('') }} disabled={!selectedState} className="px-4 py-2 border rounded">
          <option value="">All Districts</option>
          {districts.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={selectedMandal} onChange={e => setSelectedMandal(e.target.value)} disabled={!selectedDistrict} className="px-4 py-2 border rounded">
          <option value="">All Mandals</option>
          {mandals.map(m => <option key={m}>{m}</option>)}
        </select>
        <button onClick={applyFilters} className="px-4 py-2 bg-blue-600 text-white rounded flex gap-2">
          <FiPhone /> Search
        </button>
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentListings.map(land => {
          const images = Array.isArray(land.image_urls) ? land.image_urls : typeof land.image_urls === 'string' ? land.image_urls.split('|').map(i => i.trim()).filter(Boolean) : []
          return (
            <div key={land.land_id} onClick={() => setSelectedLand(land)} className="rounded-xl border bg-white shadow hover:scale-105 transition cursor-pointer text-black">
              <div className="h-48 bg-gray-100">
                {images[0] ? <img src={images[0]} className="w-full h-full object-cover" /> : <div className="flex h-full items-center justify-center text-gray-400">No image</div>}
              </div>
              <div className="p-4 space-y-1 text-black">
                <h2 className="font-semibold text-black">{land.village}, {land.mandal}</h2>
                <p className="font-medium text-black">₹{formatPrice(land.total_price)}</p>
                <p className="text-sm text-black">{land.area} {land.area_unit}</p>
                {land.owner_number && <ContactReveal landId={land.land_id.toString()} ownerNumber={land.owner_number} />}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Wheel-like Pagination */}
      {totalPages > 1 && (
        <div className="w-full flex justify-center py-4">
          {/* Container: fixed width viewport showing 5 pages */}
          <div className="relative w-80 overflow-x-auto overflow-y-hidden scroll-smooth whitespace-nowrap flex items-center scrollbar-none">
            <div className="flex gap-4 items-center">
              {Array.from({ length: totalPages }, (_, i) => {
                const page = i + 1
                const isCurrent = page === currentPage
                return (
                  <div
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`
                      inline-flex items-center justify-center w-14 h-14 rounded-full cursor-pointer flex-shrink-0
                      transition-transform duration-300
                      ${isCurrent
                        ? 'bg-blue-600 text-white scale-125 font-bold' // no border here
                        : 'bg-white text-black border border-gray-300'}
                    `}
                  >
                    {page}
                  </div>
                )
              })}
            </div>

            {/* Center indicator line */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-0.5 bg-blue-400 pointer-events-none"></div>
          </div>
        </div>
      )}


      {/* Modal */}
      {selectedLand && (
        <div onClick={() => setSelectedLand(null)} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div onClick={e => e.stopPropagation()} className="bg-white text-black rounded-2xl max-w-4xl w-[95%] max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-black">{selectedLand.village}, {selectedLand.mandal}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 text-black">
                <p><span className="font-semibold">Price:</span> ₹{formatPrice(selectedLand.total_price)}</p>
                <p><span className="font-semibold">Area:</span> {selectedLand.area} {selectedLand.area_unit}</p>
                <p><span className="font-semibold">State:</span> {selectedLand.state}</p>
                <p><span className="font-semibold">District:</span> {selectedLand.district}</p>
                <p><span className="font-semibold">Mandal:</span> {selectedLand.mandal}</p>
                <p><span className="font-semibold">Village:</span> {selectedLand.village}</p>

                {(selectedLand.seller_name || selectedLand.phone || selectedLand.seller_type) && (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold text-black mb-1">Seller Details</h3>
                    {selectedLand.seller_name && <p><span className="font-medium">Name:</span> {selectedLand.seller_name}</p>}
                    {selectedLand.phone && <p className="flex gap-2 items-center"><FaWhatsapp className="text-green-500" /> <span className="font-medium">Phone:</span> {selectedLand.phone}</p>}
                    {selectedLand.seller_type && <p><span className="font-medium">Type:</span> <span className="capitalize">{selectedLand.seller_type}</span></p>}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {(() => {
                  const images: string[] = Array.isArray(selectedLand.image_urls)
                    ? selectedLand.image_urls
                    : typeof selectedLand.image_urls === 'string'
                      ? selectedLand.image_urls.split('|').map(i => i.trim()).filter(Boolean)
                      : []
                  return images.map((img, i) => (
                    <img key={i} src={img} alt={`${selectedLand.village} ${i + 1}`} className="h-32 object-cover rounded-xl" />
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
