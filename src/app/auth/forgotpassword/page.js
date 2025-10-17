"use client";

import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (res.status === 404) {
        toast.error("No user found with this email");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        toast.error("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("FORGOT PASSWORD RESPONSE:", data);

      toast.success("Reset link sent to your email!");
      setTimeout(() => router.push("/auth/resetpassword"), 2000);
    } catch (error) {
      console.error("Server error:", error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue to-indigo-900 flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Logo */}
        <div className="py-4 md:py-6 px-4 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-28 md:w-35 h-auto object-contain"
          />
        </div>

        {/* Content */}
        <div className="px-5 md:px-8 py-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-black mb-6">
            Forgot Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div>
              <label
                className="block text-sm font-medium mb-2 text-black"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email..."
                className="w-full px-4 py-2 border border-lightgrey rounded focus:outline-none transition-colors duration-300"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mt-2`}
            >
              {loading ? "Sending..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
