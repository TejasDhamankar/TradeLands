"use client";
import React from 'react';
import { motion } from 'framer-motion';

const MarketResearch: React.FC = () => {
  const investmentData = [
    { type: 'Equity (Stocks / Mutual Funds)', returns: '10%-13% (Expected)', risk: 'High' },
    { type: 'Gold', returns: '6%-9% (Expected)', risk: 'Medium' },
    { type: 'Fixed Deposit / Debt', returns: '6%-7% (Expected)', risk: 'Low' },
    { type: 'Real Estate (Land)', returns: '15%-20% (Expected)', risk: 'Low', highlight: true },
  ];

  return (
    <motion.section
      className="py-20 sm:py-24 md:py-32 px-6 bg-white"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-forest-dark mb-4 tracking-tight">Market Research</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base font-medium leading-relaxed">
            TradeLands offers high-growth potential with the security of a physical asset.
          </p>
        </div>
        
        <div className="overflow-x-auto rounded-3xl border border-black/5 shadow-2xl bg-gradient-to-b from-white to-gray-50">
          <table className="min-w-[640px] w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-forest-dark to-forest-base text-white">
                <th className="p-6 text-sm uppercase tracking-wider font-semibold">Investment Type</th>
                <th className="p-6 text-sm uppercase tracking-wider font-semibold">Avg. Return% (p.a.)</th>
                <th className="p-6 text-sm uppercase tracking-wider font-semibold">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {investmentData.map((row, i) => (
                <tr
                  key={i}
                  className={`transition-colors ${
                    row.highlight
                      ? 'bg-leaf-accent/15 hover:bg-leaf-accent/25'
                      : 'hover:bg-white/60'
                  }`}
                >
                  <td className="p-6 font-semibold text-forest-dark tracking-tight">{row.type}</td>
                  <td className={`p-6 font-bold ${row.highlight ? 'text-gold-accent text-xl' : 'text-gray-700'}`}>
                    {row.returns}
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-black uppercase ${
                        row.risk === 'High'
                          ? 'bg-red-100 text-red-600'
                          : row.risk === 'Medium'
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {row.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 text-center text-sm text-gray-400 italic font-medium">
          *Expected returns based on current market trends and historical data.
        </p>
      </div>
    </motion.section>
  );
};

export default MarketResearch;
