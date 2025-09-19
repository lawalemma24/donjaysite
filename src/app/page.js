import BackToTopButton from "@/components/backtotop";
import FeaturedCars from "@/components/featuredcars";
import Hero from "@/components/hero";
import Testimonials from "@/components/testimonial";
import Trusted from "@/components/trusted";
import WhatWeDo from "@/components/whatwedo";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <Trusted />
      <FeaturedCars />
      <Testimonials />
      <BackToTopButton />
    </>
  );
}
