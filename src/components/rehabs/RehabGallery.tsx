'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, IndianRupee, Home, X, ChevronLeft, ChevronRight } from 'lucide-react'

const FALLBACK = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'

const PRICE_LABEL: Record<string, string> = {
  budget: '₹50,000', mid: '₹1,20,000', premium: '₹2,50,000',
  lt2: '₹1,00,000', '2to3': '₹2,00,000', '3to4': '₹3,00,000',
  '4to5': '₹4,00,000', gt5: '₹5,00,000',
}

const CATEGORY_LABEL: Record<string, string> = {
  'luxury-wellness': 'Luxury Wellness Retreat',
  'luxury-clinical': 'Luxury Clinical Rehab',
  'budget-clinical': 'Budget Clinical Rehab',
}

interface RehabGalleryProps {
  name: string
  location: string
  images: string[]
  totalPhotos?: number
  verified?: boolean
  priceRange?: string
  category?: string
  state?: string
  city?: string
}

export default function RehabGallery({
  name, location, images, totalPhotos = 0,
  verified = false, priceRange, category, state, city,
}: RehabGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const allImages = images.length > 0 ? images : [FALLBACK]
  const mainImage = allImages[0]
  const grid = [allImages[1], allImages[2], allImages[3], allImages[4]].map((img) => img || FALLBACK)
  const extraCount = allImages.length > 5 ? allImages.length - 5 : 0

  const openLightbox = (index = 0) => {
    setActiveIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const prev = () => setActiveIndex((i) => (i === 0 ? allImages.length - 1 : i - 1))
  const next = () => setActiveIndex((i) => (i === allImages.length - 1 ? 0 : i + 1))

  // Keyboard navigation
  React.useEffect(() => {
    if (!lightboxOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxOpen])

  return (
    <>
      <section className="w-full px-6 sm:px-12 lg:px-12 mt-8">
        <div className="">

          {/* Breadcrumb + logos */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <nav className="text-xs sm:text-sm font-semibold text-slate-500 flex items-center gap-1.5 flex-wrap">
              <Link href="/" className="hover:text-[#318bb0] transition">Home</Link>
              <span className="text-slate-300">›</span>
              {state && <><span>{state}</span><span className="text-slate-300">›</span></>}
              {city && (
                <><Link href={`/${city.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#318bb0] transition">{city}</Link>
                  <span className="text-slate-300">›</span></>
              )}
              <span className="text-[#4f3f2c] font-bold">{name}</span>
            </nav>

          </div>

          <div className="flex justify-between mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-tight mb-3" style={{ color: '#318bb0' }}>
                {name}
              </h1>
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-5 mb-6 text-sm font-semibold">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <MapPin className="w-4 h-4 shrink-0" style={{ color: '#318bb0' }} />
                  <span>{location}</span>
                </div>
                {priceRange && (
                  <div className="flex items-center gap-1.5" style={{ color: '#38b579' }}>
                    <IndianRupee className="w-4 h-4 shrink-0" />
                    <span>From {PRICE_LABEL[priceRange] || priceRange} per month</span>
                  </div>
                )}
                {category && (
                  <div className="flex items-center gap-1.5" style={{ color: '#318bb0' }}>
                    <Home className="w-4 h-4 shrink-0" />
                    <span className="underline-offset-2">
                      {CATEGORY_LABEL[category] || category}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="relative h-12 w-36">
                <Image src="/images/homepage/rci-logo.png" alt="RCI" fill className="object-contain" />
              </div>
              <div className="w-px h-12 bg-slate-400" />
              {verified && (
                <div className="relative h-12 w-36">
                  <Image src="/images/homepage/verified.png" alt="RecoverIndia Verified" fill className="object-contain" />
                </div>
              )}
            </div>
          </div>
          {/* Gallery grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Main large image */}
            <div
              className="md:col-span-6 relative aspect-[4/3] bg-slate-100 group overflow-hidden rounded-[20px] cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              <Image
                src={mainImage}
                alt={`${name} main view`}
                fill priority unoptimized
                className="object-cover group-hover:scale-[1.02] transition duration-700"
              />
              <button
                onClick={(e) => { e.stopPropagation(); openLightbox(0) }}
                className="absolute bottom-4 right-4 bg-white hover:bg-slate-50 text-[#318bb0] border border-slate-200 px-5 py-2 rounded-full text-xs font-bold shadow-md transition select-none"
              >
                MORE PHOTOS
              </button>
            </div>

            {/* 2×2 grid */}
            <div className="md:col-span-6 grid grid-cols-2 gap-3">
              {grid.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] bg-slate-100 group overflow-hidden rounded-[16px] cursor-pointer"
                  onClick={() => openLightbox(idx + 1)}
                >
                  <Image
                    src={img}
                    alt={`${name} photo ${idx + 2}`}
                    fill unoptimized
                    className="object-cover group-hover:scale-[1.02] transition duration-700"
                  />
                  {idx === 3 && extraCount > 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-[16px]">
                      <span className="text-white font-bold text-base">+{extraCount} Photos</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── LIGHTBOX POPUP ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          onClick={closeLightbox}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 shrink-0" onClick={(e) => e.stopPropagation()}>
            <p className="text-white font-semibold text-sm">
              {activeIndex + 1} / {allImages.length} &nbsp;·&nbsp; {name}
            </p>
            <button
              onClick={closeLightbox}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main image */}
          <div
            className="flex-1 flex items-center justify-center px-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prev}
              className="absolute left-4 sm:left-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full max-w-4xl aspect-[16/10]">
              <Image
                src={allImages[activeIndex]}
                alt={`${name} photo ${activeIndex + 1}`}
                fill unoptimized
                className="object-contain"
              />
            </div>

            <button
              onClick={next}
              className="absolute right-4 sm:right-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div
            className="shrink-0 px-4 py-4 flex gap-2 overflow-x-auto scrollbar-none justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition ${idx === activeIndex ? 'border-white' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
              >
                <Image src={img} alt="" fill unoptimized className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}