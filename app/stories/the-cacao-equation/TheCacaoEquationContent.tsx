'use client'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
const DWLRouteMap = dynamic(() => import('@/components/maps/DWLRouteMap'), { ssr: false })

const SOURCES = [
  'ICCO — International Cocoa Organization: Global production 4.38M MT (2023/24). West Africa 70%.',
  'USDA FAS — Côte d\'Ivoire cocoa 1.8M MT (2024/25). Ghana 600–700K MT. Combined: ~60% global.',
  'USDA FAS — Ghana cocoa exports surpass $3.37B (2024/25), up 119% YoY. 800,000 farm families.',
  'Cocoa crisis (2024–present): Prices surged 400%+ from late 2023. Peak $12,900/ton (Jan 2025).',
  'Grand View Research — Global chocolate market $123B (2024), projected $185B by 2033, CAGR 4.8%.',
  'Mordor Intelligence — Cocoa & chocolate market $169B (2025), projected $233B by 2030.',
  'Radad International — 2026 outlook: surplus 287K tons forecast 2025/26. Prices fell to ~$4,000/ton by Oct 2025.',
  'ICCO — Cocoa Swollen Shoot Virus (CSSV) infected 81% of Ghana\'s cocoa crop in affected regions.',
  'Wikipedia / Oxfam — Farmers receive <6% of retail chocolate price. 2M children involved in West African cocoa farming.',
  'FAO — Cacao (Theobroma cacao) originated in upper Amazon basin. Domesticated ~3,500 years ago by Olmec.',
]

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function AnimCounter({ target, duration = 1800, suffix = '', decimals = 0 }: { target: number; duration?: number; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { const start = performance.now()
        const step = (now: number) => { const p = Math.min((now - start) / duration, 1); setVal(p * target); if (p < 1) requestAnimationFrame(step) }
        requestAnimationFrame(step); obs.disconnect()
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>
}

/* ── DATA ── */

const TIMELINE = [
  { year: '~1500 BCE', event: 'Olmec people cultivate cacao in lowland Mesoamerica. Earliest known use.', era: 'origin' },
  { year: '~600 CE', event: 'Maya develop xocolātl — bitter cacao drink with chilli, vanilla, water. Ceremonial and elite.', era: 'origin' },
  { year: '~1400', event: 'Aztec Empire uses cacao beans as currency. 100 beans = 1 turkey. Only nobles drink chocolate.', era: 'origin' },
  { year: '1519', event: 'Hernán Cortés encounters cacao at Montezuma\'s court. Ships beans to Spain.', era: 'colonial' },
  { year: '1585', event: 'First commercial cacao shipment from Veracruz to Seville.', era: 'colonial' },
  { year: '1657', event: 'First chocolate house opens in London. Expensive, elite.', era: 'colonial' },
  { year: '1828', event: 'Coenraad van Houten invents cocoa press — separates butter from powder. Modern chocolate begins.', era: 'industrial' },
  { year: '1847', event: 'J.S. Fry & Sons create first moulded chocolate bar. Bristol, England.', era: 'industrial' },
  { year: '1879', event: 'Rodolphe Lindt invents conching. Smooth, melt-in-mouth chocolate.', era: 'industrial' },
  { year: '1879', event: 'Tetteh Quarshie brings cacao pods from Fernando Po to Ghana. West African production begins.', era: 'africa' },
  { year: '1911', event: 'Côte d\'Ivoire begins commercial cacao cultivation under French colonial administration.', era: 'africa' },
  { year: '1978', event: 'Côte d\'Ivoire overtakes Ghana as world\'s #1 producer. Remains #1 since.', era: 'africa' },
  { year: '2024', event: 'Cocoa prices surge 400%+. $12,900/ton peak. Crisis in West African supply.', era: 'crisis' },
]

const PRODUCERS = [
  { name: 'Côte d\'Ivoire', mt: 1800, pct: 42, color: '#B45309', families: '~600K farmers' },
  { name: 'Ghana', mt: 700, pct: 15, color: '#2D6E4F', families: '800K families' },
  { name: 'Indonesia', mt: 300, pct: 7, color: '#E63946', families: '~1.5M farmers' },
  { name: 'Ecuador', mt: 330, pct: 7, color: '#5E60CE', families: '~100K farmers' },
  { name: 'Cameroon', mt: 296, pct: 6, color: '#047857', families: '~600K farmers' },
  { name: 'Nigeria', mt: 250, pct: 6, color: '#FCBF49', families: '~300K farmers' },
  { name: 'Brazil', mt: 200, pct: 5, color: '#0369A1', families: '~95K farmers' },
  { name: 'Others', mt: 506, pct: 12, color: '#a3a3a3', families: 'Peru, DR, Colombia' },
]

const PRICE_HISTORY = [
  { year: '2015', price: 3100 },
  { year: '2016', price: 2900 },
  { year: '2017', price: 2000 },
  { year: '2018', price: 2300 },
  { year: '2019', price: 2500 },
  { year: '2020', price: 2400 },
  { year: '2021', price: 2500 },
  { year: '2022', price: 2400 },
  { year: '2023', price: 3500 },
  { year: 'H1 2024', price: 8000 },
  { year: 'H2 2024', price: 11000 },
  { year: 'Jan 2025', price: 12900 },
  { year: 'Oct 2025', price: 4000 },
]
const maxPrice = 12900

const VALUE_CHAIN = [
  { actor: 'Farmer', share: 6, color: '#B45309', desc: '~6% of retail price. $2–3/day income. 80,000 smallholders in SAVA, 800K families in Ghana.' },
  { actor: 'Local trader / coop', share: 3, color: '#FCBF49', desc: 'Aggregation, transport to port. Thin margins.' },
  { actor: 'Exporter / trading house', share: 8, color: '#047857', desc: 'Cargill, Olam, Barry Callebaut. Control logistics, finance, forward contracts.' },
  { actor: 'Processor / grinder', share: 18, color: '#5E60CE', desc: 'Europe grinds 40–45% of world cocoa. Converts beans to liquor, butter, powder.' },
  { actor: 'Manufacturer', share: 35, color: '#E63946', desc: 'Mars, Mondelēz, Ferrero, Nestlé, Hershey. Branding, formulation, distribution.' },
  { actor: 'Retailer', share: 30, color: '#0369A1', desc: 'Supermarkets, specialty shops, e-commerce. Final markup to consumer.' },
]

const GRINDERS = [
  { name: 'Europe', pct: 43, note: 'Netherlands, Germany top. 7.2% decline Q2 2025.' },
  { name: 'Africa', pct: 23, note: 'Côte d\'Ivoire largest. Growing local processing.' },
  { name: 'Asia Pacific', pct: 18, note: 'Indonesia, Malaysia. 16% collapse Q2 2025.' },
  { name: 'Americas', pct: 16, note: 'US, Brazil. Hershey, Mars domestic grinding.' },
]

export function TheCacaoEquationContent() {
  const h1 = useInView(); const h2 = useInView(); const h3 = useInView(); const h4 = useInView(); const h5 = useInView(); const h6 = useInView()

  return (
    <div className="bg-white text-[#262626] pt-16">
      {/* HERO */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 173 · Cultural Intelligence · Mesoamerica &rarr; West Africa</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Cacao<br />Equation</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">The Olmec drank it 3,500 years ago. The Aztecs used the beans as currency. Europeans added sugar, milk, and industrial processing. Then they planted it in Africa — where neither C&ocirc;te d&rsquo;Ivoire nor Ghana had a single cacao tree before colonialism. West Africa now grows 70% of the world&rsquo;s cocoa. Europe processes it. The chocolate market is worth $169 billion. Farmers receive less than 6 cents of every dollar.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ n: 70, s: '%', l: 'grown in West Africa', d: 0 }, { n: 169, s: 'B', l: '$ chocolate market 2025', d: 0 }, { n: 12.9, s: 'K', l: '$/ton peak price (Jan 2025)', d: 1 }, { n: 6, s: '%', l: 'farmer share of retail $', d: 0 }].map(k => (
              <div key={k.l}><p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} decimals={k.d} />{k.s}</p><p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* SACRED DRINK */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Sacred Drink</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Theobroma. Food of the gods. Drunk bitter.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Theobroma cacao originated in the upper Amazon basin and was domesticated in Mesoamerica around 1500 BCE. The Olmec ground roasted beans, mixed them with water, chilli, and <span className="underline underline-offset-2">vanilla</span>, and drank the result as a frothy, bitter ceremonial beverage. The Maya refined the process and restricted chocolate to elites and rituals. The Aztecs elevated cacao beans to literal currency &mdash; a system so stable that counterfeiters filled empty shells with mud. Moctezuma reportedly drank 50 cups a day from gold goblets. When Cort&eacute;s arrived in 1519, he saw cacao as a commodity before he understood it as a sacrament.</p>
        <div ref={h1.ref} className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Olmec · ~1500 BCE', desc: 'First cultivators. The word "cacao" is Olmec. Residue found in pottery from San Lorenzo Tenochtitlán. A bitter, fermented drink — closer to beer than chocolate.', color: '#B45309' },
            { title: 'Maya · 600 CE', desc: 'Xocolātl: "bitter water." Cacao mixed with chilli, annatto, vanilla, honey. Depicted in glyphs on temple walls. Offered to gods at funerals and coronations.', color: '#E63946' },
            { title: 'Aztec · 1400 CE', desc: '100 cacao beans = 1 turkey. 30 beans = 1 rabbit. 3 beans = 1 egg. Only nobles drank it. Warriors earned it. The bean was money, medicine, and prayer.', color: '#5E60CE' },
          ].map((c, i) => (
            <div key={c.title} className="border border-[#e5e5e5] rounded-sm p-6 transition-all duration-700" style={{ opacity: h1.visible ? 1 : 0, transform: h1.visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: `${i * 150}ms` }}>
              <p className="text-[10px] uppercase tracking-[0.12em] mb-2" style={{ color: c.color }}>{c.title}</p>
              <p className="text-[13px] text-[#525252] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* TIMELINE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Timeline</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">From the Amazon to Abidjan. 3,500 years.</h2>
        <div ref={h2.ref} className="relative pl-8 space-y-5 mt-10">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[#e5e5e5]" />
          {TIMELINE.map((t, i) => {
            const col = t.era === 'origin' ? '#B45309' : t.era === 'colonial' ? '#E63946' : t.era === 'industrial' ? '#5E60CE' : t.era === 'africa' ? '#2D6E4F' : '#dc2626'
            return (
              <div key={i} className="relative transition-all duration-500" style={{ opacity: h2.visible ? 1 : 0, transform: h2.visible ? 'translateX(0)' : 'translateX(-12px)', transitionDelay: `${i * 55}ms` }}>
                <div className="absolute -left-5 top-1 w-[10px] h-[10px] rounded-full border-2 bg-white" style={{ borderColor: col }} />
                <p className="text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: col }}>{t.year}</p>
                <p className="text-[13px] text-[#262626] leading-relaxed">{t.event}</p>
              </div>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-4 mt-8">
          {[{ c: '#B45309', l: 'Origin' }, { c: '#E63946', l: 'Colonial transfer' }, { c: '#5E60CE', l: 'Industrial revolution' }, { c: '#2D6E4F', l: 'Africa' }, { c: '#dc2626', l: '2024 crisis' }].map(k => (
            <div key={k.l} className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: k.c }} /><p className="text-[10px] text-[#737373]">{k.l}</p></div>
          ))}
        </div>
      </div></section>

      {/* PRODUCTION MAP */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · Who Grows It</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">West Africa. 70% of global supply. Zero native cacao trees.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">C&ocirc;te d&rsquo;Ivoire alone produces 42% of the world&rsquo;s cocoa. Ghana adds another 15%. Together with Cameroon and Nigeria, West Africa supplies 70% of global demand. The plant is not native to any of these countries &mdash; it was introduced under colonial agricultural policies designed to extract raw materials for European industry. The cacao belt runs 20&deg; north and south of the equator. The power runs elsewhere.</p>
        <div ref={h3.ref} className="space-y-3">
          {PRODUCERS.map((p, i) => (
            <div key={p.name} className="flex items-center gap-3 transition-all duration-600" style={{ opacity: h3.visible ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
              <p className="text-[12px] text-[#737373] w-28 text-right flex-shrink-0">{p.name}</p>
              <div className="flex-1 h-9 bg-[#f0f0f0] rounded-sm overflow-hidden relative">
                <div className="h-full rounded-sm transition-all duration-1000 ease-out flex items-center px-3" style={{ width: h3.visible ? `${(p.pct / 42) * 100}%` : '0%', background: p.color, transitionDelay: `${i * 80}ms` }}>
                  <span className="text-[9px] text-white/90 whitespace-nowrap">{p.families}</span>
                </div>
              </div>
              <p className="text-[11px] text-[#525252] w-20 text-right">{p.mt >= 1000 ? (p.mt/1000).toFixed(1) + 'M' : p.mt + 'K'} MT</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* MAP: MESOAMERICA → WEST AFRICA → EUROPE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">The Colonial Inversion</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-6">Origin &rarr; transplant &rarr; grinding &rarr; consumption</h2>
        <DWLRouteMap
          center={[0, 15]}
          zoom={2.2}
          height="520px"
          points={[
            { coords: [-96.9, 20.5], label: 'Veracruz (Olmec origin)', color: '#5E60CE', size: 8 },
            { coords: [-70, -3], label: 'Amazon (wild cacao)', color: '#5E60CE', size: 6 },
            { coords: [8.8, 3.8], label: 'Fernando Po / Bioko', color: '#B45309', size: 6 },
            { coords: [-1.0, 6.7], label: 'Mampong, Ghana (1879)', color: '#2D6E4F', size: 7 },
            { coords: [-5.5, 6.8], label: 'Côte d\'Ivoire (42%)', color: '#B45309', size: 9 },
            { coords: [9.7, 4.0], label: 'Cameroon', color: '#047857', size: 6 },
            { coords: [3.4, 6.5], label: 'Nigeria', color: '#FCBF49', size: 6 },
            { coords: [4.9, 52.4], label: 'Netherlands (grinding)', color: '#E63946', size: 7 },
            { coords: [10.0, 51.0], label: 'Germany (grinding)', color: '#E63946', size: 6 },
            { coords: [2.3, 48.9], label: 'France', color: '#E63946', size: 5 },
            { coords: [-77.0, 38.9], label: 'USA (Mars, Hershey)', color: '#0369A1', size: 6 },
            { coords: [8.5, 47.4], label: 'Switzerland (Barry Callebaut)', color: '#E63946', size: 5 },
          ]}
          lines={[
            { coords: [[-96.9, 20.5], [-40, 10], [8.8, 3.8]], color: '#B45309', width: 2, label: 'Transplant to Africa' },
            { coords: [[8.8, 3.8], [-1.0, 6.7]], color: '#2D6E4F', label: 'Quarshie 1879' },
            { coords: [[-5.5, 6.8], [-5, 20], [0, 35], [4.9, 52.4]], color: '#E63946', width: 3, label: 'Beans → Europe' },
            { coords: [[-5.5, 6.8], [-20, 15], [-40, 25], [-77.0, 38.9]], color: '#0369A1', width: 2, dashed: true },
            { coords: [[-1.0, 6.7], [0, 20], [4.9, 52.4]], color: '#E63946', width: 2 },
          ]}
          regions={[
            { coords: [[-9, 4], [-9, 10], [12, 10], [12, 4], [-9, 4]], color: '#B45309', opacity: 0.08, label: 'Cacao Belt - West Africa' },
          ]}
        />
        <div className="flex flex-wrap gap-4 mt-4">
          {[{ c: '#5E60CE', l: 'Mesoamerican origin' }, { c: '#B45309', l: 'West Africa (70% production)' }, { c: '#E63946', l: 'Europe (43% grinding)' }, { c: '#0369A1', l: 'USA (consumption)' }].map(k => (
            <div key={k.l} className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: k.c }} /><p className="text-[10px] text-[#737373]">{k.l}</p></div>
          ))}
        </div>
      </div></section>

      {/* PRICE CRISIS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · The Price Crisis</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">$2,400 to $12,900. Then back to $4,000. In eighteen months.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The 2024 cocoa crisis was triggered by consecutive poor harvests in West Africa &mdash; drought, disease (Cocoa Swollen Shoot Virus infected 81% of Ghana&rsquo;s crop in affected regions), ageing trees, and underinvestment. Futures prices surged over 400% from late 2023 to a record $12,900 per metric ton in January 2025. By October 2025, they had crashed back to ~$4,000 as production partially recovered and demand destruction kicked in. Hershey reported a 26.6% revenue drop. Barry Callebaut cut production. Chocolate became a case study in commodity fragility.</p>
        <div ref={h4.ref}>
          <div className="flex items-end gap-1 md:gap-2 h-[300px] mt-8" style={{ opacity: h4.visible ? 1 : 0, transition: 'opacity 0.8s' }}>
            {PRICE_HISTORY.map((p, i) => (
              <div key={p.year} className="flex-1 flex flex-col items-center justify-end h-full">
                <p className="text-[8px] md:text-[9px] text-[#525252] mb-1 hidden md:block">${(p.price/1000).toFixed(1)}K</p>
                <div className="w-full rounded-t-sm transition-all duration-1000 ease-out" style={{
                  height: h4.visible ? `${(p.price / maxPrice) * 100}%` : '0%',
                  background: p.price >= 10000 ? '#dc2626' : p.price >= 6000 ? '#E63946' : p.price >= 3000 ? '#B45309' : '#2D6E4F',
                  transitionDelay: `${i * 60}ms`
                }} />
                <p className="text-[7px] md:text-[9px] text-[#a3a3a3] mt-2 -rotate-45 md:rotate-0 origin-top-left">{p.year}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            {[{ c: '#2D6E4F', l: '<$3K/ton' }, { c: '#B45309', l: '$3–6K' }, { c: '#E63946', l: '$6–10K' }, { c: '#dc2626', l: '$10K+ (crisis)' }].map(k => (
              <div key={k.l} className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: k.c }} /><p className="text-[10px] text-[#737373]">{k.l}</p></div>
            ))}
          </div>
        </div>
      </div></section>

      {/* VALUE CHAIN */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · The Value Chain</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Africa grows. Europe grinds. The margins stay north.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">A $4 chocolate bar at a European supermarket began as beans sold by a West African farmer for less than 25 cents of that $4. Europe processes 43% of the world&rsquo;s cocoa &mdash; the Netherlands and Germany alone grind more than all of Africa combined. The five largest chocolate companies (Mars, Mondelēz, Ferrero, Nestlé, Hershey) capture more value than the 3.2 million farming families who grow the crop. The equation is colonial in structure, even when the flags have changed. The same dynamic shapes <span className="underline underline-offset-2">West African gold</span>, <span className="underline underline-offset-2">Ethiopian coffee</span>, and <span className="underline underline-offset-2">Malagasy vanilla</span> &mdash; raw materials flow north, value stays north.</p>
        <div ref={h5.ref} className="space-y-4 mt-8">
          {VALUE_CHAIN.map((v, i) => (
            <div key={v.actor} className="transition-all duration-500" style={{ opacity: h5.visible ? 1 : 0, transitionDelay: `${i * 80}ms` }}>
              <div className="flex items-center gap-3 mb-1">
                <p className="text-[12px] font-medium text-[#0a0a0a] w-36">{v.actor}</p>
                <div className="flex-1 h-8 bg-[#f0f0f0] rounded-sm overflow-hidden">
                  <div className="h-full rounded-sm transition-all duration-1000 ease-out" style={{ width: h5.visible ? `${(v.share / 35) * 100}%` : '0%', background: v.color, transitionDelay: `${i * 100}ms` }} />
                </div>
                <p className="text-[12px] font-medium w-10 text-right" style={{ color: v.color }}>{v.share}%</p>
              </div>
              <p className="text-[11px] text-[#737373] ml-36 pl-3">{v.desc}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* WHO GRINDS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">006 · Who Grinds the Beans</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Europe processes 43%. Africa is catching up.</h2>
        <div ref={h6.ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {GRINDERS.map((g, i) => (
            <div key={g.name} className="border border-[#e5e5e5] bg-white rounded-sm p-5 transition-all duration-500" style={{ opacity: h6.visible ? 1 : 0, transitionDelay: `${i * 100}ms` }}>
              <p className="font-serif text-[36px] italic text-[#0a0a0a] leading-none">{g.pct}%</p>
              <p className="text-[12px] font-medium text-[#0a0a0a] mt-2">{g.name}</p>
              <p className="text-[10px] text-[#737373] mt-1">{g.note}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-8">007 · The Equation</p>
          <div className="space-y-6 text-[15px] md:text-[16px] text-[#262626] leading-[1.8]">
            <p>In 1879, a Ghanaian blacksmith named Tetteh Quarshie smuggled cacao pods from the island of Fernando Po (now Bioko, Equatorial Guinea) and planted them in Mampong, in the Eastern Region of Ghana. The British colonial administration saw the potential and promoted cacao cultivation across the Gold Coast. Within two decades, Ghana was a major exporter. Within a century, West Africa dominated global production. The plant had never grown there before.</p>
            <p>C&ocirc;te d&rsquo;Ivoire followed under French colonial policy, converting forest to cacao farms through the system of work contracts that functioned, in practice, as forced labour. By 1978, it had overtaken Ghana as the world&rsquo;s largest producer. It has held that position ever since, producing 42% of global cocoa &mdash; roughly 1.8 million metric tons per year from approximately 600,000 smallholder farms.</p>
            <p>The equation is stark. West Africa grows 70% of the world&rsquo;s cocoa. The Netherlands, a country with no cacao trees, is the world&rsquo;s largest cocoa processor. Europe grinds 43% of global supply and houses the headquarters of Barry Callebaut, the world&rsquo;s largest chocolate manufacturer. Mars, Mondelēz, Ferrero, Nestlé, and Hershey control the brands. A farmer in C&ocirc;te d&rsquo;Ivoire receives roughly 6% of the retail price of a chocolate bar sold in Berlin. The rest accrues to logistics, grinding, manufacturing, branding, and retail &mdash; all stages concentrated in the Global North.</p>
            <p>Then came 2024. Consecutive poor harvests, driven by erratic weather and the Cocoa Swollen Shoot Virus devastating ageing plantations, cratered West African output. Futures prices surged over 400% to a record $12,900 per metric ton in January 2025 &mdash; the highest in 60 years. Hershey&rsquo;s confectionery revenue fell 26.6%. Barry Callebaut cut production by nearly 5%. Asian cocoa grinding collapsed 16%. Consumers faced 10&ndash;15% price increases. The crisis was structural: decades of underinvestment in replanting, farmer poverty that made alternative crops more attractive, and a production system dependent on ageing trees in a warming climate.</p>
            <p>By October 2025, prices had crashed back to ~$4,000 per ton &mdash; demand destruction and a partial harvest recovery rebalancing the market. But the structural fragility remains. Over 25% of C&ocirc;te d&rsquo;Ivoire&rsquo;s cacao trees are past their productive peak. An estimated two million children are involved in West African cocoa farming. The Living Income Differential introduced in 2020 &mdash; a $400/ton premium meant to support farmers &mdash; has largely failed to reach them.</p>
            <p>The Olmec ground cacao in stone mortars 3,500 years ago. The Aztecs used it as money. Europe added sugar and machines and made it an industry. Africa grows it. The margins stay north. The equation has not changed. Only the scale.</p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#B45309' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">Africa grows the cocoa. Europe grinds it. The chocolate bar costs four dollars. The farmer gets twenty-five cents. The equation has not changed. Only the scale.</p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">The Cacao Equation</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED MODULES */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3] mb-6">Continue Reading</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { href: '/stories/the-vanilla-orchid', title: 'The Vanilla Orchid', sub: 'Same extraction equation — Mesoamerican origin, island transplant, enslaved technique.' },
            { href: '/stories/the-coffee-covenant', title: 'The Coffee Covenant', sub: 'The first stolen commodity. Every Arabica plant outside Ethiopia descends from theft.' },
            { href: '/stories/trans-saharan-trade', title: 'Trans-Saharan Trade Routes', sub: 'West Africa\'s trade networks — gold, salt, and now 70% of the world\'s cacao.' },
            { href: '/stories/the-blood-gold', title: 'The Blood Gold', sub: 'Another West African resource where the equation favours the north.' },
            { href: '/stories/the-food-equation', title: 'The Food Equation', sub: 'Who grows the food. Who eats it. Who profits.' },
          ].map(l => (
            <span key={l.href} className="block p-4 bg-[#fafafa] rounded-sm hover:bg-[#f0f0f0] transition-colors">
              <p className="font-serif text-[16px] italic text-[#0a0a0a] leading-tight mb-1">{l.title}</p>
              <p className="text-[10px] text-[#a3a3a3] leading-relaxed">{l.sub}</p>
            </span>
          ))}
        </div>
      </div></section>

      {/* SOURCES */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-12">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3] mb-4">Sources &amp; Attribution</p>
        <div className="space-y-1">
          {SOURCES.map((s, i) => <p key={i} className="text-[10px] text-[#a3a3a3] leading-relaxed">{s}</p>)}
        </div>
        <p className="text-[10px] text-[#a3a3a3] mt-6">&copy; Slow Morocco 2025. Module 173. Data compiled from ICCO, USDA FAS, FAO, Oxfam. Licensed under CC BY-NC-ND 4.0.</p>
      </div></section>
    </div>
  )
}
