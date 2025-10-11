"use client";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import CarCard from "@/components/carcard";
import api from "@/utils/api";

const PER_PAGE = 9;

export default function CarMarketplace() {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("");
  const [make, setMake] = useState("");
  const [yearRange, setYearRange] = useState(["", ""]);
  const [priceRange, setPriceRange] = useState(["", ""]);
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");

  const totalPages = Math.ceil(filteredCars.length / PER_PAGE);

  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      try {
        const res = await api.get("/approved?page=1&limit=50");
        const data = res.data.cars || res.data.data || [];
        setAllCars(data);
        setFilteredCars(data);
        setPage(1);
        setCars(data.slice(0, PER_PAGE)); // ✅ show immediately
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const handleFilterAndSearch = () => {
    const noFiltersApplied =
      !search &&
      !condition &&
      !make &&
      !transmission &&
      !fuel &&
      !priceRange[0] &&
      !priceRange[1] &&
      !yearRange[0] &&
      !yearRange[1];

    if (noFiltersApplied) {
      setFilteredCars(allCars);
      setPage(1);
      return;
    }

    const filtered = allCars.filter((car) => {
      const carName = car.carName || "";

      const matchSearch =
        !search || carName.toLowerCase().includes(search.toLowerCase());

      const matchCondition =
        !condition ||
        (car.condition &&
          car.condition.toLowerCase() === condition.toLowerCase());

      const matchMake =
        !make || carName.toLowerCase().startsWith(make.toLowerCase());

      const matchTransmission =
        !transmission ||
        (car.transmission &&
          car.transmission.toLowerCase() === transmission.toLowerCase());

      const matchFuel =
        !fuel ||
        (car.fuelType && car.fuelType.toLowerCase() === fuel.toLowerCase());

      const minPrice = parseInt(priceRange[0], 10);
      const maxPrice = parseInt(priceRange[1], 10);
      const matchPrice =
        (isNaN(minPrice) || car.price >= minPrice) &&
        (isNaN(maxPrice) || car.price <= maxPrice);

      const minYear = parseInt(yearRange[0], 10);
      const maxYear = parseInt(yearRange[1], 10);
      const matchYear =
        (isNaN(minYear) || car.year >= minYear) &&
        (isNaN(maxYear) || car.year <= maxYear);

      return (
        matchSearch &&
        matchCondition &&
        matchMake &&
        matchTransmission &&
        matchFuel &&
        matchPrice &&
        matchYear
      );
    });

    setFilteredCars(filtered);
    setPage(1);
  };

  useEffect(() => {
    const delay = setTimeout(() => handleFilterAndSearch(), 500);
    return () => clearTimeout(delay);
  }, [search]);

  useEffect(() => {
    handleFilterAndSearch();
  }, [condition, make, yearRange, priceRange, transmission, fuel]);

  useEffect(() => {
    if (filteredCars.length > 0) {
      const start = (page - 1) * PER_PAGE;
      const paginated = filteredCars.slice(start, start + PER_PAGE);
      setCars(paginated);
    }
  }, [page, filteredCars]);

  const resetFilters = () => {
    setSearch("");
    setCondition("");
    setMake("");
    setYearRange(["", ""]);
    setPriceRange(["", ""]);
    setTransmission("");
    setFuel("");
    setTimeout(() => handleFilterAndSearch(), 0);
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/hero.png')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Find Your Dream Car Today
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Explore our selection of new and used cars that match your budget
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pt-4">
        <nav className="text-sm text-gray-500">
          Home <span className="mx-1">/</span> Garage{" "}
          <span className="mx-1">/</span>
          <span className="text-blue font-medium">Buy or Swap</span>
        </nav>
      </div>

      <div className="flex max-w-7xl mx-auto flex-col md:flex-row gap-6 px-4 md:px-10 py-6">
        <aside className="w-full md:w-64 bg-white rounded-lg shadow-sm border border-lightgrey p-5 flex-shrink-0">
          <h2 className="font-semibold mb-4 text-lg">Filter Cars</h2>

          <div className="mb-4">
            <h3 className="font-medium mb-2">Condition</h3>
            {["Brand New", "Used"].map((c) => (
              <label key={c} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="condition"
                  checked={condition === c}
                  onChange={() => setCondition(c)}
                />
                {c}
              </label>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-medium mb-2">Make</h3>
            <select
              className="w-full border border-lightgrey rounded px-2 py-1"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            >
              <option value="">All Makes</option>
              <option>Mercedes</option>
              <option>Toyota</option>
              <option>Honda</option>
              <option>Tesla</option>
            </select>
          </div>

          <div className="mb-4">
            <h3 className="font-medium mb-2">Year</h3>
            <div className="flex gap-2">
              <div className="flex flex-col w-1/2">
                <label className="text-xs text-gray-500 mb-1">From</label>
                <input
                  type="number"
                  className="w-full border border-lightgrey rounded px-2 py-1"
                  value={yearRange[0]}
                  onChange={(e) => setYearRange([e.target.value, yearRange[1]])}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-xs text-gray-500 mb-1">To</label>
                <input
                  type="number"
                  className="w-full border border-lightgrey rounded px-2 py-1"
                  value={yearRange[1]}
                  onChange={(e) => setYearRange([yearRange[0], e.target.value])}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-medium mb-2">Price Range</h3>
            <div className="flex gap-2">
              <div className="flex flex-col w-1/2">
                <label className="text-xs text-gray-500 mb-1">Min</label>
                <input
                  type="number"
                  className="w-full border border-lightgrey rounded px-2 py-1"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([e.target.value, priceRange[1]])
                  }
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-xs text-gray-500 mb-1">Max</label>
                <input
                  type="number"
                  className="w-full border border-lightgrey rounded px-2 py-1"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], e.target.value])
                  }
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-medium mb-2">Transmission</h3>
            {["Automatic", "Manual"].map((t) => (
              <label key={t} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="transmission"
                  checked={transmission === t}
                  onChange={() => setTransmission(t)}
                />
                {t}
              </label>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Fuel Type</h3>
            {["Petrol", "Diesel", "Hybrid", "Electric"].map((f) => (
              <label key={f} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="fuel"
                  checked={fuel === f}
                  onChange={() => setFuel(f)}
                />
                {f}
              </label>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              className="flex-1 border border-blue text-blue rounded px-3 py-1"
              onClick={resetFilters}
            >
              Reset
            </button>

            <button
              className="flex-1 bg-blue text-white rounded px-3 py-1"
              onClick={handleFilterAndSearch}
            >
              Apply
            </button>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex flex-col sm:flex-row gap-2 mb-6 w-full">
            <input
              type="text"
              placeholder="Search by make or model..."
              className="flex-1 w-full border border-lightgrey rounded-lg px-4 py-2 focus:outline-1 focus:outline-blue focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="w-full sm:w-auto bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={handleFilterAndSearch}
            >
              Search
            </button>
          </div>

          {loading ? (
            <p className="text-center py-12 text-gray-500">Loading cars...</p>
          ) : cars.length === 0 ? (
            <p className="text-center py-12 text-gray-500">
              No cars found matching your criteria.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}

          {filteredCars.length > PER_PAGE && (
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
                disabled={page === totalPages || totalPages === 0}
              >
                <ChevronRight size={16} />
              </button>
              <button
                className="p-2 border rounded disabled:opacity-50"
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages || totalPages === 0}
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
