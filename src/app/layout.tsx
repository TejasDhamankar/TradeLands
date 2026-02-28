// src/app/layout.tsx
import './globals.css';
import LayoutChrome from '@/components/layout/LayoutChrome';
// import Footer from '@/components/layout/Footer'; // You'll create this similarly

export const metadata = {
  title: 'TradeLands | Smart Investment, High Returns',
  description: 'Premium land acquisition in Mumbai, Pune, Nagpur, and Nashik.',
  icons: {
    icon: '/images/tradeland-logo.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <LayoutChrome>{children}</LayoutChrome>
      </body>
    </html>
  );
}
