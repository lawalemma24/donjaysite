import Image from "next/image";
import Link from "next/link";

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-2xl p-2 hover:shadow transition">
      <div className="relative w-full h-45 rounded-xl overflow-hidden">
        <Image src={car.image} alt={car.name} fill className="object-cover" />

        <div className="absolute bottom-2 left-1 bg-white text-black text-xs font-semibold px-3 py-1 rounded-lg shadow">
          ₦ {car.price.toLocaleString()}
        </div>

        <div className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
          <Image src={car.logo} alt="logo" width={25} height={25} />
        </div>
      </div>

      <div className="mt-2">
        <h3 className="text-lg font-bold text-black">{car.name}</h3>
      </div>
      <div className="mt-1 flex items-center gap-4 text-sm text-text-muted">
        <p className="text-text-muted text-sm">
          Experience elegance on wheels with advanced features and bold design
        </p>

        <div className="flex justify-end mt-2">
          <Link href="/garage/details">
            <button className="bg-blue hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
