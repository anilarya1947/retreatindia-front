import Link from 'next/link'
import Image from 'next/image'

const TREATMENTS = [
    { label: 'Alcohol\nAddiction', slug: 'alcohol-addiction', initials: 'al', bg: '#f5c89a', icon: '/images/homepage/icon-dr.png' },
    { label: 'Drug\nAddiction', slug: 'drug-addiction', initials: 'dr', bg: '#69cfbb', icon: '/images/homepage/icon-dr.png' },
    { label: 'Depression', slug: 'depression', initials: 'de', bg: '#a8d4e8', icon: '/images/homepage/icon-de.png' },
    { label: 'Anxiety', slug: 'anxiety', initials: 'an', bg: '#69cfbb', icon: '/images/homepage/icon-an.png' },
    { label: 'Trauma', slug: 'ptsd-trauma', initials: 'tr', bg: '#f4a89a', icon: '/images/homepage/icon-tr.png' },
    { label: 'Bipolar\nDisorder', slug: 'bipolar-disorder', initials: 'bi', bg: '#69cfbb', icon: '/images/homepage/icon-bi.png' },
    { label: 'Burnout', slug: 'burnout', initials: 'bu', bg: '#a8c5e8', icon: '/images/homepage/icon-bu.png' },
    { label: 'Gaming\nAddiction', slug: 'gaming-addiction', initials: 'ga', bg: '#69cfbb', icon: '/images/homepage/icon-ga.png' },
]

export default function RehabsByTreatment() {
    return (
        <section className="px-6 sm:px-12 lg:px-12 pt-4">
            <div className="">

                {/* Header */}
                <div className="flex items-start justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#318bb0] leading-tight mb-1">
                            Rehabs By Treatment
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm">
                            Browse trusted rehab centres by level of care and treatment specialization
                        </p>
                    </div>
                    <Link
                        href="/search"
                        className="shrink-0 border border-gray-300 text-[#666666] text-xs sm:text-base font-semibold px-3 py-1.5 sm:px-5 sm:py-2 rounded-xl hover:border-[#318bb0] hover:text-[#318bb0] transition"
                    >
                        All Treatments
                    </Link>
                </div>

                {/* Circles */}
                <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-x-2 gap-y-6 sm:gap-4">
                    {TREATMENTS.map((t) => (
                        <Link
                            key={t.slug}
                            href={`/treatment/${t.slug}`}
                            className="flex flex-col items-center gap-2 sm:gap-3 group"
                        >
                            <div
                                className="relative w-20 h-20 min-[375px]:w-24 min-[375px]:h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden flex items-center justify-center shrink-0"
                            >
                                <Image
                                    src={t.icon}
                                    alt=""
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />

                            </div>

                            <p className="text-center text-[10px] min-[375px]:text-xs sm:text-base font-bold text-[#318bb0] leading-tight group-hover:text-[#27708e] transition whitespace-pre-line">
                                {t.label}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}