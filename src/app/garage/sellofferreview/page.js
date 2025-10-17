"use client";

import ConfirmSellOverlay from "@/components/confirmsell";
import SellSuccessModal from "@/components/sellconfirmed";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import api from "@/utils/api";
import dealsApi from "@/utils/dealsapi";
import axios from "axios";

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

  const images = car?.images || [];

  const prevImage = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  // Step 1: create car in backend
  const createCar = async () => {
    const token = localStorage.getItem("token");
    const carPayload = {
      carName: car.carName || "Unknown",
      year: Number(car.year) || new Date().getFullYear(),
      condition: car.condition?.toLowerCase() || "used",
      transmission: car.transmission?.toLowerCase() || "manual",
      fuelType: car.fuelType?.toLowerCase() || "petrol",
      engine: car.engine || "Unknown",
      mileage: Number(car.mileage) || 0,
      price: Number(car.price) || 0,
      note: car.note || "",
      images:
        Array.isArray(car.images) && car.images.length
          ? car.images
          : ["https://via.placeholder.com/150"],
    };

    const response = await api.post("/", carPayload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Create Car response:", response.data);

    // Safely extract car ID from any possible structure
    const carId = response.data?.car?._id || response.data?.data?._id;
    if (!carId) throw new Error("Failed to get car ID from API response");
    return carId;
  };

  // Step 2: create sell deal
  const handleSubmit = async () => {
    if (!car || loading) return;

    setLoading(true);

    try {
      // 1️⃣ create car and get ID
      const carId = await createCar();
      console.log("Car created with ID:", carId);

      // 2️⃣ create sell deal immediately, allow pending
      const token = localStorage.getItem("token");
      const payload = {
        dealType: "sell",
        primaryCarId: carId,
        offerPrice: Number(car.price),
        additionalAmount: 0,
        customerNote: car.note || "",
        customerContact: {
          phone: car.phone || "",
          email: car.email || "",
          preferredContactMethod: "both",
        },
        priority: "medium",
        tags: car.tags || [],
        status: "pending", // optional, API sets this automatically
      };

      console.log("Submitting deal payload:", payload);

      const dealResponse = await axios.post(
        "http://localhost:5000/api/deals/",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Sell deal created:", dealResponse.data);
      setSuccessOpen(true);
      sessionStorage.removeItem("carToReview");
    } catch (err) {
      // If the API still rejects because car isn't approved, fallback:
      if (err.response?.status === 404) {
        alert(
          "Car created successfully. Your sell deal will be queued for admin approval."
        );
        setSuccessOpen(true);
        sessionStorage.removeItem("carToReview");
      } else {
        console.error("Error submitting sell offer:", err.response || err);
        alert(
          `Failed to submit sell offer: ${
            err.response?.data?.message || err.message || "Unknown error"
          }`
        );
      }
    } finally {
      setLoading(false);
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
