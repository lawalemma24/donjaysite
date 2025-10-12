"use client";
import Image from "next/image";

export default function InspectionDetails({ deal, onClose, onMarkCompleted }) {
  if (!deal) return null;

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
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
        <h2 className="text-xl font-bold mb-3">Inspection Details</h2>

        <div className="flex justify-between mb-4">
          <Image
            src={deal.car?.images?.[0] || "/images/default-car.jpg"}
            alt={deal.car?.carName || "Car"}
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

        <div className="space-y-2 text-sm">
          <h3 className="font-semibold mb-1">Car Info</h3>
          <p>
            <strong>Name:</strong> {deal.car?.carName || "—"}
          </p>
          <p>
            <strong>Condition:</strong> {deal.car?.condition || "—"}
          </p>
          <p>
            <strong>Year:</strong> {deal.car?.year || "—"}
          </p>
          <p>
            <strong>Fuel:</strong> {deal.car?.fuelType || "—"}
          </p>

          <h3 className="font-semibold mt-4">User Info</h3>
          <p>
            <strong>Name:</strong> {deal.customer?.name || "—"}
          </p>
          <p>
            <strong>Email:</strong> {deal.customer?.email || "—"}
          </p>
          <p>
            <strong>Phone:</strong> {deal.customer?.phone || "—"}
          </p>

          <h3 className="font-semibold mt-4">Inspection Info</h3>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(deal.inspectionDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong>{" "}
            {deal.timeSlot?.startTime
              ? `${deal.timeSlot.startTime} - ${deal.timeSlot.endTime}`
              : "—"}
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-blue text-blue rounded-lg"
          >
            Close
          </button>

          {deal.status !== "completed" && (
            <button
              onClick={() =>
                onMarkCompleted(deal._id, {
                  inspectionReport: {
                    overallCondition: "good",
                    exteriorCondition: "good",
                    interiorCondition: "excellent",
                    engineCondition: "good",
                    issues: [],
                    recommendations: [],
                    estimatedValue: 25000,
                  },
                  inspectorNotes: "Inspection completed successfully.",
                })
              }
              className="px-4 py-2 bg-blue text-white rounded-lg"
            >
              Mark as Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
