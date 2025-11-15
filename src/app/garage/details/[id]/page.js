"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Eye } from "lucide-react";
import RelatedCars from "@/components/relatedcars";
import api from "@/utils/api";
import ConfirmBookOverlay from "@/components/confirmbooking";
import BookSuccessModal from "@/components/bookconfirmed";
import NotRegisteredOverlay from "@/components/notuser";
import { useAuth } from "@/app/contexts/AuthContext";
import Loader from "@/components/preloader";

export default function CarDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("/images/placeholder.png");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showNotRegistered, setShowNotRegistered] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await api.get(`/${id}`);
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

  const handleBookInspection = () => {
    if (!user || user.role !== "customer") {
      setShowNotRegistered(true);
      return;
    }
    sessionStorage.setItem("selectedCar", JSON.stringify(car));
    router.push(`/inspection?carId=${car.id}`);
  };

  const handleBuyClick = () => {
    if (!user || user.role !== "customer") {
      setShowNotRegistered(true);
      return;
    }
    sessionStorage.setItem("selectedCar", JSON.stringify(car));
    router.push("/garage/ordersummary");
  };

  const handleSwapClick = () => {
    if (!user || user.role !== "customer") {
      setShowNotRegistered(true);
      return;
    }
    // Store selected car in sessionStorage
    sessionStorage.setItem("selectedCar", JSON.stringify(car));
    router.push("/garage/swapcar");
  };

  if (loading) return <Loader write="Loading car details..." />;
  if (!car)
    return <p className="text-center py-12 text-red-500">Car not found.</p>;

  const allImages =
    car.images?.length > 0 ? car.images : ["/images/placeholder.png"];

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-8 pt-4 mt-4">
          <nav className="text-sm text-gray-500">
            Home <span className="mx-1">/</span> Garage{" "}
            <span className="mx-1">/</span>
            <span className="text-gray-500 font-medium">Buy or Swap</span>
            <span className="mx-1">/</span>
            <span className="text-blue font-medium">{car.carName}</span>
          </nav>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 mt-4 gap-8">
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
              {allImages.slice(0, 4).map((img, idx) => (
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

            <div className="my-4">
              <h3 className="text-xl font-bold">Car Description</h3>
              <p className="text-sm text-text-muted">{car.note}</p>
            </div>

            <div className="my-4 space-y-2">
              <h3 className="text-xl font-bold">Specifications</h3>
              <p className="flex justify-between text-sm">
                <span>Condition:</span>{" "}
                <span className="text-text-muted">{car.condition}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span>Transmission:</span>{" "}
                <span className="text-text-muted">{car.transmission}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span>Fuel Type:</span>{" "}
                <span className="text-text-muted">{car.fuelType}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span>Engine:</span>{" "}
                <span className="text-text-muted">{car.engine}</span>
              </p>
              <p className="flex justify-between text-sm">
                <span>Mileage:</span>{" "}
                <span className="text-text-muted">{car.mileage}</span>
              </p>
            </div>

            <button
              onClick={handleBookInspection}
              disabled={submitting}
              className="w-full border border-blue-600 text-blue-600 rounded-lg px-9 py-2 font-medium hover:bg-blue-50 mt-4"
            >
              {submitting ? "Processing..." : "Book Inspection"}
            </button>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSwapClick}
                className="flex-1 border border-blue-600 text-blue-600 rounded-lg px-9 py-2 font-medium hover:bg-blue-50"
              >
                Swap
              </button>
              <button
                onClick={handleBuyClick}
                className="flex-1 bg-blue-600 text-white rounded-lg px-9 py-2 font-medium hover:bg-blue-700"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <button
            className="absolute top-4 right-4 text-white text-2xl z-50"
            onClick={() => setIsModalOpen(false)}
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

      <RelatedCars />

      {showNotRegistered && (
        <NotRegisteredOverlay
          onRegisterClick={() => router.push("/auth/register")}
          onClose={() => setShowNotRegistered(false)}
        />
      )}
    </>
  );
}
