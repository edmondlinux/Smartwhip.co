# replit.md

## Overview

This is a SmartWhip UK e-commerce site built on Next.js. It sells SmartWhip N₂O cream chargers across UK towns via WhatsApp/Telegram ordering. The site uses town-based landing pages (SSG) covering thousands of UK locations to drive local SEO traffic.

**Production domain:** `https://smartwhip.co`
**Contact:** +44 7476 690829 | apexsmartwhips@gmail.com
**Partner sites:** apexwhips.com · smartwhip.org.uk

## Town Page SEO Architecture

### Unique Content per Town (anti-duplicate system)
All town pages use a **deterministic content seeding** system (`lib/townContent.ts`) to ensure each of the 1000+ town pages has genuinely unique content rather than near-duplicate boilerplate.

**Unique content elements per page:**
- `heroSubtitle` — 6 different copy variants (seeded from city name)
- `heroBadge` — 6 different trust badge texts
- `localIntroParagraph` — 8 paragraph variants, also region-aware
- `productDesc640g` — 4 product description variants
- `productDescCase` — 4 case pack description variants
- `faqs` — drawn from a pool of 12 FAQ pairs; each town gets 5 unique ones
- `testimonials` — pool of 10 reviews; each town shows 3 unique ones
- `extraFeatureText` — 6 commitment statement variants
- `deliveryTime` — scales by city population (major=20-35min, small=35-60min)
- `region` — detected from lat/lng (Scotland/North/Yorkshire/Midlands/East/SouthWest/London/South/Wales/NI)
- `regionPhrase` — unique geographic phrase per region
- `nearbyTowns` — calculated via Haversine distance from real lat/lng; every town gets different neighbours
- `reviewCount` — deterministic unique number per city (80–200)
- `ratingValue` — deterministic 4.7–4.9 per city
- **Meta titles** — 5 title template variants, seeded per city
- **Meta descriptions** — 5 description template variants, seeded per city
- **JSON-LD** — Product, FAQPage (unique questions), and LocalBusiness schemas, all with unique city data

## Blog System

### Blog Posts (lib/blog/posts.ts)
All posts are defined in a single modular array. To add a new post, simply add a new object to the `blogPosts` array with the standard `BlogPost` shape. Posts are automatically:
- Included in the blog index page (`/blog`)
- Served at `/blog/[slug]`
- Added to the blog sitemap at `/sitemap-blog.xml`

**Current posts (19 total):**
- `smartwhip-640g-review` — Reviews
- `smartwhip-vs-fastgas-vs-cream-deluxe` — Comparisons
- `640g-cream-charger-vs-8g-cartridges` — Guides
- `how-to-use-smartwhip-640g` — Guides
- `cream-charger-delivery-uk-guide` — Delivery
- `bulk-cream-chargers-catering-uk` — Catering
- `goldwhip-640g-review` — Reviews
- `where-to-buy-cream-chargers-uk` — Guides
- `best-cream-chargers-uk-2026` — Comparisons
- `cream-charger-regulator-guide` — Guides
- `n2o-cream-chargers-professional-catering-uk` — Catering
- `smartwhip-cream-chargers-uk-beginners-guide` — Guides
- `how-to-use-whipped-cream-dispenser-step-by-step` — Guides
- `troubleshooting-whipped-cream-dispenser` — Guides
- `whipped-cream-charger-recipes` — Guides
- `food-grade-nitrous-oxide-uk` — Guides
- `is-nitrous-oxide-legal-uk-cream-chargers` — Guides
- `cream-charger-storage-disposal-uk` — Guides
- `molecular-gastronomy-n2o-espumas-uk` — Catering

Each post supports section types: `intro`, `body`, `cta`, `tip`, `table`.
CTA sections render as WhatsApp/Telegram order buttons.

### Blog Sitemap
`/sitemap-blog.xml` — dynamically generated, lists all blog post URLs. Already referenced in main `sitemap.ts`.

## Brand Stock Images
Brand product images are located at:
- `/public/products/smartwhip.jpeg`
- `/public/products/fastgas.jpeg`
- `/public/products/cream-deluxe.jpeg`
- `/public/products/goldwhip.jpeg`

To replace an image, upload the new file to `/public/products/` using the same filename.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with App Router, using experimental features (PPR - Partial Prerendering, client segment cache)
- **Styling**: Tailwind CSS v4 with CSS variables for theming, using the shadcn/ui component library (new-york style)
- **UI Components**: Radix UI primitives wrapped with custom styling via shadcn/ui pattern
- **Font**: Manrope (Google Fonts)
- **Icons**: Lucide React

### Backend Architecture
- **API Pattern**: Next.js Server Actions with Zod schema validation
- **Authentication**: Email/password auth using JWTs stored in cookies, with bcryptjs for password hashing and jose for JWT handling
- **Middleware**: Global middleware protects authenticated routes; local middleware validates Server Actions

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-kit for migrations
- **Schema Location**: `lib/db/schema.ts`
- **Migrations**: Stored in `lib/db/migrations/`
- **Connection**: Uses `postgres` package (postgres.js driver)

### Database Schema
Key tables:
- `users`: User accounts with email, password hash, role, timestamps
- `teams`: Team entities with Stripe integration fields (customer ID, subscription ID, product ID, plan name, status)
- `team_members`: Junction table linking users to teams with roles
- `activity_logs`: Audit trail for user actions within teams

### Authentication Flow
- Password hashing with bcryptjs
- JWT tokens managed via jose library
- Session stored in HTTP-only cookies
- Role-based access: Owner and Member roles per team

## External Dependencies

### Payment Processing
- **Stripe**: Full integration for subscriptions and payments
  - Stripe Checkout for payment flow
  - Stripe Customer Portal for subscription management
  - Products and prices created via seed script (Base: $8/month, Plus: $12/month with 7-day trials)
  - Requires `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` environment variables

### Database
- **PostgreSQL**: Required external database
  - Connection string via `POSTGRES_URL` environment variable
  - Drizzle ORM handles all database operations

### Environment Variables Required
- `POSTGRES_URL`: PostgreSQL connection string
- `AUTH_SECRET`: Secret for JWT signing (auto-generated by setup script)
- `STRIPE_SECRET_KEY`: Stripe API secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook signing secret
- `BASE_URL`: Application base URL for Stripe redirects

### Development Tools
- Stripe CLI: Required for local webhook testing (`stripe login` before development)
- Drizzle Kit: Database migrations and studio (`pnpm db:generate`, `pnpm db:migrate`, `pnpm db:studio`)

### NPM Scripts
- `pnpm dev`: Start development server with Turbopack
- `pnpm db:setup`: Interactive setup for environment variables
- `pnpm db:seed`: Seed database with test user and Stripe products
- `pnpm db:generate`: Generate Drizzle migrations
- `pnpm db:migrate`: Run database migrations