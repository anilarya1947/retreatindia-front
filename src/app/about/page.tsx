import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'
import HeaderBanner from '@/components/rehabs/HeaderBanner'
import {
  Hand,
  HeartPulse,
  MapPin,
  Flower2,
  CheckCircle2,
} from 'lucide-react'

export default function AboutPage() {
  const whoWeAreFeatures = [
    {
      title: 'Curated & Verified Listings',
      desc: 'Discover rehabilitation centres through thoughtfully curated listings designed to make your search more focused and informative.',
    },
    { title: 'Transparent Guidance', desc: '' },
    { title: 'Personalized Discovery', desc: '' },
    { title: 'Optimum Stay Planning', desc: '' },
    { title: 'Privacy Focused', desc: '' },
    { title: 'Expert-Assisted Discovery', desc: '' },
  ]

  const offerCards = [
    {
      num: '01',
      icon: '/images/homepage/hand.png',
      title: 'Curated Rehab Discovery',
      desc: 'Explore rehabilitation and recovery centres across India based on location, treatment requirements, budget, surroundings, and lifestyle preferences.',
      variant: 'light',
    },
    {
      num: '02',
      icon: '/images/homepage/heart.png',
      title: 'Treatment-Based Discovery',
      desc: 'Find centres offering support for addiction recovery, mental wellness, emotional wellbeing, behavioural concerns, burnout, and other recovery needs.',
      variant: 'light',
    },
    {
      num: '03',
      icon: '/images/homepage/loc.png',
      title: 'Location-Based Search',
      desc: 'Discover rehabilitation centres in major cities, peaceful retreats, nature-based destinations, and other recovery-friendly locations across India.',
      variant: 'light',
    },
    {
      num: '04',
      icon: '/images/homepage/whiteflower.png',
      title: 'Recovery Environment Discovery',
      desc: 'Explore different surroundings and experiences—from urban rehabilitation centres to nature retreats, mountain destinations and peaceful recovery spaces.',
      variant: 'dark',
    },
  ]

  const missionPoints = [
    'Make rehabilitation discovery easier',
    'Improve access to transparent information',
    'Encourage personalized recovery planning',
    'Help users explore suitable treatment environments',
    'Promote informed comparisons between rehabilitation options',
    'Support individuals in finding care that aligns with their needs',
  ]

  const team = [
    {
      name: 'Ajay Bhardwaj',
      role: 'Co-Founder & Chief Product Officer',
      bio: "Our vision is to build India's trusted digital destination for rehabilitation discovery and recovery planning. We want to create a platform where individuals can explore meaningful choices, understand their options, and find recovery environments that align with their unique circumstances. By bringing together rehabilitation discovery, transparent information, and personalized recovery planning, we aspire to make the journey towards better recovery more informed and accessible.",
    },
    {
      name: 'Ankit Gupta',
      role: 'Co-Founder & Head of Business Development',
      bio: "Our vision is to build India's trusted digital destination for rehabilitation discovery and recovery planning. We want to create a platform where individuals can explore meaningful choices, understand their options, and find recovery environments that align with their unique circumstances. By bringing together rehabilitation discovery, transparent information, and personalized recovery planning, we aspire to make the journey towards better recovery more informed and accessible.",
    },
    {
      name: 'Dr. Sneha Sharma',
      role: 'Head of Rehab Evaluation Staff',
      bio: "Our vision is to build India's trusted digital destination for rehabilitation discovery and recovery planning. We want to create a platform where individuals can explore meaningful choices, understand their options, and find recovery environments that align with their unique circumstances. By bringing together rehabilitation discovery, transparent information, and personalized recovery planning, we aspire to make the journey towards better recovery more informed and accessible.",
    },
  ]

  return (
    <main className="bg-white text-slate-800">
      <Header />
      <section className="w-full px-4 sm:px-6 lg:px-12 pt-6 pb-4">
        <div className="px-6 sm:px-12 lg:px-12 bg-[#f8f3ea] rounded-3xl border border-slate-200/50 relative pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 sm:px-8 py-6 pb-10 relative z-10">
            <div className="md:col-span-6 flex flex-col justify-center">
              {/* Breadcrumbs */}
              <nav className="text-xs font-semibold text-[#8e8070] mb-4 flex items-center gap-1.5 flex-wrap"><a className="hover:text-brand-blue transition" href="/">Home</a><span className="text-[#8e8070]">›</span><span className="text-[#8e8070]">About us</span>
              </nav>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#318bb0] leading-tight mb-4 font-normal">
                About us

              </h1>

              {/* Description */}
              <p className="text-[#8e8070] text-sm sm:text-base leading-relaxed max-w-xl">
                Discover curated rehabilitation centres in Dehradun, Uttarakhand offering detox, residential care, wellness-focused healing, and personalized recovery support environments.


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
                  alt=""
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= WHO WE ARE (photo + copy) ================= */}
      <section className="py-20 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3.4] w-full rounded-[24px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=900&q=80"
              alt="Counseling session"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div>
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-slate-100 text-[#7c7c7c] text-lg font-semibold">
              Who we are
            </span>
            <p className="text-3xl sm:text-4xl font-medium text-[#318bb0] leading-tight mb-6">
              A trusted starting point for your recovery journey
            </p>
            <div className="space-y-4 text-[#666666] text-sm sm:text-base leading-relaxed">
              <p>
                RecoverIndia.Org is a rehabilitation discovery and recovery planning platform designed to bring greater clarity to the process of finding the right care.
              </p>
              <p>
                We believe that every recovery journey is unique. The right rehabilitation centre should be chosen according to an individual's clinical needs, recovery goals, lifestyle preferences, location requirements, and budget—not simply based on popularity or appearance.
              </p>
              <p>
                Our platform brings relevant rehabilitation options together in one place, making it easier to discover, understand, compare, and explore suitable recovery environments across India.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-slate-100 text-slate-600 text-lg font-semibold">
              What we offer
            </span>
            <p className="text-3xl sm:text-4xl font-medium text-[#318bb0] leading-tight">
              Helping you discover{' '}
              <span className="inline-block px-4 py-1 bg-[#318bb0] text-white rounded-full">recovery</span>
              <br className="hidden sm:block" /> options that fit your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 spans full height with extra copy + CTA */}
            <div className="border border-slate-200 rounded-[24px] p-8 flex flex-col">
              <div className="flex items-start justify-between mb-6">
                <span className="text-base text-slate-400 font-semibold">{offerCards[0].num}</span>
                <div className="text-[#318bb0]"><img src={offerCards[0].icon} alt="" width={28} height={28} /></div>
              </div>
              <p className="text-[#318bb0] font-bold text-lg mb-2">{offerCards[0].title}</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{offerCards[0].desc}</p>
              <p className="text-slate-500 text-xs leading-relaxed mb-6 mt-auto">
                RecoverIndia.Org goes beyond simply listing rehabilitation centres. We aim to make the discovery process more meaningful by helping users understand different treatment environments and recovery options.
              </p>
              <div>
                <button className="inline-flex items-center justify-center px-6 py-3 bg-[#3bb89b] hover:bg-[#2fa388] text-white font-bold text-xs tracking-wider uppercase rounded-full shadow-md transition">
                  Get Started
                </button>
              </div>
            </div>

            {/* Remaining 3 cards stacked */}
            <div className="grid sm:grid-cols-2 gap-6">
              {offerCards.slice(1).map((c, idx) => (
                <div
                  key={idx}
                  className={`rounded-[24px] p-6 flex flex-col ${c.variant === 'dark'
                    ? 'bg-[#318bb0] text-white sm:col-span-1'
                    : 'border border-slate-200 text-slate-800'
                    } ${idx === 0 ? 'sm:col-span-2' : ''}`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className={`text-base font-semibold ${c.variant === 'dark' ? 'text-white/70' : 'text-slate-400'}`}>
                      {c.num}
                    </span>
                    <div className={c.variant === 'dark' ? 'text-white' : 'text-[#318bb0]'}><img src={c.icon} alt="" width={28} height={28} /></div>
                  </div>
                  <p className={`font-bold text-lg mb-2 ${c.variant === 'dark' ? 'text-white' : 'text-[#318bb0]'}`}>
                    {c.title}
                  </p>
                  <p className={`text-sm leading-relaxed ${c.variant === 'dark' ? 'text-white/85' : 'text-slate-500'}`}>
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ================= WHO WE ARE (feature list + illustration) ================= */}
      <section className="py-20 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold">
              Who we are
            </span>
            <p className="text-3xl sm:text-4xl font-semibold text-[#318bb0] leading-tight mb-4">
              A trusted starting point for your recovery journey
            </p>
            <h3 className="text-[#3bb89b] font-bold text-lg mb-2">
              Because finding the right recovery environment matters
            </h3>
            <p className="text-slate-600 text-base leading-relaxed mb-6 max-w-md">
              Choosing rehabilitation is a deeply personal decision. We believe people deserve accurate information and meaningful choices before beginning their recovery journey.
            </p>

            <div className="divide-y divide-slate-200 border-t border-slate-200">
              {whoWeAreFeatures.map((f, idx) => (
                <div key={idx} className="py-4">
                  <h4 className="text-[#318bb0] font-bold text-sm sm:text-lg mb-1">{f.title}</h4>
                  {f.desc && (
                    <p className="text-slate-500 text-xs sm:text-base leading-relaxed max-w-sm">{f.desc}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="relative flex items-center justify-center py-10">
            <img src="/images/homepage/curated.png" alt="" />
          </div>
        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}


      {/* ================= VISION & MISSION ================= */}
      <section className="py-20 pb-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Vision */}
          <div className="bg-white border border-slate-200 rounded-4xl p-8 sm:p-10">
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-slate-100 text-[#7c7c7c] text-lg font-semibold">
              Our Vision
            </span>
            <p className="text-2xl sm:text-4xl font-semibold text-[#318bb0] leading-none mb-5">
              A future where finding the right recovery support is easier
            </p>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
              <p>Our vision is to build India&apos;s trusted digital destination for rehabilitation discovery and recovery planning.</p>
              <p>We want to create a platform where individuals can explore meaningful choices, understand their options, and find recovery environments that align with their unique circumstances.</p>
              <p>By bringing together rehabilitation discovery, transparent information, and personalized recovery planning, we aspire to make the journey towards better recovery more informed and accessible.</p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white border border-slate-200 rounded-4xl p-8 sm:p-10">
            <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-slate-100 text-[#7c7c7c] text-lg font-semibold">
              Our Mission
            </span>
            <p className="text-2xl sm:text-4xl font-semibold text-[#318bb0] leading-none mb-5">
              To simplify the journey from searching for help to finding the right care
            </p>
            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              Our mission is to connect individuals with relevant rehabilitation and recovery options while promoting informed decision-making.
            </p>
            <p className="text-slate-600 text-sm font-normal mb-3">We strive to:</p>
            <ul className="space-y-2.5">
              {missionPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-slate-600 text-sm">
                  <img src="/images/homepage/star-tick.png" alt="" width={16} height={16} />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-5 rounded-full bg-slate-100 text-[#7c7c7c] text-lg font-semibold">
            Our Team
          </span>
          <p className="text-3xl sm:text-4xl font-semibold text-[#318bb0] leading-tight mb-14 max-w-xl">
            The People Behind Better Recovery Discovery
          </p>

          <div className="space-y-16">
            {team.map((member, idx) => (
              <div key={idx} className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
                <div className="relative aspect-[3/3.6] w-full max-w-[220px] rounded-[45%_55%_50%_50%/60%_55%_45%_40%] overflow-hidden bg-[#7cc7e8]" />
                <div>
                  <p className="text-[#318bb0] font-bold text-lg mb-2">{member.name}</p>
                  <p className="text-slate-600 text-base font-normal mb-3">{member.role}</p>
                  <p className="text-slate-500 text-base leading-relaxed max-w-2xl">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}