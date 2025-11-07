"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", users: 120 },
  { name: "Feb", users: 230 },
  { name: "Mar", users: 250 },
  { name: "Apr", users: 310 },
  { name: "May", users: 360 },
  { name: "Jun", users: 290 },
];

export default function UserGrowthChart() {
  return (
    <div className="bg-white shadow rounded-2xl p-3 sm:p-4 w-full overflow-hidden">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        User Growth
      </h2>

      {/* Set fixed chart height to avoid overflow */}
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
