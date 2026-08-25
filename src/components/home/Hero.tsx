'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Search, MapPin, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const TOP_LOCATIONS = [
  { label: 'New Delhi', slug: 'new-delhis', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=200&q=80' },
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

  const SearchBarForm = ({ isMobile }: { isMobile: boolean }) => (
    <div className={isMobile ? "w-full max-w-xl px-3 mt-4 mx-auto relative z-30 block md:hidden" : "absolute top-6 sm:top-10 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4 hidden md:block"}>
      <form onSubmit={handleSearch}>
        <div className={`relative flex items-center bg-white shadow-xl border border-slate-200 ${isPopupOpen ? 'rounded-t-2xl rounded-b-none border-b-0' : 'rounded-full'} transition-all`}>
          <Search className="w-5 h-5 text-slate-400 absolute left-5 pointer-events-none" />
          <input
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
        <div className="bg-white border border-slate-200 border-t-0 rounded-b-2xl shadow-2xl max-h-[70vh] overflow-y-auto absolute left-4 right-4 z-50">
          {searchQuery ? (
            <div className="p-4 space-y-4">
              <button
                onClick={() => handleConditionClick(searchQuery)}
                className="w-full flex items-center gap-3 p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition text-left"
              >
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4 text-brand-blue" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{searchQuery}</span>
              </button>

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
            <div className="p-5 space-y-6">
              <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-800">Search the way you speak</p>
                  <p className="text-xs text-slate-400 mt-0.5">Luxury rehab center with pool</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                  <Search className="w-4 h-4 text-brand-blue" />
                </div>
              </div>

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
  )

  return (
    <section className="relative w-full mt-3" ref={popupRef}>

      {/* Desktop Banner */}
      <div className="hidden md:block relative w-full px-6 sm:px-12 lg:px-12">
        <div className="relative w-full rounded-lg md:rounded-3xl overflow-hidden shadow-lg">
          <img
            src="/images/homepage/banner.png"
            alt="RecoverIndia Banner"
            className="object-cover object-center h-full w-full"
          />
          {/* Desktop Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-16 text-left z-20">
            <h1 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight max-w-[55%]">
              Explore curated <span className="font-serif italic text-[#f7e6c4]">rehabs</span><br />
              for addiction & mental<br />
              wellness recovery
            </h1>
            <p className="text-sm lg:text-base font-bold text-white/90 mt-3 mb-6 tracking-wide">
              Guided • Holistic • Reliable
            </p>
            <button
              onClick={() => router.push('/rehabs')}
              className="bg-[#318bb0] hover:bg-[#27708e] active:scale-95 text-white text-xs lg:text-sm font-extrabold uppercase rounded-full px-7 py-3 w-fit shadow-lg transition-all cursor-pointer"
            >
              FIND NEAR YOU
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Banner */}
      <div className="block md:hidden px-3">
        <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-md">
          <Image
            src="/images/homepage/banner.png"
            alt="RecoverIndia Banner"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Mobile Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 text-left z-20">
            <h1 className="text-[1.375rem] xs:text-[1.625rem] font-bold text-white leading-tight max-w-[62%]">
              Explore curated <span className="font-serif italic text-[#f7e6c4]">rehabs</span> for addiction & mental wellness recovery
            </h1>
            <p className="text-[10px] xs:text-[11px] font-semibold text-white/90 mt-2 mb-4 tracking-wide">
              Guided • Holistic • Reliable
            </p>
            <button
              onClick={() => router.push('/rehabs')}
              className="bg-[#318bb0] hover:bg-[#27708e] active:scale-95 text-white text-[10px] xs:text-[11px] font-extrabold uppercase rounded-full px-5 py-2.5 w-fit shadow-md transition-all cursor-pointer"
            >
              FIND NEAR YOU
            </button>
          </div>
        </div>

        {/* Mobile Info Bar */}
        <div className="mt-3 bg-[#318bb0] rounded-[1.5rem] py-3.5 px-4 flex items-center justify-between gap-1.5 text-white shadow-sm">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.4 4.5L17.8 3.9L18.4 7.3L21.5 8.7L20.3 12L21.5 15.3L18.4 16.7L17.8 20.1L14.4 19.5L12 22L9.6 19.5L6.2 20.1L5.6 16.7L2.5 15.3L3.7 12L2.5 8.7L5.6 7.3L6.2 3.9L9.6 4.5L12 2Z" fill="#5ce1c9" />
              <path d="M8.5 12L11 14.5L16 9.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[9px] xs:text-[10.5px] font-bold leading-none">Trusted pricing for every stay</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.4 4.5L17.8 3.9L18.4 7.3L21.5 8.7L20.3 12L21.5 15.3L18.4 16.7L17.8 20.1L14.4 19.5L12 22L9.6 19.5L6.2 20.1L5.6 16.7L2.5 15.3L3.7 12L2.5 8.7L5.6 7.3L6.2 3.9L9.6 4.5L12 2Z" fill="#5ce1c9" />
              <path d="M8.5 12L11 14.5L16 9.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[9px] xs:text-[10.5px] font-bold leading-none">Flexible admissions & cancellations</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <SearchBarForm isMobile={false} />
      <SearchBarForm isMobile={true} />

    </section>
  )
}