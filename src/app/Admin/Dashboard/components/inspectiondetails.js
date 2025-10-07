"use client";
import Image from "next/image";

export default function InspectionDetails({ deal, onClose }) {
  if (!deal) return null;

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
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
        <h2 className="text-xl font-bold mb-3">Buy Details</h2>
        <h2 className="text-md font-semibold mb-3">{deal.name}</h2>
        <div className="flex justify-between mb-4">
          <Image
            src={deal.avatar}
            alt={deal.name}
            width={90}
            height={90}
            className="rounded-md mb-4"
          />
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

        <div className="mb-4">
          <h3 className="font-semibold mb-1">Specifications</h3>
          <p className="flex justify-between">
            <span className="text-lightgrey">Condition:</span>
            <span className="text-black">{deal.condition}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Make:</span>
            <span className="text-black">{deal.name || "Motor"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Year:</span>
            <span className="text-black">{deal.year}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Transmission:</span>
            <span className="text-black">
              {deal.transmission || "Automatic"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Fuel type:</span>
            <span className="text-black">{deal.fuel || "petrol"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Mileage:</span>
            <span className="text-black">{deal.mileage || "2,433"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Engine:</span>
            <span className="text-black">{deal.engine || "V8"}</span>
          </p>
          {/* delivery info */}
          <h3 className="font-semibold mb-1">User Details</h3>
          <p className="flex justify-between">
            <span className="text-lightgrey">Name:</span>
            <span className="text-black">{deal.usersname || "Don Jay"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Email Address:</span>
            <span className="text-black">
              {deal.usersname || "donjay234@gmail.com"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Address:</span>
            <span className="text-black">
              {deal.address || "Akin adenola, street"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Phone:</span>
            <span className="text-black">{deal.phone || "0856765644"}</span>
          </p>
          {/* payment info */}
          <h3 className="font-semibold mb-1">Inspection Info</h3>

          <p className="flex justify-between">
            <span className="text-lightgrey">Preferred Date:</span>
            <span className="text-black">Sept. 10, 2025 2:00PM to 2:40PM</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Email Address:</span>
            <span className="text-black">{deal.usersname || "Don Jay"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Address:</span>
            <span className="text-black">
              {deal.address || "Akin adenola, street"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Phone:</span>
            <span className="text-black">{deal.phone || "0856765644"}</span>
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
            Mark as Completed
          </button>
        </div>
      </div>
    </div>
  );
}
