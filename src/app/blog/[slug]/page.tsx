import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ChevronLeft, Clock, Share2, Tag } from 'lucide-react'
import { notFound } from 'next/navigation'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface BlogPostDetail {
  id: number
  title: string
  intro?: string
  body: string
  published_date?: string
  featured_image?: {
    full_url: string
    alt?: string
  }
  category?: {
    name: string
  } | null
  meta: {
    slug: string
    first_published_at: string
    seo_title?: string
    search_description?: string
  }
}

async function getBlogPost(slug: string): Promise<BlogPostDetail | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/v2/pages/?type=blog.BlogDetailPage&slug=${slug}&fields=*`,
      { next: { revalidate: 300 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.items?.[0] || null
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

async function getRecentPosts(currentSlug: string): Promise<any[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/v2/pages/?type=blog.BlogDetailPage&fields=title,featured_image,published_date&limit=5`,
      { next: { revalidate: 300 } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.items || []).filter((item: any) => item.meta.slug !== currentSlug).slice(0, 3)
  } catch (error) {
    console.error('Error fetching recent posts:', error)
    return []
  }
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.meta.seo_title || `${post.title} | RetreatIndia`,
    description: post.meta.search_description || post.intro || 'Read our latest blog article.',
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return notFound()
  }

  const recentPosts = await getRecentPosts(slug)
  const fallbackImage = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  const imageUrl = post.featured_image?.full_url || fallbackImage

  // Basic estimation of read time: ~200 words per minute
  const wordCount = post.body ? post.body.split(/\s+/).length : 0
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="min-h-screen text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white">
      <Header />

      <main className=" relative w-full px-6 sm:px-12 lg:px-12 mt-12 mb-16">
        {/* Navigation Breadcrumbs & Back button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <nav className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <Link href="/" className="hover:text-brand-blue transition">Home</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-brand-blue transition">Blog</Link>
            <span>›</span>
            <span className="text-slate-700 line-clamp-1">{post.title}</span>
          </nav>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Blog Listing
          </Link>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Article column */}
          <article className="lg:col-span-8 bg-white border border-slate-200/50 rounded-3xl p-6 sm:p-10 shadow-sm">
            {/* Header info */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-4">
                <span className="font-semibold text-teal-600 uppercase tracking-wider flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  {post.category?.name || 'Recovery & Wellness'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.published_date
                    ? new Date(post.published_date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                    : 'Recent'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readTime} min read
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-brand-blue leading-tight mb-4">
                {post.title}
              </h1>

              {post.intro && (
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed italic border-l-4 border-teal-500 pl-4 py-1 my-6 bg-slate-50/50 rounded-r-lg">
                  {post.intro.replace(/<[^>]*>/g, '')}
                </p>
              )}
            </div>

            {/* Featured Image */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 bg-slate-100 shadow-inner">
              <Image
                src={imageUrl}
                alt={post.featured_image?.alt || post.title}
                fill
                unoptimized
                priority
                className="object-cover"
              />
            </div>

            {/* Body html content */}
            {post.body && (
              <div
                className="prose max-w-none text-slate-700 leading-relaxed space-y-6
                  [&>p]:text-sm [&>p]:sm:text-base [&>p]:leading-relaxed
                  [&>h2]:text-xl [&>h2]:sm:text-2xl [&>h2]:font-serif [&>h2]:text-brand-blue [&>h2]:font-bold [&>h2]:pt-4 [&>h2]:pb-2
                  [&>h3]:text-lg [&>h3]:sm:text-xl [&>h3]:font-serif [&>h3]:text-brand-blue [&>h3]:font-bold [&>h3]:pt-3 [&>h3]:pb-1
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ul]:text-sm [&>ul]:sm:text-base
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>ol]:text-sm [&>ol]:sm:text-base
                  [&>blockquote]:border-l-4 [&>blockquote]:border-teal-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-600
                  [&_a]:text-teal-600 [&_a]:underline hover:[&_a]:text-teal-700"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            )}
          </article>

          {/* Sidebar column */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Search or promo box / CTA */}


            {/* Recent Posts Widget */}
            {recentPosts.length > 0 && (
              <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm">
                <h3 className="font-serif text-base text-brand-blue font-bold mb-4 pb-2 border-b border-slate-100">
                  Recent Articles
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((rPost, idx) => {
                    const rImg = rPost.featured_image?.full_url || fallbackImage
                    return (
                      <div key={rPost.id} className="flex gap-3 items-center">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                          <Image
                            src={rImg}
                            alt={rPost.title}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <Link href={`/blog/${rPost.meta.slug}`}>
                            <h4 className="text-xs sm:text-sm font-bold text-brand-blue hover:text-teal-600 transition leading-snug line-clamp-2">
                              {rPost.title}
                            </h4>
                          </Link>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {rPost.published_date
                              ? new Date(rPost.published_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })
                              : 'Recent'}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="bg-[#f8f3ea] border border-slate-200/50 rounded-3xl p-6 shadow-sm">
              <h3 className="font-serif text-lg text-brand-blue font-bold mb-3">
                Need Professional Recovery Support?
              </h3>
              <p className="text-xs text-[#8e8070] leading-relaxed mb-6">
                Explore customized, verified rehabilitation programs and center listings designed for detox, wellness, and mental healing.
              </p>
              <Link
                href="/rehabs"
                className="block text-center py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
              >
                Find Rehab Centers
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
