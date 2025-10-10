import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CarCard({ car }) {
  const [imgSrc, setImgSrc] = useState(
    car.images?.[0] || "/images/placeholder.png"
  );

  return (
    <div className="bg-white rounded-2xl p-2 shadow transition">
      <div className="relative w-full h-45 rounded-xl overflow-hidden">
        <Image
          src={imgSrc}
          alt={car.carName || "Car image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          onError={() => setImgSrc("/images/gle.png")}
        />

        <div className="absolute bottom-2 left-1 bg-white text-black text-xs font-semibold px-3 py-1 rounded-lg shadow">
          ₦ {car.price?.toLocaleString() || "N/A"}
        </div>
      </div>

      <div className="mt-2">
        <h3 className="text-lg font-bold text-black">{car.carName}</h3>
      </div>

      <div className="mt-1 flex items-center gap-4 text-sm text-text-muted">
        <p className="text-text-muted text-sm">{car.note || ""}</p>

        <div className="flex justify-end mt-2">
          <Link href={`/garage/details/${car.id || car._id}`}>
            <button className="bg-blue hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
