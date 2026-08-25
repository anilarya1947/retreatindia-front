import React from 'react'
import { ChevronDown } from 'lucide-react'

interface RecoveryProcessProps {
  onOpenInquiry: () => void
}

export default function RecoveryProcess({ onOpenInquiry }: RecoveryProcessProps) {
  return (
    <section className="pt-20 bg-white text-slate-800">
      <div className="px-6 sm:px-12 lg:px-12">

        <div className='mb-10'>
          <img src="images/homepage/why-bg.png" alt="" className='rounded-2xl' />
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
        <div className="flex justify-center mt-14">
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
