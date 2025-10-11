"use client";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";

export default function DealDetailsModal({ deal, onClose }) {
  const { user } = useAuth();

  if (!deal) return null;

  const statusColors = {
    completed: "text-green-600",
    pending: "text-yellow-500",
    cancelled: "text-red-600",
  };

  const car = deal.primaryCar || {};
  const contact = deal.customerContact || {};
  const statusKey = deal.status?.toLowerCase();

  const formatCurrency = (value) =>
    value ? `₦${Number(value).toLocaleString()}` : "—";

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h2 className="text-xl font-bold mb-3">{car.carName || "—"}</h2>

        {/* Image + Status */}
        <div className="flex justify-between mb-4">
          <Image
            src={car.images?.[0] || "/images/placeholder-car.jpg"}
            alt={car.carName || "Car image"}
            width={90}
            height={90}
            className="rounded-md mb-4"
          />
          <p className="text-black text-xs">
            Status:{" "}
            <span
              className={`mb-2 ${statusColors[statusKey] || "text-gray-500"}`}
            >
              {deal.status || "—"}
            </span>
          </p>
        </div>

        {/* Specifications */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Specifications</h3>
          <p className="flex justify-between">
            <span className="text-lightgrey">Condition:</span>
            <span className="text-black">{car.condition || "—"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Mileage:</span>
            <span className="text-black">{car.mileage || "—"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Year:</span>
            <span className="text-black">{car.year || "—"}</span>
          </p>
        </div>

        {/* Buyer Info (from AuthContext) */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Buyer Information</h3>
          <p className="flex justify-between">
            <span className="text-lightgrey">Name:</span>
            <span className="text-black">{user?.name || "—"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Email:</span>
            <span className="text-black">{user?.email || "—"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Phone:</span>
            <span className="text-black">
              {user?.phoneNumber || contact.phone || "—"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Address:</span>
            <span className="text-black">{user.address || "—"}</span>
          </p>
        </div>

        {/* Payment Info */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Payment Information</h3>
          <p className="flex justify-between">
            <span className="text-lightgrey">Order ID:</span>
            <span className="text-blue">#{deal.dealRef || "—"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Car Price:</span>
            <span className="text-black">{formatCurrency(car.price)}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Offer Price:</span>
            <span className="text-black">
              {formatCurrency(deal.offerPrice)}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Delivery Fee:</span>
            <span className="text-black">{formatCurrency(50000)}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Total Paid:</span>
            <span className="text-blue font-bold">
              {formatCurrency((deal.offerPrice || car.price || 0) + 50000)}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-blue text-blue rounded-lg"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue text-white rounded-lg">
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
