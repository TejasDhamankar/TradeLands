"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Highlights: React.FC = () => {
  return (
    <motion.section
      className="py-20 sm:py-24 md:py-32 px-6 bg-gray-50"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[500px] sm:h-[650px] md:h-[800px] overflow-hidden">
        <Image 
          src="/images/projects/highlights_summary.jpg" 
          alt="Project Highlights" 
          fill 
          className="object-contain object-center"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="space-y-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-forest-dark tracking-tight">Strategic Location & Growth</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="text-2xl sm:text-3xl font-black text-leaf-accent">01</div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">Connectivity</h3>
                <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed">Just 77 km from Navi Mumbai International Airport and 50 km from Atal Setu (MTHL).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl sm:text-3xl font-black text-leaf-accent">02</div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">Booming Tourism</h3>
                <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed">Karjat is a prime weekend getaway, creating high demand for rentals and value appreciation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl sm:text-3xl font-black text-leaf-accent">03</div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">Infrastructure Development</h3>
                <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed">Karjat is witnessing steady infrastructure growth, including improved road connectivity, transport access, and civic development — driving strong long-term property value appreciation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-2xl sm:text-3xl font-black text-leaf-accent">04</div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">Strategic Connectivity</h3>
                <p className="text-gray-600 text-sm sm:text-base font-medium leading-relaxed">Just 77 km from Navi Mumbai International Airport, 50 km from Atal Setu (MTHL), and 20 km from Karjat Railway Station — offering seamless access to Mumbai, Pune, and upcoming infrastructure corridors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Highlights;
