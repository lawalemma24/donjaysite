"use client";
import Link from "next/link";

import Image from "next/image";
import {
  FaUniversalAccess,
  FaHandshake,
  FaUsers,
  FaLeaf,
  FaMedal,
} from "react-icons/fa";

export default function About() {
  const values = [
    {
      icon: <FaUniversalAccess />,
      title: "Accessibility",
      text: "Making quality cars and services available to everyone.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <FaHandshake />,
      title: "Trust & Integrity",
      text: "Building long-term relationships through honesty and reliability.",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      icon: <FaUsers />,
      title: "Community Impact",
      text: "Supporting customers beyond sales, creating value in their everyday journeys.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <FaLeaf />,
      title: "Sustainability",
      text: "Encouraging responsible choices that shape the future of mobility.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <FaMedal />,
      title: "Excellence",
      text: "Delivering top-quality services that exceed expectations.",
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="bg-white">
      <div className="relative text-center text-white">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-[400px] relative z-0 clip-path-wave flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl font-bold">About Us</h1>
          <div className="flex justify-center">
            <div className="w-25 h-1 bg-yellow-500 mt-2 mb-6 rounded"></div>
          </div>
          <p className="mt-2 max-w-xl text-sm mx-auto">
            Redefining the way prople buy,sell,swap and inspect cars
          </p>
        </div>
      </div>

      <div className=" mx-auto  py-5  relative z-10 -mt-32 rounded-lg mb-2">
        <div className="text-center px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-8">
            <Image
              src="/images/accord.png"
              alt="Car sales"
              width={350}
              height={400}
              className="rounded-2xl shadow-md"
            />
            <Image
              src="/images/accord.png"
              alt="Car guidance"
              width={400}
              height={600}
              className="rounded-2xl shadow-md"
            />
            <Image
              src="/images/accord.png"
              alt="Car inspection"
              width={350}
              height={400}
              className="rounded-2xl shadow-md"
            />
          </div>
          <p className="text-black max-w-3xl mx-auto mt-16 mb-16">
            From hassle-free car sales, to expert guidance, and trusted
            after-sales support, we’re with you at every step. Whether you’re
            handing over your keys, exploring the best deals, or booking an
            inspection, our goal is to make car ownership simple, transparent,
            and stress-free.
          </p>
        </div>

        <div className="bg-accent py-16 w-full">
          <h2 className="text-4xl md:text-6xl text-center font-bold text-gray-900 mb-2">
            <span className="text-black">Our Mission</span>
          </h2>
          <div className="flex justify-center">
            <div className="w-25 h-1 bg-yellow-500 mt-2 mb-10 rounded"></div>
          </div>
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <Image
                src="/images/hero.png"
                alt="Our Mission"
                width={500}
                height={650}
                className="rounded-2xl shadow-md border-16 border-r-blue border-t-blue border-l-orange border-b-orange "
              />
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">
                We make sure every car deal is safe and transparent
              </h3>
              <p className="text-black/70 text-xl mb-4">
                Our mission is to create a trusted marketplace where customers
                can confidently buy, sell, or swap cars without hidden charges
                or complications. With professional inspections and clear
                documentation, we guarantee peace of mind at every step.
              </p>
              <p className="text-black/70 text-xl">
                Our mission goes beyond transactions, we’re here to build trust
                through honesty, reliability, and support. Every step is made
                simple and transparent, giving you peace of mind and a smooth
                experience. With us, it’s more than just about cars, it’s about
                the relationships we build along the way.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-16 mb-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-black mb-4">
              Why Choose Us
            </h2>
            <div className="h-2 w-25 rounded bg-yellow-400 mb-8"></div>

            <div className="space-y-6">
              {values.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${item.color} text-lg`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.title}:
                      <span className="font-normal text-gray-600 ml-1">
                        {item.text}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <Image
              src="/images/hero.png"
              alt="Luxury Car"
              width={500}
              height={350}
              className="rounded-2xl shadow-md"
            />

            <div className="absolute -bottom-5 -left-4 bg-white rounded-xl shadow-lg p-2">
              <Image
                src="/images/accord.png"
                alt="Car Keys"
                width={200}
                height={150}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-accent pt-8 pb-4 md:pt-16 w-full px-4">
        <h1 className="text-3xl text-center text-black font-bold">
          Contact Us Today
        </h1>
        <div className="flex justify-center">
          <div className="w-25 h-1 bg-yellow-500 mt-2 mb-6 rounded"></div>
        </div>
        <p className="text-center text-black/70  mb-6">
          Whether you are buying,selling or swapping a car, Our team is always
          ready to guide you.Reach out today let,s make your car journey
          seemless.
        </p>
        <div className="flex justify-center mt-5 mb-16">
          <Link href="/contact">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
