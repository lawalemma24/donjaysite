"use client";

import { useState } from "react";
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

const initialUsers = [
  {
    id: 1,
    name: "Don Jay",
    email: "donjayauto@gmail.com",
    phone: "08123456789",
    status: "Active",
    joined: "Sept. 10, 2025",
    avatar: "/images/testimonial3.png",
  },
  {
    id: 2,
    name: "Mira David",
    email: "miradavid@gmail.com",
    phone: "08123456789",
    status: "Active",
    joined: "Sept. 10, 2025",
    avatar: "/images/testimonial2.png",
  },
  {
    id: 3,
    name: "John Walter",
    email: "johnwalter@gmail.com",
    phone: "08123456789",
    status: "Active",
    joined: "Sept. 10, 2025",
    avatar: "/images/testimonial1.png",
  },
  {
    id: 4,
    name: "Sandra John",
    email: "sandrajohn@gmail.com",
    phone: "08123456789",
    status: "Suspended",
    joined: "Sept. 10, 2025",
    avatar: "/images/testimonial3.png",
  },
  {
    id: 5,
    name: "Peter Felix",
    email: "peterfelix@gmail.com",
    phone: "08123456789",
    status: "Active",
    joined: "Sept. 10, 2025",
    avatar: "/images/testimonial1.png",
  },
  {
    id: 6,
    name: "Simon Lex",
    email: "simonlex@gmail.com",
    phone: "08123456789",
    status: "Suspended",
    joined: "Sept. 10, 2025",
    avatar: "/images/testimonial2.png",
  },
  {
    id: 7,
    name: "Sarah Timothy",
    email: "sarahtimothy@gmail.com",
    phone: "08123456789",
    status: "Active",
    joined: "Sept. 10, 2025",
    avatar: "/images/testimonial3.png",
  },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState(initialUsers);
  const [showFilter, setShowFilter] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddUserSuccess, setShowAddUserSuccess] = useState(false);
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

  const paginatedUsers = users.slice((page - 1) * pageSize, page * pageSize);

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  }

  return (
    <div className="p-6">
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
            All Users: <span className="text-gray-400">{totalEntries}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
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

          {/* Add User */}
          <button
            onClick={() => setShowAddUser(true)}
            className="inline-flex items-center gap-2 bg-blue text-white px-4 py-2 rounded-lg shadow"
          >
            <Plus size={16} /> Add User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 bg-white rounded-2xl shadow p-4 overflow-x-auto">
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
                    alt={user.name}
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
                          setSelectedForView(user);
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
      {showAddUser && (
        <AddUserModal
          onClose={() => setShowAddUser(false)}
          onInvite={() => {}}
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
          onConfirm={() => {}}
        />
      )}
      {suspendSuccess && (
        <SuspendUserSuccess onClose={() => setSuspendSuccess(false)} />
      )}
      {selectedForDelete && (
        <DeleteUserConfirm
          user={selectedForDelete}
          onClose={() => setSelectedForDelete(null)}
          onConfirm={() => {}}
        />
      )}
      {deleteSuccess && (
        <DeleteUserSuccess onClose={() => setDeleteSuccess(false)} />
      )}
    </div>
  );
}
