'use client'

import React, { useState } from 'react'
import { Phone, Mail, ArrowRight } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const PRICE_LABEL: Record<string, string> = {
  lt2: '₹1,00,000', '2to3': '₹2,00,000', '3to4': '₹3,00,000',
  '4to5': '₹4,00,000', gt5: '₹5,00,000+',
  budget: '₹50,000', mid: '₹1,20,000', premium: '₹2,50,000',
}

interface RehabSidebarProps {
  centerId: number
  name?: string
  city?: string
  state?: string
  phone?: string
  whatsapp?: string
  priceRange?: string
}

export default function RehabSidebar({
  centerId, name, city, state, phone, whatsapp, priceRange,
}: RehabSidebarProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch(`${API_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          center: centerId,
        }),
      })
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setShowForm(false)
        setFormData({ name: '', phone: '', email: '', message: '' })
      }, 4000)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const displayPhone = phone || '1800 569 9881'
  const displayWhatsapp = whatsapp || ''
  const location = [city, state].filter(Boolean).join(', ')

  return (
    <aside className="w-full lg:sticky lg:top-24 space-y-4">

      {/* ── Card 1 — Contact ── */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 pb-12 shadow-sm">

        {/* Center name + location */}
        <h3 className="font-serif text-3xl leading-snug mb-1" style={{ color: '#318bb0' }}>
          {name}
        </h3>
        {location && (
          <div className="flex items-center gap-1.5 mb-3">
            <svg className="w-3.5 h-3.5 shrink-0" style={{ color: '#318bb0' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-base font-semibold" style={{ color: '#318bb0' }}>{location}</span>
          </div>
        )}

        {/* Price */}
        {priceRange && (
          <div className="flex items-center gap-1.5 mb-5">
            <span className='text-base font-normal text-[#318bb0]'>₹</span>
            <span className="text-xl font-extrabold text-[#318bb0]">From</span>
            <span className="text-2xl font-extrabold" style={{ color: '#318bb0' }}>
              {PRICE_LABEL[priceRange] || priceRange}
            </span>
            <p className="block w-full text-sm text-[#318bb0] font-medium self-end mb-0.5">per month</p>
          </div>
        )}

        {/* Contact buttons */}
        <div className="space-y-4">
          {/* Call */}
          <a
            href={`tel:${displayPhone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-3 px-6 py-2 bg-[#F6F6F6] hover:bg-slate-100 rounded-full border border-slate-200 transition relative"
          >
            <img src="/images/homepage/call.png" alt="Call" className="w-12 h-12 absolute left-0" />
            <span className="text-base font-bold text-[#c1915c] ml-12">{displayPhone}</span>
          </a>

          {/* WhatsApp */}
          {displayWhatsapp && (
            <a
              href={`https://wa.me/${displayWhatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3  px-6 py-2 bg-[#F6F6F6] hover:bg-slate-100 rounded-full border border-slate-200 transition relative"
            >
              <img src="/images/homepage/whatsap.png" alt="Call" className="w-12 h-12 absolute left-0" />
              <span className="text-sm font-bold text-[#4eb576] ml-12">
                {displayWhatsapp.startsWith('+') ? displayWhatsapp : `+91 ${displayWhatsapp}`}
              </span>
            </a>
          )}

          {/* Send Enquiry */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-3 px-6 py-2 bg-[#F6F6F6] hover:bg-slate-100 rounded-full border border-slate-200 transition relative"
          >
            <img src="/images/homepage/email.png" alt="Call" className="w-12 h-12 absolute left-0" />
            <span className="text-sm font-bold text-[#318bb0] uppercase tracking-wider ml-12">SEND ENQUIRY</span>
          </button>
        </div>

        {/* Collapsible form */}
        {showForm && (
          <div className="mt-5 border-t border-slate-100 pt-5">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm p-4 rounded-2xl text-center font-bold">
                ✓ Thank you! We'll contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text" name="name" required placeholder="Your Name"
                  value={formData.name} onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#3bb89b]"
                />
                <input
                  type="tel" name="phone" required placeholder="Phone Number"
                  value={formData.phone} onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#3bb89b]"
                />
                <input
                  type="email" name="email" required placeholder="Email Address"
                  value={formData.email} onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#3bb89b]"
                />
                <textarea
                  name="message" rows={3}
                  placeholder="Any details (addiction type, duration, budget...)"
                  value={formData.message} onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#3bb89b] resize-none"
                />
                <button
                  type="submit" disabled={loading}
                  className="w-full py-3 text-white font-bold text-xs tracking-wider uppercase rounded-full flex items-center justify-center gap-2 disabled:opacity-60 transition"
                  style={{ backgroundColor: '#3bb89b' }}
                >
                  {loading ? 'SENDING...' : 'SEND SECURE INQUIRY'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* ── Card 2 — Evaluation ── */}
      <div className="relative rounded-3xl p-6 shadow-sm overflow-hidden" style={{ backgroundColor: '#f0f4f0' }}>

        {/* Decorative logo bottom right */}
        <div className="absolute bottom-[-32px] right-0 w-24 h-24 opacity-60">
          <img src="/images/homepage/banner-bg-logo.png" alt="" />
        </div>

        {/* Green left border accent text */}
        <div className="flex items-start gap-2 mb-4">
          <div className="w-1 h-10 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: '#3bb89b' }} />
          <p className="text-lg font-bold leading-snug" style={{ color: '#38b579' }}>
            Avoid unnecessarily extended rehab stays.
          </p>
        </div>

        <p className="text-[#318bb0] text-xl leading-snug mb-5 pr-2">
          Our panel psychiatrists help evaluate the right rehab duration before admission.
        </p>

        <div className="space-y-2.5">
          <button className="py-2.5 px-8 border border-gray-300 rounded-full text-sm font-bold text-[#318bb0] hover:border-[#318bb0] hover:text-[#3bb89b] transition uppercase tracking-wider bg-white">
            BOOK YOUR EVALUATION
          </button>
          <a
            href={`tel:${displayPhone.replace(/\s/g, '')}`}
            className="mt-1 inline-block py-2.5 px-8 border border-slate-300 rounded-full text-sm font-bold hover:border-[#318bb0] transition uppercase tracking-wider bg-white"
            style={{ color: '#45c9a5' }}
          >
            CALL {displayPhone}
          </a>
        </div>
      </div>

    </aside>
  )
}