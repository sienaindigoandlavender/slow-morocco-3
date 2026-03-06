"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

/* ═══════════════════════════════════════════════════
   BLOOD DIAMONDS — D3 Chart Components
   Death tolls, conflict events, smuggling flows
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

export function AnimCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const { ref, visible } = useInView()
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const tick = (now: number) => { const p = Math.min((now - start) / duration, 1); setVal(Math.round((1 - Math.pow(1 - p, 3)) * target)); if (p < 1) requestAnimationFrame(tick) }
    requestAnimationFrame(tick)
  }, [visible, target, duration])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

// ─── DEATH TOLL: Horizontal bars with scale ──────
export function DeathTollChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)

  const data = [
    { country: "DRC", dead: 6000000, period: "1996\u2013present", status: "active", group: "M23 / ADF / 100+ militias" },
    { country: "Angola", dead: 500000, period: "1975\u20132002", status: "ended", group: "UNITA vs MPLA" },
    { country: "Liberia", dead: 250000, period: "1989\u20132003", status: "ended", group: "Charles Taylor / NPFL" },
    { country: "Sierra Leone", dead: 75000, period: "1991\u20132002", status: "ended", group: "RUF" },
    { country: "CAR", dead: 5000, period: "2013\u2013present", status: "fragile", group: "S\u00e9l\u00e9ka / Wagner" },
    { country: "C\u00f4te d\u2019Ivoire", dead: 3000, period: "2002\u20132011", status: "ended", group: "Forces Nouvelles" },
    { country: "Zimbabwe", dead: 200, period: "2008\u2013present", status: "contested", group: "Zimbabwe National Army" },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 10, right: 120, bottom: 30, left: 130 }
    const width = 800 - margin.left - margin.right
    const height = data.length * 52
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const x = d3.scaleLog().domain([100, 7000000]).range([0, width]).clamp(true)
    const y = d3.scaleBand().domain(data.map(d => d.country)).range([0, height]).padding(0.3)

    // Grid lines (log scale)
    const ticks = [1000, 10000, 100000, 1000000, 6000000]
    ticks.forEach(t => {
      g.append("line").attr("x1", x(t)).attr("x2", x(t)).attr("y1", 0).attr("y2", height)
        .attr("stroke", "#e5e5e5").attr("stroke-dasharray", "2,3")
      g.append("text").attr("x", x(t)).attr("y", height + 18).attr("text-anchor", "middle")
        .attr("fill", "#a3a3a3").attr("font-size", "9px")
        .text(t >= 1000000 ? `${t / 1000000}M` : `${t / 1000}K`)
    })

    // Country labels
    data.forEach(d => {
      const yPos = (y(d.country) || 0) + y.bandwidth() / 2
      g.append("text").attr("x", -8).attr("y", yPos + 1).attr("text-anchor", "end")
        .attr("fill", "#0a0a0a").attr("font-size", "13px").attr("font-weight", "700").text(d.country)
      g.append("text").attr("x", -8).attr("y", yPos + 14).attr("text-anchor", "end")
        .attr("fill", "#a3a3a3").attr("font-size", "9px").text(d.period)
    })

    // Bars
    const bars = g.selectAll(".bar").data(data).enter().append("g")

    bars.append("rect")
      .attr("x", 0).attr("y", d => y(d.country) || 0)
      .attr("height", y.bandwidth()).attr("rx", 3)
      .attr("width", 0)
      .attr("fill", d => d.status === "active" ? "#DC2626" : d.status === "fragile" ? "#B45309" : "#991B1B")
      .attr("opacity", d => d.status === "active" ? 0.95 : 0.75)
      .transition().duration(1200).delay((_, i) => i * 150).ease(d3.easeCubicOut)
      .attr("width", d => x(Math.max(d.dead, 200)))

    // Pulse overlay for active
    bars.filter(d => d.status === "active").append("rect")
      .attr("x", 0).attr("y", d => y(d.country) || 0)
      .attr("height", y.bandwidth()).attr("rx", 3)
      .attr("width", d => x(d.dead))
      .attr("fill", "url(#pulseGrad)")
      .attr("opacity", 0)

    // Value labels
    bars.append("text")
      .attr("x", d => x(Math.max(d.dead, 200)) + 8)
      .attr("y", d => (y(d.country) || 0) + y.bandwidth() / 2 + 1)
      .attr("fill", d => d.status === "active" ? "#DC2626" : "#991B1B")
      .attr("font-size", "13px").attr("font-weight", "700").attr("dominant-baseline", "middle")
      .attr("opacity", 0)
      .text(d => d.dead >= 1000000 ? `${(d.dead / 1000000).toFixed(0)}M+` : d.dead >= 1000 ? `${(d.dead / 1000).toFixed(0)}K+` : `${d.dead}+`)
      .transition().delay((_, i) => 1200 + i * 150).duration(400).attr("opacity", 1)

    // Status tags
    bars.append("text")
      .attr("x", d => x(Math.max(d.dead, 200)) + 8)
      .attr("y", d => (y(d.country) || 0) + y.bandwidth() / 2 + 14)
      .attr("fill", d => d.status === "active" ? "#DC2626" : d.status === "fragile" ? "#B45309" : "#737373")
      .attr("font-size", "8px").attr("font-weight", "600").attr("text-transform", "uppercase").attr("letter-spacing", "0.5")
      .attr("opacity", 0)
      .text(d => d.status.toUpperCase())
      .transition().delay((_, i) => 1400 + i * 150).duration(400).attr("opacity", 1)

    // Gradient for pulse
    const defs = svg.append("defs")
    const grad = defs.append("linearGradient").attr("id", "pulseGrad").attr("x1", "0").attr("x2", "1")
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#DC2626").attr("stop-opacity", 0)
    grad.append("stop").attr("offset", "50%").attr("stop-color", "#DC2626").attr("stop-opacity", 0.15)
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#DC2626").attr("stop-opacity", 0)

  }, [visible])

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg ref={svgRef} viewBox={`0 0 800 ${data.length * 52 + 40}`} className="w-full" style={{ minWidth: 550 }} />
    </div>
  )
}

// ─── ACLED CONFLICT: Grouped Column Chart ────────
export function ACLEDChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)

  const data = [
    { region: "N. Kivu", events: 3100, fatalities: 1300, displaced: 3800 },
    { region: "S. Kivu", events: 1500, fatalities: 800, displaced: 1200 },
    { region: "Ituri", events: 1000, fatalities: 600, displaced: 900 },
    { region: "CAR", events: 350, fatalities: 200, displaced: 400 },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 30, right: 20, bottom: 50, left: 55 }
    const width = 650 - margin.left - margin.right
    const height = 320 - margin.top - margin.bottom
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const x0 = d3.scaleBand().domain(data.map(d => d.region)).range([0, width]).padding(0.25)
    const x1 = d3.scaleBand().domain(["events", "fatalities"]).range([0, x0.bandwidth()]).padding(0.08)
    const y = d3.scaleLinear().domain([0, 3500]).range([height, 0])

    // Grid
    g.append("g").call(d3.axisLeft(y).ticks(5).tickSize(-width))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#e5e5e5"))
      .call(g => g.selectAll(".tick text").attr("fill", "#737373").attr("font-size", "10px"))
    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x0).tickSize(0))
      .call(g => g.select(".domain").attr("stroke", "#e5e5e5"))
      .call(g => g.selectAll(".tick text").attr("fill", "#0a0a0a").attr("font-size", "12px").attr("font-weight", "600"))

    const colors: Record<string, string> = { events: "#525252", fatalities: "#DC2626" }

    // Bars
    const groups = g.selectAll(".group").data(data).enter().append("g").attr("transform", d => `translate(${x0(d.region)},0)`)

    ;(["events", "fatalities"] as const).forEach(key => {
      groups.append("rect")
        .attr("x", x1(key) || 0).attr("width", x1.bandwidth())
        .attr("y", height).attr("height", 0).attr("rx", 2)
        .attr("fill", colors[key]).attr("opacity", 0.85)
        .transition().duration(1000).delay((_, i) => i * 200 + (key === "fatalities" ? 400 : 0))
        .attr("y", d => y((d as any)[key])).attr("height", d => height - y((d as any)[key]))

      // Value on top
      groups.append("text")
        .attr("x", (x1(key) || 0) + x1.bandwidth() / 2)
        .attr("y", d => y((d as any)[key]) - 6)
        .attr("text-anchor", "middle").attr("fill", colors[key]).attr("font-size", "10px").attr("font-weight", "700")
        .attr("opacity", 0)
        .text(d => `${((d as any)[key] as number).toLocaleString()}`)
        .transition().delay((_, i) => 1000 + i * 200).duration(400).attr("opacity", 1)
    })

    // Legend
    const legend = g.append("g").attr("transform", `translate(${width - 180}, -10)`)
    ;[["Conflict events", "#525252"], ["Fatalities", "#DC2626"]].forEach(([label, color], i) => {
      legend.append("rect").attr("x", i * 120).attr("y", 0).attr("width", 12).attr("height", 12).attr("rx", 2).attr("fill", color)
      legend.append("text").attr("x", i * 120 + 16).attr("y", 10).attr("fill", "#525252").attr("font-size", "10px").text(label)
    })

  }, [visible])

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg ref={svgRef} viewBox="0 0 650 320" className="w-full" style={{ minWidth: 420 }} />
    </div>
  )
}

// ─── SMUGGLING FLOW: Sankey-style ────────────────
export function SmugglingFlow() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)

  const nodes = [
    { id: "CAR", x: 0, y: 0, color: "#DC2626" },
    { id: "DRC", x: 0, y: 80, color: "#DC2626" },
    { id: "Zimbabwe", x: 0, y: 160, color: "#B45309" },
    { id: "Russia", x: 0, y: 240, color: "#525252" },
    { id: "Cameroon", x: 250, y: 0, color: "#B45309" },
    { id: "Uganda", x: 250, y: 65, color: "#B45309" },
    { id: "Rwanda", x: 250, y: 120, color: "#B45309" },
    { id: "Mozambique", x: 250, y: 175, color: "#737373" },
    { id: "India (Surat)", x: 500, y: 80, color: "#B45309" },
    { id: "Antwerp", x: 720, y: 50, color: "#0a0a0a" },
    { id: "Mumbai", x: 720, y: 130, color: "#0a0a0a" },
  ]

  const flows = [
    { from: "CAR", to: "Cameroon", width: 6, label: "False certificates" },
    { from: "DRC", to: "Uganda", width: 8, label: "Mineral smuggling" },
    { from: "DRC", to: "Rwanda", width: 6, label: "M23/RDF routes" },
    { from: "Zimbabwe", to: "Mozambique", width: 4, label: "Military channels" },
    { from: "Russia", to: "India (Surat)", width: 10, label: "Sanctions evasion" },
    { from: "Cameroon", to: "India (Surat)", width: 5, label: "" },
    { from: "Uganda", to: "India (Surat)", width: 5, label: "" },
    { from: "Rwanda", to: "India (Surat)", width: 4, label: "" },
    { from: "Mozambique", to: "India (Surat)", width: 3, label: "" },
    { from: "India (Surat)", to: "Antwerp", width: 12, label: "Origin erased" },
    { from: "India (Surat)", to: "Mumbai", width: 10, label: "Legitimate market" },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 20, bottom: 20, left: 20 }
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const nodeMap = new Map(nodes.map(n => [n.id, n]))

    // Draw flows
    flows.forEach((f, i) => {
      const from = nodeMap.get(f.from)!
      const to = nodeMap.get(f.to)!
      const path = d3.path()
      const x1 = from.x + 100, y1 = from.y + 20
      const x2 = to.x, y2 = to.y + 20
      const mx = (x1 + x2) / 2
      path.moveTo(x1, y1)
      path.bezierCurveTo(mx, y1, mx, y2, x2, y2)

      g.append("path").attr("d", path.toString())
        .attr("fill", "none").attr("stroke", from.color).attr("stroke-width", f.width)
        .attr("opacity", 0).attr("stroke-linecap", "round")
        .transition().delay(i * 120).duration(800).ease(d3.easeCubicOut)
        .attr("opacity", 0.25)

      // Flow label
      if (f.label) {
        g.append("text").attr("x", mx).attr("y", (y1 + y2) / 2 - 8)
          .attr("text-anchor", "middle").attr("fill", "#737373").attr("font-size", "8px").attr("font-style", "italic")
          .attr("opacity", 0).text(f.label)
          .transition().delay(800 + i * 120).duration(400).attr("opacity", 1)
      }
    })

    // Draw nodes
    nodes.forEach((n, i) => {
      const ng = g.append("g").attr("transform", `translate(${n.x},${n.y})`)
        .attr("opacity", 0).transition().delay(i * 80).duration(400).attr("opacity", 1)

      const sel = g.append("g").attr("transform", `translate(${n.x},${n.y})`)
      sel.append("rect").attr("width", 100).attr("height", 36).attr("rx", 4)
        .attr("fill", n.color).attr("opacity", n.x === 720 ? 0.95 : n.x === 0 ? 0.85 : 0.6)
      sel.append("text").attr("x", 50).attr("y", 22).attr("text-anchor", "middle")
        .attr("fill", "#fff").attr("font-size", "10px").attr("font-weight", "700").text(n.id)
      sel.attr("opacity", 0).transition().delay(i * 80).duration(400).attr("opacity", 1)
    })

    // Stage labels
    const stages = [
      { x: 30, label: "ORIGIN" }, { x: 270, label: "TRANSIT" },
      { x: 520, label: "CUTTING" }, { x: 740, label: "MARKET" },
    ]
    stages.forEach(s => {
      g.append("text").attr("x", s.x).attr("y", 290).attr("text-anchor", "middle")
        .attr("fill", "#a3a3a3").attr("font-size", "9px").attr("font-weight", "600")
        .attr("letter-spacing", "1.5").text(s.label)
    })

  }, [visible])

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg ref={svgRef} viewBox="0 0 800 320" className="w-full" style={{ minWidth: 600 }} />
    </div>
  )
}

// ─── KP FAILURE: Radial Score ────────────────────
export function KPFailureRadial() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)

  const failures = [
    { label: "Definition\nexcludes state", score: 0 },
    { label: "No scientific\ntraceability", score: 0 },
    { label: "Self-\ncertification", score: 0 },
    { label: "Smuggling\nroutes intact", score: 0 },
    { label: "Manufactured\nstatistic", score: 0 },
    { label: "Blockchain\ncan\u2019t fix it", score: 0 },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const cx = 200, cy = 200, outerR = 160, innerR = 60
    const g = svg.append("g").attr("transform", `translate(${cx},${cy})`)
    const n = failures.length
    const angleSlice = (Math.PI * 2) / n

    // Grid rings
    ;[0.33, 0.66, 1].forEach(pct => {
      const r = innerR + (outerR - innerR) * pct
      g.append("circle").attr("r", r).attr("fill", "none").attr("stroke", "#e5e5e5").attr("stroke-dasharray", "2,3")
    })

    // Spokes
    failures.forEach((_, i) => {
      const angle = angleSlice * i - Math.PI / 2
      g.append("line").attr("x1", 0).attr("y1", 0)
        .attr("x2", Math.cos(angle) * outerR).attr("y2", Math.sin(angle) * outerR)
        .attr("stroke", "#e5e5e5").attr("stroke-width", 1)
    })

    // Failed segments (fill to outer = 100% failure)
    const arc = d3.arc<any>().innerRadius(innerR).outerRadius(outerR)
    failures.forEach((_, i) => {
      g.append("path")
        .datum({ startAngle: angleSlice * i, endAngle: angleSlice * (i + 1) })
        .attr("d", arc as any)
        .attr("fill", "#DC2626").attr("opacity", 0)
        .transition().delay(i * 200).duration(600).ease(d3.easeCubicOut)
        .attr("opacity", 0.2)
    })

    // X marks
    failures.forEach((f, i) => {
      const angle = angleSlice * i + angleSlice / 2 - Math.PI / 2
      const labelR = outerR + 30
      const lx = Math.cos(angle) * labelR
      const ly = Math.sin(angle) * labelR

      // X icon
      const xr = innerR + (outerR - innerR) * 0.5
      const xx = Math.cos(angle) * xr, xy = Math.sin(angle) * xr
      g.append("text").attr("x", xx).attr("y", xy + 5)
        .attr("text-anchor", "middle").attr("fill", "#DC2626").attr("font-size", "18px").attr("font-weight", "900")
        .attr("opacity", 0).text("\u2716")
        .transition().delay(600 + i * 200).duration(300).attr("opacity", 1)

      // Label
      f.label.split("\n").forEach((line, li) => {
        g.append("text").attr("x", lx).attr("y", ly + li * 12)
          .attr("text-anchor", "middle").attr("fill", "#525252").attr("font-size", "9px").attr("font-weight", "600")
          .attr("opacity", 0).text(line)
          .transition().delay(800 + i * 200).duration(400).attr("opacity", 1)
      })
    })

    // Center text
    g.append("text").attr("y", -8).attr("text-anchor", "middle").attr("fill", "#DC2626").attr("font-size", "24px").attr("font-weight", "700").attr("font-family", "Georgia, serif")
      .attr("opacity", 0).text("0/6")
      .transition().delay(1800).duration(400).attr("opacity", 1)
    g.append("text").attr("y", 12).attr("text-anchor", "middle").attr("fill", "#737373").attr("font-size", "10px")
      .attr("opacity", 0).text("criteria met")
      .transition().delay(2000).duration(400).attr("opacity", 1)

  }, [visible])

  return (
    <div ref={ref} className="flex justify-center">
      <svg ref={svgRef} viewBox="0 0 400 400" className="w-full max-w-[400px]" />
    </div>
  )
}

// ─── DISPLACEMENT AREA: Stacked over time ────────
export function DisplacementChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)

  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]
  const series = [
    { key: "DRC", color: "#DC2626", values: [4.5, 5.0, 5.2, 5.5, 5.9, 6.3, 6.9, 7.2] },
    { key: "CAR", color: "#B45309", values: [0.6, 0.6, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7] },
    { key: "Other", color: "#a3a3a3", values: [0.3, 0.3, 0.3, 0.2, 0.2, 0.2, 0.2, 0.2] },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 90, bottom: 40, left: 50 }
    const width = 650 - margin.left - margin.right
    const height = 280 - margin.top - margin.bottom
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const x = d3.scaleLinear().domain([2018, 2025]).range([0, width])
    const y = d3.scaleLinear().domain([0, 9]).range([height, 0])

    const stackData = years.map((yr, i) => {
      const obj: any = { year: yr }
      series.forEach(s => { obj[s.key] = s.values[i] })
      return obj
    })

    const stack = d3.stack().keys(series.map(s => s.key))
    const stacked = stack(stackData)

    const area = d3.area<any>().x((d: any) => x(d.data.year)).y0((d: any) => y(d[0])).y1((d: any) => y(d[1])).curve(d3.curveMonotoneX)

    // Grid
    g.append("g").call(d3.axisLeft(y).ticks(4).tickFormat(d => `${d}M`).tickSize(-width))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#e5e5e5"))
      .call(g => g.selectAll(".tick text").attr("fill", "#737373").attr("font-size", "10px"))
    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).ticks(8).tickFormat(d => `${d}`).tickSize(0))
      .call(g => g.select(".domain").attr("stroke", "#e5e5e5"))
      .call(g => g.selectAll(".tick text").attr("fill", "#737373").attr("font-size", "10px"))

    // Clip
    const defs = svg.append("defs")
    defs.append("clipPath").attr("id", "disp-clip")
      .append("rect").attr("x", 0).attr("y", 0).attr("height", height).attr("width", 0)
      .transition().duration(2000).ease(d3.easeCubicInOut).attr("width", width)

    const colorMap: Record<string, string> = {}
    series.forEach(s => { colorMap[s.key] = s.color })

    g.selectAll(".layer").data(stacked).enter()
      .append("path").attr("d", area).attr("fill", (d: any) => colorMap[d.key]).attr("opacity", 0.7).attr("clip-path", "url(#disp-clip)")

    // Legend
    series.forEach((s, i) => {
      g.append("rect").attr("x", width + 10).attr("y", i * 22).attr("width", 12).attr("height", 12).attr("rx", 2).attr("fill", s.color)
      g.append("text").attr("x", width + 26).attr("y", i * 22 + 10).attr("fill", "#525252").attr("font-size", "10px").attr("font-weight", "600").text(s.key)
    })

  }, [visible])

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg ref={svgRef} viewBox="0 0 650 280" className="w-full" style={{ minWidth: 420 }} />
    </div>
  )
}
