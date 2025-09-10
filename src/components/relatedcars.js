"use client";

import { useState, useEffect } from "react";
import CarCard from "./carcard";
import Link from "next/link";

const relatedCars = [
  {
    id: 1,
    name: "2025 Mercedes Benz GLE",
    price: 70000000,
    image: "/images/gle.png",
    logo: "/images/mercedes.png",
  },
  {
    id: 2,
    name: "2025 Honda Accord",
    price: 30000000,
    image: "/images/accord.png",
    logo: "/images/honda.png",
  },
  {
    id: 3,
    name: "2025 Toyota Camry",
    price: 40000000,
    image: "/images/toyota-camry.png",
    logo: "/images/toyota.png",
  },
  {
    id: 4,
    name: "2025 Lexus RX 350",
    price: 60000000,
    image: "/images/lexus-rx.png",
    logo: "/images/lexus.png",
  },
  {
    id: 5,
    name: "2023 Nissan Maxima",
    price: 60000000,
    image: "/images/nissan-maxima.png",
    logo: "/images/nissan.png",
  },
  {
    id: 6,
    name: "2021 Volkswagen Golf",
    price: 20000000,
    image: "/images/vw-golf.png",
    logo: "/images/vw.png",
  },
  {
    id: 7,
    name: "2025 Lexus RX 350",
    price: 60000000,
    image: "/images/lexus-rx.png",
    logo: "/images/lexus.png",
  },
  {
    id: 8,
    name: "2025 Mercedes Benz GLE",
    price: 70000000,
    image: "/images/gle.png",
    logo: "/images/mercedes.png",
  },
  {
    id: 9,
    name: "2021 Volkswagen Golf",
    price: 20000000,
    image: "/images/vw-golf.png",
    logo: "/images/vw.png",
  },
  {
    id: 10,
    name: "2025 Toyota Camry",
    price: 40000000,
    image: "/images/toyota-camry.png",
    logo: "/images/toyota.png",
  },
];

export default function RelatedCars() {
  const [visibleCars, setVisibleCars] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCars(8);
      } else {
        setVisibleCars(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-bold">Related Cars</h2>
        <Link href="/garage/buy-swap">
          <button className="text-blue-600 font-medium hover:underline">
            View More →
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedCars.slice(0, visibleCars).map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
