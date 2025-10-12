"use client";
import { useState } from "react";
import Modal from "./modal";
import api from "@/utils/api";
import toast from "react-hot-toast";

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
    try {
      setLoading(true);
      console.log("Submitting car data...");

      // Hardcoded placeholder image for now
      const imageUrls = [
        "https://via.placeholder.com/400x300.png?text=Car+Image",
      ];

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
        images: imageUrls,
      };

      console.log("Payload:", payload);

      const res = await api.post("/cars", payload);
      console.log("Server response:", res.data);

      if (res.status === 201 || res.data.success) {
        toast.success(res.data.message || "Car added successfully");
        console.log("Car added successfully with ID:", res.data.car?._id);
        onSuccess();
        onClose();
      } else {
        toast.error("Unexpected response");
        console.log("Unexpected response:", res);
      }
    } catch (err) {
      console.error("Error creating car:", err);
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
              <div>
                <label className="text-sm">Make/Name of car</label>
                <input
                  type="text"
                  name="carName"
                  placeholder="Mercedes Benz GLE"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue outline-none"
                />
              </div>

              <div>
                <label className="text-sm">Year</label>
                <select
                  name="year"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue outline-none"
                >
                  <option value="">Select year</option>
                  {[2025, 2024, 2023, 2022, 2021].map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm">Condition</label>
                <select
                  name="condition"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue outline-none"
                >
                  <option value="">Select condition</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="certified pre-owned">
                    Certified Pre-Owned
                  </option>
                </select>
              </div>

              <div>
                <label className="text-sm">Transmission</label>
                <select
                  name="transmission"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue outline-none"
                >
                  <option value="">Select transmission</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                  <option value="cvt">CVT</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Fuel Type</label>
                <select
                  name="fuelType"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue outline-none"
                >
                  <option value="">Select fuel type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="cng">CNG</option>
                  <option value="lpg">LPG</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Engine</label>
                <input
                  type="text"
                  name="engine"
                  placeholder="3.0 L Inline-6 turbo + hybrid"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue outline-none"
                />
              </div>

              <div>
                <label className="text-sm">Mileage</label>
                <input
                  type="number"
                  name="mileage"
                  placeholder="16300"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue outline-none"
                />
              </div>

              <div>
                <label className="text-sm">Price</label>
                <input
                  type="number"
                  name="price"
                  placeholder="70000000"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue outline-none"
                />
              </div>
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
