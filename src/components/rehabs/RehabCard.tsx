import Image from 'next/image'
import Link from 'next/link'
import { MapPin, IndianRupee } from 'lucide-react'

interface Treatment { id: number; name: string; slug: string }
interface Photo { id: number; image: string; alt: string }

export interface RehabCenterCardData {
    id: number
    name: string
    slug: string
    short_description: string
    city: string
    state?: string
    address: string
    phone: string
    whatsapp: string
    price_range: string
    featured: boolean
    verified: boolean
    treatment_types: Treatment[]
    photos: Photo[]
    price_range_display?: string
}

const PRICE_LABEL: Record<string, string> = {
    lt2: '₹1,00,000', '2to3': '₹2,00,000', '3to4': '₹3,00,000',
    '4to5': '₹4,00,000', gt5: '₹5,00,000+',
    budget: '₹50,000', mid: '₹1,20,000', premium: '₹2,50,000',
}

interface RehabCardProps {
    center: RehabCenterCardData
    onTagClick?: (slug: string) => void
}

export default function RehabCard({ center, onTagClick }: RehabCardProps) {
    const photos = center.photos || []
    const mainPhoto = photos[0]?.image
    const secondPhoto = photos[1]?.image
    const thirdPhoto = photos[2]?.image
    const extraCount = photos.length > 3 ? photos.length - 3 : 0
    const location = [center.city, center.state].filter(Boolean).join(', ')

    return (
        <article className="bg-white rounded-[24px] border border-slate-200/80   duration-300 overflow-hidden mb-6">

            {/* Photo grid */}
            <div className="grid grid-cols-12 gap-2 p-4">
                {/* Main large image */}
                <div className="col-span-7 relative bg-slate-100 group overflow-hidden rounded-[18px]" style={{ minHeight: '320px' }}>
                    {mainPhoto ? (
                        <Image
                            src={mainPhoto} alt={center.name} fill unoptimized
                            className="object-cover group-hover:scale-[1.02] transition duration-500"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400 text-xs">No photo</div>
                    )}
                    {photos.length > 2 && (
                        <div className="absolute bottom-3 right-3">
                            <Link
                                href={`/${center.slug}`}
                                className="bg-[#3bb89b] text-white text-[11px] font-bold px-4 py-1.5 rounded-full"
                            >
                                MORE PHOTOS
                            </Link>
                        </div>
                    )}
                </div>

                {/* Two stacked images */}
                <div className="col-span-5 flex flex-col gap-2">
                    <div className="relative flex-1 bg-slate-100 group overflow-hidden rounded-[18px]" style={{ minHeight: '106px' }}>
                        {secondPhoto ? (
                            <Image src={secondPhoto} alt="" fill unoptimized className="object-cover group-hover:scale-[1.02] transition duration-500" />
                        ) : (
                            <div className="absolute inset-0 bg-slate-100" />
                        )}
                    </div>
                    <div className="relative flex-1 bg-slate-100 group overflow-hidden rounded-[18px]" style={{ minHeight: '106px' }}>
                        {thirdPhoto ? (
                            <Image src={thirdPhoto} alt="" fill unoptimized className="object-cover group-hover:scale-[1.02] transition duration-500" />
                        ) : (
                            <div className="absolute inset-0 bg-slate-100" />
                        )}
                        {extraCount > 0 && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-[18px]">
                                <span className="text-white text-xs font-bold">+{extraCount} Photos</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 py-4 pb-8">
                {/* Location */}
                <div className="flex items-center gap-1.5 mb-1">
                    <MapPin className="w-5 h-5 shrink-0" style={{ color: '#777' }} />
                    <span className="text-base font-semibold text-[#868686]">{location || center.city}</span>
                </div>

                {/* Title */}
                <Link href={`/${center.slug}`}>
                    <h3 className="text-4xl font-serif leading-tight mb-1.5 hover:opacity-80 transition" style={{ color: '#318bb0' }}>
                        {center.name}
                    </h3>
                </Link>

                {/* Price */}
                {center.price_range_display && (
                    <div className="flex items-center gap-1 mb-3">
                        <IndianRupee className="w-3.5 h-3.5 shrink-0" style={{ color: '#38b579' }} />
                        <span className="text-sm font-bold" style={{ color: '#38b579' }}>
                            From {center.price_range_display} per month
                        </span>
                    </div>
                )}

                {/* Description */}
                {center.short_description && (
                    <p className="text-base text-[#666666] leading-relaxed mb-4 line-clamp-3">
                        {center.short_description}
                    </p>
                )}

                {/* Treatment tags */}
                {(center.treatment_types || []).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                        {(center.treatment_types || []).slice(0, 8).map((t) => (
                            onTagClick ? (
                                <button
                                    key={t.id}
                                    onClick={() => onTagClick(t.slug)}
                                    className="px-3 py-1 border border-slate-200 text-slate-500 hover:border-[#318bb0] hover:text-[#318bb0] text-xs font-medium rounded-full transition"
                                >
                                    {t.name}
                                </button>
                            ) : (
                                <Link
                                    key={t.id}
                                    href={`/search?treatment=${t.slug}`}
                                    className="px-4 py-1 border border-slate-200 text-[#888] hover:border-[#318bb0] hover:text-[#318bb0] bg-[#efefef] text-base font-medium rounded-full transition"
                                >
                                    {t.name}
                                </Link>
                            )
                        ))}
                    </div>
                )}

                {/* CTA buttons */}
                <div className="flex gap-3">
                    <Link
                        href={`/${center.slug}`}
                        className="px-8 py-3 text-white font-medium text-base tracking-none uppercase rounded-full transition hover:opacity-90"
                        style={{ backgroundColor: '#38B579' }}
                    >
                        EXPLORE
                    </Link>
                    <a
                        href={center.whatsapp ? `https://wa.me/${center.whatsapp}` : `tel:${center.phone}`}
                        className="px-8 py-3 text-white font-medium text-base tracking-none uppercase rounded-full transition hover:opacity-90"
                        style={{ backgroundColor: '#318bb0' }}
                    >
                        CONTACT
                    </a>
                </div>
            </div>
        </article>
    )
}