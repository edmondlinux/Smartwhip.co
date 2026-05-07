'use client';

import { useState, useMemo, useRef } from 'react';
import { Search, ArrowRight, MapPin, Loader2, ChevronRight, X, MessageCircle, Send, CheckCircle, Zap, Shield, Package, Clock, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import englandData from '@/data/england.json';
import scotlandData from '@/data/scotland.json';
import walesData from '@/data/wales.json';
import niData from '@/data/northern-ireland.json';

import { searchTownsAction } from './actions';

const gbData = [...englandData, ...scotlandData, ...walesData, ...niData];

const TOWNS_PER_PAGE = 30;

const WHATSAPP_BASE = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/447476690829';
const TELEGRAM_BASE = process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/smartwhipsuk';

function Marquee() {
  const items = ['SmartWhip', '640g · £30', 'FastGas', 'Cream Deluxe', '2kg · £130', '25 Min Delivery', 'GoldWhip', 'UK-Wide Stock', '24/7 Dispatch'];
  const repeated = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y py-3" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
      <div className="flex gap-0 whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}>
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-8 text-xs font-black uppercase tracking-[0.2em]"
            style={{ color: i % 2 === 0 ? 'var(--muted)' : 'var(--orange)' }}>
            {item}
            <span className="w-1 h-1 rounded-full inline-block" style={{ background: 'var(--border)' }} />
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

const BRANDS = [
  {
    name: 'SmartWhip',
    tagline: 'The Industry Standard',
    desc: '99.9% pure food-grade N₂O. TUV certified. UK\'s most trusted 640g cylinder.',
    price: '£30',
    casePrice: '£130',
    img: '/products/smartwhip.jpeg',
    badge: 'Best Seller',
    badgeColor: 'var(--orange)',
  },
  {
    name: 'FastGas',
    tagline: 'Premium Performance',
    desc: 'CE & TUV certified. Praised by professional chefs for superior regulator control.',
    price: '£32',
    casePrice: '£138',
    img: '/products/fastgas.jpeg',
    badge: 'Pro Choice',
    badgeColor: 'rgb(99,102,241)',
  },
  {
    name: 'Cream Deluxe',
    tagline: 'Best Value at Scale',
    desc: 'CE certified 640g N₂O. Competitive case pricing for high-volume catering operations.',
    price: '£30',
    casePrice: '£128',
    img: '/products/cream-deluxe.jpeg',
    badge: 'Best Value',
    badgeColor: 'rgb(34,197,94)',
  },
  {
    name: 'GoldWhip',
    tagline: 'Reliable Alternative',
    desc: 'CE certified food-grade N₂O at a highly competitive price point. Cross-brand compatible.',
    price: '£29',
    casePrice: '£124',
    img: '/products/goldwhip.jpeg',
    badge: 'Great Price',
    badgeColor: 'rgb(245,158,11)',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Find Your Town',
    desc: 'Search below or browse our full directory of 1,000+ UK locations to check local availability.',
    icon: MapPin,
  },
  {
    step: '02',
    title: 'Contact Us Directly',
    desc: 'Message us via WhatsApp or Telegram with your town, postcode, and what you need.',
    icon: MessageCircle,
  },
  {
    step: '03',
    title: 'Fast Local Dispatch',
    desc: 'Your order is dispatched immediately by local courier. Most areas get delivery in under an hour.',
    icon: Zap,
  },
];

const TRUST_FEATURES = [
  { icon: Shield, label: 'TUV & CE Certified', desc: 'All products meet European safety standards for food-grade N₂O.' },
  { icon: CheckCircle, label: '99.9% Pure N₂O', desc: 'Food-grade purity on every cylinder — no compromises.' },
  { icon: Clock, label: 'Same-Day Delivery', desc: 'Local dispatch within hours across most of the UK.' },
  { icon: Package, label: 'Plain Packaging', desc: 'Discreet, unmarked delivery as standard across all orders.' },
  { icon: Star, label: '4.8★ Rated', desc: 'Thousands of orders fulfilled with consistently high reviews.' },
  { icon: Zap, label: '24/7 Availability', desc: 'Order any time via WhatsApp or Telegram — we respond fast.' },
];

const RECENT_BLOG_POSTS = [
  {
    slug: 'best-cream-chargers-uk-2026',
    title: 'Best Cream Chargers UK 2026: Full Brand Rankings',
    excerpt: 'We rank all four major brands across quality, pricing, and real-world reliability.',
    category: 'Comparisons',
    readTime: 8,
  },
  {
    slug: 'where-to-buy-cream-chargers-uk',
    title: 'Where to Buy Cream Chargers in the UK: A Complete Guide',
    excerpt: 'Every buying option explained — from local delivery to online wholesale.',
    category: 'Guides',
    readTime: 7,
  },
  {
    slug: 'smartwhip-vs-fastgas-vs-cream-deluxe',
    title: 'SmartWhip vs FastGas vs Cream Deluxe: Which Brand Is Best?',
    excerpt: 'Three brands, one honest comparison across every metric that matters.',
    category: 'Comparisons',
    readTime: 8,
  },
];

export default function HomePage() {
  const [visibleTowns, setVisibleTowns] = useState(TOWNS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [dynamicRecommendations, setDynamicRecommendations] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const towns = useMemo(() => gbData.map(t => ({
    id: t.city.toLowerCase().replace(/\s+/g, '-'),
    name: t.city,
    admin: t.admin_name
  })), []);

  const filteredTowns = useMemo(() =>
    towns.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery, towns]
  );

  const handleSearch = async (q: string) => {
    setSearchQuery(q);
    if (q.length < 3) { setDynamicRecommendations([]); return; }
    setIsSearching(true);
    try {
      const results = await searchTownsAction(q);
      setDynamicRecommendations(results.filter(r => !towns.some(t => t.name.toLowerCase() === r.name.toLowerCase())));
    } catch (e) { console.error(e); }
    finally { setIsSearching(false); }
  };

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const internal = towns.filter(t => t.name.toLowerCase().startsWith(searchQuery.toLowerCase())).slice(0, 5);
    const combined = [...internal, ...dynamicRecommendations];
    const seen = new Set();
    return combined.filter(item => { if (seen.has(item.id)) return false; seen.add(item.id); return true; }).slice(0, 8);
  }, [searchQuery, towns, dynamicRecommendations]);

  const displayedTowns = filteredTowns.slice(0, visibleTowns);
  const hasMore = visibleTowns < filteredTowns.length;

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleTowns(p => p + TOWNS_PER_PAGE);
      setLoadingMore(false);
    }, 400);
  };

  const encoded = encodeURIComponent('Hello, I am interested in ordering. Can you help?');
  const waLink = WHATSAPP_BASE.includes('?') ? `${WHATSAPP_BASE}&text=${encoded}` : `${WHATSAPP_BASE}?text=${encoded}`;
  const tgLink = TELEGRAM_BASE.includes('?') ? `${TELEGRAM_BASE}&text=${encoded}` : `${TELEGRAM_BASE}?text=${encoded}`;

  const stats = [
    { value: '640g', label: 'Standard Cylinder' },
    { value: '£30', label: 'Single Price' },
    { value: '£130', label: 'Case of 6' },
    { value: '25m', label: 'Local Dispatch' },
  ];

  const BASE_URL = 'https://smartwhip.co';
  const homeProductSchemas = BRANDS.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: `${b.name} 640g N₂O Cream Charger Cylinder`,
      description: b.desc,
      image: { '@type': 'ImageObject', url: `${BASE_URL}${b.img}`, width: 800, height: 800 },
      brand: { '@type': 'Brand', name: b.name },
      sku: `${b.name.toUpperCase().replace(/\s+/g, '-')}-640G-UK`,
      url: `${BASE_URL}/order?brand=${encodeURIComponent(b.name)}`,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GBP',
        price: parseFloat(b.price.replace('£', '')).toFixed(2),
        priceValidUntil: '2027-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        url: `${BASE_URL}/order?brand=${encodeURIComponent(b.name)}`,
        seller: { '@type': 'Organization', name: 'SmartWhip UK', url: BASE_URL },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'GBP' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'GB' },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'HUR' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'HUR' },
          },
        },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: ['4.9', '4.8', '4.8', '4.7'][i],
        reviewCount: ['312', '198', '145', '89'][i],
        bestRating: '5',
        worstRating: '1',
      },
    },
  }));

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--background)' }}>

      {/* Product Schema — ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'N₂O Cream Charger Cylinders — UK Delivery',
            description: 'Premium 640g food-grade nitrous oxide cream charger cylinders. SmartWhip, FastGas, Cream Deluxe, GoldWhip. Fast UK-wide delivery.',
            url: BASE_URL,
            numberOfItems: BRANDS.length,
            itemListElement: homeProductSchemas,
          }),
        }}
      />
      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${BASE_URL}/#webpage`,
            url: BASE_URL,
            name: 'SmartWhip UK | Buy Smartwhip, FastGas & Cream Deluxe | Same Day Delivery',
            description: "The UK's #1 supplier for SmartWhip, FastGas, Cream Deluxe and GoldWhip 640g N₂O cream charger cylinders.",
            isPartOf: { '@id': `${BASE_URL}/#website` },
            about: { '@id': `${BASE_URL}/#organization` },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL }],
            },
          }),
        }}
      />

      {/* NAV */}
      <header className="glass border-b sticky top-0 z-50" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <span className="text-base font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
            Smart<span style={{ color: 'var(--orange)' }}>Whip</span>
          </span>
          <div className="flex items-center gap-4">
            <Link href="/shop" className="hidden sm:block text-[11px] font-black uppercase tracking-[0.18em] transition-colors" style={{ color: 'var(--muted)' }}>
              All Locations
            </Link>
            <Link href="/blog" className="hidden sm:block text-[11px] font-black uppercase tracking-[0.18em] transition-colors" style={{ color: 'var(--muted)' }}>
              Blog
            </Link>
            <Link href="/contact" className="hidden sm:block text-[11px] font-black uppercase tracking-[0.18em] transition-colors" style={{ color: 'var(--muted)' }}>
              Contact
            </Link>
            <div className="relative" ref={searchRef}>
              <button onClick={() => setSearchFocused(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border text-[11px] font-black uppercase tracking-widest"
                style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--muted)' }}>
                <Search className="h-3.5 w-3.5" />
                <span className="hidden sm:block">Find Town</span>
              </button>

              {searchFocused && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
                  style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
                  onClick={(e) => { if (e.target === e.currentTarget) setSearchFocused(false); }}>
                  <div className="w-full max-w-lg rounded-3xl border overflow-hidden shadow-2xl" style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}>
                    <div className="relative p-4">
                      <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--muted)' }} />
                      <input
                        autoFocus
                        type="text"
                        placeholder="Search your town..."
                        value={searchQuery}
                        onChange={e => handleSearch(e.target.value)}
                        className="w-full h-12 pl-10 pr-10 rounded-2xl border text-sm font-semibold outline-none"
                        style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                      />
                      {isSearching
                        ? <Loader2 className="absolute right-8 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin" style={{ color: 'var(--orange)' }} />
                        : <button onClick={() => { setSearchFocused(false); setSearchQuery(''); }} className="absolute right-8 top-1/2 -translate-y-1/2">
                          <X className="h-4 w-4" style={{ color: 'var(--muted)' }} />
                        </button>
                      }
                    </div>
                    {searchResults.length > 0 && (
                      <div className="max-h-72 overflow-y-auto divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                        {searchResults.map(r => (
                          <Link key={r.id} href={`/towns/${r.id}`} onClick={() => setSearchFocused(false)}
                            className="flex items-center justify-between px-6 py-4 transition-colors"
                            onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                            <div className="flex items-center gap-3">
                              <MapPin className="h-3.5 w-3.5" style={{ color: 'var(--orange)' }} />
                              <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{r.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>{r.admin}</span>
                              <ArrowRight className="h-3.5 w-3.5" style={{ color: 'var(--muted)' }} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    {searchQuery && searchResults.length === 0 && !isSearching && (
                      <div className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-center" style={{ color: 'var(--muted)' }}>
                        No results for &quot;{searchQuery}&quot;
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">

        {/* HERO */}
        <section>
          <a href="#directory" className="hidden lg:block w-full">
            <Image
              src="/hero_image.png"
              alt="SmartWhip — Europe's Leading Brand of N2O. Elevate your experience."
              width={1920}
              height={1080}
              className="w-full h-auto block"
              priority
            />
          </a>
          <a href="#directory" className="lg:hidden block w-full">
            <Image
              src="/hero_image_mobile.png"
              alt="SmartWhip — Europe's Leading Brand of N2O. Elevate your experience."
              width={750}
              height={1100}
              className="w-full h-auto block"
              priority
            />
          </a>
        </section>

        {/* PAGE H1 */}
        <section className="border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-6">
            <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
              SmartWhip & Smart Whip UK —{' '}
              <span style={{ color: 'var(--orange)' }}>Buy 640g Cylinders from £29</span>{' '}
              with Same-Day UK Delivery
            </h1>
          </div>
        </section>

        {/* MARQUEE */}
        <Marquee />

        {/* STATS BAR */}
        <section className="border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x">
              {stats.map((s, i) => (
                <div key={i} className="py-10 px-8 border-r last:border-r-0" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-5xl font-black tracking-tight leading-none mb-2" style={{ color: i % 2 === 0 ? 'var(--foreground)' : 'var(--orange)' }}>
                    {s.value}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <div className="mb-12">
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>Simple Process</span>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mt-1" style={{ color: 'var(--foreground)' }}>
                How It Works
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={i} className="relative">
                  <div className="rounded-3xl border p-8 h-full" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 rounded-2xl" style={{ background: 'rgba(255,98,0,0.1)' }}>
                        <step.icon className="h-5 w-5" style={{ color: 'var(--orange)' }} />
                      </div>
                      <span className="text-5xl font-black" style={{ color: 'var(--border)', lineHeight: 1 }}>{step.step}</span>
                    </div>
                    <h3 className="text-base font-black uppercase tracking-tight mb-3" style={{ color: 'var(--foreground)' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {step.desc}
                    </p>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-4 z-10 items-center justify-center w-8 h-8 rounded-full border" style={{ background: 'var(--background)', borderColor: 'var(--border)', transform: 'translateY(-50%)' }}>
                      <ChevronRight className="h-4 w-4" style={{ color: 'var(--orange)' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            
          </div>
        </section>

        {/* BRANDS / STOCK */}
        <section className="py-20 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>All In Stock</span>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mt-1" style={{ color: 'var(--foreground)' }}>
                  Brands We Carry
                </h2>
              </div>
              <p className="text-sm font-medium max-w-sm" style={{ color: 'var(--muted)' }}>
                All cylinders are 640g food-grade N₂O. CE or TUV certified. Available individually or as a case of 6.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BRANDS.map((brand, i) => (
                <div
                  key={i}
                  className="rounded-3xl border overflow-hidden flex flex-col group transition-all hover:border-orange-500/40"
                  style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
                >
                  {/* Image area */}
                  <div className="relative aspect-square overflow-hidden" style={{ background: 'var(--surface)' }}>
                    {!imgErrors[brand.name] ? (
                      <Image
                        src={brand.img}
                        alt={`${brand.name} 640g N2O cream charger cylinder`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform group-hover:scale-105"
                        onError={() => setImgErrors(prev => ({ ...prev, [brand.name]: true }))}
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                        <div className="w-16 h-20 rounded-2xl border-2 border-dashed flex items-center justify-center" style={{ borderColor: 'var(--border)' }}>
                          <Package className="h-7 w-7" style={{ color: 'var(--muted-dim)' }} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-center" style={{ color: 'var(--muted-dim)' }}>
                          Image Coming Soon
                        </span>
                      </div>
                    )}
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white"
                        style={{ background: brand.badgeColor }}
                      >
                        {brand.badge}
                      </span>
                    </div>
                    {/* In Stock dot */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
                        style={{ background: 'rgba(34,197,94,0.15)', color: 'rgb(34,197,94)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        In Stock
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-3">
                      <h3 className="text-base font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                        {brand.name}
                      </h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] mt-0.5" style={{ color: 'var(--orange)' }}>
                        {brand.tagline}
                      </p>
                    </div>
                    <p className="text-xs font-medium leading-relaxed mb-4 flex-grow" style={{ color: 'var(--muted)' }}>
                      {brand.desc}
                    </p>
                    <div className="border-t pt-4 flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
                      <div>
                        <div className="text-xl font-black" style={{ color: 'var(--foreground)' }}>{brand.price}</div>
                        <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>per cylinder</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black" style={{ color: 'var(--orange)' }}>{brand.casePrice}</div>
                        <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>case of 6</div>
                      </div>
                    </div>
                    <Link
                      href={`/order?brand=${encodeURIComponent(brand.name)}`}
                      className="mt-4 flex items-center justify-center gap-2 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all hover:border-orange-500/50 hover:bg-orange-500/5"
                      style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                    >
                      Order Now <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="py-20 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>Why Us</span>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mt-2 mb-6" style={{ color: 'var(--foreground)' }}>
                  The Industry<br />Standard
                </h2>
                <div className="space-y-4">
                  {[
                    ['99.9%', 'Pure Food-Grade N₂O in every cylinder'],
                    ['640g', 'Standard & 2kg Master Size available'],
                    ['TUV', 'Certified and quality tested supply'],
                    ['80+', 'Equivalent 8g chargers per cylinder'],
                    ['4 Brands', 'SmartWhip, FastGas, Cream Deluxe & GoldWhip'],
                    ['1,000+', 'UK towns covered by our delivery network'],
                  ].map(([stat, desc], i) => (
                    <div key={i} className="flex items-center gap-5 py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                      <span className="text-xl font-black w-20 flex-shrink-0" style={{ color: 'var(--orange)' }}>{stat}</span>
                      <span className="text-sm font-medium" style={{ color: 'var(--muted)' }}>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TRUST_FEATURES.map((f, i) => (
                  <div key={i} className="rounded-2xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <div className="p-2.5 rounded-xl w-fit mb-3" style={{ background: 'rgba(255,98,0,0.1)' }}>
                      <f.icon className="h-4 w-4" style={{ color: 'var(--orange)' }} />
                    </div>
                    <h3 className="text-sm font-black uppercase tracking-tight mb-1.5" style={{ color: 'var(--foreground)' }}>
                      {f.label}
                    </h3>
                    <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DIRECTORY LISTING */}
        <section id="directory" className="py-20 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>Delivery Network</span>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mt-1" style={{ color: 'var(--foreground)' }}>
                  Select Your Town
                </h2>
              </div>
              <span className="text-sm font-bold" style={{ color: 'var(--muted)' }}>
                {filteredTowns.length} locations available
              </span>
            </div>

            {/* DIRECTORY TABLE */}
            <div className="rounded-3xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
              {/* Header row */}
              <div className="grid grid-cols-12 px-6 py-3 border-b" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="col-span-1 text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>#</div>
                <div className="col-span-5 text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>Town</div>
                <div className="col-span-3 hidden md:block text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>Region</div>
                <div className="col-span-2 hidden md:block text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>Price</div>
                <div className="col-span-6 md:col-span-1 text-right text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>Order</div>
              </div>

              {/* Rows */}
              {displayedTowns.map((town, idx) => (
                <Link
                  key={town.id}
                  href={`/towns/${town.id}`}
                  className="grid grid-cols-12 px-6 py-4 border-b last:border-0 items-center transition-all group"
                  style={{ borderColor: 'var(--border-subtle)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div className="col-span-1 text-[11px] font-black tabular-nums" style={{ color: 'var(--muted-dim)' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="col-span-5 flex items-center gap-3">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0 hidden sm:block" style={{ color: 'var(--orange)' }} />
                    <span className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>{town.name}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest"
                      style={{ background: 'rgba(34,197,94,0.1)', color: 'rgb(34,197,94)' }}>
                      <span className="w-1 h-1 rounded-full bg-green-400" />
                      Live
                    </span>
                  </div>
                  <div className="col-span-3 hidden md:block text-xs font-bold" style={{ color: 'var(--muted)' }}>{town.admin}</div>
                  <div className="col-span-2 hidden md:flex items-center gap-2">
                    <span className="text-sm font-black" style={{ color: 'var(--foreground)' }}>£30</span>
                    <span style={{ color: 'var(--muted-dim)' }}>/</span>
                    <span className="text-sm font-black" style={{ color: 'var(--orange)' }}>£130</span>
                  </div>
                  <div className="col-span-6 md:col-span-1 flex justify-end">
                    <div className="p-2 rounded-xl border transition-all group-hover:border-orange-500/50 group-hover:bg-orange-500/5"
                      style={{ borderColor: 'var(--border)' }}>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--muted)' }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* SEE MORE BUTTON */}
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="flex items-center gap-3 px-8 py-4 rounded-2xl border text-sm font-black uppercase tracking-widest transition-all hover:border-orange-500/50 hover:bg-orange-500/5 disabled:opacity-50"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--surface)' }}
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" style={{ color: 'var(--orange)' }} />
                      Loading...
                    </>
                  ) : (
                    <>
                      See More Towns
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,98,0,0.1)', color: 'var(--orange)' }}>
                        +{Math.min(TOWNS_PER_PAGE, filteredTowns.length - visibleTowns)}
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {!hasMore && filteredTowns.length > TOWNS_PER_PAGE && (
              <div className="mt-6 text-center">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>
                  All {filteredTowns.length} locations shown
                </span>
              </div>
            )}
          </div>
        </section>

        {/* BLOG PREVIEW */}
        <section className="py-20 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>Knowledge Base</span>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mt-1" style={{ color: 'var(--foreground)' }}>
                  From The Blog
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-colors hover:text-orange-500"
                style={{ color: 'var(--muted)' }}
              >
                All Articles <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RECENT_BLOG_POSTS.map((post, i) => (
                <Link
                  key={i}
                  href={`/blog/${post.slug}`}
                  className="group rounded-3xl border overflow-hidden flex flex-col transition-all hover:border-orange-500/40"
                  style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
                >
                  <div className="h-1 w-full" style={{ background: 'var(--orange)' }} />
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[9px] font-black uppercase tracking-widest mb-3 px-2.5 py-1 rounded-full w-fit"
                      style={{ background: 'rgba(255,98,0,0.1)', color: 'var(--orange)' }}>
                      {post.category}
                    </span>
                    <h3 className="text-sm font-black uppercase tracking-tight leading-snug mb-3 flex-grow" style={{ color: 'var(--foreground)' }}>
                      {post.title}
                    </h3>
                    <p className="text-xs font-medium leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                      <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>
                        <Clock className="h-3 w-3" />
                        {post.readTime} min read
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" style={{ color: 'var(--orange)' }} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL ORDER CTA */}
        <section className="py-20" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <div className="rounded-3xl border p-10 md:p-16 text-center" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--orange)' }}>
                Ready to Order?
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mt-3 mb-4" style={{ color: 'var(--foreground)' }}>
                Fast Delivery<br />Across the UK
              </h2>
              <p className="text-sm font-medium mb-10 max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
                Find your town above, or contact us directly via WhatsApp or Telegram. We dispatch within minutes — most areas receive delivery in under an hour.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all hover:opacity-90"
                  style={{ background: '#25D366' }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Order via WhatsApp
                </a>
                <a
                  href={tgLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all hover:opacity-90"
                  style={{ background: '#0088cc' }}
                >
                  <Send className="h-4 w-4" />
                  Order via Telegram
                </a>
                <a
                  href="#directory"
                  className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest border transition-all hover:border-orange-500/50"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--surface-elevated)' }}
                >
                  <MapPin className="h-4 w-4" />
                  Find Your Town
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t py-12" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <span className="text-lg font-black uppercase tracking-tight block mb-3" style={{ color: 'var(--foreground)' }}>
                Smart<span style={{ color: 'var(--orange)' }}>Whip</span>
              </span>
              <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>
                UK&apos;s leading source for professional N₂O cream charger delivery. SmartWhip, FastGas, Cream Deluxe, and GoldWhip — delivered fast to your door.
              </p>
            </div>

            {/* Links */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-4" style={{ color: 'var(--orange)' }}>Navigation</span>
              <div className="flex flex-col gap-2">
                <Link href="/" className="text-xs font-bold uppercase tracking-widest hover:text-orange-500 transition-colors" style={{ color: 'var(--muted)' }}>Home</Link>
                <Link href="/#directory" className="text-xs font-bold uppercase tracking-widest hover:text-orange-500 transition-colors" style={{ color: 'var(--muted)' }}>Delivery Locations</Link>
                <Link href="/shop" className="text-xs font-bold uppercase tracking-widest hover:text-orange-500 transition-colors" style={{ color: 'var(--muted)' }}>All Locations</Link>
                <Link href="/blog" className="text-xs font-bold uppercase tracking-widest hover:text-orange-500 transition-colors" style={{ color: 'var(--muted)' }}>Blog</Link>
                <Link href="/contact" className="text-xs font-bold uppercase tracking-widest hover:text-orange-500 transition-colors" style={{ color: 'var(--muted)' }}>Contact</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-4" style={{ color: 'var(--orange)' }}>Order Now</span>
              <div className="flex flex-col gap-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-80"
                  style={{ color: '#25D366' }}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
                <a
                  href={tgLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-80"
                  style={{ color: '#0088cc' }}
                >
                  <Send className="h-3.5 w-3.5" />
                  Telegram
                </a>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border)' }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: 'var(--muted-dim)' }}>
              © 2026 SmartWhip International — All Rights Reserved
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://apexwhips.com"
                target="_blank"
                rel="noopener"
                className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-orange-500"
                style={{ color: 'var(--muted-dim)' }}
              >
                ApexWhips.com
              </a>
              <span style={{ color: 'var(--border)' }}>·</span>
              <a
                href="https://smartwhip.org.uk"
                target="_blank"
                rel="noopener"
                className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-orange-500"
                style={{ color: 'var(--muted-dim)' }}
              >
                SmartWhip.org.uk
              </a>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-center" style={{ color: 'var(--muted-dim)' }}>
              For professional catering use only. All N₂O sold is food-grade certified.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
