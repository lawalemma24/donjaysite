"use client";
import { useState } from "react";
import Image from "next/image";
import SwapDetailsModal from "../swapdetails";

const initialDeals = [
  {
    id: 1,
    yourCar: {
      name: "2020 Toyota Camry",
      image: "/images/toyota-camry.png",
    },
    desiredCar: {
      name: "2025 Mercedes Benz GLE",
      image: "/images/gle.png",
    },
    price: "₦70,000,000",
    year: "2023",
    transmission: "Automatic",
    fuel: "Diesel",
    condition: "Brand New",
    status: "Completed",
    date: "Sept. 10, 2025",
  },
  {
    id: 2,
    yourCar: {
      name: "2022 Toyota Highlander",
      image: "/images/lexus-rx.png",
    },
    desiredCar: {
      name: "2025 Lexus RX 350",
      image: "/images/lexus-rx.png",
    },
    price: "₦60,000,000",
    year: "2023",
    transmission: "Automatic",
    fuel: "Petrol",
    condition: "Brand New",
    status: "Pending",
    date: "Sept. 10, 2025",
  },
  {
    id: 3,
    yourCar: {
      name: "2019 Honda Accord",
      image: "/images/accord.png",
    },
    desiredCar: {
      name: "2023 Nissan Maxima",
      image: "/images/nissan-maxima.png",
    },
    price: "₦50,000,000",
    year: "2019",
    transmission: "Manual",
    fuel: "Diesel",
    condition: "Brand New",
    status: "Cancelled",
    date: "Sept. 10, 2025",
  },
];

const statusColors = {
  Completed: "text-green-600",
  Pending: "text-yellow-500",
  Cancelled: "text-red-600",
};

export default function SwapDealsTable() {
  const [search, setSearch] = useState("");
  const [selectedDeal, setSelectedDeal] = useState(null);

  const filteredDeals = initialDeals.filter(
    (deal) =>
      deal.yourCar.name.toLowerCase().includes(search.toLowerCase()) ||
      deal.desiredCar.name.toLowerCase().includes(search.toLowerCase())
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
            <thead className="bg-gray-50">
              <tr className="border-b border-lightgrey">
                <th className="px-4 py-2 min-w-[180px] text-left">Your Car</th>
                <th className="px-4 py-2 min-w-[180px] text-left">
                  Desired Car
                </th>
                <th className="px-4 py-2 min-w-[120px] text-left">Price</th>
                <th className="px-4 py-2 min-w-[120px] text-left">Condition</th>
                <th className="px-4 py-2 min-w-[100px] text-left">Status</th>
                <th className="px-4 py-2 min-w-[140px] text-left">Date</th>
                <th className="px-4 py-2 min-w-[120px] text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="border-b border-lightgrey">
                  {/* Your Car */}
                  <td className="px-4 py-4 min-w-[180px]">
                    <div className="flex items-center gap-2">
                      <Image
                        src={deal.yourCar.image}
                        alt={deal.yourCar.name}
                        width={50}
                        height={50}
                        className="rounded-md w-[50px] h-auto"
                      />

                      <span className="truncate max-w-[120px] whitespace-nowrap overflow-hidden">
                        {deal.yourCar.name}
                      </span>
                    </div>
                  </td>

                  {/* Desired Car */}
                  <td className="px-4 py-4 min-w-[180px]">
                    <div className="flex items-center gap-2">
                      <Image
                        src={deal.desiredCar.image}
                        alt={deal.desiredCar.name}
                        width={50}
                        height={50}
                        className="rounded-md w-[50px] h-auto"
                      />

                      <span className="truncate max-w-[120px] whitespace-nowrap overflow-hidden">
                        {deal.desiredCar.name}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-2 min-w-[120px]">{deal.price}</td>

                  <td className="px-4 py-2 min-w-[120px] hidden">
                    {deal.year}
                  </td>
                  <td className="px-4 py-2 min-w-[120px] hidden">
                    {deal.fuel}
                  </td>
                  <td className="px-4 py-2 min-w-[120px] hidden">
                    {deal.transmission}
                  </td>

                  {/* Condition */}
                  <td className="px-4 py-2 min-w-[120px]">{deal.condition}</td>

                  {/* Status */}
                  <td
                    className={`px-4 py-2 font-semibold min-w-[100px] ${
                      statusColors[deal.status]
                    }`}
                  >
                    {deal.status}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-2 min-w-[140px]">{deal.date}</td>

                  {/* Action */}
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
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedDeal && (
        <SwapDetailsModal
          deal={selectedDeal}
          onClose={() => setSelectedDeal(null)}
        />
      )}
    </>
  );
}
