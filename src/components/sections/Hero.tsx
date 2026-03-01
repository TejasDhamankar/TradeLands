"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      
      {/* Background and Overlay Layer */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/trees_hero_bg.jpg"
          alt="Hero Background"
          // object-cover ensures it fills the area without distortion
          className="h-full w-full object-cover"
        />
        {/* Removed backdrop-blur to keep image original and clear */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex items-center justify-center min-h-screen text-center px-6">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Invest in Mumbai's Growth with <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">secured land</span>.
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
            Fixed returns up to 25.75% p.a., backed by registered plots in Karjat and Mumbai's emerging corridors. A structured real estate growth engine designed for investors who want security, clarity, and powerful returns.
          </p>
            
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#about" className="w-full sm:w-auto bg-green-700 hover:bg-green-800 text-white px-10 py-3 rounded-full text-base font-bold transition-transform hover:scale-105">
              Learn More
            </a>
            <a href="#plans" className="w-full sm:w-auto bg-white/10 border border-white/30 text-white px-10 py-3 rounded-full text-base font-bold hover:bg-white/20 transition-transform hover:scale-105">
              See Investment Plans
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;