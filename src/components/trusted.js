"use client";
import Image from "next/image";
import Link from "next/link";

const Trusted = () => {
  return (
    <section className="flex justify-center items-center py-10 px-6 bg-white">
      <div className="flex flex-col md:flex-row items-center max-w-4xl w-full">
        {/* Left: Car Key Image */}
        <div className="flex-1 relative hidden md:block">
          <Image
            src="/images/key.png"
            alt="Car key handover"
            width={400}
            height={300}
            className="rounded-2xl object-cover"
          />
        </div>

        {/* Right: Background + Text stacked together */}
        <div className="flex-1 relative ">
          {/* Background Shape */}
          <Image
            src="/images/blur.png"
            alt="Background Shape"
            width={500}
            height={300}
            className="object-cover rounded-3xl"
          />

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 z-10">
            <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-4">
              Trusted Car Deals <br /> Made Simple
            </h2>
            <p className="text-gray-700 text-xs leading-relaxed mb-6 max-w-md">
              From selling your car to buying a new ride, every step with us is
              built on trust and transparency. We ensure a smooth, stress-free
              process so you can focus on what matters most, getting behind the
              wheel with confidence
            </p>
            <Link href="/auth/register">
              <button className="bg-blue hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg w-fit shadow-md">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trusted;
