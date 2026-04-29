"use client";
import { useEffect, useState } from "react";

export default function Loader({ write = "" }) {
  return (
    <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-2 border-blue-200 opacity-30"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-orange-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-t-4 border-blue-600 animate-spin [animation-duration:1.5s]"></div>
        </div>

        <div className="flex items-center gap-1 text-sm font-semibold tracking-widest text-gray-800">
          <span>{write}</span>
          <span className="animate-pulse text-orange-500">.</span>
          <span className="animate-pulse [animation-delay:0.2s] text-orange-500">
            .
          </span>
          <span className="animate-pulse [animation-delay:0.4s] text-orange-500">
            .
          </span>
        </div>
      </div>
    </div>
  );
}
