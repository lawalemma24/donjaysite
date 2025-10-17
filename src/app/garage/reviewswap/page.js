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
  const [car, setCar] = useState(null);
  const [tradeCar, setTradeCar] = useState(null);

  useEffect(() => {
    const savedCar = sessionStorage.getItem("selectedCar");
    const savedTrade = sessionStorage.getItem("tradeCar");
    if (savedCar) setCar(JSON.parse(savedCar));
    if (savedTrade) setTradeCar(JSON.parse(savedTrade));
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home <span className="mx-1">/</span> Garage{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-500 font-medium">Buy or Swap</span>
          <span className="mx-1">/</span>
          <span className="text-gray-500 font-medium">Car Details</span>
          <span className="mx-1">/</span>
          <span className="text-blue font-medium">Review Swap</span>
        </nav>
      </div>

      <div className="min-h-screen bg-white p-4 flex justify-center items-center">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-center mb-8">
            Review Your Swap
          </h1>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mb-8">
            {/* Trade-in car */}
            <div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">Your Car</h2>
              {tradeCar ? (
                <>
                  {tradeCar.images?.length > 0 && (
                    <img
                      src={tradeCar.images[0]}
                      alt="Trade Car"
                      className="w-full h-auto rounded-xl mb-4 object-cover"
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-2">
                    {tradeCar.year} {tradeCar.make}
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Condition:</span>{" "}
                      {tradeCar.condition}
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Transmission:</span>{" "}
                      {tradeCar.transmission}
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Fuel:</span>{" "}
                      {tradeCar.fuel}
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Value:</span> ₦
                      {tradeCar.value || "Pending"}
                    </li>
                  </ul>
                </>
              ) : (
                <p className="text-gray-500 text-sm">No trade-in car details</p>
              )}
            </div>

            <div className="my-4 md:my-0">
              <AiOutlineSwap className="w-7 h-7 text-blue-600" />
            </div>

            {/* Desired car */}
            <div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">Desired Car</h2>
              {car ? (
                <>
                  {car.images?.length > 0 && (
                    <img
                      src={car.images[0]}
                      alt="Desired Car"
                      className="w-full h-auto rounded-xl mb-4 object-cover"
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-2">
                    {car.year} {car.carName}
                  </h3>
                  <ul className="text-sm space-y-1">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Condition:</span>{" "}
                      {car.condition || "—"}
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Transmission:</span>{" "}
                      {car.transmission || "—"}
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Fuel:</span>{" "}
                      {car.fuelType || "—"}
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Price:</span> ₦
                      {car.price?.toLocaleString() || "—"}
                    </li>
                  </ul>
                </>
              ) : (
                <p className="text-gray-500 text-sm">No desired car selected</p>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between flex-col md:flex-row font-semibold text-xl my-4">
              <span>Balance to Pay</span>
              <span className="text-green-700 text-sm">Pending review</span>
            </div>
            <p className="text-red-500 text-xs text-center font-medium">
              We'll review your order promptly. Final offer comes after
              inspection.
            </p>
          </div>

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
