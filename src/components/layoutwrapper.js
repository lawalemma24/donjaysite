"use client";

import { usePathname } from "next/navigation";
import TopBar from "@/components/topbar";
import Footer from "@/components/footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname() || "";
  const isPublicPage =
    !pathname.includes("/auth") &&
    !pathname.includes("/Admin") &&
    !pathname.includes("/unauthorized");

  if (isPublicPage) {
    return (
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    );
  }

  // admin/auth page: full screen, no topbar/footer
  return <>{children}</>;
}
