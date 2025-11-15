"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/utils/api";
import dealsApi from "@/utils/dealsapi";
import Loader from "@/components/preloader";
import ProtectedRoute from "@/app/protectedroutes/protected";
import { useRouter } from "next/navigation";

export default function SwapPage() {
  const router = useRouter();
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState("");
  const [createdDeals, setCreatedDeals] = useState([]);
  const [user, setUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 7;

  // Load logged user
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  // Load selected car from previous page
  useEffect(() => {
    const storedCar = sessionStorage.getItem("selectedCar");
    if (storedCar) setSelectedCar(JSON.parse(storedCar));
  }, []);

  // Fetch user cars and swap deals
  useEffect(() => {
    const fetchCarsAndDeals = async () => {
      try {
        const res = await api.get("/user/my-cars");
        const fetchedCars = res.data.cars || [];
        setCars(fetchedCars);

        const dealsRes = await dealsApi.get("/my-deals?dealType=swap");
        const swapDeals = dealsRes.data.deals || [];
        const carIdsInDeals = swapDeals.map((deal) => deal.primaryCar._id);
        setCreatedDeals(carIdsInDeals);
      } catch (err) {
        console.log("Error fetching cars or deals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarsAndDeals();
  }, []);

  const createDeal = async (carToSwapWith) => {
    if (!user || !selectedCar) {
      alert("User or selected car not loaded");
      return;
    }

    // Defensive: make sure user has contact info
    const phone = user.phone || "";
    const email = user.email || "";

    if (!phone || !email) {
      alert("Please make sure your profile has phone and email filled in.");
      return;
    }

    try {
      setCreating(carToSwapWith._id);

      const payload = {
        dealType: "swap",
        primaryCarId: selectedCar._id,
        secondaryCarId: carToSwapWith._id,
        offerPrice: selectedCar.price, // required
        customerContact: {
          phone,
          email,
          preferredContactMethod: "both",
        },
        customerNote: `Swapping ${selectedCar.carName} with ${carToSwapWith.carName}`,
        additionalAmount: 0, // optional
        priority: "medium", // optional
        tags: [], // optional
      };

      console.log("Creating swap deal with payload:", payload);

      const res = await dealsApi.post("/", payload);

      setCreatedDeals((prev) => [...prev, selectedCar._id]);

      alert("Swap deal created successfully!");
      // router.push("/garage/my-swaps");
    } catch (err) {
      console.log("Error creating swap deal:", err.response?.data || err);
      alert(
        err.response?.data?.message ||
          "Failed to create swap deal. Check console."
      );
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

  if (loading) return <Loader write="loading your cars..." />;

  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <div className="min-h-screen bg-white px-2 md:px-4 py-16">
        <div className="flex justify-center px-2 md:px-4 pt-4 mt-4 md:mt-7 mb-16">
          <div className="w-full max-w-4xl bg-white rounded-2xl">
            <h1 className="text-2xl font-bold mb-2 text-gray-600">
              My Cars for Swap
            </h1>
            <p className="text-gray-600 text-sm mb-10">
              View all your cars, track their approval status, and create swap
              deals.
            </p>

            {/* Display selected car */}
            {selectedCar && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h2 className="font-bold text-lg mb-2">Car to Swap</h2>
                <div className="flex items-center gap-4">
                  <Image
                    src={
                      selectedCar.images?.[0] || "/images/placeholder-car.jpg"
                    }
                    width={80}
                    height={50}
                    alt={selectedCar.carName}
                    className="rounded"
                  />
                  <div>
                    <p className="font-medium">{selectedCar.carName}</p>
                    <p className="text-sm text-gray-500">
                      ₦{selectedCar.price?.toLocaleString() || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white shadow rounded-xl py-4 px-2 mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-lightgrey">
                      <th className="px-4 py-2">Car</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Listed</th>
                      <th className="px-4 py-2">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentCars
                      .filter(
                        (car) =>
                          (car.status === "approved" ||
                            car.status === "pending") &&
                          car._id !== selectedCar?._id
                      )
                      .map((car) => (
                        <tr key={car._id} className="border-b border-lightgrey">
                          <td className="flex items-center gap-2 px-4 py-4 min-w-[180px]">
                            <Image
                              src={
                                car.images?.[0] || "/images/placeholder-car.jpg"
                              }
                              width={50}
                              height={50}
                              alt={car.carName || "Unknown Car"}
                              className="rounded-md w-[50px]"
                            />
                            <span className="text-gray-600">
                              {car.carName || "Unknown Car"}
                            </span>
                          </td>

                          <td className="px-4 py-2 text-gray-500 text-xs">
                            {car.price?.toLocaleString()}
                          </td>

                          <td className="px-4 py-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm  ${getStatusBadge(
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
                              <span className="text-gray-500">Not Listed</span>
                            )}
                          </td>

                          <td className="px-4 py-2 min-w-[150px]">
                            {car.status === "approved" ? (
                              <button
                                className="px-3 py-2 bg-green-600 text-white rounded-lg"
                                onClick={() => createDeal(car)}
                                disabled={creating === car._id || !user}
                              >
                                {creating === car._id
                                  ? "Processing..."
                                  : "Swap with this car"}
                              </button>
                            ) : (
                              <button
                                className="px-3 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                                disabled
                              >
                                {car.status === "pending"
                                  ? "Pending Approval"
                                  : "Rejected"}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {cars.length > carsPerPage && (
                <div className="flex justify-end items-center gap-2 mt-4">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span className="text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
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
    </ProtectedRoute>
  );
}
