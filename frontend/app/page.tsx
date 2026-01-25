'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { FiPhone, FiSearch } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import ContactReveal from '@/components/ContactReveal'


function formatPrice(priceInLakhs?: number): string {
  if (!priceInLakhs || priceInLakhs <= 0) return 'N/A'
  if (priceInLakhs >= 100) return `${(priceInLakhs / 100).toFixed(2)} Cr`
  return `${priceInLakhs} Lakhs`
}

export interface LandListing {
  land_id: number
  state: string
  district: string
  mandal: string
  village: string
  total_price: number
  price_per_acre?: number
  area: number
  area_unit: string
  seller_name?: string
  phone?: string
  seller_type?: string
  image_urls?: string[] | string
}

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
        // Ensure price_per_acre is selected
        const { data, error } = await supabase
          .from('land_listings')
          .select(`
            land_id,
            state,
            district,
            mandal,
            village,
            total_price,
            price_per_acre,
            area,
            area_unit,
            seller_name,
            phone,
            seller_type,
            image_urls
          `)
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

  const handleSearch = () => {
    let filtered = listings
    if (selectedState) filtered = filtered.filter(l => l.state === selectedState)
    if (selectedDistrict) filtered = filtered.filter(l => l.district === selectedDistrict)
    if (selectedMandal) filtered = filtered.filter(l => l.mandal === selectedMandal)
    if (searchTerm) {
      const term = searchTerm.trim().toLowerCase()
      filtered = filtered.filter(l =>
      l.village?.toLowerCase().includes(term) ||
      l.mandal?.toLowerCase().includes(term) ||
      l.district?.toLowerCase().includes(term)
    

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
      {/* ---------------- Hero + Search Section ---------------- */}
      <div className="mb-10 text-center px-4 sm:px-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug text-gray-900 dark:text-white">
          Buy, Sell, and Discover Land throughout India
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          From verified plots to trusted properties, find the best deals across the country.
        </p>

        {/* Premium Search */}
        <div className="mt-10 flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-5xl p-6 bg-white rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl">
            <div className="relative flex-1">
              <FiSearch className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by village"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-5 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition transform hover:scale-[1.01] text-black placeholder-black"
              />
            </div>
            <select
              value={selectedState}
              onChange={e => { setSelectedState(e.target.value); setSelectedDistrict(''); setSelectedMandal('') }}
              className="flex-1 px-5 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition transform hover:scale-[1.01] text-black"
            >
              <option value="">All States</option>
              {states.map(s => <option key={s}>{s}</option>)}
            </select>
            <select
              value={selectedDistrict}
              onChange={e => { setSelectedDistrict(e.target.value); setSelectedMandal('') }}
              disabled={!selectedState}
              className="flex-1 px-5 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition transform hover:scale-[1.01] text-black disabled:bg-gray-100"
            >
              <option value="">All Districts</option>
              {districts.map(d => <option key={d}>{d}</option>)}
            </select>
            <select
              value={selectedMandal}
              onChange={e => setSelectedMandal(e.target.value)}
              disabled={!selectedDistrict}
              className="flex-1 px-5 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md transition transform hover:scale-[1.01] text-black disabled:bg-gray-100"
            >
              <option value="">All Mandals</option>
              {mandals.map(m => <option key={m}>{m}</option>)}
            </select>
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 hover:scale-105 transition transform shadow-lg flex items-center justify-center gap-2"
            >
              <FiPhone /> Search
            </button>
          </div>
        </div>
      </div>


      {/* ---------------- Latest Listings Header ---------------- */}
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 px-4 sm:px-0 
                    text-gray-900 dark:text-gray-100 
                    tracking-tight">
        Latest Listings
      </h2>

      {/* ---------------- Listings Grid ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentListings.map(land => {
          const images: string[] = Array.isArray(land.image_urls)
            ? land.image_urls
            : typeof land.image_urls === 'string'
              ? land.image_urls.split('|').map(i => i.trim()).filter(Boolean)
              : []

          return (
            <div
              key={land.land_id}
              onClick={() => setSelectedLand(land)}
              className="rounded-xl border bg-white shadow hover:scale-105 transition cursor-pointer text-black"
            >
              <div className="h-48 bg-gray-100">
                {images[0] ? <img src={images[0]} className="w-full h-full object-cover rounded-t-xl" /> : <div className="flex h-full items-center justify-center text-gray-400">No image</div>}
              </div>
              <div className="p-4 space-y-1 text-black">
                <h2 className="font-semibold">{land.village}, {land.mandal}</h2>
                <p className="font-medium">₹{formatPrice(land.total_price)}</p>
                {land.price_per_acre && <p className="text-sm text-gray-600">Price per Acre: ₹{formatPrice(land.price_per_acre)}</p>}
                <p className="text-sm">{land.area} {land.area_unit}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ---------------- Pagination ---------------- */}
      {totalPages > 1 && (
        <div className="w-full flex justify-center py-6">
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
                        ? 'bg-blue-600 text-white scale-125 font-bold shadow-lg'
                        : 'bg-white text-black border border-gray-300'}
                    `}
                  >
                    {page}
                  </div>
                )
              })}
            </div>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-0.5 bg-blue-400 pointer-events-none"></div>
          </div>
        </div>
      )}

      {/* ---------------- Modal ---------------- */}
      {selectedLand && (
        <div onClick={() => setSelectedLand(null)} className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div onClick={e => e.stopPropagation()} className="bg-white text-black rounded-2xl max-w-4xl w-[95%] max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">{selectedLand.village}, {selectedLand.mandal}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p><span className="font-semibold">Price:</span> ₹{formatPrice(selectedLand.total_price)}</p>
                {selectedLand.price_per_acre && <p><span className="font-semibold">Price per Acre:</span> ₹{formatPrice(selectedLand.price_per_acre)}</p>}
                <p><span className="font-semibold">Area:</span> {selectedLand.area} {selectedLand.area_unit}</p>
                <p><span className="font-semibold">State:</span> {selectedLand.state}</p>
                <p><span className="font-semibold">District:</span> {selectedLand.district}</p>
                <p><span className="font-semibold">Mandal:</span> {selectedLand.mandal}</p>
                <p><span className="font-semibold">Village:</span> {selectedLand.village}</p>

                {(selectedLand.seller_name || selectedLand.phone || selectedLand.seller_type) && (
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-1">Seller Details</h3>
                    {selectedLand.seller_name && <p><span className="font-medium">Name:</span> {selectedLand.seller_name}</p>}
                    {selectedLand.seller_type && <p><span className="font-medium">Type:</span> <span className="capitalize">{selectedLand.seller_type}</span></p>}
                    {selectedLand.phone && (
                      <div className="mt-2">
                        <ContactReveal landId={selectedLand.land_id.toString()} ownerNumber={selectedLand.phone} />
                      </div>
                    )}
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
