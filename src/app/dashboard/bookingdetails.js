"use client";
import Image from "next/image";

export default function BookingDetailsModal({ deal, onClose }) {
  if (!deal) return null;

  const statusColors = {
    Completed: "text-green-600",
    Pending: "text-yellow-500",
    Cancelled: "text-red-600",
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
        <h2 className="text-xl font-bold mb-3">{deal.car}</h2>
        <div className="flex justify-between mb-4">
          <Image
            src={deal.image}
            alt={deal.car}
            width={90}
            height={90}
            className="rounded-md mb-4"
          />
          <p className="text-black text-xs">
            Status:{" "}
            <span className={` mb-2 ${statusColors[deal.status]}`}>
              {deal.status}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Specifications</h3>
          <p className="flex justify-between">
            <span className="text-lightgrey">Condition:</span>
            <span className="text-black"> {deal.condition}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Make:</span>
            <span className="text-black"> Mercedes Benz</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Year: </span>
            <span className="text-black"> 2025</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Transmission:</span>
            <span className="text-black"> Automatic</span>
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Inspection Details</h3>
          <p className="flex justify-between">
            <span className="text-lightgrey">Date:</span>
            <span className="text-black">Sept 10,2025</span>
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
            Rescedule
          </button>
        </div>
      </div>
    </div>
  );
}
