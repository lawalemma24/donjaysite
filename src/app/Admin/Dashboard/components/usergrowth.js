"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { apiUrl } from "@/utils/apihelper";

const BASE = apiUrl("/api/users");

export default function UserGrowthChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map month index to month name
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    async function fetchUsers() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${BASE}?limit=1000`, {
          headers: { Authorization: token ? `Bearer ${token}` : "" },
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(
            `Failed to fetch users refresh: ${res.status} ${txt}`
          );
        }

        const result = await res.json();
        const users = Array.isArray(result.users) ? result.users : [];

        // Aggregate users by month
        const monthCounts = {};
        users.forEach((u) => {
          if (!u.createdAt) return;
          const d = new Date(u.createdAt);
          const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
          monthCounts[key] = (monthCounts[key] || 0) + 1;
        });

        // Sort months chronologically
        const sortedData = Object.entries(monthCounts)
          .sort((a, b) => {
            const [mA, yA] = a[0].split(" ");
            const [mB, yB] = b[0].split(" ");
            return new Date(`${mA} 1, ${yA}`) - new Date(`${mB} 1, ${yB}`);
          })
          .map(([name, users]) => ({ name, users }));

        setData(sortedData);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!data.length) return <div>No user data to display.</div>;

  return (
    <div className="bg-white shadow rounded-2xl p-3 sm:p-4 w-full overflow-hidden">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        User Growth
      </h2>

      <div className="w-full h-56 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10 }}
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
            <Tooltip
              wrapperStyle={{ fontSize: 12 }}
              cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            />
            <Bar
              dataKey="users"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
