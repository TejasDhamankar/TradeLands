"use client";

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type LayoutChromeProps = {
  children: React.ReactNode;
};

export default function LayoutChrome({ children }: LayoutChromeProps) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith('/admin');

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
       
    </>
  );
}

