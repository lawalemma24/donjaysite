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
import ProtectedRoute from "@/app/protectedroutes/protected";

// Sample initial transactions
const initialTransactions = [];

export default function TransactionPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showFilter, setShowFilter] = useState(false);
  const [actionMenuOpenFor, setActionMenuOpenFor] = useState(null);

  const totalEntries = transactions.length;
  const pageSize = 7;
  const totalPages = Math.ceil(totalEntries / pageSize);
  const [page, setPage] = useState(1);

  const paginated = transactions.slice((page - 1) * pageSize, page * pageSize);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="p-1 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">All Transactions</h1>
          <div className="text-gray-400 text-sm mt-1 md:mt-0">
            Total: {totalEntries}
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex flex-wrap md:flex-row md:items-center md:justify-between gap-4 bg-white px-3 py-4 rounded-md">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white w-full sm:w-64 text-sm focus:outline-none focus:ring-0 focus:border-blue"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </div>
            </div>

            {/* Filter */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setShowFilter((s) => !s)}
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 border border-gray-200 px-3 py-2 rounded-lg bg-white hover:bg-gray-50"
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

          {/* Right side - export button */}
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Export As
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 bg-white rounded shadow p-4 overflow-x-auto">
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <CheckCircle size={48} className="mb-4 text-gray-300" />
              <p className="text-lg font-medium">No transactions yet</p>
              <p className="text-sm mt-1">
                Once the buy deals are up, your transactions will appear here.
              </p>
            </div>
          ) : (
            <table className="w-full min-w-[950px] text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200">
                  <th className="py-3">TXN ID</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Car</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="w-[60px]"></th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((txn) => (
                  <tr
                    key={txn.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 font-medium text-gray-700">{txn.id}</td>
                    <td className="py-4">{txn.user}</td>
                    <td className="py-4">{txn.type}</td>
                    <td className="py-4">{txn.car}</td>
                    <td className="py-4">{txn.amount}</td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClass(
                          txn.status
                        )}`}
                      >
                        {txn.status}
                      </span>
                    </td>
                    <td className="py-4">{txn.date}</td>
                    <td className="py-4 relative">
                      <button
                        className="p-2 rounded-full hover:bg-gray-100"
                        onClick={() =>
                          setActionMenuOpenFor(
                            actionMenuOpenFor === txn.id ? null : txn.id
                          )
                        }
                      >
                        <MoreVertical size={18} />
                      </button>

                      {actionMenuOpenFor === txn.id && (
                        <div className="absolute right-0 mt-2 z-50 bg-white border border-gray-200 rounded shadow w-44 text-sm">
                          <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                            <Eye size={16} className="text-gray-600" />
                            View Details
                          </button>
                          <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100">
                            <Download size={16} className="text-gray-600" />
                            Download Receipt
                          </button>
                          <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-green-600">
                            <CheckCircle size={16} />
                            Mark as Completed
                          </button>
                          <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-red-600">
                            <Trash2 size={16} />
                            Delete Record
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Footer Pagination */}
          {paginated.length > 0 && (
            <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500 gap-3">
              <div>
                Showing {(page - 1) * pageSize + 1} to{" "}
                {Math.min(page * pageSize, totalEntries)} of {totalEntries}{" "}
                entries
              </div>

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
                    className={`px-3 py-1 rounded border ${
                      page === num
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <span className="px-2">...</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`px-3 py-1 rounded border ${
                    page === totalPages
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-gray-100"
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
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
