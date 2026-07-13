export interface BlogSection {
  heading?: string;
  body?: string;
  list?: string[];
  type?: 'intro' | 'body' | 'cta' | 'tip' | 'table';
  tableHeaders?: string[];
  tableRows?: string[][];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  coverImage?: string;
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'smartwhip-640g-review',
    title: 'SmartWhip 640g Review: Is It Worth It for Professional Caterers?',
    description: 'An in-depth SmartWhip 640g review covering performance, purity, compatibility, pricing, and whether it is the right N2O cylinder for professional caterers in the UK.',
    excerpt: 'The SmartWhip 640g has become the benchmark for professional N2O delivery in the UK. But is it really worth it? We break down everything you need to know before you buy.',
    category: 'Reviews',
    tags: ['SmartWhip', 'SmartWhip review', 'SmartWhip 640g', 'cream charger review', 'N2O UK'],
    publishedAt: '2025-11-10',
    updatedAt: '2026-01-15',
    readTime: 7,
    sections: [
      {
        type: 'intro',
        body: `If you work in catering, hospitality, or any food service environment in the UK, you have almost certainly come across the SmartWhip 640g cylinder. It has gone from a niche product to the industry's go-to N₂O solution in a matter of years — and for good reason. But with more brands entering the market and prices varying widely, it is worth taking a serious look at whether the SmartWhip 640g still earns its reputation in 2025.

This review covers everything: purity levels, build quality, compatibility, pricing, and real-world performance for professional use.`,
      },
      {
        heading: 'What Is the SmartWhip 640g?',
        type: 'body',
        body: `The SmartWhip 640g is a high-capacity nitrous oxide (N₂O) cylinder designed primarily for professional cream charger use. Unlike the standard 8g single-use cartridges that dominated the market for decades, the 640g cylinder packs the equivalent of 80+ individual chargers into a single, pressure-regulated unit.

The cylinder connects directly to a compatible whip cream dispenser via a pressure regulator. Once attached, it delivers a consistent, controllable stream of N₂O — eliminating the waste and hassle of swapping out cartridges mid-service.`,
      },
      {
        heading: 'Purity and Certification',
        type: 'body',
        body: `SmartWhip uses 99.9% pure food-grade nitrous oxide — the highest standard in the consumer and professional market. Every batch is independently tested, and cylinders carry TUV certification, which is the European benchmark for safety in pressure-vessel products.

For professional kitchens where the end product is served to customers, this matters enormously. Impure N₂O can affect taste and, more importantly, safety. SmartWhip consistently passes quality audits that cheaper, unbranded alternatives often fail.`,
      },
      {
        heading: 'Build Quality and Design',
        type: 'body',
        body: `The cylinder itself is well-constructed — sturdy steel, properly weighted, and with a valve design that prevents leakage even when partially used and stored upright. The threading for regulator attachment is clean and precise, which matters when you are connecting and disconnecting multiple times in a busy kitchen environment.

One practical advantage over smaller cartridges: the 640g cylinder does not need to be fully used in a single session. You connect it, use what you need, disconnect the regulator, and the remaining gas stays sealed in the cylinder. This makes it far more economical for operations that do not run through enormous volumes every day.`,
      },
      {
        heading: 'Compatibility',
        type: 'body',
        body: `The SmartWhip 640g is compatible with all standard SmartWhip pressure regulators and the vast majority of professional whipped cream dispensers on the market. Before purchasing any 640g cylinder — regardless of brand — it is worth confirming your regulator is rated for the cylinder's output pressure.

SmartWhip regulators are designed to provide a smooth, adjustable flow rate, which gives you precise control over output — useful when consistency matters, as it does in fine dining and high-volume catering alike.`,
      },
      {
        heading: 'Price and Value',
        type: 'body',
        body: `In the UK, the SmartWhip 640g typically retails at £30 per cylinder. At that price, it works out to far less than buying the equivalent in 8g cartridges. A standard pack of 10 × 8g cartridges costs between £8 and £12, meaning a full equivalent 640g fill would cost £64–£96 in individual cartridges.

The case pack — six SmartWhip 640g cylinders for £130 — pushes the per-unit cost down to under £22 per cylinder. For businesses with regular demand, this represents a substantial saving over time.`,
      },
      {
        heading: 'Who Is It Best For?',
        type: 'body',
        list: [
          'Professional chefs and pastry teams running high-output kitchens',
          'Cafes and coffee shops using whipped cream as a consistent menu item',
          'Event caterers who need to prep large volumes quickly',
          'Independent food professionals who order regularly and want to reduce per-unit cost',
          'Anyone who has grown frustrated with the waste and inconsistency of 8g cartridges',
        ],
      },
      {
        heading: 'Verdict',
        type: 'body',
        body: `The SmartWhip 640g continues to justify its position as the industry standard. The purity is unmatched, the build is reliable, and the economics make sense for anyone with regular N₂O requirements. The only consideration is upfront cost — you will need a compatible regulator if you do not already have one. But for professional use, this is a one-time purchase that pays back quickly.

If you are still running through boxes of 8g cartridges, it is time to make the switch.`,
      },
      {
        type: 'cta',
        body: 'Ready to order SmartWhip 640g with fast delivery across the UK?',
      },
    ],
  },

  {
    slug: 'smartwhip-vs-fastgas-vs-cream-deluxe',
    title: 'SmartWhip vs FastGas vs Cream Deluxe 2026: Which Is Best? Honest UK Review',
    description: 'SmartWhip vs FastGas vs Cream Deluxe — compared head-to-head in 2026. Purity, price, pressure, and which 640g cream charger brand wins for UK professionals. Updated June 2026.',
    excerpt: 'Three brands dominate the UK 640g N₂O cylinder market: SmartWhip, FastGas, and Cream Deluxe. Here is how they compare across the metrics that actually matter.',
    category: 'Comparisons',
    tags: ['SmartWhip vs FastGas', 'cream charger comparison', 'FastGas UK', 'Cream Deluxe', 'best cream chargers UK 2026'],
    publishedAt: '2025-11-28',
    updatedAt: '2026-06-01',
    readTime: 8,
    sections: [
      {
        type: 'intro',
        body: `The UK cream charger market has matured significantly. Where once there was one dominant option, there are now three credible brands competing at the professional level: SmartWhip, FastGas, and Cream Deluxe. Each has its advocates, its strengths, and — depending on who you ask — its drawbacks.

This comparison cuts through the brand marketing and looks at what actually matters: purity, pressure consistency, pricing, cylinder build, and real-world reliability. Whether you run a restaurant kitchen, a catering business, or just need reliable N₂O supply for professional use, this guide will help you make the right call.`,
      },
      {
        heading: 'At a Glance',
        type: 'table',
        tableHeaders: ['Feature', 'SmartWhip', 'FastGas', 'Cream Deluxe'],
        tableRows: [
          ['Cylinder Size', '640g', '640g', '640g'],
          ['N₂O Purity', '99.9%', '99.9%', '99.9%'],
          ['Certification', 'TUV', 'CE/TUV', 'CE Certified'],
          ['Single Price (UK)', '£30', '£30–£33', '£29–£31'],
          ['Case of 6', '£130', '£135–£145', '£125–£135'],
          ['Regulator Required', 'Yes', 'Yes', 'Yes'],
          ['UK Availability', 'Excellent', 'Very Good', 'Good'],
        ],
      },
      {
        heading: 'SmartWhip: The Industry Standard',
        type: 'body',
        body: `SmartWhip is the most widely recognised 640g N₂O brand in the UK and across Europe. It was among the first to mass-market the high-capacity cylinder format to professional caterers, and it has built a loyal following as a result.

The 640g SmartWhip cylinder delivers 99.9% pure food-grade N₂O, TUV certified, with consistent fill accuracy and a robust steel housing. The regulator ecosystem is well-developed — there are multiple regulator options available from SmartWhip directly, and third-party compatibles are easy to find.

Where SmartWhip wins most clearly is in availability and trust. If you need to order quickly and you want to be confident the product will arrive as described, SmartWhip has the track record.`,
      },
      {
        heading: 'FastGas: The High-Performance Competitor',
        type: 'body',
        body: `FastGas has positioned itself as a premium alternative — in some markets, commanding a slight price premium over SmartWhip. The cylinder is well-built, CE and TUV certified, and delivers the same 99.9% purity standard.

Where FastGas differentiates is in its regulator design. FastGas regulators are praised by many professionals for their precise flow control and ergonomic handling, which can make a noticeable difference during high-volume service. Some chefs prefer the FastGas regulator over SmartWhip's simply because of how it feels in use.

In terms of raw product quality, FastGas is a genuine peer of SmartWhip. The brand has grown rapidly across the UK hospitality sector, and supply is increasingly reliable.`,
      },
      {
        heading: 'Cream Deluxe: The Value Play',
        type: 'body',
        body: `Cream Deluxe entered the 640g market later than the other two but has carved out a strong position by competing on price without sacrificing certification quality. CE certified and available in the same 640g format, it offers comparable N₂O purity at a marginally lower price point in most UK markets.

The brand has been particularly popular with catering businesses buying in volume — where the per-unit saving across a case pack adds up meaningfully over a year of supply.

The slight trade-off is in regulator availability and compatibility. Cream Deluxe regulators are less widely available than SmartWhip alternatives, though most standard 640g regulators will work with the cylinder.`,
      },
      {
        heading: 'Which Should You Choose?',
        type: 'body',
        body: `The honest answer for most UK catering professionals: any of the three will deliver excellent results. The purity standard is the same across all three, and the cylinder format is essentially identical.

The decision typically comes down to:`,
        list: [
          'SmartWhip — if availability and brand support matter most to you',
          'FastGas — if you prioritise regulator quality and precise flow control',
          'Cream Deluxe — if you buy in bulk and want the best per-unit cost',
          'All three — if you want to hedge supply and keep multiple brands in stock',
        ],
      },
      {
        heading: 'GoldWhip: The Honourable Mention',
        type: 'body',
        body: `GoldWhip is the fourth brand in our range and deserves a mention. It sits in a similar position to Cream Deluxe — certified, food-grade, and competitive on price — and is popular among buyers who prefer variety or find GoldWhip easier to source through particular channels.`,
      },
      {
        type: 'cta',
        body: 'We stock all four brands — SmartWhip, FastGas, Cream Deluxe, and GoldWhip — for fast delivery across the UK.',
      },
    ],
  },

  {
    slug: '640g-cream-charger-vs-8g-cartridges',
    title: '640g Cream Charger Cylinders vs 8g Cartridges: The Real Cost Comparison',
    description: 'Compare 640g N2O cream charger cylinders against standard 8g cartridges on cost, waste, performance, and professional suitability. Find out which is better for your operation.',
    excerpt: 'If you are still buying boxes of 8g cream charger cartridges, you might be spending twice what you need to. Here is the real cost comparison that nobody talks about.',
    category: 'Guides',
    tags: ['640g cream charger', '8g cream charger cartridges', 'cream charger cost', 'N2O cylinder vs cartridge', 'professional cream chargers'],
    publishedAt: '2025-12-05',
    updatedAt: '2026-01-20',
    readTime: 6,
    sections: [
      {
        type: 'intro',
        body: `For decades, the 8g single-use cream charger was the only practical option for most food service businesses. Small, cheap upfront, and widely available. Then the 640g cylinder format arrived — and changed the economics entirely.

If you have not made the switch, or if you are still evaluating whether it makes financial sense, this breakdown will give you the actual numbers. No marketing spin, just the maths.`,
      },
      {
        heading: 'The Cost Breakdown',
        type: 'body',
        body: `A standard 8g cream charger cartridge typically costs between £0.75 and £1.20 each when bought in packs of 10–50 in the UK. At those prices, producing the equivalent of one 640g cylinder (≈80g of N₂O) costs:`,
        list: [
          'At £0.75 per cartridge: 10 cartridges × £0.75 = £7.50 for 80g',
          'Scaled to 640g equivalent: approximately £60.00',
          'SmartWhip 640g actual price: £30.00',
          'Saving per fill: approximately £30.00',
          'Saving on a case of 6 (vs equivalent 8g): approximately £150–£180',
        ],
      },
      {
        heading: 'Beyond the Price: Practical Advantages',
        type: 'body',
        body: `Cost is the headline, but it is not the only reason professional kitchens are moving to 640g cylinders. The practical advantages in a busy service environment are significant:`,
        list: [
          'No stopping mid-service to swap cartridges — one cylinder can last an entire shift',
          'Consistent pressure throughout the cylinder, unlike 8g cartridges that can vary in fill',
          'Dramatically less waste — no pile of used steel cartridges to dispose of',
          'More precise control over output with an adjustable pressure regulator',
          'Easier stock management — a shelf of 640g cylinders is far more compact than equivalent 8g volume',
        ],
      },
      {
        heading: 'The Upfront Investment',
        type: 'body',
        body: `The switch to 640g cylinders requires one upfront purchase: a compatible pressure regulator. A quality SmartWhip or FastGas regulator will cost between £25 and £60 depending on the model.

For a business that uses even one 640g cylinder per week, the regulator pays for itself within the first month of use through savings on cylinder cost alone. After that, the economics simply keep improving.`,
      },
      {
        heading: 'Who Should Stick with 8g Cartridges?',
        type: 'body',
        body: `In fairness, there are situations where 8g cartridges still make sense:`,
        list: [
          'Very occasional use — if you make whipped cream once a week for personal use, the regulator investment may not be worthwhile',
          'No compatible dispenser — some home-use dispensers do not accommodate a 640g cylinder setup',
          'Travel or mobile catering — 8g cartridges are lighter and need no regulator attachment in certain dispenser types',
        ],
      },
      {
        heading: 'The Professional Verdict',
        type: 'body',
        body: `For any business operating in UK hospitality, food service, or catering — whether a large restaurant, a small cafe, or a mobile catering operation — the 640g cylinder format is the clear winner on cost, performance, and practicality.

The switch from 8g to 640g is not a difficult one. And once made, virtually nobody goes back.`,
      },
      {
        type: 'cta',
        body: 'Order SmartWhip 640g cylinders with fast UK delivery — single units or case packs available.',
      },
    ],
  },

  {
    slug: 'how-to-use-smartwhip-640g',
    title: 'How to Use a SmartWhip 640g Cylinder: Step-by-Step Guide for Beginners',
    description: 'Learn exactly how to use a SmartWhip 640g N2O cream charger cylinder. Step-by-step setup guide, safety tips, regulator attachment, and best practices for professional use.',
    excerpt: 'Setting up your SmartWhip 640g for the first time? This guide walks through everything — regulator attachment, pressure settings, dispenser use, and safe storage.',
    category: 'Guides',
    tags: ['how to use SmartWhip', 'SmartWhip setup', '640g cream charger guide', 'cream charger cylinder tutorial', 'SmartWhip regulator'],
    publishedAt: '2025-12-18',
    updatedAt: '2026-02-10',
    readTime: 6,
    sections: [
      {
        type: 'intro',
        body: `The SmartWhip 640g cylinder is straightforward to use once you understand the setup — but for anyone making the switch from standard 8g cartridges, the process is understandably unfamiliar. This guide walks through everything you need to know to get started safely and correctly.

Before you begin, make sure you have the cylinder, a compatible pressure regulator, and a standard whipped cream dispenser. If you are unsure which regulator to use, the SmartWhip regulator is the most widely compatible option.`,
      },
      {
        heading: 'What You Will Need',
        type: 'body',
        list: [
          'SmartWhip 640g N₂O cylinder',
          'Compatible pressure regulator (SmartWhip or equivalent)',
          'Whipped cream dispenser (any standard professional model)',
          'Your cream or cream-based mixture, chilled',
        ],
      },
      {
        heading: 'Step 1: Prepare Your Dispenser',
        type: 'body',
        body: `Fill your whipped cream dispenser with your cold cream mixture — do not overfill. Leave headspace for the gas. Secure the dispenser head firmly and make sure any seals or gaskets are properly seated. A poorly sealed dispenser will waste gas and give inconsistent output.`,
      },
      {
        heading: 'Step 2: Attach the Regulator to the Cylinder',
        type: 'body',
        body: `Before attaching the regulator, ensure it is in the closed/off position. Thread the regulator onto the SmartWhip cylinder valve clockwise until it seats firmly. Do not overtighten — the seal is made by the threading, not by force.

Once attached, slowly open the regulator valve to allow gas to pressurise the line. You will hear a brief hiss as the system pressurises — this is normal.`,
      },
      {
        heading: 'Step 3: Connect the Dispenser',
        type: 'body',
        body: `Connect your dispenser to the regulator output via the dispensing hose. Tighten the connection securely. Adjust the regulator to your desired pressure — for whipped cream, most dispensers work best between 10 and 14 bar. Check your dispenser's specifications if you are unsure.

Once connected and pressurised, your dispenser is ready to use. Pull the lever or activate the dispensing head as you normally would.`,
      },
      {
        heading: 'Step 4: After Use — Storage and Disconnection',
        type: 'body',
        body: `When you are done with the current session, close the regulator valve to stop gas flow. Release any remaining pressure from the hose before disconnecting. The cylinder can then be stored with the regulator attached or removed — either is safe, but storing with the regulator off prevents any slow leaks.

Store cylinders upright in a cool, dry location away from direct heat. Do not store near open flames or in direct sunlight.`,
      },
      {
        heading: 'Key Safety Points',
        type: 'tip',
        list: [
          'Always check the regulator valve is closed before attaching or removing the cylinder',
          'Never heat a pressurised cylinder — always use at or below room temperature',
          'Do not puncture or attempt to modify the cylinder in any way',
          'Keep out of reach of children and non-professional users',
          'Use only with compatible, properly maintained dispensing equipment',
          'Check the cylinder for any visible damage before each use — do not use damaged cylinders',
        ],
      },
      {
        heading: 'Troubleshooting Common Issues',
        type: 'body',
        body: `If your dispenser is producing inconsistent output, check the regulator pressure setting and ensure all connections are fully tightened. If you hear gas leaking from a connection point, turn off the regulator immediately and re-seat the connection.

If the cylinder appears empty sooner than expected, check for leaks at all connection points — a slow leak at the regulator or dispenser hose connection is the most common cause of premature cylinder depletion.`,
      },
      {
        type: 'cta',
        body: 'Need a fresh SmartWhip 640g cylinder delivered fast? Order now for same-day delivery across the UK.',
      },
    ],
  },

  {
    slug: 'cream-charger-delivery-uk-guide',
    title: 'Fast Cream Charger Delivery UK: How to Order and What to Expect',
    description: 'Everything you need to know about ordering cream charger delivery in the UK. How to place an order, delivery times, what brands are available, and how to get the fastest service.',
    excerpt: 'Getting cream chargers delivered fast in the UK is easier than most people think. Here is exactly how to order, what to expect, and how to get the quickest turnaround.',
    category: 'Delivery',
    tags: ['cream charger delivery UK', 'buy cream chargers UK', 'N2O delivery UK', 'SmartWhip delivery', 'fast cream charger delivery'],
    publishedAt: '2026-01-08',
    updatedAt: '2026-02-15',
    readTime: 5,
    sections: [
      {
        type: 'intro',
        body: `If you have ever found yourself mid-service with an empty N₂O cylinder and no backup, you know how important reliable delivery is. The good news is that the UK market for cream charger delivery has matured significantly — fast, local delivery is genuinely available across most of the country.

This guide explains how cream charger delivery works in the UK, how to place an order, what delivery windows to expect, and how to make sure you always have stock when you need it.`,
      },
      {
        heading: 'How Does Cream Charger Delivery Work?',
        type: 'body',
        body: `Unlike courier-based overnight delivery services, cream charger delivery in the UK typically operates through a direct local supply model. This means orders are placed directly with a local or regional supplier — usually via WhatsApp or Telegram — who then dispatches via a local courier or directly.

The result is dramatically faster delivery than standard postal or parcel services, with most urban areas receiving orders within 25 to 60 minutes from confirmation.`,
      },
      {
        heading: 'How to Place an Order',
        type: 'body',
        body: `Ordering is straightforward:`,
        list: [
          'Contact your supplier directly via WhatsApp or Telegram',
          'State your location (town and postcode), the product you want, and the quantity',
          'Receive a confirmation with price and estimated delivery time',
          'Payment is typically arranged at the time of confirmation',
          'Your order is dispatched and arrives within the quoted window',
        ],
      },
      {
        heading: 'Delivery Times: What to Realistically Expect',
        type: 'body',
        body: `Delivery times vary by area and time of day, but typical windows across the UK are:`,
        list: [
          'Major cities (London, Manchester, Birmingham): 20–35 minutes',
          'Large towns (Leeds, Bristol, Sheffield, Leicester): 25–45 minutes',
          'Medium towns and commuter belts: 30–50 minutes',
          'Smaller towns and rural edges: 35–60 minutes',
        ],
      },
      {
        heading: 'What Products Can Be Delivered?',
        type: 'body',
        body: `Most UK cream charger suppliers carry the full range of professional N₂O brands:`,
        list: [
          'SmartWhip 640g — the most popular single unit',
          'FastGas 640g — preferred by many chefs for regulator quality',
          'Cream Deluxe 640g — strong value per unit, particularly for bulk',
          'GoldWhip 640g — a well-regarded alternative with competitive pricing',
          'Case packs (6× units) of any of the above',
        ],
      },
      {
        heading: 'How to Ensure the Fastest Possible Service',
        type: 'body',
        body: `A few simple steps make a real difference to your delivery experience:`,
        list: [
          'Have your full address and postcode ready before contacting',
          'Order during standard hours where possible — late-night orders may take slightly longer',
          'Build a relationship with a regular supplier so you are a known customer',
          'If you use large volumes, discuss a regular supply arrangement — many suppliers offer priority dispatch for repeat customers',
          'Always keep one cylinder in reserve — the time you run completely dry is the worst time to order',
        ],
      },
      {
        heading: 'Is Delivery Discreet?',
        type: 'body',
        body: `All reputable UK cream charger suppliers deliver in plain, unmarked packaging. Orders are handled professionally, without branded packaging or anything that draws unnecessary attention. This is standard practice across the industry.`,
      },
      {
        type: 'cta',
        body: 'Find your town below and get SmartWhip delivered to your door within the hour.',
      },
    ],
  },

  {
    slug: 'goldwhip-640g-review',
    title: 'GoldWhip 640g Review 2026: What Is GoldWhip & Is It Worth It? | UK Verdict',
    description: 'What is GoldWhip? Our honest 2026 review of the GoldWhip 640g N₂O cream charger — purity, build, price, and how it compares to SmartWhip and FastGas. UK buyers guide.',
    excerpt: 'GoldWhip has built a quiet following among UK catering professionals as a no-nonsense alternative to the bigger brands. But how does it actually perform? We take a close look.',
    category: 'Reviews',
    tags: ['GoldWhip', 'what is GoldWhip', 'GoldWhip 640g', 'GoldWhip UK', 'cream charger review 2026', 'N2O cylinder UK'],
    publishedAt: '2026-02-05',
    updatedAt: '2026-06-01',
    readTime: 6,
    sections: [
      {
        type: 'intro',
        body: `GoldWhip occupies an interesting position in the UK N₂O market. It is not the most heavily marketed brand, and it does not have the same name recognition as SmartWhip or FastGas. But among caterers who have tried it, it has developed a loyal following — which tends to be the most honest kind of endorsement in any industry.

This review gives you a straight account of the GoldWhip 640g: what it delivers, where it sits in the market, and whether it is worth your money in 2026.`,
      },
      {
        heading: 'What Is the GoldWhip 640g?',
        type: 'body',
        body: `GoldWhip is a 640g nitrous oxide cream charger cylinder, certified for food-grade use and built to the same technical standard as other professional-market N₂O cylinders in the UK. It connects via a standard 640g-compatible regulator and delivers a consistent, pressure-regulated gas flow to your whipped cream dispenser.

The cylinder is roughly equivalent in form factor to the SmartWhip 640g — same fill volume, same connector standard, same intended use case. Where brands in this category differ is in build quality, purity consistency, regulator ecosystem, and price.`,
      },
      {
        heading: 'Purity and Certification',
        type: 'body',
        body: `GoldWhip uses 99.9% pure food-grade N₂O, consistent with the standard set by the leading brands. The cylinders are CE certified, which is the European conformity mark that confirms the product meets applicable health and safety standards.

In practical terms, you will not taste a difference between GoldWhip and SmartWhip in the finished product. The purity standard is the same, and output consistency is on par with what professional caterers expect.`,
      },
      {
        heading: 'Build Quality',
        type: 'body',
        body: `The GoldWhip cylinder is solid — well-machined steel, properly weighted, and with a clean valve thread that connects reliably to standard 640g regulators. It does not feel like a budget product. The cylinder holds pressure without issue over multiple sessions, and the valve design prevents gas loss when stored between uses.

One minor point: the labelling on GoldWhip cylinders is more minimal than SmartWhip or FastGas. This is purely cosmetic, but worth noting if your kitchen team uses visual cues to identify cylinder types at a glance.`,
      },
      {
        heading: 'Regulator Compatibility',
        type: 'body',
        body: `GoldWhip cylinders are compatible with all standard 640g regulators, including SmartWhip and FastGas models. This is an important practical point — if your kitchen already has regulators from another brand, you do not need to invest in new equipment to switch to GoldWhip.

GoldWhip does not currently produce its own branded regulator range, which means your regulator choice remains brand-agnostic. For most professional kitchens, this is either a non-issue or an advantage.`,
      },
      {
        heading: 'Pricing and Value',
        type: 'body',
        body: `In the current UK market, GoldWhip 640g typically comes in at a comparable price to Cream Deluxe — slightly below SmartWhip's standard single unit price of £30. Case pricing is also competitive.

For buyers prioritising cost efficiency without sacrificing certified quality, GoldWhip makes a strong case. The savings per unit are not dramatic, but across a monthly supply at catering scale, they add up.`,
      },
      {
        heading: 'Who Should Buy GoldWhip?',
        type: 'body',
        list: [
          'Caterers who want a certified 640g cylinder at a competitive price point',
          'Buyers already running SmartWhip or FastGas regulators who want to try an alternative',
          'Kitchens that buy in bulk and want to rotate across brands to manage supply risk',
          'Anyone who has been curious about the brand but put off by the lower profile — it performs well',
        ],
      },
      {
        heading: 'Verdict',
        type: 'body',
        body: `GoldWhip is a solid, properly certified 640g cylinder that performs at the level you would expect from a professional-market product. It lacks the marketing presence of SmartWhip and the performance reputation of FastGas, but in a purely functional test, it does everything required of it at a competitive price.

If you have been looking for a credible alternative to your current brand — either for cost reasons or to diversify your supply — GoldWhip is worth adding to your rotation.`,
      },
      {
        type: 'cta',
        body: 'Order GoldWhip 640g with fast local delivery across the UK — single cylinders and case packs available.',
      },
    ],
  },

  {
    slug: 'where-to-buy-cream-chargers-uk',
    title: 'Where to Buy Cream Chargers in the UK: A Complete 2026 Guide',
    description: 'Find out where to buy cream chargers in the UK in 2026. Covers local delivery, online options, what to look for, which brands to buy, and how to get the fastest service.',
    excerpt: 'Knowing where to buy cream chargers in the UK — and how to get them fast — can make or break your service. This guide covers every option and what actually works.',
    category: 'Guides',
    tags: ['where to buy cream chargers UK', 'buy cream chargers UK 2026', 'cream charger delivery', 'N2O buy UK', 'best place to buy cream chargers'],
    publishedAt: '2026-02-12',
    updatedAt: '2026-03-05',
    readTime: 7,
    sections: [
      {
        type: 'intro',
        body: `If you need cream chargers in the UK and you need them quickly, the range of options has expanded significantly in recent years. From same-day local delivery to national online suppliers, there is a route that fits almost every situation.

But not all buying routes are created equal. This guide breaks down every realistic option for buying cream chargers in the UK — the speed, the selection, the reliability — so you can make the right choice for your operation.`,
      },
      {
        heading: 'Option 1: Local Direct Delivery (Fastest)',
        type: 'body',
        body: `For most professional buyers in UK towns and cities, direct local delivery is the fastest and most practical option. Local suppliers — often reached via WhatsApp or Telegram — operate across most of the UK and can dispatch within 20 to 60 minutes depending on your location.

This model has grown substantially because it solves the key problem with other channels: speed. When you need N₂O today, waiting two to five days for a courier is not a solution. Local delivery is.`,
      },
      {
        heading: 'Option 2: Online Retailers with Next-Day Delivery',
        type: 'body',
        body: `Several online retailers sell 640g cream charger cylinders (SmartWhip, FastGas, Cream Deluxe) with next-day courier delivery. This works well if you plan ahead — but requires ordering at least a day in advance and relies on courier networks that occasionally miss windows.

For established catering businesses with predictable demand, online retailers can supplement a local supply relationship for planned bulk orders. For urgent needs, they are not a reliable first option.`,
      },
      {
        heading: 'Option 3: Catering Wholesale Suppliers',
        type: 'body',
        body: `Some UK catering wholesale suppliers carry N₂O cylinders as part of their broader product range. If you already have an account with a catering wholesaler, it is worth checking their current stock. The range is typically narrower (usually one brand), and pricing may not be as competitive as specialist suppliers, but delivery can be bundled with your regular order.`,
      },
      {
        heading: 'What to Look for When Buying',
        type: 'body',
        list: [
          'Food-grade certification — always confirm the product is food-grade N₂O (99.9% purity), not industrial gas',
          'CE or TUV certification on the cylinder — this confirms the pressure vessel meets safety standards',
          'Clear pricing — reputable suppliers are transparent about price per unit and case pricing',
          'Known brands — SmartWhip, FastGas, Cream Deluxe, and GoldWhip are the established UK-market brands',
          'Delivery time commitment — ask for an estimated window before confirming',
          'Plain packaging — standard practice with all legitimate suppliers',
        ],
      },
      {
        heading: 'Brands to Buy',
        type: 'table',
        tableHeaders: ['Brand', 'Single Price', 'Case of 6', 'Best For'],
        tableRows: [
          ['SmartWhip 640g', '£30', '£130', 'Reliability and regulator ecosystem'],
          ['FastGas 640g', '£30–£33', '£135–£145', 'Regulator quality and flow control'],
          ['Cream Deluxe 640g', '£29–£31', '£125–£135', 'Bulk value and cost efficiency'],
          ['GoldWhip 640g', '£28–£30', '£120–£130', 'Competitive alternative with solid certification'],
        ],
      },
      {
        heading: 'How to Get the Fastest Delivery',
        type: 'body',
        list: [
          'Use a local supplier who dispatches directly rather than routing through a courier network',
          'Have your full address, postcode, and order details ready before making contact',
          'Order during standard hours — late-night windows may extend delivery times slightly',
          'Establish a relationship with a regular supplier — known customers often get priority dispatch',
          'Keep one cylinder in reserve at all times so you are never completely without stock',
        ],
      },
      {
        type: 'cta',
        body: 'Find your town below and order SmartWhip, FastGas, Cream Deluxe, or GoldWhip with fast local UK delivery.',
      },
    ],
  },

  {
    slug: 'best-cream-chargers-uk-2026',
    title: 'Best Cream Chargers UK 2026: Full Brand Rankings for Professional Buyers',
    description: 'The definitive ranking of the best cream chargers available in the UK in 2026. SmartWhip, FastGas, Cream Deluxe, and GoldWhip compared on quality, pricing, availability, and value.',
    excerpt: 'Which cream charger brand is actually the best for UK professional use in 2026? We rank all four major brands across quality, pricing, and real-world reliability.',
    category: 'Comparisons',
    tags: ['best cream chargers UK 2026', 'cream charger ranking', 'top cream charger brands UK', 'SmartWhip vs FastGas 2026', 'cream charger comparison 2026'],
    publishedAt: '2026-02-20',
    updatedAt: '2026-03-10',
    readTime: 8,
    sections: [
      {
        type: 'intro',
        body: `The UK professional cream charger market has settled into four credible brands: SmartWhip, FastGas, Cream Deluxe, and GoldWhip. All four carry the same purity standard (99.9% food-grade N₂O) and operate in the same 640g cylinder format.

So how do you choose? This ranking assesses all four across the criteria that actually matter for professional buyers: purity and certification, build quality, regulator ecosystem, pricing, and UK availability. Updated for 2026.`,
      },
      {
        heading: '2026 Rankings at a Glance',
        type: 'table',
        tableHeaders: ['Brand', 'Quality Score', 'Value Score', 'Availability', 'Overall Rank'],
        tableRows: [
          ['SmartWhip', '9.5/10', '8.5/10', 'Excellent', '#1'],
          ['FastGas', '9.3/10', '8/10', 'Very Good', '#2'],
          ['Cream Deluxe', '9/10', '9/10', 'Good', '#3'],
          ['GoldWhip', '8.8/10', '9.2/10', 'Good', '#4'],
        ],
      },
      {
        heading: '#1 SmartWhip — The Industry Standard',
        type: 'body',
        body: `SmartWhip remains the top-ranked 640g cylinder in the UK for 2026, and for good reason. It was the brand that professionalised the high-capacity N₂O format for UK caterers, and it has maintained its quality and supply consistency throughout its expansion.

TUV certified, 99.9% purity, and an extensive regulator and accessory ecosystem — SmartWhip is the safe, reliable choice that almost every new professional buyer should start with. You pay a slight premium over some alternatives, but the reliability and brand support justify it for most operations.`,
      },
      {
        heading: '#2 FastGas — Best for Regulator Performance',
        type: 'body',
        body: `FastGas ranks second overall and takes the top spot in the regulator category. Its proprietary regulators are consistently praised by professional chefs for their ergonomics and precise flow control — a meaningful advantage in high-volume kitchen environments.

The cylinder itself is CE and TUV certified, with the same 99.9% purity standard. FastGas is marginally more expensive than SmartWhip in some markets, but the regulator ecosystem is a genuine differentiator if that matters to your operation.`,
      },
      {
        heading: '#3 Cream Deluxe — Best for Volume Buyers',
        type: 'body',
        body: `Cream Deluxe has carved out a strong position as the value leader among certified 640g brands. CE certified and available at a lower per-unit cost than SmartWhip, it is particularly attractive for catering operations buying in volume where marginal cost per cylinder adds up significantly over a year.

Quality is fully professional — purity is indistinguishable from the top brands in actual use. The only relative weakness is regulator availability, which is improving but not yet as deep as SmartWhip's ecosystem.`,
      },
      {
        heading: '#4 GoldWhip — The Credible Alternative',
        type: 'body',
        body: `GoldWhip ranks fourth not because of any quality failing, but because it is the newest entrant to mainstream availability and has less established supply infrastructure than the top three. The cylinder itself is well-built, CE certified, and performs exactly as expected.

Where GoldWhip wins is on price — often the most competitive per-unit cost among certified 640g options. For buyers who are confident in their supplier relationship and willing to rotate brands, GoldWhip offers genuine value.`,
      },
      {
        heading: 'Which Should You Choose?',
        type: 'body',
        list: [
          'SmartWhip — if reliability, brand support, and regulator choice matter most',
          'FastGas — if you want the best regulator performance and precise flow control',
          'Cream Deluxe — if you buy at volume and want the best cost per cylinder',
          'GoldWhip — if price is the primary driver and you want a certified alternative',
          'Mix of two brands — the best protection against any single-brand supply disruption',
        ],
      },
      {
        type: 'cta',
        body: 'All four brands in stock — SmartWhip, FastGas, Cream Deluxe, and GoldWhip — with fast UK-wide delivery.',
      },
    ],
  },

  {
    slug: 'cream-charger-regulator-guide',
    title: 'Cream Charger Regulator Guide: How to Choose, Use and Maintain Yours',
    description: 'Everything you need to know about cream charger regulators in the UK. How to choose the right one, how to attach it correctly, maintenance tips, and which regulators work with which brands.',
    excerpt: 'Your regulator is the most important piece of equipment in your N₂O setup — and one of the most misunderstood. This guide covers everything from choosing the right one to maintaining it correctly.',
    category: 'Guides',
    tags: ['cream charger regulator', 'N2O regulator guide', 'SmartWhip regulator', 'FastGas regulator', '640g regulator UK'],
    publishedAt: '2026-03-01',
    updatedAt: '2026-03-10',
    readTime: 6,
    sections: [
      {
        type: 'intro',
        body: `Most buyers focus on the cylinder when setting up a professional N₂O system. The regulator — the device that connects the cylinder to your dispenser and controls gas pressure — is often an afterthought. It should not be.

A good regulator delivers consistent pressure, allows precise output control, and lasts for years with minimal maintenance. A poor one wastes gas, creates inconsistency in your output, and can fail at the worst possible moment. This guide covers everything you need to know.`,
      },
      {
        heading: 'What Does a Regulator Do?',
        type: 'body',
        body: `A cream charger regulator sits between the 640g N₂O cylinder and your whipped cream dispenser. It performs two jobs: it reduces the high-pressure gas stored in the cylinder to a working pressure suitable for your dispenser, and it allows you to control and adjust the flow rate.

Without a regulator, the full cylinder pressure (which can exceed 50 bar) would pass directly into your dispenser — far beyond what any cream dispenser is designed to handle. The regulator brings that down to a safe, usable range, typically 8 to 14 bar for most whipped cream applications.`,
      },
      {
        heading: 'Types of Regulator Available',
        type: 'body',
        list: [
          'SmartWhip regulator — compatible with SmartWhip cylinders and most other 640g brands; widely available',
          'FastGas regulator — praised for ergonomic design and precise flow control; compatible with most 640g cylinders',
          'Third-party compatible regulators — a number of well-made generic 640g regulators work across all major brands',
          'Heavy-duty commercial regulators — for high-volume catering use, some suppliers offer more robust options with higher flow capacity',
        ],
      },
      {
        heading: 'How to Choose the Right Regulator',
        type: 'body',
        body: `When selecting a regulator, consider the following:`,
        list: [
          'Compatibility — confirm it fits your cylinder brand; most 640g regulators are cross-compatible, but check before purchasing',
          'Pressure range — ensure it outputs within the range your dispenser is rated for (typically 8–14 bar)',
          'Flow control — a regulator with fine adjustment gives you more consistent output, which matters for precision work',
          'Build quality — look for metal construction throughout; avoid all-plastic regulators for professional use',
          'Brand reputation — stick to known brands or reputable third-party options with clear specification data',
        ],
      },
      {
        heading: 'How to Attach and Use Your Regulator',
        type: 'tip',
        list: [
          'Always ensure the regulator is in the off/closed position before attaching to the cylinder',
          'Thread the regulator clockwise onto the cylinder valve — do not force it; proper threading will feel smooth',
          'Open the regulator slowly to allow the system to pressurise gradually',
          'Adjust pressure to your desired level before connecting your dispenser',
          'Always close the regulator and release line pressure before removing from the cylinder',
          'Never leave a regulator attached to a cylinder that is not in use in a hot or high-humidity environment',
        ],
      },
      {
        heading: 'Maintenance and Longevity',
        type: 'body',
        body: `A quality regulator, properly maintained, should last two to three years or more of regular professional use. The key maintenance steps are simple:`,
        list: [
          'Inspect the connector seals regularly — replace O-rings or gaskets if you notice any gas leakage at the connection',
          'Keep the regulator dry — moisture ingress into the valve mechanism is the most common cause of premature failure',
          'Do not overtighten connections — this damages threads and seals over time',
          'Store away from direct heat and sunlight when not in use',
          'If the pressure gauge reads inconsistently, have it checked or replace the regulator — do not continue using a malfunctioning unit',
        ],
      },
      {
        heading: 'Common Problems and Fixes',
        type: 'body',
        body: `The most frequently reported regulator issues and their causes:`,
        list: [
          'Gas leaking from regulator-cylinder connection — reattach; the O-ring may need replacing',
          'Inconsistent pressure output — check for partial blockage in the valve; clean or replace',
          'Regulator will not seat properly on cylinder — check the cylinder thread for damage; try a different cylinder',
          'Pressure drops unexpectedly mid-use — check for a slow leak at the dispenser hose connection',
        ],
      },
      {
        type: 'cta',
        body: 'Need a replacement cylinder or ready to order your first 640g setup? Fast UK delivery available.',
      },
    ],
  },

  {
    slug: 'n2o-cream-chargers-professional-catering-uk',
    title: 'N₂O Cream Chargers in Professional UK Catering: The Complete Guide',
    description: 'A comprehensive guide to using N2O cream chargers in UK professional catering. Covers equipment setup, hygiene standards, output consistency, cost management, and brand selection.',
    excerpt: 'From Michelin-starred kitchens to high-volume event catering, N₂O is a core part of professional food production. Here is everything you need to know to run a best-practice setup.',
    category: 'Catering',
    tags: ['N2O professional catering', 'cream charger catering UK', 'whipped cream professional kitchen', 'N2O food service UK', 'professional cream charger setup'],
    publishedAt: '2026-03-08',
    updatedAt: '2026-03-12',
    readTime: 9,
    sections: [
      {
        type: 'intro',
        body: `Nitrous oxide has been part of professional kitchens for decades, but the shift from 8g cartridges to high-capacity 640g cylinders has changed how modern catering operations manage their N₂O supply. More efficient, more consistent, and considerably more cost-effective at scale, the 640g format is now the standard for any professional operation producing whipped cream in volume.

This guide is written for chefs, kitchen managers, and catering business owners who want to run a professional N₂O setup — covering equipment, hygiene, output consistency, cost management, and brand selection.`,
      },
      {
        heading: 'Setting Up a Professional N₂O Station',
        type: 'body',
        body: `A professional N₂O setup for a catering kitchen requires:`,
        list: [
          'One or more 640g N₂O cylinders (SmartWhip, FastGas, Cream Deluxe, or GoldWhip)',
          'A compatible pressure regulator rated for 640g cylinders',
          'One or more professional-grade whipped cream dispensers',
          'A dispenser cleaning kit for routine maintenance',
          'A secure storage location for spare cylinders',
        ],
      },
      {
        heading: 'Hygiene Standards and Food Safety',
        type: 'body',
        body: `N₂O used in food production must be food-grade — 99.9% pure, certified for food contact. All four brands we supply (SmartWhip, FastGas, Cream Deluxe, GoldWhip) meet this standard.

Your dispenser hygiene is equally important. Cream dispensers should be disassembled, washed, and sanitised after every service — cream residue inside a pressurised dispenser is a food safety risk. All gaskets and seals should be inspected weekly and replaced at the first sign of wear.`,
      },
      {
        heading: 'Achieving Consistent Output',
        type: 'body',
        body: `Consistency in professional kitchens is non-negotiable. These are the factors most affecting N₂O output consistency:`,
        list: [
          'Cream temperature — always use cold cream (below 5°C); warm cream produces unstable, airy output',
          'Regulator pressure — set consistently for your dispenser and do not adjust mid-service',
          'Fill level — do not overfill dispensers; leave appropriate headspace for gas expansion',
          'Dispenser condition — worn gaskets reduce seal integrity and cause output variation',
          'Cylinder pressure — as a cylinder empties, pressure drops slightly; for ultra-consistent output, swap cylinders before they fall below 25% fill',
        ],
      },
      {
        heading: 'Cost Management at Kitchen Scale',
        type: 'body',
        body: `For kitchens using N₂O regularly, cost management comes down to three things: buying the right product at the right price, reducing waste, and maintaining equipment to avoid premature cylinder depletion.

Buying in case packs (6 × 640g) reduces per-unit cost significantly — from £30 per cylinder individually to under £22 per unit on a case. For operations using more than two cylinders per week, the case purchase is always the more economical choice.`,
      },
      {
        heading: 'Managing Supply for Events and Peak Seasons',
        type: 'body',
        body: `Event-based catering creates demand spikes that require forward planning. For large events:`,
        list: [
          'Calculate N₂O requirements in advance — roughly 640g of N₂O per 100 portions of standard whipped cream',
          'Order case packs ahead of time with at least 48 hours lead time for large quantities',
          'Keep a buffer of 20–30% beyond estimated need for large events',
          'For multi-day events, arrange a scheduled delivery midway through if quantities are significant',
          'Brief your team on cylinder switching protocol so no service interruption occurs when a cylinder empties',
        ],
      },
      {
        heading: 'Staff Training Essentials',
        type: 'tip',
        list: [
          'All staff handling N₂O cylinders should know how to attach and remove regulators safely',
          'Train staff to recognise a gas leak (audible hiss, pressure drop) and respond immediately',
          'Ensure all team members know the correct dispenser fill levels and pressure settings',
          'Never allow unauthorised use of N₂O equipment — access should be limited to trained staff',
          'Keep safety data sheets for all N₂O products accessible in the kitchen',
        ],
      },
      {
        type: 'cta',
        body: 'Set up your professional catering supply today — fast UK-wide delivery for all four brands, single and case quantities.',
      },
    ],
  },

  {
    slug: 'bulk-cream-chargers-catering-uk',
    title: 'Bulk Cream Chargers for UK Catering Businesses: A Complete Buying Guide',
    description: 'A professional guide to buying cream chargers in bulk for UK catering businesses. Covers case pricing, brands, storage, and how to set up a regular supply chain for your kitchen.',
    excerpt: 'Restaurants, caterers, and hospitality venues using N₂O at volume have very different needs from individual buyers. Here is what you need to know about buying cream chargers in bulk.',
    category: 'Catering',
    tags: ['bulk cream chargers UK', 'catering cream chargers', 'wholesale N2O UK', 'professional cream chargers', 'restaurant cream chargers'],
    publishedAt: '2026-01-22',
    updatedAt: '2026-02-18',
    readTime: 7,
    sections: [
      {
        type: 'intro',
        body: `For restaurants, event caterers, cafes, and hospitality venues, N₂O supply is a business-critical input — not a convenience. Running low mid-service is not just inconvenient; it can affect output, reputation, and revenue.

The good news is that the UK bulk cream charger market is mature and well-supplied. Whether you need a regular case-pack delivery, a pallet arrangement, or a flexible supply that scales with your seasonal demand, there is a model that works. This guide explains what your options are and how to set up the most efficient supply chain for your operation.`,
      },
      {
        heading: 'Understanding the Pricing Tiers',
        type: 'body',
        body: `UK cream charger pricing scales clearly with volume. The typical structure for SmartWhip 640g (the benchmark product) is:`,
        list: [
          'Single cylinder: £30',
          'Case of 6: £130 (saving of £50 vs. buying individually)',
          'Case of 12: typically £240–£250 (further saving per unit)',
          'Pallet arrangements: negotiated directly with your supplier based on volume',
        ],
      },
      {
        heading: 'Which Brand Should You Buy in Bulk?',
        type: 'body',
        body: `At bulk quantities, the brand choice becomes partly a matter of price and partly a matter of supply reliability. Our recommendation for bulk buyers:`,
        list: [
          'SmartWhip — best for reliability and regulator ecosystem; most widely available',
          'Cream Deluxe — often the best per-unit cost at large volume; worth comparing on current pricing',
          'FastGas — preferred if your team has invested in FastGas regulators',
          'Mixed orders — many catering businesses keep two brands in rotation to protect against any single-brand supply issue',
        ],
      },
      {
        heading: 'Storage Best Practices for Commercial Quantities',
        type: 'body',
        body: `Storing N₂O cylinders at commercial quantities requires some basic common sense and adherence to health and safety guidelines:`,
        list: [
          'Store in a cool, dry, well-ventilated space — not near heat sources or in direct sunlight',
          'Keep cylinders upright and secure — horizontal storage can affect valve integrity over time',
          'Do not store large quantities in enclosed spaces without ventilation',
          'Rotate stock: use older cylinders first (FIFO — first in, first out)',
          'Check all cylinders for damage or tampering before accepting delivery',
          'Keep a stock log — know exactly how many units you have and when your next order is due',
        ],
      },
      {
        heading: 'Setting Up a Regular Supply Arrangement',
        type: 'body',
        body: `For businesses with predictable N₂O requirements — and most established catering operations have a very consistent weekly or monthly need — a standing supply arrangement makes more sense than ad-hoc ordering.

Contact your supplier and discuss:`,
        list: [
          'Your average weekly or monthly consumption',
          'Whether you want a fixed delivery schedule (weekly, bi-weekly, monthly)',
          'Your preferred brands and quantity per delivery',
          'Lead time requirements — how much notice you need your supplier to give before delivery',
          'Pricing for a commitment arrangement — many suppliers offer better rates for regular accounts',
        ],
      },
      {
        heading: 'Managing Supply During Peak Periods',
        type: 'body',
        body: `Event-heavy seasons — summer, Christmas, wedding season — can put pressure on N₂O supply chains across the UK. Caterers who manage peak periods well typically do two things: order larger quantities ahead of peak season to buffer against potential delays, and maintain relationships with more than one reliable supplier.

Give your supplier as much advance notice as possible for large peak-season orders. Most will accommodate if they know ahead of time.`,
      },
      {
        heading: 'Waste Reduction and Sustainability',
        type: 'body',
        body: `Switching from 8g cartridges to 640g cylinders — especially in bulk — has a meaningful impact on waste. A single 640g cylinder replaces over 80 individual steel cartridges. At scale, this represents a significant reduction in steel waste and packaging material.

Many catering businesses find that the move to 640g bulk supply aligns well with their sustainability commitments, and some have been able to use it as part of their environmental reporting.`,
      },
      {
        type: 'cta',
        body: 'Set up your regular bulk supply today — find your delivery area and contact us directly for catering account pricing.',
      },
    ],
  },
  {
    slug: 'smartwhip-cream-chargers-uk-beginners-guide',
    title: 'Smartwhip Cream Chargers UK: Complete Beginner\'s Guide for 2026',
    description: 'Everything you need to know about Smartwhip cream chargers in the UK. What they are, how they work, how to use them safely, and where to buy them fast in 2026.',
    excerpt: 'New to Smartwhip cream chargers? This complete UK beginner\'s guide covers everything — what they are, how to use them, how they compare to 8g cartridges, and how to order fast.',
    category: 'Guides',
    tags: ['smartwhip cream chargers uk', 'smartwhip how to use', 'smartwhip review uk', 'what are smartwhip chargers', 'smartwhip vs 8g chargers'],
    publishedAt: '2026-01-05',
    updatedAt: '2026-03-12',
    readTime: 9,
    sections: [
      {
        type: 'intro',
        body: `Smartwhip cream chargers have changed the way UK catering professionals — and serious home cooks — work with whipped cream and N₂O. If you have heard the name but are not quite sure what Smartwhip cream chargers actually are, how they differ from the little 8g cartridges you might have used before, or how to get started safely, this guide is for you.

We will cover everything from scratch: what Smartwhip is, how the 640g cylinder format works, how to use it correctly, what equipment you need, and how to order in the UK with fast local delivery.`,
      },
      {
        heading: 'What Are Smartwhip Cream Chargers?',
        type: 'body',
        body: `Smartwhip cream chargers are high-capacity nitrous oxide (N₂O) cylinders designed for professional and serious domestic food use. The flagship product is the Smartwhip 640g cylinder — a single pressurised steel cylinder that contains the equivalent of over 80 standard 8g cream charger cartridges.

Unlike the small single-use cartridges that have been the catering standard for decades, the Smartwhip 640g cylinder connects to a compatible pressure regulator, which then feeds gas into your whipped cream dispenser in a controlled, adjustable stream. The result is more consistent cream output, far less waste, and dramatically lower cost per serving.

Smartwhip uses 99.9% pure food-grade nitrous oxide — independently tested and TUV certified to the highest European standard for food contact gas. This matters: cheap or unbranded N₂O can contain impurities that affect both taste and safety. Smartwhip consistently clears quality benchmarks that lesser products fail.`,
      },
      {
        heading: 'Smartwhip vs Standard 8g Cream Chargers: What\'s the Difference?',
        type: 'table',
        tableHeaders: ['Feature', 'Smartwhip 640g', 'Standard 8g Cartridges'],
        tableRows: [
          ['N₂O Volume', '640g per cylinder', '8g per cartridge'],
          ['Equivalent Fill', '≈80 cartridges', '1 cartridge each'],
          ['Price per 80g N₂O', '~£30', '~£60–£90'],
          ['Pressure Control', 'Adjustable via regulator', 'Fixed — no control'],
          ['Waste Generated', 'Minimal — one cylinder', '80+ individual cartridges'],
          ['Mid-service Interruption', 'None — lasts full shift', 'Frequent cartridge swaps'],
          ['Certification', 'TUV certified', 'Varies by brand'],
        ],
      },
      {
        heading: 'What Equipment Do You Need?',
        type: 'body',
        body: `To use a Smartwhip 640g cylinder, you need three things:`,
        list: [
          'The Smartwhip 640g N₂O cylinder itself',
          'A compatible 640g pressure regulator (Smartwhip regulators are the most widely compatible)',
          'A professional whipped cream dispenser (any standard model rated for 640g cylinder use)',
        ],
      },
      {
        heading: 'How to Use Smartwhip: Step-by-Step',
        type: 'body',
        body: `Setting up your Smartwhip for the first time is straightforward once you know the sequence:`,
        list: [
          '1. Fill your whipped cream dispenser with cold cream — leave headspace for gas expansion',
          '2. Secure the dispenser head tightly and check all seals',
          '3. Ensure your pressure regulator is in the closed position before attaching',
          '4. Thread the regulator clockwise onto the Smartwhip cylinder valve until it seats firmly',
          '5. Open the regulator slowly — you will hear a brief hiss as the system pressurises',
          '6. Connect your dispenser to the regulator output and set your working pressure (typically 10–14 bar)',
          '7. Dispense as normal — adjust regulator for output consistency',
          '8. When done, close the regulator valve and release line pressure before disconnecting',
        ],
      },
      {
        heading: 'Key Safety Points for UK Users',
        type: 'tip',
        list: [
          'Always use food-grade N₂O only — never industrial-grade gas near food',
          'Store cylinders upright in a cool, dry, well-ventilated space away from heat sources',
          'Never heat a pressurised cylinder — always operate at or below room temperature',
          'Keep cylinders out of reach of non-professional users and children',
          'Inspect the cylinder for damage before each use — do not use a visibly damaged cylinder',
          'Check regulator seals and O-rings regularly — replace at first sign of leakage',
        ],
      },
      {
        heading: 'What Can You Make with Smartwhip?',
        type: 'body',
        body: `The Smartwhip 640g cylinder is the right choice for any application requiring consistent, high-volume N₂O output:`,
        list: [
          'Whipped cream for coffee, hot chocolate, desserts, and pastry',
          'Flavoured whipped creams — vanilla, chocolate, citrus, herb',
          'Culinary foams and espumas for professional plating',
          'Cold oil and butter infusions for intensified flavours',
          'Mousse and aerated sauce preparations',
          'Rapid cold-infusion of spirits, oils, and syrups',
        ],
      },
      {
        heading: 'Where to Buy Smartwhip Cream Chargers in the UK',
        type: 'body',
        body: `The fastest and most reliable way to buy Smartwhip cream chargers in the UK in 2026 is through a local direct supplier — contacted via WhatsApp or Telegram — who can dispatch within the hour. This model covers most UK towns and cities and bypasses the delays inherent in courier-based services.

For major cities, delivery windows of 20–35 minutes are standard. For smaller towns and rural edges, expect 35–60 minutes from order confirmation.

For planned bulk orders, case packs (6 × 640g for £130) offer the best per-unit economics. Single cylinders (£30 each) are available for smaller or more occasional requirements.`,
      },
      {
        type: 'cta',
        body: 'Ready to order Smartwhip cream chargers with fast local UK delivery? Find your town and get started today.',
      },
    ],
  },

  {
    slug: 'how-to-use-whipped-cream-dispenser-step-by-step',
    title: 'How to Use a Whipped Cream Dispenser (Step-by-Step) — SmartWhip 640g UK Guide',
    description: 'How to use a whipped cream dispenser with a SmartWhip or FastGas 640g N₂O charger — full step-by-step guide covering setup, charging, dispensing, and cleaning. UK professionals.',
    excerpt: 'Getting the best from your whipped cream dispenser requires the right technique from fill to clean. This step-by-step guide covers everything UK catering professionals and home cooks need to know.',
    category: 'Guides',
    tags: ['how to use whipped cream dispenser', 'how to use cream chargers uk', 'whipped cream dispenser instructions', 'how to charge cream whipper smartwhip', 'cream charger how to use'],
    publishedAt: '2025-12-22',
    updatedAt: '2026-06-01',
    readTime: 7,
    sections: [
      {
        type: 'intro',
        body: `A whipped cream dispenser is a precision tool — and like any precision tool, it performs best when used correctly. Whether you are new to cream chargers entirely or making the switch from 8g cartridges to a 640g cylinder setup for the first time, this step-by-step guide will walk you through everything from initial filling to post-service cleaning.

Getting the process right from the start means consistently perfect results, less gas waste, and equipment that lasts. Getting it wrong means flat cream, leaking connections, and wasted product.`,
      },
      {
        heading: 'What You Will Need',
        type: 'body',
        list: [
          'A professional whipped cream dispenser (0.5L or 1L are the most common professional sizes)',
          'Food-grade double or single cream, chilled to below 5°C',
          'A Smartwhip 640g N₂O cylinder (or equivalent food-grade source)',
          'A compatible pressure regulator for 640g cylinders',
          'The dispensing hose that connects regulator to dispenser',
          'Cleaning brushes for post-service maintenance',
        ],
      },
      {
        heading: 'Step 1: Chill Everything',
        type: 'body',
        body: `This is the step most beginners skip — and the most common cause of flat or inconsistent output. Cream must be cold to whip correctly under N₂O. Ideally, chill your cream, your dispenser, and even your dispenser head in the refrigerator for at least 30 minutes before use.

Warm cream aerated with N₂O will produce a loose, unstable foam that collapses quickly. Cold cream produces firm, consistent, well-structured whip that holds its shape through a full service.`,
      },
      {
        heading: 'Step 2: Fill Your Dispenser Correctly',
        type: 'body',
        body: `Pour your cold cream into the dispenser body. Do not overfill — a 0.5L dispenser should be filled to no more than 300–350ml; a 1L dispenser to no more than 600–700ml. Overfilling leaves insufficient headspace for the gas to function correctly, resulting in weak or inconsistent output.

If you are adding flavourings — sugar, vanilla, liqueur — stir them into the cream before filling the dispenser, not after. The dispenser mixes as it aerates, but pre-mixing ensures even distribution.`,
      },
      {
        heading: 'Step 3: Secure the Head and Seals',
        type: 'body',
        body: `Before attaching the head to the dispenser body, check the rubber gasket inside the head — it should be seated flat and without cracks or damage. A damaged gasket is the most common cause of leakage during dispensing.

Thread the head onto the body firmly. Do not overtighten, but ensure there is no gap between head and body when fully seated. A loose connection here will vent gas as soon as you pressurise.`,
      },
      {
        heading: 'Step 4: Connect and Pressurise',
        type: 'body',
        body: `Connect your dispenser to the regulator output via the dispensing hose. Ensure the regulator valve is closed before you attach anything. Thread the regulator onto the Smartwhip cylinder valve clockwise until firmly seated.

Open the regulator slowly. You will hear a brief hiss as the system fills with gas — this is normal. Set your working pressure to your desired level (10–14 bar suits most cream applications; lower pressure for lighter, airier output, higher for firmer cream).`,
      },
      {
        heading: 'Step 5: Shake and Dispense',
        type: 'body',
        body: `With the dispenser pressurised, give it three to four firm shakes — this helps integrate the gas with the cream and ensures even distribution before you begin dispensing.

Hold the dispenser upside down (nozzle pointing downward) when dispensing. Pressing the lever releases a stream of aerated cream. The flow rate and firmness of output depends on your regulator pressure setting, cream temperature, and cream fat content — higher fat cream (48% and above) produces the firmest result.`,
      },
      {
        heading: 'Step 6: Cleaning After Service',
        type: 'body',
        body: `This step is non-negotiable in a professional kitchen. Cream residue inside a pressurised dispenser is a food safety risk — bacteria can proliferate quickly in dairy left at room temperature.

After service, release any remaining pressure by pressing the dispenser lever into a bowl until no more gas is released. Unscrew the head, remove all parts, and wash in warm soapy water. Use the cleaning brushes provided with most professional dispensers to reach inside the nozzle and tube. Rinse all parts thoroughly and allow to dry completely before reassembling.

Do not put professional stainless steel dispensers through a dishwasher unless specified as dishwasher-safe by the manufacturer.`,
      },
      {
        heading: 'Common Mistakes to Avoid',
        type: 'tip',
        list: [
          'Using warm cream — always chill below 5°C for firm, stable output',
          'Overfilling the dispenser — leave adequate headspace for gas',
          'Not checking the head gasket before each use',
          'Setting regulator pressure too high — more is not always better',
          'Skipping post-service cleaning — a food safety risk, never acceptable professionally',
          'Disconnecting the regulator without closing the valve first — causes rapid gas venting',
        ],
      },
      {
        type: 'cta',
        body: 'Order Smartwhip 640g cylinders with fast local delivery across the UK — find your town and get started.',
      },
    ],
  },

  {
    slug: 'troubleshooting-whipped-cream-dispenser',
    title: 'Troubleshooting Whipped Cream Dispenser Problems: Quick Fixes for Common Issues',
    description: 'Is your whipped cream dispenser not working, producing flat cream, or leaking gas? This UK troubleshooting guide covers every common cream charger problem and its fix.',
    excerpt: 'Flat cream, gas leaks, inconsistent output — whipped cream dispenser problems are almost always fixable once you know the cause. Here is the complete UK troubleshooting guide.',
    category: 'Guides',
    tags: ['cream charger problems', 'whipped cream dispenser not working', 'cream charger not whipping', 'why is my n2o cream flat uk', 'dispenser troubleshooting'],
    publishedAt: '2026-01-15',
    updatedAt: '2026-03-05',
    readTime: 7,
    sections: [
      {
        type: 'intro',
        body: `A whipped cream dispenser that is not performing correctly can bring a kitchen to a halt mid-service. The frustrating part is that most problems have simple causes and equally simple fixes — once you know where to look.

This guide covers the most common whipped cream dispenser and cream charger problems in professional UK kitchens, their causes, and how to fix them quickly. Work through the relevant section for your issue and you should be back up and running in minutes.`,
      },
      {
        heading: 'Problem 1: Cream Is Coming Out Flat or Liquid',
        type: 'body',
        body: `This is the most frequently reported issue — and almost always has one of the following causes:`,
        list: [
          'Cream is too warm — N₂O only whips cream properly when it is cold (below 5°C). Warm cream produces airy, unstable foam. Solution: chill your cream and dispenser thoroughly before use.',
          'Cream fat content is too low — Low-fat cream or single cream does not whip well with N₂O. Use double cream or whipping cream with at least 35% fat. Higher fat (48%+) produces firmer, more stable output.',
          'Insufficient gas pressure — Check your regulator pressure setting. If it has dropped, increase to 10–14 bar. If the cylinder is nearly empty, gas pressure will fall — replace or top up the cylinder.',
          'Overfilled dispenser — Not enough headspace for the gas to mix properly. Reduce fill volume and ensure you are leaving at least 30–40% of the dispenser body as headspace.',
          'Did not shake before dispensing — Give the pressurised dispenser 3–4 firm shakes before using. This integrates gas and cream for better, more consistent output.',
        ],
      },
      {
        heading: 'Problem 2: Gas Leaking from the Regulator-Cylinder Connection',
        type: 'body',
        body: `If you hear gas escaping from the point where the regulator meets the cylinder, stop and address this before continuing.`,
        list: [
          'Check that the regulator is fully seated — turn off the regulator, remove it, and re-thread slowly and evenly. Cross-threading is a common cause of a poor seal.',
          'Inspect the O-ring on the regulator inlet — if it is damaged, flattened, or missing, it will not seal properly. Replace the O-ring before continuing.',
          'Check the cylinder valve for damage — if the valve thread is damaged, the cylinder should be set aside and not used.',
          'Do not overtighten — the seal is made by the O-ring and thread engagement, not by force. Overtightening can damage both.',
        ],
      },
      {
        heading: 'Problem 3: Gas Leaking from the Dispenser Head',
        type: 'body',
        body: `Gas escaping from around the dispenser head (where it meets the body) indicates a seal problem:`,
        list: [
          'Remove the head and inspect the rubber gasket — it should be pliable, evenly seated, and free from cracks or deformation. A cracked or hardened gasket must be replaced.',
          'Check that the head is fully threaded onto the body — an incomplete thread will not seat the gasket under pressure.',
          'Ensure the gasket groove is clean — cream or residue in the gasket seat prevents a proper seal. Clean thoroughly before reassembly.',
        ],
      },
      {
        heading: 'Problem 4: Cream Is Dispensing in Bursts or Inconsistently',
        type: 'body',
        body: `Uneven or bursting output is typically caused by:`,
        list: [
          'Blockage in the nozzle — cream or cream residue can partially block the nozzle tip. Remove and rinse the nozzle under warm water. Use the dispenser cleaning brush to clear any blockage.',
          'Pressure inconsistency — if the regulator pressure is fluctuating, check the regulator gauge and reseat the regulator on the cylinder. A partially blocked regulator valve can cause this.',
          'Dispensing at wrong angle — the dispenser must be held inverted (nozzle pointing down) for correct operation. Holding it at any other angle can cause gas and cream to separate in the tube.',
        ],
      },
      {
        heading: 'Problem 5: Dispenser Will Not Release Pressure When Lever Is Pressed',
        type: 'body',
        body: `If pressing the dispenser lever produces nothing — no cream, no gas — there are a few possible causes:`,
        list: [
          'Nozzle is blocked — the tip may be completely blocked with solidified cream residue. Remove the nozzle and soak in warm water. Never use sharp tools to clear a blocked nozzle.',
          'Dispenser is not pressurised — check that the regulator valve is open and that the cylinder still has gas. An empty cylinder will pressurise the hose but not the dispenser if the hose connection is poor.',
          'Lever mechanism is jammed — disassemble the head and inspect the lever valve mechanism for cream debris. Clean all internal components thoroughly.',
        ],
      },
      {
        heading: 'Problem 6: Cream Output is Watery with Large Bubbles',
        type: 'body',
        body: `This typically indicates the cream has been over-whipped in the dispenser — caused by either too much shaking or too high regulator pressure. The fat structure in the cream has broken down. Unfortunately, over-whipped cream cannot be recovered — it must be discarded.

Prevention: shake the dispenser only 3–4 times. Set regulator to 10–12 bar for most applications. If you are using very high-fat cream, reduce pressure slightly — it requires less gas to achieve the same output quality.`,
      },
      {
        heading: 'General Maintenance to Prevent Problems',
        type: 'tip',
        list: [
          'Clean your dispenser fully after every service — do not allow cream to dry inside',
          'Replace gaskets as soon as they show any cracking or hardening',
          'Inspect O-rings on the regulator every 2–3 weeks of regular use',
          'Store the dispenser disassembled and dry — moisture inside an assembled dispenser encourages bacteria growth',
          'Never use abrasive tools or metal objects to clear blockages',
        ],
      },
      {
        type: 'cta',
        body: 'Need a fresh supply of Smartwhip N₂O cylinders? Fast local delivery across the UK — find your town and order now.',
      },
    ],
  },

  {
    slug: 'whipped-cream-charger-recipes',
    title: '15 Whipped Cream Charger Recipes: Sweet, Savoury & Professional',
    description: 'Discover 15 delicious whipped cream charger recipes using food-grade N2O. From classic vanilla whipped cream to savoury foams and cold infusions — all tested for UK professional and home use.',
    excerpt: 'Your Smartwhip setup is capable of far more than plain whipped cream. These 15 recipes — sweet, savoury, and technically ambitious — will change how you use your N₂O dispenser.',
    category: 'Guides',
    tags: ['whipped cream charger recipes', 'cream charger recipes uk', 'smartwhip whipped cream recipes', 'flavoured whipped cream n2o', 'dispenser whipped cream flavours'],
    publishedAt: '2026-01-28',
    updatedAt: '2026-03-08',
    readTime: 10,
    sections: [
      {
        type: 'intro',
        body: `Most people buy a Smartwhip 640g cylinder and use it for one thing: plain whipped cream. That is the right start — but it is only the beginning of what a food-grade N₂O dispenser can do.

The same equipment that produces perfect whipped cream for your coffee service can also make cold-infused spirits in minutes, herb-scented butters, restaurant-quality culinary foams, and silky chocolate mousses without a whisk in sight. All 15 recipes below are suited to a Smartwhip 640g setup with a standard pressure regulator and professional dispenser.`,
      },
      {
        heading: 'Classic & Everyday Whipped Creams',
        type: 'body',
        body: `These are the foundation recipes — reliable, quick, and applicable across most professional menus.`,
      },
      {
        heading: '1. Classic Chantilly Cream',
        type: 'body',
        body: `500ml double cream, 30g icing sugar, 1 tsp pure vanilla extract. Combine and chill to below 5°C. Fill dispenser to two-thirds, charge at 10–12 bar, shake four times. Dispense upside down. Firm, stable, and perfect for dessert service. Holds well under refrigeration for up to 6 hours.`,
      },
      {
        heading: '2. Dark Chocolate Whipped Cream',
        type: 'body',
        body: `Melt 60g of quality dark chocolate (70%) into 400ml warm cream. Allow to cool completely and chill to below 5°C. Add 20g icing sugar and a pinch of fine sea salt. Fill dispenser, charge at 11–13 bar. The result is an intense, pourable chocolate cream — lighter than ganache, more stable than standard cream. Ideal for hot drinks, profiteroles, and chocolate desserts.`,
      },
      {
        heading: '3. Espresso Whipped Cream',
        type: 'body',
        body: `Dissolve 2 tsp espresso powder in 20ml hot water and allow to cool. Combine with 500ml cold double cream and 25g icing sugar. Chill thoroughly and charge at 10 bar. A coffee-house essential — cuts beautifully through the sweetness of desserts and acts as a standalone garnish on cold brew coffee.`,
      },
      {
        heading: '4. Lemon Posset Cream',
        type: 'body',
        body: `Infuse 500ml double cream with the zest of 2 lemons overnight in the refrigerator. Strain through a fine sieve, add 30g icing sugar and 1 tbsp fresh lemon juice. Charge at 10 bar. The fat-soluble lemon oils give a deep, clean citrus flavour that cannot be replicated by simply adding lemon juice to cream.`,
      },
      {
        heading: '5. Boozy Cream (Amaretto, Baileys, or Bourbon)',
        type: 'body',
        body: `Add 50ml of your chosen spirit to 450ml double cream with 25g icing sugar. Chill and charge at 12 bar. The alcohol slightly destabilises the cream structure so this requires colder temperatures than standard cream — serve immediately after dispensing for best results.`,
      },
      {
        heading: 'Savoury Foams and Culinary Creams',
        type: 'body',
        body: `N₂O is not just for sweet applications. These savoury recipes demonstrate the real range of the Smartwhip setup in a professional kitchen context.`,
      },
      {
        heading: '6. Parmesan Foam',
        type: 'body',
        body: `Heat 400ml double cream gently and melt in 80g finely grated Parmesan. Season with white pepper and a small amount of salt (Parmesan is already salty). Allow to cool completely and pass through a fine sieve. Chill to below 5°C, fill dispenser, charge at 9–10 bar. A refined pasta, risotto, or soup garnish that delivers intense savoury flavour in a dramatically light texture.`,
      },
      {
        heading: '7. Herb-Infused Cream (Tarragon, Chervil, or Basil)',
        type: 'body',
        body: `Blanch a generous handful of fresh herbs in boiling water for 10 seconds, then transfer immediately to ice water. Squeeze dry and blend with 100ml cold cream until smooth. Pass through a fine sieve and combine with the remaining 400ml cold cream. Season lightly. Charge at 10 bar. An exceptional garnish for fish dishes, cold soups, and egg preparations.`,
      },
      {
        heading: '8. Smoked Cream',
        type: 'body',
        body: `Cold-smoke 500ml double cream in a smoking gun for 2–3 minutes, seal and refrigerate for 2 hours to allow the smoke to fully integrate. Charge at 11 bar. The result is an ethereal smoked cream with genuine depth — ideal with smoked salmon, cured meats, and warm shellfish preparations.`,
      },
      {
        heading: '9. Truffle Cream',
        type: 'body',
        body: `Infuse 500ml double cream with 1 tsp high-quality truffle oil or a small amount of shaved fresh truffle overnight in the refrigerator. Strain and charge at 10 bar. A small garnish of truffle cream elevates pasta, risotto, eggs, and charcuterie boards with minimal effort and striking effect.`,
      },
      {
        heading: 'Cold Infusions and Rapid Preparations',
        type: 'body',
        body: `One of the most powerful — and underused — capabilities of the 640g N₂O setup is rapid cold infusion. N₂O at pressure forces liquid into the cells of solid ingredients, dramatically accelerating flavour extraction. What normally takes days can be achieved in minutes.`,
      },
      {
        heading: '10. Rapid Cold-Infused Gin (Cucumber or Elderflower)',
        type: 'body',
        body: `Place 500ml gin in the dispenser with sliced cucumber or 50ml elderflower cordial. Charge at 8 bar — do not over-pressurise spirits. Shake twice, allow to sit for 1–2 minutes, then slowly vent the gas into a sealed bottle. Strain and serve. The cucumber or elderflower flavour is intensely integrated in a fraction of the time of traditional cold infusion.`,
      },
      {
        heading: '11. Brown Butter Infusion',
        type: 'body',
        body: `Brown 200g butter in a pan until nutty and golden. Cool to liquid but not solid. Combine with neutral oil if needed for volume. Place in the dispenser, charge at 8 bar, shake, rest for 2 minutes, then vent slowly. The result is a brown butter oil with intensified, complex nuttiness — excellent for finishing pasta, fish, and roasted vegetables.`,
      },
      {
        heading: '12. Rosemary-Infused Olive Oil',
        type: 'body',
        body: `Fill the dispenser with 500ml quality extra-virgin olive oil and 4–5 sprigs of fresh rosemary. Charge at 8 bar. Shake, rest for 3 minutes, vent slowly. What normally takes a week of cold infusion is ready in minutes, with a brighter, fresher herb character than traditional infusion.`,
      },
      {
        heading: 'Mousses and Aerated Textures',
        type: 'body',
        body: `N₂O-aerated mousses are a cornerstone of modern professional pastry — lighter than traditionally whipped preparations, more stable under service conditions, and dramatically faster to produce.`,
      },
      {
        heading: '13. White Chocolate Mousse',
        type: 'body',
        body: `Melt 150g white chocolate into 500ml warm double cream. Cool completely, then chill to below 5°C. Charge at 11 bar. The mousse holds its structure well even at room temperature for short service windows — pipe directly from the dispenser into glasses or onto plates for a clean, professional finish.`,
      },
      {
        heading: '14. Mango and Chilli Foam',
        type: 'body',
        body: `Blend 200ml mango purée with 200ml double cream, a small pinch of ground chilli, and a squeeze of lime. Pass through a fine sieve and chill. Charge at 10 bar. This foam works as a dessert garnish, a cocktail accent, or a tropical starter element — the chilli gives a warmth that develops on the palate after the initial sweetness.`,
      },
      {
        heading: '15. Cream Cheese and Chive Foam',
        type: 'body',
        body: `Whisk 200g full-fat cream cheese until smooth, then thin with 200ml double cream and season with salt, white pepper, and finely snipped chives. Pass through a sieve to remove any lumps. Chill and charge at 9 bar. A versatile savoury foam that works across smoked salmon blinis, baked potatoes, and cold canapes.`,
      },
      {
        type: 'cta',
        body: 'Ready to start creating? Order Smartwhip 640g cylinders with fast UK delivery — find your town below.',
      },
    ],
  },

  {
    slug: 'food-grade-nitrous-oxide-uk',
    title: 'Food-Grade Nitrous Oxide UK: What It Is, Why It Matters and How to Buy Safely',
    description: 'A complete UK guide to food-grade nitrous oxide (N2O). What makes it food-grade, why purity matters, the difference from industrial N2O, certifications to look for, and how to buy safely.',
    excerpt: 'Not all nitrous oxide is the same. Understanding food-grade N2O — what it means, why purity certification matters, and how to verify you are buying the right product — is essential for any UK catering professional.',
    category: 'Guides',
    tags: ['food grade nitrous oxide uk', 'n2o gas for cooking uk', 'nitrous oxide whipped cream legal', 'e942 food grade n2o', 'food grade N2O certification'],
    publishedAt: '2025-11-20',
    updatedAt: '2026-02-20',
    readTime: 7,
    sections: [
      {
        type: 'intro',
        body: `The term "food-grade" is used constantly in the cream charger industry — but what does it actually mean? And why does it matter enough that reputable suppliers make TUV certification a headline feature of their product?

Understanding the difference between food-grade and non-food-grade nitrous oxide is not just an academic exercise for UK catering professionals. It has direct implications for product safety, taste quality, and — in a professional context — your legal and operational obligations when serving food to customers.

This guide explains everything you need to know about food-grade N₂O in the UK market.`,
      },
      {
        heading: 'What Is Food-Grade Nitrous Oxide?',
        type: 'body',
        body: `Nitrous oxide (N₂O, chemical formula N₂O) is a colourless, non-flammable gas with a slightly sweet smell and taste. It has a long history of culinary use — most notably as the propellant and aerating agent in whipped cream production, which works by dissolving under pressure in liquid cream fat and releasing as fine bubbles when the pressure is dropped.

Food-grade nitrous oxide is N₂O that has been manufactured to a purity standard suitable for direct food contact. In the UK and across the EU, this means:`,
        list: [
          '99.9% minimum purity of N₂O — no significant presence of other gases or compounds',
          'Absence of oil, moisture, or manufacturing contaminants that could affect flavour or safety',
          'Manufactured in facilities that meet food-grade production standards',
          'Tested and certified by an independent body — TUV certification is the gold standard in the UK market',
        ],
      },
      {
        heading: 'What Is E942?',
        type: 'body',
        body: `In EU and UK food labelling standards, nitrous oxide is classified as food additive E942 — a propellant and packaging gas approved for food contact use. The E942 classification signals that the substance has been reviewed and approved for specific food applications by the relevant food safety authorities.

When you see a cream charger cylinder described as E942 or food-grade E942 N₂O, it is confirming that the product meets the legal standard for use in food production. All reputable UK brands — including Smartwhip, FastGas, Cream Deluxe, and GoldWhip — produce to this standard.`,
      },
      {
        heading: 'Food-Grade vs Industrial Nitrous Oxide: Why It Matters',
        type: 'body',
        body: `Industrial N₂O is produced for non-food applications — medical anaesthesia, automotive use (as a combustion enhancer), and various manufacturing processes. It is not produced to food contact purity standards and may contain lubricants, moisture, or other compounds from the manufacturing process.

Using industrial N₂O in food preparation would be:`,
        list: [
          'Potentially unsafe — manufacturing-grade contaminants are not tested for food safety',
          'Likely to affect taste — impurities can produce an off-flavour in finished whipped products',
          'A food safety and legal compliance failure in any professional setting',
          'A potential liability issue if served to customers',
        ],
      },
      {
        heading: 'Certifications to Look For When Buying',
        type: 'body',
        body: `When purchasing N₂O cream charger cylinders in the UK, the following certifications are the key quality indicators:`,
        list: [
          'TUV Certification — the most rigorous European pressure-vessel and quality certification; Smartwhip carries this standard',
          'CE Marking — confirms compliance with European safety directives for pressure vessels; required for sale in the UK market',
          '99.9% stated purity — any reputable brand will state this explicitly; avoid products where purity is not clearly declared',
          'E942 food-grade classification — confirms the gas meets food contact standards',
        ],
      },
      {
        heading: 'Does Purity Affect Taste?',
        type: 'body',
        body: `Yes — in the tested view of professional chefs, purity differences are detectable in finished products. N₂O at 99.9% purity is essentially tasteless and odourless, adding nothing to the finished cream. At lower purity levels, trace compounds can introduce subtle off-notes that are perceptible in delicate applications — particularly light cream preparations, infusions, and espumas where the gas flavour would be most apparent.

For high-volume, bold applications (chocolate cream, coffee cream) the difference may be less detectable. For any application involving delicate flavour profiles, 99.9% certified purity matters.`,
      },
      {
        heading: 'How to Verify You Are Buying Food-Grade N₂O',
        type: 'body',
        list: [
          'Buy from an established UK supplier who explicitly states the brand name and certification of the product',
          'Look for TUV or CE certification on the cylinder itself — not just on the supplier\'s website',
          'Ask your supplier directly for certification documentation if you are purchasing at commercial volume for a professional kitchen',
          'Avoid unbranded or unnamed cylinders where purity and certification cannot be verified',
          'Check that the product is described as food-grade or E942 — not just "N₂O" without qualification',
        ],
      },
      {
        type: 'cta',
        body: 'All cylinders we supply — Smartwhip, FastGas, Cream Deluxe, and GoldWhip — are TUV or CE certified food-grade N₂O. Order with fast UK delivery.',
      },
    ],
  },

  {
    slug: 'is-nitrous-oxide-legal-uk-cream-chargers',
    title: 'Is Nitrous Oxide Legal for Cream Chargers in the UK? 2026 Regulations Explained',
    description: 'Clear explanation of the UK legal status of nitrous oxide for cream charger use in 2026. What the law says, what changed with the Psychoactive Substances Act, and why food-grade N2O for catering remains fully legal.',
    excerpt: 'The UK legal landscape around nitrous oxide has changed in recent years. Here is a clear, accurate explanation of the current position on food-grade N2O for cream charger use in 2026.',
    category: 'Guides',
    tags: ['nitrous oxide legal uk cream chargers', 'cream chargers legal uk', 'n2o catering use regulations', 'laughing gas vs food grade n2o uk', 'is cream charger legal uk 2026'],
    publishedAt: '2026-02-25',
    updatedAt: '2026-03-12',
    readTime: 8,
    sections: [
      {
        type: 'intro',
        body: `Few topics in the UK cream charger industry generate as much confusion as legality. The media coverage of nitrous oxide misuse, changes to UK legislation in recent years, and the difference between recreational and culinary applications have all contributed to a landscape where many buyers — including established catering professionals — are uncertain about where they stand.

This guide provides a clear, factual explanation of the UK legal position on nitrous oxide for cream charger use in 2026. The short answer: purchasing, selling, and using food-grade N₂O for legitimate culinary purposes remains entirely legal in the UK. Here is why — and what the law actually says.`,
      },
      {
        heading: 'The Psychoactive Substances Act 2016',
        type: 'body',
        body: `The Psychoactive Substances Act 2016 (PSA) was the first major piece of UK legislation to address nitrous oxide as a controlled substance. The Act made it a criminal offence to supply psychoactive substances — substances that produce a psychoactive effect in humans — for recreational purposes.

Critically for the catering industry, the PSA included a specific exemption for food products and substances used in the preparation of food. Nitrous oxide used in food-grade cream chargers falls squarely within this exemption. The Act was not intended to — and did not — affect the legitimate food industry use of N₂O.`,
      },
      {
        heading: 'The Criminal Justice Act 2023 — Class C Classification',
        type: 'body',
        body: `In November 2023, the UK government reclassified nitrous oxide as a Class C controlled substance under the Misuse of Drugs Act 1971. This was a significant change, but it is important to understand exactly what it does and does not affect.

The Class C classification targets the recreational possession and supply of nitrous oxide for non-food purposes. The legislation explicitly preserves the right to possess, supply, and use nitrous oxide for legitimate industrial, medical, and food purposes — including cream charger use in catering.

Practically speaking, this means:`,
        list: [
          'Purchasing food-grade N₂O cream charger cylinders for culinary use remains legal',
          'Using food-grade N₂O in a whipped cream dispenser for food preparation remains legal',
          'Selling food-grade N₂O cylinders for legitimate catering use remains legal',
          'Possessing N₂O cylinders when you can demonstrate legitimate culinary purpose is not an offence',
          'Recreational inhalation of nitrous oxide is now a criminal offence — this was the target of the legislation',
        ],
      },
      {
        heading: 'What Does "Legitimate Use" Mean?',
        type: 'body',
        body: `Legitimate use in the context of N₂O legislation means use in food preparation — specifically as a propellant and aerating agent in the production of whipped cream, culinary foams, infusions, and related food applications.

For professional catering businesses, legitimate use is straightforward to demonstrate: you are a catering or food service business, you use N₂O in food preparation for customers, and your purchasing is commensurate with your operational requirements.

For serious home cooks using food-grade cream chargers for home cooking purposes, the position is equally clear: using N₂O in a whipped cream dispenser for cooking is legitimate use.`,
      },
      {
        heading: 'Food-Grade vs Recreational N₂O: Why the Distinction Matters',
        type: 'body',
        body: `The legislation is designed to target recreational N₂O use — specifically, the direct inhalation of nitrous oxide for psychoactive effect (commonly associated with balloons). This is the behaviour that prompted legislative action and which the Class C classification is aimed at deterring.

Food-grade N₂O for catering is a completely different use case:`,
        list: [
          'Used in sealed equipment (pressure regulators, dispensers) — not inhaled directly',
          'Certified food-grade product for food contact use (E942)',
          'Purchased in volumes commensurate with food preparation needs',
          'Used in professional or domestic kitchen contexts',
          'An established, decades-long practice in UK and global catering',
        ],
      },
      {
        heading: 'Responsibilities When Purchasing and Using N₂O',
        type: 'body',
        body: `While food-grade cream charger use remains fully legal, there are responsible practices that every professional and home user should follow:`,
        list: [
          'Buy from reputable, established UK suppliers who sell certified food-grade products',
          'Purchase quantities that are proportionate to your actual culinary use',
          'Store cylinders appropriately and use only with compatible, properly maintained equipment',
          'Never supply N₂O products to minors — there is no legitimate culinary use case for this',
          'Use products only for their stated food preparation purpose',
        ],
      },
      {
        heading: 'Summary: Where the Law Stands in 2026',
        type: 'table',
        tableHeaders: ['Activity', 'Legal Status', 'Notes'],
        tableRows: [
          ['Buying food-grade N₂O cylinders for catering', 'Legal', 'All reputable brands, from established suppliers'],
          ['Using N₂O in a cream whipper for food preparation', 'Legal', 'Core, established culinary use'],
          ['Selling food-grade N₂O to catering professionals', 'Legal', 'Legitimate commercial supply'],
          ['Recreational inhalation of N₂O', 'Illegal (Class C)', 'Targeted by Misuse of Drugs Act'],
          ['Supplying N₂O knowing it will be inhaled recreationally', 'Illegal', 'Criminal supply offence'],
        ],
      },
      {
        type: 'cta',
        body: 'Buy certified food-grade N₂O cream chargers from a trusted UK supplier — fast local delivery available across the country.',
      },
    ],
  },

  {
    slug: 'cream-charger-storage-disposal-uk',
    title: 'How to Store, Handle and Dispose of N₂O Cylinders Safely in the UK',
    description: 'A complete UK safety guide for storing, handling, and disposing of N2O cream charger cylinders. Best practices for professional kitchens and home users covering storage, inspection, and responsible disposal.',
    excerpt: 'Proper storage, handling, and disposal of N₂O cylinders keeps your kitchen safe and keeps you on the right side of health and safety obligations. Here is everything UK users need to know.',
    category: 'Guides',
    tags: ['cream charger disposal uk', 'storing nitrous oxide cylinders uk', 'n2o charger safety tips', 'recycle cream chargers uk', 'N2O cylinder storage guide'],
    publishedAt: '2025-12-10',
    updatedAt: '2026-02-22',
    readTime: 6,
    sections: [
      {
        type: 'intro',
        body: `N₂O cream charger cylinders are pressurised steel vessels — and like all pressurised containers, they require sensible handling, appropriate storage, and responsible disposal. For professional kitchens, correct handling is also a health and safety obligation.

The good news is that the requirements are not complicated. Following a few consistent practices keeps your team safe, your cylinders in good condition, and your disposal process compliant with UK recycling guidelines.`,
      },
      {
        heading: 'Storage: Where and How to Keep N₂O Cylinders',
        type: 'body',
        body: `N₂O cylinders should be stored according to the following guidelines, which apply whether you are a professional catering operation or a serious home user:`,
        list: [
          'Temperature — store in a cool environment, below 50°C. Never store near boilers, ovens, or heat-generating equipment. High temperatures increase cylinder pressure and create safety risks.',
          'Ventilation — storage areas must be well-ventilated. In the unlikely event of a slow leak, ventilation prevents any gas accumulation.',
          'Upright position — store all cylinders upright. Horizontal storage over extended periods can affect valve integrity.',
          'Away from flammable materials — while N₂O itself is non-flammable, it supports combustion. Keep cylinders away from flammable materials and open flames.',
          'Secure against falling — cylinders should be secured against falling, particularly in busy kitchen environments. A falling cylinder can damage the valve, creating a hazardous rapid vent.',
          'Access control — store in an area accessible only to trained staff who know how to handle cylinders correctly.',
        ],
      },
      {
        heading: 'Handling Best Practices',
        type: 'body',
        body: `Day-to-day handling of N₂O cylinders in a professional context requires consistent attention to a few key points:`,
        list: [
          'Inspect before use — check every cylinder for visible damage, dents, corrosion, or valve damage before connecting. Do not use a damaged cylinder.',
          'Never drop or roll cylinders — impact can damage valves and in rare cases compromise cylinder integrity.',
          'Carry upright — always transport cylinders in an upright or near-upright position.',
          'Use correct equipment — always use a properly rated, compatible regulator. Never attempt to attach an incompatible regulator to a cylinder.',
          'Close valve when not in use — always close the regulator valve when the setup is not in active use.',
          'Do not heat cylinders — never use heat to try to extract remaining gas. This is dangerous and will not work effectively.',
        ],
      },
      {
        heading: 'Recognising a Cylinder That Should Not Be Used',
        type: 'tip',
        list: [
          'Visible dents, bulges, or deformation of the cylinder body',
          'Corrosion or rust on the cylinder body or valve area',
          'Damaged or cross-threaded valve',
          'Cylinder that feels unusually light (may indicate contamination of remaining gas)',
          'Any cylinder that has been dropped from height — even if no visible damage is apparent',
          'Cylinders past their stated test/expiry date if applicable',
        ],
      },
      {
        heading: 'Using Cylinders Safely During Service',
        type: 'body',
        body: `During active use in a kitchen environment:`,
        list: [
          'Ensure adequate ventilation in the kitchen — in professional settings, this is a standard requirement and N₂O presents no unusual concern in a properly ventilated space',
          'Do not allow non-trained staff to operate the N₂O setup',
          'Keep cylinders away from cooking surfaces and high heat during service',
          'Monitor regulator pressure during use — unexpected pressure drops may indicate a leak',
          'If a significant gas leak occurs (loud hissing, frost forming on a connection), close the regulator immediately, move the cylinder to a well-ventilated area, and do not use near ignition sources',
        ],
      },
      {
        heading: 'Disposing of Empty N₂O Cylinders in the UK',
        type: 'body',
        body: `Empty N₂O cylinders — whether 640g or the smaller 8g cartridges — are steel vessels and should be disposed of responsibly. The correct approach in the UK:`,
        list: [
          'Ensure the cylinder is completely empty before disposal — never dispose of a cylinder that may still contain gas',
          'Small 8g steel cartridges — accepted by most UK local authority household waste recycling centres (HWRCs) as scrap metal; do not place in domestic recycling bins without checking local authority guidance',
          '640g steel cylinders — check with your supplier whether a cylinder return scheme is available; many professional suppliers accept empties for recycling',
          'Never puncture or attempt to open a cylinder — even an apparently empty cylinder may contain residual pressure',
          'Never dispose of cylinders in general waste — steel is fully recyclable and should be directed to the appropriate stream',
        ],
      },
      {
        heading: 'For Professional Kitchens: Health and Safety Documentation',
        type: 'body',
        body: `If you store N₂O cylinders in a professional catering environment, you should have a brief risk assessment in place as part of your general kitchen health and safety documentation. This does not need to be complex — it simply needs to identify the hazard (pressurised gas cylinders), the control measures in place (correct storage, trained handling, ventilation), and the emergency procedure (close valve, ventilate, contact supplier).

Safety data sheets (SDS) for N₂O are available from all reputable cylinder suppliers and should be kept accessible wherever cylinders are stored.`,
      },
      {
        type: 'cta',
        body: 'Order certified food-grade N₂O cylinders from a trusted UK supplier — responsible sourcing with fast local delivery.',
      },
    ],
  },

  {
    slug: 'molecular-gastronomy-n2o-espumas-uk',
    title: 'Molecular Gastronomy at Home: Using N₂O for Professional Espumas and Mousses',
    description: 'A practical guide to using food-grade N2O for molecular gastronomy at home or in a professional UK kitchen. Covers espumas, airs, cold infusions, and aerated textures step by step.',
    excerpt: 'Espumas, airs, rapid infusions — the techniques of molecular gastronomy are not as intimidating as they look. With a food-grade N₂O setup, most of them are achievable in any kitchen.',
    category: 'Catering',
    tags: ['molecular gastronomy n2o', 'espuma recipe cream charger uk', 'n2o foam professional', 'smartwhip for chefs', 'culinary foam uk'],
    publishedAt: '2026-01-30',
    updatedAt: '2026-03-05',
    readTime: 8,
    sections: [
      {
        type: 'intro',
        body: `Espumas, foams, airs, and rapid infusions — these are the techniques that defined the Ferran Adrià era of haute cuisine and that have, over the past decade, filtered down from three-Michelin-star kitchens into ambitious restaurant menus and serious home cooking. The tools required are not complicated. You need a food-grade N₂O setup — a 640g cylinder, a quality pressure regulator, and a professional dispenser — and a working understanding of the principles behind each technique.

This guide covers the core molecular gastronomy applications for N₂O: what they are, how the science works, and how to execute them at home or in a professional kitchen.`,
      },
      {
        heading: 'Understanding How N₂O Creates Foam and Texture',
        type: 'body',
        body: `The science behind N₂O foam is simple. Nitrous oxide is highly soluble in fat under pressure. When you load a liquid containing fat into a pressurised dispenser and introduce N₂O, the gas dissolves into the fat molecules. When the pressure is released — by pressing the dispenser lever — the dissolved gas comes out of solution as millions of tiny bubbles, creating an aerated, foam-like texture.

The key variables are:`,
        list: [
          'Fat content — higher fat means more dissolved gas, firmer and more stable foam',
          'Temperature — colder liquid absorbs and retains gas more effectively; warm liquid produces looser, less stable foam',
          'Pressure — higher regulator pressure forces more gas into solution, producing denser foam',
          'Liquid viscosity — thicker liquids (creams, purées reduced with cream or lecithin) produce more structured foam than thin liquids',
        ],
      },
      {
        heading: 'Espuma: The Foundational Technique',
        type: 'body',
        body: `Espuma (the Spanish word for foam) refers to a light, aerated foam made in a siphon (whipped cream dispenser) using N₂O. Unlike traditional mousses, espumas contain no eggs or gelatine — the foam structure is created entirely by the gas.

The basic formula for a successful espuma:`,
        list: [
          'Start with a liquid base that contains fat — cream, coconut cream, or a reduction with cream',
          'Your base should be well-seasoned and full-flavoured — the aeration will dilute intensity slightly',
          'Pass through a fine sieve before loading — any lumps or fibres will block the nozzle',
          'Chill to below 5°C before charging — cold is essential for stability',
          'Charge at 9–11 bar for most espuma applications',
          'Dispense just before serving — espumas begin to collapse within minutes',
        ],
      },
      {
        heading: 'Classic Espuma Recipes',
        type: 'body',
        list: [
          'Cauliflower espuma — blend roasted cauliflower with cream and butter until smooth, pass through a fine sieve, season, chill, and charge at 10 bar. The result is a light, deeply savoury foam that pairs with seared scallops, roast fish, or pasta.',
          'Green pea espuma — blanch fresh peas, blend with double cream, a little mint, and white pepper. Pass through a fine sieve. The bright green colour and sweet vegetal flavour works with spring lamb, prawns, and egg dishes.',
          'Potato and truffle espuma — blend cooked potato with cream and truffle oil. A luxurious, silky espuma with enormous richness — serve in small quantities as an amuse bouche or a refined garnish.',
          'Butternut squash espuma — roast butternut squash, blend with cream and a pinch of nutmeg and sage. A warm-coloured, autumnal espuma suited to game dishes and risotto.',
        ],
      },
      {
        heading: 'Airs: A More Advanced Technique',
        type: 'body',
        body: `Culinary airs are an ultra-light version of foam — so delicate they barely sit on the plate. Unlike espumas, airs are typically made with very low-fat or no-fat liquids stabilised with lecithin (soya lecithin is widely available and easy to use).

The technique:`,
        list: [
          'Combine your flavoured liquid (citrus juice, herb tea, tomato water, shellfish stock) with 0.3–0.5% soya lecithin by weight',
          'Use an immersion blender at the surface to create a foam of large, light bubbles',
          'Collect only the foam and transfer immediately to the plate — it is highly perishable',
          'This technique does not use a pressurised dispenser — it is a separate method using the emulsifying properties of lecithin',
        ],
      },
      {
        heading: 'Rapid Infusion with N₂O',
        type: 'body',
        body: `Rapid infusion is one of the most practically valuable applications of N₂O in a professional kitchen context. The pressurisation and depressurisation cycle forces a liquid into a solid's cellular structure, dramatically accelerating flavour transfer.

Applications:`,
        list: [
          'Spirits infused with fruit, herbs, or spices in 2–3 minutes rather than days',
          'Oils infused with aromatics — rosemary olive oil, chilli-infused rapeseed oil, saffron cream',
          'Vinegars and shrubs infused with fruit in minutes',
          'Pickle liquors — cucumber, radish, and similar vegetables can be lightly pickled in under 10 minutes',
        ],
      },
      {
        heading: 'Rapid Infusion Method',
        type: 'tip',
        list: [
          'Use the maximum amount of flavouring ingredient — infusion is faster but the intensity per minute is lower than long-infusion methods',
          'Charge at a lower pressure for spirits and oils (7–9 bar) — high pressure is not necessary and can over-pressurise alcohol',
          'After charging and shaking, allow the dispenser to rest for 2–3 minutes before venting',
          'Vent slowly into a bowl covered with a fine sieve — the gas will carry some liquid as it escapes',
          'Strain the infused liquid through a fine sieve or muslin before use',
          'Taste before serving — rapid infusion can sometimes produce a slightly different flavour profile to long-infusion; adjust seasoning accordingly',
        ],
      },
      {
        heading: 'Equipment for Molecular Gastronomy Applications',
        type: 'body',
        body: `A standard Smartwhip 640g setup with a quality regulator and professional dispenser handles most of the techniques described above. For specific applications:`,
        list: [
          'Fine sieve or Superbag (fine mesh bag) — essential for straining all espuma bases and infusions before loading the dispenser',
          'Temperature probe — useful for confirming your liquid is below 5°C before charging',
          'Scale accurate to 0.1g — for measuring lecithin and other small-quantity ingredients',
          'ISI or quality dispenser with multiple nozzle options — different nozzles produce different foam textures',
        ],
      },
      {
        type: 'cta',
        body: 'Take your kitchen further. Order Smartwhip 640g cylinders with fast UK delivery — find your town below.',
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllCategories(): string[] {
  return [...new Set(blogPosts.map((p) => p.category))];
}
