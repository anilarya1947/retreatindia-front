import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'
import LandingHero from '@/components/landing/LandingHero'
import LandingListings from '@/components/landing/LandingListings'
import LandingFAQ from '@/components/landing/LandingFAQ'
import HeaderBanner from '@/components/rehabs/HeaderBanner'
import ListingSection from '@/components/rehabs/ListingSection'
import RehabGallery from '@/components/rehabs/RehabGallery'
import RehabSidebar from '@/components/rehabs/RehabSidebar'
import RehabMainDetails from '@/components/rehabs/RehabMainDetails'
import RehabCard, { RehabCenterCardData } from '@/components/rehabs/RehabCard'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// ── Fetch functions ──

async function getCityPage(slug: string) {
    const res = await fetch(
        `${API_URL}/api/v2/pages/?type=landing.CityLandingPage&slug=${slug}&fields=*`,
        { next: { revalidate: 300 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.items?.[0] || null
}

async function getSEOPage(slug: string) {
    const res = await fetch(
        `${API_URL}/api/v2/pages/?type=landing.SEOLandingPage&slug=${slug}&fields=*`,
        { next: { revalidate: 300 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.items?.[0] || null
}

async function getCenter(slug: string) {
    const res = await fetch(`${API_URL}/api/listings/${slug}/`, {
        next: { revalidate: 300 },
    })
    if (!res.ok) return null
    return res.json()
}

async function getRehabsByIds(ids: number[]): Promise<RehabCenterCardData[]> {
    if (!ids || ids.length === 0) return []
    const results = await Promise.all(
        ids.map(async (id) => {
            try {
                const res = await fetch(`${API_URL}/api/listings/by-id/${id}/`, {
                    next: { revalidate: 300 }
                })
                if (!res.ok) return null
                return await res.json()
            } catch {
                return null
            }
        })
    )
    return results.filter(Boolean)
}

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params

    const cityPage = await getCityPage(slug)
    if (cityPage) return {
        title: cityPage.seo_title_override || cityPage.hero_title,
        description: cityPage.seo_description || cityPage.hero_subtitle,
    }

    const seoPage = await getSEOPage(slug)
    if (seoPage) return {
        title: seoPage.seo_title_override || seoPage.hero_title,
        description: seoPage.seo_description || seoPage.hero_subtitle,
    }

    const center = await getCenter(slug)
    if (center) return {
        title: center.seo_title || center.name,
        description: center.seo_description || center.short_description,
    }

    return {}
}

export default async function SlugPage({ params }: PageProps) {
    const { slug } = await params

    // ── 1. City Landing Page ──
    const cityPage = await getCityPage(slug)
    if (cityPage) {
        return (
            <div className="min-h-screen bg-white text-slate-800 font-sans antialiased">
                <Header />
                <HeaderBanner
                    title={cityPage.hero_title}
                    subtitle={cityPage.hero_subtitle}
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: cityPage.title },
                    ]}
                />
                {cityPage.intro && (
                    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: cityPage.intro }} />
                    </div>
                )}
                <ListingSection defaultCity={cityPage.default_city} defaultTreatment="" />
                {cityPage.about && (
                    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: cityPage.about }} />
                    </div>
                )}
                {cityPage.city_faqs?.length > 0 && <LandingFAQ faqs={cityPage.city_faqs} />}
                <Footer />
            </div>
        )
    }

    // ── 2. SEO Landing Page ──
    const seoPage = await getSEOPage(slug)
    if (seoPage) {
        const rehabs = await getRehabsByIds(seoPage.selected_rehab_ids || [])
        const badges = [seoPage.hero_badge_1, seoPage.hero_badge_2, seoPage.hero_badge_3, seoPage.hero_badge_4].filter(Boolean)
        const contentSections = [
            { title: seoPage.section_1_title, content: seoPage.section_1_content },
            { title: seoPage.section_2_title, content: seoPage.section_2_content },
            { title: seoPage.section_3_title, content: seoPage.section_3_content },
            { title: seoPage.section_4_title, content: seoPage.section_4_content },
            { title: seoPage.section_5_title, content: seoPage.section_5_content },
        ].filter((s) => s.title || s.content)
        const bottomSections = [
            { title: seoPage.bottom_section_1_title, content: seoPage.bottom_section_1_content },
            { title: seoPage.bottom_section_2_title, content: seoPage.bottom_section_2_content },
            { title: seoPage.bottom_section_3_title, content: seoPage.bottom_section_3_content },
        ].filter((s) => s.title || s.content)

        return (
            <div className="min-h-screen bg-white text-slate-800 font-sans antialiased">
                <Header />

                {/* Hero */}
                <section className="w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4">
                    <div className="max-w-8xl mx-auto bg-[#f8f3ea] rounded-3xl overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                            <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
                                <h1 className="text-3xl sm:text-4xl font-serif leading-tight mb-4" style={{ color: '#318bb0' }}>
                                    {seoPage.hero_title}
                                </h1>
                                {seoPage.hero_subtitle && (
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">{seoPage.hero_subtitle}</p>
                                )}
                                {seoPage.hero_left_text && (
                                    <div className="prose prose-sm text-slate-600 mb-6" dangerouslySetInnerHTML={{ __html: seoPage.hero_left_text }} />
                                )}
                                <div className="mb-6">
                                    <Link href="#listings" className="inline-flex items-center px-6 py-3 text-white font-bold text-sm rounded-full" style={{ backgroundColor: '#318bb0' }}>
                                        View Top Centres →
                                    </Link>
                                </div>
                                {badges.length > 0 && (
                                    <div className="flex flex-wrap gap-3">
                                        {badges.map((badge: string) => (
                                            <span key={badge} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 border border-slate-200 bg-white px-3 py-1.5 rounded-full">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#3bb89b]" />
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {seoPage.hero_image && (
                                <div className="md:col-span-5 relative min-h-[280px]">
                                    <Image src={seoPage.hero_image.url} alt={seoPage.hero_title} fill unoptimized className="object-cover" />
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Intro */}
                {seoPage.intro_text && (
                    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: seoPage.intro_text }} />
                    </section>
                )}

                {/* Content sections above listings */}
                {contentSections.length > 0 && (
                    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
                        {contentSections.map((section, idx) => (
                            <div key={idx}>
                                {section.title && <h2 className="text-2xl font-serif mb-4" style={{ color: '#318bb0' }}>{section.title}</h2>}
                                {section.content && <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />}
                            </div>
                        ))}
                    </section>
                )}

                {/* Rehab Listings + Sidebar */}
                {rehabs.length > 0 && (
                    <section id="listings" className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        {seoPage.listing_section_title && (
                            <h2 className="text-2xl sm:text-3xl font-serif mb-8" style={{ color: '#318bb0' }}>
                                {seoPage.listing_section_title}
                            </h2>
                        )}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-8 space-y-0">
                                {rehabs.map((center: RehabCenterCardData) => (
                                    <RehabCard key={center.id} center={center} />
                                ))}
                            </div>
                            <aside className="lg:col-span-4">
                                <div className="lg:sticky lg:top-24">
                                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                        <h3 className="font-serif text-lg mb-1" style={{ color: '#318bb0' }}>Need Help Choosing a Rehab?</h3>
                                        <p className="text-xs text-slate-400 mb-4">Our experts will help you find the right centre</p>
                                        <form className="space-y-3">
                                            <input type="text" placeholder="Name" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#3bb89b]" />
                                            <input type="tel" placeholder="Contact Number" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#3bb89b]" />
                                            <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#3bb89b] text-slate-400">
                                                <option value="">Who needs treatment?</option>
                                                <option>Myself</option>
                                                <option>My spouse / partner</option>
                                                <option>My child</option>
                                                <option>A family member</option>
                                                <option>A friend</option>
                                            </select>
                                            <textarea placeholder="Share your concern..." rows={3} className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#3bb89b] resize-none" />
                                            <button type="submit" className="w-full py-3 text-white font-bold text-sm rounded-lg" style={{ backgroundColor: '#e53e3e' }}>
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </section>
                )}

                {/* Bottom sections */}
                {bottomSections.length > 0 && (
                    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                        {bottomSections.map((section, idx) => (
                            <div key={idx}>
                                {section.title && <h2 className="text-2xl font-serif mb-4" style={{ color: '#318bb0' }}>{section.title}</h2>}
                                {section.content && <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />}
                            </div>
                        ))}
                    </section>
                )}

                {/* Final thoughts */}
                {(seoPage.final_thoughts_title || seoPage.final_thoughts_content) && (
                    <section className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {seoPage.final_thoughts_title && <h2 className="text-2xl font-serif mb-4" style={{ color: '#318bb0' }}>{seoPage.final_thoughts_title}</h2>}
                        {seoPage.final_thoughts_content && <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: seoPage.final_thoughts_content }} />}
                    </section>
                )}

                {/* FAQs */}
                {seoPage.seo_faqs?.length > 0 && <LandingFAQ faqs={seoPage.seo_faqs} />}

                <Footer />
            </div>
        )
    }

    // ── 3. Rehab Center Detail ──
    const center = await getCenter(slug)
    if (center) {
        const images = (center.photos || []).map((p: any) => p.image)
        return (
            <div className="min-h-screen bg-[#faf9f6]/30 text-slate-800 font-sans antialiased">
                <Header />
                <RehabGallery
                    name={center.name}
                    location={`${center.address}, ${center.city}`}
                    images={images}
                    totalPhotos={center.photos?.length || 0}
                    verified={center.verified}
                    priceRange={center.price_range}
                    category={center.category}
                    state={center.state}
                    city={center.city}
                />
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <main className="col-span-1 lg:col-span-8">
                            <RehabMainDetails
                                name={center.name}
                                description={center.description}
                                shortDescription={center.short_description}
                                treatmentTypes={center.treatment_types || []}
                                amenities={center.amenities || []}
                                address={center.address}
                                city={center.city}
                                state={center.state}
                                languages={center.languages || []}
                                surrounding={center.surrounding}
                                experienceYears={center.experience_years}
                                minProgramDuration={center.min_program_duration}
                                totalRooms={center.total_rooms}
                                totalBeds={center.total_beds}
                                inRoomFacilities={center.in_room_facilities || []}
                                centerFacilities={center.center_facilities || []}
                                recreationalActivities={center.recreational_activities || []}
                                therapies={center.therapies || []}
                                teamMembers={center.team_members || []}
                                aboutSections={center.about_sections || []}
                                videos={center.videos || []}
                                patientProfiles={center.patient_profiles || []}
                            />
                        </main>
                        <aside className="col-span-1 lg:col-span-4">
                            <RehabSidebar
                                centerId={center.id}
                                name={center.name}
                                city={center.city}
                                state={center.state}
                                phone={center.phone}
                                whatsapp={center.whatsapp}
                                priceRange={center.price_range}
                            />
                        </aside>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    // ── 4. Not Found ──
    return notFound()
}