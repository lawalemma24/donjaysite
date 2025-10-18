"use client";
import { useState } from "react";
import Modal from "./modal";
import api from "@/utils/api";
import toast from "react-hot-toast";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary"; // your upload helper

export default function AddCarForm({
  onClose = () => {},
  onSuccess = () => {},
}) {
  const [formData, setFormData] = useState({
    carName: "",
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

  // handle form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // local previews for UI
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

    try {
      setLoading(true);
      console.log("[CREATE CAR] Uploading images to Cloudinary...");

      // 1️⃣ Upload all selected images to Cloudinary
      const uploadedUrls = [];
      for (const img of images) {
        const url = await uploadToCloudinary(img.file);
        uploadedUrls.push(url);
      }

      console.log("Uploaded image URLs:", uploadedUrls);

      // 2️⃣ Prepare final payload
      const payload = {
        carName: formData.carName,
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

      // 3️⃣ Send POST request to API
      const res = await api.post("/", payload);
      console.log("[CREATE CAR] Server response:", res.data);

      // 4️⃣ Handle success
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
              <FormField
                label="Make/Name of car"
                name="carName"
                type="text"
                placeholder="Mercedes Benz GLE"
                onChange={handleChange}
              />
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

// ✅ Simple reusable field components for cleaner code
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
