"use client"

import { useEffect, useRef } from "react"
import { AnimCounter, FadeIn, PopulationCollapse, CountryBubbles, ConservationEconomics, RegionalSplit, ThreatBreakdown } from "./charts"

/* ═══════════════════════════════════════════════════
   THE LAST LIONS
   Conservation economics of Africa's apex predator
   Magazine editorial. Observation not teaching.
   ═══════════════════════════════════════════════════ */

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

const MAP_MARKERS = [
  { name: "Serengeti-Mara", coords: [34.8, -2.3] as [number, number], color: "#B45309", size: 14, detail: "3,000+ lions. Cross-border Tanzania/Kenya. Great Migration." },
  { name: "Ruaha", coords: [34.9, -7.5] as [number, number], color: "#B45309", size: 12, detail: "10% of world\u2019s remaining lions. Human-wildlife conflict zone." },
  { name: "Ngorongoro", coords: [35.6, -3.2] as [number, number], color: "#B45309", size: 10, detail: "Crater population. Genetically isolated. ~60 lions." },
  { name: "Okavango", coords: [22.7, -19.8] as [number, number], color: "#047857", size: 12, detail: "Aquatic hunters. Delta ecosystem. Declining (0.97 growth rate)." },
  { name: "Kruger", coords: [31.5, -24.0] as [number, number], color: "#047857", size: 12, detail: "Fenced. High density. Bovine TB challenge." },
  { name: "Hwange", coords: [26.5, -18.5] as [number, number], color: "#047857", size: 11, detail: "Cecil\u2019s home. WildCRU long-term research site." },
  { name: "Kafue", coords: [25.8, -15.8] as [number, number], color: "#047857", size: 10, detail: "Zambia. Panthera anti-poaching. Recovering." },
  { name: "Gir Forest", coords: [70.8, 21.1] as [number, number], color: "#0369A1", size: 10, detail: "674 Asiatic lions. Only Asian population. Recovered from 180." },
  { name: "Pendjari", coords: [1.4, 11.0] as [number, number], color: "#DC2626", size: 8, detail: "~100 W. African lions. Last stronghold. African Parks." },
  { name: "Niassa", coords: [37.5, -12.5] as [number, number], color: "#047857", size: 9, detail: "Mozambique. 1,000+ lions. Anti-poaching patrols." },
  { name: "Murchison Falls", coords: [31.7, 2.3] as [number, number], color: "#B45309", size: 8, detail: "Uganda. Rebounded: 12 \u2192 130+ post-civil war." },
  { name: "Amboseli", coords: [37.3, -2.6] as [number, number], color: "#B45309", size: 8, detail: "Kenya. Maasai coexistence programs. Lion Guardians." },
  { name: "Etosha", coords: [16.0, -18.8] as [number, number], color: "#047857", size: 9, detail: "Namibia. Desert-adapted lions. Community conservancies." },
  { name: "KVTCA", coords: [24.0, -18.0] as [number, number], color: "#047857", size: 10, detail: "Kavango-Zambezi Transfrontier. 5 countries. Corridor." },
]

export function TheLionEconomicsContent() {
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
      const mapboxgl = (window as any).mapboxgl; if (!mapboxgl) return
      mapboxgl.accessToken = MAPBOX_TOKEN
      const map = new mapboxgl.Map({ container: mapContainer.current!, style: "mapbox://styles/mapbox/satellite-streets-v12", center: [25, -2], zoom: 3.4, pitch: 10, interactive: true, attributionControl: false })
      mapRef.current = map
      map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right")
      map.on("load", () => {
        MAP_MARKERS.forEach((m) => {
          const el = document.createElement("div")
          el.style.cssText = `width:${m.size}px;height:${m.size}px;border-radius:50%;background:${m.color};border:2px solid ${m.color}40;box-shadow:0 0 12px ${m.color}60;cursor:pointer;`
          new mapboxgl.Marker(el).setLngLat(m.coords).setPopup(
            new mapboxgl.Popup({ offset: 10, maxWidth: "280px", closeButton: false }).setHTML(
              `<div style="font-family:'IBM Plex Mono',monospace;padding:4px 0;"><p style="font-size:12px;font-weight:700;margin:0 0 4px;color:#0a0a0a;">${m.name}</p><p style="font-size:11px;color:#525252;margin:0;line-height:1.5;">${m.detail}</p></div>`
            )
          ).addTo(map)
        })
      })
    }
    document.head.appendChild(script)
    return () => { mapRef.current?.remove(); mapRef.current = null }
  }, [])

  return (
    <div className="bg-white text-[#262626]">

      {/* HERO */}
      <section className="bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, #991B1B10 0%, transparent 60%)" }} />
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 pt-28 pb-20 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#991B1B] mb-5 font-semibold">Data Module &middot; Conservation Economics</p>
          <h1 className="font-serif text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.88] tracking-[-0.02em] text-white">The Last<br />Lions</h1>
          <p className="text-[15px] text-white/40 mt-6 max-w-[480px] leading-relaxed">200,000 became 23,000. Extinct in 26 countries. They drive 8.5% of Africa&rsquo;s GDP but 90% of their protected areas are underfunded. The economics of a species being allowed to disappear.</p>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-x-10 gap-y-6">
            {[
              [23000, "~", "", "Wild lions remaining (2025)", 0],
              [88, "\u2212", "%", "Population decline since 1900", 0],
              [26, "", "", "African countries \u2014 lions extinct", 0],
              [7, "", "%", "Of historical range still occupied", 0],
              [20.5, "$", "B", "Safari tourism market (2025)", 1],
            ].map(([target, prefix, suffix, label, dec], i) => (
              <div key={i}>
                <p className="font-serif text-[28px] md:text-[34px] italic text-white leading-none">
                  <AnimCounter target={target as number} prefix={prefix as string} suffix={suffix as string} decimals={dec as number} />
                </p>
                <p className="text-[9px] uppercase tracking-[0.08em] text-white/30 mt-1.5 max-w-[160px]">{label as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="relative">
        <div ref={mapContainer} style={{ width: "100%", height: "60vh", minHeight: 440 }} />
        <div className="absolute bottom-4 left-4 md:left-10 flex gap-4 flex-wrap">
          {[["East Africa", "#B45309"], ["Southern Africa", "#047857"], ["West Africa (critical)", "#DC2626"], ["Asia", "#0369A1"]].map(([l, c]) => (
            <div key={l as string} className="flex items-center gap-1.5 bg-black/60 backdrop-blur px-2.5 py-1 rounded-sm">
              <div className="w-2 h-2 rounded-full" style={{ background: c as string }} />
              <span className="text-[9px] uppercase tracking-[0.06em] text-white/70">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 001: THE COLLAPSE */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 &middot; The Collapse</p>
          <h2 className="font-serif text-[28px] md:text-[40px] italic text-[#0a0a0a] leading-[1.0] mb-4">A century of bleeding.</h2>
          <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">In 1900, roughly 200,000 lions ranged from Senegal to India. By 1970, half were gone. The decline accelerated. Between 2006 and 2018, a further 25% disappeared. The species now occupies 7% of its historical range. The curve does not flatten. It steepens.</p>
          <PopulationCollapse />
        </div>
      </section>

      {/* 002: WHO HOLDS THE LAST PRIDES */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 &middot; The Last Prides</p>
          <h2 className="font-serif text-[28px] md:text-[40px] italic text-[#0a0a0a] leading-[1.0] mb-4">Tanzania holds half. Five countries hold 75%.</h2>
          <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Tanzania has more lions than every other country combined. South Africa, Botswana, Kenya, and Zambia hold most of the rest. In West and Central Africa, where lions are genetically distinct from their eastern cousins and more closely related to <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Asiatic lion</span>s, perhaps 342 remain. The Central African Republic has 10.</p>
          <CountryBubbles />
        </div>
      </section>

      {/* 003: THE TWO AFRICAS */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 &middot; Two Africas</p>
          <h2 className="font-serif text-[28px] md:text-[40px] italic text-[#0a0a0a] leading-[1.0] mb-4">Southern lions are stable. The rest are vanishing.</h2>
          <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The continental average masks a sharp geographic split. Botswana, Namibia, South Africa, and Zimbabwe report stable or increasing populations &mdash; inside fenced, funded reserves. Everywhere else, the trajectory is down. West and Central African lions face a 67% probability of halving within two decades. The well-managed south masks the extinction happening in the north and west.</p>
          <RegionalSplit />
        </div>
      </section>

      {/* 004: WHAT KILLS LIONS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 &middot; What Kills Lions</p>
          <h2 className="font-serif text-[28px] md:text-[40px] italic text-[#0a0a0a] leading-[1.0] mb-4">Habitat loss. Then poison. Then hunger.</h2>
          <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Ninety-three percent of lion range has been converted to farms, roads, and cities. What remains is fragmented &mdash; corridors severed, gene flow blocked. Around villages bordering Ruaha National Park, 25 lions were killed in a single year in an area of less than 500 km&sup2;. In areas managed for trophy hunting, the recommended quota is 0.5 lions per 1,000 km&sup2;. Where lions have no economic value, killing runs 100 times higher.</p>
          <ThreatBreakdown />
        </div>
      </section>

      {/* 005: THE ECONOMICS */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 &middot; The Economics</p>
          <h2 className="font-serif text-[28px] md:text-[40px] italic text-[#0a0a0a] leading-[1.0] mb-4">They generate billions. They receive millions.</h2>
          <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Africa&rsquo;s safari tourism market is worth $20.5 billion and growing. Lions are the primary draw &mdash; 80% of international visitors cite wildlife as their reason for coming. Wildlife tourism supports 24 million jobs and contributes 8.5% of continental GDP. Yet it costs $1 billion a year to properly protect lion habitats. Current funding is $381 million. The gap is $619 million. The species that funds the industry is being allowed to fund its own extinction.</p>
          <ConservationEconomics />
        </div>
      </section>

      {/* THE ESSAY */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-6">006 &middot; The Pattern</p>
          <FadeIn>
            <p className="text-[15px] text-[#262626] leading-[1.8] mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Rwanda figured out the gorilla. One thousand <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">mountain gorilla</span>s generate $19.2 million in permit fees alone. Fifteen percent of the country&rsquo;s GDP runs through tourism. The gorilla population is the only great ape that is increasing. The model is not complicated: make the animal worth more alive than dead to the people who live beside it.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[15px] text-[#262626] leading-[1.8] mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Nobody has done this for the lion. Not at scale. A farmer outside Ruaha whose cow is killed by a lion does not see the $20.5 billion safari industry. The farmer sees a dead cow. The farmer poisons the carcass. Twenty-five lions die in one year in one area smaller than a single Texan ranch. The economics are local. The extinction is continental.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[15px] text-[#262626] leading-[1.8] mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              In the Maasai Mara, some conservation models now pay communities that show an increase in lion numbers. The Lion Guardians programme in Kenya employs <span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Maasai warriors</span> &mdash; the same men who once proved manhood by killing lions &mdash; to track and protect them. Namibia&rsquo;s desert-adapted lions recovered from 20 individuals to over 150 through community conservancies where locals receive direct tourism revenue. These programmes work. They are also small.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-[15px] text-[#262626] leading-[1.8] mb-6" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              The trophy hunting argument collapses on inspection. It generates 1.8% of total tourism revenue. Three percent reaches local communities. The IUCN says lion populations cannot sustain the current kill rate of 600 per year. Ecotourism generates 15 times more revenue. The argument is not about conservation. It is about who profits from the killing.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-[15px] text-[#525252] leading-[1.8]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              Cecil was worth $1 million alive over his lifetime in tourist revenue. His killer paid $55,000. That ratio &mdash; 18:1 &mdash; is the entire conservation economics story in two numbers. The species that built Africa&rsquo;s tourism industry is being extinguished because no one has built the financial architecture to pay for its survival. The money exists. The mechanism does not.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <FadeIn>
            <div className="border-l-[3px] border-[#991B1B] pl-6 md:pl-10">
              <p className="font-serif text-[22px] md:text-[28px] italic text-[#0a0a0a] leading-[1.3]">
                The gorilla is the success story. The lion is the warning. Same continent. Same century. Different architecture.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONNECTED INTELLIGENCE */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">007 &middot; Connected Intelligence</p>
          <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">Every extinction is an economic event.</h2>
          <div className="space-y-10">
            {[
              { to: "The Gorilla Dividend", link: "/data/the-gorilla-dividend", insight: "Rwanda proved the model: make the animal worth more alive than dead. Mountain gorillas are the only great ape whose population is increasing. Lions could follow the same economics \u2014 if anyone built the mechanism." },
              { to: "The Sahel War", link: "/data/the-sahel-war", insight: "Conflict zones are extinction zones. West Africa\u2019s last 342 lions survive in countries where militias compete for territory and wildlife departments exist on paper only. Conservation requires stability." },
              { to: "The Silk Road Into Africa", link: "/data/the-silk-road-into-africa", insight: "Chinese infrastructure is being built across lion habitat. 10,000km of railways, 100,000km of roads. The corridors that connect lion populations are the same corridors that carry freight." },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: "#991B1B" }}>
                  <span className="text-[10px] text-[#991B1B] uppercase tracking-[0.1em] font-semibold">{c.to}</span>
                  <p className="text-[14px] text-white/50 leading-relaxed max-w-[560px] mt-2" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{c.insight}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SOURCES */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-8">Sources &amp; Attribution</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              ["IUCN CatSG", "Lion Fact Sheet \u2014 Population & Conservation Status (2025)"],
              ["LionAid", "2025 Synthesis of Lion Numbers in Africa"],
              ["Loveridge et al.", "Diversity & Distributions (2022) \u2014 Baselines for range & population"],
              ["Bauer et al.", "PNAS (2015) \u2014 Lion populations declining rapidly across Africa"],
              ["WildCRU, University of Oxford", "Lions on the Brink \u2014 Ecological & socio-political fragility (2023)"],
              ["Lindsey et al.", "PNAS (2018) \u2014 Costs of securing lion protected areas ($1B/yr)"],
              ["Grand View Research", "Africa Safari Tourism Market (2025) \u2014 $20.5B, 6.7% CAGR"],
              ["Economists at Large", "The Lion\u2019s Share (2017) \u2014 Trophy hunting economics analysis"],
              ["African Wildlife Foundation", "Conservation & Tourism (2024), Lion Recovery"],
              ["Lion Recovery Fund / WCN", "Distribution & Status \u2014 Historical and current range data"],
              ["Wild Africa", "Lions Extinct in Over Half of African Countries (Aug 2025)"],
              ["World Animal Protection", "Lion Protection Fee research (2023)"],
            ].map(([org, doc], i) => (
              <div key={i} className="text-[11px]">
                <span className="text-[#0a0a0a] font-semibold">{org}</span>{" "}
                <span className="text-[#737373]">&mdash; {doc}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-[#e5e5e5]">
            <p className="text-[12px] text-[#737373]">Data compilation, cartography, and analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p>
            <p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p>
          </div>
        </div>
      </section>
    </div>
  )
}
