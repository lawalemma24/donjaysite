"use client";

import ConfirmSellOverlay from "@/components/confirmsell";
import SellSuccessModal from "@/components/sellconfirmed";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import api from "@/utils/api";

export default function SellOfferReview() {
  const [car, setCar] = useState(null);
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    const storedCar = sessionStorage.getItem("carToReview");
    if (storedCar) setCar(JSON.parse(storedCar));
  }, []);

  const images = car?.images || [];

  const prevImage = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handleSubmit = async () => {
    if (!car) return;
    try {
      await api.post("/", car);
      setSuccessOpen(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit sell offer");
    }
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home / Garage / Car Details / Sell / Review sell
        </nav>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
        <h2 className="text-center text-xl font-semibold mb-4">
          Review Your Selling Offer
        </h2>

        <div
          className="relative cursor-pointer"
          onClick={() => setLightbox(true)}
        >
          <img
            src={images[current]}
            alt="car"
            className="w-full h-64 object-cover rounded-lg"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="flex gap-2 mt-3 overflow-x-auto">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              className={`w-20 h-16 object-cover rounded cursor-pointer border ${
                index === current
                  ? "border-orange border-2"
                  : "border-text-muted"
              }`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>

        <div className="mt-4">
          <h3 className="font-bold text-lg">{car.carName}</h3>
          <hr className="my-2 border-lightgrey" />
          <div className="text-sm text-gray-700 mt-2 space-y-1">
            <p>
              Condition: <span className="float-right">{car.condition}</span>
            </p>
            <p>
              Transmission:{" "}
              <span className="float-right">{car.transmission}</span>
            </p>
            <p>
              Fuel Type: <span className="float-right">{car.fuelType}</span>
            </p>
            <p>
              Estimated Value: <span className="float-right">₦{car.price}</span>
            </p>
          </div>
        </div>

        <div className="mt-4 border border-lightgrey rounded-lg p-4 bg-gray-50 text-center">
          <h4 className="font-semibold mb-1">Offer Overview</h4>
          <p className="text-gray-600 text-sm">
            Our team will review your submission and contact you with a final
            offer after a physical inspection of your car.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link href="/garage/sell">
            <button className="flex-1 py-2 px-3 border border-blue rounded-lg text-blue">
              Edit Details
            </button>
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="flex-1 py-2 rounded-lg bg-blue px-2 text-white text-sm"
          >
            Confirm & Submit Sell Offer
          </button>
        </div>

        {open && (
          <ConfirmSellOverlay
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
          />
        )}
        <SellSuccessModal
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
