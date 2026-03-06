'use client'

import { useEffect, useRef } from 'react'
import { useInView, AnimCounter, MegaprojectCards, BRIAfricaChart, PipelineWars, FinancingGap } from './charts'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const MAP_MARKERS = [
  // Transport
  { name: 'Lagos-Calabar Railway', coords: [3.39, 6.45] as [number, number], color: '#DC2626', detail: '$10B. 1,400km. Chinese-built. Nigeria\'s coastal spine.', sz: 12 },
  { name: 'Lobito Corridor', coords: [13.53, -12.34] as [number, number], color: '#0369A1', detail: '$1B. 830km Angola→Zambia. US-backed. Copperbelt to Atlantic.', sz: 12 },
  { name: 'Mombasa-Nairobi SGR', coords: [36.82, -1.29] as [number, number], color: '#DC2626', detail: '$3.7B. Chinese-built. Replacing colonial rail. East Africa spine.', sz: 10 },
  { name: 'Egypt High-Speed Rail', coords: [31.24, 30.04] as [number, number], color: '#B45309', detail: '$4.5B. Siemens. 2,000km. 60 cities. Egypt\'s first HSR.', sz: 10 },
  // Energy
  { name: 'Grand Ethiopian Renaissance Dam', coords: [35.09, 11.21] as [number, number], color: '#15803d', detail: '$4.8B. 6,000MW. Africa\'s largest hydro. Self-funded by Ethiopia.', sz: 14 },
  { name: 'Nigeria-Morocco Pipeline (start)', coords: [3.39, 6.45] as [number, number], color: '#A16207', detail: '$25B. 5,600km. 13 countries. Lagos to Tangier. The big one.', sz: 10 },
  { name: 'Nigeria-Morocco Pipeline (end)', coords: [-5.81, 35.78] as [number, number], color: '#A16207', detail: 'Tangier. Connects to Maghreb-Europe Pipeline → Spain → EU gas network.', sz: 10 },
  { name: 'Hyphen Green Hydrogen', coords: [14.51, -26.64] as [number, number], color: '#047857', detail: '$9.4B. 300,000t green hydrogen/year. Namibia as export hub.', sz: 12 },
  { name: 'Mambilla Hydropower', coords: [11.32, 7.08] as [number, number], color: '#DC2626', detail: '$5.8B. 3,050MW. Chinese-built. Donga River, Taraba State.', sz: 10 },
  // Ports & Cities
  { name: 'Tanger Med', coords: [-5.50, 35.89] as [number, number], color: '#B45309', detail: '11.1M TEU. #1 Africa & Mediterranean. 180 ports connected.', sz: 12 },
  { name: 'Dakhla Atlantic Port', coords: [-15.93, 23.72] as [number, number], color: '#B45309', detail: '$1.2B. 35M tonnes/year. West Africa gateway. Complete 2028.', sz: 10 },
  { name: 'Konza Technopolis', coords: [37.12, -1.72] as [number, number], color: '#0369A1', detail: '$14.5B. "African Silicon Savanna." 5,000 acres. Phase 1 active.', sz: 10 },
  { name: 'New Administrative Capital', coords: [31.76, 30.02] as [number, number], color: '#DC2626', detail: '$58B. 21 residential + 25 commercial districts. Chinese-built.', sz: 10 },
  { name: 'Dangote Refinery', coords: [3.53, 6.43] as [number, number], color: '#A16207', detail: '$19B. 650k barrels/day. Operational 2024. African-built.', sz: 10 },
  { name: 'Walvis Bay Port', coords: [14.50, -22.95] as [number, number], color: '#737373', detail: '$300M expansion. Capacity doubled. Namibia\'s commercial gateway.', sz: 8 },
]

const SOURCES = [
  'OECD — Africa\'s Development Dynamics 2025: infrastructure investment needs and financing',
  'Green Finance & Development Center / Griffith University — China BRI Investment Reports 2023, 2024, 2025',
  'ISS African Futures — Large Infrastructure analysis, $2.5T pipeline, PIDA',
  'CCE Online News — 10 Mega Construction Projects Set to Transform Africa by 2026',
  'CNN — Africa\'s infrastructure megaprojects (Dec 2024)',
  'Global Energy Monitor — Nigeria-Morocco Gas Pipeline technical data',
  'Geopolitical Monitor — NMGP as "diplomatic leverage with engineering blueprint attached"',
  'Pipeline Technology Journal — Morocco to launch NMGP tenders 2025',
  'APA News — Nigeria/Morocco establish project company for $25B pipeline (Sep 2025)',
  'Al Majalla — Nigeria-Niger-Algeria pipeline challenges and stakes',
  'Africa Finance Corporation — State of Africa\'s Infrastructure Report 2025 ($1.1T domestic capital)',
  'Council on Foreign Relations — BRI overview, 147 countries, debt sustainability analysis',
]

export function TheInfrastructureRevolutionContent() {
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
      const map = new mb.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [15, 5], zoom: 2.8, interactive: true, attributionControl: false })
      mapRef.current = map
      map.addControl(new mb.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        MAP_MARKERS.forEach(m => {
          const el = document.createElement('div')
          el.style.cssText = `width:${m.sz}px;height:${m.sz}px;border-radius:50%;background:${m.color};border:2px solid rgba(255,255,255,0.6);box-shadow:0 0 12px ${m.color}40;cursor:pointer;transition:transform 0.2s;`
          el.onmouseenter = () => { el.style.transform = 'scale(1.3)' }
          el.onmouseleave = () => { el.style.transform = 'scale(1)' }
          new mb.Marker(el).setLngLat(m.coords).setPopup(
            new mb.Popup({ offset: 10, maxWidth: '280px', closeButton: false }).setHTML(
              `<div style="font-family:system-ui;padding:4px 0"><p style="font-size:13px;font-weight:700;margin:0 0 4px;color:#fff">${m.name}</p><p style="font-size:11px;color:#a3a3a3;margin:0;line-height:1.5">${m.detail}</p></div>`
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
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 154 · Africa Progression</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Infrastructure<br />Revolution</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">
            Africa is building more infrastructure than at any point in human history. $2.5 trillion in projects planned. China just invested $61 billion in a single year. Two rival pipelines race to connect Nigerian gas to Europe. Dams, railways, ports, smart cities, and green hydrogen plants are reshaping the continent&rsquo;s geography. The question is not whether Africa builds. It is who pays, who profits, and who gets left behind.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { n: 61, s: 'B', l: '$ china BRI in africa (2025)' },
              { n: 25, s: 'B', l: '$ nigeria-morocco pipeline' },
              { n: 6, s: 'GW', l: 'GERD hydroelectric capacity' },
              { n: 83, s: 'B', l: '$ annual infrastructure spend' },
              { n: 5600, s: '', l: 'km pipeline lagos→tangier' },
            ].map(k => (
              <div key={k.l}>
                <p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} />{k.s}</p>
                <p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Map</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Fifteen megaprojects. Ten countries. The physical shape of Africa&rsquo;s next century.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Red markers show Chinese-built or Chinese-financed projects. Blue shows US/EU-backed alternatives. Gold shows African-led initiatives. Green shows energy. The pattern is immediately visible: China is building Africa&rsquo;s railways and cities, the US is countering with the Lobito Corridor, Morocco is positioning as the gateway between Africa and Europe, and Ethiopia is self-funding its own transformation.</p>
        <div ref={mapContainer} style={{ width: '100%', height: 520, borderRadius: 8, overflow: 'hidden', background: '#1a1a1a' }} />
      </div></section>

      {/* MEGAPROJECTS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Projects</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Twelve projects worth $157 billion. Four sectors. Three superpowers competing.</h2>
        <MegaprojectCards />
      </div></section>

      {/* BRI IN AFRICA */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Dragon</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">China spent more on African infrastructure in 2025 than in any year in history.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">In 2025, Africa became the number one destination for China&rsquo;s <span className="underline underline-offset-2">Belt and Road</span> Initiative for the first time, receiving $61.2 billion in investment and construction contracts — a 283% increase over 2024. Nigeria alone received $24.6 billion (gas and hydrogen), the Republic of Congo $23.1 billion. This is no longer aid. It is economic statecraft. Chinese private companies now lead many deals, driven partly by US tariffs making African production more attractive than Asian production for export. Fifty-three of 54 African nations participate in BRI. The debt-trap narrative has been largely debunked by academics, but the dependency question remains: who owns the railway when the loan comes due?</p>
        <BRIAfricaChart />
      </div></section>

      {/* PIPELINE WARS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Pipeline Wars</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Two pipelines. One gas supply. The geopolitical proxy war for West Africa.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Nigeria has Africa&rsquo;s largest gas reserves. Europe wants alternatives to Russian supply. Two competing pipelines propose to carry Nigerian gas to the Mediterranean — but there is probably only enough demand for one. The Nigeria-Morocco Gas Pipeline (NMGP) runs 5,600km along the <span className="underline underline-offset-2">Atlantic coast</span> through 13 countries, backed by the US and Morocco. The Trans-Saharan Gas Pipeline (TSGP) runs 4,128km through Niger and Algeria, shorter and cheaper but through Sahel coup belt territory increasingly aligned with Russia. King Mohammed VI called the NMGP &ldquo;a project for peace, for African economic integration, and for co-development.&rdquo; Algeria&rsquo;s reconciliation with Niger&rsquo;s junta in February 2025 was designed specifically to counter it.</p>
        <PipelineWars />
      </div></section>

      {/* FINANCING GAP */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · The Money</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Africa spends $83 billion a year on infrastructure. It needs $170 billion.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">African governments fund 41% of their own infrastructure — roughly 1.3% of GDP, comparable to other developing regions but far below China (6.7%) or Vietnam (5.1%). China is the largest single external source at 26%, followed by multilateral banks (14%), other bilateral donors (10%), and private sector (9%). The gap of $47-87 billion annually is where the competition plays out. The Africa Finance Corporation&rsquo;s 2025 report identified $1.1 trillion in domestic capital — pension funds, insurance, sovereign wealth — that remains largely untapped for infrastructure investment.</p>
        <FinancingGap />
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">006 · The Question</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">Who builds the road owns the toll booth.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>Morocco understands something most African countries do not: infrastructure is not an expense. It is a revenue model. Tanger Med did not just build a port. It built a toll booth on the world&rsquo;s busiest shipping lane. Eleven million containers pass through annually, connecting 180 ports in 70 countries. Every container pays. Morocco went from 78th in global maritime connectivity to 17th in twenty years. Not by accident. By architecture.</p>
          <p>The Nigeria-Morocco Gas Pipeline follows the same logic. It is not just a pipe. It is a corridor that connects 13 countries, 340 million people, and Nigeria&rsquo;s gas reserves to Europe&rsquo;s market — with Morocco as the gateway. The Dakhla Atlantic Port, the Nador West Med deepwater facility, and the Noor solar complex complete the picture. Morocco is building the infrastructure layer that everyone else will need.</p>
          <p>China understands this too, which is why it has invested more in African infrastructure than any other external actor since 2013. But China&rsquo;s model is different from Morocco&rsquo;s. China builds the railway and China provides the loan. When Ethiopia could not repay its $4 billion railway debt, it renegotiated the terms. When Kenya&rsquo;s SGR struggled to generate projected revenue, critics called it a white elephant. The academic consensus now rejects the &ldquo;debt trap&rdquo; narrative as simplistic — Chinese lending is not systematically worse than Western alternatives, and Beijing has forgiven dozens of loans. But the dependency question persists. When the Chinese-built railway needs Chinese parts and Chinese engineers, the toll booth has a different owner.</p>
          <p>The US response arrived late but is now accelerating. The Lobito Corridor — 830km of greenfield railway connecting Angola&rsquo;s Atlantic coast to Zambia and the DRC&rsquo;s Copperbelt — is explicitly positioned as the democratic alternative to BRI. The EU&rsquo;s Global Gateway programme announced $300 billion in 2021 to match China. Japan continues its TICAD framework. But all of these trail China&rsquo;s spending by an order of magnitude. In 2025, China invested $61.2 billion in African infrastructure. The US counter-offer for the Lobito Corridor was $1 billion.</p>
          <p>The most interesting story, though, is African self-financing. Ethiopia self-funded the GERD — $4.8 billion, the largest hydroelectric dam in Africa, without external financing, because no external financier would touch the Nile politics. Dangote built Africa&rsquo;s largest oil refinery with Nigerian capital. The Africa Finance Corporation found $1.1 trillion in untapped domestic capital sitting in African pension funds, insurance companies, and sovereign wealth funds.</p>
          <p>The infrastructure revolution is real. The question is not whether the roads get built. It is whether they connect African economies to each other — as the AfCFTA envisions — or to extraction points that ship resources to Shanghai and Rotterdam. The colonial railways ran from mine to coast. The new railways could run from city to city. Whether they do depends on who writes the contract.</p>
        </div>
      </div></section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#A16207' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">This is a project for peace, for African economic integration, and for co-development.</p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">King Mohammed VI, on the Nigeria-Morocco Gas Pipeline</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">007 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">Go deeper.</h2>
        <div className="space-y-8">
          {[
            { to: 'Morocco\'s Port Strategy', link: '/data/moroccos-port-strategy', insight: 'Tanger Med at 11.1M TEU. Dakhla Atlantic. Nador West Med. The seven-port architecture that made Morocco Africa\'s gateway.' },
            { to: 'The Conservation Deficit', link: '/data/the-conservation-deficit', insight: '$29.3B in tourism GDP, $1.1B in conservation funding. The infrastructure being built could unlock — or destroy — the $29B wildlife economy.' },
            { to: 'The Poaching Economics', link: '/data/the-poaching-economics', insight: 'New railways through wildlife corridors. New roads to remote parks. Infrastructure that opens access can also open poaching routes.' },
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
