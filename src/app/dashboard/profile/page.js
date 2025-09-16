"use client";
import { useState, useRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { User, KeyRound, Edit3 } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/100");
  const fileInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  return (
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
                      defaultValue="Jay Autos"
                      className="mt-1 block w-full border border-text-muted focus:ring-none focus:outline-none focus:border-blue rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue="donjayautos@gmail.com"
                      className="mt-1 block w-full border border-text-muted focus:ring-none focus:outline-none focus:border-blue rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      defaultValue="08123456789"
                      className="mt-1 block w-full border border-text-muted focus:ring-none focus:outline-none focus:border-blue rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Address</label>
                    <input
                      type="text"
                      defaultValue="Akin Adesola Street, Victoria Island, Lagos State"
                      className="mt-1 block w-full border border-text-muted focus:ring-none focus:outline-none focus:border-blue rounded-md px-3 py-2 text-sm"
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
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2 bg-blue text-white rounded-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab === "password" && (
              <>
                <div className="max-w-md mx-auto bg-white rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-7">
                    Change Your Password
                  </h2>

                  {/* Current Password */}
                  <div className="mb-4">
                    <label className="block mb-1 text-black text-sm">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.current ? "text" : "password"}
                        className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-none focus:border-blue border-lightgrey"
                        placeholder="******"
                      />
                      <button
                        type="button"
                        onClick={() => togglePassword("current")}
                        className="absolute right-3 top-2.5 text-gray-500"
                      >
                        {showPassword.current ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="mb-4">
                    <label className="block mb-1 text-black text-sm">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.new ? "text" : "password"}
                        className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-none focus:border-blue border-lightgrey"
                        placeholder="******"
                      />
                      <button
                        type="button"
                        onClick={() => togglePassword("new")}
                        className="absolute right-3 top-2.5 text-gray-500"
                      >
                        {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="mb-6">
                    <label className="block mb-1 text-black text-sm">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword.confirm ? "text" : "password"}
                        className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-none focus:border-blue border-lightgrey"
                        placeholder="******"
                      />
                      <button
                        type="button"
                        onClick={() => togglePassword("confirm")}
                        className="absolute right-3 top-2.5 text-gray-500"
                      >
                        {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-between">
                    <button className="px-6 py-2 border border-blue text-blue rounded-lg hover:bg-blue/10">
                      Cancel
                    </button>
                    <button className="px-6 py-2 bg-blue text-white rounded-lg hover:bg-blue/80">
                      Change Password
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
