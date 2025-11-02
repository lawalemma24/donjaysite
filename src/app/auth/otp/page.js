"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/app/contexts/AuthContext";

export default function Otp() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);
  const router = useRouter();
  const { login } = useAuth();

  const email =
    typeof window !== "undefined"
      ? (localStorage.getItem("signupEmail") || "").trim()
      : "";

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otp = code.join("").trim();

    if (otp.length !== 6) {
      toast.error("Enter all 6 digits");
      return;
    }

    if (!email) {
      toast.error("Email not found");
      return;
    }

    setLoading(true);

    try {
      const payload = { email, otp };
      console.log("VERIFY OTP PAYLOAD:", payload);

      const res = await fetch(
        "https://donjay-server.vercel.app/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("VERIFY OTP RESPONSE:", data);

      if (!res.ok) {
        toast.error(data.message || "OTP verification failed");
        return;
      }

      // Backend returns token + user
      if (data.token && data.user) {
        login({ token: data.token, ...data.user });
        toast.success(data.message || "OTP verified");
        localStorage.removeItem("signupEmail");
        router.push("/dashboard/profile");
        return;
      }

      // Backend returns only message
      if (data.message) {
        toast.success(data.message);
        localStorage.removeItem("signupEmail");
        router.push("/auth/login");
        return;
      }

      toast.error("Invalid token or user data");
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return toast.error("Email not found");

    try {
      const payload = { email };
      console.log("RESEND OTP PAYLOAD:", payload);

      const res = await fetch(
        "https://donjay-server.vercel.app/api/auth/resend-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("RESEND OTP RESPONSE:", data);

      if (res.ok) {
        toast.success(data.message || "New OTP sent");
      } else {
        toast.error(data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Network error, try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center">
        <div className="flex justify-center mb-4">
          <img src="/images/logo.png" alt="Logo" className="w-28 h-auto" />
        </div>

        <h1 className="text-xl md:text-2xl font-semibold text-black mb-2">
          Enter Verification Code
        </h1>
        <p className="text-gray-500 mb-6">
          We sent a code to <span className="text-blue-600">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center gap-3 mb-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <p className="text-sm text-gray-500">
            Didn&apos;t get a code?{" "}
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={handleResend}
            >
              Click to resend
            </button>
          </p>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
              onClick={() => router.push("/auth/register")}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
