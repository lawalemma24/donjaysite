"use client";

import Link from "next/link";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";

function SwapPageContent() {
  const params = useSearchParams();
  const router = useRouter();
  const carId = params.get("carId");

  const [selectedCar, setSelectedCar] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState(null);

  // Load selected car
  useEffect(() => {
    const savedCar = sessionStorage.getItem("selectedCar");
    if (savedCar) setCar(JSON.parse(savedCar));
  }, []);

  // Listen for changes in selectedSwapCar
  useEffect(() => {
    const saved =
      sessionStorage.getItem("selectedCar") ||
      sessionStorage.getItem("selectedSwapCar");
    if (saved) {
      try {
        setSelectedCar(JSON.parse(saved));
      } catch {
        console.error("Invalid JSON in selectedCar");
      }
    }
  }, []);

  // Load saved images
  useEffect(() => {
    const savedImages = sessionStorage.getItem("swapImages");
    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch {
        console.error("Invalid JSON in swapImages");
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("swapImages", JSON.stringify(images));
  }, [images]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  // Submit handler with Cloudinary upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fileInputs = Array.from(document.getElementById("fileInput").files);

      // Upload all files to Cloudinary
      const uploadedUrls = await Promise.all(
        fileInputs.map((file) => uploadToCloudinary(file))
      );

      // Collect form data
      const userCar = {
        make: document.getElementById("make").value,
        year: document.getElementById("year").value,
        condition: document.getElementById("condition").value,
        transmission: document.getElementById("transmission").value,
        value: document.getElementById("value").value,
        fuel: document.getElementById("fuel").value,
        note: document.getElementById("note").value,
        images: uploadedUrls,
      };

      sessionStorage.setItem("userCar", JSON.stringify(userCar));

      router.push("/garage/reviewswap");
    } catch (err) {
      console.error("Swap submission failed:", err);
      alert("Image upload failed. Try again.");
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
          <span className="text-gray-500 font-medium">Buy or Swap</span>
          <span className="mx-1">/</span>
          <span className="text-gray-500 font-medium">Car Details</span>
          <span className="mx-1">/</span>
          <span className="text-blue font-medium">Swap</span>
        </nav>
      </div>

      <div className="flex justify-center mb-16">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center text-center mb-6">
            {selectedCar ? (
              <>
                {selectedCar.images?.length > 0 && (
                  <div className="relative w-40 h-28 mb-3">
                    <Image
                      src={selectedCar.images[0]}
                      alt={selectedCar?.carName || "Selected car"}
                      fill
                      className="object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}
                <h1 className="text-2xl font-semibold text-black mb-1">
                  Swap for {selectedCar?.carName}
                </h1>
                <p className="text-sm text-gray-500">
                  ₦{selectedCar?.price?.toLocaleString() || "N/A"}
                </p>
              </>
            ) : (
              <p className="text-gray-500">No car selected</p>
            )}
          </div>

          <p className="text-black/80 text-center text-sm mb-8">
            Tell us about the car you want to trade in
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Make & Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="make"
                  className="block text-sm font-medium text-gray-700"
                >
                  Make/Name of car
                </label>
                <select
                  id="make"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue sm:text-sm h-10 px-3 border"
                >
                  <option>Toyota Camry</option>
                  <option>Honda Accord</option>
                  <option>Nissan Altima</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year
                </label>
                <select
                  id="year"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue sm:text-sm h-10 px-3 border"
                >
                  {Array.from({ length: 10 }).map((_, i) => {
                    const year = 2025 - i;
                    return <option key={year}>{year}</option>;
                  })}
                </select>
              </div>
            </div>

            {/* Condition & Transmission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium text-gray-700"
                >
                  Condition
                </label>
                <select
                  id="condition"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue sm:text-sm h-10 px-3 border"
                >
                  <option>Used</option>
                  <option>New</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="transmission"
                  className="block text-sm font-medium text-gray-700"
                >
                  Transmission
                </label>
                <select
                  id="transmission"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue sm:text-sm h-10 px-3 border"
                >
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>

            {/* Value & Fuel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="value"
                  className="block text-sm font-medium text-gray-700"
                >
                  Estimated Value
                </label>
                <input
                  type="text"
                  id="value"
                  placeholder="Final decision after inspection"
                  className="mt-1 block w-full rounded-md border-text-muted shadow-sm focus:border-blue sm:text-sm h-10 px-3 border placeholder:text-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="fuel"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fuel type
                </label>
                <select
                  id="fuel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue sm:text-sm h-10 px-3 border"
                >
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>

            {/* Additional Note */}
            <div>
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-700"
              >
                Additional Note
              </label>
              <textarea
                id="note"
                rows="3"
                placeholder="Any specific note about damage, modifications, or service history?"
                className="mt-1 block w-full rounded-md border-text-muted shadow-sm focus:border-blue sm:text-sm p-3 border resize-none"
              ></textarea>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images
              </label>
              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="flex justify-center items-center cursor-pointer mb-2 text-blue font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                  </svg>
                  Upload Images
                </label>
                <p className="text-xs text-gray-500">
                  Choose images or drag and drop them here
                </p>
                <p className="text-xs text-gray-500">
                  JPG, JPEG, PNG, and HEIC files. Max size 10MB
                </p>
              </div>

              {/* Image previews */}
              <div className="flex flex-wrap mt-4 gap-4">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="rounded-lg border border-gray-300 w-24 h-16 object-cover"
                  />
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue text-white font-medium py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
              >
                {loading ? "Uploading..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SwapPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <SwapPageContent />
    </Suspense>
  );
}
