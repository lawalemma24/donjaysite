"use client";

import Image from "next/image";
import { FaRegClock } from "react-icons/fa";
import { ArrowLeftRight } from "lucide-react";

export default function SwapDetailsModal({ deal, onClose }) {
  if (!deal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-[500px] p-6 shadow-lg overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Status */}
        <div className="flex justify-end mb-4">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
              ${
                deal.status === "Pending" ? "bg-yellow-100 text-yellow-600" : ""
              }
              ${
                deal.status === "Completed" ? "bg-green-100 text-green-600" : ""
              }
              ${deal.status === "Cancelled" ? "bg-red-100 text-red-600" : ""}`}
          >
            <FaRegClock />
            {deal.status}
          </div>
        </div>

        {/* Your Car */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Your Car</h3>
          <div className="flex gap-4 items-center border border-lightgrey rounded-xl p-3 shadow-sm">
            <Image
              src={deal.yourCar.image}
              alt={deal.yourCar.name}
              width={100}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="flex-1 text-xs text-black">
              <p className="flex justify-between">
                <span className="text-gray-400">Make:</span> {deal.yourCar.name}
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Year:</span> {deal.year}
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Condition:</span>{" "}
                {deal.condition}
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Transmission:</span>{" "}
                <span className="font-medium text-gray-800">
                  {deal.transmission}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Fuel type:</span> {deal.fuel}
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Estimated Value:</span>{" "}
                {deal.price}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center p-1">
          <ArrowLeftRight className="w-7 h-7 text-blue rotate-90" />
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Desired Car</h3>
          <div className="flex gap-4 items-center border border-lightgrey rounded-xl p-3 shadow-sm">
            <Image
              src={deal.desiredCar.image}
              alt={deal.desiredCar.name}
              width={100}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="flex-1 text-xs text-black">
              <p className="flex justify-between">
                <span className="text-gray-400">Make:</span> {deal.yourCar.name}
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Year:</span> {deal.year}
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Condition:</span>{" "}
                {deal.condition}
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Transmission:</span>{" "}
                <span className="font-medium text-gray-800">
                  {deal.transmission}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Fuel type:</span> {deal.fuel}
              </p>
              <p className="flex justify-between">
                <span className="text-gray-400">Estimated Value:</span>{" "}
                {deal.price}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-base mb-2">Delivery Information</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p className="flex justify-between">
              <span className="font-medium">Name:</span> Don Jay
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Address:</span> Akin Adesola Street,
              VI, Lagos
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Phone:</span> 08123456789
            </p>
          </div>
        </div>

        {/* Payment Info (dummy) */}
        <div className="mb-6">
          <h3 className="font-bold text-base mb-2">Payment Information</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p className="flex justify-between">
              <span className="font-medium">Order ID:</span>{" "}
              <a href="#" className="text-blue-600 font-medium hover:underline">
                #SWP{deal.id.toString().padStart(5, "0")}
              </a>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Balance to Pay:</span>{" "}
              <span className="text-gray-400">To be determined</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Delivery Fee:</span> ₦50,000
            </p>
            <p className="flex justify-between">
              <span className="font-medium">Total Paid:</span>{" "}
              <span className="text-gray-400">Pending final balance</span>
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-1/2 border border-blue/60 text-blue py-2 rounded-lg hover:bg-blue/60"
          >
            Close
          </button>
          <button
            disabled
            className="w-1/2 bg-blue/30 text-white py-2 rounded-lg cursor-not-allowed"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
