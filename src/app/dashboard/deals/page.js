"use client";
import { useState } from "react";
import BuyDealsTable from "./buydeals";
import SwapDealsTable from "./swapdeals";
import SellDealsTable from "./selldeals";
import ProtectedRoute from "@/app/protectedroutes/protected";

export default function MyDealsPage() {
  const [activeTab, setActiveTab] = useState("buy");

  return (
    <ProtectedRoute allowedRoles={["customer"]}>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">My Deals</h1>
        <p className="text-gray-600 text-sm mb-10">
          A complete overview of your buying, selling, and swapping activities,
          with real-time status updates
        </p>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-lightgrey mb-4">
          {["buy", "swap", "sell"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue"
                  : "text-text-muted"
              }`}
            >
              {tab === "buy"
                ? "Buy Deals"
                : tab === "swap"
                ? "Swap Deals"
                : "Sell Deals"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "buy" && <BuyDealsTable />}
        {activeTab === "swap" && <SwapDealsTable />}
        {activeTab === "sell" && <SellDealsTable />}
      </div>
    </ProtectedRoute>
  );
}
