"use client";

import { useState, useRef } from "react";
import { User, KeyRound, Edit3 } from "lucide-react";
import ProtectedRoute from "@/app/protectedroutes/protected";
import { useAuth } from "@/app/contexts/AuthContext";
import ChangePassword from "@/components/changepassword";

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected image:", file.name);
      // Handle upload or preview logic here
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <h1 className="ml-4 text-2xl font-bold">Settings</h1>
      <div className="flex flex-col md:flex-row p-6 gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-48">
          <div className="space-y-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                activeTab === "profile"
                  ? "bg-blue/10 border-l-4 border-blue text-blue font-medium"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <User size={14} /> Profile Settings
            </button>

            <button
              onClick={() => setActiveTab("password")}
              className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                activeTab === "password"
                  ? "bg-blue/10 border-l-4 border-blue text-blue font-medium"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <KeyRound size={14} /> Password
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 max-w-full md:max-w-lg">
            {activeTab === "profile" && (
              <>
                <h2 className="font-semibold text-xl mb-6">
                  Admin Information
                </h2>

                {/* Profile Image with Edit */}
                <div className="relative flex items-start p-4 mb-6">
                  <img
                    src={user?.profilePic || "/default-avatar.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute bottom-2 left-20 bg-white p-1 rounded-full shadow"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Edit3 size={16} className="text-gray-600" />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Profile Form */}
                <form className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name || ""}
                      className="mt-1 block w-full border border-text-muted focus:outline-none  rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email || ""}
                      className="mt-1 block w-full border border-text-muted focus:outline-none  rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.phone || ""}
                      className="mt-1 block w-full border border-text-muted focus:outline-none  rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Address</label>
                    <input
                      type="text"
                      defaultValue={user?.address || ""}
                      className="mt-1 block w-full border border-text-muted focus:outline-none  rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
                    <button
                      type="button"
                      className="w-full sm:w-auto px-6 py-2 border border-blue text-blue rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      disabled
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2 bg-blue text-white rounded-md cursor-not-allowed"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab === "password" && <ChangePassword />}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
