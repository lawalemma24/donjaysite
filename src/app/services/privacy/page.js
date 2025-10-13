"use client";
import React from "react";
import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20  text-gray-700 md:mt-10">
      <h1 className="text-3xl font-bold mb-6 text-blue">Privacy Policy</h1>

      <p className="mb-6">
        This Privacy Policy explains how <strong>Don Jay Autos</strong>{" "}
        collects, uses, and protects your personal information when you visit or
        use our website and related services. By using our site, you consent to
        the practices described in this policy.
      </p>

      <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">What are Cookies?</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              Cookies are small text files stored on your browser or device when
              you visit a website.
            </li>
            <li>
              They help improve your browsing experience and allow us to
              understand how visitors use our site.
            </li>
            <li>
              Cookies allow us to personalize content, improve performance, and
              enhance user interaction. By using our site, you agree to our use
              of cookies as outlined here.
            </li>
          </ul>
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/hero.png"
            alt="Privacy Policy Illustration"
            width={500}
            height={350}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
      <p className="mb-8">
        Cookies help us distinguish you from other users and provide a
        personalized experience based on your preferences. Below are the main
        types of cookies we use to improve the performance of our website.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Essential Cookies */}
        <div className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-lg mb-2 text-gray-900">
            Essential Cookies
          </h3>
          <p>
            These are required for the basic functionality of our website, such
            as navigating pages and using secure areas. These cookies are
            necessary for submitting forms or logging into restricted sections.
            They do not require user consent.
          </p>
        </div>

        {/* Analytical Cookies */}
        <div className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-lg mb-2 text-gray-900">
            Analytical Cookies
          </h3>
          <p>
            These cookies collect information about how visitors interact with
            our site. We use them to analyze traffic, track user activity, and
            improve website performance. Analytical data helps us understand
            what our users are looking for.
          </p>
        </div>

        {/* Targeting Cookies */}
        <div className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-lg mb-2 text-gray-900">
            Targeting Cookies
          </h3>
          <p>
            These cookies track pages you visit and links you click. We use this
            data to tailor marketing and display ads relevant to your interests.
            We may share limited, anonymized data with trusted partners for this
            purpose.
          </p>
        </div>

        {/* Functionality Cookies */}
        <div className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-lg mb-2 text-gray-900">
            Functionality Cookies
          </h3>
          <p>
            These cookies improve your experience by remembering preferences
            such as language or region. They help us offer you better support
            and a more personalized experience.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">More on Cookies</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Manage or Block Cookies */}
        <div className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-lg mb-2 text-gray-900">
            How to Manage or Block Cookies
          </h3>
          <p>
            Most browsers allow you to control cookies through their settings.
            You can choose to decline or delete cookies. However, disabling
            cookies may affect certain features and limit your experience on our
            website.
          </p>
        </div>

        {/* Updates on Cookie Policy */}
        <div className="border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
          <h3 className="font-semibold text-lg mb-2 text-gray-900">
            Updates on Cookie Policy
          </h3>
          <p>
            We may update this policy from time to time in response to legal or
            operational changes. We encourage users to review this page
            periodically for updates. The “Last Updated” date at the top of this
            page indicates the latest revision.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="mb-6">
        For questions or concerns about our Privacy Policy, please reach out to
        us:
      </p>

      <ul className="list-disc ml-6 space-y-2">
        <li>
          <strong>Don Jay Autos</strong>
        </li>
        <li>
          Email:{" "}
          <a
            href="mailto:support@donjayautos.com"
            className="text-blue-600 hover:underline"
          >
            support@donjayautos.com
          </a>
        </li>
        <li>Phone: +234 80012345678</li>
        <li>Address:Lagos Nigeria</li>
      </ul>
    </div>
  );
}
