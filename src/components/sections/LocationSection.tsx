"use client";
import React from 'react';
import { motion } from 'framer-motion';

const LocationSection: React.FC = () => {
  return (
    <motion.section
      className="py-24 md:py-32 bg-gradient-to-br from-forest-dark to-forest-base text-white"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center rounded-3xl bg-black/20 border border-white/15 shadow-xl p-6 md:p-10">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Prime Location - Shilar, Karjat
            </h2>
            <p className="text-base md:text-lg text-leaf-accent leading-relaxed mb-6">
              Strategically located in Shilar, Karjat with excellent connectivity and strong appreciation potential.
            </p>
            <ul className="space-y-3 text-sm sm:text-base text-white/90 font-medium">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-leaf-accent" />
                <span>Fast access to Mumbai and Navi Mumbai growth corridors.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-leaf-accent" />
                <span>Tourism and second-home demand continuously boosts land value.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-leaf-accent" />
                <span>Planned infrastructure upgrades support long-term appreciation.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl overflow-hidden border border-white/20 shadow-xl h-[320px] md:h-[420px]">
            <iframe
              title="Prime Location - Shilar, Karjat"
              src="https://www.google.com/maps?q=Meraki+Karjat+Shilar+Maharashtra&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default LocationSection;
