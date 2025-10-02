"use client";

import { useState } from "react";
import Buydeals from "../components/buydeals";
import Selldeals from "../components/selldeals";
import Swapdeals from "../components/swapdeals";

export default function CarListingPage() {
  const [active, setActive] = useState("buy");

  const tabs = [
    { key: "buy", label: "Buy deals" },
    { key: "sell", label: "Sell deals" },
    { key: "swap", label: "Swap deals" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Deals</h1>
        <p className="text-gray-500 mt-1">
          Track and manage all customer transactions, including car purchases,
          sales and swaps in one place.
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-7 bg-white p-6 rounded-lg shadow">
        <div className="flex gap-4 border-b border-text-muted/60">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`pb-2 px-4 text-lg font-medium transition-colors
                ${
                  active === tab.key
                    ? "text-blue-600 border-b-3 border-orange"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6">
          {active === "buy" && <Buydeals />}
          {active === "sell" && <Selldeals />}
          {active === "swap" && <Swapdeals />}
        </div>
      </div>
    </div>
  );
}
