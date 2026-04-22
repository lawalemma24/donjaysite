"use client";
import ProtectedRoute from "@/app/protectedroutes/protected";
import { User, Ellipsis, CheckCircle, Wallet } from "lucide-react";
import UserGrowthChart from "../components/usergrowth";
import RevenueTrendChart from "../components/revenuetrend";
import Buydeals from "../components/buydeals";
import Selldeals from "../components/selldeals";
import Swapdeals from "../components/swapdeals";
import { useState } from "react";
import DealsCompletedCard from "../components/completeddeals";
import PendingDealsCard from "../components/pendingdeals";
import TotalUsersCard from "../components/totalusers";

export default function DashboardPage() {
  const [active, setActive] = useState("buy");

  const tabs = [
    { key: "buy", label: "Buy deals" },
    { key: "sell", label: "Sell deals" },
    { key: "swap", label: "Swap deals" },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="px-1 md:px-5 py-1 md:py-3">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-left">
          Dashboard
        </h1>

        {/* widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Total Users */}
          <TotalUsersCard />

          {/* Pending Deals */}
          <PendingDealsCard />

          {/* Deals Completed */}
          <DealsCompletedCard />

          {/* Total Revenue */}
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
            <div className="bg-yellow-100 text-yellow-600 p-2 sm:p-3 rounded-full">
              <Wallet size={22} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
              <p className="text-xl sm:text-2xl font-bold text-black">₦800M</p>
            </div>
          </div>
        </div>

        {/* Graphs */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <UserGrowthChart />
          <RevenueTrendChart />
        </div>
        {/* Tabs */}
        <div className="mt-7 bg-white p-3 sm:p-6 rounded-lg shadow">
          {/* Tab navigation */}
          <div className="flex overflow-x-auto sm:overflow-visible scrollbar-hide border-b border-gray-200">
            <div className="flex flex-nowrap sm:flex-wrap gap-3 sm:gap-4 min-w-max sm:min-w-0">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActive(tab.key)}
                  className={`pb-2 px-3 sm:px-4 text-sm sm:text-base font-medium whitespace-nowrap transition-colors
            ${
              active === tab.key
                ? "text-blue-600 border-b-2 border-orange"
                : "text-gray-500 hover:text-gray-700"
            }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="mt-4 sm:mt-6">
            {active === "buy" && <Buydeals />}
            {active === "sell" && <Selldeals />}
            {active === "swap" && <Swapdeals />}
          </div>

          <button className="mt-4 mb-8 bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto">
            View All
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
