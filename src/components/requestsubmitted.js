"use client";
import Link from "next/link";
import React from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";

const RequestSubmitted = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
        <AiOutlineCheckCircle className="w-12 h-12 text-green-600 block mx-auto mb-7 mt-4" />
        <h2 className="text-xl font-semibold mb-3">Request Submitted!</h2>
        <p className="text-text-muted text-sm mb-6">
          Your swap request has been submitted. We'll review it and contact you
          in 24 hours to schedule a physical inspection and provide a final
          offer.
        </p>
        <Link href="/garage/buy-swap">
          <button
            onClick={onClose}
            className="w-full bg-blue text-white font-medium py-3 rounded shadow hover:bg-blue-700 transition"
          >
            Done
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RequestSubmitted;
