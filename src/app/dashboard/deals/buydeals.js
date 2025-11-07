"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import dealsApi from "@/utils/dealsapi";
import DealDetailsModal from "../dealdetailsmodal";

export default function BuyDealsTable() {
  const [search, setSearch] = useState("");
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await dealsApi.get("/my-deals?dealType=buy");
        setDeals(response.data.deals || []);
      } catch (error) {
        console.error(" Error fetching deals:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const filteredDeals = deals.filter((deal) =>
    deal?.primaryCar?.carName?.toLowerCase().includes(search.toLowerCase())
  );

  function getStatusColor(status) {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-700";
      case "approved":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading your deals...</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow rounded-xl py-4 px-2">
        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Search car name"
            className="w-full border border-lightgrey focus:border-blue focus:outline-none rounded-lg px-3 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="w-full sm:w-auto px-4 py-2 bg-blue text-white rounded-lg">
            Search
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-lightgrey">
                <th className="px-4 py-2">Car</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Condition</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.length > 0 ? (
                filteredDeals.map((deal) => (
                  <tr key={deal._id} className="border-b border-lightgrey">
                    <td className="flex items-center gap-2 px-4 py-4 min-w-[180px]">
                      <Image
                        src={
                          deal.primaryCar?.images?.[0] ||
                          "/images/placeholder-car.jpg"
                        }
                        alt={deal.primaryCar?.carName || "Car image"}
                        width={50}
                        height={50}
                        className="rounded-md w-[50px] h-auto"
                      />
                      <span className="truncate">
                        {deal.primaryCar?.carName || "Unknown Car"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-text-muted min-w-[120px]">
                      ₦{deal.offerPrice?.toLocaleString() || "—"}
                    </td>

                    <td className="px-4 py-2 text-text-muted min-w-[120px]">
                      {deal.primaryCar?.condition || "—"}
                    </td>
                    <td className="px-4 py-2 min-w-[100px]">
                      <span
                        className={`px-3 py-1 rounded-full font-semibold text-xs ${getStatusColor(
                          deal.status
                        )}`}
                      >
                        {deal.status || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-text-muted min-w-[140px]">
                      {new Date(deal.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-2 min-w-[120px]">
                      <button
                        className="px-3 py-1 bg-blue text-white text-sm rounded-lg"
                        onClick={() => setSelectedDeal(deal)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No deals found.
                    <br />Try adjusting your search criteria.
                    <p>Make sure all fields are filled out correctly.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDeal && (
        <DealDetailsModal
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
        />
      )}
    </>
  );
}
