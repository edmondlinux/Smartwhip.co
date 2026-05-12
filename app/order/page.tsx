'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, ArrowRight, Loader2, MessageCircle, Send, ChevronDown, ArrowLeft, X, ShoppingCart } from 'lucide-react';
import { searchTownsAction } from '@/app/actions';
import { getAppSettings } from '@/app/actions/admin';
import type { AppSettings } from '@/app/actions/admin';
import { usePostHog } from 'posthog-js/react';

const BRANDS = ['SmartWhip', 'FastGas', 'Cream Deluxe', 'GoldWhip'];

const BASE_URL = 'https://smartwhip.co';

const BRAND_META: Record<string, { sku: string; price: string; description: string; image: string; ratingValue: string; reviewCount: string }> = {
  SmartWhip: {
    sku: 'SW-640G-UK',
    price: '30.00',
    description: '99.9% pure food-grade N₂O. TUV certified. Europe\'s most trusted 640g cylinder for professional whipping and culinary applications.',
    image: '/products/smartwhip.jpeg',
    ratingValue: '4.9',
    reviewCount: '312',
  },
  FastGas: {
    sku: 'FG-640G-UK',
    price: '32.00',
    description: 'CE & TUV certified 640g N₂O cylinder. Superior regulator control praised by professional chefs.',
    image: '/products/fastgas.jpeg',
    ratingValue: '4.8',
    reviewCount: '198',
  },
  'Cream Deluxe': {
    sku: 'CD-640G-UK',
    price: '30.00',
    description: 'CE certified 640g N₂O. Competitive case pricing for high-volume catering operations.',
    image: '/products/cream-deluxe.jpeg',
    ratingValue: '4.8',
    reviewCount: '145',
  },
  GoldWhip: {
    sku: 'GW-640G-UK',
    price: '29.00',
    description: 'CE certified food-grade N₂O at a highly competitive price point. Cross-brand compatible.',
    image: '/products/goldwhip.jpeg',
    ratingValue: '4.7',
    reviewCount: '89',
  },
};

const BRAND_COLORS: Record<string, string> = {
  SmartWhip: 'var(--orange)',
  FastGas: 'rgb(99,102,241)',
  'Cream Deluxe': 'rgb(34,197,94)',
  GoldWhip: 'rgb(245,158,11)',
};

function buildWhatsAppLink(brand: string, town: string, base: string): string {
  const msg = `Hello, I would like to order ${brand} 640g to ${town}. Can you help with pricing and delivery time?`;
  const encoded = encodeURIComponent(msg);
  return base.includes('?') ? `${base}&text=${encoded}` : `${base}?text=${encoded}`;
}

function buildTelegramLink(brand: string, town: string, base: string): string {
  const msg = `Hello, I would like to order ${brand} 640g to ${town}. Can you help with pricing and delivery time?`;
  const encoded = encodeURIComponent(msg);
  return base.includes('?') ? `${base}&text=${encoded}` : `${base}?text=${encoded}`;
}

interface TownResult {
  id: string;
  name: string;
  admin: string;
  isDynamic?: boolean;
}

function OrderPageInner() {
  const searchParams = useSearchParams();
  const rawBrand = searchParams.get('brand') ?? 'SmartWhip';
  const initialBrand = BRANDS.includes(rawBrand) ? rawBrand : 'SmartWhip';
  const ph = usePostHog();

  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [brandOpen, setBrandOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TownResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTown, setSelectedTown] = useState<TownResult | null>(null);
  const [noResults, setNoResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const [appSettings, setAppSettings] = useState<AppSettings | null>(null);

  const brandColor = BRAND_COLORS[selectedBrand] ?? 'var(--orange)';

  useEffect(() => {
    ph?.capture('order_page_entered', { brand: selectedBrand });
    getAppSettings().then(setAppSettings);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!query || query.length < 3) {
      setResults([]);
      setNoResults(false);
      return;
    }
    setNoResults(false);
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await searchTownsAction(query);
        setResults(data);
        const hasNoResults = data.length === 0;
        setNoResults(hasNoResults);
        ph?.capture('town_searched', { query, results_count: data.length, brand: selectedBrand });
        if (hasNoResults) {
          ph?.capture('town_not_found', { query, brand: selectedBrand });
        }
      } catch {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (brandRef.current && !brandRef.current.contains(e.target as Node)) {
        setBrandOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleTownSelect = (town: TownResult) => {
    setSelectedTown(town);
    setQuery('');
    setResults([]);
    ph?.capture('town_selected', { town: town.name, admin: town.admin, brand: selectedBrand, source_page: 'order' });
  };

  const reset = () => {
    setSelectedTown(null);
    setQuery('');
    setResults([]);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const meta = BRAND_META[selectedBrand] ?? BRAND_META['SmartWhip'];
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${BASE_URL}/order?brand=${encodeURIComponent(selectedBrand)}#product`,
    name: `${selectedBrand} 640g N₂O Cream Charger Cylinder`,
    description: meta.description,
    image: {
      '@type': 'ImageObject',
      url: `${BASE_URL}${meta.image}`,
      width: 800,
      height: 800,
    },
    brand: {
      '@type': 'Brand',
      name: selectedBrand,
    },
    sku: meta.sku,
    mpn: meta.sku,
    url: `${BASE_URL}/order?brand=${encodeURIComponent(selectedBrand)}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: meta.ratingValue,
      reviewCount: meta.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: meta.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      url: `${BASE_URL}/order?brand=${encodeURIComponent(selectedBrand)}`,
      seller: {
        '@type': 'Organization',
        name: 'SmartWhip UK',
        url: BASE_URL,
      },
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
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'GB',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
      },
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Order', item: `${BASE_URL}/order` },
      { '@type': 'ListItem', position: 3, name: `${selectedBrand} 640g`, item: `${BASE_URL}/order?brand=${encodeURIComponent(selectedBrand)}` },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* NAV */}
      <header className="glass border-b sticky top-0 z-50" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest"
              style={{ color: 'var(--muted)' }}
            >
              <div className="p-1.5 rounded-lg border" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
                <ArrowLeft className="h-3 w-3" />
              </div>
              Back
            </Link>
          </div>
          <Link href="/" className="text-base font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
            Smart<span style={{ color: 'var(--orange)' }}>Whip</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-start px-6 pt-14 pb-20">
        <div className="w-full max-w-lg">

          {/* Heading */}
          <div className="text-center mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--orange)' }}>
              Step 1 of 2
            </span>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight mt-2 mb-3" style={{ color: 'var(--foreground)' }}>
              Where Are You?
            </h1>
            <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
              Search your town or city below so we can confirm delivery and connect you with the right local dispatch.
            </p>
          </div>

          {/* Brand selector */}
          <div className="mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-2" style={{ color: 'var(--muted-dim)' }}>
              Ordering
            </span>
            <div className="relative" ref={brandRef}>
              <button
                onClick={() => setBrandOpen(o => !o)}
                className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border text-sm font-black uppercase tracking-tight transition-all"
                style={{
                  borderColor: brandColor,
                  background: `${brandColor}10`,
                  color: 'var(--foreground)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ background: brandColor }} />
                  {selectedBrand} 640g
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>
                    Change
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${brandOpen ? 'rotate-180' : ''}`} style={{ color: 'var(--muted)' }} />
                </div>
              </button>

              {brandOpen && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 rounded-2xl border overflow-hidden shadow-2xl z-20"
                  style={{ background: 'var(--surface-elevated)', borderColor: 'var(--border)' }}
                >
                  {BRANDS.map(b => (
                    <button
                      key={b}
                      onClick={() => { setSelectedBrand(b); setBrandOpen(false); ph?.capture('brand_selected', { brand: b, source_page: 'order' }); }}
                      className="w-full flex items-center gap-3 px-5 py-3.5 text-sm font-black uppercase tracking-tight text-left transition-all border-b last:border-0"
                      style={{
                        borderColor: 'var(--border-subtle)',
                        background: b === selectedBrand ? `${BRAND_COLORS[b]}10` : 'transparent',
                        color: b === selectedBrand ? BRAND_COLORS[b] : 'var(--foreground)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = `${BRAND_COLORS[b]}10`)}
                      onMouseLeave={e => (e.currentTarget.style.background = b === selectedBrand ? `${BRAND_COLORS[b]}10` : 'transparent')}
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: BRAND_COLORS[b] }} />
                      {b} 640g
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Town search / selected state */}
          {!selectedTown ? (
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-2" style={{ color: 'var(--muted-dim)' }}>
                Your Town or City
              </span>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--muted)' }} />
                <input
                  ref={inputRef}
                  autoFocus
                  type="text"
                  placeholder="Type your town or city..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  className="w-full h-14 pl-11 pr-11 rounded-2xl border text-sm font-semibold outline-none transition-all"
                  style={{
                    background: 'var(--surface)',
                    borderColor: query.length >= 3 ? 'var(--orange)' : 'var(--border)',
                    color: 'var(--foreground)',
                  }}
                />
                {isSearching ? (
                  <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin" style={{ color: 'var(--orange)' }} />
                ) : query ? (
                  <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                    <X className="h-4 w-4" style={{ color: 'var(--muted)' }} />
                  </button>
                ) : null}
              </div>

              {/* Hint */}
              {query.length > 0 && query.length < 3 && (
                <p className="mt-2 text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--muted-dim)' }}>
                  Keep typing — at least 3 characters to search
                </p>
              )}

              {/* Results */}
              {results.length > 0 && (
                <div className="mt-2 rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                  {results.map((r, i) => (
                    <button
                      key={`${r.id}-${i}`}
                      onClick={() => handleTownSelect(r)}
                      className="w-full flex items-center justify-between px-5 py-4 border-b last:border-0 text-left transition-all group"
                      style={{ borderColor: 'var(--border-subtle)', background: 'var(--surface)' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-elevated)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface)')}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" style={{ color: 'var(--orange)' }} />
                        <div>
                          <div className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                            {r.name}
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: 'var(--muted-dim)' }}>
                            {r.admin}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" style={{ color: 'var(--muted)' }} />
                    </button>
                  ))}
                </div>
              )}

              {noResults && query.length >= 3 && !isSearching && (
                <div className="mt-2 rounded-2xl border px-5 py-4 text-center" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                  <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--muted)' }}>
                    No results for &quot;{query}&quot;
                  </p>
                  <p className="text-[11px] font-medium mt-1" style={{ color: 'var(--muted-dim)' }}>
                    Try a different spelling or nearby town
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Town confirmed — show order CTAs */
            <div className="mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-2" style={{ color: 'var(--muted-dim)' }}>
                Delivering To
              </span>

              {/* Confirmed town card */}
              <div
                className="flex items-center justify-between px-5 py-4 rounded-2xl border mb-6"
                style={{ background: 'var(--surface)', borderColor: 'var(--orange)' }}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 flex-shrink-0" style={{ color: 'var(--orange)' }} />
                  <div>
                    <div className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--foreground)' }}>
                      {selectedTown.name}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: 'var(--muted-dim)' }}>
                      {selectedTown.admin}
                    </div>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest"
                  style={{ color: 'var(--muted)' }}
                >
                  Change <X className="h-3 w-3" />
                </button>
              </div>

              {/* Step 2 heading */}
              <div className="text-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--orange)' }}>
                  Step 2 of 2
                </span>
                <h2 className="text-xl font-black uppercase tracking-tight mt-1" style={{ color: 'var(--foreground)' }}>
                  Choose How to Order
                </h2>
              </div>

              {/* Order summary */}
              <div
                className="rounded-2xl border p-4 mb-5 text-center"
                style={{ background: `${brandColor}08`, borderColor: `${brandColor}30` }}
              >
                <p className="text-xs font-bold" style={{ color: 'var(--muted)' }}>
                  Your order:
                  <span className="font-black uppercase tracking-tight ml-2" style={{ color: 'var(--foreground)' }}>
                    {selectedBrand} 640g
                  </span>
                  <span className="mx-2" style={{ color: 'var(--muted-dim)' }}>→</span>
                  <span className="font-black uppercase tracking-tight" style={{ color: brandColor }}>
                    {selectedTown.name}
                  </span>
                </p>
              </div>

              {/* CTA buttons — driven by checkout mode from admin panel */}
              <div className="flex flex-col gap-3">
                {!appSettings ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-5 w-5 animate-spin" style={{ color: 'var(--orange)' }} />
                  </div>
                ) : appSettings.checkoutMode === 'bank' ? (
                  /* ── BANK CHECKOUT MODE ── */
                  <>
                    <Link
                      href={`/order/checkout?brand=${encodeURIComponent(selectedBrand)}&town=${encodeURIComponent(selectedTown.name)}&admin=${encodeURIComponent(selectedTown.admin)}`}
                      onClick={() => ph?.capture('order_now_clicked', { town: selectedTown.name, brand: selectedBrand })}
                      className="flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-[0.98]"
                      style={{ background: 'var(--orange)' }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Order Now
                    </Link>
                    <div className="flex flex-col gap-2">
                      <button disabled className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest cursor-not-allowed"
                        style={{ background: 'rgba(37,211,102,0.15)', color: 'rgba(37,211,102,0.45)', border: '1px solid rgba(37,211,102,0.2)' }}>
                        <MessageCircle className="h-4 w-4" />
                        Order via WhatsApp
                        <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ml-1" style={{ background: 'rgba(37,211,102,0.15)' }}>Soon</span>
                      </button>
                      <button disabled className="flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest cursor-not-allowed"
                        style={{ background: 'rgba(0,136,204,0.12)', color: 'rgba(0,136,204,0.4)', border: '1px solid rgba(0,136,204,0.18)' }}>
                        <Send className="h-4 w-4" />
                        Order via Telegram
                        <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ml-1" style={{ background: 'rgba(0,136,204,0.15)' }}>Soon</span>
                      </button>
                    </div>
                  </>
                ) : (
                  /* ── SOCIAL MODE ── */
                  <>
                    <a
                      href={buildWhatsAppLink(selectedBrand, selectedTown.name, appSettings.whatsappUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => ph?.capture('whatsapp_clicked', { button_type: 'order-page', town: selectedTown.name, brand: selectedBrand, source_page: 'order' })}
                      className="flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-[0.98]"
                      style={{ background: '#25D366' }}
                    >
                      <MessageCircle className="h-4 w-4" />
                      Order via WhatsApp
                    </a>
                    <a
                      href={buildTelegramLink(selectedBrand, selectedTown.name, appSettings.telegramUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => ph?.capture('telegram_clicked', { button_type: 'order-page', town: selectedTown.name, brand: selectedBrand, source_page: 'order' })}
                      className="flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-[0.98]"
                      style={{ background: '#0088cc' }}
                    >
                      <Send className="h-4 w-4" />
                      Order via Telegram
                    </a>
                  </>
                )}
              </div>

              {/* What happens next */}
              <div className="mt-6 rounded-2xl border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] block mb-3" style={{ color: 'var(--orange)' }}>
                  What Happens Next
                </span>
                <div className="space-y-3">
                  {[
                    'Your message opens with your town and brand pre-filled',
                    'We confirm your order, price, and delivery window',
                    'Local dispatch is sent — most areas within the hour',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(255,98,0,0.1)', color: 'var(--orange)' }}>
                        {i + 1}
                      </span>
                      <span className="text-xs font-medium leading-relaxed" style={{ color: 'var(--muted)' }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer note */}
          <p className="text-center text-[11px] font-medium" style={{ color: 'var(--muted-dim)' }}>
            All products are food-grade certified. Delivery available across the UK.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <Loader2 className="h-6 w-6 animate-spin" style={{ color: 'var(--orange)' }} />
      </div>
    }>
      <OrderPageInner />
    </Suspense>
  );
}
