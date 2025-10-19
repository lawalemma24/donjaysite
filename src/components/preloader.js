"use client";
import { useEffect, useState } from "react";

export default function Loader({ write = "" }) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999999]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mb-4"></div>
      {write && (
        <p className="text-gray-700 text-sm font-medium capitalize">{write}</p>
      )}
    </div>
  );
}
