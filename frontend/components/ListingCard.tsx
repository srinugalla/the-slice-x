import Image from "next/image"
import ContactReveal from "./ContactReveal"

export interface Land {
  land_id: number
  village: string
  mandal: string
  district: string
  state: string
  area: number
  area_unit: string
  total_price: number
  price_per_acre?: number
  image_urls?: string | string[]
  seller_type?: string
  phone?: string | null
}

interface ListingCardProps {
  land: Land
  onReveal?: (landId: number) => void
}

export default function ListingCard({ land, onReveal }: ListingCardProps) {
  const images: string[] = Array.isArray(land.image_urls)
    ? land.image_urls
    : typeof land.image_urls === "string"
    ? land.image_urls.split(",").map((i) => i.trim()).filter(Boolean)
    : []

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer">
      <div className="relative w-full h-48">
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={`${land.village} Land`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h2 className="text-lg font-semibold">
          {land.village}, {land.mandal}
        </h2>
        <p className="text-sm text-gray-600">
          Area: {land.area} {land.area_unit}
        </p>
        <p className="text-sm text-gray-600">
          ₹ {land.total_price?.toLocaleString()}
        </p>
        {land.phone && (
          <div className="mt-2">
            <ContactReveal landId={land.land_id.toString()} ownerNumber={land.phone} />
          </div>
        )}
      </div>
    </div>
  )
}
