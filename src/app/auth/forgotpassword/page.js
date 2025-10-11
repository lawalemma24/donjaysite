"use client";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show success toast
    toast.success("Reset link sent to your email!");

    // Redirect after short delay
    setTimeout(() => {
      router.push("/auth/resetpassword");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue to-indigo-900 flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="py-4 md:py-6 px-4 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-28 md:w-35 h-auto object-contain"
          />
        </div>

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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 mt-2"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
