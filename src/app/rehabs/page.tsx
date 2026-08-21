'use client'

import React, { useState } from 'react'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'
import InquiryModal from '@/components/home/InquiryModal'
import HeaderBanner from '@/components/rehabs/HeaderBanner'
import ListingSection from '@/components/rehabs/ListingSection'

export default function RehabsPage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)

  const handleOpenInquiry = () => setIsInquiryModalOpen(true)
  const handleCloseInquiry = () => setIsInquiryModalOpen(false)

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* Global Header */}
      <Header />

      {/* Header Banner Section */}
      <HeaderBanner />

      {/* Main Listing Section */}
      <React.Suspense fallback={<div className="py-20 text-center text-slate-500">Loading...</div>}>
        <ListingSection />
      </React.Suspense>

      {/* Global Footer */}
      <Footer />

      {/* Lead Inquiry Modal */}
      <InquiryModal isOpen={isInquiryModalOpen} onClose={handleCloseInquiry} />
    </div>
  )
}
