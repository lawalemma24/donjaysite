"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/utils/api";
import dealsApi from "@/utils/dealsapi";
import Link from "next/link";
import FeaturedCars from "@/components/featuredcars";
import RelatedCars from "@/components/relatedcars";
import Loader from "@/components/preloader";
import ProtectedRoute from "@/app/protectedroutes/protected";
import toast from "react-hot-toast";

export default function MyCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState("");
  const [createdDeals, setCreatedDeals] = useState([]);
  const [user, setUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 7;

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.log("User parse error:", e);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const fetchCarsAndDeals = async () => {
      try {
        // FETCH CARS
        const res = await api.get("/user/my-cars");
        const fetchedCars = Array.isArray(res.data?.cars) ? res.data.cars : [];

        setCars(fetchedCars);

        // FETCH DEALS
        const dealsRes = await dealsApi.get("/my-deals?dealType=sell");
        const sellDeals = Array.isArray(dealsRes.data?.deals)
          ? dealsRes.data.deals
          : [];

        // 🔥 FIX: prevent crash if primaryCar is null
        const carIdsInDeals = sellDeals
          .filter((deal) => deal?.primaryCar?._id)
          .map((deal) => deal.primaryCar._id);

        setCreatedDeals(carIdsInDeals);
      } catch (err) {
        console.log("Fetch error:", err?.response?.data || err);
        toast.error("Error fetching cars or deals");
      } finally {
        setLoading(false);
      }
    };

    fetchCarsAndDeals();
  }, []);

  const createDeal = async (car) => {
    if (!user) {
      toast.error("User not ready");
      return;
    }

    // 🔥 EXTRA GUARD (prevents bad backend calls)
    if (!car?._id || !car?.price) {
      toast.error("Invalid car data");
      return;
    }

    try {
      setCreating(car._id);

      const payload = {
        dealType: "sell",
        primaryCarId: car._id,
        offerPrice: Number(car.price) || 0,
        additionalAmount: 0,
        customerNote: car.note || "Selling my car",
        customerContact: {
          phone: user?.phone || "",
          email: user?.email || "",
          preferredContactMethod: "both",
        },
        priority: "medium",
        tags: [],
      };

      await dealsApi.post("/", payload);

      // 🔥 prevent duplicates
      setCreatedDeals((prev) =>
        prev.includes(car._id) ? prev : [...prev, car._id]
      );

      toast.success("Deal created successfully");
    } catch (err) {
      console.log("Error creating deal:", err?.response?.data || err);
      toast.error(err?.response?.data?.error || "Failed to create deal");
    } finally {
      setCreating("");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const totalPages = Math.ceil(cars.length / carsPerPage);
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return <Loader write="loading your cars..." />;
  }

  return (
    <>
      <ProtectedRoute allowedRoles={["customer"]}>
        <div className="min-h-screen bg-white px-2 md:px-4 py-16">
          <div className="flex justify-center px-2 md:px-4 pt-4 mt-4 md:mt-7 mb-16">
            <div className="w-full max-w-4xl bg-white rounded-2xl">
              <h1 className="text-2xl font-bold mb-2 text-gray-600">
                My Cars for Sale
              </h1>

              <p className="text-gray-600 text-sm mb-10">
                View all your cars, track their approval status, and create sell
                deals.
              </p>

              <div className="mb-6 mt-4 flex justify-end">
                <Link
                  href="/garage/sell"
                  className="bg-blue text-white px-4 py-2 rounded-lg"
                >
                  Create a Car For Sale
                </Link>
              </div>

              <div className="bg-white shadow rounded-xl py-4 px-2 mb-6">
                <h2 className="text-lg font-semibold px-2 mb-3">
                  Your Cars Overview
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                    <tbody>
                      {currentCars.length > 0 ? (
                        currentCars.map((car) => (
                          <tr key={car._id}>
                            <td className="flex items-center gap-2 px-4 py-4 min-w-[180px]">
                              <Image
                                src={
                                  typeof car.images?.[0] === "string"
                                    ? car.images[0]
                                    : car.images?.[0]?.url ||
                                      "/images/placeholder-car.jpg"
                                }
                                width={50}
                                height={50}
                                alt={car.carName || "Unknown Car"}
                                className="rounded-md"
                              />
                              <span className="text-gray-600">
                                {car.carName || "Unknown Car"}
                              </span>
                            </td>

                            <td className="px-4 py-2 text-gray-500 text-xs">
                              {Number(car.price || 0).toLocaleString()}
                            </td>

                            <td className="px-4 py-2">
                              <span
                                className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(
                                  car.status
                                )}`}
                              >
                                {car.status}
                              </span>
                            </td>

                            <td className="px-4 py-2 text-xs">
                              {createdDeals.includes(car._id) ? (
                                <span className="text-blue-600 font-medium">
                                  Listed
                                </span>
                              ) : (
                                <span className="text-gray-500">
                                  Not Listed
                                </span>
                              )}
                            </td>

                            <td className="px-4 py-2 min-w-[150px]">
                              {car.status !== "approved" ? (
                                <span className="text-gray-400 italic">
                                  Queued
                                </span>
                              ) : createdDeals.includes(car._id) ? (
                                <button className="px-3 py-1 bg-green-400 text-white rounded-lg cursor-not-allowed">
                                  Listed
                                </button>
                              ) : (
                                <button
                                  className="px-3 py-2 bg-blue text-white rounded-lg"
                                  onClick={() => createDeal(car)}
                                  disabled={creating === car._id || !user}
                                >
                                  {creating === car._id
                                    ? "Listing..."
                                    : "List for Sale"}
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            className="text-center py-4 text-gray-500"
                          >
                            No cars found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {cars.length > carsPerPage && (
                  <div className="flex justify-end items-center gap-2 mt-4">
                    <button
                      onClick={goToPrevPage}
                      disabled={currentPage === 1}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      Prev
                    </button>

                    <span className="text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>

                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-2 md:px-4">
          <RelatedCars />
        </div>
      </ProtectedRoute>
    </>
  );
}
