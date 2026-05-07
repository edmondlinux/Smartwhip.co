import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { getAllPosts, getAllCategories } from '@/lib/blog/posts';

const BASE_URL = process.env.BASE_URL || 'https://www.smartwhip.co';

export const metadata: Metadata = {
  title: 'SmartWhip Blog | UK Cream Charger Guides, Reviews & News',
  description: 'Expert guides, product reviews, and industry news for UK cream charger professionals. SmartWhip, FastGas, Cream Deluxe — everything you need to know.',
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    title: 'SmartWhip Blog | UK Cream Charger Guides & Reviews',
    description: 'Expert guides, product reviews, and industry news for UK cream charger professionals.',
    images: ['/og_image/og_image.jpeg'],
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Reviews: 'rgba(255,98,0,0.15)',
  Comparisons: 'rgba(99,102,241,0.15)',
  Guides: 'rgba(34,197,94,0.12)',
  Delivery: 'rgba(6,182,212,0.12)',
  Catering: 'rgba(245,158,11,0.12)',
};
const CATEGORY_TEXT: Record<string, string> = {
  Reviews: 'rgb(255,98,0)',
  Comparisons: 'rgb(99,102,241)',
  Guides: 'rgb(34,197,94)',
  Delivery: 'rgb(6,182,212)',
  Catering: 'rgb(245,158,11)',
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>

      {/* NAV */}
      <header className="glass border-b sticky top-0 z-50" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="text-base font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
            Smart<span style={{ color: 'var(--orange)' }}>Whip</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              Home
            </Link>
            <Link href="/blog" className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--orange)' }}>
              Blog
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16">

        {/* Page header */}
        <div className="mb-14">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>
            Knowledge Base
          </span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-2 mb-4" style={{ color: 'var(--foreground)' }}>
            The SmartWhip Blog
          </h1>
          <p className="text-sm font-medium max-w-xl" style={{ color: 'var(--muted)' }}>
            Professional guides, product reviews, and buying advice for UK cream charger users. Written for caterers, chefs, and food professionals.
          </p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          <span
            className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border"
            style={{ borderColor: 'var(--orange)', color: 'var(--orange)', background: 'rgba(255,98,0,0.08)' }}
          >
            All Posts
          </span>
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border"
              style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--surface)' }}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-3xl border overflow-hidden mb-10 transition-all hover:border-orange-500/40"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Text */}
              <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
                      style={{
                        background: CATEGORY_COLORS[featured.category] ?? 'rgba(255,98,0,0.15)',
                        color: CATEGORY_TEXT[featured.category] ?? 'var(--orange)',
                      }}
                    >
                      {featured.category}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--orange)' }}>
                      Featured
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight leading-tight mb-4" style={{ color: 'var(--foreground)' }}>
                    {featured.title}
                  </h2>
                  <p className="text-sm font-medium leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                    {featured.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>
                      <Clock className="h-3 w-3" />
                      {featured.readTime} min read
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>
                      {new Date(featured.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-transform group-hover:translate-x-1"
                    style={{ color: 'var(--orange)' }}
                  >
                    Read Article <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
              {/* Visual panel */}
              <div
                className="hidden lg:flex lg:col-span-2 items-center justify-center p-12"
                style={{ background: 'var(--surface-elevated)', borderLeft: '1px solid var(--border)' }}
              >
                <div className="text-center">
                  <div className="text-7xl font-black uppercase tracking-tight leading-none mb-2" style={{ color: 'var(--orange)', opacity: 0.15 }}>
                    {featured.category.slice(0, 3).toUpperCase()}
                  </div>
                  <div className="text-sm font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                    {featured.category}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl border overflow-hidden flex flex-col transition-all hover:border-orange-500/40"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              {/* Category colour bar */}
              <div
                className="h-1 w-full"
                style={{ background: CATEGORY_TEXT[post.category] ?? 'var(--orange)' }}
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
                    style={{
                      background: CATEGORY_COLORS[post.category] ?? 'rgba(255,98,0,0.15)',
                      color: CATEGORY_TEXT[post.category] ?? 'var(--orange)',
                    }}
                  >
                    {post.category}
                  </span>
                </div>
                <h2 className="text-base font-black uppercase tracking-tight leading-snug mb-3 flex-grow" style={{ color: 'var(--foreground)' }}>
                  {post.title}
                </h2>
                <p className="text-xs font-medium leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>
                  {post.excerpt.slice(0, 120)}…
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>
                      <Clock className="h-3 w-3" />
                      {post.readTime} min
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>
                      {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" style={{ color: 'var(--orange)' }} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tags cloud */}
        <div className="mt-16 pt-12 border-t" style={{ borderColor: 'var(--border)' }}>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] mb-4 block" style={{ color: 'var(--orange)' }}>
            Browse by Topic
          </span>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(posts.flatMap((p) => p.tags))).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--surface)' }}
              >
                <Tag className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t py-8 mt-10" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 flex flex-col gap-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
              Smart<span style={{ color: 'var(--orange)' }}>Whip</span>
            </Link>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--muted-dim)' }}>
              © 2026 SmartWhip UK — Professional N₂O Supply
            </p>
            <nav className="flex gap-5">
              <Link href="/" className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Home</Link>
              <Link href="/blog" className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Blog</Link>
              <Link href="/contact" className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Contact</Link>
            </nav>
          </div>
          <div className="flex justify-center items-center gap-5 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
            <a href="https://apexwhips.com" target="_blank" rel="noopener" className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-orange-500" style={{ color: 'var(--muted-dim)' }}>
              ApexWhips.com
            </a>
            <span style={{ color: 'var(--border)' }}>·</span>
            <a href="https://smartwhip.org.uk" target="_blank" rel="noopener" className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-orange-500" style={{ color: 'var(--muted-dim)' }}>
              SmartWhip.org.uk
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
