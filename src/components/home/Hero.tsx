'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Search, MapPin, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const TOP_LOCATIONS = [
  { label: 'New Delhi', slug: 'new-delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=200&q=80' },
  { label: 'Mumbai', slug: 'mumbai', image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=200&q=80' },
  { label: 'Bangalore', slug: 'bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=200&q=80' },
  { label: 'Dehradun', slug: 'dehradun', image: 'https://images.unsplash.com/photo-1588087775694-c8b40c73c0af?w=200&q=80' },
  { label: 'Goa', slug: 'goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&q=80' },
]

const COMMON_CONDITIONS = [
  'Alcohol Addiction', 'Anxiety', 'Depression', 'Drug Addiction',
  'Trauma', 'Bipolar Disorder', 'Burnout', 'Gaming Addiction', '30+',
]

const PATIENT_PROFILES = ['Men', 'Women', 'Teens', 'Executives', 'Young Adults', 'Couples']

const SURROUNDINGS = ['Mountains', 'Beach', 'Farm/Garden', 'Forest', 'City', 'Lake/Riverside']

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function Hero() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  // Close popup on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsPopupOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    setIsPopupOpen(false)
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  const handleConditionClick = (condition: string) => {
    setIsPopupOpen(false)
    router.push(`/search?q=${encodeURIComponent(condition)}`)
  }

  const handleLocationClick = (slug: string) => {
    setIsPopupOpen(false)
    router.push(`/${slug}`)
  }

  const handleProfileClick = (profile: string) => {
    setIsPopupOpen(false)
    router.push(`/search?profile=${encodeURIComponent(profile.toLowerCase())}`)
  }

  const handleSurroundingClick = (surrounding: string) => {
    setIsPopupOpen(false)
    router.push(`/search?surrounding=${encodeURIComponent(slugify(surrounding))}`)
  }

  return (
    <section className="relative w-full mt-3">

      {/* Desktop Banner */}
      <div className="hidden md:block relative w-full px-6 sm:px-12 lg:px-12">
        <img
          src="/images/homepage/banner.png"
          alt="RecoverIndia Banner"
          className="object-cover object-center h-full w-full rounded-3xl"
        />
      </div>

      {/* Mobile Banner */}
      <div className="block md:hidden relative w-full aspect-[4/3]">
        <Image
          src="/images/homepage/banner.png"
          alt="RecoverIndia Banner"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Search Bar */}
      <div className="absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4" ref={popupRef}>
        <form onSubmit={handleSearch}>
          <div className={`relative flex items-center bg-white shadow-xl border border-slate-200 ${isPopupOpen ? 'rounded-t-2xl rounded-b-none border-b-0' : 'rounded-full'} transition-all`}>
            <Search className="w-5 h-5 text-slate-400 absolute left-5 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Locations, Condition, Centers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsPopupOpen(true)}
              className="w-full pl-14 pr-28 py-3.5 sm:py-4 text-slate-800 placeholder:text-slate-400 text-sm sm:text-base focus:outline-none bg-transparent rounded-full"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-24 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-2 bg-brand-blue hover:bg-[#27708e] text-white rounded-full px-5 py-2 text-xs font-bold transition"
            >
              Search
            </button>
          </div>
        </form>

        {/* ── SEARCH POPUP ── */}
        {isPopupOpen && (
          <div className="bg-white border border-slate-200 border-t-0 rounded-b-2xl shadow-2xl max-h-[70vh] overflow-y-auto">

            {/* Query hint when typing */}
            {searchQuery ? (
              <div className="p-4 space-y-4">
                {/* Search this query */}
                <button
                  onClick={() => handleConditionClick(searchQuery)}
                  className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                    <Search className="w-4 h-4 text-brand-blue" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{searchQuery}</span>
                </button>

                {/* Matching locations */}
                {TOP_LOCATIONS.filter((l) => l.label.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 && (
                  <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Locations</p>
                    {TOP_LOCATIONS.filter((l) => l.label.toLowerCase().includes(searchQuery.toLowerCase())).map((loc) => (
                      <button
                        key={loc.slug}
                        onClick={() => handleLocationClick(loc.slug)}
                        className="w-full flex items-center gap-3 py-2.5 px-2 hover:bg-slate-50 rounded-xl transition text-left"
                      >
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-sm text-slate-700 font-semibold">{loc.label}</span>
                        <span className="text-xs text-slate-400">India</span>
                      </button>
                    ))}
                    <button
                      onClick={() => { setIsPopupOpen(false); router.push('/search') }}
                      className="w-full flex items-center gap-3 py-2.5 px-2 hover:bg-slate-50 rounded-xl transition text-left"
                    >
                      <Search className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="text-sm text-[#318bb0] font-semibold">Browse All Locations</span>
                    </button>
                  </div>
                )}

                {/* Matching conditions */}
                {COMMON_CONDITIONS.filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 && (
                  <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1">Conditions</p>
                    {COMMON_CONDITIONS.filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase())).map((c) => (
                      <button
                        key={c}
                        onClick={() => handleConditionClick(c)}
                        className="w-full flex items-center gap-3 py-2.5 px-2 hover:bg-slate-50 rounded-xl transition text-left"
                      >
                        <Search className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="text-sm text-slate-700 font-semibold">{c}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Default popup — no query typed
              <div className="p-5 space-y-6">

                {/* AI search hint */}
                <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-800">Search the way you speak</p>
                    <p className="text-xs text-slate-400 mt-0.5">Luxury rehab center with pool</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <Search className="w-4 h-4 text-brand-blue" />
                  </div>
                </div>

                {/* Top Locations */}
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-3">Top Locations</p>
                  <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
                    {TOP_LOCATIONS.map((loc) => (
                      <button
                        key={loc.slug}
                        onClick={() => handleLocationClick(loc.slug)}
                        className="flex flex-col items-center gap-1.5 shrink-0"
                      >
                        <div className="w-20 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                          <img src={loc.image} alt={loc.label} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xs font-semibold text-slate-600">{loc.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Common Conditions */}
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-3">Common Conditions</p>
                  <div className="flex flex-wrap gap-2">
                    {COMMON_CONDITIONS.map((c) => (
                      <button
                        key={c}
                        onClick={() => handleConditionClick(c)}
                        className="px-3.5 py-1.5 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:border-brand-blue hover:text-brand-blue transition"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Surroundings */}
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-3">Surroundings</p>
                  <div className="flex flex-wrap gap-2">
                    {SURROUNDINGS.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSurroundingClick(s)}
                        className="px-3.5 py-1.5 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:border-brand-blue hover:text-brand-blue transition"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Patient Profiles */}
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-3">Clientele Specialties</p>
                  <div className="flex flex-wrap gap-2">
                    {PATIENT_PROFILES.map((p) => (
                      <button
                        key={p}
                        onClick={() => handleProfileClick(p)}
                        className="px-3.5 py-1.5 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:border-brand-blue hover:text-brand-blue transition"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        )}
      </div>

    </section>
  )
}