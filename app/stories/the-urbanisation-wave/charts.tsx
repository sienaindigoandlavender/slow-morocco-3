'use client'
import { useEffect, useRef, useState } from 'react'
export function useInView(threshold = 0.25) { const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false); useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold }); obs.observe(el); return () => obs.disconnect() }, [threshold]); return { ref, visible: v } }
export function AnimCounter({ target, duration = 1800, prefix = '', suffix = '', decimals = 0 }: { target: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) { const [val, setVal] = useState(0); const { ref, visible } = useInView(0.1); useEffect(() => { if (!visible) return; const s = performance.now(); const t = (n: number) => { const p = Math.min((n - s) / duration, 1); setVal((1 - Math.pow(1 - p, 3)) * target); if (p < 1) requestAnimationFrame(t) }; requestAnimationFrame(t) }, [visible, target, duration]); return <span ref={ref}>{prefix}{val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}</span> }

/* MEGACITY GROWTH — Radial bubbles */
const CITIES = [
  { name: 'Lagos', now: 16, proj: 88, country: 'Nigeria', color: '#991B1B', note: 'Could be world\'s largest city by 2100. Currently adding ~800K people/year.' },
  { name: 'Kinshasa', now: 18, proj: 58, country: 'DRC', color: '#7C3AED', note: 'Already larger than Paris. Congo River megacity. Infrastructure critically strained.' },
  { name: 'Cairo', now: 22, proj: 38, country: 'Egypt', color: '#D97706', note: 'Africa\'s current largest. New Administrative Capital $58B project underway.' },
  { name: 'Dar es Salaam', now: 8, proj: 36, country: 'Tanzania', color: '#0369A1', note: 'Fastest-growing major city in Africa. 5.6% annual growth rate.' },
  { name: 'Luanda', now: 9, proj: 33, country: 'Angola', color: '#047857', note: 'Oil wealth, extreme inequality. One of the most expensive cities globally.' },
  { name: 'Nairobi', now: 5.5, proj: 20, country: 'Kenya', color: '#A16207', note: 'Silicon Savannah. Tech hub driving East African urban economy.' },
  { name: 'Casablanca', now: 4.2, proj: 8, country: 'Morocco', color: '#15803d', note: 'Morocco\'s economic capital. Tram, port, financial hub. Compact growth model.' },
  { name: 'Addis Ababa', now: 6, proj: 18, country: 'Ethiopia', color: '#525252', note: 'AU headquarters. Light rail (Africa\'s first). But rapid unplanned expansion.' },
]

export function MegacityBubbles() {
  const { ref, visible } = useInView(0.1)
  const [hovered, setHovered] = useState<number | null>(null)
  const maxProj = 88
  return (
    <div ref={ref}>
      <svg viewBox="0 0 700 380" className="w-full" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s' }}>
        <defs>
          {CITIES.map((c, i) => <radialGradient key={i} id={`ub${i}`} cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor={c.color} stopOpacity="0.08" /><stop offset="80%" stopColor={c.color} stopOpacity="0.25" /></radialGradient>)}
          <filter id="ubg"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {CITIES.map((c, i) => {
          const x = 60 + i * 78, rNow = Math.sqrt(c.now / maxProj) * 55, rProj = Math.sqrt(c.proj / maxProj) * 55
          const y = 200, isH = hovered === i
          return <g key={c.name} style={{ cursor: 'pointer' }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            {/* Projected circle */}
            <circle cx={x} cy={y} r={visible ? rProj : 0} fill={`url(#ub${i})`} stroke={c.color} strokeWidth={isH ? 1.5 : 0.5} strokeDasharray={isH ? '0' : '3 2'} opacity={hovered === null ? 0.6 : isH ? 1 : 0.15} filter={isH ? 'url(#ubg)' : undefined} style={{ transition: 'all 0.5s ease' }} />
            {/* Current circle */}
            <circle cx={x} cy={y} r={visible ? rNow : 0} fill={c.color} opacity={hovered === null ? 0.35 : isH ? 0.5 : 0.1} style={{ transition: 'all 0.5s ease' }} />
            {/* Labels */}
            <text x={x} y={y + rProj + 18} textAnchor="middle" fill={isH ? '#0a0a0a' : '#737373'} fontSize="9" fontFamily="monospace" style={{ transition: 'fill 0.2s' }}>{c.name}</text>
            {isH && <>
              <text x={x} y={y - 6} textAnchor="middle" fill="#0a0a0a" fontSize="16" fontFamily="serif" fontStyle="italic">{c.proj}M</text>
              <text x={x} y={y + 10} textAnchor="middle" fill="#525252" fontSize="8" fontFamily="monospace">2100 (now {c.now}M)</text>
            </>}
          </g>
        })}
      </svg>
      {hovered !== null && <div className="mt-2 p-3 bg-[#fafafa] rounded border border-[#e5e5e5]">
        <p className="text-[11px] text-[#525252]"><strong className="text-[#0a0a0a]">{CITIES[hovered].name}, {CITIES[hovered].country}</strong> — {CITIES[hovered].note}</p>
      </div>}
      <div className="flex gap-4 justify-center mt-3">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#991B1B] opacity-0.4" /><span className="text-[9px] text-[#737373]">Current population</span></div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full border border-[#991B1B] border-dashed opacity-0.4" /><span className="text-[9px] text-[#737373]">Projected 2100</span></div>
      </div>
    </div>
  )
}

/* INFRASTRUCTURE DEFICIT CARDS */
const DEFICITS = [
  { label: 'Urban residents by 2050', stat: '+950M', detail: 'Africa will add 950 million urban residents — more than the current populations of Europe and North America combined.', color: '#991B1B' },
  { label: 'Slum dwellers', stat: '256M', detail: 'Over half of SSA urban population lives in informal settlements. 256M people in slums as of 2020.', color: '#7C3AED' },
  { label: 'Housing gap', stat: '56M units', detail: 'Sub-Saharan Africa needs 56 million new housing units. 4.5M units needed annually. Current production: ~500K.', color: '#D97706' },
  { label: 'Cities >5M by 2050', stat: '~50', detail: 'Up from 7 today. Most infrastructure for these cities does not exist yet. Being built in real time.', color: '#047857' },
]

export function InfraDeficit() {
  const { ref, visible } = useInView(0.08)
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {DEFICITS.map((d, i) => (
        <div key={d.label} className="p-4 rounded-lg border bg-white text-center" style={{ borderTopWidth: 3, borderTopColor: d.color, opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.08}s` }}>
          <p className="font-serif text-[26px] font-light leading-none" style={{ color: d.color }}>{d.stat}</p>
          <p className="text-[11px] font-semibold text-[#0a0a0a] mt-2">{d.label}</p>
          <p className="text-[9px] text-[#525252] mt-1 leading-relaxed">{d.detail}</p>
        </div>
      ))}
    </div>
  )
}
