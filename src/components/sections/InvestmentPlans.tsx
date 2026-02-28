"use client";
import React from 'react';
import { motion } from 'framer-motion';

const InvestmentPlans: React.FC = () => {
  const scrollToInquiry = () => {
    document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.section
      id="plans"
      className="relative py-24 md:py-32 text-white bg-forest-dark"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/projects/img87.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/35" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Smart Investment, High Returns</h2>
        <p className="text-leaf-accent font-semibold tracking-widest uppercase">
          <span className="text-gold-accent">18% to 25.75%</span> | Fixed Return | Zero Risk
        </p>
      </div>

      <div className="relative z-10 w-full md:w-fit mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
        <motion.div
          className="relative group w-full md:w-[26rem] overflow-hidden rounded-3xl p-5 md:p-7 border border-white/25 bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-md shadow-xl hover:border-leaf-accent/60 hover:shadow-[0_30px_90px_-50px_rgba(149,213,178,0.7)] transition-all md:hover:scale-[1.05]"
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        >
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">Monthly Income Plan</h3>
            <div className="text-3xl sm:text-4xl font-black text-gold-accent my-5 sm:my-6">Rs 50,000 / Month</div>
            <ul className="space-y-4 text-gray-300 mb-10 text-sm sm:text-base font-medium">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Investment</span> <span className="text-white font-bold">Rs 33 Lakhs</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Duration</span> <span className="text-white font-bold">24 Months</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Total Rental Income</span> <span className="text-white font-bold">Rs 12 Lakhs</span>
              </li>
              <li className="flex justify-between">
                <span>Security</span> <span className="text-white font-bold">2,000 Sq.ft. N.A. Plot</span>
              </li>
            </ul>
            <div className="bg-forest-light/20 p-4 rounded-xl text-sm italic font-medium">
              &quot;Principal returned after 2 years. Total value received: Rs 45 Lakhs&quot;
            </div>
            <button
              type="button"
              onClick={scrollToInquiry}
              className="mt-6 w-full md:w-auto bg-leaf-accent text-forest-dark px-8 py-3 rounded-full text-sm font-bold hover:bg-white transition-colors"
            >
              Enquire Now
            </button>
          </div>
        </motion.div>

        <motion.div
          className="relative group w-full md:w-[26rem] overflow-hidden rounded-3xl p-5 md:p-7 border border-white/25 bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-md shadow-xl hover:border-leaf-accent/60 hover:shadow-[0_30px_90px_-50px_rgba(149,213,178,0.7)] transition-all md:hover:scale-[1.05]"
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        >
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">Higher Maturity Plan</h3>
            <div className="text-3xl sm:text-4xl font-black text-gold-accent my-5 sm:my-6">Rs 50 Lakhs Total</div>
            <ul className="space-y-4 text-gray-300 mb-10 text-sm sm:text-base font-medium">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Investment</span> <span className="text-white font-bold">Rs 33 Lakhs</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Principal Back</span> <span className="text-white font-bold">Rs 33 Lakhs</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Accumulated Benefit</span> <span className="text-white font-bold">Rs 12 Lakhs</span>
              </li>
              <li className="flex justify-between">
                <span>Additional Bonus</span> <span className="text-white font-bold">Rs 5 Lakhs</span>
              </li>
            </ul>
            <div className="bg-leaf-accent text-forest-dark p-4 rounded-xl text-center font-bold tracking-tight">
              Security: 3,000 Sq.ft. N.A. Villa Plot
            </div>
            <button
              type="button"
              onClick={scrollToInquiry}
              className="mt-6 w-full md:w-auto bg-leaf-accent text-forest-dark px-8 py-3 rounded-full text-sm font-bold hover:bg-white transition-colors"
            >
              Enquire Now
            </button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default InvestmentPlans;
