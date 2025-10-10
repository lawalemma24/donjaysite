// components/ProtectedRoute.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Not logged in
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Logged in but role not allowed
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.push("/unauthorized");
    }
  }, [user, router, allowedRoles]);

  // Wait until user is confirmed
  if (!user) return null;

  // Role check passes
  if (allowedRoles && allowedRoles.includes(user.role)) return children;

  return null;
}
