import React from 'react'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'

export const metadata = {
  title: 'Disclaimer | RetreatIndia',
  description: 'Medical and information disclaimer for RetreatIndia platform.',
}

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
      <Header />

      <main className="w-full px-6 sm:px-12 lg:px-12 mt-12 mb-20">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/50 rounded-[30px] p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#318bb0] mb-8 font-normal">
            Disclaimer
          </h1>

          <div className="prose max-w-none text-slate-600 space-y-6 text-sm sm:text-base leading-relaxed">
            <p>
              Last Updated: August 20, 2026
            </p>
            <p className="font-semibold text-slate-700">
              IMPORTANT MEDICAL DISCLAIMER: RetreatIndia is an information and directory portal. The content, including text, listing profiles, pricing, treatment guides, blogs, and other resources, is provided for informational and search purposes only.
            </p>

            <h2 className="text-xl font-bold text-brand-blue font-serif pt-4">Not Medical Advice</h2>
            <p>
              The materials presented on this website are not intended to substitute for professional medical advice, clinical diagnosis, or specialized psychiatric treatment. Always seek the advice of your physician, psychiatrist, or qualified counselor with any questions you may have regarding addiction recovery, mental wellness concerns, or medical conditions.
            </p>

            <h2 className="text-xl font-bold text-brand-blue font-serif pt-4">No Endorsement</h2>
            <p>
              While we curate listings and perform verification on facilities, listing on RetreatIndia does not constitute an explicit endorsement, recommendation, or clinical guarantee of any specific treatment center, medical professional, or program listed. You assume full responsibility for your choice of recovery facility.
            </p>

            <h2 className="text-xl font-bold text-brand-blue font-serif pt-4">Emergency Assistance</h2>
            <p>
              If you or a loved one are experiencing a severe mental health crisis, suicidal thoughts, or life-threatening withdrawal symptoms, please call national emergency helplines or contact a local hospital immediately. RetreatIndia is not a crisis-intervention medical hotline.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
