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
      className="py-24 md:py-32 bg-gradient-to-b from-white to-green-50/40"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-dark mb-4 tracking-tight">Market Research</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            TradeLands offers high-growth potential with the security of a physical asset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:hidden gap-6">
          {investmentData.map((row, i) => (
            <div
              key={i}
              className={`rounded-3xl p-6 border backdrop-blur-sm shadow-xl ${
                row.highlight
                  ? 'bg-gradient-to-br from-leaf-accent/30 to-white border-leaf-accent/50'
                  : 'bg-white/90 border-black/5'
              }`}
            >
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Investment Type</p>
              <p className="text-forest-dark font-bold text-lg">{row.type}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Avg. Return</p>
                  <p className={`font-extrabold ${row.highlight ? 'text-gold-accent text-xl' : 'text-gray-700'}`}>{row.returns}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Risk Level</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase ${
                      row.risk === 'High'
                        ? 'bg-red-100 text-red-600'
                        : row.risk === 'Medium'
                        ? 'bg-orange-100 text-orange-600'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {row.risk}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto rounded-3xl border border-black/5 shadow-xl bg-gradient-to-b from-white to-gray-50">
          <table className="min-w-[700px] w-full text-left border-collapse">
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
                      ? 'bg-leaf-accent/20 hover:bg-leaf-accent/30'
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
