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
  CheckCircle,
  Check,
  Eye,
} from "lucide-react";
import SetInspection from "../components/setinspection";
import InspectionDetails from "../components/inspectiondetails";
import api from "@/utils/api";
import ProtectedRoute from "@/app/protectedroutes/protected";
import axios from "axios";

export default function InspectionPage() {
  const [inspections, setInspections] = useState([]);
  const [filteredInspections, setFilteredInspections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [actionMenuOpenFor, setActionMenuOpenFor] = useState(null);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalInspections: 0,
  });
  const [page, setPage] = useState(1);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  // ✅ Fetch inspections
  const fetchInspections = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get(
        "https://donjay-server.vercel.app/api/inspections/admin/all",
        { params: { page, limit: 7 } }
      );
      const data = res.data?.inspections || [];
      setInspections(data);
      setFilteredInspections(data);
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
      setFilteredInspections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspections(page);
  }, [page]);

  // ✅ Search + Filter logic
  useEffect(() => {
    let data = [...inspections];

    if (filterStatus !== "all") {
      data = data.filter((item) => item.status === filterStatus);
    }

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      data = data.filter(
        (item) =>
          item.customer?.name?.toLowerCase().includes(lower) ||
          item.car?.carName?.toLowerCase().includes(lower)
      );
    }

    setFilteredInspections(data);
  }, [searchTerm, filterStatus, inspections]);

  // ✅ Pagination control
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPage(newPage);
  };

  // ✅ Confirm inspection
  const handleConfirmInspection = async (inspectionId) => {
    try {
      await axios.put(
        `https://donjay-server.vercel.app/api/inspections/admin/${inspectionId}/confirm`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchInspections(page);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to confirm inspection");
    }
  };

  // ✅ Mark as completed
  const handleMarkCompleted = async (inspectionId) => {
    try {
      await axios.put(
        `https://donjay-server.vercel.app/api/inspections/admin/${inspectionId}/complete`,
        {
          inspectionReport: {
            overallCondition: "good",
            exteriorCondition: "good",
            interiorCondition: "excellent",
            engineCondition: "fair",
            issues: ["Front tire wear"],
            recommendations: ["Replace tires soon"],
            images: ["report1.jpg"],
            estimatedValue: 23000,
          },
          inspectorNotes: "Comprehensive inspection completed.",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchInspections(page);
    } catch (error) {
      alert(error.response?.data?.error || "Failed to mark as completed");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      {/* Responsive layout adjustments */}
      <div className="p-2 sm:p-6">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold">All Bookings</h1>
        <p className="text-text-muted mt-1 text-sm sm:text-base">
          Manage all inspection bookings and their progress
        </p>

        {/* Toolbar */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 bg-white px-3 py-4 rounded-md">
          <div className="text-base sm:text-lg font-semibold">
            All Bookings:{" "}
            <span className="text-gray-400">
              {filteredInspections.length || 0}
            </span>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Search by user or car"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white w-full sm:w-64 text-sm focus:outline-none"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="inline-flex items-center gap-1 sm:gap-2 border border-gray-300 px-3 py-2 rounded-lg bg-white hover:bg-gray-50 text-sm"
              >
                <Filter size={16} /> Filter
              </button>

              {showFilter && (
                <div className="absolute right-0 mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-36 sm:w-40">
                  <ul className="text-sm text-gray-700">
                    {["all", "pending", "confirmed", "completed"].map(
                      (status) => (
                        <li
                          key={status}
                          onClick={() => {
                            setFilterStatus(status);
                            setShowFilter(false);
                          }}
                          className={`px-3 sm:px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                            filterStatus === status
                              ? "font-semibold text-blue-600"
                              : ""
                          }`}
                        >
                          {status === "all"
                            ? "All"
                            : status.charAt(0).toUpperCase() + status.slice(1)}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-4 sm:mt-6 bg-white rounded-2xl shadow p-3 sm:p-4 overflow-x-auto">
          <table className="w-full min-w-[850px] sm:min-w-[950px] text-xs sm:text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="py-2 sm:py-3 w-[35px] sm:w-[40px]">S/N</th>
                <th>User</th>
                <th>Car</th>
                <th>Year</th>
                <th>Condition</th>
                <th>Date and Time</th>
                <th>Status</th>
                <th className="w-[50px] sm:w-[60px]"></th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                filteredInspections.map((item, i) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-100 last:border-none"
                  >
                    <td className="py-3 sm:py-4">{(page - 1) * 7 + i + 1}</td>
                    <td className="text-gray-700 truncate max-w-[120px] sm:max-w-none">
                      {item.customer?.name || "—"}
                    </td>
                    <td className="flex items-center gap-2 sm:gap-3 py-3 sm:py-4">
                      <img
                        src={item.car?.images?.[0] || "/images/default-car.jpg"}
                        alt={item.car?.carName}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 object-cover"
                      />
                      <span className="truncate max-w-[120px] sm:max-w-none">
                        {item.car?.carName || "—"}
                      </span>
                    </td>
                    <td>{item.car?.year || "—"}</td>
                    <td>{item.car?.condition || "—"}</td>
                    <td className="text-xs sm:text-sm">
                      {new Date(item.inspectionDate).toLocaleDateString()}{" "}
                      {item.timeSlot
                        ? `${item.timeSlot.startTime} - ${item.timeSlot.endTime}`
                        : ""}
                    </td>
                    <td>
                      <span
                        className={`px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-full ${
                          item.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : item.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="relative">
                      <button
                        className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100"
                        onClick={() =>
                          setActionMenuOpenFor(
                            actionMenuOpenFor === item._id ? null : item._id
                          )
                        }
                      >
                        <MoreVertical size={16} />
                      </button>

                      {actionMenuOpenFor === item._id && (
                        <div className="absolute right-0 mt-1 sm:mt-2 z-50 bg-white border border-gray-200 rounded-lg shadow-lg w-40 sm:w-48 text-xs sm:text-sm">
                          <button
                            onClick={() => {
                              setSelectedInspection(item);
                              setActionMenuOpenFor(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                          >
                            <Eye size={14} /> View Details
                          </button>

                          {item.status === "pending" && (
                            <button
                              onClick={() => {
                                handleConfirmInspection(item._id);
                                setActionMenuOpenFor(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-blue-600"
                            >
                              <Check size={14} /> Confirm
                            </button>
                          )}

                          {item.status === "confirmed" && (
                            <button
                              onClick={() => {
                                handleMarkCompleted(item._id);
                                setActionMenuOpenFor(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-green-600"
                            >
                              <CheckCircle size={14} /> Complete
                            </button>
                          )}
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
              {!loading && filteredInspections.length === 0 && (
                <tr>
                  <td colSpan="8" className="py-6 text-center text-gray-500">
                    No inspections found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Footer */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 gap-2 sm:gap-3">
            <div>
              Showing {(page - 1) * 7 + 1} to{" "}
              {Math.min(page * 7, pagination.totalInspections)} of{" "}
              {pagination.totalInspections} entries
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
              <button
                onClick={() => handlePageChange(1)}
                className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-100"
              >
                <ChevronsLeft size={14} />
              </button>
              <button
                onClick={() => handlePageChange(page - 1)}
                className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-100"
              >
                <ChevronLeft size={14} />
              </button>
              <span>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-100"
              >
                <ChevronRight size={14} />
              </button>
              <button
                onClick={() => handlePageChange(pagination.totalPages)}
                className="px-2 py-1 rounded border border-gray-300 hover:bg-gray-100"
              >
                <ChevronsRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {showAdd && <SetInspection onClose={() => setShowAdd(false)} />}
        {selectedInspection && (
          <InspectionDetails
            deal={selectedInspection}
            onClose={() => setSelectedInspection(null)}
            onMarkCompleted={handleMarkCompleted}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}
