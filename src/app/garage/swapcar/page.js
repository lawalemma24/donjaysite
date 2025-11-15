"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import api from "@/utils/api";
import dealsApi from "@/utils/dealsapi";
import Loader from "@/components/preloader";
import ProtectedRoute from "@/app/protectedroutes/protected";
import { useRouter } from "next/navigation";
import RelatedCars from "@/components/relatedcars";

export default function SwapPage() {
  const router = useRouter();
  const [selectedCar, setSelectedCar] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState("");
  const [createdDeals, setCreatedDeals] = useState([]); // will hold swap pairs
  const [user, setUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 7;

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  useEffect(() => {
    const storedCar = sessionStorage.getItem("selectedCar");
    if (storedCar) setSelectedCar(JSON.parse(storedCar));
  }, []);

  useEffect(() => {
    const fetchCarsAndDeals = async () => {
      try {
        const res = await api.get("/user/my-cars");
        const fetchedCars = res.data.cars || [];
        setCars(fetchedCars);

        // Fetch deals and convert to primary-secondary pair list
        const dealsRes = await dealsApi.get("/my-deals?dealType=swap");
        const swapDeals = dealsRes.data.deals || [];

        const swapPairs = swapDeals.map((deal) => ({
          primary: deal.primaryCar?._id,
          secondary: deal.secondaryCar?._id,
        }));

        setCreatedDeals(swapPairs);
      } catch (err) {
        console.log("Error fetching cars or deals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarsAndDeals();
  }, []);

  // 🔥 Prevent duplicate swap requests
  const hasExistingSwap = (carId) => {
    return createdDeals.some(
      (deal) => deal.primary === selectedCar?._id && deal.secondary === carId
    );
  };

  const createDeal = async (carToSwapWith) => {
    if (!user || !selectedCar) {
      alert("User or selected car not loaded");
      return;
    }

    const phone = user.phone || "";
    const email = user.email || "";

    if (!phone || !email) {
      alert("Please make sure your profile has phone and email filled in.");
      return;
    }

    // ❌ Stop duplicate swaps
    if (hasExistingSwap(carToSwapWith._id)) {
      alert("You have already created a swap request with this car.");
      return;
    }

    try {
      setCreating(carToSwapWith._id);

      const payload = {
        dealType: "swap",
        primaryCarId: selectedCar._id,
        secondaryCarId: carToSwapWith._id,
        offerPrice: selectedCar.price,
        customerContact: {
          phone,
          email,
          preferredContactMethod: "both",
        },
        customerNote: `Swapping ${selectedCar.carName} with ${carToSwapWith.carName}`,
        additionalAmount: 0,
        priority: "medium",
        tags: [],
      };

      await dealsApi.post("/", payload);

      // Update stored swap pairs
      setCreatedDeals((prev) => [
        ...prev,
        { primary: selectedCar._id, secondary: carToSwapWith._id },
      ]);

      alert("Swap deal created successfully!");
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

  const filteredCars = currentCars.filter(
    (car) =>
      (car.status === "approved" || car.status === "pending") &&
      car._id !== selectedCar?._id
  );

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

            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-400 mb-2 text-xs">
                1.For you to proceed with the swap, the car you select must be
                approved. if your car is still pending approval, please wait
                until it is approved
              </p>
              <p className="text-red-400 mb-2 text-xs">
                2. If you do not have a car uploaded yet or want to add a
                different car, please add a new car.The car will be reviewed and
                approved before you can use it for swapping.
              </p>
            </div>

            <div className="flex justify-end items-center mb-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-6"
                onClick={() => router.push("/garage/swapcar/createcar")}
              >
                Add New Car
              </button>
            </div>

            <p className="text-gray-800 text-lg mb-2">
              Select a car from your garage to swap with:
            </p>

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
                    {filteredCars.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-10">
                          <p className="text-gray-600 mb-3 text-sm">
                            You have no cars available for swap.
                          </p>
                          <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                            onClick={() =>
                              router.push("/garage/swapcar/createcar")
                            }
                          >
                            Add a car
                          </button>
                        </td>
                      </tr>
                    ) : (
                      filteredCars.map((car) => (
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
                              className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(
                                car.status
                              )}`}
                            >
                              {car.status}
                            </span>
                          </td>

                          <td className="px-4 py-2 text-xs">
                            {hasExistingSwap(car._id) ? (
                              <span className="text-blue-600 font-medium">
                                Already Swapped
                              </span>
                            ) : (
                              <span className="text-gray-500">Not Listed</span>
                            )}
                          </td>

                          <td className="px-4 py-2 min-w-[150px]">
                            {car.status === "approved" ? (
                              <button
                                className={`px-3 py-2 rounded-lg text-white ${
                                  hasExistingSwap(car._id)
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600"
                                }`}
                                onClick={() =>
                                  !hasExistingSwap(car._id) && createDeal(car)
                                }
                                disabled={
                                  creating === car._id ||
                                  !user ||
                                  hasExistingSwap(car._id)
                                }
                              >
                                {hasExistingSwap(car._id)
                                  ? "Already Swapped"
                                  : creating === car._id
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
                      ))
                    )}
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

      <div className="px-2 md:px-4">
        <RelatedCars />
      </div>
    </ProtectedRoute>
  );
}
