import Image from "next/image"
import ContactReveal from "./ContactReveal"

interface LandListing {
  land_id: number
  state: string
  district: string
  mandal: string
  village: string
  total_price: number
  price_per_acer?: number
  area: number
  area_unit: string
  owner_name?: string
  owner_number?: string
  image_urls?: string[] | string
}

/* ---------------- Price Formatter ---------------- */
function formatPrice(price?: number): string {
  if (!price || price <= 0) return "N/A"
  if (price >= 100) return `${(price / 100).toFixed(2)} Cr`
  return `${price} Lakhs`
}

interface ListingCardProps {
  land: LandListing
  onReveal?: (landId: number) => void
}

export default function ListingCard({ land }: ListingCardProps) {
  const images: string[] = Array.isArray(land.image_urls)
    ? land.image_urls
    : typeof land.image_urls === "string"
    ? land.image_urls.split("|").map(i => i.trim()).filter(Boolean)
    : []

  return (
    <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition cursor-pointer border border-gray-100 dark:border-neutral-800">
      
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100 dark:bg-neutral-800">
        {images.length > 0 ? (
          <Image
            src={images[0]}
            alt={`${land.village} land`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-gray-400 text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        
        {/* Title */}
        <h2 className="text-lg font-semibold text-black dark:text-white">
          {land.village}, {land.mandal}
        </h2>

        {/* Prices */}
        <div className="space-y-0.5">
          <p className="text-gray-900 dark:text-gray-100 font-medium">
            Total Price: ₹{formatPrice(land.total_price)}
          </p>

          {land.price_per_acer && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Price per Acre: ₹{formatPrice(land.price_per_acer)}
            </p>
          )}
        </div>

        {/* Area */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {land.area} {land.area_unit}
        </p>

        {/* Location */}
        <p className="text-xs text-gray-500 dark:text-gray-500">
          {land.state} / {land.district} / {land.mandal}
        </p>

        {/* Contact */}
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
