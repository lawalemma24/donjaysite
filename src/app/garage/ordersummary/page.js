"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function OrderSummary() {
  const [car, setCar] = useState(null);

  useEffect(() => {
    const savedCar = sessionStorage.getItem("selectedCar");
    if (savedCar) {
      setCar(JSON.parse(savedCar));
    }
  }, []);

  if (!car) {
    return (
      <p className="text-center py-12 text-gray-500">
        No car selected. Please go back and choose a car.
      </p>
    );
  }

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
              src={car.images?.[0] || "/images/placeholder.png"}
              alt={car.carName || "Car"}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{car.carName}</h3>
            <p className="text-blue-600 font-bold">
              ₦{car.price?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>

        <hr className="my-4 border-lightgrey" />

        {/* Specifications */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Specifications</h3>
          <div className="grid grid-cols-2 text-sm gap-y-2">
            <span className="text-gray-500">Condition:</span>
            <span className="text-gray-800">{car.condition || "N/A"}</span>

            <span className="text-gray-500">Transmission:</span>
            <span className="text-gray-800">{car.transmission || "N/A"}</span>

            <span className="text-gray-500">Fuel Type:</span>
            <span className="text-gray-800">{car.fuelType || "N/A"}</span>

            <span className="text-gray-500">Engine:</span>
            <span className="text-gray-800">{car.engine || "N/A"}</span>

            <span className="text-gray-500">Mileage:</span>
            <span className="text-gray-800">{car.mileage || "N/A"}</span>
          </div>
        </div>

        <hr className="my-4 border-lightgrey" />

        {/* Continue Button */}
        <Link href="/garage/orderinfo">
          <button className="w-full bg-blue text-white font-medium rounded-lg px-4 py-2 hover:bg-blue-700">
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}
