"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function FilterCard({
  onApply = () => {},
  onReset = () => {},
  onClose = () => {},
}) {
  const [status, setStatus] = useState("All");
  const [quick, setQuick] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  function applyFilters() {
    onApply({ status, quick, from, to });
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

      {/* Status */}
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

      {/* Dates */}
      <div className="mb-4">
        <div className="text-xs font-medium mb-2">Join date</div>

        <div className="flex gap-2 mb-2">
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

        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full mb-2 px-3 py-2 rounded border text-xs"
        />

        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full px-3 py-2 rounded border text-xs"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setStatus("All");
            setQuick(null);
            setFrom("");
            setTo("");
            onReset();
            onClose();
          }}
          className="px-3 py-2 rounded-md bg-gray-100"
        >
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
