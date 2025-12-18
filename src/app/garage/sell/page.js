"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import toast from "react-hot-toast";

const CAR_DATA = {
  Toyota: [
    "Corolla",
    "Camry",
    "RAV4",
    "Hilux",
    "Land Cruiser",
    "Prius",
    "Yaris",
    "C-HR",
    "Supra",
    "Fortuner",
    "Avalon",
    "Sequoia",
    "4Runner",
    "Mirai",
  ],

  Honda: [
    "Civic",
    "Accord",
    "CR-V",
    "Pilot",
    "HR-V",
    "Fit",
    "Odyssey",
    "Ridgeline",
    "Insight",
    "Passport",
  ],

  Ford: [
    "F-150",
    "Mustang",
    "Explorer",
    "Escape",
    "Ranger",
    "Edge",
    "Bronco",
    "Focus",
    "Fiesta",
    "EcoSport",
    "Expedition",
  ],

  Chevrolet: [
    "Silverado",
    "Malibu",
    "Camaro",
    "Equinox",
    "Tahoe",
    "Suburban",
    "Trailblazer",
    "Colorado",
    "Blazer",
    "Impala",
    "Corvette",
  ],

  BMW: [
    "1 Series",
    "2 Series",
    "3 Series",
    "4 Series",
    "5 Series",
    "7 Series",
    "X1",
    "X3",
    "X5",
    "X7",
    "Z4",
    "i3",
    "i4",
    "iX",
  ],

  MercedesBenz: [
    "A-Class",
    "C-Class",
    "E-Class",
    "S-Class",
    "GLA",
    "GLC",
    "GLE",
    "GLS",
    "EQC",
    "AMG GT",
  ],

  Audi: [
    "A3",
    "A4",
    "A6",
    "A8",
    "Q3",
    "Q5",
    "Q7",
    "Q8",
    "RS3",
    "RS7",
    "e-tron",
  ],

  Nissan: [
    "Altima",
    "Sentra",
    "Maxima",
    "Leaf",
    "Rogue",
    "Pathfinder",
    "Murano",
    "Armada",
    "370Z",
    "GT-R",
  ],

  Volkswagen: [
    "Golf",
    "Polo",
    "Passat",
    "Jetta",
    "Tiguan",
    "Atlas",
    "Arteon",
    "Beetle",
  ],

  Hyundai: [
    "Elantra",
    "Sonata",
    "Tucson",
    "Santa Fe",
    "Palisade",
    "Venue",
    "Ioniq 5",
    "Ioniq 6",
  ],

  Kia: [
    "Rio",
    "Forte",
    "Sportage",
    "Sorento",
    "Telluride",
    "Soul",
    "K5",
    "EV6",
  ],

  Subaru: ["Impreza", "WRX", "Legacy", "Outback", "Forester", "Crosstrek"],

  Mazda: ["Mazda3", "Mazda6", "CX-3", "CX-30", "CX-5", "CX-9", "MX-5 Miata"],

  Tesla: ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck"],

  Lexus: ["ES", "IS", "GS", "LS", "NX", "RX", "UX", "LC"],

  Porsche: ["911", "Boxster", "Cayman", "Cayenne", "Macan", "Taycan"],

  Jaguar: ["XE", "XF", "XJ", "F-Pace", "E-Pace", "I-Pace"],

  LandRover: ["Range Rover", "Discovery", "Defender", "Velar", "Evoque"],

  Volvo: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"],

  Renault: ["Clio", "Megane", "Captur", "Kadjar", "Talisman", "Scenic"],

  Peugeot: ["208", "308", "2008", "3008", "5008", "508"],

  Fiat: ["500", "Panda", "Punto", "Tipo", "500X"],

  Citroen: ["C3", "C4", "C5 Aircross", "Berlingo", "C3 Aircross"],

  Mitsubishi: ["Mirage", "Lancer", "Outlander", "Eclipse Cross", "ASX"],

  AudiSport: ["RS Q3", "RS Q8"],

  Acura: ["Integra", "TLX", "RDX", "MDX"],

  Infiniti: ["Q50", "Q60", "QX50", "QX60", "QX80"],
};

const SellPage = () => {
  const [form, setForm] = useState({
    carMake: "",
    carModel: "",
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

  const handleMakeChange = (e) => {
    const selectedMake = e.target.value;

    setForm((prev) => ({
      ...prev,
      carMake: selectedMake,
      carModel: "", // reset model when make changes
    }));
  };

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
      "carMake",
      "carModel",
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
            <div className="grid grid-cols-1  gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Car Make */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Car Make
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                    value={form.carMake}
                    onChange={handleMakeChange}
                  >
                    <option value="">Select Make</option>
                    {Object.keys(CAR_DATA).map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Car Model */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Car Model
                  </label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm h-10 px-3 border"
                    value={form.carModel}
                    onChange={(e) =>
                      setForm({ ...form, carModel: e.target.value })
                    }
                    disabled={!form.carMake}
                  >
                    <option value="">
                      {form.carMake ? "Select Model" : "Select Make First"}
                    </option>
                    {form.carMake &&
                      CAR_DATA[form.carMake].map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                  </select>
                </div>
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
                  <option>Brand New</option>
                  <option>Foreign Used</option>
                  <option>Pre-Owned</option>
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
