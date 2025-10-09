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

const AccountMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
    window.location.href = "/auth/login";
  };

  return (
    <div className="relative">
      {/* Top Bar Account Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
      >
        <Image
          src={user?.profilePic || "/images/default-profile.png"}
          alt="profile"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="font-medium hidden lg:block">{user.name}</span>
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
            href="/dashboard/profile"
            onClick={handleClose}
            className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 mb-1"
          >
            <FaUser className="text-blue-600" /> My Profile
          </Link>

          <Link
            href="/dashboard/deals"
            onClick={handleClose}
            className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 mb-1"
          >
            <FaCar className="text-blue-600" /> My Listing
          </Link>

          <Link
            href="/"
            onClick={handleClose}
            className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 mb-1"
          >
            <FaCalendarAlt className="text-blue-600" /> My Booking
          </Link>

          <Link
            href="/services/customersupport"
            onClick={handleClose}
            className="flex items-center gap-2 px-4 py-3 hover:bg-blue-50 mb-1"
          >
            <FaHeadset className="text-blue-600" /> Customer Support
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

export default AccountMenu;
