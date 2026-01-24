import Image from "next/image"
import ContactReveal from "./ContactReveal"
import { FaWhatsapp } from "react-icons/fa"

interface LandListing {
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

function formatPrice(price?: number): string {
  if (!price || price <= 0) return 'N/A'
  if (price >= 100) return `${(price / 100).toFixed(2)} Cr`
  return `${price} Lakhs`
}

interface ListingCardProps {
  land: LandListing
  onReveal?: (landId: number) => void
}

export default function ListingCard({ land, onReveal }: ListingCardProps) {
  const images: string[] = Array.isArray(land.image_urls)
    ? land.image_urls
    : typeof land.image_urls === "string"
    ? land.image_urls.split("|").map(i => i.trim()).filter(Boolean)
    : []

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
      {/* Image Section */}
      <div className="relative w-full h-48">
        {images.length > 0 ? (
          <Image
            src={images[0]}
            alt={`${land.village} land`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-100">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-800">{land.village}, {land.mandal}</h2>

        {/* Total Price */}
        <p className="text-gray-700 font-medium">Total Price: ₹{formatPrice(land.total_price)}</p>

        {/* Price Per Acre */}
        {land.price_per_acre && (
          <p className="text-sm text-gray-600">Price per Acre: ₹{formatPrice(land.price_per_acre)}</p>
        )}

        {/* Area */}
        <p className="text-sm text-gray-500">{land.area} {land.area_unit}</p>

        {/* Seller Info */}
        {(land.seller_name || land.phone || land.seller_type) && (
          <div className="mt-2 border-t pt-2">
            <h3 className="font-semibold mb-1">Seller Details</h3>
            {land.seller_name && <p><span className="font-medium">Name:</span> {land.seller_name}</p>}
            {land.phone && <p className="flex gap-2 items-center"><FaWhatsapp className="text-green-500" /> <span className="font-medium">Phone:</span> {land.phone}</p>}
            {land.seller_type && <p><span className="font-medium">Type:</span> <span className="capitalize">{land.seller_type}</span></p>}
          </div>
        )}

        {/* Contact Reveal */}
        {land.phone && <ContactReveal landId={land.land_id.toString()} ownerNumber={land.phone} />}
      </div>
    </div>
  )
}
