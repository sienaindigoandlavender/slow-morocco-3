'use client'

import { useEffect, useRef } from 'react'
import {
  useInView, AnimCounter,
  MechanismScorecard, RecoveryStories, FailurePatterns, ModelTaxonomy,
} from './charts'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const MAP_MARKERS = [
  { name: 'Rwanda — Gorilla Permits', coords: [29.53, -1.45] as [number, number], color: '#15803d', detail: '$1,500/permit. Population 254→1,063. Only great ape increasing. 10% revenue to communities.', sz: 14 },
  { name: 'Namibia — Community Conservancies', coords: [17.0, -21.5] as [number, number], color: '#B45309', detail: '86 conservancies. 20% of country. Elephants 7k→26k. 45.6% under conservation.', sz: 14 },
  { name: 'Amboseli — Lion Guardians', coords: [37.25, -2.65] as [number, number], color: '#A16207', detail: '65+ warriors. 1M acres. Lion killing -99%. Population tripled.', sz: 12 },
  { name: 'Gorongosa — Restoration Project', coords: [34.35, -18.97] as [number, number], color: '#047857', detail: '10k→110k+ animals. Lions 6→210. 1,800 employees. $100M+ invested.', sz: 14 },
  { name: 'Akagera — African Parks', coords: [30.45, -1.9] as [number, number], color: '#0369A1', detail: 'Rhino reintroduced. 100 white rhino. $4.7M revenue 2024. Model park.', sz: 10 },
  { name: 'Garamba — African Parks', coords: [29.5, 3.75] as [number, number], color: '#0369A1', detail: 'DRC. Rhino rewilding destination 2025. Former last northern white rhino site.', sz: 10 },
  { name: 'Lewa — Kenya Conservancy', coords: [37.4, 0.2] as [number, number], color: '#A16207', detail: 'First Kenya conservancy on private land. NRT template. Grevy\'s zebra stronghold.', sz: 10 },
  { name: 'Masai Mara — Conservancies', coords: [35.3, -1.5] as [number, number], color: '#A16207', detail: '83% of large mammals in conservancies, not the national reserve. 25% of ecosystem.', sz: 12 },
  { name: 'Hwange — CAMPFIRE zone', coords: [26.5, -18.5] as [number, number], color: '#991B1B', detail: 'Zimbabwe. CAMPFIRE pioneer area. Revenue capture by district councils limited impact.', sz: 10 },
  { name: 'Okavango Delta — Botswana', coords: [22.7, -19.6] as [number, number], color: '#737373', detail: '~130k elephants. Hunting ban 2014, reversed 2019. Community opposition to ban.', sz: 12 },
  { name: 'Skeleton Coast — Desert Lions', coords: [12.8, -19.8] as [number, number], color: '#B45309', detail: 'Lions hunt seals on beaches. 20→~180→57-60. Drought stress test. Unique globally.', sz: 10 },
  { name: 'Kruger / Greater Kruger', coords: [31.5, -24.0] as [number, number], color: '#0369A1', detail: '120 rhino rewilded from African Parks. 33 calves born. Rhino Rewild destination.', sz: 12 },
  { name: 'Virunga — DRC', coords: [29.2, -1.3] as [number, number], color: '#991B1B', detail: 'Mountain gorilla habitat under perpetual threat. M23 conflict. Rangers killed annually.', sz: 10 },
  { name: 'Zakouma — African Parks', coords: [19.8, 10.9] as [number, number], color: '#0369A1', detail: 'Chad. Elephant 1,000→559→1,000+ recovery. Poaching network dismantled.', sz: 10 },
]

const SOURCES = [
  'NACSO — State of Community Conservation in Namibia (annual reports 1998–2025)',
  'Maliasili (2024) — Community conservancies in Africa: scale, success, and comparative data',
  'African Parks — Annual Report 2024. 23 parks, 13 countries, 20M hectares',
  'Rwanda Development Board — Gorilla permit revenue, tourism statistics 2024',
  'Lion Guardians — Programme monitoring data, efficacy studies (2007–2024)',
  'Gorongosa Restoration Project / BBVA Foundation Award (2024) — 10k→110k+ animals',
  'Indufor / Campaign for Nature / Pew (2025) — State of International 30×30 Funding',
  'Funston, Lindsey et al. (2025) — Range-wide assessment of threats to African lion',
  'Heydinger et al. (2024) — First systematic survey of desert-adapted lions, NW Namibia',
  'Kenya Wildlife Service / WRTI — National Wildlife Census 2025',
  'TRAFFIC / IUCN (2025) — CITES CoP20 African rhino status report',
  'Yale E360 (2024) — How African Communities Are Taking Lead on Protecting Wildlife',
]

export function TheConservationPlaybookContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'; link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.css'
    document.head.appendChild(link)
    const script = document.createElement('script')
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.1.2/mapbox-gl.js'
    script.onload = () => {
      const mb = (window as any).mapboxgl; if (!mb) return
      mb.accessToken = MAPBOX_TOKEN
      const map = new mb.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [25.0, -5.0], zoom: 3.2, interactive: true, attributionControl: false })
      mapRef.current = map
      map.addControl(new mb.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        MAP_MARKERS.forEach(m => {
          const el = document.createElement('div')
          el.style.cssText = `width:${m.sz}px;height:${m.sz}px;border-radius:50%;background:${m.color};border:2px solid rgba(255,255,255,0.8);box-shadow:0 0 12px ${m.color}60;cursor:pointer;transition:transform 0.2s;`
          el.onmouseenter = () => { el.style.transform = 'scale(1.4)' }
          el.onmouseleave = () => { el.style.transform = 'scale(1)' }
          new mb.Marker(el).setLngLat(m.coords).setPopup(
            new mb.Popup({ offset: 12, maxWidth: '280px', closeButton: false }).setHTML(
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
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 150 · Conservation Economics</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Conservation<br />Playbook</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">
            Five mechanisms. Ten models. Four success stories. Six failure patterns. Every working conservation programme in Africa shares the same structural DNA. Every failure is missing the same pieces. This is the field guide to what actually works — and why it has not been replicated.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { n: 5, s: '', l: 'mechanisms that work' },
              { n: 10, s: '', l: 'models scored' },
              { n: 110, s: 'k+', l: 'animals recovered (gorongosa)' },
              { n: 2000, s: '', l: 'rhino being rewilded' },
              { n: 45.6, s: '%', l: 'of namibia conserved', d: 1 },
            ].map(k => (
              <div key={k.l}>
                <p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none">
                  <AnimCounter target={k.n} decimals={(k as any).d || 0} />{k.s}
                </p>
                <p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 15% 50%, #047857 0%, transparent 40%), radial-gradient(circle at 50% 30%, #B45309 0%, transparent 40%), radial-gradient(circle at 85% 60%, #0369A1 0%, transparent 40%)' }} />
      </section>

      {/* MAP */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Field</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Where conservation is working. Where it is not. And why.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Green markers: models producing measurable wildlife recovery. Amber: community-led systems with proven results. Blue: African Parks franchise operations. Red: programmes that failed or are under critical threat. Each marker represents a different philosophy of how humans and wildlife can coexist &mdash; or cannot.</p>
        <div ref={mapContainer} style={{ width: '100%', height: 520, borderRadius: 8, overflow: 'hidden', background: '#1a1a1a' }} />
        <div className="flex gap-4 flex-wrap mt-4">
          {[['Philanthropic PPP', '#047857'], ['Community Model', '#B45309'], ['Cultural Guardians', '#A16207'], ['African Parks', '#0369A1'], ['Failed / Threatened', '#991B1B'], ['Debated', '#737373']].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /><span className="text-[9px] uppercase tracking-wider text-[#737373]">{l}</span></div>
          ))}
        </div>
      </div></section>

      {/* 002 TAXONOMY */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Five Architectures</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Not one model. Five. Each built for different terrain.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The debate over &ldquo;what works&rdquo; in African conservation fails because it assumes a single answer. There are five distinct architectures, each optimised for different conditions. Namibia&rsquo;s conservancy model requires democratic tradition and tourism markets. Rwanda&rsquo;s permit model requires charismatic megafauna and political stability. <span className="underline underline-offset-2">Gorongosa</span>&rsquo;s philanthropic model requires a Greg Carr. The question is not which is best. The question is which fits the landscape, the people, and the political economy.</p>
        <ModelTaxonomy />
      </div></section>

      {/* 003 SCORECARD */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Scorecard</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Five mechanisms. Ten models. Score them honestly.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Every successful conservation programme uses at least two of five mechanisms. Every failure uses zero or one. The mechanisms are not ideological. They are structural. They do not require agreement about values. They require agreement about architecture. Community ownership. Direct economic benefit. Professional management. Cultural integration. Governance. Mix at least two strongly and the wildlife recovers. Miss all five and you get South Africa&rsquo;s captive lion industry: 10,000 lions, zero conservation value.</p>
        <MechanismScorecard />
      </div></section>

      {/* 004 RECOVERIES */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Recoveries</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">They said it was impossible. The numbers say otherwise.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Gorongosa: 10,000 to 110,000 animals in twenty years. Rwanda: 254 gorillas to 1,063. Namibia: 7,000 elephants to 26,000. Amboseli: 42 lion kills per year to zero. Akagera: zero rhinos to 100. These are not anecdotes. They are measured population data from peer-reviewed surveys. The argument that &ldquo;conservation doesn&rsquo;t work in Africa&rdquo; is empirically false. It works where the architecture exists.</p>
        <RecoveryStories />
      </div></section>

      {/* 005 FAILURES */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · The Failure Patterns</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Six ways to kill a conservation programme.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Failures are more instructive than successes because they repeat. Every failed programme in African conservation can be traced to one or more of six structural patterns. Revenue capture: the money exists but doesn&rsquo;t reach communities. Single donor dependency: one exit collapses everything. Cultural imposition: conservation designed for Western donors, not local people. Perverse incentives: killing pays more than protecting. Conflict. Climate. Know the patterns, and you can diagnose any programme on earth in five minutes.</p>
        <FailurePatterns />
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">006 · The Pattern</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">What the successes share. What the failures lack.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>Rwanda charges $1,500 for one hour with the gorillas. Namibia put environmental protection in its constitution. In Amboseli, the warriors who once killed lions now name them. In Gorongosa, six lions became two hundred. At Akagera, rhinos now live in a country that twenty-five years ago was synonymous with genocide. African Parks manages twenty-three national parks across thirteen countries and is rewilding two thousand rhinos. These are not similar programmes. They share almost nothing in method, philosophy, scale, or funding model.</p>
          <p>What they share is structural: the people who bear the cost of living with wildlife receive direct, tangible, personal benefit from its survival. In Rwanda, communities get 10% of gorilla revenue. In Namibia, conservancy committees distribute hunting and tourism income to members. In Amboseli, warriors get a $100/month salary. In Gorongosa, 1,800 people have jobs. In African Parks sites, $4.9 million flowed to communities in 2024 alone.</p>
          <p>The mechanisms vary. The principle does not. When a Maasai warrior loses three cows to a lion and receives nothing in return, he kills the next lion. When the same warrior receives a salary to protect lions, he intercepts the hunting party. This is not ideology. It is arithmetic.</p>
          <p>The failures share an equally consistent pattern: money exists in the system but does not reach the people who live with the animals. CAMPFIRE generated revenue but district councils captured it. Trophy hunting generates 1.8% of tourism revenue; 3% reaches communities. South Africa's captive lion industry exists entirely outside the conservation economy. National park gate fees enter treasury accounts and are never seen again by the communities on the park boundary.</p>
          <p>Climate and conflict add complexity but they do not change the underlying logic. Namibia's 11-year drought stressed the conservancy system. COVID halved its revenue. A 723-animal cull fed communities. But the system survived because the governance structure existed. Where governance is absent — in the Sahel, in eastern DRC, in Cabo Delgado — wildlife disappears regardless of how much money is spent.</p>
          <p>The most uncomfortable insight: the model that produces the best community-level outcomes — Namibia's conservancies — relies partly on trophy hunting, which generates approximately 50% of conservancy benefits. Ninety-one percent of community members oppose a ban. Western donors frequently condition aid on anti-hunting policies. The communities who live with elephants disagree with the people who fund their protection. This contradiction is not going away.</p>
          <p>The second most uncomfortable insight: conservation that works costs almost nothing compared to the value it protects. A Lion Guardian costs $1,200 per year to employ. The lion he protects generates $1 million in tourism revenue over its lifetime. The return on investment is 800:1. But the return is captured by lodges and park fees. The investment comes from donors in the United States and Europe. The economics are inverted. Fix the plumbing and the funding problem largely solves itself.</p>
        </div>
      </div></section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#047857' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">
              Most of Africa&rsquo;s biodiversity depends on lands owned and managed by local communities. These communities are on the front line, and their conservation practices are key to sustaining and restoring healthy ecosystems. Nearly two-thirds of Kenya&rsquo;s large mammals are found in communal and private lands, not in state-protected areas.
            </p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Fred Nelson, CEO of Maliasili</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED INTELLIGENCE */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">007 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">Go deeper.</h2>
        <div className="space-y-10">
          {[
            { to: 'The Conservation Deficit', insight: 'The systemic view. $29.3B in wildlife tourism GDP, $1.1B in conservation funding, $4B annual shortfall. Six visualizations mapping the architecture that doesn\'t exist.' },
            { to: 'The Lion Guardians', insight: 'Amboseli-Tsavo, Kenya. The cultural guardian model in full detail. 42 lions killed in 2006. Zero in 2024. The warriors\' own idea. The act of naming as cultural transformation.' },
            { to: 'The Namibia Model', insight: 'The community conservancy architecture. 86 conservancies. 45.6% of the country. The pioneer stories, the revenue debate, and the stress test: drought + COVID + cull.' },
            { to: 'The Gorilla Dividend', insight: 'Rwanda\'s high-value permit model. $1,500 per hour. Population 254→1,063. $200M revenue from 0.1% of land. The only great ape that is increasing.' },
            { to: 'The Lion Economics', insight: 'Continental lion economics. $20.5B safari market. 200,000→23,000. Dead vs alive valuations. Why the math works but the plumbing doesn\'t.' },
            { to: 'The Last Lions', insight: 'The Barbary lion. What happens when nobody builds the architecture. 100,000 years in North Africa. Extinct by the 1960s. ~90 descendants in zoos.' },
          ].map((c, i) => (
            <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#B45309' }}>
              <span className="text-[10px] text-[#fbbf24] uppercase tracking-[0.1em] font-semibold">{c.to}</span>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-[560px] mt-2">{c.insight}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* SOURCES */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-6">Sources</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-10">
          {SOURCES.map((s, i) => <p key={i} className="text-[11px] text-[#525252]">{s}</p>)}
        </div>
        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-[#e5e5e5]">
          <p className="text-[12px] text-[#737373]">Research, visualisation &amp; analysis: <strong className="text-[#0a0a0a]">Slow Morocco</strong></p>
          <p className="text-[11px] text-[#737373]">&copy; Slow Morocco 2026</p>
        </div>
      </div></section>
    </div>
  )
}
