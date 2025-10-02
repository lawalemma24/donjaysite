"use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import LayoutWrapper from "@/components/layoutwrapper";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Preloader from "@/components/preloader";
import { AuthProvider } from "./contexts/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!pathname) return;
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <AuthProvider>
          {" "}
          {/* ⬅️ wrap entire app */}
          {loading && <Preloader />}
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
