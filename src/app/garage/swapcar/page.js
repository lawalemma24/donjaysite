"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function SwapPage() {
  const [car, setCar] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const savedCar = sessionStorage.getItem("selectedCar");
    if (savedCar) setCar(JSON.parse(savedCar));
  }, []);

  const [formData, setFormData] = useState({
    make: "",
    year: "",
    condition: "Used",
    transmission: "Automatic",
    value: "",
    fuel: "Petrol",
    note: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls]);
  };

  const handleContinue = () => {
    const tradeCar = { ...formData, images };
    sessionStorage.setItem("tradeCar", JSON.stringify(tradeCar));
    window.location.href = "/garage/reviewswap";
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
            {car ? (
              <>
                {car.images?.length > 0 && (
                  <div className="relative w-40 h-28 mb-3">
                    <Image
                      src={car.images[0]}
                      alt={car.carName}
                      fill
                      className="object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}
                <h1 className="text-2xl font-semibold text-black mb-1">
                  Swap for {car.carName}
                </h1>
                <p className="text-sm text-gray-500">
                  Price: ₦{car.price?.toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-gray-500">No car selected</p>
            )}
          </div>

          <p className="text-black/80 text-center text-sm mb-8">
            Tell us about the car you want to trade in
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Make/Name of car
                </label>
                <input
                  id="make"
                  value={formData.make}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <select
                  id="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                >
                  {Array.from({ length: 10 }).map((_, i) => {
                    const year = 2025 - i;
                    return <option key={year}>{year}</option>;
                  })}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Condition
                </label>
                <select
                  id="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                >
                  <option>Used</option>
                  <option>New</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Transmission
                </label>
                <select
                  id="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                >
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Estimated Value
                </label>
                <input
                  id="value"
                  value={formData.value}
                  onChange={handleChange}
                  placeholder="Final decision after inspection"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fuel type
                </label>
                <select
                  id="fuel"
                  value={formData.fuel}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                >
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Note
              </label>
              <textarea
                id="note"
                rows="3"
                value={formData.note}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border resize-none"
              ></textarea>
            </div>

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
                  className="text-blue font-medium cursor-pointer"
                >
                  Upload Images
                </label>
              </div>

              <div className="flex flex-wrap mt-4 gap-4">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Preview ${i + 1}`}
                    className="rounded-lg border border-gray-300 w-24 h-16 object-cover"
                  />
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleContinue}
                className="w-full bg-blue text-white font-medium py-3 rounded-xl shadow-lg hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
