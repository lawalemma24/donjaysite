import CarCard from "./carcard";

const cars = [
  {
    name: "2025 Mercedes Benz GLE",
    price: 70000000,
    image: "/images/gle.png",
    logo: "/images/mercedeslogo.jpg",
  },
  {
    name: "2025 Honda Accord",
    price: 30000000,
    image: "/images/accord.png",
    logo: "/images/hondalogo.svg",
  },
  {
    name: "2025 Toyota Camry",
    price: 40000000,
    image: "/images/toyota-camry.png",
    logo: "/images/toyotalogo.jpg",
  },
  {
    name: "2025 Lexus RX 350",
    price: 60000000,
    image: "/images/lexus-rx.png",
    logo: "/images/lexuslogo.svg",
  },
  {
    name: "2023 Nissan Maxima",
    price: 60000000,
    image: "/images/nissan-maxima.png",
    logo: "/images/nissanlogo.svg",
  },
  {
    name: "2021 Volkswagen Golf",
    price: 20000000,
    image: "/images/vw-golf.png",
    logo: "/images/volkslogo.png",
  },
];

export default function FeaturedCars() {
  return (
    <section className="py-12 bg-accent">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl text-black font-bold text-center">
          Featured Cars
        </h2>
        <div className="flex justify-center">
          <div className="w-25 h-1 bg-orange mt-2 mb-6 rounded"></div>
        </div>
        <p className="text-center text-black max-w-2xl mx-auto mb-10">
          Take a closer look at some of the standout vehicles in our collection.
          From luxury SUVs to everyday favorites, these featured cars are ready
          to deliver performance, comfort, and reliability you can trust.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, idx) => (
            <CarCard key={idx} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
