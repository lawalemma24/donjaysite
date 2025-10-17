"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tags, Shuffle, LogOut, ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import AccountMenu from "./accountmenu";
import AdminAccountMenu from "./adminaccountmenu";
import { useAuth } from "@/app/contexts/AuthContext";
import NotRegisteredOverlay from "./notuser";

export default function TopBar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [garageOpen, setGarageOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = () => {
    setMenuOpen(false);
    setGarageOpen(false);
  };

  const handleProtectedClick = (path) => {
    if (!user || user.role !== "customer") {
      setShowOverlay(true);
      return;
    }
    handleLinkClick();
    router.push(path);
  };

  const linkClass = (href) =>
    pathname === href ? "text-blue font-semibold 3xl:underline" : "";

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent md:pt-4">
      <div className="max-w-[900px] mx-auto bg-secondary flex items-center shadow justify-between px-6 py-3 md:rounded-lg ">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={handleLinkClick}
        >
          <Image
            src="/images/logo.png"
            alt="Don-Jay Autos Limited"
            width={90}
            height={35}
            priority
          />
        </Link>

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

        <nav className="hidden 3xl:flex items-center gap-8 text-sm">
          <Link href="/" className={`hover:text-blue ${linkClass("/")}`}>
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
            <div className="absolute left-0 hidden group-hover:block bg-white rounded shadow-md min-w-[160px]">
              <Link
                href="/garage/buy-swap"
                className={`flex items-center gap-2 px-4 py-2 text-blue hover:bg-gray-100 ${linkClass(
                  "/garage/buy-swap"
                )}`}
              >
                <Shuffle size={16} className="text-blue" /> Buy or Swap
              </Link>
              <button
                className={`flex items-center gap-2 px-4 py-2 text-blue hover:bg-gray-100 ${linkClass(
                  "/garage/sell"
                )}`}
                onClick={() => handleProtectedClick("/garage/sell")}
              >
                <Tags size={16} className="text-blue" /> Sell
              </button>
            </div>
          </div>

          <Link
            href="/inspection"
            className={`hover:text-blue ${linkClass("/inspection")}`}
          >
            Book Inspection
          </Link>
          <Link
            href="/about"
            className={`hover:text-blue ${linkClass("/about")}`}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`hover:text-blue ${linkClass("/contact")}`}
          >
            Contact Us
          </Link>
        </nav>

        <div className="hidden 3xl:flex items-center gap-4">
          {user ? (
            user.role === "admin" ? (
              <AdminAccountMenu />
            ) : (
              <AccountMenu />
            )
          ) : (
            <Link
              href="/auth/login"
              className={`hidden 3xl:block bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${
                pathname === "/auth/login" ? "bg-blue-700" : ""
              }`}
            >
              Login/Register
            </Link>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="3xl:hidden px-6 py-4 space-y-3 bg-white border-b border-lightgrey shadow-md">
          {user ? (
            user.role === "admin" ? (
              <Link
                onClick={handleLinkClick}
                href="/Admin/Dashboard/Overview"
                className="block"
              >
                <div className="flex flex-col p-2 w-[98%] mx-auto border border-lightgrey/50 rounded shadow cursor-pointer ">
                  <p className="text-blue/70 text-lg font-bold hover:text-blue">
                    Admin
                  </p>
                  <p className="text-xs text-orange flex flex-row gap-1 hover:text-black">
                    Open Dashboard <ArrowRight size={18} />
                  </p>
                </div>
              </Link>
            ) : (
              <Link
                onClick={handleLinkClick}
                href="/dashboard/profile"
                className="block"
              >
                <div className="flex flex-col p-2 w-[98%] mx-auto border border-lightgrey/50 rounded shadow cursor-pointer ">
                  <p className="text-blue/70 text-lg font-bold hover:text-blue">
                    {user.name}
                  </p>
                  <p className="text-xs text-orange flex flex-row gap-1 hover:text-black">
                    View Profile <ArrowRight size={18} />
                  </p>
                </div>
              </Link>
            )
          ) : (
            <Link
              href="/auth/login"
              className={`hidden 3xl:block bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${
                pathname === "/auth/login" ? "bg-blue-700" : ""
              }`}
            >
              Login/Register
            </Link>
          )}

          <Link
            href="/"
            className={`block hover:text-blue ${linkClass("/")}`}
            onClick={handleLinkClick}
          >
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
              <Link
                href="/garage/buy-swap"
                className={`block hover:text-blue ${linkClass(
                  "/garage/buy-swap"
                )}`}
                onClick={handleLinkClick}
              >
                Buy or Swap
              </Link>
              <button
                className={`block hover:text-blue ${linkClass("/garage/sell")}`}
                onClick={() => handleProtectedClick("/garage/sell")}
              >
                Sell
              </button>
            </div>
          )}

          <Link
            href="/inspection"
            className={`block hover:text-blue ${linkClass("/inspection")}`}
            onClick={handleLinkClick}
          >
            Book Inspection
          </Link>
          <Link
            href="/about"
            className={`block hover:text-blue ${linkClass("/about")}`}
            onClick={handleLinkClick}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className={`block hover:text-blue ${linkClass("/contact")}`}
            onClick={handleLinkClick}
          >
            Contact Us
          </Link>

          {user && user.role === "customer" && (
            <button
              className={`block hover:text-blue ${linkClass(
                "/services/customersupport"
              )}`}
              onClick={() => handleProtectedClick("/services/customersupport")}
            >
              Customer Support
            </button>
          )}

          <div className="border-t border-lightgrey/40 pt-4">
            {user ? (
              <button className="text-red-600 mb-2 font-bold flex flex-row gap-2">
                <LogOut size={18} /> Log Out
              </button>
            ) : (
              <Link
                href="/auth/login"
                className={` 3xl:block bg-blue text-white px-5 py-2 rounded hover:bg-blue-700 ${
                  pathname === "/auth/login" ? "bg-blue-700" : ""
                }`}
              >
                Login/Register
              </Link>
            )}
          </div>
        </div>
      )}

      {showOverlay && (
        <NotRegisteredOverlay onClose={() => setShowOverlay(false)} />
      )}
    </div>
  );
}
