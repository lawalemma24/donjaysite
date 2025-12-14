"use client";

import { useState, useEffect } from "react";
import {
  MoreVertical,
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

import AddCarForm from "../components/addcar";
import BuyDealDetails from "./buydealdetails";
import dealsApi from "@/utils/dealsapi";

export default function Selldeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddDeal, setShowAddDeal] = useState(false);
  const [actionMenuOpenFor, setActionMenuOpenFor] = useState(null);
  const [selectedForView, setSelectedForView] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const pageSize = 7;

  // Fetch deals via Axios
  async function fetchDeals() {
    setLoading(true);
    setError(null);
    try {
      const params = {
        dealType: "sell",
        page,
        limit: pageSize,
      };
      if (searchQuery) params.search = searchQuery;
      if (statusFilter) params.status = statusFilter;

      const res = await dealsApi.get("/admin/all", { params });
      const data = res.data;

      if (Array.isArray(data.deals)) {
        setDeals(data.deals);
        setTotalPages(data.totalPages || 1);
        setTotalEntries(data.totalCount || data.deals.length);
      } else if (Array.isArray(data)) {
        setDeals(data);
        setTotalPages(1);
        setTotalEntries(data.length);
      } else {
        console.warn("⚠️ Unexpected API shape:", data);
        setDeals([]);
        setTotalPages(1);
        setTotalEntries(0);
      }
    } catch (err) {
      console.error("❌ Error fetching deals:", err);
      setError("Failed to load deals. Check console for details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDeals();
  }, [page, searchQuery, statusFilter]);

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  }

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

  // Unified action handler using Axios
  async function handleAction(dealId, actionType) {
    try {
      const body = {};
      if (actionType === "reject") body.rejectionReason = "Admin rejected";
      if (actionType === "complete") body.adminNote = "Completed";

      const res = await dealsApi.put(`/admin/${dealId}/${actionType}`, body);
      if (res.data?.message) fetchDeals();
    } catch (err) {
      console.error(`❌ Error performing ${actionType}:`, err);
    }
  }

  async function handleDelete(dealId) {
    try {
      const res = await dealsApi.delete(`/${dealId}`);
      if (res.data?.message) fetchDeals();
    } catch (err) {
      console.error("❌ Error deleting deal:", err);
    }
  }
  return (
    <div className="p-2 sm:p-6">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white w-64 text-sm focus:outline-none focus:border-blue"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Status filter buttons */}
          {["", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status || "all"}
              onClick={() => {
                setStatusFilter(status);
                setPage(1);
              }}
              className={`px-3 py-1 rounded border ${
                statusFilter === status
                  ? "bg-blue text-white border-blue"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {status
                ? status.charAt(0).toUpperCase() + status.slice(1)
                : "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white rounded-2xl shadow p-3 sm:p-4 overflow-x-auto">
        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading deals...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-6">{error}</div>
        ) : deals.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No deals found</div>
        ) : (
          <table className="w-full min-w-[700px] text-xs sm:text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-text-muted">
                <th className="py-3 w-[40px]">S/N</th>
                <th>Full Name</th>
                <th>Car Name</th>
                <th>Year</th>
                <th>Condition</th>
                <th>Price</th>
                <th>Status</th>
                <th>Date Listed</th>
                <th className="w-[60px]"></th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal, i) => (
                <tr
                  key={deal._id || i}
                  className="border-b border-text-muted/70 last:border-b-0"
                >
                  <td className="py-4">{(page - 1) * pageSize + i + 1}</td>
                  <td className="py-4 flex items-center gap-3">
                    <img
                      src={
                        deal.customer?.profilePic || "/images/default-car.png"
                      }
                      alt=""
                      className="w-10 h-10 rounded-full border border-text-muted/70 object-cover"
                    />
                    {deal.customer?.name || "-"}
                  </td>
                  <td className="py-4 text-black text-sm">
                    {deal.primaryCar?.carName || "-"}
                  </td>
                  <td className="py-4 text-text-muted">
                    {deal.primaryCar?.year || "-"}
                  </td>
                  <td className="py-4">{deal.primaryCar?.condition || "-"}</td>
                  <td className="py-4">{deal.formattedOfferPrice || "-"}</td>
                  <td className="py-4">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${getStatusColor(
                        deal.status
                      )}`}
                    >
                      {deal.status || "Pending"}
                    </div>
                  </td>
                  <td className="py-4 text-black/60">
                    {deal.createdAt?.slice(0, 10) || "-"}
                  </td>
                  <td className="py-4 relative">
                    <button
                      className="p-2 rounded-full hover:bg-gray-100"
                      onClick={() =>
                        setActionMenuOpenFor(
                          actionMenuOpenFor === deal._id ? null : deal._id
                        )
                      }
                    >
                      <MoreVertical size={18} />
                    </button>

                    {actionMenuOpenFor === deal._id && (
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
                          onClick={() => handleAction(deal._id, "reject")}
                        >
                          <Download size={16} className="text-gray-600" />
                          Reject Deal
                        </button>

                        <button
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                          onClick={() => handleAction(deal._id, "approve")}
                        >
                          <CheckCircle size={16} className="text-gray-600" />
                          Approve Deal
                        </button>

                        <button
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-red-600"
                          onClick={() => handleDelete(deal._id)}
                        >
                          <Trash2 size={16} className="text-red-600" />
                          Delete Deal
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Footer */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 gap-2 sm:gap-3">
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

            {[...Array(Math.min(3, totalPages))].map((_, idx) => {
              const num = idx + 1;
              return (
                <button
                  key={`page-${num}`}
                  onClick={() => handlePageChange(num)}
                  className={`px-3 py-1 rounded border border-text-muted ${
                    page === num ? "bg-blue text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {num}
                </button>
              );
            })}
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

      {showAddDeal && <AddCarForm onClose={() => setShowAddDeal(false)} />}
      {selectedForView && (
        <BuyDealDetails
          deal={selectedForView}
          onClose={() => setSelectedForView(null)}
        />
      )}
    </div>
  );
}
