"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import toast from "react-hot-toast";

const SellPage = () => {
  const [form, setForm] = useState({
    carName: "",
    year: "2023",
    condition: "used",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "",
    mileage: "",
    price: "",
    note: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Load saved data (editing)
  useEffect(() => {
    const stored = sessionStorage.getItem("carToReview");
    if (stored) {
      const car = JSON.parse(stored);
      setForm({
        carName: car.carName || "",
        year: car.year || "",
        condition: car.condition || "used",
        transmission: car.transmission || "Automatic",
        fuelType: car.fuelType || "Petrol",
        engine: car.engine || "",
        mileage: car.mileage || "",
        price: car.price || "",
        note: car.note || "",
      });
      setImages(car.images?.map((url) => ({ file: null, preview: url })) || []);
    }
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...previews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = [
      "carName",
      "year",
      "condition",
      "transmission",
      "fuelType",
      "engine",
      "mileage",
      "price",
    ];

    const missing = required.filter((key) => !form[key]?.trim());
    if (missing.length > 0) {
      toast.error("Please fill all required fields: " + missing.join(", "));
      return;
    }

    if (!images.length) {
      toast.error("Please upload at least one image.");
      return;
    }

    setLoading(true);

    try {
      const filesToUpload = images
        .filter((img) => img.file)
        .map((img) => img.file);

      let uploadedUrls = [];

      if (filesToUpload.length) {
        uploadedUrls = await uploadToCloudinary(filesToUpload);
      }

      // Combine already existing preview URLs for images without file
      const finalImages = images.map((img) =>
        img.file ? uploadedUrls.shift() : img.preview
      );

      const carToReview = {
        ...form,
        condition: form.condition.toLowerCase(),
        transmission: form.transmission.toLowerCase(),
        fuelType: form.fuelType.toLowerCase(),
        images: finalImages,
      };

      sessionStorage.setItem("carToReview", JSON.stringify(carToReview));

      router.push("/garage/sellofferreview");
    } catch (err) {
      console.error("Error uploading images:", err);
      toast.error("Failed to upload images.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home / Garage / Car Details / Sell
        </nav>
      </div>

      <div className="flex justify-center mb-16">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-center text-black mb-2">
            Sell Your Car
          </h1>
          <p className="text-black/80 text-center text-sm mb-8">
            Tell us about the car you want to sell
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* NAME + YEAR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Make/Name of car
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                  value={form.carName}
                  onChange={(e) =>
                    setForm({ ...form, carName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                >
                  {Array.from({ length: 30 }, (_, i) => 2025 - i).map((yr) => (
                    <option key={yr}>{yr}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* CONDITION + TRANSMISSION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Condition
                </label>
                <select
                  value={form.condition}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                  onChange={(e) =>
                    setForm({ ...form, condition: e.target.value })
                  }
                >
                  <option>used</option>
                  <option>new</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Transmission
                </label>
                <select
                  value={form.transmission}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                  onChange={(e) =>
                    setForm({ ...form, transmission: e.target.value })
                  }
                >
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>

            {/* ENGINE + MILEAGE (ADDED!) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Engine (e.g. 2.0L, 1500cc)
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                  value={form.engine}
                  onChange={(e) => setForm({ ...form, engine: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mileage (KM)
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                  value={form.mileage}
                  onChange={(e) =>
                    setForm({ ...form, mileage: e.target.value })
                  }
                />
              </div>
            </div>

            {/* PRICE + FUEL TYPE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Estimated Value
                </label>
                <input
                  type="text"
                  placeholder="Final decision after inspection"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <p className="text-red-400 text-xs">
                  This is not a final offer.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fuel type
                </label>
                <select
                  value={form.fuelType}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                  onChange={(e) =>
                    setForm({ ...form, fuelType: e.target.value })
                  }
                >
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                </select>
              </div>
            </div>

            {/* NOTE */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Note
              </label>
              <textarea
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border resize-none"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>

            {/* IMAGES */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images
              </label>

              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-blue font-medium"
                >
                  Upload Images
                </label>
                <p className="text-xs text-gray-500">
                  JPG, JPEG, PNG, HEIC. Max size 10MB
                </p>
              </div>

              <div className="flex flex-wrap mt-4 gap-4">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.preview}
                    className="rounded-lg border w-24 h-16 object-cover"
                  />
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue text-white font-medium py-3 rounded-xl shadow-lg"
              >
                {loading ? "Processing..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
