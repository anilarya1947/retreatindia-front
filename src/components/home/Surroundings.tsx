import React from 'react'
import Image from 'next/image'
import { Mountain, Trees, Waves, Sun, Building2, Flower2 } from 'lucide-react'

export default function Surroundings() {
  const surroundings = [
    { name: 'Mountains', image: '/images/homepage/ico-hill.png' },
    { name: 'Farm/Garden', image: '/images/homepage/ico-farm.png' },
    { name: 'Forest', image: '/images/homepage/ico-forest.png' },
    { name: 'Beach', image: '/images/homepage/ico-beach.png' },
    { name: 'Lake/Riverside', image: '/images/homepage/ico-lake.png' },
    { name: 'City', image: '/images/homepage/ico-city.png' },
  ]

  return (
    <section id="surroundings" className="bg-white text-slate-800 px-3 sm:px-12 lg:px-12 mt-15 md:mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-normal text-[#318bb0] mb-2 font-serif">Rehabs By Surroundings</h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Discover recovery retreats across mountains, forests, beaches, and serene wellness destinations
          </p>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-3 gap-y-8 sm:gap-8 justify-items-center">
          {surroundings.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center group cursor-pointer">
              {/* Perfect Circular Image Frame */}
              <div className="relative w-20 h-20 min-[375px]:w-24 min-[375px]:h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border border-slate-100 shadow-sm group-hover:shadow-md transition duration-300 bg-slate-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Label */}
              <span className="mt-3 font-sans font-semibold text-[#318bb0] text-xs min-[375px]:text-sm sm:text-base md:text-lg group-hover:underline transition text-center leading-tight">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
