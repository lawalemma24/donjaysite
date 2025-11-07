"use client";
import BackToTopButton from "@/components/backtotop";
import FeaturedCars from "@/components/featuredcars";
import Hero from "@/components/hero";
import Testimonials from "@/components/testimonial";
import Trusted from "@/components/trusted";
import WhatWeDo from "@/components/whatwedo";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function HomeContent() {
  const params = useSearchParams();
  const scrollTo = params.get("scrollTo");

  useEffect(() => {
    if (scrollTo) {
      const section = document.getElementById(scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [scrollTo]);

  return (
    <>
      <Hero />

      <section id="whatwedo">
        <WhatWeDo />
      </section>

      <Trusted />

      <section id="featured">
        <FeaturedCars />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <BackToTopButton />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
