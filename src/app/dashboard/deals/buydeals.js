"use client";
import { useState } from "react";
import Image from "next/image";
import DealDetailsModal from "../dealdetailsmodal";

const initialDeals = [
  {
    id: 1,
    car: "2025 Mercedes Benz GLE",
    price: "₦70,000,000",
    condition: "Brand New",
    status: "Completed",
    date: "Sept. 10, 2025",
    image: "/images/gle.png",
  },
  {
    id: 2,
    car: "2025 Lexus RX 350",
    price: "₦60,000,000",
    condition: "Brand New",
    status: "Pending",
    date: "Sept. 10, 2025",
    image: "/images/lexus-rx.png",
  },
  {
    id: 3,
    car: "2023 Nissan Maxima",
    price: "₦60,000,000",
    condition: "Brand New",
    status: "Cancelled",
    date: "Sept. 10, 2025",
    image: "/images/nissan-maxima.png",
  },
];

const statusColors = {
  Completed: "text-green-600",
  Pending: "text-yellow-500",
  Cancelled: "text-red-600",
};

export default function BuyDealsTable() {
  const [search, setSearch] = useState("");
  const [selectedDeal, setSelectedDeal] = useState(null);

  const filteredDeals = initialDeals.filter((deal) =>
    deal.car.toLowerCase().includes(search.toLowerCase())
  );

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
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="border-b border-lightgrey">
                  <td className="flex items-center gap-2 px-4 py-4 min-w-[180px]">
                    <Image
                      src={deal.image}
                      alt={deal.car}
                      width={50}
                      height={50}
                      className="rounded-md w-[50px] h-auto"
                    />
                    <span className="truncate">{deal.car}</span>
                  </td>
                  <td className="px-4 py-2 text-text-muted min-w-[120px]">
                    {deal.price}
                  </td>
                  <td className="px-4 py-2 text-text-muted min-w-[120px]">
                    {deal.condition}
                  </td>
                  <td
                    className={`px-4 py-2 font-semibold min-w-[100px] ${
                      statusColors[deal.status]
                    }`}
                  >
                    {deal.status}
                  </td>
                  <td className="px-4 py-2 text-text-muted min-w-[140px]">
                    {deal.date}
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
              ))}
              {filteredDeals.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No deals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedDeal && (
        <DealDetailsModal
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
        />
      )}
    </>
  );
}
