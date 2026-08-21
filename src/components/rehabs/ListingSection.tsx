'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, ChevronDown, Filter, X } from 'lucide-react'
import RehabCard, { RehabCenterCardData } from '@/components/rehabs/RehabCard'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface Treatment { id: number; name: string; slug: string; category: string }

interface FilterOptions {
  treatments: Treatment[]
  cities: string[]
  surroundings: string[]
  genders: string[]
  price_ranges: string[]
  categories: string[]
  languages: string[]
  patient_profiles: string[]
}

const SURROUNDING_LABEL: Record<string, string> = {
  mountains: 'Mountains', beach: 'Beach', farm: 'Farm/Garden',
  forest: 'Forest', city: 'City', lake: 'Lake/Riverside',
}
const GENDER_LABEL: Record<string, string> = {
  men: 'Men', women: 'Women', both: 'Men and Women',
}
const CATEGORY_LABEL: Record<string, string> = {
  'luxury-wellness': 'Luxury Wellness Retreat',
  'luxury-clinical': 'Luxury Clinical Rehab',
  'budget-clinical': 'Budget Clinical Rehab',
}
const TREATMENT_CATEGORY_ORDER = ['adults', 'child', 'geriatric', 'others']
const TREATMENT_CATEGORY_LABEL: Record<string, string> = {
  adults: 'Adults', child: 'Child & Adolescents',
  geriatric: 'Geriatric (Elderly)', others: 'Others',
}

// Top cities shown first before "All Locations"
const TOP_CITIES = ['Delhi', 'Mumbai', 'Kolkata', 'Bangalore', 'Chennai', 'Hyderabad']

export default function ListingSection({
  defaultCity = '',
  defaultTreatment = '',
}: {
  defaultCity?: string
  defaultTreatment?: string
} = {}) {
  const searchParams = useSearchParams()

  const [centers, setCenters] = useState<RehabCenterCardData[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)
  const [loading, setLoading] = useState(true)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('Recommended First')

  const [selectedCities, setSelectedCities] = useState<string[]>(() => {
    const q = searchParams.get('q')
    return q ? [q] : defaultCity ? [defaultCity] : []
  })

  const [selectedTreatments, setSelectedTreatments] = useState<string[]>(() => {
    const t = searchParams.getAll('treatment')
    return t.length > 0 ? t : defaultTreatment ? [defaultTreatment] : []
  })
  const [selectedSurroundings, setSelectedSurroundings] = useState<string[]>([])
  const [selectedGenders, setSelectedGenders] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    fetch(`${API_URL}/api/filters/`)
      .then((r) => r.json())
      .then(setFilterOptions)
      .catch(console.error)
  }, [])

  const fetchListings = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCities.length > 0) params.set('q', selectedCities[0])
      selectedTreatments.forEach((s) => params.append('treatment', s))
      if (selectedSurroundings.length > 0) params.set('surrounding', selectedSurroundings[0])
      if (selectedGenders.length > 0) params.set('gender', selectedGenders[0])
      if (selectedPrices.length > 0) params.set('price', selectedPrices[0])
      if (selectedCategories.length > 0) params.set('category', selectedCategories[0])
      if (sortBy === 'Price: Low to High') params.set('ordering', 'price_range')
      if (sortBy === 'Price: High to Low') params.set('ordering', '-price_range')
      if (sortBy === 'Newest First') params.set('ordering', '-created_at')
      const res = await fetch(`${API_URL}/api/listings/?${params}`)
      const data = await res.json()
      setCenters(data.results || [])
      setTotalCount(data.count || 0)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }, [selectedCities, selectedTreatments, selectedSurroundings, selectedGenders, selectedPrices, selectedCategories, sortBy])

  useEffect(() => { fetchListings() }, [fetchListings])

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>, val: string) =>
    setter((prev) => prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val])

  const handleClearAll = () => {
    setSelectedCities([]); setSelectedTreatments([])
    setSelectedSurroundings([]); setSelectedGenders([])
    setSelectedPrices([]); setSelectedCategories([])
  }

  const hasActiveFilters = selectedCities.length > 0 || selectedTreatments.length > 0 ||
    selectedSurroundings.length > 0 || selectedGenders.length > 0 ||
    selectedPrices.length > 0 || selectedCategories.length > 0

  const treatmentsByCategory = (filterOptions?.treatments || []).reduce((acc, t) => {
    const cat = t.category || 'others'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(t)
    return acc
  }, {} as Record<string, Treatment[]>)

  // Split cities into top + rest
  const allCities = filterOptions?.cities || []
  const topCities = allCities.filter((c) => TOP_CITIES.includes(c))
  const otherCities = allCities.filter((c) => !TOP_CITIES.includes(c))

  const Sidebar = () => (
    <div className="space-y-5">
      {/* Location */}
      {allCities.length > 0 && (
        <>
          <div className="space-y-2">
            <h5 className="text-xs font-black text-slate-400 tracking-wider uppercase">Location</h5>
            <ul className="space-y-2">
              {topCities.map((city) => (
                <CheckItem key={city} label={city} checked={selectedCities.includes(city)} onChange={() => toggle(setSelectedCities, city)} />
              ))}
              {otherCities.length > 0 && (
                <>
                  <li className="text-[10px] font-black text-slate-300 uppercase tracking-widest pt-1">All Locations</li>
                  {otherCities.map((city) => (
                    <CheckItem key={city} label={city} checked={selectedCities.includes(city)} onChange={() => toggle(setSelectedCities, city)} />
                  ))}
                </>
              )}
            </ul>
          </div>
          <hr className="border-slate-100" />
        </>
      )}

      {/* Treatment */}
      {Object.keys(treatmentsByCategory).length > 0 && (
        <>
          <div className="space-y-3">
            <h5 className="text-xs font-black text-slate-400 tracking-wider uppercase">Treatment</h5>
            {TREATMENT_CATEGORY_ORDER.filter((cat) => treatmentsByCategory[cat]?.length > 0).map((cat) => (
              <div key={cat}>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{TREATMENT_CATEGORY_LABEL[cat]}</p>
                <ul className="space-y-2">
                  {treatmentsByCategory[cat].map((t) => (
                    <CheckItem key={t.id} label={t.name} checked={selectedTreatments.includes(t.slug)} onChange={() => toggle(setSelectedTreatments, t.slug)} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <hr className="border-slate-100" />
        </>
      )}

      {/* Surroundings */}
      {(filterOptions?.surroundings || []).length > 0 && (
        <>
          <div className="space-y-2">
            <h5 className="text-xs font-black text-slate-400 tracking-wider uppercase">Surroundings</h5>
            <ul className="space-y-2">
              {(filterOptions?.surroundings || []).map((s) => {
                const label = SURROUNDING_LABEL[s] || s
                return <CheckItem key={s} label={label} checked={selectedSurroundings.includes(label)} onChange={() => toggle(setSelectedSurroundings, label)} />
              })}
            </ul>
          </div>
          <hr className="border-slate-100" />
        </>
      )}

      {/* Amenities — from filter options patient profiles for now */}
      {(filterOptions?.patient_profiles || []).length > 0 && (
        <>
          <div className="space-y-2">
            <h5 className="text-xs font-black text-slate-400 tracking-wider uppercase">Patient Profile</h5>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {(filterOptions?.patient_profiles || []).map((p) => (
                <CheckItem key={p} label={p} checked={false} onChange={() => { }} />
              ))}
            </ul>
          </div>
          <hr className="border-slate-100" />
        </>
      )}

      {/* Price */}
      {(filterOptions?.price_ranges || []).length > 0 && (
        <div className="space-y-2">
          <h5 className="text-xs font-black text-slate-400 tracking-wider uppercase">Price Range</h5>
          <ul className="space-y-2">
            {(filterOptions?.price_ranges || []).map((p) => (
              <CheckItem key={p} label={p} checked={selectedPrices.includes(p)} onChange={() => toggle(setSelectedPrices, p)} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 pb-16">
      <div className="">

        {/* Active pills + sort */}


        {/* Mobile filter button */}
        <div className="flex lg:hidden items-center justify-between mb-5">
          <p className="text-sm font-semibold" style={{ color: '#318bb0' }}>
            Showing <span className="font-extrabold">{totalCount}</span> Rehabs & Retreats
          </p>
          <button onClick={() => setIsMobileFilterOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-sm">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
        </div>

        {/* Main grid */}

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-8">

          {/* Left sidebar */}
          <aside className="hidden lg:block  border border-slate-200 rounded-3xl px-6 py-8">
            <Sidebar />
          </aside>

          {/* Listings */}
          <main className="space-y-0">

            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-2 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2">
                {selectedCities.map((v) => <FilterPill key={v} label={v} onRemove={() => toggle(setSelectedCities, v)} />)}
                {selectedTreatments.map((slug) => {
                  const t = filterOptions?.treatments.find((tr) => tr.slug === slug)
                  return <FilterPill key={slug} label={t?.name || slug} onRemove={() => toggle(setSelectedTreatments, slug)} />
                })}
                {selectedSurroundings.map((v) => <FilterPill key={v} label={v} onRemove={() => toggle(setSelectedSurroundings, v)} />)}
                {hasActiveFilters && (
                  <button onClick={handleClearAll} className="text-xs font-semibold text-slate-400 hover:text-slate-600 underline">
                    Clear All
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400 font-semibold hidden sm:inline">Sort:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-full text-xs font-semibold text-slate-700 focus:outline-none"
                  >
                    <option>Recommended First</option>
                    <option>Newest First</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>


            <p className="hidden lg:block text-base font-bold mb-4" style={{ color: '#318bb0' }}>
              Showing <span className="font-extrabold">{totalCount}</span> Rehabs & Retreats
            </p>

            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border-b border-slate-100 pb-8 mb-2 animate-pulse">
                  <div className="grid grid-cols-12 gap-2 mb-4 h-48">
                    <div className="col-span-7 bg-slate-200 rounded-2xl" />
                    <div className="col-span-5 flex flex-col gap-2">
                      <div className="flex-1 bg-slate-200 rounded-2xl" />
                      <div className="flex-1 bg-slate-200 rounded-2xl" />
                    </div>
                  </div>
                  <div className="h-4 bg-slate-200 rounded w-1/4 mb-2" />
                  <div className="h-6 bg-slate-200 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-full" />
                </div>
              ))
            ) : centers.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-lg font-semibold">No centers found</p>
                {hasActiveFilters && (
                  <button onClick={handleClearAll} className="mt-4 px-6 py-2 text-white text-sm font-bold rounded-full" style={{ backgroundColor: '#318bb0' }}>
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              centers.map((center) => (
                <RehabCard key={center.id} center={center} />
              ))
            )}
          </main>

          {/* Right sidebar */}
          <aside className="space-y-6">
            {/* Doctor widget */}
            <div className="bg-[#f7f7f7] border border-slate-200/60 rounded-4xl p-6  flex flex-col items-center text-center">
              <div className="relative w-50 h-60  mb-4">
                <Image
                  src="/images/homepage/sneha-oval.png"
                  alt="Dr. Sneha Sharma" fill unoptimized
                  className="object-contain object-top"
                />
              </div>
              <h4 className="font-bold text-xl" style={{ color: '#318bb0' }}>Dr. Sneha Sharma</h4>
              <p className="text-base text-[#777] mb-4">Lead Psychiatrist</p>
              <p className="text-3xl font-serif text-[#318bb0] leading-none mb-4 px-1">
                Your rehab<br /> stay duration<br /> is carefully<br /> evaluated by{' '}
                <span style={{ color: '#35c08d' }}>RecoverIndia.Org</span>
              </p>
              <div className="flex w-full items-center lg:items-start gap-4 lg:gap-6 shrink-0 mt-8 mb-8">
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center text-teal-400">
                  <img src="images/homepage/green-tick.png" alt="" />
                </div>
                <div className="flex flex-col text-xs sm:text-lg font-bold leading-tight text-left lowercase tracking-wider">
                  <span className="text-[#3bb89b]">right care</span>
                  <span className="text-[#5db8cd]">right duration</span>
                  <span className="text-[#318bb0]">right cost</span>
                </div>
              </div>



              <button className="w-full py-4 text-white font-medium text-base tracking-wider uppercase rounded-full" style={{ backgroundColor: '#lrs;0;[143]' }}>
                BOOK YOUR EVALUATION
              </button>
            </div>

            {/* Why RecoverIndia */}
            <div className="bg-[#FBF8F3] border border-slate-100 rounded-4xl p-6">
              <div className="flex justify-center mb-3">
                <img src="/images/homepage/why-bg-logo.png" alt="" />
              </div>
              <h4 className="text-center text-2xl font-serif text-slate-800 mb-4">
                Why <span style={{ color: '#009ea8' }}>RecoverIndia.Org</span>
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'Curated &', highlight: 'Verified Listings' },
                  { label: 'Transparent', highlight: 'Guidance' },
                  { label: 'No Forced', highlight: 'Referrals' },
                  { label: 'Optimum', highlight: 'Stay Planning' },
                  { label: 'Expert-Assisted', highlight: 'Discovery' },
                  { label: 'Privacy', highlight: 'Focused' },
                ].map(({ label, highlight }) => (
                  <li key={label} className="flex items-center gap-2 text-base font-semibold text-slate-600">
                    <span>
                      <img src="/images/homepage/star-tick.png" alt="" className='w-6 h-6' />
                    </span>
                    <span style={{ color: '#318bb0' }}>{label} <span style={{ color: '#666666' }}>{highlight}</span></span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm">
          <div className="w-[85%] max-w-sm h-full bg-white p-6 shadow-2xl overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <span className="font-extrabold text-sm uppercase tracking-wider" style={{ color: '#318bb0' }}>Filters</span>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <Sidebar />
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 grid grid-cols-2 gap-4">
              <button onClick={handleClearAll} className="py-3 bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-full">Reset</button>
              <button onClick={() => setIsMobileFilterOpen(false)} className="py-3 text-white font-bold text-xs uppercase tracking-wider rounded-full" style={{ backgroundColor: '#318bb0' }}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span onClick={onRemove} className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-semibold rounded-full cursor-pointer hover:border-slate-400 transition select-none">
      {label} <X className="w-3 h-3" />
    </span>
  )
}

function CheckItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <li className="flex items-center gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-slate-300 cursor-pointer"
        style={{ accentColor: '#3bb89b' }}
      />
      <label
        onClick={onChange}
        className={`text-sm cursor-pointer select-none transition ${checked ? 'font-semibold' : 'text-slate-600'}`}
        style={checked ? { color: '#318bb0' } : {}}
      >
        {label}
      </label>
    </li>
  )
}