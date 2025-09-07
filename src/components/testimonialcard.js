export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 text-center relative z-40 mt-16">
      <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-16 bg-blue-600 rounded-t-full"></div>
      </div>

      {/* Profile Image */}
      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
        <div className="w-28 h-28 md:w-30 md:h-30 rounded-full overflow-hidden  shadow-md">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            width={112}
            height={112}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-20">
        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
        <p className="text-gray-500 text-sm mt-3 leading-relaxed">
          {testimonial.comment}
        </p>
        {/* Stars */}
        <div className="flex justify-center mt-4 text-yellow-400 text-lg">
          {Array.from({ length: testimonial.stars }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
    </div>
  );
}
