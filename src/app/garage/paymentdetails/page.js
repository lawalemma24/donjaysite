"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";
import dealsApi from "@/utils/dealsapi";
import Loader from "@/components/preloader";

const PaymentCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [car, setCar] = useState(null);
  const [deal, setDeal] = useState(null);

  const [showReceiptOverlay, setShowReceiptOverlay] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedCar = sessionStorage.getItem("selectedCar");
    if (savedCar) setCar(JSON.parse(savedCar));
  }, []);

  const handleReceiptChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setReceiptFile(file);

    if (file.type.startsWith("image/")) {
      setReceiptPreview(URL.createObjectURL(file));
    } else {
      setReceiptPreview(null);
    }
  };

  const handleAlreadyPaid = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user || !car?._id) {
      alert("Missing required information.");
      return;
    }

    setIsLoading(true);

    try {
      const dealData = {
        dealType: "buy",
        primaryCarId: car._id,
        offerPrice: car.price,
        customerNote: `Already paid for ${car.carName}`,
        customerContact: {
          phone: user.phoneNumber || "+254700000000",
          email: user.email,
          preferredContactMethod: "both",
        },
        priority: "medium",
        tags: ["manual-payment"],
      };

      const response = await dealsApi.post("/", dealData);
      setDeal(response.data.deal);
      setShowReceiptOverlay(true);
    } catch {
      alert("Failed to create deal");
    } finally {
      setIsLoading(false);
    }
  };

  if (!car) {
    return <p className="text-center py-12 text-gray-500">No car selected.</p>;
  }

  const accountNumber = "0094496531";

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy account number");
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold text-center mb-6">Payment Details</h2>

        {/* AMOUNT */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-center">
          <p className="text-sm text-gray-600">Amount to Pay</p>
          <p className="text-2xl font-bold text-blue">
            ₦{(car.price || 0).toLocaleString()}
          </p>
        </div>

        {/* BANK DETAILS */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-sm">
          <p className="font-semibold mb-2">Bank Transfer Details</p>
          <p>
            <span className="font-bold">Bank:</span> Sterling Bank
          </p>
          <p>
            <span className="font-bold">Account Name:</span> Donjay Autos
          </p>
          <p className="flex items-center justify-between gap-2">
            <span>
              <span className="font-bold">Account Number:</span>{" "}
              <span className="tracking-widest">0094496531</span>
            </span>

            <button
              onClick={copyAccountNumber}
              className="text-xs px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition"
            >
              {copied ? "Copied ✅" : "Copy"}
            </button>
          </p>

          <p className="text-xs text-gray-500 mt-2">
            Use <b>{car.carName}</b> as payment reference
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="space-y-3">
          <button
            onClick={handleAlreadyPaid}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full py-3 bg-blue text-white rounded-md font-semibold"
          >
            <FaCheckCircle size={16} />
            Verify Payment
          </button>
          <a
            href={`https://wa.me/2349082824893?text=Hi, I want to pay ₦${car.price} for ${car.carName}`}
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white rounded-md font-semibold"
          >
            <FaWhatsapp size={18} />
            Verify via WhatsApp
          </a>

          <a
            href="tel:+2349082824893"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-800 text-white rounded-md font-semibold"
          >
            <FaPhoneAlt size={16} />
            Call for Assistance
          </a>

          {isLoading && <Loader write="creating deal" />}
        </div>
      </div>

      {/* RECEIPT OVERLAY */}
      {showReceiptOverlay && deal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Upload Payment Receipt</h3>

            {/* UPLOAD CARD */}
            <label className="block cursor-pointer mb-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue transition">
                <p className="font-medium text-gray-700">
                  Click to upload receipt
                </p>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG or PDF</p>
              </div>

              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleReceiptChange}
                className="hidden"
              />
            </label>

            {/* PREVIEW */}
            {receiptPreview && (
              <Image
                src={receiptPreview}
                alt="Receipt Preview"
                width={300}
                height={200}
                className="rounded-md mb-3 object-contain"
              />
            )}

            {!receiptPreview && receiptFile && (
              <p className="text-sm text-gray-600 mb-3">
                📄 {receiptFile.name}
              </p>
            )}

            {/* SUBMIT */}
            <button
              disabled={!receiptFile}
              className={`w-full py-2 rounded-md font-semibold transition ${
                receiptFile
                  ? "bg-blue text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              onClick={() => {
                // upload receipt using deal._id
                setShowReceiptOverlay(false);
              }}
            >
              Submit Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PaymentCard;
