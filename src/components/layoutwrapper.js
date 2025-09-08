"use client";

import { usePathname } from "next/navigation";
import TopBar from "@/components/topbar";
import Footer from "@/components/footer";

export default function TopBarWrapper({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <>
      {!isAuthPage && <TopBar />}
      {children}
      {!isAuthPage && <Footer />}
    </>
  );
}
