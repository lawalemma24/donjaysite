"use client";

import { useState, useRef } from "react";
import { User, KeyRound, Edit3 } from "lucide-react";
import ProtectedRoute from "@/app/protectedroutes/protected";
import { useAuth } from "@/app/contexts/AuthContext";
import ChangePassword from "@/components/changepassword";

export default function AdminSettingsPage() {
  const { user, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState(
    user?.profilePic || "https://i.pravatar.cc/100"
  );
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Track form data
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phone || "",
    address: user?.address || "",
    profilePicFile: null,
  });

  // Save initial state for cancel
  const initialFormState = useRef({ ...formData, profileImage });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
      setFormData((prev) => ({ ...prev, profilePicFile: file }));
    }
  };

  const handleCancel = () => {
    setFormData(initialFormState.current);
    setProfileImage(initialFormState.current.profileImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let profilePicUrl = user?.profilePic;

      if (formData.profilePicFile) {
        const urls = await uploadToCloudinary([formData.profilePicFile], 1);
        profilePicUrl = urls[0];
      }

      const token = user?.token || localStorage.getItem("token");
      if (!token) throw new Error("No valid token. Please log in again.");

      const response = await fetch(
        `https://donjay.vercel.app/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            profilePic: profilePicUrl,
          }),
        }
      );

      let result = {};
      const text = await response.text();
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        console.warn("Response not JSON:", text);
        result = {};
      }

      if (!response.ok) {
        console.error(
          "API Error:",
          result,
          response.status,
          response.statusText
        );
        throw new Error(
          result.error ||
            result.message ||
            `Failed to update user (${response.status})`
        );
      }

      // Persist changes locally
      const updatedUser = {
        ...user,
        name: result.user.name,
        email: result.user.email,
        phone: result.user.phoneNumber,
        address: result.user.address,
        profilePic: result.user.profilePic,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setFormData((prev) => ({
        ...prev,
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phone,
        address: updatedUser.address,
        profilePicFile: null,
      }));
      setProfileImage(updatedUser.profilePic);

      initialFormState.current = {
        ...formData,
        profileImage: updatedUser.profilePic,
      };

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update Error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-col md:flex-row gap-6">
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

          {/* Card */}
          <div className="flex-1">
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 max-w-full md:max-w-lg">
              {activeTab === "profile" && (
                <>
                  <h2 className="font-semibold text-xl mb-6">
                    Personal Information
                  </h2>

                  {/* Profile Image with Edit */}
                  <div className="relative flex items-start p-4 mb-6">
                    <img
                      src={profileImage}
                      className="w-24 h-24 rounded-full object-cover border border-gray-300"
                    />
                    <button
                      type="button"
                      className="absolute bottom-2 left-20 bg-white p-1 rounded-full shadow"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <Edit3 size={16} className="text-blue-600" />
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
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="text-sm text-gray-600">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-text-muted focus:ring-none focus:outline-none focus:border-blue rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-text-muted focus:ring-none focus:outline-none focus:border-blue rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-text-muted focus:ring-none focus:outline-none focus:border-blue rounded-md px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-text-muted focus:ring-none focus:outline-none focus:border-blue rounded-md px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
                      <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-2 border border-blue text-blue rounded-md"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 bg-blue text-white rounded-md"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </>
              )}

              {activeTab === "password" && <ChangePassword />}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
