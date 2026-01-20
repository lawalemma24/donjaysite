"use client";
import { useState } from "react";
import {
  FaUser,
  FaCar,
  FaCalendarAlt,
  FaHeadset,
  FaSignOutAlt,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/contexts/AuthContext";

const AdminAccountMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    window.location.href = "/";
  };
  const getNamePlaceholder = (name = "") => {
    if (!name) return "US";
    return name.trim().slice(0, 2).toUpperCase();
  };

  return (
    <div className="relative">
      {/* Top Bar Account Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2"
      >
        {user?.profilePic && user.profilePic.trim() !== "" ? (
          <div
            className="w-10 h-10 rounded-full bg-center bg-cover border border-gray-300"
            style={{ backgroundImage: `url(${user.profilePic})` }}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold select-none">
            {getNamePlaceholder(user?.name)}
          </div>
        )}

        <span className="font-medium hidden lg:block">Profile</span>

        <svg
          className={`w-4 h-4 transform transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 md:w-65 bg-white shadow py-2 z-50 rounded-md">
          <Link
            href="/Admin/Dashboard/Overview"
            onClick={handleClose}
            className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 mb-1"
          >
            <FaUser className="text-blue-600" /> Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-2 px-4 py-3 hover:bg-blue-50 text-red-600 mb-1"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminAccountMenu;
