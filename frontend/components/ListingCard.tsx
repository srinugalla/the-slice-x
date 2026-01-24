import Image from "next/image"

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
  image_urls?: string[] | string
}

function formatPrice(price?: number): string {
  if (!price || price <= 0) return "N/A"
  if (price >= 100) return `${(price / 100).toFixed(2)} Cr`
  return `${price} Lakhs`
}

interface ListingCardProps {
  land: LandListing
  onClick?: () => void
}

export default function ListingCard({ land, onClick }: ListingCardProps) {
  const images: string[] = Array.isArray(land.image_urls)
    ? land.image_urls
    : typeof land.image_urls === "string"
    ? land.image_urls.split("|").map(i => i.trim()).filter(Boolean)
    : []

  return (
    <div
      onClick={onClick}
      className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100">
        {images.length > 0 ? (
          <Image
            src={images[0]}
            alt={`${land.village} land`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-1 text-black">
        <h2 className="text-lg font-semibold">
          {land.village}, {land.mandal}
        </h2>

        <p className="font-medium">
          ₹{formatPrice(land.total_price)}
        </p>

        {land.price_per_acre && (
          <p className="text-sm text-gray-600">
            Price per Acre: ₹{formatPrice(land.price_per_acre)}
          </p>
        )}

        <p className="text-sm text-gray-500">
          {land.area} {land.area_unit}
        </p>
      </div>
    </div>
  )
}
