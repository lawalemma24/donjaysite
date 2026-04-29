// src/app/Admin/Dashboard/components/completeddeals.js
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import dealsApi from "@/utils/dealsapi";

export default function DealsCompletedCard() {
  const [count, setCount] = useState(null); // ← Fixed: no <number | null>
  const [loading, setLoading] = useState(true); // ← Fixed: plain boolean

  useEffect(() => {
    const fetchCompletedCount = async () => {
      try {
        setLoading(true);
        const response = await dealsApi.get("/admin/all", {
          params: { status: "approved" },
        });
        setCount(response.data.pagination.totalDeals);
      } catch (error) {
        console.error("Failed to fetch completed deals count", error);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedCount();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
      <div className="bg-green-100 text-green-600 p-2 sm:p-3 rounded-full">
        <CheckCircle size={22} />
      </div>

      <div>
        <p className="text-gray-500 text-sm font-medium">Deals Approved</p>
        <p className="text-xl sm:text-2xl font-bold text-black">
          {loading ? "..." : count ?? "0"}
        </p>
      </div>
    </div>
  );
}
