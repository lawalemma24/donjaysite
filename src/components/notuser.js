"use client";
import React from "react";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";
import { XCircle } from "lucide-react";

export default function NotRegisteredOverlay({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 hover:text-gray-700 text-2xl font-bold"
        >
          ✕
        </button>
        <div className="flex justify-center mt-10 mb-3">
          <div className="bg-blue p-3 rounded-full">
            <XCircle className="text-white text-3xl" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4  text-red-600">
          Access Restricted!
        </h2>
        <p className="text-gray-600 mb-6">
          You need to be registered as a customer to access this feature.
          Register or login to continue and enjoy full access to this service.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/auth/login"
            className="flex-1 px-4 py-2 bg-blue text-white rounded-lg hover:bg-blue/70 transition"
          >
            Login
          </Link>
          <Link
            href="/auth/register"
            className="flex-1 px-4 py-2 bg-orange text-white rounded-lg hover:bg-orange/70 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
