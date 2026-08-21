import { notFound } from 'next/navigation'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'
import LandingHero from '@/components/landing/LandingHero'
import LandingListings from '@/components/landing/LandingListings'
import ListingSection from '@/components/rehabs/ListingSection'
import LandingFAQ from '@/components/landing/LandingFAQ'
import RehabGallery from '@/components/rehabs/RehabGallery'
import RehabSidebar from '@/components/rehabs/RehabSidebar'
import RehabMainDetails from '@/components/rehabs/RehabMainDetails'
import HeaderBanner from '@/components/rehabs/HeaderBanner'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getCityPage(slug: string) {
    const res = await fetch(
        `${API_URL}/api/v2/pages/?type=landing.CityLandingPage&slug=${slug}&fields=*`,
        { next: { revalidate: 300 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.items?.[0] || null  // ← this must be items[0]
}

async function getCenter(slug: string) {
    const res = await fetch(`${API_URL}/api/listings/${slug}/`, {
        next: { revalidate: 300 },
    })
    if (!res.ok) return null
    return res.json()
}

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params

    const cityPage = await getCityPage(slug)
    if (cityPage) {
        return {
            title: cityPage.seo_title_override || cityPage.hero_title,
            description: cityPage.seo_description || cityPage.hero_subtitle,
        }
    }

    const center = await getCenter(slug)
    if (center) {
        return {
            title: center.seo_title || center.name,
            description: center.seo_description || center.short_description,
        }
    }

    return {}
}

export default async function SlugPage({ params }: PageProps) {
    const { slug } = await params

    // 1. Try city landing page first
    const cityPage = await getCityPage(slug)
    if (cityPage) {
        return (
            <div className="min-h-screen bg-white text-slate-800 font-sans antialiased mb-16">
                <Header />
                {/* <LandingHero
                    title={cityPage.hero_title}
                    subtitle={cityPage.hero_subtitle}
                    image={cityPage.hero_image?.meta?.download_url}
                />*/}
                <HeaderBanner
                    title={cityPage.hero_title}
                    subtitle={cityPage.hero_subtitle}
                    breadcrumbs={[
                        { label: 'Home', href: '/' },
                        { label: cityPage.title },
                    ]}
                />
                {cityPage.intro && (
                    <div className="w-full px-4 sm:px-6 lg:px-12 pt-6 pb-20">
                        <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: cityPage.intro }} />
                    </div>
                )}
                <ListingSection defaultCity={cityPage.default_city} defaultTreatment="" />
                {cityPage.about && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: cityPage.about }} />
                    </div>
                )}
                {cityPage.city_faqs?.length > 0 && <LandingFAQ faqs={cityPage.city_faqs} />}
                <Footer />
            </div>
        )
    }

    // 2. Try rehab center listing
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
                <div className="w-full px-6 sm:px-12 lg:px-12 mt-8 mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <main className="col-span-1 lg:col-span-9">
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
                        <aside className="col-span-1 lg:col-span-3">
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

    // 3. Nothing found
    return notFound()
}