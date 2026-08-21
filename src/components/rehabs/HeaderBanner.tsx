'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderBannerProps {
  title?: string
  subtitle?: string
  breadcrumbs?: { label: string; href?: string }[]
}

export default function HeaderBanner({
  title = 'Rehabilitation Centers in Dehradun, Uttarakhand',
  subtitle = 'Discover curated rehabilitation centres offering detox, residential care, wellness-focused healing, and personalized recovery support environments.',
  breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Uttarakhand' },
    { label: 'Dehradun' },
  ],
}: HeaderBannerProps) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 pt-6 pb-4">
      <div className="px-6 sm:px-12 lg:px-12 bg-[#f8f3ea] rounded-3xl border border-slate-200/50 relative pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 sm:px-8 py-6 pb-10 relative z-10">
          <div className="md:col-span-6 flex flex-col justify-center">
            {/* Breadcrumbs */}
            <nav className="text-xs font-semibold text-[#8e8070] mb-4 flex items-center gap-1.5 flex-wrap">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-brand-blue transition">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#8e8070]">{crumb.label}</span>
                  )}
                  {idx < breadcrumbs.length - 1 && (
                    <span className="text-[#8e8070]">›</span>
                  )}
                </React.Fragment>
              ))}
            </nav>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#318bb0] leading-tight mb-4 font-normal">
              {title}
            </h1>

            {/* Description */}
            <p className="text-[#8e8070] text-sm sm:text-base leading-relaxed max-w-xl">
              {subtitle}
            </p>
          </div>
          <div className="md:col-span-1 relative w-full flex justify-center items-center"></div>
          <div className="md:col-span-5 relative w-full flex justify-center items-center">
            <div className="absolute inset-0 flex items-center -translate-x-1/2 justify-center pointer-events-none opacity-70 transform">
              <img src="/images/homepage/banner-bg-logo.png" alt="" />
            </div>
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[4/2.5] rounded-tl-4xl rounded-tr-4xl rounded-br-4xl rounded-bl-[200px] overflow-hidden bg-slate-100 transform rotate-1 md:rotate-2 hover:rotate-0 transition duration-500">
              <Image
                src="/images/homepage/banner-image.png"
                alt={title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[100%] max-w-4xl z-20">
          <div className="bg-brand-blue text-white rounded-full py-3 px-6 shadow-lg flex flex-col sm:flex-row items-center justify-around gap-2 text-center text-xs md:text-sm font-normal select-none border border-brand-blue/30">
            <div className="flex items-center gap-2"><span className="text-emerald-300">
              <img src="/images/homepage/star-tick.png" alt="" className='w-8 h-8' />
            </span><span>Trusted pricing for every stay</span></div>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2"><span className="text-emerald-300"><img src="/images/homepage/star-tick.png" alt="" className='w-8 h-8' /></span><span>Flexible admissions & cancellations</span></div>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2"><span className="text-emerald-300"><img src="/images/homepage/star-tick.png" alt="" className='w-8 h-8' /></span><span>No hidden booking charges</span></div>
          </div>
        </div>
      </div>
      <div className="h-10" />
    </section>
  )
}