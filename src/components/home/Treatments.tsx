import React from 'react'
import Image from 'next/image'
import { Mountain, Trees, Waves, Sun, Building2, Flower2 } from 'lucide-react'

export default function Treatments() {
  const Treatemnts = [
    { name: 'Mountains', count: '18 Centers', icon: Mountain, image: 'images/homepage/ico-hill.png' },
    { name: 'Farm / Garden', count: '24 Centers', icon: Flower2, image: 'images/homepage/ico-farm.png' },
    { name: 'Forest', count: '14 Centers', icon: Trees, image: 'images/homepage/ico-forest.png' },
    { name: 'Beach', count: '12 Centers', icon: Waves, image: 'images/homepage/ico-beach.png' },
    { name: 'Lake / Riverside', count: '16 Centers', icon: Sun, image: 'images/homepage/ico-lake.png' },
    { name: 'City Center', count: '32 Centers', icon: Building2, image: 'images/homepage/ico-lake.png' },
  ]

  return (
    <section id="Treatemnts" className="py-20 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl font-normal text-brand-blue mb-3">Rehabs By Treatemnts</h2>
          <p className="text-slate-500 text-sm">
            Discover recovery retreats across mountains, forests, beaches, and serene wellness destinations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
          {Treatemnts.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center group cursor-pointer">
              {/* Perfect Circular Image Frame */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border border-slate-100 shadow-sm group-hover:shadow-md transition duration-300 bg-slate-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Label */}
              <span className="mt-4 font-sans font-semibold text-brand-blue text-sm sm:text-lg group-hover:underline transition text-center">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
