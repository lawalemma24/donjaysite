"use client";
import React, { useState } from "react";

const faqs = [
  {
    question: "Are the imported cars brand new or used?",
    answer:
      "We import both brand-new and foreign-used (tokunbo) vehicles depending on client preference and budget.",
  },
  {
    question: "Where do you import your cars from?",
    answer:
      "We source vehicles from verified suppliers across the US, Japan, and Europe.",
  },
  {
    question: "Do you provide financing options for purchasing cars?",
    answer:
      "We accept both cash and bank-based asset financing. At the moment we do not offer hire purchase terms.",
  },
  {
    question: "Can I trade in my current vehicle for a new one?",
    answer:
      "Yes, you can trade in your vehicle. We'll evaluate its market value and apply it toward your next purchase.",
  },
  {
    question: "Do you offer warranties on your vehicles?",
    answer:
      "Yes, all imported cars come with limited warranties depending on the make, model, and supplier terms.",
  },
  {
    question: "What is the process for importing a car through your company?",
    answer:
      "Once you select your preferred car, we handle purchase, inspection, shipping, clearance, and delivery to your location.",
  },
  {
    question: "Do you import for duty exempted individuals?",
    answer:
      "Yes, we can assist with duty exemption importation if valid supporting documents are provided.",
  },
  {
    question: "Can you sell a car on my behalf?",
    answer:
      "Yes, we offer consignment services where we help you market and sell your car securely.",
  },
  {
    question: "How do we rate our marketplace vehicles?",
    answer:
      "Our vehicles are rated based on detailed inspections and verified supplier history reports.",
  },
  {
    question:
      "Are your imported vehicles compliant with local regulations and standards?",
    answer:
      "Yes, all vehicles meet Kenya Bureau of Standards (KEBS) and NTSA import regulations.",
  },
  {
    question: "Do you offer shipping services for imported cars?",
    answer:
      "Yes, we handle international shipping logistics and customs clearance end-to-end.",
  },
  {
    question:
      "What sets your company apart from other car importers and sellers?",
    answer:
      "We provide full transparency, pre-shipment inspection reports, after-sales support, and flexible payment options.",
  },
  {
    question: "Can I test drive a vehicle before making a purchase?",
    answer:
      "Yes, for locally available units. Imported vehicles can be viewed and test-driven once delivered.",
  },
  {
    question: "Do you assist with vehicle registration and documentation?",
    answer:
      "Yes, we handle registration, number plate issuance, and logbook transfer for your convenience.",
  },
  {
    question:
      "How can I get in touch with Kai and Karo for further inquiries or assistance?",
    answer:
      "You can reach us via our website contact form, WhatsApp, or by calling our customer support number.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-5xl mx-auto  px-4 py-20 md:mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue">
        Frequently Asked Questions
      </h2>

      <div className="divide-y divide-gray-200">
        {faqs.map((faq, i) => (
          <div key={i} className="py-4">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left flex justify-between items-center font-medium text-gray-800"
            >
              <span>{faq.question}</span>
              <span className="text-gray-400">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
