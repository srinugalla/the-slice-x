import Image from "next/image";

export default function ListingCard({ land, onReveal }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition">
      <div className="relative w-full h-48">
        {land.image_urls ? (
          <Image
            src={land.image_urls.split(",")[0]}
            alt="Land Image"
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h2 className="font-semibold text-lg text-gray-800">
          {land.village}, {land.mandal}
        </h2>
        <p className="text-sm text-gray-600">
          Area: {land.area} {land.area_unit}
        </p>
        <p className="text-sm text-gray-600">
          ₹ {land.total_price?.toLocaleString()} total • ₹ {land.price_per_acre?.toLocaleString()} / acre
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-medium text-indigo-700">
            {land.seller_type}
          </span>
          <button
            className="bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-700"
            onClick={() => onReveal(land.land_id)}
          >
            Reveal Contact
          </button>
        </div>
      </div>
    </div>
  );
}
