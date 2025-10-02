"use client";

import { Bell } from "lucide-react";
import Image from "next/image";

export default function Topbar() {
  return (
    <div className="sticky lg:top-5 top-0 z-30 mb-6">
      <div className="w-full mx-auto lg:w-[80%] xl:w-[70%] bg-white h-16 lg:flex items-center justify-between px-6 py-3 md:py-5 shadow-sm lg:rounded-xl">
        {/* Search */}
        <div className="flex hidden lg:block items-center w-full max-w-md">
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
              src="/images/testimonial2.png"
              alt="Admin"
              width={36}
              height={36}
              className="rounded-full"
            />
            <span className="font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
