"use client";
import { useState } from "react";
import Modal from "./modal";
import api from "@/utils/api";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary"; // updated helper

const carData = {
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

export default function AddCarForm({
  onClose = () => {},
  onSuccess = () => {},
}) {
  const [formData, setFormData] = useState({
    carMake: "",
    carModel: "",
    year: "",
    condition: "",
    transmission: "",
    fuelType: "",
    engine: "",
    mileage: "",
    price: "",
    note: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...previews]);
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    if (!formData.carMake || !formData.carModel) {
      toast.error("Please select both car make and model");
      return;
    }

    try {
      setLoading(true);
      console.log("[CREATE CAR] Uploading images to Cloudinary...");

      const files = images.map((img) => img.file);
      const uploadedUrls = await uploadToCloudinary(files);

      const payload = {
        carMake: formData.carMake,
        carModel: formData.carModel,
        year: Number(formData.year),
        condition: formData.condition.toLowerCase(),
        transmission: formData.transmission.toLowerCase(),
        fuelType: formData.fuelType.toLowerCase(),
        engine: formData.engine,
        mileage: Number(formData.mileage),
        price: Number(formData.price),
        note: formData.note,
        images: uploadedUrls,
      };

      console.log("[CREATE CAR] Submitting payload:", payload);

      const res = await api.post("/", payload);
      console.log("[CREATE CAR] Server response:", res.data);

      if (res.status === 201) {
        toast.success(res.data.message || "Car added successfully");
        onSuccess();
        onClose();
      } else {
        toast.error("Unexpected server response");
      }
    } catch (err) {
      console.error("[CREATE CAR] Error:", err);
      toast.error(err.response?.data?.message || "Failed to create car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open onClose={onClose} size="lg">
      <div className="w-full h-screen md:h-auto flex items-center justify-center">
        <div className="relative w-full max-w-4xl h-full md:h-auto bg-white rounded-lg shadow flex flex-col">
          <div className="p-6 overflow-y-auto max-h-[80vh] md:max-h-[70vh]">
            <h2 className="text-2xl font-bold mb-1">Add Car</h2>
            <p className="text-text-muted mb-6">
              Fill in the details to list a new car for sale.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Car Make Dropdown */}
              <div>
                <label className="text-sm">Make</label>
                <select
                  name="carMake"
                  value={formData.carMake}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      carMake: e.target.value,
                      carModel: "", // reset model when make changes
                    })
                  }
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue outline-none"
                >
                  <option value="">Select Make</option>
                  {Object.keys(carData).map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </div>

              {/* Car Model Dropdown */}
              <div>
                <label className="text-sm">Model</label>
                <select
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  disabled={!formData.carMake}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue outline-none"
                >
                  <option value="">Select Model</option>
                  {formData.carMake &&
                    carData[formData.carMake].map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                </select>
              </div>

              <FormSelect
                label="Year"
                name="year"
                options={[2025, 2024, 2023, 2022, 2021]}
                onChange={handleChange}
              />

              <FormSelect
                label="Condition"
                name="condition"
                options={["new", "used", "certified pre-owned"]}
                onChange={handleChange}
              />

              <FormSelect
                label="Transmission"
                name="transmission"
                options={["automatic", "manual", "cvt"]}
                onChange={handleChange}
              />

              <FormSelect
                label="Fuel Type"
                name="fuelType"
                options={[
                  "petrol",
                  "diesel",
                  "electric",
                  "hybrid",
                  "cng",
                  "lpg",
                ]}
                onChange={handleChange}
              />

              <FormField
                label="Engine"
                name="engine"
                type="text"
                placeholder="3.0 L Inline-6 turbo + hybrid"
                onChange={handleChange}
              />

              <FormField
                label="Mileage"
                name="mileage"
                type="number"
                placeholder="16300"
                onChange={handleChange}
              />

              <FormField
                label="Price"
                name="price"
                type="number"
                placeholder="7000000"
                onChange={handleChange}
              />
            </div>

            <div className="mt-4">
              <label className="text-sm">Additional Note (Optional)</label>
              <textarea
                name="note"
                rows="3"
                onChange={handleChange}
                className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue outline-none"
              ></textarea>
            </div>

            <div className="mt-6">
              <label className="text-sm mb-2 block">Images</label>
              <div className="border-2 border-text-muted border-dashed rounded-md p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer text-blue border border-blue px-4 py-1 rounded-md"
                >
                  Upload
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Choose images or drag and drop here (JPG, PNG, Max 10MB)
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {images.map((img, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={img.preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 p-4 border-t bg-white">
            <button onClick={onClose} className="px-6 py-2 border rounded-md">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-blue text-white rounded-md"
            >
              {loading ? "Adding..." : "Add Car"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function FormField({ label, name, type, placeholder, onChange }) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue outline-none"
      />
    </div>
  );
}

function FormSelect({ label, name, options, onChange }) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <select
        name={name}
        onChange={onChange}
        className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue outline-none"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt.toString().toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
