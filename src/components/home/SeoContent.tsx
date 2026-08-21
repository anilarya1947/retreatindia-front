'use client'

import React, { useState } from 'react'

export default function SeoContent() {
  const [isSeoExpanded, setIsSeoExpanded] = useState(false)

  return (
    <section className="py-8 pb-16 bg-white text-slate-800">
      <div className="px-6 sm:px-12 lg:px-12">
        <div className="text-[#00587e] text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            Delhi, as a bustling metropolis, presents a unique set of challenges that significantly contribute to mental health issues among its residents. Here's a breakdown of the key mental health problems and contributing factors:
          </p>
          <h3 className="text-lg font-bold text-[#00587e] mt-6">Common mental health problems in Dwarka Delhi</h3>
          <p>
            <span className="font-bold text-[#00587e] block mb-1">Depression and Anxiety:</span>
            These are among the most prevalent mental health disorders, particularly due to the stressors of urban life like traffic congestion, overcrowding, and demanding work environments. Studies highlight a significant correlation between air pollution and depression, with pollutants affecting brain chemistry.
          </p>
          <div className={`space-y-6 overflow-hidden transition-all duration-500 ${!isSeoExpanded ? 'max-h-0 opacity-0' : 'max-h-[1200px] opacity-100'}`}>


            <div className="space-y-4">

              <p>
                <span className="font-bold text-[#00587e] block mb-1">Stress:</span>
                Chronic stress is widespread, fueled by the fast-paced lifestyle, competitive environment, and socio-economic pressures.
              </p>
              <p>
                <span className="font-bold text-slate-700 block mb-1">Mental health issues in adolescents:</span>
                Adolescents in Delhi, particularly those in lower socioeconomic groups and urban resettlement areas, show a high prevalence of common mental disorders, with academic stress, board exams, illness, and family issues being cited as causes of stress.
              </p>
              <p>
                <span className="font-bold text-slate-700 block mb-1">Impact of pollution:</span>
                Air pollution and environmental stress are recognized as significant contributors to mental health problems, worsening existing conditions and potentially leading to pollution anxiety and depression.
              </p>
            </div>
          </div>
        </div>

        {/* Read More/Less Button */}
        <div className="mt-8">
          <button
            onClick={() => setIsSeoExpanded(!isSeoExpanded)}
            className="px-8 py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-sm transition cursor-pointer"
          >
            {isSeoExpanded ? 'READ LESS' : 'READ MORE'}
          </button>
        </div>
      </div>
    </section>
  )
}
