'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ChevronDown } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface Photo { id: number; image: string; alt: string }
interface RehabCenter {
  id: number
  name: string
  slug: string
  city: string
  state: string
  price_range: string
  price_range_display: string
  photos: Photo[]
}

const PRICE_LABEL: Record<string, string> = {
  lt2: '₹1,00,000', '2to3': '₹2,00,000', '3to4': '₹3,00,000',
  '4to5': '₹4,00,000', gt5: '₹5,00,000+',
  budget: '₹50,000', mid: '₹1,20,000', premium: '₹2,50,000',
}

const ITEMS_PER_PAGE = 4

export default function FeaturedRehabs() {
  const [centers, setCenters] = useState<RehabCenter[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)

  useEffect(() => {
    fetch(`${API_URL}/api/listings/?featured=true&ordering=-created_at`)
      .then((r) => r.json())
      .then((data) => setCenters(data.results || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const totalPages = Math.ceil(centers.length / ITEMS_PER_PAGE)
  const visible = centers.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  const prev = () => setPage((p) => Math.max(0, p - 1))
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1))

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="px-6 sm:px-12 lg:px-12">
          <div className="h-8 bg-slate-200 rounded w-48 mb-4 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-slate-100 rounded-[20px] h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (centers.length === 0) return null

  return (
    <section id="search" className="pt-0 pb-20 bg-white text-slate-800">
      <div className="px-6 sm:px-12 lg:px-12">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-regular text-brand-blue tracking-tight">Popular Rehabs</h2>
          <p className="text-[#666666] text-sm mt-1">
            Explore verified rehab and recovery centres across India
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((center) => {
            const photo = center.photos?.[0]?.image
            const location = [center.city, center.state].filter(Boolean).join(', ')
            const price = center.price_range_display || PRICE_LABEL[center.price_range] || ''

            return (
              <div
                key={center.id}
                className="bg-[#fcfaf7] border border-slate-200/60 rounded-[20px] p-4 pb-10 flex flex-col justify-between transition duration-300 hover:shadow-md"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-[3/2] w-full rounded-[14px] overflow-hidden mb-4 bg-slate-100">
                    {photo ? (
                      <Image
                        src={photo}
                        alt={center.name}
                        fill
                        unoptimized
                        className="object-cover hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-200" />
                    )}
                  </div>

                  {/* Title */}
                  <Link
                    href={`/${center.slug}`}
                    className="font-sans font-semibold text-brand-blue text-sm sm:text-base leading-snug hover:underline block mb-4 line-clamp-2 underline"
                  >
                    {center.name}
                  </Link>
                </div>

                {/* Metadata */}
                <div>
                  {price && (
                    <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm font-semibold">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-gray-700 text-xs border border-gray-700 shrink-0">
                        ₹
                      </div>
                      <span className="text-[#3cb89b] text-base font-semibold">
                        From {price}
                      </span>
                    </div>
                  )}
                  {location && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <MapPin className="w-5 h-5 text-gray-700 shrink-0" />
                      <span className="text-[#666666] text-base underline">{location}</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Navigation */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={prev}
              disabled={page === 0}
              className="w-9 h-9 rounded-full bg-[#50cfbe] text-white flex items-center justify-center shadow hover:bg-[#3fbfae] transition disabled:opacity-40"
            >
              <ChevronDown className="w-5 h-5 rotate-90" />
            </button>
            <span className="text-xs text-slate-400 font-semibold">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={next}
              disabled={page === totalPages - 1}
              className="w-9 h-9 rounded-full bg-[#50cfbe] text-white flex items-center justify-center shadow hover:bg-[#3fbfae] transition disabled:opacity-40"
            >
              <ChevronDown className="w-5 h-5 -rotate-90" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}