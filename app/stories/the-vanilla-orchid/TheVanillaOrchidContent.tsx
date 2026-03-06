'use client'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
const DWLRouteMap = dynamic(() => import('@/components/maps/DWLRouteMap'), { ssr: false })

const SOURCES = [
  'Cooks Vanilla — Market Report March 2025: Madagascar exported 4,300 MT in H1 2024. Oversupply era.',
  'Procure Tactics — Vanilla Prices 2025: Madagascar Grade A $220–$260/kg. Market $1.39–1.8B (2025).',
  'Mordor Intelligence — Vanilla bean market $1.8B (2025) → $2.3B by 2030, CAGR 5%.',
  'US Census / USDA — US is world\'s top vanilla importer. Madagascar 76% of US vanilla imports.',
  'Choices Magazine — US vanilla imports: peaked at $442.65/kg (2018), avg $131.33/kg (2000–2024).',
  'Tridge — Top vanilla consumers: US (42%), France (18.8%), Germany (11.8%), Canada (4.3%).',
  'Industry Intel — 2024 crop ~1,400 MT (30% drop from 2023). 2025 forecast: 3,000+ MT possible.',
  'Selina Wamucii — Madagascar production 9,651 tonnes (2019). 223,017 hectares under cultivation.',
  'De Monchy Natural Products — Uganda production 250–300 MT (2024–25). Indonesia #2 global producer.',
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

const PRICE_HISTORY = [
  { year: '2000', price: 50, event: '' },
  { year: '2003', price: 200, event: 'Cyclone devastates Madagascar' },
  { year: '2005', price: 25, event: 'Recovery floods market' },
  { year: '2007', price: 20, event: 'All-time low' },
  { year: '2010', price: 30, event: '' },
  { year: '2014', price: 80, event: 'Demand rises, stocks low' },
  { year: '2016', price: 250, event: 'Cyclone Enawo approaching' },
  { year: '2017', price: 430, event: 'Cyclone Enawo hits SAVA' },
  { year: '2018', price: 600, event: 'All-time peak. $600/kg.' },
  { year: '2020', price: 305, event: 'Gradual correction' },
  { year: '2022', price: 240, event: 'Oversupply begins' },
  { year: '2024', price: 140, event: '4,300 MT exported H1 alone' },
  { year: '2025', price: 220, event: 'Grade A $220–260/kg' },
]

const JOURNEY = [
  { step: 'Flower', time: '1 day', desc: 'The vanilla orchid blooms for one morning only. If not pollinated by noon, the flower wilts and dies. There is no second chance.' },
  { step: 'Pollination', time: '~4 hours', desc: 'Each flower hand-pollinated with a bamboo needle or grass stem. One worker can pollinate 1,000–1,500 flowers per day. The technique: lift the rostellum, press anther against stigma.' },
  { step: 'Growth', time: '9 months', desc: 'The green bean grows on the vine for 9 months after pollination — the same gestation as a human pregnancy. Harvested when the tip turns yellow.' },
  { step: 'Killing', time: '1 day', desc: 'Beans blanched in hot water (63°C for 3 minutes) or sun-killed. This halts the enzymatic process and begins flavour development.' },
  { step: 'Sweating', time: '7–10 days', desc: 'Wrapped in blankets, placed in the sun by day, insulated boxes by night. The beans turn brown. Vanillin begins to crystallise on the surface.' },
  { step: 'Drying', time: '2–3 months', desc: 'Slow air-drying on racks in the shade. Moisture drops from 80% to 25–30%. The beans shrink to one-fifth of their green weight.' },
  { step: 'Conditioning', time: '3–6 months', desc: 'Stored in closed containers. Flavour deepens and complexifies. Total time from flower to export-ready: 12–18 months.' },
]

const PRODUCERS = [
  { name: 'Madagascar', pct: 80, tons: '~2,500', region: 'SAVA (Sambava, Antalaha, Vohémar, Andapa)', color: '#E63946' },
  { name: 'Indonesia', pct: 10, tons: '~350', region: 'Bali, Java, Sulawesi, Papua', color: '#B45309' },
  { name: 'Uganda', pct: 3, tons: '~250', region: 'Bundibugyo, Kasese', color: '#2D6E4F' },
  { name: 'Mexico', pct: 2, tons: '~150', region: 'Papantla, Veracruz (original homeland)', color: '#5E60CE' },
  { name: 'Papua New Guinea', pct: 2, tons: '~120', region: 'East Sepik, Madang', color: '#FCBF49' },
  { name: 'Others', pct: 3, tons: '~200', region: 'Tahiti, India, Comoros, Réunion, Mauritius', color: '#a3a3a3' },
]

const CONSUMERS = [
  { name: 'United States', pct: 42, color: '#0369A1' },
  { name: 'France', pct: 19, color: '#5E60CE' },
  { name: 'Germany', pct: 12, color: '#B45309' },
  { name: 'Canada', pct: 4, color: '#E63946' },
  { name: 'Others', pct: 23, color: '#a3a3a3' },
]

export function TheVanillaOrchidContent() {
  const h1 = useInView(); const h2 = useInView(); const h3 = useInView(); const h4 = useInView(); const h5 = useInView()
  const maxPrice = 600

  return (
    <div className="bg-white text-[#262626] pt-16">
      {/* HERO */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 172 · Cultural Intelligence · Madagascar &amp; Mauritius</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Vanilla<br />Orchid</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">In 1841, a twelve-year-old enslaved boy on R&eacute;union discovered how to hand-pollinate the vanilla orchid — a technique the European botanists had failed to crack for three centuries. His name was Edmond Albius. His method made a global industry possible. Madagascar now produces 80% of the world&rsquo;s vanilla. Prices have swung from $20 to $600 per kilo. The second most expensive spice on Earth, after saffron.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ n: 80, s: '%', l: 'world supply (Madagascar)', d: 0 }, { n: 600, s: '', l: '$/kg peak price (2018)', d: 0 }, { n: 1.8, s: 'B', l: '$ global market 2025', d: 1 }, { n: 12, s: '', l: 'months flower to export', d: 0 }].map(k => (
              <div key={k.l}><p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} decimals={k.d} />{k.s}</p><p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* EDMOND ALBIUS */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Boy Who Changed Everything</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Twelve years old. Enslaved. He solved what the botanists could not.</h2>
        <div ref={h1.ref} className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4 text-[14px] text-[#525252] leading-relaxed" style={{ opacity: h1.visible ? 1 : 0, transition: 'opacity 0.7s' }}>
            <p>Vanilla planifolia is a climbing orchid native to Mexico and Central America. The Totonac people of Veracruz cultivated it for centuries. When the Spanish brought it to Europe, they could grow the vine but never got it to fruit. The plant flowered but produced no pods. For 300 years, every attempt to cultivate vanilla outside Mexico failed.</p>
            <p>The reason: the orchid&rsquo;s natural pollinator — a species of Melipona bee found only in Mesoamerica — did not exist anywhere else. Without the bee, no pollination. Without pollination, no vanilla.</p>
            <p>In 1841, on the French island of R&eacute;union (then Bourbon), a twelve-year-old enslaved boy named Edmond Albius discovered a technique: using a thin stick or grass blade, he lifted the rostellum — a small flap separating the male and female parts of the flower — and pressed the anther against the stigma. Pollination in seconds. The method was so simple and effective that it spread across the Indian Ocean within a decade.</p>
            <p>Edmond was never compensated. A French botanist, Jean Michel Claude Richard, tried to claim the discovery. Edmond died in poverty in 1880 in Saint-Suzanne, R&eacute;union. Every vanilla bean harvested since 1841 — every scoop of ice cream, every perfume, every candle — exists because of his hands.</p>
          </div>
          <div className="space-y-4" style={{ opacity: h1.visible ? 1 : 0, transition: 'opacity 0.7s 0.3s' }}>
            <div className="bg-[#fafafa] border border-[#e5e5e5] rounded-sm p-5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#E63946] mb-3">Key Dates</p>
              {[
                { y: '~1500s', t: 'Totonac people cultivate vanilla in Veracruz, Mexico' },
                { y: '1518', t: 'Hernán Cortés brings vanilla to Spain' },
                { y: '1819', t: 'First vanilla plants arrive on Réunion' },
                { y: '1841', t: 'Edmond Albius, age 12, discovers hand-pollination' },
                { y: '1850s', t: 'Technique spreads to Madagascar, Comoros, Mauritius' },
                { y: '1880', t: 'Edmond dies in poverty. Never compensated.' },
                { y: '1900s', t: 'Madagascar overtakes Mexico as top producer' },
                { y: '2003', t: 'Réunion erects monument to Edmond Albius' },
              ].map((e, i) => (
                <div key={i} className="flex gap-3 py-2 border-b border-[#f0f0f0] last:border-0">
                  <p className="text-[10px] text-[#E63946] w-16 flex-shrink-0 font-medium">{e.y}</p>
                  <p className="text-[12px] text-[#525252]">{e.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div></section>

      {/* THE JOURNEY */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · From Flower to Bean</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">600 hand-pollinated flowers. 12 months. 1 kilogram.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Vanilla is the most labour-intensive agricultural product on Earth. Each flower blooms for one morning and must be hand-pollinated before noon. The green bean takes nine months to mature. Then: blanching, sweating, drying, conditioning — another three to six months. From flower to export-ready bean: over a year of daily attention. Approximately 600 hand-pollinated flowers produce one kilogram of cured vanilla.</p>
        <div ref={h2.ref} className="space-y-4">
          {JOURNEY.map((j, i) => (
            <div key={j.step} className="flex gap-4 items-start transition-all duration-500" style={{ opacity: h2.visible ? 1 : 0, transform: h2.visible ? 'translateY(0)' : 'translateY(12px)', transitionDelay: `${i * 80}ms` }}>
              <div className="w-8 h-8 rounded-full bg-[#E63946]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-[11px] font-medium text-[#E63946]">{i + 1}</span>
              </div>
              <div className="flex-1 border-b border-[#e5e5e5] pb-4">
                <div className="flex items-baseline gap-3">
                  <p className="font-serif text-[16px] italic text-[#0a0a0a]">{j.step}</p>
                  <p className="text-[10px] text-[#B45309] uppercase tracking-wider">{j.time}</p>
                </div>
                <p className="text-[13px] text-[#525252] leading-relaxed mt-1">{j.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div></section>

      {/* MAP: MESOAMERICA → INDIAN OCEAN → WORLD */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">The Vanilla Route</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-6">Veracruz &rarr; R&eacute;union &rarr; Madagascar &rarr; the world</h2>
        <DWLRouteMap
          center={[40, 0]}
          zoom={2}
          height="520px"
          points={[
            { coords: [-96.9, 20.5], label: 'Papantla, Veracruz (origin)', color: '#5E60CE', size: 8 },
            { coords: [55.5, -21.1], label: 'Réunion (Edmond Albius)', color: '#E63946', size: 8 },
            { coords: [49.8, -14.3], label: 'SAVA, Madagascar (80%)', color: '#E63946', size: 9 },
            { coords: [57.5, -20.3], label: 'Mauritius (hub)', color: '#B45309', size: 7 },
            { coords: [43.3, -11.7], label: 'Comoros', color: '#047857', size: 5 },
            { coords: [115.2, -8.7], label: 'Bali, Indonesia', color: '#047857', size: 6 },
            { coords: [-77.0, 38.9], label: 'USA (42% consumption)', color: '#0369A1', size: 7 },
            { coords: [2.3, 48.9], label: 'France (19%)', color: '#5E60CE', size: 6 },
            { coords: [10.0, 51.0], label: 'Germany (12%)', color: '#FCBF49', size: 5 },
          ]}
          lines={[
            { coords: [[-96.9, 20.5], [-30, 10], [20, -5], [55.5, -21.1]], color: '#E63946', width: 2, label: 'Spain → Réunion (1819)' },
            { coords: [[55.5, -21.1], [49.8, -14.3]], color: '#E63946', width: 3, label: 'Technique spreads' },
            { coords: [[49.8, -14.3], [57.5, -20.3]], color: '#B45309', label: 'To Mauritius' },
            { coords: [[49.8, -14.3], [20, 0], [-30, 20], [-77.0, 38.9]], color: '#0369A1', dashed: true, label: 'To USA' },
            { coords: [[49.8, -14.3], [30, 10], [2.3, 48.9]], color: '#5E60CE', dashed: true, label: 'To France' },
            { coords: [[49.8, -14.3], [115.2, -8.7]], color: '#047857', dashed: true },
          ]}
        />
        <div className="flex flex-wrap gap-4 mt-4">
          {[{ c: '#5E60CE', l: 'Mesoamerican origin' }, { c: '#E63946', l: 'Indian Ocean (production)' }, { c: '#B45309', l: 'Mauritius hub' }, { c: '#0369A1', l: 'US (top consumer)' }, { c: '#047857', l: 'Other producers' }].map(k => (
            <div key={k.l} className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: k.c }} /><p className="text-[10px] text-[#737373]">{k.l}</p></div>
          ))}
        </div>
      </div></section>

      {/* PRICE HISTORY */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Price Rollercoaster</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">$20 to $600. The most volatile spice on Earth.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">No commodity on Earth shows price swings like vanilla. Cyclones destroy crops in hours. Speculative hoarding doubles prices overnight. Government export controls create artificial scarcity. Oversupply collapses the market just as fast. Farmers who earned $600/kg in 2018 now sell at $140. The volatility is structural: 80% of supply comes from one island, vulnerable to one cyclone season.</p>
        <div ref={h3.ref}>
          {/* Simple bar chart */}
          <div className="flex items-end gap-1 md:gap-2 h-[280px] mt-8" style={{ opacity: h3.visible ? 1 : 0, transition: 'opacity 0.8s' }}>
            {PRICE_HISTORY.map((p, i) => (
              <div key={p.year} className="flex-1 flex flex-col items-center justify-end h-full">
                <p className="text-[9px] text-[#525252] mb-1 hidden md:block">${p.price}</p>
                <div className="w-full rounded-t-sm transition-all duration-1000 ease-out" style={{
                  height: h3.visible ? `${(p.price / maxPrice) * 100}%` : '0%',
                  background: p.price >= 400 ? '#E63946' : p.price >= 200 ? '#B45309' : '#2D6E4F',
                  transitionDelay: `${i * 60}ms`
                }} />
                <p className="text-[8px] md:text-[9px] text-[#a3a3a3] mt-2 -rotate-45 md:rotate-0">{p.year}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            {[{ c: '#2D6E4F', l: '<$200/kg' }, { c: '#B45309', l: '$200–400' }, { c: '#E63946', l: '$400+' }].map(k => (
              <div key={k.l} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: k.c }} />
                <p className="text-[10px] text-[#737373]">{k.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div></section>

      {/* PRODUCERS + CONSUMERS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · Who Grows It</p>
            <h3 className="font-serif text-[22px] italic text-[#0a0a0a] mb-6">One island. 80% of the world.</h3>
            <div ref={h4.ref} className="space-y-3">
              {PRODUCERS.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3 transition-all duration-500" style={{ opacity: h4.visible ? 1 : 0, transitionDelay: `${i * 70}ms` }}>
                  <p className="text-[12px] text-[#737373] w-24 text-right">{p.name}</p>
                  <div className="flex-1 h-7 bg-[#f0f0f0] rounded-sm overflow-hidden">
                    <div className="h-full rounded-sm transition-all duration-1000 ease-out" style={{ width: h4.visible ? `${p.pct}%` : '0%', background: p.color, transitionDelay: `${i * 80}ms` }} />
                  </div>
                  <p className="text-[10px] text-[#525252] w-10">{p.pct}%</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">005 · Who Buys It</p>
            <h3 className="font-serif text-[22px] italic text-[#0a0a0a] mb-6">America eats 42%. The rest fight over 58%.</h3>
            <div ref={h5.ref} className="space-y-3">
              {CONSUMERS.map((c, i) => (
                <div key={c.name} className="flex items-center gap-3 transition-all duration-500" style={{ opacity: h5.visible ? 1 : 0, transitionDelay: `${i * 70}ms` }}>
                  <p className="text-[12px] text-[#737373] w-24 text-right">{c.name}</p>
                  <div className="flex-1 h-7 bg-[#f0f0f0] rounded-sm overflow-hidden">
                    <div className="h-full rounded-sm transition-all duration-1000 ease-out" style={{ width: h5.visible ? `${c.pct}%` : '0%', background: c.color, transitionDelay: `${i * 80}ms` }} />
                  </div>
                  <p className="text-[10px] text-[#525252] w-10">{c.pct}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-8">006 · The Orchid</p>
          <div className="space-y-6 text-[15px] md:text-[16px] text-[#262626] leading-[1.8]">
            <p>The vanilla orchid blooms for a single morning. By noon, if unpollinated, the flower closes and falls. There is no second chance. This is why vanilla is the most labour-intensive crop on Earth — every single flower must be hand-pollinated individually, one by one, during a four-hour window on the one day it opens.</p>
            <p>Madagascar&rsquo;s SAVA region — Sambava, Antalaha, Voh&eacute;mar, Andapa — produces 80% of the world&rsquo;s vanilla. The northeast coast, humid, cyclone-prone, connected to the rest of the country by roads that wash out every rainy season. An estimated 80,000 smallholder farmers cultivate vanilla in SAVA, most on plots under two hectares. The beans grow for nine months on the vine. Then begins the curing: blanching, sweating in the sun, months of slow drying, months of conditioning in sealed boxes. From flower to exportable bean: over a year.</p>
            <p>The price chart reads like a seismograph. Cyclone hits Madagascar: price spikes. Crop recovers: price collapses. Government imposes minimum export price: price stabilises. Speculators hoard: price doubles. Oversupply: price halves. In 2018, vanilla hit $600 per kilogram — more expensive per weight than silver. By 2024, industrial grade was selling at $140. The volatility is structural: when 80% of a global commodity depends on one island in one cyclone belt, the math is fragile.</p>
            <p>Mauritius enters the story as both re-export hub and historical cradle. The French brought vanilla to Mauritius and R&eacute;union in the early 19th century. It was on R&eacute;union that Edmond Albius, a twelve-year-old enslaved boy, discovered hand-pollination in 1841 — the technique that made the entire industry possible. Today, Mauritius is a top-five destination for Madagascar&rsquo;s vanilla exports, processing and re-shipping beans to European and American markets. In January 2024, demand was so explosive that air freight from Madagascar was re-routed through Mauritius to avoid shipping delays.</p>
            <p>The paradox sits at the centre of the industry: farmers in SAVA earn $2 to $8 per kilogram of green beans while retail consumers in New York pay $150 to $240 per kilogram of cured vanilla. The value chain is long, opaque, and dominated by intermediaries. The same structural inequality shapes <span className="underline underline-offset-2">West African cacao</span> and <span className="underline underline-offset-2">Ethiopian coffee</span> — <span className="underline underline-offset-2">Africa&rsquo;s food equation</span> repeating across commodities. Fair trade certification reaches a fraction of growers. The boy who invented the technique died in poverty. The farmers who grow it remain among the poorest in one of the poorest countries on Earth.</p>
            <p>The orchid still blooms for one morning. The hand still lifts the rostellum. The bean still takes a year to cure. Nothing about vanilla has become easier in 180 years. Only the scale has changed — and the distance between the hand that pollinates and the mouth that tastes.</p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#E63946' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">Every vanilla bean harvested since 1841 — every scoop of ice cream, every perfume, every candle — exists because of a twelve-year-old boy&rsquo;s hands.</p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">On Edmond Albius</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED MODULES */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3] mb-6">Continue Reading</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { href: '/data/the-cacao-equation', title: 'The Cacao Equation', sub: 'Same pattern — Mesoamerican origin, colonial transplant, African labour, northern profit.' },
            { href: '/data/the-coffee-covenant', title: 'The Coffee Covenant', sub: 'Another stolen genetic origin. Every commercial coffee plant descends from theft.' },
            { href: '/data/the-tea-road', title: 'The Tea Road', sub: 'Another ceremony commodity. China to Morocco — 81,000 metric tons of stolen routine.' },
            { href: '/data/spice-routes', title: 'The Spice Routes', sub: 'The Indian Ocean trade networks that connected Madagascar, Mauritius, and the world.' },
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
        <p className="text-[10px] text-[#a3a3a3] mt-6">&copy; Slow Morocco 2025. Module 172. Data compiled from USDA, FAO, Tridge, UN COMTRADE. Licensed under CC BY-NC-ND 4.0.</p>
      </div></section>
    </div>
  )
}
