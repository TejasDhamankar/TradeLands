
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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 px-6 py-4 ${
      isScrolled ? 'bg-forest-dark/80 backdrop-blur-md shadow-2xl py-3 border-b border-white/10' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 text-white text-2xl font-bold tracking-tighter">
          <Image
            src="/images/logo.png"
            alt="TradeLands logo"
            width={88}
            height={88}
            className="h-16 w-16 md:h-20 md:w-20"
            priority
          />
          <span>
            TRADELANDS<span className="text-leaf-accent">IND</span>
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-8 text-white/90 font-medium">
          <Link href="#about" className="hover:text-leaf-accent transition-colors">About Us</Link>
          <Link href="#projects" className="hover:text-leaf-accent transition-colors">Projects</Link>
          <Link href="#plans" className="hover:text-leaf-accent transition-colors">Investment Plans</Link>
          <Link href="#faq" className="hover:text-leaf-accent transition-colors">Legal & FAQ</Link>
        </div>

        <div className="hidden md:block">
          <Link href="#about" className="bg-white text-forest-dark px-6 py-2 rounded-full font-bold text-sm hover:bg-leaf-accent transition-colors">
            Learn More
          </Link>
        </div>

        <button
          className="md:hidden text-white border border-white/30 rounded-full px-4 py-2 text-sm font-bold"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 pb-4">
          <div className="max-w-7xl mx-auto rounded-2xl bg-forest-dark/90 backdrop-blur-md border border-white/10 p-4 flex flex-col gap-3 text-white">
            <Link href="#about" className="hover:text-leaf-accent transition-colors" onClick={() => setIsOpen(false)}>About Us</Link>
            <Link href="#projects" className="hover:text-leaf-accent transition-colors" onClick={() => setIsOpen(false)}>Projects</Link>
            <Link href="#plans" className="hover:text-leaf-accent transition-colors" onClick={() => setIsOpen(false)}>Investment Plans</Link>
            <Link href="#faq" className="hover:text-leaf-accent transition-colors" onClick={() => setIsOpen(false)}>Legal & FAQ</Link>
            <Link href="#about" className="bg-white text-forest-dark px-4 py-2 rounded-full font-bold text-sm text-center hover:bg-leaf-accent transition-colors" onClick={() => setIsOpen(false)}>
              Learn More
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
