"use client";

import ConfirmSellOverlay from "@/components/confirmsell";
import SellSuccessModal from "@/components/sellconfirmed";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import api from "@/utils/api";
import dealsApi from "@/utils/dealsapi";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "@/components/preloader";

export default function SellOfferReview() {
  const [car, setCar] = useState(null);
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedCar = sessionStorage.getItem("carToReview");
    if (storedCar) setCar(JSON.parse(storedCar));
  }, []);

  const images = Array.isArray(car?.images) ? car.images.flat() : [];

  const prevImage = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // Step 1: create car in backend
  const createCar = async () => {
    const token = localStorage.getItem("token");

    const missing = [];

    const cleaned = {
      carName: car.carName?.trim(),
      year: Number(car.year),
      condition: car.condition?.trim(),
      transmission: car.transmission?.trim(),
      fuelType: car.fuelType?.trim(),
      engine: car.engine?.trim(),
      mileage: Number(car.mileage),
      price: Number(String(car.price).replace(/,/g, "")),
      note: car.note || "",
      images: car.images?.filter((img) => img && img !== "") || [],
    };

    Object.entries(cleaned).forEach(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        missing.push(key);
      }
    });

    if (missing.length) {
      toast.error("Missing required fields: " + missing.join(", "));
      throw new Error("Missing fields");
    }

    const response = await api.post("/", cleaned, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data?.car?._id || response.data?.data?._id;
  };

  const handleSubmit = async () => {
    if (!car || loading) return;

    setLoading(true);

    try {
      // 1️ create car and get ID
      const carId = await createCar();

      // show success modal immediately
      setSuccessOpen(true);
      sessionStorage.removeItem("carToReview");
    } catch (err) {
      console.error("Error creating car:", err.response || err);
      toast.error("Failed to submit car");
    } finally {
      setLoading(false);
    }
  };

  if (!car) return <Loader write="Loading Sell Info.." />;

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
            disabled={loading}
            className="flex-1 py-2 rounded-lg bg-blue px-2 text-white text-sm"
          >
            {loading ? "Submitting..." : "Confirm & Submit Sell Offer"}
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
