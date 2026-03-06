"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

/* ═══════════════════════════════════════════════════
   D3 CHART COMPONENTS — The Gorilla Dividend
   Population recovery, revenue flows, permit economics,
   country comparison, community impact.
   ═══════════════════════════════════════════════════ */

// ── Hook: Trigger on scroll ──────────────────────
export function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ── Animated Counter ─────────────────────────────
export function AnimCounter({ target, prefix = "", suffix = "", decimals = 0, duration = 2000 }: { target: number; prefix?: string; suffix?: string; decimals?: number; duration?: number }) {
  const { ref, visible } = useInView()
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(eased * target)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [visible, target, duration])
  return <span ref={ref}>{prefix}{decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString()}{suffix}</span>
}

const C = {
  black: "#0a0a0a", dark: "#262626", mid: "#525252", light: "#737373",
  muted: "#a3a3a3", line: "#e5e5e5", off: "#fafafa", white: "#fff",
  forest: "#2D5F3A", forestLight: "#4A8C5C", forestDark: "#1A3D24",
  gold: "#B8860B", goldLight: "#D4A017", amber: "#D97706",
  red: "#991B1B", redLight: "#DC2626",
}

// ─── 001: POPULATION RECOVERY — Area chart with key events ────
export function PopulationChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.2)
  const [hovered, setHovered] = useState<any>(null)

  const data = [
    { year: 1981, pop: 254, note: "First census. Lowest point." },
    { year: 1985, pop: 290, note: "Fossey murdered. Dec 26." },
    { year: 1989, pop: 320, note: "Post-Fossey stabilisation." },
    { year: 1994, pop: 320, note: "Rwandan genocide. Gorillas survive." },
    { year: 2000, pop: 380, note: "First post-war census." },
    { year: 2003, pop: 380, note: "$250 permit introduced." },
    { year: 2006, pop: 480, note: "Population rebound confirmed." },
    { year: 2010, pop: 480, note: "Steady growth continues." },
    { year: 2012, pop: 480, note: null },
    { year: 2015, pop: 600, note: "Passing 600 for first time." },
    { year: 2016, pop: 604, note: null },
    { year: 2017, pop: 604, note: "Permit price raised to $1,500." },
    { year: 2018, pop: 1004, note: "Census: 1,004. Reclassified from CR to EN." },
    { year: 2020, pop: 1063, note: "1,063 — peak count." },
    { year: 2024, pop: 1063, note: "Stable. Only great ape increasing." },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const W = 880, H = 380
    const m = { top: 30, right: 30, bottom: 45, left: 55 }
    const w = W - m.left - m.right, h = H - m.top - m.bottom
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`)

    const x = d3.scaleLinear().domain([1981, 2024]).range([0, w])
    const y = d3.scaleLinear().domain([0, 1200]).range([h, 0])

    // Grid
    g.selectAll(".grid").data(y.ticks(5)).enter().append("line")
      .attr("x1", 0).attr("x2", w).attr("y1", (d: number) => y(d)).attr("y2", (d: number) => y(d))
      .attr("stroke", C.line).attr("stroke-dasharray", "3,3")

    g.selectAll(".ylabel").data(y.ticks(5)).enter().append("text")
      .attr("x", -10).attr("y", (d: number) => y(d)).attr("text-anchor", "end").attr("dominant-baseline", "middle")
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 10).attr("fill", C.light)
      .text((d: number) => d.toLocaleString())

    // X axis
    g.selectAll(".xlabel").data([1981, 1994, 2003, 2010, 2018, 2024]).enter().append("text")
      .attr("x", (d: number) => x(d)).attr("y", h + 30).attr("text-anchor", "middle")
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 10).attr("fill", C.light)
      .text((d: number) => d)

    // Area
    const area = d3.area<typeof data[0]>().x(d => x(d.year)).y0(h).y1(d => y(d.pop)).curve(d3.curveMonotoneX)
    const line = d3.line<typeof data[0]>().x(d => x(d.year)).y(d => y(d.pop)).curve(d3.curveMonotoneX)

    const gradient = svg.append("defs").append("linearGradient").attr("id", "popGrad").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 1)
    gradient.append("stop").attr("offset", "0%").attr("stop-color", C.forest).attr("stop-opacity", 0.35)
    gradient.append("stop").attr("offset", "100%").attr("stop-color", C.forest).attr("stop-opacity", 0.03)

    const areaPath = g.append("path").datum(data).attr("fill", "url(#popGrad)").attr("d", area)
    const linePath = g.append("path").datum(data).attr("fill", "none").attr("stroke", C.forest).attr("stroke-width", 2.5).attr("d", line)

    // Animate
    const totalLength = (linePath.node() as SVGPathElement).getTotalLength()
    linePath.attr("stroke-dasharray", totalLength).attr("stroke-dashoffset", totalLength)
      .transition().duration(2000).ease(d3.easeCubicOut).attr("stroke-dashoffset", 0)

    areaPath.attr("opacity", 0).transition().delay(800).duration(1200).attr("opacity", 1)

    // Event markers
    const events = data.filter(d => d.note)
    g.selectAll(".event-dot").data(events).enter().append("circle")
      .attr("cx", d => x(d.year)).attr("cy", d => y(d.pop)).attr("r", 0)
      .attr("fill", d => d.year === 1994 ? C.red : d.year === 2018 ? C.gold : C.forest)
      .attr("stroke", C.white).attr("stroke-width", 2)
      .transition().delay((d, i) => 1200 + i * 100).duration(400)
      .attr("r", d => d.year === 1994 || d.year === 2018 ? 6 : 4)

    // Hover overlay
    const overlay = g.append("rect").attr("width", w).attr("height", h).attr("fill", "transparent").style("cursor", "crosshair")
    const hoverLine = g.append("line").attr("y1", 0).attr("y2", h).attr("stroke", C.muted).attr("stroke-dasharray", "3,3").style("opacity", 0)
    const hoverDot = g.append("circle").attr("r", 5).attr("fill", C.forest).attr("stroke", C.white).attr("stroke-width", 2).style("opacity", 0)

    overlay.on("mousemove", (event: MouseEvent) => {
      const [mx] = d3.pointer(event)
      const year = Math.round(x.invert(mx))
      const closest = data.reduce((prev, curr) => Math.abs(curr.year - year) < Math.abs(prev.year - year) ? curr : prev)
      hoverLine.attr("x1", x(closest.year)).attr("x2", x(closest.year)).style("opacity", 0.5)
      hoverDot.attr("cx", x(closest.year)).attr("cy", y(closest.pop)).style("opacity", 1)
      setHovered(closest)
    }).on("mouseleave", () => {
      hoverLine.style("opacity", 0); hoverDot.style("opacity", 0); setHovered(null)
    })
  }, [visible])

  return (
    <div ref={ref}>
      <div style={{ position: "relative" }}>
        <svg ref={svgRef} viewBox="0 0 880 380" style={{ width: "100%", height: "auto" }} />
        {hovered && (
          <div style={{ position: "absolute", top: 8, right: 8, background: C.white, border: `1px solid ${C.line}`, padding: "10px 14px", borderRadius: 4, maxWidth: 220 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700, color: C.forest, margin: 0 }}>{hovered.year}</p>
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, fontWeight: 400, color: C.black, margin: "2px 0" }}>{hovered.pop.toLocaleString()}</p>
            {hovered.note && <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.mid, margin: 0, lineHeight: 1.5 }}>{hovered.note}</p>}
          </div>
        )}
      </div>
      <p className="text-[9px] text-[#737373] mt-3 italic">Source: IUCN, Dian Fossey Gorilla Fund, Greater Virunga Census (2010, 2015/16, 2018)</p>
    </div>
  )
}

// ─── 002: PERMIT COMPARISON — Horizontal bar chart ────────────
export function PermitComparison() {
  const { ref, visible } = useInView(0.3)

  const data = [
    { country: "Rwanda", park: "Volcanoes NP", price: 1500, permits: 96, color: C.forest, status: "Open" },
    { country: "Uganda", park: "Bwindi / Mgahinga", price: 800, permits: 160, color: C.gold, status: "Open" },
    { country: "DRC", park: "Virunga NP", price: 400, permits: 0, color: C.red, status: "Closed since 2020" },
  ]

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all 0.8s ease" }}>
      {data.map((d, i) => (
        <div key={d.country} style={{ marginBottom: 28, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-20px)", transition: `all 0.6s ease ${i * 0.15}s` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <div>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 700, color: C.black }}>{d.country}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: C.light, marginLeft: 8 }}>{d.park}</span>
            </div>
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, fontWeight: 400, color: d.color }}>${d.price.toLocaleString()}</span>
          </div>
          <div style={{ height: 8, background: C.off, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", background: d.color, borderRadius: 4, width: visible ? `${(d.price / 1500) * 100}%` : "0%", transition: `width 1s ease ${0.3 + i * 0.15}s` }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.light }}>{d.permits > 0 ? `${d.permits} permits/day` : d.status}</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: d.status === "Closed since 2020" ? C.red : C.light }}>{d.status}</span>
          </div>
        </div>
      ))}
      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 12, marginTop: 8 }}>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.mid, lineHeight: 1.6 }}>
          Rwanda: 8 visitors × 12 habituated groups = 96/day max<br />
          Uganda: 8 visitors × 20 habituated groups = 160/day max<br />
          DRC: Virunga closed — security crisis since 2020
        </p>
      </div>
    </div>
  )
}

// ─── 003: REVENUE FLOW — Stacked/annotated bar chart ──────────
export function RevenueChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)
  const [hovered, setHovered] = useState<any>(null)

  const data = [
    { year: 2014, total: 305, gorilla: 105 },
    { year: 2015, total: 318, gorilla: 112 },
    { year: 2016, total: 404, gorilla: 130 },
    { year: 2017, total: 438, gorilla: 150 },
    { year: 2018, total: 498, gorilla: 160 },
    { year: 2019, total: 498, gorilla: 165 },
    { year: 2020, total: 130, gorilla: 30 },
    { year: 2021, total: 180, gorilla: 58 },
    { year: 2022, total: 440, gorilla: 135 },
    { year: 2023, total: 560, gorilla: 157 },
    { year: 2024, total: 647, gorilla: 200 },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const W = 880, H = 360
    const m = { top: 20, right: 30, bottom: 45, left: 55 }
    const w = W - m.left - m.right, h = H - m.top - m.bottom
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`)

    const x = d3.scaleBand().domain(data.map(d => String(d.year))).range([0, w]).padding(0.3)
    const y = d3.scaleLinear().domain([0, 700]).range([h, 0])

    // Grid
    g.selectAll(".grid").data(y.ticks(5)).enter().append("line")
      .attr("x1", 0).attr("x2", w).attr("y1", (d: number) => y(d)).attr("y2", (d: number) => y(d))
      .attr("stroke", C.line).attr("stroke-dasharray", "3,3")

    g.selectAll(".ylabel").data(y.ticks(5)).enter().append("text")
      .attr("x", -10).attr("y", (d: number) => y(d)).attr("text-anchor", "end").attr("dominant-baseline", "middle")
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 10).attr("fill", C.light)
      .text((d: number) => `$${d}M`)

    g.selectAll(".xlabel").data(data).enter().append("text")
      .attr("x", d => (x(String(d.year)) || 0) + x.bandwidth() / 2).attr("y", h + 25).attr("text-anchor", "middle")
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 10).attr("fill", d => d.year === 2020 ? C.red : C.light)
      .text(d => d.year)

    // Other tourism (bottom)
    g.selectAll(".bar-other").data(data).enter().append("rect")
      .attr("x", d => x(String(d.year)) || 0)
      .attr("width", x.bandwidth())
      .attr("y", h).attr("height", 0)
      .attr("fill", "#d4d4d4").attr("rx", 3)
      .transition().duration(800).delay((d, i) => i * 50)
      .attr("y", d => y(d.total)).attr("height", d => h - y(d.total))

    // Gorilla portion (overlay)
    g.selectAll(".bar-gorilla").data(data).enter().append("rect")
      .attr("x", d => x(String(d.year)) || 0)
      .attr("width", x.bandwidth())
      .attr("y", h).attr("height", 0)
      .attr("fill", C.forest).attr("rx", 3)
      .transition().duration(800).delay((d, i) => 200 + i * 50)
      .attr("y", d => y(d.gorilla)).attr("height", d => h - y(d.gorilla))

    // Hover
    g.selectAll(".hover-rect").data(data).enter().append("rect")
      .attr("x", d => x(String(d.year)) || 0).attr("width", x.bandwidth())
      .attr("y", 0).attr("height", h).attr("fill", "transparent").style("cursor", "pointer")
      .on("mouseenter", (_, d) => setHovered(d))
      .on("mouseleave", () => setHovered(null))

    // COVID annotation
    const covidX = (x("2020") || 0) + x.bandwidth() / 2
    g.append("text").attr("x", covidX).attr("y", y(130) - 12).attr("text-anchor", "middle")
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 9).attr("fill", C.red).attr("font-weight", 700)
      .text("COVID").attr("opacity", 0).transition().delay(1200).duration(400).attr("opacity", 1)
  }, [visible])

  return (
    <div ref={ref}>
      <div style={{ position: "relative" }}>
        <svg ref={svgRef} viewBox="0 0 880 360" style={{ width: "100%", height: "auto" }} />
        {hovered && (
          <div style={{ position: "absolute", top: 8, right: 8, background: C.white, border: `1px solid ${C.line}`, padding: "10px 14px", borderRadius: 4 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700, color: C.black, margin: 0 }}>{hovered.year}</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: C.mid, margin: "4px 0 0" }}>
              Total: <strong style={{ color: C.black }}>${hovered.total}M</strong>
            </p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: C.mid, margin: "2px 0 0" }}>
              Gorilla: <strong style={{ color: C.forest }}>${hovered.gorilla}M</strong> ({Math.round(hovered.gorilla / hovered.total * 100)}%)
            </p>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, background: C.forest, borderRadius: 2 }} /><span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.mid }}>Gorilla tourism</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 12, height: 12, background: "#d4d4d4", borderRadius: 2 }} /><span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.mid }}>Other tourism</span></div>
      </div>
      <p className="text-[9px] text-[#737373] mt-3 italic">Source: Rwanda Development Board (RDB), WTTC Rwanda Economic Impact Report 2025</p>
    </div>
  )
}

// ─── 004: REVENUE SHARING — Donut chart ───────────────────────
export function RevenueSharingDonut() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)
  const [active, setActive] = useState<any>(null)

  const data = [
    { label: "Rwanda Development Board", pct: 40, color: C.forest, desc: "Park management, ranger salaries, infrastructure" },
    { label: "Community projects", pct: 10, color: C.gold, desc: "Schools, health centres, water systems, livestock" },
    { label: "Dian Fossey Fund / research", pct: 15, color: "#4A8C5C", desc: "Veterinary care, monitoring, anti-poaching" },
    { label: "Local government", pct: 10, color: "#7A9E7E", desc: "District budgets, road maintenance" },
    { label: "Private operators / lodges", pct: 25, color: "#B8C4B8", desc: "Tourism employment, supply chains" },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const size = 260, r = size / 2, inner = r * 0.56
    const g = svg.append("g").attr("transform", `translate(${size / 2},${size / 2})`)
    const pie = d3.pie<typeof data[0]>().value(d => d.pct).sort(null).padAngle(0.03)
    const arc = d3.arc<d3.PieArcDatum<typeof data[0]>>().innerRadius(inner).outerRadius(r)
    const arcHover = d3.arc<d3.PieArcDatum<typeof data[0]>>().innerRadius(inner).outerRadius(r + 6)

    const paths = g.selectAll("path").data(pie(data)).enter().append("path")
      .attr("fill", d => d.data.color).attr("stroke", C.white).attr("stroke-width", 2)
      .style("cursor", "pointer")

    paths.transition().duration(1000)
      .attrTween("d", function(d) {
        const interp = d3.interpolate({ startAngle: d.startAngle, endAngle: d.startAngle }, d)
        return (t: number) => arc(interp(t)) || ""
      })

    paths.on("mouseenter", function(_, d) {
      d3.select(this).transition().duration(200).attr("d", arcHover as any)
      setActive(d.data)
    }).on("mouseleave", function(_, d) {
      d3.select(this).transition().duration(200).attr("d", arc as any)
      setActive(null)
    })

    // Center text
    g.append("text").attr("text-anchor", "middle").attr("dy", -4)
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 10).attr("fill", C.light).attr("letter-spacing", "0.08em")
      .text("REVENUE")
    g.append("text").attr("text-anchor", "middle").attr("dy", 12)
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 10).attr("fill", C.light).attr("letter-spacing", "0.08em")
      .text("SHARING")
  }, [visible])

  return (
    <div ref={ref} style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", opacity: visible ? 1 : 0, transition: "opacity 0.8s" }}>
      <svg ref={svgRef} viewBox="0 0 260 260" style={{ width: 260, height: 260, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 200 }}>
        {active ? (
          <div>
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 42, fontWeight: 400, color: active.color, lineHeight: 1, margin: 0 }}>{active.pct}%</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 700, color: C.black, margin: "6px 0 0" }}>{active.label}</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: C.mid, margin: "4px 0 0" }}>{active.desc}</p>
          </div>
        ) : (
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: C.light, fontStyle: "italic" }}>Hover the chart to explore</p>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
          {data.map(d => (
            <div key={d.label} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
              onMouseEnter={() => setActive(d)} onMouseLeave={() => setActive(null)}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, opacity: active && active.label !== d.label ? 0.25 : 1, transition: "opacity 0.2s" }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: C.black, opacity: active && active.label !== d.label ? 0.35 : 1, transition: "opacity 0.2s" }}>
                {d.label} — {d.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── 005: THE ARITHMETIC — Revenue per gorilla calculator ─────
export function ArithmeticTable() {
  const { ref, visible } = useInView(0.3)

  const rows = [
    { label: "Permit price", value: "$1,500", note: "per person, since 2017" },
    { label: "Visitors per group/day", value: "8", note: "maximum, no exceptions" },
    { label: "Habituated groups", value: "12", note: "Volcanoes NP, Rwanda" },
    { label: "Daily permits", value: "96", note: "8 × 12" },
    { label: "Annual capacity", value: "~35,040", note: "96 × 365" },
    { label: "Annual gorilla revenue", value: "~$52.6M", note: "permit fees alone" },
    { label: "Total gorilla tourism", value: "$200M", note: "including lodges, transport, tax (2024)" },
    { label: "Revenue per gorilla/year", value: "$188,000", note: "1,063 gorillas, total gorilla tourism" },
    { label: "Revenue per gorilla/day", value: "$515", note: "$188K ÷ 365" },
  ]

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "all 0.8s ease" }}>
      <div style={{ borderTop: `1px solid ${C.line}` }}>
        {rows.map((r, i) => (
          <div key={r.label} style={{
            display: "grid", gridTemplateColumns: "1fr 120px 1fr", gap: 12, padding: "10px 0",
            borderBottom: `1px solid ${C.line}`, alignItems: "baseline",
            opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-8px)",
            transition: `all 0.4s ease ${i * 0.06}s`,
          }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: C.dark }}>{r.label}</span>
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 20, fontWeight: 400, color: i >= 7 ? C.forest : C.black, textAlign: "right" }}>{r.value}</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.light }}>{r.note}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
