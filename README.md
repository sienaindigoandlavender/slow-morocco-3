# Slow Morocco

A thoughtful travel website for [Slow Morocco](https://www.slowmorocco.com) — designing intentional journeys through Morocco.

Built with Next.js 14, Supabase, and Tailwind CSS. Deployed on Vercel.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS with CSS variables
- **Images:** Cloudinary (primary), Google Drive (legacy), Supabase Storage
- **Maps:** Mapbox GL JS, D3.js (SVG maps)
- **Email:** Resend (transactional)
- **Fonts:** Libre Baskerville (serif), Cormorant Garamond (display), Inter (sans)
- **Icons:** Lucide React
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

Create a `.env.local` file with:

```bash
# Supabase (required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Nexus (multi-site content layer — optional)
NEXUS_SUPABASE_URL=https://your-nexus-project.supabase.co
NEXUS_SUPABASE_ANON_KEY=your_nexus_anon_key
SITE_ID=slow-morocco

# Email (optional — form notifications)
RESEND_API_KEY=your_resend_key
CONTACT_EMAIL=hello@slowmorocco.com

# Maps (optional — Mapbox satellite views)
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# SEO / Indexing (optional)
GOOGLE_INDEXING_CLIENT_EMAIL=your_service_account_email
GOOGLE_INDEXING_PRIVATE_KEY=your_private_key
GOOGLE_INDEX_SECRET=your_secret_token
INDEXNOW_SECRET=your_indexnow_secret
EBIRD_API_KEY=your_ebird_key

# Site
NEXT_PUBLIC_SITE_URL=https://www.slowmorocco.com
NEXT_PUBLIC_SITE_NAME=Slow Morocco
```

## Project Structure

```
app/
├── page.tsx                  # Homepage
├── layout.tsx                # Root layout
├── globals.css               # Global styles & CSS variables
├── HomeContent.tsx           # Homepage client component
│
├── morocco/                  # Country guide hub
├── [city]/                   # Dynamic city guide pages (Marrakech, Fes, etc.)
├── places/                   # All places (towns, sites, landmarks)
├── regions/                  # Regional groupings
│
├── journeys/                 # Journey listings & detail pages
├── stories/                  # Editorial stories & deep reads
├── guides/                   # Practical travel guides
├── glossary/                 # Moroccan terms glossary
│
├── plan-your-trip/           # Journey request form
├── day-trips/                # Bookable day trips
├── overnight/                # Overnight experiences
├── proposal/                 # Client proposal viewer
├── dossiers/                 # Travel dossier viewer
│
├── about/                    # About page
├── contact/                  # Contact page
├── faq/                      # FAQ
├── manifesto/                # Brand manifesto
├── whats-included/           # What's included in trips
├── travel/                   # Travel logistics info
├── travel-insurance/         # Insurance info
├── health-safety/            # Health & safety
├── visa-info/                # Visa information
│
├── morocco-world-cup-2030/   # World Cup 2030 interactive map
├── jewish-heritage-morocco/  # Jewish heritage guide
├── riad-di-siena/            # Partner property
├── go/gentle/                # Responsible travel
├── life/                     # Life in Morocco
├── epic/                     # Epic journeys
├── newsletter/               # Newsletter signup
│
├── terms/                    # Terms of service
├── privacy/                  # Privacy policy
├── cancellation-policy/      # Cancellation policy
├── disclaimer/               # Disclaimer
├── intellectual-property/    # IP notice
│
├── admin/                    # Admin tools
├── client/                   # Client portal
│
├── api/                      # API routes (see below)
├── sitemap.ts                # Dynamic sitemap
├── robots.ts                 # Robots.txt
├── opengraph-image.tsx       # Default OG image
└── twitter-image.tsx         # Default Twitter card

components/
├── Header.tsx                # Site header & navigation
├── Footer.tsx                # Multi-level footer
├── LayoutWrapper.tsx         # Layout wrapper (header + footer)
├── PageBanner.tsx            # Reusable hero banner
├── HeroSearch.tsx            # Homepage search
├── SearchModal.tsx           # Global search modal
├── PlanYourTripForm.tsx      # Trip request form
├── StoryCard.tsx             # Story card component
├── StoryBody.tsx             # Story renderer
├── StorySchema.tsx           # Story structured data
├── RelatedJourneys.tsx       # Related journeys sidebar
├── RelatedStories.tsx        # Related stories sidebar
├── ShareTools.tsx            # Social sharing tools
├── SeasonalBadge.tsx         # Best-season indicator
├── NewsletterSignup.tsx      # Newsletter form
├── WhatsAppButton.tsx        # WhatsApp CTA
├── Chatbot.tsx               # AI chatbot
├── StructuredData.tsx        # JSON-LD schema
├── LegalPageContent.tsx      # Legal page template
├── DayTripBookingModal.tsx   # Day trip booking
├── OvernightBookingModal.tsx # Overnight booking
├── maps/                     # Map components
│   ├── MoroccoMap.tsx
│   ├── CityMap.tsx
│   ├── ItineraryMap.tsx
│   └── PlaceSatelliteMap.tsx
├── icons/                    # Custom icon components
└── seo/                      # SEO components

lib/
├── supabase.ts               # Supabase client & all data queries
├── nexus.ts                  # Nexus multi-site content layer
├── glossary-data.ts          # Glossary terms dataset
├── glossary-linker.tsx       # Auto-link glossary terms in text
├── derb-linker.tsx           # Auto-link place names in text
├── content-matcher.ts        # Content matching utilities
└── currency.ts               # Currency formatting
```

## API Routes

```
api/
├── admin/                    # Admin operations
├── chatbot/                  # AI chatbot endpoint
├── content-library/          # Content library API
├── day-trip-bookings/        # Day trip booking submissions
├── day-trips/                # Day trip listings
├── destinations/             # Destination data
├── ebird/                    # eBird birding data
├── footer/                   # Footer content
├── gentle-journeys/          # Responsible travel data
├── glossary/                 # Glossary terms
├── google-index/             # Google Indexing API
├── guides/                   # Guide content
├── indexnow/                 # IndexNow submissions
├── journeys/                 # Journey data
├── knowledge/                # Knowledge base
├── legal/                    # Legal page content
├── newsletter/               # Newsletter subscriptions
├── overnight-booking/        # Overnight bookings
├── page-banners/             # Page banner images
├── places/                   # Place data
├── plan-your-trip/           # Trip request submissions
├── proposals/                # Client proposals
├── regions/                  # Region data
├── related-journeys/         # Related journey suggestions
├── related-stories/          # Related story suggestions
├── settings/                 # Site settings
├── stories/                  # Story data
└── testimonials/             # Testimonial data
```

## Data Sources

All content is stored in **Supabase** (PostgreSQL):

- `destinations` — cities, towns, regions
- `places` / `place_images` — individual places & their images
- `city_guide_images` — city guide hero & gallery images
- `journeys` / `journey_days` — multi-day itineraries
- `stories` — editorial content
- `guides` — practical travel guides
- `glossary` — Moroccan Arabic/Amazigh terms
- `day_trips` / `overnight_experiences` — bookable experiences
- `page_banners` — hero images per page
- `newsletter_subscribers` — email list
- `quotes` — trip request submissions
- `settings` / `footer_links` — site configuration

Images are hosted on **Cloudinary** (`res.cloudinary.com/ddcznjibs/`), with fallbacks to Google Drive URLs for legacy content.

## Image Handling

- **Primary:** Cloudinary URLs via Next.js `<Image>` component
- **Legacy:** Google Drive URLs converted via `convertDriveUrl()` in `lib/supabase.ts`
- **Fallback:** Dark gradient placeholder when no image available
- Allowed domains configured in `next.config.js`

## SEO

- Per-page metadata on all routes
- Dynamic `sitemap.ts` and `robots.ts`
- OpenGraph and Twitter card images
- JSON-LD structured data (stories, places, journeys)
- `llms.txt` for AI crawlers
- 200+ Squarespace-to-Next.js 301 redirects in `next.config.js`
- Google Indexing API and IndexNow integration

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full deployment instructions.

## License

Private — All rights reserved
