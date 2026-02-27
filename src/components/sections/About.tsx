
"use client";
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <motion.section
      id="about"
      className="py-20 sm:py-24 md:py-32 px-6 bg-white text-forest-dark overflow-hidden"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1 space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            What is <span className="text-forest-light">TradeLands?</span>
          </h2>
          <div className="space-y-5 text-base sm:text-lg text-gray-700 leading-relaxed font-medium">
            <p className="font-semibold italic border-l-4 border-forest-light pl-4 tracking-tight">
              "TradeLands is where confidence is built on land, not on promises."
            </p>
            <p>
              It transforms land into opportunity. Opportunity into structured growth.
              And growth into secured wealth.
            </p>
            <p>
              This is not just land. This is strategy backed by registration.
              This is return backed by real assets.
            </p>
          </div>
        </div>

        {/* Feature Grid representing "Not a Scheme" */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {['Security', 'Clarity', 'Powerful Returns', 'Infrastructure'].map((item) => (
            <div
              key={item}
              className="p-6 sm:p-8 bg-white/70 backdrop-blur-md text-forest-dark rounded-3xl shadow-2xl border border-leaf-accent/30 hover:border-leaf-accent/70 hover:shadow-[0_25px_70px_-35px_rgba(149,213,178,0.9)] transition-all"
            >
              <h4 className="text-lg sm:text-xl font-bold mb-2 tracking-tight">{item}</h4>
              <div className="h-1 w-12 bg-leaf-accent rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default About;
