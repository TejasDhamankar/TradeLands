import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Highlights from '@/components/sections/Highlights';
import InvestmentPlans from '@/components/sections/InvestmentPlans';
import LocationSection from '@/components/sections/LocationSection';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import MarketResearch from '@/components/sections/MarketResearch';
import InquirySection from '@/components/sections/InquirySection';
import SecurityFAQ from '@/components/sections/SecurityFAQ';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Visual Identity & Brand Vision */}
      <Hero />
      <About />
      
      {/* Data-Driven Trust Building */}
      <MarketResearch />
      
      {/* Financial Opportunities */}
      <InvestmentPlans />

      {/* Prime Location */}
      <LocationSection />

      
      {/* Location & Infrastructure Growth */}
      <Highlights />
      
      {/* Physical Asset Verification */}
      <ProjectShowcase />
      
      {/* Final Legal & Transparency Check */}
      <SecurityFAQ />

      {/* Direct Inquiry */}
      <InquirySection />
    </div>
  );
}
