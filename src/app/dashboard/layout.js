"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User, Car, Calendar } from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const tabs = [
    {
      id: "profile",
      label: "My Profile",
      icon: <User size={16} />,
      path: "/dashboard/profile",
    },
    {
      id: "deals",
      label: "My Deals",
      icon: <Car size={16} />,
      path: "/dashboard/deals",
    },
    {
      id: "booking",
      label: "My Booking",
      icon: <Calendar size={16} />,
      path: "/dashboard/booking",
    },
  ];

  return (
    <div className="min-h-screen bg-white max-w-6xl mx-auto">
      <div className="px-2 md:px-10 py-16">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 mt-10">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            return (
              <Link
                key={tab.id}
                href={tab.path}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto ${
                  isActive
                    ? "bg-blue text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab.icon} {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
