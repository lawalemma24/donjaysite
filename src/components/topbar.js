"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tags, Shuffle } from "lucide-react";

export default function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [garageOpen, setGarageOpen] = useState(false);

  return (
    <div className="absolute md:top-4 top-0 left-0 w-full  z-20">
      <div className="max-w-[900px] mx-auto   bg-secondary flex items-center shadow justify-between px-6 py-3 md:rounded-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Don-Jay Autos Limited"
            width={90}
            height={35}
            priority
          />
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="3xl:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
              className="h-8 w-8"
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
        <nav className="hidden 3xl:flex items-center gap-8 text-sm">
          <Link href="/" className="hover:text-blue">
            Home
          </Link>

          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue">
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
            <div className="absolute left-0  hidden group-hover:block bg-white  rounded shadow-md min-w-[160px]">
              <Link
                href="/garage/buy-swap"
                className="flex items-center gap-2 px-4 py-2 text-blue hover:bg-gray-100"
              >
                <Shuffle size={16} className="text-blue" />
                Buy or Swap
              </Link>

              <Link
                href="/garage/sell"
                className="flex items-center gap-2 px-4 py-2 text-blue hover:bg-gray-100"
              >
                <Tags size={16} className="text-blue" />
                Sell
              </Link>
            </div>
          </div>

          <Link href="/book-inspection" className="hover:text-blue">
            Book Inspection
          </Link>
          <Link href="/about" className="hover:text-blue">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-blue">
            Contact Us
          </Link>
        </nav>

        {/* Desktop button */}
        <Link
          href="/auth/login"
          className="hidden 3xl:block bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Login/Register
        </Link>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="3xl:hidden px-6 py-4 space-y-3 bg-white ">
          <Link href="/" className="block hover:text-blue">
            Home
          </Link>

          <button
            onClick={() => setGarageOpen(!garageOpen)}
            className="flex items-center gap-1 w-full text-left hover:text-blue"
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
              <Link href="/garage/buy-swap" className="block hover:text-blue">
                Buy or Swap
              </Link>
              <Link href="/garage/sell" className="block hover:text-blue">
                Sell
              </Link>
            </div>
          )}

          <Link href="/book-inspection" className="block hover:text-blue">
            Book Inspection
          </Link>
          <Link href="/about" className="block hover:text-blue">
            About Us
          </Link>
          <Link href="/contact" className="block hover:text-blue">
            Contact Us
          </Link>

          <Link
            href="/auth/login"
            className="block bg-blue text-white max-w-[500px] px-4 py-2 rounded hover:bg-blue-700"
          >
            Login/Register
          </Link>
        </div>
      )}
    </div>
  );
}
