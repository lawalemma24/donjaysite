"use client";
import { useState } from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import Image from "next/image";
import PaymentSuccessModal from "@/components/confirmpayment";

const PaymentCard = () => {
  const [tab, setTab] = useState("card");
  const [open, setOpen] = useState(false);

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
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold text-center mb-6">Payment Details</h2>

        {/* Tabs */}
        <div className="flex justify-between gap-3 mb-6">
          <button
            onClick={() => setTab("card")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium ${
              tab === "card"
                ? "border-blue text-blue-600"
                : "border-gray-300 text-gray-500"
            }`}
          >
            <FaRegCreditCard /> Card
          </button>
          <button
            onClick={() => setTab("bank")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium ${
              tab === "bank"
                ? "border-blue text-blue-600"
                : "border-gray-300 text-gray-500"
            }`}
          >
            <FaUniversity /> Bank Transfer
          </button>
          <button
            onClick={() => setTab("delivery")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium ${
              tab === "delivery"
                ? "border-blue text-blue-600"
                : "border-gray-300 text-gray-500"
            }`}
          >
            <FaTruck /> Pay on Delivery
          </button>
        </div>

        {/* Tab Content */}
        {tab === "card" && (
          <div className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Card Number
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="1234 5678 9101 1213"
                  className="w-full border border-lightgrey rounded-md px-3 py-2 focus:outline-none focus:ring-none focus:border-blue"
                />
                <Image
                  src="/images/mastercard.png"
                  alt="card"
                  width={32}
                  height={20}
                  className="absolute right-3"
                />
              </div>
            </div>

            {/* Expiry + CVV */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="07/11"
                  className="w-full border border-lightgrey rounded-md px-3 py-2 focus:outline-none focus:ring-none focus:border-blue"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full border border-lightgrey rounded-md px-3 py-2 focus:outline-none focus:ring-none focus:border-blue"
                />
              </div>
            </div>

            {/* Name on Card */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Name on Card
              </label>
              <input
                type="text"
                placeholder="Don Jay"
                className="w-full border border-lightgrey rounded-md px-3 py-2 focus:outline-none focus:ring-none focus:border-blue"
              />
            </div>

            {/* Save checkbox */}
            <div className="flex items-center gap-2">
              <input type="checkbox" className="text-blue-600" defaultChecked />
              <span className="text-sm text-gray-600">
                Save card details for future
              </span>
            </div>

            {/* Pay button */}

            <button
              onClick={() => setOpen(true)}
              className="w-full bg-blue hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
            >
              Pay ₦70,050,000
            </button>

            <PaymentSuccessModal isOpen={open} onClose={() => setOpen(false)} />
          </div>
        )}

        {tab === "bank" && (
          <div className="text-gray-500 text-center py-6">
            <p>Bank Transfer option will appear here.</p>
          </div>
        )}

        {tab === "delivery" && (
          <div className="text-gray-500 text-center py-6">
            <p>Pay on Delivery option will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;
