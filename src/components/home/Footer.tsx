import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative text-white rounded-t-[40px] pt-16 pb-12 overflow-hidden">
      {/* User-customizable background image placeholder structure */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "url('/images/homepage/footebg.png')", backgroundSize: '100% 100%', backgroundPosition: 'center left' }}></div>

      <div className="relative z-10 px-6 sm:px-12 lg:px-12">

        {/* Top Brand & Socials Bar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-white/20 mb-12">

          {/* Left: RecoverIndia Brand */}
          <div className="flex items-center gap-3 border-r-[1px] border-dotted  border-white pr-8">
            <div className="flex items-center gap-2">
              {/* SVG Clover Logo (White Version) */}

              <div className="flex flex-col leading-none">
                <img src="/images/homepage/recoverindia-logo-wht.png" alt="" />
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 mx-1"></div>
            <div className="hidden sm:block text-base leading-tight text-white/80 font-medium max-w-[140px]">
              India's Most <br />Exclusive Luxury<br /> Rehab Network
            </div>
          </div>

          {/* Center: Anvaya Healthcare Brand */}
          <div className="flex items-center gap-3  border-r-[1px] border-dotted  border-white pr-8">
            <div className="flex flex-col leading-none">
              <img src="/images/homepage/anvaya-logo-wht.png" alt="" />
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/20 mx-1"></div>
            <div className="hidden sm:block text-base leading-tight text-white/80 font-medium max-w-[140px]">
              Our team<br /> of Expert Psychiatrists &<br /> Psychologists
            </div>
          </div>

          {/* Right: Social Badges */}
          <div className="flex items-center gap-2">
            <Link href="#" className="w-8 h-8 rounded-full bg-white text-[#128c9b] flex items-center justify-center hover:opacity-90 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-white text-[#128c9b] flex items-center justify-center hover:opacity-90 transition">
              <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-white text-[#128c9b] flex items-center justify-center hover:opacity-90 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-white text-[#128c9b] flex items-center justify-center hover:opacity-90 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163c-.272-.98-1.04-1.755-2.008-2.03-1.77-.478-8.89-.478-8.89-.478s-7.12 0-8.89.478c-.967.275-1.736 1.05-2.008 2.03-.48 1.77-.48 5.48-.48 5.48s0 3.71.48 5.48c.272.98 1.04 1.755 2.008 2.03 1.77.478 8.89.478 8.89.478s7.12 0 8.89-.478c.967-.275 1.736-1.05 2.008-2.03 .48-1.77.48-5.48.48-5.48s0-3.71-.48-5.48zm-14.734 8.242v-6.81l6.09 3.405-6.09 3.405z" />
              </svg>
            </Link>
            <a href="https://wa.me/919876543210" className="w-8 h-8 rounded-full bg-white text-[#128c9b] flex items-center justify-center hover:opacity-90 transition">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm5.835-3.266c1.62.96 3.201 1.46 4.937 1.461 5.349 0 9.704-4.323 9.707-9.629.002-2.571-1.002-4.99-2.83-6.819-1.828-1.83-4.262-2.838-6.837-2.839-5.356 0-9.71 4.322-9.71 9.63-.001 1.733.453 3.424 1.316 4.922L1.442 22.56l4.45-1.826zm11.957-6.861c-.3-.149-1.77-.87-2.046-.971-.275-.1-.475-.149-.675.149-.199.3-.774.972-.949 1.17-.175.199-.349.224-.649.075-.3-.15-1.265-.465-2.41-1.48-.89-.792-1.49-1.77-1.665-2.07-.175-.3-.019-.461.13-.61.135-.133.3-.349.45-.523.15-.174.2-.299.3-.499.1-.199.05-.375-.025-.524-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.519-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8 1.096-.275 1.02-1.05 3.105-1.05 3.155 0 .052.05.275.225.514.175.238 1.8 2.749 4.362 3.856.61.264 1.085.42 1.457.538.613.195 1.171.167 1.611.101.49-.074 1.77-.723 2.02-1.396.25-.673.25-1.248.175-1.396-.075-.149-.275-.249-.575-.398z" />
              </svg>
            </a>
          </div>

        </div>

        {/* Links Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Col 1: Rehabs by Location */}
          <div>
            <p className="text-base font-bold text-[#f7d4a5] uppercase tracking-wider mb-4">Rehabs By Location</p>
            <ul className="space-y-2 text-sm font-semibold text-white">
              <li><Link href="#search" className="hover:underline">Delhi</Link></li>
              <li><Link href="#search" className="hover:underline">Mumbai</Link></li>
              <li><Link href="#search" className="hover:underline">Kolkata</Link></li>
              <li><Link href="#search" className="hover:underline">Bangalore</Link></li>
              <li><Link href="#search" className="hover:underline">Chennai</Link></li>
              <li><Link href="#search" className="hover:underline">Hyderabad</Link></li>
              <li><Link href="#search" className="hover:underline">Ahmedabad</Link></li>
              <li><Link href="#search" className="hover:underline">Chandigarh</Link></li>
              <li><Link href="#search" className="hover:underline">Pune</Link></li>
              <li><Link href="#search" className="hover:underline">Surat</Link></li>
              <li><Link href="#search" className="hover:underline">Jaipur</Link></li>
              <li><Link href="#search" className="hover:underline">Lucknow</Link></li>
              <li><Link href="#search" className="hover:underline">Nagpur</Link></li>
              <li><Link href="#search" className="hover:underline">States & UTs</Link></li>
              <li><Link href="#search" className="hover:underline">All Cities</Link></li>
            </ul>
          </div>

          {/* Col 2: Rehabs by Treatment */}
          <div>
            <p className="text-base font-sans font-bold text-[#f7d4a5] uppercase tracking-wider mb-4">Rehabs By Treatment</p>

            <div className="mb-6">
              <p className="text-sm font-extrabold text-white uppercase mb-2">Adults</p>
              <ul className="space-y-2 text-sm font-medium text-white/80">
                <li><Link href="#search" className="hover:underline">Alcohol Addiction</Link></li>
                <li><Link href="#search" className="hover:underline">Drug Addiction</Link></li>
                <li><Link href="#search" className="hover:underline">Prescription Drug Dependency</Link></li>
                <li><Link href="#search" className="hover:underline">Tobacco/Nicotine Addiction</Link></li>
                <li><Link href="#search" className="hover:underline">Depression</Link></li>
                <li><Link href="#search" className="hover:underline">Anxiety Disorders</Link></li>
                <li><Link href="#search" className="hover:underline">Bipolar Disorder</Link></li>
                <li><Link href="#search" className="hover:underline">PTSD (Trauma-Related Issues)</Link></li>
                <li><Link href="#search" className="hover:underline">Schizophrenia</Link></li>
                <li><Link href="#search" className="hover:underline">Severe Stress or Burnout</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-extrabold text-white uppercase mb-2">Child & Adolescents</p>
              <ul className="space-y-2 text-xs font-medium text-white/80">
                <li><Link href="#search" className="hover:underline">ADHD</Link></li>
                <li><Link href="#search" className="hover:underline">Autism Spectrum Disorders</Link></li>
                <li><Link href="#search" className="hover:underline">Behavioral Issues</Link></li>
                <li><Link href="#search" className="hover:underline">Learning Disabilities</Link></li>
                <li><Link href="#search" className="hover:underline">Teen Substance Abuse</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 3: Geriatric & Special */}
          <div>
            <div className="mb-8">
              <p className="text-sm font-bold text-white uppercase tracking-wider mb-4">Geriatric (Elderly)</p>
              <ul className="space-y-2 text-sm font-semibold text-white/90">
                <li><Link href="#search" className="hover:underline">Dementia / Alzheimer's</Link></li>
                <li><Link href="#search" className="hover:underline">Post-Stroke Recovery</Link></li>
                <li><Link href="#search" className="hover:underline">Mobility Loss</Link></li>
                <li><Link href="#search" className="hover:underline">Chronic Illnesses</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold text-white uppercase tracking-wider mb-4">Special & Emerging</p>
              <ul className="space-y-2 text-sm font-semibold text-white/90">
                <li><Link href="#search" className="hover:underline">Internet & Gaming Addiction</Link></li>
                <li><Link href="#search" className="hover:underline">Porn Addiction</Link></li>
                <li><Link href="#search" className="hover:underline">Eating Disorders</Link></li>
                <li><Link href="#search" className="hover:underline">Luxury Wellness Rehab</Link></li>
                <li><Link href="#search" className="hover:underline">Corporate Burnout Programs</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 4: Guide & Resources */}
          <div>
            <div className="mb-8">
              <p className="text-base font-bold text-[#fbc785] uppercase tracking-wider mb-4">Guide</p>
              <ul className="space-y-2 text-sm font-semibold text-white/90">
                <li><Link href="#faqs" className="hover:underline">What is Addiction?</Link></li>
                <li><Link href="#faqs" className="hover:underline">Signs You Need Rehab</Link></li>
                <li><Link href="#faqs" className="hover:underline">How to Choose the Right Rehab Center</Link></li>
                <li><Link href="#faqs" className="hover:underline">Questions to Ask Before Admission</Link></li>
                <li><Link href="#faqs" className="hover:underline">Rehab Success Rates</Link></li>
                <li><Link href="#faqs" className="hover:underline">Stages of Recovery</Link></li>
                <li><Link href="#faqs" className="hover:underline">Detox Process Explained</Link></li>
                <li><Link href="#faqs" className="hover:underline">Anxiety Management Techniques</Link></li>
              </ul>
            </div>

            <div>
              <p className="text-base font-bold text-[#fbc785] uppercase tracking-wider mb-4">Resources</p>
              <ul className="space-y-2 text-sm font-semibold text-white/90">
                <li><Link href="#faqs" className="hover:underline">Addiction Self-Assessment Test</Link></li>
                <li><Link href="#faqs" className="hover:underline">Stress Level Calculator</Link></li>
                <li><Link href="#faqs" className="hover:underline">Depression Test</Link></li>
                <li><Link href="#faqs" className="hover:underline">Anxiety Test</Link></li>
                <li><Link href="#faqs" className="hover:underline">Tele Manas Helpline</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 5: Vertically Stacked Uppercase Links */}
          <div className="flex flex-col justify-between h-full pt-1">
            <div className="flex flex-col gap-4 text-sm font-black tracking-wider text-white">
              <Link href="#doctors" className="hover:opacity-90">ABOUT</Link>
              <Link href="/contact" className="hover:opacity-90">CONTACT</Link>
              <Link href="/blog" className="hover:opacity-90">BLOGS</Link>
              <Link href="/list-your-center" className="hover:opacity-90">LIST YOUR CENTER</Link>
              <Link href="/privacy-policy" className="hover:opacity-90">PRIVACY POLICY</Link>
              <Link href="/terms-conditions" className="hover:opacity-90">TERMS & CONDITIONS</Link>
              <Link href="/disclaimer" className="hover:opacity-90">DISCLAIMER</Link>
            </div>

            <div className="mt-8 pt-6 border-t border-white/20 text-xs text-white/80 font-medium">
              <span className="block font-bold text-white mb-1">RECOVERINDIA.COM</span>
              <span>&copy; 2026-2027</span>
            </div>
          </div>

        </div>

      </div>
    </footer>
  )
}
