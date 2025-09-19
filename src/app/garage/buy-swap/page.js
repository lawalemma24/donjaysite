"use client";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import CarCard from "@/components/carcard";

const cars = [
  {
    id: 1,
    name: "2025 Mercedes Benz GLE",
    price: 70000000,
    image: "/images/gle.png",
    logo: "/images/mercedeslogo.jpg",
  },
  {
    id: 2,
    name: "2025 Honda Accord",
    price: 30000000,
    image: "/images/accord.png",
    logo: "/images/hondalogo.svg",
  },
  {
    id: 3,
    name: "2025 Toyota Camry",
    price: 40000000,
    image: "/images/toyota-camry.png",
    logo: "/images/toyotalogo.jpg",
  },
  {
    id: 4,
    name: "2025 Lexus RX 350",
    price: 60000000,
    image: "/images/lexus-rx.png",
    logo: "/images/lexuslogo.svg",
  },
  {
    id: 5,
    name: "2023 Nissan Maxima",
    price: 60000000,
    image: "/images/nissan-maxima.png",
    logo: "/images/nissanlogo.svg",
  },
  {
    id: 6,
    name: "2021 Volkswagen Golf",
    price: 20000000,
    image: "/images/vw-golf.png",
    logo: "/images/volkslogo.png",
  },
  {
    id: 7,
    name: "2025 Lexus RX 350",
    price: 60000000,
    image: "/images/lexus-rx.png",
    logo: "/images/lexuslogo.svg",
  },
  {
    id: 8,
    name: "2025 Mercedes Benz GLE",
    price: 70000000,
    image: "/images/gle.png",
    logo: "/images/mercedeslogo.jpg",
  },
  {
    id: 9,
    name: "2021 Volkswagen Golf",
    price: 20000000,
    image: "/images/vw-golf.png",
    logo: "/images/volkslogo.png",
  },
  {
    id: 10,
    name: "2025 Toyota Camry",
    price: 40000000,
    image: "/images/toyota-camry.png",
    logo: "/images/toyotalogo.jpg",
  },
  {
    id: 11,
    name: "2025 Honda Accord",
    price: 30000000,
    image: "/images/accord.png",
    logo: "/images/hondalogo.svg",
  },
  {
    id: 12,
    name: "2023 Nissan Maxima",
    price: 60000000,
    image: "/images/nissan-maxima.png",
    logo: "/images/nissanlogo.svg",
  },
  {
    id: 13,
    name: "2025 Mercedes Benz GLE",
    price: 70000000,
    image: "/images/gle.png",
    logo: "/images/mercedeslogo.jpg",
  },
  {
    id: 14,
    name: "2025 Lexus RX 350",
    price: 60000000,
    image: "/images/lexus-rx.png",
    logo: "/images/lexuslogo.svg",
  },
  {
    id: 15,
    name: "2021 Volkswagen Golf",
    price: 20000000,
    image: "/images/vw-golf.png",
    logo: "/images/volkslogo.png",
  },
];

const PER_PAGE = 9;

export default function CarMarketplace() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(cars.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const paginatedCars = cars.slice(start, start + PER_PAGE);

  return (
    <div>
      <div
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/hero.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Find Your Dream Car Today
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Explore our wide selection of brand new and used cars tailored to
            your style and budget
          </p>
        </div>
      </div>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto  px-8 pt-4">
        <nav className="text-sm text-gray-500 ">
          Home <span className="mx-1">/</span> Garage{" "}
          <span className="mx-1">/</span>
          <span className="text-blue font-medium">Buy or Swap</span>
        </nav>
      </div>

      <div className="flex max-w-7xl mx-auto flex-col md:flex-row gap-6 px-4 md:px-10 py-6">
        {/* Sidebar Filter */}
        <aside className="w-full md:w-64 bg-white rounded-lg shadow-sm border border-lightgrey p-5 flex-shrink-0">
          <h2 className="font-semibold mb-4 text-lg">Filter Cars</h2>

          {/* Condition */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Condition</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="condition" defaultChecked /> Brand New
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="condition" /> Used
              </label>
            </div>
          </div>

          {/* Make */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Make</h3>
            <select className="w-full border border-lightgrey rounded px-2 py-1">
              <option>Mercedes</option>
              <option>Toyota</option>
              <option>Honda</option>
            </select>
          </div>

          {/* Year */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Year</h3>
            <div className="flex gap-2">
              <div className="flex flex-col w-1/2">
                <label className="text-xs text-gray-500 mb-1">From</label>
                <input
                  type="number"
                  className="w-full border border-lightgrey rounded px-2 py-1 focus:outline-1 focus:outline-blue focus:border-transparent"
                  defaultValue={2015}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-xs text-gray-500 mb-1">To</label>
                <input
                  type="number"
                  className="w-full border border-lightgrey rounded px-2 py-1 focus:outline-1 focus:outline-blue focus:border-transparent"
                  defaultValue={2020}
                />
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Price Range</h3>
            <input
              type="range"
              min="2000000"
              max="500000000"
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>₦2,000,000</span>
              <span>₦500,000,000</span>
            </div>
          </div>

          {/* Transmission */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Transmission</h3>
            <label className="flex items-center gap-2">
              <input type="radio" name="transmission" defaultChecked />{" "}
              Automatic
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="transmission" /> Manual
            </label>
          </div>

          {/* Fuel Type */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Fuel Type</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="fuel" defaultChecked /> Petrol
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="fuel" /> Diesel
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="fuel" /> Hybrid
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="fuel" /> Electric
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 border border-blue text-blue rounded px-3 py-1">
              Reset
            </button>
            <button className="flex-1 bg-blue text-white rounded px-3 py-1">
              Apply
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex flex-col sm:flex-row gap-2 mb-6 w-full">
            <input
              type="text"
              placeholder="Search for cars"
              className="flex-1 w-full border border-lightgrey rounded-lg px-4 py-2 focus:outline-1 focus:outline-blue focus:border-transparent"
            />
            <button className="w-full sm:w-auto bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              className="p-2 border rounded disabled:opacity-50"
              onClick={() => setPage(1)}
              disabled={page === 1}
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              className="p-2 border rounded disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  page === i + 1 ? "bg-blue-600 text-white" : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="p-2 border rounded disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              <ChevronRight size={16} />
            </button>
            <button
              className="p-2 border rounded disabled:opacity-50"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
