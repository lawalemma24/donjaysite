"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { apiUrl } from "@/utils/apihelper";

export default function TotalUsersCard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchTotalUsers = async () => {
      try {
        const res = await fetch(apiUrl("/api/users?page=1&limit=1"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Request failed");

        const data = await res.json();
        setTotalUsers(data.pagination?.totalUsers || 0);
      } catch (err) {
        console.error(err);
        setTotalUsers(0);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalUsers();
  }, [token]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
      <div className="bg-blue-100 text-blue-600 p-2 sm:p-3 rounded-full">
        <User size={22} />
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium">Total Users</p>
        <p className="text-xl sm:text-2xl font-semibold">
          {loading ? "..." : totalUsers}
        </p>
      </div>
    </div>
  );
}
