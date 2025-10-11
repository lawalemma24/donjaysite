"use client";

import { FaCheckCircle } from "react-icons/fa";

const BookSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center animate-fadeIn">
        <div className="flex justify-center mb-4">
          <div className="bg-blue p-3 rounded-full">
            <FaCheckCircle className="text-white text-3xl" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">Booking Confirmed</h2>
        <p className="text-gray-600 text-sm mb-6">
          Your inspection has been successfully scheduled. Our team will contact
          you shortly with further details.
        </p>

        <button
          onClick={onClose}
          className="bg-blue hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default BookSuccessModal;
