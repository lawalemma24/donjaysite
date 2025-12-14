"use client";

import BookSuccessModal from "@/components/bookconfirmed";
import ConfirmBookOverlay from "@/components/confirmbooking";
import Loader from "@/components/preloader";
import { apiUrl } from "@/utils/apihelper";
import React, { useState } from "react";
import toast from "react-hot-toast";

// Make this route dynamic to prevent prerendering
export const dynamic = "force-dynamic";

export default function InspectionOfferReview({
  car,
  date,
  time, // this now contains the full slot object { period, startTime, endTime }
  note,
  onBack,
}) {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Handle build-time rendering when props are undefined
  if (!car) {
    return <Loader write="Loading cars" />;
  }

  const handleSubmit = async () => {
    if (!time || !time.startTime) {
      toast.error("Missing time slot. Please select again.");
      return;
    }

    if (!car || (!car._id && !car.id)) {
      toast.error("Missing car information. Please go back and select a car.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        carId: car?._id || car?.id,
        inspectionDate: date,
        timeSlot: {
          period: time.period || "custom",
          startTime: time.startTime,
          endTime: time.endTime,
        },
        customerNotes: note || "",
      };

      const res = await fetch(apiUrl("/inspections/book"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data.error || `Failed: ${res.statusText}`);

      setSuccessOpen(true);
    } catch (err) {
      toast.error("Booking error");
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
              {car?.carName || "N/A"} ({car?.year || "N/A"})
            </span>
          </p>
          <p>
            Condition:{" "}
            <span className="float-right text-black">
              {car?.condition || "N/A"}
            </span>
          </p>
          <p>
            Transmission:{" "}
            <span className="float-right text-black">
              {car?.transmission || "N/A"}
            </span>
          </p>
          <p>
            Preferred Date:{" "}
            <span className="float-right text-black">
              {date} • {time?.startTime} - {time?.endTime}
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

          {loading && <Loader write="booking inspection" />}

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
