'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
const DWLRouteMap = dynamic(() => import('@/components/maps/DWLRouteMap'), { ssr: false })

const SOURCES = [
  'ECTA — Ethiopian Coffee and Tea Authority: $2.65B exports, 469K tons (2024/25 fiscal year record).',
  'USDA FAS — Coffee Annual: Production 11.6M bags forecast 2025/26, exports 7.8M bags.',
  'ICO — International Coffee Organization: Global consumption 177M bags (2023/24). 2.25B cups/day.',
  'Grand View Research — Global coffee market $269B (2024), projected $369B by 2030, CAGR 5.3%.',
  'Statista — Coffee market combined revenue $485.6B (2025). 7.46B kg consumed globally.',
  'NCA — National Coffee Association: 66% of American adults drink coffee daily (2025), 20-year high.',
  'Ethiopia Comprehensive Coffee Strategy (CECSIR): Target $4B exports by 2033, 2nd largest exporter.',
  'FAO — Ethiopia is Africa\'s largest coffee producer, 5th globally. Arabica originated in SW highlands.',
  'USDA — Arabica prices surged from 270 cents/lb (mid-2024) to 423 cents/lb (April 2025).',
]

/* ═══════════════════════════════════════════════════
   THE COFFEE COVENANT
   From Kaffa to the World · Module 170
   ═══════════════════════════════════════════════════ */

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

function AnimCounter({ target, duration = 1800, prefix = '', suffix = '', decimals = 0 }: { target: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) {
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
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>
}

/* ── DATA ── */
const REGIONS = [
  { name: 'Yirgacheffe', alt: '1,750–2,200m', profile: 'Floral, citrus, bright acidity', note: 'The jewel. Washed process. Jasmine and bergamot notes. Commands highest prices.', color: '#2D6E4F' },
  { name: 'Sidamo', alt: '1,500–2,200m', profile: 'Berry, wine, complex', note: 'South-central highlands. Stone fruit, blueberry in natural process. Ethiopia\'s largest growing zone.', color: '#5E60CE' },
  { name: 'Harrar', alt: '1,500–2,100m', profile: 'Dry-processed, wild, fruity', note: 'Eastern highlands. Ancient variety. Mocha-blueberry notes. Oldest cultivated coffee region.', color: '#B45309' },
  { name: 'Jimma / Kaffa', alt: '1,400–2,100m', profile: 'Earthy, full-bodied, spice', note: 'The origin. Wild coffee forests. Kaffa → "coffee". UNESCO Biosphere Reserve.', color: '#047857' },
  { name: 'Guji', alt: '1,800–2,300m', profile: 'Peach, floral, clean', note: 'Recently separated from Sidamo. Rising star. Complex natural and washed lots.', color: '#E63946' },
  { name: 'Limu', alt: '1,400–2,100m', profile: 'Wine, spice, low acidity', note: 'Western highlands. Wet-processed. Balanced cup. Often underrated.', color: '#FCBF49' },
]

const THEFT_TIMELINE = [
  { year: '~850 CE', event: 'Kaldi legend — goats eat berries in Kaffa forests', loc: 'Ethiopia' },
  { year: '~1400', event: 'Sufi monks use coffee for nighttime prayers in Yemen', loc: 'Yemen' },
  { year: '1554', event: 'First coffeehouses open in Constantinople', loc: 'Ottoman Empire' },
  { year: '1616', event: 'Dutch steal coffee plant from Mocha port', loc: 'Netherlands' },
  { year: '1696', event: 'Dutch plant stolen seedlings in Java', loc: 'Indonesia' },
  { year: '1714', event: 'Mayor of Amsterdam gifts plant to Louis XIV', loc: 'France' },
  { year: '1723', event: 'Gabriel de Clieu smuggles single plant to Martinique', loc: 'Caribbean' },
  { year: '1727', event: 'Francisco de Melo steals from French Guiana to Brazil', loc: 'Brazil' },
  { year: '2025', event: 'Brazil produces 35% of world coffee. All from stolen genetics.', loc: 'Global' },
]

const TOP_PRODUCERS = [
  { name: 'Brazil', bags: 69.9, pct: 38, color: '#2D6E4F' },
  { name: 'Vietnam', bags: 27.5, pct: 15, color: '#5E60CE' },
  { name: 'Colombia', bags: 13.5, pct: 7, color: '#FCBF49' },
  { name: 'Indonesia', bags: 11.9, pct: 6, color: '#E63946' },
  { name: 'Ethiopia', bags: 11.6, pct: 6, color: '#B45309' },
  { name: 'Honduras', bags: 6.5, pct: 4, color: '#047857' },
  { name: 'India', bags: 5.8, pct: 3, color: '#0369A1' },
  { name: 'Others', bags: 27.7, pct: 21, color: '#a3a3a3' },
]

const CEREMONY = [
  { cup: 'Abol', arabic: 'الأول', meaning: 'The First — strongest', desc: 'The roast. The grind. The first pour from the jebena. Mint and sugar dominate. Easy conversation. The kind that requires nothing.' },
  { cup: 'Tona', arabic: 'الثاني', meaning: 'The Second — balanced', desc: 'Tannins rise. Sugar recedes. Someone mentions a problem at work. Advice is offered carefully. The conversation deepens.' },
  { cup: 'Baraka', arabic: 'الثالث', meaning: 'The Third — blessing', desc: 'Weakest brew, most important cup. The room grows quiet. Almaz\'s grandmother said the third cup carries prayers directly to God.' },
]

export function TheCoffeeCovenantContent() {
  const h1 = useInView(); const h2 = useInView(); const h3 = useInView(); const h4 = useInView(); const h5 = useInView()
  const [expandedRegion, setExpandedRegion] = useState<number | null>(null)

  return (
    <div className="bg-white text-[#262626] pt-16">
      {/* HERO */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
        <div className="max-w-[1000px] mx-auto px-6 md:px-10 py-24 md:py-36 relative z-10">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/30 mb-4">Module 170 · Cultural Intelligence · Ethiopia</p>
          <h1 className="font-serif text-[42px] md:text-[64px] leading-[1.02] font-light italic mb-6">The Coffee<br />Covenant</h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[540px] mb-10">Every commercial coffee plant on Earth descends from seeds stolen from Ethiopia. The $485-billion global industry runs on a plant that still grows wild in the Kaffa forests where a goatherd first noticed his animals dancing. The buna ceremony — three cups, two hours, the conversation that only happens in the third cup — is a social technology older than any caf&eacute;.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ n: 2.65, s: 'B', l: '$ exports 2024 (record)', d: 2 }, { n: 2.25, s: 'B', l: 'cups consumed daily', d: 2 }, { n: 485, s: 'B', l: '$ global industry 2025', d: 0 }, { n: 177, s: 'M', l: 'bags consumed yearly', d: 0 }].map(k => (
              <div key={k.l}><p className="font-serif text-[32px] md:text-[40px] font-light text-white leading-none"><AnimCounter target={k.n} decimals={k.d} />{k.s}</p><p className="text-[9px] uppercase tracking-[0.1em] text-white/30 mt-1">{k.l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* CEREMONY */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">001 · The Buna Ceremony</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Three cups. Two hours. The conversation that matters.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The buna ceremony is not performance. It is social technology refined over centuries. Green beans roasted over charcoal, ground by hand in a wooden mortar, brewed three times in a clay jebena. Anyone who tries to hurry is gently mocked until they relax. Ethiopia exports coffee to the world — but the ceremony stays home. You don&rsquo;t drink coffee in Ethiopia. You attend it. Morocco has <span className="underline underline-offset-2">its own ceremony</span> — three glasses of mint tea, poured from height — and the same rule applies: you cannot rush it.</p>
        <div ref={h1.ref} className="grid md:grid-cols-3 gap-6">
          {CEREMONY.map((c, i) => (
            <div key={c.cup} className="border border-[#e5e5e5] rounded-sm p-6 transition-all duration-700" style={{ opacity: h1.visible ? 1 : 0, transform: h1.visible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: `${i * 150}ms` }}>
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#B45309] mb-2">{c.meaning}</p>
              <p className="font-serif text-[24px] italic text-[#0a0a0a] mb-1">{c.cup}</p>
              <p className="text-[13px] text-[#525252] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* REGIONS */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">002 · The Growing Regions</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Six terroirs. One country. Every bean different.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Ethiopia is the only country where coffee grows wild. The genetic diversity of the Kaffa forests dwarfs anything cultivated elsewhere. Six major growing regions produce beans with radically different profiles — from the jasmine florals of Yirgacheffe to the wild blueberry of Harrar. Each region is a world.</p>
        <div ref={h2.ref} className="space-y-3">
          {REGIONS.map((r, i) => (
            <div key={r.name} className="border border-[#e5e5e5] bg-white rounded-sm cursor-pointer transition-all duration-500" style={{ opacity: h2.visible ? 1 : 0, transitionDelay: `${i * 80}ms` }} onClick={() => setExpandedRegion(expandedRegion === i ? null : i)}>
              <div className="flex items-center gap-4 p-4">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: r.color }} />
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-[18px] italic text-[#0a0a0a]">{r.name}</p>
                  <p className="text-[11px] text-[#737373]">{r.alt} · {r.profile}</p>
                </div>
                <span className="text-[10px] text-[#a3a3a3]">{expandedRegion === i ? '−' : '+'}</span>
              </div>
              {expandedRegion === i && (
                <div className="px-4 pb-4 border-t border-[#e5e5e5]">
                  <p className="text-[13px] text-[#525252] leading-relaxed pt-3">{r.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div></section>

      {/* STOLEN GENETICS TIMELINE */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">003 · The Stolen Genetics</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">Every coffee farm on Earth descends from theft.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">The Dutch stole a plant from Mocha. The French stole from the Dutch. Brazil stole from the French. Every commercial coffee plantation in the world traces its genetic lineage back to stolen Ethiopian seedlings — a handful of plants that became a $485-billion global industry. The same pattern repeated with <span className="underline underline-offset-2">cacao</span> and <span className="underline underline-offset-2">vanilla</span>: origin in the Global South, theft by colonial powers, profit captured in the North. The wild genetic diversity still grows only in Ethiopia&rsquo;s southwestern forests. The forests are shrinking. The genetic library is closing.</p>
        <div ref={h3.ref} className="relative pl-8 space-y-6">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-[#e5e5e5]" />
          {THEFT_TIMELINE.map((t, i) => (
            <div key={i} className="relative transition-all duration-500" style={{ opacity: h3.visible ? 1 : 0, transform: h3.visible ? 'translateX(0)' : 'translateX(-12px)', transitionDelay: `${i * 80}ms` }}>
              <div className="absolute -left-5 top-1 w-[10px] h-[10px] rounded-full border-2 border-[#B45309] bg-white" />
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#B45309] mb-1">{t.year} · {t.loc}</p>
              <p className="text-[13px] text-[#262626] leading-relaxed">{t.event}</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* MAP: THE THEFT ROUTE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">The Route of the Stolen Seedlings</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-6">Kaffa &rarr; Mocha &rarr; Amsterdam &rarr; Java &rarr; Martinique &rarr; Brazil</h2>
        <DWLRouteMap
          center={[30, 10]}
          zoom={2}
          height="520px"
          points={[
            { coords: [36.3, 7.3], label: 'Kaffa (origin)', color: '#047857', size: 8 },
            { coords: [43.3, 13.3], label: 'Mocha (Yemen)', color: '#B45309', size: 7 },
            { coords: [4.9, 52.4], label: 'Amsterdam', color: '#E63946', size: 6 },
            { coords: [110.4, -7.8], label: 'Java', color: '#E63946', size: 6 },
            { coords: [2.3, 48.9], label: 'Paris', color: '#5E60CE', size: 5 },
            { coords: [-61.0, 14.6], label: 'Martinique', color: '#5E60CE', size: 6 },
            { coords: [-52.3, 4.9], label: 'French Guiana', color: '#5E60CE', size: 5 },
            { coords: [-43.2, -22.9], label: 'Brazil', color: '#FCBF49', size: 7 },
            { coords: [38.7, 7.0], label: 'Yirgacheffe', color: '#2D6E4F', size: 5 },
            { coords: [38.5, 6.5], label: 'Sidamo', color: '#2D6E4F', size: 5 },
            { coords: [42.1, 9.3], label: 'Harrar', color: '#2D6E4F', size: 5 },
            { coords: [36.8, 7.7], label: 'Jimma', color: '#2D6E4F', size: 5 },
          ]}
          lines={[
            { coords: [[36.3, 7.3], [43.3, 13.3]], color: '#B45309', label: 'To Yemen' },
            { coords: [[43.3, 13.3], [4.9, 52.4]], color: '#E63946', label: 'Dutch steal' },
            { coords: [[4.9, 52.4], [110.4, -7.8]], color: '#E63946', label: 'To Java 1696' },
            { coords: [[4.9, 52.4], [2.3, 48.9]], color: '#5E60CE' },
            { coords: [[2.3, 48.9], [-61.0, 14.6]], color: '#5E60CE', label: 'To Martinique 1723' },
            { coords: [[-61.0, 14.6], [-52.3, 4.9]], color: '#FCBF49' },
            { coords: [[-52.3, 4.9], [-43.2, -22.9]], color: '#FCBF49', label: 'To Brazil 1727' },
          ]}
        />
        <div className="flex flex-wrap gap-4 mt-4">
          {[{ c: '#047857', l: 'Origin (Kaffa)' }, { c: '#2D6E4F', l: 'Ethiopian regions' }, { c: '#E63946', l: 'Dutch route' }, { c: '#5E60CE', l: 'French route' }, { c: '#FCBF49', l: 'Brazil route' }].map(k => (
            <div key={k.l} className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: k.c }} /><p className="text-[10px] text-[#737373]">{k.l}</p></div>
          ))}
        </div>
      </div></section>

      {/* WORLD PRODUCTION */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-3">004 · Global Production</p>
        <h2 className="font-serif text-[28px] md:text-[36px] italic text-[#0a0a0a] leading-[1.05] mb-4">174 million bags. One plant. Stolen once.</h2>
        <p className="text-[14px] text-[#525252] leading-relaxed max-w-[560px] mb-10">Brazil produces 38% of the world&rsquo;s coffee — from plants that arrived via a single stolen cutting in 1727. Vietnam, the world&rsquo;s second-largest producer, grows mostly Robusta. Ethiopia ranks fifth but holds a unique position: the only top producer growing exclusively Arabica, and the only one where the plant is indigenous. Ethiopia targets $4 billion in exports by 2033 and aims to become the world&rsquo;s second-largest exporter.</p>
        <div ref={h4.ref} className="space-y-3">
          {TOP_PRODUCERS.map((p, i) => (
            <div key={p.name} className="flex items-center gap-3 transition-all duration-600" style={{ opacity: h4.visible ? 1 : 0, transitionDelay: `${i * 60}ms` }}>
              <p className="text-[12px] text-[#737373] w-20 text-right">{p.name}</p>
              <div className="flex-1 h-8 bg-[#f0f0f0] rounded-sm overflow-hidden relative">
                <div className="h-full rounded-sm transition-all duration-1000 ease-out" style={{ width: h4.visible ? `${p.pct}%` : '0%', background: p.color, transitionDelay: `${i * 80}ms` }} />
              </div>
              <p className="text-[11px] text-[#525252] w-20">{p.bags}M bags</p>
            </div>
          ))}
        </div>
      </div></section>

      {/* ESSAY */}
      <section className="border-t border-[#e5e5e5]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#737373] mb-8">005 · The Covenant</p>
          <div className="space-y-6 text-[15px] md:text-[16px] text-[#262626] leading-[1.8]">
            <p>Coffea arabica is native to the highlands of southwestern Ethiopia — specifically the Kaffa region, from which the word &ldquo;coffee&rdquo; derives. The plant still grows wild there, in the understory of cloud forests between 1,500 and 2,100 metres. Goats still graze among it.</p>
            <p>The legend says Kaldi, a 9th-century herder, noticed his goats becoming unusually energetic after eating the red berries. He brought them to a monastery. The monks threw them in the fire, appalled at this stimulant. The roasting beans released their aroma. The monks changed their minds.</p>
            <p>What is documented: Sufi monasteries in Yemen were using coffee for nighttime prayers by the 15th century. The port of Mocha became the world&rsquo;s coffee hub — on the same <span className="underline underline-offset-2">Red Sea coast where Sheba had traded frankincense</span> centuries before. The Ottomans spread it through their empire. The Dutch stole seedlings for Java. The French stole a single plant for Martinique. Brazil stole from French Guiana.</p>
            <p>Every commercial coffee plant on Earth descends from those thefts. The wild genetics still grow only in Ethiopia.</p>
            <p>In 2024, Ethiopia hit a record: $2.65 billion in coffee export revenue, 469,000 metric tons shipped. Arabica prices surged from 270 to 423 cents per pound as global supply tightened. Germany, Saudi Arabia, and the United States are the top buyers. Ethiopia targets $4 billion by 2033.</p>
            <p>But the real treasure is not in the export figures. It is in the forests of Kaffa, where wild coffee genetic diversity dwarfs anything cultivated anywhere. Climate models suggest that wild arabica could lose most of its suitable habitat within decades. The genetic material needed to adapt the world&rsquo;s coffee to a warming planet may disappear before it can be collected.</p>
            <p>The forests still stand in parts of southwestern Ethiopia. The wild coffee still grows. Farmers still harvest from trees their grandparents tended. The buna ceremony still begins with roasting, still takes two hours, still requires the third cup for the blessing.</p>
            <p>The plant the world runs on, in the place it was born. The ceremony the world cannot buy.</p>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="border-t border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-20 md:py-28 min-h-[42vh] flex items-center">
          <blockquote className="border-l-[3px] pl-6 md:pl-8" style={{ borderColor: '#B45309' }}>
            <p className="font-serif text-[24px] md:text-[32px] italic leading-[1.4] text-[#0a0a0a]">The first cup is for pleasure. The second is for conversation. The third is for blessing.</p>
            <p className="text-[11px] text-[#a3a3a3] mt-4 uppercase tracking-wider">Ethiopian proverb</p>
          </blockquote>
        </div>
      </section>

      {/* CONNECTED MODULES */}
      <section className="border-t border-[#e5e5e5]"><div className="max-w-[1000px] mx-auto px-6 md:px-10 py-12 md:py-16">
        <p className="text-[10px] uppercase tracking-[0.12em] text-[#a3a3a3] mb-6">Continue Reading</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { href: '/stories/the-queen-who-did-not-kneel', title: 'The Queen Who Did Not Kneel', sub: 'The Ethiopia–Yemen corridor Sheba controlled. The geopolitics of frankincense.' },
            { href: '/stories/tea-ceremony', title: 'The Tea Road', sub: 'China to Morocco — another ceremony, another stolen commodity, another route.' },
            { href: '/stories/the-cacao-equation', title: 'The Cacao Equation', sub: 'Colonial commodity theft — from Mesoamerica to West Africa. The same pattern.' },
            { href: '/stories/the-vanilla-orchid', title: 'The Vanilla Orchid', sub: 'Another stolen origin. Another enslaved hand that changed the world.' },
            { href: '/stories/spice-routes', title: 'The Spice Routes', sub: 'The trade networks that carried coffee from Ethiopia to the world.' },
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
        <p className="text-[10px] text-[#a3a3a3] mt-6">&copy; Slow Morocco 2025. Module 170. Data compiled from ECTA, USDA FAS, ICO, FAO. Licensed under CC BY-NC-ND 4.0.</p>
      </div></section>
    </div>
  )
}
