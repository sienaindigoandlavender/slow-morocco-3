"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as d3 from "d3";

// ─────────────────────────────────────────────
// DATA — HCP Morocco
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
  { year: 2014, consensual: 63.1 },
  { year: 2016, consensual: 70.2 },
  { year: 2018, consensual: 76.5 },
  { year: 2020, consensual: 83.0 },
  { year: 2022, consensual: 86.4 },
  { year: 2024, consensual: 89.3 },
];

const SINGLEHOOD = [
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

const MARRIAGE_AGE = [
  { year: 2004, women: 26.4, men: 31.2 },
  { year: 2006, women: 26.7, men: 31.4 },
  { year: 2008, women: 27.0, men: 31.5 },
  { year: 2010, women: 27.2, men: 31.6 },
  { year: 2012, women: 27.5, men: 31.7 },
  { year: 2014, women: 27.6, men: 31.8 },
  { year: 2016, women: 27.8, men: 31.8 },
  { year: 2018, women: 25.5, men: 31.9 },
];

const CHILD_MARRIAGE = [
  { label: "Women married before 18", before: 15.9, after: 8.4 },
  { label: "Girls married under 15", before: 2.5, after: 0.2 },
];

const HOUSEHOLD_CHANGES = [
  { label: "Women-headed households", before: 16.2, after: 19.2, accent: "#2d7a5a" },
  { label: "Women single at 50", before: 3.9, after: 11.1, accent: "#9b8db0" },
  { label: "Consensual divorces", before: 63.1, after: 89.3, accent: "#4a9aba" },
  { label: "Divorce rate (per 100 marriages)", before: 45, after: 52, accent: "#c04040" },
];

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

function useCounter(target: number, duration = 1800, active = false) {
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

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, vis } = useInView();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(24px)",
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function AnimStat({ value, suffix = "", label, accent, prefix = "" }: {
  value: number; suffix?: string; label: string; accent: string; prefix?: string;
}) {
  const { ref, vis } = useInView();
  const n = useCounter(value, 1800, vis);
  return (
    <div ref={ref}>
      <div className="font-serif leading-none mb-2" style={{ fontSize: "clamp(3rem,6vw,5rem)", color: accent }}>
        {prefix}{n.toLocaleString()}{suffix}
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "#888" }}>{label}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// CHART 1 — Marriage vs Divorce dual axis
// ─────────────────────────────────────────────

function MarriageDivorceChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, vis } = useInView(0.15);
  const [hov, setHov] = useState<typeof MARRIAGE_DIVORCE[0] | null>(null);

  useEffect(() => {
    if (!svgRef.current || !vis) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const W = 900, H = 320, m = { top: 24, right: 24, bottom: 40, left: 64 };
    const w = W - m.left - m.right, h = H - m.top - m.bottom;
    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    const x = d3.scaleLinear().domain([2014, 2024]).range([0, w]);
    const y = d3.scaleLinear().domain([0, 310000]).range([h, 0]);

    // Grid
    [50000, 100000, 150000, 200000, 250000, 300000].forEach(t => {
      g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(t)).attr("y2", y(t))
        .attr("stroke", "#f3f3f3").attr("stroke-width", 1);
    });

    // Areas
    const areaM = d3.area<typeof MARRIAGE_DIVORCE[0]>()
      .x(d => x(d.year)).y0(h).y1(d => y(d.marriages)).curve(d3.curveMonotoneX);
    g.append("path").datum(MARRIAGE_DIVORCE).attr("fill", "#c9a96e").attr("fill-opacity", 0.08).attr("d", areaM);

    // Lines
    const drawLine = (key: "marriages" | "divorces", color: string, delay: number) => {
      const line = d3.line<typeof MARRIAGE_DIVORCE[0]>()
        .x(d => x(d.year)).y(d => y(d[key])).curve(d3.curveMonotoneX);
      const path = g.append("path").datum(MARRIAGE_DIVORCE)
        .attr("fill", "none").attr("stroke", color).attr("stroke-width", 2.5).attr("d", line);
      const len = (path.node() as SVGPathElement).getTotalLength();
      path.attr("stroke-dasharray", len).attr("stroke-dashoffset", len)
        .transition().duration(1400).delay(delay).ease(d3.easeLinear).attr("stroke-dashoffset", 0);
    };
    drawLine("marriages", "#c9a96e", 0);
    drawLine("divorces", "#c04040", 200);

    // Dots
    MARRIAGE_DIVORCE.forEach(d => {
      [{ k: "marriages" as const, c: "#c9a96e" }, { k: "divorces" as const, c: "#c04040" }].forEach(({ k, c }) => {
        g.append("circle").attr("cx", x(d.year)).attr("cy", y(d[k])).attr("r", 5)
          .attr("fill", c).attr("cursor", "pointer").attr("opacity", 0.8)
          .on("mouseenter", function () { d3.select(this).attr("r", 7); setHov(d); })
          .on("mouseleave", function () { d3.select(this).attr("r", 5); setHov(null); });
      });
    });

    // Axes
    g.append("g").attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format("d")))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 12).attr("fill", "#aaa"));
    g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d => `${(+d / 1000).toFixed(0)}k`))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 12).attr("fill", "#aaa"));

    // End labels
    const last = MARRIAGE_DIVORCE[MARRIAGE_DIVORCE.length - 1];
    g.append("text").attr("x", x(last.year) + 6).attr("y", y(last.marriages) + 4)
      .attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#c9a96e").text("252k");
    g.append("text").attr("x", x(last.year) + 6).attr("y", y(last.divorces) + 4)
      .attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#c04040").text("65k");

  }, [vis]);

  return (
    <div ref={ref}>
      <div className="flex items-center gap-6 mb-5 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-[2px]" style={{ background: "#c9a96e" }} />
          <span className="font-mono text-[11px]" style={{ color: "#888" }}>Marriages</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-[2px]" style={{ background: "#c04040" }} />
          <span className="font-mono text-[11px]" style={{ color: "#888" }}>Divorces</span>
        </div>
        {hov && (
          <span className="font-mono text-[11px] ml-auto" style={{ color: "#555" }}>
            {hov.year} · <span style={{ color: "#c9a96e" }}>{hov.marriages.toLocaleString()} marriages</span>
            {" · "}<span style={{ color: "#c04040" }}>{hov.divorces.toLocaleString()} divorces</span>
          </span>
        )}
      </div>
      <svg ref={svgRef} className="w-full" />
      <p className="font-mono text-[10px] mt-3" style={{ color: "#ccc" }}>
        Source: HCP — Haut-Commissariat au Plan du Maroc · CSPJ · 2024
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// CHART 2 — Divorce ratio per 100 marriages
// ─────────────────────────────────────────────

function DivorceRatioChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, vis } = useInView(0.15);

  const ratioData = MARRIAGE_DIVORCE.map(d => ({
    year: d.year,
    ratio: Math.round((d.divorces / d.marriages) * 100),
  }));

  useEffect(() => {
    if (!svgRef.current || !vis) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const W = 900, H = 240, m = { top: 16, right: 24, bottom: 40, left: 48 };
    const w = W - m.left - m.right, h = H - m.top - m.bottom;
    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    const x = d3.scaleBand().domain(ratioData.map(d => String(d.year))).range([0, w]).padding(0.3);
    const y = d3.scaleLinear().domain([0, 70]).range([h, 0]);

    [20, 40, 60].forEach(t => {
      g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(t)).attr("y2", y(t))
        .attr("stroke", t === 50 ? "#ffcccc" : "#f3f3f3").attr("stroke-width", t === 50 ? 1.5 : 1)
        .attr("stroke-dasharray", t === 50 ? "4,3" : "none");
      if (t === 50) {
        g.append("text").attr("x", w + 2).attr("y", y(50) + 4)
          .attr("font-family", "monospace").attr("font-size", 9).attr("fill", "#c04040").text("50%");
      }
    });

    g.selectAll(".bar").data(ratioData).enter()
      .append("rect").attr("class", "bar")
      .attr("x", d => x(String(d.year)) ?? 0)
      .attr("width", x.bandwidth()).attr("rx", 2)
      .attr("y", h).attr("height", 0)
      .attr("fill", d => d.ratio >= 50 ? "#c04040" : "#c9a96e")
      .attr("opacity", 0.85)
      .transition().duration(700).delay((_, i) => i * 60)
      .attr("y", d => y(d.ratio)).attr("height", d => h - y(d.ratio));

    g.selectAll(".val").data(ratioData).enter()
      .append("text").attr("class", "val")
      .attr("x", d => (x(String(d.year)) ?? 0) + x.bandwidth() / 2)
      .attr("y", d => y(d.ratio) - 5).attr("text-anchor", "middle")
      .attr("font-family", "monospace").attr("font-size", 10).attr("fill", "#888")
      .attr("opacity", 0).text(d => `${d.ratio}%`)
      .transition().duration(300).delay((_, i) => i * 60 + 500).attr("opacity", 1);

    g.append("g").attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#aaa"));
    g.append("g").call(d3.axisLeft(y).ticks(4).tickFormat(d => `${d}%`))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#aaa"));

  }, [vis]);

  return (
    <div ref={ref}>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: "#888" }}>
        Divorces per 100 marriages
      </p>
      <svg ref={svgRef} className="w-full" />
      <p className="font-mono text-[10px] mt-3" style={{ color: "#ccc" }}>
        Source: CSPJ · HCP Morocco · 2024
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// CHART 3 — Consensual divorce rise
// ─────────────────────────────────────────────

function ConsentChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, vis } = useInView(0.15);

  useEffect(() => {
    if (!svgRef.current || !vis) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const W = 540, H = 220, m = { top: 12, right: 50, bottom: 36, left: 44 };
    const w = W - m.left - m.right, h = H - m.top - m.bottom;
    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    const x = d3.scaleLinear().domain([2014, 2024]).range([0, w]);
    const y = d3.scaleLinear().domain([55, 95]).range([h, 0]);

    [60, 70, 80, 90].forEach(t => {
      g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(t)).attr("y2", y(t))
        .attr("stroke", "#f3f3f3").attr("stroke-width", 1);
    });

    const area = d3.area<typeof DIVORCE_TYPE[0]>()
      .x(d => x(d.year)).y0(h).y1(d => y(d.consensual)).curve(d3.curveMonotoneX);
    g.append("path").datum(DIVORCE_TYPE).attr("fill", "#2d7a5a").attr("fill-opacity", 0.1).attr("d", area);

    const line = d3.line<typeof DIVORCE_TYPE[0]>()
      .x(d => x(d.year)).y(d => y(d.consensual)).curve(d3.curveMonotoneX);
    const path = g.append("path").datum(DIVORCE_TYPE)
      .attr("fill", "none").attr("stroke", "#2d7a5a").attr("stroke-width", 2.5).attr("d", line);
    const len = (path.node() as SVGPathElement).getTotalLength();
    path.attr("stroke-dasharray", len).attr("stroke-dashoffset", len)
      .transition().duration(1200).ease(d3.easeLinear).attr("stroke-dashoffset", 0);

    DIVORCE_TYPE.forEach(d => {
      g.append("circle").attr("cx", x(d.year)).attr("cy", y(d.consensual)).attr("r", 4).attr("fill", "#2d7a5a");
    });
    g.append("text").attr("x", x(2024) + 5).attr("y", y(89.3) + 4)
      .attr("font-family", "monospace").attr("font-size", 12).attr("fill", "#2d7a5a").attr("font-weight", "600").text("89.3%");
    g.append("text").attr("x", x(2014) - 2).attr("y", y(63.1) + 4).attr("text-anchor", "end")
      .attr("font-family", "monospace").attr("font-size", 12).attr("fill", "#2d7a5a").text("63.1%");

    g.append("g").attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x).ticks(4).tickFormat(d3.format("d")))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#aaa"));
    g.append("g").call(d3.axisLeft(y).ticks(4).tickFormat(d => `${d}%`))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#aaa"));
  }, [vis]);

  return (
    <div ref={ref}>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: "#888" }}>
        Consensual divorces (chiqaq) as % of all divorces
      </p>
      <svg ref={svgRef} className="w-full" />
      <p className="font-mono text-[10px] mt-3" style={{ color: "#ccc" }}>Source: HCP Morocco · 2024</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// CHART 4 — Marriage age over time
// ─────────────────────────────────────────────

function MarriageAgeChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, vis } = useInView(0.15);

  useEffect(() => {
    if (!svgRef.current || !vis) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const W = 540, H = 220, m = { top: 12, right: 50, bottom: 36, left: 44 };
    const w = W - m.left - m.right, h = H - m.top - m.bottom;
    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    const x = d3.scaleLinear().domain([2004, 2018]).range([0, w]);
    const y = d3.scaleLinear().domain([24, 33]).range([h, 0]);

    [26, 28, 30, 32].forEach(t => {
      g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(t)).attr("y2", y(t))
        .attr("stroke", "#f3f3f3").attr("stroke-width", 1);
    });

    const drawLine = (key: "women" | "men", color: string, delay: number) => {
      const line = d3.line<typeof MARRIAGE_AGE[0]>()
        .x(d => x(d.year)).y(d => y(d[key])).curve(d3.curveMonotoneX);
      const path = g.append("path").datum(MARRIAGE_AGE)
        .attr("fill", "none").attr("stroke", color).attr("stroke-width", 2.5).attr("d", line);
      const len = (path.node() as SVGPathElement).getTotalLength();
      path.attr("stroke-dasharray", len).attr("stroke-dashoffset", len)
        .transition().duration(1200).delay(delay).ease(d3.easeLinear).attr("stroke-dashoffset", 0);

      const last = MARRIAGE_AGE[MARRIAGE_AGE.length - 1];
      g.append("text").attr("x", x(last.year) + 5).attr("y", y(last[key]) + 4)
        .attr("font-family", "monospace").attr("font-size", 12).attr("fill", color).attr("font-weight", "600")
        .text(`${last[key]} yrs`);
    };

    drawLine("men", "#c9a96e", 0);
    drawLine("women", "#9b8db0", 200);

    g.append("g").attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format("d")))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#aaa"));
    g.append("g").call(d3.axisLeft(y).ticks(4).tickFormat(d => `${d}`))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#aaa"));
  }, [vis]);

  return (
    <div ref={ref}>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: "#888" }}>
        Average age at first marriage
      </p>
      <div className="flex gap-5 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-[2px]" style={{ background: "#c9a96e" }} />
          <span className="font-mono text-[10px]" style={{ color: "#888" }}>Men</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-[2px]" style={{ background: "#9b8db0" }} />
          <span className="font-mono text-[10px]" style={{ color: "#888" }}>Women</span>
        </div>
      </div>
      <svg ref={svgRef} className="w-full" />
      <p className="font-mono text-[10px] mt-3" style={{ color: "#ccc" }}>Source: HCP Morocco · 2018 (latest available by gender)</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// CHART 5 — Singlehood women
// ─────────────────────────────────────────────

function SinglehoodChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { ref, vis } = useInView(0.15);

  useEffect(() => {
    if (!svgRef.current || !vis) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const W = 900, H = 220, m = { top: 12, right: 24, bottom: 36, left: 44 };
    const w = W - m.left - m.right, h = H - m.top - m.bottom;
    svg.attr("viewBox", `0 0 ${W} ${H}`).attr("preserveAspectRatio", "xMidYMid meet");
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`);

    const x = d3.scaleLinear().domain([2004, 2024]).range([0, w]);
    const y = d3.scaleLinear().domain([0, 14]).range([h, 0]);

    [4, 8, 12].forEach(t => {
      g.append("line").attr("x1", 0).attr("x2", w).attr("y1", y(t)).attr("y2", y(t))
        .attr("stroke", "#f3f3f3").attr("stroke-width", 1);
    });

    const area = d3.area<typeof SINGLEHOOD[0]>()
      .x(d => x(d.year)).y0(h).y1(d => y(d.rate)).curve(d3.curveMonotoneX);
    g.append("path").datum(SINGLEHOOD).attr("fill", "#9b8db0").attr("fill-opacity", 0.1).attr("d", area);

    const line = d3.line<typeof SINGLEHOOD[0]>()
      .x(d => x(d.year)).y(d => y(d.rate)).curve(d3.curveMonotoneX);
    const path = g.append("path").datum(SINGLEHOOD)
      .attr("fill", "none").attr("stroke", "#9b8db0").attr("stroke-width", 2.5).attr("d", line);
    const len = (path.node() as SVGPathElement).getTotalLength();
    path.attr("stroke-dasharray", len).attr("stroke-dashoffset", len)
      .transition().duration(1200).ease(d3.easeLinear).attr("stroke-dashoffset", 0);

    SINGLEHOOD.forEach((d, i) => {
      if (i === 0 || i === SINGLEHOOD.length - 1) {
        g.append("circle").attr("cx", x(d.year)).attr("cy", y(d.rate)).attr("r", 5).attr("fill", "#9b8db0");
        g.append("text")
          .attr("x", i === 0 ? x(d.year) + 6 : x(d.year) - 6)
          .attr("y", y(d.rate) - 8)
          .attr("text-anchor", i === 0 ? "start" : "end")
          .attr("font-family", "monospace").attr("font-size", 12).attr("fill", "#9b8db0").attr("font-weight", "600")
          .text(`${d.rate}% (${d.year})`);
      }
    });

    g.append("g").attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format("d")))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#aaa"));
    g.append("g").call(d3.axisLeft(y).ticks(4).tickFormat(d => `${d}%`))
      .call(ax => ax.select(".domain").remove()).call(ax => ax.selectAll("line").remove())
      .call(ax => ax.selectAll("text").attr("font-family", "monospace").attr("font-size", 11).attr("fill", "#aaa"));
  }, [vis]);

  return (
    <div ref={ref}>
      <svg ref={svgRef} className="w-full" />
      <p className="font-mono text-[10px] mt-3" style={{ color: "#ccc" }}>Source: HCP Morocco · 2024</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────

export default function MarriagesDivorcesContent() {
  return (
    <div className="min-h-screen bg-white" style={{ color: "#0a0a0a" }}>

      {/* ━━━ HEADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-32 pb-20 border-b border-neutral-100">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] mb-6" style={{ color: "#aaa" }}>
            <Link href="/stories" className="hover:text-neutral-600 transition-colors">Stories</Link>
            {" · "}Data
          </p>
          <h1 className="font-serif leading-[0.9] tracking-tight mb-8"
            style={{ fontSize: "clamp(3rem,8vw,6.5rem)", color: "#0a0a0a" }}>
            Marriages<br />&amp; Divorces<br />
            <em style={{ color: "#c9a96e" }}>in Morocco</em>
          </h1>
          <p className="font-mono text-[13px] leading-[1.85] max-w-xl" style={{ color: "#666" }}>
            Morocco registers around 252,000 marriages and 65,000 divorces per year.
            The divorce rate has doubled since 2014. The average man is 32 when he first marries.
            The share of women who never marry has nearly tripled since 2004.
            This is what the data shows.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] mt-6" style={{ color: "#bbb" }}>
            By J. Ng · Data: HCP Morocco, CSPJ · 2024
          </p>
        </Reveal>
      </section>

      {/* ━━━ KEY STATS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          <Reveal><AnimStat value={252000} label="marriages per year" accent="#c9a96e" /></Reveal>
          <Reveal delay={0.05}><AnimStat value={65475} label="divorces in 2024" accent="#c04040" /></Reveal>
          <Reveal delay={0.1}><AnimStat value={89} suffix="%" label="divorces by mutual consent" accent="#2d7a5a" /></Reveal>
          <Reveal delay={0.15}><AnimStat value={11} suffix=".1%" label="women never married at 50" accent="#9b8db0" /></Reveal>
        </div>
      </section>

      {/* ━━━ CHART 1 — Marriages vs Divorces ━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-10">
            <div className="lg:col-span-4">
              <h2 className="font-serif text-4xl leading-tight mb-4">
                <em>Fewer marriages.<br />More divorces.</em>
              </h2>
              <p className="font-mono text-[12px] leading-[1.85]" style={{ color: "#666" }}>
                Marriages peaked around 280,000 in 2018 and have declined since.
                Divorces rose every year from 2014 to 2023 — from 44,408 to 67,556.
                The curves are converging.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}><MarriageDivorceChart /></Reveal>
      </section>

      {/* ━━━ CHART 2 — Divorce ratio ━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-serif text-4xl leading-tight mb-4">
                <em>One divorce<br />for every two<br />marriages.</em>
              </h2>
              <p className="font-mono text-[12px] leading-[1.85]" style={{ color: "#666" }}>
                In 2020, at the height of the pandemic, Morocco recorded 55 divorces for every
                100 marriages. The ratio has stayed above 50 since 2019. Red bars are years
                where divorces exceeded half of all marriages.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}><DivorceRatioChart /></Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ CHARTS 3+4 — Consent & Age ━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <h2 className="font-serif text-4xl leading-tight mb-10">
            <em>How divorce<br />is changing.</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <Reveal>
            <div>
              <ConsentChart />
              <p className="font-mono text-[12px] leading-[1.85] mt-5" style={{ color: "#666" }}>
                In 2014, more than one in three divorces was contested. By 2024, only one in ten was.
                The rise of <em>chiqaq</em> — mutual consent divorce — reflects the 2004 Mudawwana
                reform and a generational shift in how Moroccans leave marriages.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <MarriageAgeChart />
              <p className="font-mono text-[12px] leading-[1.85] mt-5" style={{ color: "#666" }}>
                The average Moroccan man is 31.9 years old when he first marries. Women average 25.5.
                Both figures have risen since 2004. The primary constraint for men: the financial
                cost of a wedding and mahr. For women: rising education and economic independence.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ CHART 5 — Singlehood ━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-serif text-4xl leading-tight mb-4">
                <em>The woman<br />who doesn't<br />marry.</em>
              </h2>
              <p className="font-mono text-[12px] leading-[1.85]" style={{ color: "#666" }}>
                In 2004, fewer than 4 in 100 Moroccan women over 50 had never married.
                By 2024 it was more than 11. The rate is higher in rural areas —
                where the financial pressure on men is greatest — and rising fastest
                among urban, educated women.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: "#888" }}>
                Women never married at age 50 (%)
              </p>
              <SinglehoodChart />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ━━━ BEFORE / AFTER MUDAWWANA ━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <h2 className="font-serif text-4xl leading-tight mb-5">
                <em>The Mudawwana<br />effect.</em>
              </h2>
              <p className="font-mono text-[12px] leading-[1.85]" style={{ color: "#666" }}>
                Morocco's Family Code was substantially reformed in 2004 under King Mohammed VI.
                Women gained the equal right to initiate divorce. The minimum marriage age rose
                to 18. Polygamy was heavily restricted. Twenty years of data show what changed.
              </p>
            </div>
            <div className="space-y-0">
              {HOUSEHOLD_CHANGES.map(item => (
                <div key={item.label} className="grid grid-cols-12 items-center gap-3 py-4 border-b border-neutral-100">
                  <div className="col-span-5">
                    <p className="font-mono text-[11px]" style={{ color: "#555" }}>{item.label}</p>
                  </div>
                  <div className="col-span-4">
                    <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: "#f0f0f0" }}>
                      <div className="absolute left-0 top-0 bottom-0 rounded-full"
                        style={{ width: `${Math.min((item.after / 100) * 100, 100)}%`, background: item.accent }} />
                    </div>
                  </div>
                  <div className="col-span-3 text-right">
                    <span className="font-mono text-[11px] line-through mr-2" style={{ color: "#ccc" }}>{item.before}%</span>
                    <span className="font-mono text-[13px] font-medium" style={{ color: item.accent }}>{item.after}%</span>
                  </div>
                </div>
              ))}
              <p className="font-mono text-[10px] pt-3" style={{ color: "#ccc" }}>2004 → 2024 · HCP Morocco</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ━━━ CHILD MARRIAGE ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4" style={{ color: "#aaa" }}>Child marriage</p>
              <h2 className="font-serif text-3xl leading-tight mb-5">
                <em>One number<br />that moved.</em>
              </h2>
              <p className="font-mono text-[12px] leading-[1.85]" style={{ color: "#666" }}>
                Marriages involving girls under 15 have nearly ceased — from 2.5% of all
                women aged 20–24 in 2004, to 0.2% in 2024. The Mudawwana raised the minimum
                marriage age to 18. The data suggests it held.
              </p>
            </div>
            <div className="space-y-6">
              {CHILD_MARRIAGE.map(item => (
                <div key={item.label}>
                  <p className="font-mono text-[11px] mb-3" style={{ color: "#555" }}>{item.label}</p>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-serif" style={{ fontSize: "2.5rem", color: "#ccc" }}>{item.before}%</div>
                      <p className="font-mono text-[9px]" style={{ color: "#bbb" }}>2004</p>
                    </div>
                    <div className="flex-1 h-px" style={{ background: "#e5e5e5" }} />
                    <div className="text-center">
                      <div className="font-serif" style={{ fontSize: "2.5rem", color: "#2d7a5a" }}>{item.after}%</div>
                      <p className="font-mono text-[9px]" style={{ color: "#bbb" }}>2024</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ━━━ CROSSLINKS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-16 border-b border-neutral-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal>
            <Link href="/stories/moroccan-wedding-atlas"
              className="group block border border-neutral-200 p-8 hover:border-neutral-900 transition-colors">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-3" style={{ color: "#aaa" }}>Related</p>
              <h3 className="font-serif text-2xl mb-2 group-hover:opacity-60 transition-opacity">A Moroccan Wedding</h3>
              <p className="font-mono text-[11px]" style={{ color: "#888" }}>The ceremony, the traditions, the négafa, the amariya →</p>
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/stories/marriage-economy"
              className="group block border border-neutral-200 p-8 hover:border-neutral-900 transition-colors">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] mb-3" style={{ color: "#aaa" }}>Related</p>
              <h3 className="font-serif text-2xl mb-2 group-hover:opacity-60 transition-opacity">The Marriage Economy</h3>
              <p className="font-mono text-[11px]" style={{ color: "#888" }}>Mahr, sadaq, gold — the economics of Moroccan marriage →</p>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ━━━ SOURCES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section style={{ background: "#141414", padding: "64px 12% " }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 860 }}>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Data sources</p>
            <div style={{ fontSize: 12, lineHeight: 1.9, color: "rgba(255,255,255,0.8)" }}>
              <p style={{ marginBottom: 8 }}>HCP — Haut-Commissariat au Plan du Maroc. <em>Femmes Marocaines en Chiffres 2024</em>.</p>
              <p style={{ marginBottom: 8 }}>Conseil Supérieur du Pouvoir Judiciaire (CSPJ). Marriage and divorce statistics 2017–2024.</p>
              <p style={{ marginBottom: 8 }}>Ministère de la Justice. Family Code reform proposals, December 2024.</p>
              <p>Morocco World News. Hespress English. Barlamantoday.</p>
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Notes</p>
            <div style={{ fontSize: 12, lineHeight: 1.9, color: "rgba(255,255,255,0.8)" }}>
              <p style={{ marginBottom: 8 }}>All figures from official HCP and CSPJ datasets unless noted.</p>
              <p style={{ marginBottom: 8 }}>Marriage age data latest available: 2018 (HCP gender breakdown).</p>
              <p>Divorce ratio calculated as (divorces ÷ marriages) × 100 per year.</p>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: "monospace", fontSize: 10, marginTop: 40, color: "#c9a96e" }}>© Slow Morocco · J. Ng</p>
      </section>

    </div>
  );
}
