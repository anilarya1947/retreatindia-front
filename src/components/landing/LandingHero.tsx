import Image from 'next/image'

interface LandingHeroProps {
    title: string
    subtitle?: string
    image?: string
}

export default function LandingHero({ title, subtitle, image }: LandingHeroProps) {
    return (
        <section className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4">
            <div className="max-w-7xl mx-auto bg-[#f6f3ed] rounded-[32px] overflow-hidden border border-slate-200/50 shadow-sm relative min-h-[200px]">
                {/* Decorative blob */}
                <div className="absolute -left-10 -top-10 w-48 h-48 bg-gradient-to-br from-teal-200/40 via-emerald-200/35 to-teal-300/20 rounded-[50%_50%_70%_30%] blur-[2px] pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-8 sm:p-12 relative z-10">
                    {/* Left content */}
                    <div className={image ? 'md:col-span-7' : 'md:col-span-12'}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-slate-800 leading-tight mb-4 font-normal">
                            {title}
                        </h1>
                        {subtitle && (
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                                {subtitle}
                            </p>
                        )}
                    </div>

                    {/* Right image — only if provided */}
                    {image && (
                        <div className="md:col-span-5 relative w-full">
                            <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-lg border-4 border-white">
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}