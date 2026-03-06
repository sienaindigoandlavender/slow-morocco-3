"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

/* ═══════════════════════════════════════════════════
   D3 CHART COMPONENTS — Flourish-level Viz
   Zero external charting libs. Pure D3 + React.
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

// ─── WATERFALL: De Beers Value Destruction ────────
export function WaterfallChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)

  const data = [
    { label: "2018 Value", value: 15.6, type: "start" as const },
    { label: "2019", value: -2.6, type: "loss" as const },
    { label: "2020 COVID", value: -4.5, type: "loss" as const },
    { label: "2021 Recovery", value: 3.5, type: "gain" as const },
    { label: "2022", value: -2.8, type: "loss" as const },
    { label: "2023 WD #1", value: -1.6, type: "loss" as const },
    { label: "2024 WD #2", value: -2.8, type: "loss" as const },
    { label: "2025 WD #3", value: -2.5, type: "loss" as const },
    { label: "2026 Value", value: 2.3, type: "end" as const },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 30, right: 20, bottom: 60, left: 55 }
    const width = 750 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const x = d3.scaleBand().domain(data.map(d => d.label)).range([0, width]).padding(0.3)
    const y = d3.scaleLinear().domain([0, 18]).range([height, 0])

    // Grid
    g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${d}B`).tickSize(-width))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#e5e5e5").attr("stroke-dasharray", "2,3"))
      .call(g => g.selectAll(".tick text").attr("fill", "#737373").attr("font-size", "10px"))

    // X axis
    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).tickSize(0))
      .call(g => g.select(".domain").attr("stroke", "#e5e5e5"))
      .call(g => g.selectAll(".tick text").attr("fill", "#525252").attr("font-size", "9px").attr("text-anchor", "end").attr("transform", "rotate(-35)"))

    // Calculate running total for waterfall
    let running = 0
    const bars: { label: string; y0: number; y1: number; type: string; value: number }[] = []
    data.forEach(d => {
      if (d.type === "start") { bars.push({ label: d.label, y0: 0, y1: d.value, type: d.type, value: d.value }); running = d.value }
      else if (d.type === "end") { bars.push({ label: d.label, y0: 0, y1: d.value, type: d.type, value: d.value }) }
      else { const prev = running; running += d.value; bars.push({ label: d.label, y0: Math.min(prev, running), y1: Math.max(prev, running), type: d.type, value: d.value }) }
    })

    // Connector lines
    bars.forEach((d, i) => {
      if (i < bars.length - 1 && d.type !== "end") {
        const nextBar = bars[i + 1]
        const fromTop = d.type === "start" || d.type === "gain" ? d.y1 : d.y0
        g.append("line")
          .attr("x1", (x(d.label) || 0) + x.bandwidth())
          .attr("x2", x(nextBar.label) || 0)
          .attr("y1", y(d.type === "loss" ? d.y0 : d.y1))
          .attr("y2", y(d.type === "loss" ? d.y0 : d.y1))
          .attr("stroke", "#a3a3a3").attr("stroke-width", 1).attr("stroke-dasharray", "3,3")
      }
    })

    // Bars with animation
    const barG = g.selectAll(".bar").data(bars).enter().append("g")
    barG.append("rect")
      .attr("x", d => x(d.label) || 0)
      .attr("width", x.bandwidth())
      .attr("y", d => y(d.y1))
      .attr("height", 0)
      .attr("rx", 2)
      .attr("fill", d => d.type === "start" ? "#0a0a0a" : d.type === "end" ? "#991B1B" : d.type === "gain" ? "#0369A1" : "#DC2626")
      .attr("opacity", 0.9)
      .transition().duration(800).delay((_, i) => i * 120)
      .attr("height", d => Math.abs(y(d.y0) - y(d.y1)))

    // Value labels
    barG.append("text")
      .attr("x", d => (x(d.label) || 0) + x.bandwidth() / 2)
      .attr("y", d => d.type === "loss" ? y(d.y0) + 16 : y(d.y1) - 6)
      .attr("text-anchor", "middle")
      .attr("fill", d => d.type === "loss" ? "#DC2626" : d.type === "end" ? "#991B1B" : "#0a0a0a")
      .attr("font-size", "11px").attr("font-weight", "700")
      .attr("opacity", 0)
      .text(d => d.type === "start" || d.type === "end" ? `$${d.value}B` : `${d.value > 0 ? "+" : ""}${d.value}B`)
      .transition().duration(400).delay((_, i) => 800 + i * 120)
      .attr("opacity", 1)

  }, [visible])

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg ref={svgRef} viewBox="0 0 750 400" className="w-full" style={{ minWidth: 500 }} />
    </div>
  )
}

// ─── STREAMGRAPH: Market Share Over Time ─────────
export function StreamGraph() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)

  const years = [1900, 1920, 1940, 1960, 1980, 1990, 2000, 2010, 2015, 2020, 2023, 2025]
  const series = [
    { key: "De Beers", color: "#0a0a0a", values: [90, 90, 88, 85, 88, 80, 60, 40, 35, 30, 25, 20] },
    { key: "Alrosa", color: "#525252", values: [0, 0, 2, 5, 7, 12, 18, 22, 22, 20, 18, 16] },
    { key: "Other natural", color: "#a3a3a3", values: [10, 10, 10, 10, 5, 8, 18, 28, 28, 25, 22, 19] },
    { key: "Lab-grown", color: "#991B1B", values: [0, 0, 0, 0, 0, 0, 0, 1, 5, 15, 30, 42] },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 30, right: 120, bottom: 40, left: 45 }
    const width = 800 - margin.left - margin.right
    const height = 350 - margin.top - margin.bottom
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const x = d3.scaleLinear().domain([1900, 2025]).range([0, width])
    const y = d3.scaleLinear().domain([0, 100]).range([height, 0])

    // Stack the data
    const stackData = years.map((yr, i) => {
      const obj: any = { year: yr }
      series.forEach(s => { obj[s.key] = s.values[i] })
      return obj
    })

    const stack = d3.stack().keys(series.map(s => s.key)).offset(d3.stackOffsetNone)
    const stacked = stack(stackData)

    // Area generator
    const area = d3.area<any>()
      .x((d: any) => x(d.data.year))
      .y0((d: any) => y(d[0]))
      .y1((d: any) => y(d[1]))
      .curve(d3.curveMonotoneX)

    // X axis
    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).ticks(8).tickFormat(d => `${d}`).tickSize(-height))
      .call(g => g.select(".domain").attr("stroke", "#e5e5e5"))
      .call(g => g.selectAll(".tick line").attr("stroke", "#e5e5e5").attr("stroke-dasharray", "2,3"))
      .call(g => g.selectAll(".tick text").attr("fill", "#737373").attr("font-size", "10px"))

    // Areas with wipe animation
    const defs = svg.append("defs")
    const clipId = "stream-clip"
    defs.append("clipPath").attr("id", clipId)
      .append("rect").attr("x", margin.left).attr("y", 0).attr("height", height + margin.top + margin.bottom)
      .attr("width", 0)
      .transition().duration(2500).ease(d3.easeCubicInOut)
      .attr("width", width + margin.right)

    const colorMap: Record<string, string> = {}
    series.forEach(s => { colorMap[s.key] = s.color })

    g.selectAll(".layer").data(stacked).enter()
      .append("path").attr("class", "layer")
      .attr("d", area)
      .attr("fill", (d: any) => colorMap[d.key])
      .attr("opacity", 0.85)
      .attr("clip-path", `url(#${clipId})`)

    // Legend
    const legend = g.append("g").attr("transform", `translate(${width + 15}, 10)`)
    series.forEach((s, i) => {
      const lg = legend.append("g").attr("transform", `translate(0, ${i * 22})`).attr("opacity", 0)
        .transition().delay(2000 + i * 200).duration(400).attr("opacity", 1)
      const sel = legend.append("g").attr("transform", `translate(0, ${i * 22})`)
      sel.append("rect").attr("width", 14).attr("height", 14).attr("rx", 2).attr("fill", s.color)
      sel.append("text").attr("x", 20).attr("y", 11).attr("fill", "#0a0a0a").attr("font-size", "11px").attr("font-weight", "600").text(s.key)
      sel.attr("opacity", 0).transition().delay(2000 + i * 200).duration(400).attr("opacity", 1)
    })

  }, [visible])

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg ref={svgRef} viewBox="0 0 800 350" className="w-full" style={{ minWidth: 550 }} />
    </div>
  )
}

// ─── ANIMATED BUBBLE: Producer Scatter ───────────
export function ProducerBubbles() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)

  const producers = [
    { name: "Botswana", carats: 25.1, value: 3.28, threat: 95, color: "#991B1B" },
    { name: "Russia", carats: 32, value: 3.8, threat: 60, color: "#525252" },
    { name: "DRC", carats: 12, value: 0.3, threat: 80, color: "#DC2626" },
    { name: "Angola", carats: 9.7, value: 1.8, threat: 45, color: "#B45309" },
    { name: "South Africa", carats: 7, value: 1.2, threat: 70, color: "#0a0a0a" },
    { name: "Namibia", carats: 2, value: 1.0, threat: 40, color: "#0369A1" },
    { name: "Canada", carats: 15, value: 2.0, threat: 30, color: "#737373" },
    { name: "Lab-grown", carats: 50, value: 0.03, threat: 0, color: "#991B1B" },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 30, right: 30, bottom: 50, left: 60 }
    const width = 750 - margin.left - margin.right
    const height = 420 - margin.top - margin.bottom
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const x = d3.scaleLinear().domain([0, 55]).range([0, width])
    const y = d3.scaleLinear().domain([0, 4.5]).range([height, 0])
    const r = d3.scaleSqrt().domain([0, 100]).range([8, 40])

    // Grid
    g.append("g").call(d3.axisBottom(x).ticks(6).tickSize(-height)).attr("transform", `translate(0,${height})`)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#e5e5e5"))
      .call(g => g.selectAll(".tick text").attr("fill", "#737373").attr("font-size", "10px"))
    g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${d}B`).tickSize(-width))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#e5e5e5"))
      .call(g => g.selectAll(".tick text").attr("fill", "#737373").attr("font-size", "10px"))

    // Axis labels
    g.append("text").attr("x", width / 2).attr("y", height + 40).attr("text-anchor", "middle").attr("fill", "#737373").attr("font-size", "11px").text("Production (million carats)")
    g.append("text").attr("x", -height / 2).attr("y", -45).attr("text-anchor", "middle").attr("transform", "rotate(-90)").attr("fill", "#737373").attr("font-size", "11px").text("Export value ($B, 2023)")

    // Bubbles with bounce-in
    const bubbles = g.selectAll(".bubble").data(producers).enter().append("g").attr("class", "bubble")

    bubbles.append("circle")
      .attr("cx", d => x(d.carats)).attr("cy", d => y(d.value))
      .attr("r", 0).attr("fill", d => d.color).attr("opacity", 0.7).attr("stroke", d => d.color).attr("stroke-width", 2).attr("stroke-opacity", 0.3)
      .transition().duration(800).delay((_, i) => i * 120).ease(d3.easeBackOut.overshoot(1.5))
      .attr("r", d => r(d.threat))

    // Pulse for Botswana
    bubbles.filter(d => d.name === "Botswana").append("circle")
      .attr("cx", d => x(d.carats)).attr("cy", d => y(d.value))
      .attr("r", d => r(d.threat)).attr("fill", "none").attr("stroke", "#991B1B").attr("stroke-width", 2)
      .attr("opacity", 0)
      .transition().delay(1500).duration(0).attr("opacity", 1)
      .transition().duration(1500).ease(d3.easeLinear)
      .attr("r", d => r(d.threat) + 20).attr("opacity", 0)
      .transition().duration(0).attr("r", d => r(d.threat)).attr("opacity", 1)
      .transition().duration(1500).attr("r", d => r(d.threat) + 20).attr("opacity", 0)

    // Labels
    bubbles.append("text")
      .attr("x", d => x(d.carats)).attr("y", d => y(d.value) + 4)
      .attr("text-anchor", "middle").attr("fill", "#fff").attr("font-size", "10px").attr("font-weight", "700")
      .attr("opacity", 0).text(d => d.name)
      .transition().delay((_, i) => 800 + i * 120).duration(400).attr("opacity", 1)

    // Legend: size = threat
    const legendG = g.append("g").attr("transform", `translate(${width - 100}, 10)`)
    legendG.append("text").attr("fill", "#737373").attr("font-size", "9px").text("Bubble size = threat level")

  }, [visible])

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg ref={svgRef} viewBox="0 0 750 420" className="w-full" style={{ minWidth: 500 }} />
    </div>
  )
}

// ─── LINE RACE: Lab-Grown vs Natural Price ───────
export function PriceRaceChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)

  const data = [
    { year: 2016, natural: 6000, lab: 4000 },
    { year: 2017, natural: 5800, lab: 3200 },
    { year: 2018, natural: 5500, lab: 2400 },
    { year: 2019, natural: 5200, lab: 1600 },
    { year: 2020, natural: 4800, lab: 1200 },
    { year: 2021, natural: 5000, lab: 900 },
    { year: 2022, natural: 4500, lab: 600 },
    { year: 2023, natural: 4000, lab: 400 },
    { year: 2024, natural: 3800, lab: 350 },
    { year: 2025, natural: 3500, lab: 300 },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 30, right: 80, bottom: 40, left: 55 }
    const width = 700 - margin.left - margin.right
    const height = 340 - margin.top - margin.bottom
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const x = d3.scaleLinear().domain([2016, 2025]).range([0, width])
    const y = d3.scaleLinear().domain([0, 7000]).range([height, 0])

    // Grid
    g.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d => `$${(+d / 1000).toFixed(0)}k`).tickSize(-width))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#e5e5e5").attr("stroke-dasharray", "2,3"))
      .call(g => g.selectAll(".tick text").attr("fill", "#737373").attr("font-size", "10px"))
    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).ticks(10).tickFormat(d => `${d}`).tickSize(0))
      .call(g => g.select(".domain").attr("stroke", "#e5e5e5"))
      .call(g => g.selectAll(".tick text").attr("fill", "#737373").attr("font-size", "10px"))

    // Shade between lines
    const areaGen = d3.area<typeof data[0]>()
      .x(d => x(d.year)).y0(d => y(d.lab)).y1(d => y(d.natural)).curve(d3.curveMonotoneX)
    g.append("path").datum(data).attr("d", areaGen)
      .attr("fill", "#991B1B").attr("opacity", 0)
      .transition().delay(2000).duration(800).attr("opacity", 0.08)

    // Line generators
    const lineGen = (key: "natural" | "lab") => d3.line<typeof data[0]>().x(d => x(d.year)).y(d => y(d[key])).curve(d3.curveMonotoneX)

    // Clip for reveal animation
    const defs = svg.append("defs")
    defs.append("clipPath").attr("id", "price-clip")
      .append("rect").attr("x", margin.left).attr("y", 0).attr("height", height + margin.top + margin.bottom)
      .attr("width", 0).transition().duration(2500).ease(d3.easeCubicInOut).attr("width", width + margin.right)

    // Natural line
    g.append("path").datum(data).attr("d", lineGen("natural")!).attr("fill", "none").attr("stroke", "#0a0a0a").attr("stroke-width", 3).attr("clip-path", "url(#price-clip)")
    // Lab line
    g.append("path").datum(data).attr("d", lineGen("lab")!).attr("fill", "none").attr("stroke", "#991B1B").attr("stroke-width", 3).attr("clip-path", "url(#price-clip)")

    // End dots
    const endNat = data[data.length - 1]
    const endLab = data[data.length - 1]

    ;[
      { val: endNat.natural, color: "#0a0a0a", label: `$${(endNat.natural / 1000).toFixed(1)}k Natural`, y: endNat.natural },
      { val: endLab.lab, color: "#991B1B", label: `$${endLab.lab} Lab-grown`, y: endLab.lab },
    ].forEach(d => {
      g.append("circle").attr("cx", x(2025)).attr("cy", y(d.y)).attr("r", 0).attr("fill", d.color)
        .transition().delay(2500).duration(400).ease(d3.easeBackOut).attr("r", 5)
      g.append("text").attr("x", x(2025) + 10).attr("y", y(d.y) + 4).attr("fill", d.color).attr("font-size", "11px").attr("font-weight", "700")
        .attr("opacity", 0).text(d.label)
        .transition().delay(2700).duration(400).attr("opacity", 1)
    })

    // Gap annotation
    g.append("line").attr("x1", x(2022)).attr("x2", x(2022)).attr("y1", y(4500)).attr("y2", y(600))
      .attr("stroke", "#991B1B").attr("stroke-width", 1).attr("stroke-dasharray", "4,3")
      .attr("opacity", 0).transition().delay(3000).duration(400).attr("opacity", 0.6)
    g.append("text").attr("x", x(2022) + 6).attr("y", y(2600)).attr("fill", "#991B1B").attr("font-size", "10px").attr("font-weight", "600")
      .attr("opacity", 0).text("90% gap")
      .transition().delay(3200).duration(400).attr("opacity", 1)

  }, [visible])

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg ref={svgRef} viewBox="0 0 700 340" className="w-full" style={{ minWidth: 480 }} />
    </div>
  )
}

// ─── BAR CHART RACE: Engagement Ring Share ────────
export function EngagementRace() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)
  const [yearIdx, setYearIdx] = useState(0)

  const data = [
    { year: 2018, natural: 97, lab: 3 },
    { year: 2019, natural: 92, lab: 8 },
    { year: 2020, natural: 85, lab: 15 },
    { year: 2021, natural: 75, lab: 25 },
    { year: 2022, natural: 65, lab: 35 },
    { year: 2023, natural: 58, lab: 42 },
    { year: 2024, natural: 50, lab: 50 },
  ]

  useEffect(() => {
    if (!visible) return
    const interval = setInterval(() => {
      setYearIdx(prev => prev < data.length - 1 ? prev + 1 : prev)
    }, 700)
    return () => clearInterval(interval)
  }, [visible])

  useEffect(() => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const d = data[yearIdx]
    const width = 600, height = 120
    const barH = 36

    // Year label
    svg.append("text").attr("x", width / 2).attr("y", 24).attr("text-anchor", "middle").attr("fill", "#0a0a0a").attr("font-size", "28px").attr("font-weight", "700").attr("font-family", "Georgia, serif").text(d.year)

    // Natural bar
    svg.append("rect").attr("x", 0).attr("y", 45).attr("height", barH).attr("rx", 3)
      .attr("fill", "#d4d4d4").attr("width", 0)
      .transition().duration(500).attr("width", (d.natural / 100) * width)
    svg.append("text").attr("x", Math.max((d.natural / 100) * width - 8, 40)).attr("y", 45 + barH / 2 + 5).attr("text-anchor", "end").attr("fill", "#525252").attr("font-size", "13px").attr("font-weight", "700").text(`Natural ${d.natural}%`)

    // Lab bar
    svg.append("rect").attr("x", 0).attr("y", 88).attr("height", barH).attr("rx", 3)
      .attr("fill", "#991B1B").attr("width", 0)
      .transition().duration(500).attr("width", (d.lab / 100) * width)
    svg.append("text").attr("x", Math.max((d.lab / 100) * width - 8, 40)).attr("y", 88 + barH / 2 + 5).attr("text-anchor", "end").attr("fill", "#fff").attr("font-size", "13px").attr("font-weight", "700").text(`Lab-grown ${d.lab}%`)

  }, [yearIdx, visible])

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg ref={svgRef} viewBox="0 0 600 130" className="w-full max-w-[600px]" />
      <div className="flex gap-1 mt-3 justify-center">
        {data.map((d, i) => (
          <button key={i} onClick={() => setYearIdx(i)} className="w-2 h-2 rounded-full transition-all" style={{ background: i <= yearIdx ? "#991B1B" : "#d4d4d4", transform: i === yearIdx ? "scale(1.5)" : "scale(1)" }} />
        ))}
      </div>
    </div>
  )
}

// ─── BOTSWANA EXPORT COLLAPSE: Area Chart ────────
export function BotswanaCollapse() {
  const svgRef = useRef<SVGSVGElement>(null)
  const { ref, visible } = useInView(0.3)

  const data = [
    { year: 2017, value: 5.2 }, { year: 2018, value: 5.0 }, { year: 2019, value: 4.6 },
    { year: 2020, value: 2.1 }, { year: 2021, value: 7.0 }, { year: 2022, value: 4.7 },
    { year: 2023, value: 3.6 }, { year: 2024, value: 2.0 },
  ]

  useEffect(() => {
    if (!svgRef.current || !visible) return
    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const margin = { top: 20, right: 30, bottom: 40, left: 50 }
    const width = 600 - margin.left - margin.right
    const height = 280 - margin.top - margin.bottom
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)

    const x = d3.scaleLinear().domain([2017, 2024]).range([0, width])
    const y = d3.scaleLinear().domain([0, 8]).range([height, 0])

    g.append("g").call(d3.axisLeft(y).ticks(4).tickFormat(d => `$${d}B`).tickSize(-width))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "#e5e5e5"))
      .call(g => g.selectAll(".tick text").attr("fill", "#737373").attr("font-size", "10px"))
    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).ticks(8).tickFormat(d => `${d}`).tickSize(0))
      .call(g => g.select(".domain").attr("stroke", "#e5e5e5"))
      .call(g => g.selectAll(".tick text").attr("fill", "#737373").attr("font-size", "10px"))

    // Gradient
    const defs = svg.append("defs")
    const grad = defs.append("linearGradient").attr("id", "bw-grad").attr("x1", "0").attr("y1", "0").attr("x2", "0").attr("y2", "1")
    grad.append("stop").attr("offset", "0%").attr("stop-color", "#991B1B").attr("stop-opacity", 0.4)
    grad.append("stop").attr("offset", "100%").attr("stop-color", "#991B1B").attr("stop-opacity", 0.02)

    // Clip
    defs.append("clipPath").attr("id", "bw-clip")
      .append("rect").attr("x", 0).attr("y", 0).attr("height", height).attr("width", 0)
      .transition().duration(2000).ease(d3.easeCubicInOut).attr("width", width)

    const area = d3.area<typeof data[0]>().x(d => x(d.year)).y0(height).y1(d => y(d.value)).curve(d3.curveMonotoneX)
    const line = d3.line<typeof data[0]>().x(d => x(d.year)).y(d => y(d.value)).curve(d3.curveMonotoneX)

    g.append("path").datum(data).attr("d", area).attr("fill", "url(#bw-grad)").attr("clip-path", "url(#bw-clip)")
    g.append("path").datum(data).attr("d", line).attr("fill", "none").attr("stroke", "#991B1B").attr("stroke-width", 2.5).attr("clip-path", "url(#bw-clip)")

    // Dots + values
    data.forEach((d, i) => {
      g.append("circle").attr("cx", x(d.year)).attr("cy", y(d.value)).attr("r", 0).attr("fill", d.value <= 2.1 ? "#991B1B" : "#0a0a0a")
        .transition().delay(1800 + i * 100).duration(300).ease(d3.easeBackOut).attr("r", 4)
      g.append("text").attr("x", x(d.year)).attr("y", y(d.value) - 10).attr("text-anchor", "middle").attr("fill", d.value <= 2.1 ? "#991B1B" : "#0a0a0a").attr("font-size", "10px").attr("font-weight", "700")
        .attr("opacity", 0).text(`$${d.value}B`)
        .transition().delay(2000 + i * 100).duration(300).attr("opacity", 1)
    })

  }, [visible])

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <svg ref={svgRef} viewBox="0 0 600 280" className="w-full" style={{ minWidth: 400 }} />
    </div>
  )
}
