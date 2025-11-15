"use client";
import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const ConfirmSwapOverlay = ({ onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
        <AiOutlineExclamationCircle className="w-12 h-12 text-yellow-500 block mx-auto mb-7 mt-4" />
        <h2 className="text-xl font-semibold mb-3">Confirm Submission?</h2>
        <p className="text-text-muted text-sm mb-6">
          This will submit your sell request for review. You cannot undo this
          action.
        </p>
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full bg-white text-blue py-1 rounded shadow border border-blue"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              onSubmit();
            }}
            className="w-full bg-blue text-white font-medium py-3 rounded shadow hover:bg-blue-700 transition"
          >
            Yes, Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSwapOverlay;
