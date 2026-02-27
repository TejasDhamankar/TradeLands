
// src/components/sections/Hero.tsx
"use client";
import Image from 'next/image';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <section className="relative min-h-[85vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image - Using your specific file path */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <Image
          src="/images/trees_hero_bg.jpg"
          alt="TradeLands Lush Forest Canopy"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        {/* Semi-transparent dark green overlay for readability */}
        <div className="absolute inset-0 bg-forest-dark/30" />
      </motion.div>

      {/* Hero Content aligned with PDF messaging */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4">
          TradeLands<span className="text-leaf-accent">.</span>
        </h1>
        <p className="text-leaf-accent text-sm sm:text-lg md:text-2xl font-medium uppercase tracking-[0.12em] md:tracking-[0.2em] mb-8">
          Smart Investment, High Returns
        </p>
        
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-5xl text-white font-semibold leading-tight">
            Invest in Mumbai Future <br /> with 5X Growth
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
            <a href="#about" className="w-full md:w-auto bg-forest-light hover:bg-forest-base text-white px-8 md:px-10 py-4 rounded-full text-base md:text-lg font-bold transition-all transform hover:scale-105 shadow-2xl">
              Learn More
            </a>
            <a href="#plans" className="w-full md:w-auto glass-effect border border-white/30 text-white px-8 md:px-10 py-4 rounded-full text-base md:text-lg font-bold hover:bg-white/10 transition-all">
              View Investment Plans
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
