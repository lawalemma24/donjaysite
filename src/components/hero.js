import Image from "next/image";
import { Tags } from "lucide-react";
import { Shuffle } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[80vh] md:h[85vh] w-full flex items-center justify-center text-center mt-0">
      <Image
        src="/images/rangebg.webp"
        alt="Hero background"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 text-white px-4">
        <p className="mb-5 md:text-2xl text-xl max-w-2xl mx-auto">
          Your All-in-One Car Marketplace
        </p>
        <h1 className="text-3xl mb-10 md:text-5xl font-semibold">
          <span className="text-orange">Buy , Sell ,Swap </span> or{" "}
          <span className="text-orange">Inspect </span> with ease
        </h1>

        <div className="grid grid-cols-2 gap-4 bg-white max-w-[400px] mx-auto rounded">
          {/* Buy or Swap */}
          <Link
            href="/garage/buy-swap"
            className="flex items-center gap-2 px-4 py-4 border-r border-text-muted text-blue cursor-pointer hover:bg-gray-50"
          >
            <Shuffle size={16} className="text-blue-600" />
            <span>Buy or Swap</span>
          </Link>

          {/* Sell */}
          <Link
            href="/garage/sell"
            className="flex items-center gap-2 px-4 py-4 text-blue cursor-pointer hover:bg-gray-50"
          >
            <Tags size={16} className="text-blue-600" />
            <span>Sell</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
