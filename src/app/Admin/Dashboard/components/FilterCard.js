"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function FilterCard({ onClose = () => {} }) {
  const [status, setStatus] = useState("All");
  const [quick, setQuick] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  function applyFilters() {
    onClose();
  }

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button className="p-1" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="mb-4">
        <div className="text-xs font-medium mb-2">Status</div>
        <div className="flex gap-2">
          {["All", "Active", "Suspended"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1 rounded-md text-xs ${
                status === s ? "bg-blue text-white" : "bg-gray-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="text-xs font-medium mb-2">Join date</div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {[
              { label: "Last 30 days", key: "30" },
              { label: "Last 6 months", key: "6m" },
              { label: "This year", key: "year" },
            ].map((q) => (
              <button
                key={q.key}
                onClick={() => setQuick(q.key)}
                className={`px-3 py-1 rounded-md text-xs ${
                  quick === q.key ? "bg-blue text-white" : "bg-gray-100"
                }`}
              >
                {q.label}
              </button>
            ))}
          </div>

          <div className="text-xs mt-2">Custom range</div>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="px-3 py-2 rounded border w-full text-xs border border-text-muted/60 focus:outline-none focus:ring-none "
              />
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="px-3 py-2 rounded border w-full text-xs border border-text-muted/60 focus:outline-none focus:ring-none "
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="px-3 py-2 rounded-md bg-gray-100">
          Cancel
        </button>
        <button
          onClick={applyFilters}
          className="px-3 py-2 rounded-md bg-blue text-white"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
