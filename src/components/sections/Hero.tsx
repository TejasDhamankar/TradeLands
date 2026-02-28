// src/components/sections/Hero.tsx
"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 80]);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="relative min-h-[85vh] md:min-h-screen w-full flex items-center justify-start overflow-hidden">
      {/* Background video with fallback image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {!videoFailed ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/images/trees_hero_bg.jpg"
            onError={() => setVideoFailed(true)}
          >
            <source src="https://res.cloudinary.com/dsclbu0eh/video/upload/v1772284603/Trade_Lands_1080P_tb7lnf.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/images/trees_hero_bg.jpg"
            alt="TradeLands Lush Forest Canopy"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-[center_20%]"
          />
        )}
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-forest-dark/35" />
      </motion.div>

      {/* Hero Content aligned with PDF messaging */}
      <motion.div
        className="relative z-10 text-left px-6 md:px-10 lg:px-14"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-lg space-y-3">
          <h1
            className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            TradeLands<span className="text-leaf-accent">.</span>
          </h1>
          <p
            className="text-leaf-accent text-xs sm:text-sm font-semibold uppercase tracking-[0.22em]"
          >
            Smart Investment, High Returns
          </p>
          
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
              Invest in Mumbai&apos;s Growth with <span className="text-leaf-accent">secured land</span>.
            </h2>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-md">
              Fixed returns up to 25.75% p.a., backed by registered plots in Karjat and Mumbai&apos;s emerging corridors.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start pt-1">
              <a href="#about" className="w-full sm:w-auto bg-forest-light hover:bg-forest-base text-white px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-bold transition-all transform hover:scale-105 shadow-2xl">
                Why TradeLands
              </a>
              <a href="#plans" className="w-full sm:w-auto bg-white/10 border border-white/30 text-white px-6 sm:px-8 py-3 rounded-full text-sm sm:text-base font-bold hover:bg-white/15 transition-all">
                See Plans
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

