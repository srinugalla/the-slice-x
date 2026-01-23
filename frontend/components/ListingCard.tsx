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
  area: number
  area_unit: string
  owner_name?: string
  owner_number?: string
  image_urls?: string[] | string
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
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-800">{land.village}, {land.mandal}</h2>
        <p className="text-gray-700 font-medium">₹{land.total_price?.toLocaleString()}</p>
        <p className="text-sm text-gray-500">{land.area} {land.area_unit}</p>
        <p className="text-xs text-gray-400">{land.state} / {land.district} / {land.mandal}</p>

        {land.owner_number && (
          <div className="mt-2">
            <ContactReveal
              landId={land.land_id.toString()}
              ownerNumber={land.owner_number}
            />
          </div>
        )}
      </div>
    </div>
  )
}
