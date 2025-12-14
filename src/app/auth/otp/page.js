"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/app/contexts/AuthContext";
import { apiUrl } from "@/utils/apihelper";

export default function Otp() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [counter, setCounter] = useState(120);

  const inputs = useRef([]);
  const router = useRouter();
  const { login } = useAuth();

  const email =
    typeof window !== "undefined"
      ? (localStorage.getItem("signupEmail") || "").trim()
      : "";

  /* =========================
     START COUNTDOWN ON MOUNT
  ========================= */
  useEffect(() => {
    inputs.current[0]?.focus();

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (newCode.every((digit) => digit !== "")) {
      handleVerify(null, newCode.join(""));
    }
  };

  /* =========================
     HANDLE BACKSPACE
  ========================= */
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  /* =========================
     VERIFY OTP
  ========================= */
  const handleVerify = async (e, otpOverride) => {
    if (e) e.preventDefault();
    if (loading) return;

    const otp = otpOverride ?? code.join("").trim();

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
      const res = await fetch(apiUrl("/api/auth/verify-otp"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "OTP verification failed");
        return;
      }

      login({ token: data.token, ...data.user });
      toast.success(data.message || "OTP verified");
      localStorage.removeItem("signupEmail");
      router.push("/auth/login");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     RESEND OTP
  ========================= */
  const handleResend = async () => {
    if (!email) return toast.error("Email not found");

    setResendDisabled(true);
    setCounter(120);

    try {
      const res = await fetch(apiUrl("/api/auth/resend-otp"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      res.ok
        ? toast.success(data.message || "New OTP sent")
        : toast.error(data.message || "Failed to resend OTP");
    } catch {
      toast.error("Network error");
    }

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center">
        <img src="/images/logo.png" alt="Logo" className="w-28 mx-auto mb-4" />

        <h1 className="text-2xl font-semibold mb-2">Enter Verification Code</h1>

        <p className="text-gray-500 mb-6">
          We sent a code to{" "}
          <span className="text-blue-600 font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerify}>
          <div className="flex justify-center gap-3 mb-4">
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
                className="w-12 h-12 text-center text-lg border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-6">
            Didn&apos;t get a code?{" "}
            <button
              type="button"
              disabled={resendDisabled}
              onClick={handleResend}
              className={`text-blue-600 hover:underline ${
                resendDisabled && "opacity-50 cursor-not-allowed"
              }`}
            >
              {resendDisabled
                ? `Resend in ${String(Math.floor(counter / 60)).padStart(
                    2,
                    "0"
                  )}:${String(counter % 60).padStart(2, "0")}`
                : "Resend code"}
            </button>
          </p>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push("/auth/register")}
              className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
