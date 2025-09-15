"use client";

import Link from "next/link";
import React, { useState } from "react";

const SellPage = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home <span className="mx-1">/</span>
          <span className="text-blue font-medium">Book Inspection</span>
        </nav>
      </div>

      <div className="flex justify-center mb-16">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-center text-black mb-2">
            Book an Inspection
          </h1>
          <p className="text-black/80 text-center text-sm mb-8">
            Book a professional inspection with our team to get an accurate
            valuation of your car.
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
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:outline-none focus:ring-none sm:text-sm h-10 px-3 border"
                />
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Time
                </label>
                <input
                  type="time"
                  id="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:outline-none focus:ring-none sm:text-sm h-10 px-3 border"
                />
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
                className="mt-1 block w-full rounded-md border-text-muted shadow-sm focus:border-blue focus:outline-none focus:ring-none focus:outline-none sm:text-sm p-3 border resize-none"
              ></textarea>
            </div>

            <div className="pt-4">
              <Link href="/inspection/summary">
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
