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
  { month: "Mar", revenue: 290 },
  { month: "Apr", revenue: 170 },
  { month: "May", revenue: 320 },
  { month: "Jun", revenue: 180 },
];

export default function RevenueTrendChart() {
  return (
    <div className="bg-white rounded-2xl shadow p-3 sm:p-4 w-full overflow-hidden">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center sm:text-left">
        Revenue Trend
      </h2>

      {/* Fixed responsive height */}
      <div className="w-full h-56 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10 }}
            />
            <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip
              wrapperStyle={{
                fontSize: 12,
                backgroundColor: "white",
                borderRadius: "6px",
                border: "1px solid #ddd",
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 4, fill: "#f97316" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
