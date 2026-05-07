import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, MessageCircle, Send, MapPin } from 'lucide-react';

const BASE_URL = process.env.BASE_URL || 'https://smartwhip.co';
const WHATSAPP_BASE = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/447476690829';
const TELEGRAM_BASE = process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/smartwhipsuk';

export const metadata: Metadata = {
  title: 'Contact Smartwhip UK | Phone, Email & Messaging',
  description: 'Get in touch with Smartwhip UK. Call or text +44 7476 690829, email apexsmartwhips@gmail.com, or message us on WhatsApp and Telegram for fast order support.',
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: 'Contact Smartwhip UK',
    description: 'Call, email, or message Smartwhip UK for fast order support and delivery enquiries.',
    images: ['/og_image/og_image.jpeg'],
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${BASE_URL}/contact/#webpage`,
  url: `${BASE_URL}/contact`,
  name: 'Contact SmartWhip UK',
  description: 'Contact Smartwhip UK by phone, email, WhatsApp or Telegram.',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${BASE_URL}/contact` },
    ],
  },
};

export default function ContactPage() {
  const waLink = WHATSAPP_BASE.includes('?')
    ? `${WHATSAPP_BASE}&text=${encodeURIComponent('Hello, I would like to place an order. Can you help?')}`
    : `${WHATSAPP_BASE}?text=${encodeURIComponent('Hello, I would like to place an order. Can you help?')}`;

  const tgLink = TELEGRAM_BASE.includes('?')
    ? `${TELEGRAM_BASE}&text=${encodeURIComponent('Hello, I would like to place an order. Can you help?')}`
    : `${TELEGRAM_BASE}?text=${encodeURIComponent('Hello, I would like to place an order. Can you help?')}`;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

      <header className="glass border-b sticky top-0 z-50" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
              <ArrowLeft className="h-3.5 w-3.5" style={{ color: 'var(--muted)' }} />
            </div>
            <span className="text-base font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
              Smart<span style={{ color: 'var(--orange)' }}>Whip</span>
            </span>
          </Link>
          <nav className="flex items-center gap-5">
            <Link href="/blog" className="hidden sm:block text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Blog</Link>
            <Link href="/shop" className="hidden sm:block text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Locations</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-screen-lg mx-auto px-6 lg:px-10 py-16">

        <div className="mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-2 mb-4" style={{ color: 'var(--foreground)' }}>
            Contact Us
          </h1>
          <p className="text-sm font-medium max-w-lg" style={{ color: 'var(--muted)' }}>
            Reach us by phone, email, or messaging app. We respond fast — most enquiries are answered within minutes during operating hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          <a
            href="tel:+447476690829"
            className="group flex items-start gap-5 rounded-3xl border p-8 transition-all hover:border-orange-500/40"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="p-3.5 rounded-2xl flex-shrink-0" style={{ background: 'rgba(255,98,0,0.1)' }}>
              <Phone className="h-5 w-5" style={{ color: 'var(--orange)' }} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-1" style={{ color: 'var(--muted-dim)' }}>
                Phone / Text
              </span>
              <p className="text-xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
                +44 7476 690829
              </p>
              <p className="text-xs font-medium mt-2" style={{ color: 'var(--muted)' }}>
                Call or text us directly — available 24/7 for order enquiries.
              </p>
            </div>
          </a>

          <a
            href="mailto:apexsmartwhips@gmail.com"
            className="group flex items-start gap-5 rounded-3xl border p-8 transition-all hover:border-orange-500/40"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="p-3.5 rounded-2xl flex-shrink-0" style={{ background: 'rgba(255,98,0,0.1)' }}>
              <Mail className="h-5 w-5" style={{ color: 'var(--orange)' }} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-1" style={{ color: 'var(--muted-dim)' }}>
                Email
              </span>
              <p className="text-xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
                apexsmartwhips@gmail.com
              </p>
              <p className="text-xs font-medium mt-2" style={{ color: 'var(--muted)' }}>
                For wholesale enquiries, bulk orders, or general questions.
              </p>
            </div>
          </a>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-5 rounded-3xl border p-8 transition-all hover:border-green-500/40"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="p-3.5 rounded-2xl flex-shrink-0" style={{ background: 'rgba(37,211,102,0.1)' }}>
              <MessageCircle className="h-5 w-5" style={{ color: '#25D366' }} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-1" style={{ color: 'var(--muted-dim)' }}>
                WhatsApp
              </span>
              <p className="text-xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
                Message on WhatsApp
              </p>
              <p className="text-xs font-medium mt-2" style={{ color: 'var(--muted)' }}>
                The fastest way to place an order. Tap to open a chat — we respond immediately.
              </p>
            </div>
          </a>

          <a
            href={tgLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-5 rounded-3xl border p-8 transition-all hover:border-blue-500/40"
            style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <div className="p-3.5 rounded-2xl flex-shrink-0" style={{ background: 'rgba(0,136,204,0.1)' }}>
              <Send className="h-5 w-5" style={{ color: '#0088cc' }} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-1" style={{ color: 'var(--muted-dim)' }}>
                Telegram
              </span>
              <p className="text-xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
                Message on Telegram
              </p>
              <p className="text-xs font-medium mt-2" style={{ color: 'var(--muted)' }}>
                Order via Telegram for fast, secure messaging. Available around the clock.
              </p>
            </div>
          </a>

        </div>

        <div className="rounded-3xl border p-8 mb-10" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl flex-shrink-0" style={{ background: 'rgba(255,98,0,0.1)' }}>
              <MapPin className="h-5 w-5" style={{ color: 'var(--orange)' }} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-2" style={{ color: 'var(--orange)' }}>
                Delivery Coverage
              </span>
              <h2 className="text-xl font-black uppercase tracking-tight mb-3" style={{ color: 'var(--foreground)' }}>
                UK-Wide Delivery Network
              </h2>
              <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>
                We deliver Smartwhip, FastGas, Cream Deluxe, and GoldWhip  across 1,000+ UK locations.
                Message us your town and we&apos;ll confirm availability and delivery time instantly.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-white"
                  style={{ background: 'var(--orange)' }}
                >
                  Find Your Town
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--surface-elevated)' }}
                >
                  All Locations
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border p-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-3" style={{ color: 'var(--orange)' }}>
            Partner Sites
          </span>
          <h2 className="text-lg font-black uppercase tracking-tight mb-4" style={{ color: 'var(--foreground)' }}>
            Our Other Websites
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://apexwhips.com"
              target="_blank"
              rel="noopener"
              className="flex-1 flex items-center justify-between px-5 py-4 rounded-2xl border transition-all hover:border-orange-500/40"
              style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
            >
              <span className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                ApexWhips.com
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--orange)' }}>
                Visit →
              </span>
            </a>
            <a
              href="https://www.smartwhip.org.uk"
              target="_blank"
              rel="noopener"
              className="flex-1 flex items-center justify-between px-5 py-4 rounded-2xl border transition-all hover:border-orange-500/40"
              style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
            >
              <span className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                SmartWhip.org.uk
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--orange)' }}>
                Visit →
              </span>
            </a>
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
              © 2026 SmartWhip UK
            </p>
            <nav className="flex gap-5">
              <Link href="/" className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Home</Link>
              <Link href="/blog" className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>Blog</Link>
              <Link href="/contact" className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--orange)' }}>Contact</Link>
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
