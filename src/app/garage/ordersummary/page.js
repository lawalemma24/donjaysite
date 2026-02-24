"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Mail, Phone, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function OrderSummaryOverlay({ onClose }) {
  const [car, setCar] = useState(null);
  const [showCallOptions, setShowCallOptions] = useState(false);
  const [showEmailOptions, setShowEmailOptions] = useState(false);

  const phoneNumber = "+2349082824893";
  const emailAddress = "lawalemma24@gmail.com";

  useEffect(() => {
    const savedCar = sessionStorage.getItem("selectedCar");
    if (savedCar) setCar(JSON.parse(savedCar));
  }, []);

  if (!car) return null;

  const message = `
Hello, I’m interested in this car:

Car Name: ${car.carName}
Price: ₦${car.price?.toLocaleString()}
Condition: ${car.condition}
Transmission: ${car.transmission}
Fuel Type: ${car.fuelType}
Engine: ${car.engine}
Mileage: ${car.mileage}

Please provide more details.
`;

  const encodedMessage = encodeURIComponent(message);

  // Detect mobile
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(phoneNumber);
    alert("Phone number copied!");
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    alert(`Email address ${emailAddress} copied to clipboard!`);
  };

  const handleEmailOption = (option) => {
    if (option === "send") {
      window.location.href = `mailto:${emailAddress}?subject=Car Inquiry - ${car.carName}&body=${encodedMessage}`;
    } else if (option === "copy") {
      handleCopyEmail();
    }
    setShowEmailOptions(false);
  };

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 sm:gap-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="py-4 md:py-6 px-4 flex justify-center">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-28 md:w-35 h-auto object-contain"
          />
        </div>

        {/* Car Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
          <div className="w-full sm:w-32 rounded overflow-hidden flex-shrink-0">
            <Image
              src={car.images?.[0] || "/images/placeholder.png"}
              alt={car.carName || "Car"}
              width={400}
              height={300}
              className="w-full h-auto max-h-48 sm:max-h-none object-contain rounded"
            />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h3 className="font-semibold">{car.carName}</h3>
            <p className="text-blue-600 font-bold">
              ₦{car.price?.toLocaleString() || "N/A"}
            </p>
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <span className="text-black font-semibold">Condition:</span>
            <span className="text-gray-500">{car.condition || "N/A"}</span>

            <span className="text-black font-semibold">Transmission:</span>
            <span className="text-gray-500">{car.transmission || "N/A"}</span>

            <span className="text-black font-semibold">Fuel Type:</span>
            <span className="text-gray-500">{car.fuelType || "N/A"}</span>

            <span className="text-black font-semibold">Engine:</span>
            <span className="text-gray-500">{car.engine || "N/A"}</span>

            <span className="text-black font-semibold">Mileage:</span>
            <span className="text-gray-500">{car.mileage || "N/A"}</span>
          </div>
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-col gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-sm rounded-lg px-4 py-2 hover:opacity-90"
          >
            <FaWhatsapp size={18} />
            WhatsApp Seller
          </a>

          {/* Email Button with Options */}
          <button
            onClick={() => setShowEmailOptions(!showEmailOptions)}
            className="flex items-center justify-center gap-2 w-full bg-[#EA4335] text-white font-sm rounded-lg px-4 py-2 hover:opacity-90"
          >
            <Mail size={20} />
            Email Seller
          </button>

          {showEmailOptions && (
            <div className="flex flex-col gap-2 mt-2">
              {isMobile && (
                <button
                  onClick={() => handleEmailOption("send")}
                  className="w-full bg-gray-100 py-2 rounded-lg hover:bg-gray-200"
                >
                  Send Email
                </button>
              )}
              <button
                onClick={() => handleEmailOption("copy")}
                className="w-full bg-gray-100 py-2 rounded-lg hover:bg-gray-200"
              >
                Copy Email Address
              </button>
            </div>
          )}

          {/* Call Button with Options */}
          <button
            onClick={() => setShowCallOptions(!showCallOptions)}
            className="flex items-center justify-center gap-2 w-full bg-[#007BFF] text-white font-sm rounded-lg px-4 py-2 hover:opacity-90"
          >
            <Phone size={18} />
            Call Seller
          </button>

          {showCallOptions && (
            <div className="flex flex-col gap-2 mt-2">
              <a
                href={`tel:+${phoneNumber}`}
                className="block text-center bg-gray-100 py-2 rounded-lg hover:bg-gray-200"
              >
                Call Direct
              </a>
              <button
                onClick={handleCopyNumber}
                className="w-full bg-gray-100 py-2 rounded-lg hover:bg-gray-200"
              >
                Copy Number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
