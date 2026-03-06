'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ═══════════════════════════════════════════════════
// THE WATER EQUATION — Morocco's Water Crisis
// Module 045 · Slow Morocco
// ═══════════════════════════════════════════════════

const C = {
  ink: '#0a0a0a', text: '#262626', muted: '#737373', border: '#e5e5e5',
  water: '#1A5276', waterLight: '#93C5FD', waterDark: '#1E3A5F',
  crisis: '#DC2626', hope: '#059669',
  sand: '#D4A843', aquifer: '#164E63',
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════

// Dam capacity growth 1960–2025
const DAM_CAPACITY: { year: number; capacity: number; dams: number; note?: string }[] = [
  { year: 1960, capacity: 1.2, dams: 13 },
  { year: 1967, capacity: 2.2, dams: 19, note: 'Hassan II\'s dam policy begins' },
  { year: 1970, capacity: 3.5, dams: 24 },
  { year: 1975, capacity: 5.0, dams: 32 },
  { year: 1980, capacity: 7.0, dams: 45, note: 'Green March era infrastructure' },
  { year: 1985, capacity: 9.2, dams: 62 },
  { year: 1990, capacity: 11.5, dams: 82 },
  { year: 1995, capacity: 14.0, dams: 100, note: '100-dam milestone' },
  { year: 2000, capacity: 16.0, dams: 118 },
  { year: 2005, capacity: 17.2, dams: 128 },
  { year: 2010, capacity: 18.0, dams: 135 },
  { year: 2015, capacity: 18.6, dams: 140 },
  { year: 2020, capacity: 19.1, dams: 149 },
  { year: 2025, capacity: 20.0, dams: 153, note: '16 more under construction' },
]

// Fill rate — actual water stored as % of total capacity
const FILL_RATE: { year: number; pct: number }[] = [
  { year: 2010, pct: 72 },
  { year: 2012, pct: 68 },
  { year: 2014, pct: 62 },
  { year: 2016, pct: 55 },
  { year: 2018, pct: 48 },
  { year: 2019, pct: 42 },
  { year: 2020, pct: 38 },
  { year: 2021, pct: 34 },
  { year: 2022, pct: 33 },
  { year: 2023, pct: 29 },
  { year: 2024, pct: 28 },
  { year: 2025, pct: 61 },  // Jan 2026 — winter rains, dramatic recovery
]

// Aquifer depletion — total drop in metres from original level
const AQUIFER_DEPLETION: { name: string; region: string; dropM: number; years: number; ratePerYear: number; note: string }[] = [
  { name: 'Saïss', region: 'Fes-Meknès', dropM: 65, years: 60, ratePerYear: 1.1, note: 'Deepest recorded depletion in Morocco. Karstic limestone aquifer.' },
  { name: 'Souss', region: 'Agadir', dropM: 30, years: 30, ratePerYear: 1.0, note: '90% of water used for agriculture. 20,000+ wells. Seawater intrusion on coast.' },
  { name: 'Haouz', region: 'Marrakech', dropM: 30, years: 60, ratePerYear: 0.9, note: 'Supports Marrakech. 85% of monitoring area shows decline.' },
  { name: 'Tadla', region: 'Beni Mellal', dropM: 20, years: 20, ratePerYear: 1.0, note: 'Sugar beet and olive irrigation. Rapid depletion since 2000.' },
  { name: 'Chtouka', region: 'Souss-Massa', dropM: 25, years: 20, ratePerYear: 1.25, note: 'Tomato export region. Fastest depletion rate in Morocco.' },
]

// Desalination — current and planned
const DESALINATION: { name: string; city: string; capacity: number; status: string; year: number; note: string }[] = [
  { name: 'Agadir', city: 'Agadir', capacity: 275, status: 'Operational', year: 2022, note: 'Expanding to 400K m³/day by end 2026. Largest dual-use plant in world.' },
  { name: 'Laâyoune', city: 'Laâyoune', capacity: 26, status: 'Operational', year: 2019, note: 'Serves southern provinces.' },
  { name: 'Jorf Lasfar', city: 'El Jadida', capacity: 40, status: 'Operational', year: 2023, note: 'OCP Group industrial use + drinking water.' },
  { name: 'Casablanca', city: 'Casablanca', capacity: 548, status: 'Under construction', year: 2026, note: 'Largest in Africa. 7.5M people served. Phase I: 548K m³/day. Full: 822K by 2028.' },
  { name: 'Dakhla', city: 'Dakhla', capacity: 100, status: 'Under construction', year: 2026, note: 'Wind-powered. 78% complete.' },
  { name: 'Nador', city: 'Nador', capacity: 250, status: 'Operational', year: 2025, note: 'Eastern Morocco. Agriculture + urban supply.' },
  { name: 'Safi', city: 'Safi', capacity: 86, status: 'Under construction', year: 2026, note: 'OCP partnership. Industrial + municipal.' },
]

// Key water basins — fill rate as of late 2025
const BASINS: { name: string; fillPct: number; capacityBcm: number; trend: 'up' | 'down' | 'critical' }[] = [
  { name: 'Sebou', fillPct: 81, capacityBcm: 5.6, trend: 'up' },
  { name: 'Bouregreg', fillPct: 64, capacityBcm: 1.1, trend: 'up' },
  { name: 'Loukkos', fillPct: 46, capacityBcm: 1.2, trend: 'up' },
  { name: 'Moulouya', fillPct: 30, capacityBcm: 1.8, trend: 'down' },
  { name: 'Guir-Ziz', fillPct: 55, capacityBcm: 1.0, trend: 'up' },
  { name: 'Tensift', fillPct: 22, capacityBcm: 0.8, trend: 'down' },
  { name: 'Oum Er-Rbia', fillPct: 9, capacityBcm: 4.5, trend: 'critical' },
  { name: 'Souss-Massa', fillPct: 14, capacityBcm: 0.7, trend: 'critical' },
  { name: 'Drâa-Oued Noun', fillPct: 30, capacityBcm: 0.5, trend: 'down' },
]

const KEY_FACTS = [
  { n: '153', l: 'Large dams', unit: '' },
  { n: '20', l: 'Total dam capacity', unit: 'Bn m³' },
  { n: '7', l: 'Consecutive drought years', unit: '2018–2024' },
  { n: '28%', l: 'Dam fill rate', unit: '(2024 low)' },
  { n: '61%', l: 'Dam fill rate', unit: '(Jan 2026)' },
  { n: '2m', l: 'Aquifer drop per year', unit: 'avg' },
  { n: '17', l: 'Desalination plants', unit: 'operational' },
  { n: '1.7', l: 'Desal target by 2030', unit: 'Bn m³/yr' },
  { n: '$45B', l: 'National Water Plan', unit: '2020–2050' },
  { n: '80%', l: 'Water used by agriculture', unit: '' },
]

// ═══════════════════════════════════════════════════
// DRAINING ANIMATION — THE HERO
// ═══════════════════════════════════════════════════

function WaterLevelHero() {
  const ref = useRef<HTMLDivElement>(null)
  const [level, setLevel] = useState(72) // start at 2010 level
  const [yearIdx, setYearIdx] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const animRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.3 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let i = 0
    const step = () => {
      if (i < FILL_RATE.length) {
        setLevel(FILL_RATE[i].pct)
        setYearIdx(i)
        i++
        animRef.current = setTimeout(step, i === FILL_RATE.length - 1 ? 1200 : 600)
      }
    }
    animRef.current = setTimeout(step, 800)
    return () => { if (animRef.current) clearTimeout(animRef.current) }
  }, [isVisible])

  const fillColor = level < 30 ? C.crisis : level < 50 ? C.sand : C.water

  return (
    <div ref={ref} className="relative w-full max-w-[480px] mx-auto md:mx-0">
      {/* Dam wall outline */}
      <svg viewBox="0 0 400 320" className="w-full">
        {/* Dam shape — trapezoidal reservoir */}
        <defs>
          <clipPath id="reservoir">
            <path d="M 40 20 L 360 20 L 340 300 L 60 300 Z" />
          </clipPath>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={fillColor} stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Reservoir outline */}
        <path d="M 40 20 L 360 20 L 340 300 L 60 300 Z" fill="none" stroke={C.ink} strokeWidth="2" />

        {/* Water fill — animates */}
        <g clipPath="url(#reservoir)">
          <rect
            x="0" y={300 - (280 * level / 100)} width="400"
            height={280 * level / 100}
            fill="url(#waterGrad)"
            className="transition-all duration-[1200ms] ease-in-out"
          />
          {/* Wave effect */}
          <path
            d={`M 0 ${300 - (280 * level / 100)} Q 100 ${300 - (280 * level / 100) - 4} 200 ${300 - (280 * level / 100)} T 400 ${300 - (280 * level / 100)}`}
            fill={fillColor}
            opacity="0.3"
            className="transition-all duration-[1200ms] ease-in-out"
          />
        </g>

        {/* Measurement lines */}
        {[100, 75, 50, 25].map(pct => {
          const y = 300 - (280 * pct / 100)
          return (
            <g key={pct}>
              <line x1="42" y1={y} x2="60" y2={y} stroke={C.muted} strokeWidth="0.5" />
              <text x="36" y={y + 3} textAnchor="end" fill={C.muted} fontSize="9" fontFamily="monospace">{pct}%</text>
            </g>
          )
        })}

        {/* Level readout */}
        <text x="200" y="160" textAnchor="middle" fill={level < 50 ? C.ink : '#fff'} fontSize="48" fontFamily="serif" fontWeight="400"
          className="transition-all duration-[1200ms]">
          {level}%
        </text>
        <text x="200" y="182" textAnchor="middle" fill={level < 50 ? C.muted : 'rgba(255,255,255,0.7)'} fontSize="11" fontFamily="monospace"
          className="transition-all duration-[1200ms]">
          {FILL_RATE[yearIdx]?.year || 2010}
        </text>
      </svg>

      {/* Timeline bar below */}
      <div className="flex justify-between mt-2 px-2">
        {FILL_RATE.map((d, i) => (
          <div key={d.year} className="flex flex-col items-center">
            <div className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ background: i <= yearIdx ? fillColor : C.border }} />
            {(i === 0 || i === FILL_RATE.length - 1 || d.year % 5 === 0) && (
              <span className="text-[8px] mt-1 font-mono" style={{ color: C.muted }}>{d.year}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// DAM CAPACITY CHART — bars growing right
// ═══════════════════════════════════════════════════

function DamCapacityChart() {
  const r = useReveal()
  const maxCap = 22
  return (
    <div ref={r.ref}>
      <p className="micro-label mb-4" style={{ color: C.muted }}>Dam Storage Capacity · 1960–2025 (Billion m³)</p>
      <div className="space-y-1.5">
        {DAM_CAPACITY.map((d, i) => {
          const w = (d.capacity / maxCap) * 100
          return (
            <div key={d.year} className="flex items-center gap-2 group">
              <span className="text-[11px] font-mono w-10 text-right shrink-0" style={{ color: C.muted }}>{d.year}</span>
              <div className="flex-1 h-5 relative">
                <div className="h-full transition-all duration-700 ease-out flex items-center"
                  style={{
                    width: r.vis ? `${w}%` : '0%',
                    background: C.water,
                    transitionDelay: `${i * 60}ms`,
                    opacity: 0.7 + (i / DAM_CAPACITY.length) * 0.3,
                  }}>
                  <span className="text-[9px] font-mono text-white ml-2 whitespace-nowrap">
                    {d.capacity}B · {d.dams} dams
                  </span>
                </div>
              </div>
              {d.note && (
                <span className="text-[9px] font-mono hidden md:inline shrink-0 max-w-[180px]" style={{ color: C.muted }}>
                  {d.note}
                </span>
              )}
            </div>
          )
        })}
      </div>
      <p className="text-[11px] mt-3 italic" style={{ color: C.muted }}>
        Morocco built more dams than any other African country. The paradox: capacity grew 17× while the water inside shrank.
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// AQUIFER DEPLETION — dropping bars
// ═══════════════════════════════════════════════════

function AquiferDepletion() {
  const r = useReveal()
  const maxDrop = 70
  return (
    <div ref={r.ref}>
      <p className="micro-label mb-4" style={{ color: C.muted }}>Aquifer Depletion · Water table drop (metres)</p>
      <div className="space-y-4">
        {AQUIFER_DEPLETION.map((a, i) => {
          const h = (a.dropM / maxDrop) * 100
          return (
            <div key={a.name}>
              <div className="flex justify-between mb-1">
                <div>
                  <span className="text-[14px] font-serif">{a.name}</span>
                  <span className="text-[11px] font-mono ml-2" style={{ color: C.muted }}>{a.region}</span>
                </div>
                <span className="text-[14px] font-mono font-medium" style={{ color: C.crisis }}>
                  −{a.dropM}m
                </span>
              </div>
              {/* Bar drops DOWN like water table falling */}
              <div className="w-full h-6 relative" style={{ background: '#f0f0f0' }}>
                <div className="h-full transition-all duration-1000 ease-out"
                  style={{
                    width: r.vis ? `${h}%` : '0%',
                    background: `linear-gradient(90deg, ${C.aquifer}, ${C.crisis})`,
                    transitionDelay: `${i * 120}ms`,
                  }} />
              </div>
              <div className="flex justify-between mt-0.5">
                <span className="text-[9px] font-mono" style={{ color: C.muted }}>
                  −{a.ratePerYear} m/year × {a.years} years
                </span>
                <span className="text-[9px] font-mono" style={{ color: C.muted }}>
                  {a.note.split('.')[0]}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// BASIN MAP — fill rates as bar chart
// ═══════════════════════════════════════════════════

function BasinFillRates() {
  const r = useReveal()
  return (
    <div ref={r.ref}>
      <p className="micro-label mb-4" style={{ color: C.muted }}>River Basin Fill Rates · Late 2025</p>
      <div className="space-y-2">
        {BASINS.sort((a, b) => b.fillPct - a.fillPct).map((b, i) => {
          const color = b.trend === 'critical' ? C.crisis : b.trend === 'down' ? C.sand : C.hope
          return (
            <div key={b.name} className="flex items-center gap-2">
              <span className="text-[12px] w-[110px] shrink-0 text-right" style={{ color: C.text }}>{b.name}</span>
              <div className="flex-1 h-5 relative" style={{ background: '#f5f5f5' }}>
                <div className="h-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
                  style={{
                    width: r.vis ? `${b.fillPct}%` : '0%',
                    background: color,
                    transitionDelay: `${i * 80}ms`,
                    opacity: 0.85,
                  }}>
                  {b.fillPct > 20 && (
                    <span className="text-[9px] font-mono text-white">{b.fillPct}%</span>
                  )}
                </div>
                {b.fillPct <= 20 && (
                  <span className="absolute left-[22%] top-1/2 -translate-y-1/2 text-[9px] font-mono" style={{ color: C.crisis }}>{b.fillPct}%</span>
                )}
              </div>
              <span className="text-[9px] font-mono w-12 shrink-0" style={{ color: C.muted }}>
                {b.capacityBcm}B m³
              </span>
            </div>
          )
        })}
      </div>
      <div className="flex gap-6 mt-3">
        {[
          { color: C.hope, label: 'Recovering' },
          { color: C.sand, label: 'Declining' },
          { color: C.crisis, label: 'Critical' },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-3 h-3" style={{ background: l.color, opacity: 0.85 }} />
            <span className="text-[10px] font-mono" style={{ color: C.muted }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// DESALINATION — the response
// ═══════════════════════════════════════════════════

function DesalinationTimeline() {
  const r = useReveal()
  const maxCap = 600
  return (
    <div ref={r.ref}>
      <p className="micro-label mb-4" style={{ color: C.muted }}>Desalination Plants · Capacity in 1000s m³/day</p>
      <div className="space-y-2.5">
        {DESALINATION.sort((a, b) => b.capacity - a.capacity).map((d, i) => {
          const w = (d.capacity / maxCap) * 100
          const isOperational = d.status === 'Operational'
          return (
            <div key={d.name}>
              <div className="flex items-center gap-2">
                <span className="text-[12px] w-[90px] shrink-0 text-right" style={{ color: C.text }}>{d.name}</span>
                <div className="flex-1 h-7 relative" style={{ background: '#f5f5f5' }}>
                  <div className="h-full transition-all duration-700 flex items-center pl-2"
                    style={{
                      width: r.vis ? `${Math.max(w, 8)}%` : '0%',
                      background: isOperational ? C.hope : C.water,
                      opacity: isOperational ? 0.85 : 0.5,
                      transitionDelay: `${i * 80}ms`,
                      backgroundImage: isOperational ? 'none' : 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.15) 4px, rgba(255,255,255,0.15) 8px)',
                    }}>
                    <span className="text-[9px] font-mono text-white whitespace-nowrap">
                      {d.capacity.toLocaleString()}K m³/day
                    </span>
                  </div>
                </div>
                <span className="text-[9px] font-mono shrink-0 w-16 text-right" style={{ color: isOperational ? C.hope : C.muted }}>
                  {d.status === 'Operational' ? `● ${d.year}` : `○ ${d.year}`}
                </span>
              </div>
              <p className="text-[9px] font-mono ml-[98px] mt-0.5" style={{ color: C.muted }}>{d.note}</p>
            </div>
          )
        })}
      </div>
      <div className="flex gap-6 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3" style={{ background: C.hope, opacity: 0.85 }} />
          <span className="text-[10px] font-mono" style={{ color: C.muted }}>Operational</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3" style={{ background: C.water, opacity: 0.5, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)' }} />
          <span className="text-[10px] font-mono" style={{ color: C.muted }}>Under construction</span>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// BIG EQUATION
// ═══════════════════════════════════════════════════

function TheEquation() {
  const r = useReveal()
  return (
    <div ref={r.ref} className="py-16 text-center transition-all duration-1000"
      style={{ opacity: r.vis ? 1 : 0, transform: r.vis ? 'translateY(0)' : 'translateY(30px)' }}>
      <div className="font-serif text-[clamp(1.2rem,3vw,2rem)] leading-relaxed" style={{ color: C.ink }}>
        <span className="inline-block px-3 py-1 mx-1" style={{ background: C.water, color: '#fff' }}>22 Bn m³</span>
        <span className="mx-2">renewable</span>
        <span className="mx-2">−</span>
        <span className="inline-block px-3 py-1 mx-1" style={{ background: C.crisis, color: '#fff' }}>14.3 Bn m³</span>
        <span className="mx-2">demand</span>
        <span className="mx-2">=</span>
      </div>
      <div className="font-serif text-[clamp(2rem,5vw,3.5rem)] mt-4" style={{ color: C.crisis }}>
        A deficit that only grows
      </div>
      <p className="text-[13px] mt-4 max-w-[500px] mx-auto" style={{ color: C.muted }}>
        Demand projected to reach 23.6 Bn m³ by 2030. Renewable supply falling with climate change.
        Desalination is the bridge — but it arrives in pieces.
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

export function WaterEquationContent() {
  const heroR = useReveal()
  const numsR = useReveal()

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-10">
        <p className="micro-label mb-3" style={{ color: C.muted }}>Module 045 · Water Intelligence</p>
        <div ref={heroR.ref} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
              style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
              <em>The Water<br />Equation</em>
            </h1>
            <p className="font-serif italic text-[clamp(1rem,2.5vw,1.4rem)] mb-4" style={{ color: C.muted }}>
              Morocco&apos;s crisis in one page
            </p>
            <p className="text-[15px] leading-[1.8] max-w-[480px]" style={{ color: C.text }}>
              Morocco built 153 large dams in 65 years — more than any country in Africa.
              The storage capacity grew from 1.2 billion m³ to 20 billion m³. Then the rain stopped.
              Seven consecutive drought years (2018–2024) drained the reservoirs to 28% capacity.
              The aquifers dropped 2 metres a year. The equation broke.
            </p>
            <p className="text-[15px] leading-[1.8] mt-4 max-w-[480px]" style={{ color: C.text }}>
              Now: 17 desalination plants operational, 4 under construction, 11 more planned.
              A $45 billion National Water Plan. The race between depletion and infrastructure.
            </p>
          </div>
          <WaterLevelHero />
        </div>
      </section>

      {/* ═══ KEY FACTS ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <div ref={numsR.ref} className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {KEY_FACTS.map((k, i) => (
            <div key={k.l + k.n} className="border-t pt-3 transition-all duration-700"
              style={{ borderColor: C.border, opacity: numsR.vis ? 1 : 0, transitionDelay: `${i * 50}ms` }}>
              <p className="font-serif text-[clamp(1.4rem,3vw,2rem)] leading-none">
                {k.n}
              </p>
              <p className="text-[10px] mt-1 font-mono" style={{ color: C.muted }}>{k.l}</p>
              {k.unit && <p className="text-[9px] font-mono" style={{ color: C.muted }}>{k.unit}</p>}
            </div>
          ))}
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ THE EQUATION ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%]">
        <TheEquation />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ DAM CAPACITY ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section I</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-8">The Dam Builders</h2>
        <DamCapacityChart />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ BASIN FILL RATES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section II</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-4">Where the Water Is</h2>
        <p className="text-[14px] leading-relaxed mb-8 max-w-[600px]" style={{ color: C.text }}>
          Morocco&apos;s nine river basins tell vastly different stories. The north recovered dramatically after
          winter 2025–26 rains. The south remains in crisis. Oum Er-Rbia — which feeds Casablanca, Marrakech,
          and El Jadida — holds just 9% of capacity. Al Massira dam: 3.4% full.
        </p>
        <BasinFillRates />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ AQUIFER DEPLETION ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section III</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-4">The Invisible Crisis</h2>
        <p className="text-[14px] leading-relaxed mb-8 max-w-[600px]" style={{ color: C.text }}>
          Dams are visible. Aquifers are not. Underground, Morocco&apos;s water table has dropped 20 to 65 metres
          in the last 30–60 years. Groundwater extraction exceeds recharge by an estimated 1–3 billion m³
          per year. Over 20,000 wells pump the Souss alone. By 2040, 20 reservoirs will be completely silted.
        </p>
        <AquiferDepletion />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ DESALINATION ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section IV</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-4">The Response</h2>
        <p className="text-[14px] leading-relaxed mb-8 max-w-[600px]" style={{ color: C.text }}>
          Morocco is building the largest desalination network in Africa. The Casablanca plant alone will serve
          7.5 million people. Target: 1.7 billion m³ of desalinated water per year by 2030 — enough to
          replace the entire current groundwater extraction deficit. Powered increasingly by wind and solar.
        </p>
        <DesalinationTimeline />
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ THE SILT PROBLEM ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Section V</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] mb-6">The Numbers Nobody Mentions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-t pt-4" style={{ borderColor: C.crisis }}>
            <p className="font-serif text-[24px] mb-2" style={{ color: C.crisis }}>100M tonnes/year</p>
            <p className="text-[14px] leading-relaxed" style={{ color: C.text }}>
              Sediment deposited in Morocco&apos;s dam reservoirs annually. 60% of upstream erosion ends up behind dam walls.
              The dams are silting themselves to death.
            </p>
          </div>
          <div className="border-t pt-4" style={{ borderColor: C.crisis }}>
            <p className="font-serif text-[24px] mb-2" style={{ color: C.crisis }}>20 dams by 2040</p>
            <p className="text-[14px] leading-relaxed" style={{ color: C.text }}>
              Number of large dams projected to be completely silted. By 2050, half of all dam reservoirs
              will have lost 50% of their capacity to sediment.
            </p>
          </div>
          <div className="border-t pt-4" style={{ borderColor: C.crisis }}>
            <p className="font-serif text-[24px] mb-2" style={{ color: C.crisis }}>500 m³/person/year</p>
            <p className="text-[14px] leading-relaxed" style={{ color: C.text }}>
              Projected per-capita water availability by 2030. The international threshold for &ldquo;absolute
              water scarcity&rdquo; is 500 m³. Morocco is approaching the line.
            </p>
          </div>
        </div>
      </section>

      <div className="px-8 md:px-[8%] lg:px-[12%]"><div className="border-t" style={{ borderColor: C.border }} /></div>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-24 md:py-40">
        <p className="micro-label mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
        <div className="text-[12px] leading-relaxed space-y-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
          <p>Dam capacity and fill rates: Morocco Ministry of Equipment and Water daily reports (2024–2026); World Bank Morocco CCDR Background Note: Water Scarcity and Droughts (2023). Aquifer depletion: Hssaisoune et al. (2020), &ldquo;Moroccan Groundwater Resources and Evolution with Global Climate Changes,&rdquo; Geosciences 10(2):81; Fanack Water country profile. Desalination: Morocco World News; Aquatech Trade; IDA Water. Basin data: Hespress, North Africa Post, Morocco World News (Dec 2025 – Feb 2026). National Water Plan: U.S. Commercial Service Morocco Water report; Frontiers in Sustainable Food Systems (2025). Siltation projections: World Bank Morocco CCDR (2023).</p>
          <p>Fill rate data for 2010–2024 are annual averages from Ministry of Equipment and Water. January 2026 figure (61.3%) is a point-in-time measurement reflecting exceptional winter rainfall.</p>
        </div>
        <p className="text-[11px] mt-6 pt-4 border-t" style={{ borderColor: C.border, color: 'rgba(255,255,255,0.7)' }}>
          © Slow Morocco · slowmorocco.com · All data from published sources as cited. This visualization may not be reproduced without visible attribution.
        </p>
      </section>
    </div>
  )
}
