import { notFound } from 'next/navigation'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'
import LandingHero from '@/components/landing/LandingHero'
import LandingListings from '@/components/landing/LandingListings'
import LandingFAQ from '@/components/landing/LandingFAQ'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getTreatmentPage(slug: string) {
    const res = await fetch(
        `${API_URL}/api/v2/pages/?type=landing.TreatmentLandingPage&slug=${slug}&fields=*`,
        { next: { revalidate: 300 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.items?.[0] || null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const page = await getTreatmentPage(slug)
    if (!page) return {}
    return {
        title: page.seo_title_override || page.hero_title,
        description: page.seo_description || page.hero_subtitle,
    }
}

export default async function TreatmentLandingPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const page = await getTreatmentPage(slug)
    if (!page) return notFound()

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans antialiased">
            <Header />

            <LandingHero
                title={page.hero_title}
                subtitle={page.hero_subtitle}
                image={page.hero_image?.meta?.download_url}
            />

            {page.intro && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div
                        className="prose prose-slate max-w-none"
                        dangerouslySetInnerHTML={{ __html: page.intro }}
                    />
                </div>
            )}

            <LandingListings
                defaultCity=""
                defaultTreatment={page.default_treatment_slug}
            />

            {page.about && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div
                        className="prose prose-slate max-w-none"
                        dangerouslySetInnerHTML={{ __html: page.about }}
                    />
                </div>
            )}

            {page.treatment_faqs?.length > 0 && (
                <LandingFAQ faqs={page.treatment_faqs} />
            )}

            <Footer />
        </div>
    )
}