"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

/* ═══════════════════════════════════════════════════
   D3 CHARTS — The Silk Road Into Africa
   Magazine-quality. Flourish-level. Gossip not lecture.
   ═══════════════════════════════════════════════════ */

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

export function AnimCounter({ target, prefix = "", suffix = "", decimals = 0, duration = 2000 }: { target: number; prefix?: string; suffix?: string; decimals?: number; duration?: number }) {
  const { ref, visible } = useInView()
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setVal((1 - Math.pow(1 - p, 3)) * target)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [visible, target, duration])
  return <span ref={ref}>{prefix}{decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString()}{suffix}</span>
}

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.1 }); obs.observe(el); return () => obs.disconnect() }, [])
  return <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>{children}</div>
}

const C = {
  black: "#0a0a0a", dark: "#262626", mid: "#525252", light: "#737373",
  muted: "#a3a3a3", line: "#e5e5e5", off: "#fafafa", white: "#fff",
  red: "#991B1B", crimson: "#DC2626", amber: "#B45309",
  blue: "#0369A1", navy: "#1B1B3A", teal: "#047857",
}

/* ═══════════════════════════════════════════════════
   001: BORROWER BUBBLES — Force layout with radial glow
   ═══════════════════════════════════════════════════ */
export function BorrowerBubbles() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.2)
  const [active, setActive] = useState<any>(null)

  const data = [
    { id: "Angola", loans: 42.6, risk: "high", note: "Largest borrower. Oil-backed. $4.9B deferrals." },
    { id: "Ethiopia", loans: 14.5, risk: "crisis", note: "Defaulted 2024. Addis\u2013Djibouti rail handed over." },
    { id: "Egypt", loans: 9.7, risk: "moderate", note: "Strategic BRI partner. $4.8B new in H1 2025." },
    { id: "Nigeria", loans: 9.6, risk: "moderate", note: "$20B Ogidigben gas deal. +12,235% engagement." },
    { id: "Kenya", loans: 9.6, risk: "high", note: "SGR $5B. Owes $8B+. Debt = 67% GDP." },
    { id: "Zambia", loans: 9.5, risk: "crisis", note: "First African sovereign default (2020)." },
    { id: "Rep Congo", loans: 7.3, risk: "high", note: "$23.1B construction (2025). Oil-backed." },
    { id: "S Africa", loans: 6.9, risk: "low", note: "BRICS partner. Tech transfer. Not debt-driven." },
    { id: "Cameroon", loans: 5.9, risk: "moderate", note: "Kribi Deepwater Port. Engagement dropped." },
    { id: "Djibouti", loans: 1.4, risk: "critical", note: "China\u2019s only Africa military base. 57% debt." },
  ]

  const riskColor: Record<string, string> = { low: C.teal, moderate: C.blue, high: C.amber, crisis: C.crimson, critical: C.red }

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()
    const W = 820, H = 440
    const scale = d3.scaleSqrt().domain([0, 45]).range([14, 84])
    const nodes = data.map(d => ({ ...d, r: scale(d.loans) }))
    const sim = d3.forceSimulation(nodes as any)
      .force("x", d3.forceX(W / 2).strength(0.04))
      .force("y", d3.forceY(H / 2).strength(0.04))
      .force("collide", d3.forceCollide((d: any) => d.r + 5).strength(0.85))
      .stop()
    for (let i = 0; i < 300; i++) sim.tick()
    const defs = svg.append("defs")
    const glow = defs.append("filter").attr("id", "b-glow")
    glow.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur")
    const mg = glow.append("feMerge")
    mg.append("feMergeNode").attr("in", "blur")
    mg.append("feMergeNode").attr("in", "SourceGraphic")
    nodes.forEach(d => {
      const grad = defs.append("radialGradient").attr("id", `bg-${d.id.replace(/\s/g, "")}`)
      grad.append("stop").attr("offset", "0%").attr("stop-color", riskColor[d.risk]).attr("stop-opacity", 0.95)
      grad.append("stop").attr("offset", "100%").attr("stop-color", riskColor[d.risk]).attr("stop-opacity", 0.55)
    })
    const g = svg.append("g")
    const groups = g.selectAll("g.node").data(nodes).enter().append("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer")
      .on("mouseenter", function(_, d: any) {
        setActive(d)
        d3.select(this).select("circle").transition().duration(200).attr("r", d.r + 4).attr("filter", "url(#b-glow)")
        g.selectAll("g.node").filter((n: any) => n.id !== d.id).transition().duration(200).attr("opacity", 0.2)
      })
      .on("mouseleave", function(_, d: any) {
        setActive(null)
        d3.select(this).select("circle").transition().duration(200).attr("r", d.r).attr("filter", "none")
        g.selectAll("g.node").transition().duration(200).attr("opacity", 1)
      })
    groups.append("circle").attr("r", 0)
      .attr("fill", (d: any) => `url(#bg-${d.id.replace(/\s/g, "")})`)
      .attr("stroke", (d: any) => riskColor[d.risk]).attr("stroke-width", 1.5).attr("stroke-opacity", 0.3)
      .transition().duration(900).delay((_, i) => i * 70).ease(d3.easeBackOut.overshoot(1.2))
      .attr("r", (d: any) => d.r)
    groups.filter((d: any) => d.r > 30).append("text")
      .attr("text-anchor", "middle").attr("dy", -6)
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 9).attr("fill", "#fff").attr("font-weight", 700)
      .text((d: any) => d.id).attr("opacity", 0).transition().delay((_, i) => 600 + i * 70).duration(400).attr("opacity", 1)
    groups.filter((d: any) => d.r > 30).append("text")
      .attr("text-anchor", "middle").attr("dy", 10)
      .attr("font-family", "'Instrument Serif', Georgia, serif").attr("font-size", 13).attr("fill", "#fff").attr("fill-opacity", 0.8)
      .text((d: any) => `$${d.loans}B`).attr("opacity", 0).transition().delay((_, i) => 700 + i * 70).duration(400).attr("opacity", 1)
  }, [visible])

  return (
    <div ref={ref}>
      <div style={{ position: "relative" }}>
        <svg ref={svgRef} viewBox="0 0 820 440" style={{ width: "100%", height: "auto" }} />
        {active && (
          <div style={{ position: "absolute", top: 12, right: 12, background: C.white, border: `1px solid ${C.line}`, padding: "12px 16px", maxWidth: 250, zIndex: 10 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: riskColor[active.risk], margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>{active.risk} risk</p>
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 32, color: C.black, margin: "4px 0", lineHeight: 1 }}>${active.loans}B</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, color: C.black, margin: 0 }}>{active.id}</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: C.mid, margin: "6px 0 0", lineHeight: 1.5 }}>{active.note}</p>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 10 }}>
        {Object.entries(riskColor).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: v }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.06em", color: C.light }}>{k}</span>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-[#737373] mt-3 italic">Bubble size = cumulative loan value (2000–2023). Source: Boston University CARI. © Dancing with Lions</p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   002: SECTOR RADIAL — Visual Cinnamon donut
   ═══════════════════════════════════════════════════ */
export function SectorRadial() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)
  const [active, setActive] = useState<any>(null)
  const data = [
    { sector: "Energy", value: 62.72, color: "#DC2626", detail: "Oil-backed loans, hydropower, solar/wind. Angola alone: $42.6B." },
    { sector: "Transport", value: 52.65, color: "#0369A1", detail: "10,000+ km railways. 100,000+ km roads. ~100 ports." },
    { sector: "ICT", value: 15.67, color: "#7B2D8E", detail: "Huawei networks, submarine cables, data centres, surveillance." },
    { sector: "Finance", value: 11.98, color: "#047857", detail: "Loans to African multilateral and national banks." },
    { sector: "Mining", value: 7.8, color: "#B45309", detail: "Cobalt (DRC), copper (Zambia), lithium. EV supply chain." },
    { sector: "Manufacturing", value: 4.5, color: "#525252", detail: "EV batteries, solar panels. Factories relocating to bypass US tariffs." },
  ]
  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()
    const size = 320, cx = size / 2, cy = size / 2
    const outerR = size / 2 - 12, innerR = outerR * 0.38
    const g = svg.append("g").attr("transform", `translate(${cx},${cy})`)
    const defs = svg.append("defs")
    const glowF = defs.append("filter").attr("id", "s-glow")
    glowF.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "blur")
    const m2 = glowF.append("feMerge")
    m2.append("feMergeNode").attr("in", "blur")
    m2.append("feMergeNode").attr("in", "SourceGraphic")
    data.forEach(d => {
      const grad = defs.append("radialGradient").attr("id", `sec-${d.sector}`).attr("cx", "30%").attr("cy", "30%")
      grad.append("stop").attr("offset", "0%").attr("stop-color", d.color).attr("stop-opacity", 1)
      grad.append("stop").attr("offset", "100%").attr("stop-color", d.color).attr("stop-opacity", 0.65)
    })
    const pie = d3.pie<typeof data[0]>().value(d => d.value).sort(null).padAngle(0.025)
    const arc = d3.arc<d3.PieArcDatum<typeof data[0]>>().innerRadius(innerR).outerRadius(outerR)
    const arcHover = d3.arc<d3.PieArcDatum<typeof data[0]>>().innerRadius(innerR - 2).outerRadius(outerR + 8)
    const paths = g.selectAll("path").data(pie(data)).enter().append("path")
      .attr("fill", d => `url(#sec-${d.data.sector})`)
      .attr("stroke", C.white).attr("stroke-width", 2).style("cursor", "pointer")
    paths.transition().duration(1200).ease(d3.easeCubicOut)
      .attrTween("d", function(d) {
        const interp = d3.interpolate({ startAngle: d.startAngle, endAngle: d.startAngle } as any, d)
        return (t: number) => arc(interp(t)) || ""
      })
    paths.on("mouseenter", function(_, d) {
      d3.select(this).transition().duration(200).attr("d", arcHover as any).attr("filter", "url(#s-glow)")
      paths.filter((n: any) => n.data.sector !== d.data.sector).transition().duration(200).attr("opacity", 0.2)
      setActive(d.data)
    }).on("mouseleave", function() {
      d3.select(this).transition().duration(200).attr("d", arc as any).attr("filter", "none")
      paths.transition().duration(200).attr("opacity", 1)
      setActive(null)
    })
    g.append("text").attr("text-anchor", "middle").attr("dy", -6)
      .attr("font-family", "'Instrument Serif', Georgia, serif").attr("font-size", 18).attr("fill", C.black).attr("font-style", "italic")
      .text("$182.3B")
    g.append("text").attr("text-anchor", "middle").attr("dy", 12)
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 8).attr("fill", C.muted).attr("letter-spacing", "0.08em")
      .text("TOTAL LOANS")
  }, [visible])

  return (
    <div ref={ref} style={{ display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", opacity: visible ? 1 : 0, transition: "opacity 0.8s" }}>
      <svg ref={svgRef} viewBox="0 0 320 320" style={{ width: 320, height: 320, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 200 }}>
        {active ? (
          <div>
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 48, color: active.color, lineHeight: 1, margin: 0 }}>${active.value}B</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, fontWeight: 700, color: C.black, margin: "6px 0 0" }}>{active.sector}</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: C.mid, margin: "6px 0 0", lineHeight: 1.6, maxWidth: 300 }}>{active.detail}</p>
          </div>
        ) : (
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: C.light, fontStyle: "italic" }}>Hover the chart to explore sectors</p>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 24 }}>
          {data.map(d => (
            <div key={d.sector} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}
              onMouseEnter={() => setActive(d)} onMouseLeave={() => setActive(null)}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: d.color, opacity: active && active.sector !== d.sector ? 0.2 : 1, transition: "opacity 0.2s" }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: C.dark, opacity: active && active.sector !== d.sector ? 0.3 : 1, transition: "opacity 0.2s" }}>
                {d.sector} — ${d.value}B
              </span>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-[#737373] mt-4 italic">Source: Boston University CARI (2000–2023). © Dancing with Lions</p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   003: ENGAGEMENT SURGE — Animated bars 2013–2025
   ═══════════════════════════════════════════════════ */
export function EngagementSurge() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)
  const [hovered, setHovered] = useState<any>(null)
  const data = [
    { year: 2013, value: 18.2, note: "BRI launched" },
    { year: 2014, value: 22.1, note: null },
    { year: 2015, value: 28.5, note: "Peak lending era" },
    { year: 2016, value: 32.0, note: "Djibouti base opens" },
    { year: 2017, value: 30.8, note: "Kenya SGR opens" },
    { year: 2018, value: 26.5, note: "Addis–Djibouti rail" },
    { year: 2019, value: 18.9, note: "Lending slows" },
    { year: 2020, value: 9.1, note: "COVID. Zambia defaults." },
    { year: 2021, value: 8.5, note: "'Small and beautiful'" },
    { year: 2022, value: 10.3, note: "Recovery" },
    { year: 2023, value: 16.1, note: "Largest lending since 2019" },
    { year: 2024, value: 24.8, note: "FOCAC: ¥360B over 3 years" },
    { year: 2025, value: 61.2, note: "+283%. Record. Nigeria $20B." },
  ]
  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()
    const W = 880, H = 380, m = { top: 24, right: 30, bottom: 45, left: 50 }
    const w = W - m.left - m.right, h = H - m.top - m.bottom
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`)
    const x = d3.scaleBand().domain(data.map(d => String(d.year))).range([0, w]).padding(0.24)
    const y = d3.scaleLinear().domain([0, 70]).range([h, 0])
    g.selectAll(".grid").data(y.ticks(5)).enter().append("line")
      .attr("x1", 0).attr("x2", w).attr("y1", (d: number) => y(d)).attr("y2", (d: number) => y(d))
      .attr("stroke", C.line).attr("stroke-dasharray", "3,3")
    g.selectAll(".ylabel").data(y.ticks(5)).enter().append("text")
      .attr("x", -8).attr("y", (d: number) => y(d)).attr("text-anchor", "end").attr("dominant-baseline", "middle")
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 10).attr("fill", C.light)
      .text((d: number) => `$${d}B`)
    g.selectAll(".xlabel").data(data).enter().append("text")
      .attr("x", d => (x(String(d.year)) || 0) + x.bandwidth() / 2).attr("y", h + 25).attr("text-anchor", "middle")
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 9)
      .attr("fill", d => d.year === 2025 ? C.crimson : C.light).attr("font-weight", d => d.year === 2025 ? "700" : "400")
      .text(d => `'${String(d.year).slice(-2)}`)
    const defs = svg.append("defs")
    const grad = defs.append("linearGradient").attr("id", "bar25").attr("x1", 0).attr("y1", 1).attr("x2", 0).attr("y2", 0)
    grad.append("stop").attr("offset", "0%").attr("stop-color", C.crimson)
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#FF4444")
    g.selectAll(".bar").data(data).enter().append("rect")
      .attr("x", d => x(String(d.year)) || 0).attr("width", x.bandwidth())
      .attr("y", h).attr("height", 0).attr("rx", 3)
      .attr("fill", d => d.year === 2025 ? "url(#bar25)" : d.year >= 2020 && d.year <= 2022 ? "#d4d4d4" : C.red)
      .transition().duration(800).delay((_, i) => i * 50).ease(d3.easeCubicOut)
      .attr("y", d => y(d.value)).attr("height", d => h - y(d.value))
    const x25 = (x("2025") || 0) + x.bandwidth() / 2
    g.append("text").attr("x", x25).attr("y", y(61.2) - 12).attr("text-anchor", "middle")
      .attr("font-family", "'Instrument Serif', Georgia, serif").attr("font-size", 14).attr("fill", C.crimson).attr("font-style", "italic")
      .text("$61.2B").attr("opacity", 0).transition().delay(1200).duration(400).attr("opacity", 1)
    g.append("text").attr("x", x25).attr("y", y(61.2) - 26).attr("text-anchor", "middle")
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 9).attr("fill", C.crimson).attr("font-weight", 700)
      .text("+283%").attr("opacity", 0).transition().delay(1400).duration(400).attr("opacity", 1)
    const x20 = (x("2020") || 0) + x.bandwidth() / 2
    g.append("text").attr("x", x20).attr("y", y(9.1) - 8).attr("text-anchor", "middle")
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 8).attr("fill", "#a3a3a3")
      .text("COVID").attr("opacity", 0).transition().delay(1000).duration(400).attr("opacity", 1)
    g.selectAll(".hover-rect").data(data).enter().append("rect")
      .attr("x", d => x(String(d.year)) || 0).attr("width", x.bandwidth())
      .attr("y", 0).attr("height", h).attr("fill", "transparent").style("cursor", "pointer")
      .on("mouseenter", (_, d) => setHovered(d))
      .on("mouseleave", () => setHovered(null))
  }, [visible])
  return (
    <div ref={ref}>
      <div style={{ position: "relative" }}>
        <svg ref={svgRef} viewBox="0 0 880 380" style={{ width: "100%", height: "auto" }} />
        {hovered && (
          <div style={{ position: "absolute", top: 8, right: 8, background: C.white, border: `1px solid ${C.line}`, padding: "10px 14px", maxWidth: 220 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700, color: hovered.year === 2025 ? C.crimson : C.black, margin: 0 }}>{hovered.year}</p>
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: C.black, margin: "2px 0" }}>${hovered.value}B</p>
            {hovered.note && <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.mid, margin: 0, lineHeight: 1.5 }}>{hovered.note}</p>}
          </div>
        )}
      </div>
      <p className="text-[9px] text-[#737373] mt-3 italic">Source: Green Finance & Development Center / Griffith Asia Institute. Engagement = investment + construction. © Dancing with Lions</p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   004: DEBT COMPARISON — Horizontal bars + zero callout
   ═══════════════════════════════════════════════════ */
export function DebtComparison() {
  const { ref, visible } = useInView(0.3)
  const rows = [
    { label: "Private Western creditors", value: 35, color: "#525252", note: "Eurobonds, commercial banks. 3× more than China. Double the interest rate." },
    { label: "Multilateral (World Bank, IMF)", value: 32, color: C.blue, note: "Concessional rates but conditionality." },
    { label: "Other bilateral", value: 21, color: C.amber, note: "France, Japan, India, Gulf states." },
    { label: "China (bilateral)", value: 12, color: C.crimson, note: "~12% of Africa's external debt." },
  ]
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "all 0.8s ease" }}>
      {rows.map((r, i) => (
        <div key={r.label} style={{ marginBottom: 22, opacity: visible ? 1 : 0, transition: `opacity 0.6s ease ${i * 0.12}s` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, color: C.black }}>{r.label}</span>
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: r.color, fontStyle: "italic" }}>{r.value}%</span>
          </div>
          <div style={{ height: 10, background: C.off, overflow: "hidden" }}>
            <div style={{
              height: "100%", background: r.color,
              width: visible ? `${(r.value / 35) * 100}%` : "0%",
              transition: `width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + i * 0.12}s`
            }} />
          </div>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.light, marginTop: 4, lineHeight: 1.5 }}>{r.note}</p>
        </div>
      ))}
      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 16, marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, color: C.crimson, margin: 0, fontStyle: "italic" }}>0</p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.light, margin: "2px 0 0" }}>Assets seized by China in Africa</p>
        </div>
        <div>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 36, color: C.teal, margin: 0, fontStyle: "italic" }}>$3.4B</p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.light, margin: "2px 0 0" }}>Chinese debt cancelled (2000–2019)</p>
        </div>
      </div>
      <p className="text-[9px] text-[#737373] mt-6 italic">Sources: Debt Justice Group (2022), Boston University CARI, World Bank, Rhodium Group. © Dancing with Lions</p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   005: LANDMARK PROJECTS — Expandable list + cost bars
   ═══════════════════════════════════════════════════ */
export function LandmarkProjects() {
  const { ref, visible } = useInView(0.2)
  const [expanded, setExpanded] = useState<string | null>(null)
  const data = [
    { project: "Ogidigben Gas Park", country: "Nigeria", cost: 20, year: "Under construction", detail: "Single largest BRI construction contract in Africa. Drove engagement up 12,235%.", color: C.crimson },
    { project: "Mombasa–Nairobi SGR", country: "Kenya", cost: 5, year: "2017", detail: "472km. Journey cut from 10hrs to 4hrs. Revenue below projections. Phase 2 stalled.", color: C.red },
    { project: "Addis–Djibouti Rail", country: "Ethiopia–Djibouti", cost: 4.5, year: "2018", detail: "First electrified transnational railway in East Africa. 756km. Handed to African management May 2025.", color: C.blue },
    { project: "Tanzania SGR", country: "Tanzania", cost: 2.7, year: "Under construction", detail: "Dar es Salaam to Morogoro (300km). Phase 1 of planned 1,219km route to Lake Victoria.", color: C.blue },
    { project: "Lekki Deepwater Port", country: "Nigeria", cost: 1.5, year: "2023", detail: "Deepest port in West Africa. 65% Chinese consortium. 2.7M TEU capacity.", color: C.amber },
    { project: "Kribi Deepwater Port", country: "Cameroon", cost: 1.3, year: "2018", detail: "First deepwater port in Cameroon. Phase 2 underway. Central Africa gateway.", color: C.amber },
    { project: "Maputo–Katembe Bridge", country: "Mozambique", cost: 0.786, year: "2018", detail: "Africa's longest suspension bridge (3km). Replaced 160km unpaved road. 95% Chinese-financed.", color: C.mid },
    { project: "Nairobi Expressway", country: "Kenya", cost: 0.668, year: "2022", detail: "27km toll road. Revenue to Chinese operator for 27 years. Usage below forecasts.", color: C.mid },
    { project: "Doraleh Port", country: "Djibouti", cost: 0.59, year: "2017", detail: "Adjacent to China's only overseas naval base in Africa. Bab el-Mandeb strait chokepoint.", color: C.black },
  ]
  const maxCost = 20
  return (
    <div ref={ref}>
      {data.map((d, i) => (
        <div key={d.project}
          style={{
            borderBottom: `1px solid ${C.line}`, padding: "14px 0", cursor: "pointer",
            opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)",
            transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`
          }}
          onClick={() => setExpanded(expanded === d.project ? null : d.project)}
        >
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600, color: C.black, margin: 0 }}>{d.project}</p>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.light, margin: "2px 0 0" }}>{d.country} · {d.year}</p>
            </div>
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: d.color, margin: 0, fontStyle: "italic", whiteSpace: "nowrap" }}>${d.cost}B</p>
          </div>
          <div style={{ height: 4, background: C.off, marginTop: 8, overflow: "hidden" }}>
            <div style={{
              height: "100%", background: d.color,
              width: visible ? `${(d.cost / maxCost) * 100}%` : "0%",
              transition: `width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.4 + i * 0.06}s`
            }} />
          </div>
          {expanded === d.project && (
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: C.mid, margin: "10px 0 0", lineHeight: 1.6, maxWidth: 560 }}>{d.detail}</p>
          )}
        </div>
      ))}
      <p className="text-[9px] text-[#737373] mt-4 italic">Click to expand. Source: Boston University, Green Finance & Development Center. © Dancing with Lions</p>
    </div>
  )
}
