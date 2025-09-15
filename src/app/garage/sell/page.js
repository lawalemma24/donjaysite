"use client";

import Link from "next/link";
import React, { useState } from "react";

const SellPage = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home <span className="mx-1">/</span> Garage{" "}
          <span className="mx-1">/</span>
          <span className="text-gray-500 font-medium">Car Details</span>
          <span className="mx-1">/</span>
          <span className="text-blue font-medium">Sell</span>
        </nav>
      </div>

      <div className="flex justify-center mb-16">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-center text-black mb-2">
            Sell Your Car
          </h1>
          <p className="text-black/80 text-center text-sm mb-8">
            Tell us about the car you want to sell
          </p>

          <form className="space-y-6">
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue  focus:outline-none focus:ring-none sm:text-sm h-10 px-3 border"
                >
                  <option>Toyota Camry</option>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:outline-none focus:ring-none sm:text-sm h-10 px-3 border"
                >
                  <option>2023</option>
                </select>
              </div>
            </div>

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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:outline-none focus:ring-none sm:text-sm h-10 px-3 border"
                >
                  <option>Used</option>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:outline-none focus:ring-none sm:text-sm h-10 px-3 border"
                >
                  <option>Automatic</option>
                </select>
              </div>
            </div>

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
                  className="mt-1 block w-full rounded-md border-text-muted shadow-sm focus:border-blue focus:outline-none focus:outline-none focus:ring-none sm:text-sm h-10 px-3 border placeholder:text-gray-400"
                />
                <p className="text-red-400 text-xs">
                  This is not a final offer.A final offer will be made after
                  final inspection
                </p>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:outline-none focus:ring-none sm:text-sm h-10 px-3 border"
                >
                  <option>Petrol</option>
                </select>
              </div>
            </div>

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
                className="mt-1 block w-full rounded-md border-text-muted shadow-sm focus:border-blue focus:outline-none focus:ring-none focus:outline-none sm:text-sm p-3 border resize-none"
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
                  Choose images or drag and drop it here
                </p>
                <p className="text-xs text-gray-500">
                  JPG, JPEG, PNG, and HEIC files. Max size 10MB
                </p>
              </div>
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
              <Link href="/garage/sellofferreview">
                <button
                  type="submit"
                  className="w-full bg-blue text-white font-medium py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
                >
                  Continue
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
