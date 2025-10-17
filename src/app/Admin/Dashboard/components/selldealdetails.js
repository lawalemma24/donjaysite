"use client";
import Image from "next/image";

export default function SellDealDetails({ deal, onClose }) {
  if (!deal) return null;

  // Add all relevant statuses
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
    Approved: "bg-blue-100 text-blue-700", // Added Approved
    Reject: "bg-red-100 text-red-700", // Optional, if you use "reject"
  };

  // Normalize status string
  const status = deal.status
    ? deal.status.charAt(0).toUpperCase() + deal.status.slice(1).toLowerCase()
    : "Pending";

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-3">Buy Deal Details</h2>

        <div className="flex justify-between mb-4">
          <Image
            src={deal.customer?.profilePic || "/images/default-car.png"}
            alt={deal.customer?.name || "-"}
            width={90}
            height={90}
            className="rounded-md mb-4"
          />
          <p className="text-xs font-medium">
            Status:
            <span
              className={`ml-2 px-2 py-1 rounded-full text-[11px] font-semibold ${
                statusColors[status] || "bg-gray-100 text-gray-600"
              }`}
            >
              {status}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Customer Information</h3>
          <p className="flex justify-between">
            <span className="text-lightgrey">Name:</span>
            <span className="text-black">{deal.customer?.name || "-"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Phone:</span>
            <span className="text-black">
              {deal.customer?.phoneNumber || "-"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Email:</span>
            <span className="text-black text-xs">
              {deal.customer?.email || "-"}
            </span>
          </p>

          <h3 className="font-semibold mb-1 mt-4">Car Information</h3>
          <p className="flex justify-between">
            <span className="text-lightgrey">Make:</span>
            <span className="text-black">{deal.primaryCar?.name || "-"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Year:</span>
            <span className="text-black">{deal.primaryCar?.year || "-"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Condition:</span>
            <span className="text-black">
              {deal.primaryCar?.condition || "-"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Transmission:</span>
            <span className="text-black">
              {deal.primaryCar?.transmission || "Automatic"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Fuel Type:</span>
            <span className="text-black">
              {deal.primaryCar?.fuel || "Petrol"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Mileage:</span>
            <span className="text-black">
              {deal.primaryCar?.mileage || "-"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Engine:</span>
            <span className="text-black">{deal.primaryCar?.engine || "-"}</span>
          </p>

          <h3 className="font-semibold mb-1 mt-4">Payment Information</h3>
          <p className="flex justify-between">
            <span className="text-lightgrey">Offer Price:</span>
            <span className="text-black">
              {deal.formattedOfferPrice || "-"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Total Paid:</span>
            <span className="text-blue">{deal.totalPaid || "-"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Order ID:</span>
            <span className="text-blue">{deal.orderId || "-"}</span>
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
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
