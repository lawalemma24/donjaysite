"use client";
import { useState } from "react";
import Image from "next/image";
import { AiOutlineSwap } from "react-icons/ai";

export default function SwapDealDetails({ deal, onClose }) {
  const [finalPrice, setFinalPrice] = useState(deal.finalPrice || "");
  const [editingFinalPrice, setEditingFinalPrice] = useState(false);

  if (!deal) return null;

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
      className="fixed inset-0 bg-black/60 z-50 flex justify-center p-3 items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-lg relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-bold">Swap Deal Details</h2>
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

        {/* Car Comparison */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
          {/* Offered Car */}
          <div className="bg-white rounded-2xl shadow-md p-4 w-full md:w-1/2">
            <h2 className="text-sm font-semibold mb-2 text-center">
              Offered Car
            </h2>
            <div className="mb-3">
              <Image
                src={deal.offeredCar?.avatar || "/images/toyota-camry.png"}
                alt={deal.offeredCar?.name || "Car"}
                width={300}
                height={200}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <h3 className="text-base font-semibold mb-1 text-center">
              {deal.offeredCar?.name || "2023 Toyota Camry"}
            </h3>
            <ul className="text-sm space-y-1">
              <li className="flex justify-between">
                <span className="text-gray-500">Condition:</span>
                <span>{deal.offeredCar?.condition || "Used"}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Fuel:</span>
                <span>{deal.offeredCar?.fuel || "Petrol"}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Value:</span>
                <span>{deal.offeredCar?.value || "N20,000,000"}</span>
              </li>
            </ul>
          </div>

          <AiOutlineSwap className="text-blue-600 w-7 h-7" />

          {/* Desired Car */}
          <div className="bg-white rounded-2xl shadow-md p-4 w-full md:w-1/2">
            <h2 className="text-sm font-semibold mb-2 text-center">
              Desired Car
            </h2>
            <div className="mb-3">
              <Image
                src={deal.desiredCar?.avatar || "/images/gle.png"}
                alt={deal.desiredCar?.name || "Car"}
                width={300}
                height={200}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
            <h3 className="text-base font-semibold mb-1 text-center">
              {deal.desiredCar?.name || "2025 Mercedes Benz GLE"}
            </h3>
            <ul className="text-sm space-y-1">
              <li className="flex justify-between">
                <span className="text-gray-500">Condition:</span>
                <span>{deal.desiredCar?.condition || "Brand New"}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Fuel:</span>
                <span>{deal.desiredCar?.fuel || "Petrol"}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Value:</span>
                <span>{deal.desiredCar?.value || "N25,000,000"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Offer Summary */}
        <div className="border-t border-gray-200 pt-4 mb-4">
          <h3 className="font-semibold mb-2 text-sm">Offer Summary</h3>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-500">Balance to Pay:</span>
              <span className="font-medium text-blue-600">
                {deal.balance || "Pending Review"}
              </span>
            </p>
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
        </div>

        {/* Payment Info */}
        <h3 className="font-semibold mb-2 text-sm">Payment Information</h3>
        <div className="space-y-1 mb-3 text-sm">
          <p className="flex justify-between">
            <span className="text-gray-500">Order ID:</span>
            <span>
              {deal.status === "Completed"
                ? deal.orderId || "-------"
                : "-------"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Amount Paid:</span>
            <span>
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
