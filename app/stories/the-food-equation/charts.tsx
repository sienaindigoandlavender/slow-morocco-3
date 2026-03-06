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

/* ═══════════════════════════════════════════
   RADIAL IMPORT WHEEL — SVG donut with glow
   ═══════════════════════════════════════════ */
const IMPORTS = [
  { name: 'Cereals', value: 21.9, pct: 34, color: '#D97706', detail: 'Wheat, rice, barley, flour. Africa has 60% of world\'s uncultivated arable land yet imports $22B in grains.' },
  { name: 'Oils & Fats', value: 8.5, pct: 13, color: '#047857', detail: 'Palm oil, soybean oil. Could grow palm across West/Central Africa at massive scale.' },
  { name: 'Fish', value: 6.2, pct: 10, color: '#0369A1', detail: 'Frozen, canned. 38,000km of coastline, vast freshwater lakes — yet a net fish importer.' },
  { name: 'Sugar', value: 5.1, pct: 8, color: '#7C3AED', detail: 'Raw and refined. Ideal growing conditions across the entire tropical belt.' },
  { name: 'Beverages', value: 3.6, pct: 6, color: '#991B1B', detail: 'Processed drinks. Exports raw cocoa and coffee, imports the finished product back.' },
  { name: 'Dairy', value: 3.4, pct: 5, color: '#A16207', detail: 'Milk powder, cheese. Urban demand growing faster than domestic herds can supply.' },
  { name: 'Fruits & Veg', value: 3.2, pct: 5, color: '#15803d', detail: 'Morocco exports berries to the EU but Africa imports basics from everywhere.' },
  { name: 'Other', value: 12.9, pct: 19, color: '#525252', detail: 'Meat, prepared foods, spices, animal feed. The long tail of dependency.' },
]

export function ImportWheel() {
  const { ref, visible } = useInView(0.1)
  const [hovered, setHovered] = useState<number | null>(null)
  const cx = 200, cy = 200, R = 165, r = 85, gap = 0.025
  let a = -Math.PI / 2
  const arcs = IMPORTS.map((d, i) => {
    const sw = (d.pct / 100) * Math.PI * 2 - gap
    const sa = a + gap / 2, ea = sa + sw; a += (d.pct / 100) * Math.PI * 2
    const ro = hovered === i ? R + 10 : R
    const arc = (rx: number, ry: number, rad: number, s: number, e: number, sweep: number) => {
      const x1 = rx + Math.cos(s) * rad, y1 = ry + Math.sin(s) * rad
      const x2 = rx + Math.cos(e) * rad, y2 = ry + Math.sin(e) * rad
      return { x1, y1, x2, y2, large: sweep > Math.PI ? 1 : 0 }
    }
    const o = arc(cx, cy, ro, sa, ea, sw), inner = arc(cx, cy, r, ea, sa, sw)
    const path = `M${o.x1},${o.y1} A${ro},${ro} 0 ${o.large} 1 ${o.x2},${o.y2} L${inner.x1},${inner.y1} A${r},${r} 0 ${inner.large} 1 ${inner.x2},${inner.y2} Z`
    return { ...d, path, i }
  })
  const act = hovered !== null ? IMPORTS[hovered] : null
  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center gap-8">
      <svg viewBox="0 0 400 400" className="w-full max-w-[380px]" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s' }}>
        <defs>
          {IMPORTS.map((d, i) => <radialGradient key={i} id={`fw${i}`} cx="50%" cy="50%" r="50%"><stop offset="30%" stopColor={d.color} stopOpacity="0.12" /><stop offset="100%" stopColor={d.color} stopOpacity="0.55" /></radialGradient>)}
          <filter id="fglow"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        {arcs.map(arc => (
          <path key={arc.i} d={arc.path} fill={`url(#fw${arc.i})`} stroke={arc.color} strokeWidth={hovered === arc.i ? 2 : 0.5}
            opacity={hovered === null ? 0.85 : hovered === arc.i ? 1 : 0.15}
            filter={hovered === arc.i ? 'url(#fglow)' : undefined}
            style={{ transition: 'all 0.3s ease', cursor: 'pointer' }}
            onMouseEnter={() => setHovered(arc.i)} onMouseLeave={() => setHovered(null)} />
        ))}
        <circle cx={cx} cy={cy} r={r - 6} fill="#0a0a0a" />
        {act ? <>
          <text x={cx} y={cy - 16} textAnchor="middle" fill="white" fontSize="24" fontFamily="serif" fontStyle="italic">${act.value}B</text>
          <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace">{act.name}</text>
          <text x={cx} y={cy + 18} textAnchor="middle" fill="white" fontSize="8" opacity="0.4">{act.pct}% of total</text>
        </> : <>
          <text x={cx} y={cy - 12} textAnchor="middle" fill="white" fontSize="30" fontFamily="serif" fontStyle="italic">$65B</text>
          <text x={cx} y={cy + 8} textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" opacity="0.5">SSA FOOD IMPORTS</text>
          <text x={cx} y={cy + 20} textAnchor="middle" fill="white" fontSize="7" opacity="0.3">2025 · FAO</text>
        </>}
      </svg>
      <div className="flex-1 space-y-1">
        {IMPORTS.map((d, i) => (
          <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer" style={{ background: hovered === i ? d.color + '10' : 'transparent' }}
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <div className="w-2 h-2 rounded-full" style={{ background: d.color }} />
            <span className="text-[11px] font-semibold text-[#0a0a0a] w-[72px]">{d.name}</span>
            <span className="text-[11px] font-mono" style={{ color: d.color }}>${d.value}B</span>
          </div>
        ))}
        <div className="mt-3 p-3 bg-[#fef2f2] rounded border border-[#fecaca]/30">
          <p className="text-[10px] text-[#991B1B] font-semibold">60% of the world&rsquo;s uncultivated arable land. $65B food import bill. Yields at 25% of potential.</p>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   YIELD GAP — Triple-layer flowing bars
   ═══════════════════════════════════════════ */
const YIELDS = [
  { crop: 'Rice', af: 2.2, as: 4.7, na: 8.5, color: '#D97706' },
  { crop: 'Maize', af: 1.8, as: 5.2, na: 10.5, color: '#15803d' },
  { crop: 'Wheat', af: 2.5, as: 3.2, na: 7.8, color: '#A16207' },
  { crop: 'Cassava', af: 8.8, as: 22.4, na: 0, color: '#7C3AED' },
  { crop: 'Sorghum', af: 1.0, as: 1.5, na: 4.3, color: '#991B1B' },
]

export function YieldGap() {
  const { ref, visible } = useInView(0.12)
  const mx = 11
  return (
    <div ref={ref} className="space-y-5">
      {YIELDS.map((y, i) => (
        <div key={y.crop} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.08}s` }}>
          <span className="text-[12px] font-semibold text-[#0a0a0a]">{y.crop}</span>
          <div className="mt-1 space-y-[3px]">
            {[{ v: y.af, c: y.color, o: 1, l: `Africa ${y.af}t/ha` }, { v: y.as, c: '#0369A1', o: 0.3, l: `Asia ${y.as}` }, ...(y.na ? [{ v: y.na, c: '#525252', o: 0.2, l: `N.America ${y.na}` }] : [])].map((b, bi) => (
              <div key={bi} className="flex items-center gap-2">
                <div className="flex-1 h-[8px] bg-[#f5f5f5] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: visible ? `${(b.v / (y.crop === 'Cassava' ? 24 : mx)) * 100}%` : '0%', background: b.c, opacity: b.o, transition: `width 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.1 + bi * 0.1}s` }} />
                </div>
                <span className="text-[8px] font-mono text-[#a3a3a3] w-[80px]">{b.l}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex gap-4 justify-center pt-2">
        {[{ c: '#D97706', l: 'Africa' }, { c: '#0369A1', l: 'Asia' }, { c: '#525252', l: 'N. America' }].map(x => (
          <div key={x.l} className="flex items-center gap-1"><div className="w-2 h-1.5 rounded-full" style={{ background: x.c, opacity: x.l === 'Africa' ? 1 : 0.35 }} /><span className="text-[9px] text-[#737373]">{x.l}</span></div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   TRANSFORMATION MODELS
   ═══════════════════════════════════════════ */
const MODELS = [
  { country: 'Morocco', program: 'Plan Maroc Vert → Génération Green', inv: '$10B+', result: 'Output +40%. Exports $6.5B (berries, tomatoes, citrus). Drip irrigation revolution. Policy-driven success.', color: '#047857', phase: 'Advanced' },
  { country: 'Egypt', program: 'Desert Agriculture Expansion', inv: '$6B', result: '75% wheat self-sufficiency target by 2030. 1.5M feddan reclaimed from desert.', color: '#0369A1', phase: 'Scaling' },
  { country: 'Ethiopia', program: 'Agricultural Transformation Agency', inv: '$5.5B', result: 'Africa\'s top coffee exporter. 1.2M jobs via irrigation. But conflict disrupts progress.', color: '#7C3AED', phase: 'Disrupted' },
  { country: 'Rwanda', program: 'PSTA 5 Strategy', inv: 'National plan', result: '79% self-sufficiency but 56% consumed is imported. Rice factories at 35% capacity.', color: '#D97706', phase: 'Emerging' },
  { country: 'Nigeria', program: 'AFEX + ThriveAgric', inv: 'Market-led', result: 'Fintech meets farming. Commodity exchanges, digital lending. 45% workforce, low productivity.', color: '#991B1B', phase: 'Fragmented' },
  { country: 'Côte d\'Ivoire', program: 'CNRA / FIRCA model', inv: 'Private R&D', result: 'World\'s top cocoa exporter. Industry funds 75% of agricultural research. Self-financing model.', color: '#A16207', phase: 'Model' },
]

export function TransformationCards() {
  const { ref, visible } = useInView(0.08)
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {MODELS.map((m, i) => (
        <div key={m.country} className="relative border rounded-lg p-4 bg-white overflow-hidden" style={{ borderColor: m.color + '25', opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${i * 0.06}s` }}>
          <div className="absolute top-0 right-0 px-2 py-0.5 text-[7px] uppercase tracking-wider font-bold rounded-bl" style={{ background: m.color + '12', color: m.color }}>{m.phase}</div>
          <p className="text-[14px] font-semibold text-[#0a0a0a]">{m.country}</p>
          <p className="text-[9px] text-[#a3a3a3] mb-2">{m.program} · {m.inv}</p>
          <p className="text-[10px] text-[#525252] leading-relaxed">{m.result}</p>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════
   TRILLION TARGET — Radial constellation
   ═══════════════════════════════════════════ */
export function TrillionTarget() {
  const { ref, visible } = useInView(0.1)
  const nodes = [
    { label: 'Current output', val: '$189B', sub: '2025 gross production', a: -30 },
    { label: 'Food imports', val: '$65B', sub: 'SSA. Rising 4%/year.', a: 30 },
    { label: 'Target economy', val: '$1T', sub: 'AfDB by 2030', a: 90 },
    { label: 'Processing share', val: '<1%', sub: 'Of global manufacturing', a: 150 },
    { label: 'Ag workforce', val: '60%', sub: 'But only 20% of GDP', a: 210 },
    { label: 'Investment gap', val: '$77B/yr', sub: 'Needed by 2030', a: 270 },
  ]
  return (
    <div ref={ref} className="w-full max-w-[520px] mx-auto" style={{ aspectRatio: '1' }}>
      <svg viewBox="0 0 520 520" className="w-full">
        <defs><radialGradient id="tg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#047857" stopOpacity="0.06" /><stop offset="100%" stopColor="#047857" stopOpacity="0" /></radialGradient></defs>
        <circle cx="260" cy="260" r="220" fill="url(#tg)" />
        <circle cx="260" cy="260" r="220" fill="none" stroke="#e5e5e5" strokeWidth="0.5" strokeDasharray="3 4" style={{ opacity: visible ? 0.5 : 0, transition: 'opacity 0.8s' }} />
        <circle cx="260" cy="260" r="50" fill="#0a0a0a" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 0.2s' }} />
        <text x="260" y="256" textAnchor="middle" fill="white" fontSize="20" fontFamily="serif" fontStyle="italic" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 0.4s' }}>$1T</text>
        <text x="260" y="272" textAnchor="middle" fill="white" fontSize="7" opacity="0.4" fontFamily="monospace">by 2030</text>
        {nodes.map((n, i) => {
          const rad = (n.a * Math.PI) / 180, x = 260 + Math.cos(rad) * 170, y = 260 + Math.sin(rad) * 170
          return <g key={i} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.4s ease ${0.3 + i * 0.1}s` }}>
            <line x1="260" y1="260" x2={x} y2={y} stroke="#e5e5e5" strokeWidth="0.5" strokeDasharray="2 3" />
            <circle cx={x} cy={y} r="4" fill="#047857" opacity="0.3" /><circle cx={x} cy={y} r="2" fill="#047857" />
            <text x={x} y={y - 14} textAnchor="middle" fill="#0a0a0a" fontSize="15" fontFamily="serif" fontStyle="italic">{n.val}</text>
            <text x={x} y={y + 16} textAnchor="middle" fill="#525252" fontSize="7.5" fontFamily="monospace">{n.label}</text>
            <text x={x} y={y + 27} textAnchor="middle" fill="#a3a3a3" fontSize="6.5">{n.sub}</text>
          </g>
        })}
      </svg>
    </div>
  )
}
