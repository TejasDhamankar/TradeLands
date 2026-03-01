import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#F8FAF9] text-gray-700 px-8 py-16 rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1: Logo and Brand */}
          <div>
            <div className="mb-4">
              <Image src="/images/tradeland-logo.png" alt="TradeLands Logo" width={150} height={50} />
            </div>
            <p className="text-sm mb-6">
              TradeLands is a real estate-based asset transaction platform for serious investors looking to build structured returns.
            </p>
           
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-600 hover:text-green-600 transition">About Us</Link></li>
              <li><Link href="/investment-plans" className="text-gray-600 hover:text-green-600 transition">Investment Plans</Link></li>
              <li><Link href="/inquiry" className="text-gray-600 hover:text-green-600 transition">Inquiry Form</Link></li>
              <li><Link href="/projects" className="text-gray-600 hover:text-green-600 transition">Projects</Link></li>
              <li><Link href="/legal" className="text-gray-600 hover:text-green-600 transition">Legal Transparency</Link></li>
            </ul>
          </div>

          {/* Column 3: Focus Areas */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Focus Areas</h3>
            <ul className="space-y-3">
              <li><Link href="/focus/mumbai-3" className="text-gray-600 hover:text-green-600 transition">Mumbai 3.0</Link></li>
              <li><Link href="/focus/pune-region" className="text-gray-600 hover:text-green-600 transition">Pune Region</Link></li>
              <li><Link href="/focus/nagpur-nashik" className="text-gray-600 hover:text-green-600 transition">Nagpur & Nashik</Link></li>
              <li><Link href="/focus/karjat" className="text-gray-600 hover:text-green-600 transition">Karjat</Link></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Connect</h3>
            <p className="text-sm mb-4">
              Begin your journey towards structured real estate returns.
            </p>
            <p className="text-green-600 mb-4">contact@tradelands.com</p>
            <button className="bg-green-500 text-white rounded-full px-6 py-3 font-semibold hover:bg-green-600 transition-colors w-full text-center shadow-md">
              Get Started
            </button>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm pt-8 mt-12">
          <p className="mb-4 md:mb-0 text-gray-500">© 2026 TradeLands. Real estate asset-based transaction.</p>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-600 hover:text-green-600 transition">Terms & Conditions</Link>
            <Link href="/privacy" className="text-gray-600 hover:text-green-600 transition">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
