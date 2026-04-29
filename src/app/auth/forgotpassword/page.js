"use client";

import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { apiUrl } from "@/utils/apihelper";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [email, setEmail] = useState("");

  // Countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(apiUrl("/api/auth/forgot-password"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.status === 404) {
        toast.error("No user found with this email");
        return;
      }

      if (!res.ok) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.success("Reset link sent! Check your email.");
      setCooldown(120); // ⏱ 2 minutes
    } catch (error) {
      console.error("Server error:", error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue to-indigo-900 flex items-center justify-center p-4">
      <Toaster position="top-center" />
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Logo */}
        <div className="py-4 md:py-6 px-4 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-28 h-auto object-contain"
          />
        </div>

        {/* Content */}
        <div className="px-5 md:px-8 py-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-black mb-6">
            Forgot Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-black">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full px-4 py-2 border border-lightgrey rounded focus:outline-none"
                required
                disabled={cooldown > 0}
              />
            </div>

            <button
              type="submit"
              disabled={loading || cooldown > 0}
              className={`w-full ${
                loading || cooldown > 0
                  ? "bg-blue-400"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300`}
            >
              {loading
                ? "Sending..."
                : cooldown > 0
                ? `Resend in ${formatTime(cooldown)}`
                : "Send Reset Link"}
            </button>
          </form>

          {cooldown > 0 && (
            <p className="text-center text-sm text-gray-600 mt-4">
              You can request another reset link after{" "}
              <span className="font-semibold">{formatTime(cooldown)}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
