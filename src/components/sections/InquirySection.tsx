"use client";
import React, { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';

const InquirySection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const email = String(formData.get('email') || '').trim();
    const mobile = String(formData.get('mobile') || '').trim();
    const consent = formData.get('consent');

    const investmentPlan = String(formData.get('investmentPlan') || '');
    const investmentStatus = String(formData.get('investmentStatus') || '');
    const investmentTimeline = String(formData.get('investmentTimeline') || '');
    const investmentPurpose = String(formData.get('investmentPurpose') || '');
    const contactTime = String(formData.get('contactTime') || '');

    const cleanPhone = mobile.replace(/\D/g, '');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setSubmitted(false);
      setError('Please enter a valid email address.');
      return;
    }

    if (cleanPhone.length < 10) {
      setSubmitted(false);
      setError('Phone number must contain at least 10 digits.');
      return;
    }

    if (!investmentPlan || !investmentStatus || !investmentTimeline) {
      setSubmitted(false);
      setError('Please select one option in all required sections.');
      return;
    }

    if (!consent) {
      setSubmitted(false);
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
          fullName: String(formData.get('fullName') || '').trim(),
          mobile,
          email,
          city: String(formData.get('city') || '').trim(),
          investmentPlan: investmentPlan ? [investmentPlan] : [],
          investmentStatus: investmentStatus ? [investmentStatus] : [],
          investmentTimeline: investmentTimeline ? [investmentTimeline] : [],
          investmentPurpose: investmentPurpose ? [investmentPurpose] : [],
          preferredContactTime: contactTime ? [contactTime] : [],
          message: String(formData.get('message') || '').trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit enquiry.');
      }

      setSubmitted(true);
      form.reset();
    } catch (submitError) {
      setSubmitted(false);
      setError(submitError instanceof Error ? submitError.message : 'Failed to submit enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <input
            type="text"
            name="fullName"
            required
            placeholder="Full Name*"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
          />
          <input
            type="tel"
            name="mobile"
            required
            placeholder="Mobile Number (WhatsApp preferred)*"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Email Address*"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
          />
          <input
            type="text"
            name="city"
            required
            placeholder="City / Current Location*"
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={4}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
          />

          <fieldset className="mb-4">
            <legend className="text-forest-dark font-semibold mb-3">Select Your Investment Plan*</legend>
            <div className="space-y-3 border rounded-xl p-4">
              <label className="flex items-start gap-3">
                <input type="radio" name="investmentPlan" value="plan-a" className="mt-1" required />
                <span>Plan A - Rs 50,000 per month for 24 months</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="radio" name="investmentPlan" value="plan-b" className="mt-1" />
                <span>Plan B - Rs 50 Lakhs total value after 2 years</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="mb-4">
            <legend className="text-forest-dark font-semibold mb-3">Investment Amount Status*</legend>
            <div className="space-y-3 border rounded-xl p-4">
              <label className="flex items-start gap-3">
                <input type="radio" name="investmentStatus" value="ready" className="mt-1" required />
                <span>Rs 30-35 Lakhs Ready</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="radio" name="investmentStatus" value="arranging" className="mt-1" />
                <span>Funds Arranging</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="radio" name="investmentStatus" value="details" className="mt-1" />
                <span>Need More Details</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="mb-4">
            <legend className="text-forest-dark font-semibold mb-3">When Are You Planning to Invest?*</legend>
            <div className="space-y-3 border rounded-xl p-4">
              <label className="flex items-start gap-3">
                <input type="radio" name="investmentTimeline" value="7-days" className="mt-1" required />
                <span>Within 7 Days</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="radio" name="investmentTimeline" value="1-month" className="mt-1" />
                <span>Within 1 Month</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="radio" name="investmentTimeline" value="3-months" className="mt-1" />
                <span>Within 3 Months</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="radio" name="investmentTimeline" value="exploring" className="mt-1" />
                <span>Just Exploring</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="mb-4">
            <legend className="text-forest-dark font-semibold mb-3">Purpose of Investment</legend>
            <div className="space-y-3 border rounded-xl p-4">
              <label className="flex items-start gap-3">
                <input type="radio" name="investmentPurpose" value="monthly-income" className="mt-1" />
                <span>Monthly Income</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="radio" name="investmentPurpose" value="long-term-growth" className="mt-1" />
                <span>Long Term Growth</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="radio" name="investmentPurpose" value="safe-investment" className="mt-1" />
                <span>Safe Investment</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="radio" name="investmentPurpose" value="portfolio-diversification" className="mt-1" />
                <span>Portfolio Diversification</span>
              </label>
            </div>
          </fieldset>

          <fieldset className="mb-4">
            <legend className="text-forest-dark font-semibold mb-3">Preferred Contact Time</legend>
            <div className="space-y-3 border rounded-xl p-4">
              <label className="flex items-start gap-3">
                <input type="radio" name="contactTime" value="morning" className="mt-1" />
                <span>Morning</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="radio" name="contactTime" value="afternoon" className="mt-1" />
                <span>Afternoon</span>
              </label>
              <label className="flex items-start gap-3">
                <input type="radio" name="contactTime" value="evening" className="mt-1" />
                <span>Evening</span>
              </label>
            </div>
          </fieldset>

          <label className="flex items-start gap-3 border rounded-xl p-4 mb-4">
            <input type="checkbox" name="consent" value="yes" className="mt-1" />
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
