'use client'

import React, { useState } from 'react'
import { CheckCircle2, ShieldCheck, ArrowRight, Building2 } from 'lucide-react'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'

export default function ListCenterPage() {
  const [formData, setFormData] = useState({
    centerName: '',
    contactName: '',
    designation: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    specialization: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({
        centerName: '',
        contactName: '',
        designation: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        specialization: '',
      })
    }, 1200)
  }

  return (
    <div className="min-h-screen text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
      <Header />

      <main className="w-full px-6 sm:px-12 lg:px-12 mt-12 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Side Column (5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 px-3 py-1 bg-teal-50 rounded-full">
                For Rehabilitation Partners
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif text-[#318bb0] mt-4 mb-4 leading-tight">
                List Your Rehabilitation Center
              </h1>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Connect with individuals seeking quality mental health and addiction recovery care. Expand your outreach and list your verified facility on India's most exclusive luxury rehab network.
              </p>
            </div>

            <div className="bg-[#f8f3ea] border border-slate-200/50 rounded-[30px] p-8 shadow-sm">
              <h3 className="font-serif text-lg text-brand-blue font-bold mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                Why Partner With Us?
              </h3>
              <ul className="space-y-4 text-sm text-[#8e8070] leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>High-Intent Audience:</strong> Reach patients and families looking for treatment.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Verified Listings:</strong> Gain trust through verified profiles showcasing photos, amenities, and clinical team.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-teal-600 font-bold">•</span>
                  <span><strong>Professional Support:</strong> Dedicated dashboard and support from RetreatIndia coordinators.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-[#fcfaf7] border border-slate-200/60 rounded-[30px] p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-teal-50 border border-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-brand-blue mb-3">Facility Registration Submitted</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
                  Our verification team will review your center's details and contact you within 24-48 hours to complete the verification process.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
                >
                  List Another Facility
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif text-[#318bb0] mb-2 font-normal flex items-center gap-2">
                  <Building2 className="w-5.5 h-5.5 text-[#318bb0]" />
                  Facility Onboarding Form
                </h2>
                <p className="text-xs text-slate-500 mb-8">
                  Provide your facility and contact information below to start the verification process.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Center Name */}
                  <div>
                    <label htmlFor="centerName" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Center/Facility Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="centerName"
                      id="centerName"
                      required
                      value={formData.centerName}
                      onChange={handleChange}
                      placeholder="e.g. Hope Wellness Rehabilitation Center"
                      className="w-full px-4 py-3 bg-white border border-slate-200/70 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Person Name */}
                    <div>
                      <label htmlFor="contactName" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Contact Person Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        id="contactName"
                        required
                        value={formData.contactName}
                        onChange={handleChange}
                        placeholder="e.g. Dr. Amit Patel"
                        className="w-full px-4 py-3 bg-white border border-slate-200/70 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition"
                      />
                    </div>

                    {/* Designation */}
                    <div>
                      <label htmlFor="designation" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Designation / Role <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="designation"
                        id="designation"
                        required
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="e.g. Clinical Director, Owner"
                        className="w-full px-4 py-3 bg-white border border-slate-200/70 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. contact@hopewellness.com"
                        className="w-full px-4 py-3 bg-white border border-slate-200/70 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 bg-white border border-slate-200/70 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* City */}
                    <div>
                      <label htmlFor="city" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Dehradun"
                        className="w-full px-4 py-3 bg-white border border-slate-200/70 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition"
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label htmlFor="state" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        id="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="e.g. Uttarakhand"
                        className="w-full px-4 py-3 bg-white border border-slate-200/70 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition"
                      />
                    </div>
                  </div>

                  {/* Specialization / Services */}
                  <div>
                    <label htmlFor="specialization" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Specialization / Offered Treatments <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="specialization"
                      id="specialization"
                      rows={4}
                      required
                      value={formData.specialization}
                      onChange={handleChange}
                      placeholder="e.g. Alcohol detox, luxury residential rehab, cognitive behavioral therapy, dual diagnosis treatment..."
                      className="w-full px-4 py-3 bg-white border border-slate-200/70 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:from-teal-400 hover:to-emerald-300 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {loading ? (
                      'Submitting Registration...'
                    ) : (
                      <>
                        Submit Facility for Review
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
