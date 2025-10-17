"use client";

import ConfirmOverlay from "@/components/confirmswap";
import RelatedCars from "@/components/relatedcars";
import RequestSubmitted from "@/components/requestsubmitted";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineSwap } from "react-icons/ai";

export default function ReviewSwapPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);
  const [userCar, setUserCar] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const storedUserCar = sessionStorage.getItem("userCar");
    const storedSelectedCar = sessionStorage.getItem("selectedCar");

    if (storedUserCar) {
      try {
        setUserCar(JSON.parse(storedUserCar));
      } catch (err) {
        console.error("Invalid userCar JSON:", err);
      }
    }

    if (storedSelectedCar) {
      try {
        setSelectedCar(JSON.parse(storedSelectedCar));
      } catch (err) {
        console.error("Invalid selectedCar JSON:", err);
      }
    }
  }, []);

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home <span className="mx-1">/</span> Garage{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-500 font-medium">Buy or Swap</span>
          <span className="mx-1">/</span>
          <span className="text-gray-500 font-medium">Car Details</span>
          <span className="mx-1">/</span>
          <span className="text-gray-500 font-medium">Swap</span>
          <span className="mx-1">/</span>
          <span className="text-blue font-medium">Review Swap</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="min-h-screen bg-white p-4 flex justify-center items-center">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-center mb-8">
            Review Your Swap
          </h1>

          {/* Cars comparison */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mb-8">
            {/* Your car */}
            <div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">Your Car</h2>
              {userCar ? (
                <>
                  {userCar.images?.length > 0 && (
                    <img
                      src={userCar.images[0]}
                      alt={userCar.make || "Your car"}
                      className="w-full h-auto rounded-xl object-cover mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-2">
                    {userCar.year} {userCar.make}
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Condition:</span>{" "}
                      {userCar.condition}
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Transmission:</span>{" "}
                      {userCar.transmission}
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Fuel Type:</span>{" "}
                      {userCar.fuel}
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Estimated Value:</span>{" "}
                      {userCar.value || "Pending"}
                    </li>
                  </ul>
                </>
              ) : (
                <p className="text-gray-500 text-sm">
                  Your car details not found.
                </p>
              )}
              <div className="mt-6">
                <Link href="/garage/swapcar">
                  <button className="w-full text-blue font-semibold py-3 border border-blue rounded-xl hover:bg-blue-50 transition">
                    Edit Details
                  </button>
                </Link>
              </div>
            </div>

            <div className="my-4 md:my-0">
              <AiOutlineSwap className="w-7 h-7 text-blue-600" />
            </div>

            {/* Desired car */}
            <div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">Desired Car</h2>
              {selectedCar ? (
                <>
                  {selectedCar.images?.length > 0 && (
                    <img
                      src={selectedCar.images[0]}
                      alt={selectedCar.carName || "Desired car"}
                      className="w-full h-auto rounded-xl object-cover mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-2">
                    {selectedCar.year} {selectedCar.carName}
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Condition:</span>{" "}
                      {selectedCar.condition || "N/A"}
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Transmission:</span>{" "}
                      {selectedCar.transmission || "Automatic"}
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Fuel Type:</span>{" "}
                      {selectedCar.fuelType || "Petrol"}
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Price:</span> ₦
                      {selectedCar.price
                        ? selectedCar.price.toLocaleString()
                        : "Pending"}
                    </li>
                  </ul>
                </>
              ) : (
                <p className="text-gray-500 text-sm">
                  No desired car selected.
                </p>
              )}
              <div className="mt-6">
                <Link href="/garage">
                  <button className="w-full text-blue font-semibold py-3 border border-blue rounded-xl hover:bg-blue-50 transition">
                    Change Car
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Balance + note */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between flex-col md:flex-row font-semibold text-xl my-4">
              <span>Balance to Pay</span>
              <span className="text-green-700 text-sm">Pending review</span>
            </div>
            <p className="text-red-500 text-xs text-center font-medium">
              We'll review your order promptly. A final offer will be given
              after a physical inspection of your vehicle.
            </p>
          </div>

          {/* Confirm button */}
          <div className="mt-8">
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full bg-blue text-white font-medium py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
            >
              Confirm & Submit Swap Request
            </button>
          </div>

          {showConfirm && (
            <ConfirmOverlay
              onClose={() => setShowConfirm(false)}
              onSubmit={() => {
                setShowConfirm(false);
                setShowSubmitted(true);
              }}
            />
          )}

          {showSubmitted && (
            <RequestSubmitted onClose={() => setShowSubmitted(false)} />
          )}
        </div>
      </div>

      <RelatedCars />
    </div>
  );
}
