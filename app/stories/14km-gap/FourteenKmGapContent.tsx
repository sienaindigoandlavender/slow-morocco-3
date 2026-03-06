'use client'

import { useState, useMemo } from 'react'

// ═══ EARTH COLORS ═══
const C = {
  morocco: '#8B3A3A',
  spain: '#C17F28',
  gap: '#F5F0EA',       // The visible gap between threads
  thread: '#2D3A6E',
  ink: '#0a0a0a',
  body: '#262626',
  muted: '#737373',
  border: '#e5e5e5',
  emerald: '#2D6E4F',
  rust: '#A0522D',
  wine: '#722F37',
  sage: '#6B7F5E',
  terracotta: '#B87A5E',
  chocolate: '#3E2723',
  indigo: '#2D3A6E',
  saffron: '#C17F28',
  brick: '#8B3A3A',
  plum: '#5D3A5E',
  ochre: '#C49A3C',
}

// ═══ COMPARATIVE DATA ═══
// Each metric has Morocco value, Spain value, unit, and a "direction"
// (higher-better or lower-better or neutral) for contextual coloring

interface Metric {
  id: string
  label: string
  morocco: number
  spain: number
  unit: string
  format: (v: number) => string
  note?: string
  color: string
  higherBetter?: boolean // true = higher is better, false = lower is better
  category: string
}

const METRICS: Metric[] = [
  // ECONOMY
  { id: 'gdp-cap', label: 'GDP per Capita (PPP)', morocco: 8800, spain: 46400, unit: '$', format: v => `$${(v/1000).toFixed(1)}K`, color: C.saffron, higherBetter: true, category: 'Economy' },
  { id: 'gdp', label: 'GDP Total', morocco: 183, spain: 1582, unit: '$B', format: v => `$${v}B`, color: C.ochre, higherBetter: true, category: 'Economy' },
  { id: 'min-wage', label: 'Minimum Wage (Monthly)', morocco: 310, spain: 1323, unit: '$', format: v => `$${v}`, color: C.rust, higherBetter: true, category: 'Economy', note: 'Morocco: SMIG ~3,111 MAD/month' },
  { id: 'unemployment', label: 'Unemployment Rate', morocco: 13.0, spain: 12.1, unit: '%', format: v => `${v}%`, color: C.terracotta, higherBetter: false, category: 'Economy', note: 'Morocco youth unemployment: 35.8%' },
  { id: 'debt-gdp', label: 'Public Debt (% GDP)', morocco: 69.5, spain: 107.7, unit: '%', format: v => `${v}%`, color: '#8A7050', higherBetter: false, category: 'Economy' },

  // DEMOGRAPHICS
  { id: 'population', label: 'Population', morocco: 37.8, spain: 49.3, unit: 'M', format: v => `${v}M`, color: C.indigo, category: 'Demographics' },
  { id: 'life-expect', label: 'Life Expectancy', morocco: 74.5, spain: 83.6, unit: 'yrs', format: v => `${v}`, color: C.emerald, higherBetter: true, category: 'Demographics' },
  { id: 'median-age', label: 'Median Age', morocco: 30.1, spain: 45.5, unit: 'yrs', format: v => `${v}`, color: C.sage, category: 'Demographics' },
  { id: 'infant-mort', label: 'Infant Mortality', morocco: 19.2, spain: 2.5, unit: '/1000', format: v => `${v}`, color: C.wine, higherBetter: false, category: 'Demographics' },
  { id: 'literacy', label: 'Literacy Rate', morocco: 75.9, spain: 98.6, unit: '%', format: v => `${v}%`, color: C.plum, higherBetter: true, category: 'Demographics' },

  // INFRASTRUCTURE & TOURISM
  { id: 'tourism', label: 'Tourist Arrivals', morocco: 17.4, spain: 85.1, unit: 'M', format: v => `${v}M`, color: C.brick, higherBetter: true, category: 'Infrastructure' },
  { id: 'hsr', label: 'High-Speed Rail (km)', morocco: 200, spain: 4049, unit: 'km', format: v => `${v.toLocaleString()}`, color: C.emerald, higherBetter: true, category: 'Infrastructure', note: 'Morocco: Africa\'s only HSR. Expanding to 630km by 2030.' },
  { id: 'renewable', label: 'Renewable Energy', morocco: 42, spain: 50, unit: '%', format: v => `${v}%`, color: C.sage, higherBetter: true, category: 'Infrastructure', note: 'Morocco target: 52% by 2030. Noor solar complex = world\'s largest.' },
  { id: 'phones', label: 'Mobile Subscriptions', morocco: 137, spain: 117, unit: '/100', format: v => `${v}`, color: C.ochre, category: 'Infrastructure', note: 'Morocco exceeds Spain. Over 100 = multiple SIMs per person.' },

  // CULTURE & SOCIETY
  { id: 'edu-spend', label: 'Education Spending (% GDP)', morocco: 6.8, spain: 4.6, unit: '%', format: v => `${v}%`, color: C.indigo, higherBetter: true, category: 'Society', note: 'Morocco spends more of GDP on education than Spain.' },
  { id: 'health-spend', label: 'Healthcare Spending (% GDP)', morocco: 6.0, spain: 10.7, unit: '%', format: v => `${v}%`, color: C.wine, higherBetter: true, category: 'Society' },
  { id: 'maternal-mort', label: 'Maternal Mortality', morocco: 72, spain: 3, unit: '/100K', format: v => `${v}`, color: '#6B3040', higherBetter: false, category: 'Society' },
  { id: 'birth-rate', label: 'Birth Rate', morocco: 16.8, spain: 7.1, unit: '/1000', format: v => `${v}`, color: C.terracotta, category: 'Society', note: 'Morocco\'s population is growing. Spain\'s is aging.' },
]

// ═══ TENSION VISUALIZATION ═══

function TensionViz({ metrics, hoveredId, onHover }: {
  metrics: Metric[]; hoveredId: string | null; onHover: (id: string | null) => void
}) {
  const W = 1000, H = 80 * metrics.length + 120
  const LEFT = 70   // Morocco shore
  const RIGHT = 930  // Spain shore
  const GAP_W = RIGHT - LEFT
  const TOP = 80
  const ROW_H = 72

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ maxHeight: '90vh' }}>
      {/* Shore labels */}
      <text x={LEFT} y={30} textAnchor="middle" fill={C.morocco} fontSize="11"
        fontFamily="var(--font-plex-mono), monospace" fontWeight={700} letterSpacing="0.1em">
        MOROCCO
      </text>
      <text x={RIGHT} y={30} textAnchor="end" fill={C.spain} fontSize="11"
        fontFamily="var(--font-plex-mono), monospace" fontWeight={700} letterSpacing="0.1em">
        SPAIN
      </text>
      <text x={W / 2} y={30} textAnchor="middle" fill={C.muted} fontSize="9"
        fontFamily="'Instrument Serif', Georgia, serif" fontStyle="italic">
        {'\u2190'} 14 km across the Strait of Gibraltar {'\u2192'}
      </text>

      {/* Shore lines */}
      <line x1={LEFT} y1={TOP - 20} x2={LEFT} y2={TOP + metrics.length * ROW_H + 10}
        stroke={C.morocco} strokeWidth="3" />
      <line x1={RIGHT} y1={TOP - 20} x2={RIGHT} y2={TOP + metrics.length * ROW_H + 10}
        stroke={C.spain} strokeWidth="3" />

      {/* Metric threads */}
      {metrics.map((m, i) => {
        const y = TOP + i * ROW_H + ROW_H / 2
        const max = Math.max(m.morocco, m.spain)

        // Normalize both values to 0-1 range where 0 = shore, 1 = center
        // Morocco dot positioned from left, Spain dot from right
        // The GAP between dots = the inequality
        const morNorm = m.morocco / max
        const spaNorm = m.spain / max

        // Position: Morocco value pulls toward center from left
        // Spain value pulls toward center from right
        // When equal, both meet at center. When unequal, gap appears.
        const morX = LEFT + morNorm * (GAP_W / 2)
        const spaX = RIGHT - spaNorm * (GAP_W / 2)

        const gapWidth = Math.max(0, spaX - morX)
        const midX = (morX + spaX) / 2
        const isHovered = hoveredId === m.id
        const isDimmed = hoveredId !== null && !isHovered

        // Thread curves — bezier from shore to value point
        const morPath = `M${LEFT},${y} C${LEFT + 30},${y} ${morX - 20},${y} ${morX},${y}`
        const spaPath = `M${RIGHT},${y} C${RIGHT - 30},${y} ${spaX + 20},${y} ${spaX},${y}`

        return (
          <g key={m.id} style={{ cursor: 'pointer', transition: 'opacity 0.3s' }}
            opacity={isDimmed ? 0.15 : 1}
            onMouseEnter={() => onHover(m.id)}
            onMouseLeave={() => onHover(null)}>

            {/* Subtle row background on hover */}
            {isHovered && (
              <rect x={0} y={y - ROW_H / 2 + 4} width={W} height={ROW_H - 8}
                fill="#f5f5f5" rx="2" />
            )}

            {/* The gap — the visible inequality */}
            {gapWidth > 2 && (
              <rect x={morX} y={y - 6} width={gapWidth} height={12}
                fill={m.color} opacity={isHovered ? 0.12 : 0.04} rx="1" />
            )}

            {/* Morocco thread */}
            <path d={morPath} fill="none" stroke={C.morocco} strokeWidth={isHovered ? 2.5 : 1.5}
              style={{ transition: 'stroke-width 0.2s' }} />
            {/* Spain thread */}
            <path d={spaPath} fill="none" stroke={C.spain} strokeWidth={isHovered ? 2.5 : 1.5}
              style={{ transition: 'stroke-width 0.2s' }} />

            {/* Morocco value dot */}
            <circle cx={morX} cy={y} r={isHovered ? 5 : 3.5} fill={C.morocco}
              stroke="white" strokeWidth={1.5} style={{ transition: 'r 0.2s' }} />
            {/* Spain value dot */}
            <circle cx={spaX} cy={y} r={isHovered ? 5 : 3.5} fill={C.spain}
              stroke="white" strokeWidth={1.5} style={{ transition: 'r 0.2s' }} />

            {/* Morocco value label */}
            <text x={morX} y={y - 12} textAnchor="middle" fill={C.morocco}
              fontSize={isHovered ? '10' : '8'} fontFamily="var(--font-plex-mono), monospace"
              fontWeight={isHovered ? 600 : 400}>
              {m.format(m.morocco)}
            </text>
            {/* Spain value label */}
            <text x={spaX} y={y - 12} textAnchor="middle" fill={C.spain}
              fontSize={isHovered ? '10' : '8'} fontFamily="var(--font-plex-mono), monospace"
              fontWeight={isHovered ? 600 : 400}>
              {m.format(m.spain)}
            </text>

            {/* Metric label — centered in gap or above */}
            <text x={midX} y={y + (isHovered ? 20 : 18)} textAnchor="middle"
              fill={isHovered ? C.ink : C.muted}
              fontSize={isHovered ? '9' : '7.5'}
              fontFamily="var(--font-plex-mono), monospace"
              letterSpacing="0.04em">
              {m.label}
            </text>

            {/* Gap width indicator on hover */}
            {isHovered && gapWidth > 20 && (
              <g>
                <line x1={morX + 6} y1={y} x2={spaX - 6} y2={y}
                  stroke={m.color} strokeWidth="0.5" strokeDasharray="3,3" opacity="0.5" />
                {/* Ratio */}
                <text x={midX} y={y + 4} textAnchor="middle" fill={m.color}
                  fontSize="8" fontFamily="'Instrument Serif', Georgia, serif" fontStyle="italic" opacity="0.7">
                  {m.spain > m.morocco
                    ? `${(m.spain / m.morocco).toFixed(1)}\u00d7`
                    : `${(m.morocco / m.spain).toFixed(1)}\u00d7`
                  }
                </text>
              </g>
            )}
          </g>
        )
      })}

      {/* Water/strait symbol at bottom */}
      <g opacity="0.15">
        {Array.from({ length: 8 }).map((_, i) => {
          const y = TOP + metrics.length * ROW_H + 30
          const x = LEFT + (i + 1) * (GAP_W / 9)
          return <text key={i} x={x} y={y} textAnchor="middle" fill={C.indigo} fontSize="8">~</text>
        })}
      </g>
    </svg>
  )
}

// ═══ PAGE ═══

export default function FourteenKmGapContent() {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = ['all', 'Economy', 'Demographics', 'Infrastructure', 'Society']
  const filteredMetrics = activeCategory === 'all'
    ? METRICS
    : METRICS.filter(m => m.category === activeCategory)

  const hoveredData = hoveredMetric ? METRICS.find(m => m.id === hoveredMetric) : null

  // Stats
  const avgRatio = useMemo(() => {
    const ratios = METRICS.filter(m => m.higherBetter !== undefined).map(m =>
      m.higherBetter ? m.spain / m.morocco : m.morocco / m.spain
    )
    return (ratios.reduce((a, b) => a + b, 0) / ratios.length).toFixed(1)
  }, [])

  return (
    <div className="min-h-screen pt-16 bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-20 pb-8">
        <p className="micro-label mb-2" style={{ color: C.muted }}>Module 011 · Comparative Intelligence</p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-[-0.02em] mb-4">
          <em>The 14km Gap</em>
        </h1>
        <p className="text-[15px] max-w-[600px] leading-[1.7] mb-6" style={{ color: C.body }}>
          Morocco and Spain are separated by <span className="underline underline-offset-2">14 kilometres</span> of water.
          The distance between their economies is measured in multiples.
        </p>
        <p className="text-[13px] max-w-[600px] leading-[1.7] mb-8" style={{ color: C.muted }}>
          Each thread below connects the two shores. Where the threads meet,
          the countries are equal. Where they pull apart — that gap is the
          inequality. The wider the space, the deeper the divide.
          Hover any thread to read it.
        </p>

        <div className="flex flex-wrap gap-8">
          {[
            { n: '14km', l: 'Strait of Gibraltar', c: C.indigo },
            { n: '5.3\u00d7', l: 'GDP per capita gap', c: C.saffron },
            { n: '9.1yrs', l: 'Life expectancy gap', c: C.emerald },
            { n: '18', l: 'Metrics compared', c: C.muted },
          ].map(s => (
            <div key={s.l}>
              <p className="font-serif italic text-[24px]" style={{ color: s.c }}>{s.n}</p>
              <p className="micro-label" style={{ color: C.muted }}>{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CATEGORY FILTER ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%]">
        <div className="border-t border-b py-3 flex items-center gap-2 overflow-x-auto"
          style={{ borderColor: C.border, scrollbarWidth: 'none' as const }}>
          <span className="text-[10px] uppercase tracking-widest mr-2" style={{ color: C.muted }}>Filter</span>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all whitespace-nowrap"
              style={{
                background: activeCategory === cat ? C.ink : 'transparent',
                color: activeCategory === cat ? '#fff' : C.muted,
                border: `1px solid ${activeCategory === cat ? C.ink : C.border}`,
              }}>
              {cat === 'all' ? 'All Metrics' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* ═══ TENSION VISUALIZATION ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-6">
        <TensionViz
          metrics={filteredMetrics}
          hoveredId={hoveredMetric}
          onHover={setHoveredMetric}
        />
      </section>

      {/* ═══ HOVERED DETAIL CARD ═══ */}
      {hoveredData && (
        <section className="px-8 md:px-[8%] lg:px-[12%] mt-2">
          <div className="p-4 border" style={{ borderColor: hoveredData.color + '30' }}>
            <div className="flex items-baseline justify-between">
              <p className="text-[13px] font-medium">{hoveredData.label}</p>
              <p className="text-[10px]" style={{ color: C.muted }}>{hoveredData.category}</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-3">
              <div>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: C.morocco }}>Morocco</p>
                <p className="font-serif italic text-[20px]" style={{ color: C.morocco }}>{hoveredData.format(hoveredData.morocco)}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest" style={{ color: C.muted }}>Ratio</p>
                <p className="font-serif italic text-[20px]" style={{ color: hoveredData.color }}>
                  {hoveredData.spain > hoveredData.morocco
                    ? `${(hoveredData.spain / hoveredData.morocco).toFixed(1)}\u00d7`
                    : hoveredData.morocco > hoveredData.spain
                      ? `${(hoveredData.morocco / hoveredData.spain).toFixed(1)}\u00d7`
                      : '1.0\u00d7'
                  }
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest" style={{ color: C.spain }}>Spain</p>
                <p className="font-serif italic text-[20px]" style={{ color: C.spain }}>{hoveredData.format(hoveredData.spain)}</p>
              </div>
            </div>
            {hoveredData.note && (
              <p className="text-[10px] mt-3 pt-2 border-t" style={{ color: C.muted, borderColor: C.border }}>
                {hoveredData.note}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ═══ THE STORY ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="micro-label mb-2" style={{ color: C.muted }}>Where Morocco Leads</p>
              <p className="text-[12px] leading-[1.6]" style={{ color: C.body }}>
                Morocco spends a larger share of GDP on education (6.8% vs 4.6%).
                Its mobile phone penetration exceeds Spain&apos;s — 137 per 100 people versus 117.
                Its birth rate (16.8) is more than double Spain&apos;s (7.1), meaning a young,
                growing workforce versus an aging, shrinking one. Morocco&apos;s population will
                keep growing while Spain&apos;s is projected to decline.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.muted }}>Where the Gap Is Widest</p>
              <p className="text-[12px] leading-[1.6]" style={{ color: C.body }}>
                GDP per capita: 5.3{'\u00d7'} difference. Infant mortality: 7.7{'\u00d7'} higher.
                Maternal mortality: 24{'\u00d7'} higher. Tourism arrivals: 4.9{'\u00d7'} fewer despite
                comparable coastline and culture. These are not abstract statistics —
                they shape every investment decision, every policy, every life.
              </p>
            </div>
            <div>
              <p className="micro-label mb-2" style={{ color: C.muted }}>Where It&apos;s Closing</p>
              <p className="text-[12px] leading-[1.6]" style={{ color: C.body }}>
                Renewable energy: 42% vs 50% — nearly equal, and Morocco is accelerating.
                Unemployment: 13% vs 12.1% — closer than expected. Spain&apos;s youth
                unemployment crisis mirrors Morocco&apos;s. The high-speed rail gap is closing:
                Morocco will reach 630km by 2030, the only nation in Africa with HSR.
                The 2030 World Cup is a literal bridge across the strait.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE METAPHOR ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] mt-12">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="max-w-[640px]">
            <p className="font-serif italic text-[22px] leading-[1.4]" style={{ color: C.ink }}>
              Fourteen kilometres of water. That&apos;s all that separates the two shores.
              On a clear day, you can see Spain from Tangier and Morocco from Tarifa.
              The distance is nothing. The gap is everything.
            </p>
            <p className="text-[13px] mt-4 leading-[1.7]" style={{ color: C.body }}>
              In 2030, both countries will co-host the World Cup.
              For the first time, a single tournament will be played on both sides
              of this strait. The infrastructure is being built. The question is
              whether the other gaps close with it.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-12">
        <div className="border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="micro-label mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Sources</p>
          <p className="text-[11px] leading-[1.6] max-w-[700px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            GDP and GDP per capita (PPP): IMF World Economic Outlook, April 2025.
            Demographic indicators: CIA World Factbook 2024; HCP Morocco 2024 census;
            INE Spain. Health data: WHO Global Health Observatory. Tourism: UNWTO 2024.
            Education and healthcare spending: World Bank Development Indicators.
            Infrastructure: ONCF Morocco; Renfe/Adif Spain; IEA energy data.
            Minimum wage: Morocco SMIG per decree (2024); Spain BOE (2024).
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-2">
            <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.15)' }}>
              {'\u00a9'} {new Date().getFullYear()} Slow Morocco. This visualization may not be reproduced without written permission and visible attribution.
            </p>
            <p className="font-serif italic text-[12px]" style={{ color: C.emerald }}>
              {'\u00a9'} Slow Morocco
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
