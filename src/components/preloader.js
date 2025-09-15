"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-9999999">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
    </div>
  );
}
