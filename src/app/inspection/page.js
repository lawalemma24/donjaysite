"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import InspectionOfferReview from "./summary/page";
import api from "@/utils/api";

const InspectionPage = () => {
  const params = useSearchParams();
  const carId = params.get("carId");

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [showReview, setShowReview] = useState(false);

  // 🔹 Fetch approved cars (for dropdown)
  const fetchCars = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await api.get("/approved", {
        params: { page: pageNumber, limit: 50 },
      });
      console.log("Fetched cars:", res.data.cars);
      setCars(res.data.cars || []);
    } catch (err) {
      console.error("Error fetching cars:", err);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Load selected car from session or carId
  useEffect(() => {
    const savedCar = sessionStorage.getItem("selectedCar");
    if (savedCar) {
      setCar(JSON.parse(savedCar));
    } else if (carId) {
      (async () => {
        try {
          const res = await api.get(`/${carId}`);
          setCar(res.data?.car);
        } catch (err) {
          console.error("Failed to load car:", err);
        }
      })();
    }

    fetchCars(); // ✅ Load dropdown cars
  }, [carId]);

  // 🔹 Handle dropdown car change
  const handleCarSelect = (id) => {
    const selected = cars.find((c) => c._id === id);
    if (selected) setCar(selected);
  };

  if (!car && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading car info...</p>
      </div>
    );
  }

  if (showReview) {
    return (
      <InspectionOfferReview
        car={car}
        date={date}
        time={time}
        note={note}
        onBack={() => setShowReview(false)}
      />
    );
  }

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

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setShowReview(true);
            }}
          >
            {/* Car dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Car
              </label>
              <select
                value={car?._id || ""}
                onChange={(e) => handleCarSelect(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:outline-none sm:text-sm h-10 px-3 border"
              >
                <option value="">-- Select a car --</option>
                {cars.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.carName} ({c.year})
                  </option>
                ))}
              </select>
            </div>

            {/* Autofilled car details */}
            {car && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Condition
                    </label>
                    <input
                      type="text"
                      value={car.condition || ""}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm h-10 px-3 border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Transmission
                    </label>
                    <input
                      type="text"
                      value={car.transmission || ""}
                      readOnly
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm h-10 px-3 border"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Date and time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue sm:text-sm h-10 px-3 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue sm:text-sm h-10 px-3 border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Note
              </label>
              <textarea
                rows="3"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue sm:text-sm p-3 border resize-none"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!car}
                className="w-full bg-blue text-white font-medium py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 disabled:opacity-60"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InspectionPage;
