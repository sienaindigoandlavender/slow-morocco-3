"use client"

import { useEffect, useRef } from "react"
import {
  useInView, AnimCounter, DeathTollChart, ACLEDChart,
  SmugglingFlow, KPFailureRadial, DisplacementChart,
} from "./charts"

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

const MAP_MARKERS = [
  { name: "Sierra Leone", coords: [-11.8, 8.5] as [number, number], color: "#991B1B", detail: "75,000 killed. 20,000 mutilated. The original blood diamond.", pulse: false },
  { name: "Angola", coords: [17.9, -12.5] as [number, number], color: "#991B1B", detail: "500,000 dead. UNITA. 27 years of war.", pulse: false },
  { name: "DRC — North Kivu", coords: [29.0, -1.5] as [number, number], color: "#DC2626", detail: "M23 took Goma (Jan 2025). 6M+ dead since 1996.", pulse: true },
  { name: "DRC — South Kivu", coords: [28.8, -2.8] as [number, number], color: "#DC2626", detail: "Bukavu fell Feb 2025. Conflict minerals hub.", pulse: true },
  { name: "CAR", coords: [18.6, 6.6] as [number, number], color: "#DC2626", detail: "Embargo lifted Nov 2024. Wagner/Africa Corps present.", pulse: true },
  { name: "Zimbabwe (Marange)", coords: [32.4, -20.3] as [number, number], color: "#B45309", detail: "200+ miners massacred. KP said: not conflict.", pulse: false },
  { name: "Liberia", coords: [-9.4, 6.4] as [number, number], color: "#991B1B", detail: "250,000 dead. Charles Taylor. Timber + diamonds.", pulse: false },
  { name: "Cameroon (transit)", coords: [12.3, 5.9] as [number, number], color: "#B45309", detail: "Smuggling route for CAR diamonds.", pulse: false },
  { name: "Uganda (transit)", coords: [32.3, 0.3] as [number, number], color: "#B45309", detail: "$2.25B gold it doesn't produce. DRC mineral route.", pulse: false },
  { name: "India (Surat)", coords: [72.8, 21.2] as [number, number], color: "#0a0a0a", detail: "Cuts 90%+ of world's diamonds. Origin erased.", pulse: false },
]

const TIMELINE = [
  { y: "1991", e: "Sierra Leone civil war. RUF mines $125M/year in diamonds.", t: "war" },
  { y: "1998", e: "Global Witness publishes 'A Rough Trade.' Diamond-war nexus exposed.", t: "exposure" },
  { y: "2000", e: "Fowler Report names countries and individuals. UN Resolution 1295.", t: "exposure" },
  { y: "2002", e: "Sierra Leone + Angola wars end. 4 million dead across both.", t: "war" },
  { y: "2003", e: "Kimberley Process launched. 82 countries. Self-certification.", t: "kp" },
  { y: "2008", e: "Zimbabwe army seizes Marange. 200+ miners massacred. KP: not conflict.", t: "failure" },
  { y: "2011", e: "Global Witness withdraws from KP. Calls it a 'fig leaf.'", t: "failure" },
  { y: "2013", e: "CAR civil war. KP suspends exports. Diamonds fund both sides.", t: "war" },
  { y: "2018", e: "Wagner deploys to CAR. Russia gains influence in diamond zone.", t: "war" },
  { y: "2024", e: "KP lifts CAR embargo (Nov). M23 resurgent in DRC.", t: "failure" },
  { y: "2025", e: "M23 takes Goma, Bukavu, Walikale. 7M+ displaced in DRC.", t: "war" },
]

const SOURCES = [
  "ACLED — Conflict events database (acleddata.com)",
  "United Nations — Security Council Resolutions, Fowler Report, Panel of Experts",
  "Human Rights Watch — Marange, DRC mining documentation",
  "Global Witness — 'A Rough Trade' (1998), KP withdrawal (2011)",
  "UN Comtrade — Diamond trade flows, bilateral asymmetry analysis",
  "UNHCR / HDX — Displacement data (data.humdata.org)",
  "Kimberley Process — Production statistics, CAR embargo decisions",
  "Amnesty International — DRC conflict minerals, child labor",
  "WorldPop — Population grids (worldpop.org)",
  "Copernicus / Sentinel-2 — Mining site satellite imagery",
]

export function BloodDiamondsContent() {
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
      const map = new mb.Map({ container: mapContainer.current!, style: "mapbox://styles/mapbox/dark-v11", center: [18, 2], zoom: 3.5, interactive: true, attributionControl: false })
      mapRef.current = map
      map.addControl(new mb.NavigationControl({ showCompass: false }), "top-right")
      map.on("load", () => {
        const style = document.createElement("style")
        style.textContent = "@keyframes mapPulse{0%{box-shadow:0 0 0 0 rgba(220,38,38,0.6)}70%{box-shadow:0 0 0 14px rgba(220,38,38,0)}100%{box-shadow:0 0 0 0 rgba(220,38,38,0)}}"
        document.head.appendChild(style)
        MAP_MARKERS.forEach(m => {
          const el = document.createElement("div")
          const sz = m.pulse ? 16 : 11
          el.style.cssText = `width:${sz}px;height:${sz}px;border-radius:50%;background:${m.color};cursor:pointer;transition:transform 0.2s;border:2px solid ${m.color}50;`
          if (m.pulse) el.style.animation = "mapPulse 2s ease-in-out infinite"
          el.onmouseenter = () => { el.style.transform = "scale(1.4)" }
          el.onmouseleave = () => { el.style.transform = "scale(1)" }
          new mb.Marker(el).setLngLat(m.coords).setPopup(
            new mb.Popup({ offset: 10, maxWidth: "280px", closeButton: false }).setHTML(
              `<div style="font-family:system-ui;padding:4px 0"><p style="font-size:13px;font-weight:700;color:#fff;margin:0 0 4px">${m.name}</p><p style="font-size:11px;color:#a3a3a3;margin:0">${m.detail}</p></div>`
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
      <section className="bg-[#0a0a0a] px-6 md:px-10 pt-24 pb-16">
        <div className="max-w-[1000px] mx-auto">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#DC2626] mb-4 font-semibold">Data Module &middot; Visual Intelligence</p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] text-white">Blood<br />Diamonds</h1>
          <p className="font-serif text-[clamp(1.1rem,2.5vw,1.5rem)] text-white/40 italic mt-3">Conflict, Death &amp; the Kimberley Process Failure</p>
          <p className="text-[13px] text-white/50 leading-relaxed mt-8 max-w-[600px]">In 2008, the Zimbabwean army walked into the Marange diamond fields and killed over 200 artisanal miners. Helicopter gunships. Mass graves. The Kimberley Process reviewed the case and ruled it did not meet the definition of conflict diamonds. The definition requires rebel movements. The army is the government. The system worked exactly as designed.</p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-6">
            <div><p className="font-serif text-[32px] italic text-[#DC2626] leading-none"><AnimCounter target={4} suffix="M+" /></p><p className="text-[9px] uppercase tracking-[0.08em] text-white/30 mt-1">Dead in diamond wars</p></div>
            <div><p className="font-serif text-[32px] italic text-white leading-none"><AnimCounter target={20000} suffix="" /></p><p className="text-[9px] uppercase tracking-[0.08em] text-white/30 mt-1">Civilians mutilated</p></div>
            <div><p className="font-serif text-[32px] italic text-white leading-none"><AnimCounter target={15} suffix="M+" /></p><p className="text-[9px] uppercase tracking-[0.08em] text-white/30 mt-1">Displaced (historical)</p></div>
            <div><p className="font-serif text-[32px] italic text-[#DC2626] leading-none">0</p><p className="text-[9px] uppercase tracking-[0.08em] text-white/30 mt-1">Ways to trace cut stone</p></div>
            <div><p className="font-serif text-[32px] italic text-[#DC2626] leading-none"><AnimCounter target={7} suffix="M+" /></p><p className="text-[9px] uppercase tracking-[0.08em] text-white/30 mt-1">Displaced in DRC now</p></div>
          </div>
        </div>
      </section>

      {/* MAP — dark style */}
      <section className="relative"><div ref={mapContainer} style={{ width: "100%", height: "50vh", minHeight: 380 }} /></section>

      {/* 001 DEATH TOLL */}
      <section className="border-t border-[#e5e5e5] mt-0"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 &middot; The Wars</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">What the stone cost.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The DRC bar is on a logarithmic scale because if it were linear, you wouldn&rsquo;t see Sierra Leone. You wouldn&rsquo;t see Angola. Six million dead is a number that breaks the chart. It&rsquo;s also a number that breaks the Kimberley Process claim that conflict diamonds are &ldquo;less than 1%.&rdquo; They redefined the problem until the statistic improved.</p>
        <DeathTollChart />
        <p className="text-[9px] text-[#737373] mt-6 italic">Sources: UN Truth &amp; Reconciliation Commissions, UNHCR, ACLED, Human Rights Watch. DRC figure includes all causes (conflict, disease, displacement).</p>
      </div></section>

      {/* 002 ACLED */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#DC2626] mb-3">002 &middot; Live Data &middot; ACLED 2024</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Diamond zones. Conflict events vs fatalities.</h2>
        <p className="text-[10px] uppercase tracking-[0.08em] text-[#DC2626] mb-1 font-semibold">This is not history. This is now.</p>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">ACLED counts every act of political violence on the continent. Date, coordinates, who did it, who died. In North Kivu alone, they counted 3,100 events in 2024. The ADF &mdash; pledged to Islamic State &mdash; killed 1,300 civilians. The most violent actor toward civilians in the Great Lakes. Then in January 2025, M23 took Goma. February, Bukavu. March, the mining hub Walikale &mdash; the farthest west they&rsquo;ve ever reached. The grey bars are the violence. The red bars are the dying.</p>
        <ACLEDChart />
        <p className="text-[9px] text-[#737373] mt-4 italic">Source: ACLED (acleddata.com). Conflict Watchlist 2025, Great Lakes analysis. Free registration for full dataset download.</p>
      </div></section>

      {/* 003 DISPLACEMENT */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 &middot; Where the People Went</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Seven million people with nowhere to go.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The red band grows every year because the fighting doesn&rsquo;t stop. 780,000 people displaced between November 2024 and January 2025. Three months. 100,000 refugees crossed into Burundi, Uganda, Rwanda, Tanzania. Before the latest M23 offensive, 21 million Congolese already needed humanitarian aid &mdash; the highest figure of any country on earth.</p>
        <DisplacementChart />
        <p className="text-[9px] text-[#737373] mt-4 italic">Source: UNHCR Operational Data Portal, HDX (data.humdata.org), UN OCHA. Figures in millions.</p>
      </div></section>

      {/* 004 KP FAILURE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 &middot; The Kimberley Process</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Designed to produce a statistic. Not to solve a problem.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Global Witness spent years building the Kimberley Process. In 2011, they walked away. Called it a &ldquo;fig leaf.&rdquo; Their own creation. Six things the system was supposed to do. It does none of them. The radial has no green because there is nothing to fill.</p>
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2"><KPFailureRadial /></div>
          <div className="md:w-1/2 space-y-4">
            {[
              "Definition excludes state violence, forced labor, and child labor.",
              "No scientific method to trace a cut diamond to its origin.",
              "Countries certify their own exports. No independent verification.",
              "Smuggling routes from CAR, DRC, Zimbabwe remain intact.",
              "Changed \u201c15% conflict\u201d to \u201c<1%\u201d by redefining conflict.",
              "Blockchain traces from entry point. Problem is before that \u2014 in the mines.",
            ].map((f, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-[#DC2626] text-[16px] font-bold leading-none mt-0.5">{"\u2716"}</span>
                <p className="text-[13px] text-[#525252] leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </div>
      </div></section>

      {/* 005 SMUGGLING */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 &middot; Smuggling Routes</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Mine to market. How origin disappears.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Follow the flow from left to right. A stone leaves a mine in eastern DRC controlled by M23 &mdash; a group backed by Rwanda with 4,000 troops. It crosses into Uganda. Uganda exported $2.25 billion in gold it doesn&rsquo;t produce. Nobody asked. The stone reaches Surat, where 90% of the world&rsquo;s diamonds are cut. Once cut, no laboratory on earth can tell where it came from. It enters Antwerp as a legitimate stone. Origin: erased.</p>
        <SmugglingFlow />
        <p className="text-[9px] text-[#737373] mt-4 italic">Sources: Global Witness, UN Panel of Experts, KP Statistics, UN Comtrade bilateral asymmetry analysis. Flow widths proportional to estimated volume.</p>
      </div></section>

      {/* 006 TIMELINE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">006 &middot; Timeline</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-12">1991 &mdash; 2025</h2>
        <div className="relative"><div className="absolute left-[7px] top-0 bottom-0 w-px bg-[#d4d4d4]" />
          {TIMELINE.map((t, i) => {
            const color = t.t === "war" ? "#991B1B" : t.t === "exposure" ? "#0369A1" : t.t === "kp" ? "#525252" : "#B45309"
            return (<div key={i} className="flex gap-4 mb-5"><div className="shrink-0"><div className="w-[14px] h-[14px] rounded-full border-2" style={{ borderColor: color, background: t.t === "war" || t.t === "failure" ? color : "#fff" }} /></div><div><p className="font-mono text-[11px] font-bold mb-1" style={{ color }}>{t.y}</p><p className="text-[13px] text-[#525252] leading-relaxed">{t.e}</p></div></div>)
          })}
        </div>
        <div className="flex gap-4 flex-wrap mt-6 pt-4 border-t border-[#e5e5e5]">
          {[["War", "#991B1B"], ["Exposure", "#0369A1"], ["KP Launch", "#525252"], ["KP Failure", "#B45309"]].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /><span className="text-[9px] uppercase tracking-[0.08em] text-[#737373]">{l}</span></div>
          ))}
        </div>
      </div></section>

      {/* CONNECTED INTELLIGENCE */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">007 &middot; Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">The pattern.</h2>
        <div className="space-y-10">
          {[
            { to: "A Diamond Is Not Forever", link: "/stories/a-diamond-is-not-forever", insight: "De Beers built the demand that made diamonds worth killing for. The economic collapse and the human cost \u2014 two sides of the same stone." },
            { to: "The Blood Gold", link: "/stories/the-blood-gold", insight: "Gold replaced diamonds as the preferred conflict mineral. Wagner/Africa Corps in CAR \u2014 same territory, same extraction, different mineral." },
            { to: "The Shadow State", link: "/stories/the-shadow-state", insight: "Al-Shabaab\u2019s $200M/year revenue comes from the same shadow economy model diamond-funded armed groups pioneered." },
            { to: "The Lake of Fire", link: "/stories/the-lake-of-fire", insight: "The armed group business model \u2014 control territory, extract resources, build parallel governance \u2014 was perfected in the diamond wars." },
          ].map((c, i) => (
            <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: "#DC2626" }}>
              <span className="text-[10px] text-[#DC2626] uppercase tracking-[0.1em] font-semibold">{c.to}</span>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-[560px] mt-2">{c.insight}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* SOURCES */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-6">Sources &amp; Open Data</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {SOURCES.map((s, i) => <p key={i} className="text-[11px] text-[#525252]">{s}</p>)}
        </div>
        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-[#e5e5e5]">
          <p className="text-[12px] text-[#737373]">Data compilation, visualisation &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p>
          <p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p>
        </div>
      </div></section>
    </div>
  )
}
