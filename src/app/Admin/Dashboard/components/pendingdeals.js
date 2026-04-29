// src/app/Admin/Dashboard/components/pendingdeals.js
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import dealsApi from "@/utils/dealsapi";

export default function PendingDealsCard() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        setLoading(true);
        const response = await dealsApi.get("/admin/all", {
          params: { status: "pending" },
        });
        setCount(response.data.pagination.totalDeals);
      } catch (error) {
        console.error("Failed to fetch pending deals count", error);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingCount();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
      <div className="bg-orange-100 text-orange-600 p-2 sm:p-3 rounded-full">
        <Clock size={22} />
      </div>

      <div>
        <p className="text-gray-500 text-sm font-medium">Pending Deals</p>
        <p className="text-xl sm:text-2xl font-bold text-black">
          {loading ? "..." : count ?? "0"}
        </p>
      </div>
    </div>
  );
}
