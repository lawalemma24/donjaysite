"use client";
import { useState } from "react";
import Image from "next/image";
import RelatedCars from "@/components/relatedcars";
import { Eye } from "lucide-react";
import Link from "next/link";

const allImages = [
  "/images/viewcar.png",
  "/images/viewcar2.png",
  "/images/gle.png",
  "/images/viewcar2.png",
  "/images/viewcar.png",
  "/images/gle.png",
  "/images/viewcar2.png",
  "/images/gle.png",
];

export default function CarDetails() {
  const [mainImage, setMainImage] = useState(allImages[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [activeTab, setActiveTab] = useState("offer");

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 ">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto  px-8 pt-4 mt-4">
          <nav className="text-sm text-gray-500 ">
            Home <span className="mx-1">/</span> Garage{" "}
            <span className="mx-1">/</span>
            <span className="text-gray-500 font-medium">Buy or Swap</span>
            <span className="mx-1">/</span>
            <span className="text-blue font-medium">Car Details</span>
          </nav>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 mt-4 gap-8">
          <div className="  ">
            <div
              className="relative w-full h-96 border border-lightgrey rounded-lg overflow-hidden cursor-pointer"
              onClick={() => {
                setModalImage(mainImage);
                setIsModalOpen(true);
              }}
            >
              <Image
                src={mainImage}
                alt="Car main view"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex gap-4 mt-4">
              {allImages.slice(0, 2).map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-20 border border-lightgrey rounded overflow-hidden cursor-pointer"
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}

              <div
                className="relative w-24 h-20 border border-lightgrey rounded overflow-hidden flex items-center justify-center bg-gray-100 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  src={allImages[3]}
                  alt="More images"
                  fill
                  className="object-cover opacity-70"
                />
                <span className="absolute text-white text-lg font-semibold bg-black/60 px-2 py-1 rounded">
                  +{allImages.length - 3}
                </span>
              </div>
            </div>
          </div>

          <div className="">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              2025 Mercedes Benz GLE
            </h1>

            <div className="bg-blue-100 text-blue-700 font-bold text-lg inline-block px-3 py-1 mb-2">
              ₦70,000,000
            </div>

            <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
              <Eye className="w-5 h-5" />
              <span>245 people viewed this car</span>
            </div>

            <div className="mb-6">
              <h2 className="font-bold text-lg mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                The 2025 GLE AMG combines luxury, power, and advanced tech in a
                bold SUV. With AMG styling, premium comfort, and cutting-edge
                safety, it’s built for drivers who demand performance and
                sophistication.
              </p>
            </div>

            <hr className="my-4 border-0 h-[1px] bg-lightgrey" />

            <div className="mb-6">
              <h2 className="font-bold text-lg mb-3">Specifications</h2>
              <div className="grid grid-cols-2 text-sm gap-y-2">
                <span className="text-gray-500">Condition:</span>
                <span className="text-gray-800">Brand New</span>
                <span className="text-gray-500">Make:</span>
                <span className="text-gray-800">Mercedes Benz</span>
                <span className="text-gray-500">Year:</span>
                <span className="text-gray-800">2025</span>
                <span className="text-gray-500">Transmission:</span>
                <span className="text-gray-800">Automatic</span>
                <span className="text-gray-500">Fuel Type:</span>
                <span className="text-gray-800">Hybrid</span>
                <span className="text-gray-500">Engine Size:</span>
                <span className="text-gray-800">3.0L V6</span>
                <span className="text-gray-500">Body Type:</span>
                <span className="text-gray-800">SUV</span>
                <span className="text-gray-500">Color:</span>
                <span className="text-gray-800">Black</span>
                <span className="text-gray-500">GVM:</span>
                <span className="text-gray-800">3200 kg</span>
                <span className="text-gray-500">Status:</span>
                <span className="text-gray-800">Available</span>
                <span className="text-gray-500">Seating Capacity:</span>
                <span className="text-gray-800">7</span>
              </div>
            </div>

            <hr className="my-4 border-0 h-[1px] bg-lightgrey" />

            <div className="flex gap-4 mt-6">
              <Link href="/garage/swapcar">
                <button className="flex-1 border border-blue-600 text-blue-600 rounded-lg px-9 py-2 font-medium hover:bg-blue-50">
                  Swap
                </button>
              </Link>

              <Link href="/garage/ordersummary">
                <button className="flex-1 bg-blue-600 text-white rounded-lg px-9 py-2 font-medium hover:bg-blue-700">
                  Buy
                </button>
              </Link>
            </div>

            <hr className="my-4 border-0 h-[1px] bg-lightgrey" />

            <div className="mb-6 mt-6">
              <h1 className="text-xl text-black font-semibold">
                Offer/Request
              </h1>
              <p className="text-lightgrey mb-2 text-sm">
                Only make an offer if you don't agree with the price
              </p>
              <div className="flex border-b border-lightgrey mb-4">
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "offer"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("offer")}
                >
                  Make an Offer
                </button>
                <button
                  className={`px-4 py-2 font-medium ${
                    activeTab === "question"
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("question")}
                >
                  Ask a Question
                </button>
              </div>

              {activeTab === "offer" && (
                <div>
                  <p className="text-lightgrey mb-2 text-sm">
                    Your Binding offer for this vihecle
                  </p>
                  <input
                    type="number"
                    placeholder="Enter your offer amount"
                    className="w-full border border-lightgrey rounded-lg px-4 py-2 mb-3"
                  />
                  <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700">
                    Submit Offer
                  </button>
                </div>
              )}

              {activeTab === "question" && (
                <div>
                  <textarea
                    placeholder="Type your question"
                    rows={3}
                    className="w-full border border-lightgrey rounded-lg px-4 py-2 mb-3"
                  />
                  <button className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700">
                    Submit Question
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-7xl bg-black rounded-lg flex flex-col md:flex-row overflow-hidden">
            <button
              className="absolute top-4 right-4 text-white text-2xl z-50"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <button
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl z-40"
              onClick={() =>
                setModalImage(
                  allImages[
                    (allImages.indexOf(modalImage) - 1 + allImages.length) %
                      allImages.length
                  ]
                )
              }
            >
              ‹
            </button>

            <div className="flex-1 flex items-center justify-center p-4">
              <Image
                src={modalImage || allImages[0]}
                alt="Large preview"
                width={1600}
                height={1000}
                className="object-contain w-full h-[75vh]"
              />
            </div>

            <button
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-40"
              onClick={() =>
                setModalImage(
                  allImages[
                    (allImages.indexOf(modalImage) + 1) % allImages.length
                  ]
                )
              }
            >
              ›
            </button>

            <div className="p-2 md:p-4">
              <div className="hidden md:flex flex-col space-y-3 w-32 overflow-y-auto">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative w-full h-24 rounded cursor-pointer border-2 ${
                      modalImage === img
                        ? "border-yellow-400"
                        : "border-transparent"
                    }`}
                    onClick={() => setModalImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      width={150}
                      height={100}
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              </div>

              <div className="flex md:hidden overflow-x-auto space-x-3 mt-4">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative w-28 h-20 rounded flex-shrink-0 cursor-pointer border-2 ${
                      modalImage === img
                        ? "border-yellow-400"
                        : "border-transparent"
                    }`}
                    onClick={() => setModalImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      width={120}
                      height={80}
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <RelatedCars />
    </>
  );
}
