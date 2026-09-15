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
  'Genuine stock, no substitutions — the standard UK kitchens expect.',
  'Built for professional kitchens that can\'t afford to wait around.',
  'Certified N₂O cylinders, dispatched the moment you message us.',
  'The supplier UK caterers switch to and don\'t switch away from.',
];

const HERO_BADGES = [
  'UK\'s #1 Rated Supplier',
  'Trusted by Catering Pros',
  'Same-Day Delivery',
  'No. 1 for Speed & Quality',
  'Used by UK Restaurants',
  'Premium Grade, Fast Drop',
  'Genuine Stock Guaranteed',
  'Rated by Professionals',
];

/* --- Local intro paragraph: 3 independently-varying sentences, multiplied together --- */

const INTRO_OPENERS = [
  (city: string, admin: string) => `${city} sits right in the heart of ${admin}, and we built our local operation to match the pace catering professionals expect here.`,
  (city: string, admin: string) => `In ${city}, demand for reliable N₂O supply runs high — which is exactly why we maintain a dedicated presence across ${admin}.`,
  (city: string, admin: string) => `${city} is one of our core coverage zones within ${admin}, chosen because the local hospitality scene never really slows down.`,
  (city: string, admin: string) => `We've grown our ${admin} operation around cities like ${city}, where professional kitchens need a supplier they can actually rely on.`,
  (city: string, admin: string) => `Ask any caterer in ${city} what matters most and speed comes up first — it's the standard we hold ourselves to across ${admin}.`,
  (city: string, admin: string) => `${city} and the wider ${admin} area represent one of our busiest delivery corridors, and our stock levels reflect that.`,
  (city: string, admin: string) => `${admin} has a strong, steady demand for high-grade cream chargers, with ${city} sitting right at the centre of it.`,
];

const INTRO_MIDDLES = [
  (city: string, popNum: string, regionPhrase: string) => `With a population of roughly ${popNum}, ${city} needs a supplier that can move fast without cutting corners on authenticity.`,
  (city: string, popNum: string, regionPhrase: string) => `We hold dedicated stock ${regionPhrase}, so orders placed in ${city} aren't waiting on a warehouse somewhere else in the country.`,
  (city: string, popNum: string, regionPhrase: string) => `Serving a community of around ${popNum} people, we keep our ${city} operation stocked and ready around the clock.`,
  (city: string, popNum: string, regionPhrase: string) => `Our stock rotation is planned specifically ${regionPhrase}, which keeps ${city} orders moving even during high-demand periods.`,
  (city: string, popNum: string, regionPhrase: string) => `${city}'s roughly ${popNum}-strong population relies on a mix of independent kitchens and larger venues — we're set up to serve both.`,
  (city: string, popNum: string, regionPhrase: string) => `Coverage ${regionPhrase} means ${city} customers get the same dispatch speed as our busiest metro areas.`,
  (city: string, popNum: string, regionPhrase: string) => `We treat ${city} as a priority zone, not an afterthought — stock is held locally and refreshed constantly.`,
  (city: string, popNum: string, regionPhrase: string) => `Whether it's a single cylinder or a bulk case order, our ${city} stock is maintained to handle both without delay.`,
];

const INTRO_CLOSERS = [
  (city: string) => `That's the standard we hold ourselves to — fast, genuine, and available whenever ${city} needs us.`,
  (city: string) => `No shortcuts, no substitutions — just consistent, certified stock delivered on your schedule.`,
  (city: string) => `It's a simple promise: message us, and your ${city} order is moving within minutes.`,
  (city: string) => `We'd rather over-deliver on speed than make promises we can't keep in ${city}.`,
  (city: string) => `That consistency is why so many ${city} kitchens keep coming back to us.`,
  (city: string) => `Every order out of ${city} gets the same attention, regardless of size.`,
  (city: string) => `We built this operation to be dependable first — everything else follows from that.`,
  (city: string) => `Authenticity and speed aren't optional here; they're the baseline for every ${city} delivery.`,
  (city: string) => `Simple, fast, and genuine — that's what ${city} customers can expect every time.`,
];

/* --- Product descriptions: feature clause + city-specific close clause --- */

const PRODUCT_640G_FEATURES = [
  () => `The 640g SmartWhip cylinder delivers consistent pressure and 99.9% purity from the first charge to the last.`,
  () => `One 640g cylinder replaces over 80 standard 8g cartridges, with none of the inconsistency.`,
  () => `Every 640g unit is TUV certified and tested before it ever reaches a customer.`,
  () => `Consistent output, food-grade purity, and none of the waste that comes with single-use cartridges.`,
  () => `It's engineered for professional-volume use — steady pressure across the entire fill, not just the first few charges.`,
  () => `99.9% pure N₂O, TUV certified, and built for kitchens that can't afford inconsistent results.`,
];

const PRODUCT_640G_CLOSES = [
  (city: string) => `It's our most requested single unit in ${city}, and for good reason.`,
  (city: string) => `Ready for same-day dispatch to any address in ${city}.`,
  (city: string) => `Trusted by caterers and independent kitchens across ${city} alike.`,
  (city: string) => `We keep it in stock specifically for fast turnaround orders in ${city}.`,
  (city: string) => `It's the unit most ${city} customers reorder without thinking twice.`,
  (city: string) => `Dispatched same-day, every time, to anywhere in ${city}.`,
  (city: string) => `The benchmark unit for professional kitchens in and around ${city}.`,
];

const PRODUCT_CASE_FEATURES = [
  () => `Six 640g cylinders in a single delivery — the most efficient way to keep a busy kitchen stocked.`,
  () => `Better cost-per-unit, fewer reorders, and one delivery instead of six.`,
  () => `Built for volume buyers who can't afford to run low mid-service.`,
  () => `The case pack covers serious demand without the hassle of repeat ordering.`,
  () => `Six units, one drop-off — the smart choice for regular users.`,
  () => `Our best per-unit pricing, bundled into a single convenient shipment.`,
];

const PRODUCT_CASE_CLOSES = [
  (admin: string) => `The preferred option for wholesale and trade buyers across ${admin}.`,
  (admin: string) => `Popular with catering teams and events businesses across ${admin}.`,
  (admin: string) => `Consistently our best-value pick for professionals in ${admin}.`,
  (admin: string) => `Stocked specifically to serve high-volume buyers across ${admin}.`,
  (admin: string) => `The go-to order size for busy venues across ${admin}.`,
  (admin: string) => `A favourite among recurring customers throughout ${admin}.`,
  (admin: string) => `Built for the pace of professional kitchens across ${admin}.`,
];

/* --- FAQ pool --- */

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
  (city: string, admin: string) => ({
    q: `Where can I find cream chargers near me in ${city}?`,
    a: `You're already in the right place. We are the closest on-demand cream charger supplier to ${city}, operating 24/7. No need to visit a shop — message us on WhatsApp or Telegram and we'll deliver directly to your door in ${city}.`,
  }),
  (city: string, admin: string) => ({
    q: `Do you offer same day delivery of cream chargers in ${city}?`,
    a: `Yes — same day delivery is our standard for ${city}. Once you place your order, we confirm and dispatch within the hour. Most ${city} customers receive their order within the same day, often within a couple of hours.`,
  }),
  (city: string, admin: string) => ({
    q: `How do I use a SmartWhip 640g cylinder?`,
    a: `You'll need a compatible pressure regulator to connect the 640g cylinder to your whipped cream dispenser. Attach the regulator, connect your dispenser, open the valve slowly, and charge. The 640g gives consistent pressure across the full fill. If you're new to 640g cylinders, message us — we're happy to walk you through it.`,
  }),
  (city: string, admin: string) => ({
    q: `Can I get NOS delivery in ${city}?`,
    a: `Yes. We deliver N₂O (nitrous oxide) cream chargers directly in ${city} for professional culinary and catering use. Our stock includes SmartWhip, FastGas, and Cream Deluxe cylinders — all food-grade and certified for professional use.`,
  }),
  (city: string, admin: string) => ({
    q: `What is the fastest way to order cream chargers in ${city}?`,
    a: `The fastest way is via WhatsApp. Send us a message with your address in ${city} and what you need — we respond within minutes and dispatch the same day. Telegram is also available if you prefer.`,
  }),
  (city: string, admin: string) => ({
    q: `Do you deliver cream chargers to ${city} at night?`,
    a: `Yes — we operate around the clock including late nights and early mornings. Many of our ${city} orders come in during evening catering shifts. Just message us whenever you need, and we'll sort your delivery.`,
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

/* --- Extra feature text: claim clause + detail clause --- */

const EXTRA_FEATURE_CLAIMS = [
  (city: string) => `Every shipment to ${city} is checked before it leaves — you won't receive anything that's failed our quality check.`,
  (city: string) => `We run a strict zero-substitution policy in ${city}: if your exact product isn't in stock, we tell you upfront.`,
  (city: string) => `Orders placed for ${city} get a confirmation message within minutes, so you're never left guessing.`,
  (city: string) => `Our ${city} couriers are briefed on discreet handling — packaging is plain and professional, always.`,
  (city: string) => `Repeat customers in ${city} get priority dispatch on every order after their first.`,
  (city: string) => `We keep contingency stock earmarked for ${city}, so high-demand periods don't mean delays.`,
  (city: string) => `${city} orders are handled by the same small team every time, so nothing gets lost in translation.`,
];

const EXTRA_FEATURE_DETAILS = [
  (city: string, admin: string) => `It's a small thing, but it's the difference between a supplier you trust and one you don't.`,
  (city: string, admin: string) => `That level of consistency is exactly what busy kitchens across ${admin} expect from us.`,
  (city: string, admin: string) => `We'd rather be upfront about stock than let a ${city} customer down on delivery day.`,
  (city: string, admin: string) => `It keeps the whole ${city} operation predictable, even when demand spikes.`,
  (city: string, admin: string) => `Nothing about the process should feel uncertain — that's the whole point.`,
  (city: string, admin: string) => `It's how we've built repeat business across ${admin}, one reliable delivery at a time.`,
  (city: string, admin: string) => `Simple systems, followed properly — that's what keeps ${city} orders on time.`,
  (city: string, admin: string) => `We'd sooner lose a sale than send the wrong product to a ${city} address.`,
];

/* --- About SmartWhip paragraph (replaces the previously-static page copy) --- */

const ABOUT_OPENERS = [
  (city: string, admin: string) => `SmartWhip has become the benchmark for high-capacity N₂O delivery across the UK, and ${city} is no exception.`,
  (city: string, admin: string) => `Cafes, restaurants, and professional kitchens in ${city} choose SmartWhip because it delivers exactly what it promises.`,
  (city: string, admin: string) => `In ${city}, SmartWhip has built a reputation for consistency that cheaper alternatives just can't match.`,
  (city: string, admin: string) => `${city}'s catering scene has increasingly standardised on SmartWhip for one simple reason: it's reliable.`,
  (city: string, admin: string) => `SmartWhip's reputation across ${admin} rests on the same thing every time — genuine stock, delivered fast.`,
  (city: string, admin: string) => `For professional kitchens in ${city}, SmartWhip isn't just a brand — it's the safe, predictable choice.`,
  (city: string, admin: string) => `${city} venues that switch to SmartWhip rarely go back to their old supplier.`,
];

const ABOUT_CLOSES = [
  (city: string, admin: string) => `We also carry FastGas and Cream Deluxe for ${city} customers who want alternatives or specific preferences.`,
  (city: string, admin: string) => `Alongside SmartWhip, we stock FastGas and Cream Deluxe — genuine, certified, and available across ${admin}.`,
  (city: string, admin: string) => `FastGas and Cream Deluxe are also in stock for anyone in ${city} who prefers a different brand.`,
  (city: string, admin: string) => `We keep FastGas and Cream Deluxe on hand too, so ${city} customers always have a genuine alternative.`,
  (city: string, admin: string) => `If SmartWhip isn't your preference, FastGas and Cream Deluxe are both available to ${admin} customers.`,
  (city: string, admin: string) => `Four brands, one standard: genuine stock, fast dispatch, no exceptions — that's how we serve ${city}.`,
];

/* --- Near Me paragraph (replaces the previously-static page copy) --- */

const NEAR_ME_OPENERS = [
  (city: string) => `If you're searching for cream chargers near you in ${city}, you've found the right supplier.`,
  (city: string) => `Looking for same-day cream charger delivery in ${city}? This is where that search ends.`,
  (city: string) => `${city} customers searching for a reliable cream charger supplier land here for a reason.`,
  (city: string) => `Whether you searched "cream chargers near me" or found us directly, ${city} is fully covered.`,
  (city: string) => `${city} residents and businesses alike use us as their go-to for fast N₂O delivery.`,
  (city: string) => `No need to keep searching — we're already set up to serve ${city} directly.`,
];

const NEAR_ME_CLOSES = [
  (city: string, admin: string) => `We deliver SmartWhip, FastGas, and Cream Deluxe 640g cylinders directly to any address in ${city} and across ${admin} — the same day you order, 24 hours a day.`,
  (city: string, admin: string) => `Message us with your postcode in ${city} and we'll confirm stock and dispatch time within minutes, any hour of the day.`,
  (city: string, admin: string) => `No shop visit, no waiting around — just message us on WhatsApp or Telegram and your ${city} order is on its way.`,
  (city: string, admin: string) => `Coverage spans every postcode in ${city} and the wider ${admin} area, with dispatch running 24/7.`,
  (city: string, admin: string) => `Same-day delivery is standard for ${city}, not an upgrade — just tell us where and we'll handle the rest.`,
  (city: string, admin: string) => `We dispatch to ${city} and all of ${admin} around the clock, so timing is never the blocker.`,
  (city: string, admin: string) => `From first message to delivery, most ${city} orders are sorted within the hour.`,
];

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
  aboutParagraph: string;
  nearMeParagraph: string;
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

export function buildTownContent(town: TownMeta): TownContentResult {
  const { city, admin_name, population, lat, lng } = town;
  const region = getRegion(lat, lng, admin_name);
  const citySize = getCitySize(population);
  const deliveryTime = getDeliveryTime(citySize);
  const popNum = Number(population).toLocaleString();
  const regionPhrase = REGION_PHRASES[region];

  const heroSubtitle = pick(HERO_SUBTITLES, city);
  const heroBadge = pick(HERO_BADGES, city, 3);

  const localIntroParagraph = [
    pick(INTRO_OPENERS, city, 10)(city, admin_name),
    pick(INTRO_MIDDLES, city, 11)(city, popNum, regionPhrase),
    pick(INTRO_CLOSERS, city, 12)(city),
  ].join(' ');

  const productDesc640g = [
    pick(PRODUCT_640G_FEATURES, city, 30)(),
    pick(PRODUCT_640G_CLOSES, city, 31)(city),
  ].join(' ');

  const productDescCase = [
    pick(PRODUCT_CASE_FEATURES, city, 40)(),
    pick(PRODUCT_CASE_CLOSES, city, 41)(admin_name),
  ].join(' ');

  const faqFns = pickMany(FAQ_POOL, city, 5);
  const faqs = faqFns.map((fn) => fn(city, admin_name));

  const testimonials = pickMany(TESTIMONIALS, city, 3);

  const extraFeatureText = [
    pick(EXTRA_FEATURE_CLAIMS, city, 20)(city),
    pick(EXTRA_FEATURE_DETAILS, city, 21)(city, admin_name),
  ].join(' ');

  const aboutParagraph = [
    pick(ABOUT_OPENERS, city, 50)(city, admin_name),
    pick(ABOUT_CLOSES, city, 51)(city, admin_name),
  ].join(' ');

  const nearMeParagraph = [
    pick(NEAR_ME_OPENERS, city, 60)(city),
    pick(NEAR_ME_CLOSES, city, 61)(city, admin_name),
  ].join(' ');

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
    aboutParagraph,
    nearMeParagraph,
    regionPhrase,
  };
}
