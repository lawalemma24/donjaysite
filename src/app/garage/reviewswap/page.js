"use client";

import ConfirmOverlay from "@/components/confirmswap";
import RelatedCars from "@/components/relatedcars";
import RequestSubmitted from "@/components/requestsubmitted";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";

const ReviewSwapPage = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSubmitted, setShowSubmitted] = useState(false);

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

      {/* Main Content */}
      <div className="min-h-screen bg-white p-4 flex justify-center items-center">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-center mb-8">
            Review Your Swap
          </h1>

          {/* Cars comparison */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">Your Car</h2>
              <div className="relative mb-4">
                <img
                  src="/images/toyota-camry.png"
                  alt="2023 Toyota Camry"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">2023 Toyota Camry</h3>
              <ul className="text-sm space-y-1">
                <li className="flex justify-between">
                  <span className="text-text-muted">Condition:</span> Used
                </li>
                <li className="flex justify-between">
                  <span className="text-text-muted">Transmission:</span>{" "}
                  Automatic
                </li>
                <li className="flex justify-between">
                  <span className="text-text-muted">Fuel Type:</span> Petrol
                </li>
                <li className="flex justify-between">
                  <span className="text-text-muted">Estimated Value:</span>{" "}
                  N20,000,000
                </li>
              </ul>
              <div className="mt-6 text-center">
                <Link href="/garage/swapcar">
                  <button className="w-full text-blue font-semibold py-3 border border-blue rounded-xl hover:bg-blue-50 transition-colors">
                    Edit Details
                  </button>
                </Link>
              </div>
            </div>

            <div className="my-4 md:my-0">
              <AiOutlineSwap className="w-7 h-7 text-blue-600" />
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 w-full md:w-1/2">
              <h2 className="text-xl font-semibold mb-4">Desired Car</h2>
              <div className="relative mb-4">
                <img
                  src="/images/gle.png"
                  alt="2025 Mercedes Benz GLE"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                2025 Mercedes Benz GLE
              </h3>
              <ul className="text-sm space-y-1">
                <li className="flex justify-between">
                  <span className="text-text-muted">Condition:</span> Brand New
                </li>
                <li className="flex justify-between">
                  <span className="text-text-muted">Transmission:</span>{" "}
                  Automatic
                </li>
                <li className="flex justify-between">
                  <span className="text-text-muted">Fuel Type:</span> Petrol
                </li>
                <li className="flex justify-between">
                  <span className="text-text-muted">Estimated Value:</span>{" "}
                  N20,000,000
                </li>
              </ul>
              <div className="mt-6 text-center">
                <button className="w-full text-blue font-semibold py-3 border border-blue rounded-xl hover:bg-blue-50 transition-colors">
                  Change Car
                </button>
              </div>
            </div>
          </div>

          {/* Balance + note */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between flex-col md:flex-row font-semibold text-xl my-4">
              <span>Balance to Pay</span>
              <span className="text-green-700 text-sm">pending review</span>
            </div>
            <p className="text-red-500 text-xs text-center font-medium">
              We'll review your order promptly. A final offer will be provided
              after a physical inspection of your vehicle.
            </p>
          </div>

          {/* Confirm button */}
          <div className="mt-8">
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full bg-blue text-white font-medium py-1 px-2 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Confirm & Submit Swap Request
            </button>
          </div>

          {showConfirm && (
            <ConfirmOverlay
              onClose={() => setShowConfirm(false)}
              onSubmit={() => setShowSubmitted(true)}
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
};

export default ReviewSwapPage;
