"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import api from "@/utils/api";
import BookingDetailsModal from "../bookingdetails";

const statusColors = {
  confirmed: "text-green-600",
  pending: "text-yellow-500",
  cancelled: "text-red-600",
  completed: "text-green-700",
};

export default function MyInspectionsTable() {
  const [inspections, setInspections] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  // 🔹 Fetch inspections from real backend
  const fetchInspections = async (page = 1) => {
    setLoading(true);
    try {
      const res = await api.get(
        "http://localhost:5000/api/inspections/my-inspections",
        {
          params: { page, limit: 10 },
        }
      );
      console.log("Fetched inspections:", res.data);
      setInspections(res.data?.inspections || []);
      setPagination(res.data?.pagination || { currentPage: 1, totalPages: 1 });
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

  const filtered = inspections.filter((i) =>
    i.car?.carName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-4">My Bookings</h1>
        <p>View and manage your inspection appointments.</p>
      </div>

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
          <button
            onClick={() => fetchInspections(1)}
            className="w-full sm:w-auto px-4 py-2 bg-blue text-white rounded-lg"
          >
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
              {!loading &&
                filtered.map((insp) => (
                  <tr key={insp._id} className="border-b border-lightgrey">
                    <td className="flex items-center gap-2 px-4 py-4 min-w-[180px]">
                      <Image
                        src={insp.car?.images?.[0] || "/images/default-car.jpg"}
                        alt={insp.car?.carName || "Car"}
                        width={50}
                        height={50}
                        className="rounded-md w-[50px] h-[50px] object-cover"
                      />
                      <span className="truncate">{insp.car?.carName}</span>
                    </td>
                    <td className="px-4 py-2 text-text-muted min-w-[120px]">
                      {insp.car?.price
                        ? `₦${insp.car.price.toLocaleString()}`
                        : "—"}
                    </td>
                    <td className="px-4 py-2 text-text-muted min-w-[120px]">
                      {insp.car?.condition || "—"}
                    </td>
                    <td
                      className={`px-4 py-2 font-semibold min-w-[100px] ${
                        statusColors[insp.status] || "text-gray-600"
                      }`}
                    >
                      {insp.status}
                    </td>
                    <td className="px-4 py-2 text-text-muted min-w-[140px]">
                      {insp.inspectionDate
                        ? new Date(insp.inspectionDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-2 min-w-[120px]">
                      <button
                        className="px-3 py-1 bg-blue text-white text-sm rounded-lg"
                        onClick={() => setSelected(insp)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    Loading bookings...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 px-4">
          <button
            onClick={() =>
              pagination.currentPage > 1 &&
              fetchInspections(pagination.currentPage - 1)
            }
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-gray-600">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() =>
              pagination.currentPage < pagination.totalPages &&
              fetchInspections(pagination.currentPage + 1)
            }
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <BookingDetailsModal
          deal={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
