"use client";

import Link from "next/link";

export default function OrderInfo() {
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
          <span className="text-blue font-medium">Info</span>
        </nav>
      </div>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg mt-10 p-6">
        <h2 className="text-xl font-bold text-center mb-6">
          Order Information
        </h2>

        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your full name..."
              className="w-full border border-lightgrey rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-none focus:border-blue"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email address..."
              className="w-full border border-lightgrey rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-none focus:border-blue"
            />
          </div>

          {/* Phone No */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone No</label>
            <input
              type="tel"
              placeholder="Enter your phone number..."
              className="w-full border border-lightgrey rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-none focus:border-blue"
            />
          </div>

          {/* State and City */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select className="w-full border border-lightgrey rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-none focus:border-blue">
                <option>Select State</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Kano</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <select className="w-full border border-lightgrey rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-none focus:border-blue">
                <option>Select City</option>
                <option>Ikeja</option>
                <option>Victoria Island</option>
                <option>Maitama</option>
              </select>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Address
            </label>
            <input
              type="text"
              placeholder="Enter your delivery address..."
              className="w-full border border-lightgrey rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-none focus:border-blue"
            />
          </div>

          {/* Button */}
          <Link href="/garage/paymentsummary">
            <button
              type="submit"
              className="w-full bg-blue text-white font-medium rounded-lg px-4 py-2 hover:bg-blue-700"
            >
              Continue
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
