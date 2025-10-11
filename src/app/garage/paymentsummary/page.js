"use client";

import Link from "next/link";

export default function PaymentSummaryCard() {
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
          <span className="text-gray-500 font-medium">Summary</span>
          <span className="mx-1">/</span>
          <span className="text-gray-500 font-medium">Info</span>
          <span className="mx-1">/</span>
          <span className="text-blue font-medium">Buy</span>
        </nav>
      </div>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md border border-lightgrey p-6 mt-7">
        <h2 className="text-xl font-bold text-center mb-6">Payment Summary</h2>

        {/* Delivery Address */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Delivery Address</h3>
            <button className="text-blue-600 text-sm font-medium">
              Change ›
            </button>
          </div>
          <div className="text-sm">
            <p className="flex justify-between">
              <span className="text-gray-500">Name:</span> <span>Don Jay</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">Address:</span>{" "}
              <span>Akin Adesola Street</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">City:</span>{" "}
              <span>Victoria Island</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">State:</span>{" "}
              <span>Lagos State</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">Phone No:</span>{" "}
              <span>08123456789</span>
            </p>
          </div>
        </div>

        <hr className="my-3 border border-lightgrey" />

        {/* Payment Details */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Payment Details</h3>
          <p className="flex justify-between text-sm">
            <span className="text-gray-500">Car Name:</span>
            <span>2025 Mercedes Benz GLE</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="text-gray-500">Price:</span>
            <span className="font-semibold text-blue-600">N70,000,000</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery fee:</span>
            <span>N50,000</span>
          </p>
        </div>

        <hr className="my-3 border border-lightgrey" />

        {/* Total */}
        <div className="text-center font-semibold text-lg mb-4">
          Total Payable: <span className="text-blue-600">N70,050,000</span>
        </div>

        {/* Button */}

        <Link href="/garage/paymentdetails">
          <button
            type="button"
            className="w-full bg-blue text-white font-medium rounded-lg px-4 py-2 hover:bg-blue-700"
          >
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
}
