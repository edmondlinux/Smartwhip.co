export interface TownMeta {
  city: string;
  admin_name: string;
  population: string;
  lat: string;
  lng: string;
  capital?: string;
}

function seed(city: string): number {
  return city.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
}

function pick<T>(arr: T[], city: string, offset = 0): T {
  return arr[(seed(city) + offset) % arr.length];
}

function pickMany<T>(arr: T[], city: string, count: number): T[] {
  const s = seed(city);
  const result: T[] = [];
  const used = new Set<number>();
  let i = 0;
  while (result.length < count && result.length < arr.length) {
    const idx = (s + i * 13 + i * i) % arr.length;
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
    i++;
  }
  return result;
}

export type Region = 'Scotland' | 'North' | 'Yorkshire' | 'Midlands' | 'East' | 'SouthWest' | 'London' | 'South' | 'Wales' | 'NorthernIreland';

export function getRegion(lat: string, lng: string, adminName: string): Region {
  const la = parseFloat(lat);
  const lo = parseFloat(lng);
  const admin = adminName.toLowerCase();

  if (admin.includes('scotland') || la > 55.5) return 'Scotland';
  if (admin.includes('northern ireland') || admin.includes('antrim') || admin.includes('belfast')) return 'NorthernIreland';
  if (admin.includes('wales') || admin.includes('cardiff') || admin.includes('swansea') || (lo < -3.5 && la < 53.5 && la > 51.3)) return 'Wales';
  if (la > 54.5) return 'North';
  if (la > 53.5 && la <= 54.5) return 'Yorkshire';
  if (la > 52.2 && la <= 53.5) return 'Midlands';
  if (la > 51.6 && la <= 52.2 && lo > -0.5) return 'East';
  if (lo < -3.0 && la < 52.5) return 'SouthWest';
  if (la >= 51.3 && la <= 51.7 && lo >= -0.5 && lo <= 0.3) return 'London';
  return 'South';
}

export type CitySize = 'major' | 'large' | 'medium' | 'small';

export function getCitySize(population: string): CitySize {
  const pop = parseInt(population, 10) || 0;
  if (pop > 500000) return 'major';
  if (pop > 100000) return 'large';
  if (pop > 20000) return 'medium';
  return 'small';
}

export function getDeliveryTime(size: CitySize): string {
  const times: Record<CitySize, string> = {
    major: '20-35',
    large: '25-45',
    medium: '30-50',
    small: '35-60',
  };
  return times[size];
}

const HERO_SUBTITLES = [
  'The UK\'s most trusted N₂O delivery service — premium cylinders, no fuss.',
  'Professional-grade cream chargers, delivered to your door with speed.',
  'The catering industry\'s first choice for high-capacity N₂O in the UK.',
  'Authentic SmartWhip cylinders — same-day delivery, guaranteed pure stock.',
  'Fast, discreet, and reliable — the way professional delivery should work.',
  'Top-tier N₂O cylinders sourced direct, delivered faster than anyone else.',
];

const HERO_BADGES = [
  'UK\'s #1 Rated Supplier',
  'Trusted by Catering Pros',
  'Same-Day Delivery',
  'No. 1 for Speed & Quality',
  'Used by UK Restaurants',
  'Premium Grade, Fast Drop',
];

const LOCAL_INTRO_PARAGRAPHS = [
  (city: string, admin: string, pop: string, region: Region) =>
    `${city} sits at the heart of ${admin}, a high-demand area where catering professionals expect nothing less than rapid delivery of certified N₂O supplies. With over ${Number(pop).toLocaleString()} residents across the ${region} region, we built our ${city} operation to match local pace — stocked up, ready to move, and always available.`,

  (city: string, admin: string, pop: string, region: Region) =>
    `Our ${city} coverage is designed for the pace of ${admin}. Whether you run a busy hospitality venue or operate as an independent professional, we hold deep stock levels and dispatch to any postcode across ${city} with the speed that the ${region} market demands.`,

  (city: string, admin: string, pop: string, region: Region) =>
    `${city} is one of our core delivery zones. The ${admin} area has a strong and growing demand for high-grade cream chargers, and our team is set up specifically to serve the ${Number(pop).toLocaleString()}-strong community here. Fast, consistent, and always genuine stock — that's the standard we hold ourselves to in ${region}.`,

  (city: string, admin: string, pop: string, region: Region) =>
    `We've been serving ${admin} long enough to understand what ${city} professionals need: authenticity, speed, and someone available when it counts. Our inventory is maintained specifically for the ${region} market, ensuring ${city} orders go out the door without delay.`,

  (city: string, admin: string, pop: string, region: Region) =>
    `The catering and hospitality scene in ${city} is competitive — and your suppliers need to keep up. That's why our ${admin} team maintains active stock 24 hours a day, dispatching directly across ${city} within our guaranteed delivery window. Over ${Number(pop).toLocaleString()} people call this area home; we make sure every one of them can count on us.`,

  (city: string, admin: string, pop: string, region: Region) =>
    `SmartWhip's ${city} hub was built around one principle: local professionals deserve local-speed delivery. Serving ${admin} and the wider ${region} corridor, we keep our stock rotated, our prices competitive, and our response time within the fastest in the country.`,

  (city: string, admin: string, pop: string, region: Region) =>
    `In a city like ${city}, standards are high. That's exactly why we hold dedicated stock for ${admin}, ensuring orders placed in ${city} are never waiting on a warehouse elsewhere. Pure, certified, and dispatched fast — the way the ${region} market expects.`,

  (city: string, admin: string, pop: string, region: Region) =>
    `${city} professionals have been relying on us for quick-turnaround N₂O delivery across the ${admin} area. Our coverage spans every postcode in ${city}, backed by round-the-clock availability and a commitment to never compromising on product quality in the ${region} region.`,
];

const PRODUCT_DESC_640G = [
  (city: string) => `The 640g SmartWhip cylinder is the benchmark for professional N₂O supply. Consistent pressure, 99.9% purity, and a capacity equal to 80+ standard cartridges — dispatched directly to you in ${city}.`,
  (city: string) => `Industry standard for a reason: the SmartWhip 640g delivers reliable, high-purity N₂O every time. Our most popular single unit in ${city}, it's trusted by caterers, cafes, and independent professionals alike.`,
  (city: string) => `One cylinder, maximum output. The SmartWhip 640g is engineered for consistent pressure delivery and unmatched N₂O purity. Fast dispatch to your ${city} address, every time.`,
  (city: string) => `Our best-selling unit and the most requested product in ${city}. The 640g SmartWhip cylinder offers superior purity and the capacity professionals demand — ready to ship now.`,
];

const PRODUCT_DESC_CASE = [
  (admin: string) => `Six units, one delivery. The case pack is our best-value option for professionals and volume buyers across ${admin}. Stock your kitchen efficiently and save on every order.`,
  (admin: string) => `The smart choice for regular users across ${admin}. Six SmartWhip 640g cylinders in one shipment — lower cost per unit and fewer reorders for busy kitchens.`,
  (admin: string) => `Built for professionals who can't afford to run low. The 6× case pack covers serious N₂O demand across ${admin}, with the best per-unit price we offer.`,
  (admin: string) => `Stock up and save. The 6-canister case pack is our most cost-efficient offering for wholesale buyers and consistent users in the ${admin} region.`,
];

const FAQ_POOL = [
  (city: string, admin: string) => ({
    q: `How do I place an order for SmartWhip in ${city}?`,
    a: `Simply tap the WhatsApp or Telegram button on this page. Let us know you're in ${city}, the product you need, and your delivery address. We'll confirm availability and dispatch immediately.`,
  }),
  (city: string, admin: string) => ({
    q: `Do you deliver to all postcodes in ${city}?`,
    a: `Yes — we cover every postcode across ${city} and the surrounding ${admin} area. Whether you're in the town centre or on the outskirts, we deliver directly to you.`,
  }),
  (city: string, admin: string) => ({
    q: `What N₂O brands do you stock in ${admin}?`,
    a: `We carry SmartWhip, FastGas, Cream Deluxe, and GoldWhip — all fully certified and available for fast delivery in ${city}.`,
  }),
  (city: string, admin: string) => ({
    q: `Is the N₂O food-grade and certified?`,
    a: `Absolutely. Every cylinder we dispatch is 99.9% pure food-grade Nitrous Oxide, TUV certified, and tested to the highest industry standards. We stock nothing less.`,
  }),
  (city: string, admin: string) => ({
    q: `Can I buy in bulk for my catering business in ${city}?`,
    a: `Yes. We cater to both individual buyers and trade professionals in ${admin}. Bulk case packs, pallet orders, and recurring supply arrangements are all available — just message us to discuss.`,
  }),
  (city: string, admin: string) => ({
    q: `Are there delivery charges for ${city} orders?`,
    a: `We offer competitive local delivery rates for ${city} and the wider ${admin} area. Contact us directly via WhatsApp or Telegram for a quick quote based on your postcode and order size.`,
  }),
  (city: string, admin: string) => ({
    q: `What time of day can I order in ${city}?`,
    a: `We operate 24 hours a day, 7 days a week. Whether it's a late-night catering shift or an early morning prep session, our ${city} delivery team is always active.`,
  }),
  (city: string, admin: string) => ({
    q: `How is the SmartWhip 640g different from standard 8g chargers?`,
    a: `The 640g cylinder is equivalent to over 80 individual 8g cartridges — it's far more economical, produces less waste, and is the preferred format for professional kitchens in ${admin}.`,
  }),
  (city: string, admin: string) => ({
    q: `How do you ensure product authenticity for ${city} orders?`,
    a: `We only source directly from authorised SmartWhip, FastGas, and Cream Deluxe distributors. Every product we deliver to ${city} carries the original manufacturer seal and batch certification.`,
  }),
  (city: string, admin: string) => ({
    q: `Can I track my delivery in ${city}?`,
    a: `Once your order is confirmed and dispatched, our team will keep you updated via your chosen messaging channel. For ${city} orders, we typically provide real-time updates until arrival.`,
  }),
  (city: string, admin: string) => ({
    q: `Do you offer a regular supply contract for ${admin} businesses?`,
    a: `Yes — we work with several businesses in ${admin} on a recurring supply basis. If you need guaranteed weekly or bi-weekly deliveries to ${city}, get in touch and we'll set up an arrangement.`,
  }),
  (city: string, admin: string) => ({
    q: `Is SmartWhip legal to buy in the UK?`,
    a: `Nitrous oxide for culinary and catering use is legal in the UK for professional and commercial purposes. Our products are sold strictly for food preparation and professional catering use across ${city} and ${admin}.`,
  }),
];

const TESTIMONIALS = [
  { name: 'James R.', role: 'Head Chef', text: 'Fastest delivery I\'ve ever had. Ordered at 11pm and it arrived before midnight. Exactly what a busy kitchen needs.' },
  { name: 'Sarah K.', role: 'Bakery Owner', text: 'Been using SmartWhip for 3 months now. The quality is consistent and the team always responds within minutes on WhatsApp.' },
  { name: 'Marcus T.', role: 'Restaurant Manager', text: 'Switched from my old supplier and I genuinely cannot believe the difference in delivery speed. Highly recommend.' },
  { name: 'Priya N.', role: 'Catering Coordinator', text: 'The case pack is great value. We go through stock quickly for events and this is the most reliable supply we\'ve found.' },
  { name: 'Dean O.', role: 'Pastry Chef', text: 'The 640g cylinders are perfectly consistent. I\'ve tried cheaper alternatives and always come back to SmartWhip.' },
  { name: 'Fiona M.', role: 'Cafe Owner', text: 'No dramas, no delays. Every order arrives when they say it will. That reliability is priceless when you\'re running a business.' },
  { name: 'Tom W.', role: 'Events Caterer', text: 'We order in bulk regularly and the team always sorts us out quickly. The bulk pricing is fair and the stock is always genuine.' },
  { name: 'Aisha B.', role: 'Kitchen Supervisor', text: 'I was sceptical at first ordering via WhatsApp but it works perfectly. Quick confirmation, fast delivery, genuine product.' },
  { name: 'Carl S.', role: 'Independent Chef', text: 'Top-tier service. I\'ve recommended SmartWhip to everyone I know in the industry. Never had a single issue.' },
  { name: 'Leanne P.', role: 'Food Service Manager', text: 'Stock was exactly as described, sealed and certified. Arrived fast and the team was professional throughout.' },
];

const NEARBY_RADIUS_KM = 60;

function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getNearbyTowns(
  currentCity: string,
  lat: string,
  lng: string,
  allTowns: TownMeta[],
  limit = 8
): { city: string; slug: string; distance: number }[] {
  const la = parseFloat(lat);
  const lo = parseFloat(lng);
  return allTowns
    .filter((t) => t.city !== currentCity)
    .map((t) => ({
      city: t.city,
      slug: t.city.toLowerCase().replace(/\s+/g, '-'),
      distance: distanceKm(la, lo, parseFloat(t.lat), parseFloat(t.lng)),
    }))
    .filter((t) => t.distance <= NEARBY_RADIUS_KM)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}

export interface TownContentResult {
  region: Region;
  citySize: CitySize;
  deliveryTime: string;
  heroSubtitle: string;
  heroBadge: string;
  localIntroParagraph: string;
  productDesc640g: string;
  productDescCase: string;
  faqs: { q: string; a: string }[];
  testimonials: typeof TESTIMONIALS;
  extraFeatureText: string;
  regionPhrase: string;
}

const REGION_PHRASES: Record<Region, string> = {
  Scotland: 'across central Scotland',
  North: 'across the North of England',
  Yorkshire: 'across Yorkshire and the Humber',
  Midlands: 'across the Midlands',
  East: 'across East England',
  SouthWest: 'across the South West',
  London: 'across Greater London',
  South: 'across the South of England',
  Wales: 'across Wales',
  NorthernIreland: 'across Northern Ireland',
};

const EXTRA_FEATURE_TEXTS = [
  (city: string) => `Our ${city} team verifies every shipment before dispatch — you'll never receive a product that hasn't passed our quality check.`,
  (city: string) => `We maintain a zero-substitution policy in ${city}: if your exact product isn't available, we'll tell you upfront rather than send an alternative without asking.`,
  (city: string) => `Every order placed for ${city} gets a confirmation message within minutes. No waiting, no uncertainty — just fast, clear service.`,
  (city: string) => `Our ${city} couriers are briefed on discreet delivery. Packaging is plain, professional, and never draws attention.`,
  (city: string) => `Repeat customers in ${city} benefit from priority dispatch. Once you've ordered with us, your next drop is always faster.`,
  (city: string) => `We carry contingency stock specifically for ${city} — so even during high-demand periods, your order won't be delayed.`,
];

export function buildTownContent(town: TownMeta): TownContentResult {
  const { city, admin_name, population, lat, lng } = town;
  const region = getRegion(lat, lng, admin_name);
  const citySize = getCitySize(population);
  const deliveryTime = getDeliveryTime(citySize);

  const heroSubtitle = pick(HERO_SUBTITLES, city);
  const heroBadge = pick(HERO_BADGES, city, 3);

  const localIntroFn = pick(LOCAL_INTRO_PARAGRAPHS, city, 1);
  const localIntroParagraph = localIntroFn(city, admin_name, population, region);

  const productDesc640gFn = pick(PRODUCT_DESC_640G, city, 2);
  const productDesc640g = productDesc640gFn(city);

  const productDescCaseFn = pick(PRODUCT_DESC_CASE, city, 5);
  const productDescCase = productDescCaseFn(admin_name);

  const faqFns = pickMany(FAQ_POOL, city, 5);
  const faqs = faqFns.map((fn) => fn(city, admin_name));

  const testimonials = pickMany(TESTIMONIALS, city, 3);

  const extraFeatureFn = pick(EXTRA_FEATURE_TEXTS, city, 4);
  const extraFeatureText = extraFeatureFn(city);

  const regionPhrase = REGION_PHRASES[region];

  return {
    region,
    citySize,
    deliveryTime,
    heroSubtitle,
    heroBadge,
    localIntroParagraph,
    productDesc640g,
    productDescCase,
    faqs,
    testimonials,
    extraFeatureText,
    regionPhrase,
  };
}
