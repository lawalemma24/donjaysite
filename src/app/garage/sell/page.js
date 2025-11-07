"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";

const SellPage = () => {
  const [form, setForm] = useState({
    carName: "Toyota Camry",
    year: "2023",
    condition: "Used",
    transmission: "Automatic",
    fuelType: "Petrol",
    price: "",
    note: "",
  });
  const [images, setImages] = useState([]);
  const router = useRouter();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const objectUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...objectUrls]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    try {
      const fileInputs = document.querySelector("#fileInput").files;
      const uploadPromises = Array.from(fileInputs).map((file) =>
        uploadToCloudinary(file)
      );

      const uploadedImageUrls = await Promise.all(uploadPromises);

      const carToReview = {
        ...form,
        images: uploadedImageUrls,
      };

      // Store for next page
      sessionStorage.setItem("carToReview", JSON.stringify(carToReview));
      router.push("/garage/sellofferreview");
    } catch (err) {
      console.error("Error uploading images:", err);
      alert("Failed to upload images. Please try again.");
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Make/Name of car
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:outline-none sm:text-sm h-10 px-3 border"
                  value={form.carName}
                  onChange={(e) =>
                    setForm({ ...form, carName: e.target.value })
                  }
                ></input>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:outline-none sm:text-sm h-10 px-3 border"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                >
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                  <option>2022</option>
                  <option>2021</option>
                  <option>2020</option>
                  <option>2019</option>
                  <option>2018</option>
                  <option>2017</option>
                  <option>2016</option>
                  <option>2015</option>
                  <option>2014</option>
                  <option>2013</option>
                  <option>2012</option>
                  <option>2011</option>
                  <option>2010</option>
                  <option>2009</option>
                  <option>2008</option>
                  <option>2007</option>
                  <option>2006</option>
                  <option>2005</option>
                  <option>2004</option>
                  <option>2003</option>
                  <option>2002</option>
                  <option>2001</option>
                  <option>2000</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Condition
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:outline-none sm:text-sm h-10 px-3 border"
                  value={form.condition}
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:outline-none sm:text-sm h-10 px-3 border"
                  value={form.transmission}
                  onChange={(e) =>
                    setForm({ ...form, transmission: e.target.value })
                  }
                >
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Estimated Value
                </label>
                <input
                  type="text"
                  placeholder="Final decision after inspection"
                  className="mt-1 block w-full rounded-md border-text-muted shadow-sm focus:border-blue focus:outline-none sm:text-sm h-10 px-3 border placeholder:text-gray-400"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <p className="text-red-400 text-xs">
                  This is not a final offer. A final offer will be made after
                  inspection
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fuel type
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:outline-none sm:text-sm h-10 px-3 border"
                  value={form.fuelType}
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Additional Note
              </label>
              <textarea
                rows="3"
                placeholder="Any specific note about damage, modifications, or service history?"
                className="mt-1 block w-full rounded-md border-text-muted shadow-sm focus:border-blue focus:outline-none sm:text-sm p-3 border resize-none"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              ></textarea>
            </div>

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
                  className="flex justify-center items-center cursor-pointer mb-2 text-blue font-medium"
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
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    className="rounded-lg border border-gray-300 w-24 h-16 object-cover"
                  />
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue text-white font-medium py-3 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellPage;
