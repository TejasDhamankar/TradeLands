"use client";
import React from 'react';
import { motion } from 'framer-motion';

const SecurityFAQ: React.FC = () => {
  const securityFeatures = [
    {
      q: "What is the source of the ₹50,000 monthly payout?",
      a: "Profit is generated through bulk land acquisition, development, and phased resale margins."
    },
    {
      q: "What if the company does not make a profit?",
      a: "Your money is secured as a physical property asset; the 2,000/3,000 sq. ft. NA plot is registered in your name."
    },
    {
      q: "Is there a written rental guarantee?",
      a: "Yes. Tenure, amount, and payout structure are all documented in a legal agreement—we do not rely on verbal commitments."
    },
    {
      q: "How does the buyback work after 2 years?",
      a: "The buyback agreement is written and confirmed from day one. The company repurchases the land at the committed value."
    },
    {
      q: "Is this regulated by RBI or SEBI?",
      a: "This is a real estate asset-based transaction falling under property law, not a financial product."
    }
  ];

  return (
    <motion.section
      id="faq"
      className="py-20 sm:py-24 md:py-32 px-6 bg-gray-50"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-forest-light font-semibold uppercase tracking-widest text-xs">Transparency First</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-forest-dark mt-2 tracking-tight">Security & Legal FAQ</h2>
        </div>

        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
          {securityFeatures.map((item, i) => (
            <div key={i} className="px-6 sm:px-8 py-6">
              <h3 className="text-base sm:text-lg font-semibold text-forest-dark tracking-tight">
                {item.q}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed font-medium">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-gray-500 font-medium">
          Location: <span className="font-semibold text-forest-dark">Karjat, Maharashtra</span>
        </div>
      </div>
    </motion.section>
  );
};

export default SecurityFAQ;
