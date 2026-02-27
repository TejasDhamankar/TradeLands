"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ProjectShowcase: React.FC = () => {
  const actualPhotos = [
    { src: '/images/projects/site_photo_villas.jpg', label: 'Completed Villa' },
    { src: '/images/projects/project_entrance_flags.jpg', label: 'Main Entrance' },
    { src: '/images/projects/site_photo_seating.jpg', label: 'Amenity Area' },
    { src: '/images/projects/site_photo_construction.jpg', label: 'Phase 2 Progress' },
  ];

  return (
    <motion.section
      id="projects"
      className="py-20 sm:py-24 md:py-32 px-6 bg-white"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-forest-dark mb-12 md:mb-16 text-center underline decoration-leaf-accent decoration-4 underline-offset-8 tracking-tight">
          Actual Site Development
        </h2>

        {/* Major Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20">
          <div className="space-y-4">
            <div className="relative h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl group">
              <Image src="/images/projects/meraki_aerial.jpg" alt="Meraki Site" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 md:p-8">
                <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight">Meraki</h3>
              </div>
            </div>
            <p className="text-gray-600 px-2 italic text-sm sm:text-base font-medium">Surrounded by the lush Bhima Shankar Hills</p>
          </div>

          <div className="space-y-4">
            <div className="relative h-64 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl group">
              <Image src="/images/projects/sky_villa_layout.jpg" alt="Sky Villa Layout" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 md:p-8">
                <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tight">Sky Villa Phase 2</h3>
              </div>
            </div>
            <p className="text-gray-600 px-2 italic text-sm sm:text-base font-medium">Spread across 15 acres with 30+ curated amenities</p>
          </div>
        </div>

        {/* Actual Site Photos - One at a time (large cards) */}
        <div className="mt-6 md:mt-8 space-y-8 md:space-y-10">
          {actualPhotos.map((photo, i) => (
            <div key={i} className="w-full">
              <div className="relative w-full h-[55vh] sm:h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <img src={photo.src} alt={photo.label} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8">
                  <span className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">{photo.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Technical Layout Map */}
        <div className="mt-16 md:mt-20 p-6 md:p-8 bg-gray-100 rounded-[2rem] border-2 border-dashed border-gray-300">
          <h4 className="text-center font-bold text-gray-500 uppercase tracking-widest mb-6 md:mb-8 text-xs sm:text-sm">Registered TP Layout</h4>
          <div className="relative h-[260px] sm:h-[320px] md:h-[400px] w-full rounded-3xl overflow-hidden">
            <Image src="/images/projects/trident_layout_detailed.jpg" alt="Technical Layout" fill className="object-contain" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectShowcase;
