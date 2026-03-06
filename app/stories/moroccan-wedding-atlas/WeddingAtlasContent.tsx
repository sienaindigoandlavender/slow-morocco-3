"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as d3 from "d3";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface Story {
  title: string;
  subtitle?: string | null;
  hero_image?: string | null;
  hero_caption?: string | null;
  body?: string | null;
  year?: number | null;
  read_time?: number | null;
  text_by?: string | null;
  category?: string | null;
  region?: string | null;
  sources?: string | null;
}

interface StoryImage {
  image_url: string;
  caption: string | null;
  attribution: string | null;
  position: number;
}

interface Journey {
  slug: string;
  title: string;
  duration_days?: number | null;
  hero_image_url?: string | null;
  short_description?: string | null;
}

interface Props {
  story: Story;
  images: StoryImage[];
  relatedJourneys: Journey[];
}

// ─────────────────────────────────────────────
// WEDDING COST DATA
// ─────────────────────────────────────────────

const WEDDING_COSTS = [
  { item: "Venue (3 nights)", low: 15000, mid: 40000, high: 120000 },
  { item: "Food & catering", low: 20000, mid: 45000, high: 100000 },
  { item: "Négafa & caftans", low: 8000, mid: 20000, high: 60000 },
  { item: "Amariya", low: 5000, mid: 15000, high: 50000 },
  { item: "Musicians & DJ", low: 3000, mid: 8000, high: 25000 },
  { item: "Mahr (dowry)", low: 5000, mid: 15000, high: 50000 },
  { item: "Photographer", low: 3000, mid: 8000, high: 20000 },
  { item: "Henna party", low: 2000, mid: 5000, high: 15000 },
];

const CEREMONY_STAGES = [
  { stage: "Khitba", desc: "The proposal. Groom's family visits bride's family with gifts — sugar, candles, henna. The families negotiate." },
  { stage: "Laylat al-Henna", desc: "Henna night. Women only. The negafa applies henna to the bride's hands and feet. Music, dancing, sweets." },
  { stage: "The Mahr", desc: "The dowry — a mandatory gift from groom to bride under Islamic law. Her legal property alone. Presented before the ceremony." },
  { stage: "Aqd al-Nikah", desc: "The marriage contract. Signed in the presence of two witnesses and an adoul (notary). The legal marriage." },
  { stage: "Al-Amariya", desc: "The procession. The bride is lifted onto the gilded throne and carried through the hall. The formal announcement to all guests." },
  { stage: "Outfit changes", desc: "Three to seven caftans through the night. Each change choreographed by the négafa. Each representing a different region or stage." },
  { stage: "Al-Mechoui", desc: "The feast. Slow-roasted lamb, served whole. The centrepiece of the wedding banquet — hours of food, music, dancing." },
  { stage: "The morning after", desc: "In traditional practice, proof of the wedding night. The bride's family receives the bride's family. More food. More celebration." },
];

// ─────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────

function splitBody(content: string, breakAt: number[]): string[] {
  const isHtml = /<[a-z][^>]*>/i.test(content);
  const paragraphs = isHtml
    ? content.split(/(?<=<\/p>)/i).map(s => s.trim()).filter(Boolean)
    : content.split(/\n\n+/).filter(Boolean);
  const chunks: string[] = [];
  let last = 0;
  breakAt.forEach(bp => {
    const end = Math.min(bp, paragraphs.length);
    chunks.push(paragraphs.slice(last, end).join(isHtml ? "\n" : "\n\n"));
    last = end;
  });
  if (last < paragraphs.length) chunks.push(paragraphs.slice(last).join(isHtml ? "\n" : "\n\n"));
  return chunks.filter(Boolean);
}

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

function useCounter(target: number, duration = 1600, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, vis } = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(20px)",
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function AnimStat({ value, suffix = "", label, accent, prefix = "" }: {
  value: number; suffix?: string; label: string; accent: string; prefix?: string;
}) {
  const { ref, vis } = useInView();
  const n = useCounter(value, 1600, vis);
  return (
    <div ref={ref} className="text-center">
      <div className="font-serif leading-none mb-2" style={{ fontSize: "clamp(2.4rem,5vw,3.6rem)", color: accent }}>
        {prefix}{n.toLocaleString()}{suffix}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">{label}</p>
    </div>
  );
}

function BodyChunk({ content }: { content: string }) {
  if (!content) return null;
  const isHtml = /<[a-z][^>]*>/i.test(content);
  if (isHtml) {
    return (
      <div dangerouslySetInnerHTML={{ __html: content }}
        style={{ fontSize: 15, lineHeight: 1.85, color: "#262626" }} />
    );
  }
  return (
    <div>
      {content.split(/\n\n+/).filter(Boolean).map((p, i) => (
        <p key={i} className="mb-6 leading-[1.85]" style={{ fontSize: 15, color: "#262626" }}>{p}</p>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// COST CHART
// ─────────────────────────────────────────────

function WeddingCostChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, vis } = useInView(0.15);
  const [tier, setTier] = useState<"low" | "mid" | "high">("mid");

  useEffect(() => {
    if (!svgRef.current || !vis) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const W = 820, H = 300;
    const m = { top: 8, right: 80, bottom: 8, left: 140 };
    const w = W - m.left - m.right, h = H - m.top - m.bottom;

    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    const sorted = [...WEDDING_COSTS].sort((a, b) => b[tier] - a[tier]);
    const max = d3.max(sorted, d => d[tier]) || 1;
    const y = d3.scaleBand().domain(sorted.map(d => d.item)).range([0, h]).padding(0.3);
    const x = d3.scaleLinear().domain([0, max * 1.15]).range([0, w]);

    const color = tier === "low" ? "#4a9aba" : tier === "mid" ? "#c9a96e" : "#2d7a5a";

    g.selectAll(".bar").data(sorted).enter()
      .append("rect").attr("class", "bar")
      .attr("y", d => y(d.item) ?? 0).attr("height", y.bandwidth())
      .attr("x", 0).attr("rx", 2).attr("fill", color).attr("width", 0)
      .transition().duration(600).delay((_, i) => i * 60)
      .attr("width", d => x(d[tier]));

    g.selectAll(".val").data(sorted).enter()
      .append("text").attr("class", "val")
      .attr("y", d => (y(d.item) ?? 0) + y.bandwidth() / 2 + 4)
      .attr("x", d => x(d[tier]) + 8)
      .attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#888")
      .attr("opacity", 0).text(d => `${(d[tier] / 1000).toFixed(0)}k MAD`)
      .transition().duration(400).delay((_, i) => i * 60 + 400).attr("opacity", 1);

    g.selectAll(".lbl").data(sorted).enter()
      .append("text").attr("class", "lbl")
      .attr("y", d => (y(d.item) ?? 0) + y.bandwidth() / 2 + 4)
      .attr("x", -8).attr("text-anchor", "end")
      .attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#555")
      .text(d => d.item);

  }, [vis, tier]);

  const total = WEDDING_COSTS.reduce((s, d) => s + d[tier], 0);

  return (
    <div ref={ref}>
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">Budget:</span>
        {(["low", "mid", "high"] as const).map(t => (
          <button key={t} onClick={() => setTier(t)}
            className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded transition-all"
            style={{
              background: tier === t ? "#0a0a0a" : "transparent",
              color: tier === t ? "#fff" : "#999",
              border: `1px solid ${tier === t ? "#0a0a0a" : "#e5e5e5"}`,
            }}>
            {t === "low" ? "Modest" : t === "mid" ? "Standard" : "Luxury"}
          </button>
        ))}
        <span className="ml-auto font-mono text-[11px] text-neutral-500">
          Total <span className="text-neutral-900 font-medium">{(total / 1000).toFixed(0)}k MAD</span>
          <span className="text-neutral-400 ml-1">(~${(total / 10).toFixed(0)})</span>
        </span>
      </div>
      <svg ref={svgRef} className="w-full" />
      <p className="font-mono text-[10px] text-neutral-300 mt-3">
        Costs in Moroccan dirhams (MAD) · Estimates based on field research · Vary by region and family
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// CEREMONY TIMELINE
// ─────────────────────────────────────────────

function CeremonyTimeline() {
  const [active, setActive] = useState(0);
  const { ref, vis } = useInView(0.1);

  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-neutral-100">
        {/* Stage list */}
        <div className="border-r border-neutral-100">
          {CEREMONY_STAGES.map((s, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="w-full text-left px-6 py-4 border-b border-neutral-100 transition-all"
              style={{
                background: active === i ? "#0a0a0a" : "transparent",
                color: active === i ? "#fff" : "#555",
              }}>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] block mb-0.5"
                style={{ color: active === i ? "#c9a96e" : "#bbb" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-base">{s.stage}</span>
            </button>
          ))}
        </div>
        {/* Description panel */}
        <div className="p-8 flex items-center" style={{ minHeight: 200 }}>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-3">
              Stage {String(active + 1).padStart(2, "0")} of {CEREMONY_STAGES.length}
            </p>
            <h3 className="font-serif text-2xl mb-4">{CEREMONY_STAGES[active].stage}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: "#555" }}>
              {CEREMONY_STAGES[active].desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

export default function WeddingAtlasContent({ story, images, relatedJourneys }: Props) {
  const chunks = story.body ? splitBody(story.body, [3, 6]) : [];
  const [c1 = "", c2 = "", c3 = ""] = chunks;
  const sources = story.sources
    ? story.sources.split(";;").map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-white text-neutral-900">

      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section>
        {story.hero_image ? (
          <div className="relative w-full" style={{ height: "70vh", minHeight: 480 }}>
            <img src={story.hero_image} alt={story.title} className="w-full h-full object-cover absolute inset-0" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.80) 100%)" }} />
            <div className="absolute bottom-0 left-0 right-0 px-8 md:px-[8%] lg:px-[12%] pb-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3">
                <Link href="/stories/category/culture" className="hover:text-white/80 transition-colors">Culture</Link>
                {" · "}
                <Link href="/stories" className="hover:text-white/80 transition-colors">Stories</Link>
              </p>
              <h1 className="font-serif text-white leading-[0.92] tracking-tight mb-4" style={{ fontSize: "clamp(2.4rem,6.5vw,4.8rem)" }}>
                {story.title}
              </h1>
              {story.subtitle && <p className="font-serif italic text-white/70 text-xl max-w-2xl">{story.subtitle}</p>}
              <div className="flex items-center gap-4 mt-5 font-mono text-[11px] text-white/40">
                {story.text_by && <span>By {story.text_by}</span>}
                {story.year && <span>{story.year}</span>}
                {story.read_time && <span>{story.read_time} min read</span>}
              </div>
            </div>
          </div>
        ) : (
          <div className="px-8 md:px-[8%] lg:px-[12%] pt-32 pb-16 border-b border-neutral-100">
            <Link href="/stories" className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-300 hover:text-neutral-600 transition-colors inline-block mb-10">← Stories</Link>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Culture</p>
            <h1 className="font-serif leading-[0.92] tracking-tight mb-5" style={{ fontSize: "clamp(2.4rem,6.5vw,4.8rem)" }}>{story.title}</h1>
            {story.subtitle && <p className="font-serif italic text-2xl text-neutral-500">{story.subtitle}</p>}
          </div>
        )}
      </section>

      {/* ━━━ STATS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-14 border-b border-neutral-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <AnimStat value={3} label="days minimum" accent="#c9a96e" />
          <AnimStat value={7} label="outfit changes (max)" accent="#9b8db0" />
          <AnimStat value={50000} label="dirhams for the amariya" accent="#2d7a5a" />
          <AnimStat value={600} suffix=" yrs" label="amariya tradition" accent="#c04040" />
        </div>
      </section>

      {/* ━━━ BODY 1 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {c1 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <Reveal><BodyChunk content={c1} /></Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.15}>
                <div className="sticky top-24 border-l-2 border-neutral-200 pl-6 space-y-5">
                  <p className="font-serif italic text-xl leading-snug text-neutral-600">
                    "The groom's family pays. The bride's family provides. The négafa choreographs. And everyone dances until dawn."
                  </p>
                  <div className="space-y-4 pt-2">
                    {[
                      { label: "The mahr", note: "Mandatory gift from groom to bride · her legal property alone · required for a valid marriage contract" },
                      { label: "The négafa", note: "Professional wedding dresser · manages all outfit changes, henna, and ritual choreography" },
                      { label: "The amariya", note: "Gilded throne carried on shoulders · announces the bride to all guests · 600 years old" },
                    ].map(item => (
                      <div key={item.label} className="border-t border-neutral-100 pt-3">
                        <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-neutral-400 mb-0.5">{item.label}</p>
                        <p className="font-mono text-[11px] text-neutral-500 leading-relaxed">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ━━━ CEREMONY TIMELINE ━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <div className="mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">The stages</p>
            <h2 className="font-serif text-3xl leading-tight max-w-md">
              <em>What happens,<br />and in what order</em>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}><CeremonyTimeline /></Reveal>
      </section>

      {/* ━━━ BODY 2 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {c2 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <div className="max-w-2xl">
            <Reveal><BodyChunk content={c2} /></Reveal>
          </div>
        </section>
      )}

      {/* ━━━ COST BREAKDOWN ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">What it costs</p>
              <h2 className="font-serif text-3xl leading-tight">
                <em>The line items<br />nobody quotes you</em>
              </h2>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.85, color: "#737373" }}>
              A standard Moroccan wedding runs 200,000–400,000 dirhams.
              The groom's family traditionally pays for the celebration.
              The bride's family provides the trousseau — caftans, jewelry, household items.
              A common refrain: "May God help Moroccan men."
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}><WeddingCostChart /></Reveal>
      </section>

      {/* ━━━ BODY 3 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {c3 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <div className="max-w-2xl">
            <Reveal><BodyChunk content={c3} /></Reveal>
          </div>
        </section>
      )}

      {/* ━━━ STORY IMAGES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {images.length > 0 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((img, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <figure>
                  <div className="w-full overflow-hidden" style={{ aspectRatio: "16/9", background: "#f0f0f0" }}>
                    <img src={img.image_url} alt={img.caption || ""} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  {(img.caption || img.attribution) && (
                    <figcaption className="font-mono text-[10px] text-neutral-400 mt-2 italic">
                      {img.caption}{img.caption && img.attribution ? " — " : ""}{img.attribution}
                    </figcaption>
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ━━━ CROSSLINK TO MARRIAGE ECONOMY ━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <div className="flex items-center justify-between gap-8 flex-wrap">
            <p className="font-serif italic text-xl text-neutral-600 max-w-lg">
              The wedding lasts three days. The marriage lasts longer — sometimes.
            </p>
            <Link href="/stories/marriage-economy"
              className="font-mono text-[11px] uppercase tracking-[0.15em] border border-neutral-900 px-7 py-3.5 hover:bg-neutral-900 hover:text-white transition-all duration-200 whitespace-nowrap">
              The Marriage Economy →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ━━━ JOURNEY CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <div className="flex items-center justify-between gap-8 flex-wrap">
            <p className="font-serif italic text-xl text-neutral-600 max-w-lg">
              Morocco is not a backdrop. Come for the substance.
            </p>
            <Link href="/plan-your-trip"
              className="font-mono text-[11px] uppercase tracking-[0.15em] border border-neutral-900 px-7 py-3.5 hover:bg-neutral-900 hover:text-white transition-all duration-200 whitespace-nowrap">
              Plan a journey →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ━━━ RELATED JOURNEYS ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {relatedJourneys.length > 0 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-8">Journeys</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedJourneys.map((j, i) => (
              <Reveal key={j.slug} delay={i * 0.1}>
                <Link href={`/journeys/${j.slug}`} className="group block">
                  {j.hero_image_url && (
                    <div className="w-full mb-4 overflow-hidden" style={{ aspectRatio: "16/9", background: "#f0f0f0" }}>
                      <img src={j.hero_image_url} alt={j.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>
                  )}
                  {j.duration_days && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-400 mb-1">{j.duration_days} days</p>
                  )}
                  <h3 className="font-serif text-xl group-hover:opacity-60 transition-opacity">{j.title}</h3>
                  {j.short_description && (
                    <p style={{ fontSize: 13, color: "#737373", marginTop: 4, lineHeight: 1.6 }} className="line-clamp-2">{j.short_description}</p>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ━━━ SOURCES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-t border-neutral-200" style={{ background: "#f5f5f0" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(0,0,0,0.4)" }}>Sources</p>
            <div style={{ fontSize: 12, lineHeight: 1.9, color: "rgba(0,0,0,0.6)" }}>
              {sources.length > 0
                ? sources.map((s, i) => <p key={i} className="mb-2">{s}</p>)
                : <>
                    <p className="mb-2">Kapchan, Deborah. <em>Gender on the Market</em> (1996).</p>
                    <p className="mb-2">Bewildered in Morocco — field interviews with négafa and wedding planners.</p>
                    <p>Field research, Marrakech 2023–2024.</p>
                  </>
              }
            </div>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(0,0,0,0.4)" }}>Cost data</p>
            <div style={{ fontSize: 12, lineHeight: 1.9, color: "rgba(0,0,0,0.6)" }}>
              <p className="mb-2">Estimates based on field research and planner interviews, Marrakech 2023–2024.</p>
              <p>Figures in Moroccan dirhams (MAD). Vary significantly by region, family, and season.</p>
            </div>
          </div>
        </div>
        <p className="font-mono text-[10px] mt-10" style={{ color: "#92702a" }}>© Slow Morocco · J. Ng</p>
      </section>

    </div>
  );
}
