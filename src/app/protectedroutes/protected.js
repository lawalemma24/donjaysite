"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      // Try restore from storage if user not yet in context
      let currentUser = user;
      if (!currentUser) {
        const stored = localStorage.getItem("user");
        if (stored) {
          currentUser = JSON.parse(stored);
        }
      }

      // Still nothing → not logged in
      if (!currentUser) {
        router.push("/auth/login");
        return;
      }

      // Role restriction
      if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        router.push("/unauthorized");
        return;
      }

      setChecking(false);
    };

    checkAccess();
  }, [user, router, allowedRoles]);

  if (checking) return null; // wait until check finishes

  return children;
}
