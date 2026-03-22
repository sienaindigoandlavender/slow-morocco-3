"use client";

import { useState } from "react";
import Link from "next/link";
import OvernightBookingModal from "@/components/OvernightBookingModal";

// ── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "A brilliant introduction to Morocco. Well organised and thought out — I couldn't wish for a better introduction. All of the accommodations were interesting.",
    author: "Angela A.",
    journey: "3-Day Sahara Circle",
  },
  {
    quote: "I loved every minute. The desert was memorable. So many things were over and above what you would expect. The details were so thoughtful. Feel secure and happy and confident that you are being well cared for.",
    author: "Rhonda",
    journey: "Morocco private journey",
  },
  {
    quote: "I've ventured into the desert and I'm at a loss for words to convey just how rich in culture and adventure this journey turned out to be. Every step of the way, I felt exceptionally well taken care of and completely safe.",
    author: "Anthony K.",
    journey: "Morocco private journey",
  },
  {
    quote: "We were welcomed to Dihya Desert Camp where Berbers played and danced to music around a bonfire. The stars out in the desert were amazing. We rode the sand dunes and viewed the sunset on our evening camel ride.",
    author: "Mary Ann",
    journey: "Morocco private journey",
  },
];

// ── FAQ data ──────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "How far is Merzouga from Marrakech?",
    a: "Merzouga is approximately 550 kilometres from Marrakech — about 9 hours by road. The route crosses the High Atlas via the Tizi n'Tichka pass, passes through Ouarzazate and the Draa Valley. It is not a day trip. Anyone offering 'the Sahara' as a day trip from Marrakech is selling you the Agafay plateau, which is a rocky desert outside the city — very different from the Erg Chebbi dunes.",
  },
  {
    q: "What is the difference between the Agafay Desert and the Sahara?",
    a: "The Agafay is a rocky plateau about 40 minutes from Marrakech. It offers dramatic landscape and overnight camps, but it has no sand dunes and is technically not part of the Sahara. The Erg Chebbi dunes at Merzouga — 150 metres high — are the real Sahara. Both are valid experiences. They are not the same thing.",
  },
  {
    q: "What is the best time of year for a Sahara desert tour?",
    a: "October to April. The desert in summer (June to August) reaches 45°C at midday — physically dangerous and not enjoyable. Spring and autumn offer warm days, cool nights, and the best light on the dunes. October coincides with the date harvest in the Draa Valley. December and January are cold at night but the days are clear.",
  },
  {
    q: "Is this a private tour or a group tour?",
    a: "Private. Your own vehicle, your own driver, your own schedule. No shared minibuses, no fixed stops at tourist shops, no commission arrangements with souvenir sellers. The route and pace are yours.",
  },
  {
    q: "What is included in the price?",
    a: "Private driver for three days, two nights accommodation (Ouarzazate and a desert camp at Merzouga), and all transfers. Meals are not included — you eat at local restaurants en route, which we recommend specifically. Entry fees to sites like Aït Benhaddou are not included (roughly €2-3 per person).",
  },
  {
    q: "Can the tour be extended?",
    a: "Yes. The 4-Day Sahara & Valleys Journey adds the Dades Valley and Todra Gorge on the return. The 7-Day Gorges to Desert Trek continues to Fes. Both are available as private journeys.",
  },
];

// ── FAQ Item component ────────────────────────────────────────────────────────
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-foreground/[0.08]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-medium text-foreground leading-snug">
          {question}
        </span>
        <span className="text-foreground/30 flex-shrink-0 mt-0.5 text-lg leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="text-sm text-foreground/55 leading-relaxed pb-6 pr-8">
          {answer}
        </p>
      )}
    </div>
  );
}

const PRICE_PER_PERSON = 450;
const MIN_PARTICIPANTS = 2;

const ITINERARY = [
  {
    day: 1,
    title: "Marrakech to Ouarzazate",
    distance: "200 km · 3.5 hours",
    description: "The road south crosses the High Atlas via the Tizi n'Tichka pass — 2,260 metres, the highest paved road in Morocco. The landscape shifts from cedar forest to bare rock to the first palmeries of the south. Ouarzazate is not the desert. It is the threshold. The city exists because the French needed a garrison in the south; the kasbahs existed because everyone before them needed a fortress. You spend the first night here.",
    stops: ["Tizi n'Tichka pass (2,260m)", "Aït Benhaddou kasbah", "Ouarzazate overnight"],
  },
  {
    day: 2,
    title: "Ouarzazate through the Draa Valley",
    distance: "210 km · 4 hours",
    description: "The Draa is the longest river in Morocco and for most of the year it is barely a river at all. What it leaves behind is a valley of date palms, mud-brick ksour, and villages that have been here since the caravans came through from sub-Saharan Africa. The valley road follows the river south through Agdz and Tamnougalt — a fortified village whose walls you can walk on — before the landscape opens into the pre-Saharan hammada. Merzouga is at the end of the road.",
    stops: ["Agdz palmery", "Tamnougalt fortified village", "Draa Valley road", "Merzouga arrival and dune walk"],
  },
  {
    day: 3,
    title: "Merzouga dunes, then back",
    distance: "550 km return · depart early",
    description: "Erg Chebbi is not the Sahara in the tourist-poster sense — it is one of Morocco's two major erg fields, a sea of dunes that rises to 150 metres at its peak. The dunes are real. The silence is real. You leave before sunrise to catch the light on the sand, then begin the return. The road north goes back through Ouarzazate and over the Atlas. You arrive in Marrakech by evening.",
    stops: ["Sunrise at Erg Chebbi", "Optional camel ride at dawn", "Return via Ouarzazate and Atlas"],
  },
];

const INCLUDED = [
  "Private driver throughout — no shared minibuses",
  "2 nights accommodation (Ouarzazate + Merzouga desert camp)",
  "All transfers and fuel",
  "English-speaking driver familiar with the route",
];

const NOT_INCLUDED = [
  "Meals (eaten at local restaurants en route — we recommend specific places)",
  "Entry fees to Aït Benhaddou and Tamnougalt",
  "Camel ride at Merzouga (optional, arranged on arrival)",
  "International flights",
];

export default function SaharaLandingContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [participants, setParticipants] = useState(2);

  const totalEUR = participants * PRICE_PER_PERSON;
  const handlingFee = Math.round(totalEUR * 2.5) / 100;
  const grandTotal = totalEUR + handlingFee;

  const pricingEUR = {
    transfers: { label: `Private journey (€${PRICE_PER_PERSON} × ${participants} persons)`, amount: totalEUR },
    room: { label: "2 nights accommodation included", amount: 0 },
    camel: { label: "Driver & fuel included", amount: 0 },
    coordination: { label: "Concierge service", amount: handlingFee },
  };

  return (
    <div className="bg-background min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative h-[70vh] bg-[#c4a882] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('https://res.cloudinary.com/dsza1ksnz/image/upload/v1/slow-morocco/merzouga-dunes')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 px-6 md:px-14 pb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-3">
            Private Journey · 3 Days
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] max-w-3xl">
            Sahara Desert Tour from Marrakech
          </h1>
          <p className="text-white/70 text-base mt-4 max-w-xl leading-relaxed">
            Marrakech → Ouarzazate → Draa Valley → Erg Chebbi dunes
          </p>
        </div>
      </div>

      {/* ── The honest description ────────────────────────────────────────── */}
      <div className="px-6 md:px-14 py-20 max-w-3xl">
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">
          What this journey actually is
        </p>
        <p className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed mb-8">
          The Sahara is not forty minutes from Marrakech. It is nine hours. Anyone who tells you otherwise is selling you the Agafay plateau, which is a rocky desert outside the city — fine for a night, not the Sahara.
        </p>
        <p className="text-base text-foreground/60 leading-relaxed mb-6">
          The real dunes — Erg Chebbi at Merzouga — require crossing the High Atlas, passing through the kasbah country around Ouarzazate, and following the Draa Valley south through 200 kilometres of palmeries and fortified villages. That road is the journey. The dunes are the destination.
        </p>
        <p className="text-base text-foreground/60 leading-relaxed">
          This is a private tour — your own vehicle, your own driver, your own pace. No group, no fixed stops at tourist shops, no commission arrangements. Three days that include everything the south of Morocco actually is, not just its most photogenic corner.
        </p>
      </div>

      {/* ── Itinerary ─────────────────────────────────────────────────────── */}
      <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-12">
          Day by day
        </p>
        <div className="space-y-px max-w-3xl">
          {ITINERARY.map((day) => (
            <div key={day.day} className="border border-foreground/[0.08] p-8">
              <div className="flex items-baseline gap-6 mb-6">
                <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/25 w-10 flex-shrink-0">
                  Day {day.day}
                </span>
                <div className="flex-1">
                  <h2 className="font-serif text-xl text-foreground mb-1">
                    {day.title}
                  </h2>
                  <p className="text-[11px] tracking-wide text-foreground/35">
                    {day.distance}
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed mb-6 pl-16">
                {day.description}
              </p>
              <div className="pl-16 flex flex-wrap gap-2">
                {day.stops.map((stop, i) => (
                  <span
                    key={i}
                    className="text-[10px] tracking-[0.08em] uppercase px-3 py-1 bg-foreground/[0.04] text-foreground/40"
                  >
                    {stop}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── What's included ───────────────────────────────────────────────── */}
      <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
        <div className="max-w-3xl grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">
              Included
            </p>
            <ul className="space-y-3">
              {INCLUDED.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/70 leading-relaxed">
                  <span className="text-foreground/25 mt-0.5 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">
              Not included
            </p>
            <ul className="space-y-3">
              {NOT_INCLUDED.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-foreground/50 leading-relaxed">
                  <span className="text-foreground/20 mt-0.5 flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Pricing & booking ─────────────────────────────────────────────── */}
      <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
        <div className="max-w-xl">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-8">
            Pricing
          </p>

          {/* Price display */}
          <div className="mb-8">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-serif text-5xl text-foreground">€{PRICE_PER_PERSON}</span>
              <span className="text-sm text-foreground/40">per person</span>
            </div>
            <p className="text-sm text-foreground/40">
              Minimum 2 participants · Maximum 6
            </p>
          </div>

          {/* Participant selector */}
          <div className="mb-8">
            <p className="text-xs tracking-[0.1em] uppercase text-foreground/40 mb-4">
              Number of participants
            </p>
            <div className="flex gap-2">
              {[2, 3, 4, 5, 6].map((n) => (
                <button
                  key={n}
                  onClick={() => setParticipants(n)}
                  className={`w-10 h-10 text-sm border transition-all ${
                    participants === n
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/15 text-foreground/50 hover:border-foreground/40"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border border-foreground/[0.08] p-6 mb-8">
            <div className="flex justify-between text-sm text-foreground/50 mb-3">
              <span>€{PRICE_PER_PERSON} × {participants} persons</span>
              <span>€{totalEUR}</span>
            </div>
            <div className="flex justify-between text-sm text-foreground/40 mb-4 pb-4 border-b border-foreground/[0.06]">
              <span>Concierge service</span>
              <span>€{handlingFee}</span>
            </div>
            <div className="flex justify-between text-foreground font-medium">
              <span>Total</span>
              <span>€{grandTotal}</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => setIsBookingOpen(true)}
            className="w-full py-4 bg-foreground text-background text-sm tracking-[0.15em] uppercase hover:bg-foreground/85 transition-colors mb-4"
          >
            Reserve this journey →
          </button>
          <p className="text-xs text-foreground/30 text-center leading-relaxed">
            Full payment via PayPal. Free cancellation 30+ days before departure.
          </p>
        </div>
      </div>

      {/* ── Context — the Slow Morocco difference ────────────────────────── */}
      <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08] bg-foreground/[0.02]">
        <div className="max-w-2xl">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-6">
            What you'll actually understand
          </p>
          <p className="font-serif text-xl text-foreground leading-relaxed mb-6">
            Most desert tours treat the route as logistics — the kasbah is a photo stop, the valley is scenery, the dunes are the product.
          </p>
          <p className="text-sm text-foreground/60 leading-relaxed mb-4">
            Aït Benhaddou is not a movie set. It is a functioning ksar — a fortified village — whose construction logic is the same as every defensive settlement built in the south for a thousand years. The earthen walls are thick because they insulate. The towers are high because you need to see who is coming across the hammada. The layout faces inward because safety is communal.
          </p>
          <p className="text-sm text-foreground/60 leading-relaxed mb-4">
            The Draa Valley palmeries exist because of khettaras — underground irrigation channels built by hand centuries ago that carry water from the Atlas to the desert edge. The villages you pass through are not ruins. They are inhabited. The date harvest happens in October.
          </p>
          <p className="text-sm text-foreground/60 leading-relaxed mb-8">
            Merzouga at dawn, when the light is flat and the shadow line moves across the dunes, is one of the few genuinely disorienting experiences available to a traveller. The scale is wrong in the way that the ocean is wrong — the eye has no reference.
          </p>
          <div className="flex gap-6">
            <Link
              href="/stories/not-all-desert-is-sand"
              className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5"
            >
              Read: Not all desert is sand →
            </Link>
            <Link
              href="/stories/the-ksour"
              className="text-[11px] tracking-[0.15em] uppercase text-foreground/40 hover:text-foreground transition-colors border-b border-foreground/15 hover:border-foreground/40 pb-0.5"
            >
              Read: The Ksour →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-12">
          From people who've done this
        </p>
        <div className="max-w-3xl grid md:grid-cols-2 gap-px bg-foreground/[0.06]">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-background p-8">
              <p className="text-sm text-foreground/70 leading-relaxed mb-6 font-serif">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-xs font-medium text-foreground">{t.author}</p>
                {t.journey && (
                  <p className="text-[10px] tracking-wide text-foreground/30 mt-0.5">{t.journey}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08]">
        <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-12">
          Common questions
        </p>
        <div className="max-w-2xl space-y-0">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>

      {/* ── Start Here CTA ────────────────────────────────────────────────── */}
      <div className="px-6 md:px-14 py-16 border-t border-foreground/[0.08] bg-foreground/[0.02]">
        <div className="max-w-xl">
          <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/30 mb-4">
            Not sure this is the right trip?
          </p>
          <h2 className="font-serif text-2xl text-foreground mb-4">
            Start with your orientation.
          </h2>
          <p className="text-sm text-foreground/50 leading-relaxed mb-8">
            Five questions. A framework specific to your trip — which cities, what order, what you'll actually understand when you arrive.
          </p>
          <Link
            href="https://tally.so/r/aQG8W9"
            className="inline-block px-8 py-3 border border-foreground text-sm tracking-[0.15em] uppercase text-foreground hover:bg-foreground hover:text-background transition-colors"
          >
            Get my orientation →
          </Link>
        </div>
      </div>

      {/* ── Other journeys ────────────────────────────────────────────────── */}
      <div className="px-6 md:px-14 py-12 border-t border-foreground/[0.08]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-sm text-foreground/40">
            Want more time in the south? The 4-day version includes the Dades Valley and Todra Gorge.
          </p>
          <Link
            href="/journeys/4-Day-Sahara-&-Valleys-Journey"
            className="text-[11px] tracking-[0.15em] uppercase text-foreground/50 hover:text-foreground transition-colors whitespace-nowrap"
          >
            See 4-day journey →
          </Link>
        </div>
      </div>

      {/* ── Booking modal ─────────────────────────────────────────────────── */}
      <OvernightBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        experienceTitle={`3-Day Sahara Desert Tour (${participants} persons)`}
        pricingEUR={pricingEUR}
        totalEUR={grandTotal}
      />

    </div>
  );
}
