"use client"

import { useEffect, useRef } from "react"
import {
  useInView, AnimCounter, WaterfallChart, StreamGraph,
  ProducerBubbles, PriceRaceChart, EngagementRace, BotswanaCollapse,
} from "./charts"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

const MAP_MARKERS = [
  { name: "Botswana \u2014 crisis", coords: [25.9, -22.3] as [number, number], color: "#DC2626", detail: "#1 by value. Debswana cut 40%. Economy contracting.", sz: 16 },
  { name: "Angola \u2014 #2 Africa", coords: [17.9, -12.5] as [number, number], color: "#B45309", detail: "9.7M carats. Catoca mine. Seeking De Beers stake.", sz: 12 },
  { name: "South Africa \u2014 origin", coords: [28.0, -29.0] as [number, number], color: "#0a0a0a", detail: "Where it began. Kimberley. De Beers founded 1888.", sz: 10 },
  { name: "Namibia \u2014 marine", coords: [15.0, -22.6] as [number, number], color: "#0369A1", detail: "High-value marine diamonds. Wants De Beers stake.", sz: 11 },
  { name: "DRC \u2014 active conflict", coords: [25.0, -2.5] as [number, number], color: "#DC2626", detail: "~12M carats. Artisanal. Cobalt now more valuable.", sz: 14 },
  { name: "Russia \u2014 Alrosa (#1)", coords: [129.7, 62.0] as [number, number], color: "#DC2626", detail: "#1 by volume. G7 sanctions. 30% global supply.", sz: 14 },
  { name: "China \u2014 lab-grown", coords: [116.4, 39.9] as [number, number], color: "#991B1B", detail: "Mass lab-grown production. Killing natural demand.", sz: 14 },
  { name: "India \u2014 cutting hub", coords: [72.8, 21.2] as [number, number], color: "#B45309", detail: "Cuts 90%+ of world\u2019s diamonds. Lab-grown hub.", sz: 12 },
]

const TIMELINE = [
  { y: "1869", e: "Star of South Africa found. Diamond rush begins.", t: "origin" },
  { y: "1888", e: "Cecil Rhodes founds De Beers. Controls all SA mining.", t: "power" },
  { y: "1902", e: "Rhodes dies. De Beers controls 90% of world production.", t: "power" },
  { y: "1927", e: "Ernest Oppenheimer builds global cartel through CSO.", t: "power" },
  { y: "1947", e: "\u201cA Diamond Is Forever.\u201d Most successful ad slogan of 20th century.", t: "brand" },
  { y: "1980s", e: "Peak monopoly: 85\u201390% of global rough distribution.", t: "power" },
  { y: "1990s", e: "Russia breaks cartel. Australia separates. Monopoly fractures.", t: "crisis" },
  { y: "2003", e: "Kimberley Process launched. Blood diamond scandal.", t: "crisis" },
  { y: "2013", e: "Market forces drive prices for first time in 100 years.", t: "crisis" },
  { y: "2023", e: "Anglo writes down De Beers $1.56B. Value: $9.2B.", t: "collapse" },
  { y: "2024", e: "Second writedown $2.9B. Anglo exits diamonds.", t: "collapse" },
  { y: "2025", e: "Third writedown $2.3B. EBITDA: -$511M. Value: $2.3B.", t: "collapse" },
  { y: "2026", e: "Anglo reports $3.7B net loss (Feb 20). Sale advanced.", t: "collapse" },
]

const SOURCES = [
  "Anglo American / De Beers Group \u2014 Preliminary Financial Results 2025 (Feb 20, 2026)",
  "World Bank Open Data \u2014 Botswana GDP series, debt-to-GDP ratios (data.worldbank.org)",
  "UN Comtrade \u2014 Diamond trade flows HS 7102 (comtrade.un.org)",
  "Kimberley Process \u2014 Global production statistics 2023",
  "IMF \u2014 Botswana Article IV Consultation 2024",
  "AfDB \u2014 Botswana Economic Outlook (dataportal.opendataforafrica.org)",
  "McKinsey & Company \u2014 Gen Z/Millennial diamond purchasing data (2023)",
  "OEC \u2014 Botswana diamond export partner analysis (oec.world)",
  "Paul Zimnisky / Rapaport \u2014 Production data, monopoly history",
  "ACLED \u2014 Conflict events in diamond-producing regions (acleddata.com)",
]

const OPEN_DATA = [
  { name: "World Bank", url: "data.worldbank.org", use: "GDP, debt, economic indicators" },
  { name: "UN Comtrade", url: "comtrade.un.org", use: "Diamond trade flows (HS 7102)" },
  { name: "Kimberley Process", url: "kimberleyprocess.com", use: "Production stats by country" },
  { name: "ACLED", url: "acleddata.com", use: "Conflict events in mining regions" },
  { name: "Copernicus", url: "scihub.copernicus.eu", use: "10m satellite imagery of mines" },
  { name: "AfDB Portal", url: "dataportal.opendataforafrica.org", use: "Africa-specific economics" },
  { name: "OEC", url: "oec.world", use: "Trade visualisation" },
  { name: "MS Building Footprints", url: "github.com/microsoft/GlobalMLBuildingFootprints", use: "Settlement detection near mines" },
]

export default function DiamondContent() {
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
      const map = new mb.Map({ container: mapContainer.current!, style: "mapbox://styles/mapbox/light-v11", center: [30, 0], zoom: 2.3, interactive: true, attributionControl: false })
      mapRef.current = map
      map.addControl(new mb.NavigationControl({ showCompass: false }), "top-right")
      map.on("load", () => {
        MAP_MARKERS.forEach(m => {
          const el = document.createElement("div")
          el.style.cssText = `width:${m.sz}px;height:${m.sz}px;border-radius:50%;background:${m.color};border:2px solid ${m.color}40;box-shadow:0 0 12px ${m.color}50;cursor:pointer;transition:transform 0.2s;`
          el.onmouseenter = () => { el.style.transform = "scale(1.4)" }
          el.onmouseleave = () => { el.style.transform = "scale(1)" }
          new mb.Marker(el).setLngLat(m.coords).setPopup(
            new mb.Popup({ offset: 10, maxWidth: "280px", closeButton: false }).setHTML(
              `<div style="font-family:system-ui;padding:4px 0"><p style="font-size:13px;font-weight:700;margin:0 0 4px">${m.name}</p><p style="font-size:11px;color:#525252;margin:0">${m.detail}</p></div>`
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
      <section className="max-w-[1000px] mx-auto px-6 md:px-10 pt-16 pb-10">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#991B1B] mb-4 font-semibold">Data Module &middot; Visual Intelligence</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] text-[#0a0a0a]">A Diamond Is<br />Not Forever</h1>
        <p className="font-serif text-[clamp(1.1rem,2.5vw,1.5rem)] text-[#525252] italic mt-3">De Beers, Lab-Grown Disruption &amp; the Collapse of Africa&rsquo;s Diamond Model</p>
        <p className="text-[13px] text-[#525252] leading-relaxed mt-8 max-w-[600px]">Frances Gerety was a copywriter at N.W. Ayer. She stayed late one night in 1947 and wrote four words on a scrap of paper. &ldquo;A Diamond Is Forever.&rdquo; It became the most successful advertising slogan of the twentieth century. On February 20, 2026, Anglo American posted a $3.7 billion loss and put De Beers up for sale. The four words are still on the building.</p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-6">
          <div><p className="font-serif text-[32px] italic text-[#0a0a0a] leading-none"><AnimCounter target={6.8} prefix="$" suffix="B" decimals={1} /></p><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mt-1">Writedowns (3 years)</p></div>
          <div><p className="font-serif text-[32px] italic text-[#0a0a0a] leading-none"><AnimCounter target={80} prefix="-" suffix="%" /></p><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mt-1">Lab-grown price collapse</p></div>
          <div><p className="font-serif text-[32px] italic text-[#0a0a0a] leading-none">~<AnimCounter target={50} suffix="%" /></p><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mt-1">US rings now lab-grown</p></div>
          <div><p className="font-serif text-[32px] italic text-[#0a0a0a] leading-none"><AnimCounter target={138} suffix=" yrs" /></p><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mt-1">De Beers monopoly</p></div>
          <div><p className="font-serif text-[32px] italic text-[#991B1B] leading-none"><AnimCounter target={2.3} prefix="$" suffix="B" decimals={1} /></p><p className="text-[9px] uppercase tracking-[0.08em] text-[#737373] mt-1">What De Beers is worth</p></div>
        </div>
      </section>

      {/* MAP */}
      <section className="relative"><div ref={mapContainer} style={{ width: "100%", height: "50vh", minHeight: 380 }} /></section>

      {/* 001 WATERFALL */}
      <section className="border-t border-[#e5e5e5] mt-6"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 &middot; The Collapse</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">$15.6B &rarr; $2.3B. Where the value went.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Anglo wrote it down. Then wrote it down again. Then again. The 2021 recovery is the cruelest bar on this chart &mdash; it let everyone believe the worst was over.</p>
        <WaterfallChart />
        <p className="text-[9px] text-[#737373] mt-4 italic">Source: Anglo American financial results (2018&ndash;2026). Enterprise value estimates from analyst consensus.</p>
      </div></section>

      {/* 002 STREAMGRAPH */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 &middot; The Monopoly Dissolves</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">125 years of market share. Watch the red rise.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">For a hundred years, if you wanted a diamond, you asked De Beers. The black band is that century. The red is what&rsquo;s eating it. Not war, not regulation, not scandal. A machine in a Chinese factory that grows the same stone in two weeks.</p>
        <StreamGraph />
        <p className="text-[9px] text-[#737373] mt-4 italic">Source: Paul Zimnisky, Rapaport, KP Statistics, McKinsey. Pre-2000 market share approximate.</p>
      </div></section>

      {/* 003 PRICE RACE */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 &middot; The Price Collapse</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Two lines. One falling. One crashing.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">A gemologist at GIA confirmed it: there is no test that can tell them apart. The shaded area between these two lines is the last thing De Beers is selling &mdash; the belief that one kind of carbon is more romantic than another.</p>
        <PriceRaceChart />
      </div></section>

      {/* 004 ENGAGEMENT RACE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 &middot; The Engagement Ring</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Lab-grown is taking the symbol De Beers invented.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">De Beers invented the engagement diamond as a marketing tool in the 1930s. It worked for ninety years. Then a generation arrived that checks the price before the romance. The red bar is them.</p>
        <div className="max-w-[600px]"><EngagementRace /></div>
        <p className="text-[9px] text-[#737373] mt-6 italic">Source: McKinsey (2023), Paul Zimnisky. US market, by volume.</p>
      </div></section>

      {/* 005 BUBBLES */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 &middot; The Producers</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">The countries that live and die by the stone.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Botswana&rsquo;s bubble pulses because it should. Eighty percent of the country&rsquo;s exports are diamonds. S&amp;P downgraded the sovereign credit rating. The World Bank says the economy contracts 3% this year. Botswana was the poorest country in the world at independence. Diamonds made it middle-income. Now look at the bubble.</p>
        <ProducerBubbles />
        <p className="text-[9px] text-[#737373] mt-4 italic">Source: KP Statistics, World Bank, OEC. Threat = DWL composite of dependency, trajectory, diversification.</p>
      </div></section>

      {/* 006 BOTSWANA */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">006 &middot; Botswana</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">The diamond miracle, unwinding.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Seven billion dollars in 2021. Two billion in 2024. That&rsquo;s not a dip. The Debswana mines cut production by 40%. The government borrowed internationally for the first time. Public debt crossed 29% of GDP. The red area is what remains of the diamond miracle.</p>
        <BotswanaCollapse />
        <p className="text-[9px] text-[#737373] mt-4 italic">Sources: OEC, KP Statistics, AfDB, World Bank, IMF Article IV 2024.</p>
      </div></section>

      {/* 007 TIMELINE */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">007 &middot; 138 Years</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-12">1869 &mdash; 2026</h2>
        <div className="relative"><div className="absolute left-[7px] top-0 bottom-0 w-px bg-[#d4d4d4]" />
          {TIMELINE.map((t, i) => {
            const color = t.t === "origin" ? "#525252" : t.t === "power" ? "#0a0a0a" : t.t === "brand" ? "#0369A1" : t.t === "crisis" ? "#B45309" : "#991B1B"
            return (<div key={i} className="flex gap-4 mb-5"><div className="shrink-0"><div className="w-[14px] h-[14px] rounded-full border-2" style={{ borderColor: color, background: t.t === "power" || t.t === "collapse" ? color : "#fff" }} /></div><div><p className="font-mono text-[11px] font-bold mb-1" style={{ color }}>{t.y}</p><p className="text-[13px] text-[#525252] leading-relaxed">{t.e}</p></div></div>)
          })}
        </div>
        <div className="flex gap-4 flex-wrap mt-6 pt-4 border-t border-[#e5e5e5]">
          {[["Origin", "#525252"], ["Monopoly", "#0a0a0a"], ["Brand", "#0369A1"], ["Crisis", "#B45309"], ["Collapse", "#991B1B"]].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /><span className="text-[9px] uppercase tracking-[0.08em] text-[#737373]">{l}</span></div>
          ))}
        </div>
      </div></section>

      {/* CONNECTED INTELLIGENCE */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">008 &middot; Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">The pattern.</h2>
        <div className="space-y-10">
          {[
            { to: "Blood Diamonds", link: "/data/blood-diamonds", insight: "The other half. 4 million dead. The Kimberley Process designed to produce a statistic, not solve a problem." },
            { to: "The Silk Road Into Africa", link: "/data/the-silk-road-into-africa", insight: "China produces the lab-grown killing Botswana. China also builds the escape infrastructure. The disruptor and the rescuer." },
            { to: "The Blood Gold", link: "/data/the-blood-gold", insight: "Gold replaced diamonds as the preferred conflict mineral. Wagner in CAR \u2014 same countries, same extraction model." },
            { to: "The Atlantic Spine", link: "/data/the-atlantic-spine", insight: "Gas as the escape route from diamond dependency. Nigeria\u2019s $20B deal and Angola\u2019s oil pivot." },
          ].map((c, i) => (
            <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: "#991B1B" }}>
              <span className="text-[10px] text-[#991B1B] uppercase tracking-[0.1em] font-semibold">{c.to}</span>
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
          {OPEN_DATA.map((d, i) => <p key={i} className="text-[11px]"><span className="text-[#0a0a0a] font-semibold">{d.name}</span> <span className="text-[#0369A1]">({d.url})</span> <span className="text-[#737373]">&mdash; {d.use}</span></p>)}
        </div>
        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-[#e5e5e5]">
          <p className="text-[12px] text-[#737373]">Data compilation, visualisation &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p>
          <p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p>
        </div>
      </div></section>
    </div>
  )
}
