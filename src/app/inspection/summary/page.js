"use client";

import BookSuccessModal from "@/components/bookconfirmed";
import ConfirmBookOverlay from "@/components/confirmbooking";
import React, { useState } from "react";

export default function InspectionOfferReview({
  car,
  date,
  time,
  note,
  onBack,
}) {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // helper: convert to expected time slot label
  const getTimeSlot = (time) => {
    const hour = parseInt(time.split(":")[0]);
    if (hour >= 9 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 20) return "evening";
    return "morning";
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Map your time input to backend slot periods
      const getTimeSlot = (time) => {
        const hour = parseInt(time.split(":")[0]);
        if (hour >= 9 && hour < 12)
          return { period: "morning", startTime: "09:00", endTime: "09:30" };
        if (hour >= 12 && hour < 17)
          return { period: "afternoon", startTime: "13:00", endTime: "13:30" };
        return { period: "night", startTime: "18:00", endTime: "18:30" };
      };

      const timeSlot = getTimeSlot(time);

      const payload = {
        carId: car.id,
        inspectionDate: date,
        timeSlot,
        customerNotes: note || "",
      };

      console.log("📦 Payload being sent:", payload);

      const res = await fetch("http://localhost:5000/api/inspections/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      console.log("🔁 Response status:", res.status);
      console.log("🧾 Response body:", data);

      if (!res.ok) {
        throw new Error(data.error || `Failed: ${res.statusText}`);
      }

      setSuccessOpen(true);
    } catch (err) {
      console.error("Booking error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home <span className="mx-1">/</span> Garage{" "}
          <span className="mx-1">/</span>
          <span className="text-blue font-medium">Review Booking</span>
        </nav>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
        <h3 className="font-bold text-xl md:text-2xl text-center mb-6">
          Booking Summary
        </h3>

        <div className="text-sm text-lightgrey mt-2 space-y-1">
          <p>
            Car Name:{" "}
            <span className="float-right text-black">
              {car.carName} ({car.year})
            </span>
          </p>
          <p>
            Condition:{" "}
            <span className="float-right text-black">{car.condition}</span>
          </p>
          <p>
            Transmission:{" "}
            <span className="float-right text-black">{car.transmission}</span>
          </p>
          <p>
            Preferred Date:{" "}
            <span className="float-right text-black">
              {date} at {time}
            </span>
          </p>
          <p>
            Note: <span className="float-right text-black">{note || "-"}</span>
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-2 px-3 border border-blue rounded-lg text-blue"
          >
            Edit Details
          </button>

          <button
            onClick={() => setOpen(true)}
            disabled={loading}
            className={`flex-1 py-2 rounded-lg px-2 text-white text-sm ${
              loading ? "bg-blue/70" : "bg-blue hover:bg-blue-700"
            }`}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>

        {open && (
          <ConfirmBookOverlay
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
          />
        )}

        <BookSuccessModal
          isOpen={successOpen}
          onClose={() => setSuccessOpen(false)}
        />
      </div>
    </div>
  );
}
