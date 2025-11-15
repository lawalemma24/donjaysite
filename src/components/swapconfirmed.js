"use client";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const SwapSuccessModal = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleDone = () => {
    onClose();
    router.push("/garage/swapcar");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center animate-fadeIn">
        <div className="flex justify-center mb-4">
          <div className="bg-blue p-3 rounded-full">
            <FaCheckCircle className="text-white text-3xl" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">Request Submitted</h2>

        <p className="text-gray-600 text-sm mb-6">
          Your request has been received. We will contact you via email within
          24 hours to schedule a physical inspection and provide a final offer
          for your car.
        </p>

        <button
          onClick={handleDone}
          className="bg-blue hover:bg-blue-700 text-white px-6 py-2 rounded-md font-semibold"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SwapSuccessModal;
