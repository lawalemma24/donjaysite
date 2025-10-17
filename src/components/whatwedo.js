"use client";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Tag, Shuffle, CalendarCheck } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";

const brands = [
  "/images/hondalogo.svg",
  "/images/toyotalogo.jpg",
  "/images/mercedeslogo.jpg",
  "/images/nissanlogo.svg",
  "/images/volkslogo.png",
  "/images/volvologo.webp",
  "/images/mitsubishilogo.svg",
  "/images/mazdalogo.png",
  "/images/landlogo.png",
  "/images/audilogo.svg",
  "/images/bmwlogo.svg",
  "/images/fordlogo.svg",
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
    link: "/garage/buy-swap",
  },
  {
    title: "Swap Car",
    desc: "Exchange your current car for another from our collection. Upgrade with ease and enjoy a smarter way to switch rides.",
    icon: <Shuffle size={32} className="text-green-500" />,
    bg: "bg-green-100",
    link: "/garage/buy-swap",
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
  const { user } = useAuth();
  return (
    <section className="text-center w-full relative pt-20 ">
      <div
        className="flex flex-wrap items-center bg-white justify-center md:gap-10 gap-8 py-6 px-5 
                  w-[90%] max-w-[1000px] mx-auto absolute -top-15 left-1/2 -translate-x-1/2 rounded-lg mb-16 shadow-lg"
      >
        {brands.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt="Car brand logo"
            width={80} // base width for optimization
            height={80}
            sizes="(max-width: 768px) 40px, 60px"
            className="object-contain w-10 h-10 md:w-16 md:h-16"
          />
        ))}
      </div>

      <div className="py-20 bg-white md:px-12 w-full px-6 md:mt-10 mt-10">
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

        <div className="mt-10">
          {user ? (
            <Link href="/about">
              <button className="bg-blue text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                Explore Services
              </button>
            </Link>
          ) : (
            <Link href="/auth/register">
              <button className="bg-blue text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
