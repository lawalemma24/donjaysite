import TestimonialCard from "./testimonialcard";

const testimonials = [
  {
    name: "Andrew John",
    comment:
      "I sold my old Toyota Corolla in just a few days. The process was straightforward and stress-free.",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    stars: 5,
  },
  {
    name: "Gabriel Sam",
    comment:
      "Booked an inspection before buying a used car. The report was thorough and helped me make the right decision.",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    stars: 5,
  },
  {
    name: "Cynthia Philip",
    comment:
      "I bought my Honda Accord here and it was exactly as described clean, affordable, and ready to drive.",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="mb-[100px]">
          <h2 className="text-3xl font-bold text-center">
            What Our Customers Say
          </h2>
          <div className="flex justify-center">
            <div className="w-16 h-1 bg-yellow-500 mt-2 mb-6 rounded"></div>
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto ">
            Here’s what people who’ve bought, sold, and swapped cars with us
            have to say about their experience
          </p>
        </div>
        {/* Cards */}
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, idx) => (
            <TestimonialCard key={idx} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
