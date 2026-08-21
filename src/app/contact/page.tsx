'use client'

import React, { useState } from 'react'
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    concern: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: '', phone: '', whatsapp: '', email: '', concern: '' })
    }, 1200)
  }

  return (
    <div className="min-h-screen text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
      <Header />

      <main className="w-full px-6 sm:px-12 lg:px-12 mt-12 mb-20">
        {/* Page Banner Header */}
        <div className="max-w-7xl mx-auto mb-16 text-center lg:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-[#128c9b] px-3 py-1 bg-teal-50 rounded-full">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#318bb0] mt-4 mb-4 font-normal">
            Contact Our Care Team
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl leading-relaxed">
            Have questions about rehab listings, treatments, admissions, or mental health resources? We are here to provide confidential, expert guidance.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Info Card (4 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#f8f3ea] border border-slate-200/50 rounded-[30px] p-8 sm:p-10 shadow-sm relative overflow-hidden">
              {/* Background logo ornament */}
              <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10 pointer-events-none">
                <img src="/images/homepage/banner-bg-logo.png" alt="" className="w-48 h-48" />
              </div>

              <h2 className="text-2xl font-serif text-[#318bb0] mb-8 font-normal">
                Care Office Info
              </h2>

              <div className="space-y-8 relative z-10">
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-teal-600 shadow-sm flex-shrink-0 border border-slate-100">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Call Helpline</p>
                    <a href="tel:+919876543210" className="text-base font-bold text-brand-blue hover:text-teal-600 transition">
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-teal-600 shadow-sm flex-shrink-0 border border-slate-100">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Support</p>
                    <a href="mailto:support@recoverindia.com" className="text-base font-bold text-brand-blue hover:text-teal-600 transition">
                      support@recoverindia.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-teal-600 shadow-sm flex-shrink-0 border border-slate-100">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Our Location</p>
                    <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                      124, Rajpur Road, Dehradun,<br />Uttarakhand - 248001
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-12 pt-8 border-t border-slate-200/60">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Connect with us</p>
                <div className="flex gap-3">
                  <a href="#" className="w-9 h-9 rounded-full bg-white text-[#128c9b] border border-slate-200/60 flex items-center justify-center hover:bg-teal-600 hover:text-white transition shadow-sm">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-white text-[#128c9b] border border-slate-200/60 flex items-center justify-center hover:bg-teal-600 hover:text-white transition shadow-sm">
                    <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-white text-[#128c9b] border border-slate-200/60 flex items-center justify-center hover:bg-teal-600 hover:text-white transition shadow-sm">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="https://wa.me/919876543210" className="w-9 h-9 rounded-full bg-white text-[#128c9b] border border-slate-200/60 flex items-center justify-center hover:bg-teal-600 hover:text-white transition shadow-sm">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm5.835-3.266c1.62.96 3.201 1.46 4.937 1.461 5.349 0 9.704-4.323 9.707-9.629.002-2.571-1.002-4.99-2.83-6.819-1.828-1.83-4.262-2.838-6.837-2.839-5.356 0-9.71 4.322-9.71 9.63-.001 1.733.453 3.424 1.316 4.922L1.442 22.56l4.45-1.826zm11.957-6.861c-.3-.149-1.77-.87-2.046-.971-.275-.1-.475-.149-.675.149-.199.3-.774.972-.949 1.17-.175.199-.349.224-.649.075-.3-.15-1.265-.465-2.41-1.48-.89-.792-1.49-1.77-1.665-2.07-.175-.3-.019-.461.13-.61.135-.133.3-.349.45-.523.15-.174.2-.299.3-.499.1-.199.05-.375-.025-.524-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.519-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8 1.096-.275 1.02-1.05 3.105-1.05 3.155 0 .052.05.275.225.514.175.238 1.8 2.749 4.362 3.856.61.264 1.085.42 1.457.538.613.195 1.171.167 1.611.101.49-.074 1.77-.723 2.02-1.396.25-.673.25-1.248.175-1.396-.075-.149-.275-.249-.575-.398z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#fcfaf7] border border-slate-200/60 rounded-[30px] p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-teal-50 border border-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-brand-blue mb-3">Enquiry Submitted Successfully</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto mb-8">
                  Thank you for reaching out. A dedicated care coordinator will review your concern and get in touch with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-serif text-[#318bb0] mb-2 font-normal">
                  Care Enquiry Form
                </h2>
                <p className="text-xs text-slate-500 mb-8">
                  Please fill out the form below. All information submitted remains strictly confidential under HIPAA guidelines.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 bg-white border border-slate-200/70 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition"
                      />
                    </div>

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
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-4 py-3 bg-white border border-slate-200/70 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                    {/* Whatsapp */}
                    <div>
                      <label htmlFor="whatsapp" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        id="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="e.g. Same as above"
                        className="w-full px-4 py-3 bg-white border border-slate-200/70 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition"
                      />
                    </div>
                  </div>

                  {/* Concern */}
                  <div>
                    <label htmlFor="concern" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Your Concern / Enquiry Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="concern"
                      id="concern"
                      rows={5}
                      required
                      value={formData.concern}
                      onChange={handleChange}
                      placeholder="Please share details about your concern, required treatment, or program interests..."
                      className="w-full px-4 py-3 bg-white border border-slate-200/70 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:from-teal-400 hover:to-emerald-300 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-75"
                  >
                    {loading ? (
                      'Sending Enquiry...'
                    ) : (
                      <>
                        Send Care Enquiry
                        <Send className="w-3.5 h-3.5" />
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
