"use client";
import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 md:mt-10">
      <h1 className="text-3xl font-bold mb-8 text-blue">
        Terms and Conditions — Don Jay Autos
      </h1>

      <p className="text-gray-700 mb-6">
        The following terms and conditions describe how{" "}
        <strong>Don Jay Autos</strong> operates. By using our website or
        services, you acknowledge that you have read, understood, and agreed to
        these terms and conditions.
      </p>

      <section className="space-y-8 text-gray-700 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Anti-Corruption</h2>
          <p>
            Don Jay Autos strictly complies with all applicable{" "}
            <strong>Nigerian anti-corruption and anti-bribery laws</strong>,
            including the Corrupt Practices and Other Related Offences Act
            (2000), and all related international standards. We maintain a
            zero-tolerance policy toward bribery, fraud, and any form of
            unethical conduct in our operations, transactions, and partnerships.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            2. Warranty and Liability
          </h2>
          <p>
            To the maximum extent permitted by law, Don Jay Autos disclaims all
            implied warranties arising from the use or inability to use our
            website or services. We shall not be liable for any indirect,
            incidental, special, or consequential damages, including but not
            limited to loss of data, profit, or business opportunity. All
            vehicles are sold <strong>“as-is”</strong>
            unless otherwise stated in a written agreement or warranty document.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            3. Terms in Other Languages
          </h2>
          <p>
            These terms and conditions are authoritative only in English. Any
            translation provided in another language is for convenience only and
            has no legal effect.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Other Agreements</h2>
          <p>
            Use of our website and services is subject to these terms unless a
            separate written and signed contract exists between you and Don Jay
            Autos. All purchases and import transactions are governed by our
            Terms of Trade and the details stated on the official invoice and
            purchase order.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Miscellaneous</h2>
          <p>
            Failure by Don Jay Autos to enforce any provision of these terms
            does not constitute a waiver of our rights. If any term is found
            invalid or unenforceable under Nigerian law, the remaining
            provisions shall remain in full effect. These terms are governed by
            the laws of the Federal Republic of Nigeria, and any disputes shall
            be resolved exclusively in Nigerian courts.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            6. Account Registration and Use
          </h2>
          <p>
            To make purchases or access certain services, users must register
            for a Don Jay Autos customer account. Registration is free of
            charge. Users must provide accurate and complete information. Don
            Jay Autos is not responsible for damages arising from incorrect or
            falsified information. Upon receiving your login credentials, you
            may view vehicle listings, check prices, and complete transactions.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            7. Data Protection and Privacy
          </h2>
          <p>
            Don Jay Autos handles customer data in accordance with our Privacy
            Policy, available on our website. We comply with the{" "}
            <strong>Nigeria Data Protection Regulation (NDPR) 2019</strong>
            and other applicable data privacy laws. Your information will only
            be used for legitimate business purposes, including order
            processing, customer support, and marketing communications (if
            consented).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            8. Security and Compliance
          </h2>
          <p>
            Don Jay Autos adheres to all domestic and international security,
            export control, and anti-terrorism laws. We do not engage in or
            facilitate transactions involving sanctioned countries, individuals,
            or restricted goods. Any transaction in violation of these
            regulations is strictly prohibited.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">9. Abuse and Misuse</h2>
          <p>
            Users must not engage in fraudulent, deceptive, or illegal
            activities on our platform. Don Jay Autos reserves the right to
            suspend or terminate accounts involved in abuse or policy violations
            without prior notice. Users will be held liable for any loss or
            damage caused to the company due to misconduct or breach of
            contract.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            10. Transactions and Payment Terms
          </h2>
          <p>
            All transactions are subject to our Terms of Trade as detailed on
            the issued invoice. Unless otherwise agreed in writing, vehicles
            listed on our site are sold under CFR (Cost and Freight) or FOB
            (Free on Board) terms. Payments are accepted in{" "}
            <strong>Nigerian Naira (₦)</strong>
            or USD, depending on the agreed quotation. All bank charges,
            transfer fees, or currency conversion costs are borne by the buyer.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            11. Anti-Social and Fraud Prevention Measures
          </h2>
          <p>
            Don Jay Autos enforces strict internal compliance procedures to
            prevent fraudulent and anti-social transactions. We do not engage
            with criminal or fraudulent entities that breach local or
            international trade regulations. Any transaction found to violate
            these standards will be immediately cancelled and reported to
            relevant authorities.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            12. Intellectual Property
          </h2>
          <p>
            All content on this website — including text, graphics, images, and
            logos — is the property of Don Jay Autos and is protected by
            copyright laws. It is prohibited to copy, modify, reproduce, or use
            any part of our content for commercial or public purposes without
            prior written consent.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">
            13. Contact Information
          </h2>
          <p>
            For questions, complaints, or clarifications regarding these terms,
            please contact:
          </p>
          <ul className="list-disc ml-6 mt-2">
            <li>
              <strong>Don Jay Autos </strong>
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
      </section>
    </div>
  );
}
