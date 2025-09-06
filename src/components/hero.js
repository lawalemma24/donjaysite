import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center">
      {/* Background image */}
      <Image
        src="/hero-bg.jpg"
        alt="Hero background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold">
          Welcome to Don-Jay Autos
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Driving trust and quality with every car we sell and service.
        </p>
        <button className="mt-6 bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Explore Garage
        </button>
      </div>
      <div className="relative z-10 text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold">
          Welcome to Don-Jay Autos
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Driving trust and quality with every car we sell and service.
        </p>
        <button className="mt-6 bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
          Explore Garage
        </button>
      </div>
    </section>
  );
}
