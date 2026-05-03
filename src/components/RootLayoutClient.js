"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Preloader from "@/components/preloader";
import { AuthProvider } from "@/app/contexts/AuthContext";
import LayoutWrapper from "@/components/layoutwrapper";
import { Toaster } from "react-hot-toast";

export default function RootLayoutClient({ children }) {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    // Initial preloader on first load
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Preloader + scroll to top on route change
    useEffect(() => {
        if (!pathname) return;

        // Start loader
        setLoading(true);

        // Scroll to top
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }

        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <AuthProvider>
            {loading && <Preloader />}
            <LayoutWrapper>{children}</LayoutWrapper>
            <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
    );
}
