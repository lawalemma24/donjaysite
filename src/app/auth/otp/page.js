"use client";
import { useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Otp() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email"); // dynamic email from signup

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otp = code.join("");

    if (otp.length !== 6) {
      toast.error("Enter all 6 digits");
      return;
    }

    try {
      const res = await fetch("/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Verification failed");
        return;
      }

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      router.push("/dashboard/profile");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleResend = () => {
    // Call your resend OTP API here if available
    toast("New code sent to your email", { icon: "✉️" });
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
          We sent a code to <span className="text-blue">{email}</span>
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
            Didn't get a code?{" "}
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
              className="px-6 py-2 border border-blue text-blue rounded-lg hover:bg-blue-50 transition"
              onClick={() => router.push("/signup")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
