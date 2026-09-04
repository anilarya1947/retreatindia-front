import React from 'react'
import { ChevronDown } from 'lucide-react'

interface RecoveryProcessProps {
  onOpenInquiry: () => void
}

export default function RecoveryProcess({ onOpenInquiry }: RecoveryProcessProps) {
  return (
    <section className="bg-white text-slate-800 px-2 sm:px-12 lg:px-12 mt-15 md:mt-20">
      <div className="">

        {/* Why RecoverIndia.Org Section */}
        <div className="relative w-full rounded-2xl md:rounded-4xl overflow-hidden shadow-sm mb-12 sm:mb-16 border border-emerald-100/50 bg-[#f4f9f8]">

          {/* Background image for Desktop */}
          <img
            src="/images/homepage/why-bg.png"
            alt="Why RecoverIndia.Org Background"
            className="hidden lg:block absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none opacity-90"
          />

          {/* Background image for Mobile */}
          <img
            src="/images/homepage/why-bg-mob.png"
            alt="Why RecoverIndia.Org Background Mobile"
            className="block lg:hidden absolute inset-0 w-full h-full object-fill object-bottom pointer-events-none opacity-90"
          />


          <div className="relative z-10 py-10 px-2 sm:py-12 sm:px-8 lg:py-25 lg:px-10 flex flex-col items-center">

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#009ea8] text-center font-normal tracking-tight mb-3">
              Why <span className="text-[#009ea8] font-normal">Recover<span className='text-[#35c08d]'>India</span>.Org</span>
            </h2>

            {/* Subtitle Description */}
            <p className="max-w-3xl text-center mx-auto text-xs sm:text-sm lg:text-[14px] text-[#666666] leading-relaxed font-sans mb-4 sm:mb-10">
              RecoverIndia.Org helps individuals and loved ones discover verified rehabilitation and wellness centres across India with transparent guidance, personalized recovery planning, privacy-focused support, and expert-assisted discovery. Every recommendation is thoughtfully aligned with clinical needs, lifestyle preferences, recovery goals, and affordability for a more meaningful healing journey.
            </p>

            {/* Graphic & Badges Grid */}
            <div className="w-full max-w-6xl grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-4 items-center relative py-2">

              {/* Left 3 Pills Column */}
              <div className="col-span-1 lg:col-span-4 flex flex-col gap-3.5 sm:gap-5 items-center lg:items-end order-2 lg:order-1">

                {/* Pill 1: Curated & Verified Listings */}
                <div className="bg-[#89BDD0] hover:bg-[#528aa6] transition-all text-white rounded-full px-3 py-2 sm:px-8 sm:py-3 shadow-md flex items-center justify-center gap-1.5 text-[10px] sm:text-sm lg:text-[18px] text-center lg:text-left whitespace-normal sm:whitespace-nowrap lg:-mr-2 transform hover:-translate-y-0.5 w-full lg:w-auto">
                  <span className="font-extrabold tracking-wide">Curated &amp;</span>
                  <span className="font-light opacity-95">Verified Listings</span>
                </div>

                {/* Pill 2: Transparent Guidance */}
                <div className="bg-[#65d0a8] hover:bg-[#3ba880] transition-all text-white rounded-full px-3 py-2 sm:px-8 sm:py-3 shadow-md flex items-center justify-center gap-1.5 text-[10px] sm:text-sm lg:text-[18px] text-center lg:text-left whitespace-normal sm:whitespace-nowrap lg:mr-10 transform hover:-translate-y-0.5 w-full lg:w-auto">
                  <span className="font-extrabold tracking-wide">Transparent</span>
                  <span className="font-light opacity-95">Guidance</span>
                </div>

                {/* Pill 3: No Forced Referrals */}
                <div className="bg-[#F4B693] hover:bg-[#e08359] transition-all text-white rounded-full px-3 py-2 sm:px-8 sm:py-3 shadow-md flex items-center justify-center gap-1.5 text-[10px] sm:text-sm lg:text-[18px] text-center lg:text-left whitespace-normal sm:whitespace-nowrap lg:mr-2 transform hover:-translate-y-0.5 w-full lg:w-auto">
                  <span className="font-extrabold tracking-wide">No Forced</span>
                  <span className="font-light opacity-95">Referrals</span>
                </div>

              </div>

              {/* Middle Center Graphic + Decorative Icons */}
              <div className="col-span-2 lg:col-span-4 flex justify-center items-center relative my-2 lg:my-0 min-h-[200px] sm:min-h-[280px] order-1 lg:order-2">

                {/* Top-Left Outline Icon */}


                {/* Top-Right Outline Icon */}


                {/* Bottom-Left Outline Icon */}


                {/* Bottom-Right Outline Icon */}


                {/* Center Main Logo Image */}
                <img
                  src="/images/homepage/why-bgs.png"
                  alt="RecoverIndia Central Illustration"
                  className="w-48 h-48 sm:w-60 sm:h-60 object-contain relative z-10 transform hover:scale-105 transition-transform duration-500 invisible"
                />

              </div>

              {/* Right 3 Pills Column */}
              <div className="col-span-1 lg:col-span-4 flex flex-col gap-3.5 sm:gap-5 items-center lg:items-start order-3">

                {/* Pill 4: Optimum Stay Planning */}
                <div className="bg-[#77D3CE] hover:bg-[#3baaa6] transition-all text-white rounded-full px-3 py-2 sm:px-8 sm:py-3 shadow-md flex items-center justify-center gap-1.5 text-[10px] sm:text-sm lg:text-[18px] text-center lg:text-left whitespace-normal sm:whitespace-nowrap lg:-ml-2 transform hover:-translate-y-0.5 w-full lg:w-auto">
                  <span className="font-extrabold tracking-wide">Optimum</span>
                  <span className="font-light opacity-95">Stay Planning</span>
                </div>

                {/* Pill 5: Expert-Assisted Discovery */}
                <div className="bg-[#E4C691] hover:bg-[#cf9954] transition-all text-white rounded-full px-3 py-2 sm:px-8 sm:py-3 shadow-md flex items-center justify-center gap-1.5 text-[10px] sm:text-sm lg:text-[18px] text-center lg:text-left whitespace-normal sm:whitespace-nowrap lg:ml-10 transform hover:-translate-y-0.5 w-full lg:w-auto">
                  <span className="font-extrabold tracking-wide">Expert-Assisted</span>
                  <span className="font-light opacity-95">Discovery</span>
                </div>

                {/* Pill 6: Privacy Focused */}
                <div className="bg-[#89bdd0] hover:bg-[#5197bb] transition-all text-white rounded-full px-3 py-2 sm:px-8 sm:py-3 shadow-md flex items-center justify-center gap-1.5 text-[10px] sm:text-sm lg:text-[18px] text-center lg:text-left whitespace-normal sm:whitespace-nowrap lg:ml-2 transform hover:-translate-y-0.5 w-full lg:w-auto">
                  <span className="font-extrabold tracking-wide">Privacy</span>
                  <span className="font-light opacity-95">Focused</span>
                </div>

              </div>

            </div>

          </div>
        </div>
        <div className="flex md:grid md:grid-cols-5 gap-8 lg:gap-12 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-6 -mx-6 px-6 md:mx-0 md:px-0">

          {/* Step 1 */}
          <div className="relative flex flex-col shrink-0 w-[75vw] min-[375px]:w-[260px] snap-center md:w-auto md:shrink md:snap-none">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#d9b57a] font-sans leading-none mb-1">01</p>
            <p className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-[#d9b57a] font-sans tracking-tighter leading-tight mb-3">Connect</p>
            <div className="border-t border-dashed border-slate-300 w-full my-2"></div>
            <p className="font-sarif font-bold text-[#666666] text-sm sm:text-base tracking-tighter mb-1" >Share Your Requirements</p>
            <p className="font-sarif text-[11px] min-[375px]:text-xs text-[#666666] leading-relaxed">
              Tell us about treatment needs, preferred location, budget, lifestyle expectations, accommodation preferences, and recovery goals for personalized rehabilitation guidance.
            </p>
            {/* Arrow Indicator */}
            <div className="flex absolute top-[52px] sm:top-[68px] right-[-20px] md:right-[-24px] z-10 w-6 h-6 rounded-full bg-[#50cfbe] text-white items-center justify-center shrink-0">
              <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col shrink-0 w-[75vw] min-[375px]:w-[260px] snap-center md:w-auto md:shrink md:snap-none">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#65d0a8] font-sans leading-none mb-1">02</p>
            <p className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-[#65d0a8] font-sans  tracking-tighter leading-tight mb-3">Evaluate</p>
            <div className="border-t border-dashed border-slate-300 w-full my-2"></div>
            <p className="font-sarif font-bold text-[#666666] text-sm sm:text-base tracking-tighter mb-1" >Clinical & Budget Assessment</p>
            <p className="font-sarif text-[11px] min-[375px]:text-xs text-[#666666] leading-relaxed">
              Our team evaluates clinical requirements, emotional wellness concerns, care intensity, and budget expectations to identify suitable rehabilitation options carefully
            </p>


            {/* Arrow Indicator */}
            <div className="flex absolute top-[52px] sm:top-[68px] right-[-20px] md:right-[-24px] z-10 w-6 h-6 rounded-full bg-[#50cfbe] text-white items-center justify-center shrink-0">
              <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col shrink-0 w-[75vw] min-[375px]:w-[260px] snap-center md:w-auto md:shrink md:snap-none">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#89bdd0] font-sans leading-none mb-1">03</p>
            <p className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-[#89bdd0] font-sans  leading-tight mb-3">Explore</p>
            <div className="border-t border-dashed border-slate-300 w-full my-2"></div>

            <p className="font-sarif font-bold text-[#666666] text-sm sm:text-base tracking-tighter mb-1">Explore Matched Rehabs</p>
            <p className="font-sarif text-[11px] min-[375px]:text-xs text-[#666666] leading-relaxed">
              Browse curated rehabilitation centres aligned with treatment needs, recovery preferences, comfort expectations, wellness environment, and affordability considerations seamlessly.
            </p>

            {/* Arrow Indicator */}
            <div className="flex absolute top-[52px] sm:top-[68px] right-[-20px] md:right-[-24px] z-10 w-6 h-6 rounded-full bg-[#50cfbe] text-white items-center justify-center shrink-0">
              <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex flex-col shrink-0 w-[75vw] min-[375px]:w-[260px] snap-center md:w-auto md:shrink md:snap-none">
            <p className="text-3xl sm:text-4xl font-bold text-[#f5aa85] font-sans leading-none mb-1">04</p>
            <p className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-[#f5aa85] font-sans leading-tight mb-3">Compare</p>
            <div className="border-t border-dashed border-slate-300 w-full my-2"></div>
            <p className="font-sarif font-bold text-[#666666] text-sm sm:text-base tracking-tighter mb-1">Compare Care & Comfort</p>
            <p className="font-sarif text-[11px] min-[375px]:text-xs text-[#666666] leading-relaxed">
              Compare accommodations, therapies, psychiatric support, wellness activities, treatment philosophies, amenities, and recovery environments before making informed decisions confidently.
            </p>
            {/* Arrow Indicator */}
            <div className="flex absolute top-[52px] sm:top-[68px] right-[-20px] md:right-[-24px] z-10 w-6 h-6 rounded-full bg-[#50cfbe] text-white items-center justify-center shrink-0">
              <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
            </div>
          </div>

          {/* Step 5 */}
          <div className="relative flex flex-col shrink-0 w-[75vw] min-[375px]:w-[260px] snap-center md:w-auto md:shrink md:snap-none">
            <p className="text-3xl sm:text-4xl font-bold text-[#77d3ce] font-sans leading-none mb-1">05</p>
            <p className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-[#77d3ce] font-sans leading-tight mb-3">Recover</p>
            <div className="border-t border-dashed border-slate-300 w-full my-2"></div>
            <p className="font-sarif font-bold text-[#666666] text-sm sm:text-base tracking-tighter mb-1">Begin Recovery Journey</p>
            <p className="font-sarif text-[11px] min-[375px]:text-xs text-[#666666] leading-relaxed">
              Choose the rehabilitation environment best suited for healing, emotional growth, stability, and long-term recovery with supportive professional guidance.
            </p>
          </div>

        </div>

        {/* Centered Action Button */}
        <div className="flex justify-center mt-4 md:mt-14">
          <button
            onClick={onOpenInquiry}
            className="px-10 py-4 bg-brand-blue hover:bg-brand-blue/90 text-white font-normal text-xs sm:text-sm tracking-widest uppercase rounded-full transition"
          >
            CONNECT NOW
          </button>
        </div>
      </div>
    </section>
  )
}
