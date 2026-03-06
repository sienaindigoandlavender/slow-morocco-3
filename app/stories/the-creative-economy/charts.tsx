'use client'
import { useEffect, useRef, useState } from 'react'
export function useInView(threshold = 0.25) { const ref = useRef<HTMLDivElement>(null); const [v, setV] = useState(false); useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect() } }, { threshold }); obs.observe(el); return () => obs.disconnect() }, [threshold]); return { ref, visible: v } }
export function AnimCounter({ target, duration = 1800, prefix = '', suffix = '', decimals = 0 }: { target: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }) { const [val, setVal] = useState(0); const { ref, visible } = useInView(0.1); useEffect(() => { if (!visible) return; const s = performance.now(); const t = (n: number) => { const p = Math.min((n - s) / duration, 1); setVal((1 - Math.pow(1 - p, 3)) * target); if (p < 1) requestAnimationFrame(t) }; requestAnimationFrame(t) }, [visible, target, duration]); return <span ref={ref}>{prefix}{val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}</span> }

/* CREATIVE SECTORS — Radial arcs */
const SECTORS = [
  { name: 'Music (Afrobeats)', value: 1.4, color: '#991B1B', detail: 'Fastest-growing genre globally. Burna Boy, Wizkid, Tems. Nigerian music exports. $1.4B market by 2025.', pct: 28 },
  { name: 'Film (Nollywood)', value: 0.66, color: '#7C3AED', detail: '2,500 films/year. 2nd largest by volume (after India). $660M revenue. Netflix, Amazon investing.', pct: 13 },
  { name: 'Fashion', value: 0.6, color: '#D97706', detail: 'Lagos Fashion Week, Thebe Magugu (LVMH Prize), Sindiso Khumalo. African luxury emerging.', pct: 12 },
  { name: 'Visual Art', value: 0.45, color: '#047857', detail: 'El Anatsui, Njideka Akunyili Crosby, 1-54 art fair. Contemporary African art auction records.', pct: 9 },
  { name: 'Gaming', value: 0.35, color: '#0369A1', detail: 'Africa\'s gaming market $1B+ by 2027. Nigeria, South Africa, Kenya lead. Mobile-first.', pct: 7 },
  { name: 'Publishing', value: 0.25, color: '#A16207', detail: 'Chimamanda, Damilare Kuku, Tsitsi Dangarembga. African literature global breakthrough.', pct: 5 },
  { name: 'Other Creative', value: 1.29, color: '#525252', detail: 'Dance, comedy, crafts, design, advertising, architecture. The long tail of cultural production.', pct: 26 },
]

export function CreativeRadial() {
  const { ref, visible } = useInView(0.1)
  const [hovered, setHovered] = useState<number | null>(null)
  const cx = 200, cy = 200, R = 165, r = 80
  let a = -Math.PI / 2
  const arcs = SECTORS.map((d, i) => {
    const sw = (d.pct / 100) * Math.PI * 2 - 0.02
    const sa = a + 0.01, ea = sa + sw; a += (d.pct / 100) * Math.PI * 2
    const ro = hovered === i ? R + 10 : R
    const p = (rad: number, s: number, e: number) => {
      const x1 = cx + Math.cos(s) * rad, y1 = cy + Math.sin(s) * rad, x2 = cx + Math.cos(e) * rad, y2 = cy + Math.sin(e) * rad
      return { x1, y1, x2, y2 }
    }
    const lg = sw > Math.PI ? 1 : 0
    const o = p(ro, sa, ea), inner = p(r, ea, sa)
    const path = `M${o.x1},${o.y1} A${ro},${ro} 0 ${lg} 1 ${o.x2},${o.y2} L${inner.x1},${inner.y1} A${r},${r} 0 ${lg} 0 ${inner.x2},${inner.y2} Z`
    return { ...d, path, i }
  })
  const act = hovered !== null ? SECTORS[hovered] : null
  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center gap-8">
      <svg viewBox="0 0 400 400" className="w-full max-w-[380px]" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s' }}>
        <defs>
          {SECTORS.map((d, i) => <radialGradient key={i} id={`cr${i}`} cx="50%" cy="50%" r="50%"><stop offset="30%" stopColor={d.color} stopOpacity="0.12" /><stop offset="100%" stopColor={d.color} stopOpacity="0.5" /></radialGradient>)}
          <filter id="crg"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {arcs.map(arc => <path key={arc.i} d={arc.path} fill={`url(#cr${arc.i})`} stroke={arc.color} strokeWidth={hovered === arc.i ? 2 : 0.5} opacity={hovered === null ? 0.8 : hovered === arc.i ? 1 : 0.15} filter={hovered === arc.i ? 'url(#crg)' : undefined} style={{ transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={() => setHovered(arc.i)} onMouseLeave={() => setHovered(null)} />)}
        <circle cx={cx} cy={cy} r={r - 5} fill="#0a0a0a" />
        {act ? <>
          <text x={cx} y={cy - 14} textAnchor="middle" fill="white" fontSize="22" fontFamily="serif" fontStyle="italic">${act.value}B</text>
          <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace">{act.name}</text>
          <text x={cx} y={cy + 18} textAnchor="middle" fill="white" fontSize="7" opacity="0.4">{act.pct}% of creative GDP</text>
        </> : <>
          <text x={cx} y={cy - 10} textAnchor="middle" fill="white" fontSize="14" fontFamily="serif" fontStyle="italic">$4.2B+</text>
          <text x={cx} y={cy + 6} textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" opacity="0.5">CREATIVE ECONOMY</text>
          <text x={cx} y={cy + 18} textAnchor="middle" fill="white" fontSize="7" opacity="0.3">& growing fast</text>
        </>}
      </svg>
      <div className="flex-1 space-y-1">
        {SECTORS.map((d, i) => (
          <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer" style={{ background: hovered === i ? d.color + '10' : 'transparent' }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
            <span className="text-[10px] font-semibold text-[#0a0a0a] w-[100px]">{d.name}</span>
            <span className="text-[10px] font-mono" style={{ color: d.color }}>${d.value}B</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* MILESTONES */
const MILESTONES = [
  { year: '2016', event: 'Wizkid features on Drake\'s "One Dance" — Afrobeats breaks into global mainstream', color: '#991B1B' },
  { year: '2020', event: 'Burna Boy wins Grammy for "Twice As Tall". Afrobeats gets institutional recognition', color: '#991B1B' },
  { year: '2020', event: 'Thebe Magugu (South Africa) wins LVMH Prize — first African designer', color: '#D97706' },
  { year: '2021', event: 'El Anatsui retrospective at Haus der Kunst. Contemporary African art museum-tier', color: '#047857' },
  { year: '2022', event: 'Netflix invests $175M in African content. "Blood & Water", "Queen Sono", "Young Famous & African"', color: '#7C3AED' },
  { year: '2023', event: 'Tems wins Grammy for Best Melodic Rap Performance. Rema\'s "Calm Down" 2.4B+ Spotify streams', color: '#991B1B' },
  { year: '2024', event: 'Afrobeats becomes most-streamed non-English genre on Spotify. Cultural export acceleration', color: '#991B1B' },
  { year: '2025', event: 'Africa\'s creative economy estimated $4.2B+. Fashion weeks in Lagos, Dakar, Marrakech, Johannesburg', color: '#D97706' },
]

export function CreativeTimeline() {
  const { ref, visible } = useInView(0.08)
  return (
    <div ref={ref} className="relative pl-6">
      <div className="absolute left-2 top-0 bottom-0 w-[1px] bg-[#e5e5e5]" />
      {MILESTONES.map((m, i) => (
        <div key={i} className="relative mb-4 pl-4" style={{ opacity: visible ? 1 : 0, transition: `opacity 0.3s ease ${i * 0.05}s` }}>
          <div className="absolute left-[-20px] top-1 w-3 h-3 rounded-full border-2 bg-white" style={{ borderColor: m.color }} />
          <p className="text-[10px] font-mono font-bold" style={{ color: m.color }}>{m.year}</p>
          <p className="text-[12px] text-[#262626] leading-relaxed">{m.event}</p>
        </div>
      ))}
    </div>
  )
}
