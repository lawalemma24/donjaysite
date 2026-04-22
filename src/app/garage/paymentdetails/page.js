"use client";
import { useState, useEffect } from "react";
import { FaRegCreditCard, FaUniversity, FaTruck } from "react-icons/fa";
import Image from "next/image";
import PaymentSuccessModal from "@/components/confirmpayment";
import dealsApi from "@/utils/dealsapi";
import Loader from "@/components/preloader";

const PaymentCard = () => {
  const [tab, setTab] = useState("card");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [car, setCar] = useState(null);
  const [deal, setDeal] = useState(null);

  // ✅ Load selected car from sessionStorage
  useEffect(() => {
    const savedCar = sessionStorage.getItem("selectedCar");
    if (savedCar) {
      setCar(JSON.parse(savedCar));
    }
  }, []);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      alert("Please log in to proceed with payment.");
      return;
    }

    if (!car || !car._id) {
      alert("Car not found. Please return to the car details page.");
      return;
    }

    if (!user) {
      alert("User information missing. Please re-login.");
      return;
    }

    setIsLoading(true);

    try {
      const dealData = {
        dealType: "buy",
        primaryCarId: car._id,
        offerPrice: car.price,
        customerNote: `Interested in purchasing ${car.carName}`,
        customerContact: {
          phone: user.phoneNumber || "+254700000000",
          email: user.email,
          preferredContactMethod: "both",
        },
        priority: "medium",
        tags: ["payment", "frontend"],
      };

      console.log("🪙 Current car object:", car);
      console.log("🚀 Creating deal with data:", dealData);

      const response = await dealsApi.post("/", dealData);
      console.log("✅ Deal created successfully:", response.data);

      setDeal(response.data.deal);
      setOpen(true);
    } catch (error) {
      console.error("❌ Error creating deal:", error.response?.data || error);
      alert(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to create deal."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!car) {
    return (
      <p className="text-center py-12 text-gray-500">
        No car selected. Please go back and choose a car.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home / Garage / Buy or Swap / Car Details / Summary / Info /{" "}
          <span className="text-blue font-medium">Buy</span>
        </nav>
      </div>

      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold text-center mb-6">Payment Details</h2>

        {/* Tabs */}
        <div className="flex justify-between gap-3 mb-6 text-xs">
          <button
            onClick={() => setTab("card")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md font-medium ${
              tab === "card"
                ? "border-blue text-blue-600"
                : "border-gray-300 text-gray-500"
            }`}
          >
            <FaRegCreditCard /> Card
          </button>
          <button
            onClick={() => setTab("bank")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md font-medium ${
              tab === "bank"
                ? "border-blue text-blue-600"
                : "border-gray-300 text-gray-500"
            }`}
          >
            <FaUniversity /> Bank Transfer
          </button>
          <button
            onClick={() => setTab("delivery")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-md font-medium ${
              tab === "delivery"
                ? "border-blue text-blue-600"
                : "border-gray-300 text-gray-500"
            }`}
          >
            <FaTruck /> Pay on Delivery
          </button>
        </div>

        {/* CARD PAYMENT */}
        {tab === "card" && (
          <div className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Card Number
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="1234 5678 9101 1213"
                  className="w-full border border-lightgrey rounded-md px-3 py-2 focus:outline-none focus:border-blue"
                />
                <Image
                  src="/images/mastercard.png"
                  alt="card"
                  width={32}
                  height={20}
                  className="absolute right-3"
                />
              </div>
            </div>

            {/* Expiry + CVV */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="07/11"
                  className="w-full border border-lightgrey rounded-md px-3 py-2 focus:outline-none focus:border-blue"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full border border-lightgrey rounded-md px-3 py-2 focus:outline-none focus:border-blue"
                />
              </div>
            </div>

            {/* Name on Card */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Name on Card
              </label>
              <input
                type="text"
                placeholder="Don Jay"
                className="w-full border border-lightgrey rounded-md px-3 py-2 focus:outline-none focus:border-blue"
              />
            </div>

            {/* Save checkbox */}
            <div className="flex items-center gap-2">
              <input type="checkbox" className="text-blue-600" defaultChecked />
              <span className="text-sm text-gray-600">
                Save card details for future
              </span>
            </div>

            {/* Pay button */}
            {isLoading && <Loader write="processing payment" />}

            <button
              onClick={handlePayment}
              disabled={isLoading}
              className={`w-full py-3 rounded-md font-semibold text-white transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue hover:bg-blue-700"
              }`}
            >
              {isLoading
                ? "Processing..."
                : `Pay ₦${(car.price || 0).toLocaleString()}`}
            </button>

            <PaymentSuccessModal isOpen={open} onClose={() => setOpen(false)} />
          </div>
        )}

        {tab === "bank" && (
          <div className="text-gray-500 text-center py-6">
            <p>Bank Transfer option will appear here.</p>
          </div>
        )}

        {tab === "delivery" && (
          <div className="text-gray-500 text-center py-6">
            <p>Pay on Delivery option will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;
