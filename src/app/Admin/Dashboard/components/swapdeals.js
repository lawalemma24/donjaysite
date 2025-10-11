"use client";

import { useState } from "react";
import {
  MoreVertical,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  Download,
  CheckCircle,
  Trash2,
} from "lucide-react";
import FilterCard from "../components/FilterCard";
import AddCarForm from "../components/addcar";
import BuyDealDetails from "./buydealdetails";
import SellDealDetails from "./selldealdetails";
import SwapDealDetails from "./swapdealdetails";

const initialDeals = [
  {
    id: 1,
    user: "Gifton otieno",
    desiredcar: {
      name: "Toyota Camry",
      avatar: "/images/toyota-camry.png",
    },
    offeredcar: {
      name: "Toyota Camry",
      avatar: "/images/vw-golf.png",
    },
    balance: "10,000,000",

    status: "Cancelled",
    listed: "Sept. 9, 2025",
  },
  {
    id: 2,
    user: "Don jay",
    desiredcar: {
      name: "Toyota Camry",
      avatar: "/images/toyota-camry.png",
    },
    offeredcar: {
      name: "Toyota Camry",
      avatar: "/images/vw-golf.png",
    },
    balance: "10,000,000",

    status: "Pending",
    listed: "Sept. 9, 2025",
  },
  {
    id: 3,
    user: "Lydia juma",
    desiredcar: {
      name: "Toyota Camry",
      avatar: "/images/toyota-camry.png",
    },
    offeredcar: {
      name: "Toyota Camry",
      avatar: "/images/vw-golf.png",
    },
    balance: "10,000,000",

    status: "Pending",
    listed: "Sept. 9, 2025",
  },
  {
    id: 4,
    user: "Kevin Marhatta",
    desiredcar: {
      name: "Toyota Camry",
      avatar: "/images/toyota-camry.png",
    },
    offeredcar: {
      name: "Toyota Camry",
      avatar: "/images/vw-golf.png",
    },
    balance: "10,000,000",

    status: "Pending",
    listed: "Sept. 9, 2025",
  },
  {
    id: 5,
    user: "Vincent Otieno",
    desiredcar: {
      name: "Toyota Camry",
      avatar: "/images/toyota-camry.png",
    },
    offeredcar: {
      name: "Toyota Camry",
      avatar: "/images/toyota-camry.png",
    },
    balance: "10,000,000",

    status: "Completed",
    listed: "Sept. 9, 2025",
  },
  {
    id: 6,
    user: "cardisb brold",
    desiredcar: {
      name: "Toyota Camry",
      avatar: "/images/toyota-camry.png",
    },
    offeredcar: {
      name: "Toyota Camry",
      avatar: "/images/vw-golf.png",
    },
    balance: "10,000,000",

    status: "Completed",
    listed: "Sept. 9, 2025",
  },
  {
    id: 7,
    user: "Smith juel",
    desiredcar: {
      name: "Toyota Camry",
      avatar: "/images/toyota-camry.png",
    },
    offeredcar: {
      name: "Toyota Camry",
      avatar: "/images/vw-golf.png",
    },
    balance: "10,000,000",

    status: "Pending",
    listed: "Sept. 9, 2025",
  },
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Selldeals() {
  const [deals, setDeals] = useState(initialDeals);
  const [showFilter, setShowFilter] = useState(false);
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [actionMenuOpenFor, setActionMenuOpenFor] = useState(null);
  const [selectedForView, setSelectedForView] = useState(null);
  const [selectedForDelete, setSelectedForDelete] = useState(null);
  const [page, setPage] = useState(1);

  const totalEntries = deals.length;
  const pageSize = 7;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const paginatedDeals = deals.slice((page - 1) * pageSize, page * pageSize);

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  }

  return (
    <div className="p-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search car..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white w-64 text-sm focus:outline-none focus:border-blue"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </div>
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            onClick={() => setShowFilter((s) => !s)}
            className="inline-flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-lg bg-white hover:bg-gray-50"
          >
            <Filter size={16} /> Filter
          </button>
          {showFilter && (
            <div className="absolute right-0 mt-2 z-50">
              <FilterCard onClose={() => setShowFilter(false)} />
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white rounded-2xl shadow p-4 overflow-x-auto">
        <table className="w-full min-w-[1000px] text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="py-3 w-[40px]">#</th>
              <th>User</th>
              <th>Desired Car</th>

              <th>Balance to Pay</th>
              <th>Offered Car</th>

              <th>Status</th>
              <th>Date Listed</th>
              <th className="w-[60px]"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedDeals.map((deal, i) => (
              <tr
                key={deal.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <td className="py-4">{(page - 1) * pageSize + i + 1}</td>
                <td className="py-4 text-gray-600">{deal.user}</td>
                <td className="py-4 flex items-center gap-3">
                  <img
                    src={deal.desiredcar.avatar}
                    alt={deal.desiredcar.name}
                    className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                  />
                  {deal.desiredcar.name}
                </td>
                <td className="py-4 text-black"> {deal.balance}</td>
                <td className="py-4 flex items-center gap-3">
                  <img
                    src={deal.offeredcar.avatar}
                    alt={deal.offeredcar.name}
                    className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                  />
                  {deal.offeredcar.name}
                </td>

                {/* Status */}
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-[11px] font-semibold ${
                      statusColors[deal.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {deal.status}
                  </span>
                </td>

                <td className="py-4 text-gray-600">{deal.listed}</td>

                <td className="py-4 relative">
                  <button
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() =>
                      setActionMenuOpenFor(
                        actionMenuOpenFor === deal.id ? null : deal.id
                      )
                    }
                  >
                    <MoreVertical size={18} />
                  </button>

                  {actionMenuOpenFor === deal.id && (
                    <div className="absolute right-0 mt-2 z-50 bg-white border border-gray-200 rounded shadow w-56 text-sm">
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setSelectedForView(deal);
                          setActionMenuOpenFor(null);
                        }}
                      >
                        <Eye size={16} className="text-gray-600" />
                        View Details
                      </button>

                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                        <Download size={16} className="text-gray-600" />
                        Download Receipt
                      </button>

                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                        <CheckCircle size={16} className="text-gray-600" />
                        Mark as Completed
                      </button>

                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-red-600"
                        onClick={() => {
                          setSelectedForDelete(deal);
                          setActionMenuOpenFor(null);
                        }}
                      >
                        <Trash2 size={16} className="text-red-600" />
                        Cancel Order
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer with entries count + pagination */}
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500 gap-3">
          <div>
            Showing {(page - 1) * pageSize + 1} to{" "}
            {Math.min(page * pageSize, totalEntries)} of {totalEntries} entries
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(1)}
              className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-100"
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-100"
            >
              <ChevronLeft size={16} />
            </button>

            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`px-3 py-1 rounded border border-gray-300 ${
                  page === num ? "bg-blue text-white" : "hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}

            <span className="px-2">...</span>

            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-3 py-1 rounded border border-gray-300 ${
                page === totalPages ? "bg-blue text-white" : "hover:bg-gray-100"
              }`}
            >
              {totalPages}
            </button>

            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-100"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-100"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddDeal && <AddCarForm onClose={() => setShowAddDeal(false)} />}

      {selectedForView && (
        <SwapDealDetails
          deal={selectedForView}
          onClose={() => setSelectedForView(null)}
        />
      )}

      {selectedForDelete && (
        <BuyDealDetails
          deal={selectedForDelete}
          onClose={() => setSelectedForDelete(null)}
          onConfirm={() => {}}
        />
      )}
    </div>
  );
}
