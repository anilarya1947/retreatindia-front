"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, X } from 'lucide-react'

const POINTS = [
    'Expert-Led Recovery Duration Planning',
    'Care Focused on Genuine Clinical Needs',
    'No Unnecessary Extensions or Inflated Costs',
]

export default function EvaluationSection() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <div className="px-6 sm:px-12 lg:px-12 mt-20">
            <div className="relative rounded-[32px] overflow-hidden">

                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/homepage/bgvideo.png"
                        alt=""
                        fill
                        className="object-cover object-center"
                    />
                    {/* Subtle overlay for readability */}
                    <div className="absolute inset-0 bg-[#fafafa]" />
                </div>

                {/* Decorative blobs */}
                <div className="absolute bottom-20 left-20 w-70 h-50  -translate-x-1/3 translate-y-1/3 pointer-events-none z-0">
                    <img src="/images/homepage/sneha-bg-green-quad.png" alt="" />
                    {/* <img src="/images/homepage/sneha-bg-blue-quad.png" alt="" /> */}
                </div>
                <div className="absolute top-20 right-1/3 w-100 h-40  -translate-y-1/2 pointer-events-none z-0" >
                    <img src="/images/homepage/sneha-bg-blue-quad.png" alt="" />
                </div>

                {/* Content grid */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center p-8 sm:p-12 lg:p-16">

                    {/* Left — text */}
                    <div className="space-y-6 order-2 md:order-1">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#318bb0] leading-tight">
                            RecoverIndia.Org – Trusted Rehab Discovery with Optimum Recovery Planning
                        </h2>

                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md">
                            Personalized recovery planning matters to us. Through expert-led evaluations and ethical guidance, we help families choose the most appropriate treatment duration — ensuring effective care without unnecessary extensions or avoidable expenses.
                        </p>

                        <ul className="space-y-3">
                            {POINTS.map((point) => (
                                <li key={point} className="flex items-center gap-3">
                                    <span className="w-6 h-6 flex items-center justify-center shrink-0">
                                        <img src="/images/homepage/star-tick.png" alt="" />
                                    </span>
                                    <span className="text-sm sm:text-lg font-semibold text-[#2b9175]">{point}</span>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#3bb89b] hover:bg-[#2da588] text-white font-extrabold text-xs tracking-widest uppercase rounded-full shadow transition"
                        >
                            EXPLORE MORE
                        </Link>
                    </div>

                    {/* Right — image with play button */}
                    <div className="relative flex items-center justify-center order-1 md:order-2">
                        {/* Doctor image */}
                        <div className="relative w-full aspect-[4/2.5] rounded-[28px] overflow-hidden">
                            <Image
                                src="/images/homepage/snehavideo.png"
                                alt="Dr. Sneha Sharma"
                                fill
                                className="object-cover object-center"
                            />
                        </div>

                        {/* Play button — centered over image */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="absolute inset-0 flex items-center justify-center group"
                            aria-label="Play video"
                        >

                            <span className="absolute w-20 h-20 rounded-full bg-[#3bb89b]/30 animate-ping" />
                            <span className="absolute w-16 h-16 rounded-full bg-[#3bb89b]/20" />

                            <span className="relative z-10 w-16 h-16 drop-shadow-xl group-hover:scale-110 transition duration-300">
                                <Image
                                    src="/images/homepage/play-icon.png"
                                    alt="Play"
                                    fill
                                    className="object-contain"
                                />
                            </span>
                        </button>
                    </div>

                </div>
            </div>

            {/* Video Modal Popup */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-white hover:text-slate-300 z-50 p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Video Element */}
                        <video
                            src="/videos/sneha-video.mp4"
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            )}
        </div >
    )
}