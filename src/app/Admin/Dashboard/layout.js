"use client";

import Sidebar from "./components/sidebar";
import Topbar from "./components/topbar";

export default function RootLayout({ children }) {
  return (
    <div className="xl:h-screen xl:flex  bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-col flex-1 min-h-0">
        {/* Topbar */}
        <div className="shrink-0">
          <Topbar />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 pb-20  ">{children}</main>
      </div>
    </div>
  );
}
