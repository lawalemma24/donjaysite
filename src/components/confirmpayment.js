"use client";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center animate-fadeIn">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue p-3 rounded-full">
            <FaCheckCircle className="text-white text-3xl" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-6">
          Thank you for your purchase. Your order has been confirmed, and a
          confirmation email with the details has been sent to your mail.
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="bg-blue hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
