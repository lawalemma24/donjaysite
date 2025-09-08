"use client";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function Contact() {
  return (
    <div className="bg-white">
      {/* Blue Header Section with clipped wave */}
      <div className="relative text-center text-white">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-[400px] relative z-0 clip-path-wave flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <div className="flex justify-center">
            <div className="w-25 h-1 bg-yellow-500 mt-2 mb-6 rounded"></div>
          </div>
          <p className="mt-2 max-w-xl text-sm mx-auto">
            Have questions or need assistance? Reach out to us anytime, our team
            is ready to support you.
          </p>
        </div>
      </div>

      {/* Main Contact Section (overlapping wave) */}
      <div className="max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-3 relative z-10 -mt-32 rounded-lg mb-16">
        {/* Left Info Box */}
        <div className="bg-indigo-50 p-6 md:col-span-1 md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none rounded-t-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Get in touch
          </h2>
          <p className="text-gray-600 mb-6">
            Reach out through any channel that works best for you.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-600 text-xl" />
              <span className="text-gray-700">Lagos Nigeria</span>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600 text-xl" />
              <span className="text-gray-700">donjayauto@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-blue-600 text-xl" />
              <span className="text-gray-700">08012345678</span>
            </div>
          </div>

          <hr className="my-6 border-gray-300" />

          <p className="font-semibold text-gray-700 mb-2">
            Follow our social media
          </p>
          <div className="flex gap-4 text-blue-600 text-xl">
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="bg-white md:col-span-2  p-6 md:rounded-tr-lg md:rounded-br-lg rounded-b-lg ">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Send us a message
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Enter subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Enter message"
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-96">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126833.61799996106!2d3.30737345!3d6.548055949999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b177d78f5a7%3A0x6d69f3a3bfa2f62d!2sLagos!5e0!3m2!1sen!2sng!4v1690000000000!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
