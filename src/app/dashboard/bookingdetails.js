"use client";
import Image from "next/image";

export default function BookingDetailsModal({ deal, onClose }) {
  if (!deal) return null;

  const statusColors = {
    confirmed: "text-green-600",
    pending: "text-yellow-500",
    cancelled: "text-red-600",
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-3">
          {deal.car?.carName || "Car Inspection"}
        </h2>

        <div className="flex justify-between mb-4">
          <Image
            src={deal.car?.images?.[0] || "/images/default-car.jpg"}
            alt={deal.car?.carName || "Car"}
            width={90}
            height={90}
            className="rounded-md mb-4"
          />
          <p className="text-black text-xs">
            Status:{" "}
            <span className={`${statusColors[deal.status]} font-semibold`}>
              {deal.status}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Specifications</h3>
          <p className="flex justify-between text-sm">
            <span className="text-lightgrey">Condition:</span>
            <span className="text-black">{deal.car?.condition || "—"}</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="text-lightgrey">Year:</span>
            <span className="text-black">{deal.car?.year || "—"}</span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="text-lightgrey">Price:</span>
            <span className="text-black">
              {deal.car?.price ? `₦${deal.car.price.toLocaleString()}` : "—"}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Inspection Details</h3>
          <p className="flex justify-between text-sm">
            <span className="text-lightgrey">Date:</span>
            <span className="text-black">
              {new Date(deal.inspectionDate).toLocaleDateString()}
            </span>
          </p>
          <p className="flex justify-between text-sm">
            <span className="text-lightgrey">Time Frame:</span>
            <span className="text-black">
              {deal.timeSlot?.startTime} - {deal.timeSlot?.endTime} (
              {deal.timeSlot?.period})
            </span>
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-blue text-blue rounded-lg"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue text-white rounded-lg">
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
}
