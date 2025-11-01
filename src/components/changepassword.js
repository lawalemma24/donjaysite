"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ChangePassword() {
  const router = useRouter();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({ old: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const toggleShow = (key) =>
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      const res = await fetch(
        "https://donjay-server.vercel.app/api/auth/changePass",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: form.oldPassword,
            newPassword: form.newPassword,
          }),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        setMessage(data.message || "Password changed successfully.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setTimeout(() => router.push("/auth/login"), 1500);
      } else {
        setMessage(data.msg || data.error || "Old password did not match.");
      }
    } catch (err) {
      setMessage("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-7 text-center">
        Change Password
      </h2>

      {/** Old Password */}
      <div className="mb-4">
        <label className="block mb-1 text-sm text-black">
          Current Password
        </label>
        <div className="relative">
          <input
            type={show.old ? "text" : "password"}
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            placeholder="******"
            required
            className="w-full border rounded-lg px-3 py-2 pr-10 border-gray-300"
          />
          <button
            type="button"
            onClick={() => toggleShow("old")}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {show.old ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/** New Password */}
      <div className="mb-4">
        <label className="block mb-1 text-sm text-black">New Password</label>
        <div className="relative">
          <input
            type={show.new ? "text" : "password"}
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="******"
            required
            className="w-full border rounded-lg px-3 py-2 pr-10 border-gray-300"
          />
          <button
            type="button"
            onClick={() => toggleShow("new")}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {show.new ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/** Confirm Password */}
      <div className="mb-6">
        <label className="block mb-1 text-sm text-black">
          Confirm New Password
        </label>
        <div className="relative">
          <input
            type={show.confirm ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="******"
            required
            className="w-full border rounded-lg px-3 py-2 pr-10 border-gray-300"
          />
          <button
            type="button"
            onClick={() => toggleShow("confirm")}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {show.confirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/** Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() =>
            setForm({ oldPassword: "", newPassword: "", confirmPassword: "" })
          }
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </div>

      {message && (
        <p className="mt-4 text-sm text-center text-gray-700">{message}</p>
      )}
    </form>
  );
}
