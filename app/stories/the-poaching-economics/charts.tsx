'use client'

import { useEffect, useRef, useState } from 'react'

const C = {
  black: '#0a0a0a', dark: '#262626', mid: '#525252', light: '#737373', muted: '#a3a3a3',
  line: '#e5e5e5', off: '#fafafa', white: '#fff',
  teal: '#047857', green: '#15803d', amber: '#B45309', red: '#991B1B', crimson: '#DC2626', blue: '#0369A1', gold: '#A16207',
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
   CHART 1: The Price Ladder — From Poacher to Consumer
   ═══════════════════════════════════════════ */

const PRICE_LADDER = [
  { level: 'Level 1', role: 'Poacher on the ground', earnings: '$600–$7,000/horn', share: '5-10%', risk: 'Death, arrest, prison 25-77 years', color: C.crimson, barW: 8 },
  { level: 'Level 2', role: 'Local middleman', earnings: '$10,000–$20,000', share: '10-15%', risk: 'Moderate — often locals with connections', color: '#ef4444', barW: 15 },
  { level: 'Level 3', role: 'Cross-border smuggler', earnings: '$20,000–$50,000', share: '15-25%', risk: 'Transit routes. Bribes. Front companies.', color: '#f97316', barW: 30 },
  { level: 'Level 4', role: 'International trafficker', earnings: '$50,000–$200,000', share: '30-40%', risk: 'Low — few mid/high-level arrests globally', color: C.amber, barW: 55 },
  { level: 'Level 5', role: 'End consumer (Asia)', earnings: '$60,000–$400,000/kg', share: '100% retail', risk: 'Near zero — demand-side enforcement minimal', color: C.gold, barW: 100 },
]

export function PriceLadder() {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} className="space-y-3">
      {PRICE_LADDER.map((p, i) => (
        <div
          key={p.level}
          className="p-4 rounded-md border border-[#e5e5e5] bg-white"
          style={{ borderLeftWidth: 4, borderLeftColor: p.color, opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.08}s` }}
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-[10px] font-mono font-bold" style={{ color: p.color }}>{p.level}</span>
              <span className="text-[13px] font-semibold text-[#0a0a0a] ml-2">{p.role}</span>
            </div>
            <span className="font-serif text-[18px] font-light" style={{ color: p.color }}>{p.earnings}</span>
          </div>
          <div className="h-[8px] bg-[#f5f5f5] rounded-sm overflow-hidden mb-2">
            <div className="h-full rounded-sm" style={{ width: visible ? `${p.barW}%` : '0%', background: p.color, opacity: 0.5, transition: `width 0.8s ease ${i * 0.1}s` }} />
          </div>
          <div className="flex justify-between">
            <p className="text-[10px] text-[#525252]"><span className="font-semibold">Share of retail value:</span> {p.share}</p>
            <p className="text-[10px] text-[#991B1B]">{p.risk}</p>
          </div>
        </div>
      ))}
      <p className="text-[9px] text-[#a3a3a3] mt-3">Rhino horn price chain. Sources: Africa Center for Strategic Studies, PoachingFacts, Wildlife Justice Commission, SANParks CITES diagram. © Dancing with Lions</p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 2: The Salary Gap — Ranger vs Poacher
   ═══════════════════════════════════════════ */

const SALARY_COMPARISON = [
  { role: 'Wildlife ranger (average Africa)', monthly: 200, annual: 2400, color: C.teal },
  { role: 'Lion Guardian (Amboseli)', monthly: 100, annual: 1200, color: C.green },
  { role: 'Community game guard (Namibia)', monthly: 150, annual: 1800, color: C.amber },
  { role: 'Mozambican subsistence farmer', monthly: 50, annual: 600, color: C.muted },
  { role: 'Poacher — single rhino horn', monthly: 5000, annual: 5000, color: C.crimson, note: 'One hunt. Life-changing income.' },
  { role: 'Poacher — single elephant tusk', monthly: 600, annual: 600, color: '#ef4444', note: 'One kill.' },
  { role: 'Ivory trafficker (per kg)', monthly: 3000, annual: 3000, color: C.gold, note: 'Per consignment.' },
]

export function SalaryGap() {
  const { ref, visible } = useInView(0.15)
  const maxVal = 5000
  return (
    <div ref={ref} className="space-y-2">
      {SALARY_COMPARISON.map((s, i) => {
        const barW = Math.max((s.monthly / maxVal) * 100, 2)
        const isPoacher = s.monthly >= 600 && s.color !== C.muted
        return (
          <div key={s.role} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.06}s` }}>
            <div className="flex items-baseline justify-between mb-0.5">
              <span className="text-[11px] font-semibold text-[#0a0a0a]">{s.role}</span>
              <span className="text-[12px] font-mono" style={{ color: s.color }}>${s.monthly.toLocaleString()}{isPoacher ? '' : '/mo'}</span>
            </div>
            <div className="h-[10px] bg-[#f5f5f5] rounded-sm overflow-hidden">
              <div className="h-full rounded-sm" style={{
                width: visible ? `${barW}%` : '0%',
                background: s.color, opacity: 0.5,
                transition: `width 0.8s ease ${i * 0.08}s`,
              }} />
            </div>
            {(s as any).note && <p className="text-[9px] text-[#991B1B] italic mt-0.5">{(s as any).note}</p>}
          </div>
        )
      })}
      <div className="mt-4 p-3 bg-[#fef2f2] rounded border border-[#fecaca]/30">
        <p className="text-[11px] text-[#991B1B] font-semibold">The arithmetic of poaching</p>
        <p className="text-[11px] text-[#525252] mt-1 leading-relaxed">One rhino horn = 25 months of ranger salary. In communities where 40% earn ≤$1/day, the incentive structure is not a mystery. Poaching is not a moral failure. It is an economic calculation made by people with no alternatives.</p>
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 3: The Commodity Table — What's Being Traded
   ═══════════════════════════════════════════ */

const COMMODITIES = [
  { species: 'Rhino horn', price: '$60,000/kg', comparison: '> gold ($55k/kg), > platinum ($30k/kg), > cocaine ($35k/kg)', volume: '~500 rhinos killed/year (Africa)', destination: 'Vietnam, China', use: 'Status symbol, traditional medicine (no proven efficacy)', color: C.crimson },
  { species: 'Elephant ivory', price: '$730-$3,000/kg', comparison: 'Fallen from $2,100+ (2014) after China ban', volume: '~20,000 elephants killed/year', destination: 'China, Southeast Asia', use: 'Carvings, jewellery, investment', color: C.amber },
  { species: 'Pangolin scales', price: '$600-$1,000/kg', comparison: 'Most trafficked mammal on Earth', volume: '~200,000 pangolins trafficked/year', destination: 'China, Vietnam', use: 'Traditional medicine', color: C.gold },
  { species: 'Lion bone', price: '$1,500-$5,000/skeleton', comparison: 'Tiger bone substitute', volume: '~800 skeletons exported/year (SA)', destination: 'Laos, Vietnam, China', use: 'Traditional medicine, wine', color: '#f97316' },
  { species: 'Bushmeat', price: 'Variable', comparison: 'Feeds millions but rarely quantified', volume: '~5M tonnes/year (Africa)', destination: 'Local, diaspora communities', use: 'Food security, cultural practice', color: C.muted },
]

export function CommodityTable() {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} className="space-y-3">
      {COMMODITIES.map((c, i) => (
        <div
          key={c.species}
          className="border rounded-lg p-4 bg-white"
          style={{ borderColor: c.color + '30', borderLeftWidth: 4, borderLeftColor: c.color, opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.08}s` }}
        >
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-[14px] font-semibold text-[#0a0a0a]">{c.species}</span>
            <span className="font-serif text-[18px] font-light" style={{ color: c.color }}>{c.price}</span>
          </div>
          <p className="text-[10px] text-[#a3a3a3] italic mb-2">{c.comparison}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <p className="text-[10px] text-[#525252]"><span className="font-semibold text-[#262626]">Volume:</span> {c.volume}</p>
            <p className="text-[10px] text-[#525252]"><span className="font-semibold text-[#262626]">Destination:</span> {c.destination}</p>
            <p className="text-[10px] text-[#525252]"><span className="font-semibold text-[#262626]">Use:</span> {c.use}</p>
          </div>
        </div>
      ))}
      <p className="text-[9px] text-[#a3a3a3] mt-3">Sources: TRAFFIC, UNODC, Africa Center, PoachingFacts, Wildlife Justice Commission. Total IWT: $7-23B/year. © Dancing with Lions</p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 4: The Enforcement Paradox
   ═══════════════════════════════════════════ */

const PARADOX = [
  { stat: '$74M', label: 'Spent on anti-poaching at Kruger (2017-23)', sub: 'Population still halved: 10,000→~2,800', color: C.crimson },
  { stat: '7', label: 'Kruger rangers dismissed 2025', sub: 'Failed polygraph tests linked to poaching spike', color: '#ef4444' },
  { stat: '52%', label: 'Of poachers are unemployed', sub: 'Source: enforcement respondent surveys across Africa', color: C.amber },
  { stat: '5-10%', label: 'Of retail value reaches the poacher', sub: 'Criminal syndicates capture 90-95%. Poachers are labour.', color: C.gold },
  { stat: '1', label: 'Rhino per day killed in SA (2025)', sub: '352 total. 175 in Kruger alone. Syndicates adapt.', color: C.crimson },
  { stat: '0', label: 'Mid/high-level traffickers convicted globally (approx)', sub: 'Vast majority of arrests are ground-level poachers.', color: C.muted },
]

export function EnforcementParadox() {
  const { ref, visible } = useInView(0.15)
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {PARADOX.map((p, i) => (
        <div
          key={p.label}
          className="p-4 rounded-md border border-[#e5e5e5] bg-white"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(8px)', transition: `all 0.4s ease ${i * 0.08}s` }}
        >
          <p className="font-serif text-[28px] font-light leading-none" style={{ color: p.color }}>{p.stat}</p>
          <p className="text-[11px] font-semibold text-[#0a0a0a] mt-2 leading-tight">{p.label}</p>
          <p className="text-[9px] text-[#a3a3a3] mt-1">{p.sub}</p>
        </div>
      ))}
    </div>
  )
}
