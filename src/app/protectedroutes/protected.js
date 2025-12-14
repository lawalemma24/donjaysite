"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      // Try to restore from storage if not yet in context
      let currentUser = user;
      if (!currentUser) {
        const stored = localStorage.getItem("user");
        if (stored) {
          currentUser = JSON.parse(stored);
        } else {
          toast.error("No access rights");
        }
      } else {
      }

      // Not logged in
      if (!currentUser) {
        toast.error("Not logged in. Please login");
        router.push("/auth/login");
        return;
      }

      // Role restriction
      if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        toast.error(" Unauthorized role");

        // Clean up invalid session
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        router.push("/unauthorized");
        return;
      }

      setChecking(false);
    };

    checkAccess();
  }, [user, router, allowedRoles]);

  if (checking) return null;

  return children;
}
