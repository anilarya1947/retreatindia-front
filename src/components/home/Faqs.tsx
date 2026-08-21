'use client'

import React, { useState } from 'react'

export default function Faqs() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    {
      q: 'How do I choose the right rehab centre?',
      a: 'The right rehabilitation centre depends on clinical needs, treatment goals, budget, environment preferences, and required level of care support.',
    },
    {
      q: 'What treatment programs do rehabilitation centres offer?',
      a: 'Rehabilitation centres offer detox, residential inpatient care, outpatient counseling, dual diagnosis therapy, and holistic wellness programs.',
    },
    {
      q: 'How long does a rehabilitation program usually last?',
      a: 'Programs typically range from 28 days to 90 days, depending on individual clinical assessments and progress during recovery.',
    },
    {
      q: 'Are luxury rehabilitation centres more effective?',
      a: 'Luxury centers offer enhanced privacy, comfort, and premium amenities, but clinical efficacy is driven by evidence-based psychiatric and psychotherapeutic care.',
    },
    {
      q: 'Can rehabilitation centres support mental wellness conditions?',
      a: 'Yes, many specialized centers provide comprehensive dual-diagnosis support to address mental health conditions alongside addiction.',
    },
    {
      q: 'Is privacy maintained during treatment and recovery?',
      a: 'Absolutely. High-end recovery retreats guarantee strict confidentiality, private accommodations, and non-disclosure arrangements.',
    },
    {
      q: 'Can I compare rehabilitation centres before deciding?',
      a: 'Yes, RecoverIndia.Org provides tools and advice to evaluate and compare multiple facilities based on care standards, cost, and location.',
    },
    {
      q: 'Does RecoverIndia.Org directly provide treatment services?',
      a: 'No, RecoverIndia.Org is a curated listing directory and advisory service. We connect you with certified, high-standard independent treatment facilities.',
    },
  ]

  return (
    <section id="faqs" className="pt-20 bg-white text-slate-800">
      <div className="px-6 sm:px-12 lg:px-12">
        <div className="text-left mb-12">
          <h2 className="text-3xl font-normal text-[#318bb0] tracking-tight mb-2">FAQs - Common Concerns</h2>
          <p className="text-slate-500 text-sm">
            Find answers to common questions about rehabilitation, recovery, and wellness support
          </p>
        </div>

        {/* Rounded Single Accordion Container */}
        <div className="bg-[#fafafa] border border-slate-200/80 rounded-[24px] shadow-sm overflow-hidden divide-y divide-slate-200/70">
          {faqs.map((faq, idx) => (
            <div key={idx} className="transition duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left font-sans font-bold text-[#318bb0] text-lg sm:text-base flex items-center justify-between gap-6 hover:bg-slate-100/50 transition cursor-pointer"
              >
                <div className="flex items-center gap-12">
                  <span className="text-[#318bb0] font-sans font-extrabold text-xl tracking-wide">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span>{faq.q}</span>
                </div>

                {/* Solid Teal Plus/Minus Icon */}
                <div className="w-7 h-7 rounded-full bg-[#69cfbb] text-white flex items-center justify-center shrink-0 shadow-sm">
                  {openFaq === idx ? (
                    <span className="text-lg font-bold leading-none select-none">-</span>
                  ) : (
                    <span className="text-lg font-bold leading-none select-none">+</span>
                  )}
                </div>
              </button>

              {openFaq === idx && (
                <div className="px-6 pb-6 pl-[92px] pr-14 text-base text-[#666] leading-relaxed -mt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}