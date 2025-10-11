"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrderInfo() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    const savedForm = sessionStorage.getItem("orderInfo");
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, []);

  const handleChange = (e) => {
    const updatedForm = { ...form, [e.target.name]: e.target.value };
    setForm(updatedForm);

    sessionStorage.setItem("orderInfo", JSON.stringify(updatedForm));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/garage/paymentsummary");
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-8 pt-4 mt-5 mb-5">
        <nav className="text-sm text-gray-500">
          Home <span className="mx-1">/</span> Garage / Buy or Swap / Car
          Details / Summary /{" "}
          <span className="text-blue font-medium">Info</span>
        </nav>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg mt-10 p-6">
        <h2 className="text-xl font-bold text-center mb-6">
          Order Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {field}
              </label>
              <input
                name={field}
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                    ? "tel"
                    : "text"
                }
                value={form[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}...`}
                required
                className="w-full border border-lightgrey rounded-lg px-3 py-2 text-sm focus:border-blue focus:outline-none"
              />
            </div>
          ))}

          {/* State and City */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                className="w-full border border-lightgrey rounded-lg px-3 py-2 text-sm focus:border-blue focus:outline-none"
              >
                <option value="">Select State</option>
                <option>Lagos</option>
                <option>Abuja</option>
                <option>Kano</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full border border-lightgrey rounded-lg px-3 py-2 text-sm focus:border-blue focus:outline-none"
              >
                <option value="">Select City</option>
                <option>Ikeja</option>
                <option>Victoria Island</option>
                <option>Maitama</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Address
            </label>
            <input
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter your delivery address..."
              required
              className="w-full border border-lightgrey rounded-lg px-3 py-2 text-sm focus:border-blue focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue text-white font-medium rounded-lg px-4 py-2 hover:bg-blue-700"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
