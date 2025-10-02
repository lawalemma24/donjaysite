"use client";
import { useState } from "react";
import Modal from "./modal";

export default function AddCarForm({ onClose = () => {} }) {
  const [formData, setFormData] = useState({
    name: "",
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

  return (
    <Modal open onClose={onClose} size="lg">
      <div className="w-full h-screen md:h-auto flex items-center justify-center">
        <div className="relative w-full max-w-4xl h-full md:h-auto bg-white rounded-lg shadow flex flex-col">
          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto max-h-[80vh] md:max-h-[70vh]">
            <h2 className="text-2xl font-bold mb-1">Add Car</h2>
            <p className="text-text-muted mb-6">
              Fill in the details to list a new car for sale.
            </p>

            {/* Grid fields */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm">Make/Name of car</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Mercedes Benz GLE"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue focus:ring-none outline-none"
                />
              </div>

              <div>
                <label className="text-sm">Year</label>
                <select
                  name="year"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue focus:ring-none outline-none"
                >
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Condition</label>
                <select
                  name="condition"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue focus:ring-none outline-none"
                >
                  <option>Brand New</option>
                  <option>Used</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Transmission</label>
                <select
                  name="transmission"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue focus:ring-none outline-none"
                >
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Fuel Type</label>
                <select
                  name="fuelType"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue focus:ring-none outline-none"
                >
                  <option>Hybrid</option>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                </select>
              </div>

              <div>
                <label className="text-sm">Engine</label>
                <input
                  type="text"
                  name="engine"
                  placeholder="3.0 L Inline-6 turbo + hybrid"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue focus:ring-none outline-none"
                />
              </div>

              <div>
                <label className="text-sm">Mileage</label>
                <input
                  type="text"
                  name="mileage"
                  placeholder="163KM"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue focus:ring-none outline-none"
                />
              </div>

              <div>
                <label className="text-sm">Price</label>
                <input
                  type="text"
                  name="price"
                  placeholder="₦70,000,000"
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue focus:ring-none outline-none"
                />
              </div>
            </div>

            {/* Additional Note */}
            <div className="mt-4">
              <label className="text-sm">Additional Note (Optional)</label>
              <textarea
                name="note"
                rows="3"
                onChange={handleChange}
                className="w-full border rounded-md p-2 mt-1 border-text-muted/70 focus:border-blue focus:ring-none outline-none"
              ></textarea>
            </div>

            {/* Image Upload */}
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
                  Choose images or drag and drop here (JPG, JPEG, PNG. Max 10MB)
                </p>
              </div>

              {/* Preview */}
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

          {/* Sticky Buttons */}
          <div className="flex justify-end gap-4 p-4 border-t bg-white">
            <button onClick={onClose} className="px-6 py-2 border rounded-md">
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue text-white rounded-md">
              Add Car
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
