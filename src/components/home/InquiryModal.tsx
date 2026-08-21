'use client'

import React from 'react'
import { X } from 'lucide-react'

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold text-white mb-2">Speak with Admissions</h3>
        <p className="text-slate-400 text-xs mb-6">
          Get confidential advice from clinical specialists. Free helpline & immediate availability.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            alert('Thank you! Admissions counselor will call you within 15 minutes.')
            onClose()
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Preferred City or Treatment</label>
            <input
              type="text"
              placeholder="e.g. New Delhi, Alcohol Detox"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-teal-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-950 font-bold text-sm tracking-wider uppercase shadow-lg shadow-teal-500/20 transition hover:from-teal-400 hover:to-emerald-300 mt-2"
          >
            Request Immediate Call Back
          </button>
        </form>
      </div>
    </div>
  )
}
