import React from 'react'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'
import RehabGallery from '@/components/rehabs/RehabGallery'
import RehabSidebar from '@/components/rehabs/RehabSidebar'
import RehabMainDetails from '@/components/rehabs/RehabMainDetails'
import { notFound } from 'next/navigation'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

async function getCenter(slug: string) {
  const res = await fetch(`${API_URL}/api/listings/${slug}/`, {
    next: { revalidate: 300 },
  })
  if (!res.ok) return null
  return res.json()
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function RehabDetailPage({ params }: PageProps) {
  const { id } = await params
  const center = await getCenter(id)

  if (!center) return notFound()

  const images = (center.photos || []).map((p: any) => p.image)

  return (
    <div className="min-h-screen bg-[#faf9f6]/30 text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
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

      <div className="w-full px-6 sm:px-12 lg:px-12 pt-8">
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