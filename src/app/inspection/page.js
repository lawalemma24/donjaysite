"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import InspectionOfferReview from "./summary/page";
import api from "@/utils/api";
import NotRegisteredOverlay from "@/components/notuser";

export default function InspectionPage() {
  const params = useSearchParams();
  const router = useRouter();
  const carId = params.get("carId");

  const [allCars, setAllCars] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [car, setCar] = useState(null);
  const [date, setDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [note, setNote] = useState("");
  const [showReview, setShowReview] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("gallery");
  const [showNotRegistered, setShowNotRegistered] = useState(false);

  const PAGE_LIMIT = 9;

  useEffect(() => {
    const savedCar = sessionStorage.getItem("selectedCar");
    if (savedCar) {
      setCar(JSON.parse(savedCar));
      setView("booking");
    }
  }, []);

  // Fetch all cars once
  const fetchAllCars = async () => {
    setLoading(true);
    try {
      const res = await api.get("/approved?limit=1000");
      const list = res.data.cars || [];
      setAllCars(list);
    } catch (err) {
      console.error("Error fetching cars:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load selected car
  useEffect(() => {
    const savedCar = sessionStorage.getItem("selectedCar");
    if (savedCar) setCar(JSON.parse(savedCar));
    else if (carId)
      (async () => {
        try {
          const res = await api.get(`/${carId}`);
          setCar(res.data?.car);
        } catch (err) {
          console.error("Failed to load car:", err);
        }
      })();
  }, [carId]);

  // Fetch all cars on mount
  useEffect(() => {
    fetchAllCars();
  }, []);

  // Filter & paginate locally whenever allCars, search, or page changes
  useEffect(() => {
    const filtered = allCars.filter((c) =>
      c.carName.toLowerCase().includes(search.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / PAGE_LIMIT));
    const start = (page - 1) * PAGE_LIMIT;
    const paginated = filtered.slice(start, start + PAGE_LIMIT);
    setCars(paginated);
  }, [allCars, search, page]);

  const handleCarSelect = (id) => {
    const selected = allCars.find((c) => c._id === id);
    if (selected) {
      setCar(selected);
      sessionStorage.setItem("selectedCar", JSON.stringify(selected));
      setView("booking");
    }
  };

  // Fetch available slots for selected date
  useEffect(() => {
    if (!date) return;
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/inspections/available-slots?date=${date}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        const slotsData = data.slots || [];
        const flattened = slotsData.flatMap((p) =>
          p.availableSlots
            .filter((s) => !s.isBooked)
            .map((s) => ({ ...s, period: p.period }))
        );
        setAvailableSlots(flattened);
      } catch (err) {
        console.error("Failed to fetch slots:", err);
        setAvailableSlots([]);
      }
    })();
  }, [date]);

  if (showReview) {
    return (
      <InspectionOfferReview
        car={car}
        date={date}
        time={selectedSlot}
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
          <span className="text-blue font-medium">
            {view === "gallery" ? "Select Car" : "Book Inspection"}
          </span>
        </nav>
      </div>

      <div className="flex justify-center mb-16">
        <div className="w-full max-w-6xl bg-white rounded-2xl p-8">
          <h1 className="text-3xl font-semibold text-center text-black mb-2">
            {view === "gallery"
              ? "Choose a Car for Inspection"
              : "Book an Inspection"}
          </h1>
          <p className="text-black/60 text-center text-sm mb-8">
            {view === "gallery"
              ? "Select your car to proceed with booking."
              : "Select a date and available slot for your inspection."}
          </p>

          {view === "gallery" ? (
            <>
              {/* Search Input */}
              <div className="mb-6">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search cars across all pages..."
                  className="w-full lg:w-[60%] border border-text-muted/40 rounded-lg px-4 py-2  focus:outline-none  focus:border-blue focus:ring-none mb-3"
                />
              </div>

              {/* Car Grid */}
              {loading ? (
                <p className="text-gray-500 text-center py-4">
                  Loading cars...
                </p>
              ) : cars.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No cars found.</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cars.map((c) => (
                      <div
                        key={c._id}
                        className="border border-text-muted/20 rounded-xl shadow overflow-hidden cursor-pointer hover:shadow transition"
                      >
                        <img
                          src={c.images?.[0] || "/placeholder.png"}
                          alt={c.carName}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-3">
                          <p className="flex gap-2 justify-between items-center">
                            <span className="font-semibold">{c.carName}</span>
                            <span className="text-xs text-blue/60">
                              {c.price}
                            </span>
                          </p>
                          <p className="text-gray-500 text-xs mb-2">{c.year}</p>
                          <button
                            type="button"
                            onClick={() => handleCarSelect(c._id)}
                            className="w-full text-sm py-1.5 rounded-lg bg-blue text-white hover:bg-blue-700 transition mt-2"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-6 gap-2">
                      <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1  border border-text-muted/40 rounded disabled:opacity-50"
                      >
                        Prev
                      </button>
                      <span className="px-3 py-1">
                        {page} / {totalPages}
                      </span>
                      <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 border  border-blue text-blue  rounded disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            // Booking form (unchanged except auth check)
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                // stronger check: token + user role 'customer'
                const token = localStorage.getItem("token");
                const userStr = localStorage.getItem("user");
                let user = null;
                try {
                  user = userStr ? JSON.parse(userStr) : null;
                } catch (err) {
                  user = null;
                }

                if (!token || !user || user.role !== "customer") {
                  setShowNotRegistered(true);
                  return;
                }

                if (selectedSlot) setShowReview(true);
                else alert("Please select a slot.");
              }}
            >
              <div className="border border-text-muted/50 rounded p-4 bg-white">
                <div className="flex items-center space-x-4">
                  <img
                    src={car.images?.[0] || "/placeholder.png"}
                    alt={car.carName}
                    className="w-28 h-20 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold text-black text-lg">
                      {car.carName}
                    </p>
                    <p className="text-blue/60 text-sm">{car.year}</p>
                    <p className="text-gray-500 text-sm">
                      {car.condition} • {car.transmission}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-text-muted/60  focus:border-blue sm:text-sm h-10 px-3 border focus:ring-none focus:outline-none"
                />
              </div>

              {date && (
                <div>
                  <label className="block  font-medium text-gray-700 mb-2">
                    Select Your Preferred Time
                  </label>

                  {availableSlots.length === 0 ? (
                    <p className="text-gray-500 text-sm">No available slots.</p>
                  ) : (
                    <>
                      {["Morning", "Afternoon", "Night"].map((period) => {
                        const slotsForPeriod = availableSlots.filter(
                          (slot) =>
                            slot.period.toLowerCase() === period.toLowerCase()
                        );

                        if (slotsForPeriod.length === 0) return null;

                        const colorMap = {
                          Morning: "bg-blue/40 text-white",
                          Afternoon: "bg-blue/40 text-white",
                          Night: "bg-blue/40 text-white",
                        };

                        return (
                          <div key={period} className="mb-4">
                            <h3 className="text-sm font-semibold mb-2 text-orange">
                              {period}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {slotsForPeriod.map((slot) => (
                                <button
                                  key={`${slot.startTime}-${slot.period}`}
                                  type="button"
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`border rounded-lg py-2 text-sm ${
                                    selectedSlot?.startTime ===
                                      slot.startTime &&
                                    selectedSlot?.period === slot.period
                                      ? "bg-blue text-white"
                                      : `bg-blue/40 text-gray-700 hover:bg-blue/60 ${colorMap[period]}`
                                  }`}
                                >
                                  {slot.startTime}-{slot.endTime}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              )}

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

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setView("gallery")}
                  className="px-4 py-2 border text-sm rounded hover:bg-gray-100"
                >
                  Back to Car Gallery
                </button>
                <button
                  type="submit"
                  className="bg-blue text-white font-medium px-6 py-3 rounded shadow-lg hover:bg-blue-700 transition duration-300 disabled:opacity-60"
                >
                  Continue to book
                </button>
              </div>
            </form>
          )}

          {/* Render overlay as an overlay inside the same page */}
          {showNotRegistered && (
            <NotRegisteredOverlay
              onRegisterClick={() => {
                setShowNotRegistered(false);
                router.push("/auth/register");
              }}
              onClose={() => setShowNotRegistered(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
