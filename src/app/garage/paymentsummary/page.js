"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaymentSummaryCard() {
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("orderInfo");
    if (stored) setOrderInfo(JSON.parse(stored));
  }, []);

  if (!orderInfo) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home / Garage / Buy or Swap / Car Details / Summary / Info /{" "}
          <span className="text-blue font-medium">Buy</span>
        </nav>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md border border-lightgrey p-6 mt-7">
        <h2 className="text-xl font-bold text-center mb-6">Payment Summary</h2>

        {/* Delivery Address */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Delivery Address</h3>
            <Link
              href="/garage/orderinfo"
              className="text-blue-600 text-sm font-medium"
            >
              Change ›
            </Link>
          </div>
          <div className="text-sm space-y-1">
            <p>
              <span className="text-gray-500">Name:</span> {orderInfo.name}
            </p>
            <p>
              <span className="text-gray-500">Address:</span>{" "}
              {orderInfo.address}
            </p>
            <p>
              <span className="text-gray-500">City:</span> {orderInfo.city}
            </p>
            <p>
              <span className="text-gray-500">State:</span> {orderInfo.state}
            </p>
            <p>
              <span className="text-gray-500">Phone:</span> {orderInfo.phone}
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
            <span className="font-semibold text-blue-600">₦70,000,000</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery Fee:</span>
            <span>₦50,000</span>
          </p>
        </div>

        <hr className="my-3 border border-lightgrey" />

        {/* Total */}
        <div className="text-center font-semibold text-lg mb-4">
          Total Payable: <span className="text-blue-600">₦70,050,000</span>
        </div>

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
