
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-dark text-white pt-12 md:pt-16 pb-8 px-6 border-t border-leaf-accent/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
        {/* Brand Section */}
        <div className="space-y-4 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Image
              src="/images/tradeland-logo.png"
              alt="TradeLands logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full bg-white/90 p-1"
            />
            <h3 className="text-2xl font-bold tracking-tighter">
              TRADELANDS<span className="text-leaf-accent">IND</span>
            </h3>
          </div>
          <p className="text-leaf-accent/70 text-sm leading-relaxed">
            A structured real estate growth engine designed for investors who want security, clarity, and powerful returns.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-6">Explore</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><Link href="#about" className="hover:text-leaf-accent transition-colors">About Us</Link></li>
            <li><Link href="#plans" className="hover:text-leaf-accent transition-colors">Investment Plans</Link></li>
            <li><Link href="#inquiry" className="hover:text-leaf-accent transition-colors">Inquiry Form</Link></li>
            <li><Link href="#projects" className="hover:text-leaf-accent transition-colors">Current Projects</Link></li>
            <li><Link href="#faq" className="hover:text-leaf-accent transition-colors">Legal Transparency</Link></li>
          </ul>
        </div>

        {/* Locations Section */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-6">Our Focus Areas</h4>
          <ul className="space-y-3 text-sm text-gray-300">
            <li>Mumbai 3.0</li>
            <li>Pune Regions</li>
            <li>Nagpur & Nashik</li>
            <li>Karjat (Prime Destination)</li>
          </ul>
        </div>

        {/* Contact/CTA */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-6">Connect</h4>
          <p className="text-sm text-gray-300 mb-4">Ready to build wealth backed by real assets?</p>
          <p className="text-sm text-gray-300 mb-5">
            <a
              href="mailto:sales.tradelands@gmail.com"
              className="hover:text-leaf-accent transition-colors"
            >
              sales.tradelands@gmail.com
            </a>
          </p>
          <Link 
            href="https://www.tradelands.in" 
            className="inline-block bg-leaf-accent text-forest-dark px-6 py-2 rounded-full font-bold text-sm hover:bg-white transition-colors"
          >
            Visit Official Portal
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} TradeLands. This is a real estate asset-based transaction, not a financial product.
        </p>
        <div className="flex space-x-6 text-xs text-gray-400">
          <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
