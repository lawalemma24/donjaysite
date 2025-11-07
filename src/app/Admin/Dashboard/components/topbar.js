"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { Bell } from "lucide-react";
import Image from "next/image";
import { use } from "react";

export default function Topbar() {
  const { user } = useAuth();
  return (
    <div className="sticky xl:top-5 top-0 z-30 mb-6">
      <div className="w-full mx-auto xl:w-[80%] xl:w-[70%] bg-white h-16 xl:flex items-center justify-between px-6 py-3 md:py-5 shadow-sm xl:rounded-xl">
        {/* Search */}
        <div className="flex hidden xl:block items-center w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end gap-6">
          <Bell className="w-6 h-6 text-gray-500 cursor-pointer" />

          {/* Profile */}
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src={user?.profilePic || "/default-avatar.png"}
              alt="Admin"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-medium text-gray-700">
              {user ? user.name : "Admin"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
