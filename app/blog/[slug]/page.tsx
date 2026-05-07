import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag, MessageCircle, Send, ArrowRight } from 'lucide-react';
import { getPostBySlug, getAllPosts, type BlogPost } from '@/lib/blog/posts';

const BASE_URL = process.env.BASE_URL || 'https://smartwhip.co';
const WHATSAPP_BASE = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/447476690829';
const TELEGRAM_BASE = process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://wa.me/447476690829';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.tags,
      images: ['/og_image/og_image.jpeg'],
    },
    twitter: { card: 'summary_large_image', images: ['/og_image/og_image.jpeg'] },
  };
}

const CATEGORY_TEXT: Record<string, string> = {
  Reviews: 'rgb(255,98,0)',
  Comparisons: 'rgb(99,102,241)',
  Guides: 'rgb(34,197,94)',
  Delivery: 'rgb(6,182,212)',
  Catering: 'rgb(245,158,11)',
};

function ArticleSchema({ post }: { post: BlogPost }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${BASE_URL}/blog/${post.slug}/#article`,
    headline: post.title,
    name: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'SmartWhip UK',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'SmartWhip UK',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/favicon/apple-touch-icon.png`,
        width: 180,
        height: 180,
      },
    },
    image: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/og_image/og_image.jpeg`,
      width: 1200,
      height: 630,
    },
    keywords: post.tags.join(', '),
    url: `${BASE_URL}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${BASE_URL}/blog`,
      name: 'SmartWhip UK Blog',
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    </>
  );
}

function OrderCTA({ message }: { message: string }) {
  const encoded = encodeURIComponent('Hello, I am interested in ordering SmartWhip. Can you help?');
  const wa = WHATSAPP_BASE.includes('?') ? `${WHATSAPP_BASE}&text=${encoded}` : `${WHATSAPP_BASE}?text=${encoded}`;
  const tg = TELEGRAM_BASE.includes('?') ? `${TELEGRAM_BASE}&text=${encoded}` : `${TELEGRAM_BASE}?text=${encoded}`;

  return (
    <div className="rounded-3xl border p-8 my-8" style={{ background: 'var(--surface)', borderColor: 'var(--orange)', borderWidth: '1px' }}>
      <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-2" style={{ color: 'var(--orange)' }}>
        Ready to Order?
      </span>
      <p className="text-base font-black uppercase tracking-tight mb-5" style={{ color: 'var(--foreground)' }}>
        {message}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all hover:opacity-90"
          style={{ background: '#25D366' }}
        >
          <MessageCircle className="h-4 w-4" />
          Order via WhatsApp
        </a>
        <a
          href={tg}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-white transition-all hover:opacity-90"
          style={{ background: '#0088cc' }}
        >
          <Send className="h-4 w-4" />
          Order via Telegram
        </a>
      </div>
      <div className="mt-4 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest"
          style={{ color: 'var(--muted)' }}
        >
          Or find your town for local delivery <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2);
  const morePosts = relatedPosts.length < 2
    ? [...relatedPosts, ...allPosts.filter((p) => p.slug !== post.slug && !relatedPosts.includes(p)).slice(0, 2 - relatedPosts.length)]
    : relatedPosts;

  const categoryColor = CATEGORY_TEXT[post.category] ?? 'var(--orange)';

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <ArticleSchema post={post} />

      {/* NAV */}
      <header className="glass border-b sticky top-0 z-50" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/blog" className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
              <div className="p-1.5 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
                <ArrowLeft className="h-3 w-3" />
              </div>
              Blog
            </Link>
          </div>
          <Link href="/" className="text-base font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
            Smart<span style={{ color: 'var(--orange)' }}>Whip</span>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section
        className="border-b py-14 lg:py-20"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
              style={{ background: `${categoryColor}20`, color: categoryColor }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>
              <Clock className="h-3 w-3" />
              {post.readTime} min read
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>
              {new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight mb-6" style={{ color: 'var(--foreground)' }}>
            {post.title}
          </h1>
          <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className="max-w-3xl mx-auto px-6 lg:px-10 py-14 space-y-8">
        {post.sections.map((section, idx) => {
          if (section.type === 'cta') {
            return <OrderCTA key={idx} message={section.body ?? 'Order SmartWhip now with fast UK delivery.'} />;
          }

          if (section.type === 'table' && section.tableHeaders && section.tableRows) {
            return (
              <div key={idx} className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
                {section.heading && (
                  <div className="px-6 py-4 border-b" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <h2 className="text-base font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                      {section.heading}
                    </h2>
                  </div>
                )}
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: 'var(--surface-elevated)' }}>
                      {section.tableHeaders.map((h, i) => (
                        <th key={i} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest border-b" style={{ color: 'var(--muted)', borderColor: 'var(--border)' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.tableRows.map((row, ri) => (
                      <tr key={ri} style={{ borderTop: ri > 0 ? '1px solid var(--border-subtle)' : undefined }}>
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-4 py-3 text-xs font-medium" style={{ color: ci === 0 ? 'var(--foreground)' : 'var(--muted)', fontWeight: ci === 0 ? 700 : 500 }}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          if (section.type === 'tip') {
            return (
              <div key={idx} className="rounded-2xl border p-6" style={{ background: 'rgba(255,98,0,0.04)', borderColor: 'rgba(255,98,0,0.2)' }}>
                {section.heading && (
                  <h2 className="text-sm font-black uppercase tracking-tight mb-4" style={{ color: 'var(--orange)' }}>
                    {section.heading}
                  </h2>
                )}
                {section.list && (
                  <ul className="space-y-2.5">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'var(--orange)' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          }

          return (
            <div key={idx}>
              {section.heading && (
                <h2 className="text-xl font-black uppercase tracking-tight mb-4" style={{ color: 'var(--foreground)' }}>
                  {section.heading}
                </h2>
              )}
              {section.body && (
                <p className="text-sm font-medium leading-[1.8]" style={{ color: 'var(--muted)' }}>
                  {section.body}
                </p>
              )}
              {section.list && (
                <ul className="mt-4 space-y-2.5">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'var(--orange)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}

        {/* Tags */}
        <div className="pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
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

        {/* Final CTA */}
        <div
          className="rounded-3xl border p-8"
          style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-2" style={{ color: 'var(--orange)' }}>
            Order Today
          </span>
          <h3 className="text-xl font-black uppercase tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>
            Fast Delivery Across the UK
          </h3>
          <p className="text-sm font-medium mb-6" style={{ color: 'var(--muted)' }}>
            Find your town below and get SmartWhip, FastGas, Cream Deluxe, or GoldWhip delivered directly to your door.
          </p>
          <Link
            href="/#directory"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest text-white"
            style={{ background: 'var(--orange)' }}
          >
            Find Your Town <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {morePosts.length > 0 && (
        <section className="border-t py-16" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-2" style={{ color: 'var(--orange)' }}>
              Keep Reading
            </span>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-8" style={{ color: 'var(--foreground)' }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {morePosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-3xl border p-6 flex flex-col gap-3 transition-all hover:border-orange-500/40"
                  style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
                >
                  <span
                    className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest w-fit"
                    style={{ background: `${CATEGORY_TEXT[p.category] ?? 'var(--orange)'}20`, color: CATEGORY_TEXT[p.category] ?? 'var(--orange)' }}
                  >
                    {p.category}
                  </span>
                  <h3 className="text-sm font-black uppercase tracking-tight leading-snug" style={{ color: 'var(--foreground)' }}>
                    {p.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                    <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase" style={{ color: 'var(--muted-dim)' }}>
                      <Clock className="h-3 w-3" /> {p.readTime} min
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" style={{ color: 'var(--orange)' }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t py-8" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 flex flex-col gap-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
              Smart<span style={{ color: 'var(--orange)' }}>Whip</span>
            </Link>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--muted-dim)' }}>
              © 2026 SmartWhip UK
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
