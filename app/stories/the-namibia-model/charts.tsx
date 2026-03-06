'use client'

import { useEffect, useRef, useState } from 'react'

const C = {
  black: '#0a0a0a', dark: '#262626', mid: '#525252', light: '#737373', muted: '#a3a3a3',
  line: '#e5e5e5', off: '#fafafa', white: '#fff',
  amber: '#B45309', gold: '#A16207', teal: '#047857', green: '#15803d',
  red: '#991B1B', crimson: '#DC2626', blue: '#0369A1', sand: '#92400E',
}

export function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export function AnimCounter({ target, duration = 1800, prefix = '', suffix = '', decimals = 0 }: { target: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0)
  const { ref, visible } = useInView(0.1)
  useEffect(() => {
    if (!visible) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setVal((1 - Math.pow(1 - t, 3)) * target)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [visible, target, duration])
  return <span ref={ref}>{prefix}{val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}</span>
}


/* ═══════════════════════════════════════════
   CHART 1: The Growth — Conservancy Expansion Timeline
   ═══════════════════════════════════════════ */

const GROWTH_DATA = [
  { year: 1990, conservancies: 0, area: 0, note: 'Independence. Wildlife devastated. 14% under national parks only.' },
  { year: 1996, conservancies: 0, area: 0, note: 'Nature Conservation Ordinance amended. Communities granted wildlife rights.' },
  { year: 1998, conservancies: 4, area: 35000, note: 'First four gazetted: NyaeNyae, Salambala, ≠Khoadi-//Hôas, Torra.' },
  { year: 2002, conservancies: 15, area: 55000, note: 'Income grows. Joint-venture lodges begin. Game guard system expands.' },
  { year: 2004, conservancies: 31, area: 80000, note: 'N$2.35M total income. First NACSO State of Community Conservation report.' },
  { year: 2008, conservancies: 59, area: 132000, note: 'Model gains international recognition. Elephant numbers recovering.' },
  { year: 2012, conservancies: 79, area: 153000, note: 'Over N$70M returns. Desert lions expanding westward to Skeleton Coast.' },
  { year: 2016, conservancies: 83, area: 160000, note: 'Elephant 7,600→23,600. Drought begins in Kunene. Peak lion estimate ~180.' },
  { year: 2019, conservancies: 86, area: 166000, note: 'N$150M+ annual returns. Peak pre-COVID. 67 lodge partnerships.' },
  { year: 2020, conservancies: 86, area: 166000, note: 'COVID collapse. Tourism revenue halved. CRRRF emergency fund activated.' },
  { year: 2024, conservancies: 86, area: 166179, note: 'Recovery. 11-year drought ends. 723-animal emergency cull. Model under stress but holding.' },
  { year: 2025, conservancies: 86, area: 166179, note: 'Elephant ~26,000. 45.6% of Namibia under conservation management.' },
]

export function ConservancyGrowth() {
  const { ref, visible } = useInView(0.15)
  const maxArea = 170000
  const maxCons = 86
  return (
    <div ref={ref}>
      <div className="space-y-2">
        {GROWTH_DATA.map((d, i) => {
          const areaPct = (d.area / maxArea) * 100
          const consPct = (d.conservancies / maxCons) * 100
          return (
            <div key={d.year} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.05}s` }}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-[#737373] w-[36px] shrink-0">{d.year}</span>
                <div className="flex-1 flex gap-1 items-center">
                  {/* conservancy count bar */}
                  <div className="h-[10px] rounded-sm" style={{
                    width: visible ? `${Math.max(consPct * 0.35, d.conservancies > 0 ? 2 : 0)}%` : '0%',
                    background: C.amber, opacity: 0.7,
                    transition: `width 0.8s ease ${i * 0.06}s`,
                  }} />
                  {/* area bar */}
                  <div className="h-[10px] rounded-sm" style={{
                    width: visible ? `${areaPct * 0.6}%` : '0%',
                    background: C.teal, opacity: 0.5,
                    transition: `width 0.8s ease ${i * 0.06 + 0.1}s`,
                  }} />
                </div>
                <span className="text-[9px] text-[#a3a3a3] font-mono w-[28px] text-right shrink-0">{d.conservancies}</span>
              </div>
              {d.note && <p className="text-[9px] text-[#737373] ml-[48px] mt-0.5 leading-relaxed">{d.note}</p>}
            </div>
          )
        })}
      </div>
      <div className="flex gap-4 mt-4">
        {[['Conservancies', C.amber], ['Area (km²)', C.teal]].map(([l, c]) => (
          <div key={l as string} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: c as string }} />
            <span className="text-[9px] uppercase tracking-wider text-[#737373]">{l}</span>
          </div>
        ))}
      </div>
      <p className="text-[9px] text-[#a3a3a3] mt-3">Sources: NACSO, MEFT, Community Conservation Namibia. © Dancing with Lions</p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 2: Wildlife Recovery — Species Trajectories
   ═══════════════════════════════════════════ */

const WILDLIFE_RECOVERY = [
  { species: 'Elephant', before: 7000, after: 26000, period: '1990s–2025', pctChange: '+271%', color: C.mid },
  { species: 'Black rhino', before: 707, after: 2600, period: '1990s–2024', pctChange: '+268%', color: C.dark },
  { species: 'Desert lion (Kunene)', before: 20, after: 60, period: '1997–2023', pctChange: '+200%', color: C.amber, note: 'Peaked ~180 in 2015. Drought + HLC reduced to 57-60. Lowest density in Africa: 0.11/100km²' },
  { species: 'Springbok', before: 50000, after: 175000, period: '1990s–est.', pctChange: '+250%', color: C.gold },
  { species: 'Mountain zebra', before: 3000, after: 27000, period: '1990s–est.', pctChange: '+800%', color: C.teal },
  { species: 'Gemsbok (oryx)', before: 20000, after: 90000, period: '1990s–est.', pctChange: '+350%', color: C.green },
]

export function WildlifeRecovery() {
  const { ref, visible } = useInView(0.2)
  return (
    <div ref={ref} className="space-y-5">
      {WILDLIFE_RECOVERY.map((s, i) => {
        const ratio = s.after / s.before
        const barW = Math.min(ratio / 9 * 100, 100)
        return (
          <div key={s.species} style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)', transition: `all 0.5s ease ${i * 0.1}s` }}>
            <div className="flex items-baseline justify-between mb-1.5">
              <div className="flex items-baseline gap-2">
                <span className="text-[13px] font-semibold text-[#0a0a0a]">{s.species}</span>
                <span className="font-serif text-[18px] font-light" style={{ color: s.color }}>{s.pctChange}</span>
              </div>
              <span className="text-[10px] text-[#a3a3a3] font-mono">{s.before.toLocaleString()} → {s.after.toLocaleString()}</span>
            </div>
            <div className="h-[18px] bg-[#f5f5f5] rounded-sm overflow-hidden relative">
              {/* "before" notch */}
              <div className="absolute inset-y-0 rounded-sm" style={{ left: 0, width: visible ? `${(1 / ratio) * barW}%` : '0%', background: s.color, opacity: 0.3, transition: `width 0.8s ease ${i * 0.08}s` }} />
              {/* "after" bar */}
              <div className="absolute inset-y-0 left-0 rounded-sm" style={{ width: visible ? `${barW}%` : '0%', background: s.color, opacity: 0.6, transition: `width 1.2s ease ${i * 0.08}s` }} />
            </div>
            {s.note && <p className="text-[9px] text-[#737373] mt-1">{s.note}</p>}
          </div>
        )
      })}
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 3: Revenue Architecture — Where the Money Flows
   ═══════════════════════════════════════════ */

const REVENUE_STREAMS = [
  { source: 'Conservation hunting', pct: 50, amount: 'N$75M+', detail: '44 hunting concessions. Quotas set by MEFT game counts. Elephant hunting = 55% of hunting revenue. Community meat harvesting included.', color: C.amber, controversial: true },
  { source: 'Photographic tourism', pct: 30, amount: 'N$45M+', detail: '67 joint-venture lodge agreements. 866 full-time employees. Private sector brings capital; communities bring land and wildlife.', color: C.teal },
  { source: 'Craft industry', pct: 5, amount: 'N$7M+', detail: 'Natural materials, primarily women producers. NACSO partners support quality and marketing. Growing revenue stream.', color: C.gold },
  { source: 'Own-use game', pct: 10, amount: 'N$15M+', detail: 'Community meat harvesting. Dietary supplement for rural populations. In-kind value significant but hard to monetise.', color: C.green },
  { source: 'Other (grants, fees)', pct: 5, amount: 'N$8M+', detail: 'Park concession fees, NGO grants, emergency funds (CRRRF during COVID). Variable year to year.', color: C.light },
]

export function RevenueArchitecture() {
  const { ref, visible } = useInView(0.2)
  return (
    <div ref={ref}>
      <div className="space-y-4">
        {REVENUE_STREAMS.map((r, i) => (
          <div key={r.source} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.1}s` }}>
            <div className="flex items-baseline justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-[#0a0a0a]">{r.source}</span>
                {r.controversial && <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#fef9c3] text-[#A16207] font-mono">DEBATED</span>}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-[18px] font-light" style={{ color: r.color }}>{r.amount}</span>
                <span className="text-[10px] text-[#a3a3a3] font-mono">{r.pct}%</span>
              </div>
            </div>
            <div className="h-[14px] bg-[#f5f5f5] rounded-sm overflow-hidden">
              <div className="h-full rounded-sm" style={{
                width: visible ? `${r.pct * 1.8}%` : '0%',
                background: r.color, opacity: 0.6,
                transition: `width 1s ease ${i * 0.1}s`,
              }} />
            </div>
            <p className="text-[10px] text-[#525252] mt-1 leading-relaxed">{r.detail}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-md border border-[#fef3c7] bg-[#fffbeb]">
        <p className="text-[11px] text-[#92400E] font-semibold">The trophy hunting question</p>
        <p className="text-[10px] text-[#525252] mt-1 leading-relaxed">Conservation hunting generates ~50% of conservancy benefits. 91% of community members oppose a hunting ban. Elephant hunting alone accounts for 55% of hunting revenue. This is the most complex policy debate in African conservation &mdash; the model that produces the best wildlife outcomes relies partly on a mechanism many Western donors oppose.</p>
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 4: The Land — Conservation Coverage
   ═══════════════════════════════════════════ */

const LAND_USE = [
  { type: 'National parks & state concessions', pct: 17.6, color: C.teal },
  { type: 'Communal conservancies', pct: 20.2, color: C.amber },
  { type: 'Private freehold conservancies', pct: 6.1, color: C.gold },
  { type: 'Community forests', pct: 1.7, color: C.green },
  { type: 'Other land', pct: 54.4, color: '#e5e5e5' },
]

export function LandCoverage() {
  const { ref, visible } = useInView(0.2)
  const totalConservation = LAND_USE.filter(l => l.type !== 'Other land').reduce((a, l) => a + l.pct, 0)
  return (
    <div ref={ref}>
      {/* stacked bar */}
      <div className="h-[40px] bg-[#f5f5f5] rounded-md overflow-hidden flex">
        {LAND_USE.map((l, i) => (
          <div
            key={l.type}
            className="h-full first:rounded-l-md last:rounded-r-md"
            style={{
              width: visible ? `${l.pct}%` : '0%',
              background: l.color,
              opacity: l.type === 'Other land' ? 0.3 : 0.7,
              transition: `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`,
            }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {LAND_USE.filter(l => l.type !== 'Other land').map(l => (
          <div key={l.type} className="flex items-start gap-2">
            <div className="w-3 h-3 rounded-sm mt-0.5 shrink-0" style={{ background: l.color, opacity: 0.7 }} />
            <div>
              <p className="text-[11px] text-[#262626] font-semibold">{l.pct}%</p>
              <p className="text-[9px] text-[#737373]">{l.type}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 rounded-md border border-[#e5e5e5] bg-[#fafafa]">
        <p className="font-serif text-[36px] font-light text-[#0a0a0a] leading-none">{totalConservation.toFixed(1)}%</p>
        <p className="text-[11px] text-[#737373] mt-1">of Namibia&rsquo;s land under conservation management. Third-largest continuous conservation landscape in the world. Entire coastline protected — Orange River to Kunene River.</p>
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 5: Pioneer Conservancies — The Four Originals
   ═══════════════════════════════════════════ */

const PIONEERS = [
  { name: 'Torra', year: 1998, region: 'Northwest Kunene', people: '~3,500', detail: 'First self-sufficient conservancy (2003). Desert lions returned. Damaraland Camp joint venture. Annual distributions to members. School renovations funded.', achievement: 'Proved the model. Self-sustaining by year 5.', color: C.teal },
  { name: '≠Khoadi-//Hôas', year: 1998, region: 'Northwest Kunene', people: '~6,100', detail: 'Straddles Kunene north-south border. Arid northwest. Key desert lion corridor to Skeleton Coast. Grootberg Lodge partnership.', achievement: 'Connected Etosha to Skeleton Coast corridor.', color: C.amber },
  { name: 'NyaeNyae', year: 1998, region: 'Northeast (Bushmanland)', people: '~2,500', detail: 'San / Ju|\'hoansi community. Different cultural context from Kunene. Community game guards from San trackers — world\'s best.', achievement: 'Proved model transfers across cultures.', color: C.green },
  { name: 'Salambala', year: 1998, region: 'Zambezi (Caprivi)', people: '~8,000', detail: 'Riverine northeast. Botswana border. Elephant corridor. Part of KAZA Transfrontier Conservation Area.', achievement: 'Transboundary wildlife movement enabled.', color: C.blue },
]

export function PioneerConservancies() {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {PIONEERS.map((p, i) => (
        <div
          key={p.name}
          className="border rounded-lg p-5 bg-white"
          style={{
            borderColor: p.color + '30',
            borderTopWidth: 3,
            borderTopColor: p.color,
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(16px)',
            transition: `all 0.5s ease ${i * 0.12}s`,
          }}
        >
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="font-serif text-[20px] italic text-[#0a0a0a]">{p.name}</h3>
            <span className="font-mono text-[10px]" style={{ color: p.color }}>{p.year}</span>
          </div>
          <p className="text-[10px] text-[#a3a3a3] uppercase tracking-wider mb-2">{p.region} · {p.people} residents</p>
          <p className="text-[12px] text-[#525252] leading-relaxed mb-3">{p.detail}</p>
          <div className="p-2 rounded bg-[#fafafa] border border-[#e5e5e5]">
            <p className="text-[10px] font-semibold" style={{ color: p.color }}>{p.achievement}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 6: The Stress Test — COVID + Drought
   ═══════════════════════════════════════════ */

const STRESS_EVENTS = [
  { year: '2012', event: 'Kunene drought begins', impact: 'Livestock losses accelerate. Prey base declines. Lion-human conflict intensifies.', severity: 40, color: C.amber },
  { year: '2015', event: 'Desert lion peak ~180', impact: 'Population high creates more conflict. Retaliatory killings increase. Drought deepens.', severity: 30, color: C.teal },
  { year: '2017', event: 'Lion population declines 22-37%', impact: 'MEFT releases Human-Lion Conflict Management Plan. Lion Rangers programme formed.', severity: 55, color: C.crimson },
  { year: '2020', event: 'COVID-19 hits', impact: 'Tourism revenue halved. Gate fees collapse. Rangers go unpaid. CRRRF emergency fund launched.', severity: 85, color: C.red },
  { year: '2021', event: 'Post-COVID poaching spike', impact: 'Without tourism revenue, conservation economics collapse. Community game guards face funding gaps.', severity: 70, color: C.red },
  { year: '2022–23', event: 'Kunene lion survey: 57-60', impact: '45-60% lower than previous estimates. Lowest density recorded for free-ranging lions in Africa.', severity: 75, color: C.crimson },
  { year: '2024', event: 'Drought emergency declared', impact: '723-animal cull approved. 83 elephants, 300 zebras. Communities fed. Conservation questioned globally.', severity: 65, color: C.amber },
  { year: '2025', event: 'Drought breaks', impact: 'Rains return. Elephant at 26,000. Model under stress but intact. Recovery begins.', severity: 20, color: C.green },
]

export function StressTest() {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} className="space-y-3">
      {STRESS_EVENTS.map((s, i) => (
        <div
          key={s.year}
          className="flex gap-4 items-start"
          style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.07}s` }}
        >
          <div className="shrink-0 w-[60px] text-right">
            <span className="font-mono text-[11px] font-bold" style={{ color: s.color }}>{s.year}</span>
          </div>
          <div className="flex-1">
            <div className="h-[8px] bg-[#f5f5f5] rounded-sm overflow-hidden mb-1.5">
              <div className="h-full rounded-sm" style={{
                width: visible ? `${s.severity}%` : '0%',
                background: s.color, opacity: 0.6,
                transition: `width 0.8s ease ${i * 0.08}s`,
              }} />
            </div>
            <p className="text-[12px] font-semibold text-[#0a0a0a]">{s.event}</p>
            <p className="text-[10px] text-[#525252] leading-relaxed">{s.impact}</p>
          </div>
        </div>
      ))}
      <p className="text-[9px] text-[#a3a3a3] mt-4">Bar width = approximate severity of impact on conservation system. Sources: NACSO, MEFT, Heydinger et al. (2024), Mongabay. © Dancing with Lions</p>
    </div>
  )
}
