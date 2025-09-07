import React from "react";

const socialIcons = [
  {
    name: "Facebook",
    path: "https://facebook.com/donjayautos",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-facebook"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    path: "https://instagram.com/donjayautos",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-instagram"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "Email",
    path: "mailto:donjayauto@gmail.com",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-mail"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

const links = [
  {
    title: "Quick Links",
    items: [
      { label: "Home", url: "/" },
      { label: "About Us", url: "/about" },
      { label: "Featured Cars", url: "/cars" },
      { label: "What We Do", url: "/services" },
      { label: "Testimonials", url: "/testimonials" },
      { label: "Contact Us", url: "/contact" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Buy Car", url: "/services/buy" },
      { label: "Sell Car", url: "/services/sell" },
      { label: "Swap Cars", url: "/services/swap" },
      { label: "Book Inspection", url: "/services/inspection" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "FAQs", url: "/faqs" },
      { label: "Terms & Conditions", url: "/terms" },
      { label: "Privacy Policy", url: "/privacy" },
      { label: "Customer Support (Chat with Us)", url: "/support" },
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
  return (
    <footer className="bg-black text-white py-16 px-4 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-12 md:gap-y-16 lg:gap-8">
          {/* Main Links */}
          {links.slice(0, 3).map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-bold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.url}
                      className="text-white/70 hover:text-white transition-colors duration-200"
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

        {/* Divider */}
        <hr className="border-gray-700 my-10" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-white space-y-4 sm:space-y-0">
          <p>Driven by trust. Powered by innovation</p>
          <p>&copy; 2025 Don-Jay Autos Limited. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
