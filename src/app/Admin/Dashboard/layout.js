"use client";

import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";

export default function RootLayout({ children }) {
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar />

        {/* Children pages */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
