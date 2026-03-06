'use client'

import { useEffect, useRef } from 'react'
import { useInView, AnimCounter, PopulationArc, AgeGap, MegacityRise, DividendReadiness } from './charts'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''

const MAP_MARKERS = [
  { name: 'Lagos', coords: [3.39, 6.45] as [number, number], color: '#B45309', detail: '17M now → 28M (2050) → 88M (2100). World\'s largest city by 2100.', sz: 16 },
  { name: 'Cairo', coords: [31.24, 30.04] as [number, number], color: '#B45309', detail: '25.6M. Africa\'s current largest. 32.6M by 2050.', sz: 14 },
  { name: 'Kinshasa', coords: [15.32, -4.32] as [number, number], color: '#B45309', detail: '17.8M → 29M (2050) → 61M (2100). 75% live in slums.', sz: 14 },
  { name: 'Dar es Salaam', coords: [39.28, -6.79] as [number, number], color: '#047857', detail: '7.5M → 16.4M (2050). +118% growth. Fastest-growing megacity.', sz: 12 },
  { name: 'Luanda', coords: [13.23, -8.84] as [number, number], color: '#047857', detail: '9.5M → 14M. Megacity by 2030.', sz: 10 },
  { name: 'Nairobi', coords: [36.82, -1.29] as [number, number], color: '#047857', detail: '5.2M → 10.4M. "Silicon Savannah." +100% growth by 2050.', sz: 10 },
  { name: 'Khartoum', coords: [32.53, 15.59] as [number, number], color: '#737373', detail: '6.8M → 11M. Megacity by 2040 (if conflict allows).', sz: 8 },
  { name: 'Abidjan', coords: [-4.01, 5.36] as [number, number], color: '#047857', detail: 'Megacity by 2040. Côte d\'Ivoire\'s economic engine.', sz: 8 },
  { name: 'Addis Ababa', coords: [38.75, 9.02] as [number, number], color: '#047857', detail: 'Megacity by 2050. AU headquarters. Diplomatic capital.', sz: 8 },
  { name: 'Ouagadougou', coords: [-1.52, 12.36] as [number, number], color: '#991B1B', detail: 'Megacity by 2050. Burkina Faso. Sahel youth bulge.', sz: 6 },
  { name: 'Bamako', coords: [-8.00, 12.65] as [number, number], color: '#991B1B', detail: 'Megacity by 2050. Mali. Sahel crisis zone.', sz: 6 },
  { name: 'Dakar', coords: [-17.47, 14.69] as [number, number], color: '#047857', detail: 'Megacity by 2050. Senegal. Youth protest capital.', sz: 6 },
  { name: 'Niamey', coords: [2.11, 13.51] as [number, number], color: '#991B1B', detail: 'Niger. Median age 14.9. Population triples by 2050. 50× by 2100.', sz: 6 },
]

const SOURCES = [
  'UN World Population Prospects 2024 Revision — population, fertility, median age, life expectancy data',
  'UN Economic Commission for Africa — "As Africa\'s Population Crosses 1.5 Billion" (2024)',
  'ISS African Futures — Demographics & Demographic Dividend scenario modelling (2025)',
  'ACET — "Harnessing Africa\'s Demographic Dividend" policy brief (Sep 2025)',
  'Worldometer — Africa Demographics 2025: median age 19.3, TFR 3.8',
  'UNFPA — Demographic Dividend Atlas for Africa',
  'EU ISS — "Reaping Africa\'s Demographic Dividend" (Feb 2025)',
  'Hoover Institution — "Africa 2050: Demographic Truth and Consequences"',
  'World Economic Forum — "How will Africa\'s youth population drive global growth?" (2023)',
  'UN Africa Renewal — "Africa\'s megacities a magnet for investors" (2019)',
  'Global Cities Institute, University of Toronto — city population projections 2100 (Hoornweg & Pope)',
  'UNICEF — Generation 2030 Africa 2.0: per capita income could quadruple by 2050 with right investments',
  'Wilton Park — "Demographic trends and why they matter" (Oct 2025)',
]

export function TheDemographicDividendContent() {
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
      const map = new mb.Map({ container: mapContainer.current!, style: 'mapbox://styles/mapbox/dark-v11', center: [18, 5], zoom: 3, interactive: true, attributionControl: false })
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
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 155 · Africa Progression</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Demographic<br />Dividend</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">
            By 2050, one in four humans will be African. The median age is 19 — half the population hasn&rsquo;t been born yet. By 2035, more young Africans will enter the workforce than in the rest of the world combined. This is either the greatest economic opportunity of the 21st century or its greatest crisis. The data cannot tell you which. Only policy can.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { n: 1.53, s: 'B', l: 'africa population (2025)', d: 1 },
              { n: 2.5, s: 'B', l: 'projected 2050', d: 1 },
              { n: 19.3, s: '', l: 'median age (years)', d: 1 },
              { n: 3.8, s: '', l: 'fertility rate (children/woman)', d: 1 },
              { n: 60, s: '%', l: 'under age 25', d: 0 },
            ].map(k => (
              <div key={k.l}>
                <p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} decimals={k.d} />{k.s}</p>
                <p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULATION ARC */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Numbers</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">From 284 million to 3.8 billion in one century.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Africa&rsquo;s population has grown more than fivefold since 1960. It will nearly double again by 2050. By 2100, Africa will contain more than a third of all humans on Earth. Five African countries — Nigeria, DRC, Ethiopia, Egypt, and Tanzania — will account for more than half of all global population growth between now and 2050. Nigeria alone will be more populous than the United States. Infant mortality has fallen from 145 per 1,000 in 1960 to 38 today. Life expectancy rose from 43 to 66 years. Fertility is dropping — from 6.6 children per woman in 1960 to 3.8 today — but not fast enough to prevent the population from nearly doubling.</p>
        <PopulationArc />
      </div></section>

      {/* AGE GAP */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Age Gap</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Niger&rsquo;s median age is 14.9. Japan&rsquo;s is 48.6. This gap defines the century.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Africa is not one demographic story — it is fifty-four. Morocco and Tunisia are in late transition with near-replacement fertility. Kenya and Ethiopia are in rapid decline. Nigeria and DRC are barely beginning. Niger, with a median age of 14.9 and fertility of 6.7, is projected to triple from 28 million to 70 million by 2050. Meanwhile, Europe&rsquo;s median age is 44.4 and its fertility rate is 1.4. The EU&rsquo;s labour force shrinks by 28 million in the next quarter century. Africa&rsquo;s nearly doubles. The question is whether these two trends connect — through migration, trade, or investment — or collide.</p>
        <AgeGap />
      </div></section>

      {/* MEGACITIES MAP */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Megacities</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Lagos had 200,000 people in 1960. It will have 88 million by 2100.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Africa has three megacities today (Cairo, Lagos, Kinshasa). It will have seven by 2030 and fourteen by 2050 — including Dar es Salaam (+118%), Luanda, Nairobi, Abidjan, and Addis Ababa. By 2100, at least 10 of the world&rsquo;s 20 largest cities will be African. Most of the infrastructure these cities need does not exist yet. Every road, power line, water pipe, school, and hospital is a decision being made now that will serve — or fail — a billion people.</p>
        <div ref={mapContainer} style={{ width: '100%', height: 520, borderRadius: 8, overflow: 'hidden', background: '#1a1a1a' }} className="mb-8" />
        <MegacityRise />
      </div></section>

      {/* DIVIDEND OR BOMB */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Window</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Dividend or time bomb. Ten countries. Ten different clocks.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The &ldquo;demographic dividend&rdquo; occurs when the ratio of working-age people to dependants is most favourable for growth — but only if jobs, education, and health systems are in place to absorb the workforce. Only 10 of 54 African countries were in this window in 2023. Nigeria — Africa&rsquo;s most populous country — is not expected to enter its window until around 2060. China peaked at 2.8 workers per dependant (2010). India will peak at 2.2 (2035). Nigeria will peak at just 2.0 (2084). The dividend is not guaranteed. It is a policy outcome. Two thirds of African countries are still in the pre-dividend phase.</p>
        <DividendReadiness />
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[700px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · The Question</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-8">The most consequential fact of the 21st century is that Africa is young and everything else is old.</h2>
        <div className="text-[14px] text-[#262626] leading-[1.85] space-y-5" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          <p>Start with a number: 19.3. That is Africa&rsquo;s median age. Half the continent&rsquo;s 1.53 billion people are teenagers or younger. Now compare: Europe is 44.4. Japan is 48.6. China is 39 and falling fast, its workforce shrinking by millions per year. The United States is 38.5 with a fertility rate of 1.6 — well below replacement. The rich world is aging out. Africa is aging in.</p>
          <p>This is the single fact that makes every other Africa story make sense. The infrastructure revolution is not happening because governments woke up. It is happening because you cannot house, feed, educate, transport, and employ a population that doubles every 25 years without building at a pace that has no precedent in human history. The $2.5 trillion in planned projects is not ambition. It is arithmetic.</p>
          <p>The demographic dividend is a seductive concept. The theory: when fertility drops, the ratio of workers to dependants improves, savings increase, investment rises, and growth accelerates — the engine that powered the Asian Tigers, China, and India. The promise: if Africa invests in education, health, and job creation while its working-age population surges, per capita income could quadruple by 2050.</p>
          <p>The problem is the &ldquo;if.&rdquo; The dividend is not a demographic inevitability. It is a policy outcome. And the policy window is narrow. China reached its peak worker-to-dependant ratio at 2.8 in 2010, then reaped three decades of extraordinary growth. Nigeria will not enter its window until 2060, and its peak ratio will be only 2.0 — meaning the structural advantage will be smaller and the preparation time longer.</p>
          <p>The harder story is what happens without the dividend. Twenty million young Africans will enter the labour force every year by 2035 — more than the rest of the world combined. If the economies that receive them cannot provide productive employment, the youth bulge becomes a youth bomb. This is not speculation. The evidence is already visible: youth-led protests in Senegal, Nigeria, Kenya, and Ethiopia. Waves of migration across the Mediterranean. Recruitment by armed groups in the <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Sahel</span>. The correlation between high fertility, low income, and instability is not a coincidence — six of the seven highest-fertility countries in Africa are low-income.</p>
          <p>What makes Morocco, Tunisia, and South Africa interesting is that they have already entered their dividend window. Their fertility rates are near or below replacement. Their median ages are approaching 30. They are the test case for whether African economies can convert demographic transition into prosperity — or whether they will age before they get rich, as some economists fear.</p>
          <p>The megacity explosion is the physical manifestation of all this. Lagos went from 200,000 to 17 million in sixty years and will reach 88 million by the end of the century. Dar es Salaam grows 118% by 2050. These are not cities that can be retrofitted. They are cities that must be built from the ground up, right now, for populations that are arriving whether the infrastructure is ready or not. Every road, power line, and water pipe laid this decade determines whether these cities become engines of prosperity or pressure cookers of inequality.</p>
          <p>Europe will need Africa&rsquo;s workers. Africa will need Europe&rsquo;s capital. The question is whether this exchange happens through orderly systems — migration frameworks, investment partnerships, trade integration — or through the chaotic, dangerous, and politically explosive channels that dominate today. The demographic arithmetic does not care about politics. It just keeps counting.</p>
        </div>
      </div></section>

      {/* PULLQUOTE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#B45309' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">By 2035, more young Africans will enter the workforce each year than in the rest of the world combined.</p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">World Economic Forum, 2023</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED */}
      <section className="border-t border-[#e5e5e5] bg-[#0a0a0a]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-white/30 mb-3">006 · Connected Intelligence</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-white leading-[1.05] mb-12">Go deeper.</h2>
        <div className="space-y-8">
          {[
            { to: 'The Infrastructure Revolution', link: '/stories/the-infrastructure-revolution', insight: '$2.5 trillion in planned projects is not ambition. It is the arithmetic of doubling a population in 25 years.' },
            { to: 'Morocco\'s Port Strategy', link: '/stories/moroccos-port-strategy', insight: 'Morocco entered its dividend window early and built the infrastructure to capture it. Tanger Med is what the dividend looks like when the policy works.' },
            { to: 'The Conservation Deficit', link: '/stories/the-conservation-deficit', insight: 'Africa\'s population doubles but its wildlife habitat does not. The conservation funding gap widens with every birth.' },
          ].map((c, i) => (
            <div key={i} className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#B45309' }}>
              <span className="text-[10px] text-[#fbbf24] uppercase tracking-[0.1em] underline font-semibold">{c.to}</span>
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
