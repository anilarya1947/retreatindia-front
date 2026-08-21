'use client'

import React, { useState } from 'react'
import Header from '@/components/home/Header'
import Hero from '@/components/home/Hero'
import Evaluation from '@/components/home/Evaluation'
import FeaturedRehabs from '@/components/home/FeaturedRehabs'
import Surroundings from '@/components/home/Surroundings'
import RecoveryProcess from '@/components/home/RecoveryProcess'
import Faqs from '@/components/home/Faqs'
import Blogs from '@/components/home/Blogs'
import SeoContent from '@/components/home/SeoContent'
import Footer from '@/components/home/Footer'
import InquiryModal from '@/components/home/InquiryModal'
import Treatments from '@/components/home/Treatments'
import RehabsByTreatment from '@/components/home/RehabsByTreatment'
import EvaluationSection from '@/components/home/EvaluationSection'


export default function HomePage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)

  const handleOpenInquiry = () => setIsInquiryModalOpen(true)
  const handleCloseInquiry = () => setIsInquiryModalOpen(false)

  return (
    <div className="min-h-screen  text-slate-100 font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* 1. Header/Navbar */}
      <Header />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Doctors / Evaluation Section */}
      <Evaluation onOpenInquiry={handleOpenInquiry} />
      <FeaturedRehabs />
      <RehabsByTreatment />
      <EvaluationSection />


      <Surroundings />

      <RecoveryProcess onOpenInquiry={handleOpenInquiry} />


      <Blogs />

      <Faqs />
      {/* 7. Bottom SEO Content */}
      <SeoContent />

      {/* 8. Footer */}
      <Footer />

      {/* Inquiry Lead Modal */}
      <InquiryModal isOpen={isInquiryModalOpen} onClose={handleCloseInquiry} />
    </div>
  )
}
