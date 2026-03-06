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
// STATIC DATA
// ─────────────────────────────────────────────

interface Mine {
  id: string;
  name: string;
  basin: string;
  opened: number;
  reserveShare: string;
  outputShare: string;
  capacity: string;
  note: string;
  color: string;
}

const MINES: Mine[] = [
  { id: "khouribga", name: "Khouribga", basin: "Ouled Abdoun Basin", opened: 1921, reserveShare: "43%", outputShare: "70%", capacity: "~38 Mt/yr capacity", note: "OCP's first mine and the richest phosphate deposit on Earth. 26+ billion tonnes of reserves. Connected to Jorf Lasfar processing plant by a 235 km gravity-powered slurry pipeline — one of the world's longest. Produces 70% of all OCP output.", color: "#F59E0B" },
  { id: "benguerir", name: "Benguerir", basin: "Gantour Basin", opened: 1980, reserveShare: "37%", outputShare: "~15%", capacity: "Open-pit mine", note: "70 km north of Marrakech. Also hosts Mohammed VI Polytechnic University (UM6P) Living Lab — an open research site for mining innovation. Phosphate transported by rail to Safi for processing.", color: "#2D5F8A" },
  { id: "youssoufia", name: "Youssoufia", basin: "Gantour Basin", opened: 1931, reserveShare: "37%", outputShare: "~8%", capacity: "Underground + open-pit", note: "Morocco's second mine, third largest phosphate producer worldwide. Also operates the Bouchane mine 40 km away since 1998. Phosphate processed at Safi.", color: "#2D5F8A" },
  { id: "boucraa", name: "Boucraa", basin: "Southern Provinces", opened: 1976, reserveShare: "2%", outputShare: "~2%", capacity: "2.6 Mt/yr", note: "Operated by Phosboucraa (100% OCP subsidiary). Located in Western Sahara. Connected to Laayoune port by the world's longest conveyor belt — 102 km. 100% of profits reinvested in the Southern Provinces.", color: "#78716C" },
  { id: "mzinda", name: "Mzinda", basin: "Meskala Basin", opened: 2025, reserveShare: "18%", outputShare: "Ramping up", capacity: "2.1 Mt/yr TSP (Phase 1)", note: "OCP's newest integrated mining and processing site. Built from scratch with green technology. Will exclusively produce Triple Super Phosphate (TSP). Phase 2 adds 2.0 Mt/yr in 2026.", color: "#5C7C3E" },
];

interface ProcessingPlant {
  name: string;
  opened: number;
  role: string;
  capacity: string;
  note: string;
  color: string;
}

const PROCESSING: ProcessingPlant[] = [
  { name: "Jorf Lasfar", opened: 1986, role: "Phosphoric acid, fertilizers, TSP", capacity: "15 Mt/yr plant nutrition + 6 Mt/yr phosphoric acid", note: "The world's largest integrated phosphate fertilizer complex. 2,000 hectares. Over 100 fertilizer grades tailored to different soil types. Self-sufficient in energy. Connected to Khouribga by slurry pipeline.", color: "#F59E0B" },
  { name: "Safi", opened: 1965, role: "Phosphoric acid, fertilizers, animal feed", capacity: "Phosphoric acid + fertilizer lines", note: "OCP's first processing complex. Receives phosphate by rail from Gantour mines. Produces phosphoric acid, fertilizers, and animal feed additives. The original downstream operation.", color: "#2D5F8A" },
];

interface TimelineEvent {
  year: number;
  event: string;
  significance: string;
}

const TIMELINE: TimelineEvent[] = [
  { year: 1920, event: "Office Chérifien des Phosphates founded", significance: "Created by Royal Decree under the French Protectorate. State monopoly on phosphate extraction established." },
  { year: 1921, event: "First mine opens at Khouribga", significance: "Mining and export begin simultaneously. Phosphate shipped to Casablanca port by rail." },
  { year: 1931, event: "Youssoufia mine opens", significance: "Second mining center established. Morocco begins scaling production." },
  { year: 1965, event: "Safi processing plant opens", significance: "First downstream chemical processing. Morocco moves beyond raw rock export into phosphoric acid." },
  { year: 1975, event: "Phosphate sector nationalized", significance: "Morocco takes full sovereign control. OCP becomes sole operator with exclusive extraction, processing, and export rights." },
  { year: 1976, event: "Boucraa mine opens", significance: "Southern Provinces mining begins. World's longest conveyor belt (102 km) built to Laayoune port." },
  { year: 1980, event: "Benguerir mine opens", significance: "Third major mining site. Gantour basin brought online." },
  { year: 1986, event: "Jorf Lasfar complex opens", significance: "World's largest phosphate fertilizer processing hub begins operations. The game-changer for value-added exports." },
  { year: 2008, event: "OCP becomes a corporate entity", significance: "Transitions from state agency to OCP Group S.A. Launches major modernization investments. 95% state-owned, 5% Banque Centrale Populaire." },
  { year: 2014, event: "Khouribga slurry pipeline launches", significance: "235 km gravity-powered pipeline to Jorf Lasfar. Saves 3 million m³ of water per year." },
  { year: 2016, event: "African Fertilizer Complex opens", significance: "Dedicated production plant for African markets at Jorf Lasfar. OCP positions itself as Africa's fertilizer supplier." },
  { year: 2024, event: "Revenue reaches $9.76 billion", significance: "Fertilizers now 69% of revenue (up from 54% in 2019). Strategic shift from raw rock to high-value products." },
  { year: 2025, event: "Mzinda hub + green hydrogen JV", significance: "New integrated mine-to-fertilizer site. Fortescue Energy partnership for green hydrogen and ammonia. Target: 100% renewable energy by 2027." },
];

interface ExportFlow {
  region: string;
  share: number;
  keyMarkets: string;
  note: string;
  color: string;
}

const EXPORT_FLOWS: ExportFlow[] = [
  { region: "Africa", share: 35, keyMarkets: "Nigeria, Ethiopia, Kenya, Tanzania, Côte d'Ivoire", note: "OCP's fastest-growing market. Dedicated African Fertilizer Complex at Jorf Lasfar. 17 subsidiaries across Africa.", color: "#5C7C3E" },
  { region: "South Asia", share: 25, keyMarkets: "India, Bangladesh, Pakistan", note: "India is one of OCP's largest single-country markets. Critical for food security in the world's most populous region.", color: "#F59E0B" },
  { region: "Europe", share: 15, keyMarkets: "Spain, France, Turkey, Poland", note: "Traditional market. Proximity advantage. Increasingly high-value specialty fertilizers rather than bulk rock.", color: "#2D5F8A" },
  { region: "Latin America", share: 15, keyMarkets: "Brazil, Argentina, Colombia", note: "Brazil is one of the world's largest fertilizer importers. OCP expanding aggressively. Customized products for tropical soils.", color: "#7B506F" },
  { region: "Rest of World", share: 10, keyMarkets: "USA, Australia, New Zealand, SE Asia", note: "Diversified export base. Boucraa exports historically served Oceania markets.", color: "#78716C" },
];

interface ValueChainStep {
  step: string;
  location: string;
  detail: string;
}

const VALUE_CHAIN: ValueChainStep[] = [
  { step: "Extraction", location: "Khouribga, Benguerir, Youssoufia, Boucraa", detail: "Open-pit and underground mining. Raw phosphate rock extracted from sedimentary deposits. 30 Mt produced in 2024." },
  { step: "Beneficiation", location: "Mine sites", detail: "Washing, screening, flotation. Raw rock is cleaned and concentrated to increase P₂O₅ content for processing or direct export." },
  { step: "Transport", location: "Pipeline (235 km) + rail + conveyor (102 km)", detail: "Khouribga to Jorf Lasfar by gravity pipeline. Gantour to Safi by rail. Boucraa to Laayoune by conveyor belt." },
  { step: "Chemical processing", location: "Jorf Lasfar, Safi", detail: "Phosphate rock + sulfuric acid → phosphoric acid. Then: phosphoric acid + ammonia → DAP/MAP/TSP fertilizers." },
  { step: "Customization", location: "Jorf Lasfar", detail: "Over 100 fertilizer grades. Blends tailored to specific soil types, climates, and crop requirements. This is where the margin lives." },
  { step: "Export", location: "Casablanca, Jorf Lasfar, Safi, Laayoune", detail: "Shipped to 160+ countries. Africa, India, Brazil, Europe are primary destinations. Both bulk and bagged products." },
];

interface GlobalRanking {
  metric: string;
  value: string;
  context: string;
}

const GLOBAL_POSITION: GlobalRanking[] = [
  { metric: "Share of global reserves", value: "70%", context: "50 billion tonnes. Enough for several centuries at current extraction rates. No other country comes close." },
  { metric: "Production rank", value: "#2", context: "30 Mt in 2024. Behind China (110 Mt) but China's reserves are ~3.7 Bt — Morocco's are 50 Bt. The long game favors Morocco." },
  { metric: "Phosphoric acid market share", value: "49%", context: "Nearly half the world's phosphoric acid. The most profitable segment of the value chain." },
  { metric: "Phosphate rock trade share", value: "~34%", context: "Largest exporter. Competes with Jordan, which briefly passed Morocco in 2022 when OCP shifted to domestic processing." },
  { metric: "Fertilizer market share", value: "23%", context: "Over 100 grades of fertilizer. Customized blends for different soil types and climates worldwide." },
  { metric: "Revenue (2024)", value: "$9.76B", context: "EBITDA margin of 40%. ~20% of Morocco's total export revenues. 21,000 employees worldwide." },
];

const KEY_NUMBERS = [
  { value: "50 billion", label: "Tonnes of phosphate reserves", note: "Enough for several centuries" },
  { value: "30 Mt", label: "Production (2024)", note: "World's 2nd largest producer" },
  { value: "21,000", label: "OCP employees worldwide", note: "17,000 in Morocco" },
  { value: "235 km", label: "Slurry pipeline", note: "Gravity-powered. Saves 3M m³ water/yr" },
  { value: "102 km", label: "Conveyor belt", note: "Boucraa to Laayoune. World's longest." },
  { value: "2,000 ha", label: "Jorf Lasfar complex", note: "World's largest integrated fertilizer hub" },
  { value: "100+", label: "Fertilizer grades", note: "Customized for 160+ countries" },
  { value: "40%", label: "EBITDA margin", note: "$3.93B on $9.76B revenue" },
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
// HOOKS & SHARED COMPONENTS
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
    return <div dangerouslySetInnerHTML={{ __html: content }} style={{ fontSize: 15, lineHeight: 1.85, color: "#262626" }} />;
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
// EXPORT FLOWS CHART (D3 horizontal bars)
// ─────────────────────────────────────────────

function ExportFlowsChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, vis } = useInView(0.15);
  const [hov, setHov] = useState<ExportFlow | null>(null);

  useEffect(() => {
    if (!svgRef.current || !vis) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const W = 820, H = 240;
    const m = { top: 8, right: 60, bottom: 8, left: 120 };
    const w = W - m.left - m.right, h = H - m.top - m.bottom;

    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    const sorted = [...EXPORT_FLOWS].sort((a, b) => b.share - a.share);
    const y = d3.scaleBand().domain(sorted.map(d => d.region)).range([0, h]).padding(0.3);
    const x = d3.scaleLinear().domain([0, 42]).range([0, w]);

    g.selectAll(".bar").data(sorted).enter()
      .append("rect").attr("class", "bar")
      .attr("y", d => y(d.region) ?? 0).attr("height", y.bandwidth())
      .attr("x", 0).attr("rx", 2)
      .attr("fill", d => d.color).attr("width", 0).attr("cursor", "pointer")
      .on("mouseenter", (_, d) => setHov(d))
      .on("mouseleave", () => setHov(null))
      .transition().duration(600).delay((_, i) => i * 80)
      .attr("width", d => x(d.share));

    g.selectAll(".val").data(sorted).enter()
      .append("text").attr("class", "val")
      .attr("y", d => (y(d.region) ?? 0) + y.bandwidth() / 2 + 4)
      .attr("x", d => x(d.share) + 8)
      .attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#888")
      .attr("opacity", 0).text(d => `~${d.share}%`)
      .transition().duration(400).delay((_, i) => i * 80 + 400).attr("opacity", 1);

    g.selectAll(".lbl").data(sorted).enter()
      .append("text").attr("class", "lbl")
      .attr("y", d => (y(d.region) ?? 0) + y.bandwidth() / 2 + 4)
      .attr("x", -8).attr("text-anchor", "end")
      .attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#555")
      .text(d => d.region);
  }, [vis]);

  return (
    <div ref={ref}>
      <svg ref={svgRef} className="w-full" />
      {hov && (
        <div className="mt-4 p-5 border border-neutral-100">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ background: hov.color }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-400">{hov.region} · ~{hov.share}%</span>
          </div>
          <p className="font-mono text-[11px] text-neutral-500 mb-1">{hov.keyMarkets}</p>
          <p className="text-[13px] text-neutral-600 leading-relaxed">{hov.note}</p>
        </div>
      )}
      <p className="font-mono text-[10px] text-neutral-300 mt-3">Approximate export share by region · OCP Group / USGS 2024</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// VALUE CHAIN STEPPER
// ─────────────────────────────────────────────

function ValueChainStepper() {
  const [active, setActive] = useState(0);
  const { ref, vis } = useInView(0.1);

  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-neutral-100">
        <div className="border-r border-neutral-100">
          {VALUE_CHAIN.map((v, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="w-full text-left px-6 py-4 border-b border-neutral-100 transition-all"
              style={{
                background: active === i ? "#0a0a0a" : "transparent",
                color: active === i ? "#fff" : "#555",
              }}>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] block mb-0.5"
                style={{ color: active === i ? "#F59E0B" : "#bbb" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-serif text-base">{v.step}</span>
            </button>
          ))}
        </div>
        <div className="p-8 flex items-center" style={{ minHeight: 200 }}>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-3">
              Step {String(active + 1).padStart(2, "0")} of {VALUE_CHAIN.length}
            </p>
            <h3 className="font-serif text-2xl mb-2">{VALUE_CHAIN[active].step}</h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-400 mb-4">{VALUE_CHAIN[active].location}</p>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: "#555" }}>
              {VALUE_CHAIN[active].detail}
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

export default function PhosphateKingdomContent({ story, images, relatedJourneys }: Props) {
  const chunks = story.body ? splitBody(story.body, [3, 6, 9]) : [];
  const [c1 = "", c2 = "", c3 = "", c4 = ""] = chunks;
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
                <Link href="/stories/category/economy" className="hover:text-white/80 transition-colors">Economy</Link>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Economy</p>
            <h1 className="font-serif leading-[0.92] tracking-tight mb-5" style={{ fontSize: "clamp(2.4rem,6.5vw,4.8rem)" }}>{story.title}</h1>
            {story.subtitle && <p className="font-serif italic text-2xl text-neutral-500">{story.subtitle}</p>}
          </div>
        )}
      </section>

      {/* ━━━ STATS BAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-14 border-b border-neutral-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <AnimStat value={70} suffix="%" label="of world reserves" accent="#F59E0B" />
          <AnimStat value={50} suffix="Bt" label="tonnes in the ground" accent="#5C7C3E" />
          <AnimStat value={30} suffix="Mt" label="produced in 2024" accent="#2D5F8A" />
          <AnimStat value={9} suffix=".76B" prefix="$" label="revenue (2024)" accent="#c04040" />
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
                    &ldquo;China produces more phosphate. But China&rsquo;s reserves are 3.7 billion tonnes. Morocco&rsquo;s are 50 billion. The long game belongs to Rabat.&rdquo;
                  </p>
                  <div className="space-y-4 pt-2">
                    {[
                      { label: "The monopoly", note: "OCP Group · state-owned · sole operator · extraction to export" },
                      { label: "The pipeline", note: "235 km · gravity-powered · Khouribga to Jorf Lasfar · saves 3M m³ water/yr" },
                      { label: "The belt", note: "102 km · Boucraa to Laayoune · world's longest conveyor belt" },
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

      {/* ━━━ GLOBAL POSITION ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Morocco vs. the world</p>
          <h2 className="font-serif text-3xl leading-tight max-w-lg mb-10">
            <em>The numbers behind<br />the geological advantage</em>
          </h2>
        </Reveal>
        <div className="space-y-0">
          {GLOBAL_POSITION.map((g, i) => (
            <Reveal key={g.metric} delay={i * 0.06}>
              <div className="py-7" style={{ borderTop: "1px solid #e5e5e5" }}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                  <div className="md:col-span-3">
                    <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-[0.08em]">{g.metric}</p>
                    <p className="font-serif italic text-neutral-900 leading-none mt-1" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>{g.value}</p>
                  </div>
                  <div className="md:col-span-9 flex items-center">
                    <p className="text-[14px] text-neutral-600 leading-relaxed">{g.context}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ━━━ BODY 2 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {c2 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <div className="max-w-2xl">
            <Reveal><BodyChunk content={c2} /></Reveal>
          </div>
        </section>
      )}

      {/* ━━━ MINE CARDS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Five mining operations</p>
          <h2 className="font-serif text-3xl leading-tight max-w-lg mb-10">
            <em>From Khouribga<br />to Boucraa</em>
          </h2>
        </Reveal>
        <div className="space-y-0">
          {MINES.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.06}>
              <div className="py-8" style={{ borderTop: "1px solid #e5e5e5" }}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: m.color }} />
                      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-serif text-2xl italic">{m.name}</h3>
                    <p className="text-[12px] text-neutral-400 mt-1">{m.basin}</p>
                    <div className="flex gap-6 mt-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-neutral-400">Reserves</p>
                        <p className="font-serif italic text-lg" style={{ color: m.color }}>{m.reserveShare}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-neutral-400">Output</p>
                        <p className="font-serif italic text-lg" style={{ color: m.color }}>{m.outputShare}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-neutral-400">Since</p>
                        <p className="font-serif italic text-lg">{m.opened}</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-8 flex items-center">
                    <p className="text-[14px] text-neutral-600 leading-relaxed">{m.note}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Processing plants */}
        <Reveal delay={0.1}>
          <div className="mt-12 pt-12 border-t border-neutral-200">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-8">Processing hubs</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROCESSING.map(p => (
                <div key={p.name} className="border border-neutral-100 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3" style={{ background: p.color, transform: "rotate(45deg)" }} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-neutral-400">{p.opened}</span>
                  </div>
                  <h4 className="font-serif text-xl italic mb-1">{p.name}</h4>
                  <p className="font-mono text-[11px] text-neutral-400 mb-3">{p.capacity}</p>
                  <p className="text-[13px] text-neutral-600 leading-relaxed">{p.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ━━━ VALUE CHAIN ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <div className="mb-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">The value chain</p>
            <h2 className="font-serif text-3xl leading-tight max-w-md">
              <em>From rock to fertilizer<br />to port</em>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}><ValueChainStepper /></Reveal>
      </section>

      {/* ━━━ BODY 3 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {c3 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <div className="max-w-2xl">
            <Reveal><BodyChunk content={c3} /></Reveal>
          </div>
        </section>
      )}

      {/* ━━━ EXPORT FLOWS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Global flows</p>
              <h2 className="font-serif text-3xl leading-tight mb-5">
                <em>Where the<br />phosphate goes</em>
              </h2>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: "#737373" }}>
                OCP ships to 160+ countries. Africa is the fastest-growing market —
                with a dedicated fertilizer complex at Jorf Lasfar producing
                blends customized for African soil types. India is the single
                largest country market.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.15}><ExportFlowsChart /></Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ TIMELINE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100" style={{ background: "#fafafa" }}>
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">105 years of phosphate</p>
          <h2 className="font-serif text-3xl leading-tight max-w-lg mb-12">
            <em>From colonial concession<br />to sovereign empire</em>
          </h2>
        </Reveal>
        <div className="relative">
          <div className="absolute left-[20px] md:left-[40px] top-0 bottom-0 w-px bg-neutral-200" />
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.04}>
              <div className="relative pl-12 md:pl-20 pb-10">
                <div className="absolute left-[16px] md:left-[36px] top-1 w-2.5 h-2.5 rounded-full" style={{ background: "#F59E0B" }} />
                <p className="font-serif italic text-2xl leading-none" style={{ color: "#F59E0B" }}>{t.year}</p>
                <p className="font-serif text-lg italic mt-2 mb-1">{t.event}</p>
                <p className="text-[13px] leading-relaxed text-neutral-500">{t.significance}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ━━━ KEY NUMBERS GRID ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Key numbers</p>
          <h2 className="font-serif text-3xl leading-tight max-w-lg mb-10">
            <em>The scale of<br />the kingdom</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "#e5e5e5" }}>
          {KEY_NUMBERS.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.04}>
              <div className="bg-white p-6 md:p-8">
                <p className="font-serif italic text-neutral-900 leading-none" style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)" }}>{n.value}</p>
                <p className="text-[12px] text-neutral-600 mt-2 font-medium">{n.label}</p>
                <p className="text-[11px] text-neutral-400 mt-1">{n.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ━━━ BODY 4 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {c4 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <div className="max-w-2xl">
            <Reveal><BodyChunk content={c4} /></Reveal>
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

      {/* ━━━ QUOTE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100" style={{ background: "#F59E0B" }}>
        <div className="max-w-3xl mx-auto text-center py-8">
          <p className="font-serif italic leading-[1.2]" style={{ fontSize: "clamp(1.4rem,4vw,2.4rem)", color: "#0a0a0a" }}>
            When China restricted phosphate fertilizer exports in 2024 to secure domestic
            food supply, the world turned to Morocco. There is no Plan B for phosphate.
            There is only OCP.
          </p>
        </div>
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
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16" style={{ background: "#141414" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>Data sources</p>
            <div style={{ fontSize: 12, lineHeight: 1.9, color: "rgba(255,255,255,0.9)" }}>
              <p className="mb-2">USGS — Mineral Commodity Summaries 2025: phosphate rock reserves and production.</p>
              <p className="mb-2">OCP Group — Industrial Operations (ocpgroup.ma): mine sites, processing platforms, pipeline.</p>
              <p className="mb-2">Deloitte — Phosphates and the Future of Energy Transition (2025): revenue breakdown, market share.</p>
              <p className="mb-2">African Development Bank — Phosphate Critical Mineral Insights (2025): value chain, employment.</p>
              <p>BC Insight — Phosphate Production in North Africa (2025): production volumes, TSP capacity.</p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>Story sources</p>
            <div style={{ fontSize: 12, lineHeight: 1.9, color: "rgba(255,255,255,0.9)" }}>
              {sources.length > 0
                ? sources.map((s, i) => <p key={i} className="mb-2">{s}</p>)
                : <p>Field research and OCP site documentation, 2024–2025.</p>
              }
            </div>
          </div>
        </div>
        <p className="font-mono text-[10px] mt-10" style={{ color: "#F59E0B" }}>© Slow Morocco · J. Ng</p>
      </section>

    </div>
  );
}
