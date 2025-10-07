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
  Edit,
  Trash2,
  CheckCircle,
} from "lucide-react";
import FilterCard from "../components/FilterCard";
import AddCarForm from "../components/addcar";
import SetInspection from "../components/setinspection";
import InspectionDetails from "../components/inspectiondetails";

const initialInspections = [
  {
    id: 1,
    user: "Don Jay",
    car: "Mercedes Benz GLE",
    year: "2025",
    condition: "Brand New",
    datetime: "Sept. 10, 2025 2:00PM to 2:40PM",
    status: "Completed",
    avatar: "/images/gle.png",
  },
  {
    id: 2,
    user: "Don Jay",
    car: "Mercedes Benz GLE",
    year: "2025",
    condition: "Brand New",
    datetime: "Sept. 10, 2025 2:00PM to 2:40PM",
    status: "Pending",
    avatar: "/images/gle.png",
  },
  {
    id: 3,
    user: "Don Jay",
    car: "Mercedes Benz GLE",
    year: "2025",
    condition: "Brand New",
    datetime: "Sept. 10, 2025 2:00PM to 2:40PM",
    status: "Cancelled",
    avatar: "/images/gle.png",
  },
  {
    id: 4,
    user: "Don Jay",
    car: "Mercedes Benz GLE",
    year: "2025",
    condition: "Brand New",
    datetime: "Sept. 10, 2025 2:00PM to 2:40PM",
    status: "Completed",
    avatar: "/images/gle.png",
  },
  {
    id: 5,
    user: "Don Jay",
    car: "Mercedes Benz GLE",
    year: "2025",
    condition: "Brand New",
    datetime: "Sept. 10, 2025 2:00PM to 2:40PM",
    status: "Pending",
    avatar: "/images/gle.png",
  },
  {
    id: 6,
    user: "Don Jay",
    car: "Mercedes Benz GLE",
    year: "2025",
    condition: "Brand New",
    datetime: "Sept. 10, 2025 2:00PM to 2:40PM",
    status: "Cancelled",
    avatar: "/images/gle.png",
  },
  {
    id: 7,
    user: "Don Jay",
    car: "Mercedes Benz GLE",
    year: "2025",
    condition: "Brand New",
    datetime: "Sept. 10, 2025 2:00PM to 2:40PM",
    status: "Completed",
    avatar: "/images/gle.png",
  },
];

export default function InspectionPage() {
  const [inspections, setInspections] = useState(initialInspections);
  const [showFilter, setShowFilter] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [actionMenuOpenFor, setActionMenuOpenFor] = useState(null);
  const [selectedInspection, setSelectedInspection] = useState(null);

  const totalEntries = 120;
  const pageSize = 7;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const [page, setPage] = useState(1);

  const paginated = inspections.slice((page - 1) * pageSize, page * pageSize);

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">All Booking</h1>
        <p className="text-text-muted mt-1">
          Manage all inspection bookings and their progress
        </p>
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white px-3 py-4 rounded-md">
        <div className="flex items-center">
          <div className="text-lg font-semibold">
            All Booking: <span className="text-gray-400">{totalEntries}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white w-64 text-sm focus:outline-none"
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

          {/* Add */}
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 bg-blue text-white px-4 py-2 rounded-lg shadow"
          >
            + Set Inspection Timing
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white rounded-2xl shadow p-4 overflow-x-auto">
        <table className="w-full min-w-[950px] text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-text-muted">
              <th className="py-3 w-[40px]">S/N</th>
              <th>User</th>
              <th>Car</th>
              <th>Year</th>
              <th>Condition</th>
              <th>Date and Time</th>
              <th>Status</th>
              <th className="w-[60px]"></th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, i) => (
              <tr
                key={item.id}
                className="border-b border-text-muted/70 last:border-b-0"
              >
                <td className="py-4">{(page - 1) * pageSize + i + 1}</td>
                <td className="py-4">{item.user}</td>

                <td className="py-4 flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.car}
                    className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                  />
                  {item.car}
                </td>

                <td className="py-4 text-text-muted">{item.year}</td>
                <td className="py-4">{item.condition}</td>
                <td className="py-4 text-black/60">{item.datetime}</td>

                <td className="py-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="py-4 relative">
                  <button
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() =>
                      setActionMenuOpenFor(
                        actionMenuOpenFor === item.id ? null : item.id
                      )
                    }
                  >
                    <MoreVertical size={18} />
                  </button>

                  {actionMenuOpenFor === item.id && (
                    <div className="absolute right-0 mt-2 z-50 bg-white border border-gray-200 rounded shadow w-44 text-sm">
                      <button
                        onClick={() => {
                          setSelectedInspection(item);
                          setActionMenuOpenFor(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                      >
                        <Search size={16} className="text-gray-600" />
                        View Details
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                        <Edit size={16} className="text-blue-600" />
                        Reschedule Inspection
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                        <CheckCircle className="text-green-600" size={16} />
                        Mark as Completed
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-red-600">
                        <Trash2 size={16} />
                        Cancel Request
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500 gap-3">
          <div>
            Showing {(page - 1) * pageSize + 1} to{" "}
            {Math.min(page * pageSize, totalEntries)} of {totalEntries} entries
          </div>

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

      {showAdd && <SetInspection onClose={() => setShowAdd(false)} />}
      {selectedInspection && (
        <InspectionDetails
          deal={selectedInspection}
          onClose={() => setSelectedInspection(null)}
        />
      )}
    </div>
  );
}
