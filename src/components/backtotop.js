"use client";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollProgress(scrolled);

      setVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white text-blue shadow-lg transition hover:bg-gray-200 z-[99999]"
        aria-label="Back to top"
        style={{ position: "fixed" }}
      >
        {/* Circular Progress Border */}
        <svg className="absolute w-12 h-12 -rotate-90" viewBox="0 0 36 36">
          {/* Background Circle */}
          <path
            className="text-gray-50"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {/* Progress Circle */}
          <path
            className="text-red-600"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${scrollProgress}, 100`}
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>

        {/* Icon */}
        <FaArrowUp className="relative z-10 text-lg" />
      </button>
    )
  );
};

export default BackToTopButton;
