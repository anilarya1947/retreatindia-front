import React from 'react'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'

export const metadata = {
  title: 'Privacy Policy | RetreatIndia',
  description: 'Privacy policy and user data safety details for RetreatIndia platform.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
      <Header />

      <main className="w-full px-6 sm:px-12 lg:px-12 mt-12 mb-20">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/50 rounded-[30px] p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-serif text-[#318bb0] mb-8 font-normal">
            Privacy Policy
          </h1>

          <div className="prose max-w-none text-slate-600 space-y-6 text-sm sm:text-base leading-relaxed">
            <p>
              Last Updated: August 20, 2026
            </p>
            <p>
              At RetreatIndia, we prioritize the confidentiality and privacy of our visitors and center onboarding partners. This Privacy Policy details the types of information collected, stored, and utilized by RetreatIndia.
            </p>

            <h2 className="text-xl font-bold text-brand-blue font-serif pt-4">1. Information We Collect</h2>
            <p>
              When you submit enquiries on our contact form, request admissions callback, or apply to list your rehabilitation facility, we collect personal identity parameters such as: Name, Email Address, Contact Numbers, WhatsApp credentials, and detailed healthcare or clinical concerns that you voluntarily specify.
            </p>

            <h2 className="text-xl font-bold text-brand-blue font-serif pt-4">2. Confidentiality & Security</h2>
            <p>
              All clinical details, concerns, and contact parameters sent to RetreatIndia are encrypted and treated with strict confidentiality. We do not sell, rent, or trade user enquiry data to third-party marketing networks. Access to medical concerns is strictly limited to authorized advisors and clinical coordinators who assist in listing reviews or care mapping.
            </p>

            <h2 className="text-xl font-bold text-brand-blue font-serif pt-4">3. Cookies & Tracking</h2>
            <p>
              RetreatIndia uses basic standard browser cookies to enhance navigation, verify page layouts, load preferences, and record anonymous traffic metrics using analysis packages to optimize your search experience.
            </p>

            <h2 className="text-xl font-bold text-brand-blue font-serif pt-4">4. Consent</h2>
            <p>
              By accessing our online resources, blogs, and submitting enquiry forms, you hereby consent to the terms of this Privacy Policy and agree to our processing details.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
