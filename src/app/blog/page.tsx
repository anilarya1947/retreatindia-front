import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Calendar, ArrowRight } from 'lucide-react'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface BlogPost {
  id: number
  title: string
  meta: {
    slug: string
    first_published_at: string
  }
  intro?: string
  published_date?: string
  featured_image?: {
    full_url: string
    alt?: string
  }
  category?: {
    name: string
  } | null
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/v2/pages/?type=blog.BlogDetailPage&fields=title,intro,featured_image,published_date,category&limit=20`,
      { next: { revalidate: 300 } }
    )
    if (!res.ok) {
      console.error('Failed to fetch blog posts', res.statusText)
      return []
    }
    const data = await res.json()
    return data.items || []
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export const metadata = {
  title: 'Blogs & Articles | RetreatIndia',
  description: 'Discover recovery insights, treatment guidance, and mental wellness educational resources from RetreatIndia.',
}

export default async function BlogListingPage() {
  const posts = await getBlogPosts()

  const FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
  ]

  // Find the first post to show as featured (main highlight card)
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div className="min-h-screen text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
      <Header />

      {/* Main Container */}
      <main className="w-full px-6 sm:px-12 lg:px-12 mt-12 mb-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 px-3 py-1 bg-teal-50 rounded-full">
            Resources & Insights
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#318bb0] mt-4 mb-6 leading-tight">
            Blogs & Articles
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Stay informed with the latest insights on mental wellness, addiction recovery, treatment guidance, and holistic health practices.
          </p>
        </div>

        {/* Featured Post (Big Card) */}
        {featuredPost && (
          <div className="mb-16 bg-white rounded-3xl border border-slate-200/60 overflow-hidden shadow-sm hover:shadow-md transition duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[300px] bg-slate-100">
                <Image
                  src={featuredPost.featured_image?.full_url || FALLBACK_IMAGES[0]}
                  alt={featuredPost.title}
                  fill
                  unoptimized
                  priority
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                    <span className="font-semibold text-teal-600 uppercase tracking-wider">
                      {featuredPost.category?.name || 'Recovery'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.published_date
                        ? new Date(featuredPost.published_date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                        : 'Recent'}
                    </span>
                  </div>
                  <Link href={`/blog/${featuredPost.meta.slug}`}>
                    <h2 className="text-2xl sm:text-3xl font-serif text-brand-blue hover:text-teal-600 transition leading-tight mb-4">
                      {featuredPost.title}
                    </h2>
                  </Link>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-4">
                    {featuredPost.intro?.replace(/<[^>]*>/g, '') || ''}
                  </p>
                </div>
                <Link
                  href={`/blog/${featuredPost.meta.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-700 transition group self-start"
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog Post Grid */}
        {remainingPosts.length > 0 ? (
          <div>
            <h3 className="text-xl font-bold text-brand-blue mb-8 border-b border-slate-200 pb-4">
              Latest Publications
            </h3>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-6">
              {remainingPosts.map((post, idx) => {
                const image = post.featured_image?.full_url || FALLBACK_IMAGES[(idx + 1) % FALLBACK_IMAGES.length]
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
        ) : (
          !featuredPost && (
            <div className="text-center py-20 text-slate-500">
              No articles published yet. Check back soon!
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  )
}
