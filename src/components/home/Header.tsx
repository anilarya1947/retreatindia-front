'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PhoneCall, Menu, X, ChevronDown, Phone } from 'lucide-react'

const TREATMENT_MENU = [
  {
    category: 'Adults',
    items: [
      'Alcohol Addiction', 'Drug Addiction', 'Prescription Drug Dependency',
      'Smoking/Tobacco Addiction', 'Depression', 'Anxiety Disorders',
      'Bipolar Disorder', 'PTSD (Trauma-Related Issues)', 'Schizophrenia',
      'Severe Stress or Burnout', 'OCD (Obsessive Compulsive)',
      'Sex Addiction', 'Pornography Addiction',
    ],
  },
  {
    category: 'Child & Adolescents',
    items: [
      'ADHD', 'Autism Spectrum Disorders', 'Behavioral Issues',
      'Learning Disabilities', 'Teen Substance Abuse',
    ],
    extra: {
      category: 'Geriatric (Elderly)',
      items: [
        "Dementia / Alzheimer's", 'Post-Stroke Recovery',
        'Mobility Loss', 'Chronic Illnesses',
      ],
    },
  },
  {
    category: 'Others',
    items: [
      'Internet & Gaming Addiction', 'Porn Addiction', 'Eating Disorders',
      'Luxury Wellness Rehab', 'Corporate Burnout Programs', 'Suicidality/Self Harm',
    ],
  },
]

const GUIDE_MENU = [
  'What is Addiction?', 'Signs You Need Rehab',
  'How to Choose the Right Rehab Center', 'Questions to Ask Before Admission',
  'Rehab Success Rates', 'Stages of Recovery',
  'Detox Process Explained', 'Anxiety Management Techniques',
]

const RESOURCES_MENU = [
  'Addiction Self-Assessment Test', 'Stress Level Calculator',
  'Depression Test', 'Anxiety Test', 'Tele Manas Helpline',
]

const CONTACT_MENU = [
  { label: 'Reach Out', href: '/contact' },
  { label: 'Youtube', href: 'https://youtube.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Whatsapp', href: 'https://wa.me/18005699881' },
  { label: 'Facebook', href: 'https://facebook.com' },
]

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

type NavItem = {
  key: string
  label: string
  href?: string
}

const NAV_ITEMS: NavItem[] = [
  { key: 'locations', label: 'Locations', href: '/rehabs' },
  { key: 'treatment', label: 'Treatment' },
  { key: 'guide', label: 'Guide' },
  { key: 'resources', label: 'Resources' },
  { key: 'blogs', label: 'Blogs', href: '/blog' },
  { key: 'contact', label: 'Contact' },
]

const MOBILE_MENU_ITEMS = [
  {
    label: 'Locations',
    href: '/rehabs',
  },
  {
    label: 'Treatment',
    items: [
      { label: 'Adults', isHeader: true },
      ...TREATMENT_MENU[0].items.map(item => ({ label: item, href: `/rehabs?treatment=${slugify(item)}` })),
      { label: 'Child & Adolescents', isHeader: true },
      ...TREATMENT_MENU[1].items.map(item => ({ label: item, href: `/rehabs?treatment=${slugify(item)}` })),
      { label: 'Geriatric (Elderly)', isHeader: true },
      ...TREATMENT_MENU[1].extra!.items.map(item => ({ label: item, href: `/rehabs?treatment=${slugify(item)}` })),
      { label: 'Others', isHeader: true },
      ...TREATMENT_MENU[2].items.map(item => ({ label: item, href: `/rehabs?treatment=${slugify(item)}` })),
    ]
  },
  {
    label: 'Guide',
    items: GUIDE_MENU.map(item => ({ label: item, href: `/blog?category=${slugify(item)}` }))
  },
  {
    label: 'Resources',
    items: RESOURCES_MENU.map(item => ({ label: item, href: `/resources/${slugify(item)}` }))
  },
  {
    label: 'Blogs',
    href: '/blog',
  },
  {
    label: 'Contact',
    items: CONTACT_MENU.map(item => ({ label: item.label, href: item.href }))
  }
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMega(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleMega = (name: string) =>
    setActiveMega((prev) => (prev === name ? null : name))

  return (
    <header
      ref={headerRef}
      className="top-0 z-50 relative w-full px-2 md:px-8 mt-2  md:mt-2"

    >
      <div className="rounded-2xl md:rounded-3xl" style={{ background: 'linear-gradient(to right, #f2e9d8, #f7f2e8, #f2e9d8)' }}>
        {/* ── Main bar ── */}
        <div className="px-3 md:px-8 py-4 md:py-5 flex items-center justify-between gap-6">

          {/* Logo */}
          <div className='flex gap-4 items-center'>
            <Link href="/" className="shrink-0">
              <Image
                src="/images/homepage/recoverindia-logo.png"
                alt="RecoverIndia"
                width={220}
                height={60}
                priority
                className="h-10 md:h-14 w-auto object-contain"
              />
            </Link>

            <p className='hidden md:block text-[#8e8070] font-bold border-l-2 border-dotted border-[#8e8070] pl-4'>India’s Most<br />
              Exclusive Luxury<br />
              Rehab Network</p>
          </div>

          {/* Desktop Nav — wrapper for positioning mega menu */}
          <div className="hidden md:flex items-center gap-1 relative" ref={navRef}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeMega === item.key
              const hasDropdown = !item.href

              if (item.href) {
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="px-4 py-2 rounded-full text-base font-bold transition-colors"
                    style={{ color: '#8e8070' }}
                  >
                    {item.label}
                  </Link>
                )
              }

              return (
                <button
                  key={item.key}
                  onClick={() => toggleMega(item.key)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-t-xl rounded-tr-xl text-base font-bold transition-colors"
                  style={{
                    backgroundColor: isActive ? '#318bb0' : 'transparent',
                    color: isActive ? '#ffffff' : '#8e8070',
                  }}
                >
                  {item.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`}
                  />
                </button>
              )
            })}

            {/* ── TREATMENT MEGA MENU — positioned under nav ── */}
            {activeMega === 'treatment' && (
              <div
                className="absolute top-full left-0 z-50 rounded-2xl shadow-2xl overflow-hidden"
                style={{ backgroundColor: '#318bb0', minWidth: '720px' }}
              >
                <div className="p-8 grid grid-cols-3 gap-10">
                  {/* Col 1 — Adults */}
                  <div>
                    <h4 className="text-xs font-black text-white/60 uppercase tracking-widest mb-4">
                      Adults
                    </h4>
                    <ul className="space-y-2">
                      {TREATMENT_MENU[0].items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`/rehabs?treatment=${slugify(item)}`}
                            onClick={() => setActiveMega(null)}
                            className="text-sm text-white hover:text-white/70 transition"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Col 2 — Child & Adolescents + Geriatric */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-black text-white/60 uppercase tracking-widest mb-4">
                        Child & Adolescents
                      </h4>
                      <ul className="space-y-2">
                        {TREATMENT_MENU[1].items.map((item) => (
                          <li key={item}>
                            <Link
                              href={`/rehabs?treatment=${slugify(item)}`}
                              onClick={() => setActiveMega(null)}
                              className="text-sm text-white hover:text-white/70 transition"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white/60 uppercase tracking-widest mb-4">
                        Geriatric (Elderly)
                      </h4>
                      <ul className="space-y-2">
                        {TREATMENT_MENU[1].extra!.items.map((item) => (
                          <li key={item}>
                            <Link
                              href={`/rehabs?treatment=${slugify(item)}`}
                              onClick={() => setActiveMega(null)}
                              className="text-sm text-white hover:text-white/70 transition"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Col 3 — Others */}
                  <div>
                    <h4 className="text-xs font-black text-white/60 uppercase tracking-widest mb-4">
                      Others
                    </h4>
                    <ul className="space-y-2">
                      {TREATMENT_MENU[2].items.map((item) => (
                        <li key={item}>
                          <Link
                            href={`/rehabs?treatment=${slugify(item)}`}
                            onClick={() => setActiveMega(null)}
                            className="text-sm text-white hover:text-white/70 transition"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ── GUIDE DROPDOWN ── */}
            {activeMega === 'guide' && (
              <div
                className="absolute top-full z-50 rounded-b-2xl rounded-2xl shadow-2xl"
                style={{ backgroundColor: '#318bb0', minWidth: '260px', left: '50%', transform: 'translateX(-50%)' }}
              >
                <div className="p-6">
                  <h4 className="text-[11px] font-black text-white/60 uppercase tracking-widest mb-4">Guide</h4>
                  <ul className="space-y-2.5">
                    {GUIDE_MENU.map((item) => (
                      <li key={item}>
                        <Link
                          href={`/blog?category=${slugify(item)}`}
                          onClick={() => setActiveMega(null)}
                          className="text-sm text-white hover:text-white/70 transition block"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* ── RESOURCES DROPDOWN ── */}
            {activeMega === 'resources' && (
              <div
                className="absolute top-full z-50 rounded-b-2xl rounded-tr-2xl shadow-2xl"
                style={{ backgroundColor: '#318bb0', minWidth: '240px', left: '50%', transform: 'translateX(-50%)' }}
              >
                <div className="p-6">
                  <h4 className="text-[11px] font-black text-white/60 uppercase tracking-widest mb-4">Resources</h4>
                  <ul className="space-y-2.5">
                    {RESOURCES_MENU.map((item) => (
                      <li key={item}>
                        <Link
                          href={`/resources/${slugify(item)}`}
                          onClick={() => setActiveMega(null)}
                          className="text-sm text-white hover:text-white/70 transition block"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* ── CONTACT DROPDOWN ── */}
            {activeMega === 'contact' && (
              <div
                className="absolute top-full right-0 z-50 rounded-b-2xl rounded-tl-2xl shadow-2xl"
                style={{ backgroundColor: '#318bb0', minWidth: '200px' }}
              >
                <div className="p-6">
                  <h4 className="text-[11px] font-black text-white/60 uppercase tracking-widest mb-4">Contact</h4>
                  <ul className="space-y-2.5">
                    {CONTACT_MENU.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          onClick={() => setActiveMega(null)}
                          className="text-sm text-white hover:text-white/70 transition block"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Phone */}
          <a
            href="tel:18005699881"
            className="hidden md:inline-flex items-center gap-2 font-extrabold text-xl hover:opacity-80 transition shrink-0"
            style={{ color: '#318bb0' }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#55bead' }}
            >
              <PhoneCall className="w-4 h-4 text-white fill-white" />
            </div>
            1800 569 9881
          </a>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            {/* Phone Button */}
            <a
              href="tel:18005699881"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#38bfa7] hover:bg-[#30b098] transition shadow-sm shrink-0"
            >
              <Phone className="w-5 h-5 text-white" strokeWidth={1.5} fill="white" />
            </a>

            {/* Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#38bfa7] hover:bg-[#30b098] text-white transition shadow-sm shrink-0"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-5 h-5 text-white" strokeWidth={1.5} fill="white" />
              )}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <div
              className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Drawer Panel */}
            <div className="fixed top-0 right-0 bottom-0 z-[100] bg-white flex flex-col w-[90%] h-full shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right duration-300">
              {/* Mobile Menu Header */}
              <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src="/images/homepage/recoverindia-logo.png"
                    alt="RecoverIndia"
                    width={180}
                    height={50}
                    priority
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-12 h-12 rounded-xl bg-[#5cbcd6] flex items-center justify-center text-white hover:opacity-90 transition shadow-sm"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 stroke-[2.5]" />
                </button>
              </div>

              {/* Mobile Scroll Area */}
              <div className="flex-1 overflow-y-auto flex flex-col justify-between">
                {/* Menu items */}
                <div className="divide-y divide-slate-100">
                  {MOBILE_MENU_ITEMS.map((item) => {
                    const hasSubmenu = !!item.items;
                    const isSubOpen = openSubmenu === item.label;

                    if (!hasSubmenu) {
                      return (
                        <Link
                          key={item.label}
                          href={item.href || '#'}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="w-full px-6 py-4 flex items-center justify-between text-[#0a526b] font-bold text-sm tracking-wider hover:bg-slate-50 transition"
                        >
                          {item.label}
                        </Link>
                      );
                    }

                    return (
                      <div key={item.label} className="w-full flex flex-col">
                        <button
                          onClick={() => setOpenSubmenu(isSubOpen ? null : item.label)}
                          className="w-full px-6 py-4 flex items-center justify-between text-[#0a526b] font-bold text-sm tracking-wider hover:bg-slate-50 transition"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#0a526b] transition-transform duration-200 ${isSubOpen ? 'rotate-180' : ''
                              }`}
                          />
                        </button>

                        <div
                          className={`grid transition-all duration-300 ease-in-out bg-slate-50/50 ${isSubOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                            }`}
                        >
                          <div className="overflow-hidden flex flex-col pl-4 pr-6 bg-slate-50/30">
                            {item.items?.map((sub, sIdx) => {
                              if ('isHeader' in sub && sub.isHeader) {
                                return (
                                  <div
                                    key={sIdx}
                                    className="px-6 pt-5 pb-2 text-[10px] font-black text-[#0a526b]/60 uppercase tracking-widest border-b border-slate-100/40"
                                  >
                                    {sub.label}
                                  </div>
                                );
                              }
                              return (
                                <Link
                                  key={sIdx}
                                  href={sub.href || '#'}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="px-6 py-3.5 text-xs sm:text-sm text-[#4b5563] font-medium hover:text-[#0a526b] transition border-b border-slate-100/40 last:border-b-0"
                                >
                                  {sub.label}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Testimonial Block */}
                <div className="p-6 border-t border-slate-100 bg-[#fafafa] mt-6">
                  <div className="relative border border-slate-100 rounded-2xl p-4 bg-white flex gap-4 items-center shadow-sm">
                    {/* Quote icon */}
                    <span className="absolute top-2 right-4 text-4xl font-serif text-slate-200 leading-none select-none">”</span>

                    {/* Doctor image container */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-slate-100">
                      <img
                        src="/images/homepage/sneha-oval.png"
                        alt="Dr. Sneha Sharma"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Testimonial Quote details */}
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="text-sm sm:text-xs text-[#0a526b] italic mb-1 font-serif leading-tight">
                        &ldquo;Just like the Gym is for your body, Therapy is for your Mind&rdquo;
                      </p>
                      <p className="text-sm sm:text-[11px] text-slate-800 font-bold leading-tight">
                        Dr. Sneha Sharma
                      </p>
                      <p className="text-sm sm:text-[10px] text-slate-400 font-medium">
                        Psychiatrist, Anvaya Healthcare
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}