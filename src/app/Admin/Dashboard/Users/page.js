// app/(whatever)/UserManagementPage.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  MoreVertical,
  Filter,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import FilterCard from "../components/FilterCard";
import AddUserModal from "../components/adduser";
import AddUserSuccess from "../components/addusersuccess";
import ViewUserModal from "../components/viewuser";
import SuspendUserConfirm from "../components/suspenduser";
import DeleteUserConfirm from "../components/deleteuser";
import SuspendUserSuccess from "../components/suspendsuccess";
import DeleteUserSuccess from "../components/deletesuccess";
import { Eye, Ban, Trash2 } from "lucide-react";
import ProtectedRoute from "@/app/protectedroutes/protected";
import { apiUrl } from "@/utils/apihelper";

const BASE = apiUrl("/api/users");

export default function UserManagementPage() {
  // get token from localStorage
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [users, setUsers] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddUserSuccess, setShowAddUserSuccess] = useState(false);
  const [actionMenuOpenFor, setActionMenuOpenFor] = useState(null);
  const [selectedForView, setSelectedForView] = useState(null);
  const [selectedForSuspend, setSelectedForSuspend] = useState(null);
  const [selectedForDelete, setSelectedForDelete] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [suspendSuccess, setSuspendSuccess] = useState(false);

  // pagination
  const [totalEntries, setTotalEntries] = useState(0);
  const pageSize = 7;
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // search + filter
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchIdRef = useRef(0);

  function mapServerUserToUI(u) {
    return {
      id: u._id,
      name: u.name || u.username || "No name",
      email: u.email || "",
      phone: u.phoneNumber || u.phone || u.whatsapp || "—",
      status: u.isSuspended ? "Suspended" : "Active",
      joined: u.createdAt ? formatJoined(u.createdAt) : "Unknown",
      avatar: u.profilePic || "/images/testimonial1.png",
      __raw: u,
    };
  }

  function formatJoined(dateString) {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  }

  // fetch users
  async function fetchUsers(opts = {}) {
    const currentFetchId = ++fetchIdRef.current;
    setLoading(true);
    setError(null);

    const p = opts.page ?? page;
    const limit = opts.limit ?? pageSize;
    const q = new URLSearchParams();
    q.set("page", p);
    q.set("limit", limit);
    if ((opts.search ?? search)?.trim())
      q.set("search", (opts.search ?? search).trim());
    if ((opts.role ?? roleFilter)?.trim())
      q.set("role", opts.role ?? roleFilter);

    try {
      const res = await fetch(`${BASE}?${q.toString()}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed to fetch users: ${res.status} ${txt}`);
      }

      const data = await res.json();

      if (currentFetchId !== fetchIdRef.current) return;

      const serverUsers = Array.isArray(data.users) ? data.users : [];
      const uiUsers = serverUsers.map(mapServerUserToUI);
      setUsers(uiUsers);

      if (data.pagination) {
        setTotalEntries(data.pagination.totalUsers ?? serverUsers.length ?? 0);
        setTotalPages(
          data.pagination.totalPages ??
            Math.ceil(
              (data.pagination.totalUsers ?? serverUsers.length ?? 0) / pageSize
            )
        );
        setPage(data.pagination.currentPage ?? p);
      } else {
        setTotalEntries(serverUsers.length);
        setTotalPages(Math.max(1, Math.ceil(serverUsers.length / pageSize)));
        setPage(p);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Unknown error");
      setUsers([]);
      setTotalEntries(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers({ page, limit: pageSize, search, role: roleFilter });
  }, [page, search, roleFilter, token]);

  useEffect(() => {
    const id = setTimeout(() => {}, 300);
    return () => clearTimeout(id);
  }, [search]);

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  }

  async function handleViewUser(id) {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/${id}`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed to fetch user: ${res.status} ${txt}`);
      }
      const data = await res.json();
      if (data.user) {
        const u = mapServerUserToUI(data.user);
        const fullUser = {
          ...u,
          phone: data.user.phoneNumber || data.user.phone || u.phone,
          whatsapp: data.user.whatsapp || "",
          address: data.user.address || "",
          avatar: data.user.profilePic || u.avatar,
          __raw: data.user,
        };
        setSelectedForView(fullUser);
      } else {
        throw new Error("Malformed response from server");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  }

  async function handleSuspendConfirm(id) {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/${id}/suspend`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed to suspend user: ${res.status} ${txt}`);
      }
      const data = await res.json();

      if (data.user && data.user._id) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === data.user._id
              ? {
                  ...u,
                  status: data.user.isSuspended ? "Suspended" : "Active",
                  __raw: { ...(u.__raw || {}), ...data.user },
                }
              : u
          )
        );
      } else {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === id
              ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" }
              : u
          )
        );
      }

      setSelectedForSuspend(null);
      setSuspendSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to suspend user");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteConfirm(id) {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE}/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed to delete user: ${res.status} ${txt}`);
      }
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setSelectedForDelete(null);
      setDeleteSuccess(true);
      setTotalEntries((t) => Math.max(0, t - 1));
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  }

  function handleInvite(email) {
    if (!email) return;
    const tempId = `invited-${Date.now()}`;
    const tempUser = {
      id: tempId,
      name: email.split("@")[0] || email,
      email,
      phone: "—",
      status: "Active",
      joined: "Invited",
      avatar: "/images/testimonial1.png",
      __raw: { invited: true, email },
    };
    setUsers((prev) => [tempUser, ...prev]);
    setShowAddUser(false);
    setShowAddUserSuccess(true);
  }

  const paginatedUsers = users.slice(0, pageSize);

  // --- UI below is 100% unchanged ---
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="p-1 md:p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-text-muted mt-1">
            View and manage all registered users
          </p>
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white px-3 py-4 rounded-md">
          <div className="flex items-center">
            <div className="text-lg font-semibold">
              All Users:{" "}
              <span className="text-gray-400">
                {loading ? "Loading..." : totalEntries}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
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
                className="w-full sm:w-auto inline-flex justify-center items-center gap-2 border border-text-muted/60 px-3 py-2 rounded-lg bg-white hover:bg-gray-50"
              >
                <Filter size={16} /> Filter
              </button>
              {showFilter && (
                <div className="absolute right-0 mt-2 z-50">
                  <FilterCard onClose={() => setShowFilter(false)} />
                </div>
              )}
            </div>

            {/* Add User */}
            <button
              onClick={() => setShowAddUser(true)}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-blue text-white px-4 py-2 rounded-lg shadow"
            >
              <Plus size={16} /> Add User
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 bg-white rounded shadow p-4 overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-text-muted">
                <th className="py-3 w-[40px]">S/N</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Joined Date</th>
                <th className="w-[60px]"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, i) => (
                <tr
                  key={user.id}
                  className="border-b border-text-muted/70 last:border-b-0"
                >
                  <td className="py-4">{(page - 1) * pageSize + i + 1}</td>
                  <td className="py-4 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full border border-text-muted/70 object-cover"
                    />
                    {user.name}
                  </td>
                  <td className="py-4 text-text-muted">{user.email}</td>
                  <td className="py-4">{user.phone}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 text-black/60">{user.joined}</td>
                  <td className="py-4 relative">
                    <button
                      className="p-2 rounded-full hover:bg-gray-100"
                      onClick={() =>
                        setActionMenuOpenFor(
                          actionMenuOpenFor === user.id ? null : user.id
                        )
                      }
                    >
                      <MoreVertical size={18} />
                    </button>

                    {actionMenuOpenFor === user.id && (
                      <div className="absolute right-0 mt-2 z-50 bg-white border border-gray-200 rounded shadow w-40 text-sm">
                        <button
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                          onClick={() => {
                            handleViewUser(user.id);
                            setActionMenuOpenFor(null);
                          }}
                        >
                          <Eye size={16} className="text-gray-600" />
                          View
                        </button>

                        {user.status !== "Suspended" && (
                          <button
                            className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                            onClick={() => {
                              setSelectedForSuspend(user);
                              setActionMenuOpenFor(null);
                            }}
                          >
                            <Ban size={16} className="text-gray-600" />
                            Suspend
                          </button>
                        )}

                        <button
                          className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-red-600"
                          onClick={() => {
                            setSelectedForDelete(user);
                            setActionMenuOpenFor(null);
                          }}
                        >
                          <Trash2 size={16} className="text-red-600" />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {paginatedUsers.length === 0 && !loading && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Footer */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-500 gap-3">
            <div>
              Showing {(page - 1) * pageSize + (paginatedUsers.length ? 1 : 0)}{" "}
              to {Math.min(page * pageSize, totalEntries)} of {totalEntries}{" "}
              entries
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

              {Array.from({ length: Math.min(3, totalPages) }).map((_, idx) => {
                let num = idx + 1;
                if (totalPages > 3) {
                  if (page === 1) num = idx + 1;
                  else if (page === totalPages) num = totalPages - 2 + idx;
                  else num = Math.max(1, page - 1) + idx;
                } else {
                  num = idx + 1;
                }
                if (num < 1 || num > totalPages) return null;
                return (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`px-3 py-1 rounded border border-text-muted ${
                      page === num ? "bg-blue text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    {num}
                  </button>
                );
              })}

              {totalPages > 3 && <span className="px-2">...</span>}

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

        {/* Modals */}
        {showAddUser && (
          <AddUserModal
            onClose={() => setShowAddUser(false)}
            onInvite={handleInvite}
          />
        )}
        {showAddUserSuccess && (
          <AddUserSuccess onClose={() => setShowAddUserSuccess(false)} />
        )}
        {selectedForView && (
          <ViewUserModal
            user={selectedForView}
            onClose={() => setSelectedForView(null)}
          />
        )}
        {selectedForSuspend && (
          <SuspendUserConfirm
            user={selectedForSuspend}
            onClose={() => setSelectedForSuspend(null)}
            onConfirm={() => handleSuspendConfirm(selectedForSuspend.id)}
          />
        )}
        {suspendSuccess && (
          <SuspendUserSuccess onClose={() => setSuspendSuccess(false)} />
        )}
        {selectedForDelete && (
          <DeleteUserConfirm
            user={selectedForDelete}
            onClose={() => setSelectedForDelete(null)}
            onConfirm={() => handleDeleteConfirm(selectedForDelete.id)}
          />
        )}
        {deleteSuccess && (
          <DeleteUserSuccess onClose={() => setDeleteSuccess(false)} />
        )}

        {loading && (
          <div className="mt-3 text-sm text-gray-500">Loading...</div>
        )}
        {error && (
          <div className="mt-3 text-sm text-red-600">Error: {error}</div>
        )}
      </div>
    </ProtectedRoute>
  );
}
