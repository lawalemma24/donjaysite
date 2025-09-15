"use client";
import BookSuccessModal from "@/components/bookconfirmed";
import ConfirmBookOverlay from "@/components/confirmbooking";
import Link from "next/link";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  "/images/lexus-rx.png",
  "/images/gle.png",
  "/images/nissan-maxima.png",
  "/images/toyota-camry.png",
  "/images/vw-golf.png",
];

export default function SellOfferReview() {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = () => {
    setSuccessOpen(true);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home <span className="mx-1">/</span> Garage{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-500 font-medium">Car Details</span>
          <span className="mx-1">/</span>
          <span className="text-gray-500 font-medium">Sell</span>
          <span className="mx-1">/</span>
          <span className="text-blue font-medium">Review sell</span>
        </nav>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
        {/* Car Info */}
        <div className="mt-4">
          <h3 className="font-bold text-xl md:text-2xl text-center mb-6">
            Booking Summary
          </h3>

          <div className="text-sm text-lightgrey mt-2 space-y-1">
            <p>
              Car Name:{" "}
              <span className="float-right text-black">Honda Accord</span>
            </p>
            <p>
              Condition: <span className="float-right  text-black">Used</span>
            </p>
            <p>
              Transmission:{" "}
              <span className="float-right  text-black">Automatic</span>
            </p>
            <p>
              Preffered Date:{" "}
              <span className="float-right  text-black">Thu, sep 2026</span>
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link href="/inspection">
            <button className="flex-1 py-2 px-3 border border-blue rounded-lg text-blue">
              Edit Details
            </button>
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="flex-1 py-2 rounded-lg bg-blue px-2 text-white text-sm"
          >
            Confirm Booking
          </button>
        </div>

        {/* Modals */}
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

        {lightbox && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setLightbox(false)}
          >
            <img
              src={images[current]}
              alt="large"
              className="max-w-full max-h-[90vh] rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
