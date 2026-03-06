'use client'

import { useState, useEffect, useRef, useMemo } from 'react'

const C = {
  eur: '#1B4D8C', usd: '#8B2500', event: '#D4A017',
  ink: '#1a1a1a', text: '#3a3a3a', muted: '#8c8c8c', border: '#e0e0e0',
  positive: '#2E7D32', negative: '#C62828',
}

// ═══ EXCHANGE RATE DATA ═══
// EUR/MAD and USD/MAD annual average rates (how many MAD per 1 EUR / 1 USD)
// Sources: Bank Al-Maghrib, exchangerates.org.uk, xe.com, investing.com
interface YearData {
  year: number; eurMad: number; usdMad: number
}

const RATES: YearData[] = [
  { year: 2005, eurMad: 10.90, usdMad: 8.87 },
  { year: 2006, eurMad: 11.01, usdMad: 8.72 },
  { year: 2007, eurMad: 11.19, usdMad: 8.19 },
  { year: 2008, eurMad: 11.36, usdMad: 7.75 },
  { year: 2009, eurMad: 11.23, usdMad: 8.06 },
  { year: 2010, eurMad: 11.15, usdMad: 8.42 },
  { year: 2011, eurMad: 11.26, usdMad: 8.07 },
  { year: 2012, eurMad: 11.07, usdMad: 8.63 },
  { year: 2013, eurMad: 11.17, usdMad: 8.41 },
  { year: 2014, eurMad: 11.16, usdMad: 8.41 },
  { year: 2015, eurMad: 10.78, usdMad: 9.75 },
  { year: 2016, eurMad: 10.80, usdMad: 9.78 },
  { year: 2017, eurMad: 10.92, usdMad: 9.69 },
  { year: 2018, eurMad: 11.07, usdMad: 9.39 },
  { year: 2019, eurMad: 10.76, usdMad: 9.62 },
  { year: 2020, eurMad: 10.83, usdMad: 9.50 },
  { year: 2021, eurMad: 10.63, usdMad: 8.99 },
  { year: 2022, eurMad: 10.68, usdMad: 10.16 },
  { year: 2023, eurMad: 10.95, usdMad: 10.13 },
  { year: 2024, eurMad: 10.85, usdMad: 9.98 },
  { year: 2025, eurMad: 10.55, usdMad: 9.65 },
]

// ═══ ANNOTATED EVENTS ═══
interface RateEvent {
  year: number; label: string; story: string; impact: 'positive' | 'negative' | 'structural' | 'neutral'
}

const EVENTS: RateEvent[] = [
  { year: 2005, label: 'Vision 2010 Launches', impact: 'positive',
    story: 'King Mohammed VI launches the Vision 2010 tourism strategy. Morocco begins positioning as Africa\'s top tourism destination. FDI inflows rise. The dirham trades in a narrow band — pegged 80% to the euro, 20% to the dollar. Stability is the policy.' },
  { year: 2007, label: 'US Subprime Cracks', impact: 'negative',
    story: 'The US subprime crisis begins. The dollar weakens globally. For Morocco, this means the USD/MAD rate drops below 8.20 — the dirham strengthens against the dollar because of the heavy euro weighting in the basket. Remittances from MRE (Moroccans residing abroad) in Europe stay strong.' },
  { year: 2008, label: 'Global Financial Crisis', impact: 'negative',
    story: 'Lehman Brothers collapses. Global trade contracts. Morocco\'s exports and tourism take a hit, but the pegged dirham insulates the economy from the worst currency volatility. The EUR/MAD rate peaks above 11.35. Bank Al-Maghrib holds the peg steady.' },
  { year: 2011, label: 'Arab Spring & Feb 20 Movement', impact: 'negative',
    story: 'Revolution sweeps Tunisia, Egypt, Libya. Morocco\'s February 20 Movement demands constitutional reform. King Mohammed VI responds with a new constitution (approved by referendum, July 2011). Tourism drops across the region. The dirham wobbles but the peg holds. Morocco avoids the chaos that destroys neighbouring economies.' },
  { year: 2012, label: 'Eurozone Debt Crisis', impact: 'negative',
    story: 'The European sovereign debt crisis peaks. Greece, Spain, Portugal in turmoil. The euro weakens. Since the dirham is 80% pegged to the euro, it weakens too. EUR/MAD drops to ~11.07. Morocco\'s import bill rises. FX reserves dip to their lowest levels in years — only 4 months of import cover.' },
  { year: 2014, label: 'Oil Subsidy Reform', impact: 'positive',
    story: 'Morocco eliminates fuel subsidies — a politically brave reform that saves billions in public spending. The fiscal deficit narrows sharply. IMF approves a $6.2 billion Precautionary and Liquidity Line (PLL) — a safety net Morocco never draws on. Signal: the country is creditworthy.' },
  { year: 2015, label: 'Basket Reweighted', impact: 'structural',
    story: 'Bank Al-Maghrib reweights the dirham basket from 80/20 EUR/USD to 60/40. This reflects the growing share of dollar-denominated trade (phosphates, energy, US investment). The dirham immediately weakens against the euro (EUR/MAD drops to ~10.78) but strengthens structurally. The move signals intent to liberalize.' },
  { year: 2016, label: 'COP22 Marrakech', impact: 'positive',
    story: 'Morocco hosts COP22 — the UN climate conference — in Marrakech. Noor-Ouarzazate solar complex phases commissioned. International profile rises. Green bond markets open. The dirham is stable. Behind the scenes, Bank Al-Maghrib is preparing to flex the peg.' },
  { year: 2017, label: 'Flexibilization Delayed', impact: 'neutral',
    story: 'Bank Al-Maghrib announces the dirham will be partially liberalized in June 2017. Days before launch, commercial banks speculate massively — buying $4 billion in foreign currency. Liquidity dries up. The central bank postpones indefinitely. The lesson: markets are ready to test the peg the moment it loosens.' },
  { year: 2018, label: 'Band Widens ±2.5%', impact: 'structural',
    story: 'On January 15 — a Monday after a holiday weekend (no chance for speculation) — Morocco widens the dirham trading band from ±0.3% to ±2.5%. The first phase of flexibilization. Markets barely react. The dirham doesn\'t move. The whole point: prove that flexibility doesn\'t mean chaos.' },
  { year: 2019, label: 'Stable Transition', impact: 'positive',
    story: 'The first full year of the wider band. The dirham trades within narrow limits. Bank Al-Maghrib introduces "market maker" status for banks. The interbank FX market deepens. Tourism hits 13 million arrivals. Reserves rebuild to ~6 months of import cover. The flexibilization is working.' },
  { year: 2020, label: 'COVID + Band Widens ±5%', impact: 'negative',
    story: 'COVID-19 hits. Tourism collapses — Morocco\'s borders close March 2020. Remittances initially drop. But in a counterintuitive move, Bank Al-Maghrib widens the band again to ±5% on March 9, just as the pandemic begins. Reserves fall. The IMF doubles Morocco\'s PLL to $3 billion. The dirham weakens but stays orderly.' },
  { year: 2021, label: 'Recovery + Vaccine Rollout', impact: 'positive',
    story: 'Morocco runs one of Africa\'s fastest vaccine rollouts. Borders reopen gradually. Remittances surge to record highs (MRE transfers jump ~40% as diaspora send money home during crisis). The dirham strengthens against the dollar. FX reserves rebuild. Tourism recovery begins.' },
  { year: 2022, label: 'Ukraine War + Dollar Surge', impact: 'negative',
    story: 'Russia invades Ukraine. Energy and food prices spike. Morocco\'s import bill surges — the country imports 90%+ of its energy. The US dollar surges globally as the Fed raises rates aggressively. USD/MAD jumps above 10 for the first time. FX reserves drop 13%. The dirham faces its toughest test since the peg was loosened.' },
  { year: 2023, label: 'Earthquake + Resilience', impact: 'neutral',
    story: 'The Al Haouz earthquake (September 2023) kills 2,900+ people. International aid flows in. Tourism initially dips, then rebounds rapidly. Morocco qualifies as 2030 World Cup co-host. The dirham stabilizes. Inflation eases from 2022 highs. Bank Al-Maghrib holds rates. Reserves recover to ~5 months cover.' },
  { year: 2024, label: 'World Cup Momentum', impact: 'positive',
    story: 'Morocco enters its World Cup infrastructure build. $15 billion in stadium, highway, and rail investment announced. Tourism hits record 17.4 million arrivals. FDI inflows accelerate. S&P affirms BB+ rating. The dirham trades comfortably within its ±5% band. Bank Al-Maghrib governor announces intent to resume full flexibilization by 2026.' },
  { year: 2025, label: 'Pre-Float Preparation', impact: 'structural',
    story: 'Reserves at ~$36 billion. IMF PLL renewed (never drawn). Banks prepared for market-determined rates. The dirham\'s 60/40 EUR/USD basket holds. Governor Jouahri signals third phase: eventual delinking from the basket entirely. The question is no longer whether Morocco will float — but when.' },
]

// ═══ CHART DIMENSIONS ═══
const CHART = { w: 900, h: 380, pt: 40, pb: 50, pl: 55, pr: 55 }
const plotW = CHART.w - CHART.pl - CHART.pr
const plotH = CHART.h - CHART.pt - CHART.pb

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

// ═══ CONTENT ═══
export function DirhamsJourneyContent() {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [showUSD, setShowUSD] = useState(true)
  const [showEUR, setShowEUR] = useState(true)
  const heroR = useReveal()
  const chartR = useReveal(0.05)

  // Compute scales
  const allVals = useMemo(() => {
    const vals: number[] = []
    RATES.forEach(r => { if (showEUR) vals.push(r.eurMad); if (showUSD) vals.push(r.usdMad) })
    return vals
  }, [showEUR, showUSD])
  const minVal = Math.floor(Math.min(...allVals) * 10) / 10 - 0.3
  const maxVal = Math.ceil(Math.max(...allVals) * 10) / 10 + 0.3

  const xScale = (year: number) => CHART.pl + ((year - 2005) / (2025 - 2005)) * plotW
  const yScale = (val: number) => CHART.pt + (1 - (val - minVal) / (maxVal - minVal)) * plotH

  const makePath = (key: 'eurMad' | 'usdMad') => {
    return RATES.map((r, i) => `${i === 0 ? 'M' : 'L'}${xScale(r.year).toFixed(1)},${yScale(r[key]).toFixed(1)}`).join(' ')
  }

  const hoverData = hoveredYear !== null ? RATES.find(r => r.year === hoveredYear) : null
  const hoverEvent = hoveredYear !== null ? EVENTS.find(e => e.year === hoveredYear) : null
  const selEv = selectedEvent !== null ? EVENTS[selectedEvent] : null

  // Y-axis ticks
  const yTicks: number[] = []
  for (let v = Math.ceil(minVal); v <= Math.floor(maxVal); v++) yTicks.push(v)

  return (
    <div className="min-h-screen bg-white" style={{ color: C.ink }}>

      {/* ═══ HERO ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pt-36 pb-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-3" style={{ color: C.muted }}>Module 067 · Currency Intelligence</p>
        <div ref={heroR.ref}>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.9] tracking-[-0.02em] mb-3 transition-all duration-1000"
            style={{ opacity: heroR.vis ? 1 : 0, transform: heroR.vis ? 'translateY(0)' : 'translateY(20px)' }}>
            <em>The Dirham&apos;s<br />Journey</em>
          </h1>
          <p className="font-serif italic text-[clamp(1rem,2.5vw,1.5rem)]" style={{ color: C.muted }}>
            20 years of MAD/EUR and MAD/USD — annotated with what caused every move
          </p>
        </div>
        <p className="text-[13px] max-w-[580px] leading-[1.7] mt-6" style={{ color: C.text }}>
          The Moroccan dirham is not a free-floating currency. It&apos;s pegged to a basket:
          60% euro, 40% US dollar — set by Bank Al-Maghrib. The band was ±0.3% until
          January 2018, when Morocco began a gradual flexibilization: first to ±2.5%,
          then to ±5% in March 2020. The next phase — full delinking from the basket —
          is planned for 2026. Every movement in the line below tells a story: the 2008
          financial crisis, the Arab Spring, COVID border closures, the Ukraine war oil
          shock, the earthquake, the World Cup infrastructure boom. The dirham barely
          moves — and that&apos;s the point. Stability is Morocco&apos;s economic religion.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { v: '60/40', l: 'EUR/USD basket weight', c: C.eur },
            { v: '±5%', l: 'current trading band', c: C.usd },
            { v: '$36B', l: 'FX reserves (2025)', c: C.positive },
            { v: '2026', l: 'planned next phase', c: C.event },
          ].map((n, i) => (
            <div key={i} className="transition-all duration-700" style={{ opacity: heroR.vis ? 1 : 0, transitionDelay: `${i * 120}ms` }}>
              <p className="font-mono leading-none" style={{ color: n.c }}><span className="text-[28px] font-bold">{n.v}</span></p>
              <p className="font-mono text-[10px] mt-1" style={{ color: C.muted }}>{n.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CHART ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] pb-8">
        <div ref={chartR.ref} className="border-t pt-8" style={{ borderColor: C.border }}>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: C.ink }}>Exchange Rates · 2005–2025</p>
            <div className="flex gap-2 ml-auto">
              <button onClick={() => setShowEUR(!showEUR)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] uppercase tracking-wider font-mono transition-all"
                style={{ background: showEUR ? C.eur : 'transparent', color: showEUR ? 'white' : C.eur, border: `1px solid ${C.eur}`, opacity: showEUR ? 1 : 0.4 }}>
                <span className="inline-block w-3 h-[2px]" style={{ background: showEUR ? 'white' : C.eur }} />
                EUR/MAD
              </button>
              <button onClick={() => setShowUSD(!showUSD)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] uppercase tracking-wider font-mono transition-all"
                style={{ background: showUSD ? C.usd : 'transparent', color: showUSD ? 'white' : C.usd, border: `1px solid ${C.usd}`, opacity: showUSD ? 1 : 0.4 }}>
                <span className="inline-block w-3 h-[2px]" style={{ background: showUSD ? 'white' : C.usd }} />
                USD/MAD
              </button>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${CHART.w} ${CHART.h}`} className="w-full min-w-[700px]" style={{ maxHeight: '420px' }}>
              {/* Grid lines */}
              {yTicks.map(v => (
                <g key={v}>
                  <line x1={CHART.pl} y1={yScale(v)} x2={CHART.w - CHART.pr} y2={yScale(v)} stroke={C.border} strokeWidth="0.5" />
                  <text x={CHART.pl - 8} y={yScale(v) + 3} textAnchor="end" fill={C.muted} fontSize="9" fontFamily="monospace">{v.toFixed(0)}</text>
                </g>
              ))}

              {/* X-axis labels */}
              {RATES.filter((_, i) => i % 2 === 0 || i === RATES.length - 1).map(r => (
                <text key={r.year} x={xScale(r.year)} y={CHART.h - CHART.pb + 18} textAnchor="middle" fill={C.muted} fontSize="9" fontFamily="monospace">
                  {String(r.year).slice(-2)}
                </text>
              ))}

              {/* EUR line */}
              {showEUR && (
                <path d={makePath('eurMad')} fill="none" stroke={C.eur} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="transition-all duration-1000" style={{ strokeDasharray: chartR.vis ? '0' : '2000', strokeDashoffset: chartR.vis ? '0' : '2000' }} />
              )}

              {/* USD line */}
              {showUSD && (
                <path d={makePath('usdMad')} fill="none" stroke={C.usd} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 3"
                  className="transition-all duration-1000" style={{ opacity: chartR.vis ? 1 : 0 }} />
              )}

              {/* Event markers */}
              {EVENTS.map((ev, i) => {
                const rate = RATES.find(r => r.year === ev.year)
                if (!rate) return null
                const x = xScale(ev.year)
                const topY = Math.min(showEUR ? yScale(rate.eurMad) : 999, showUSD ? yScale(rate.usdMad) : 999)
                return (
                  <g key={i}>
                    <line x1={x} y1={topY - 8} x2={x} y2={CHART.h - CHART.pb} stroke={C.event} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.4" />
                    <circle cx={x} cy={topY - 14} r="4" fill={ev.impact === 'positive' ? C.positive : ev.impact === 'negative' ? C.negative : ev.impact === 'structural' ? C.event : C.muted}
                      stroke="white" strokeWidth="1.5" className="cursor-pointer" style={{ transition: 'r 0.2s' }}
                      onMouseEnter={() => setHoveredYear(ev.year)} onMouseLeave={() => setHoveredYear(null)} />
                  </g>
                )
              })}

              {/* Data dots on hover */}
              {hoverData && (
                <>
                  <line x1={xScale(hoverData.year)} y1={CHART.pt} x2={xScale(hoverData.year)} y2={CHART.h - CHART.pb} stroke={C.ink} strokeWidth="0.5" opacity="0.3" />
                  {showEUR && <circle cx={xScale(hoverData.year)} cy={yScale(hoverData.eurMad)} r="4" fill={C.eur} stroke="white" strokeWidth="1.5" />}
                  {showUSD && <circle cx={xScale(hoverData.year)} cy={yScale(hoverData.usdMad)} r="4" fill={C.usd} stroke="white" strokeWidth="1.5" />}
                </>
              )}

              {/* Hover interactive overlay */}
              {RATES.map((r) => (
                <rect key={r.year} x={xScale(r.year) - plotW / RATES.length / 2} y={CHART.pt} width={plotW / RATES.length} height={plotH}
                  fill="transparent" className="cursor-crosshair"
                  onMouseEnter={() => setHoveredYear(r.year)} onMouseLeave={() => setHoveredYear(null)} />
              ))}

              {/* Axis labels */}
              <text x={CHART.pl - 10} y={CHART.pt - 10} textAnchor="start" fill={C.muted} fontSize="8" fontFamily="monospace">MAD per unit</text>
            </svg>
          </div>

          {/* Hover tooltip */}
          {hoverData && (
            <div className="mt-2 p-3 bg-white border transition-all" style={{ borderColor: C.border }}>
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[16px] font-bold">{hoverData.year}</span>
                {showEUR && <span className="font-mono text-[12px]" style={{ color: C.eur }}>EUR/MAD {hoverData.eurMad.toFixed(2)}</span>}
                {showUSD && <span className="font-mono text-[12px]" style={{ color: C.usd }}>USD/MAD {hoverData.usdMad.toFixed(2)}</span>}
                {hoverEvent && (
                  <span className="font-mono text-[10px] px-2 py-0.5"
                    style={{ background: hoverEvent.impact === 'positive' ? `${C.positive}15` : hoverEvent.impact === 'negative' ? `${C.negative}15` : `${C.event}15`,
                      color: hoverEvent.impact === 'positive' ? C.positive : hoverEvent.impact === 'negative' ? C.negative : C.event }}>
                    {hoverEvent.label}
                  </span>
                )}
              </div>
              {hoverEvent && <p className="text-[11px] mt-2 leading-[1.6] max-w-[600px]" style={{ color: C.text }}>{hoverEvent.story}</p>}
            </div>
          )}
        </div>
      </section>

      {/* ═══ EVENT TIMELINE ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ color: C.event }}>The Story Behind the Line</p>
          <p className="text-[11px] mb-6" style={{ color: C.muted }}>Every dot on the chart is an event. Click to expand.</p>
          <div className="space-y-0">
            {EVENTS.map((ev, i) => {
              const isExpanded = selectedEvent === i
              const impactColor = ev.impact === 'positive' ? C.positive : ev.impact === 'negative' ? C.negative : ev.impact === 'structural' ? C.event : C.muted
              const rate = RATES.find(r => r.year === ev.year)
              return (
                <button key={i} onClick={() => setSelectedEvent(isExpanded ? null : i)} className="w-full text-left">
                  <div className="flex gap-3 py-2 border-b" style={{ borderColor: C.border, borderLeftWidth: isExpanded ? '3px' : '0', borderLeftColor: impactColor, paddingLeft: isExpanded ? '12px' : '0' }}>
                    <div className="shrink-0 w-[36px]">
                      <p className="font-mono text-[13px] font-bold" style={{ color: impactColor }}>{String(ev.year).slice(-2)}</p>
                    </div>
                    <div className="shrink-0 w-2 h-2 mt-1.5 rounded-full" style={{ background: impactColor }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <p className="font-serif text-[13px]">{ev.label}</p>
                        {rate && <span className="font-mono text-[9px]" style={{ color: C.muted }}>€{rate.eurMad.toFixed(2)} · ${rate.usdMad.toFixed(2)}</span>}
                      </div>
                      {isExpanded && (
                        <p className="text-[12px] leading-[1.65] mt-2 max-w-[580px]" style={{ color: C.text }}>{ev.story}</p>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ READING NOTES ═══ */}
      <section className="px-8 md:px-[8%] lg:px-[12%] py-8">
        <div className="border-t pt-8" style={{ borderColor: C.border }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-4" style={{ color: C.event }}>Reading Notes</p>
          <div className="space-y-6 text-[12px] leading-[1.7] max-w-[600px]" style={{ color: C.text }}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>Why the lines barely move</p>
              <p>Morocco&apos;s exchange rate was fixed — ±0.3% — until January 2018. That&apos;s not a trading range; it&apos;s a lock. The dirham moved only when the euro and dollar moved against each other. When the euro weakened (2012 debt crisis, 2015), EUR/MAD dropped. When the dollar surged (2022 Fed hikes), USD/MAD spiked above 10. The dirham itself was anchored. The chart is really a chart of EUR/USD refracted through Morocco&apos;s basket.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The basket</p>
              <p>Until 2015, the dirham was 80% euro and 20% dollar. The reweighting to 60/40 was a structural shift — Morocco was acknowledging that its dollar-denominated trade (phosphates exports, energy imports, US investment) had grown. The change immediately made the dirham more responsive to dollar movements. The 2022 USD surge would have been far less visible under the old 80/20 basket.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The flexibilization</p>
              <p>Three phases: ±2.5% (January 2018), ±5% (March 2020), and planned delinking (2026). Each step was deliberately undramatic. The first phase barely moved the rate. The second coincided with COVID — and even then, the dirham stayed orderly. The goal is not dramatic devaluation but a shock absorber: when crises hit, the dirham can flex instead of forcing the central bank to burn reserves defending a rigid peg.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider mb-1" style={{ color: C.ink }}>The PLL that nobody draws</p>
              <p>Morocco has maintained an IMF Precautionary and Liquidity Line since 2012. Currently ~$5 billion. It has never been drawn. The line exists purely as a signal: Morocco is stable enough to qualify, disciplined enough not to need it. In the language of currency markets, this is the equivalent of having a security guard who never needs to do anything — his presence is the point.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOURCES ═══ */}
      <section style={{ backgroundColor: '#1f1f1f' }} className="px-8 md:px-[8%] lg:px-[12%] py-8 pb-24">
        <div className="border-t pt-6" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
          <p className="font-mono text-[9px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Sources: Bank Al-Maghrib: &quot;Reform of the Exchange Rate Regime&quot; (bkam.ma).
            Exchange-rates.org: EUR/MAD and USD/MAD annual averages 2005–2025.
            Investing.com: EUR/MAD historical data.
            Xe.com: MAD/EUR and MAD/USD 10-year charts.
            IMF: Morocco — Precautionary and Liquidity Line reviews.
            Capital.com: &quot;Moroccan Dirham Forecast.&quot;
            Wikipedia: &quot;Moroccan dirham.&quot;
            Morocco World News: &quot;Morocco to Loosen Dirham Peg by 2026.&quot;
            MIPA Institute: &quot;Why did Morocco's New Currency Policy Falter?&quot;
          </p>
          <p className="font-mono text-[9px] mt-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
            © Slow Morocco. All rights reserved. This visualization may not be reproduced without visible attribution.
          </p>
        </div>
      </section>
    </div>
  )
}
