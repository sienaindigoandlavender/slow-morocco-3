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
   CHART 1: The Timeline — From Hume to Handcuffs
   ═══════════════════════════════════════════ */

const TIMELINE = [
  { year: '1996', label: 'John Hume buys 6 white rhinos from Natal Parks Board. Property developer turned wildlife rancher.', type: 'origin' },
  { year: '2007', label: 'Rhino poaching crisis begins. SA incidents rise from 13 to hundreds. Kruger epicentre.', type: 'crisis' },
  { year: '2009', label: 'SA bans domestic rhino horn trade. Hume challenges in court.', type: 'crisis' },
  { year: '2013', label: 'Poaching peaks: 1,004 rhinos killed in SA alone. Kruger population plummets 10,000→4,000.', type: 'crisis' },
  { year: '2016', label: 'Hume security costs: $425,000/month. Last known poaching on his farm: March 2017.', type: 'expansion' },
  { year: '2017', label: 'Domestic ban overturned. Hume auctions 264 horns. Few buyers. Stockpile grows to 6 tons.', type: 'crisis' },
  { year: 'Apr 2023', label: 'Platinum Rhino put up for auction. Asking price $10M. Zero bids. 2,000 rhinos at risk.', type: 'crisis' },
  { year: 'Sep 2023', label: 'African Parks purchases farm + all 2,000 rhinos. Emergency donor funding. Breeding ends.', type: 'launch' },
  { year: 'May 2024', label: 'First 40 rhinos rewilded to Munywana Conservancy, KwaZulu-Natal.', type: 'growth' },
  { year: 'Jun 2024', label: '120 rhinos translocated to Greater Kruger reserves. Security state-of-the-art.', type: 'growth' },
  { year: 'Dec 2024', label: '376 total rhinos moved in Year 1. Target of 300 exceeded. 33 calves born wild.', type: 'expansion' },
  { year: 'Jun 2025', label: '70 rhinos flown 3,400km to Akagera National Park, Rwanda. First cross-continental move.', type: 'expansion' },
  { year: 'Aug 2025', label: 'John Hume arrested. 55 charges: racketeering, fraud, rhino horn trafficking. 7-year investigation.', type: 'crisis' },
  { year: '2025', label: 'Target: 7-20 wild meta-populations by 2033. 300 rhinos/year. The largest wildlife translocation in history.', type: 'expansion' },
]

export function HumeToHandcuffsTimeline() {
  const { ref, visible } = useInView(0.1)
  const typeColor = (t: string) => t === 'crisis' ? C.crimson : t === 'origin' ? C.muted : t === 'launch' ? C.teal : t === 'growth' ? C.green : C.amber
  return (
    <div ref={ref} className="relative pl-6 md:pl-8">
      <div className="absolute left-3 md:left-4 top-0 bottom-0 w-[2px] bg-[#e5e5e5]" />
      <div className="space-y-4">
        {TIMELINE.map((t, i) => (
          <div key={`${t.year}-${i}`} className="relative flex gap-4" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.04}s` }}>
            <div className="absolute -left-6 md:-left-8 w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ background: typeColor(t.type), top: 2 }} />
            <div>
              <span className="text-[12px] font-mono font-bold" style={{ color: typeColor(t.type) }}>{t.year}</span>
              <p className="text-[12px] text-[#525252] leading-relaxed mt-0.5">{t.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 2: The Poaching Crisis — SA Numbers
   ═══════════════════════════════════════════ */

const POACHING_DATA = [
  { year: '2007', count: 13 }, { year: '2008', count: 83 }, { year: '2009', count: 122 },
  { year: '2010', count: 333 }, { year: '2011', count: 448 }, { year: '2012', count: 668 },
  { year: '2013', count: 1004 }, { year: '2014', count: 1215 }, { year: '2015', count: 1175 },
  { year: '2016', count: 1054 }, { year: '2017', count: 1028 }, { year: '2018', count: 769 },
  { year: '2019', count: 594 }, { year: '2020', count: 394 }, { year: '2021', count: 451 },
  { year: '2022', count: 448 }, { year: '2023', count: 499 }, { year: '2024', count: 420 },
  { year: '2025', count: 352 },
]

export function PoachingCrisis() {
  const { ref, visible } = useInView(0.15)
  const maxCount = 1215
  return (
    <div ref={ref}>
      <div className="flex items-end gap-[3px] h-[200px]">
        {POACHING_DATA.map((d, i) => {
          const h = (d.count / maxCount) * 100
          const isPeak = d.count >= 1000
          return (
            <div key={d.year} className="flex-1 flex flex-col items-center justify-end h-full">
              <div className="w-full rounded-t-sm" style={{
                height: visible ? `${h}%` : '0%',
                background: isPeak ? C.crimson : d.count > 500 ? '#ef4444' : d.count > 200 ? '#f97316' : '#fbbf24',
                opacity: isPeak ? 0.7 : 0.5,
                transition: `height 0.8s ease ${i * 0.04}s`,
              }} />
              <p className="text-[7px] text-[#a3a3a3] mt-1 -rotate-45 origin-top-left translate-y-3 whitespace-nowrap">{d.year}</p>
            </div>
          )
        })}
      </div>
      <div className="flex justify-between mt-8">
        <p className="text-[9px] text-[#a3a3a3]">South Africa rhino poaching. Sources: DFFE, Save the Rhino International</p>
        <p className="text-[9px] text-[#991B1B] font-semibold">Peak: 1,215 (2014)</p>
      </div>
      <p className="text-[9px] text-[#a3a3a3] mt-1">2025: 352 killed = 16% decline. But Kruger nearly doubled (88→175). Success in KZN (198→63). © Dancing with Lions</p>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 3: The Rewilding Map — Destinations
   ═══════════════════════════════════════════ */

const DESTINATIONS = [
  { name: 'Munywana Conservancy', country: 'South Africa, KZN', rhinos: 40, date: 'May 2024', status: 'Complete', note: 'Community land restitution. First rewilding under Rhino Rewild.', color: C.green },
  { name: 'Greater Kruger (GKEPF)', country: 'South Africa, Mpumalanga/Limpopo', rhinos: 120, date: 'Jun 2024', status: 'Complete', note: '6 private reserves. 33 calves already born. Mating confirmed.', color: C.green },
  { name: 'Additional SA reserves', country: 'South Africa', rhinos: 56, date: 'Q3-Q4 2024', status: 'Complete', note: 'Multiple private reserves. One site reintroduced rhino after local extinction.', color: C.green },
  { name: 'Staging reserve', country: 'South Africa', rhinos: 160, date: '2024', status: 'Staging', note: 'Building parasite immunity before cross-border moves.', color: C.amber },
  { name: 'Akagera National Park', country: 'Rwanda', rhinos: 70, date: 'Jun 2025', status: 'Complete', note: '3,400km airlift. Now 100 white rhino total. $4.7M park revenue.', color: C.blue },
  { name: 'Garamba National Park', country: 'DRC', rhinos: 0, date: 'Planned', status: 'Planned', note: 'Former last northern white rhino site. Howard G Buffett Foundation funded.', color: C.muted },
]

export function RewildingDestinations() {
  const { ref, visible } = useInView(0.15)
  const statusColor = (s: string) => s === 'Complete' ? C.green : s === 'Staging' ? C.amber : C.muted
  return (
    <div ref={ref} className="space-y-3">
      {DESTINATIONS.map((d, i) => (
        <div
          key={d.name}
          className="border rounded-lg p-4 bg-white"
          style={{
            borderColor: d.color + '30', borderLeftWidth: 4, borderLeftColor: d.color,
            opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.06}s`,
          }}
        >
          <div className="flex items-start justify-between mb-1">
            <div>
              <span className="text-[13px] font-semibold text-[#0a0a0a]">{d.name}</span>
              <span className="text-[8px] px-1.5 py-0.5 rounded font-mono font-bold text-white ml-2" style={{ background: statusColor(d.status) }}>{d.status}</span>
            </div>
            <span className="font-serif text-[22px] font-light" style={{ color: d.color }}>{d.rhinos > 0 ? d.rhinos : '—'}</span>
          </div>
          <p className="text-[10px] text-[#a3a3a3]">{d.country} · {d.date}</p>
          <p className="text-[11px] text-[#525252] mt-1">{d.note}</p>
        </div>
      ))}
      <div className="p-4 rounded-lg bg-[#fafafa] border border-[#e5e5e5]">
        <p className="text-[12px] text-[#0a0a0a] font-semibold">Totals to date</p>
        <p className="text-[11px] text-[#525252] mt-1">376 rewilded in 2024. 70 to Rwanda in 2025. 33 calves born wild. Target: ~300/year through 2033. Goal: 7-20 self-sustaining meta-populations across Africa.</p>
      </div>
    </div>
  )
}


/* ═══════════════════════════════════════════
   CHART 4: The White Rhino Decline — Kruger Collapse
   ═══════════════════════════════════════════ */

const KRUGER_DATA = [
  { year: '2010', pop: 10000 },
  { year: '2013', pop: 8400 },
  { year: '2016', pop: 5500 },
  { year: '2018', pop: 4600 },
  { year: '2020', pop: 3549 },
  { year: '2023', pop: 3200 },
  { year: '2025', pop: 2800 },
]

export function KrugerCollapse() {
  const { ref, visible } = useInView(0.15)
  const maxPop = 10000
  return (
    <div ref={ref}>
      <div className="flex items-end gap-2 h-[180px]">
        {KRUGER_DATA.map((d, i) => {
          const h = (d.pop / maxPop) * 100
          return (
            <div key={d.year} className="flex-1 flex flex-col items-center justify-end h-full">
              <p className="text-[10px] font-mono text-[#525252] mb-1">{(d.pop / 1000).toFixed(1)}k</p>
              <div className="w-full rounded-t-sm" style={{
                height: visible ? `${h}%` : '0%',
                background: d.pop > 5000 ? C.amber : C.crimson,
                opacity: 0.5,
                transition: `height 0.8s ease ${i * 0.08}s`,
              }} />
              <p className="text-[9px] text-[#a3a3a3] mt-2">{d.year}</p>
            </div>
          )
        })}
      </div>
      <p className="text-[9px] text-[#a3a3a3] mt-4">Kruger National Park white rhino population. $74M spent on anti-poaching (2017-23). Population still declined. Sources: SANParks, Heydinger et al. © Dancing with Lions</p>
    </div>
  )
}
