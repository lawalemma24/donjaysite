"use client";

import { useState } from "react";
import Buydeals from "../components/buydeals";
import Selldeals from "../components/selldeals";
import Swapdeals from "../components/swapdeals";
import ProtectedRoute from "@/app/protectedroutes/protected";

export default function CarListingPage() {
  const [active, setActive] = useState("buy");

  const tabs = [
    { key: "buy", label: "Buy deals" },
    { key: "sell", label: "Sell deals" },
    { key: "swap", label: "Swap deals" },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="p-3 md:p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Deals</h1>
          <p className="text-gray-500 mt-1">
            Track and manage all customer transactions, including car purchases,
            sales and swaps in one place.
          </p>
        </div>
        {/* Tabs */}
        <div className="mt-7 bg-white p-4 sm:p-6 rounded-lg shadow">
          <div className="flex overflow-x-auto gap-2 sm:gap-4 border-b border-text-muted/60 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActive(tab.key)}
                className={`flex-shrink-0 pb-2 px-3 sm:px-4 text-sm sm:text-lg font-medium transition-colors whitespace-nowrap
        ${
          active === tab.key
            ? "text-blue-600 border-b-2 sm:border-b-3 border-orange"
            : "text-gray-500 hover:text-gray-700"
        }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-4 sm:mt-6">
            {active === "buy" && <Buydeals />}
            {active === "sell" && <Selldeals />}
            {active === "swap" && <Swapdeals />}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
