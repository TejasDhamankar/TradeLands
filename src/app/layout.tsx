// src/app/layout.tsx
import Footer from '@/components/layout/Footer';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer'; // You'll create this similarly

export const metadata = {
  title: 'TradeLands | Smart Investment, High Returns',
  description: 'Premium land acquisition in Mumbai, Pune, Nagpur, and Nashik.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        {/* Footer will go here */}
        <Footer/>
      </body>
    </html>
  );
}