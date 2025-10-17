"use client";

import { useState, useEffect } from "react";
import {
  MoreVertical,
  Filter,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
} from "lucide-react";
import FilterCard from "../components/FilterCard";
import AddUserModal from "../components/adduser";
import AddUserSuccess from "../components/addusersuccess";
import ViewUserModal from "../components/viewuser";
import DeleteUserConfirm from "../components/deleteuser";
import DeleteUserSuccess from "../components/deletesuccess";
import AddCarForm from "../components/addcar";
import ProtectedRoute from "@/app/protectedroutes/protected";
import api from "@/utils/api";
import toast from "react-hot-toast";

export default function CarListingPage() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [actionMenuOpenFor, setActionMenuOpenFor] = useState(null);
  const [selectedForView, setSelectedForView] = useState(null);
  const [selectedForDelete, setSelectedForDelete] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [page, setPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const pageSize = 7;

  async function getCarImage(carId) {
    try {
      const res = await api.get(`/cars/${carId}/image`);
      if (res.data && res.data.imageUrl) return res.data.imageUrl;
      return "/images/default-car.png";
    } catch {
      return "/images/default-car.png";
    }
  }

  async function fetchCars() {
    try {
      const res = await api.get(`/admin/all?page=${page}&limit=${pageSize}`);
      const carsData = res.data.cars || [];
      const carsWithImages = await Promise.all(
        carsData.map(async (car) => {
          const imageUrl = await getCarImage(car._id);
          return { ...car, imageUrl };
        })
      );
      setCars(carsWithImages);
      setTotalEntries(res.data.pagination?.totalCars || 0);
      setTotalPages(res.data.pagination?.totalPages || 1);
      setFilteredCars(carsWithImages);
    } catch (err) {
      console.error("Error fetching cars:", err);
    }
  }

  useEffect(() => {
    fetchCars();
  }, [page]);

  useEffect(() => {
    let filtered = cars;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (car) =>
          car.carName.toLowerCase().includes(term) ||
          car.year?.toString().includes(term) ||
          car.condition?.toLowerCase().includes(term)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (car) => car.status?.toLowerCase() === statusFilter
      );
    }

    setFilteredCars(filtered);
  }, [searchTerm, statusFilter, cars]);

  async function handleApprove(carId) {
    try {
      await api.put(`/admin/${carId}/approve`);
      toast.success("Car approved successfully");
      fetchCars();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error approving car");
    }
  }

  async function handleReject(carId) {
    try {
      const reason = prompt("Enter rejection reason (optional):") || "";
      await api.put(`/admin/${carId}/reject`, { reason });
      toast.success("Car rejected successfully");
      fetchCars();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error rejecting car");
    }
  }

  async function handleDelete(carId) {
    try {
      await api.delete(`/${carId}`);
      toast.success("Car deleted successfully");
      setSelectedForDelete(null);
      setDeleteSuccess(true);
      fetchCars();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting car");
    }
  }

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  }

  function statusColor(status) {
    switch (status?.toLowerCase()) {
      case "approved":
        return "text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-medium";
      case "pending":
        return "text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-xs font-medium";
      case "rejected":
        return "text-red-700 bg-red-100 px-3 py-1 rounded-full text-xs font-medium";
      default:
        return "text-gray-700 bg-gray-100 px-3 py-1 rounded-full text-xs font-medium";
    }
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="p-6">
        <div>
          <h1 className="text-3xl font-bold">Car Listing</h1>
          <p className="text-text-muted mt-1">
            Manage all cars available for sale and keep listings up to date
          </p>
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white px-3 py-4 rounded-md">
          <div className="flex items-center">
            <div className="text-lg font-semibold">
              All Listing: <span className="text-gray-400">{totalEntries}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white w-64 text-sm focus:outline-none focus:border-blue"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </div>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              onClick={() => setShowAddUser(true)}
              className="inline-flex items-center gap-2 bg-blue text-white px-4 py-2 rounded-lg shadow"
            >
              <Plus size={16} /> Add Car
            </button>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-text-muted">
                <th className="py-3 w-[40px]">S/N</th>
                <th>Full Name</th>
                <th>Year</th>
                <th>Condition</th>
                <th>Price</th>
                <th>Status</th>
                <th>Date Listed</th>
                <th className="w-[60px]"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No cars found
                  </td>
                </tr>
              ) : (
                filteredCars.map((car, i) => (
                  <tr
                    key={car._id || i}
                    className="border-b border-text-muted/70 last:border-b-0"
                  >
                    <td className="py-4">{(page - 1) * pageSize + i + 1}</td>
                    <td className="py-4 flex items-center gap-3">
                      <img
                        src={car.images || "/images/default-car.png"}
                        alt={car.carName}
                        className="w-10 h-10 rounded-full border border-text-muted/70 object-cover"
                      />
                      {car.carName}
                    </td>
                    <td className="py-4 text-text-muted">{car.year}</td>
                    <td className="py-4">{car.condition || "N/A"}</td>
                    <td className="py-4">{car.price || "N/A"}</td>
                    <td className="py-4">
                      <span className={statusColor(car.status)}>
                        {car.status || "N/A"}
                      </span>
                    </td>
                    <td className="py-4">
                      {new Date(car.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-4 relative">
                      <button
                        className="p-2 rounded-full hover:bg-gray-100"
                        onClick={() =>
                          setActionMenuOpenFor(
                            actionMenuOpenFor === car._id ? null : car._id
                          )
                        }
                      >
                        <MoreVertical size={18} />
                      </button>

                      {actionMenuOpenFor === car._id && (
                        <div className="absolute right-0 mt-2 z-50 bg-white border border-gray-200 rounded shadow w-40 text-sm">
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                            onClick={() => {
                              handleApprove(car._id);
                              setActionMenuOpenFor(null);
                            }}
                          >
                            <CheckCircle className="text-green-500 w-5 h-5" />
                            Approve Car
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                            onClick={() => {
                              handleReject(car._id);
                              setActionMenuOpenFor(null);
                            }}
                          >
                            <XCircle className="text-orange w-5 h-5" />
                            Reject Car
                          </button>
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-red-600"
                            onClick={() => {
                              setSelectedForDelete(car);
                              setActionMenuOpenFor(null);
                            }}
                          >
                            <Trash2 size={16} className="text-red-600" />
                            Delete Car
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500 gap-3">
            <div>
              Showing {(page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, totalEntries)} of {totalEntries}{" "}
              entries
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
                  page === totalPages
                    ? "bg-blue text-white"
                    : "hover:bg-gray-100"
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

        {showAddUser && <AddCarForm onClose={() => setShowAddUser(false)} />}
        {selectedForView && (
          <ViewUserModal
            user={selectedForView}
            onClose={() => setSelectedForView(null)}
          />
        )}
        {selectedForDelete && (
          <DeleteUserConfirm
            user={selectedForDelete}
            onClose={() => setSelectedForDelete(null)}
            onConfirm={() => handleDelete(selectedForDelete._id)}
          />
        )}
        {deleteSuccess && (
          <DeleteUserSuccess onClose={() => setDeleteSuccess(false)} />
        )}
      </div>
    </ProtectedRoute>
  );
}
