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
  { name: "March", users: 250 },
  { name: "April", users: 310 },
  { name: "May", users: 360 },
  { name: "June", users: 290 },
];

export default function UserGrowthChart() {
  return (
    <div className="bg-white shadow rounded-2xl p-4 w-full">
      <h2 className="text-xl font-semibold mb-4">User Growth</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#f5f5f5" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} />
          <YAxis
            tickLine={false}
            axisLine={false}
            label={{ value: "New User", angle: -90, position: "insideLeft" }}
          />
          <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
          <Bar
            dataKey="users"
            fill="#0000FF"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
