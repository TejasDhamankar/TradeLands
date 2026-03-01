
// src/components/layout/Navbar.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 px-4 md:px-6 py-2 md:py-3 ${
        isScrolled ? 'bg-forest-dark/80 backdrop-blur-md shadow-2xl border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          <Link href="/" className="flex items-center gap-2 md:gap-3 text-white text-xl md:text-2xl font-bold tracking-tighter min-w-0 z-50 pl-2 md:pl-0">
          <Image
            src="/images/tradeland-logo.png"
            alt="TradeLands logo"
            width={88}
            height={88}
            className="h-7 w-auto md:h-12 md:w-auto"
            priority
          />
            <span className="hidden md:inline truncate">
              TRADELANDS<span className="text-leaf-accent">IND</span>
            </span>
          </Link>
          
          {/* Mobile Centered Brand Text */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
            <span className="text-white text-lg font-bold tracking-tighter">
              TRADELANDS<span className="text-leaf-accent">IND</span>
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-white/90 font-medium">
            <Link href="#about" className="hover:text-leaf-accent transition-colors">About Us</Link>
            <Link href="#projects" className="hover:text-leaf-accent transition-colors">Projects</Link>
            <Link href="#plans" className="hover:text-leaf-accent transition-colors">Investment Plans</Link>
            <Link href="#inquiry" className="hover:text-leaf-accent transition-colors">Inquiry</Link>
            <Link href="#faq" className="hover:text-leaf-accent transition-colors">Legal & FAQ</Link>
          </div>

          <div className="hidden md:block">
            <Link href="#about" className="bg-white text-forest-dark px-6 py-2 rounded-full font-bold text-sm hover:bg-leaf-accent transition-colors">
              Learn More
            </Link>
          </div>

          <button
            className="md:hidden z-50 focus:outline-none"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <div className="w-6 h-[2px] bg-white mb-1"></div>
            <div className="w-6 h-[2px] bg-white mb-1"></div>
            <div className="w-6 h-[2px] bg-white"></div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-[60]" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 h-screen w-[80%] bg-forest-dark transform transition-transform duration-300 z-[70] ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col p-6 h-full">
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsOpen(false)} className="text-white p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-6 text-white text-lg font-medium">
            <Link href="#about" className="hover:text-leaf-accent transition-colors border-b border-white/10 pb-2" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link href="#projects" className="hover:text-leaf-accent transition-colors border-b border-white/10 pb-2" onClick={() => setIsOpen(false)}>Projects</Link>
            <Link href="#plans" className="hover:text-leaf-accent transition-colors border-b border-white/10 pb-2" onClick={() => setIsOpen(false)}>Investment Plans</Link>
            <Link href="#inquiry" className="hover:text-leaf-accent transition-colors border-b border-white/10 pb-2" onClick={() => setIsOpen(false)}>Inquiry</Link>
            <Link href="#faq" className="hover:text-leaf-accent transition-colors border-b border-white/10 pb-2" onClick={() => setIsOpen(false)}>Legal & FAQ</Link>
            <Link href="#about" className="bg-white text-forest-dark px-6 py-3 rounded-full font-bold text-center hover:bg-leaf-accent transition-colors mt-4" onClick={() => setIsOpen(false)}>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
