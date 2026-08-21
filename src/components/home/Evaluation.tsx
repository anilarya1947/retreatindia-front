import React from 'react'
import Image from 'next/image'

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
      image: 'images/homepage/sneha-oval.png',
    },
    {
      name: 'Dr. Poulami Basu',
      role: 'Consultant Psychiatrist',
      exp: '11+ Yrs Experience',
      image: 'images/homepage/poulami-oval.png',
    },
    {
      name: 'Dr. Abhineet Sayal',
      role: 'Consultant Psychiatrist',
      exp: '12+ Yrs Experience',
      image: 'images/homepage/abhineet-oval.png',
    },
    {
      name: 'Dr. Kampila Kardam',
      role: 'Psychiatrist & De-Addiction Specialist',
      exp: '10+ Yrs Experience',
      image: 'images/homepage/kampila-oval.png',
    },
  ]

  return (
    <section id="doctors" className="pt-20 bg-white text-slate-800">
      <div className="px-6 sm:px-12 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_1.6fr] items-center gap-10 lg:gap-8">
          {/* Column 1: Checkmark & Taglines */}
          <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-6 shrink-0 justify-center">
            <div className="relative w-12 h-12 shrink-0 flex items-center justify-center text-teal-400">
              <img src="images/homepage/green-tick.png" alt="" />
            </div>
            <div className="flex flex-col text-xs sm:text-lg font-bold leading-tight lowercase tracking-wider">
              <span className="text-[#3bb89b]">right care</span>
              <span className="text-[#5db8cd]">right duration</span>
              <span className="text-[#318bb0]">right cost</span>
            </div>
          </div>

          {/* Column 2: Headline, Description, CTA */}
          <div className="flex flex-col justify-center border-slate-300  lg:pl-8">
            <h2 className="font-marcellus text-3xl sm:text-4xl font-normal tracking-tight leading-[1.2] mb-6 text-[#318bb0]">
              Your rehab stay duration is carefully evaluated by Recover<span className="text-[#35c08d] font-marcellus">India.Org:</span>
            </h2>

            <p className="text-black text-sm sm:text-base leading-relaxed mb-8 font-manrope">
              Every individual's recovery needs are different. Experts from <span className="text-brand-blue font-bold">Anvaya Healthcare</span> carefully evaluate the patient's condition, progress, and treatment requirements to recommend an optimum duration of stay – helping families spend only on the care genuinely required, without unnecessary extensions or avoidable costs.
            </p>

            <div>
              <button
                onClick={onOpenInquiry}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#38b579] hover:bg-[#2fa388] text-white font-semibold text-xs sm:text-base tracking-wider uppercase rounded-full transition font-manrope"
              >
                BOOK YOUR EVALUATION
              </button>
            </div>
          </div>

          {/* Column 3: Doctors Grid */}
          <div className="flex flex-col justify-center border-slate-300 lg:border-l lg:border-dashed lg:pl-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {doctors.map((doc, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  {/* Vertical Arch Frame matching mockup */}
                  <div className="relative h-full w-full rounded-t-full overflow-hidden mb-4">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className=""
                    />
                  </div>
                  {/* Doctor Metadata */}
                  <div className="text-center">
                    <p className="font-normal text-brand-blue text-sm sm:text-[18px] mb-0.5 leading-snug group-hover:opacity-85 transition">
                      {doc.name}
                    </p>
                    <p className="text-[10x] text-slate-500 font-normal leading-normal mx-auto">
                      {doc.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}