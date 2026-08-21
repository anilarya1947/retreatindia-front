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

export default function ListingSection() {
    const searchParams = useSearchParams()

    const [centers, setCenters] = useState<RehabCenterCardData[]>([])
    const [totalCount, setTotalCount] = useState(0)
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)
    const [loading, setLoading] = useState(true)
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const [sortBy, setSortBy] = useState('Recommended First')

    const [selectedCities, setSelectedCities] = useState<string[]>(() => {
        const q = searchParams.get('q'); return q ? [q] : []
    })
    const [selectedTreatments, setSelectedTreatments] = useState<string[]>(() =>
        searchParams.getAll('treatment')
    )
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
        <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">

                {/* Active pills + sort */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left sidebar */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <Sidebar />
                    </aside>

                    {/* Listings */}
                    <main className="lg:col-span-6 space-y-0">
                        <p className="hidden lg:block text-sm font-semibold mb-6" style={{ color: '#318bb0' }}>
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
                    <aside className="lg:col-span-3 space-y-6">
                        {/* Doctor widget */}
                        <div className="bg-white border border-slate-200/60 rounded-[28px] p-6 shadow-sm flex flex-col items-center text-center">
                            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md bg-[#fcfaf7] mb-4">
                                <Image
                                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"
                                    alt="Dr. Sneha Sharma" fill unoptimized
                                    className="object-cover object-top"
                                />
                            </div>
                            <h4 className="font-bold text-sm mb-0.5" style={{ color: '#318bb0' }}>Dr. Sneha Sharma</h4>
                            <p className="text-[11px] text-slate-400 mb-4">Lead Psychiatrist</p>
                            <p className="text-sm font-serif text-slate-700 leading-snug mb-4 px-1">
                                Your rehab stay duration is carefully evaluated by{' '}
                                <span style={{ color: '#318bb0' }}>RecoverIndia.Org</span>
                            </p>
                            <div className="w-full bg-slate-50 rounded-xl p-3 mb-4 text-left space-y-1">
                                {['right care', 'right duration', 'right cost'].map((l) => (
                                    <div key={l} className="flex items-center gap-2 text-xs font-bold" style={{ color: '#3bb89b' }}>
                                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                                        <span>{l}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-3 text-white font-bold text-xs tracking-wider uppercase rounded-full" style={{ backgroundColor: '#318bb0' }}>
                                BOOK YOUR EVALUATION
                            </button>
                        </div>

                        {/* Why RecoverIndia */}
                        <div className="bg-[#f8f6f2] border border-slate-100 rounded-[28px] p-6 shadow-sm">
                            <div className="flex justify-center mb-3">
                                <svg viewBox="0 0 100 100" className="w-10 h-10">
                                    <g fillOpacity="0.85">
                                        <path d="M50,50 C50,30 35,15 35,30 C35,45 50,50 50,50 Z" fill="#14b8a6" />
                                        <path d="M50,50 C50,30 65,15 65,30 C65,45 50,50 50,50 Z" fill="#2ccfa3" />
                                        <path d="M50,50 C70,50 85,35 70,35 C55,35 50,50 50,50 Z" fill="#0d9488" />
                                        <path d="M50,50 C70,50 85,65 70,65 C55,65 50,50 50,50 Z" fill="#14b8a6" />
                                        <path d="M50,50 C50,70 65,85 65,70 C65,55 50,50 50,50 Z" fill="#22c55e" />
                                        <path d="M50,50 C50,70 35,85 35,70 C35,55 50,50 50,50 Z" fill="#10b981" />
                                    </g>
                                </svg>
                            </div>
                            <h4 className="text-center text-base font-serif text-slate-800 mb-4">
                                Why <span style={{ color: '#318bb0' }}>RecoverIndia.Org</span>
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
                                    <li key={label} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                        <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#3bb89b' }}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        <span>{label} <span style={{ color: '#318bb0' }}>{highlight}</span></span>
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