'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Check, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react'

// Tag color variants cycling
const TAG_COLORS = [
  { border: 'border-l-[#3bb89b]', bg: 'bg-white' },
  { border: 'border-l-[#f5a76c]', bg: 'bg-white' },
  { border: 'border-l-[#318bb0]', bg: 'bg-white' },
]

function Tag({ label, idx }: { label: string; idx: number }) {
  const { border, bg } = TAG_COLORS[idx % TAG_COLORS.length]
  return (
    <span className={`inline-flex items-center border-l-4 ${border} bg-[#F7F7F7] text-[#777777] text-sm font-semibold px-3 py-1.5 rounded-r-xl rounded-l-lg`}>
      {label}
    </span>
  )
}

interface Treatment { id: number; name: string; slug: string }
interface Amenity { id: number; name: string; slug: string }
interface TeamMember { id: number; name: string; role: string; qualification: string; photo: string }
interface AboutSection { id: number; title: string; description: string; image: string }

interface RehabMainDetailsProps {
  name?: string
  description?: string
  shortDescription?: string
  treatmentTypes?: Treatment[]
  amenities?: Amenity[]
  // highlights
  address?: string
  city?: string
  state?: string
  languages?: string[]
  surrounding?: string
  experienceYears?: number
  minProgramDuration?: string
  totalRooms?: number
  totalBeds?: number
  // facilities
  inRoomFacilities?: string[]
  centerFacilities?: string[]
  recreationalActivities?: string[]
  therapies?: string[]
  // relations
  teamMembers?: TeamMember[]
  aboutSections?: AboutSection[]
  videos?: string[]
  patientProfiles?: string[]
}

const SURROUNDING_LABEL: Record<string, string> = {
  mountains: 'Mountains', beach: 'Beach', farm: 'Farm/Garden',
  forest: 'Forest', city: 'City', lake: 'Lake/Riverside',
}

function toYouTubeEmbed(url: string): string {
  // Handle youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`

  // Handle youtube.com/watch?v=VIDEO_ID
  const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/)
  if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`

  // Already an embed URL or other format — return as-is
  return url
}
export default function RehabMainDetails({
  name = '',
  description,
  shortDescription,
  treatmentTypes = [],
  amenities = [],
  address,
  city,
  state,
  languages = [],
  surrounding,
  experienceYears,
  minProgramDuration,
  totalRooms,
  totalBeds,
  inRoomFacilities = [],
  centerFacilities = [],
  recreationalActivities = [],
  therapies = [],
  teamMembers = [],
  aboutSections = [],
  videos = [],
  patientProfiles = [],
}: RehabMainDetailsProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [teamPage, setTeamPage] = useState(0)
  const [videoPage, setVideoPage] = useState(0)
  const TEAM_PER_PAGE = 4

  const toggleFaq = (i: number) => setActiveFaq((prev) => (prev === i ? null : i))

  const teamPages = Math.ceil(teamMembers.length / TEAM_PER_PAGE)
  const visibleTeam = teamMembers.slice(teamPage * TEAM_PER_PAGE, (teamPage + 1) * TEAM_PER_PAGE)

  return (
    <div className="space-y-10 pr-8">

      {/* ── 1. About ── */}
      {(shortDescription || description) && (
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif leading-tight" style={{ color: '#318bb0' }}>
            About {name}
          </h2>
          {shortDescription && (
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{shortDescription}</p>
          )}
          {description && (
            <div
              className="text-slate-600 text-sm leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br/>') }}
            />
          )}
          <hr className="border-slate-200 mt-6" />
        </section>
      )}

      {/* ── 2. Center Highlights ── */}
      {(address || experienceYears || minProgramDuration || languages.length > 0 || totalRooms || surrounding) && (
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif leading-tight" style={{ color: '#318bb0' }}>
            Center Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {address && (
              <div className="flex items-start gap-3">
                <div className="relative h-6 w-6">
                  <Image src="/images/homepage/star-tick.png" alt="RCI" fill className="object-contain" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Address:</p>
                  <p className="text-sm text-slate-500">{address}{city ? `, ${city}` : ''}</p>
                </div>
              </div>
            )}
            {experienceYears && (
              <div className="flex items-start gap-3">
                <div className="relative h-6 w-6">
                  <Image src="/images/homepage/star-tick.png" alt="RCI" fill className="object-contain" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Experience:</p>
                  <p className="text-sm text-slate-500">{experienceYears} years</p>
                </div>
              </div>
            )}
            {minProgramDuration && (
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: '#3bb89b' }}>
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">Min. Program Duration:</p>
                  <p className="text-sm text-slate-500">{minProgramDuration}</p>
                </div>
              </div>
            )}
            {languages.length > 0 && (
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: '#3bb89b' }}>
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">Language:</p>
                  <p className="text-sm text-slate-500">{languages.join(', ')}</p>
                </div>
              </div>
            )}
            {(totalRooms || totalBeds) && (
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: '#3bb89b' }}>
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">Occupancy:</p>
                  <p className="text-sm text-slate-500">
                    {totalRooms ? `${totalRooms} Rooms` : ''}{totalRooms && totalBeds ? ', ' : ''}{totalBeds ? `${totalBeds} beds` : ''}
                  </p>
                </div>
              </div>
            )}
            {surrounding && (
              <div className="flex items-start gap-3">
                <div className="relative h-6 w-6">
                  <Image src="/images/homepage/star-tick.png" alt="RCI" fill className="object-contain" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Surroundings:</p>
                  <p className="text-sm text-slate-500">{SURROUNDING_LABEL[surrounding] || surrounding}</p>
                </div>
              </div>
            )}
          </div>
          <hr className="border-slate-200 mt-6" />
        </section>
      )}


      {/* ── 4. More About Center ── */}
      {aboutSections.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif leading-tight" style={{ color: '#318bb0' }}>
            More about Center
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {aboutSections.map((section) => (
              <div key={section.id} className="space-y-3">
                {section.image && (
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                    <Image src={section.image} alt={section.title} fill unoptimized className="object-cover" />
                  </div>
                )}
                <h4 className="text-lg font-medium uppercase tracking-normal" style={{ color: '#318bb0' }}>
                  {section.title}
                </h4>
                <p className="text-base text-[#777777] leading-tight">{section.description}</p>
              </div>
            ))}
          </div>
          <hr className="border-slate-200 mt-6" />
        </section>
      )}


      {/* ── 5. Center Videos ── */}
      {videos.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif leading-tight" style={{ color: '#318bb0' }}>
            Center Videos
          </h2>
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-video">
            <iframe
              src={toYouTubeEmbed(videos[videoPage])}
              title={`Center video ${videoPage + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
            {videos.length > 1 && (
              <>
                <button
                  onClick={() => setVideoPage((p) => (p === 0 ? videos.length - 1 : p - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700" />
                </button>
                <button
                  onClick={() => setVideoPage((p) => (p === videos.length - 1 ? 0 : p + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 flex items-center justify-center shadow"
                >
                  <ChevronRight className="w-5 h-5 text-slate-700" />
                </button>
              </>
            )}
          </div>
          <hr className="border-slate-200 mt-6" />
        </section>
      )}


      {/* ── 3. Explore Your Care Options ── */}
      {(treatmentTypes.length > 0 || therapies.length > 0 || patientProfiles.length > 0 || amenities.length > 0) && (
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif leading-tight" style={{ color: '#318bb0' }}>
            Explore Your Care Options
          </h2>

          {treatmentTypes.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-bold" style={{ color: '#318bb0' }}>Treatments</h4>
              <div className="flex flex-wrap gap-2">
                {treatmentTypes.map((t, idx) => <Tag key={t.id} label={t.name} idx={idx} />)}
              </div>
            </div>
          )}

          {therapies.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-bold" style={{ color: '#318bb0' }}>Therapies</h4>
              <div className="flex flex-wrap gap-2">
                {therapies.map((t, idx) => <Tag key={t} label={t} idx={idx} />)}
              </div>
            </div>
          )}

          {patientProfiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-bold" style={{ color: '#318bb0' }}>Patient Profile</h4>
              <div className="flex flex-wrap gap-2">
                {patientProfiles.map((p, idx) => <Tag key={p} label={p} idx={idx} />)}
              </div>
            </div>
          )}

          {amenities.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-lg font-bold" style={{ color: '#318bb0' }}>Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {amenities.map((a, idx) => <Tag key={a.id} label={a.name} idx={idx} />)}
              </div>
            </div>
          )}
          <hr className="border-slate-200 mt-6" />
        </section>
      )}



      {/* ── 6. Healing Designed Around Your Needs ── */}
      {(inRoomFacilities.length > 0 || centerFacilities.length > 0 || recreationalActivities.length > 0) && (
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif leading-tight mb-1" style={{ color: '#318bb0' }}>
              Healing Designed Around Your Needs
            </h2>
          </div>

          {[
            { title: 'In-Room Facilities', items: inRoomFacilities },
            { title: 'Center Facilities', items: centerFacilities },
            { title: 'Recreational Activities', items: recreationalActivities },
          ].filter((s) => s.items.length > 0).map(({ title, items }) => (
            <div key={title}>
              <h4 className="text-base font-bold mb-4" style={{ color: '#318bb0' }}>{title}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {items.map((fac) => (
                  <div key={fac} className="flex items-start gap-2.5 text-slate-600 text-sm">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: '#3bb89b' }}>
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </span>
                    <span>{fac}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <hr className="border-slate-200 mt-6" />
        </section>
      )}

      {/* ── 7. Care Team ── */}
      {teamMembers.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif leading-tight" style={{ color: '#318bb0' }}>
            Center's Care Team
          </h2>
          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {visibleTeam.map((member) => (
                <div key={member.id} className="flex flex-col items-center text-center gap-3">
                  <div
                    className="relative w-32 h-48  overflow-hidden"
                  >
                    {member.photo ? (
                      <Image src={member.photo} alt={member.name} fill unoptimized className="object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300 text-3xl font-bold">
                        {member.name[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: '#318bb0' }}>{member.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{member.role}</p>
                    {member.qualification && (
                      <p className="text-xs text-slate-400 mt-0.5">{member.qualification}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Team navigation */}
            {teamPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setTeamPage((p) => Math.max(0, p - 1))}
                  disabled={teamPage === 0}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center disabled:opacity-30 hover:border-[#3bb89b] transition"
                  style={{ color: '#3bb89b' }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setTeamPage((p) => Math.min(teamPages - 1, p + 1))}
                  disabled={teamPage === teamPages - 1}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center disabled:opacity-30 hover:border-[#3bb89b] transition"
                  style={{ color: '#3bb89b' }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
          <hr className="border-slate-100 mt-6" />
        </section>
      )}

      {/* ── 8. FAQs ── */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-serif leading-tight" style={{ color: '#318bb0' }}>FAQs</h2>
        <div className="space-y-3">
          {[
            { q: 'How do I choose the right rehab centre?', a: 'The right rehabilitation centre depends on clinical needs, treatment goals, budget, environment preferences, and required level of care support.' },
            { q: 'What treatment programs do rehabilitation centres offer?', a: 'Most premier centers offer medical detox, residential inpatient recovery, dual diagnosis treatment, counseling, and lifestyle wellness therapies.' },
            { q: 'How long does a rehabilitation program usually last?', a: 'Programs normally range from 30 days to 90 days, though specialized post-clinical recovery stays can extend longer based on medical evaluation.' },
            { q: 'Are luxury rehabilitation centres more effective?', a: 'Luxury centers offer enhanced privacy, better staff-to-patient ratios, private rooms, and superior therapeutic amenities — all leading to more sustainable recovery.' },
            { q: 'Can rehabilitation centres support mental wellness conditions?', a: 'Yes. Clinical rehabs are staffed by licensed psychiatrists, psychologists, and nurses equipped to treat depression, anxiety, bipolar disorder, and severe PTSD.' },
            { q: 'Is privacy maintained during treatment and recovery?', a: 'Absolutely. Strict non-disclosure policies, private check-ins, and isolated retreat locations protect all patients.' },
            { q: 'Can I compare rehabilitation centres before deciding?', a: 'Yes — RecoverIndia.Org helps you compare facilities across India by location, surroundings, treatments, amenities, and budgets.' },
            { q: 'Does RecoverIndia.Org directly provide treatment services?', a: 'No. RecoverIndia.Org is an independent verification network. We evaluate centers and help families find verified partners free of charge.' },
          ].map((faq, idx) => {
            const isOpen = activeFaq === idx
            return (
              <div key={idx} className="border border-slate-200/60 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none"
                >
                  <span className="font-semibold text-sm" style={{ color: '#318bb0' }}>{faq.q}</span>
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: '#3bb89b' }}
                  >
                    {isOpen
                      ? <Minus className="w-3.5 h-3.5 text-white" />
                      : <Plus className="w-3.5 h-3.5 text-white" />
                    }
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-slate-500 text-sm leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}