'use client'
import { useEffect, useRef, useState } from 'react'

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
    if (!visible) return; const s = performance.now()
    const t = (n: number) => { const p = Math.min((n - s) / duration, 1); setVal((1 - Math.pow(1 - p, 3)) * target); if (p < 1) requestAnimationFrame(t) }
    requestAnimationFrame(t)
  }, [visible, target, duration])
  return <span ref={ref}>{prefix}{val.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{suffix}</span>
}

/* RADIAL TRADE COMPASS — Where Africa trades */
const PARTNERS = [
  { name: 'EU', share: 29, color: '#0369A1', detail: 'Largest trade partner. $160B+ annually. Colonial trade routes persist.' },
  { name: 'China', share: 21, color: '#991B1B', detail: '$282B (2023). Africa\'s #1 bilateral partner since 2009. Resource extraction → manufacturing shift.' },
  { name: 'Intra-Africa', share: 15, color: '#047857', detail: 'Just 15% — vs 60% in Europe, 50% Asia. AfCFTA target: triple by 2030.' },
  { name: 'India', share: 8, color: '#D97706', detail: '$98B. Pharma, tech, diaspora networks. Growing fast.' },
  { name: 'US', share: 7, color: '#7C3AED', detail: '$65B. AGOA trade preference. Oil, minerals dominant.' },
  { name: 'UAE/Gulf', share: 6, color: '#A16207', detail: 'Port investments, logistics hubs. Dubai as Africa gateway.' },
  { name: 'Other', share: 14, color: '#525252', detail: 'Turkey, Japan, Brazil, Russia. Diversifying but slowly.' },
]

export function TradeCompass() {
  const { ref, visible } = useInView(0.1)
  const [hovered, setHovered] = useState<number | null>(null)
  const cx = 200, cy = 200, R = 165, r = 75
  let a = -Math.PI / 2
  const arcs = PARTNERS.map((d, i) => {
    const sw = (d.share / 100) * Math.PI * 2 - 0.02
    const sa = a + 0.01, ea = sa + sw; a += (d.share / 100) * Math.PI * 2
    const ro = hovered === i ? R + 10 : R
    const p = (rad: number, s: number, e: number, lg: number) => {
      const x1 = cx + Math.cos(s) * rad, y1 = cy + Math.sin(s) * rad, x2 = cx + Math.cos(e) * rad, y2 = cy + Math.sin(e) * rad
      return `${x1},${y1} A${rad},${rad} 0 ${lg} 1 ${x2},${y2}`
    }
    const lg = sw > Math.PI ? 1 : 0
    const path = `M${p(ro, sa, ea, lg)} L${cx + Math.cos(ea) * r},${cy + Math.sin(ea) * r} A${r},${r} 0 ${lg} 0 ${cx + Math.cos(sa) * r},${cy + Math.sin(sa) * r} Z`
    return { ...d, path, i }
  })
  const act = hovered !== null ? PARTNERS[hovered] : null
  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center gap-8">
      <svg viewBox="0 0 400 400" className="w-full max-w-[380px]" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s' }}>
        <defs>
          {PARTNERS.map((d, i) => <radialGradient key={i} id={`tc${i}`} cx="50%" cy="50%" r="50%"><stop offset="30%" stopColor={d.color} stopOpacity="0.12" /><stop offset="100%" stopColor={d.color} stopOpacity="0.5" /></radialGradient>)}
          <filter id="tcg"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {arcs.map(arc => <path key={arc.i} d={arc.path} fill={`url(#tc${arc.i})`} stroke={arc.color} strokeWidth={hovered === arc.i ? 2 : 0.5} opacity={hovered === null ? 0.8 : hovered === arc.i ? 1 : 0.15} filter={hovered === arc.i ? 'url(#tcg)' : undefined} style={{ transition: 'all 0.3s', cursor: 'pointer' }} onMouseEnter={() => setHovered(arc.i)} onMouseLeave={() => setHovered(null)} />)}
        <circle cx={cx} cy={cy} r={r - 5} fill="#0a0a0a" />
        {act ? <>
          <text x={cx} y={cy - 14} textAnchor="middle" fill="white" fontSize="24" fontFamily="serif" fontStyle="italic">{act.share}%</text>
          <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace">{act.name}</text>
          <text x={cx} y={cy + 18} textAnchor="middle" fill="white" fontSize="7" opacity="0.4">of Africa trade</text>
        </> : <>
          <text x={cx} y={cy - 10} textAnchor="middle" fill="white" fontSize="12" fontFamily="serif" fontStyle="italic">$3.4T</text>
          <text x={cx} y={cy + 6} textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" opacity="0.5">AfCFTA MARKET</text>
          <text x={cx} y={cy + 18} textAnchor="middle" fill="white" fontSize="7" opacity="0.3">1.4B people</text>
        </>}
      </svg>
      <div className="flex-1 space-y-1">
        {PARTNERS.map((d, i) => (
          <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer" style={{ background: hovered === i ? d.color + '10' : 'transparent' }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <div className="w-2 h-2 rounded-full" style={{ background: d.color }} /><span className="text-[11px] font-semibold text-[#0a0a0a] w-[72px]">{d.name}</span><span className="text-[11px] font-mono" style={{ color: d.color }}>{d.share}%</span>
            <span className="text-[9px] text-[#a3a3a3] flex-1 hidden md:block">{d.detail.split('.')[0]}</span>
          </div>
        ))}
        <div className="mt-3 p-3 bg-[#ecfdf5] rounded border border-[#a7f3d0]/30">
          <p className="text-[10px] text-[#047857] font-semibold">Intra-African trade: just 15%</p>
          <p className="text-[10px] text-[#525252] mt-1">Europe trades 60% within itself. Asia 50%. Africa 15%. AfCFTA aims to triple this — eliminating tariffs across 54 countries. PAPSS enables local currency settlement.</p>
        </div>
      </div>
    </div>
  )
}

/* BARRIER CARDS */
const BARRIERS = [
  { label: 'Tariff barriers eliminated', stat: '90%', detail: 'AfCFTA aims to remove tariffs on 90% of goods. 97% eventually. Negotiations ongoing.', color: '#047857' },
  { label: 'Customs delays avg', stat: '32 days', detail: 'African border crossings average 32 days vs 7 in OECD. Infrastructure, paperwork, corruption.', color: '#991B1B' },
  { label: 'Transport costs', stat: '2-3×', detail: 'Moving goods within Africa costs 2-3× more than in other developing regions. Roads, rail, ports.', color: '#D97706' },
  { label: 'PAPSS launched', stat: '2022', detail: 'Pan-African Payment & Settlement System. Local currency cross-border settlement. Eliminates dollar dependency.', color: '#0369A1' },
]

export function BarrierCards() {
  const { ref, visible } = useInView(0.08)
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {BARRIERS.map((b, i) => (
        <div key={b.label} className="p-4 rounded-lg border bg-white text-center" style={{ borderTopWidth: 3, borderTopColor: b.color, opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.08}s` }}>
          <p className="font-serif text-[28px] font-light leading-none" style={{ color: b.color }}>{b.stat}</p>
          <p className="text-[11px] font-semibold text-[#0a0a0a] mt-2">{b.label}</p>
          <p className="text-[9px] text-[#525252] mt-1 leading-relaxed">{b.detail}</p>
        </div>
      ))}
    </div>
  )
}
