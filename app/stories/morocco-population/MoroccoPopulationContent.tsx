'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Morocco 2024 Census ───
interface Region {
  id: string
  name: string
  capital: string
  population: number // thousands
  area: number       // km²
  density: number    // per km²
  growth: number     // annual %
}

const R: Region[] = [
  { id: 'casa', name: 'Casablanca-Settat', capital: 'Casablanca', population: 7689, area: 20111, density: 382.3, growth: 1.08 },
  { id: 'rabat', name: 'Rabat-Salé-Kénitra', capital: 'Rabat', population: 5133, area: 17831, density: 287.8, growth: 1.14 },
  { id: 'marrakech', name: 'Marrakech-Safi', capital: 'Marrakech', population: 4893, area: 39058, density: 125.3, growth: 0.79 },
  { id: 'fes', name: 'Fès-Meknès', capital: 'Fès', population: 4468, area: 38744, density: 115.3, growth: 0.54 },
  { id: 'tanger', name: 'Tanger-Tétouan-Al Hoceima', capital: 'Tanger', population: 4030, area: 17262, density: 233.5, growth: 1.25 },
  { id: 'souss', name: 'Souss-Massa', capital: 'Agadir', population: 3020, area: 53444, density: 56.5, growth: 1.21 },
  { id: 'beni', name: 'Béni Mellal-Khénifra', capital: 'Béni Mellal', population: 2526, area: 26984, density: 93.6, growth: 0.34 },
  { id: 'oriental', name: 'Oriental', capital: 'Oujda', population: 2295, area: 66608, density: 34.5, growth: 0.42 },
  { id: 'draa', name: 'Drâa-Tafilalet', capital: 'Errachidia', population: 1656, area: 87703, density: 18.9, growth: 0.48 },
  { id: 'guelmim', name: 'Guelmim-Oued Noun', capital: 'Guelmim', population: 449, area: 50245, density: 8.9, growth: 0.95 },
  { id: 'laayoune', name: 'Laâyoune-Sakia El Hamra', capital: 'Laâyoune', population: 442, area: 140018, density: 3.2, growth: 2.54 },
  { id: 'dakhla', name: 'Dakhla-Oued Ed-Dahab', capital: 'Dakhla', population: 220, area: 142865, density: 1.5, growth: 4.13 },
]

const TOTAL_POP = R.reduce((s, r) => s + r.population, 0)

// ─── Color Palette — bold, saturated, IIB-inspired ───
const PALETTE = [
  '#E63946', // Casablanca — hot red (most dense)
  '#F77F00', // Rabat — deep orange
  '#FCBF49', // Marrakech — amber gold
  '#EAE2B7', // Fes — warm sand
  '#F4845F', // Tanger — coral
  '#48BFE3', // Souss — ocean blue
  '#72EFDD', // Beni Mellal — aqua mint
  '#64DFDF', // Oriental — teal
  '#5E60CE', // Draa — indigo
  '#7B2D8E', // Guelmim — violet
  '#3A0CA3', // Laayoune — deep purple
  '#1B1B3A', // Dakhla — midnight
]

function getColor(idx: number): string {
  return PALETTE[idx] || '#ccc'
}

// Density → color (continuous)
function densityToColor(d: number): string {
  const t = Math.min(1, Math.log(d + 1) / Math.log(400))
  // Teal to orange to crimson
  if (t < 0.33) {
    const s = t / 0.33
    const r = Math.round(30 + s * 18)
    const g = Math.round(191 - s * 40)
    const b = Math.round(227 - s * 90)
    return `rgb(${r},${g},${b})`
  } else if (t < 0.66) {
    const s = (t - 0.33) / 0.33
    const r = Math.round(48 + s * 199)
    const g = Math.round(151 - s * 24)
    const b = Math.round(137 - s * 64)
    return `rgb(${r},${g},${b})`
  } else {
    const s = (t - 0.66) / 0.34
    const r = Math.round(247 - s * 17)
    const g = Math.round(127 - s * 70)
    const b = Math.round(73 - s * 4)
    return `rgb(${r},${g},${b})`
  }
}

// ─── Scroll observer hook ───
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ═══════════════════════════════════════════
// SECTION 1: Hero — Giant number on dark bg
// ═══════════════════════════════════════════
function Hero() {
  const { ref, visible } = useInView(0.1)
  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1B1B3A 50%, #3A0CA3 100%)' }}
    >
      {/* Floating dots representing population */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + Math.random() * 6}px`,
              height: `${3 + Math.random() * 6}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: PALETTE[Math.floor(Math.random() * PALETTE.length)],
              opacity: visible ? 0.3 + Math.random() * 0.4 : 0,
              transition: `opacity 1.5s ease ${i * 30}ms`,
            }}
          />
        ))}
      </div>

      <div className="px-8 md:px-[8%] lg:px-[12%] relative z-10">
        <p
          className="text-[11px] uppercase tracking-[0.2em] mb-8"
          style={{
            color: '#48BFE3',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.2s',
          }}
        >
          Data Module 002
        </p>

        <h1
          className="font-serif leading-none"
          style={{
            fontSize: 'clamp(4rem, 15vw, 12rem)',
            color: '#ffffff',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s ease 0.4s',
          }}
        >
          36.8<span className="text-[0.3em] ml-2" style={{ color: '#48BFE3' }}>million</span>
        </h1>

        <p
          className="text-[18px] md:text-[22px] max-w-[500px] mt-8 leading-relaxed"
          style={{
            color: 'rgba(0,0,0,0.6)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease 0.8s',
          }}
        >
          Where Morocco&apos;s people actually live. Census 2024.
          Hover, click, explore.
        </p>

        <div
          className="mt-12"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease 1.2s',
          }}
        >
          <p className="text-[11px] uppercase tracking-[0.15em]" style={{ color: 'rgba(0,0,0,0.3)' }}>
            Scroll to explore ↓
          </p>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════
// SECTION 2: Treemap — proportional rectangles
// ═══════════════════════════════════════════
function Treemap() {
  const { ref, visible } = useInView(0.15)
  const [hovered, setHovered] = useState<string | null>(null)

  // Simple treemap layout: single row, proportional widths
  // Then we'll do a more interesting 2D layout
  const sorted = [...R].sort((a, b) => b.population - a.population)

  // Build a simple squarified-ish layout
  interface TreeRect {
    region: Region
    x: number; y: number; w: number; h: number
    colorIdx: number
  }

  const rects: TreeRect[] = []
  const totalArea = 1000 * 600 // viewbox
  let currentX = 0
  let currentY = 0
  let rowHeight = 600
  let rowWidth = 1000
  let remaining = [...sorted]
  let colorIdx = 0

  // First row: top 3 (they're big)
  const row1 = remaining.splice(0, 3)
  const row1Total = row1.reduce((s, r) => s + r.population, 0)
  let rx = 0
  row1.forEach((r) => {
    const w = (r.population / row1Total) * 1000
    rects.push({ region: r, x: rx, y: 0, w, h: 340, colorIdx })
    rx += w
    colorIdx++
  })

  // Second row: next 4
  const row2 = remaining.splice(0, 4)
  const row2Total = row2.reduce((s, r) => s + r.population, 0)
  rx = 0
  row2.forEach((r) => {
    const w = (r.population / row2Total) * 1000
    rects.push({ region: r, x: rx, y: 340, w, h: 160, colorIdx })
    rx += w
    colorIdx++
  })

  // Third row: remaining 5
  const row3Total = remaining.reduce((s, r) => s + r.population, 0)
  rx = 0
  remaining.forEach((r) => {
    const w = (r.population / row3Total) * 1000
    rects.push({ region: r, x: rx, y: 500, w, h: 100, colorIdx })
    rx += w
    colorIdx++
  })

  const hoveredData = hovered ? R.find(r => r.id === hovered) : null

  return (
    <section ref={ref} className="py-24 md:py-40 bg-white">
      <div className="px-8 md:px-[8%] lg:px-[12%]">
        <p className="micro-label mb-2">Population by Region</p>
        <p className="font-serif text-[32px] md:text-[42px] text-dwl-black italic leading-[1.1] mb-8">
          Where the weight falls
        </p>

        <div className="relative">
          <svg viewBox="0 0 1000 600" className="w-full h-auto">
            {rects.map((rect, i) => {
              const isHovered = hovered === rect.region.id
              const pct = ((rect.region.population / TOTAL_POP) * 100).toFixed(1)
              return (
                <g key={rect.region.id}>
                  <rect
                    x={rect.x + 1}
                    y={rect.y + 1}
                    width={Math.max(rect.w - 2, 0)}
                    height={Math.max(rect.h - 2, 0)}
                    fill={getColor(rect.colorIdx)}
                    className="cursor-pointer transition-all duration-300"
                    style={{
                      opacity: visible ? (isHovered ? 1 : hovered ? 0.5 : 0.9) : 0,
                      transitionDelay: visible ? `${i * 60}ms` : '0ms',
                    }}
                    rx={3}
                    onMouseEnter={() => setHovered(rect.region.id)}
                    onMouseLeave={() => setHovered(null)}
                  />
                  {/* Label inside rectangle if big enough */}
                  {rect.w > 80 && rect.h > 40 && (
                    <text
                      x={rect.x + rect.w / 2}
                      y={rect.y + rect.h / 2 - (rect.h > 80 ? 8 : 0)}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="pointer-events-none select-none"
                      style={{
                        fontFamily: 'Instrument Serif, Georgia, serif',
                        fontSize: rect.h > 200 ? '28px' : rect.h > 100 ? '18px' : '13px',
                        fontStyle: 'italic',
                        fill: '#ffffff',
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.5s ease ${i * 60 + 300}ms`,
                      }}
                    >
                      {rect.region.capital}
                    </text>
                  )}
                  {rect.w > 100 && rect.h > 80 && (
                    <text
                      x={rect.x + rect.w / 2}
                      y={rect.y + rect.h / 2 + (rect.h > 200 ? 24 : 16)}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="pointer-events-none select-none"
                      style={{
                        fontFamily: 'IBM Plex Mono, monospace',
                        fontSize: '11px',
                        fill: 'rgba(255,255,255,0.7)',
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.5s ease ${i * 60 + 400}ms`,
                      }}
                    >
                      {pct}%
                    </text>
                  )}
                </g>
              )
            })}
          </svg>

          {/* Hover card */}
          {hoveredData && (
            <div className="absolute top-4 right-4 bg-white border border-dwl-border p-5 shadow-lg max-w-[240px] z-10">
              <p className="text-[11px] uppercase tracking-[0.12em] text-dwl-gray font-medium">
                {hoveredData.name}
              </p>
              <p className="font-serif text-[40px] text-dwl-black italic leading-none mt-1">
                {(hoveredData.population / 1000).toFixed(1)}M
              </p>
              <div className="mt-4 space-y-2 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-dwl-gray">Density</span>
                  <span className="text-dwl-black font-medium">{hoveredData.density}/km²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dwl-gray">Growth</span>
                  <span className="text-dwl-black font-medium">{hoveredData.growth}%/yr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dwl-gray">Share</span>
                  <span className="text-dwl-black font-medium">
                    {((hoveredData.population / TOTAL_POP) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════
// SECTION 3: Bubble chart — population vs density
// ═══════════════════════════════════════════
function BubbleChart() {
  const { ref, visible } = useInView(0.15)
  const [hovered, setHovered] = useState<string | null>(null)

  const maxPop = 7689
  const maxDensity = 382.3
  const padding = 60

  return (
    <section ref={ref} style={{ background: '#0a0a0a' }} className="py-24 md:py-40">
      <div className="px-8 md:px-[8%] lg:px-[12%]">
        <p className="text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: '#48BFE3' }}>
          Population vs Density
        </p>
        <p className="font-serif text-[32px] md:text-[42px] italic leading-[1.1] mb-8" style={{ color: '#ffffff' }}>
          The concentration
        </p>

        <svg viewBox="0 0 900 500" className="w-full h-auto">
          {/* Axes */}
          <line x1={padding} y1={440} x2={860} y2={440} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
          <line x1={padding} y1={40} x2={padding} y2={440} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />

          {/* Axis labels */}
          <text x={460} y={485} textAnchor="middle" style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono', fill: 'rgba(255,255,255,0.7)' }}>
            DENSITY (people/km²) →
          </text>
          <text x={15} y={240} textAnchor="middle" transform="rotate(-90, 15, 240)" style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono', fill: 'rgba(255,255,255,0.7)' }}>
            POPULATION (millions) →
          </text>

          {/* Grid lines */}
          {[100, 200, 300].map(d => {
            const x = padding + (d / maxDensity) * (800 - padding)
            return (
              <g key={d}>
                <line x1={x} y1={40} x2={x} y2={440} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
                <text x={x} y={455} textAnchor="middle" style={{ fontSize: '9px', fontFamily: 'IBM Plex Mono', fill: 'rgba(255,255,255,0.25)' }}>
                  {d}
                </text>
              </g>
            )
          })}
          {[2, 4, 6].map(p => {
            const y = 440 - ((p * 1000) / maxPop) * 400
            return (
              <g key={p}>
                <line x1={padding} y1={y} x2={860} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
                <text x={padding - 8} y={y + 3} textAnchor="end" style={{ fontSize: '9px', fontFamily: 'IBM Plex Mono', fill: 'rgba(255,255,255,0.25)' }}>
                  {p}M
                </text>
              </g>
            )
          })}

          {/* Bubbles */}
          {R.map((r, i) => {
            const cx = padding + (r.density / maxDensity) * (800 - padding)
            const cy = 440 - (r.population / maxPop) * 400
            const radius = 8 + (r.population / maxPop) * 35
            const isHovered = hovered === r.id
            return (
              <g key={r.id}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={visible ? radius : 0}
                  fill={getColor(i)}
                  fillOpacity={isHovered ? 0.95 : hovered ? 0.3 : 0.75}
                  stroke={isHovered ? '#ffffff' : 'none'}
                  strokeWidth={2}
                  className="cursor-pointer"
                  style={{
                    transition: `r 0.8s ease ${i * 80}ms, fill-opacity 0.3s ease, stroke 0.2s ease`,
                  }}
                  onMouseEnter={() => setHovered(r.id)}
                  onMouseLeave={() => setHovered(null)}
                />
                {/* Label for bigger bubbles */}
                {(radius > 18 || isHovered) && visible && (
                  <text
                    x={cx}
                    y={cy + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="pointer-events-none"
                    style={{
                      fontSize: isHovered ? '12px' : '10px',
                      fontFamily: 'IBM Plex Mono, monospace',
                      fill: '#ffffff',
                      fontWeight: isHovered ? 600 : 400,
                      opacity: visible ? 1 : 0,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {r.capital}
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* Hovered detail */}
        {hovered && (() => {
          const h = R.find(r => r.id === hovered)!
          return (
            <div className="mt-6 flex items-baseline gap-6 flex-wrap" style={{ color: '#ffffff' }}>
              <span className="font-serif text-[28px] italic">{h.capital}</span>
              <span className="text-[13px]" style={{ color: 'rgba(0,0,0,0.5)' }}>
                {(h.population / 1000).toFixed(1)}M people · {h.density}/km² · {h.growth}% growth/yr
              </span>
            </div>
          )
        })()}
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════
// SECTION 4: Growth race — horizontal animated bars
// ═══════════════════════════════════════════
function GrowthBars() {
  const { ref, visible } = useInView(0.15)
  const sorted = [...R].sort((a, b) => b.growth - a.growth)
  const maxGrowth = sorted[0].growth

  return (
    <section ref={ref} className="py-24 md:py-40 bg-white">
      <div className="px-8 md:px-[8%] lg:px-[12%]">
        <p className="micro-label mb-2">Annual Growth Rate 2014–2024</p>
        <p className="font-serif text-[32px] md:text-[42px] text-dwl-black italic leading-[1.1] mb-10">
          Who&apos;s growing fastest
        </p>

        <div className="space-y-3">
          {sorted.map((r, i) => {
            const width = (r.growth / maxGrowth) * 100
            const color = getColor(R.indexOf(r))
            return (
              <div key={r.id} className="flex items-center gap-4">
                <div className="w-[140px] md:w-[200px] shrink-0 text-right">
                  <span className="text-[13px] text-dwl-black">{r.capital}</span>
                </div>
                <div className="flex-1 h-[32px] bg-dwl-light relative overflow-hidden rounded-sm">
                  <div
                    className="absolute inset-y-0 left-0 rounded-sm flex items-center justify-end pr-3"
                    style={{
                      width: visible ? `${width}%` : '0%',
                      backgroundColor: color,
                      transition: `width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 80}ms`,
                    }}
                  >
                    {width > 20 && (
                      <span className="text-[12px] text-white font-medium tabular-nums">
                        {r.growth}%
                      </span>
                    )}
                  </div>
                  {width <= 20 && visible && (
                    <span
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-[12px] text-dwl-gray font-medium tabular-nums"
                      style={{
                        marginLeft: `${width}%`,
                        opacity: visible ? 1 : 0,
                        transition: `opacity 0.5s ease ${i * 80 + 600}ms`,
                      }}
                    >
                      {r.growth}%
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════
// SECTION 5: Waffle chart — 1 square = ~370K people
// ═══════════════════════════════════════════
function WaffleChart() {
  const { ref, visible } = useInView(0.15)
  const UNIT = 368 // ~100 squares for the whole country
  const totalSquares = Math.round(TOTAL_POP / UNIT)

  // Build waffle data
  const squares: { color: string; region: string; capital: string }[] = []
  const sorted = [...R].sort((a, b) => b.population - a.population)
  sorted.forEach((r, ri) => {
    const count = Math.max(1, Math.round(r.population / UNIT))
    for (let j = 0; j < count; j++) {
      squares.push({ color: getColor(R.indexOf(r)), region: r.name, capital: r.capital })
    }
  })

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  return (
    <section ref={ref} style={{ background: '#fafafa' }} className="py-24 md:py-40">
      <div className="px-8 md:px-[8%] lg:px-[12%]">
        <p className="micro-label mb-2">One Square ≈ {UNIT.toLocaleString()} People</p>
        <p className="font-serif text-[32px] md:text-[42px] text-dwl-black italic leading-[1.1] mb-8">
          The whole country in {squares.length} blocks
        </p>

        <div className="flex flex-wrap gap-[3px]">
          {squares.map((sq, i) => {
            const isHighlighted = !hoveredRegion || hoveredRegion === sq.region
            return (
              <div
                key={i}
                className="cursor-pointer"
                style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: sq.color,
                  opacity: visible ? (isHighlighted ? 1 : 0.15) : 0,
                  borderRadius: '2px',
                  transition: `opacity 0.3s ease ${visible ? Math.min(i * 8, 800) : 0}ms`,
                }}
                onMouseEnter={() => setHoveredRegion(sq.region)}
                onMouseLeave={() => setHoveredRegion(null)}
              />
            )
          })}
        </div>

        {hoveredRegion && (
          <p className="mt-4 text-[14px] text-dwl-black font-medium">
            {hoveredRegion}
          </p>
        )}

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
          {[...R].sort((a, b) => b.population - a.population).slice(0, 6).map((r, i) => (
            <div
              key={r.id}
              className="flex items-center gap-2 cursor-pointer"
              onMouseEnter={() => setHoveredRegion(r.name)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              <div
                className="w-[12px] h-[12px] rounded-sm"
                style={{ backgroundColor: getColor(R.indexOf(r)) }}
              />
              <span className="text-[11px] text-dwl-gray">{r.capital}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════
// SECTION 6: The single fact — big typography
// ═══════════════════════════════════════════
function BigFact() {
  const { ref, visible } = useInView(0.3)
  return (
    <section
      ref={ref}
      className="py-24 md:py-40 flex items-center justify-center min-h-[60vh]"
      style={{ background: '#E63946' }}
    >
      <div className="max-w-[700px] px-6 md:px-10 text-center">
        <p
          className="font-serif italic leading-[1.15]"
          style={{
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            color: '#ffffff',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease 0.2s',
          }}
        >
          Five regions hold 71% of the population on 19% of the land.
        </p>
        <p
          className="text-[14px] mt-8"
          style={{
            color: 'rgba(0,0,0,0.6)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.8s',
          }}
        >
          Casablanca-Settat, Rabat-Salé-Kénitra, Marrakech-Safi, Fès-<span className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">Meknès</span>, Tanger-Tétouan-Al Hoceima
        </p>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════
// SECTION 7: Density spectrum — continuous strip
// ═══════════════════════════════════════════
function DensitySpectrum() {
  const { ref, visible } = useInView(0.15)
  const sorted = [...R].sort((a, b) => a.density - b.density)

  return (
    <section ref={ref} className="py-24 md:py-40 bg-white">
      <div className="px-8 md:px-[8%] lg:px-[12%]">
        <p className="micro-label mb-2">Density Spectrum</p>
        <p className="font-serif text-[32px] md:text-[42px] text-dwl-black italic leading-[1.1] mb-10">
          From empty desert to packed city
        </p>

        <div className="space-y-1">
          {sorted.map((r, i) => {
            const barW = Math.max(2, (r.density / 382.3) * 100)
            return (
              <div key={r.id} className="flex items-center gap-3 group">
                <div className="w-[120px] md:w-[180px] shrink-0 text-right">
                  <span className="text-[12px] text-dwl-gray group-hover:text-dwl-black transition-colors">
                    {r.capital}
                  </span>
                </div>
                <div className="flex-1 h-[24px] relative">
                  <div
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: visible ? `${barW}%` : '0%',
                      background: `linear-gradient(90deg, ${densityToColor(r.density * 0.5)}, ${densityToColor(r.density)})`,
                      transition: `width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 60}ms`,
                      borderRadius: '0 2px 2px 0',
                    }}
                  />
                </div>
                <div className="w-[70px] text-right">
                  <span
                    className="text-[13px] font-medium tabular-nums"
                    style={{
                      color: densityToColor(r.density),
                      opacity: visible ? 1 : 0,
                      transition: `opacity 0.5s ease ${i * 60 + 500}ms`,
                    }}
                  >
                    {r.density}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Continuous legend */}
        <div className="mt-10 max-w-[500px]">
          <div className="flex h-[8px] overflow-hidden rounded-full">
            {Array.from({ length: 50 }).map((_, i) => {
              const d = (i / 49) * 382
              return <div key={i} className="flex-1" style={{ backgroundColor: densityToColor(d) }} />
            })}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px]" style={{ color: densityToColor(5) }}>Sparse</span>
            <span className="text-[10px]" style={{ color: densityToColor(200) }}>Dense</span>
            <span className="text-[10px]" style={{ color: densityToColor(382) }}>Packed</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════
// Footer
// ═══════════════════════════════════════════
function Sources() {
  return (
    <section style={{ background: '#0a0a0a' }} className="py-20 md:py-32">
      <div className="px-8 md:px-[8%] lg:px-[12%]">
        <p className="text-[11px] uppercase tracking-[0.12em] mb-4" style={{ color: 'rgba(0,0,0,0.3)' }}>
          Source
        </p>
        <p className="text-[12px]" style={{ color: 'rgba(0,0,0,0.4)' }}>
          Haut-Commissariat au Plan (HCP), Recensement Général de la Population et de l&apos;Habitat 2024
        </p>

        <div className="mt-0 pt-6" style={{ backgroundColor: '#1f1f1f', padding: '48px 24px 16px', marginLeft: '-24px', marginRight: '-24px', marginBottom: '-24px' }}>
          <p className="text-[12px] font-medium" style={{ color: 'rgba(0,0,0,0.6)' }}>
            &copy; {new Date().getFullYear()} Slow Morocco
          </p>
          <p className="font-serif text-[18px] italic mt-2" style={{ color: '#48BFE3' }}>
            Sources: HCP Morocco, 2024 Census
          </p>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════
// Exported Component
// ═══════════════════════════════════════════
export function MoroccoPopulationContent() {
  return (
    <div className="-mt-16">
      <Hero />
      <Treemap />
      <BubbleChart />
      <GrowthBars />
      <WaffleChart />
      <BigFact />
      <DensitySpectrum />
      <Sources />
    </div>
  )
}
