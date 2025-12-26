"use client";
import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ListedCarDetails({ car, onClose }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!car) return null;

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const images = car.images?.length ? car.images : ["/images/default-car.png"];

  const nextImage = () => setLightboxIndex((lightboxIndex + 1) % images.length);
  const prevImage = () =>
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-start overflow-y-auto pt-10"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-3">Car Details</h2>

        <div className="flex justify-between items-center mb-4">
          <Image
            src={images[0]}
            alt={car.carName || "-"}
            width={90}
            height={90}
            className="rounded-md mb-2 object-cover"
          />
          <div className="flex flex-col items-end gap-2">
            <p className="text-xs font-medium">
              Status:
              <span
                className={`ml-2 px-2 py-1 rounded-full text-[11px] font-semibold ${
                  statusColors[car.status?.toLowerCase()] ||
                  "bg-gray-100 text-gray-600"
                }`}
              >
                {car.status || "-"}
              </span>
            </p>
            {/* View Images Button */}
            {images.length > 1 && (
              <button
                onClick={() => setLightboxIndex(0)}
                className="text-blue-600 text-xs underline"
              >
                View Images ({images.length})
              </button>
            )}
          </div>
        </div>

        {/* Car Info */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Uploaded By</h3>
          <p className="flex justify-between">
            <span className="text-lightgrey">Name:</span>
            <span className="text-black">{car.owner?.name || "-"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Role:</span>
            <span className="text-red-400">{car.owner?.role || "-"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Email:</span>
            <span className="text-black text-xs">
              {car.owner?.email || "-"}
            </span>
          </p>

          <h3 className="font-semibold mb-1 mt-4">Car Information</h3>
          <p className="flex justify-between">
            <span className="text-lightgrey">Make:</span>
            <span className="text-black">{car.carName || "-"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Year:</span>
            <span className="text-black">{car.year || "-"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Condition:</span>
            <span className="text-black">{car.condition || "-"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Transmission:</span>
            <span className="text-black">
              {car.transmission || "Automatic"}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Fuel Type:</span>
            <span className="text-black">{car.fuelType || "Petrol"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Mileage:</span>
            <span className="text-black">{car.mileage || "-"}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-lightgrey">Engine:</span>
            <span className="text-black">{car.engine || "-"}</span>
          </p>

          <h3 className="font-semibold mb-1 mt-4">Price Information</h3>
          <p className="flex justify-between">
            <span className="text-lightgrey">Price:</span>
            <span className="text-black">
              {car.formattedPrice || car.price || "-"}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-blue text-blue rounded-lg"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue text-white rounded-lg">
            Download Details
          </button>
        </div>

        {/* Lightbox with navigation */}
        {lightboxIndex !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Previous */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 text-white p-2 rounded-full hover:bg-gray-800/50"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            <Image
              src={images[lightboxIndex]}
              alt={`Car-${lightboxIndex}`}
              width={800}
              height={600}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            {/* Next */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 text-white p-2 rounded-full hover:bg-gray-800/50"
              >
                <ChevronRight size={32} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
