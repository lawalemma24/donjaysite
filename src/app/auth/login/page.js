"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.error("Wrong email or password");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="py-4 md:py-6 px-4 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-28 md:w-35 h-auto object-contain"
          />
        </div>

        <div className="px-5 md:px-8 py-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-black mb-2">
            Sign In
          </h1>
          <p className="text-gray-500 text-center text-sm md:text-base mb-4 md:mb-6">
            Please enter your details to log in
          </p>

          <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
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
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-lightgrey rounded focus:outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2 text-black"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-lightgrey rounded focus:outline-none transition-colors duration-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex flex-row justify-between items-start xs:items-center gap-2 mt-3 text-xs">
              <div className="flex items-center gap-2">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 border border-gray-400 rounded focus:ring-0"
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors xs:self-center"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mt-2"
            >
              Sign in
            </button>

            <div className="flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-3 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                <FcGoogle size={24} />
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300 hover:bg-gray-100 transition"
              >
                <FaApple size={24} className="text-black" />
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <a
                href="/auth/register"
                className="font-medium text-blue hover:text-blue-800 transition-colors"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
