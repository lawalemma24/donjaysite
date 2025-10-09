"use client";

import { useState, useEffect } from "react";
import CarCard from "./carcard";
import Link from "next/link";
import api from "@/utils/api"; // your axios instance

const DISPLAY_COUNT = 8; // always show 8 cars

// Utility to shuffle an array
const shuffleArray = (arr) =>
  arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

export default function RelatedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await api.get("/approved", {
        params: { page: 1, limit: 100 }, // fetch enough cars to shuffle
      });
      const allCars = res.data.cars || [];
      const shuffled = shuffleArray(allCars).slice(0, DISPLAY_COUNT);
      setCars(shuffled);
    } catch (err) {
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-bold">Related Cars</h2>
        <Link href="/garage/buy-swap">
          <button className="text-blue-600 font-medium hover:underline">
            View More →
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading cars...</div>
      ) : cars.length === 0 ? (
        <div className="text-center text-gray-500">No cars found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </section>
  );
}
