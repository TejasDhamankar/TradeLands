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
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center">
          <div className="lg:w-1/2 relative h-[260px] sm:h-[360px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="/images/projects/highlights_summary.jpg" 
              alt="Project Highlights" 
              fill 
              className="object-cover"
            />
          </div>
          <div className="lg:w-1/2 space-y-10">
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
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Highlights;
