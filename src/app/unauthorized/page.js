import Link from "next/link";

// app/unauthorized/page.js
export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="py-4 md:py-6 px-4 flex justify-center">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-28 md:w-35 h-auto object-contain"
        />
      </div>
      <h1 className="text-3xl font-bold">Access Denied</h1>
      <p className="text-gray-500 mt-2">
        You do not have permission to view this page.
      </p>
      <Link href="/" className="mt-4 text-blue-500 underline">
        Go Back To Home
      </Link>
    </div>
  );
}
