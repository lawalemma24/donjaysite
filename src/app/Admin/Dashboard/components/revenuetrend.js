"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", revenue: 150 },
  { month: "Feb", revenue: 90 },
  { month: "March", revenue: 290 },
  { month: "April", revenue: 170 },
  { month: "May", revenue: 320 },
  { month: "June", revenue: 180 },
];

export default function RevenueTrendChart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Revenue Trend</h2>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={{ stroke: "#000", strokeWidth: 2 }}
              tickLine={false}
              tick={{ fontSize: 14, fill: "#000" }}
            />
            <YAxis
              label={{
                value: "Revenue (₦M)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fontSize: 14,
              }}
              tick={{ fontSize: 14 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#FFA500"
              strokeWidth={3}
              dot={{ r: 6, fill: "#FFA500" }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
