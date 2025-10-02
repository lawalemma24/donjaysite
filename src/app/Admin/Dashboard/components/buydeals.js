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
} from "lucide-react";
import FilterCard from "../components/FilterCard";

import AddCarForm from "../components/addcar";
import { Eye, Download, CheckCircle, Trash2 } from "lucide-react";
import BuyDealDetails from "./buydealdetails";

const initialdeals = [
  {
    id: 1,
    name: "Volks Wagon",
    year: "2022",
    condition: "Brand New",
    price: "90,000,000",
    listed: "Sept. 10, 2025",
    avatar: "/images/vw-golf.png",
  },
  {
    id: 2,
    name: "Toyota Camry",
    year: "2012",
    condition: "Brand New",
    price: "70,000,000",
    listed: "Sept. 10, 2025",
    avatar: "/images/toyota-camry.png",
  },
  {
    id: 3,
    name: "Mercedes Gle",
    year: "2021",
    condition: "Brand New",
    price: "78,000,000",
    listed: "Sept. 10, 2025",
    avatar: "/images/gle.png",
  },
  {
    id: 4,
    name: "Toyota Lexus",
    year: "2017",
    condition: "Used",
    price: "67,000,000",
    listed: "Sept. 10, 2025",
    avatar: "/images/lexus-rx.png",
  },
  {
    id: 5,
    name: "Nissan Maxima",
    year: "2026",
    condition: "Brand New",
    price: "74,000,000",
    listed: "Sept. 10, 2025",
    avatar: "/images/nissan-maxima.png",
  },
  {
    id: 6,
    name: "Mercedes Gle",
    year: "2025",
    condition: "Used",
    price: "50,000,000",
    listed: "Sept. 10, 2025",
    avatar: "/images/gle.png",
  },
  {
    id: 7,
    name: "Toyota Lexus",
    year: "2020",
    condition: "Brand New",
    price: "70,000,000",
    listed: "Sept. 10, 2025",
    avatar: "/images/lexus-rx.png",
  },
];

export default function Buydeals() {
  const [deals, setdeals] = useState(initialdeals);
  const [showFilter, setShowFilter] = useState(false);
  const [showAdddeal, setShowAdddeal] = useState(false);
  const [showAdddealSuccess, setShowAdddealSuccess] = useState(false);
  const [actionMenuOpenFor, setActionMenuOpenFor] = useState(null);
  const [selectedForView, setSelectedForView] = useState(null);
  const [selectedForSuspend, setSelectedForSuspend] = useState(null);
  const [selectedForDelete, setSelectedForDelete] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [suspendSuccess, setSuspendSuccess] = useState(false);

  // pagination (UI only)
  const totalEntries = 120;
  const pageSize = 7;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const [page, setPage] = useState(1);

  const paginateddeals = deals.slice((page - 1) * pageSize, page * pageSize);

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
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white w-64 text-sm focus:outline-none focus:ring-none focus:border-blue"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </div>
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            onClick={() => setShowFilter((s) => !s)}
            className="inline-flex items-center gap-2 border border-text-muted/60 px-3 py-2 rounded-lg bg-white hover:bg-gray-50"
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
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-text-muted">
              <th className="py-3 w-[40px]">S/N</th>
              <th>Full Name</th>
              <th>Year</th>
              <th>Condition</th>
              <th>Price</th>
              <th>Date Listed</th>
              <th className="w-[60px]"></th>
            </tr>
          </thead>
          <tbody>
            {paginateddeals.map((deal, i) => (
              <tr
                key={deal.id}
                className="border-b border-text-muted/70 last:border-b-0"
              >
                <td className="py-4">{(page - 1) * pageSize + i + 1}</td>
                <td className="py-4 flex items-center gap-3">
                  <img
                    src={deal.avatar}
                    alt={deal.name}
                    className="w-10 h-10 rounded-full border border-text-muted/70 object-cover"
                  />
                  {deal.name}
                </td>
                <td className="py-4 text-text-muted">{deal.year}</td>
                <td className="py-4">{deal.condition}</td>

                <td className="py-4">{deal.price}</td>

                <td className="py-4 text-black/60">{deal.listed}</td>
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
                    <div className="absolute right-0 mt-2 z-50 bg-white border border-gray-200 rounded shadow w-60 text-sm">
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

                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setSelectedForView(deal);
                          setActionMenuOpenFor(null);
                        }}
                      >
                        <Download size={16} className="text-gray-600" />
                        Download Receipt
                      </button>

                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                        onClick={() => {
                          setSelectedForView(deal);
                          setActionMenuOpenFor(null);
                        }}
                      >
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
              className="px-2 py-1 rounded border border-text-muted hover:bg-gray-100"
            >
              <ChevronsLeft size={16} />
            </button>
            <button
              onClick={() => handlePageChange(page - 1)}
              className="px-2 py-1 rounded border border-text-muted hover:bg-gray-100"
            >
              <ChevronLeft size={16} />
            </button>

            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`px-3 py-1 rounded border border-text-muted ${
                  page === num ? "bg-blue text-white" : "hover:bg-gray-100"
                }`}
              >
                {num}
              </button>
            ))}
            <span className="px-2">...</span>
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-3 py-1 rounded border border-text-muted ${
                page === totalPages ? "bg-blue text-white" : "hover:bg-gray-100"
              }`}
            >
              {totalPages}
            </button>

            <button
              onClick={() => handlePageChange(page + 1)}
              className="px-2 py-1 rounded border border-text-muted hover:bg-gray-100"
            >
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-2 py-1 rounded border border-text-muted hover:bg-gray-100"
            >
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Keep your modals and functionality */}
      {showAdddeal && <AddCarForm onClose={() => setShowAdddeal(false)} />}

      {selectedForView && (
        <BuyDealDetails
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
      {deleteSuccess && (
        <BuyDealDetails onClose={() => setDeleteSuccess(false)} />
      )}
    </div>
  );
}
