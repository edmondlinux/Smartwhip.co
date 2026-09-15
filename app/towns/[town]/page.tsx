import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MapPin, ArrowLeft, ShieldCheck, Truck, Clock, Star, CheckCircle2, Users } from 'lucide-react';
import Link from 'next/link';
import { TownCTAButtons } from '@/components/TownCTAButtons';
import Image from 'next/image';
import englandData from '@/data/england.json';
import scotlandData from '@/data/scotland.json';
import walesData from '@/data/wales.json';
import niData from '@/data/northern-ireland.json';
import { fetchTownFromOSM } from '@/lib/osm';
import {
  buildTownContent,
  getNearbyTowns,
  type TownMeta,
} from '@/lib/townContent';

const allTowns = [...englandData, ...scotlandData, ...walesData, ...niData] as TownMeta[];

interface Props {
  params: Promise<{ town: string }>;
}

export const dynamicParams = true;
export const revalidate = false;

export async function generateStaticParams() {
  return allTowns
    .filter((town) => (parseInt(town.population, 10) || 0) > 50000)
    .map((town) => ({
      town: town.city.toLowerCase().replace(/\s+/g, '-'),
    }));
}

async function getTownData(townParam: string): Promise<TownMeta | null> {
  const local = allTowns.find(
    (t) => t.city.toLowerCase().replace(/\s+/g, '-') === townParam.toLowerCase()
  );
  if (local) return local;
  const nameFromSlug = townParam
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return await fetchTownFromOSM(nameFromSlug);
}

const META_TITLE_TEMPLATES = [
  'Cream Chargers {city} | Same Day Delivery | SmartWhip From £30',
  'SmartWhip {city} | Same-Day Cream Charger Delivery Near You',
  'Buy Cream Chargers Near Me in {city} | SmartWhip 640g Fast Delivery',
  'NOS Delivery {city} | SmartWhip 640g Same Day — From £30',
  'SmartWhip {city} | Cream Chargers Delivered Today | 24/7',
  'Cream Chargers Same Day Delivery {city} | SmartWhip & FastGas',
];

const META_DESC_TEMPLATES = [
  'Looking for cream chargers near you in {city}? We deliver SmartWhip 640g same day across {admin}. From £30. Order via WhatsApp or Telegram — 24/7.',
  "Same day cream charger delivery in {city}. SmartWhip, FastGas & Cream Deluxe 640g cylinders dispatched fast across {admin}. Genuine stock. From £30.",
  'Buy SmartWhip 640g in {city} — same day delivery, authentic stock, best UK prices. Serving {admin} 24 hours a day. Order now on WhatsApp.',
  'Need cream chargers near you in {city}? We deliver SmartWhip, FastGas, and Cream Deluxe 640g to any postcode in {admin}. Same day, from £30.',
  'SmartWhip same day delivery in {city}. 640g N₂O cylinders, 99.9% pure, TUV certified. Fast dispatch across {admin} — 24/7, from £30.',
  'Fastest cream charger delivery near {city}. SmartWhip & FastGas 640g cylinders — same day drop across {admin}. Order on WhatsApp now.',
];

function seedPick<T>(arr: T[], city: string, offset = 0): T {
  const s = city.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return arr[(s + offset) % arr.length];
}

function fillTemplate(template: string, city: string, admin = ''): string {
  return template.replace(/\{city\}/g, city).replace(/\{admin\}/g, admin);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { town } = await params;
  const townData = await getTownData(town);
  if (!townData) return { title: 'Town Not Found' };
  const { city, admin_name } = townData;
  const baseUrl = process.env.BASE_URL || 'https://smartwhip.co';

  const title = fillTemplate(seedPick(META_TITLE_TEMPLATES, city), city);
  const description = fillTemplate(seedPick(META_DESC_TEMPLATES, city, 2), city, admin_name);

  return {
    title,
    description,
    alternates: { canonical: `${baseUrl}/towns/${town}` },
    keywords: [
      `Smartwhip ${city}`,
      `buy Smartwhip ${city}`,
      `640g cream chargers ${city}`,
      `FastGas ${city}`,
      `Cream Deluxe ${city}`,
      `N2O delivery ${city}`,
      `cream charger delivery ${admin_name}`,
    ],
    openGraph: {
      title: `SmartWhip ${city}, Fast Delivery | Smartwhip UK`,
      description,
      images: ['/og_image/og_image.jpeg'],
    },
    twitter: { card: 'summary_large_image', images: ['/og_image/og_image.jpeg'] },
  };
}

export default async function TownPage({ params }: Props) {
  const { town } = await params;
  const townData = await getTownData(town);
  if (!townData) notFound();

  const content = buildTownContent(townData);
  const nearbyTowns = getNearbyTowns(townData.city, townData.lat, townData.lng, allTowns, 8);

  const reviewCount = 80 + ((townData.city.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % 120);
  const ratingValue = (4.7 + (((townData.city.charCodeAt(0) || 65) % 3) * 0.1)).toFixed(1);

  const BASE_URL = process.env.BASE_URL || 'https://smartwhip.co';
  const townSlug = townData.city.toLowerCase().replace(/\s+/g, '-');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${BASE_URL}/towns/${townSlug}/#product`,
    name: `SmartWhip 640g N₂O Cream Charger — Delivery in ${townData.city}`,
    description: content.productDesc640g,
    image: [
      {
        '@type': 'ImageObject',
        url: `${BASE_URL}/products/smartwhip.jpeg`,
        width: 800,
        height: 800,
      },
      {
        '@type': 'ImageObject',
        url: `${BASE_URL}/og_image/og_image.jpeg`,
        width: 1200,
        height: 630,
      },
    ],
    brand: {
      '@type': 'Brand',
      name: 'Smartwhip',
    },
    sku: `SW-640G-${townData.city.toUpperCase().replace(/\s+/g, '-')}`,
    mpn: `SW-640G-UK`,
    url: `${BASE_URL}/towns/${townSlug}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      reviewCount: reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: '30.00',
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/towns/${townSlug}`,
      seller: {
        '@type': 'Organization',
        name: 'SmartWhip UK',
        url: BASE_URL,
      },
      areaServed: [
        { '@type': 'City', name: townData.city },
        { '@type': 'AdministrativeArea', name: townData.admin_name },
      ],
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'GBP',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'GB',
          addressRegion: townData.admin_name,
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'HUR',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'HUR',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'GB',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
      },
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/towns/${townSlug}/#localbusiness`,
    name: `SmartWhip ${townData.city}`,
    description: content.localIntroParagraph,
    url: `${BASE_URL}/towns/${townSlug}`,
    image: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/og_image/og_image.jpeg`,
      width: 1200,
      height: 630,
    },
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo/logo.jpeg`,
      width: 200,
      height: 200,
    },
    areaServed: [
      { '@type': 'City', name: townData.city },
      { '@type': 'AdministrativeArea', name: townData.admin_name },
    ],
    openingHours: ['Mo-Su 00:00-23:59'],
    telephone: '+447476690829',
    priceRange: '££',
    address: {
      '@type': 'PostalAddress',
      addressLocality: townData.city,
      addressRegion: townData.admin_name,
      addressCountry: 'GB',
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'SmartWhip UK',
      url: BASE_URL,
    },
  };

  const message = `Hello, I am interested in placing an order. I am based in ${townData.city}. Are you currently active?`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappBase = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/447476690829';
  const telegramBase = process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/smartwhipsuk';
  const whatsappUrl = whatsappBase.includes('?')
    ? `${whatsappBase}&text=${encodedMessage}`
    : `${whatsappBase}?text=${encodedMessage}`;
  const telegramUrl = telegramBase.includes('?')
    ? `${telegramBase}&text=${encodedMessage}`
    : `${telegramBase}?text=${encodedMessage}`;

  const products = [
    {
      id: 'single',
      name: 'SmartWhip 640g',
      desc: content.productDesc640g,
      price: '£30',
      tag: 'Best Seller',
    },
    {
      id: 'case',
      name: 'Case Pack (6×)',
      desc: content.productDescCase,
      price: '£130',
      tag: 'Best Value',
    },
  ];

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'All Locations', item: `${BASE_URL}/shop` },
      { '@type': 'ListItem', position: 3, name: townData.city, item: `${BASE_URL}/towns/${townSlug}` },
    ],
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* NAV */}
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
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl border text-[11px] font-black uppercase tracking-widest"
            style={{ borderColor: 'var(--border)', background: 'var(--surface)', color: 'var(--foreground)' }}
          >
            <MapPin className="h-3.5 w-3.5" style={{ color: 'var(--orange)' }} />
            {townData.city}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <div
          className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-12 relative z-10"
          style={{ background: 'var(--background)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest"
              style={{ background: 'rgba(34,197,94,0.1)', color: 'rgb(34,197,94)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Delivering Now
            </span>
            <span
              className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border"
              style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--surface)' }}
            >
              {content.heroBadge}
            </span>
          </div>
          <h1
            className="font-black uppercase leading-[0.88] tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', color: 'var(--foreground)' }}
          >
            SmartWhip<br />
            <span style={{ color: 'var(--orange)' }}>Delivery</span><br />
            {townData.city}
          </h1>
          <p className="mt-5 text-sm font-medium leading-relaxed max-w-md" style={{ color: 'var(--muted)' }}>
            {content.heroSubtitle}
          </p>
          <div className="flex items-center gap-2 mt-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" style={{ color: 'var(--orange)' }} />
            ))}
            <span className="text-xs font-bold ml-1" style={{ color: 'var(--muted)' }}>
              {ratingValue} from {reviewCount} reviews in {townData.city}
            </span>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <Image
            src="/IMG_1867.jpeg"
            alt={`SmartWhip 640g cream charger delivery in ${townData.city}`}
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, var(--background) 0%, transparent 15%)' }}
          />
        </div>
        <div className="absolute inset-0 lg:hidden -z-10">
          <Image src="/IMG_1867.jpeg" alt="SmartWhip N2O cylinders" fill sizes="100vw" className="object-cover opacity-20" />
        </div>
      </section>

      {/* MAIN */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-16 items-start">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">

            {/* Products */}
            <div className="rounded-3xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <div className="border-b px-8 py-6" style={{ borderColor: 'var(--border)' }}>
                <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>
                  Products Available in {townData.city}
                </span>
                <h2 className="text-xl font-black uppercase tracking-tight mt-1" style={{ color: 'var(--foreground)' }}>
                  What We Supply
                </h2>
              </div>
              {products.map((p, i) => (
                <div
                  key={p.id}
                  className="flex items-center gap-6 px-8 py-6 border-b last:border-0"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image src="/IMG_1867.jpeg" alt={p.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                        {p.name}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest"
                        style={{ background: 'var(--orange)', color: '#fff' }}
                      >
                        {p.tag}
                      </span>
                    </div>
                    <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {p.desc}
                    </p>
                  </div>
                  <div
                    className="text-2xl font-black flex-shrink-0"
                    style={{ color: i === 0 ? 'var(--foreground)' : 'var(--orange)' }}
                  >
                    {p.price}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="p-6 space-y-3">
              <div
                className="text-[10px] font-black uppercase tracking-[0.2em] text-center mb-4"
                style={{ color: 'var(--muted-dim)' }}
              >
                Order now — delivery in {townData.city} within {content.deliveryTime} mins
              </div>
              <TownCTAButtons
                whatsappUrl={whatsappUrl}
                telegramUrl={telegramUrl}
                town={townData.city}
                variant="hero"
              />
            </div>

            {/* Local Coverage */}
            <div className="rounded-3xl border p-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>
                Local Coverage
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight mt-2 mb-4" style={{ color: 'var(--foreground)' }}>
                Serving {townData.city} &amp; {townData.admin_name}
              </h2>
              <p className="text-sm font-medium leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                {content.localIntroParagraph}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { v: Number(townData.population).toLocaleString(), l: 'Population', o: true },
                  { v: `${content.deliveryTime}m`, l: 'Delivery Time', o: false },
                  { v: '24/7', l: 'Available', o: false },
                  { v: '99.9%', l: 'Pure N₂O', o: true },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border p-4 text-center"
                    style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
                  >
                    <div
                      className="text-lg font-black leading-none mb-1"
                      style={{ color: s.o ? 'var(--orange)' : 'var(--foreground)' }}
                    >
                      {s.v}
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                {
                  icon: Truck,
                  title: 'Rapid Dispatch',
                  text: `Delivery across ${townData.city} within ${content.deliveryTime} minutes via our dedicated local courier network — operating ${content.regionPhrase}.`,
                },
                {
                  icon: ShieldCheck,
                  title: 'Genuine Stock Only',
                  text: `100% authentic SmartWhip, FastGas, and Cream Deluxe cylinders. We do not stock imitations or grey-market products for ${townData.city} customers.`,
                },
                {
                  icon: Clock,
                  title: '24/7 Active',
                  text: `Our ${townData.city} service operates around the clock. Late-night catering shifts, early morning prep — we're always available.`,
                },
              ].map((item, i) => (
                <div key={i} className="rounded-2xl border p-6" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                  <div className="p-2.5 rounded-xl mb-5 w-fit" style={{ background: 'rgba(255,98,0,0.1)' }}>
                    <item.icon className="h-4 w-4" style={{ color: 'var(--orange)' }} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Extra service detail */}
            <div
              className="rounded-2xl border p-6 flex items-start gap-4"
              style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="p-2 rounded-xl flex-shrink-0" style={{ background: 'rgba(255,98,0,0.1)' }}>
                <CheckCircle2 className="h-5 w-5" style={{ color: 'var(--orange)' }} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-tight mb-1" style={{ color: 'var(--foreground)' }}>
                  Our Service Commitment in {townData.city}
                </h3>
                <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {content.extraFeatureText}
                </p>
              </div>
            </div>

            {/* About SmartWhip */}
            <div className="rounded-3xl border p-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <h2 className="text-xl font-black uppercase tracking-tight mb-4" style={{ color: 'var(--foreground)' }}>
                Premium N₂O Cylinders for {townData.city}
              </h2>
              <p className="text-sm font-medium leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                {content.aboutParagraph}
              </p>
              <ul className="space-y-3">
                {[
                  '99.9% Pure Food-Grade Nitrous Oxide (N₂O)',
                  'Compatible with all standard pressure regulators',
                  'Equivalent to 80+ individual 8g cream chargers',
                  'TUV Certified and independently quality tested',
                  `Stocked and dispatched locally for ${townData.city} orders`,
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium" style={{ color: 'var(--muted)' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--orange)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Near Me / How to Order */}
            <div className="rounded-3xl border p-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>
                Cream Chargers Near You
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight mt-2 mb-4" style={{ color: 'var(--foreground)' }}>
                Same Day Cream Charger Delivery in {townData.city}
              </h2>
              <p className="text-sm font-medium leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                {content.nearMeParagraph}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    step: '01',
                    title: 'Message Us',
                    desc: `Send your address in ${townData.city} and what you need via WhatsApp or Telegram.`,
                  },
                  {
                    step: '02',
                    title: 'We Confirm',
                    desc: 'We reply within minutes, confirm stock and dispatch time.',
                  },
                  {
                    step: '03',
                    title: 'Same Day Drop',
                    desc: `Your cream chargers arrive in ${townData.city} the same day — often within ${content.deliveryTime} minutes.`,
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border p-5"
                    style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
                  >
                    <div className="text-2xl font-black mb-2" style={{ color: 'var(--orange)' }}>{s.step}</div>
                    <div className="text-xs font-black uppercase tracking-tight mb-1" style={{ color: 'var(--foreground)' }}>{s.title}</div>
                    <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>
                Customer Reviews
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight mt-1 mb-6" style={{ color: 'var(--foreground)' }}>
                What Our Customers Say
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {content.testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border p-6 flex flex-col gap-4"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                  >
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-current" style={{ color: 'var(--orange)' }} />
                      ))}
                    </div>
                    <p className="text-xs font-medium leading-relaxed flex-grow" style={{ color: 'var(--muted)' }}>
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div>
                      <div className="text-xs font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                        {t.name}
                      </div>
                      <div className="text-[10px] font-bold" style={{ color: 'var(--muted-dim)' }}>
                        {t.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>
                FAQ
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight mt-1 mb-6" style={{ color: 'var(--foreground)' }}>
                Common Questions — {townData.city}
              </h2>
              <div className="space-y-4">
                {content.faqs.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border p-6"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
                  >
                    <h3 className="text-sm font-black uppercase tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>
                      {item.q}
                    </h3>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Towns */}
            {nearbyTowns.length > 0 && (
              <div className="rounded-3xl border p-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl" style={{ background: 'rgba(255,98,0,0.1)' }}>
                    <Users className="h-4 w-4" style={{ color: 'var(--orange)' }} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>
                    Nearby Areas We Cover
                  </span>
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight mb-2" style={{ color: 'var(--foreground)' }}>
                  Also Delivering Near {townData.city}
                </h2>
                <p className="text-xs font-medium mb-6" style={{ color: 'var(--muted)' }}>
                  We cover {townData.city} and all surrounding towns {content.regionPhrase}. Select a location for dedicated delivery info.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {nearbyTowns.map((nt) => (
                    <Link
                      key={nt.city}
                      href={`/towns/${nt.slug}`}
                      className="rounded-xl border px-4 py-3 text-center text-xs font-black uppercase tracking-tight transition-all hover:border-orange-500"
                      style={{ borderColor: 'var(--border)', color: 'var(--foreground)', background: 'var(--surface-elevated)' }}
                    >
                      {nt.city}
                      <div className="text-[9px] font-medium mt-0.5" style={{ color: 'var(--muted-dim)' }}>
                        ~{Math.round(nt.distance)} km
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {/* Related Guides */}
            <div className="rounded-3xl border p-8" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
              <span className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: 'var(--orange)' }}>
                Useful Guides
              </span>
              <h2 className="text-xl font-black uppercase tracking-tight mt-2 mb-5" style={{ color: 'var(--foreground)' }}>
                Cream Charger Guides &amp; Reviews
              </h2>
              <div className="space-y-3">
                {[
                  {
                    href: '/blog/how-to-use-whipped-cream-dispenser-step-by-step',
                    title: 'How to Use a Whipped Cream Dispenser (Step-by-Step)',
                    desc: 'Complete guide to setting up, charging, and cleaning your dispenser with a 640g cylinder.',
                    tag: 'Guide',
                  },
                  {
                    href: '/blog/smartwhip-vs-fastgas-vs-cream-deluxe',
                    title: 'SmartWhip vs FastGas vs Cream Deluxe: Which Is Best?',
                    desc: 'Head-to-head comparison of the three top UK cream charger brands in 2026.',
                    tag: 'Comparison',
                  },
                  {
                    href: '/blog/best-cream-chargers-uk-2026',
                    title: 'Best Cream Chargers UK 2026: Full Brand Rankings',
                    desc: 'Every major brand ranked across quality, price, and real-world reliability.',
                    tag: 'Review',
                  },
                  {
                    href: '/blog/640g-cream-charger-vs-8g-cartridges',
                    title: '640g Cream Charger vs 8g Cartridges: Which Should You Use?',
                    desc: 'Why professional kitchens are switching from single-use to 640g cylinders.',
                    tag: 'Guide',
                  },
                ].map((guide, i) => (
                  <Link
                    key={i}
                    href={guide.href}
                    className="flex items-start gap-4 p-4 rounded-2xl border transition-all hover:border-orange-500"
                    style={{ borderColor: 'var(--border)', background: 'var(--surface-elevated)' }}
                  >
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(255,98,0,0.12)', color: 'var(--orange)' }}
                        >
                          {guide.tag}
                        </span>
                      </div>
                      <div className="text-sm font-black tracking-tight mb-1" style={{ color: 'var(--foreground)' }}>
                        {guide.title}
                      </div>
                      <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>
                        {guide.desc}
                      </p>
                    </div>
                    <div className="flex-shrink-0 pt-1" style={{ color: 'var(--muted)' }}>→</div>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT — sticky order panel */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 rounded-3xl border overflow-hidden"
              style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}
            >
              <div className="p-6 border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface-elevated)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full animate-pulse bg-green-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'rgb(34,197,94)' }}>
                    Ready to Dispatch
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                  Order in {townData.city}
                </h3>
                <p className="text-[11px] font-medium mt-1" style={{ color: 'var(--muted)' }}>
                  Delivery within {content.deliveryTime} minutes
                </p>
              </div>

              <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                <div
                  className="flex items-center justify-between px-6 py-5 border-b"
                  style={{ borderColor: 'var(--border-subtle)' }}
                >
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest mb-0.5" style={{ color: 'var(--muted)' }}>
                      Single Canister
                    </div>
                    <div className="text-[10px] font-bold" style={{ color: 'var(--muted-dim)' }}>
                      640g SmartWhip
                    </div>
                  </div>
                  <div className="text-2xl font-black" style={{ color: 'var(--foreground)' }}>
                    £30
                  </div>
                </div>
                <div className="flex items-center justify-between px-6 py-5">
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest mb-0.5" style={{ color: 'var(--orange)' }}>
                      Case Pack
                    </div>
                    <div className="text-[10px] font-bold" style={{ color: 'var(--muted-dim)' }}>
                      6× Canisters
                    </div>
                  </div>
                  <div className="text-2xl font-black" style={{ color: 'var(--orange)' }}>
                    £130
                  </div>
                </div>
              </div>

              <div className="px-6 pb-2 pt-4 space-y-3">
                <TownCTAButtons
                  whatsappUrl={whatsappUrl}
                  telegramUrl={telegramUrl}
                  town={townData.city}
                  variant="product"
                />
              </div>

              <div className="px-6 pb-6 pt-4">
                <div
                  className="rounded-2xl border p-4"
                  style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
                >
                  {[
                    `Delivery within ${content.deliveryTime} mins in ${townData.city}`,
                    'Discreet packaging, no labels',
                    '24/7 availability',
                    'Genuine certified stock only',
                  ].map((t, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 py-2 border-b last:border-0 text-xs font-bold"
                      style={{ borderColor: 'var(--border-subtle)', color: 'var(--muted)' }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--orange)' }} />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t py-8 mt-10" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
            Smart<span style={{ color: 'var(--orange)' }}>Whip</span>
          </span>
          <p className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--muted-dim)' }}>
            © 2026 SmartWhip — {townData.city} Delivery Hub
          </p>
          <nav className="flex gap-4">
            <Link href="/" className="text-[10px] font-bold uppercase tracking-widest hover:opacity-70" style={{ color: 'var(--muted)' }}>
              Home
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
