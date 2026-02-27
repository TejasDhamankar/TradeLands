"use client";
import React from 'react';
import { motion } from 'framer-motion';

const InvestmentPlans: React.FC = () => {
  return (
    <motion.section
      id="plans"
      className="relative py-20 sm:py-24 md:py-32 px-6 text-white bg-forest-dark"
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
      <div className="relative z-10 max-w-7xl mx-auto text-center mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">Smart Investment, High Returns</h2>
        <p className="text-leaf-accent font-semibold tracking-widest uppercase">
          <span className="text-gold-accent">18% to 25.75%</span> | Fixed Return | Zero Risk
        </p>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
        {/* Monthly Income Plan */}
        <motion.div
          className="relative group overflow-hidden bg-white/12 border border-white/25 rounded-[2rem] p-6 sm:p-8 backdrop-blur-lg shadow-2xl hover:border-leaf-accent/60 hover:bg-white/18 hover:shadow-[0_30px_90px_-50px_rgba(149,213,178,0.7)] transition-all"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        >
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">Monthly Income Plan</h3>
            <div className="text-3xl sm:text-4xl font-black text-gold-accent my-5 sm:my-6">₹50,000 / Month</div>
            <ul className="space-y-4 text-gray-300 mb-10 text-sm sm:text-base font-medium">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Investment</span> <span className="text-white font-bold">₹33 Lakhs</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Duration</span> <span className="text-white font-bold">24 Months</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Total Rental Income</span> <span className="text-white font-bold">₹12 Lakhs</span>
              </li>
              <li className="flex justify-between">
                <span>Security</span> <span className="text-white font-bold">2,000 Sq.ft. N.A. Plot</span>
              </li>
            </ul>
            <div className="bg-forest-light/20 p-4 rounded-xl text-sm italic font-medium">
              "Principal returned after 2 years. Total value received: ₹45 Lakhs"
            </div>
          </div>
        </motion.div>

        {/* Higher Maturity Value Plan */}
        <motion.div
          className="relative group overflow-hidden bg-white/12 border border-white/25 rounded-[2rem] p-6 sm:p-8 backdrop-blur-lg shadow-2xl hover:border-leaf-accent/60 hover:bg-white/18 hover:shadow-[0_30px_90px_-50px_rgba(149,213,178,0.7)] transition-all"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        >
          <div className="relative z-10">
            <span className="absolute top-6 right-6 sm:top-8 sm:right-8 bg-gold-accent text-forest-dark text-xs font-black px-3 py-1 rounded-full uppercase">Most Popular</span>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">Higher Maturity Plan</h3>
            <div className="text-3xl sm:text-4xl font-black text-gold-accent my-5 sm:my-6">₹50 Lakhs Total</div>
            <ul className="space-y-4 text-gray-300 mb-10 text-sm sm:text-base font-medium">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Investment</span> <span className="text-white font-bold">₹33 Lakhs</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Principal Back</span> <span className="text-white font-bold">₹33 Lakhs</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Accumulated Benefit</span> <span className="text-white font-bold">₹12 Lakhs</span>
              </li>
              <li className="flex justify-between">
                <span>Additional Bonus</span> <span className="text-white font-bold">₹5 Lakhs</span>
              </li>
            </ul>
            <div className="bg-leaf-accent text-forest-dark p-4 rounded-xl text-center font-bold tracking-tight">
              Security: 3,000 Sq.ft. N.A. Villa Plot
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default InvestmentPlans;
