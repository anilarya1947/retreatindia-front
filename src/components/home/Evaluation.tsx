import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface EvaluationProps {
  onOpenInquiry: () => void
}

export default function Evaluation({ onOpenInquiry }: EvaluationProps) {
  // Doctors list from PSD
  const doctors = [
    {
      name: 'Dr. Sneha Sharma',
      role: 'Lead Psychiatrist',
      exp: '14+ Yrs Experience',
      image: '/images/homepage/sneha-oval.png',
    },
    {
      name: 'Dr. Poulami Basu',
      role: 'Consultant Psychiatrist',
      exp: '11+ Yrs Experience',
      image: '/images/homepage/poulami-oval.png',
    },
    {
      name: 'Dr. Abhineet Sayal',
      role: 'Consultant Psychiatrist',
      exp: '12+ Yrs Experience',
      image: '/images/homepage/abhineet-oval.png',
    },
    {
      name: 'Dr. Kampila Kardam',
      role: 'Psychiatrist & De-Addiction Specialist',
      exp: '10+ Yrs Experience',
      image: '/images/homepage/kampila-oval.png',
    },
  ]

  const [startIndex, setStartIndex] = useState(0)

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 2 + doctors.length) % doctors.length)
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev + 2) % doctors.length)
  }

  // Get active doctors to display (2 doctors per slide)
  const getVisibleDoctors = () => {
    const list = []
    for (let i = 0; i < 2; i++) {
      list.push(doctors[(startIndex + i) % doctors.length])
    }
    return list
  }

  return (
    <section id="doctors" className="py-12 md:py-20 bg-white text-slate-800">
      <div className="px-3 sm:px-6 lg:px-8">

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-[1.1fr_auto_1.5fr] lg:grid-cols-[1fr_auto_1.4fr] gap-6 lg:gap-10 items-center">
          {/* Left Column: Info & Taglines */}
          <div className="flex gap-5 lg:gap-8 items-start">
            {/* Checkmark & Taglines */}
            <div className="flex flex-col gap-4 shrink-0">
              <div className="relative w-16 h-16 shrink-0">
                <img
                  src="/images/homepage/green-tick.png"
                  alt="Green Tick"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col text-xs lg:text-sm font-bold leading-tight tracking-wide">
                <span className="text-[#38bfa7]">right care</span>
                <span className="text-[#54bed1]">right duration</span>
                <span className="text-[#318bb0]">right cost</span>
              </div>
            </div>

            {/* Text Description & Action Button */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="font-serif text-2xl lg:text-3xl xl:text-4xl leading-[1.25] text-[#318bb0] font-normal mb-4">
                  Your rehab stay duration is carefully evaluated by{' '}
                  <span className="text-[#38bfa7] font-serif inline-block">RecoverIndia.Org:</span>
                </h2>
                <p className="text-[#555555] text-xs lg:text-sm leading-relaxed font-manrope mb-6">
                  Every individual's recovery needs are different. Experts from{' '}
                  <span className="text-[#318bb0] font-bold">Anvaya Healthcare</span> carefully evaluate the patient's condition, progress, and treatment requirements to recommend an optimum duration of stay &mdash; helping families spend only on the care genuinely required, without unnecessary extensions or avoidable costs.
                </p>
              </div>
              <button
                onClick={onOpenInquiry}
                className="self-start px-8 py-3 bg-[#38bfa7] hover:bg-[#2ea18a] text-white font-bold text-xs lg:text-sm tracking-wider uppercase rounded-full transition shadow-sm"
              >
                BOOK YOUR EVALUATION
              </button>
            </div>
          </div>

          {/* Dotted Vertical Divider */}
          <div className="w-[1px] self-stretch border-r border-dotted border-slate-300 mx-2"></div>

          {/* Right Column: 4 Doctors Side-by-Side */}
          <div className="grid grid-cols-4 gap-3 lg:gap-4">
            {doctors.map((doc, idx) => (
              <div key={idx} className="flex flex-col items-center group">
                <div className="relative w-full aspect-[3/4.5] bg-[#fbf8f3] rounded-full overflow-hidden mb-3 border border-[#f0e9dd]/40 shadow-sm">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p className="font-bold text-[#318bb0] text-xs lg:text-sm xl:text-base mb-0.5 leading-snug group-hover:opacity-85 transition">
                    {doc.name}
                  </p>
                  <p className="text-[10px] lg:text-xs text-slate-500 font-normal leading-tight">
                    {doc.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="block md:hidden">
          {/* Top Section */}
          <div className="grid grid-cols-[70px_1fr] gap-4 items-start mb-8">
            {/* Left: Green Tick & Taglines */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="relative w-12 h-12 shrink-0">
                <img
                  src="/images/homepage/green-tick.png"
                  alt="Green Tick"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col text-[10px] font-bold leading-tight tracking-wide text-center">
                <span className="text-[#38bfa7]">right care</span>
                <span className="text-[#54bed1]">right duration</span>
                <span className="text-[#318bb0]">right cost</span>
              </div>
            </div>

            {/* Right: Heading & Description */}
            <div className="flex flex-col">
              <h2 className="font-serif text-xl sm:text-2xl leading-[1.25] text-[#318bb0] font-normal mb-3">
                Your rehab stay duration is carefully evaluated by{' '}
                <span className="text-[#38bfa7] font-serif inline-block">RecoverIndia.Org:</span>
              </h2>
              <p className="text-[#555555] text-xs leading-relaxed font-manrope mb-4">
                Every individual's recovery needs are different. Experts from{' '}
                <span className="text-[#318bb0] font-bold">Anvaya Healthcare</span> carefully evaluate the patient's condition, progress, and treatment requirements to recommend an optimum duration of stay &mdash; helping families spend only on the care genuinely required, without unnecessary extensions or avoidable costs.
              </p>
              <button
                onClick={onOpenInquiry}
                className="self-start px-6 py-2.5 bg-[#38bfa7] hover:bg-[#2ea18a] text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase rounded-full transition shadow-sm"
              >
                BOOK YOUR EVALUATION
              </button>
            </div>
          </div>

          {/* Bottom Section: Doctors Carousel */}
          <div className="relative mt-8">
            <div className="grid grid-cols-2 gap-4">
              {getVisibleDoctors().map((doc, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="relative w-full aspect-[4/5] bg-[#fbf8f3] rounded-full overflow-hidden mb-3 border border-[#f0e9dd]/40 shadow-sm">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-[#318bb0] text-sm mb-0.5 leading-snug group-hover:opacity-85 transition">
                      {doc.name}
                    </p>
                    <p className="text-[10px] text-slate-500 font-normal leading-normal">
                      {doc.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Arrows */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-[#55bead] hover:bg-[#38bfa7] active:scale-95 text-white flex items-center justify-center transition shadow-sm cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 stroke-[3]" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-[#55bead] hover:bg-[#38bfa7] active:scale-95 text-white flex items-center justify-center transition shadow-sm cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 stroke-[3]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}