"use client";
import Image from "next/image";
import Link from "next/link";

export default function OrderSummary() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home <span className="mx-1">/</span> Garage{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-500 font-medium">Buy or Swap</span>
          <span className="mx-1">/</span>
          <span className="text-gray-500 font-medium">Car Details</span>
          <span className="mx-1">/</span>
          <span className="text-blue font-medium">Summary</span>
        </nav>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-center mb-4">Order Summary</h2>

        {/* Car Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-30 h-16 rounded overflow-hidden">
            <Image
              src="/images/viewcar.png"
              alt="Mercedes Benz GLE"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">2025 Mercedes Benz GLE</h3>
            <p className="text-blue-600 font-bold">₦70,000,000</p>
          </div>
        </div>

        <hr className="my-4 border-lightgrey" />

        {/* Specifications */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Specifications</h3>
          <div className="grid grid-cols-2 text-sm gap-y-2">
            <span className="text-gray-500">Condition:</span>
            <span className="text-gray-800">Brand New</span>

            <span className="text-gray-500">Make:</span>
            <span className="text-gray-800">Mercedes Benz</span>

            <span className="text-gray-500">Year:</span>
            <span className="text-gray-800">2025</span>

            <span className="text-gray-500">Transmission:</span>
            <span className="text-gray-800">Automatic</span>

            <span className="text-gray-500">Fuel Type:</span>
            <span className="text-gray-800">Hybrid</span>

            <span className="text-gray-500">Engine Size:</span>
            <span className="text-gray-800">3.0L V6</span>

            <span className="text-gray-500">Body Type:</span>
            <span className="text-gray-800">SUV</span>

            <span className="text-gray-500">Color:</span>
            <span className="text-gray-800">Black</span>

            <span className="text-gray-500">GVM:</span>
            <span className="text-gray-800">3200 kg</span>

            <span className="text-gray-500">Status:</span>
            <span className="text-gray-800">Available</span>

            <span className="text-gray-500">Seating Capacity:</span>
            <span className="text-gray-800">7</span>
          </div>
        </div>

        <hr className="my-4 border-lightgrey" />

        {/* Button */}
        <Link href="/garage/orderinfo">
          <button className="w-full bg-blue text-white font-medium rounded-lg px-4 py-2 hover:bg-blue-700">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}
