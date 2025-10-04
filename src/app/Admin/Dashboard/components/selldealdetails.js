"use client";
import { useState } from "react";
import Image from "next/image";

export default function SellDealDetails({ deal, onClose }) {
  if (!deal) return null;

  const [finalPrice, setFinalPrice] = useState(deal.finalPrice || "");
  const [editingFinalPrice, setEditingFinalPrice] = useState(false);

  const handleSavePrice = () => {
    setEditingFinalPrice(false);
    if (finalPrice.trim() === "") {
      setFinalPrice("");
    }
  };

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold">Sell Details</h2>
          <p className="text-xs font-medium">
            Status:
            <span
              className={`ml-2 px-2 py-1 rounded-full text-[11px] font-semibold ${
                statusColors[deal.status] || "bg-gray-100 text-gray-600"
              }`}
            >
              {deal.status || "Pending"}
            </span>
          </p>
        </div>

        {/* Images */}
        <div className="flex gap-2 mb-4">
          <Image
            src={deal.avatar}
            alt={deal.name}
            width={100}
            height={100}
            className="rounded-md border"
          />
          <Image
            src={deal.avatar}
            alt={deal.name}
            width={70}
            height={70}
            className="rounded-md border"
          />
          <div className="w-16 h-16 flex items-center justify-center rounded-md border text-xs text-gray-600">
            +10
          </div>
        </div>

        {/* Specifications */}
        <h3 className="font-semibold mb-2">Specifications</h3>
        <div className="space-y-1 mb-3 text-sm">
          <p className="flex justify-between">
            <span className="text-gray-500">Condition:</span>
            <span className="text-black">{deal.condition || "Used"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Make:</span>
            <span className="text-black">{deal.make || "Hyundai Tucson"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Year:</span>
            <span className="text-black">{deal.year || "2024"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Transmission:</span>
            <span className="text-black">
              {deal.transmission || "Automatic"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Fuel Type:</span>
            <span className="text-black">{deal.fuel || "Hybrid"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Mileage:</span>
            <span className="text-black">{deal.mileage || "163KM"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Engine:</span>
            <span className="text-black">
              {deal.engine || "3.0 L inline-6 turbo + hybrid"}
            </span>
          </p>
        </div>

        {/* Customer Info */}
        <h3 className="font-semibold mb-2">Customer Information</h3>
        <div className="space-y-1 mb-3 text-sm">
          <p className="flex justify-between">
            <span className="text-gray-500">Name:</span>
            <span className="text-black">{deal.customerName || "Don Jay"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Address:</span>
            <span className="text-black">
              {deal.address || "Akin Adesola Street, VI, Lagos"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Phone:</span>
            <span className="text-black">{deal.phone || "08123456789"}</span>
          </p>
        </div>

        {/* Offer Info */}
        <h3 className="font-semibold mb-2">Offer Information</h3>
        <div className="space-y-1 mb-3 text-sm">
          <p className="flex justify-between">
            <span className="text-gray-500">Asking Price:</span>
            <span className="text-black">
              {deal.askingPrice || "N20,000,000"}
            </span>
          </p>

          {/* Final Price Editable Always */}
          <p className="flex justify-between">
            <span className="text-gray-500">Final Price:</span>
            <span className="text-blue-600 cursor-pointer">
              {editingFinalPrice ? (
                <input
                  type="text"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(e.target.value)}
                  onBlur={handleSavePrice}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSavePrice();
                  }}
                  autoFocus
                  className="border border-gray-300 rounded px-2 py-1 text-sm w-32"
                  placeholder="Edit Price"
                />
              ) : (
                <span onClick={() => setEditingFinalPrice(true)}>
                  {finalPrice || "Edit Price"}
                </span>
              )}
            </span>
          </p>
        </div>

        {/* Payment Info */}
        <h3 className="font-semibold mb-2">Payment Information</h3>
        <div className="space-y-1 mb-3 text-sm">
          <p className="flex justify-between">
            <span className="text-gray-500">Order ID:</span>
            <span className="text-black">
              {deal.status === "Completed"
                ? deal.orderId || "-------"
                : "-------"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Amount Paid:</span>
            <span className="text-black">
              {deal.status === "Completed"
                ? deal.amountPaid || finalPrice || "-------"
                : "-------"}
            </span>
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg"
          >
            Close
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              deal.status === "Completed"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
