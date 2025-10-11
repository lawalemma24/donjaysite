"use client";

import { useState, useEffect } from "react";
import CarCard from "./carcard";
import api from "@/utils/api";

const FEATURED_COUNT = 6;

export default function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Utility to shuffle an array
  const shuffleArray = (arr) => {
    return arr
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await api.get("/approved", {
        params: { page: 1, limit: 100 }, // fetch more so we can shuffle
      });
      const allCars = res.data.cars || [];
      const shuffledCars = shuffleArray(allCars).slice(0, FEATURED_COUNT);
      setCars(shuffledCars);
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
    <section className="py-12 bg-accent">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl text-black font-bold text-center">
          Featured Cars
        </h2>
        <div className="flex justify-center">
          <div className="w-25 h-1 bg-orange mt-2 mb-6 rounded"></div>
        </div>
        <p className="text-center text-black max-w-2xl mx-auto mb-10">
          Take a closer look at some of the standout vehicles in our collection.
          From luxury SUVs to everyday favorites, these featured cars are ready
          to deliver performance, comfort, and reliability you can trust.
        </p>

        {loading ? (
          <div className="text-center text-gray-500">Loading cars...</div>
        ) : cars.length === 0 ? (
          <div className="text-center text-gray-500">No cars found.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
