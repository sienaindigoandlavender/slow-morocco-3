"use client"

import { useEffect, useRef } from "react"
import {
  useInView, AnimCounter, PopulationChart, PermitComparison,
  RevenueChart, RevenueSharingDonut, ArithmeticTable,
} from "./charts"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

const MAP_MARKERS = [
  { name: "Volcanoes NP — Rwanda", coords: [29.52, -1.45] as [number, number], color: "#2D5F3A", detail: "12 habituated groups. 96 permits/day. $1,500/permit. $200M gorilla revenue (2024).", sz: 16 },
  { name: "Bwindi — Uganda", coords: [29.61, -1.04] as [number, number], color: "#B8860B", detail: "20 habituated groups. 160 permits/day. $800/permit.", sz: 12 },
  { name: "Mgahinga — Uganda", coords: [29.63, -1.38] as [number, number], color: "#B8860B", detail: "1 habituated group. 8 permits/day. $800/permit.", sz: 10 },
  { name: "Virunga NP — DRC", coords: [29.30, -1.55] as [number, number], color: "#991B1B", detail: "Closed since 2020. Security crisis. Rangers killed, tourists kidnapped.", sz: 12 },
  { name: "Karisoke — Fossey's station", coords: [29.47, -1.47] as [number, number], color: "#525252", detail: "Founded 1967. Fossey murdered 1985. Now research centre. 3,000m altitude.", sz: 8 },
]

const TIMELINE = [
  { y: "1902", e: "First scientific description. Captain Robert von Beringe shoots two gorillas on Mt Sabinyo.", t: "origin" },
  { y: "1925", e: "Albert National Park created (now Virunga). First protected area for gorillas.", t: "protect" },
  { y: "1967", e: "Dian Fossey establishes Karisoke Research Centre between Mt Karisimbi and Mt Visoke.", t: "protect" },
  { y: "1981", e: "First comprehensive census: 254 individuals. Species on the edge.", t: "crisis" },
  { y: "1985", e: "Fossey murdered at Karisoke. December 26. Gorillas in the Mist published three years later.", t: "crisis" },
  { y: "1994", e: "Rwandan genocide. Rangers stay at posts. Gorillas survive in the forest above.", t: "crisis" },
  { y: "1999", e: "IGCP tourism programme restarts. First post-war permits sold.", t: "growth" },
  { y: "2003", e: "Permit price: $250. Revenue-sharing programme begins. 10% to communities.", t: "growth" },
  { y: "2005", e: "Permit raised to $500. Gorilla population passes 380.", t: "growth" },
  { y: "2012", e: "Census: 480 gorillas. Steady growth confirmed across Virunga Massif.", t: "growth" },
  { y: "2017", e: "Rwanda raises permit to $1,500. High-value, low-volume model crystallises.", t: "growth" },
  { y: "2018", e: "Census: 1,004 gorillas. Reclassified from Critically Endangered to Endangered.", t: "milestone" },
  { y: "2020", e: "Census update: 1,063. COVID closes parks. Gorilla Guardians Village programme expands.", t: "milestone" },
  { y: "2024", e: "Rwanda tourism: $647M total revenue. Gorilla tourism: $200M. 386,000 tourism jobs.", t: "milestone" },
]

const SOURCES = [
  "Rwanda Development Board (RDB) — Annual Report 2024, Tourism Statistics",
  "WTTC — Rwanda Travel & Tourism Economic Impact Report 2025",
  "IUCN Red List — Gorilla beringei beringei (Endangered, pop. trend: increasing)",
  "Dian Fossey Gorilla Fund — Population monitoring data, Karisoke Research Centre",
  "Greater Virunga Transboundary Collaboration — Census reports (2010, 2015/16, 2018)",
  "World Bank — Rwanda Economic Update: Nature-based Tourism (Feb 2023)",
  "Robbins M. et al. — Mountain gorilla population dynamics, Biological Conservation",
]

const OPEN_DATA = [
  { name: "World Bank", url: "data.worldbank.org", use: "Rwanda GDP, tourism contribution, poverty" },
  { name: "IUCN Red List", url: "iucnredlist.org", use: "Species status, population estimates" },
  { name: "WTTC Research Hub", url: "wttc.org/research", use: "Tourism economic impact by country" },
  { name: "ACLED", url: "acleddata.com", use: "DRC conflict events near Virunga" },
  { name: "Copernicus", url: "scihub.copernicus.eu", use: "10m satellite imagery — Virunga deforestation" },
  { name: "WorldPop", url: "worldpop.org", use: "Population density around park boundaries" },
]

export function TheGorillaDividendContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    const link = document.createElement("link")
    link.rel = "stylesheet"; link.href = "https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css"
    document.head.appendChild(link)
    const script = document.createElement("script")
    script.src = "https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.js"
    script.onload = () => {
      const mb = (window as any).mapboxgl; if (!mb) return
      mb.accessToken = MAPBOX_TOKEN
      const map = new mb.Map({ container: mapContainer.current!, style: "mapbox://styles/mapbox/satellite-streets-v12", center: [29.50, -1.35], zoom: 10.2, interactive: true, attributionControl: false, pitch: 30 })
      mapRef.current = map
      map.addControl(new mb.NavigationControl({ showCompass: false }), "top-right")
      map.on("load", () => {
        MAP_MARKERS.forEach(m => {
          const el = document.createElement("div")
          el.style.cssText = `width:${m.sz}px;height:${m.sz}px;border-radius:50%;background:${m.color};border:2px solid rgba(255,255,255,0.7);box-shadow:0 0 16px ${m.color}80;cursor:pointer;transition:transform 0.2s;`
          el.onmouseenter = () => { el.style.transform = "scale(1.4)" }
          el.onmouseleave = () => { el.style.transform = "scale(1)" }
          new mb.Marker(el).setLngLat(m.coords).setPopup(
            new mb.Popup({ offset: 12, maxWidth: "280px", closeButton: false }).setHTML(
              `<div style="font-family:system-ui;padding:4px 0"><p style="font-size:13px;font-weight:700;margin:0 0 4px;color:#0a0a0a">${m.name}</p><p style="font-size:11px;color:#525252;margin:0;line-height:1.5">${m.detail}</p></div>`
            )
          ).addTo(map)
        })
      })
    }
    document.head.appendChild(script)
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div className="bg-white text-[#262626] pt-16">

      {/* HERO */}
      <section className="relative bg-[#1A3D24] text-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/40 mb-4">Module 146 · Conservation Economics</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Gorilla<br />Dividend</h1>
          <p className="text-[15px] text-white/60 leading-relaxed max-w-[500px] mb-10">
            Rwanda charges $1,500 for one hour with the mountain gorillas. 96 permits per day. No exceptions. The price is the point. The price is why there are gorillas left.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { n: 1063, s: "", l: "gorillas alive" },
              { n: 647, s: "$|M", l: "tourism revenue (2024)" },
              { n: 1500, s: "$|", l: "per permit" },
              { n: 96, s: "", l: "permits per day" },
            ].map(k => (
              <div key={k.l}>
                <p className="font-serif text-[36px] md:text-[44px] font-light text-white leading-none">
                  {k.s.includes("$") && "$"}<AnimCounter target={k.n} />{k.s.includes("M") && "M"}
                </p>
                <p className="text-[10px] uppercase tracking-[0.1em] text-white/40 mt-1">{k.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #4A8C5C 0%, transparent 60%)" }} />
      </section>

      {/* 001 POPULATION */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Comeback</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">254 → 1,063. The only great ape that&rsquo;s increasing.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">In 1981, 254 mountain gorillas remained. Every other great ape on earth is declining &mdash; orangutans, chimpanzees, bonobos, western gorillas. Mountain gorillas are the exception. The green line is the proof.</p>
        <PopulationChart />
      </div></section>

      {/* 002 PERMIT COMPARISON */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Price</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Three countries. Three prices. One works best.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Rwanda charges double Uganda and nearly four times the DRC. The gorillas don&rsquo;t recognise borders. A family that ranges into DRC territory faces different odds than one that stays in Rwanda. The price is carrying capacity expressed in currency.</p>
        <div className="max-w-[640px]"><PermitComparison /></div>
      </div></section>

      {/* MAP */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Virunga Massif</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">One mountain range. Three countries. Five volcanoes.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Cloud forest at 3,000 metres. The gorillas move between Rwanda, Uganda, and DRC without passports. The humans who protect them operate under three different governments, three budgets, three levels of stability.</p>
        <div ref={mapContainer} style={{ width: "100%", height: 460, borderRadius: 8, overflow: "hidden", background: "#1a1a1a" }} />
        <p className="text-[9px] text-[#737373] mt-3 italic">Satellite imagery: Mapbox. Click markers for detail.</p>
      </div></section>

      {/* 004 REVENUE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Money</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">$647 million in tourism revenue. The gorillas earned $200 million of it.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The green bars are gorilla tourism revenue. The grey is everything else &mdash; Akagera, Nyungwe, MICE events, city tourism. Gorilla trekking is roughly 31% of all tourism revenue on 0.1% of the land area. COVID carved out 2020. The recovery was faster than anyone predicted.</p>
        <RevenueChart />
      </div></section>

      {/* 005 REVENUE SHARING */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · Where the Money Goes</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">10% to communities. Not charity. Strategy.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">A farmer whose crops are raided by buffalo, whose land sits next to the park boundary, needs a reason not to resent the forest. The revenue-sharing fund has built schools, health centres, water systems. It has provided livestock, seeds, loans. The people who live with the gorillas see tangible benefit from their presence.</p>
        <RevenueSharingDonut />
      </div></section>

      {/* 006 THE ARITHMETIC */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">006 · The Arithmetic</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Each gorilla generates $515 per day. Alive.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The logic is simple and unsentimental. A live gorilla generates hundreds of dollars per day in tourism revenue. A dead gorilla generates nothing. Rwanda decided the gorillas were worth more alive, and then structured an entire economy around that decision.</p>
        <div className="max-w-[700px]"><ArithmeticTable /></div>
      </div></section>

      {/* 007 ESSAY — THE GUARDS */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">007 · The Guards</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">The men who once killed them now find them for tourists.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>Rwanda employs former poachers as trackers. The men who once knew how to find gorillas to kill them now know how to find them for tourists. Their knowledge of the forest &mdash; the trails, the feeding patterns, the family dynamics &mdash; is irreplaceable.</p>
          <p>The job provides income, status, and purpose. It also creates a network of eyes in the forest. Poaching becomes difficult when the people who know the terrain are paid to protect it.</p>
          <p>Rwanda&rsquo;s gorilla rangers are some of the best-trained and best-paid conservation officers in Africa. They track gorilla groups daily, maintain the trails, provide security, and serve as guides for the tourists whose fees pay their salaries.</p>
          <p>Many are from the communities that once poached the same gorillas. Some rangers remember killing gorillas before they protected them. Others lost family members to gorillas that raided crops. The relationships are complicated. But the economics are clear. A ranger&rsquo;s salary supports an extended family. The tourists bring business to nearby villages. However people feel about the gorillas themselves, they can see what the gorillas bring.</p>
        </div>
      </div></section>

      {/* 008 TIMELINE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">008 · 122 Years</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-12">1902 &mdash; 2024</h2>
        <div className="relative"><div className="absolute left-[7px] top-0 bottom-0 w-px bg-[#d4d4d4]" />
          {TIMELINE.map((t, i) => {
            const color = t.t === "origin" ? "#525252" : t.t === "protect" ? "#2D5F3A" : t.t === "crisis" ? "#991B1B" : t.t === "growth" ? "#B8860B" : "#2D5F3A"
            return (<div key={i} className="flex gap-4 mb-5"><div className="shrink-0"><div className="w-[14px] h-[14px] rounded-full border-2" style={{ borderColor: color, background: t.t === "milestone" || t.t === "crisis" ? color : "#fff" }} /></div><div><p className="font-mono text-[11px] font-bold mb-1" style={{ color }}>{t.y}</p><p className="text-[13px] text-[#525252] leading-relaxed">{t.e}</p></div></div>)
          })}
        </div>
        <div className="flex gap-4 flex-wrap mt-6 pt-4 border-t border-[#e5e5e5]">
          {[["Discovery", "#525252"], ["Protection", "#2D5F3A"], ["Crisis", "#991B1B"], ["Growth", "#B8860B"], ["Milestone", "#2D5F3A"]].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /><span className="text-[9px] uppercase tracking-[0.08em] text-[#737373]">{l}</span></div>
          ))}
        </div>
      </div></section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: "#2D5F3A" }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">
              The mountain gorilla was once considered doomed. Rwanda decided it was worth more alive than dead, then built an entire economy around that decision. The permit price is not gouging. It is carrying capacity expressed in currency. The revenue sharing is not generosity. It is the cost of keeping the forest intact.
            </p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED INTELLIGENCE */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">009 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">The pattern.</h2>
        <div className="space-y-10">
          {[
            { to: "The Last Lions", link: "/data/the-last-lions", insight: "The Barbary lion went extinct because nobody built an economic model around keeping it alive. The mountain gorilla survived because Rwanda did." },
            { to: "The Sahel War", link: "/data/the-sahel-war", insight: "The DRC portion of the Virunga Massif is inside the conflict zone. Rangers killed, tourists kidnapped. The gorillas don't recognise borders." },
            { to: "The Silk Road Into Africa", link: "/data/the-silk-road-into-africa", insight: "Rwanda's Visit Rwanda / Arsenal deal. China's Bugesera airport investment. Infrastructure that makes $1,500 permits possible." },
          ].map((c, i) => (
            <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: "#2D5F3A" }}>
              <span className="text-[10px] text-[#4A8C5C] uppercase tracking-[0.1em] font-semibold">{c.to}</span>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-[560px] mt-2">{c.insight}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* SOURCES */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-6">Sources &amp; Open Data</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-10">
          {SOURCES.map((s, i) => <p key={i} className="text-[11px] text-[#525252]">{s}</p>)}
        </div>
        <p className="text-[10px] uppercase tracking-[0.08em] text-[#737373] mb-4 font-semibold">Open Data Layer</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {OPEN_DATA.map((d, i) => <p key={i} className="text-[11px]"><span className="text-[#0a0a0a] font-semibold">{d.name}</span> <span className="text-[#2D5F3A]">({d.url})</span> <span className="text-[#737373]">&mdash; {d.use}</span></p>)}
        </div>
        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-[#e5e5e5]">
          <p className="text-[12px] text-[#737373]">Data compilation, visualisation &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p>
          <p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p>
        </div>
      </div></section>
    </div>
  )
}
