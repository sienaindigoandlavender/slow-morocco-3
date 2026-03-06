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
// DATA
// ─────────────────────────────────────────────

const MARRIAGE_DIVORCE = [
  { year: 2014, marriages: 275000, divorces: 44408 },
  { year: 2015, marriages: 270000, divorces: 48000 },
  { year: 2016, marriages: 265000, divorces: 52000 },
  { year: 2017, marriages: 262000, divorces: 55000 },
  { year: 2018, marriages: 265000, divorces: 57000 },
  { year: 2019, marriages: 258000, divorces: 59000 },
  { year: 2020, marriages: 230000, divorces: 62000 },
  { year: 2021, marriages: 248000, divorces: 64000 },
  { year: 2022, marriages: 252000, divorces: 63000 },
  { year: 2023, marriages: 255000, divorces: 67556 },
  { year: 2024, marriages: 252000, divorces: 65475 },
];

const DIVORCE_TYPE = [
  { year: 2014, consensual: 63.1, contested: 36.9 },
  { year: 2016, consensual: 70.2, contested: 29.8 },
  { year: 2018, consensual: 76.5, contested: 23.5 },
  { year: 2020, consensual: 83.0, contested: 17.0 },
  { year: 2022, consensual: 86.4, contested: 13.6 },
  { year: 2024, consensual: 89.3, contested: 10.7 },
];

const SINGLEHOOD_WOMEN = [
  { year: 2004, rate: 3.9 },
  { year: 2006, rate: 4.8 },
  { year: 2008, rate: 5.6 },
  { year: 2010, rate: 6.7 },
  { year: 2012, rate: 8.2 },
  { year: 2014, rate: 9.6 },
  { year: 2016, rate: 9.9 },
  { year: 2018, rate: 10.3 },
  { year: 2020, rate: 10.7 },
  { year: 2022, rate: 10.9 },
  { year: 2024, rate: 11.1 },
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
// CHART 1 — Marriage vs Divorce
// ─────────────────────────────────────────────

function MarriageDivorceTrend() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, vis } = useInView(0.2);
  const [hov, setHov] = useState<{ year: number; marriages: number; divorces: number } | null>(null);

  useEffect(() => {
    if (!svgRef.current || !vis) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const W = 820, H = 280, m = { top: 20, right: 20, bottom: 36, left: 60 };
    const w = W - m.left - m.right, h = H - m.top - m.bottom;
    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);
    const x = d3.scaleLinear().domain([2014, 2024]).range([0, w]);
    const y = d3.scaleLinear().domain([0, 300000]).range([h, 0]);

    y.ticks(4).forEach(t => {
      g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(t)).attr("y2", y(t))
        .attr("stroke", "#f0f0f0").attr("stroke-width", 1);
    });

    const areaM = d3.area<typeof MARRIAGE_DIVORCE[0]>()
      .x(d => x(d.year)).y0(h).y1(d => y(d.marriages)).curve(d3.curveMonotoneX);
    g.append("path").datum(MARRIAGE_DIVORCE).attr("fill", "#c9a96e").attr("fill-opacity", 0.07).attr("d", areaM);

    const lineM = d3.line<typeof MARRIAGE_DIVORCE[0]>()
      .x(d => x(d.year)).y(d => y(d.marriages)).curve(d3.curveMonotoneX);
    const pathM = g.append("path").datum(MARRIAGE_DIVORCE)
      .attr("fill", "none").attr("stroke", "#c9a96e").attr("stroke-width", 2).attr("d", lineM);
    const lenM = (pathM.node() as SVGPathElement).getTotalLength();
    pathM.attr("stroke-dasharray", lenM).attr("stroke-dashoffset", lenM)
      .transition().duration(1200).ease(d3.easeLinear).attr("stroke-dashoffset", 0);

    const lineD = d3.line<typeof MARRIAGE_DIVORCE[0]>()
      .x(d => x(d.year)).y(d => y(d.divorces)).curve(d3.curveMonotoneX);
    const pathD = g.append("path").datum(MARRIAGE_DIVORCE)
      .attr("fill", "none").attr("stroke", "#c04040").attr("stroke-width", 2).attr("d", lineD);
    const lenD = (pathD.node() as SVGPathElement).getTotalLength();
    pathD.attr("stroke-dasharray", lenD).attr("stroke-dashoffset", lenD)
      .transition().duration(1200).delay(300).ease(d3.easeLinear).attr("stroke-dashoffset", 0);

    MARRIAGE_DIVORCE.forEach(d => {
      g.append("circle").attr("cx", x(d.year)).attr("cy", y(d.marriages)).attr("r", 4).attr("fill", "#c9a96e").attr("cursor", "pointer")
        .on("mouseenter", () => setHov(d)).on("mouseleave", () => setHov(null));
      g.append("circle").attr("cx", x(d.year)).attr("cy", y(d.divorces)).attr("r", 4).attr("fill", "#c04040").attr("cursor", "pointer")
        .on("mouseenter", () => setHov(d)).on("mouseleave", () => setHov(null));
    });

    g.append("g").attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format("d")))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#aaa"));
    g.append("g").call(d3.axisLeft(y).ticks(4).tickFormat(d => `${(+d / 1000).toFixed(0)}k`))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#aaa"));
  }, [vis]);

  return (
    <div ref={ref}>
      <div className="flex items-center gap-6 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5" style={{ background: "#c9a96e" }} />
          <span className="font-mono text-[10px] text-neutral-400">Marriages</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5" style={{ background: "#c04040" }} />
          <span className="font-mono text-[10px] text-neutral-400">Divorces</span>
        </div>
        {hov && (
          <span className="font-mono text-[11px] text-neutral-500 ml-auto">
            {hov.year} · <span className="text-neutral-800">{hov.marriages.toLocaleString()}</span>
            {" · "}<span style={{ color: "#c04040" }}>{hov.divorces.toLocaleString()}</span>
          </span>
        )}
      </div>
      <svg ref={svgRef} className="w-full" />
      <p className="font-mono text-[10px] text-neutral-300 mt-3">Source: HCP Morocco · Haut-Commissariat au Plan · 2024</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// CHART 2 — Divorce by consent
// ─────────────────────────────────────────────

function DivorceConsentChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, vis } = useInView(0.2);

  useEffect(() => {
    if (!svgRef.current || !vis) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const W = 500, H = 200, m = { top: 10, right: 50, bottom: 32, left: 44 };
    const w = W - m.left - m.right, h = H - m.top - m.bottom;
    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);
    const x = d3.scaleLinear().domain([2014, 2024]).range([0, w]);
    const y = d3.scaleLinear().domain([0, 100]).range([h, 0]);

    y.ticks(4).forEach(t => {
      g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(t)).attr("y2", y(t))
        .attr("stroke", "#f0f0f0").attr("stroke-width", 1);
    });

    const area = d3.area<typeof DIVORCE_TYPE[0]>()
      .x(d => x(d.year)).y0(h).y1(d => y(d.consensual)).curve(d3.curveMonotoneX);
    g.append("path").datum(DIVORCE_TYPE).attr("fill", "#2d7a5a").attr("fill-opacity", 0.1).attr("d", area);

    const line = d3.line<typeof DIVORCE_TYPE[0]>()
      .x(d => x(d.year)).y(d => y(d.consensual)).curve(d3.curveMonotoneX);
    const path = g.append("path").datum(DIVORCE_TYPE)
      .attr("fill", "none").attr("stroke", "#2d7a5a").attr("stroke-width", 2).attr("d", line);
    const len = (path.node() as SVGPathElement).getTotalLength();
    path.attr("stroke-dasharray", len).attr("stroke-dashoffset", len)
      .transition().duration(1000).ease(d3.easeLinear).attr("stroke-dashoffset", 0);

    g.append("text").attr("x", x(2024) + 4).attr("y", y(89.3) + 4)
      .attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#2d7a5a").text("89.3%");

    g.append("g").attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x).ticks(4).tickFormat(d3.format("d")))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 10).attr("fill", "#bbb"));
    g.append("g").call(d3.axisLeft(y).ticks(4).tickFormat(d => `${d}%`))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 10).attr("fill", "#bbb"));
  }, [vis]);

  return (
    <div ref={ref}>
      <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-3">Consensual divorces as % of all divorces</p>
      <svg ref={svgRef} className="w-full" />
      <p className="font-mono text-[10px] text-neutral-300 mt-2">Source: HCP Morocco · 2024</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// CHART 3 — Singlehood
// ─────────────────────────────────────────────

function SinglehoodChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, vis } = useInView(0.2);

  useEffect(() => {
    if (!svgRef.current || !vis) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const W = 500, H = 200, m = { top: 10, right: 20, bottom: 32, left: 40 };
    const w = W - m.left - m.right, h = H - m.top - m.bottom;
    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);
    const x = d3.scaleLinear().domain([2004, 2024]).range([0, w]);
    const y = d3.scaleLinear().domain([0, 14]).range([h, 0]);

    y.ticks(4).forEach(t => {
      g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(t)).attr("y2", y(t))
        .attr("stroke", "#f0f0f0").attr("stroke-width", 1);
    });

    const area = d3.area<typeof SINGLEHOOD_WOMEN[0]>()
      .x(d => x(d.year)).y0(h).y1(d => y(d.rate)).curve(d3.curveMonotoneX);
    g.append("path").datum(SINGLEHOOD_WOMEN).attr("fill", "#9b8db0").attr("fill-opacity", 0.1).attr("d", area);

    const line = d3.line<typeof SINGLEHOOD_WOMEN[0]>()
      .x(d => x(d.year)).y(d => y(d.rate)).curve(d3.curveMonotoneX);
    const path = g.append("path").datum(SINGLEHOOD_WOMEN)
      .attr("fill", "none").attr("stroke", "#9b8db0").attr("stroke-width", 2).attr("d", line);
    const len = (path.node() as SVGPathElement).getTotalLength();
    path.attr("stroke-dasharray", len).attr("stroke-dashoffset", len)
      .transition().duration(1000).ease(d3.easeLinear).attr("stroke-dashoffset", 0);

    g.append("circle").attr("cx", x(2004)).attr("cy", y(3.9)).attr("r", 3).attr("fill", "#9b8db0");
    g.append("text").attr("x", x(2004) + 4).attr("y", y(3.9) - 5)
      .attr("font-family", "monospace").attr("font-size", 10).attr("fill", "#9b8db0").text("3.9% (2004)");
    g.append("circle").attr("cx", x(2024)).attr("cy", y(11.1)).attr("r", 3).attr("fill", "#9b8db0");
    g.append("text").attr("x", x(2024) - 64).attr("y", y(11.1) - 5)
      .attr("font-family", "monospace").attr("font-size", 10).attr("fill", "#9b8db0").text("11.1% (2024)");

    g.append("g").attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 10).attr("fill", "#bbb"));
    g.append("g").call(d3.axisLeft(y).ticks(4).tickFormat(d => `${d}%`))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 10).attr("fill", "#bbb"));
  }, [vis]);

  return (
    <div ref={ref}>
      <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 mb-3">Women never married at age 50 (%)</p>
      <svg ref={svgRef} className="w-full" />
      <p className="font-mono text-[10px] text-neutral-300 mt-2">Source: HCP Morocco · 2024</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

export default function MarriageEconomyContent({ story, images, relatedJourneys }: Props) {
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
          <AnimStat value={252000} label="marriages per year" accent="#c9a96e" />
          <AnimStat value={65475} label="divorces in 2024" accent="#c04040" />
          <AnimStat value={32} suffix=" yrs" label="avg age men at marriage" accent="#2d7a5a" />
          <AnimStat value={89} suffix="%" label="divorces by mutual consent" accent="#9b8db0" />
        </div>
      </section>

      {/* ━━━ BODY 1 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {c1 && (
        <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
          <div className="max-w-2xl">
            <Reveal><BodyChunk content={c1} /></Reveal>
          </div>
        </section>
      )}

      {/* ━━━ CHART 1 — Marriage vs Divorce ━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">The numbers</p>
              <h2 className="font-serif text-3xl leading-tight mb-5">
                <em>Fewer marriages.<br />More divorces.<br />Every year.</em>
              </h2>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: "#737373" }}>
                Marriages peaked around 280,000 in 2018 and have declined since.
                Divorces moved in the opposite direction — rising from 44,408 in 2014
                to a peak of 67,556 in 2023. In 2020, one divorce was filed for every
                two marriages.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.15}><MarriageDivorceTrend /></Reveal>
          </div>
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

      {/* ━━━ CHARTS 2+3 — Consent & Singlehood ━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">Changing norms</p>
          <h2 className="font-serif text-3xl leading-tight max-w-lg mb-10">
            <em>The divorce is amicable.<br />The single woman is no longer exceptional.</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <Reveal delay={0.05}>
            <div>
              <DivorceConsentChart />
              <p style={{ fontSize: 13, lineHeight: 1.85, color: "#737373", marginTop: 20 }}>
                In 2014, 37% of divorces were contested. By 2024, only 10.7% were.
                The shift to <em>chiqaq</em> — mutual consent — reflects both legal
                reform and a generational change in how Moroccans end marriages.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div>
              <SinglehoodChart />
              <p style={{ fontSize: 13, lineHeight: 1.85, color: "#737373", marginTop: 20 }}>
                Women over 50 who have never married: 3.9% in 2004, 11.1% in 2024.
                The rate is highest in rural areas — where the financial pressure on
                men to fund a wedding is most acute — and growing fastest among
                urban, educated women.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ MARRIAGE AGE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-10">Average age at first marriage</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
          {[
            { label: "Women", value: "25.5", accent: "#9b8db0", note: "Rising since 2004. Economic independence and higher education are the primary drivers." },
            { label: "Men", value: "31.9", accent: "#c9a96e", note: "Rising since 2004. Housing costs and wedding expenses are the primary constraints." },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <div className="border-t-2 pt-6" style={{ borderColor: item.accent }}>
                <div className="font-serif leading-none mb-2" style={{ fontSize: "clamp(3rem,7vw,5rem)", color: item.accent }}>
                  {item.value}
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400 mb-2">{item.label} · years old</p>
                <p style={{ fontSize: 12, color: "#737373", lineHeight: 1.6 }}>{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ━━━ BEFORE/AFTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-4">2004 → 2024</p>
              <h2 className="font-serif text-3xl leading-tight mb-5">
                <em>What the Mudawwana<br />changed</em>
              </h2>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: "#737373" }}>
                The 2004 Family Code reform — Morocco's most significant change to marriage law
                in a generation — has reshaped who marries, when, and on what terms.
                The data two decades later.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-0">
                {[
                  { label: "Women married before 18", before: 15.9, after: 8.4, accent: "#c04040" },
                  { label: "Girls married under 15", before: 2.5, after: 0.2, accent: "#c9a96e" },
                  { label: "Women single at 50", before: 3.9, after: 11.1, accent: "#9b8db0" },
                  { label: "Women-headed households", before: 16.2, after: 19.2, accent: "#2d7a5a" },
                  { label: "Consensual divorces", before: 63.1, after: 89.3, accent: "#4a9aba" },
                ].map(item => (
                  <div key={item.label} className="grid grid-cols-12 items-center gap-3 py-4 border-b border-neutral-100">
                    <div className="col-span-5">
                      <p className="font-mono text-[11px] text-neutral-600">{item.label}</p>
                    </div>
                    <div className="col-span-4">
                      <div className="relative h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 rounded-full"
                          style={{ width: `${Math.min((item.after / 100) * 100, 100)}%`, background: item.accent }} />
                      </div>
                    </div>
                    <div className="col-span-3 text-right">
                      <span className="font-mono text-[11px] text-neutral-300 line-through mr-2">{item.before}%</span>
                      <span className="font-mono text-[13px]" style={{ color: item.accent }}>{item.after}%</span>
                    </div>
                  </div>
                ))}
                <p className="font-mono text-[10px] text-neutral-300 pt-2">HCP Morocco · 2024</p>
              </div>
            </div>
          </div>
        </Reveal>
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

      {/* ━━━ CROSSLINK TO WEDDING ATLAS ━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <div className="flex items-center justify-between gap-8 flex-wrap">
            <p className="font-serif italic text-xl text-neutral-600 max-w-lg">
              Before the statistics, there is the ceremony.
            </p>
            <Link href="/stories/moroccan-wedding-atlas"
              className="font-mono text-[11px] uppercase tracking-[0.15em] border border-neutral-900 px-7 py-3.5 hover:bg-neutral-900 hover:text-white transition-all duration-200 whitespace-nowrap">
              A Moroccan Wedding →
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
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(0,0,0,0.4)" }}>Data sources</p>
            <div style={{ fontSize: 12, lineHeight: 1.9, color: "rgba(0,0,0,0.6)" }}>
              <p className="mb-2">HCP — Haut-Commissariat au Plan du Maroc. <em>Femmes Marocaines en Chiffres 2024</em>.</p>
              <p className="mb-2">Conseil Supérieur du Pouvoir Judiciaire (CSPJ). Marriage and divorce statistics 2017–2024.</p>
              <p>Ministère de la Justice. Family Code reform proposals, December 2024.</p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-4" style={{ color: "rgba(0,0,0,0.4)" }}>Story sources</p>
            <div style={{ fontSize: 12, lineHeight: 1.9, color: "rgba(0,0,0,0.6)" }}>
              {sources.length > 0
                ? sources.map((s, i) => <p key={i} className="mb-2">{s}</p>)
                : <p>Field interviews, Marrakech 2023–2024. Morocco World News. Hespress English.</p>
              }
            </div>
          </div>
        </div>
        <p className="font-mono text-[10px] mt-10" style={{ color: "#92702a" }}>© Slow Morocco · J. Ng</p>
      </section>

    </div>
  );
}
