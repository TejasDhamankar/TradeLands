"use client";
import React, { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';

const InquirySection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSections, setOpenSections] = useState<number[]>([1]);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    message: "",
    investmentPlan: "",
    investmentStatus: "",
    investmentTimeline: "",
    investmentPurpose: "",
    contactTime: "",
    consent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
  
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const toggleSection = (section: number) => {
    if (openSections.includes(section)) {
      setOpenSections(openSections.filter((s) => s !== section));
    } else {
      setOpenSections([...openSections, section]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      fullName,
      mobile,
      email,
      city,
      investmentPlan,
      investmentStatus,
      investmentTimeline,
      investmentPurpose,
      contactTime,
      consent,
      message,
    } = formData;

    const cleanPhone = mobile.replace(/\D/g, '');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName || !mobile || !email || !city) {
      setError('Please fill out all personal details.');
      setOpenSections(prev => [...new Set([1, ...prev])]); // Open section 1
      return;
    }
    
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setOpenSections(prev => [...new Set([1, ...prev])]); // Open section 1
      return;
    }

    if (cleanPhone.length < 10) {
      setError('Phone number must contain at least 10 digits.');
      setOpenSections(prev => [...new Set([1, ...prev])]); // Open section 1
      return;
    }

    if (!investmentPlan || !investmentStatus || !investmentTimeline) {
      setError('Please select one option in all required sections (2, 3, and 4).');
      // Ensure all relevant sections are open so user can see what's missing
      setOpenSections(prev => [...new Set([2, 3, 4, ...prev])]);
      return;
    }

    if (!consent) {
      setError('Please provide consent to continue.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          mobile,
          email,
          city,
          message,
          investmentPlan: investmentPlan ? [investmentPlan] : [],
          investmentStatus: investmentStatus ? [investmentStatus] : [],
          investmentTimeline: investmentTimeline ? [investmentTimeline] : [],
          investmentPurpose: investmentPurpose ? [investmentPurpose] : [],
          preferredContactTime: contactTime ? [contactTime] : [],
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit enquiry.');
      }

      setSubmitted(true);
      // Reset form state after successful submission
      setFormData({
        fullName: "", mobile: "", email: "", city: "", message: "",
        investmentPlan: "", investmentStatus: "", investmentTimeline: "",
        investmentPurpose: "", contactTime: "", consent: false,
      });

    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to submit enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const AccordionSection: React.FC<{
    sectionNumber: number;
    title: string;
    children: React.ReactNode;
  }> = ({ sectionNumber, title, children }) => (
    <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={() => toggleSection(sectionNumber)}
        className="w-full flex justify-between items-center p-4 font-semibold text-left text-forest-dark"
      >
        <span className="text-lg">{sectionNumber}. {title}</span>
        <span className="text-2xl text-green-700">{openSections.includes(sectionNumber) ? '-' : '+'}</span>
      </button>
      <div className={openSections.includes(sectionNumber) ? 'block' : 'hidden'}>
        <div className="p-4 border-t border-gray-200 bg-white">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <motion.section
      id="inquiry"
      className="py-24 px-6 bg-gradient-to-b from-white to-green-50/50"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-black/5">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-dark tracking-tight">TradeLands Investment Inquiry Form</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <AccordionSection sectionNumber={1} title="Personal Details">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name*"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number (WhatsApp preferred)*"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address*"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
            />
            <input
              type="text"
              name="city"
              placeholder="City / Current Location*"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </AccordionSection>

          <AccordionSection sectionNumber={2} title="Select Your Investment Plan*">
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="investmentPlan" value="plan-a" className="mt-1" checked={formData.investmentPlan === 'plan-a'} onChange={handleChange} />
                <span>Plan A - Rs 50,000 per month for 24 months</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="investmentPlan" value="plan-b" className="mt-1" checked={formData.investmentPlan === 'plan-b'} onChange={handleChange} />
                <span>Plan B - Rs 50 Lakhs total value after 2 years</span>
              </label>
            </div>
          </AccordionSection>

          <AccordionSection sectionNumber={3} title="Investment Amount Status*">
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="investmentStatus" value="ready" className="mt-1" checked={formData.investmentStatus === 'ready'} onChange={handleChange} />
                <span>Rs 30-35 Lakhs Ready</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="investmentStatus" value="arranging" className="mt-1" checked={formData.investmentStatus === 'arranging'} onChange={handleChange} />
                <span>Funds Arranging</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="investmentStatus" value="details" className="mt-1" checked={formData.investmentStatus === 'details'} onChange={handleChange} />
                <span>Need More Details</span>
              </label>
            </div>
          </AccordionSection>
          
          <AccordionSection sectionNumber={4} title="When Are You Planning to Invest?*">
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="investmentTimeline" value="7-days" className="mt-1" checked={formData.investmentTimeline === '7-days'} onChange={handleChange} />
                <span>Within 7 Days</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="investmentTimeline" value="1-month" className="mt-1" checked={formData.investmentTimeline === '1-month'} onChange={handleChange} />
                <span>Within 1 Month</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="investmentTimeline" value="3-months" className="mt-1" checked={formData.investmentTimeline === '3-months'} onChange={handleChange} />
                <span>Within 3 Months</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="investmentTimeline" value="exploring" className="mt-1" checked={formData.investmentTimeline === 'exploring'} onChange={handleChange} />
                <span>Just Exploring</span>
              </label>
            </div>
          </AccordionSection>

          <AccordionSection sectionNumber={5} title="Purpose of Investment">
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="investmentPurpose" value="monthly-income" className="mt-1" checked={formData.investmentPurpose === 'monthly-income'} onChange={handleChange} />
                <span>Monthly Income</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="investmentPurpose" value="long-term-growth" className="mt-1" checked={formData.investmentPurpose === 'long-term-growth'} onChange={handleChange} />
                <span>Long Term Growth</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="investmentPurpose" value="safe-investment" className="mt-1" checked={formData.investmentPurpose === 'safe-investment'} onChange={handleChange} />
                <span>Safe Investment</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="investmentPurpose" value="portfolio-diversification" className="mt-1" checked={formData.investmentPurpose === 'portfolio-diversification'} onChange={handleChange} />
                <span>Portfolio Diversification</span>
              </label>
            </div>
          </AccordionSection>

          <AccordionSection sectionNumber={6} title="Preferred Contact Time">
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="contactTime" value="morning" className="mt-1" checked={formData.contactTime === 'morning'} onChange={handleChange} />
                <span>Morning</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="contactTime" value="afternoon" className="mt-1" checked={formData.contactTime === 'afternoon'} onChange={handleChange} />
                <span>Afternoon</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50/50">
                <input type="radio" name="contactTime" value="evening" className="mt-1" checked={formData.contactTime === 'evening'} onChange={handleChange} />
                <span>Evening</span>
              </label>
            </div>
          </AccordionSection>

          <label className="flex items-start gap-3 border rounded-xl p-4 my-4">
            <input type="checkbox" name="consent" className="mt-1" checked={formData.consent} onChange={handleChange} />
            <span className="text-sm md:text-base">
              I want complete project details and agree to be contacted by TradeLands team.
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl text-lg font-semibold transition"
          >
            {isSubmitting ? 'Submitting...' : 'Get Full Project Details'}
          </button>
        </form>

        {error && <p className="mt-4 text-center text-sm font-semibold text-red-600">{error}</p>}
        {submitted && !error && (
          <p className="mt-4 text-center text-sm font-semibold text-forest-base">
            Thank you. Our investment advisor will reach out shortly.
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default InquirySection;
