import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Tag, Shuffle, CalendarCheck } from "lucide-react";

const brands = [
  "/images/honda.png",
  "/images/toyota.png",
  "/images/mercedes.png",
  "/images/nissan.png",
  "/images/volkswagon.png",
  "/images/ford.png",
  "/images/hyundai.png",
  "/images/lexus.png",
];

const services = [
  {
    title: "Sell Car",
    desc: "Want to sell your car fast? We buy cars directly from you, any model. Simple process, fair offers, and no stress.",
    icon: <ShoppingCart size={32} className="text-indigo-500" />,
    bg: "bg-indigo-100",
    link: "/services/sell",
  },
  {
    title: "Buy Car",
    desc: "Looking for your next ride? Browse our cars for sale and drive home a vehicle that suits your needs and budget.",
    icon: <Tag size={32} className="text-yellow-500" />,
    bg: "bg-yellow-100",
    link: "/services/buy",
  },
  {
    title: "Swap Car",
    desc: "Exchange your current car for another from our collection. Upgrade with ease and enjoy a smarter way to switch rides.",
    icon: <Shuffle size={32} className="text-green-500" />,
    bg: "bg-green-100",
    link: "/services/swap",
  },
  {
    title: "Book Inspection",
    desc: "Book a professional inspection with our team. Get expert checks and accurate reports to ensure your car’s true condition.",
    icon: <CalendarCheck size={32} className="text-pink-500" />,
    bg: "bg-pink-100",
    link: "/services/inspection",
  },
];

export default function WhatWeDo() {
  return (
    <section className="text-center bg-black w-full">
      {/* Brand logos row */}
      <div className="flex flex-wrap items-center bg-white justify-center md:gap-14 gap-8 pb-8 pt-5 w-[90%] max-w-[1000px] mx-auto">
        {brands.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="Car brand logo"
            width={40}
            height={40}
            className="object-contain"
          />
        ))}
      </div>

      <div className="py-10 bg-white md:px-12 w-full px-6">
        {/* Title + Description */}
        <h2 className="text-3xl font-semibold text-black mb-2">What We Do</h2>
        <div className="w-20 h-1 bg-orange mx-auto mb-6"></div>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12">
          At Don-Jay Autos, we make car ownership simple and stress-free.
          Whether you’re buying your dream ride, selling your old one, swapping
          for an upgrade, or booking a trusted inspection, we provide all the
          tools you need in one place
        </p>

        {/* Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto max-w-[1200px]">
          {services.map((service, i) => (
            <Link href={service.link} key={i}>
              <div className="border border-yellow-400 rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.02] transition cursor-pointer">
                <div
                  className={`w-12 h-12 mx-auto flex items-center justify-center rounded-lg mb-4 ${service.bg}`}
                >
                  {service.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <Link href="/services">
            <button className="bg-blue text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
