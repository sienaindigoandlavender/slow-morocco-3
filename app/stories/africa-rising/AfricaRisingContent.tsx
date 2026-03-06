'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const C = {
  morocco: '#C41E3A', gold: '#D4A017',
  ink: '#1a1a1a', text: '#3a3a3a', muted: '#8c8c8c', border: '#e0e0e0',
  // Metric colors
  gdp: '#1B4D8C', tourism: '#8B2500', fdi: '#2E7D32', renewable: '#D4A017', hdi: '#6B3FA0', infra: '#1B6B6B',
}

// ═══ METRICS ═══
type MetricKey = 'gdp' | 'tourism' | 'fdi' | 'renewable' | 'hdi' | 'infra'
const METRICS: Record<MetricKey, { label: string; full: string; unit: string; color: string }> = {
  gdp:       { label: 'GDP', full: 'GDP (nominal)', unit: 'USD billions', color: C.gdp },
  tourism:   { label: 'Tourism', full: 'International Tourist Arrivals', unit: 'millions/year', color: C.tourism },
  fdi:       { label: 'FDI', full: 'Foreign Direct Investment Inflows', unit: 'USD billions', color: C.fdi },
  renewable: { label: 'Renewables', full: 'Renewable Energy Capacity', unit: '% of electricity', color: C.renewable },
  hdi:       { label: 'HDI', full: 'Human Development Index', unit: 'UNDP index', color: C.hdi },
  infra:     { label: 'Infrastructure', full: 'Infrastructure Quality Index', unit: 'WEF/AfDB score', color: C.infra },
}

const YEARS = [2005, 2008, 2011, 2014, 2017, 2020, 2023, 2025]

// ═══ RANK DATA ═══
// Morocco's rank among 54 African nations for each metric across years
// Sources: IMF WEO, World Bank, UNCTAD, IRENA, UNDP, WEF GCI, AfDB AII
// Where rank data approximate for some years, based on available publications

interface RankPoint { year: number; rank: number; note?: string }

const RANKS: Record<MetricKey, RankPoint[]> = {
  gdp: [
    { year: 2005, rank: 7, note: 'Behind Nigeria, South Africa, Egypt, Algeria, Libya, Angola' },
    { year: 2008, rank: 6, note: 'Libya drops during instability; Morocco passes' },
    { year: 2011, rank: 6, note: 'Arab Spring: Morocco stable, Libya collapses' },
    { year: 2014, rank: 6, note: 'Consistent growth 4-5% annually' },
    { year: 2017, rank: 6, note: 'Nigeria recession 2016; gap narrows' },
    { year: 2020, rank: 6, note: 'COVID: -6.3% GDP but recovers faster than peers' },
    { year: 2023, rank: 5, note: '$144B — passes Angola. Behind Egypt, SA, Nigeria, Algeria' },
    { year: 2025, rank: 5, note: '$161B projected. World Cup infrastructure accelerating' },
  ],
  tourism: [
    { year: 2005, rank: 3, note: '5.8M arrivals. Behind South Africa, Egypt' },
    { year: 2008, rank: 2, note: '7.9M arrivals. Passes South Africa in volume' },
    { year: 2011, rank: 3, note: 'Arab Spring dip. Egypt and Tunisia hit harder' },
    { year: 2014, rank: 2, note: '10.3M arrivals. Vision 2020 strategy working' },
    { year: 2017, rank: 2, note: '11.3M arrivals. COP22 afterglow, new air routes' },
    { year: 2020, rank: 3, note: '2.8M arrivals — borders closed March-June. COVID devastation' },
    { year: 2023, rank: 2, note: '14.5M arrivals. Surpasses 2019 record. Racing Egypt' },
    { year: 2025, rank: 1, note: '17.4M (2024). #1 in Africa. Egypt at 15.7M. First time ever.' },
  ],
  fdi: [
    { year: 2005, rank: 8, note: '$2.9B. Mining, telecom, real estate inflows' },
    { year: 2008, rank: 5, note: '$2.5B. Tangier Med port effect begins. Auto FDI starts' },
    { year: 2011, rank: 6, note: '$2.5B. Arab Spring uncertainty. Some investors pause.' },
    { year: 2014, rank: 5, note: '$3.6B. Renault Tangier. Aerospace corridor. PSA Peugeot announces' },
    { year: 2017, rank: 4, note: '$2.7B. Auto sector booming: 400K vehicles/year. Boeing, Bombardier' },
    { year: 2020, rank: 5, note: '$1.8B. COVID dip. But Tangier Med keeps growing.' },
    { year: 2023, rank: 4, note: '$2.1B. Post-COVID FDI recovery. Green hydrogen exploration' },
    { year: 2025, rank: 3, note: '$3.5B avg. World Cup infrastructure. Giga-factories. Green energy' },
  ],
  renewable: [
    { year: 2005, rank: 12, note: 'Hydro only. No solar/wind strategy yet' },
    { year: 2008, rank: 10, note: 'National energy strategy announced. Noor-Ouarzazate planned' },
    { year: 2011, rank: 8, note: 'Morocco Solar Plan: 2GW target by 2020' },
    { year: 2014, rank: 6, note: '34% renewable target by 2020. Wind farms: Tarfaya (301MW)' },
    { year: 2017, rank: 4, note: 'Noor-Ouarzazate I+II online. COP22 host. 35% renewable' },
    { year: 2020, rank: 3, note: '37% renewable electricity. Noor III + Midelt. Africa\'s solar leader' },
    { year: 2023, rank: 2, note: '40%+ renewable. 52% target by 2030. Behind only Kenya in %' },
    { year: 2025, rank: 2, note: '42% renewable capacity installed. Green hydrogen MoUs signed' },
  ],
  hdi: [
    { year: 2005, rank: 12, note: '0.574. Medium human development. Education gaps.' },
    { year: 2008, rank: 11, note: '0.598. School enrollment rising. Health improvements.' },
    { year: 2011, rank: 10, note: '0.617. New constitution expands rights. Gender progress.' },
    { year: 2014, rank: 9, note: '0.641. Female school enrollment jumps. Poverty declining.' },
    { year: 2017, rank: 8, note: '0.667. RAMED health coverage. Rural electrification near 100%' },
    { year: 2020, rank: 8, note: '0.683. COVID tests healthcare system. Vaccine rollout fastest in Africa.' },
    { year: 2023, rank: 7, note: '0.698. Approaching "high" development threshold (0.700)' },
    { year: 2025, rank: 6, note: '0.706 est. Crosses high development threshold. Education/health gains' },
  ],
  infra: [
    { year: 2005, rank: 8, note: 'Road network good for Africa. No high-speed rail. Port capacity limited' },
    { year: 2008, rank: 6, note: 'Tangier Med port opens (2007). Highway network expanding.' },
    { year: 2011, rank: 5, note: '1,800km motorway. Best road network in North Africa.' },
    { year: 2014, rank: 4, note: 'Al Boraq HSR under construction. Tangier Med expansion. Noor I build' },
    { year: 2017, rank: 3, note: 'Al Boraq launches 2018 — Africa\'s first high-speed train. 320km/h' },
    { year: 2020, rank: 3, note: 'Tangier Med: #1 port in Africa, Mediterranean. 9M TEU capacity' },
    { year: 2023, rank: 2, note: 'TGV expansion planned. Tangier Med: largest transshipment in Med' },
    { year: 2025, rank: 2, note: 'World Cup stadiums. LGV extension to Marrakech. New airports' },
  ],
}

// ═══ EVENTS ═══
interface BumpEvent { year: number; label: string; desc: string }
const KEY_EVENTS: BumpEvent[] = [
  { year: 2005, label: 'Vision 2010', desc: 'Tourism modernization strategy. Target: 10M arrivals.' },
  { year: 2007, label: 'Tangier Med Opens', desc: 'Africa\'s largest port. Gateway for auto exports.' },
  { year: 2008, label: 'Global Financial Crisis', desc: 'Morocco insulated by domestic consumption.' },
  { year: 2011, label: 'Arab Spring', desc: 'Morocco reforms. Neighbours collapse. Stability premium.' },
  { year: 2014, label: 'Subsidy Reform + Noor I', desc: 'Fiscal discipline. Solar ambition.' },
  { year: 2017, label: 'COP22 + Auto Boom', desc: '400K vehicles/year. Climate leadership.' },
  { year: 2018, label: 'Al Boraq HSR', desc: 'Africa\'s first high-speed train. 320 km/h.' },
  { year: 2020, label: 'COVID + Vaccine Rollout', desc: 'Fastest vaccination in Africa. Borders reopen.' },
  { year: 2023, label: 'Earthquake + Resilience', desc: 'Al Haouz earthquake. Recovery + World Cup bid won.' },
  { year: 2025, label: '#1 Tourism + World Cup Build', desc: '17.4M tourists. $15B infrastructure investment.' },
]

// ═══ CHART CONSTANTS ═══
const SVG_W = 860
const SVG_H = 520
const PAD = { t: 50, b: 80, l: 55, r: 120 }
const PLOT_W = SVG_W - PAD.l - PAD.r
const PLOT_H = SVG_H - PAD.t - PAD.b
const MAX_RANK = 15 // show top 15

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, vis }
}

export default function AfricaRisingContent() {
  const [activeMetric, setActiveMetric] = useState<MetricKey | 'all'>('all')
  const [activeYear, setActiveYear] = useState(7) // index into YEARS
  const [isPlaying, setIsPlaying] = useState(false)
  const [hoveredMetric, setHoveredMetric] = useState<MetricKey | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const heroR = useReveal()
  const chartR = useReveal(0.05)

  // Animation
  const play = useCallback(() => {
    setActiveYear(0)
    setIsPlaying(true)
  }, [])

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        setActiveYear(prev => {
          if (prev >= YEARS.length - 1) { setIsPlaying(false); return prev }
          return prev + 1
        })
      }, 900)
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [isPlaying, activeYear])

  // Scales
  const xScale = (yi: number) => PAD.l + (yi / (YEARS.length - 1)) * PLOT_W
  const yScale = (rank: number) => PAD.t + ((rank - 1) / (MAX_RANK - 1)) * PLOT_H

  // Get rank at a year index for a metric (interpolate if needed)
  const getRankAtYearIdx = (metric: MetricKey, yi: number): number => {
    const data = RANKS[metric]
    const targetYear = YEARS[yi]
    const exact = data.find(d => d.year === targetYear)
    if (exact) return exact.rank
    // Interpolate
    let before = data[0], after = data[data.length - 1]
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i].year <= targetYear && data[i + 1].year >= targetYear) {
        before = data[i]; after = data[i + 1]; break
      }
    }
    const t = (targetYear - before.year) / (after.year - before.year)
    return Math.round(before.rank + t * (after.rank - before.rank))
  }

  const getNote = (metric: MetricKey, yi: number): string | undefined => {
    const data = RANKS[metric]
    const exact = data.find(d => d.year === YEARS[yi])
    return exact?.note
  }

  // SVG paths for each metric
  const metricKeys = Object.keys(METRICS) as MetricKey[]
  const visibleMetrics = activeMetric === 'all' ? metricKeys : [activeMetric]

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Module 068 · Competitive Intelligence</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>Africa Rising</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            Morocco&apos;s rank among 54 African nations, six metrics, twenty years
          </p>
        </div>
        <p className="text-[13px] max-w-[580px] leading-[1.7] mt-6" style={{ color: C.text }}>
          In 2005, Morocco was Africa&apos;s 7th largest economy, 12th in renewable energy,
          3rd in tourism. Twenty years later: 5th in GDP, 1st in tourism (17.4 million
          arrivals in 2024 — surpassing Egypt for the first time), 2nd in renewable energy
          and infrastructure, crossing the &quot;high human development&quot; threshold.
          The trajectory is consistent across every metric. Not explosive growth — steady,
          compounding gains while neighbours stumbled through revolution, war, or stagnation.
          Watch the lines climb. The argument makes itself.
        </p>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mt-10">
          {metricKeys.map((k, i) => {
            const first = RANKS[k][0].rank
            const last = RANKS[k][RANKS[k].length - 1].rank
            const delta = first - last
            return (
              <div key={k} className="transition-all duration-700" style={{ opacity: heroR.vis ? 1 : 0, transitionDelay: `${i * 100}ms` }}>
                <p className="font-mono text-[9px] uppercase tracking-wider" style={{ color: METRICS[k].color }}>{METRICS[k].label}</p>
                <p className="font-mono text-[22px] font-bold leading-tight" style={{ color: C.ink }}>#{last}</p>
                <p className="font-mono text-[9px]" style={{ color: delta > 0 ? '#2E7D32' : C.muted }}>
                  {delta > 0 ? `↑${delta} from #${first}` : `= #${first}`}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══ BUMP CHART ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-8">
        <div ref={chartR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: C.ink }}>Bump Chart · Rank Among 54 African Nations</p>
            <button onClick={play} className="ml-auto px-3 py-1 text-[9px] uppercase tracking-wider font-mono transition-all hover:opacity-80"
              style={{ background: C.morocco, color: 'white' }}>
              {isPlaying ? '▶ Playing...' : '▶ Animate'}
            </button>
          </div>

          {/* Metric filter */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <button onClick={() => setActiveMetric('all')}
              className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-mono transition-all"
              style={{ background: activeMetric === 'all' ? C.ink : 'transparent', color: activeMetric === 'all' ? 'white' : C.muted, border: `1px solid ${activeMetric === 'all' ? C.ink : C.border}` }}>
              All Metrics
            </button>
            {metricKeys.map(k => (
              <button key={k} onClick={() => setActiveMetric(activeMetric === k ? 'all' : k)}
                className="px-2.5 py-1 text-[9px] uppercase tracking-wider font-mono transition-all"
                style={{ background: activeMetric === k ? METRICS[k].color : 'transparent', color: activeMetric === k ? 'white' : METRICS[k].color, border: `1px solid ${activeMetric === k ? METRICS[k].color : `${METRICS[k].color}40`}` }}>
                {METRICS[k].label}
              </button>
            ))}
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full min-w-[700px]">
              {/* Rank gridlines */}
              {Array.from({ length: MAX_RANK }, (_, i) => i + 1).filter(r => r === 1 || r === 5 || r === 10 || r === 15).map(r => (
                <g key={r}>
                  <line x1={PAD.l} y1={yScale(r)} x2={SVG_W - PAD.r} y2={yScale(r)} stroke={C.border} strokeWidth="0.5" />
                  <text x={PAD.l - 8} y={yScale(r) + 3} textAnchor="end" fill={C.muted} fontSize="9" fontFamily="monospace">#{r}</text>
                </g>
              ))}

              {/* Year columns */}
              {YEARS.map((y, yi) => {
                const x = xScale(yi)
                const isActive = yi <= activeYear
                return (
                  <g key={y}>
                    <line x1={x} y1={PAD.t - 5} x2={x} y2={PAD.t + PLOT_H + 5} stroke={isActive ? `${C.ink}20` : `${C.border}50`} strokeWidth="0.5" />
                    <text x={x} y={PAD.t + PLOT_H + 24} textAnchor="middle" fill={isActive ? C.ink : C.muted} fontSize="10" fontFamily="monospace" fontWeight={yi === activeYear ? 'bold' : 'normal'}>
                      {y}
                    </text>
                  </g>
                )
              })}

              {/* Active year highlight */}
              <rect x={xScale(activeYear) - 18} y={PAD.t + PLOT_H + 10} width="36" height="18" rx="2"
                fill={C.morocco} opacity="0.12" />

              {/* Metric lines */}
              {visibleMetrics.map(k => {
                const m = METRICS[k]
                const isHovered = hoveredMetric === k
                const opacity = hoveredMetric && !isHovered ? 0.15 : activeMetric === 'all' ? 0.85 : 1

                // Build path up to activeYear
                const pts = YEARS.slice(0, activeYear + 1).map((_, yi) => ({
                  x: xScale(yi), y: yScale(getRankAtYearIdx(k, yi))
                }))
                const pathD = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

                // Current rank
                const currentRank = getRankAtYearIdx(k, activeYear)
                const lastPt = pts[pts.length - 1]

                return (
                  <g key={k} onMouseEnter={() => setHoveredMetric(k)} onMouseLeave={() => setHoveredMetric(null)} className="cursor-pointer">
                    {/* Line */}
                    <path d={pathD} fill="none" stroke={m.color} strokeWidth={isHovered ? 3.5 : 2} strokeLinecap="round" strokeLinejoin="round"
                      opacity={opacity} className="transition-all duration-300" />

                    {/* Dots at each year */}
                    {pts.map((p, pi) => (
                      <circle key={pi} cx={p.x} cy={p.y} r={pi === activeYear ? 5 : 3}
                        fill={m.color} stroke="white" strokeWidth="1.5" opacity={opacity} className="transition-all duration-300" />
                    ))}

                    {/* End label */}
                    {lastPt && (
                      <g opacity={opacity} className="transition-all duration-300">
                        <text x={lastPt.x + 12} y={lastPt.y + 4} fill={m.color} fontSize="10" fontFamily="monospace" fontWeight="bold">
                          #{currentRank} {m.label}
                        </text>
                      </g>
                    )}
                  </g>
                )
              })}

              {/* Event markers on x-axis */}
              {KEY_EVENTS.map((ev, i) => {
                const yi = YEARS.findIndex(y => y === ev.year)
                if (yi === -1 || yi > activeYear) return null
                const x = xScale(yi)
                return (
                  <g key={i}>
                    <circle cx={x} cy={PAD.t + PLOT_H + 46} r="3" fill={C.gold} stroke="white" strokeWidth="1" />
                    <text x={x} y={PAD.t + PLOT_H + 60} textAnchor="middle" fill={C.muted} fontSize="7" fontFamily="monospace">
                      {ev.label.length > 12 ? ev.label.slice(0, 12) + '…' : ev.label}
                    </text>
                  </g>
                )
              })}

              {/* Y axis label */}
              <text x={PAD.l - 8} y={PAD.t - 16} textAnchor="start" fill={C.muted} fontSize="8" fontFamily="monospace">Rank (1 = best in Africa)</text>
            </svg>
          </div>

          {/* Year slider */}
          <div className="mt-4 flex items-center gap-3">
            <input type="range" min={0} max={YEARS.length - 1} value={activeYear}
              onChange={e => { setActiveYear(parseInt(e.target.value)); setIsPlaying(false) }}
              className="flex-1 h-1 bg-gray-200 rounded appearance-none cursor-pointer accent-red-700" />
            <span className="font-mono text-[14px] font-bold" style={{ color: C.morocco }}>{YEARS[activeYear]}</span>
          </div>

          {/* Year detail panel */}
          <div className="mt-4 p-4 bg-white border" style={{ borderColor: C.border }}>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-[18px] font-bold">{YEARS[activeYear]}</span>
              {KEY_EVENTS.find(e => YEARS.indexOf(e.year) === activeYear) && (
                <span className="font-mono text-[10px] px-2 py-0.5" style={{ background: `${C.gold}15`, color: C.gold }}>
                  {KEY_EVENTS.find(e => YEARS.indexOf(e.year) === activeYear)?.label}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {metricKeys.map(k => {
                const rank = getRankAtYearIdx(k, activeYear)
                const note = getNote(k, activeYear)
                const prevRank = activeYear > 0 ? getRankAtYearIdx(k, activeYear - 1) : rank
                const delta = prevRank - rank
                return (
                  <div key={k} className="p-2" style={{ borderLeft: `2px solid ${METRICS[k].color}` }}>
                    <p className="font-mono text-[9px] uppercase" style={{ color: METRICS[k].color }}>{METRICS[k].label}</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-[18px] font-bold">#{rank}</span>
                      {delta !== 0 && (
                        <span className="font-mono text-[10px]" style={{ color: delta > 0 ? '#2E7D32' : '#C62828' }}>
                          {delta > 0 ? `↑${delta}` : `↓${Math.abs(delta)}`}
                        </span>
                      )}
                    </div>
                    {note && <p className="font-mono text-[8px] mt-0.5 leading-[1.4]" style={{ color: C.muted }}>{note}</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NARRATIVE TIMELINE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-6" style={{ color: C.morocco }}>The Climb · Year by Year</p>
          <div className="space-y-0">
            {KEY_EVENTS.map((ev, i) => (
              <div key={i} className="flex gap-4 py-3 border-b" style={{ borderColor: C.border }}>
                <div className="shrink-0 w-[40px]">
                  <p className="font-mono text-[13px] font-bold" style={{ color: C.morocco }}>{ev.year}</p>
                </div>
                <div>
                  <p className="font-serif text-[13px]">{ev.label}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: C.text }}>{ev.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ READING NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.morocco }}>Reading Notes</p>
          <div className="space-y-6 text-[12px] leading-[1.7] max-w-[600px]" style={{ color: C.text }}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The stability premium</p>
              <p>Morocco&apos;s rise is less about explosive growth than about not falling. When Libya collapsed (2011), when Egypt convulsed (2011–2013), when Nigeria entered recession (2016), when South Africa stagnated (2015–2020) — Morocco kept compounding at 3–5% annually. Over twenty years, consistent 4% growth beats volatile 7% growth that gets interrupted by crises. The bump chart shows this: Morocco rarely leapfrogs dramatically. It just never drops.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The infrastructure edge</p>
              <p>Africa&apos;s first high-speed train (2018). Africa&apos;s largest port — Tangier Med, now the Mediterranean&apos;s busiest transshipment hub. 1,800km of motorway. The <span style={{ textDecoration: 'underline', textUnderlineOffset: '3px' }}>Noor</span>-Ouarzazate solar complex — one of the world&apos;s largest concentrated solar power plants. None of this happened by accident. Morocco has invested consistently in hard infrastructure while many African peers invested in consumption or commodity extraction.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The tourism narrative</p>
              <p>Morocco passing Egypt as Africa&apos;s most-visited country in 2024 is the headline — but the trajectory matters more. In 2005: 5.8 million arrivals. In 2024: 17.4 million. That&apos;s a tripling in twenty years, achieved through air route expansion (120 new routes in 2024 alone), Ryanair and easyJet access, luxury hotel investment (Four Seasons, Nobu), and the consistent marketing of Marrakech as a global brand.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>What the chart doesn&apos;t show</p>
              <p>Rank improvements mask absolute gaps. Morocco&apos;s $161B GDP is still less than half of Egypt&apos;s or South Africa&apos;s. Youth unemployment remains above 35%. The HDI improvement to &quot;high development&quot; still leaves Morocco below global averages. The dirham is still pegged. The rural-urban divide persists. The climb is real — but the summit is far.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-8 pb-24">
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[9px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sources: IMF World Economic Outlook Database (GDP nominal rankings, 2005–2025).
            UN Tourism / UNWTO World Tourism Barometer (international arrivals, 2005–2024).
            UNCTAD World Investment Report (FDI inflows by country, 2005–2024).
            IRENA Renewable Energy Statistics (installed capacity by country).
            UNDP Human Development Report (HDI values, 2005–2023).
            World Economic Forum Global Competitiveness Index (infrastructure pillar).
            African Development Bank African Infrastructure Development Index (AIDI).
            Bloomberg: &quot;Morocco Was the Most Visited Country in Africa in 2024.&quot;
            Africanews: &quot;Morocco tops Africa&apos;s tourism charts.&quot;
            Afreximbank: Africa in Figures 2024.
            Wikipedia: &quot;Economy of Morocco,&quot; &quot;List of African countries by GDP.&quot;
          </p>
          <p className="font-mono text-[9px] mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            © Slow Morocco. All rights reserved. This visualization may not be reproduced without visible attribution.
          </p>
        </div>
      </section>
    </div>
  )
}
