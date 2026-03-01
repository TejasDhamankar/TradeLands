'use client';
import React from 'react';

const PreFooterCTA = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-[300px] flex items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-[#0F3D2E] to-[#0B2F24] text-white shadow-lg">
      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ready to Build Wealth with Secured Land?
        </h2>
        <p className="text-lg md:text-xl text-white/80 mb-8">
          Join serious investors building structured real estate returns with TradeLands.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollTo('plans')}
            className="bg-green-500 hover:bg-green-600 rounded-full px-8 py-4 font-semibold shadow-lg transition-colors"
          >
            Explore Investment Plans
          </button>
          <button
            onClick={() => scrollTo('inquiry')}
            className="border border-white/40 rounded-full px-8 py-4 hover:bg-white/10 transition-colors"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default PreFooterCTA;
