import { Suspense } from 'react'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'
import ListingSection from '@/components/rehabs/ListingSection'

export const metadata = {
    title: 'Search Rehab Centers | RecoverIndia',
    description: 'Search and filter rehabilitation centers across India.',
}

export default function SearchPage() {
    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans antialiased">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
                <h1 className="text-2xl sm:text-3xl font-serif text-slate-800 mb-1">
                    Search Rehab Centers
                </h1>
                <p className="text-slate-500 text-sm">
                    Filter by location, treatment type, price range and more.
                </p>
            </div>
            <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading...</div>}>
                <ListingSection />
            </Suspense>
            <Footer />
        </div>
    )
}