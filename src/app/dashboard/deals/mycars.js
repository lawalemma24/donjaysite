"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SellDealsTable from "./selldeals";
import api from "@/utils/api";
import dealsApi from "@/utils/dealsapi";

export default function MyCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState("");
  const [createdDeals, setCreatedDeals] = useState([]);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("pending"); // <-- SIMPLE TABS

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);
  }, []);

  useEffect(() => {
    const fetchCarsAndDeals = async () => {
      try {
        const res = await api.get("/user/my-cars");
        const fetchedCars = res.data.cars || [];
        setCars(fetchedCars);

        const dealsRes = await dealsApi.get("/my-deals?dealType=sell");
        const sellDeals = dealsRes.data.deals || [];

        const carIdsInDeals = sellDeals.map((deal) => deal.primaryCar._id);
        setCreatedDeals(carIdsInDeals);
      } catch (err) {
        console.log("Error fetching cars or deals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarsAndDeals();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading your cars...</p>
      </div>
    );
  }

  const pendingCars = cars.filter((c) => c.status === "pending");
  const approvedCars = cars.filter((c) => c.status === "approved");

  const createDeal = async (car) => {
    if (!user) {
      alert("User not loaded yet");
      return;
    }

    try {
      setCreating(car._id);

      const payload = {
        dealType: "sell",
        primaryCarId: car._id,
        offerPrice: car.price,
        additionalAmount: 0,
        customerNote: car.note || "Selling my car",
        customerContact: {
          phone: user.phone,
          email: user.email,
          preferredContactMethod: "both",
        },
        priority: "medium",
        tags: [],
      };

      await dealsApi.post("/", payload);

      setCreatedDeals((prev) => [...prev, car._id]);
      alert("Deal created successfully");
    } catch (err) {
      console.log("Error creating deal:", err.response?.data || err);
      alert("Failed to create deal");
    } finally {
      setCreating("");
    }
  };

  return (
    <>
      {/* ---------------- TABS ---------------- */}
      <div className="flex gap-4 border-b mb-6">
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-4 py-2 ${
            activeTab === "pending"
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          }`}
        >
          Pending Cars
        </button>

        <button
          onClick={() => setActiveTab("approved")}
          className={`px-4 py-2 ${
            activeTab === "approved"
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          }`}
        >
          Approved Cars
        </button>

        <button
          onClick={() => setActiveTab("deals")}
          className={`px-4 py-2 ${
            activeTab === "deals"
              ? "border-b-2 border-blue-500 font-semibold"
              : "text-gray-500"
          }`}
        >
          Sell Deals
        </button>
      </div>

      {/* -------------- PENDING CARS TAB -------------- */}
      {activeTab === "pending" && (
        <div className="bg-white shadow rounded-xl py-4 px-2 mb-6">
          <h2 className="text-lg font-semibold px-2 mb-3">Pending Cars</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-lightgrey">
                  <th className="px-4 py-2">Car</th>
                  <th className="px-4 py-2">Year</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingCars.length > 0 ? (
                  pendingCars.map((car) => (
                    <tr key={car._id} className="border-b border-lightgrey">
                      <td className="flex items-center gap-2 px-4 py-4 min-w-[180px]">
                        <Image
                          src={car.images?.[0] || "/images/placeholder-car.jpg"}
                          width={50}
                          height={50}
                          alt={car.carName || "Unknown Car"}
                          className="rounded-md w-[50px]"
                        />
                        <span>{car.carName || "Unknown Car"}</span>
                      </td>
                      <td className="px-4 py-2 text-text-muted">
                        {car.year || "—"}
                      </td>
                      <td className="px-4 py-2 text-yellow-500 font-semibold">
                        Pending
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">
                      No pending cars.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* -------------- APPROVED CARS TAB -------------- */}
      {activeTab === "approved" && (
        <div className="bg-white shadow rounded-xl py-4 px-2 mb-6">
          <h2 className="text-lg font-semibold px-2 mb-3">Approved Cars</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-lightgrey">
                  <th className="px-4 py-2">Car</th>
                  <th className="px-4 py-2">Year</th>
                  <th className="px-4 py-2">Condition</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {approvedCars.length > 0 ? (
                  approvedCars.map((car) => (
                    <tr key={car._id} className="border-b border-lightgrey">
                      <td className="flex items-center gap-2 px-4 py-4 min-w-[180px]">
                        <Image
                          src={car.images?.[0] || "/images/placeholder-car.jpg"}
                          width={50}
                          height={50}
                          alt={car.carName}
                          className="rounded-md w-[50px]"
                        />
                        <span>{car.carName}</span>
                      </td>
                      <td className="px-4 py-2 text-text-muted">{car.year}</td>
                      <td className="px-4 py-2 text-text-muted">
                        {createdDeals.includes(car._id) ? (
                          <span className="text-red-500 font-semibold">
                            Already listed for sale
                          </span>
                        ) : (
                          car.condition || "—"
                        )}
                      </td>
                      <td className="px-4 py-2 min-w-[150px]">
                        {createdDeals.includes(car._id) ? (
                          <button className="px-3 py-1 bg-gray-400 text-white rounded-lg cursor-not-allowed">
                            Deal Created
                          </button>
                        ) : (
                          <button
                            className="px-3 py-1 bg-blue text-white rounded-lg"
                            onClick={() => createDeal(car)}
                            disabled={creating === car._id || !user}
                          >
                            {creating === car._id
                              ? "Creating..."
                              : "Create Sell Deal"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No approved cars.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* -------------- SELL DEALS TAB -------------- */}
      {activeTab === "deals" && (
        <div className="bg-white shadow rounded-xl py-4 px-2 mb-6">
          <SellDealsTable />
        </div>
      )}
    </>
  );
}
