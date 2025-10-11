"use client";
import { useState, useEffect } from "react";
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
import api from "@/utils/api"; // ✅ make sure this exists and points to your backend
import ProtectedRoute from "@/app/protectedroutes/protected";

export default function InspectionPage() {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [actionMenuOpenFor, setActionMenuOpenFor] = useState(null);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalInspections: 0,
  });

  const [page, setPage] = useState(1);

  // ✅ Fetch all inspections (Admin)
  const fetchInspections = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get(
        "http://localhost:5000/api/inspections/admin/all",
        {
          params: { page, limit: 7 },
        }
      );

      console.log("Fetched inspections:", res.data);

      setInspections(res.data?.inspections || []);
      setPagination(
        res.data?.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalInspections: 0,
        }
      );
    } catch (err) {
      console.error("Failed to fetch inspections:", err);
      setInspections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPage(newPage);
    fetchInspections(newPage);
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
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
              All Booking:{" "}
              <span className="text-gray-400">
                {pagination.totalInspections || 0}
              </span>
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
              {!loading &&
                inspections.map((item, i) => (
                  <tr
                    key={item._id}
                    className="border-b border-text-muted/70 last:border-b-0"
                  >
                    <td className="py-4">{(page - 1) * 7 + i + 1}</td>
                    <td className="py-4">{item.customer?.name || "—"}</td>

                    <td className="py-4 flex items-center gap-3">
                      <img
                        src={item.car?.images?.[0] || "/images/default-car.jpg"}
                        alt={item.car?.carName}
                        className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                      />
                      {item.car?.carName || "—"}
                    </td>

                    <td className="py-4 text-text-muted">
                      {item.car?.year || "—"}
                    </td>
                    <td className="py-4">{item.car?.condition || "—"}</td>
                    <td className="py-4 text-black/60">
                      {new Date(item.inspectionDate).toLocaleDateString()}{" "}
                      {item.timeSlot?.startTime
                        ? `${item.timeSlot.startTime} - ${item.timeSlot.endTime}`
                        : ""}
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "pending"
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
                            actionMenuOpenFor === item._id ? null : item._id
                          )
                        }
                      >
                        <MoreVertical size={18} />
                      </button>

                      {actionMenuOpenFor === item._id && (
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

              {loading && (
                <tr>
                  <td colSpan="8" className="py-6 text-center text-gray-500">
                    Loading inspections...
                  </td>
                </tr>
              )}
              {!loading && inspections.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-6 text-center text-gray-500">
                    No inspections found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500 gap-3">
            <div>
              Showing {(page - 1) * 7 + 1} to{" "}
              {Math.min(page * 7, pagination.totalInspections)} of{" "}
              {pagination.totalInspections} entries
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

              <span className="px-2">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <button
                onClick={() => handlePageChange(page + 1)}
                className="px-2 py-1 rounded border border-text-muted hover:bg-gray-100"
              >
                <ChevronRight size={16} />
              </button>
              <button
                onClick={() => handlePageChange(pagination.totalPages)}
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
    </ProtectedRoute>
  );
}
