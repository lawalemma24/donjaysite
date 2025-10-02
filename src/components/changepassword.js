import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const [form, setForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.new !== form.confirm) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(
        "http://localhost:5000/api/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // token should be stored after login
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            currentPassword: form.current,
            newPassword: form.new,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setForm({ current: "", new: "", confirm: "" });
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Request failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white-500 p-6 "
    >
      <h2 className="text-xl font-semibold mb-7">Change Your Password</h2>

      {/* Current Password */}
      <div className="mb-4">
        <label className="block mb-1 text-black text-sm">
          Current Password
        </label>
        <div className="relative">
          <input
            type={showPassword.current ? "text" : "password"}
            name="current"
            value={form.current}
            onChange={handleChange}
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
        <label className="block mb-1 text-black text-sm">New Password</label>
        <div className="relative">
          <input
            type={showPassword.new ? "text" : "password"}
            name="new"
            value={form.new}
            onChange={handleChange}
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
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
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
        <button
          type="button"
          onClick={() => setForm({ current: "", new: "", confirm: "" })}
          className="px-6 py-2 border border-blue text-blue rounded-lg hover:bg-blue/10"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue text-white rounded-lg hover:bg-blue/80"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </div>

      {message && (
        <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
      )}
    </form>
  );
};

export default ChangePassword;
