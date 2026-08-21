'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PhoneCall, Menu, X, ChevronDown } from 'lucide-react'

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

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMega, setActiveMega] = useState<string | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)

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
      className="top-0 z-50 relative w-full px-6 sm:px-12 lg:px-12 mt-2"

    >
      <div className="rounded-3xl" style={{ background: 'linear-gradient(to right, #f2e9d8, #f7f2e8, #f2e9d8)' }}>
        {/* ── Main bar ── */}
        <div className="px-6 lg:px-8 py-5 flex items-center justify-between gap-6">

          {/* Logo */}
          <div className='flex gap-4'>
            <Link href="/" className="shrink-0">
              <Image
                src="/images/homepage/recoverindia-logo.png"
                alt="RecoverIndia"
                width={220}
                height={60}
                priority
                className="h-14 w-auto object-contain"
              />
            </Link>

            <p className='text-[#8e8070] font-bold border-l-2 border-dotted border-[#8e8070] pl-4'>India’s Most<br />
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
            className="hidden sm:inline-flex items-center gap-2 font-extrabold text-xl hover:opacity-80 transition shrink-0"
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

          {/* Mobile trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-white/60 transition"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* ── MOBILE MENU ── */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden border-t border-white/10 px-6 py-5 space-y-4 max-h-[80vh] overflow-y-auto"
            style={{ backgroundColor: '#318bb0' }}
          >
            <Link href="/rehabs" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-semibold py-1">
              Locations
            </Link>

            <div>
              <p className="text-white font-semibold py-1 mb-2">Treatment</p>
              {[TREATMENT_MENU[0], TREATMENT_MENU[1], { category: 'Geriatric (Elderly)', items: TREATMENT_MENU[1].extra!.items }, TREATMENT_MENU[2]].map((group) => (
                <div key={group.category} className="ml-3 mb-4">
                  <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-2">{group.category}</p>
                  {group.items.map((item) => (
                    <Link
                      key={item}
                      href={`/rehabs?treatment=${slugify(item)}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm text-white/80 hover:text-white py-1"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <div>
              <p className="text-white font-semibold py-1 mb-2">Guide</p>
              {GUIDE_MENU.map((item) => (
                <Link key={item} href={`/blog?category=${slugify(item)}`} onClick={() => setIsMobileMenuOpen(false)} className="block text-sm text-white/80 hover:text-white py-1 ml-3">{item}</Link>
              ))}
            </div>

            <div>
              <p className="text-white font-semibold py-1 mb-2">Resources</p>
              {RESOURCES_MENU.map((item) => (
                <Link key={item} href={`/resources/${slugify(item)}`} onClick={() => setIsMobileMenuOpen(false)} className="block text-sm text-white/80 hover:text-white py-1 ml-3">{item}</Link>
              ))}
            </div>

            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block text-white font-semibold py-1">Blogs</Link>

            <div>
              <p className="text-white font-semibold py-1 mb-2">Contact</p>
              {CONTACT_MENU.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-sm text-white/80 hover:text-white py-1 ml-3">{item.label}</a>
              ))}
            </div>

            <a href="tel:18005699881" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/20 text-white font-bold text-sm">
              <PhoneCall className="w-4 h-4" /> 1800 569 9881
            </a>
          </div>
        )}
      </div>
    </header>
  )
}