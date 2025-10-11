"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import RelatedCars from "@/components/relatedcars";
import api from "@/utils/api";
import ConfirmBookOverlay from "@/components/confirmbooking";
import BookSuccessModal from "@/components/bookconfirmed";
import { useRouter } from "next/navigation";

export default function CarDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("/images/placeholder.png");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [activeTab, setActiveTab] = useState("offer");

  // new states
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  console.log("🟦 useParams ID:", id);
  // Fetch car data
  useEffect(() => {
    const fetchCar = async () => {
      console.log("Fetching car with ID:", id);
      try {
        const res = await api.get(`/${id}`);

        console.log("API response:", res.data);
        const fetchedCar = res.data?.car || null;

        setCar(fetchedCar);
        setMainImage(fetchedCar?.images?.[0] || "/images/placeholder.png");
      } catch (err) {
        console.error("Error fetching car:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCar();
  }, [id]);

  const handleThumbnailClick = (img) => setMainImage(img);
  const handleMainImageClick = () => {
    setModalImage(mainImage);
    setIsModalOpen(true);
  };
  const handleModalClose = () => setIsModalOpen(false);

  // 🟦 BOOKING HANDLER

  const handleBookInspection = () => {
    if (!car || !car.id) return;

    // Save the selected car details temporarily
    sessionStorage.setItem("selectedCar", JSON.stringify(car));

    // Redirect to inspection page with carId in the query
    router.push(`/inspection?carId=${car.id}`);
  };

  const submitBooking = async () => {
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to book an inspection.");
        return;
      }

      const res = await api.post(
        `/bookings`,
        { carId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Booking success:", res.data);
      setShowSuccess(true);
    } catch (err) {
      console.error("Booking failed:", err.response?.data || err);
      alert("Failed to book inspection. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <p className="text-center py-12 text-gray-500">Loading car details...</p>
    );
  if (!car)
    return <p className="text-center py-12 text-red-500">Car not found.</p>;

  const allImages =
    car.images?.length > 0 ? car.images : ["/images/placeholder.png"];

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-8 pt-4 mt-4">
          <nav className="text-sm text-gray-500">
            Home <span className="mx-1">/</span> Garage{" "}
            <span className="mx-1">/</span>
            <span className="text-gray-500 font-medium">Buy or Swap</span>
            <span className="mx-1">/</span>
            <span className="text-blue font-medium">{car.carName}</span>
          </nav>
        </div>

        {/* Top grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 mt-4 gap-8">
          {/* LEFT: IMAGES */}
          <div>
            <div
              className="relative w-full h-96 border border-lightgrey rounded-lg overflow-hidden cursor-pointer"
              onClick={handleMainImageClick}
            >
              <Image
                src={mainImage || "/images/placeholder.png"}
                alt={car.carName || "Car"}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex gap-4 mt-4">
              {allImages.slice(0, 2).map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-24 h-20 border border-lightgrey rounded overflow-hidden cursor-pointer"
                  onClick={() => handleThumbnailClick(img)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {car.carName}
            </h1>
            <div className="bg-blue-100 text-blue-700 font-bold text-lg inline-block px-3 py-1 mb-2">
              ₦{car.price?.toLocaleString() || "N/A"}
            </div>

            <div className="flex items-center gap-2 text-sm text-green-600 mb-4">
              <Eye className="w-5 h-5" />
              <span>{car.views || 0} people viewed this car</span>
            </div>
            <div className="my-4 ">
              <h3 className="text-xl font-bold ">Car Description</h3>
              <p className="text-sm text-text-muted">{car.note}</p>
            </div>
            <div className="my-4 space-y-2 ">
              <h3 className="text-xl font-bold ">Specifications</h3>
              <p className="flex justify-between text-sm">
                <span>Condition:</span>
                <span className="text-text-muted">{car.condition}</span>
              </p>

              <p className="flex justify-between text-sm">
                <span>Transmission:</span>
                <span className="text-text-muted">{car.transmission}</span>
              </p>

              <p className="flex justify-between text-sm">
                <span>Fuel Type:</span>
                <span className="text-text-muted">{car.fuelType}</span>
              </p>

              <p className="flex justify-between text-sm">
                <span>Engine:</span>
                <span className="text-text-muted">{car.engine}</span>
              </p>

              <p className="flex justify-between text-sm">
                <span>Mileage:</span>
                <span className="text-text-muted">{car.mileage}</span>
              </p>
            </div>

            {/* Book inspection */}
            <button
              onClick={handleBookInspection}
              disabled={submitting}
              className="w-full border border-blue-600 text-blue-600 rounded-lg px-9 py-2 font-medium hover:bg-blue-50 mt-4"
            >
              {submitting ? "Processing..." : "Book Inspection"}
            </button>

            <div className="flex gap-4 mt-6">
              <Link href="/garage/swapcar">
                <button className="flex-1 border border-blue-600 text-blue-600 rounded-lg px-9 py-2 font-medium hover:bg-blue-50">
                  Swap
                </button>
              </Link>

              <Link href="/garage/ordersummary">
                <button
                  onClick={() => {
                    sessionStorage.setItem("selectedCar", JSON.stringify(car));
                  }}
                  className="flex-1 bg-blue-600 text-white rounded-lg px-9 py-2 font-medium hover:bg-blue-700"
                >
                  Buy
                </button>
              </Link>
            </div>

            {/* Offer / Question Tabs */}
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
                    Your Binding offer for this vehicle
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

      {/* Fullscreen image preview */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <button
            className="absolute top-4 right-4 text-white text-2xl z-50"
            onClick={handleModalClose}
          >
            ✕
          </button>
          <div className="flex-1 flex items-center justify-center p-4">
            <Image
              src={modalImage || mainImage}
              alt="Large preview"
              width={1600}
              height={1000}
              className="object-contain w-full h-[75vh]"
            />
          </div>
        </div>
      )}

      {/* Confirm & Success overlays */}
      {showConfirm && (
        <ConfirmBookOverlay
          onClose={() => setShowConfirm(false)}
          onSubmit={submitBooking}
        />
      )}

      <BookSuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

      <RelatedCars />
    </>
  );
}
