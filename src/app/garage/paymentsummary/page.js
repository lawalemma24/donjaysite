"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PaymentSummaryCard() {
  const [orderInfo, setOrderInfo] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const storedOrder = sessionStorage.getItem("orderInfo");
    const storedCar = sessionStorage.getItem("selectedCar");

    if (storedOrder) setOrderInfo(JSON.parse(storedOrder));
    if (storedCar) setSelectedCar(JSON.parse(storedCar));
  }, []);

  if (!orderInfo || !selectedCar)
    return <div className="text-center mt-20">Loading...</div>;

  const deliveryFee = 50000;
  const total = (selectedCar.price || 0) + deliveryFee;

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home / Garage / Buy or Swap / Car Details / Summary / Info /
          <span className="text-blue font-medium"> Buy</span>
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
            <p className="flex justify-between">
              <span className="text-gray-400">Name:</span>
              <span>{orderInfo.name}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">Address:</span>
              <span className="text-black">{orderInfo.address}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">City:</span>
              <span className="text-black">{orderInfo.city}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">State:</span>
              <span className="text-black">{orderInfo.state}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-500">Phone:</span>
              <span className="text-black">{orderInfo.phone}</span>
            </p>
          </div>
        </div>

        <hr className="my-3 border border-lightgrey" />

        {/* Car & Payment Details */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Car Details</h3>
          <div className="flex items-center  gap-4 mb-3 ">
            <img
              src={selectedCar.images?.[0] || "/images/placeholder.png"}
              alt={selectedCar.carName}
              className="w-20 h-16 rounded-md border border-lightgrey object-cover"
            />
            <div>
              <p className="font-semibold">{selectedCar.carName}</p>
              <p className="text-sm text-gray-500">
                {selectedCar.transmission} • {selectedCar.fuelType}
              </p>
            </div>
          </div>

          <p className="flex justify-between text-sm">
            <span className="text-gray-500">Car Price:</span>
            <span className="font-semibold text-blue-600">
              ₦{selectedCar.price?.toLocaleString()}
            </span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="text-gray-500">Delivery Fee:</span>
            <span>₦{deliveryFee.toLocaleString()}</span>
          </p>
        </div>

        <hr className="my-3 border border-lightgrey" />

        {/* Total */}
        <div className="text-center font-semibold text-lg mb-4">
          Total Payable:{" "}
          <span className="text-blue-600">₦{total.toLocaleString()}</span>
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
