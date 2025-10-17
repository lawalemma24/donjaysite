"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import NotRegisteredOverlay from "./notuser";

const socialIcons = [
  // ... (same as before)
];

const links = [
  {
    title: "Quick Links",
    items: [
      { label: "Home", url: "/" },
      { label: "About Us", url: "/about" },
      { label: "Featured Cars", scrollTo: "featured" },
      { label: "What We Do", scrollTo: "whatwedo" },
      { label: "Testimonials", scrollTo: "testimonials" },
      { label: "Contact Us", url: "/contact" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Buy Car", url: "/garage/buy-swap" },
      { label: "Sell Car", url: "/garage/sell", restricted: true },
      { label: "Swap Cars", url: "/garage/buy-swap" },
      {
        label: "Book Inspection",
        url: "/inspection",
        restricted: true,
      },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "FAQs", url: "/services/faqs" },
      { label: "Terms & Conditions", url: "/services/terms" },
      { label: "Privacy Policy", url: "/services/privacy" },
      {
        label: "Customer Support (Chat with Us)",
        url: "/services/customersupport",
        restricted: true,
      },
    ],
  },
  {
    title: "Contact Info",
    type: "contact",
    items: [
      { label: "Address", value: "Lagos, Nigeria" },
      { label: "Phone", value: "08012345678" },
      { label: "Email", value: "donjayauto@gmail.com" },
    ],
  },
];

const Footer = () => {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showOverlay, setShowOverlay] = useState(false);

  // Handle restricted pages (like before)
  const handleRestrictedClick = (e, restricted) => {
    if (restricted && !user) {
      e.preventDefault();
      setShowOverlay(true);
    }
  };

  // Smooth scroll logic
  const handleScrollLink = (e, sectionId) => {
    e.preventDefault();
    if (!sectionId) return;

    if (pathname === "/") {
      // already on homepage → scroll directly
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // navigate to home, then scroll after render
      router.push(`/?scrollTo=${sectionId}`);
    }
  };

  return (
    <footer className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-y-12 md:gap-y-16 lg:gap-8">
          {links.slice(0, 3).map((section, index) => (
            <div key={index}>
              <h4 className="font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.url || "#"}
                      onClick={(e) => {
                        if (item.scrollTo) handleScrollLink(e, item.scrollTo);
                        else handleRestrictedClick(e, item.restricted);
                      }}
                      className="text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-4">{links[3].title}</h4>
            <ul className="space-y-2">
              {links[3].items.map((item, i) => (
                <li key={i}>
                  <p className="text-white/70">
                    <span className="font-semibold">{item.label}:</span>{" "}
                    {item.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Logo and Socials */}
          <div className="lg:col-span-1 md:col-span-2">
            <div className="flex flex-col items-start lg:items-end">
              <img
                src="/images/logo.png"
                alt="Don-Jay Autos Limited Logo"
                className="w-40 h-auto mb-4"
              />
              <p className="text-sm text-white/70 max-w-xs text-start lg:text-end mb-4">
                Helping you buy, sell, swap, and inspect cars with ease and
                confidence
              </p>
              <div className="flex space-x-4">
                {socialIcons.map((icon, index) => (
                  <a
                    key={index}
                    href={icon.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white transition-colors duration-200"
                  >
                    {icon.svg}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-10" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-white space-y-1 sm:space-y-0">
          <p>Driven by trust. Powered by innovation</p>
          <p>&copy; 2025 Don-Jay Autos Limited. All rights reserved</p>
        </div>
      </div>

      {showOverlay && (
        <NotRegisteredOverlay onClose={() => setShowOverlay(false)} />
      )}
    </footer>
  );
};

export default Footer;
