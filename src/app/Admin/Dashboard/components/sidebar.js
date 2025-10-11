"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  Users,
  Car,
  Handshake,
  ClipboardCheck,
  CreditCard,
  HelpCircle,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", href: "/Admin/Dashboard/Home", icon: Home },
  {
    name: "Overview",
    href: "/Admin/Dashboard/Overview",
    icon: LayoutDashboard,
  },
  { name: "User Management", href: "/Admin/Dashboard/Users", icon: Users },
  { name: "Car Listing", href: "/Admin/Dashboard/Cars", icon: Car },
  { name: "Deals", href: "/Admin/Dashboard/Deals", icon: Handshake },
  {
    name: "Inspection",
    href: "/Admin/Dashboard/Inspection",
    icon: ClipboardCheck,
  },
  {
    name: "Transactions",
    href: "/Admin/Dashboard/Transactions",
    icon: CreditCard,
  },
  {
    name: "Support Center",
    href: "/Admin/Dashboard/Support",
    icon: HelpCircle,
  },
  { name: "Settings", href: "/Admin/Dashboard/Settings", icon: Settings },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden p-3 absolute top-4 left-4 z-50"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`bg-white shadow-md h-screen w-64 p-6 flex flex-col fixed lg:static z-40 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 mb-8 flex items-center justify-center border-b pb-4 md:pb-6 border-gray-300">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-8 md:h-10 lg:h-13 w-auto"
          />
        </div>

        {/* Menu Links */}
        <nav className="flex-1 flex flex-col justify-between">
          <div className="flex flex-col space-y-2">
            {links.slice(0, 7).map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col space-y-2 mt-6">
            {links.slice(7).map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <div className="border-t border-gray-300 mt-6 pt-4">
              <Link
                href="/logout"
                className="flex items-center gap-3 px-4 py-2 mt-4 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <X size={18} />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
