"use client";

import Image from "next/image";
import Link from "next/link";

interface Destination {
  slug: string;
  title: string;
  subtitle: string | null;
  hero_image: string | null;
  excerpt: string | null;
}

interface Story {
  slug: string;
  title: string;
  hero_image: string | null;
  excerpt: string | null;
  category: string | null;
}

interface Props {
  cities: Destination[];
  stories: Story[];
}

// ── Data ──────────────────────────────────────────────────────────────────────

const FACTS = [
  { value: "37M", label: "Population" },
  { value: "710K", label: "km² area" },
  { value: "11", label: "UNESCO sites" },
  { value: "3,500", label: "km coastline" },
  { value: "1,000+", label: "Years of medina tradition" },
  { value: "3", label: "Mountain ranges" },
];

const MONTHS = [
  { month: "Jan", north: 2, south: 3, coast: 3, desert: 3 },
  { month: "Feb", north: 2, south: 3, coast: 3, desert: 3 },
  { month: "Mar", north: 3, south: 3, coast: 3, desert: 3 },
  { month: "Apr", north: 3, south: 3, coast: 3, desert: 2 },
  { month: "May", north: 3, south: 3, coast: 3, desert: 2 },
  { month: "Jun", north: 2, south: 1, coast: 3, desert: 1 },
  { month: "Jul", north: 1, south: 1, coast: 3, desert: 1 },
  { month: "Aug", north: 1, south: 1, coast: 3, desert: 1 },
  { month: "Sep", north: 3, south: 3, coast: 3, desert: 2 },
  { month: "Oct", north: 3, south: 3, coast: 3, desert: 3 },
  { month: "Nov", north: 2, south: 3, coast: 2, desert: 3 },
  { month: "Dec", north: 2, south: 2, coast: 2, desert: 3 },
];

// 3 = ideal, 2 = good, 1 = avoid
const ratingColor = (r: number) =>
  r === 3 ? "bg-foreground" : r === 2 ? "bg-foreground/30" : "bg-foreground/08";

const ratingLabel = (r: number) =>
  r === 3 ? "Ideal" : r === 2 ? "Good" : "Hot";

const ESSENTIALS = [
  {
    label: "Currency",
    value: "Moroccan Dirham (MAD)",
    note: "~1 EUR = 11 DH · ~1 USD = 10 DH · Closed currency, exchange on arrival",
  },
  {
    label: "Language",
    value: "Darija · Tamazight · French",
    note: "Spanish in the north · English in tourist areas",
  },
  {
    label: "Visa",
    value: "Visa-free for most Western passports",
    note: "US · UK · EU · Canada · Australia · 90 days on arrival",
  },
  {
    label: "Religion",
    value: "Islam (Maliki Sunni)",
    note: "With a distinctive Sufi tradition · Muezzin call five times daily",
  },
  {
    label: "Time zone",
    value: "GMT+1 (WET/WEST)",
    note: "Morocco does not observe daylight saving in the standard way",
  },
  {
    label: "Electricity",
    value: "220V · Type C/E plugs",
    note: "Same as continental Europe",
  },
];

const REGIONS = [
  {
    name: "Imperial Cities",
    cities: "Marrakech · Fes · Meknes · Rabat",
    description:
      "Four capitals across different dynasties. Each one convinced the others were second choices.",
  },
  {
    name: "Atlantic Coast",
    cities: "Casablanca · Essaouira · Agadir",
    description:
      "3,500 kilometres of coast. Art Deco, wind-scoured ramparts, surf breaks that peel for 200 metres.",
  },
  {
    name: "The North",
    cities: "Tangier · Chefchaouen · Tetouan",
    description:
      "Where Morocco faces two continents. Spanish echoes, Rif mountains, blue medinas.",
  },
  {
    name: "The South",
    cities: "Ouarzazate · Dakhla · Zagora",
    description:
      "Pre-Saharan plateaus, kasbahs melting back into the earth, and the long road to the Saharan peninsula.",
  },
  {
    name: "The Atlas",
    cities: "Imlil · Imilchil · Aït Bouguemez",
    description:
      "Three mountain ranges running northeast to southwest. Snow in winter, cedar forests, Berber villages.",
  },
  {
    name: "The Sahara",
    cities: "Merzouga · Erg Chigaga · M'Hamid",
    description:
      "The eastern and western ergs. Dunes 150 metres high. A sky at night that makes the city feel like a rumour.",
  },
];

// ── Subcomponents ─────────────────────────────────────────────────────────────

function Divider() {
  return <div className="border-t border-border" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-6">
      {children}
    </p>
  );
}

// ── Fallback hero images ──────────────────────────────────────────────────────

const CITY_HERO_FALLBACKS: Record<string, string> = {
  marrakech: "https://res.cloudinary.com/drstfu5yr/image/upload/v1766833142/marrakech_1_nw37ky.png",
  essaouira: "https://res.cloudinary.com/drstfu5yr/image/upload/v1767310155/essaouira_meymce.png",
  rabat: "https://res.cloudinary.com/drstfu5yr/image/upload/v1767310357/rabat_ofyxwj.png",
};

// ── Main ──────────────────────────────────────────────────────────────────────

export default function MoroccoContent({ cities, stories }: Props) {
  return (
    <main className="bg-background text-foreground">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[480px] max-h-[720px] bg-[#1a1612]">
        <Image
          src="https://res.cloudinary.com/drstfu5yr/image/upload/v1766833142/marrakech_1_nw37ky.png"
          alt="Morocco"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/70" />
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 lg:px-20 pb-14">
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-4 font-mono">
            North Africa · 37 million people · 11 UNESCO sites
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-white">
            Morocco
          </h1>
        </div>
      </section>

      {/* ── Opening ───────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/80 mb-6">
            Morocco sits at the edge of two continents, three seas, and a dozen climatic zones. 
            Atlantic coast to Saharan dune. Mediterranean littoral to High Atlas snowfield. 
            The country contains more variety than its size should allow — and has been 
            receiving travellers long enough to have developed a particular patience with the surprised.
          </p>
          <p className="text-sm text-foreground/50 leading-relaxed">
            Eleven years of living inside the medina teaches you that Morocco is not a 
            destination you understand on the first visit. It reveals itself laterally — 
            through a conversation, a detour, a door left open. This is a country best 
            approached slowly.
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/25 mt-4">
            — J. Ng, Marrakech
          </p>
        </div>
      </section>

      <Divider />

      {/* ── Facts ─────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16">
        <SectionLabel>Morocco in numbers</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border border-border">
          {FACTS.map((f, i) => (
            <div
              key={i}
              className="px-6 py-8 border-r border-b md:border-b-0 border-border last:border-r-0"
            >
              <p className="font-serif text-3xl md:text-4xl text-foreground mb-2">
                {f.value}
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30">
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Essentials ────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16">
        <SectionLabel>Essentials</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {ESSENTIALS.map((e, i) => (
            <div
              key={i}
              className="px-8 py-7 border-r border-b border-border"
            >
              <p className="text-[9px] tracking-[0.25em] uppercase font-mono text-foreground/30 mb-2">
                {e.label}
              </p>
              <p className="font-serif text-base text-foreground mb-1.5">
                {e.value}
              </p>
              <p className="text-xs text-foreground/40 leading-relaxed">
                {e.note}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/travel"
            className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/40 hover:text-foreground transition-colors"
          >
            Full travel guide — visa, transport, money, health →
          </Link>
        </div>
      </section>

      <Divider />

      {/* ── When to go ────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16">
        <SectionLabel>When to go</SectionLabel>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left text-[9px] tracking-[0.25em] uppercase font-mono text-foreground/30 pb-4 w-16" />
                {["Imperial cities", "South & Desert", "Atlantic coast", "Sahara"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-[9px] tracking-[0.2em] uppercase font-mono text-foreground/30 pb-4 pr-6"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MONTHS.map((m) => (
                <tr key={m.month} className="border-t border-border/50">
                  <td className="text-[10px] tracking-[0.15em] uppercase font-mono text-foreground/40 py-3 pr-6">
                    {m.month}
                  </td>
                  {[m.north, m.south, m.coast, m.desert].map((r, i) => (
                    <td key={i} className="py-3 pr-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${ratingColor(r)}`} />
                        <span className="text-[9px] tracking-[0.1em] uppercase font-mono text-foreground/30">
                          {ratingLabel(r)}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Divider />

      {/* ── Regions ───────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16">
        <SectionLabel>Six regions</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border">
          {REGIONS.map((r, i) => (
            <div key={i} className="px-8 py-8 border-r border-b border-border">
              <p className="font-serif text-lg text-foreground mb-1">
                {r.name}
              </p>
              <p className="text-[9px] tracking-[0.2em] uppercase font-mono text-foreground/30 mb-3">
                {r.cities}
              </p>
              <p className="text-sm text-foreground/50 leading-relaxed">
                {r.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Cities ────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16">
        <SectionLabel>Ten cities</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {cities.map((city) => {
            const cityImage = city.hero_image || CITY_HERO_FALLBACKS[city.slug] || null;
            return (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-foreground/5"
            >
              {cityImage && (
                <Image
                  src={cityImage}
                  alt={city.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {city.subtitle && (
                  <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 mb-1 font-mono">
                    {city.subtitle}
                  </p>
                )}
                <p className="font-serif text-lg text-white">
                  {city.title}
                </p>
              </div>
            </Link>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ── Stories ───────────────────────────────────────────────────────── */}
      {stories.length > 0 && (
        <section className="px-8 md:px-16 lg:px-20 py-16">
          <div className="flex items-end justify-between mb-10">
            <SectionLabel>From the archive</SectionLabel>
            <Link
              href="/stories"
              className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/30 hover:text-foreground transition-colors mb-6"
            >
              All stories →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {stories.map((story) => (
              <article key={story.slug}>
                <Link href={`/stories/${story.slug}`} className="group">
                  <div className="aspect-[3/4] relative overflow-hidden bg-foreground/5 mb-5">
                    {story.hero_image && (
                      <Image
                        src={story.hero_image}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                    )}
                  </div>
                  {story.category && (
                    <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-2">
                      {story.category}
                    </p>
                  )}
                  <h3 className="font-serif text-xl mb-2 group-hover:text-foreground/60 transition-colors">
                    {story.title}
                  </h3>
                  {story.excerpt && (
                    <p className="text-sm text-foreground/50 leading-relaxed line-clamp-2">
                      {story.excerpt}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      <Divider />

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-16">
        <SectionLabel>Common questions</SectionLabel>
        <div className="max-w-3xl space-y-0">
          {[
            {
              q: "Do I need a visa?",
              a: "Citizens of the US, UK, EU, Canada, and Australia receive a 90-day stamp on arrival. No advance visa needed. Check current requirements before travelling.",
            },
            {
              q: "What currency?",
              a: "The Moroccan dirham (MAD). A closed currency — exchange on arrival at airports, banks, or ATMs. Approximately 1 EUR = 11 DH, 1 USD = 10 DH.",
            },
            {
              q: "What languages are spoken?",
              a: "Darija (Moroccan Arabic) is the everyday language. Tamazight (Berber) in mountain regions. French for business and formal contexts. Spanish in the north. English widely spoken in tourist areas.",
            },
            {
              q: "Is it safe?",
              a: "Morocco is one of the most visited countries in Africa with a well-established tourism infrastructure. Standard urban precautions apply.",
            },
            {
              q: "What religion?",
              a: "Islam — specifically Maliki Sunni, with a strong Sufi tradition. The call to prayer sounds five times a day. Ramadan shifts the rhythm of the entire country for a month.",
            },
          ].map((item, i) => (
            <div key={i} className="py-6 border-b border-border last:border-0">
              <p className="font-serif text-lg text-foreground mb-2">{item.q}</p>
              <p className="text-sm text-foreground/55 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/faq"
            className="text-[10px] tracking-[0.2em] uppercase font-mono text-foreground/40 hover:text-foreground transition-colors"
          >
            More questions →
          </Link>
        </div>
      </section>

      <Divider />

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="px-8 md:px-16 lg:px-20 py-20 md:py-28">
        <div className="max-w-xl">
          <p className="text-[10px] tracking-[0.3em] uppercase font-mono text-foreground/30 mb-4">
            Private journeys
          </p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Ready to go?
          </h2>
          <p className="text-sm text-foreground/50 leading-relaxed mb-8">
            Every journey we design is private, unhurried, and built around what 
            Morocco actually is — not the postcard version. Eleven years in the medina 
            means we know the difference.
          </p>
          <Link
            href="/plan-your-trip"
            className="inline-block text-[11px] tracking-[0.2em] uppercase border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
          >
            Plan Your Trip
          </Link>
        </div>
      </section>

    </main>
  );
}
