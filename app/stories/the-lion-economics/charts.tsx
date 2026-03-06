"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

/* ═══════════════════════════════════════════════════
   D3 CHARTS — The Last Lions
   Conservation economics. The failure mapped.
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
  blue: "#0369A1", teal: "#047857", gold: "#A16207",
}

/* ═══════════════════════════════════════════════════
   001: POPULATION COLLAPSE — Area chart bleeding down
   200,000 (1900) → 23,000 (2025)
   ═══════════════════════════════════════════════════ */
export function PopulationCollapse() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.2)
  const [hovered, setHovered] = useState<any>(null)

  const data = [
    { year: 1900, pop: 200000, note: "Lions roam from Senegal to India" },
    { year: 1950, pop: 100000, note: "Colonial hunting, habitat conversion" },
    { year: 1970, pop: 92000, note: "Post-independence. Parks established." },
    { year: 1980, pop: 75000, note: "Agriculture accelerates range loss" },
    { year: 1990, pop: 50000, note: "Conflict, poaching, bushmeat trade" },
    { year: 2000, pop: 39000, note: "IUCN lists as Vulnerable" },
    { year: 2006, pop: 33292, note: "First rigorous continent-wide survey" },
    { year: 2012, pop: 30000, note: "Extinct in 12 countries. Range = 8%" },
    { year: 2018, pop: 25105, note: "25% decline in 12 years" },
    { year: 2025, pop: 23000, note: "Extinct in 26 countries. Range = 7%" },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()
    const W = 880, H = 400, m = { top: 30, right: 40, bottom: 50, left: 65 }
    const w = W - m.left - m.right, h = H - m.top - m.bottom
    const g = svg.append("g").attr("transform", `translate(${m.left},${m.top})`)
    const defs = svg.append("defs")

    const x = d3.scaleLinear().domain([1900, 2025]).range([0, w])
    const y = d3.scaleLinear().domain([0, 220000]).range([h, 0])

    // Gradient fill
    const grad = defs.append("linearGradient").attr("id", "pop-fill").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 1)
    grad.append("stop").attr("offset", "0%").attr("stop-color", C.crimson).attr("stop-opacity", 0.25)
    grad.append("stop").attr("offset", "100%").attr("stop-color", C.crimson).attr("stop-opacity", 0.02)

    // Grid
    g.selectAll(".grid").data(y.ticks(5)).enter().append("line")
      .attr("x1", 0).attr("x2", w).attr("y1", (d: number) => y(d)).attr("y2", (d: number) => y(d))
      .attr("stroke", C.line).attr("stroke-dasharray", "3,3")

    // Y labels
    g.selectAll(".ylabel").data(y.ticks(5)).enter().append("text")
      .attr("x", -10).attr("y", (d: number) => y(d)).attr("text-anchor", "end").attr("dominant-baseline", "middle")
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 10).attr("fill", C.light)
      .text((d: number) => d === 0 ? "0" : `${(d / 1000).toFixed(0)}k`)

    // X labels
    g.selectAll(".xlabel").data([1900, 1950, 1970, 1990, 2006, 2018, 2025]).enter().append("text")
      .attr("x", (d: number) => x(d)).attr("y", h + 30).attr("text-anchor", "middle")
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 9)
      .attr("fill", (d: number) => d === 2025 ? C.crimson : C.light)
      .attr("font-weight", (d: number) => d === 2025 ? "700" : "400")
      .text((d: number) => String(d))

    // Area
    const area = d3.area<typeof data[0]>()
      .x(d => x(d.year)).y0(h).y1(d => y(d.pop))
      .curve(d3.curveMonotoneX)

    const line = d3.line<typeof data[0]>()
      .x(d => x(d.year)).y(d => y(d.pop))
      .curve(d3.curveMonotoneX)

    // Clip for animation
    const clip = defs.append("clipPath").attr("id", "pop-clip")
    clip.append("rect").attr("x", 0).attr("y", 0).attr("height", h + 10)
      .attr("width", 0).transition().duration(2000).ease(d3.easeCubicOut)
      .attr("width", w + 10)

    g.append("path").datum(data).attr("d", area)
      .attr("fill", "url(#pop-fill)").attr("clip-path", "url(#pop-clip)")

    g.append("path").datum(data).attr("d", line)
      .attr("fill", "none").attr("stroke", C.crimson).attr("stroke-width", 2.5)
      .attr("clip-path", "url(#pop-clip)")

    // Data points
    g.selectAll(".dot").data(data).enter().append("circle")
      .attr("cx", d => x(d.year)).attr("cy", d => y(d.pop)).attr("r", 0)
      .attr("fill", C.white).attr("stroke", C.crimson).attr("stroke-width", 2)
      .style("cursor", "pointer")
      .transition().delay((_, i) => 800 + i * 120).duration(300)
      .attr("r", 4)

    // Hover rects
    g.selectAll(".hover-rect").data(data).enter().append("rect")
      .attr("x", (d, i) => i === 0 ? 0 : x(d.year) - (x(d.year) - x(data[Math.max(0, i - 1)].year)) / 2)
      .attr("width", (d, i) => {
        const left = i === 0 ? 0 : (x(d.year) - x(data[Math.max(0, i - 1)].year)) / 2
        const right = i === data.length - 1 ? w - x(d.year) : (x(data[Math.min(data.length - 1, i + 1)].year) - x(d.year)) / 2
        return left + right
      })
      .attr("y", 0).attr("height", h).attr("fill", "transparent").style("cursor", "pointer")
      .on("mouseenter", (_, d) => setHovered(d))
      .on("mouseleave", () => setHovered(null))

    // Annotation: -88%
    g.append("text").attr("x", x(1960)).attr("y", y(120000))
      .attr("font-family", "'Instrument Serif', Georgia, serif").attr("font-size", 48).attr("fill", C.crimson).attr("fill-opacity", 0.15)
      .attr("font-style", "italic").text("\u221288%")
      .attr("opacity", 0).transition().delay(2000).duration(600).attr("opacity", 1)

  }, [visible])

  return (
    <div ref={ref}>
      <div style={{ position: "relative" }}>
        <svg ref={svgRef} viewBox="0 0 880 400" style={{ width: "100%", height: "auto" }} />
        {hovered && (
          <div style={{ position: "absolute", top: 8, right: 8, background: C.white, border: `1px solid ${C.line}`, padding: "10px 14px", maxWidth: 240 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700, color: C.crimson, margin: 0 }}>{hovered.year}</p>
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: C.black, margin: "2px 0" }}>{hovered.pop.toLocaleString()}</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.mid, margin: 0, lineHeight: 1.5 }}>{hovered.note}</p>
          </div>
        )}
      </div>
      <p className="text-[9px] text-[#737373] mt-3 italic">Sources: Riggio et al. (2013), Bauer et al. (2018), Loveridge et al. (2022), IUCN CatSG (2025), LionAid (2025). \u00a9 Dancing with Lions</p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   002: COUNTRY BUBBLES — Who holds the last prides
   ═══════════════════════════════════════════════════ */
export function CountryBubbles() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.2)
  const [active, setActive] = useState<any>(null)

  const data = [
    { id: "Tanzania", pop: 14500, region: "east", note: "Largest population. Serengeti, Ruaha, Ngorongoro. Trophy hunting generates $75M." },
    { id: "South Africa", pop: 3284, region: "south", note: "Mostly fenced reserves. 7,800+ captive lions. Canned hunting controversy." },
    { id: "Botswana", pop: 3063, region: "south", note: "Okavango delta hunters. Community conservancies. Trophy hunting debated." },
    { id: "Kenya", pop: 2515, region: "east", note: "Banned hunting 1977. ~100 retaliatory kills/year in Maasai Mara." },
    { id: "Zambia", pop: 2349, region: "south", note: "Kafue NP recovering. Panthera anti-poaching. Snare bycatch." },
    { id: "Zimbabwe", pop: 1700, region: "south", note: "Cecil killed 2015. Hwange NP. Post-Mugabe uncertainty." },
    { id: "Mozambique", pop: 1100, region: "south", note: "Niassa Reserve. Anti-poaching patrols. 1,000+ lions." },
    { id: "Ethiopia", pop: 1000, region: "east", note: "Genetic suture zone. Poorly surveyed. Conflict areas." },
    { id: "Uganda", pop: 400, region: "east", note: "Tree-climbing lions. Rebounded from 12 to 130+ in Murchison Falls." },
    { id: "Namibia", pop: 800, region: "south", note: "Desert-adapted lions recovered: 20 \u2192 150+. Community conservancies." },
    { id: "India", pop: 674, region: "asia", note: "Gir Forest. Only Asian population. Recovered from 180 (1974)." },
    { id: "DRC", pop: 300, region: "west", note: "Conflict zone. Virtually unsurveyed. Virunga NP." },
    { id: "Cameroon", pop: 250, region: "west", note: "B\u00e9nou\u00e9 Complex. Declining. European operators." },
    { id: "Benin", pop: 100, region: "west", note: "Pendjari NP. Last W. African stronghold. African Parks manages." },
    { id: "CAR", pop: 10, region: "west", note: "Civil war. Functionally extinct." },
  ]

  const regionColor: Record<string, string> = { east: C.amber, south: C.teal, west: C.crimson, asia: C.blue }

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()
    const W = 820, H = 460
    const scale = d3.scaleSqrt().domain([0, 15000]).range([8, 90])
    const nodes = data.map(d => ({ ...d, r: scale(d.pop) }))

    const sim = d3.forceSimulation(nodes as any)
      .force("x", d3.forceX(W / 2).strength(0.04))
      .force("y", d3.forceY(H / 2).strength(0.04))
      .force("collide", d3.forceCollide((d: any) => d.r + 4).strength(0.85))
      .stop()
    for (let i = 0; i < 300; i++) sim.tick()

    const defs = svg.append("defs")
    const glow = defs.append("filter").attr("id", "l-glow")
    glow.append("feGaussianBlur").attr("stdDeviation", "4").attr("result", "blur")
    const mg = glow.append("feMerge")
    mg.append("feMergeNode").attr("in", "blur")
    mg.append("feMergeNode").attr("in", "SourceGraphic")

    nodes.forEach(d => {
      const grad = defs.append("radialGradient").attr("id", `lb-${d.id.replace(/\s/g, "")}`)
      grad.append("stop").attr("offset", "0%").attr("stop-color", regionColor[d.region]).attr("stop-opacity", 0.9)
      grad.append("stop").attr("offset", "100%").attr("stop-color", regionColor[d.region]).attr("stop-opacity", 0.5)
    })

    const g = svg.append("g")
    const groups = g.selectAll("g.node").data(nodes).enter().append("g")
      .attr("class", "node").attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer")
      .on("mouseenter", function(_, d: any) {
        setActive(d)
        d3.select(this).select("circle").transition().duration(200).attr("r", d.r + 4).attr("filter", "url(#l-glow)")
        g.selectAll("g.node").filter((n: any) => n.id !== d.id).transition().duration(200).attr("opacity", 0.2)
      })
      .on("mouseleave", function(_, d: any) {
        setActive(null)
        d3.select(this).select("circle").transition().duration(200).attr("r", d.r).attr("filter", "none")
        g.selectAll("g.node").transition().duration(200).attr("opacity", 1)
      })

    groups.append("circle").attr("r", 0)
      .attr("fill", (d: any) => `url(#lb-${d.id.replace(/\s/g, "")})`)
      .attr("stroke", (d: any) => regionColor[d.region]).attr("stroke-width", 1.5).attr("stroke-opacity", 0.3)
      .transition().duration(900).delay((_, i) => i * 60).ease(d3.easeBackOut.overshoot(1.2))
      .attr("r", (d: any) => d.r)

    groups.filter((d: any) => d.r > 24).append("text")
      .attr("text-anchor", "middle").attr("dy", -5)
      .attr("font-family", "'IBM Plex Mono', monospace").attr("font-size", 9).attr("fill", "#fff").attr("font-weight", 700)
      .text((d: any) => d.id).attr("opacity", 0).transition().delay((_, i) => 600 + i * 60).duration(400).attr("opacity", 1)

    groups.filter((d: any) => d.r > 24).append("text")
      .attr("text-anchor", "middle").attr("dy", 10)
      .attr("font-family", "'Instrument Serif', Georgia, serif").attr("font-size", 12).attr("fill", "#fff").attr("fill-opacity", 0.8)
      .text((d: any) => d.pop.toLocaleString()).attr("opacity", 0).transition().delay((_, i) => 700 + i * 60).duration(400).attr("opacity", 1)
  }, [visible])

  return (
    <div ref={ref}>
      <div style={{ position: "relative" }}>
        <svg ref={svgRef} viewBox="0 0 820 460" style={{ width: "100%", height: "auto" }} />
        {active && (
          <div style={{ position: "absolute", top: 12, right: 12, background: C.white, border: `1px solid ${C.line}`, padding: "12px 16px", maxWidth: 260, zIndex: 10 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: regionColor[active.region], margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>{active.region} africa{active.region === 'asia' ? '' : ''}</p>
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 32, color: C.black, margin: "4px 0", lineHeight: 1 }}>{active.pop.toLocaleString()}</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, color: C.black, margin: 0 }}>{active.id}</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: C.mid, margin: "6px 0 0", lineHeight: 1.5 }}>{active.note}</p>
          </div>
        )}
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 10 }}>
        {[["East Africa", C.amber], ["Southern Africa", C.teal], ["West & Central", C.crimson], ["Asia", C.blue]].map(([l, c]) => (
          <div key={l as string} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: c as string }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.06em", color: C.light }}>{l}</span>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-[#737373] mt-3 italic">Bubble size = estimated lion population. Sources: IUCN CatSG (2025), World Population Review, LionAid. \u00a9 Dancing with Lions</p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   003: THE ECONOMICS — What lions earn vs what they cost
   ═══════════════════════════════════════════════════ */
export function ConservationEconomics() {
  const { ref, visible } = useInView(0.3)

  const rows = [
    { label: "Safari tourism (Africa)", value: "$20.5B", sub: "2025 market. Growing 6.7% CAGR.", color: C.teal, bar: 100 },
    { label: "Wildlife tourism share of GDP", value: "8.5%", sub: "24 million jobs. 80% cite wildlife as reason.", color: C.teal, bar: 42 },
    { label: "Funding needed for lion PAs", value: "$1.0B/yr", sub: "To secure lions in protected areas. 2018 Lindsey et al.", color: C.crimson, bar: 5 },
    { label: "Current PA funding", value: "$381M/yr", sub: "90% of lion protected areas underfunded.", color: C.amber, bar: 2 },
    { label: "Trophy hunting revenue", value: "~1.8%", sub: "Of total tourism revenue. 3% reaches communities.", color: C.light, bar: 1 },
  ]

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "all 0.8s ease" }}>
      {rows.map((r, i) => (
        <div key={r.label} style={{ marginBottom: 24, opacity: visible ? 1 : 0, transition: `opacity 0.6s ease ${i * 0.12}s` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, color: C.black }}>{r.label}</span>
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 24, color: r.color, fontStyle: "italic" }}>{r.value}</span>
          </div>
          <div style={{ height: 8, background: C.off, overflow: "hidden" }}>
            <div style={{
              height: "100%", background: r.color,
              width: visible ? `${r.bar}%` : "0%",
              transition: `width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + i * 0.12}s`
            }} />
          </div>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.light, marginTop: 4, lineHeight: 1.5 }}>{r.sub}</p>
        </div>
      ))}
      <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 16, marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: C.teal, margin: 0, fontStyle: "italic" }}>$1M</p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.light, margin: "2px 0 0" }}>Lifetime tourism value of one lion (Cecil estimate)</p>
        </div>
        <div>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: C.crimson, margin: 0, fontStyle: "italic" }}>$55k</p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.light, margin: "2px 0 0" }}>One-time trophy fee (Cecil\u2019s hunter paid)</p>
        </div>
        <div>
          <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: C.amber, margin: 0, fontStyle: "italic" }}>15\u00d7</p>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.light, margin: "2px 0 0" }}>Ecotourism revenue vs trophy hunting</p>
        </div>
      </div>
      <p className="text-[9px] text-[#737373] mt-6 italic">Sources: Grand View Research (2025), AWF/Lindsey et al. (2018), Economists at Large (2017), Wild Africa (2025). \u00a9 Dancing with Lions</p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   004: THE SPLIT — Two Africas for lions
   Southern stable. West/Central/East collapsing.
   ═══════════════════════════════════════════════════ */
export function RegionalSplit() {
  const { ref, visible } = useInView(0.3)

  const regions = [
    { region: "Southern Africa", status: "Stable / increasing", pop: "~10,000", countries: "Botswana, Namibia, S. Africa, Zimbabwe", color: C.teal, trend: "+11%", detail: "Fenced reserves, funded management, metapopulation strategies. But masks continental decline.", icon: "\u2197" },
    { region: "East Africa", status: "Declining", pop: "~18,000", countries: "Tanzania, Kenya, Ethiopia, Uganda", color: C.amber, trend: "\u221237%", detail: "37% chance of halving in 20 years. Retaliatory killing, prey depletion, infrastructure expansion.", icon: "\u2198" },
    { region: "West & Central Africa", status: "Critical", pop: "~342", countries: "Benin, Cameroon, CAR, DRC, Nigeria", color: C.crimson, trend: "\u221267%", detail: "67% chance of halving. Civil war, no wildlife departments, genetically distinct from east/south.", icon: "\u2199" },
  ]

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
        {regions.map((r, i) => (
          <div key={r.region} style={{
            border: `1px solid ${C.line}`, padding: "20px 20px 16px",
            opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)",
            transition: `all 0.6s ease ${i * 0.15}s`
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 700, color: r.color, margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>{r.status}</p>
              <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: r.color, lineHeight: 1 }}>{r.trend}</span>
            </div>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, fontWeight: 700, color: C.black, margin: "10px 0 2px" }}>{r.region}</p>
            <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 28, color: r.color, margin: "2px 0 6px", fontStyle: "italic" }}>{r.pop} lions</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.light, margin: "0 0 6px" }}>{r.countries}</p>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: C.mid, margin: 0, lineHeight: 1.6 }}>{r.detail}</p>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-[#737373] mt-4 italic">Source: Bauer et al. (PNAS 2015), LionAid 2025 Synthesis, IUCN CatSG. \u00a9 Dancing with Lions</p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   005: THREATS — What kills lions (proportional bars)
   ═══════════════════════════════════════════════════ */
export function ThreatBreakdown() {
  const { ref, visible } = useInView(0.3)

  const threats = [
    { threat: "Habitat loss & fragmentation", share: 40, color: C.crimson, detail: "93% of range lost. Agriculture, infrastructure, urbanisation. Corridors severed." },
    { threat: "Human-wildlife conflict", share: 25, color: C.amber, detail: "Retaliatory & pre-emptive killing. Poisoning livestock carcasses. ~100 killed/year in Mara alone." },
    { threat: "Prey depletion", share: 15, color: C.gold, detail: "Bushmeat trade removes prey base. Livestock replaces wild ungulates. Lions starve or turn to cattle." },
    { threat: "Poaching & illegal trade", share: 10, color: C.dark, detail: "Bones, claws, teeth for traditional medicine. 6,000+ skeletons exported from S. Africa to Asia in a decade." },
    { threat: "Trophy & canned hunting", share: 5, color: C.mid, detail: "~600 lions/year. IUCN says unsustainable. Social disruption when pride males killed." },
    { threat: "Disease & climate", share: 5, color: C.light, detail: "Canine distemper, bovine TB. Drought collapses prey. Wildfires destroy rangeland." },
  ]

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "all 0.8s ease" }}>
      {threats.map((t, i) => (
        <div key={t.threat} style={{
          display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 18,
          opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${i * 0.1}s`
        }}>
          <div style={{ width: 44, textAlign: "right", flexShrink: 0 }}>
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: t.color, fontStyle: "italic" }}>{t.share}%</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, color: C.black, margin: "0 0 4px" }}>{t.threat}</p>
            <div style={{ height: 5, background: C.off, overflow: "hidden", marginBottom: 4 }}>
              <div style={{
                height: "100%", background: t.color,
                width: visible ? `${(t.share / 40) * 100}%` : "0%",
                transition: `width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + i * 0.1}s`
              }} />
            </div>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: C.light, margin: 0, lineHeight: 1.5 }}>{t.detail}</p>
          </div>
        </div>
      ))}
      <p className="text-[9px] text-[#737373] mt-4 italic">Proportional estimates. Sources: IUCN, Panthera, WildCRU (Oxford), National Geographic. \u00a9 Dancing with Lions</p>
    </div>
  )
}
