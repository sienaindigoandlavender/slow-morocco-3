'use client'

import { useEffect, useRef } from 'react'
import {
  useInView, AnimCounter,
  ConservancyGrowth, WildlifeRecovery, RevenueArchitecture,
  LandCoverage, PioneerConservancies, StressTest,
} from './charts'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const MAP_MARKERS = [
  { name: 'Etosha National Park', coords: [16.0, -18.8] as [number, number], color: '#047857', detail: '22,912 km². Namibia\'s flagship park. Lion, elephant, rhino stronghold. Western border connects to communal conservancies.', sz: 14 },
  { name: 'Skeleton Coast NP', coords: [12.8, -19.8] as [number, number], color: '#047857', detail: 'Desert lions hunt seals on beaches. Unique behaviour found nowhere else. Tourism asset of global significance.', sz: 12 },
  { name: 'Torra Conservancy', coords: [14.2, -20.2] as [number, number], color: '#B45309', detail: 'Pioneer (1998). First self-sufficient conservancy. Desert lion corridor. Damaraland Camp.', sz: 10 },
  { name: '≠Khoadi-//Hôas', coords: [14.5, -20.6] as [number, number], color: '#B45309', detail: 'Pioneer (1998). Grootberg Lodge. Key Etosha-to-coast corridor.', sz: 10 },
  { name: 'Puros Conservancy', coords: [13.2, -18.8] as [number, number], color: '#B45309', detail: 'Northern Kunene. Desert elephant. Himba communities. Tourism growing.', sz: 8 },
  { name: 'Sesfontein Conservancy', coords: [13.6, -19.2] as [number, number], color: '#B45309', detail: 'Lion Rangers base. Human-lion conflict hotspot. Community game guards front line.', sz: 10 },
  { name: 'NyaeNyae Conservancy', coords: [20.5, -19.8] as [number, number], color: '#15803d', detail: 'Pioneer (1998). San/Ju|\'hoansi community in Bushmanland. World\'s best trackers.', sz: 10 },
  { name: 'Salambala Conservancy', coords: [25.0, -17.8] as [number, number], color: '#0369A1', detail: 'Pioneer (1998). Zambezi region. KAZA transboundary elephant corridor.', sz: 10 },
  { name: 'Palmwag Concession', coords: [13.9, -19.9] as [number, number], color: '#047857', detail: 'Tourism concession. Desert-adapted wildlife. Rhino tracking. Key revenue generator.', sz: 8 },
  { name: 'Bwabwata NP / Kyaramacan', coords: [22.0, -18.2] as [number, number], color: '#047857', detail: 'National park with resident community (7,384 people). Unique hybrid model. KAZA corridor.', sz: 10 },
  { name: 'Waterberg Plateau', coords: [17.2, -20.4] as [number, number], color: '#047857', detail: 'Black rhino breeding population. Endangered species sanctuary. Translocation source.', sz: 8 },
]

const SOURCES = [
  'NACSO — State of Community Conservation in Namibia. Annual reports and web data (1998–2025).',
  'Community Conservation Namibia — Facts and Figures: 86 conservancies, 166,179 km², 244,587 residents.',
  'MEFT Namibia — Communal conservancy registration, wildlife quotas, game counts.',
  'WWF — Conserving Wildlife and Enabling Communities in Namibia. Programme evaluation.',
  'Heydinger et al. (2024) — First systematic population survey of desert-adapted lions, Northwest Namibia. African J. Ecology.',
  'Desert Lion Conservation Trust — Dr Philip Stander. 28 years of Kunene lion monitoring.',
  'Namibian Lion Trust — Lion Rangers programme, human-lion conflict data, Kunene conservancies.',
  'Goergen et al. (2025) — Local management and governance improve conservancy incomes. Conservation Science and Practice.',
  'Mongabay (2025) — Climate change tests the wildlife conservation model in Namibia.',
  'Safari Club International Foundation — Namibia sustainable use conservation facts.',
  'IUCN (2020) — Closing the gap: Financing and resourcing of protected areas in Eastern and Southern Africa.',
]

export function TheNamibiaModelContent() {
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
      const map = new mb.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/outdoors-v12', center: [17.0, -19.5], zoom: 5.5, interactive: true, attributionControl: false })
      mapRef.current = map
      map.addControl(new mb.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        MAP_MARKERS.forEach(m => {
          const el = document.createElement('div')
          el.style.cssText = `width:${m.sz}px;height:${m.sz}px;border-radius:50%;background:${m.color};border:2px solid rgba(255,255,255,0.8);box-shadow:0 0 10px ${m.color}50;cursor:pointer;transition:transform 0.2s;`
          el.onmouseenter = () => { el.style.transform = 'scale(1.4)' }
          el.onmouseleave = () => { el.style.transform = 'scale(1)' }
          new mb.Marker(el).setLngLat(m.coords).setPopup(
            new mb.Popup({ offset: 12, maxWidth: '260px', closeButton: false }).setHTML(
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
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 149 · Community Conservation</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Namibia<br />Model</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">
            The country that put conservation in its constitution. 86 communal conservancies. 20% of the country managed by communities. 45.6% under conservation. Elephants tripled. Black rhino entrusted to villagers. Desert lions returned to the Skeleton Coast. Then drought, COVID, and a cull tested everything.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { n: 86, s: '', l: 'communal conservancies' },
              { n: 45.6, s: '%', l: 'land under conservation', d: 1 },
              { n: 26000, s: '', l: 'elephants (from 7,000)' },
              { n: 150, s: 'M+', l: 'N$ annual returns (peak)', d: 0 },
              { n: 244587, s: '', l: 'residents in conservancies' },
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
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 20% 60%, #B45309 0%, transparent 50%), radial-gradient(circle at 80% 30%, #047857 0%, transparent 50%)' }} />
      </section>

      {/* MAP */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Landscape</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">From the Skeleton Coast to the Zambezi. The entire country is the system.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Namibia&rsquo;s entire coastline is protected &mdash; from the Orange River on the South African border to the Kunene River on the Angolan border. National parks form the spine. Communal conservancies wrap around them. Private conservancies fill gaps. Together they create the third-largest continuous conservation landscape on Earth. Wildlife does not stay in parks. It flows through a connected system of community-managed land where people have legal rights over, and economic interest in, the animals that share their territory.</p>
        <div ref={mapContainer} style={{ width: '100%', height: 500, borderRadius: 8, overflow: 'hidden', background: '#f0f0f0' }} />
        <div className="flex gap-4 flex-wrap mt-4">
          {[['National Park / Concession', '#047857'], ['Communal Conservancy', '#B45309'], ['San Community', '#15803d'], ['Zambezi Corridor', '#0369A1']].map(([l, c]) => (
            <div key={l} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: c }} /><span className="text-[9px] uppercase tracking-wider text-[#737373]">{l}</span></div>
          ))}
        </div>
      </div></section>

      {/* 002 PIONEERS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Pioneers</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">1998. Four communities. One constitutional promise.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Namibia was the first African country to put environmental protection in its constitution. In 1996, the government granted communities legal rights to manage and benefit from wildlife on their land. In 1998, four pioneer conservancies were gazetted &mdash; each in a different landscape, a different culture, a different challenge. Torra in the arid northwest. ≠Khoadi-//H&ocirc;as straddling Kunene. NyaeNyae in San Bushmanland. Salambala on the Botswana border. Together they proved the model was not geography-specific. It was governance-specific.</p>
        <PioneerConservancies />
      </div></section>

      {/* 003 GROWTH */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Expansion</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Four conservancies became eighty-six. N$1 million became N$150 million.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The growth was not directed from Windhoek. Communities saw what Torra achieved and applied to form their own conservancies. Each required defined boundaries agreed with neighbours, a constitution, a wildlife management plan, and elected governance. MEFT registers but does not govern them. By 2019, 86 conservancies covered 166,179 km&sup2; &mdash; 20.2% of Namibia. Not all are profitable. Many are on marginal land with little wildlife. But collectively they form a conservation network that no government could have built alone.</p>
        <ConservancyGrowth />
      </div></section>

      {/* 004 WILDLIFE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Return</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Everything came back. Then drought complicated the story.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Elephants grew from 7,000 to 26,000. Mountain zebra from 3,000 to 27,000. Springbok, gemsbok, kudu &mdash; all recovered. The government entrusted black rhino custodianship to communal conservancies, guarded by community game guards and Save the Rhino Trust rangers. Desert lions expanded from ~20 individuals in the late 1990s westward to the Skeleton Coast. But the 2022&ndash;2023 systematic survey &mdash; the first ever &mdash; found only 57&ndash;60 adults. The drought, running since 2012, had taken its toll.</p>
        <WildlifeRecovery />
      </div></section>

      {/* 005 LAND */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · The Coverage</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">45.6% of a country. Under conservation.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">No other country in Africa has this ratio. National parks provide the core. Communal conservancies wrap around them. Private freehold conservancies fill remaining gaps. Community forests add another layer. The result: a connected landscape where wildlife moves freely from Etosha to the Skeleton Coast, from the Zambezi to the Kalahari. At independence in 1990, only 14% was under conservation. In thirty-five years, that tripled.</p>
        <LandCoverage />
      </div></section>

      {/* 006 REVENUE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">006 · The Money</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">N$150 million. Half from hunting. All of it debated.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Conservation hunting generates roughly 50% of conservancy benefits. Photographic tourism provides 30%. The rest comes from crafts, community meat harvesting, grants, and concession fees. The hunting question is the most politically charged debate in African conservation. In Namibia, 91% of conservancy members oppose a hunting ban. Elephant hunting alone funds 55% of hunting revenue. Western donors frequently condition aid on anti-hunting policies. The communities who live with the elephants disagree.</p>
        <RevenueArchitecture />
      </div></section>

      {/* 007 STRESS TEST */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">007 · The Stress Test</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Eleven years of drought. Then COVID. Then a cull.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The model was built for normal years. What happens when the rains stop for a decade? When a pandemic destroys tourism revenue overnight? When the government authorises the killing of 723 animals &mdash; including 83 elephants &mdash; to feed communities during a drought emergency? The Namibia model faced every possible stress test between 2012 and 2024. It bent. It did not break. But the desert lions fell from an estimated 180 to 57&ndash;60. The question is not whether the model works. It is whether it works fast enough.</p>
        <StressTest />
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">008 · The Architecture</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">What Namibia built that nobody else has.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>Most conservation models protect wildlife from people. Namibia gave wildlife to people. The 1996 legislation did something no other African government had done at that scale: it transferred conditional rights over wildlife to the communities who live with it. Not management contracts. Not revenue-sharing agreements. Ownership rights, conditional on governance and sustainability.</p>
          <p>The structure is democratic by design. Every conservancy has an elected committee, a constitution, annual general meetings, financial reporting requirements, and a wildlife management plan. MEFT can de-register conservancies that fail to comply. This creates accountability without central control. The government sets the rules. The communities run the operations.</p>
          <p>The joint-venture model &mdash; 67 lodge partnerships, 44 hunting concessions &mdash; brings private sector capital and expertise into community-owned landscapes. Communities provide land and wildlife. Operators provide infrastructure and market access. Revenue flows to conservancy committees who distribute it to members, reinvest in anti-poaching, and fund social infrastructure: schools, clinics, ambulances.</p>
          <p>But the model has structural vulnerabilities. Revenue depends almost entirely on international arrivals. When COVID closed borders, conservancy income halved overnight. The CRRRF emergency fund prevented collapse, but it was a one-time intervention, not a systemic solution. The 11-year Kunene drought killed livestock, reduced prey, and pushed lions into increasingly desperate conflict with farmers earning less than $1 per day. The 2024 cull &mdash; 723 animals killed to feed communities &mdash; was legal, scientifically managed, and deeply uncomfortable for a country that built its international reputation on conservation.</p>
          <p>The Namibian model is not perfect. It is the best working example of continental-scale community conservation in Africa. Its success is measured not in the absence of problems but in the existence of structures to address them. When lions kill livestock, there is a Lion Rangers programme. When drought strikes, there is a conflict management plan. When tourism collapses, there is an emergency fund. When corruption appears, there are governance structures to address it. No other country has this layered system operating at 20% of national territory.</p>
          <p>What Namibia demonstrates is that conservation at scale requires architecture, not charity. Legal frameworks, community governance, private sector partnerships, government oversight, and diversified revenue. The question for the rest of Africa is not whether this works. The question is why it has not been replicated.</p>
        </div>
      </div></section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#B45309' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">
              We just want to do the work. We don&rsquo;t want to spend 90 percent of our time looking for funds and 10 percent doing the work. We are not schooled to be doing proposals to look for money. We are schooled to do ecology, to do science, to do management, to do conservation. To do the work, not to be looking for money.
            </p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Prof. Edson Gandiwa, on African conservation funding</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED INTELLIGENCE */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">009 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">The pattern.</h2>
        <div className="space-y-10">
          {[
            { to: 'The Conservation Deficit', link: '/data/the-conservation-deficit', insight: 'The systemic view. Namibia shows what\'s possible. The deficit shows why it hasn\'t been replicated. 94% of threatened species unfunded. 5 donors provide 54% of all conservation funding.' },
            { to: 'The Lion Guardians', link: '/data/the-lion-guardians', insight: 'Kenya\'s answer to the same problem. Different mechanism, same logic: people who live with lions are the best people to protect them. Amboseli-Tsavo model vs Kunene conservancy model — two paths to the same conclusion.' },
            { to: 'The Gorilla Dividend', link: '/data/the-gorilla-dividend', insight: 'Rwanda\'s high-value low-volume approach. $1,500 permits, 10% to communities. Namibia\'s model distributes benefits more broadly but at lower per-person value. Different solutions to the same structural problem.' },
            { to: 'The Lion Economics', link: '/data/the-lion-economics', insight: 'Continental lion decline: 200,000→23,000. Namibia\'s desert lions recovered from 20 to ~180, then drought pushed them back to 57-60. The economics of lion conservation at the edge of what\'s possible.' },
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
