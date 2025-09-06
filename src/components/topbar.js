"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [garageOpen, setGarageOpen] = useState(false);

  return (
    <div className="w-full max-w-[1000px] mx-auto bg-white shadow-md rounded-lg mt-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Don-Jay Autos Limited"
            width={100}
            height={40}
            priority
          />
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>

          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-600">
              Garage
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 hidden group-hover:block bg-white border rounded shadow-md">
              <Link
                href="/garage/cars"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Cars
              </Link>
              <Link
                href="/garage/bikes"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Bikes
              </Link>
            </div>
          </div>

          <Link href="/book-inspection" className="hover:text-blue-600">
            Book Inspection
          </Link>
          <Link href="/about" className="hover:text-blue-600">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-blue-600">
            Contact Us
          </Link>
        </nav>

        {/* Desktop button */}
        <Link
          href="/auth/login"
          className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Login/Register
        </Link>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          <Link href="/" className="block hover:text-blue-600">
            Home
          </Link>

          <button
            onClick={() => setGarageOpen(!garageOpen)}
            className="flex items-center gap-1 w-full text-left hover:text-blue-600"
          >
            Garage
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {garageOpen && (
            <div className="pl-4 space-y-2">
              <Link href="/garage/cars" className="block hover:text-blue-600">
                Cars
              </Link>
              <Link href="/garage/bikes" className="block hover:text-blue-600">
                Bikes
              </Link>
            </div>
          )}

          <Link href="/book-inspection" className="block hover:text-blue-600">
            Book Inspection
          </Link>
          <Link href="/about" className="block hover:text-blue-600">
            About Us
          </Link>
          <Link href="/contact" className="block hover:text-blue-600">
            Contact Us
          </Link>

          <Link
            href="/auth/login"
            className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Login/Register
          </Link>
        </div>
      )}
    </div>
  );
}
