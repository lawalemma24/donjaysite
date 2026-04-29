"use client";
import { useState, useEffect } from "react";
import { FaRegCreditCard, FaUniversity, FaTruck } from "react-icons/fa";
import Image from "next/image";
import PaymentSuccessModal from "@/components/confirmpayment";
import dealsApi from "@/utils/dealsapi";
import Loader from "@/components/preloader";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";

const PaymentCard = () => {
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [car, setCar] = useState(null);
  const [deal, setDeal] = useState(null);

  // ✅ Load selected car from sessionStorage
  useEffect(() => {
    const savedCar = sessionStorage.getItem("selectedCar");
    if (savedCar) {
      setCar(JSON.parse(savedCar));
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReceiptFile(file);
      setReceiptPreview(URL.createObjectURL(file));
    }
  };

  const handlePayment = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      alert("Please log in to proceed with payment.");
      return;
    }

    if (!car || !car._id) {
      alert("Car not found. Please return to the car details page.");
      return;
    }

    if (!user) {
      alert("User information missing. Please re-login.");
      return;
    }

    if (!receiptFile) {
      alert("Please upload a payment receipt to continue.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Upload receipt to Cloudinary
      console.log("📤 Uploading receipt to Cloudinary...");
      const uploadResults = await uploadToCloudinary([receiptFile]);
      const receiptUrl = uploadResults[0]?.url || uploadResults[0];

      if (!receiptUrl) {
        throw new Error("Failed to get receipt URL from Cloudinary");
      }

      console.log("✅ Receipt uploaded:", receiptUrl);

      // 2. Create deal with receiptUrl
      const dealData = {
        dealType: "buy",
        primaryCarId: car._id,
        offerPrice: car.price,
        receiptUrl: receiptUrl,
        customerNote: `Interested in purchasing ${car.carName}`,
        customerContact: {
          phone: user.phoneNumber || "+254700000000",
          email: user.email,
          preferredContactMethod: "both",
        },
        priority: "medium",
        tags: ["payment", "buy-deal", "receipt-uploaded"],
      };

      console.log("🚀 Creating deal with data:", dealData);

      const response = await dealsApi.post("/", dealData);
      console.log("✅ Deal created successfully:", response.data);

      setDeal(response.data.deal);
      setOpen(true);
    } catch (error) {
      console.error("❌ Error during deal creation:", error.response?.data || error);
      alert(
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Failed to process deal."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!car) {
    return (
      <p className="text-center py-12 text-gray-500">
        No car selected. Please go back and choose a car.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home / Garage / Buy or Swap / Car Details / Summary / Info /{" "}
          <span className="text-blue font-medium">Buy</span>
        </nav>
      </div>

      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold text-center mb-2">Complete Purchase</h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Upload your payment receipt to finalize the deal
        </p>

        <div className="space-y-6">
          {/* Car Summary */}
          <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
            {car.images?.[0] && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={car.images[0]}
                  alt={car.carName}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-800">{car.carName}</h3>
              <p className="text-blue font-bold">₦{(car.price || 0).toLocaleString()}</p>
            </div>
          </div>

          {/* Bank Details */}
          <div className="bg-blue/5 border border-blue/10 rounded-xl p-5 mb-2">
            <h3 className="text-xs font-bold text-blue uppercase tracking-wider mb-3 flex items-center gap-2">
              <FaUniversity className="text-sm" /> Payment Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Bank Name</span>
                <span className="text-sm font-semibold text-gray-800">Sterling Bank</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Account Number</span>
                <span className="text-sm font-bold text-blue-600 font-mono">0094496531</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Account Name</span>
                <span className="text-sm font-semibold text-gray-800">Donjay Autos</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-500 mt-3 italic">
              * Please make payment to the account above before uploading your receipt.
            </p>
          </div>

          {/* Receipt Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Payment Receipt
            </label>
            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${receiptPreview ? 'border-blue bg-blue/5' : 'border-gray-300 hover:border-blue'
              }`}>
              <input
                type="file"
                accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
                id="receiptInput"
              />
              {!receiptPreview ? (
                <label htmlFor="receiptInput" className="cursor-pointer block">
                  <div className="flex flex-col items-center">
                    <FaUniversity className="text-gray-400 text-3xl mb-2" />
                    <span className="text-blue font-medium">Click to upload receipt</span>
                    <span className="text-xs text-gray-500 mt-1">
                      JPG, PNG, PDF or Word (Max 10MB)
                    </span>
                  </div>
                </label>
              ) : (
                <div className="relative group">
                  {receiptFile?.type?.includes('image') ? (
                    <img
                      src={receiptPreview}
                      alt="Receipt preview"
                      className="mx-auto max-h-48 rounded-lg shadow-sm"
                    />
                  ) : (
                    <div className="py-8 bg-white rounded-lg border flex flex-col items-center">
                      <FaUniversity className="text-blue text-3xl mb-2" />
                      <span className="text-sm font-medium">{receiptFile.name}</span>
                    </div>
                  )}
                  <label htmlFor="receiptInput" className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer">
                    <span className="text-white text-sm font-medium">Change Receipt</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Pay button */}
          <div className="pt-4">
            {isLoading && <Loader write="processing deal..." />}

            <button
              onClick={handlePayment}
              disabled={isLoading || !receiptFile}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${isLoading || !receiptFile
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue hover:bg-blue-700"
                }`}
            >
              {isLoading ? "Processing..." : "Complete Purchase"}
            </button>
          </div>

          <p className="text-[10px] text-gray-400 text-center px-4">
            By clicking Complete Purchase, you agree to our terms of service and acknowledge that your payment receipt will be reviewed by our admin team for verification.
          </p>

          <PaymentSuccessModal isOpen={open} onClose={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
