import React from 'react'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'

export const metadata = {
  title: 'Terms & Conditions | RetreatIndia',
  description: 'Terms of service and usage conditions for the RetreatIndia directory and platform.',
}

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
      <Header />

      <main className="w-full px-6 sm:px-12 lg:px-12 mt-12 mb-20">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/50 rounded-[30px] p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#318bb0] mb-8 font-normal">
            Terms & Conditions
          </h1>

          <div className="prose max-w-none text-slate-600 space-y-6 text-sm sm:text-base leading-relaxed">
            <p>
              Last Updated: August 20, 2026
            </p>
            <p>
              Welcome to RetreatIndia. By accessing, browsing, or utilizing this website and its directory services, you agree to comply with and be bound by the following Terms & Conditions.
            </p>

            <h2 className="text-xl font-bold text-brand-blue font-serif pt-4">1. Use of Directory</h2>
            <p>
              RetreatIndia operates as an information portal and directory listing premium rehabilitation and wellness centers. The listings are published for general search and educational guidance. RetreatIndia does not directly control the clinical treatments or operations of individual third-party facilities.
            </p>

            <h2 className="text-xl font-bold text-brand-blue font-serif pt-4">2. User Accounts & Listings</h2>
            <p>
              Facility representatives who register details to onboard a center agree to submit accurate, verified clinical information, licenses, and media. We reserve the right to review, reject, or modify listing details to maintain platform reliability.
            </p>

            <h2 className="text-xl font-bold text-brand-blue font-serif pt-4">3. Limitation of Liability</h2>
            <p>
              RetreatIndia is not liable for outcomes, agreements, or treatments rendered during your interaction or eventual stay at any listed rehabilitation center. Users are encouraged to perform direct validation and seek expert medical counsel before booking.
            </p>

            <h2 className="text-xl font-bold text-brand-blue font-serif pt-4">4. Amendments</h2>
            <p>
              We reserve the right to amend these Terms & Conditions at any point. Continued usage of our website signifies acceptance of updated guidelines.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
