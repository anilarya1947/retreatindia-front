'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface BlogPost {
  id: number
  title: string
  meta: { slug: string }
  excerpt?: string
  intro?: string
  featured_image?: { full_url: string }
}

export default function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/v2/pages/?type=blog.BlogDetailPage&fields=title,intro,featured_image&limit=15`)
      .then((r) => r.json())
      .then((data) => setPosts(data.items || []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
  ]

  if (loading) {
    return (
      <section className="pt-20 bg-white">
        <div className="px-6 sm:px-12 lg:px-12">
          <div className="h-8 bg-slate-200 rounded w-48 mb-4 animate-pulse" />
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="break-inside-avoid mb-6 bg-slate-100 rounded-[20px] h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) return null

  return (
    <section id="blogs" className="pt-20 bg-white text-slate-800">
      <div className="px-6 sm:px-12 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-blue tracking-tight">Blogs & Articles</h2>
            <p className="text-slate-500 text-sm mt-1">
              Discover recovery insights, treatment guidance, and mental wellness educational resources
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition"
          >
            More Blogs
          </Link>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-6">
          {posts.map((post, idx) => {
            const image = post.featured_image?.full_url || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length]
            const excerpt = post.intro || ''

            return (
              <div
                key={post.id}
                className="break-inside-avoid mb-6 bg-[#fcfaf7] border border-slate-200/60 rounded-[20px] p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition duration-300"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full rounded-[14px] overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={image}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                  <Link href={`/blog/${post.meta.slug}`}>
                    <h3 className="font-bold text-brand-blue text-sm sm:text-base underline leading-snug mb-2 line-clamp-3 hover:opacity-80 transition">
                      {post.title}
                    </h3>
                  </Link>
                  {excerpt && (
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-4 mb-4">
                      {excerpt.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                </div>
                <div className="flex justify-end">
                  <Link
                    href={`/blog/${post.meta.slug}`}
                    className="w-8 h-8 rounded-full bg-[#50cfbe] text-white flex items-center justify-center shadow hover:bg-[#3fbfae] transition"
                    aria-label="Read full article"
                  >
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}