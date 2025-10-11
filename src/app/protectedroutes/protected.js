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
      console.log("🔍 Checking access...");

      // Try to restore from storage if not yet in context
      let currentUser = user;
      if (!currentUser) {
        const stored = localStorage.getItem("user");
        if (stored) {
          currentUser = JSON.parse(stored);
          console.log("📦 Restored user from storage:", currentUser);
        } else {
          console.log("⚠️ No user in context or storage");
        }
      } else {
        console.log("✅ User found in context:", currentUser);
      }

      // Not logged in
      if (!currentUser) {
        console.log("🚫 Not logged in. Redirecting to login...");
        router.push("/auth/login");
        return;
      }

      // Role restriction
      if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        console.log("❌ Unauthorized role:", currentUser.role);
        console.log("Allowed roles:", allowedRoles);

        // Clean up invalid session
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        router.push("/unauthorized");
        return;
      }

      console.log("✅ Access granted for role:", currentUser.role);
      setChecking(false);
    };

    checkAccess();
  }, [user, router, allowedRoles]);

  if (checking) return null; // Wait until check finishes

  return children;
}
